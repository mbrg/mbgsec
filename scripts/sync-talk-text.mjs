#!/usr/bin/env node

import assert from "node:assert/strict";
import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const talkDirectories = ["_pages/decks", "_pages/talks"].map((directory) => path.join(repositoryRoot, directory));
const textPagesDirectory = path.join(repositoryRoot, "_pages", "talk-text");
const slideDataDirectory = path.join(repositoryRoot, "_data", "talk_slides");
const checkOnly = process.argv.includes("--check");

function splitPage(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert(match, `${file} has malformed frontmatter.`);
  return { frontmatter: match[1], body: match[2] };
}

function scalar(frontmatter, key) {
  const raw = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, "m"))?.[1]?.trim();
  if (!raw) return undefined;
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1).replace(raw[0] === '"' ? /\\"/g : /''/g, raw[0]);
  }
  return raw;
}

async function talkPages() {
  const pages = [];
  for (const directory of talkDirectories) {
    for (const filename of (await readdir(directory)).filter((name) => name.endsWith(".md")).sort()) {
      const file = path.join(directory, filename);
      const source = await readFile(file, "utf8");
      const { frontmatter, body } = splitPage(source, file);
      const permalink = scalar(frontmatter, "permalink");
      const layout = scalar(frontmatter, "layout");
      assert(layout === "deck" || layout === "talk", `${file} is not a talk page.`);
      const match = permalink?.match(/^\/talks\/([^/]+)\/$/);
      assert(match, `${file} has an invalid talk permalink.`);
      pages.push({
        file,
        filename,
        slug: match[1],
        permalink,
        deckManifest: scalar(frontmatter, "deck_manifest"),
        body,
      });
    }
  }
  pages.sort((left, right) => left.slug.localeCompare(right.slug));
  assert.equal(new Set(pages.map((page) => page.slug)).size, pages.length, "Talk slugs must be unique.");
  return pages;
}

function textPageSource(talk) {
  return `---
layout: talk-text
permalink: ${talk.permalink}llms.txt
talk_permalink: ${talk.permalink}
talk_slug: ${talk.slug}
generated_by: sync-talk-text
sitemap: false
---
${talk.body}`;
}

function publicMediaUrl(value, manifestUrl) {
  if (!value || typeof value !== "string") return undefined;
  return new URL(value, manifestUrl).href;
}

function slideMedia(slide, manifestUrl) {
  const media = [];
  for (const video of Array.isArray(slide.youtube) ? slide.youtube : []) {
    assert.match(video.videoId ?? "", /^[A-Za-z0-9_-]{11}$/, `Invalid YouTube video ID in ${manifestUrl}`);
    media.push({
      type: "youtube",
      title: video.title || "Embedded YouTube video",
      url: `https://www.youtube.com/watch?v=${video.videoId}`,
    });
  }
  const videos = Array.isArray(slide.videos) ? slide.videos : slide.video ? [slide.video] : [];
  for (const video of videos) {
    const url = publicMediaUrl(video?.src, manifestUrl);
    if (!url) continue;
    const item = { type: "video", title: video.title || "Embedded video", url };
    const captions = publicMediaUrl(video.captions, manifestUrl);
    if (captions) item.captions = captions;
    media.push(item);
  }
  for (const animation of Array.isArray(slide.animations) ? slide.animations : []) {
    const url = publicMediaUrl(animation?.src, manifestUrl);
    if (url) media.push({ type: "animation", title: animation.title || "Embedded animation", url });
  }
  return media;
}

async function fetchJson(url) {
  const parsed = new URL(url);
  assert.equal(parsed.protocol, "https:", `Manifest must use HTTPS: ${url}`);
  assert.equal(parsed.hostname, "media.mbgsec.com", `Unexpected manifest host: ${url}`);
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (response.status !== 200) {
    const error = new Error(`${url} returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function slideData(talk) {
  const pointer = await fetchJson(talk.deckManifest);
  assert.equal(typeof pointer.manifest, "string", `${talk.deckManifest} lacks a manifest URL.`);
  const manifest = await fetchJson(pointer.manifest);
  assert(Array.isArray(manifest.slides) && manifest.slides.length > 0, `${pointer.manifest} has no slides.`);
  return {
    generated_by: "sync-talk-text",
    source_manifest: talk.deckManifest,
    manifest: pointer.manifest,
    title: manifest.title || undefined,
    slides: manifest.slides.map((slide, index) => {
      assert.equal(typeof slide.alt, "string", `${pointer.manifest} slide ${index + 1} lacks alt text.`);
      assert(slide.alt.trim(), `${pointer.manifest} slide ${index + 1} has empty alt text.`);
      const item = { number: index + 1, text: slide.alt.trim() };
      const media = slideMedia(slide, pointer.manifest);
      if (media.length > 0) item.media = media;
      return item;
    }),
  };
}

async function existingGeneratedFiles(directory, extension) {
  try {
    const files = (await readdir(directory)).filter((name) => name.endsWith(extension));
    const generated = [];
    for (const filename of files) {
      const source = await readFile(path.join(directory, filename), "utf8");
      if (source.includes("sync-talk-text")) generated.push(filename);
    }
    return generated;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function assertFile(file, expected) {
  const actual = await readFile(file, "utf8");
  assert.equal(actual, expected, `${path.relative(repositoryRoot, file)} is stale; run npm run talks:text:sync.`);
}

async function check(talks) {
  const expectedTextFiles = new Set(talks.map((talk) => `${talk.slug}.txt`));
  const actualTextFiles = new Set(await existingGeneratedFiles(textPagesDirectory, ".txt"));
  assert.deepEqual(actualTextFiles, expectedTextFiles, "Generated talk text pages do not match the talk catalog.");

  for (const talk of talks) {
    await assertFile(path.join(textPagesDirectory, `${talk.slug}.txt`), textPageSource(talk));
  }

  const deckTalks = talks.filter((talk) => talk.deckManifest);
  const expectedDataFiles = new Set(deckTalks.map((talk) => `${talk.slug}.json`));
  const actualDataFiles = new Set(await existingGeneratedFiles(slideDataDirectory, ".json"));
  assert.deepEqual(actualDataFiles, expectedDataFiles, "Generated slide-text data does not match deck pages.");
  for (const talk of deckTalks) {
    const file = path.join(slideDataDirectory, `${talk.slug}.json`);
    const data = JSON.parse(await readFile(file, "utf8"));
    assert.equal(data.generated_by, "sync-talk-text", `${file} is not generated slide data.`);
    assert.equal(data.source_manifest, talk.deckManifest, `${file} points to a stale manifest.`);
    assert.match(data.manifest ?? "", /^https:\/\/media\.mbgsec\.com\//, `${file} lacks a public manifest URL.`);
    assert(Array.isArray(data.slides) && data.slides.length > 0, `${file} has no slides.`);
    data.slides.forEach((slide, index) => {
      assert.equal(slide.number, index + 1, `${file} has non-contiguous slide numbers.`);
      assert.equal(typeof slide.text, "string", `${file} slide ${index + 1} lacks text.`);
      assert(slide.text.trim(), `${file} slide ${index + 1} has empty text.`);
    });
  }
  console.log(`Talk text check passed: ${talks.length} pages, ${deckTalks.length} slide-text datasets.`);
}

async function removeStale(directory, extension, expected) {
  for (const filename of await existingGeneratedFiles(directory, extension)) {
    if (!expected.has(filename)) await unlink(path.join(directory, filename));
  }
}

async function sync(talks) {
  await mkdir(textPagesDirectory, { recursive: true });
  await mkdir(slideDataDirectory, { recursive: true });
  for (const talk of talks) {
    await writeFile(path.join(textPagesDirectory, `${talk.slug}.txt`), textPageSource(talk), "utf8");
  }

  const deckTalks = talks.filter((talk) => talk.deckManifest);
  const concurrency = 8;
  let next = 0;
  const failures = [];
  const workers = Array.from({ length: concurrency }, async () => {
    while (next < deckTalks.length) {
      const talk = deckTalks[next++];
      try {
        const data = await slideData(talk);
        await writeFile(path.join(slideDataDirectory, `${talk.slug}.json`), `${JSON.stringify(data, null, 2)}\n`, "utf8");
        console.log(`Synced ${talk.slug}: ${data.slides.length} slides`);
      } catch (error) {
        failures.push(`${talk.slug}: ${error.message}`);
      }
    }
  });
  await Promise.all(workers);

  if (failures.length > 0) {
    throw new Error(`Could not sync ${failures.length} deck manifest(s):\n${failures.sort().join("\n")}`);
  }

  await removeStale(textPagesDirectory, ".txt", new Set(talks.map((talk) => `${talk.slug}.txt`)));
  await removeStale(slideDataDirectory, ".json", new Set(deckTalks.map((talk) => `${talk.slug}.json`)));
  console.log(`Synced ${talks.length} talk text pages and ${deckTalks.length} slide-text datasets.`);
}

const talks = await talkPages();
if (checkOnly) await check(talks);
else await sync(talks);
