#!/usr/bin/env node

import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";

const BUCKET = "mbgsec-media";
const PUBLIC_ORIGIN = "https://media.mbgsec.com";
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "70e38d4eb6fba09fac400b7190cfa0cb";
const R2_ENDPOINT = process.env.S3_ENDPOINT || `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;
const AWS_PROFILE = process.env.MBGSEC_R2_AWS_PROFILE || "mbgsec-r2";
const HAS_ENV_CREDENTIALS = Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);

function usage() {
  console.log(`Usage:
  npm run deck:publish -- --slug <slug> [--dir .deck-build/<slug>] [--pdf slides.pdf] [--version <version>] [--upload]

Default mode is a dry run. Add --upload only after reviewing the object plan.
When --dir is present, the source directory must contain deck.json plus every
relative asset it references. --pdf publishes a stable slides.pdf object for the
talk and may be used by itself when the deck is already online. Raw source decks
must remain outside public R2 storage.
Uploads use credentials injected by 1Password or the bucket-scoped AWS CLI profile
named by MBGSEC_R2_AWS_PROFILE (default: mbgsec-r2).`);
}

function parseArguments(argv) {
  const values = { upload: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--upload") {
      values.upload = true;
    } else if (["--dir", "--pdf", "--slug", "--version"].includes(argument)) {
      values[argument.slice(2)] = argv[index + 1];
      index += 1;
    } else if (argument === "--help" || argument === "-h") {
      usage();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return values;
}

function utcVersion() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not publishable: ${path}`);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function mimeType(path) {
  const types = {
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".mp4": "video/mp4",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".vtt": "text/vtt",
    ".webm": "video/webm",
    ".webp": "image/webp"
  };
  return types[extname(path).toLowerCase()] || "application/octet-stream";
}

function referencedAssets(manifest) {
  const references = [];
  for (const slide of manifest.slides) {
    if (slide.image) references.push(slide.image);
    const animations = Array.isArray(slide.animations) ? slide.animations : [];
    for (const animation of animations) {
      if (animation?.src) references.push(animation.src);
    }
    const videos = Array.isArray(slide.videos) ? slide.videos : slide.video ? [slide.video] : [];
    for (const video of videos) {
      if (video?.src) references.push(video.src);
      if (video?.poster) references.push(video.poster);
      if (video?.captions) references.push(video.captions);
    }
  }
  return references;
}

function validateManifest(directory, manifest) {
  if (!manifest || typeof manifest !== "object") throw new Error("deck.json must contain a JSON object.");
  if (!Array.isArray(manifest.slides) || manifest.slides.length === 0) {
    throw new Error("deck.json must contain at least one slide.");
  }

  for (const reference of referencedAssets(manifest)) {
    if (typeof reference !== "string") throw new Error("Every asset reference must be a string.");
    if (/^(?:https?:|data:)/i.test(reference)) continue;

    const asset = resolve(directory, reference);
    const insideDirectory = asset === directory || asset.startsWith(`${directory}${sep}`);
    if (!insideDirectory) throw new Error(`Asset escapes the publishing directory: ${reference}`);
    if (!existsSync(asset) || !statSync(asset).isFile()) throw new Error(`Missing asset: ${reference}`);
  }
}

function uploadObject(source, key, cacheControl, contentDisposition) {
  const credentialArguments = HAS_ENV_CREDENTIALS ? [] : ["--profile", AWS_PROFILE];
  const metadataArguments = contentDisposition ? ["--content-disposition", contentDisposition] : [];
  const result = spawnSync(
    "aws",
    [
      "s3",
      "cp",
      source,
      `s3://${BUCKET}/${key}`,
      "--endpoint-url",
      R2_ENDPOINT,
      ...credentialArguments,
      "--content-type",
      mimeType(source),
      "--cache-control",
      cacheControl,
      ...metadataArguments,
      "--only-show-errors",
      "--no-progress"
    ],
    { stdio: "inherit" }
  );
  if (result.status !== 0) throw new Error(`Upload failed for ${key}.`);
}

const options = parseArguments(process.argv.slice(2));
if (!options.slug || (!options.dir && !options.pdf)) {
  usage();
  process.exitCode = 1;
} else {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(options.slug)) {
    throw new Error("Slug must contain letters, numbers, underscores, and hyphens only.");
  }
  const version = options.version || utcVersion();
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(version)) throw new Error("Version contains unsupported characters.");

  const prefix = `decks/${options.slug}/${version}`;
  const objects = [];

  if (options.dir) {
    const directory = resolve(options.dir);
    const manifestPath = join(directory, "deck.json");
    if (!existsSync(manifestPath)) throw new Error(`Missing ${manifestPath}`);

    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    validateManifest(directory, manifest);

    for (const file of walk(directory).sort()) {
      objects.push({
        file,
        key: `${prefix}/${relative(directory, file).split(sep).join("/")}`,
        cacheControl: "public, max-age=31536000, immutable"
      });
    }
  }

  if (options.pdf) {
    const pdf = resolve(options.pdf);
    if (!existsSync(pdf) || !statSync(pdf).isFile()) throw new Error(`Missing PDF: ${pdf}`);
    if (extname(pdf).toLowerCase() !== ".pdf") throw new Error("--pdf must point to a PDF file.");
    objects.push({
      file: pdf,
      key: `decks/${options.slug}/slides.pdf`,
      cacheControl: "public, max-age=3600",
      contentDisposition: `attachment; filename="${basename(pdf).replace(/["\\]/g, "_")}"`
    });
  }

  console.log(`Bucket: ${BUCKET}`);
  console.log(`Credentials: ${HAS_ENV_CREDENTIALS ? "injected environment" : `AWS profile ${AWS_PROFILE}`}`);
  if (options.dir) console.log(`Version: ${version}`);
  for (const object of objects) console.log(`  ${object.key}`);
  if (options.dir) console.log(`  decks/${options.slug}/latest.json`);

  if (!options.upload) {
    console.log("Dry run only. Re-run with --upload after reviewing this plan.");
  } else {
    for (const object of objects) {
      uploadObject(object.file, object.key, object.cacheControl, object.contentDisposition);
    }

    if (options.dir) {
      const temporaryDirectory = mkdtempSync(join(tmpdir(), "mbgsec-deck-"));
      try {
        const latestPath = join(temporaryDirectory, "latest.json");
        writeFileSync(
          latestPath,
          `${JSON.stringify({ manifest: `${PUBLIC_ORIGIN}/${prefix}/deck.json` }, null, 2)}\n`,
          "utf8"
        );
        uploadObject(latestPath, `decks/${options.slug}/latest.json`, "public, max-age=60");
      } finally {
        rmSync(temporaryDirectory, { recursive: true, force: true });
      }

      console.log(`Published deck: ${PUBLIC_ORIGIN}/decks/${options.slug}/latest.json`);
    }

    if (options.pdf) console.log(`Published PDF: ${PUBLIC_ORIGIN}/decks/${options.slug}/slides.pdf`);
  }
}
