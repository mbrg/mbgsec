# Transcript evaluation rubric

Require deterministic validation and three isolated LLM judges. A candidate is eligible for publication only when all checks pass and every judge returns `pass=true` with a score of at least 85/100.

## Deterministic checks

- Candidate source URL equals the talk recording URL.
- Segments are nonempty, chronological, nonoverlapping, and within the raw duration.
- Candidate and raw word counts differ by no more than 18%.
- Normalized token overlap is at least 70%.
- The final timestamp is close to the raw final timestamp.
- Chapters and speaker labels are present.
- No TODO markers, raw `Speaker A` labels, or empty text remains.
- No repeated-token runs, repeated identical segments, or long low-diversity ASR artifacts exceed the repository thresholds.

## Independent judges

### Fidelity editor

Compare raw and candidate transcripts. Fail meaning changes, invented statements, omitted substantive claims, changed numbers, or softened/strengthened uncertainty.

### Security subject-matter reviewer

Check product names, people, projects, acronyms, vulnerability terminology, and code/security phrases against the provided title, speakers, slide glossary, and raw transcript. The recording is primary evidence of what the speaker claimed: do not fail a transcript because the research claim lacks external corroboration or because the judge disagrees with it. Flag likely ASR errors at their actual timestamps and mark uncertain corrections rather than guessing. Every finding must quote exact transcript evidence; code rejects a finding whose quote is absent near its timestamp.

### Conference reader

Judge whether a technically interested reader can follow the result. Check paragraph boundaries, chapter names, timestamp usefulness, and accessibility. This is an authorized defensive-security conference transcript: do not safety-classify or redact the speaker's exploit discussion. Chapter headings, timestamp links, and generation/source disclosure are added by the page renderer and need not appear inside transcript segment text. Silence gaps are normal. Neutral roles such as `Presenter` are allowed when diarization is unavailable; flag them only where the text clearly requires distinguishing speakers. Do not reward summarization or call ordinary spoken fragments placeholders. Every finding must quote exact transcript evidence near its timestamp.

## Machine approval and remediation

No human approval is required. Publication binds the current evaluator-policy version and all three passing judge decisions to the exact candidate SHA-256. A failed candidate is archived, independently retranscribed with the non-turbo Whisper large-v3 model, redrafted, and judged again. If that second ASR attempt fails deterministic checks or any judge, leave the transcript unpublished and record the source-quality exception rather than inventing or manually filling speech.
