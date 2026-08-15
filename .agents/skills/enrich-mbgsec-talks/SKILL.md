---
name: enrich-mbgsec-talks
description: Enrich mbgsec presentation pages with official agenda abstracts and recording-derived, LLM-reviewed transcripts. Use when Codex needs to inventory talk content, validate agenda and recording sources, acquire talk audio, generate or clean timestamped transcripts, run deterministic and independent LLM-as-judge evaluations, publish machine-approved searchable talk-page content, or report enrichment coverage.
---

# Enrich mbgsec talks

Create source-grounded talk content without weakening the deck-first experience. Never invent an abstract or call slide-derived prose a transcript.

## Start safely

1. Read `AGENT.md`, `DECKS.md`, and the talk-publishing skill.
2. Inspect `git status`; preserve unrelated changes.
3. Read [content-contract.md](references/content-contract.md).
4. Run `npm run talks:enrichment:inventory` before selecting a talk.
5. Validate the exact agenda and recording on the web. Treat stored URLs as candidates until opened and matched to the title, speaker, event, and date.

## Process a talk

Use the repository commands in order:

```sh
npm run talk:abstract:capture -- --slug <slug>
npm run talk:audio -- --slug <slug>
npm run talk:transcribe -- --slug <slug>
npm run talk:draft -- --slug <slug>
npm run talk:evaluate -- --slug <slug>
npm run talk:review-pack -- --slug <slug>
npm run talks:transcripts:publish-approved
npm run talks:enrichment:report
```

`talk:abstract:capture` extracts exact agenda text from supported official session pages, verifies a title match, and binds the text and source URL in `abstract-source.json`. Sched, Pretalx, and rendered Black Hat session descriptions have deterministic extractors. For a coverage pass, run `npm run talks:abstracts:capture`; unsupported, blocked, or ambiguous sources remain in the generated report for manual recovery rather than being guessed.

If the public page title is intentionally shorter or project-oriented, add the exact official `schedule_title` in frontmatter. Agenda capture uses that alias only for title evidence; the page title and transcript prompts remain unchanged.

When an official agenda has been inspected and genuinely contains no abstract, or the stored link resolves to the wrong event, record the exception in page frontmatter instead of retrying or synthesizing text:

```yaml
abstract_status: source-lacks-abstract # or source-mismatch / source-unavailable
abstract_status_checked_at: YYYY-MM-DD
abstract_status_note: "Concise evidence-based explanation."
```

Coverage capture skips verified exceptions by default. Use `capture-abstract --all --retry-exceptions` only when rechecking sources after an event-site change. Publishing a later verified abstract automatically removes the exception fields.

When the event-specific agenda is gone or published no description, challenge the exception against official agendas for other deliveries of the exact same talk. Reuse is allowed only from another event-specific official agenda, with a normalized title match of at least 0.85—or a title match of at least 0.80 plus at least 94% extracted speaker-deck text containment—and explicit cross-event provenance:

```sh
node .agents/skills/enrich-mbgsec-talks/scripts/enrich_talks.mjs reuse-abstract --slug <target-slug> --source-slug <published-source-slug>
```

The command creates a SHA-bound `same-talk-official-agenda` artifact; publication labels the source conference rather than implying the target event supplied the abstract. Do not use speaker blogs, vendor summaries, slide text, or merely related talks for this fallback. If archive and exact-talk searches still fail, record the searches in `abstract_status_note`. `source-unavailable` may omit `schedule_url` precisely because no official agenda URL could be recovered; the other exception states require one.

For an official PDF or unsupported page that was visually inspected, put only the exact abstract in a temporary text file and bind it with explicit evidence:

```sh
npm run talk:abstract:capture -- --slug <slug> --input <text-file> --observed-title "<source title>" --evidence "PDF page 4"
```

This route applies the same word-count, title-match, source URL, and SHA-256 gates; it records `manual-source-extraction` rather than implying an automatic parser succeeded.

If an official conference library page carries the abstract while `schedule_url` points to a separate agenda host, add `--source-url <official-url>`. The skill preserves both URLs and accepts the alternate source only when it uses HTTPS and shares the agenda's conference domain.

After reviewing the capture report, publish every valid captured abstract with `npm run talks:abstracts:publish`. The command skips pages that already have an abstract and re-applies the same slug, source, title, and hash gates used for a single talk.

Keep working artifacts under ignored `.talk-enrichment/<slug>/`. Do not commit agenda capture artifacts, audio, raw API output, candidates, evaluator traces, credentials, or secret references. Audio acquisition supports validated YouTube and Vimeo recording URLs; it fetches public host metadata and requires a deterministic title match before downloading, and it never substitutes platform captions for recording-derived transcription. For an embed-only recording, keep the canonical HTTPS player in `recording_url` and put the validated conference-owned embedding page in `recording_acquisition_url`; publication and timestamp provenance remain bound to `recording_url`.

The default API commands require `OPENAI_API_KEY`. Use `gpt-4o-transcribe-diarize` for timestamped speaker segments and independent `gpt-5.6-terra` calls for drafting and evaluator roles unless the user or repository configuration selects another supported model.

An Apple Silicon machine can run the same pipeline locally when API access is unavailable. The local transcription route uses MLX Whisper and keeps neutral `Presenter` attribution because Whisper does not diarize speakers:

```sh
npm run talk:transcribe:local -- --slug <slug> --input /absolute/path/to/recording.mp3
```

The default local model is `mlx-community/whisper-large-v3-turbo`; override it with `--model` or `MBGSEC_LOCAL_TRANSCRIPTION_MODEL`. Local runs disable previous-text conditioning and enable word-timestamp silence suppression so a hallucinated phrase cannot feed a repeated-segment failure loop across later windows. If MLX Whisper was run separately, import its unchanged JSON with `npm run talk:transcript:import-local -- --slug <slug> --input <mlx-json> --model <model>`.

Some MLX Whisper versions serialize non-finite provider diagnostics as bare `NaN` or `Infinity`. The importer normalizes only those out-of-string diagnostic values to JSON `null`. It also rounds derived timestamps to milliseconds and removes only byte-equivalent duplicate segments with identical timestamp bounds; speaker and transcript text otherwise remain untouched, and the original provider file remains unchanged. New candidates bind the exact normalized raw transcript SHA-256 so provenance remains auditable.

For local transcript editing and three isolated judges, start Ollama and select the backend explicitly:

```sh
ollama serve
MBGSEC_LLM_BACKEND=ollama MBGSEC_OLLAMA_MODEL=gpt-oss:20b npm run talk:draft -- --slug <slug>
MBGSEC_LLM_BACKEND=ollama MBGSEC_OLLAMA_MODEL=gpt-oss:20b npm run talk:evaluate -- --slug <slug>
```

The editor requests only a schema-constrained chapter plan at temperature zero. Code verifies that the plan covers every source segment exactly once, then assembles the candidate from unchanged timestamped segments; the model never rewrites the transcript body. Three isolated evaluator roles inspect fidelity, security terminology, and conference-reader accessibility. The fidelity judge receives normalized raw and candidate transcripts for direct comparison. The security judge receives the candidate, deterministic raw-equivalence proof, and speaker-deck terminology when a PDF is available. The conference-reader judge receives the candidate, chapter/rendering contract, and the same equivalence proof. This role-minimized evidence avoids duplicating a long raw transcript where it adds no independent signal. Every finding must bind an exact quote and timestamp, every structured response is validated against the repository schema, and the machine-approval gate is identical for OpenAI and local runs. If an exact quote is absent near a judge's reported timestamp but exists elsewhere in the candidate, code records `reportedTimestamp` and rebinds the finding to the first exact occurrence; evidence absent from the candidate still fails. The versioned evaluator policy prevents stale judge runs from publishing, treats the recording as primary evidence, and treats exact speaker-deck terminology as authoritative instead of guessing a more familiar product name. Local structured output gets one bounded retry when the model returns malformed JSON, and each valid judge is checkpointed independently so an interrupted evaluation resumes without rerunning completed roles.

Absent or misspelled judge evidence triggers one bounded evaluator retry with the exact validation error; a second grounding failure fails closed.

If an editor-selected span exceeds eight minutes, code splits it deterministically. If that creates more than ten chapters, the shortest adjacent spans are merged only when their combined duration remains within the same eight-minute cap. If the model returns fewer than five valid chapters, the longest spans are split at their nearest timestamped midpoint until the five-chapter minimum is met.

The review pack is a machine-remediation artifact listing grounded evaluator findings and precision-sensitive passages. A candidate is publishable without a human reviewer only when deterministic checks pass and all three isolated judges independently return `pass=true` with scores of at least 85. The publication record binds the exact candidate SHA-256, transcription model, evaluator models, and evaluation date. Optional corrections change the candidate hash and always require fresh evaluation.

## Process the catalog in bounded batches

Preview an executable batch before launching any long recording:

```sh
npm run talks:enrichment:queue
npm run talks:enrichment:queue -- --stage transcribe --limit 5
npm run talks:enrichment:queue -- --stage machine-remediation --json
npm run talks:enrichment:prepare -- --limit 2 --through review-pack --transcription-backend local
npm run talks:enrichment:prepare -- --limit 2 --through review-pack --transcription-backend local --execute
```

The queue stages are `transcribe`, `draft`, `evaluate`, `machine-remediation`, and `publish`. `talks:enrichment:prepare` is dry-run by default, requires an explicit positive limit, resumes from current SHA-bound artifacts, and processes talks sequentially. A completed local provider JSON is reused after an interrupted import instead of transcribing the audio again. Its default target is `review-pack`; use `--through transcribe`, `draft`, or `evaluate` for a shorter run, `--slug <slug>` to pin an exact talk, and `--continue-on-error` only when independent failures should not stop the bounded batch. The local backend uses the same MLX Whisper model for every talk; `--transcription-backend openai` selects the API diarization route. Each executed run writes an ignored `.talk-enrichment/batch-run-*.json` record.

The batch command deliberately separates generation/evaluation from publication. It may produce a failed LLM evaluation and still creates a diagnostic review pack; failed candidates remain at `machine-remediation`. Run `npm run talks:transcripts:publish-approved` afterward to publish only matching SHA-bound candidates that passed every gate. Abstract recovery and transcript generation are reported independently, so a verified agenda exception remains visible without hiding the recording's transcript stage. A recording is eligible when the page has a validated `recording_url`; absence of an agenda abstract never authorizes generated replacement copy and does not prevent a passing transcript from being published.

Run `npm run talks:transcripts:remediate` after the first catalog pass. It re-evaluates candidates under the current evaluator policy, publishes passes, archives every failed attempt by raw-transcript SHA-256, and performs one independent ASR retry with `mlx-community/whisper-large-v3-mlx` before drafting, evaluating, and publishing again. Provider output filenames are model-specific so a failed invocation cannot reuse or relabel an older ASR artifact. Repeated-token runs, repeated identical segments, and long low-diversity segments are deterministic failures, not editorial issues. If the independent retry also fails, leave the transcript unpublished and report the recording-quality exception; never repair missing speech with generated prose. Use `--force-second-asr` when an earlier remediation used an invalid model artifact and must be regenerated even if its stale candidate later passes policy re-evaluation.

When the recording host blocks server-side acquisition, obtain the public recording through an authorized local session and pass the audio directly without changing the transcript standard:

```sh
npm run talk:transcribe -- --slug <slug> --input /absolute/path/to/recording.mp3
```

The transcript artifact still records the page's validated `recording_url` as its source. Do not use platform captions as the audio substitute.

## Enforce the gates

- Require an official agenda URL and verbatim agenda abstract for publication. Prefer a matching, hashed `abstract-source.json` over a loose text file.
- Require a recording-derived candidate for a transcript. Leave transcript absent when no recording is available.
- Preserve raw transcription output unchanged.
- Allow cleanup only for punctuation, paragraphing, duplicated ASR fragments, obvious terminology errors, speaker naming, and chapter boundaries.
- Run deterministic checks before LLM judges.
- Run each judge independently; do not reveal another judge's result.
- Reject evaluator findings that cannot be grounded to an exact or high-overlap quote near their claimed timestamp.
- Require all judges to pass and the aggregate score to meet the threshold in [evaluation-rubric.md](references/evaluation-rubric.md).
- Require deterministic success and all three independent LLM judges to pass at 85 or above, bound to the candidate SHA-256, before publishing.
- Re-run evaluation and review whenever the candidate changes.

## Publish and verify

Use `talk:publish-content -- --slug <slug> --abstract-artifact` rather than hand-copying generated text. It verifies the artifact slug, source URL, title match, and content hash, then updates only the enrichment block and provenance frontmatter after every gate passes.

Then run:

```sh
npm run build
npm run test
git diff --check
```

Verify the deck controls, header, abstract, transcript headings, timestamp links, mobile layout, canonical metadata, Markdown alternate, and talks `llms.txt` entry. Do not upload or deploy unless explicitly requested.

Regenerate `docs/talk-enrichment-coverage.md` with `npm run talks:enrichment:report` after each batch. The report enumerates every talk page, its abstract state, recording, transcript stage, and next action. Treat published frontmatter—not ignored work artifacts—as the public source of truth.

## Handle exceptions

- If the agenda has disappeared, use an official archived page and record that URL.
- If an official client-rendered agenda blocks the repository fetcher, inspect the rendered session in a browser, copy only its description into the manual-source route, and record the exact page plus visible title as evidence. Never substitute a third-party summary.
- If the official agenda has no abstract, leave the abstract missing and report it.
- If audio is poor, retain `[inaudible]`; judges must fail an unreliable candidate rather than inventing text.
- If YouTube or Vimeo returns 401/403 after all public fallbacks, first check for an official conference-owned embedding page and record it as `recording_acquisition_url`; otherwise use an authorized local audio file with `--input`. Never add browser cookies or credentials to the repository.
- If a YouTube M4A stream returns 403, acquisition retries public WebM/Opus and then the anonymous Android combined AAC format before reporting the recording as blocked.
- If a recording URL starts partway through a multi-talk event (`t=` or `start=`), add `recording_end_seconds`; acquisition refuses to transcribe the full event, clips only that interval, and adds the original offset back to published timestamp links.
- If speaker identity is uncertain, use neutral labels such as `Host` or `Audience member`; do not guess a name.
- If any evaluator reports meaning-changing edits, reject the candidate and regenerate it.
