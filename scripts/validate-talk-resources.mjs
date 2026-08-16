import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const talksPath = path.join(repositoryRoot, "_pages", "talks.md");
const decksPath = path.join(repositoryRoot, "_pages", "decks");
const resourcePagesPath = path.join(repositoryRoot, "_pages", "talks");
const includePath = path.join(repositoryRoot, "_includes", "talk-table-resources.html");

function frontmatterValue(source, key) {
  return source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1];
}

const talkPages = new Map();
for (const directory of [decksPath, resourcePagesPath]) {
  const files = (await readdir(directory)).filter((file) => file.endsWith(".md"));
  for (const file of files) {
    const source = await readFile(path.join(directory, file), "utf8");
    const permalink = frontmatterValue(source, "permalink");
    const layout = frontmatterValue(source, "layout");
    assert(permalink, `${file} has no permalink`);
    assert(["deck", "talk"].includes(layout), `${file} must use the deck or talk layout`);
    assert(!talkPages.has(permalink), `Duplicate talk permalink: ${permalink}`);
    talkPages.set(permalink, {
      file,
      talkDate: frontmatterValue(source, "talk_date"),
      recordingUrl: frontmatterValue(source, "recording_url"),
    });
  }
}

const talksSource = await readFile(talksPath, "utf8");
const talkRows = talksSource.split("\n").filter((line) => /^\| \d{4}-\d{2}-\d{2} \|/.test(line));
const indexedPermalinks = [];
const counts = { pageOnly: 0, pageAndRecording: 0 };

for (const row of talkRows) {
  const rowDate = row.split("|")[1].trim();
  const resources = row.split("|").at(-2).trim();
  const includeMatch = resources.match(/^\{% include talk-table-resources\.html permalink="([^"]+)" %\}$/);
  assert(includeMatch, `Every talk must link to exactly one talk page:\n${row}`);

  const value = includeMatch[1];
  const talkPage = talkPages.get(value);
  assert(talkPage, `Talk row links to a missing page: ${value}`);
  assert.equal(talkPage.talkDate, rowDate, `Talk date and page date differ for ${value}`);
  indexedPermalinks.push(value);
  if (talkPage.recordingUrl) counts.pageAndRecording += 1;
  else counts.pageOnly += 1;
}

assert.equal(new Set(indexedPermalinks).size, indexedPermalinks.length, "A talk page appears more than once in the talks table");
for (const permalink of talkPages.keys()) {
  assert(indexedPermalinks.includes(permalink), `Talk page is missing from the talks table: ${permalink}`);
}

const includeSource = await readFile(includePath, "utf8");
assert(includeSource.includes('talk_page.recording_url'), "Resource include must derive recordings from talk-page frontmatter");
assert(!includeSource.includes('include.recording_url'), "The talks table must not pass recording URLs directly");
assert(includeSource.includes('fa-video'), "Resource include must use the generic video icon");
assert(!/fa-(?:youtube|vimeo)/.test(includeSource), "Resource include must not use provider-specific recording icons");

console.log(
  `Talk resources passed: ${talkRows.length} rows ` +
  `(${counts.pageAndRecording} page+video, ${counts.pageOnly} page-only).`,
);
