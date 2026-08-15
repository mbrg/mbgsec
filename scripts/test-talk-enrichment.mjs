import assert from "node:assert/strict";

import {
  applyReviewedCorrections,
  abstractStateForTalk,
  agendaTitleForTalk,
  batchStepsForRow,
  evaluateDeterministic,
  extractAgendaHtml,
  htmlFragmentToText,
  mergeChapterSpansToLimit,
  normalizeJudgeDecision,
  normalizeLocalSegments,
  parseProviderJson,
  repairChapterCoverage,
  renderEnrichment,
  sameConferenceDomain,
  splitChapterSpansToMinimum,
  titleMatchScore,
  recordingIdentityEvidence,
  recordingStartSeconds,
  transcriptStageForTalk,
  validateJudgeFindings,
  validateSchemaValue,
} from "../.agents/skills/enrich-mbgsec-talks/scripts/enrich_talks.mjs";

const sourceUrl = "https://www.youtube.com/watch?v=example123";
const raw = {
  sourceUrl,
  response: {
    duration: 32,
    segments: [
      { start: 0, end: 10, speaker: "A", text: "Welcome. Today we will explain the attack and its security boundary." },
      { start: 10, end: 22, speaker: "B", text: "The first result affects twelve tenants, but it does not expose customer secrets." },
      { start: 22, end: 32, speaker: "A", text: "Our mitigation validates tool output before the agent executes an action." },
    ],
  },
};

const candidate = {
  sourceUrl,
  durationSeconds: 32,
  editorNotes: [],
  chapters: [
    {
      title: "Attack and mitigation",
      segments: [
        { start: 0, end: 10, speaker: "Presenter", text: "Welcome. Today we will explain the attack and its security boundary." },
        { start: 10, end: 22, speaker: "Researcher", text: "The first result affects twelve tenants, but it does not expose customer secrets." },
        { start: 22, end: 32, speaker: "Presenter", text: "Our mitigation validates tool output before the agent executes an action." },
      ],
    },
  ],
};

const passing = evaluateDeterministic(raw, candidate);
assert.equal(passing.passed, true, JSON.stringify(passing.checks, null, 2));

const spanishRaw = structuredClone(raw);
const spanishCandidate = structuredClone(candidate);
spanishRaw.response.segments[0].text = "Y todo está completo.";
spanishCandidate.chapters[0].segments[0].text = "Y todo está completo.";
assert.equal(evaluateDeterministic(spanishRaw, spanishCandidate).checks.find((check) => check.id === "no-placeholders")?.passed, true);
spanishRaw.response.segments[0].text = "TODO replace this.";
spanishCandidate.chapters[0].segments[0].text = "TODO replace this.";
assert.equal(evaluateDeterministic(spanishRaw, spanishCandidate).checks.find((check) => check.id === "no-placeholders")?.passed, false);

const uncertainJudge = normalizeJudgeDecision("security-reviewer", {
  pass: false,
  score: 30,
  summary: "An unfamiliar term may be wrong.",
  findings: [{ severity: "major", timestamp: 10, evidence: "vibe coding", issue: "Likely ASR error; unclear term", recommendation: "Verify from the source audio." }],
}, { metrics: { exactSegmentRatio: 1 } });
assert.equal(uncertainJudge.pass, true);
assert.equal(uncertainJudge.score, 85);
assert.equal(uncertainJudge.findings[0].severity, "minor");
assert.equal(uncertainJudge.findings[0].policyAdjustedFrom, "major");

const groundedJudge = normalizeJudgeDecision("security-reviewer", {
  pass: false,
  score: 70,
  summary: "A documented product name is wrong.",
  findings: [{ severity: "major", timestamp: 10, evidence: "Contoso", issue: "The speaker deck identifies this product as Fabrikam.", recommendation: "Replace Contoso with Fabrikam." }],
}, { metrics: { exactSegmentRatio: 1 } });
assert.equal(groundedJudge.pass, false);
assert.equal(groundedJudge.findings[0].severity, "major");

const impossibleFidelityFailure = normalizeJudgeDecision("fidelity-editor", {
  pass: false,
  score: 20,
  summary: "Candidate allegedly omitted content.",
  findings: [{ severity: "critical", timestamp: 0, evidence: "Welcome", issue: "Omission", recommendation: "Restore it." }],
}, { metrics: { exactSegmentRatio: 1 } });
assert.equal(impossibleFidelityFailure.pass, true);
assert.equal(impossibleFidelityFailure.score, 100);
assert.deepEqual(impossibleFidelityFailure.findings, []);

const unsupportedLanguageFailure = normalizeJudgeDecision("conference-reader", {
  pass: false,
  score: 30,
  summary: "The talk title is English but the transcript is Spanish.",
  findings: [{ severity: "critical", timestamp: 0, evidence: "Y todo está completo.", issue: "Language mismatch: the transcript is entirely in Spanish instead of English.", recommendation: "Translate it to English." }],
}, { metrics: { exactSegmentRatio: 1 } });
assert.equal(unsupportedLanguageFailure.pass, true);
assert.equal(unsupportedLanguageFailure.score, 85);
assert.deepEqual(unsupportedLanguageFailure.findings, []);
assert.match(unsupportedLanguageFailure.policyNormalization, /multilingual delivery is valid/);

const overlapping = structuredClone(candidate);
overlapping.chapters[0].segments[1].start = 9;
const overlapResult = evaluateDeterministic(raw, overlapping);
assert.equal(overlapResult.passed, false);
assert.equal(overlapResult.checks.find((check) => check.id === "timestamps-chronological")?.passed, false);

const summarized = structuredClone(candidate);
summarized.chapters[0].segments = [
  { start: 0, end: 32, speaker: "Presenter", text: "The speakers discuss an attack and a mitigation." },
];
const summaryResult = evaluateDeterministic(raw, summarized);
assert.equal(summaryResult.passed, false);
assert.equal(summaryResult.checks.find((check) => check.id === "word-count-ratio")?.passed, false);

const wrongSource = structuredClone(candidate);
wrongSource.sourceUrl = "https://www.youtube.com/watch?v=wrong";
const sourceResult = evaluateDeterministic(raw, wrongSource);
assert.equal(sourceResult.checks.find((check) => check.id === "source-match")?.passed, false);

const rendered = renderEnrichment({
  abstract: "This agenda-sourced abstract explains the attack, its security impact, and the practical mitigation discussed in the session.",
  abstractSource: "https://conference.example/agenda/session",
  candidate,
  transcriptSource: sourceUrl,
});
assert.match(rendered, /## Abstract/);
assert.match(rendered, /## Transcript/);
assert.match(rendered, /\[00:10\]\(https:\/\/www\.youtube\.com\/watch\?v=example123&t=10s\)/);
assert.match(rendered, /\*\*Researcher:\*\*/);
const offsetRendered = renderEnrichment({ candidate, transcriptSource: "https://www.youtube.com/watch?v=example123&t=1076s" });
assert.match(offsetRendered, /\[00:10\]\(https:\/\/www\.youtube\.com\/watch\?v=example123&t=1086s\)/);

assert.equal(htmlFragmentToText("<p>One &amp; two.</p><p>Next&nbsp;line.</p>"), "One & two.\nNext line.");
assert.deepEqual(parseProviderJson('{"avg_logprob":NaN,"positive":Infinity,"negative":-Infinity,"text":"NaN and Infinity stay verbatim"}'), {
  avg_logprob: null,
  positive: null,
  negative: null,
  text: "NaN and Infinity stay verbatim",
});
assert.deepEqual(normalizeLocalSegments([
  { start: 1.2300000000000002, end: 2.34, text: " First segment " },
  { start: 1.23, end: 2.34, text: "First segment" },
  { start: 2.34, end: 3.45, text: "Second segment" },
]), [
  { start: 1.23, end: 2.34, speaker: "Presenter", text: "First segment" },
  { start: 2.34, end: 3.45, speaker: "Presenter", text: "Second segment" },
]);
const minuteSegments = Array.from({ length: 11 }, (_, index) => ({ start: index * 60, end: (index + 1) * 60 }));
const minuteChapters = minuteSegments.map((_, index) => ({ title: `Chapter ${index + 1}`, startSegment: index, endSegment: index }));
const boundedChapters = mergeChapterSpansToLimit(minuteChapters, minuteSegments, 10);
assert.equal(boundedChapters.length, 10);
assert.deepEqual(boundedChapters[0], { title: "Chapter 1; Chapter 2", startSegment: 0, endSegment: 1 });
const expandedChapters = splitChapterSpansToMinimum([
  { title: "Opening", startSegment: 0, endSegment: 5 },
  { title: "Closing", startSegment: 6, endSegment: 10 },
], minuteSegments, 5);
assert.equal(expandedChapters.length, 5);
assert.equal(expandedChapters[0].startSegment, 0);
assert.equal(expandedChapters.at(-1).endSegment, 10);
for (let index = 1; index < expandedChapters.length; index += 1) {
  assert.equal(expandedChapters[index].startSegment, expandedChapters[index - 1].endSegment + 1);
}
assert.deepEqual(repairChapterCoverage([
  { title: "Opening", startSegment: 0, endSegment: 2 },
  { title: "Skipped boundary", startSegment: 5, endSegment: 7 },
], 8), [
  { title: "Opening", startSegment: 0, endSegment: 2 },
  { title: "Skipped boundary", startSegment: 3, endSegment: 7 },
]);
assert(titleMatchScore("Credential Sharing as a Service: the Dark Side of No-Code", "OWASP: Credential Sharing as a Service — the Dark Side of No-Code") >= 0.9);
assert(recordingIdentityEvidence(
  { title: "Perplexed Browser: PleaseFix (delivered by Gadi Evron)", conference: "[Un]prompted 2026" },
  "Gadi Evron on behalf of Zenity - PleaseFix | [un]prompted 2026",
).passed);
assert.equal(recordingStartSeconds("https://www.youtube.com/watch?v=example&t=17m56s"), 1076);
assert(recordingIdentityEvidence(
  { title: "Pwn the Enterprise - Thank you AI!", conference: "INTENT 2025", recordingUrl: "https://www.youtube.com/watch?v=example&t=1076s" },
  "INTENT 2025 Day 1",
).passed);
assert(recordingIdentityEvidence(
  { title: "Prompt Injection is Not a Bug For Us to Patch", conference: "AI Agent Security Summit by Zenity Labs @ NYC 2025", recordingTitle: "Welcome Keynote - AI Agent Security Summit" },
  "Welcome Keynote - AI Agent Security Summit",
).passed);
assert(!recordingIdentityEvidence(
  { title: "Perplexed Browser: PleaseFix", conference: "[Un]prompted 2026" },
  "A completely different security talk | [un]prompted 2026",
).passed);
assert(recordingIdentityEvidence(
  { title: "OWASP Citizen Development Project", scheduleTitle: "Ultimate Build Power, Itty Bitty Security Controls - OWASP's New Top 10 for Citizen Developer Risk", conference: "OWASP Global AppSec US 2025" },
  "Ultimate Build Power, Itty Bitty Security Controls - OWASP's New Top 10 for Citizen Developer Risk",
).passed);
assert(sameConferenceDomain("https://path.rsaconference.com/agenda", "https://www.rsaconference.com/library/presentation"));
assert(!sameConferenceDomain("https://conference.example/agenda", "https://unrelated.example.net/abstract"));
assert.equal(abstractStateForTalk({ abstractSourceUrl: "https://conference.example/session" }), "published");
assert.equal(abstractStateForTalk({ scheduleUrl: "https://conference.example/session", abstractStatus: "source-lacks-abstract" }), "source-lacks-abstract");
assert.equal(abstractStateForTalk({ abstractStatus: "source-unavailable" }), "source-unavailable");
assert.equal(abstractStateForTalk({ scheduleUrl: "https://conference.example/session" }), "needs-capture");
assert.equal(abstractStateForTalk({}), "missing-agenda-url");
assert.equal(agendaTitleForTalk({ title: "Page title", scheduleTitle: "Official agenda title" }), "Official agenda title");
assert.equal(agendaTitleForTalk({ title: "Page title" }), "Page title");
assert.equal(transcriptStageForTalk({ recordingUrl: sourceUrl }, {}), "transcribe");
assert.equal(transcriptStageForTalk({ recordingUrl: sourceUrl }, { raw: true }), "draft");
assert.equal(transcriptStageForTalk({ recordingUrl: sourceUrl }, { raw: true, candidate: true }), "evaluate");
assert.equal(transcriptStageForTalk({ recordingUrl: sourceUrl }, { raw: true, candidate: true, evaluation: true, evaluationPassed: false }), "machine-remediation");
assert.equal(transcriptStageForTalk({ recordingUrl: sourceUrl }, { raw: true, candidate: true, evaluation: true, evaluationPassed: true }), "publish");
assert.equal(transcriptStageForTalk({ transcriptStatus: "llm-reviewed", recordingUrl: sourceUrl }, {}), "complete");
assert.equal(transcriptStageForTalk({ transcriptStatus: "recording-quality-unusable", recordingUrl: sourceUrl }, {}), "recording-exception");
assert.equal(transcriptStageForTalk({}, {}), "no-recording");
assert.deepEqual(batchStepsForRow({ recording: true, transcriptStage: "transcribe", audio: false, raw: false, candidate: false, evaluation: false, reviewPack: false }), [
  "fetch-audio", "transcribe-local", "draft", "evaluate", "review-pack",
]);
assert.deepEqual(batchStepsForRow({ recording: true, transcriptStage: "transcribe", audio: true, localProviderTranscript: true, raw: false, candidate: false, evaluation: false, reviewPack: false }), [
  "import-local-transcript", "draft", "evaluate", "review-pack",
]);
assert.deepEqual(batchStepsForRow({ recording: true, transcriptStage: "draft", audio: true, raw: true, candidate: false, evaluation: false, reviewPack: false }), [
  "draft", "evaluate", "review-pack",
]);
assert.deepEqual(batchStepsForRow({ recording: true, transcriptStage: "evaluate", audio: true, raw: true, candidate: true, evaluation: false, reviewPack: false }, "evaluate", "openai"), ["evaluate"]);
assert.deepEqual(batchStepsForRow({ recording: true, transcriptStage: "machine-remediation", audio: true, raw: true, candidate: true, evaluation: true, reviewPack: false }), []);
assert.deepEqual(batchStepsForRow({ recording: true, transcriptStage: "complete" }), []);
assert.throws(() => batchStepsForRow({ recording: true }, "publish"), /--through/);
assert(validateSchemaValue({
  type: "object",
  additionalProperties: false,
  required: ["pass", "score"],
  properties: { pass: { type: "boolean" }, score: { type: "integer", minimum: 0, maximum: 100 } },
}, { pass: true, score: 91 }, "judge"));
assert.throws(() => validateSchemaValue({
  type: "object",
  additionalProperties: false,
  required: ["pass"],
  properties: { pass: { type: "boolean" } },
}, { pass: true, leaked: "unexpected" }, "judge"), /unexpected property leaked/);
assert.throws(() => validateSchemaValue({
  type: "array",
  maxItems: 1,
  items: { type: "string" },
}, ["first", "second"], "findings"), /at most 1 items/);
assert.throws(() => validateSchemaValue({ type: "string", maxLength: 5 }, "too long", "evidence"), /at most 5 characters/);
const reboundJudge = { findings: [{ timestamp: 1000, evidence: "twelve tenants" }] };
validateJudgeFindings(reboundJudge, candidate.chapters[0].segments);
assert.equal(reboundJudge.findings[0].reportedTimestamp, 1000);
assert.equal(reboundJudge.findings[0].timestamp, 10);
assert.match(reboundJudge.findings[0].evidence, /twelve tenants/);
assert.throws(() => validateJudgeFindings({ findings: [{ timestamp: 0, evidence: "not present anywhere" }] }, candidate.chapters[0].segments), /anywhere in the candidate/);

const corrected = applyReviewedCorrections(candidate, [{
  start: 10,
  from: "The first result affects twelve tenants, but it does not expose customer secrets.",
  to: "The first result affects twelve tenants, but it does not expose customer secrets.",
  speakerFrom: "Researcher",
  speakerTo: "Verified presenter",
  reason: "Speaker identity verified against the recording",
}], "Human Reviewer", "2026-08-14T12:00:00.000Z");
assert.equal(candidate.chapters[0].segments[1].speaker, "Researcher", "the source candidate must remain unchanged");
assert.equal(corrected.chapters[0].segments[1].speaker, "Verified presenter");
assert.equal(corrected.humanCorrections[0].reviewer, "Human Reviewer");
assert.throws(() => applyReviewedCorrections(candidate, [{
  start: 10,
  from: "Stale text",
  to: "Replacement",
  reason: "Verified against the recording",
}], "Human Reviewer"), /is stale/);

const sched = extractAgendaHtml({
  url: "https://example.sched.com/event/abc/session",
  talkTitle: "Credential Sharing as a Service: the Dark Side of No-Code",
  html: `
    <html><head><meta property="og:title" content="Conference: Credential Sharing as a Service: the Dark Side of No-Code"></head>
    <body><h1>Credential Sharing as a Service: the Dark Side of No-Code</h1>
    <div class='sched-scrollable-details'><div class="tip-description"><strong></strong>
      Why attack crown jewels when shadow IT provides another path?<br><br>
      This session demonstrates account takeover, lateral movement, persistence, and data exfiltration through enterprise low-code platforms.
    </div></div></body></html>`,
});
assert.equal(sched.method, "sched-tip-description");
assert.match(sched.abstract, /account takeover/);
assert.equal(sched.titleEvidence.score, 1);

const pretalx = extractAgendaHtml({
  url: "https://pretalx.com/example/talk/ABC123/",
  talkTitle: "The Good, the Bad, and the Ugly: Microsoft Copilot",
  html: `<html><head><title>The Good, the Bad, and the Ugly: Microsoft Copilot :: Example</title>
    <link rel="alternate" type="application/json" title="Example API" href="https://pretalx.com/api/events/example/talks/ABC123/">
    </head></html>`,
});
assert.equal(pretalx.method, "pretalx-api");
assert.equal(pretalx.apiUrl, "https://pretalx.com/api/events/example/talks/ABC123/");

const structuredAgenda = extractAgendaHtml({
  url: "https://conference.example/session",
  talkTitle: "All You Need Is Guest",
  html: `<html><head><script type="application/ld+json">${JSON.stringify({
    "@type": "Event",
    name: "All You Need Is Guest",
    description: "This session explains how guest access creates unexpected paths to enterprise data, then demonstrates practical discovery, exploitation, detection, and mitigation techniques for defenders.",
  })}</script></head></html>`,
});
assert.equal(structuredAgenda.method, "json-ld");
assert.equal(structuredAgenda.titleEvidence.score, 1);

const bsidesArchive = extractAgendaHtml({
  url: "https://archive.bsideslv.org/2023/talks",
  talkTitle: "All You Need is Guest: Beyond Enumeration",
  html: `<div class="talk_big" id="U3MYWG">
    <h4 id="all-you-need-is-guest-beyond-enumeration">All You Need is Guest: Beyond Enumeration</h4>
    <p>Breaking Ground, 17:00 Tuesday</p>
    <p>Guest accounts are widely used to provide limited enterprise access, but that assumption can fail in surprising ways.</p>
    <p>This session demonstrates discovery, exploitation, lateral movement, and practical defenses for identity and application teams.</p>
    <p><a href="speakers.html#A8DPXG">Michael Bargury</a></p>
  </div>`,
});
assert.equal(bsidesArchive.method, "bsideslv-talk-section");
assert.equal(bsidesArchive.sourceFragment, "all-you-need-is-guest-beyond-enumeration");
assert.doesNotMatch(bsidesArchive.abstract, /17:00|Michael Bargury/);
assert.match(bsidesArchive.abstract, /practical defenses/);

const t2Agenda = extractAgendaHtml({
  url: "https://t2.fi/schedule/2024/",
  talkTitle: "All You Need Is Guest",
  html: `<table><tr><td><a href="index.html#speech10">All You Need Is Guest</a></td></tr></table>
    <a name="speech10"></a><h2>All You Need Is Guest</h2><strong>Michael Bargury</strong>
    <p>Guest identities can reach more enterprise data than administrators expect.</p>
    <p>This session demonstrates the attack paths and the defensive controls that contain them.</p>
    <div class="bio"><p>Speaker biography.</p></div><a name="speech11"></a>`,
});
assert.equal(t2Agenda.method, "t2-speech-section");
assert.doesNotMatch(t2Agenda.abstract, /Speaker biography/);

const caroAgenda = extractAgendaHtml({
  url: "https://web.archive.org/web/20240419233147/https://www.caro2024.org/agenda/",
  talkTitle: "All You Need Is Guest",
  html: `<div class="agenda__event-entry"><a href="#inline_16-2" data-lity>All You Need Is Guest</a>
    <div class="lity-hide popup" id="inline_16-2"><p>Guest accounts appear limited, but undocumented APIs create unexpected paths to sensitive enterprise resources.</p><p>The talk demonstrates those paths and gives defenders concrete hardening and detection guidance.</p></div></div>`,
});
assert.equal(caroAgenda.method, "caro-abstract-popup");
assert.equal(caroAgenda.sourceFragment, "inline_16-2");

const blackHatAgenda = extractAgendaHtml({
  url: "https://www.blackhat.com/us-24/briefings/schedule/#living-off-microsoft-copilot-40074",
  talkTitle: "Living off Microsoft Copilot",
  html: `<div class="sessions"><div id="session_desc_39999" class="session_description_wrapper"><h2>Unrelated Session</h2><div class="description">This unrelated description is deliberately long enough that only title matching can reject it as evidence for the requested talk.</div></div><div itemtype="http://data-vocabulary.org/Event" id="session_desc_40074" class="session_description_wrapper"><h2 itemprop="summary">Living off Microsoft Copilot</h2><div class="session_description_legend"><div itemprop="description" class="description"><p>Whatever your need as a hacker post-compromise, Microsoft Copilot has got you covered.</p><p>This session demonstrates data discovery, quiet exfiltration, lateral movement, practical red-team tooling, detection, and defensive hardening for enterprise teams.</p></div><div class="bhpresentation"><div>Nested material must not truncate the description.</div></div></div></div></div>`,
});
assert.equal(blackHatAgenda.method, "blackhat-session-description");
assert.equal(blackHatAgenda.titleEvidence.score, 1);
assert.equal(blackHatAgenda.sourceFragment, "living-off-microsoft-copilot-40074");
assert.match(blackHatAgenda.abstract, /defensive hardening/);

console.log("Talk enrichment evaluator fixtures passed.");
