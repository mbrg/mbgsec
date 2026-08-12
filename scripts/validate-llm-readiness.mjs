import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repositoryRoot, "_site");
const canonicalOrigin = "https://www.mbgsec.com";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  let relativePath = pathname.replace(/^\/+/, "");
  if (!relativePath || relativePath.endsWith("/")) relativePath += "index.html";
  const resolved = path.resolve(siteRoot, relativePath);
  assert(resolved.startsWith(`${siteRoot}${path.sep}`), `Unsafe request path: ${pathname}`);
  return resolved;
}

const server = createServer(async (request, response) => {
  try {
    let filePath = resolveRequestPath(request.url ?? "/");
    let fileStats;
    try {
      fileStats = await stat(filePath);
    } catch {
      if (!path.extname(filePath)) {
        filePath = path.join(filePath, "index.html");
        fileStats = await stat(filePath);
      } else {
        throw new Error("not found");
      }
    }
    if (!fileStats.isFile()) throw new Error("not found");
    response.writeHead(200, {
      "Content-Type": contentTypes.get(path.extname(filePath)) ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

const address = server.address();
assert(address && typeof address === "object");
const localOrigin = `http://127.0.0.1:${address.port}`;

async function get(pathname, expectedType) {
  const response = await fetch(`${localOrigin}${pathname}`);
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  if (expectedType) {
    assert.match(response.headers.get("content-type") ?? "", expectedType, `${pathname} has the wrong content type`);
  }
  return response.text();
}

function firstCanonicalPath(markdown, collection) {
  const marker = `](${canonicalOrigin}/${collection}/`;
  const start = markdown.indexOf(marker);
  assert(start >= 0, `No ${collection} URL found in its llms.txt index`);
  const remainder = markdown.slice(start + marker.length);
  const end = remainder.indexOf(")");
  assert(end > 0, `Malformed ${collection} URL in its llms.txt index`);
  return `/${collection}/${remainder.slice(0, end)}`;
}

function assertHtmlContract(html, { canonical, describedby, markdownSource, provenance, robots, jsonLdType }) {
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), `Missing canonical ${canonical}`);
  assert(html.includes(`<link rel="describedby" href="${canonicalOrigin}${describedby}">`), `Missing describedby ${describedby}`);
  if (markdownSource) assert(html.includes(`<link rel="alternate" type="text/markdown" href="${markdownSource}">`), "Missing Markdown alternate");
  if (provenance) assert(html.includes(`<meta name="content-provenance" content="${provenance}">`), `Missing provenance metadata ${provenance}`);
  if (robots) assert(html.includes(`<meta name="robots" content="${robots}">`), `Missing robots policy ${robots}`);
  if (jsonLdType) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert(blocks.some((block) => block["@type"] === jsonLdType), `Missing ${jsonLdType} JSON-LD`);
  }
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

try {
  const llmsPaths = [
    "/llms.txt",
    "/posts/llms.txt",
    "/weblog/llms.txt",
    "/archive/llms.txt",
    "/talks/llms.txt",
    "/projects/llms.txt",
    "/topics/llms.txt",
  ];
  const llmsDocuments = new Map();
  for (const pathname of llmsPaths) {
    const body = await get(pathname, /^text\/plain; charset=utf-8$/);
    assert(body.startsWith("# "), `${pathname} does not start with a Markdown H1`);
    assert(!body.match(/\{[{%]|&(amp|lt|gt);|�/), `${pathname} contains unrendered or malformed text`);
    llmsDocuments.set(pathname, body);
  }

  const rootLlms = llmsDocuments.get("/llms.txt");
  assert(rootLlms.includes("Security warning:"), "Root llms.txt lacks the adversarial-content warning");
  for (const pathname of llmsPaths.slice(1)) {
    assert(rootLlms.includes(`${canonicalOrigin}${pathname}`), `Root llms.txt does not link to ${pathname}`);
  }

  const postPath = firstCanonicalPath(llmsDocuments.get("/posts/llms.txt"), "posts");
  const weblogPath = firstCanonicalPath(llmsDocuments.get("/weblog/llms.txt"), "weblog");
  const archivePath = weblogPath.replace("/weblog/", "/archive/");
  const deckPath = firstCanonicalPath(llmsDocuments.get("/talks/llms.txt"), "talks");

  const home = await get("/", /^text\/html; charset=utf-8$/);
  assertHtmlContract(home, { canonical: `${canonicalOrigin}/`, describedby: "/llms.txt", jsonLdType: "Person" });
  assert(home.indexOf("<body") < home.indexOf('id="email-modal"'), "Subscription dialog must render inside the body");
  assert(!home.includes('href="javascript:void(0);"'), "Homepage contains JavaScript-only links");
  assert(!home.includes('href="#" class="disabled'), "Homepage uses disabled anchors as controls");
  assert(home.includes('<h1 class="archive__subtitle">'), "Homepage lacks a top-level content heading");

  const post = await get(postPath, /^text\/html; charset=utf-8$/);
  assertHtmlContract(post, {
    canonical: `${canonicalOrigin}${postPath}`,
    describedby: "/posts/llms.txt",
    markdownSource: `${canonicalOrigin.replace("www.mbgsec.com", "raw.githubusercontent.com/mbrg/mbgsec/main")}/_posts/${postPath.split("/").filter(Boolean).at(-1)}.md`,
    provenance: "original-research",
    jsonLdType: "BlogPosting",
  });
  assert(post.includes('<h2 class="page__share-title"'), "Share controls break heading order");
  assert(!post.includes('href="#" class="pagination--pager disabled'), "Post pagination uses a disabled anchor");

  const weblog = await get(weblogPath, /^text\/html; charset=utf-8$/);
  assertHtmlContract(weblog, {
    canonical: `${canonicalOrigin}${weblogPath}`,
    describedby: "/weblog/llms.txt",
    provenance: "weblog-commentary",
    jsonLdType: "BlogPosting",
  });
  assert(weblog.includes('href="/weblog/feed.xml"'), "Weblog page lacks its collection feed");

  const archive = await get(archivePath, /^text\/html; charset=utf-8$/);
  assert(archive.includes('<link rel="describedby" href="https://www.mbgsec.com/archive/llms.txt">'), "Archive lacks discovery metadata");
  assert(archive.includes('<meta name="robots" content="noindex,follow">'), "Archive lacks noindex policy");
  assert(archive.includes('<meta name="content-provenance" content="external-source-archive">'), "Archive lacks provenance metadata");
  assert(archive.includes('itemtype="https://schema.org/Article"'), "Archive lacks Article microdata");

  const deck = await get(deckPath, /^text\/html; charset=utf-8$/);
  assert(deck.includes('<meta name="description"'), "Deck lacks a meta description");
  assert(deck.includes('<link rel="describedby" href="https://www.mbgsec.com/talks/llms.txt">'), "Deck lacks discovery metadata");
  assert(deck.includes('<link rel="alternate" type="text/markdown"'), "Deck lacks a Markdown alternate");

  const internalUrls = new Set();
  for (const body of llmsDocuments.values()) {
    for (const match of body.matchAll(/\]\(https:\/\/www\.mbgsec\.com([^\s)#]*\/?(?:#[^\s)]*)?)\)/g)) {
      internalUrls.add(match[1].split("#")[0] || "/");
    }
  }
  for (const pathname of internalUrls) await get(pathname);

  const htmlFiles = (await walk(siteRoot)).filter((file) => file.endsWith(".html"));
  let jsonLdBlocks = 0;
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      JSON.parse(match[1]);
      jsonLdBlocks += 1;
    }
  }
  assert(jsonLdBlocks > 0, "No JSON-LD blocks found");

  const feed = await get("/feed.xml", /^(application|text)\/xml; charset=utf-8$/);
  const weblogFeed = await get("/weblog/feed.xml", /^(application|text)\/xml; charset=utf-8$/);
  assert(feed.includes("<feed") && feed.includes("</feed>"), "Main Atom feed is malformed");
  assert(weblogFeed.includes("<rss") && weblogFeed.includes("</rss>"), "Weblog RSS feed is malformed");

  console.log(`LLM readiness E2E passed: ${llmsPaths.length} indexes, ${internalUrls.size} internal links, ${jsonLdBlocks} JSON-LD blocks.`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
