---
name: publish-mbgsec-talk
description: Publish a new mbgsec talk from a PowerPoint (.pptx), Google Slides deck or URL, Keynote (.key), PDF, or prepared slide bundle. Use when Codex must convert a presentation into the mbgsec live-deck format, accept or determine the talk title, conference, date/year/month, official schedule URL, YouTube recording URL, and optional GitHub source-code URL, upload deck assets and a downloadable PDF to the mbgsec Cloudflare R2 bucket through 1Password, create or update the responsive Jekyll talk page and talks index, validate mobile and desktop behavior, or refresh an existing hosted talk. Always use web search to validate public dates, conference identity, schedule links, recordings, and shared source repositories before publication, including values supplied by the user.
---

# Publish an mbgsec talk

Create the same live, responsive talk experience as the repository's existing deck pages. Treat the repository and the supplied source as authoritative; do not invent event metadata or media links.

## Start from the repository contract

1. Locate the mbgsec repository by finding `DECKS.md`, `scripts/publish-deck.mjs`, `_layouts/deck.html`, and `_pages/decks/`.
2. Read `DECKS.md`, `scripts/deck.example.json`, `scripts/publish-deck.mjs`, the deck layout, and one current deck page before acting. Follow their current fields and commands if they differ from examples here.
3. Inspect `git status`, the current branch, and existing talk rows. Preserve unrelated user changes.
   Before replacing a legacy row, record every PDF it currently links and look for a date/title-matched PDF already stored in the repository. Treat those files as regression references even when a newer raw deck is authoritative.
4. Load the relevant presentation, PDF, Google Drive/Slides, Cloudflare, and browser skills when their trigger conditions apply. Read each selected skill before using it.
5. Read [references/source-formats.md](references/source-formats.md) for the input-specific conversion route.
6. Read and follow [references/web-validation.md](references/web-validation.md) before accepting any date or external resource URL.

## Resolve the talk identity

Collect or determine these values:

- `title`: exact public talk title.
- `talk_date`: actual presentation date as `YYYY-MM-DD`.
- `conference`: public event name, normally including its year.
- `schedule_url`: exact official talk or schedule entry when available.
- `recording_url`: exact official YouTube video when available.
- `github_url`: exact public GitHub repository or talk-specific source path when shared.

Treat explicit user-provided values and source-deck metadata as candidates, not proof. Always search the web and open authoritative destinations to validate the conference identity, exact session date, schedule entry, recording, and shared source repository. Prefer official conference sources for the date and schedule, official event/speaker YouTube sources for recordings, and repositories owned or explicitly linked by the speaker, research team, or organizer. Verify that each final resource names the same talk or clearly connects the same speaker, project, and event. Do not use search-result URLs, conference home pages, YouTube search pages, guessed video IDs, generic GitHub profiles, unrelated repositories, or placeholder links.

Maintain a compact validation record containing each field, accepted value, authoritative source URL, and the evidence that matched. Cite these sources in the final handoff. If web evidence conflicts with supplied metadata, report the conflict and resolve it before creating date-derived slugs or publishing. If an optional schedule, recording, or GitHub URL cannot be validated, omit it rather than treating the supplied link as verified.

Derive the visible year/month from `talk_date`; do not create separate `year` or `month` frontmatter. If sources conflict on the date, title, or conference identity and the conflict changes the URL or storage slug, ask the user before publishing. Omit unavailable optional links and report what was not found.

Choose identifiers consistently:

- Page slug/permalink: lowercase, ASCII, date-first, hyphenated; for example `2026-08-06-bhusa2026-promptware-eod-skillful-agent-detonation`.
- R2 slug: reuse an established source/PDF stem when present; otherwise use an ASCII date-first underscore stem accepted by the publisher, such as `2026-08-06_BHUSA2026_PromptwareEOD_SkillfulAgentDetonation`.
- Version: first eight hexadecimal characters of the SHA-256 of the authoritative source or exported source artifact. Reuse an existing version when only page metadata changes.

Check for collisions in `_pages/decks/`, `_pages/talks.md`, and `https://media.mbgsec.com/decks/<r2-slug>/latest.json` before creating a new identity.

## Build the publishing bundle

Keep original sources under ignored `.deck-sources/` and generated assets under ignored `.deck-build/`. Do not add a large deck, rendered slide, media file, or PDF to Git.

Do not silently downgrade a talk to a static PDF/image experience. If the editable source is unavailable and the PDF, existing page, recording, related deck, or user context suggests embedded video, animation, builds, or interactive demonstrations, stop before publishing or replacing links and ask the user for the original deck/media or explicit approval to publish a disclosed static version. Absence of extractable media in a PDF is not evidence that the talk had no media.

Create a bundle containing `deck.json`, zero-padded slide images, and any media overlays. Prefer WebP slide images at a resolution adequate for desktop fullscreen while keeping each image reasonably sized. Preserve the source aspect ratio in `deck.json`. Give every slide a useful, visually grounded alt string; source text is preferred, but a meaningful screenshot or diagram must be described rather than falling back to only `Slide N`.

Represent embedded or linked videos and animations with manifest overlay entries only when their source files and on-slide bounds can be extracted reliably. Preserve media aspect and use broadly supported web formats. If a source effect cannot be represented faithfully, render the final visual state and disclose the limitation rather than guessing coordinates or silently dropping important content.

Create a PDF directly from the source application's PDF export when possible. Fall back to assembling the rendered slides only when necessary. Store the local PDF outside the directory passed as `--dir` so the large file is not uploaded twice; pass it separately with `--pdf`.

Validate before upload:

- Parse `deck.json` and ensure every local asset reference exists and stays inside the bundle.
- Confirm slide count, ordering, aspect ratio, and representative first/middle/last renders.
- Inspect the PDF page count and representative pages; it should match the intended slide sequence.
- When the old Talks row or repository has a prior PDF for this talk, compare it with the new source/render before publication. Check page count and order, render both PDFs consistently, compare first/middle/last and every changed or unmatched page, and use page-image hashes or pixel diffs when practical. Explain expected differences such as a newer revision, inserted/removed slides, animation flattening, or font substitution. Stop on an unexplained identity, ordering, or material-content mismatch.
- Run the publisher without `--upload` and review every planned key.

## Publish through 1Password and R2

Use the repository's `npm run deck:upload` workflow. Never print, paste, write, or commit credential values. The ignored `.env.op` may contain only these secret references:

```dotenv
AWS_ACCESS_KEY_ID=op://Private/mbgsec-deck-uploader/s3_access_key_id
AWS_SECRET_ACCESS_KEY=op://Private/mbgsec-deck-uploader/s3_secret_access_key
S3_ENDPOINT=op://Private/mbgsec-deck-uploader/s3_endpoint
```

If access must be checked, list only item title, vault name, and field labels with filtered `jq` output. Use `op run`; do not extract secrets into chat or shell logs. If Codex's sandbox cannot reach 1Password desktop IPC but the user's Terminal can, rerun the exact command with the required execution approval rather than requesting secret values.

Run a dry plan first, adapting paths and identifiers:

```sh
npm run deck:publish -- --dir .deck-build/<bundle> --slug <r2-slug> --version <version> --pdf .deck-build/<r2-slug>.pdf
```

Upload only when the user's request authorizes publishing:

```sh
npm run deck:upload -- --dir .deck-build/<bundle> --slug <r2-slug> --version <version> --pdf .deck-build/<r2-slug>.pdf
```

For a PDF-only update, omit `--dir` and `--version`. Before replacing an existing stable PDF for a different talk identity, stop and ask.

Verify public responses after upload:

- `latest.json`: HTTP 200 and points to the intended versioned manifest.
- Versioned `deck.json`: HTTP 200 with the expected slide count.
- Representative slide/media objects: HTTP 200 with correct MIME types.
- `slides.pdf`: HTTP 200, `Content-Type: application/pdf`, nonzero expected length, byte ranges, and attachment disposition.

Do not switch the page to a new object until these checks pass.

## Create or update the page

Create `_pages/decks/<page-slug>.md` with the current repository contract. The expected shape is:

```yaml
---
title: "Exact Talk Title"
talk_date: YYYY-MM-DD
conference: Conference Name YYYY
permalink: /talks/<page-slug>/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/<r2-slug>/latest.json
pdf_url: https://media.mbgsec.com/decks/<r2-slug>/slides.pdf
schedule_url: https://official.example/talk
recording_url: https://www.youtube.com/watch?v=verified
github_url: https://github.com/verified-owner/verified-project
---
```

Omit optional URL fields that are not available. Keep the title value to the talk title alone: the layout adds `YYYY/MM · Conference ·` to the visible heading and browser title.

Use the deck layout's icon-only resource controls for PDF, schedule, recording, and shared GitHub source code. Keep a visible text equivalent for assistive technology and expose each text label on pointer hover and keyboard focus. Show only the icons whose optional URLs exist.

Find the matching row in `_pages/talks.md`. For a talk onboarded to this live experience, put exactly one combined `Interactive talk page` icon in the Resources cell and link it to the live talk permalink. Do not repeat separate PDF, schedule, or recording icons in that table row; those resources belong inside the talk page. Preserve all legacy rows and their existing individual resource icons, as well as the table's formatting and chronology.

## Verify the experience

Build using the repository's supported dependency workflow without rewriting its lockfile. Serve the generated site from `127.0.0.1`, not `localhost`, when R2 CORS is origin-specific.

Test at minimum:

- Mobile portrait around `390×844`.
- Mobile landscape around `844×390`.
- Desktop around `1440×900`.
- First, middle, and last slides; hash navigation; previous/next; swipe; keyboard; fullscreen when supported.
- Resource controls with keyboard focus and touch-sized targets.
- Icon-only resource controls expose their text on hover/focus and retain accessible names.
- The onboarded talk's `_pages/talks.md` row contains exactly one combined live-page resource link; legacy rows remain unchanged.
- Schedule, recording, and GitHub source controls open the exact external resources.
- Download href targets R2; validate it through response headers instead of causing an automated download.
- If a legacy or repository PDF exists for this talk, independently compare it with the published PDF/slides and fail validation on unexplained page-count, order, identity, or material-content differences. Do not accept the migration agent's comparison as proof.
- No horizontal overflow, clipped controls, failed manifest requests, or console errors.

Use the in-app browser when available for local responsive verification. Do not claim mobile quality without checking both portrait and landscape.

## Finish safely

Run syntax checks, the repository test/build command, and `git diff --check`. Summarize the normalized metadata, created page, R2 manifest/PDF URLs, links found or omitted, conversion limitations, and verification results. Include citations to the authoritative web sources used to validate the talk date, conference, schedule entry, and recording.

Commit or push only when the user explicitly requests it. Stage only files belonging to this talk workflow; never stage `.env.op`, source decks, generated bundles, or large PDFs.
