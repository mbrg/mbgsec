# Talk enrichment content contract

## Inputs

Each talk page keeps its existing identity and resource fields. Enrichment adds:

```yaml
description: "A concise excerpt from the official agenda abstract."
abstract_source_url: https://official.example/session
abstract_retrieved_at: YYYY-MM-DD
transcript_source_url: https://www.youtube.com/watch?v=...
transcript_status: llm-reviewed
transcript_method: machine-generated-and-llm-evaluated
transcript_model: gpt-4o-transcribe-diarize
transcript_evaluator_models: gpt-5.6-terra
transcript_evaluated_at: YYYY-MM-DD
transcript_candidate_sha256: <sha256>
```

An exact `schedule_title` may be added when the public page title is a project label or shortened variant of the official agenda title. It changes only agenda title matching.

If the official agenda cannot supply an abstract, do not create substitute copy. Record a validated exception instead:

```yaml
abstract_status: source-lacks-abstract # or source-mismatch / source-unavailable
abstract_status_checked_at: YYYY-MM-DD
abstract_status_note: "What was verified and why no abstract can be copied."
```

Exception metadata must not coexist with `abstract_source_url`. `source-lacks-abstract` and `source-mismatch` require an agenda URL. `source-unavailable` may omit it only after exact-title, organizer, and archive searches are recorded in the note. A later verified abstract supersedes and removes the exception.

The page body contains one generated block:

```markdown
<!-- talk-enrichment:start -->
## Abstract

Exact official agenda abstract.

_[Official conference abstract](https://official.example/session)_

## Transcript

> Generated from the talk recording and lightly edited for readability.

### Introduction

[00:00](https://youtube.example/watch?v=id&t=0s) **Speaker:** Text…
<!-- talk-enrichment:end -->
```

Do not put raw transcript JSON, audio, evaluator results, or API metadata in the page.

Every talk has a generated same-origin text representation at
`/talks/<slug>/llms.txt`. It copies the published page body verbatim and may add a
separately labeled `Slide text` section sourced from the public deck manifest's
accessibility text. The endpoint must distinguish slide descriptions from spoken
transcription, expose recording-quality exceptions accurately, and link every
available talk resource. Regenerate it with `npm run talks:text:sync`; generated
text pages and slide-data files are tracked and must not be edited manually.

## Working artifacts

Store ignored artifacts under `.talk-enrichment/<slug>/`:

- `abstract-source.json`
- `source.mp3` and `source-metadata.json`
- `raw-transcript.json`
- `candidate.json`
- `evaluation.json`
- `review-pack.md`

Every evaluation names the SHA-256 of `candidate.json`. A changed candidate invalidates prior decisions. Publication requires deterministic success plus three independent passing LLM judges at 85 or above; no human reviewer is required.

If both the consistent turbo ASR pass and the independent non-turbo large-v3 remediation pass fail the machine gate, publish no transcript text. Record `transcript_status: recording-quality-unusable`, the checked date, and a machine-generated note naming the failed checks or judges and both attempted models. This is a resolved source-quality exception, not an approval and not permission to synthesize missing speech.

`raw-transcript.json` records the validated recording URL, model, backend, duration, language, and timestamped segments. OpenAI diarized output may carry speaker identities; local MLX Whisper output uses neutral `Presenter` labels. Platform captions are never an input.

Candidate generation is verbatim-preserving: the LLM returns only chapter titles and contiguous source-segment boundaries. Code rejects gaps, overlaps, out-of-range indices, fewer than five chapters, or more than ten chapters. Any proposed chapter longer than eight minutes is split deterministically at a source-segment boundary before every raw segment is copied into the candidate unchanged. Any later correction to `candidate.json` invalidates the prior evaluation and must be re-evaluated.

`abstract-source.json` records the exact agenda URL, exact abstract source URL, final response URL, extraction method, matched title and score, capture time, abstract text, and SHA-256 of that text. Manual extraction also records the inspected evidence location, such as a PDF page. An alternate official source normally must use HTTPS and share the agenda's conference domain. The sole cross-domain exception is `same-talk-official-agenda`: another event-specific official agenda for the same talk, accepted only by the dedicated reuse command and published with source-conference provenance. Retitled equivalence requires a title score of at least 0.80 and at least 94% extracted speaker-deck text containment. Publication re-computes the evidence and rejects an agenda URL, slug, title/deck score, or content hash that no longer matches.

## Editorial boundaries

Preserve claims, examples, qualifications, uncertainty, sequence, and speaker intent. Correct only obvious ASR mistakes. Never silently remove a security caveat, turn a possibility into a fact, expand an acronym with an uncertain meaning, or replace spoken language with a summary.

Use chapters to aid navigation, not to rewrite the talk. Use timestamps at the start of each readable segment. Link YouTube timestamps when the recording is on YouTube; otherwise render plain timestamps.
