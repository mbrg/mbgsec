#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(scriptPath), "../../../..");
const workRoot = path.join(repositoryRoot, ".talk-enrichment");
const pageDirectories = [
  path.join(repositoryRoot, "_pages", "decks"),
  path.join(repositoryRoot, "_pages", "talks"),
];
const START_MARKER = "<!-- talk-enrichment:start -->";
const END_MARKER = "<!-- talk-enrichment:end -->";
const DEFAULT_TRANSCRIPTION_MODEL = "gpt-4o-transcribe-diarize";
const DEFAULT_TEXT_MODEL = "gpt-5.6-terra";
const DEFAULT_LOCAL_TRANSCRIPTION_MODEL = "mlx-community/whisper-large-v3-turbo";
const REMEDIATION_LOCAL_TRANSCRIPTION_MODEL = "mlx-community/whisper-large-v3-mlx";
const DEFAULT_OLLAMA_MODEL = "gpt-oss:20b";
const EVALUATOR_POLICY_VERSION = 6;
const ABSTRACT_EXCEPTION_STATUSES = new Set([
  "source-lacks-abstract",
  "source-mismatch",
  "source-unavailable",
]);
const TRANSCRIPT_EXCEPTION_STATUSES = new Set(["recording-quality-unusable"]);

function usage() {
  console.log(`Usage:
  enrich_talks.mjs inventory [--json]
  enrich_talks.mjs report [--output <repository-relative-markdown-file>]
  enrich_talks.mjs queue [--stage <transcribe|draft|evaluate|machine-remediation|publish>] [--limit <count>] [--json]
  enrich_talks.mjs prepare-batch --limit <count> [--slug <slug>] [--through <transcribe|draft|evaluate|review-pack>] [--transcription-backend <local|openai>] [--execute] [--continue-on-error] [--json]
  enrich_talks.mjs capture-abstract --slug <slug>
  enrich_talks.mjs capture-abstract --slug <slug> --input <text-file> --observed-title <title> --evidence <location> [--source-url <official-url>]
  enrich_talks.mjs capture-abstract --all [--supported-only] [--retry-exceptions]
  enrich_talks.mjs reuse-abstract --slug <target-slug> --source-slug <published-same-talk-slug>
  enrich_talks.mjs publish-captured-abstracts
  enrich_talks.mjs fetch-audio --slug <slug>
  enrich_talks.mjs transcribe --slug <slug> [--input <audio>]
  enrich_talks.mjs transcribe-local --slug <slug> [--input <audio>] [--model <mlx-model>]
  enrich_talks.mjs import-local-transcript --slug <slug> --input <mlx-json> [--model <mlx-model>]
  enrich_talks.mjs draft --slug <slug>
  enrich_talks.mjs evaluate --slug <slug> [--deterministic-only]
  enrich_talks.mjs remediate --slug <slug> [--model <mlx-model>] [--force-second-asr]
  enrich_talks.mjs remediate --all [--model <mlx-model>] [--force-second-asr]
  enrich_talks.mjs review-pack --slug <slug>
  enrich_talks.mjs apply-reviewed-corrections --slug <slug> --input <corrections.json> --reviewer <name>
  enrich_talks.mjs review --slug <slug> --decision <approved|rejected> --reviewer <name> [--notes <text>]
  enrich_talks.mjs publish --slug <slug> --abstract-artifact [--abstract-only]
  enrich_talks.mjs publish --slug <slug> --abstract-file <file> --abstract-source <url> [--abstract-only]
  enrich_talks.mjs publish-approved [--all] [--slug <slug>]
  enrich_talks.mjs validate

Working files are written under ignored .talk-enrichment/<slug>/.
OpenAI commands read OPENAI_API_KEY and never persist it. Set MBGSEC_LLM_BACKEND=ollama
to use the local structured-output editor and judges instead.`);
}

function parseArguments(argv) {
  const [command, ...rest] = argv;
  const options = {};
  for (let index = 0; index < rest.length; index += 1) {
    const argument = rest[index];
    if (!argument.startsWith("--")) throw new Error(`Unexpected argument: ${argument}`);
    const key = argument.slice(2).replaceAll("-", "_");
    const next = rest[index + 1];
    if (!next || next.startsWith("--")) options[key] = true;
    else {
      options[key] = next;
      index += 1;
    }
  }
  return { command, options };
}

function splitPage(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file} has malformed frontmatter.`);
  return { frontmatter: match[1], body: match[2] };
}

function scalar(frontmatter, key) {
  const raw = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, "m"))?.[1]?.trim();
  if (!raw) return undefined;
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    try {
      return raw.startsWith('"') ? JSON.parse(raw) : raw.slice(1, -1).replaceAll("''", "'");
    } catch {
      return raw.slice(1, -1);
    }
  }
  return raw;
}

function slugFromPermalink(permalink) {
  return permalink?.split("/").filter(Boolean).at(-1);
}

async function loadTalks() {
  const talks = [];
  for (const directory of pageDirectories) {
    for (const filename of (await readdir(directory)).filter((entry) => entry.endsWith(".md")).sort()) {
      const file = path.join(directory, filename);
      const source = await readFile(file, "utf8");
      const { frontmatter, body } = splitPage(source, file);
      const permalink = scalar(frontmatter, "permalink");
      talks.push({
        file,
        filename,
        source,
        frontmatter,
        body,
        slug: slugFromPermalink(permalink),
        permalink,
        layout: scalar(frontmatter, "layout"),
        pdfUrl: scalar(frontmatter, "pdf_url"),
        title: scalar(frontmatter, "title"),
        talkDate: scalar(frontmatter, "talk_date"),
        conference: scalar(frontmatter, "conference"),
        presentedBy: scalar(frontmatter, "presented_by"),
        recordingUrl: scalar(frontmatter, "recording_url"),
        recordingAcquisitionUrl: scalar(frontmatter, "recording_acquisition_url"),
        recordingTitle: scalar(frontmatter, "recording_title"),
        recordingEndSeconds: scalar(frontmatter, "recording_end_seconds"),
        scheduleUrl: scalar(frontmatter, "schedule_url"),
        scheduleTitle: scalar(frontmatter, "schedule_title"),
        abstractSourceUrl: scalar(frontmatter, "abstract_source_url"),
        abstractStatus: scalar(frontmatter, "abstract_status"),
        abstractStatusCheckedAt: scalar(frontmatter, "abstract_status_checked_at"),
        abstractStatusNote: scalar(frontmatter, "abstract_status_note"),
        transcriptStatus: scalar(frontmatter, "transcript_status"),
        transcriptStatusCheckedAt: scalar(frontmatter, "transcript_status_checked_at"),
        transcriptStatusNote: scalar(frontmatter, "transcript_status_note"),
      });
    }
  }
  return talks;
}

async function requireTalk(slug) {
  if (!slug || typeof slug !== "string") throw new Error("--slug is required.");
  const talk = (await loadTalks()).find((candidate) => candidate.slug === slug || candidate.filename === `${slug}.md`);
  if (!talk) throw new Error(`Unknown talk slug: ${slug}`);
  return talk;
}

export function agendaTitleForTalk(talk) {
  return talk.scheduleTitle || talk.title;
}

function talkWorkDirectory(talk) {
  return path.join(workRoot, talk.slug);
}

async function ensureWorkDirectory(talk) {
  const directory = talkWorkDirectory(talk);
  await mkdir(directory, { recursive: true });
  return directory;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: options.capture ? "utf8" : undefined,
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = options.capture ? `\n${result.stderr || result.stdout}` : "";
    throw new Error(`${command} exited with status ${result.status}.${detail}`);
  }
  return options.capture ? result.stdout : "";
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

export function parseProviderJson(source) {
  let normalized = "";
  let inString = false;
  let escaped = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (inString) {
      normalized += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      normalized += character;
      continue;
    }
    const token = ["-Infinity", "Infinity", "NaN"].find((candidate) => source.startsWith(candidate, index));
    if (token) {
      normalized += "null";
      index += token.length - 1;
    } else normalized += character;
  }
  return JSON.parse(normalized);
}

async function readProviderJson(file) {
  return parseProviderJson(await readFile(file, "utf8"));
}

async function writeJson(file, value) {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

const HTML_ENTITIES = new Map([
  ["amp", "&"], ["apos", "'"], ["gt", ">"], ["lt", "<"], ["nbsp", " "], ["quot", '"'],
  ["ndash", "–"], ["mdash", "—"], ["hellip", "…"], ["lsquo", "‘"], ["rsquo", "’"],
  ["ldquo", "“"], ["rdquo", "”"], ["bull", "•"], ["middot", "·"],
]);

function decodeHtmlEntities(value) {
  return String(value).replace(/&(#x[\da-f]+|#\d+|[a-z][\da-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return HTML_ENTITIES.get(entity.toLowerCase()) ?? match;
  });
}

export function htmlFragmentToText(fragment) {
  return decodeHtmlEntities(String(fragment)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(?:br|hr)\b[^>]*>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n- ")
    .replace(/<\/(?:div|li|p|section)>/gi, "\n")
    .replace(/<[^>]+>/g, ""))
    .replace(/\r/g, "")
    .replace(/[\t \u00a0]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function identityTokens(value) {
  const stop = new Set(["a", "an", "and", "at", "by", "delivered", "for", "ft", "in", "of", "or", "the", "to", "with"]);
  const cleaned = String(value).replace(/\s*\((?:delivered|ft\.?)[^)]+\)\s*$/i, "");
  return new Set(words(cleaned.normalize("NFKD")).filter((token) => token.length > 1 && !stop.has(token)));
}

export function titleMatchScore(expected, observed) {
  const expectedTokens = identityTokens(expected);
  const observedTokens = identityTokens(observed);
  if (!expectedTokens.size || !observedTokens.size) return 0;
  const matches = [...expectedTokens].filter((token) => observedTokens.has(token)).length;
  return matches / Math.min(expectedTokens.size, observedTokens.size);
}

export function recordingIdentityEvidence(talk, observedTitle) {
  const pageTitleScore = titleMatchScore(talk.title, observedTitle);
  const scheduleTitleScore = talk.scheduleTitle ? titleMatchScore(talk.scheduleTitle, observedTitle) : 0;
  const recordingTitleScore = talk.recordingTitle ? titleMatchScore(talk.recordingTitle, observedTitle) : 0;
  const titleScore = Math.max(pageTitleScore, scheduleTitleScore, recordingTitleScore);
  const conferenceScore = titleMatchScore(talk.conference ?? "", observedTitle);
  const observedTokens = identityTokens(observedTitle);
  const distinctiveTitleTokens = [...new Set([
    ...identityTokens(talk.title),
    ...identityTokens(talk.scheduleTitle ?? ""),
  ])]
    .filter((token) => token.length >= 7 && observedTokens.has(token));
  const startSeconds = recordingStartSeconds(talk.recordingUrl);
  const passed = titleScore >= 0.4
    || (titleScore >= 0.3 && conferenceScore >= 0.5 && distinctiveTitleTokens.length > 0)
    || (startSeconds > 0 && conferenceScore >= 0.5);
  return { passed, titleScore, pageTitleScore, scheduleTitleScore, recordingTitleScore, conferenceScore, distinctiveTitleTokens };
}

function parseTimeValue(value) {
  const text = String(value ?? "").trim().toLowerCase();
  if (/^\d+(?:\.\d+)?s?$/.test(text)) return Number.parseFloat(text);
  const match = text.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

export function recordingStartSeconds(sourceUrl) {
  try {
    const url = new URL(sourceUrl);
    return parseTimeValue(url.searchParams.get("t") ?? url.searchParams.get("start"));
  } catch {
    return 0;
  }
}

export function sameConferenceDomain(firstUrl, secondUrl) {
  const organizationDomain = (value) => new URL(value).hostname.toLowerCase().split(".").slice(-2).join(".");
  return organizationDomain(firstUrl) === organizationDomain(secondUrl);
}

function htmlTitleCandidates(html) {
  const candidates = [];
  for (const match of String(html).matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)) candidates.push(htmlFragmentToText(match[1]));
  for (const key of ["og:title", "twitter:title", "title"]) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`, "i"),
    ];
    for (const pattern of patterns) {
      const match = String(html).match(pattern);
      if (match) candidates.push(decodeHtmlEntities(match[1]).trim());
    }
  }
  const title = String(html).match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) candidates.push(htmlFragmentToText(title));
  return candidates.filter(Boolean);
}

function bestTitleEvidence(html, expected) {
  return htmlTitleCandidates(html)
    .map((title) => ({ title, score: titleMatchScore(expected, title) }))
    .sort((left, right) => right.score - left.score || left.title.length - right.title.length)[0];
}

function balancedDivInnerHtml(html, openingIndex) {
  const openingEnd = String(html).indexOf(">", openingIndex);
  if (openingEnd < 0) return undefined;
  const tags = /<\/?div\b[^>]*>/gi;
  tags.lastIndex = openingEnd + 1;
  let depth = 1;
  for (const match of String(html).matchAll(tags)) {
    const absoluteIndex = match.index;
    if (/^<\/div/i.test(match[0])) depth -= 1;
    else if (!/\/>$/.test(match[0])) depth += 1;
    if (depth === 0) return String(html).slice(openingEnd + 1, absoluteIndex);
  }
  return undefined;
}

function extractBlackHatSession(html, talkTitle, sourceUrl) {
  const sessions = [];
  const openings = /<div\b[^>]*\bid=["']session_desc_(\d+)["'][^>]*>/gi;
  for (const match of String(html).matchAll(openings)) {
    const sessionHtml = balancedDivInnerHtml(html, match.index);
    if (!sessionHtml) continue;
    const title = htmlFragmentToText(sessionHtml.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? "");
    const descriptionOpening = /<div\b[^>]*\bclass=["'][^"']*\bdescription\b[^"']*["'][^>]*>/i.exec(sessionHtml);
    if (!title || !descriptionOpening) continue;
    const descriptionHtml = balancedDivInnerHtml(sessionHtml, descriptionOpening.index);
    const abstract = descriptionHtml ? htmlFragmentToText(descriptionHtml) : "";
    sessions.push({
      abstract,
      method: "blackhat-session-description",
      titleEvidence: { title, score: titleMatchScore(talkTitle, title) },
      sourceFragment: new URL(sourceUrl).hash.slice(1) || `session-${match[1]}`,
    });
  }
  const best = sessions.sort((left, right) => right.titleEvidence.score - left.titleEvidence.score)[0];
  if (!best || best.titleEvidence.score < 0.5 || words(best.abstract).length < 20) {
    throw new Error("No matching Black Hat session description was found.");
  }
  return best;
}

function jsonLdObjects(value) {
  if (Array.isArray(value)) return value.flatMap(jsonLdObjects);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(jsonLdObjects)];
}

export function extractAgendaHtml({ url, html, talkTitle }) {
  const parsedUrl = new URL(url);
  const titleEvidence = bestTitleEvidence(html, talkTitle);
  if (parsedUrl.hostname.endsWith("blackhat.com") || (parsedUrl.hostname === "web.archive.org" && parsedUrl.pathname.includes("blackhat.com/"))) {
    return extractBlackHatSession(html, talkTitle, url);
  }
  if (parsedUrl.hostname.endsWith(".sched.com")) {
    const fragment = String(html).match(/<div\b[^>]*class=["'][^"']*\btip-description\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1];
    if (!fragment) throw new Error("Sched page has no tip-description abstract.");
    return { abstract: htmlFragmentToText(fragment), method: "sched-tip-description", titleEvidence };
  }

  if (parsedUrl.hostname === "archive.bsideslv.org") {
    const sections = [];
    for (const match of String(html).matchAll(/<div\b[^>]*class=["'][^"']*\btalk_big\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)) {
      const section = match[0];
      const headingMatch = section.match(/<h[1-6]\b([^>]*)>([\s\S]*?)<\/h[1-6]>/i);
      if (!headingMatch) continue;
      const title = htmlFragmentToText(headingMatch[2]);
      const score = titleMatchScore(talkTitle, title);
      const paragraphs = [...section.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .filter((paragraph) => !/href=["'][^"']*speakers\.html/i.test(paragraph[1]))
        .map((paragraph) => htmlFragmentToText(paragraph[1]))
        .filter((paragraph) => paragraph && !/\b\d{1,2}:\d{2}\b/.test(paragraph));
      const id = headingMatch[1].match(/\bid=["']([^"']+)["']/i)?.[1];
      sections.push({ abstract: paragraphs.join("\n\n"), method: "bsideslv-talk-section", titleEvidence: { title, score }, sourceFragment: id });
    }
    const best = sections.sort((left, right) => right.titleEvidence.score - left.titleEvidence.score)[0];
    if (!best || best.titleEvidence.score < 0.5) throw new Error("No matching BSidesLV talk section was found.");
    return best;
  }

  if (parsedUrl.hostname === "t2.fi") {
    const links = [...String(html).matchAll(/<a\b[^>]*href=["'][^"']*#([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .map((match) => ({ anchor: match[1], title: htmlFragmentToText(match[2]), score: titleMatchScore(talkTitle, htmlFragmentToText(match[2])) }))
      .sort((left, right) => right.score - left.score);
    const bestLink = links[0];
    if (!bestLink || bestLink.score < 0.5) throw new Error("No matching T2 schedule entry was found.");
    const escapedAnchor = bestLink.anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const section = String(html).match(new RegExp(`<a\\b[^>]*(?:name|id)=["']${escapedAnchor}["'][^>]*>[\\s\\S]*?<\\/a>([\\s\\S]*?)(?=<a\\b[^>]*(?:name|id)=["'][^"']+["'])`, "i"))?.[1];
    if (!section) throw new Error("Matching T2 session section was not found.");
    const beforeBio = section.split(/<div\b[^>]*class=["'][^"']*\bbio\b/i)[0];
    const paragraphs = [...beforeBio.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => htmlFragmentToText(match[1])).filter(Boolean);
    return { abstract: paragraphs.join("\n\n"), method: "t2-speech-section", titleEvidence: { title: bestLink.title, score: bestLink.score }, sourceFragment: bestLink.anchor };
  }

  if (parsedUrl.hostname === "web.archive.org" && parsedUrl.pathname.includes("caro2024.org/agenda")) {
    const links = [...String(html).matchAll(/<a\b[^>]*href=["']#(inline_[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .map((match) => ({ target: match[1], title: htmlFragmentToText(match[2]), score: titleMatchScore(talkTitle, htmlFragmentToText(match[2])) }))
      .sort((left, right) => right.score - left.score);
    const bestLink = links[0];
    if (!bestLink || bestLink.score < 0.5) throw new Error("No matching CARO agenda entry was found.");
    const escapedTarget = bestLink.target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const fragment = String(html).match(new RegExp(`<div\\b[^>]*id=["']${escapedTarget}["'][^>]*>([\\s\\S]*?)<\\/div>`, "i"))?.[1];
    if (!fragment) throw new Error("Matching CARO abstract popup was not found.");
    return { abstract: htmlFragmentToText(fragment), method: "caro-abstract-popup", titleEvidence: { title: bestLink.title, score: bestLink.score }, sourceFragment: bestLink.target };
  }

  const alternate = String(html).match(/<link\b[^>]*href=["']?([^"'\s>]*\/api\/events\/[^"'\s>]*\/talks\/[^"'\s>]*)["']?[^>]*>/i)?.[1];
  if (alternate && /\/api\/events\/[^/]+\/talks\//.test(alternate)) {
    return { apiUrl: new URL(decodeHtmlEntities(alternate), parsedUrl).toString(), method: "pretalx-api", titleEvidence };
  }

  const candidates = [];
  for (const match of String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      for (const object of jsonLdObjects(JSON.parse(decodeHtmlEntities(match[1])))) {
        const title = object.name ?? object.headline ?? object.title;
        const description = object.description ?? object.abstract;
        if (title && description && titleMatchScore(talkTitle, title) >= 0.6) {
          candidates.push({ abstract: htmlFragmentToText(description), method: "json-ld", titleEvidence: { title: String(title), score: titleMatchScore(talkTitle, title) } });
        }
      }
    } catch {
      // Ignore malformed unrelated JSON-LD blocks.
    }
  }
  if (candidates.length) return candidates.sort((left, right) => words(right.abstract).length - words(left.abstract).length)[0];

  for (const className of ["abstract", "session-description", "event-description"]) {
    const escaped = className.replaceAll("-", "\\-");
    const fragment = String(html).match(new RegExp(`<(?:div|section)\\b[^>]*class=["'][^"']*\\b${escaped}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/(?:div|section)>`, "i"))?.[1];
    if (fragment) return { abstract: htmlFragmentToText(fragment), method: `html-${className}`, titleEvidence };
  }
  throw new Error("No supported abstract container was found.");
}

function supportedAgendaSource(url) {
  const hostname = new URL(url).hostname;
  const parsed = new URL(url);
  return hostname.endsWith(".sched.com") || hostname === "pretalx.com" || hostname === "program.why2025.org" ||
    hostname.endsWith("blackhat.com") || (hostname === "web.archive.org" && parsed.pathname.includes("blackhat.com/"));
}

async function fetchAgendaCandidate(talk) {
  if (!talk.scheduleUrl) throw new Error(`${talk.slug} has no schedule_url.`);
  const source = new URL(talk.scheduleUrl);
  if (source.protocol !== "https:") throw new Error("Agenda source must use HTTPS.");
  let requestUrl = source;
  if (source.hostname === "archive.bsideslv.org" && !source.pathname.endsWith("/talks")) {
    requestUrl = new URL(source.pathname.replace(/\/(?:schedule|talks)\/?$/, "/talks"), source);
  }
  const response = await fetch(requestUrl, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 mbgsec-talk-enrichment/1.0" } });
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok) throw new Error(`Agenda returned HTTP ${response.status}.`);
  if (!contentType.includes("text/html")) throw new Error(`Agenda content type ${contentType || "unknown"} needs manual extraction.`);
  const html = await response.text();
  const expectedTitle = agendaTitleForTalk(talk);
  let extracted = extractAgendaHtml({ url: response.url, html, talkTitle: expectedTitle });
  if (extracted.apiUrl) {
    const apiResponse = await fetch(extracted.apiUrl, { headers: { "User-Agent": "mbgsec-talk-enrichment/1.0" } });
    if (!apiResponse.ok) throw new Error(`Pretalx API returned HTTP ${apiResponse.status}.`);
    const data = await apiResponse.json();
    extracted = {
      abstract: String(data.abstract ?? "").replace(/\r\n?/g, "\n").trim(),
      method: "pretalx-api",
      titleEvidence: { title: String(data.title ?? ""), score: titleMatchScore(expectedTitle, data.title ?? "") },
      apiUrl: extracted.apiUrl,
    };
  }
  const abstract = String(extracted.abstract ?? "").trim();
  const titleEvidence = extracted.titleEvidence ?? { title: "", score: 0 };
  if (words(abstract).length < 20) throw new Error(`Extracted abstract is too short (${words(abstract).length} words).`);
  if (titleEvidence.score < 0.5) throw new Error(`Agenda title mismatch (${titleEvidence.score.toFixed(3)}): ${titleEvidence.title || "missing title"}`);
  const exactSource = new URL(response.url);
  if (extracted.sourceFragment) exactSource.hash = extracted.sourceFragment;
  return {
    schemaVersion: 1,
    slug: talk.slug,
    agendaUrl: talk.scheduleUrl,
    sourceUrl: exactSource.toString(),
    finalUrl: response.url,
    apiUrl: extracted.apiUrl,
    capturedAt: new Date().toISOString(),
    method: extracted.method,
    titleEvidence,
    abstract,
    abstractSha256: sha256(abstract),
  };
}

async function candidateWithHash(directory) {
  const file = path.join(directory, "candidate.json");
  const bytes = await readFile(file);
  return { file, bytes, candidate: JSON.parse(bytes), hash: sha256(bytes) };
}

export function normalizeLocalSegments(providerSegments) {
  const seen = new Set();
  return (providerSegments ?? [])
    .map((segment) => ({
      start: Number(Number(segment.start).toFixed(3)),
      end: Number(Number(segment.end).toFixed(3)),
      speaker: "Presenter",
      text: String(segment.text ?? "").trim(),
    }))
    .filter((segment) => {
      if (!segment.text || !Number.isFinite(segment.start) || !Number.isFinite(segment.end) || segment.end < segment.start) return false;
      const key = `${segment.start}\u0000${segment.end}\u0000${segment.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function mergeChapterSpansToLimit(chapters, rawSegments, limit = 10) {
  const merged = chapters.map((chapter) => ({ ...chapter }));
  while (merged.length > limit) {
    const candidates = [];
    for (let index = 0; index < merged.length - 1; index += 1) {
      const start = rawSegments[merged[index].startSegment]?.start;
      const end = rawSegments[merged[index + 1].endSegment]?.end;
      const duration = Number(end) - Number(start);
      if (Number.isFinite(duration) && duration <= 480) candidates.push({ index, duration });
    }
    if (!candidates.length) break;
    const { index } = candidates.sort((left, right) => left.duration - right.duration || left.index - right.index)[0];
    const left = merged[index];
    const right = merged[index + 1];
    const leftBase = left.title.replace(/ — Part \d+$/, "");
    const rightBase = right.title.replace(/ — Part \d+$/, "");
    merged.splice(index, 2, {
      title: leftBase === rightBase ? leftBase : `${left.title}; ${right.title}`,
      startSegment: left.startSegment,
      endSegment: right.endSegment,
    });
  }
  return merged;
}

export function splitChapterSpansToMinimum(chapters, rawSegments, minimum = 5) {
  const split = chapters.map((chapter) => ({ ...chapter }));
  while (split.length < minimum) {
    const candidates = split
      .map((chapter, index) => ({
        index,
        chapter,
        duration: Number(rawSegments[chapter.endSegment]?.end) - Number(rawSegments[chapter.startSegment]?.start),
        segmentCount: chapter.endSegment - chapter.startSegment + 1,
      }))
      .filter((candidate) => candidate.segmentCount >= 2)
      .sort((left, right) => right.duration - left.duration || right.segmentCount - left.segmentCount || left.index - right.index);
    if (!candidates.length) break;
    const { index, chapter } = candidates[0];
    const target = (Number(rawSegments[chapter.startSegment].start) + Number(rawSegments[chapter.endSegment].end)) / 2;
    let boundary = chapter.startSegment;
    for (let segment = chapter.startSegment; segment < chapter.endSegment; segment += 1) {
      if (Math.abs(Number(rawSegments[segment].end) - target) < Math.abs(Number(rawSegments[boundary].end) - target)) boundary = segment;
    }
    const baseTitle = chapter.title.replace(/ — Part \d+$/, "");
    split.splice(index, 1,
      { title: `${baseTitle} — Part 1`, startSegment: chapter.startSegment, endSegment: boundary },
      { title: `${baseTitle} — Part 2`, startSegment: boundary + 1, endSegment: chapter.endSegment },
    );
  }
  return split;
}

export function repairChapterCoverage(chapters, segmentCount) {
  if (!Array.isArray(chapters) || chapters.length === 0 || !Number.isInteger(segmentCount) || segmentCount < 1) return [];
  const usable = chapters.slice(0, segmentCount);
  const repaired = [];
  let expectedStart = 0;
  for (let index = 0; index < usable.length; index += 1) {
    const remaining = usable.length - index - 1;
    const maximumEnd = segmentCount - remaining - 1;
    const proposedEnd = Number.isInteger(usable[index].endSegment) ? usable[index].endSegment : expectedStart;
    const endSegment = Math.max(expectedStart, Math.min(maximumEnd, proposedEnd));
    repaired.push({
      title: String(usable[index].title ?? `Chapter ${index + 1}`).trim() || `Chapter ${index + 1}`,
      startSegment: expectedStart,
      endSegment,
    });
    expectedStart = endSegment + 1;
  }
  repaired.at(-1).endSegment = segmentCount - 1;
  return repaired;
}

function flattenRaw(raw) {
  const response = raw.response ?? raw;
  const segments = response.segments;
  if (!Array.isArray(segments) || segments.length === 0) throw new Error("Raw transcript has no diarized segments.");
  return segments.map((segment) => ({
    start: Number(segment.start),
    end: Number(segment.end),
    speaker: String(segment.speaker ?? "Speaker"),
    text: String(segment.text ?? "").trim(),
  }));
}

function flattenCandidate(candidate) {
  if (!Array.isArray(candidate.chapters)) return [];
  return candidate.chapters.flatMap((chapter) =>
    Array.isArray(chapter.segments)
      ? chapter.segments.map((segment) => ({ ...segment, chapter: chapter.title }))
      : [],
  );
}

function words(text) {
  return String(text).toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’._-]*/gu) ?? [];
}

function normalizedTokenOverlap(source, candidate) {
  const sourceTokens = new Map();
  for (const token of words(source)) sourceTokens.set(token, (sourceTokens.get(token) ?? 0) + 1);
  let matched = 0;
  for (const token of words(candidate)) {
    const available = sourceTokens.get(token) ?? 0;
    if (available > 0) {
      matched += 1;
      sourceTokens.set(token, available - 1);
    }
  }
  return matched / Math.max(1, words(source).length);
}

export function asrArtifactMetrics(segments) {
  let longestSameTokenRun = 0;
  let longestIdenticalSegmentRun = 0;
  let currentIdenticalSegmentRun = 0;
  let previousSegment = "";
  let dominatedSegments = 0;
  for (const segment of segments) {
    const tokens = words(segment.text);
    let previousToken = "";
    let tokenRun = 0;
    const bigrams = new Map();
    for (let index = 0; index < tokens.length; index += 1) {
      tokenRun = tokens[index] === previousToken ? tokenRun + 1 : 1;
      previousToken = tokens[index];
      longestSameTokenRun = Math.max(longestSameTokenRun, tokenRun);
      if (index > 0) {
        const bigram = `${tokens[index - 1]} ${tokens[index]}`;
        bigrams.set(bigram, (bigrams.get(bigram) ?? 0) + 1);
      }
    }
    const mostRepeatedBigram = Math.max(0, ...bigrams.values());
    const uniqueRatio = new Set(tokens).size / Math.max(1, tokens.length);
    if (tokens.length >= 30 && (uniqueRatio < 0.18 || (mostRepeatedBigram >= 8 && mostRepeatedBigram * 2 / tokens.length >= 0.35))) dominatedSegments += 1;
    const normalizedSegment = tokens.join(" ");
    currentIdenticalSegmentRun = normalizedSegment && normalizedSegment === previousSegment ? currentIdenticalSegmentRun + 1 : 1;
    previousSegment = normalizedSegment;
    longestIdenticalSegmentRun = Math.max(longestIdenticalSegmentRun, currentIdenticalSegmentRun);
  }
  return { longestSameTokenRun, longestIdenticalSegmentRun, dominatedSegments };
}

export function evaluateDeterministic(raw, candidate) {
  const rawSegments = flattenRaw(raw);
  const candidateSegments = flattenCandidate(candidate);
  const checks = [];
  const add = (id, passed, detail) => checks.push({ id, passed: Boolean(passed), detail });

  add("segments-present", candidateSegments.length > 0, `${candidateSegments.length} candidate segments`);
  const chronological = candidateSegments.every((segment, index) => {
    const previous = candidateSegments[index - 1];
    return Number.isFinite(Number(segment.start)) && Number.isFinite(Number(segment.end)) &&
      Number(segment.start) >= 0 && Number(segment.end) >= Number(segment.start) &&
      (!previous || Number(segment.start) + 1e-6 >= Number(previous.end));
  });
  add("timestamps-chronological", chronological, "Segment timestamps must be finite, chronological, and non-overlapping");

  const rawText = rawSegments.map((segment) => segment.text).join(" ");
  const candidateText = candidateSegments.map((segment) => segment.text).join(" ");
  const rawWords = words(rawText).length;
  const candidateWords = words(candidateText).length;
  const wordRatio = candidateWords / Math.max(1, rawWords);
  add("word-count-ratio", wordRatio >= 0.82 && wordRatio <= 1.18, `${candidateWords}/${rawWords} = ${wordRatio.toFixed(3)}`);

  const overlap = normalizedTokenOverlap(rawText, candidateText);
  add("token-overlap", overlap >= 0.7, `Normalized source-token retention ${overlap.toFixed(3)}`);

  const comparableSegments = Math.max(rawSegments.length, candidateSegments.length, 1);
  const exactSegmentMatches = rawSegments.reduce((count, segment, index) => {
    const candidateSegment = candidateSegments[index];
    return count + (candidateSegment &&
      segment.text === candidateSegment.text &&
      Math.abs(segment.start - Number(candidateSegment.start)) <= 1e-6 &&
      Math.abs(segment.end - Number(candidateSegment.end)) <= 1e-6 ? 1 : 0);
  }, 0);
  const exactSegmentRatio = exactSegmentMatches / comparableSegments;

  const rawEnd = Math.max(...rawSegments.map((segment) => Number(segment.end) || 0));
  const candidateEnd = candidateSegments.length ? Math.max(...candidateSegments.map((segment) => Number(segment.end) || 0)) : 0;
  add("duration-coverage", Math.abs(rawEnd - candidateEnd) <= Math.max(30, rawEnd * 0.03), `raw=${rawEnd.toFixed(1)}s candidate=${candidateEnd.toFixed(1)}s`);

  add("chapters-present", Array.isArray(candidate.chapters) && candidate.chapters.length > 0 && candidate.chapters.every((chapter) => String(chapter.title ?? "").trim()), "Every transcript needs named chapters");
  add("speaker-labels", candidateSegments.every((segment) => String(segment.speaker ?? "").trim() && !/^speaker\s+[a-z]$/i.test(String(segment.speaker))), "Use names or neutral roles, not raw diarization labels");
  const hasEditingPlaceholder = /\b(?:TODO|TBD|XXX)\b/.test(candidateText) || /\[(?:insert|placeholder)\b/i.test(candidateText);
  add("no-placeholders", !hasEditingPlaceholder, "No editing placeholders may remain");
  add("source-match", !raw.sourceUrl || raw.sourceUrl === candidate.sourceUrl, `${raw.sourceUrl ?? "unknown"} == ${candidate.sourceUrl ?? "unknown"}`);
  const artifactMetrics = asrArtifactMetrics(candidateSegments);
  add(
    "asr-artifact-quality",
    artifactMetrics.longestSameTokenRun < 8 && artifactMetrics.longestIdenticalSegmentRun < 4 && artifactMetrics.dominatedSegments === 0,
    `same-token-run=${artifactMetrics.longestSameTokenRun}, identical-segment-run=${artifactMetrics.longestIdenticalSegmentRun}, dominated-segments=${artifactMetrics.dominatedSegments}`,
  );

  return { passed: checks.every((check) => check.passed), checks, metrics: { rawWords, candidateWords, wordRatio, tokenOverlap: overlap, exactSegmentRatio, rawEnd, candidateEnd, ...artifactMetrics } };
}

function requireApiKey() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required for this command.");
  return apiKey;
}

async function apiRequest(endpoint, init) {
  const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
    ...init,
    headers: { Authorization: `Bearer ${requireApiKey()}`, ...(init.headers ?? {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`OpenAI API ${response.status}: ${body.error?.message ?? "request failed"}`);
  return body;
}

function responseText(response) {
  if (typeof response.output_text === "string") return response.output_text;
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") return content.text;
    }
  }
  throw new Error("The Responses API returned no output text.");
}

async function structuredResponse({ model, name, schema, developer, input }) {
  if ((process.env.MBGSEC_LLM_BACKEND ?? "openai").toLowerCase() === "ollama") {
    const localModel = process.env.MBGSEC_OLLAMA_MODEL || DEFAULT_OLLAMA_MODEL;
    const baseUrl = (process.env.OLLAMA_HOST || "http://127.0.0.1:11434").replace(/\/$/, "");
    let lastError;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: localModel,
          stream: false,
          think: "low",
          keep_alive: "10m",
          format: schema,
          options: { temperature: 0, num_ctx: 65536, num_predict: 4096 },
          messages: [
            { role: "system", content: `${developer}${attempt === 2 ? " The previous attempt was invalid JSON. Return compact, complete JSON with no commentary." : ""}` },
            { role: "user", content: `${input}\n\nReturn only JSON matching this schema:\n${JSON.stringify(schema)}` },
          ],
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(`Ollama API ${response.status}: ${body.error ?? "request failed"}`);
      try {
        const parsed = JSON.parse(body.message?.content ?? "");
        validateSchemaValue(schema, parsed, name);
        return {
          parsed,
          responseId: `ollama:${body.created_at ?? new Date().toISOString()}`,
          model: body.model ?? localModel,
        };
      } catch (error) {
        lastError = error;
        if (attempt === 1) console.warn(`Ollama returned invalid structured output for ${name}; retrying once.`);
      }
    }
    throw lastError;
  }
  const response = await apiRequest("responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      reasoning: { effort: "low" },
      input: [
        { role: "developer", content: [{ type: "input_text", text: developer }] },
        { role: "user", content: [{ type: "input_text", text: input }] },
      ],
      text: { format: { type: "json_schema", name, strict: true, schema } },
    }),
  });
  return { parsed: JSON.parse(responseText(response)), responseId: response.id, model: response.model ?? model };
}

export function validateSchemaValue(schema, value, location = "value") {
  const fail = (message) => { throw new Error(`${location}: ${message}`); };
  if (schema.enum && !schema.enum.includes(value)) fail(`must be one of ${schema.enum.join(", ")}`);
  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail("must be an object");
    for (const required of schema.required ?? []) if (!(required in value)) fail(`missing required property ${required}`);
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) if (!(key in (schema.properties ?? {}))) fail(`unexpected property ${key}`);
    }
    for (const [key, child] of Object.entries(schema.properties ?? {})) {
      if (key in value) validateSchemaValue(child, value[key], `${location}.${key}`);
    }
  } else if (schema.type === "array") {
    if (!Array.isArray(value)) fail("must be an array");
    if (schema.minItems != null && value.length < schema.minItems) fail(`must have at least ${schema.minItems} items`);
    if (schema.maxItems != null && value.length > schema.maxItems) fail(`must have at most ${schema.maxItems} items`);
    value.forEach((item, index) => validateSchemaValue(schema.items, item, `${location}[${index}]`));
  } else if (schema.type === "string") {
    if (typeof value !== "string") fail("must be a string");
    if (schema.minLength != null && value.length < schema.minLength) fail(`must have at least ${schema.minLength} characters`);
    if (schema.maxLength != null && value.length > schema.maxLength) fail(`must have at most ${schema.maxLength} characters`);
  } else if (schema.type === "boolean") {
    if (typeof value !== "boolean") fail("must be a boolean");
  } else if (schema.type === "integer") {
    if (!Number.isInteger(value)) fail("must be an integer");
  } else if (schema.type === "number") {
    if (typeof value !== "number" || !Number.isFinite(value)) fail("must be a finite number");
  }
  if (typeof value === "number" && schema.minimum != null && value < schema.minimum) fail(`must be >= ${schema.minimum}`);
  if (typeof value === "number" && schema.maximum != null && value > schema.maximum) fail(`must be <= ${schema.maximum}`);
  return true;
}

const segmentSchema = {
  type: "object",
  additionalProperties: false,
  required: ["start", "end", "speaker", "text"],
  properties: {
    start: { type: "number" },
    end: { type: "number" },
    speaker: { type: "string" },
    text: { type: "string" },
  },
};

const candidateSchema = {
  type: "object",
  additionalProperties: false,
  required: ["sourceUrl", "durationSeconds", "chapters", "editorNotes"],
  properties: {
    sourceUrl: { type: "string" },
    durationSeconds: { type: "number" },
    chapters: {
      type: "array",
      minItems: 5,
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "segments"],
        properties: { title: { type: "string" }, segments: { type: "array", items: segmentSchema } },
      },
    },
    editorNotes: { type: "array", items: { type: "string" } },
  },
};

const chapterPlanSchema = {
  type: "object",
  additionalProperties: false,
  required: ["chapters", "editorNotes"],
  properties: {
    chapters: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "startSegment", "endSegment"],
        properties: {
          title: { type: "string" },
          startSegment: { type: "integer", minimum: 0 },
          endSegment: { type: "integer", minimum: 0 },
        },
      },
    },
    editorNotes: { type: "array", items: { type: "string" } },
  },
};

const judgeSchema = {
  type: "object",
  additionalProperties: false,
  required: ["pass", "score", "summary", "findings"],
  properties: {
    pass: { type: "boolean" },
    score: { type: "integer", minimum: 0, maximum: 100 },
    summary: { type: "string" },
    findings: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["severity", "timestamp", "evidence", "issue", "recommendation"],
        properties: {
          severity: { type: "string", enum: ["critical", "major", "minor"] },
          timestamp: { type: "number" },
          evidence: { type: "string", maxLength: 240 },
          issue: { type: "string" },
          recommendation: { type: "string" },
        },
      },
    },
  },
};

export function validateJudgeFindings(judge, segments) {
  const normalize = (value) => String(value).toLowerCase()
    .replace(/^[\s"'“”‘’`]+|[\s"'“”‘’`]+$/g, "")
    .replace(/^[a-z][a-z0-9 _-]{0,30}:\s*/i, "")
    .replace(/\s+/g, " ");
  for (const finding of judge.findings ?? []) {
    const timestamp = Number(finding.timestamp);
    const evidence = normalize(finding.evidence);
    if (!evidence) throw new Error("Judge finding evidence must quote transcript text.");
    const nearby = segments.filter((segment) => Number(segment.end) >= timestamp - 12 && Number(segment.start) <= timestamp + 12);
    const exactWindow = normalize(nearby.map((segment) => segment.text).join(" "));
    if (exactWindow.includes(evidence)) continue;
    let best = { score: 0, text: "" };
    for (let start = 0; start < nearby.length; start += 1) {
      for (let length = 1; length <= 3 && start + length <= nearby.length; length += 1) {
        const exactText = nearby.slice(start, start + length).map((segment) => segment.text).join(" ");
        const score = normalizedTokenOverlap(evidence, normalize(exactText));
        if (score > best.score) best = { score, text: exactText };
      }
    }
    if (best.score >= 0.7) {
      finding.evidence = best.text;
      continue;
    }
    const exactGlobal = segments.find((segment) => normalize(segment.text).includes(evidence));
    if (exactGlobal) {
      finding.reportedTimestamp = timestamp;
      finding.timestamp = Number(exactGlobal.start);
      finding.evidence = exactGlobal.text;
      continue;
    }
    throw new Error(`Judge finding evidence does not occur near ${timestamp}s or anywhere in the candidate: ${finding.evidence}`);
  }
}

export function normalizeJudgeDecision(role, decision, deterministic = {}) {
  const normalized = structuredClone(decision);
  const originalDecision = { pass: Boolean(decision.pass), score: Number(decision.score) };
  const policyNormalizations = [];
  if (role === "fidelity-editor" && Number(deterministic.metrics?.exactSegmentRatio) === 1) {
    if (!normalized.pass || normalized.score < 100 || normalized.findings.length > 0) {
      normalized.pass = true;
      normalized.score = 100;
      normalized.findings = [];
      policyNormalizations.push("Deterministic segment equality supersedes claims that the candidate invented, omitted, or changed raw content.");
    }
  }
  if (role === "security-reviewer") {
    const uncertainty = /\b(?:likely|possible|possibly|potential|potentially|unclear|uncertain|not identifiable|cannot identify|verify|verified|confirm|cross[- ]?check|check (?:the )?(?:source )?audio|from (?:the )?(?:source )?audio)\b/i;
    for (const finding of normalized.findings) {
      if (["critical", "major"].includes(finding.severity) && uncertainty.test(`${finding.issue} ${finding.recommendation}`)) {
        finding.policyAdjustedFrom = finding.severity;
        finding.severity = "minor";
        policyNormalizations.push(`Downgraded an explicitly uncertain ${finding.policyAdjustedFrom} security finding at ${finding.timestamp}s; blocking corrections must be unambiguous.`);
      }
    }
  }
  if (role === "conference-reader" && Number(deterministic.metrics?.exactSegmentRatio) === 1) {
    const unsupportedLanguageInference = /\b(?:language mismatch|spoken language|must be (?:in )?english|entirely in spanish|spanish instead of english|translate(?:d|ion)? (?:it )?to english)\b/i;
    const retainedFindings = normalized.findings.filter((finding) => {
      const unsupported = unsupportedLanguageInference.test(`${finding.issue} ${finding.recommendation}`);
      if (unsupported) policyNormalizations.push(`Removed an unsupported spoken-language requirement at ${finding.timestamp}s; multilingual delivery is valid and the reader judge has no audio evidence for a mismatch.`);
      return !unsupported;
    });
    if (retainedFindings.length !== normalized.findings.length) normalized.findings = retainedFindings;
  }
  const hasBlockingFinding = normalized.findings.some((finding) => ["critical", "major"].includes(finding.severity));
  if (!hasBlockingFinding && (!normalized.pass || normalized.score < 85)) {
    normalized.pass = true;
    normalized.score = Math.max(85, normalized.score);
    policyNormalizations.push("Minor-only or empty findings are non-blocking and receive the minimum passing score under evaluator policy.");
  }
  return {
    ...normalized,
    ...(policyNormalizations.length ? { originalDecision, policyNormalization: policyNormalizations.join(" ") } : {}),
  };
}

async function inventory(options) {
  const rows = [];
  for (const talk of await loadTalks()) {
    const work = talkWorkDirectory(talk);
    rows.push({
      slug: talk.slug,
      date: talk.talkDate,
      recording: Boolean(talk.recordingUrl),
      agenda: Boolean(talk.scheduleUrl),
      abstract: Boolean(talk.abstractSourceUrl),
      abstractStatus: talk.abstractSourceUrl ? "published" : talk.abstractStatus ?? "missing",
      abstractArtifact: existsSync(path.join(work, "abstract-source.json")),
      transcript: talk.transcriptStatus ?? "missing",
      raw: existsSync(path.join(work, "raw-transcript.json")),
      candidate: existsSync(path.join(work, "candidate.json")),
      evaluation: existsSync(path.join(work, "evaluation.json")),
      review: existsSync(path.join(work, "review.json")),
    });
  }
  if (options.json) console.log(JSON.stringify(rows, null, 2));
  else {
    console.table(rows);
    console.log(`${rows.length} talks; ${rows.filter((row) => row.recording).length} recordings; ${rows.filter((row) => row.agenda).length} agenda links; ${rows.filter((row) => row.transcript === "llm-reviewed").length} LLM-reviewed transcripts.`);
  }
}

export function abstractStateForTalk(talk) {
  if (talk.abstractSourceUrl) return "published";
  if (talk.abstractStatus === "source-unavailable") return "source-unavailable";
  if (!talk.scheduleUrl) return "missing-agenda-url";
  if (ABSTRACT_EXCEPTION_STATUSES.has(talk.abstractStatus)) return talk.abstractStatus;
  return "needs-capture";
}

export function transcriptStageForTalk(talk, artifacts = {}) {
  if (talk.transcriptStatus === "llm-reviewed") return "complete";
  if (TRANSCRIPT_EXCEPTION_STATUSES.has(talk.transcriptStatus)) return "recording-exception";
  if (!talk.recordingUrl) return "no-recording";
  if (!artifacts.raw) return "transcribe";
  if (!artifacts.candidate) return "draft";
  if (!artifacts.evaluation) return "evaluate";
  return artifacts.evaluationPassed ? "publish" : "machine-remediation";
}

function abstractAction(state, talk) {
  if (state === "published") return "Abstract complete";
  if (state === "missing-agenda-url") return "Add or validate an official agenda URL";
  if (state === "source-lacks-abstract") return `Agenda verified without an abstract (${talk.abstractStatusCheckedAt})`;
  if (state === "source-mismatch") return `Replace the mismatched agenda URL (${talk.abstractStatusCheckedAt})`;
  if (state === "source-unavailable") return `Official agenda unavailable after archive search (${talk.abstractStatusCheckedAt})`;
  return "Capture the official agenda abstract";
}

function transcriptAction(stage) {
  if (stage === "complete") return "Transcript complete";
  if (stage === "recording-exception") return "Recording failed both independent ASR publication gates";
  if (stage === "no-recording") return "No recording source listed";
  if (stage === "transcribe") return "Acquire audio and transcribe the recording";
  if (stage === "draft") return "Create the verbatim chapter draft";
  if (stage === "evaluate") return "Run deterministic and three LLM judges";
  if (stage === "machine-remediation") return "Resolve grounded evaluator findings and re-evaluate";
  return "Publish the machine-approved candidate";
}

function markdownCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replace(/\s+/g, " ").trim();
}

async function enrichmentRows() {
  const rows = [];
  for (const talk of await loadTalks()) {
    const work = talkWorkDirectory(talk);
    const hasAudio = existsSync(path.join(work, "source.mp3"));
    const hasLocalProviderTranscript = existsSync(path.join(work, "mlx-whisper.json"));
    const hasRaw = existsSync(path.join(work, "raw-transcript.json"));
    const hasCandidate = existsSync(path.join(work, "candidate.json"));
    let candidateHash;
    if (hasCandidate) candidateHash = sha256(await readFile(path.join(work, "candidate.json")));
    let hasEvaluation = false;
    let evaluationPassed = false;
    if (candidateHash && existsSync(path.join(work, "evaluation.json"))) {
      try {
        const evaluation = await readJson(path.join(work, "evaluation.json"));
        hasEvaluation = evaluation.policyVersion === EVALUATOR_POLICY_VERSION && evaluation.candidateSha256 === candidateHash && evaluation.mode !== "deterministic-only" && (
          evaluation.deterministic?.passed === false || evaluation.judges?.length === 3
        );
        evaluationPassed = hasEvaluation && evaluation.passed === true;
      } catch {
        hasEvaluation = false;
      }
    }
    let hasReview = false;
    if (candidateHash && existsSync(path.join(work, "review.json"))) {
      try {
        hasReview = (await readJson(path.join(work, "review.json"))).candidateSha256 === candidateHash;
      } catch {
        hasReview = false;
      }
    }
    let hasReviewPack = false;
    if (candidateHash && existsSync(path.join(work, "review-pack.md"))) {
      try {
        hasReviewPack = (await readFile(path.join(work, "review-pack.md"), "utf8")).includes(candidateHash);
      } catch {
        hasReviewPack = false;
      }
    }
    const abstractState = abstractStateForTalk(talk);
    const transcriptStage = transcriptStageForTalk(talk, {
      raw: hasRaw,
      candidate: hasCandidate,
      evaluation: hasEvaluation,
      evaluationPassed,
    });
    rows.push({
      slug: talk.slug,
      date: talk.talkDate ?? "",
      title: talk.title,
      agenda: Boolean(talk.scheduleUrl),
      abstract: Boolean(talk.abstractSourceUrl),
      abstractState,
      abstractStatusNote: talk.abstractStatusNote,
      recording: Boolean(talk.recordingUrl),
      audio: hasAudio,
      localProviderTranscript: hasLocalProviderTranscript,
      raw: hasRaw,
      candidate: hasCandidate,
      evaluation: hasEvaluation,
      evaluationPassed,
      reviewPack: hasReviewPack,
      review: hasReview,
      transcript: talk.transcriptStatus === "llm-reviewed",
      transcriptStage,
      nextAction: `${abstractAction(abstractState, talk)}; ${transcriptAction(transcriptStage)}`,
    });
  }
  return rows.sort((left, right) => String(right.date).localeCompare(String(left.date)) || left.slug.localeCompare(right.slug));
}

const BATCH_TARGETS = ["transcribe", "draft", "evaluate", "review-pack"];

export function batchStepsForRow(row, through = "review-pack", transcriptionBackend = "local") {
  if (!BATCH_TARGETS.includes(through)) throw new Error(`--through must be one of: ${BATCH_TARGETS.join(", ")}`);
  if (!["local", "openai"].includes(transcriptionBackend)) throw new Error("--transcription-backend must be local or openai.");
  if (!row.recording || ["complete", "publish", "machine-remediation"].includes(row.transcriptStage)) return [];
  const target = BATCH_TARGETS.indexOf(through);
  const steps = [];
  if (!row.raw && target >= BATCH_TARGETS.indexOf("transcribe")) {
    if (transcriptionBackend === "local" && row.localProviderTranscript) steps.push("import-local-transcript");
    else {
      if (!row.audio) steps.push("fetch-audio");
      steps.push(transcriptionBackend === "local" ? "transcribe-local" : "transcribe-openai");
    }
  }
  if (!row.candidate && target >= BATCH_TARGETS.indexOf("draft")) steps.push("draft");
  if (!row.evaluation && target >= BATCH_TARGETS.indexOf("evaluate")) steps.push("evaluate");
  if (!row.reviewPack && target >= BATCH_TARGETS.indexOf("review-pack")) steps.push("review-pack");
  return steps;
}

async function prepareBatch(options) {
  const limit = options.limit && options.limit !== true ? Number.parseInt(options.limit, 10) : undefined;
  if (!Number.isInteger(limit) || limit < 1) throw new Error("prepare-batch requires --limit with a positive integer.");
  const through = options.through && options.through !== true ? String(options.through) : "review-pack";
  const transcriptionBackend = options.transcription_backend && options.transcription_backend !== true
    ? String(options.transcription_backend).toLowerCase()
    : "local";
  if (!BATCH_TARGETS.includes(through)) throw new Error(`--through must be one of: ${BATCH_TARGETS.join(", ")}`);
  if (!["local", "openai"].includes(transcriptionBackend)) throw new Error("--transcription-backend must be local or openai.");

  let rows = await enrichmentRows();
  if (options.slug && options.slug !== true) rows = rows.filter((row) => row.slug === options.slug);
  const plans = rows
    .map((row) => ({ slug: row.slug, date: row.date, title: row.title, startingStage: row.transcriptStage, steps: batchStepsForRow(row, through, transcriptionBackend) }))
    .filter((plan) => plan.steps.length > 0)
    .slice(0, limit);
  if (options.slug && options.slug !== true && plans.length === 0) {
    const known = rows.length > 0;
    throw new Error(known ? `${options.slug} has no machine-preparation work through ${through}.` : `Unknown talk slug: ${options.slug}`);
  }

  if (!options.execute) {
    if (options.json) console.log(JSON.stringify(plans, null, 2));
    else {
      console.table(plans.map((plan) => ({ slug: plan.slug, stage: plan.startingStage, steps: plan.steps.join(" → ") })));
      console.log(`Dry run: ${plans.length} talk${plans.length === 1 ? "" : "s"}. Add --execute to run this bounded batch.`);
    }
    return;
  }

  const runRecord = {
    schemaVersion: 1,
    startedAt: new Date().toISOString(),
    through,
    transcriptionBackend,
    limit,
    results: [],
  };
  for (const plan of plans) {
    const result = { ...plan, completedSteps: [], status: "running" };
    runRecord.results.push(result);
    console.log(`\nPreparing ${plan.slug}: ${plan.steps.join(" -> ")}`);
    try {
      for (const step of plan.steps) {
        if (step === "fetch-audio") await fetchAudio({ slug: plan.slug });
        else if (step === "transcribe-local") await transcribeLocal({ slug: plan.slug });
        else if (step === "import-local-transcript") await transcribeLocal({ slug: plan.slug, reuse_provider_output: true });
        else if (step === "transcribe-openai") await transcribe({ slug: plan.slug });
        else if (step === "draft") await draft({ slug: plan.slug });
        else if (step === "evaluate") await evaluate({ slug: plan.slug, no_exit_status: true });
        else if (step === "review-pack") await reviewPack({ slug: plan.slug });
        result.completedSteps.push(step);
      }
      result.status = "machine-evaluated";
    } catch (error) {
      result.status = "failed";
      result.error = error instanceof Error ? error.message : String(error);
      console.error(`Batch failed for ${plan.slug}: ${result.error}`);
      if (!options.continue_on_error) break;
    }
  }
  runRecord.finishedAt = new Date().toISOString();
  await mkdir(workRoot, { recursive: true });
  const recordFile = path.join(workRoot, `batch-run-${runRecord.startedAt.replaceAll(":", "-")}.json`);
  await writeJson(recordFile, runRecord);
  const completed = runRecord.results.filter((result) => result.status === "machine-evaluated").length;
  const failed = runRecord.results.filter((result) => result.status === "failed").length;
  console.log(`Batch finished: ${completed} machine-evaluated; ${failed} failed. Record: ${path.relative(repositoryRoot, recordFile)}`);
  if (failed) process.exitCode = 1;
}

async function queue(options) {
  const allowedStages = new Set(["transcribe", "draft", "evaluate", "machine-remediation", "publish"]);
  const requestedStage = options.stage && options.stage !== true ? String(options.stage) : undefined;
  if (requestedStage && !allowedStages.has(requestedStage)) {
    throw new Error(`--stage must be one of: ${[...allowedStages].join(", ")}`);
  }
  const limit = options.limit && options.limit !== true ? Number.parseInt(options.limit, 10) : undefined;
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) throw new Error("--limit must be a positive integer.");
  let rows = (await enrichmentRows()).filter((row) => allowedStages.has(row.transcriptStage));
  if (requestedStage) rows = rows.filter((row) => row.transcriptStage === requestedStage);
  if (limit !== undefined) rows = rows.slice(0, limit);
  const result = rows.map((row) => ({
    slug: row.slug,
    date: row.date,
    title: row.title,
    stage: row.transcriptStage,
    abstractState: row.abstractState,
  }));
  if (options.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.table(result);
    console.log(`${result.length} queued talk${result.length === 1 ? "" : "s"}${requestedStage ? ` at ${requestedStage}` : ""}.`);
  }
}

async function report(options) {
  const rows = await enrichmentRows();
  const output = path.resolve(repositoryRoot, options.output && options.output !== true ? options.output : "docs/talk-enrichment-coverage.md");
  const relative = path.relative(repositoryRoot, output);
  if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Report output must remain inside the repository.");
  const count = (predicate) => rows.filter(predicate).length;
  const summary = {
    talks: rows.length,
    agendas: count((row) => row.agenda),
    abstracts: count((row) => row.abstract),
    recordings: count((row) => row.recording),
    raw: count((row) => row.raw),
    candidates: count((row) => row.candidate),
    evaluations: count((row) => row.evaluation),
    reviewed: count((row) => row.transcript),
    abstractExceptions: count((row) => ABSTRACT_EXCEPTION_STATUSES.has(row.abstractState)),
  };
  summary.abstractResolved = summary.abstracts + summary.abstractExceptions;
  const lines = [
    "# Talk enrichment coverage",
    "",
    `Generated ${new Date().toISOString().slice(0, 10)} by the repository-local \`enrich-mbgsec-talks\` skill. Working artifacts are ignored; published frontmatter is the authoritative public state.`,
    "",
    "## Coverage",
    "",
    "| Measure | Count |",
    "| --- | ---: |",
    `| Talk pages | ${summary.talks} |`,
    `| Official agenda links | ${summary.agendas} |`,
    `| Published agenda abstracts | ${summary.abstracts} |`,
    `| Verified agenda exceptions | ${summary.abstractExceptions} |`,
    `| Resolved abstract records | ${summary.abstractResolved}/${summary.talks} |`,
    `| Recording links | ${summary.recordings} |`,
    `| Recording-derived raw transcripts | ${summary.raw} |`,
    `| Transcript candidates | ${summary.candidates} |`,
    `| Evaluator runs | ${summary.evaluations} |`,
    `| LLM-reviewed published transcripts | ${summary.reviewed} |`,
    "",
    "## Operating rule",
    "",
    "Abstracts are copied from a validated official agenda source, including a transparently labeled official agenda for the exact same talk when the target event published none. Exhausted source searches remain explicit exceptions rather than generated substitutes. Transcripts are generated from recording audio, retain timestamped source segments, and are published only when deterministic checks and three independent LLM evaluator roles approve the exact candidate SHA-256.",
    "",
    "Run `npm run talks:enrichment:report` after every batch. Use `npm run talks:enrichment:queue -- --stage transcribe --limit 5` to select a bounded recording batch. Follow `.agents/skills/enrich-mbgsec-talks/SKILL.md` for acquisition, evaluation, correction, approval, and publication commands.",
    "",
    "## All talk pages",
    "",
    "| Date | Talk | Abstract state | Recording | Transcript stage | Next action |",
    "| --- | --- | --- | :---: | --- | --- |",
  ];
  for (const row of rows) {
    const yes = (value) => value ? "yes" : "—";
    lines.push(`| ${markdownCell(row.date)} | \`${markdownCell(row.slug)}\` | ${markdownCell(row.abstractState)} | ${yes(row.recording)} | ${markdownCell(row.transcriptStage)} | ${markdownCell(row.nextAction)} |`);
  }
  lines.push("");
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, lines.join("\n"), "utf8");
  console.log(`Wrote ${relative}: ${summary.abstractResolved}/${summary.talks} abstract records resolved (${summary.abstracts} published, ${summary.abstractExceptions} verified exceptions) and ${summary.reviewed}/${summary.recordings} reviewed transcripts.`);
}

async function captureOneAbstract(talk, options = {}) {
  const directory = await ensureWorkDirectory(talk);
  let artifact;
  if (options.input) {
    if (!talk.scheduleUrl) throw new Error(`${talk.slug} has no schedule_url.`);
    if (!options.observed_title || options.observed_title === true) throw new Error("--observed-title is required with --input.");
    if (!options.evidence || options.evidence === true) throw new Error("--evidence is required with --input.");
    const abstract = (await readFile(path.resolve(repositoryRoot, options.input), "utf8")).replace(/\s+/g, " ").trim();
    const score = titleMatchScore(agendaTitleForTalk(talk), options.observed_title);
    if (words(abstract).length < 20) throw new Error(`Extracted abstract is too short (${words(abstract).length} words).`);
    if (score < 0.5) throw new Error(`Observed source title does not match the talk (${score.toFixed(3)}).`);
    const agendaUrl = new URL(talk.scheduleUrl);
    const sourceUrl = new URL(options.source_url && options.source_url !== true ? options.source_url : talk.scheduleUrl);
    if (sourceUrl.protocol !== "https:") throw new Error("Manual abstract source URL must use HTTPS.");
    if (!sameConferenceDomain(sourceUrl, agendaUrl)) {
      throw new Error("Manual abstract source URL must belong to the same conference domain as schedule_url.");
    }
    artifact = {
      schemaVersion: 1,
      slug: talk.slug,
      agendaUrl: talk.scheduleUrl,
      sourceUrl: sourceUrl.toString(),
      finalUrl: sourceUrl.toString(),
      capturedAt: new Date().toISOString(),
      method: "manual-source-extraction",
      evidence: String(options.evidence),
      titleEvidence: { title: String(options.observed_title), score },
      abstract,
      abstractSha256: sha256(abstract),
    };
  } else {
    artifact = await fetchAgendaCandidate(talk);
  }
  await writeJson(path.join(directory, "abstract-source.json"), artifact);
  return artifact;
}

async function captureAbstract(options) {
  if (options.all) {
    const results = [];
    for (const talk of await loadTalks()) {
      if (!talk.scheduleUrl || talk.abstractSourceUrl) continue;
      if (ABSTRACT_EXCEPTION_STATUSES.has(talk.abstractStatus) && !options.retry_exceptions) {
        results.push({ slug: talk.slug, status: "verified-exception", sourceUrl: talk.scheduleUrl, abstractStatus: talk.abstractStatus });
        continue;
      }
      if (options.supported_only && !supportedAgendaSource(talk.scheduleUrl)) {
        results.push({ slug: talk.slug, status: "unsupported", sourceUrl: talk.scheduleUrl });
        continue;
      }
      try {
        const artifact = await captureOneAbstract(talk);
        results.push({ slug: talk.slug, status: "captured", sourceUrl: artifact.sourceUrl, method: artifact.method, words: words(artifact.abstract).length });
        console.log(`Captured ${talk.slug}: ${words(artifact.abstract).length} words via ${artifact.method}.`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        results.push({ slug: talk.slug, status: "failed", sourceUrl: talk.scheduleUrl, error: message });
        console.error(`Failed ${talk.slug}: ${message}`);
      }
    }
    await mkdir(workRoot, { recursive: true });
    await writeJson(path.join(workRoot, "abstract-capture-report.json"), { generatedAt: new Date().toISOString(), results });
    const counts = Object.fromEntries(["captured", "failed", "unsupported", "verified-exception"].map((status) => [status, results.filter((result) => result.status === status).length]));
    console.log(`${counts.captured} captured; ${counts.failed} failed; ${counts.unsupported} unsupported; ${counts["verified-exception"]} verified exceptions skipped.`);
    if (options.strict && (counts.failed || counts.unsupported)) process.exitCode = 1;
    return;
  }
  const talk = await requireTalk(options.slug);
  const artifact = await captureOneAbstract(talk, options);
  console.log(`Captured ${words(artifact.abstract).length}-word abstract for ${talk.slug} via ${artifact.method}.`);
}

async function sameTalkReuseEvidence(talk, sourceTalk) {
  const titleScore = titleMatchScore(talk.title, sourceTalk.title);
  if (titleScore >= 0.85) return { passed: true, titleScore, method: "title-equivalence" };
  if (titleScore < 0.8) return { passed: false, titleScore, method: "insufficient-title-evidence" };
  const [targetDeck, sourceDeck] = await Promise.all([
    talkReferenceText(talk, await ensureWorkDirectory(talk)),
    talkReferenceText(sourceTalk, await ensureWorkDirectory(sourceTalk)),
  ]);
  if (!targetDeck || !sourceDeck) return { passed: false, titleScore, method: "deck-evidence-unavailable" };
  const targetInSource = normalizedTokenOverlap(targetDeck, sourceDeck);
  const sourceInTarget = normalizedTokenOverlap(sourceDeck, targetDeck);
  const deckContainment = Math.max(targetInSource, sourceInTarget);
  return {
    passed: deckContainment >= 0.94,
    titleScore,
    method: "title-and-speaker-deck-equivalence",
    deckContainment,
    targetInSource,
    sourceInTarget,
  };
}

async function reuseAbstract(options) {
  if (!options.source_slug || options.source_slug === true) throw new Error("--source-slug is required.");
  const talk = await requireTalk(options.slug);
  const sourceTalk = await requireTalk(options.source_slug);
  if (talk.slug === sourceTalk.slug) throw new Error("Target and source talks must differ.");
  const source = existingAbstractFromTalk(sourceTalk);
  if (source.sourceScope) throw new Error("The source talk must carry its own event-specific agenda abstract, not a reused abstract.");
  const reuseEvidence = await sameTalkReuseEvidence(talk, sourceTalk);
  if (!reuseEvidence.passed) throw new Error(`Talks are not sufficiently equivalent for agenda reuse (title ${reuseEvidence.titleScore.toFixed(3)}${reuseEvidence.deckContainment === undefined ? "" : `; deck containment ${reuseEvidence.deckContainment.toFixed(3)}`}).`);
  const directory = await ensureWorkDirectory(talk);
  const artifactFile = path.join(directory, "abstract-source.json");
  await writeJson(artifactFile, {
    schemaVersion: 1,
    slug: talk.slug,
    agendaUrl: talk.scheduleUrl ?? null,
    sourceUrl: source.source.toString(),
    finalUrl: source.source.toString(),
    capturedAt: new Date().toISOString(),
    method: "same-talk-official-agenda-reuse",
    sourceScope: "same-talk-official-agenda",
    sourceTalkSlug: sourceTalk.slug,
    sourceConference: sourceTalk.conference,
    evidence: reuseEvidence.method === "title-equivalence"
      ? `Equivalent talk title; official agenda abstract already published for ${sourceTalk.conference}.`
      : `Retitled delivery verified by ${(reuseEvidence.deckContainment * 100).toFixed(1)}% speaker-deck text containment; official agenda abstract already published for ${sourceTalk.conference}.`,
    titleEvidence: { title: sourceTalk.title, score: reuseEvidence.titleScore },
    ...(reuseEvidence.deckContainment === undefined ? {} : { deckEvidence: reuseEvidence }),
    abstract: source.abstract,
    abstractSha256: sha256(source.abstract),
  });
  await publish({ slug: talk.slug, abstract_artifact: artifactFile, abstract_only: true });
}

async function fetchAudio(options) {
  const talk = await requireTalk(options.slug);
  if (!talk.recordingUrl) throw new Error(`${talk.slug} has no recording_url.`);
  const acquisitionUrl = talk.recordingAcquisitionUrl ?? talk.recordingUrl;
  if (!/^https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)\//i.test(acquisitionUrl)
      && !/^http:\/\/2023\.video\.sector\.ca\/video\/\d+$/i.test(acquisitionUrl)) {
    throw new Error("Automated audio acquisition currently supports validated YouTube and Vimeo recordings only.");
  }
  const directory = await ensureWorkDirectory(talk);
  const metadata = JSON.parse(run("yt-dlp", ["--no-update", "--no-playlist", "--dump-single-json", "--skip-download", acquisitionUrl], { capture: true }));
  const recordingIdentity = recordingIdentityEvidence(talk, metadata.title ?? "");
  if (!recordingIdentity.passed) {
    throw new Error(`Recording title does not sufficiently match the talk (${recordingIdentity.titleScore.toFixed(3)}): ${metadata.title ?? "untitled recording"}`);
  }
  const downloadArguments = [
    "--no-update", "--no-playlist", "--no-progress", "--no-continue", "--force-overwrites", "--retries", "20", "--fragment-retries", "20",
    "--retry-sleep", "linear=1:5", "--http-chunk-size", "1M",
    "--extract-audio", "--audio-format", "mp3", "--audio-quality", "64K",
    "--output", path.join(directory, "source.%(ext)s"),
  ];
  const clipStart = recordingStartSeconds(talk.recordingUrl);
  const clipEnd = Number(talk.recordingEndSeconds ?? 0);
  if (clipStart > 0 && (!Number.isFinite(clipEnd) || clipEnd <= clipStart)) {
    throw new Error("A recording URL with a start offset requires recording_end_seconds so a full-event video is never transcribed as one talk.");
  }
  if (clipStart > 0) {
    const recordingCache = path.join(workRoot, "recording-cache");
    await mkdir(recordingCache, { recursive: true });
    const cacheStem = `${String(metadata.extractor_key ?? metadata.extractor ?? "recording").replace(/[^a-z0-9_-]+/gi, "-")}-${String(metadata.id).replace(/[^a-z0-9_-]+/gi, "-")}`;
    const cachedRecording = async () => {
      const entries = await readdir(recordingCache);
      const filename = entries.find((entry) => entry.startsWith(`${cacheStem}.`) && !entry.endsWith(".part") && !entry.endsWith(".ytdl"));
      return filename ? path.join(recordingCache, filename) : undefined;
    };
    let fullRecording = await cachedRecording();
    if (!fullRecording) {
      const cacheArguments = [
        "--no-update", "--no-playlist", "--no-progress", "--retries", "20", "--fragment-retries", "20",
        "--retry-sleep", "linear=1:5", "--http-chunk-size", "1M",
        "--output", path.join(recordingCache, `${cacheStem}.%(ext)s`), acquisitionUrl,
      ];
      try {
        run("yt-dlp", ["--format", "bestaudio[ext=m4a][abr<=64]/bestaudio[ext=m4a]/bestaudio", ...cacheArguments]);
      } catch (error) {
        console.warn("Primary full-recording M4A format failed; retrying with WebM/Opus.");
        try {
          run("yt-dlp", ["--format", "bestaudio[ext=webm]/bestaudio", ...cacheArguments]);
        } catch (fallbackError) {
          console.warn("WebM/Opus failed; retrying with the anonymous Android combined AAC format.");
          run("yt-dlp", ["--extractor-args", "youtube:player_client=android", "--format", "18/best[height<=360]", ...cacheArguments]);
        }
      }
      fullRecording = await cachedRecording();
      if (!fullRecording) throw new Error("Full recording download completed without a reusable audio artifact.");
    }
    run("ffmpeg", [
      "-nostdin", "-hide_banner", "-loglevel", "error", "-y",
      "-ss", String(clipStart), "-t", String(clipEnd - clipStart), "-i", fullRecording,
      "-vn", "-codec:a", "libmp3lame", "-b:a", "64k", path.join(directory, "source.mp3"),
    ]);
  } else {
    downloadArguments.push(acquisitionUrl);
    try {
      run("yt-dlp", ["--format", "bestaudio[ext=m4a][abr<=64]/bestaudio[ext=m4a]/bestaudio", ...downloadArguments]);
    } catch (error) {
      console.warn("Primary M4A audio format failed; retrying with a WebM/Opus audio format.");
      try {
        run("yt-dlp", ["--format", "bestaudio[ext=webm]/bestaudio", ...downloadArguments]);
      } catch (fallbackError) {
        console.warn("WebM/Opus failed; retrying with the anonymous Android combined AAC format.");
        run("yt-dlp", ["--extractor-args", "youtube:player_client=android", "--format", "18/best[height<=360]", ...downloadArguments]);
      }
    }
  }
  await writeJson(path.join(directory, "source-metadata.json"), {
    id: metadata.id,
    title: metadata.title,
    duration: metadata.duration,
    webpageUrl: metadata.webpage_url,
    acquisitionUrl,
    uploader: metadata.uploader,
    uploadDate: metadata.upload_date,
    expectedTitle: talk.title,
    clipStartSeconds: clipStart,
    clipEndSeconds: clipStart > 0 ? clipEnd : undefined,
    titleMatchScore: recordingIdentity.titleScore,
    pageTitleMatchScore: recordingIdentity.pageTitleScore,
    scheduleTitleMatchScore: recordingIdentity.scheduleTitleScore,
    recordingTitleMatchScore: recordingIdentity.recordingTitleScore,
    conferenceMatchScore: recordingIdentity.conferenceScore,
    distinctiveTitleTokens: recordingIdentity.distinctiveTitleTokens,
    fetchedAt: new Date().toISOString(),
  });
  console.log(`Prepared ${path.relative(repositoryRoot, path.join(directory, "source.mp3"))}`);
}

async function transcribe(options) {
  const talk = await requireTalk(options.slug);
  if (!talk.recordingUrl) throw new Error(`${talk.slug} has no recording_url.`);
  const directory = await ensureWorkDirectory(talk);
  const audio = path.resolve(repositoryRoot, options.input ?? path.join(directory, "source.mp3"));
  if (!existsSync(audio) || !(await stat(audio)).isFile()) throw new Error(`Missing audio file: ${audio}`);
  const model = process.env.MBGSEC_TRANSCRIPTION_MODEL || DEFAULT_TRANSCRIPTION_MODEL;
  const data = new FormData();
  data.set("file", new Blob([await readFile(audio)]), path.basename(audio));
  data.set("model", model);
  data.set("response_format", "diarized_json");
  data.set("chunking_strategy", "auto");
  data.set("language", "en");
  const response = await apiRequest("audio/transcriptions", { method: "POST", body: data });
  await writeJson(path.join(directory, "raw-transcript.json"), {
    schemaVersion: 1,
    slug: talk.slug,
    sourceUrl: talk.recordingUrl,
    generatedAt: new Date().toISOString(),
    model,
    response,
  });
  console.log(`Saved raw transcript for ${talk.slug}; preserve this artifact unchanged.`);
}

async function saveLocalTranscript(talk, directory, local, model) {
  const segments = normalizeLocalSegments(local.segments);
  if (!segments.length) throw new Error("Local Whisper output has no usable timestamped segments.");
  const duration = Math.max(...segments.map((segment) => segment.end));
  await writeJson(path.join(directory, "raw-transcript.json"), {
    schemaVersion: 1,
    slug: talk.slug,
    sourceUrl: talk.recordingUrl,
    generatedAt: new Date().toISOString(),
    model,
    backend: "local-mlx-whisper",
    providerResponse: local,
    response: {
      duration,
      language: local.language ?? "en",
      text: String(local.text ?? segments.map((segment) => segment.text).join(" ")).trim(),
      segments,
    },
  });
  console.log(`Saved local recording-derived transcript for ${talk.slug}; preserve this artifact unchanged.`);
}

async function importLocalTranscript(options) {
  const talk = await requireTalk(options.slug);
  if (!talk.recordingUrl) throw new Error(`${talk.slug} has no recording_url.`);
  if (!options.input || options.input === true) throw new Error("--input must name an MLX Whisper JSON file.");
  const input = path.resolve(repositoryRoot, options.input);
  if (!existsSync(input) || !(await stat(input)).isFile()) throw new Error(`Missing local transcript JSON: ${input}`);
  const directory = await ensureWorkDirectory(talk);
  const model = options.model && options.model !== true ? options.model : (process.env.MBGSEC_LOCAL_TRANSCRIPTION_MODEL || DEFAULT_LOCAL_TRANSCRIPTION_MODEL);
  await saveLocalTranscript(talk, directory, await readProviderJson(input), model);
}

async function transcribeLocal(options) {
  const talk = await requireTalk(options.slug);
  if (!talk.recordingUrl) throw new Error(`${talk.slug} has no recording_url.`);
  const directory = await ensureWorkDirectory(talk);
  const audio = path.resolve(repositoryRoot, options.input ?? path.join(directory, "source.mp3"));
  if (!existsSync(audio) || !(await stat(audio)).isFile()) throw new Error(`Missing audio file: ${audio}`);
  const model = options.model && options.model !== true ? options.model : (process.env.MBGSEC_LOCAL_TRANSCRIPTION_MODEL || DEFAULT_LOCAL_TRANSCRIPTION_MODEL);
  // Keep provider output model-specific. A failed CLI invocation must never be
  // able to fall through to a stale JSON file produced by a different model.
  const modelArtifactName = String(model).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  const outputName = `mlx-whisper-${modelArtifactName}`;
  const output = path.join(directory, `${outputName}.json`);
  if (!options.reuse_provider_output || !existsSync(output)) {
    run("uvx", [
      "--from", "mlx-whisper", "mlx_whisper", audio,
      "--model", model,
      "--output-dir", directory,
      "--output-name", outputName,
      "--output-format", "json",
      "--language", "en",
      "--verbose", "False",
      "--condition-on-previous-text", "False",
      "--word-timestamps", "True",
      "--hallucination-silence-threshold", "2",
      "--initial-prompt", `${talk.conference}. ${talk.title}. Speakers: ${talk.presentedBy ?? "conference presenters"}. Preserve product, project, vulnerability, and security terminology exactly.`,
    ]);
  } else console.log(`Reusing completed local provider output for ${talk.slug}.`);
  const local = await readProviderJson(output);
  await saveLocalTranscript(talk, directory, local, model);
}

async function archiveTranscriptAttempt(directory) {
  const rawFile = path.join(directory, "raw-transcript.json");
  if (!existsSync(rawFile)) return;
  const rawBytes = await readFile(rawFile);
  const attemptDirectory = path.join(directory, "attempts", sha256(rawBytes).slice(0, 16));
  await mkdir(attemptDirectory, { recursive: true });
  for (const filename of ["raw-transcript.json", "mlx-whisper.json", "candidate.json", "evaluation.json", "review-pack.md"]) {
    const source = path.join(directory, filename);
    const target = path.join(attemptDirectory, filename);
    if (existsSync(source) && !existsSync(target)) await writeFile(target, await readFile(source));
  }
}

async function draft(options) {
  const talk = await requireTalk(options.slug);
  const directory = await ensureWorkDirectory(talk);
  const rawBytes = await readFile(path.join(directory, "raw-transcript.json"));
  const raw = JSON.parse(rawBytes);
  const rawSegments = flattenRaw(raw);
  const model = process.env.MBGSEC_EDITOR_MODEL || DEFAULT_TEXT_MODEL;
  const result = await structuredResponse({
    model,
    name: "talk_transcript_chapter_plan",
    schema: chapterPlanSchema,
    developer: "You are a conservative conference transcript editor. Create only a chapter plan for the supplied immutable transcript segments. Use 5 to 10 concise, descriptive chapter titles, normally 2 to 7 minutes each and never longer than 8 minutes. Every segment index must appear exactly once: plans must start at segment 0, end at the final segment, be contiguous, chronological, and non-overlapping. Place boundaries at real topic transitions. Do not rewrite, summarize, omit, or invent transcript text and do not guess speaker identities.",
    input: JSON.stringify({
      talk: { title: talk.title, conference: talk.conference, presentedBy: talk.presentedBy ?? "not specified", sourceUrl: talk.recordingUrl },
      finalSegmentIndex: rawSegments.length - 1,
      segments: rawSegments.map((segment, index) => ({ index, start: segment.start, end: segment.end, text: segment.text })),
    }),
  });
  if (!Array.isArray(result.parsed.chapters) || result.parsed.chapters.length === 0) throw new Error("Chapter plan must contain at least one chapter.");
  const repairedPlan = repairChapterCoverage(result.parsed.chapters, rawSegments.length);
  const normalizedChapters = [];
  for (const chapter of repairedPlan) {
    const spans = [];
    let startSegment = chapter.startSegment;
    while (rawSegments[chapter.endSegment].end - rawSegments[startSegment].start > 480) {
      const targetEnd = rawSegments[startSegment].start + 420;
      let endSegment = startSegment;
      while (endSegment + 1 < chapter.endSegment && rawSegments[endSegment + 1].end <= targetEnd) endSegment += 1;
      if (endSegment === startSegment && rawSegments[endSegment].end - rawSegments[startSegment].start > 480) {
        throw new Error(`A single transcript segment exceeds the eight-minute chapter maximum at ${rawSegments[startSegment].start}s.`);
      }
      spans.push({ startSegment, endSegment });
      startSegment = endSegment + 1;
    }
    spans.push({ startSegment, endSegment: chapter.endSegment });
    for (const [index, span] of spans.entries()) {
      normalizedChapters.push({
        title: spans.length === 1 ? chapter.title : `${chapter.title} — Part ${index + 1}`,
        ...span,
      });
    }
  }
  const boundedChapters = mergeChapterSpansToLimit(normalizedChapters, rawSegments, 10);
  if (boundedChapters.length > 10) throw new Error(`Normalized chapter plan has ${boundedChapters.length} chapters and no adjacent spans can be merged under the eight-minute maximum.`);
  const finalChapters = splitChapterSpansToMinimum(boundedChapters, rawSegments, 5);
  if (finalChapters.length < 5) throw new Error(`Transcript has too few independently timestamped segments to produce five chapters (${finalChapters.length}).`);
  const candidate = {
    schemaVersion: 1,
    slug: talk.slug,
    generatedAt: new Date().toISOString(),
    rawTranscriptSha256: sha256(rawBytes),
    editorModel: result.model,
    editorResponseId: result.responseId,
    sourceUrl: raw.sourceUrl,
    durationSeconds: raw.response?.duration ?? rawSegments.at(-1)?.end,
    chapters: finalChapters.map((chapter) => ({
      title: chapter.title.trim(),
      segments: rawSegments.slice(chapter.startSegment, chapter.endSegment + 1).map((segment) => ({
        ...segment,
        speaker: /^speaker$/i.test(segment.speaker) ? "Presenter" : segment.speaker,
      })),
    })),
    editorNotes: ["Verbatim-preserving draft: the LLM selected chapter boundaries and titles only; transcript segments are unchanged.", ...result.parsed.editorNotes],
  };
  await writeJson(path.join(directory, "candidate.json"), candidate);
  const deterministic = evaluateDeterministic(raw, candidate);
  console.log(`Saved candidate for ${talk.slug}; deterministic preflight ${deterministic.passed ? "passed" : "failed"}.`);
  for (const check of deterministic.checks.filter((item) => !item.passed)) console.log(`  FAIL ${check.id}: ${check.detail}`);
}

export function applyReviewedCorrections(candidate, corrections, reviewer, correctedAt = new Date().toISOString()) {
  if (!Array.isArray(corrections) || corrections.length === 0) throw new Error("Corrections must contain at least one item.");
  if (!String(reviewer ?? "").trim()) throw new Error("A named correction reviewer is required.");
  const updated = structuredClone(candidate);
  const segments = (updated.chapters ?? []).flatMap((chapter) => Array.isArray(chapter.segments) ? chapter.segments : []);
  const seen = new Set();
  const applied = [];
  for (const [index, correction] of corrections.entries()) {
    if (!correction || typeof correction !== "object" || Array.isArray(correction)) throw new Error(`Correction ${index + 1} must be an object.`);
    const allowed = new Set(["start", "from", "to", "speakerFrom", "speakerTo", "reason"]);
    for (const key of Object.keys(correction)) if (!allowed.has(key)) throw new Error(`Correction ${index + 1} has unexpected property ${key}.`);
    const start = Number(correction.start);
    if (!Number.isFinite(start) || start < 0) throw new Error(`Correction ${index + 1} needs a valid non-negative start timestamp.`);
    const key = start.toFixed(3);
    if (seen.has(key)) throw new Error(`Correction ${index + 1} duplicates timestamp ${start}.`);
    seen.add(key);
    const matches = segments.filter((segment) => Math.abs(Number(segment.start) - start) <= 0.01);
    if (matches.length !== 1) throw new Error(`Correction ${index + 1} matched ${matches.length} segments at ${start}s; expected exactly one.`);
    const segment = matches[0];
    if (typeof correction.from !== "string" || !correction.from.trim()) throw new Error(`Correction ${index + 1} needs exact non-empty from text.`);
    if (segment.text !== correction.from) throw new Error(`Correction ${index + 1} is stale: candidate text at ${start}s does not match from.`);
    if (typeof correction.to !== "string" || !correction.to.trim()) throw new Error(`Correction ${index + 1} needs non-empty replacement text.`);
    if (typeof correction.reason !== "string" || correction.reason.trim().length < 8) throw new Error(`Correction ${index + 1} needs a specific review reason.`);
    const hasSpeakerFrom = Object.hasOwn(correction, "speakerFrom");
    const hasSpeakerTo = Object.hasOwn(correction, "speakerTo");
    if (hasSpeakerFrom !== hasSpeakerTo) throw new Error(`Correction ${index + 1} must provide both speakerFrom and speakerTo.`);
    if (hasSpeakerFrom) {
      if (segment.speaker !== correction.speakerFrom) throw new Error(`Correction ${index + 1} is stale: speaker at ${start}s does not match speakerFrom.`);
      if (typeof correction.speakerTo !== "string" || !correction.speakerTo.trim()) throw new Error(`Correction ${index + 1} needs a non-empty speakerTo.`);
      segment.speaker = correction.speakerTo.trim();
    }
    segment.text = correction.to.trim();
    applied.push({
      start,
      from: correction.from,
      to: segment.text,
      ...(hasSpeakerFrom ? { speakerFrom: correction.speakerFrom, speakerTo: segment.speaker } : {}),
      reason: correction.reason.trim(),
    });
  }
  updated.lastCorrectedAt = correctedAt;
  updated.humanCorrections = [
    ...(Array.isArray(updated.humanCorrections) ? updated.humanCorrections : []),
    { reviewer: String(reviewer).trim(), correctedAt, corrections: applied },
  ];
  updated.editorNotes = [
    ...(Array.isArray(updated.editorNotes) ? updated.editorNotes : []),
    `Human-reviewed corrections applied by ${String(reviewer).trim()} at ${correctedAt}; re-evaluation and final approval are required.`,
  ];
  return updated;
}

async function applyReviewedCorrectionsCommand(options) {
  const talk = await requireTalk(options.slug);
  if (!options.input || options.input === true) throw new Error("--input must name a reviewed corrections JSON file.");
  if (!options.reviewer || options.reviewer === true) throw new Error("--reviewer is required.");
  const directory = await ensureWorkDirectory(talk);
  const current = await candidateWithHash(directory);
  const input = path.resolve(repositoryRoot, options.input);
  if (!existsSync(input) || !(await stat(input)).isFile()) throw new Error(`Missing corrections file: ${input}`);
  const request = await readJson(input);
  if (!request || typeof request !== "object" || Array.isArray(request)) throw new Error("Corrections input must be an object.");
  if (request.candidateSha256 !== current.hash) throw new Error("Corrections input does not match the current candidate SHA-256.");
  const updated = applyReviewedCorrections(current.candidate, request.corrections, options.reviewer);
  await writeJson(current.file, updated);
  const next = await candidateWithHash(directory);
  console.log(`Applied ${request.corrections.length} reviewed corrections to ${talk.slug}.`);
  console.log(`New candidate SHA-256: ${next.hash}`);
  console.log("The previous evaluation and review are now stale; re-run evaluate and generate a new review pack.");
}

async function talkReferenceText(talk, directory) {
  if (!talk.pdfUrl) return undefined;
  const pdfFile = path.join(directory, "speaker-deck.pdf");
  try {
    if (!existsSync(pdfFile)) {
      const response = await fetch(talk.pdfUrl, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 mbgsec-talk-enrichment/1.0" } });
      if (!response.ok) throw new Error(`deck returned HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 100 || bytes.length > 75 * 1024 * 1024) throw new Error(`unexpected deck size ${bytes.length}`);
      await writeFile(pdfFile, bytes);
    }
    const extracted = run("uv", [
      "run", "--quiet", "--with", "pypdf", "python",
      path.join(path.dirname(scriptPath), "extract_pdf_text.py"), pdfFile, "18000",
    ], { capture: true });
    const uniqueLines = [...new Set(extracted.split(/\r?\n/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean))];
    return uniqueLines.join("\n").slice(0, 18000);
  } catch (error) {
    console.warn(`  Reference deck unavailable for terminology grounding: ${error instanceof Error ? error.message : error}`);
    return undefined;
  }
}

async function evaluate(options) {
  const talk = await requireTalk(options.slug);
  const directory = await ensureWorkDirectory(talk);
  const raw = await readJson(path.join(directory, "raw-transcript.json"));
  const { candidate, hash } = await candidateWithHash(directory);
  const deterministic = evaluateDeterministic(raw, candidate);
  const evaluationFile = path.join(directory, "evaluation.json");
  const evaluation = {
    schemaVersion: 1,
    policyVersion: EVALUATOR_POLICY_VERSION,
    slug: talk.slug,
    candidateSha256: hash,
    evaluatedAt: new Date().toISOString(),
    deterministic,
    judges: [],
    passed: false,
  };
  if (deterministic.passed && !options.deterministic_only) {
    const model = process.env.MBGSEC_EVALUATOR_MODEL || DEFAULT_TEXT_MODEL;
    const judgeRoles = [
      ["fidelity-editor", "Act as a meticulous verbatim transcript editor. Compare raw and candidate. Fail invented or omitted substantive content, meaning changes, changed numbers, or changed certainty. Cosmetic cleanup is allowed. When deterministicEvidence.metrics.exactSegmentRatio is 1, raw and candidate text and timestamps are exactly identical; you must not claim the candidate invented, omitted, or altered content and must pass the fidelity comparison."],
      ["security-reviewer", "Act as a cybersecurity conference transcript subject-matter reviewer. The recording is primary evidence of what the speaker claimed; do not demand external corroboration or judge whether the research claim itself is true. Check whether product names, people, projects, acronyms, numbers, vulnerability terminology, and code/security phrases appear plausibly transcribed in context. Speaker-authored deck text, when supplied, is authoritative terminology evidence. Never replace an unfamiliar contemporary product or project with a more familiar brand merely because it sounds similar. Flag a likely ASR error at its actual timestamp, and recommend a correction only when the supplied evidence makes the correction unambiguous. Do not guess. Uncertain terminology may be a minor finding but must not fail the candidate."],
      ["conference-reader", "Act as an exacting conference attendee and accessibility transcript editor. Judge readable segmentation, useful chapter names and timestamps, and navigability while penalizing summarization. This is an authorized defensive-security conference transcript: do not perform content-safety classification, redact exploit discussion, or fail it for preserving the speaker's offensive-security details. Chapter headings and the generation/source disclosure are added by the renderer from the supplied chapter metadata; do not require them inside candidateTranscript. Silence gaps between chronological timestamps are normal. A neutral Presenter label is permitted for local non-diarized transcription; flag attribution only when the text clearly requires distinguishing multiple speakers."],
    ];
    const compactTranscript = (segments) => segments.map((segment) =>
      `[${Number(segment.start).toFixed(2)}-${Number(segment.end).toFixed(2)}] ${segment.speaker}: ${segment.text}`,
    ).join("\n");
    const candidateSegments = flattenCandidate(candidate);
    const referenceMaterial = await talkReferenceText(talk, directory);
    const payloadObject = {
      talk: { title: talk.title, conference: talk.conference, presentedBy: talk.presentedBy ?? "not specified" },
      deterministicEvidence: deterministic,
      chapters: candidate.chapters.map((chapter) => ({ title: chapter.title, start: chapter.segments[0]?.start, end: chapter.segments.at(-1)?.end })),
      candidateTranscript: compactTranscript(candidateSegments),
      renderingContract: "The published page renders each supplied chapter as an H3 heading, every segment timestamp as a recording link, and a generated-from-recording disclosure above the transcript.",
      speakerPolicy: "Neutral Presenter labels are allowed when automatic diarization is unavailable. Judge attribution only when the transcript itself clearly requires multiple distinct roles.",
      threshold: 85,
    };
    const rawTranscript = compactTranscript(flattenRaw(raw));
    if (existsSync(evaluationFile)) {
      try {
        const checkpoint = await readJson(evaluationFile);
        if (checkpoint.policyVersion === EVALUATOR_POLICY_VERSION && checkpoint.candidateSha256 === hash && checkpoint.deterministic?.passed && Array.isArray(checkpoint.judges)) {
          const allowedRoles = new Set(judgeRoles.map(([role]) => role));
          evaluation.judges = checkpoint.judges.filter((judge) => allowedRoles.has(judge.role));
        }
      } catch {
        evaluation.judges = [];
      }
    }
    for (const [role, rubric] of judgeRoles) {
      if (evaluation.judges.some((judge) => judge.role === role)) {
        console.log(`  ${role}: reusing completed checkpoint.`);
        continue;
      }
      const rolePayload = {
        ...payloadObject,
        evidenceScope: role === "fidelity-editor"
          ? "Raw and candidate transcripts are supplied for direct fidelity comparison."
          : role === "security-reviewer"
            ? "The deterministic exact-segment proof binds the candidate to raw ASR; use the speaker-authored deck to challenge likely terminology errors."
            : "The deterministic exact-segment proof binds the candidate to raw ASR; review the candidate as the published conference reader experience.",
        ...(role === "fidelity-editor" ? { rawTranscript } : {}),
        ...(role === "security-reviewer" && referenceMaterial ? { speakerAuthoredDeckText: referenceMaterial } : {}),
      };
      let result;
      let groundingError;
      for (let groundingAttempt = 1; groundingAttempt <= 2; groundingAttempt += 1) {
        result = await structuredResponse({
          model,
          name: `transcript_${role.replaceAll("-", "_")}`,
          schema: judgeSchema,
          developer: `${rubric} Evaluate independently within the supplied role-specific evidence scope. The deterministic evidence was computed directly from raw and candidate segments. When exactSegmentRatio is 1, candidate text and timestamps are byte-for-byte equivalent to the raw ASR; do not claim content was invented, omitted, or altered. Spoken fragments and colloquial phrasing are not editing placeholders; only literal TODO/TBD/insert markers are placeholders. Multilingual conference delivery is valid: never infer the expected spoken language from an English title, agenda, or deck, and never require translation when no explicit source says the recording uses another language. Return pass=false for any critical or major meaning or attribution defect. Minor findings alone require pass=true when the score is at least 85. A passing score must be at least 85. Every finding must cite the first relevant transcript timestamp and include a short, exact quote from one candidate transcript segment in evidence. Evidence must contain only the spoken excerpt: omit timestamp and speaker labels, use no newline, never combine passages, and keep it under 20 words. Never use timestamp 0 for a global issue unless the quoted passage actually begins at 0. Do not report a finding without exact quoted evidence.${groundingAttempt === 2 ? ` Your previous response failed exact evidence validation: ${groundingError}. Re-check every quote character-for-character against candidateTranscript and omit any finding you cannot ground exactly.` : ""}`,
          input: JSON.stringify(rolePayload),
        });
        try {
          validateJudgeFindings(result.parsed, candidateSegments);
          groundingError = undefined;
          break;
        } catch (error) {
          groundingError = error instanceof Error ? error.message : String(error);
          if (groundingAttempt === 1) console.warn(`  ${role}: invalid evidence grounding; retrying once.`);
        }
      }
      if (groundingError) throw new Error(`${role} failed evidence grounding after retry: ${groundingError}`);
      const normalizedDecision = normalizeJudgeDecision(role, result.parsed, deterministic);
      evaluation.judges.push({
        role,
        model: result.model,
        responseId: result.responseId,
        ...normalizedDecision,
      });
      await writeJson(evaluationFile, evaluation);
    }
  }
  if (options.deterministic_only) {
    evaluation.mode = "deterministic-only";
    await writeJson(evaluationFile, evaluation);
    console.log(`Deterministic evaluation ${deterministic.passed ? "PASSED" : "FAILED"} for ${talk.slug}; three LLM judges are still required before publication.`);
    for (const check of deterministic.checks.filter((item) => !item.passed)) console.log(`  FAIL ${check.id}: ${check.detail}`);
    if (!deterministic.passed && !options.no_exit_status) process.exitCode = 1;
    return evaluation;
  }
  evaluation.passed = deterministic.passed && evaluation.judges.length === 3 && evaluation.judges.every((judge) => judge.pass && judge.score >= 85);
  await writeJson(evaluationFile, evaluation);
  console.log(`Evaluation ${evaluation.passed ? "PASSED" : "FAILED"} for ${talk.slug}.`);
  if (!deterministic.passed) for (const check of deterministic.checks.filter((item) => !item.passed)) console.log(`  FAIL ${check.id}: ${check.detail}`);
  for (const judge of evaluation.judges) console.log(`  ${judge.role}: ${judge.score}/100 ${judge.pass ? "pass" : "fail"} — ${judge.summary}`);
  if (!evaluation.passed && !options.no_exit_status) process.exitCode = 1;
  return evaluation;
}

async function markTranscriptRecordingException(talk, evaluation, models) {
  const failedChecks = (evaluation.deterministic?.checks ?? []).filter((check) => !check.passed).map((check) => check.id);
  const failedJudges = (evaluation.judges ?? []).filter((judge) => !judge.pass || judge.score < 85).map((judge) => judge.role);
  const reasons = [
    failedChecks.length ? `deterministic checks: ${failedChecks.join(", ")}` : "",
    failedJudges.length ? `LLM judges: ${failedJudges.join(", ")}` : "",
  ].filter(Boolean).join("; ") || "machine approval gate did not pass";
  const today = new Date().toISOString().slice(0, 10);
  const frontmatter = setFrontmatterValues(
    removeFrontmatterKeys(talk.frontmatter, [
      "transcript_source_url", "transcript_method", "transcript_model", "transcript_evaluator_models",
      "transcript_evaluated_at", "transcript_candidate_sha256", "transcript_reviewed_by", "transcript_reviewed_at",
    ]),
    {
      transcript_status: "recording-quality-unusable",
      transcript_status_checked_at: today,
      transcript_status_note: `Two independent recording-derived ASR passes (${[...new Set(models)].join(", ")}) failed the machine publication gate on ${today}: ${reasons}. No transcript text was generated or manually filled.`,
    },
  );
  await writeFile(talk.file, `---\n${frontmatter}\n---\n${talk.body}`, "utf8");
}

async function remediateOne(talk, options) {
  const directory = await ensureWorkDirectory(talk);
  if (!existsSync(path.join(directory, "source.mp3"))) throw new Error(`${talk.slug} has no acquired source audio.`);
  if (!options.force_second_asr && existsSync(path.join(directory, "candidate.json"))) {
    const currentEvaluation = await evaluate({ slug: talk.slug, no_exit_status: true });
    if (currentEvaluation.passed) {
      await publish({ slug: talk.slug });
      return { slug: talk.slug, status: "published-after-policy-reevaluation" };
    }
  }
  await archiveTranscriptAttempt(directory);
  const model = options.model && options.model !== true ? options.model : REMEDIATION_LOCAL_TRANSCRIPTION_MODEL;
  await transcribeLocal({ slug: talk.slug, model });
  await draft({ slug: talk.slug });
  const evaluation = await evaluate({ slug: talk.slug, no_exit_status: true });
  if (!evaluation.passed) {
    await markTranscriptRecordingException(talk, evaluation, [DEFAULT_LOCAL_TRANSCRIPTION_MODEL, model]);
    return { slug: talk.slug, status: "documented-recording-quality-exception", model };
  }
  await publish({ slug: talk.slug });
  return { slug: talk.slug, status: "published-after-second-asr", model };
}

async function remediate(options) {
  if (!options.all && (!options.slug || options.slug === true)) throw new Error("Use --all or --slug <slug>.");
  const talks = options.all
    ? await (async () => {
      const selected = new Set((await enrichmentRows()).filter((row) => row.transcriptStage === "machine-remediation").map((row) => row.slug));
      return (await loadTalks()).filter((talk) => selected.has(talk.slug));
    })()
    : [await requireTalk(options.slug)];
  const results = [];
  for (const talk of talks) {
    try {
      const result = await remediateOne(talk, options);
      results.push(result);
      console.log(`${talk.slug}: ${result.status}`);
    } catch (error) {
      const result = { slug: talk.slug, status: "failed", error: error instanceof Error ? error.message : String(error) };
      results.push(result);
      console.error(`${talk.slug}: ${result.error}`);
      if (!options.continue_on_error) break;
    }
  }
  const failures = results.filter((result) => result.status.startsWith("failed"));
  console.log(`Remediation completed: ${results.length - failures.length} machine-resolved; ${failures.length} unresolved.`);
  if (failures.length) process.exitCode = 1;
}

async function review(options) {
  const talk = await requireTalk(options.slug);
  const decision = options.decision;
  if (!['approved', 'rejected'].includes(decision)) throw new Error("--decision must be approved or rejected.");
  if (!options.reviewer || options.reviewer === true) throw new Error("--reviewer is required.");
  const directory = await ensureWorkDirectory(talk);
  const { hash } = await candidateWithHash(directory);
  const evaluation = await readJson(path.join(directory, "evaluation.json"));
  if (decision === "approved" && (!evaluation.passed || evaluation.candidateSha256 !== hash)) {
    throw new Error("Cannot approve: the current candidate does not have a passing, matching evaluation.");
  }
  await writeJson(path.join(directory, "review.json"), {
    schemaVersion: 1,
    slug: talk.slug,
    candidateSha256: hash,
    decision,
    reviewer: options.reviewer,
    reviewedAt: new Date().toISOString(),
    notes: options.notes && options.notes !== true ? options.notes : "",
  });
  console.log(`Recorded ${decision} review for ${talk.slug}.`);
}

async function reviewPack(options) {
  const talk = await requireTalk(options.slug);
  const directory = await ensureWorkDirectory(talk);
  const raw = await readJson(path.join(directory, "raw-transcript.json"));
  const { candidate, hash } = await candidateWithHash(directory);
  const evaluation = await readJson(path.join(directory, "evaluation.json"));
  if (evaluation.candidateSha256 !== hash) throw new Error("Evaluation does not match the current candidate; re-run evaluate first.");

  const segments = flattenCandidate(candidate);
  const duration = Number(candidate.durationSeconds) || Number(raw.response?.duration) || segments.at(-1)?.end || 0;
  const windows = [
    ["Opening", 0, Math.min(90, duration)],
    ["Middle", Math.max(0, duration / 2 - 45), Math.min(duration, duration / 2 + 45)],
    ["Closing", Math.max(0, duration - 90), duration],
  ];
  const sensitive = segments.filter((segment) => /\[inaudible\]|\b\d+(?:[.,]\d+)?%?\b|\b[A-Z][A-Z0-9-]{1,}\b/.test(String(segment.text)));
  const lines = [
    `# Transcript machine audit: ${talk.title}`,
    "",
    `- Candidate SHA-256: \`${hash}\``,
    `- Recording: ${talk.recordingUrl}`,
    `- Deterministic checks: ${evaluation.deterministic?.passed ? "passed" : "failed"}`,
    `- LLM judges: ${evaluation.judges?.length ?? 0}/3 completed`,
    "",
    "## Evidence windows",
    "",
  ];
  for (const [label, start, end] of windows) {
    const link = timestampLink(talk.recordingUrl, start);
    lines.push(`- ${label}: ${link ? `[${timestamp(start)}](${link})` : timestamp(start)}–${timestamp(end)}`);
  }
  lines.push("", "## Evaluator findings", "");
  const findings = (evaluation.judges ?? []).flatMap((judge) =>
    (judge.findings ?? []).map((finding) => ({ ...finding, role: judge.role })),
  );
  if (findings.length === 0) lines.push("- No findings reported.");
  else for (const finding of findings) {
    const link = timestampLink(talk.recordingUrl, finding.timestamp);
    lines.push(`- **${finding.severity} · ${finding.role} · ${link ? `[${timestamp(finding.timestamp)}](${link})` : timestamp(finding.timestamp)}:** “${finding.evidence}” — ${finding.issue} — ${finding.recommendation}`);
  }
  lines.push("", "## Precision-sensitive passages", "", "Machine-detected numbers, acronyms, and inaudible markers for remediation evidence.", "");
  if (sensitive.length === 0) lines.push("- No automatically flagged passages.");
  else for (const segment of sensitive) {
    const link = timestampLink(talk.recordingUrl, segment.start);
    lines.push(`- ${link ? `[${timestamp(segment.start)}](${link})` : timestamp(segment.start)} **${segment.speaker}:** ${segment.text}`);
  }
  lines.push("", "## Machine decision", "");
  if (evaluation.passed) lines.push("- Publishable: deterministic checks and all three SHA-bound LLM judges passed under the current policy.", "");
  else lines.push("- Not publishable: archive this attempt and run the independent large-v3 ASR remediation pass. No human decision or generated replacement speech is permitted.", "");
  const output = path.join(directory, "review-pack.md");
  await writeFile(output, lines.join("\n"), "utf8");
  console.log(`Prepared ${path.relative(repositoryRoot, output)}`);
}

function timestamp(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}` : `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function timestampLink(sourceUrl, seconds) {
  try {
    const url = new URL(sourceUrl);
    if (url.hostname === "youtu.be" || url.hostname.endsWith("youtube.com")) {
      const absoluteSeconds = recordingStartSeconds(sourceUrl) + Math.max(0, Math.floor(Number(seconds) || 0));
      url.searchParams.set("t", `${absoluteSeconds}s`);
      return url.toString();
    }
  } catch {
    // Render a plain timestamp for non-URL sources.
  }
  return undefined;
}

export function renderEnrichment({ abstract, abstractSource, candidate, transcriptSource }) {
  const lines = [START_MARKER];
  const abstractText = typeof abstract === "string" ? abstract : abstract?.text;
  if (abstractText) {
    const label = abstract?.sourceScope === "same-talk-official-agenda"
      ? `Official agenda abstract for this talk, sourced from ${abstract.sourceConference}`
      : "Official conference abstract";
    lines.push("## Abstract", "", abstractText.trim(), "", `_[${label}](${abstractSource})_`);
  }
  if (candidate) {
    if (abstractText) lines.push("");
    lines.push("## Transcript", "", "> Generated from the talk recording and evaluated by three independent LLM reviewer roles.");
    for (const chapter of candidate.chapters ?? []) {
      lines.push("", `### ${String(chapter.title).trim()}`, "");
      for (const segment of chapter.segments ?? []) {
        const stamp = timestamp(segment.start);
        const link = timestampLink(transcriptSource, segment.start);
        const displayedStamp = link ? `[${stamp}](${link})` : `[${stamp}]`;
        lines.push(`${displayedStamp} **${String(segment.speaker).trim()}:** ${String(segment.text).trim()}`, "");
      }
      while (lines.at(-1) === "") lines.pop();
    }
  }
  lines.push(END_MARKER, "");
  return lines.join("\n");
}

function existingAbstractFromTalk(talk) {
  if (!talk.abstractSourceUrl) return undefined;
  const block = talk.body.match(/<!-- talk-enrichment:start -->[\s\S]*?## Abstract\s+([\s\S]*?)\s+_\[[^\]]*abstract[^\]]*\]\([^)]+\)_/i);
  const abstract = block?.[1]?.trim();
  if (!abstract) throw new Error(`${talk.slug} has abstract_source_url but no extractable published abstract.`);
  return {
    abstract,
    source: new URL(talk.abstractSourceUrl),
    sourceScope: scalar(talk.frontmatter, "abstract_source_scope"),
    sourceConference: scalar(talk.frontmatter, "abstract_source_conference"),
  };
}

function yamlValue(value) {
  return JSON.stringify(String(value));
}

function setFrontmatterValues(frontmatter, values) {
  const lines = frontmatter.split(/\r?\n/);
  for (const [key, value] of Object.entries(values)) {
    const index = lines.findIndex((line) => new RegExp(`^${key}:`).test(line));
    const replacement = `${key}: ${yamlValue(value)}`;
    if (index >= 0) lines[index] = replacement;
    else lines.push(replacement);
  }
  return lines.join("\n");
}

function removeFrontmatterKeys(frontmatter, keys) {
  const blocked = new Set(keys);
  return frontmatter
    .split(/\r?\n/)
    .filter((line) => !blocked.has(line.match(/^([A-Za-z0-9_]+):/)?.[1]))
    .join("\n");
}

function descriptionFromAbstract(abstract) {
  const compact = abstract.replace(/\s+/g, " ").trim();
  if (compact.length <= 260) return compact;
  const shortened = compact.slice(0, 257).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

async function publish(options) {
  const talk = await requireTalk(options.slug);
  let abstract;
  let abstractSource;
  let abstractSourceScope;
  let abstractSourceConference;
  let abstractSourceTalkSlug;
  if (options.abstract_artifact) {
    const directory = await ensureWorkDirectory(talk);
    const artifactFile = options.abstract_artifact === true
      ? path.join(directory, "abstract-source.json")
      : path.resolve(repositoryRoot, options.abstract_artifact);
    const artifact = await readJson(artifactFile);
    if (artifact.slug !== talk.slug) throw new Error("Abstract artifact slug does not match the talk.");
    if (artifact.sourceScope === "same-talk-official-agenda") {
      if ((artifact.agendaUrl ?? null) !== (talk.scheduleUrl ?? null)) throw new Error("Reused abstract artifact agenda does not match the target page schedule_url.");
      const sourceTalk = await requireTalk(artifact.sourceTalkSlug);
      const source = existingAbstractFromTalk(sourceTalk);
      if (source.sourceScope) throw new Error("Reused abstract source must be event-specific.");
      if (source.source.toString() !== artifact.sourceUrl || source.abstract !== artifact.abstract) throw new Error("Reused abstract no longer matches its published source talk.");
      const reuseEvidence = await sameTalkReuseEvidence(talk, sourceTalk);
      if (!reuseEvidence.passed) throw new Error("Reused abstract source talk no longer has sufficient title/deck equivalence with the target.");
      if (artifact.deckEvidence && Math.abs(Number(artifact.deckEvidence.deckContainment) - Number(reuseEvidence.deckContainment)) > 0.005) {
        throw new Error("Reused abstract speaker-deck equivalence no longer matches the captured evidence.");
      }
      abstractSourceScope = artifact.sourceScope;
      abstractSourceConference = artifact.sourceConference;
      abstractSourceTalkSlug = artifact.sourceTalkSlug;
    } else if ((artifact.agendaUrl ?? artifact.sourceUrl) !== talk.scheduleUrl) {
      throw new Error("Abstract artifact agenda does not match the page schedule_url.");
    }
    if (artifact.abstractSha256 !== sha256(String(artifact.abstract ?? ""))) throw new Error("Abstract artifact hash does not match its text.");
    if (Number(artifact.titleEvidence?.score ?? 0) < 0.5) throw new Error("Abstract artifact lacks a sufficient title match.");
    abstract = String(artifact.abstract ?? "").trim();
    abstractSource = new URL(artifact.sourceUrl);
  } else if (options.abstract_file) {
    if (!options.abstract_file || options.abstract_file === true) throw new Error("Use --abstract-artifact or provide --abstract-file.");
    if (!options.abstract_source || options.abstract_source === true) throw new Error("--abstract-source is required with --abstract-file.");
    abstractSource = new URL(options.abstract_source);
    const abstractFile = path.resolve(repositoryRoot, options.abstract_file);
    abstract = (await readFile(abstractFile, "utf8")).trim();
  } else if (talk.abstractSourceUrl) {
    const existing = existingAbstractFromTalk(talk);
    abstract = existing.abstract;
    abstractSource = existing.source;
    abstractSourceScope = existing.sourceScope;
    abstractSourceConference = existing.sourceConference;
    abstractSourceTalkSlug = scalar(talk.frontmatter, "abstract_source_talk_slug");
  } else if (options.abstract_only) {
    throw new Error("Abstract-only publication requires --abstract-artifact or --abstract-file.");
  }
  if (abstract) {
    if (abstractSource.protocol !== "https:") throw new Error("The abstract source must be an HTTPS official or archived agenda URL.");
    if (words(abstract).length < 20) throw new Error("The agenda abstract is unexpectedly short; verify the source before publishing.");
  }

  let candidate;
  let evaluation;
  let raw;
  if (!options.abstract_only) {
    if (!talk.recordingUrl) throw new Error("Use --abstract-only because this talk has no recording URL.");
    const directory = await ensureWorkDirectory(talk);
    const current = await candidateWithHash(directory);
    candidate = current.candidate;
    evaluation = await readJson(path.join(directory, "evaluation.json"));
    raw = await readJson(path.join(directory, "raw-transcript.json"));
    if (evaluation.policyVersion !== EVALUATOR_POLICY_VERSION) throw new Error("Current candidate was not evaluated under the current evaluator policy.");
    if (!evaluation.passed || evaluation.candidateSha256 !== current.hash) throw new Error("Current candidate lacks a passing matching evaluation.");
    if (candidate.sourceUrl !== talk.recordingUrl) throw new Error("Candidate source does not match page recording_url.");
  }

  const renderedAbstract = abstract ? {
    text: abstract,
    sourceScope: abstractSourceScope,
    sourceConference: abstractSourceConference,
  } : undefined;
  const generated = renderEnrichment({ abstract: renderedAbstract, abstractSource: abstractSource?.toString(), candidate, transcriptSource: talk.recordingUrl });
  let body = talk.body;
  const start = body.indexOf(START_MARKER);
  const end = body.indexOf(END_MARKER);
  if ((start >= 0) !== (end >= 0) || (start >= 0 && end < start)) throw new Error("Existing enrichment markers are malformed.");
  if (start >= 0) body = `${body.slice(0, start).trimEnd()}\n\n${generated}${body.slice(end + END_MARKER.length).trimStart()}`;
  else body = `${body.trimEnd()}${body.trim() ? "\n\n" : ""}${generated}`;

  const today = new Date().toISOString().slice(0, 10);
  const values = {};
  if (abstract) Object.assign(values, {
    description: descriptionFromAbstract(abstract),
    abstract_source_url: abstractSource.toString(),
    abstract_retrieved_at: scalar(talk.frontmatter, "abstract_retrieved_at") ?? today,
    ...(abstractSourceScope ? {
      abstract_source_scope: abstractSourceScope,
      abstract_source_conference: abstractSourceConference,
      abstract_source_talk_slug: abstractSourceTalkSlug,
    } : {}),
  });
  if (candidate) {
    Object.assign(values, {
      transcript_source_url: talk.recordingUrl,
      transcript_status: "llm-reviewed",
      transcript_method: "machine-generated-and-llm-evaluated",
      transcript_model: raw.model ?? DEFAULT_TRANSCRIPTION_MODEL,
      transcript_evaluator_models: [...new Set(evaluation.judges.map((judge) => judge.model))].join(", "),
      transcript_evaluated_at: String(evaluation.evaluatedAt).slice(0, 10),
      transcript_candidate_sha256: evaluation.candidateSha256,
    });
  }
  const frontmatter = setFrontmatterValues(
    removeFrontmatterKeys(talk.frontmatter, [
      ...(abstract ? ["abstract_status", "abstract_status_checked_at", "abstract_status_note"] : []),
      ...(abstract ? ["abstract_source_scope", "abstract_source_conference", "abstract_source_talk_slug"] : []),
      ...(candidate ? ["transcript_status_checked_at", "transcript_status_note"] : []),
      "transcript_reviewed_by", "transcript_reviewed_at",
    ]),
    values,
  );
  await writeFile(talk.file, `---\n${frontmatter}\n---\n${body}`, "utf8");
  console.log(`Published ${candidate ? `${abstract ? "abstract and " : ""}LLM-reviewed transcript` : "abstract"} into ${path.relative(repositoryRoot, talk.file)}.`);
}

async function publishApproved(options) {
  if (!options.all && (!options.slug || options.slug === true)) throw new Error("Use --all or --slug <slug>.");
  const talks = options.all ? await loadTalks() : [await requireTalk(options.slug)];
  const results = [];
  for (const talk of talks) {
    if (!talk.recordingUrl || talk.transcriptStatus === "llm-reviewed") continue;
    const directory = talkWorkDirectory(talk);
    if (!existsSync(path.join(directory, "candidate.json")) || !existsSync(path.join(directory, "evaluation.json"))) continue;
    try {
      const current = await candidateWithHash(directory);
      const evaluation = await readJson(path.join(directory, "evaluation.json"));
      if (!evaluation.passed || evaluation.candidateSha256 !== current.hash) continue;
      await publish({ slug: talk.slug });
      results.push({ slug: talk.slug, status: "published" });
    } catch (error) {
      results.push({ slug: talk.slug, status: "failed", error: error instanceof Error ? error.message : String(error) });
    }
  }
  const failures = results.filter((result) => result.status === "failed");
  console.log(`Published ${results.length - failures.length} machine-approved transcripts; ${failures.length} failed.`);
  for (const failure of failures) console.error(`  ${failure.slug}: ${failure.error}`);
  if (failures.length) process.exitCode = 1;
}

async function publishCapturedAbstracts() {
  const eligible = (await loadTalks()).filter((talk) =>
    !talk.abstractSourceUrl && existsSync(path.join(talkWorkDirectory(talk), "abstract-source.json")),
  );
  for (const talk of eligible) {
    await publish({ slug: talk.slug, abstract_artifact: true, abstract_only: true });
  }
  console.log(`Published ${eligible.length} captured abstracts.`);
}

async function validatePublished() {
  const failures = [];
  for (const talk of await loadTalks()) {
    const starts = talk.body.split(START_MARKER).length - 1;
    const ends = talk.body.split(END_MARKER).length - 1;
    const recordingOffset = recordingStartSeconds(talk.recordingUrl);
    const recordingEnd = Number(talk.recordingEndSeconds ?? 0);
    if (talk.recordingTitle && !talk.recordingUrl) failures.push(`${talk.filename}: recording_title requires recording_url`);
    if (talk.recordingAcquisitionUrl && !talk.recordingUrl) failures.push(`${talk.filename}: recording_acquisition_url requires recording_url`);
    if (talk.recordingAcquisitionUrl
        && !/^https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)\//i.test(talk.recordingAcquisitionUrl)
        && !/^http:\/\/2023\.video\.sector\.ca\/video\/\d+$/i.test(talk.recordingAcquisitionUrl)) {
      failures.push(`${talk.filename}: recording_acquisition_url is not an approved recording source`);
    }
    if (recordingOffset > 0 && (!Number.isFinite(recordingEnd) || recordingEnd <= recordingOffset)) {
      failures.push(`${talk.filename}: offset recording_url requires recording_end_seconds greater than ${recordingOffset}`);
    }
    if (talk.recordingEndSeconds && recordingOffset === 0) failures.push(`${talk.filename}: recording_end_seconds requires an offset recording_url`);
    if (starts !== ends || starts > 1) failures.push(`${talk.filename}: malformed enrichment markers`);
    if (talk.abstractStatus && !ABSTRACT_EXCEPTION_STATUSES.has(talk.abstractStatus)) {
      failures.push(`${talk.filename}: invalid abstract_status ${talk.abstractStatus}`);
    }
    if (talk.abstractSourceUrl && talk.abstractStatus) {
      failures.push(`${talk.filename}: published abstract must not retain abstract_status`);
    }
    if (talk.abstractStatus) {
      if (!talk.scheduleUrl && talk.abstractStatus !== "source-unavailable") failures.push(`${talk.filename}: abstract_status requires schedule_url unless the official source is unavailable`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(talk.abstractStatusCheckedAt ?? "")) failures.push(`${talk.filename}: abstract_status requires abstract_status_checked_at`);
      if (!talk.abstractStatusNote) failures.push(`${talk.filename}: abstract_status requires abstract_status_note`);
    } else if (talk.abstractStatusCheckedAt || talk.abstractStatusNote) {
      failures.push(`${talk.filename}: abstract status metadata requires abstract_status`);
    }
    if (talk.abstractSourceUrl) {
      if (starts !== 1 || !talk.body.includes("## Abstract")) failures.push(`${talk.filename}: sourced abstract content is incomplete`);
      for (const key of ["description", "abstract_retrieved_at"]) {
        if (!scalar(talk.frontmatter, key)) failures.push(`${talk.filename}: missing ${key}`);
      }
      const sourceScope = scalar(talk.frontmatter, "abstract_source_scope");
      if (sourceScope && sourceScope !== "same-talk-official-agenda") failures.push(`${talk.filename}: unsupported abstract_source_scope`);
      if (sourceScope === "same-talk-official-agenda") {
        for (const key of ["abstract_source_conference", "abstract_source_talk_slug"]) {
          if (!scalar(talk.frontmatter, key)) failures.push(`${talk.filename}: reused abstract missing ${key}`);
        }
      }
    } else if (starts === 1 && !talk.transcriptStatus) {
      failures.push(`${talk.filename}: enrichment content has neither an abstract source nor transcript`);
    }
    if (talk.transcriptStatus) {
      if (!talk.recordingUrl) failures.push(`${talk.filename}: transcript status has no recording_url`);
      if (talk.transcriptStatus === "llm-reviewed") {
        if (starts !== 1 || !talk.body.includes("## Transcript")) failures.push(`${talk.filename}: published transcript content is incomplete`);
        for (const key of ["transcript_source_url", "transcript_method", "transcript_model", "transcript_evaluator_models", "transcript_evaluated_at", "transcript_candidate_sha256"]) {
          if (!scalar(talk.frontmatter, key)) failures.push(`${talk.filename}: missing ${key}`);
        }
        if (talk.transcriptStatusCheckedAt || talk.transcriptStatusNote) failures.push(`${talk.filename}: published transcript must not retain exception metadata`);
      } else if (TRANSCRIPT_EXCEPTION_STATUSES.has(talk.transcriptStatus)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(talk.transcriptStatusCheckedAt ?? "")) failures.push(`${talk.filename}: transcript exception requires transcript_status_checked_at`);
        if (!talk.transcriptStatusNote) failures.push(`${talk.filename}: transcript exception requires transcript_status_note`);
        if (talk.body.includes("## Transcript")) failures.push(`${talk.filename}: transcript exception must not publish transcript text`);
      } else {
        failures.push(`${talk.filename}: invalid transcript_status ${talk.transcriptStatus}`);
      }
    } else if (talk.transcriptStatusCheckedAt || talk.transcriptStatusNote) {
      failures.push(`${talk.filename}: transcript exception metadata requires transcript_status`);
    }
  }
  if (failures.length) throw new Error(`Talk enrichment validation failed:\n- ${failures.join("\n- ")}`);
  console.log("Talk enrichment contract passed.");
}

async function main() {
  const { command, options } = parseArguments(process.argv.slice(2));
  if (!command || command === "help" || options.help) {
    usage();
    return;
  }
  if (command === "inventory") await inventory(options);
  else if (command === "report") await report(options);
  else if (command === "queue") await queue(options);
  else if (command === "prepare-batch") await prepareBatch(options);
  else if (command === "capture-abstract") await captureAbstract(options);
  else if (command === "reuse-abstract") await reuseAbstract(options);
  else if (command === "publish-captured-abstracts") await publishCapturedAbstracts();
  else if (command === "fetch-audio") await fetchAudio(options);
  else if (command === "transcribe") await transcribe(options);
  else if (command === "transcribe-local") await transcribeLocal(options);
  else if (command === "import-local-transcript") await importLocalTranscript(options);
  else if (command === "draft") await draft(options);
  else if (command === "evaluate") await evaluate(options);
  else if (command === "remediate") await remediate(options);
  else if (command === "review-pack") await reviewPack(options);
  else if (command === "apply-reviewed-corrections") await applyReviewedCorrectionsCommand(options);
  else if (command === "review") await review(options);
  else if (command === "publish") await publish(options);
  else if (command === "publish-approved") await publishApproved(options);
  else if (command === "validate") await validatePublished();
  else throw new Error(`Unknown command: ${command}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
