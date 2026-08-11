# Live deck publishing

The website contains only the deck viewer and a small page for each presentation.
Slide images, video, captions, and manifests are stored in the Cloudflare R2 bucket
`mbgsec-media` and served from `https://media.mbgsec.com`.

Official YouTube demos may remain on YouTube and use a click-to-load
privacy-enhanced embed. Put the validated 11-character `videoId`, an accessible
`title`, and percentage bounds in a slide's `youtube` array. The player accepts
video IDs only and constructs the `youtube-nocookie.com` URL itself.

## One-time uploader setup

Create an R2 API token in the Cloudflare dashboard with:

- Permission: **Object Read & Write**
- Bucket: **Apply to specific buckets only → `mbgsec-media`**

Do not put the access key or secret in this repository, an `.env` file, or chat.
Store them in the 1Password API Credential item named `mbgsec-deck-uploader` using
these fields:

- `s3_access_key_id`
- `s3_secret_access_key`
- `s3_endpoint`

The ignored local `.env.op` file contains only 1Password secret references. The
real values are injected into the uploader process by `op run`, and 1Password masks
them from command output.

## Prepare a deck bundle

Keep source decks in the ignored `.deck-sources/` directory and generated bundles
in `.deck-build/`. A bundle has this shape:

```text
.deck-build/my-talk/
├── deck.json
├── slides.pdf
├── slides/
│   ├── 001.webp
│   └── 002.webp
└── media/
    ├── demo.gif
    ├── demo.mp4
    └── demo-poster.webp
```

Copy `scripts/deck.example.json` to the bundle as `deck.json` and adapt it. Video
and animated-image positions use percentages of the slide: `x` and `y` are the
upper-left corner; `width` and `height` define the media rectangle. A slide may
contain multiple `animations` and `videos`. Relative media paths are resolved
from `deck.json`.

## Publish

Review the immutable, versioned object plan first:

```sh
npm run deck:publish -- --dir .deck-build/my-talk --slug my-talk
```

Then upload the planned objects through 1Password:

```sh
npm run deck:upload -- --dir .deck-build/my-talk --slug my-talk
```

To publish or replace only the downloadable PDF for an already-hosted deck:

```sh
npm run deck:publish -- --slug my-talk --pdf /path/to/my-talk.pdf
npm run deck:upload -- --slug my-talk --pdf /path/to/my-talk.pdf
```

PDFs are stored at `decks/my-talk/slides.pdf` in R2 with attachment metadata, so
the cross-origin Download button works without committing a large file to Git.

The publisher uploads all versioned files first and updates
`decks/my-talk/latest.json` last. An interrupted upload therefore does not break
the currently published deck.

For talk materials, use the existing date-first PDF stem as the deck slug, for
example `2026-08-06_BHUSA2026_PromptwareEOD_SkillfulAgentDetonation`. Use the
short SHA-256 of the source deck as the version segment, such as `0d0967a9`.

The underlying publisher can still use a dedicated AWS CLI profile as a fallback,
but the 1Password command is the standard workflow for this repository. The AWS
CLI is only an S3-compatible client; the storage and credentials are Cloudflare R2.

## Add the website page

Create a small tracked Markdown file such as `_pages/decks/my-talk.md`:

```yaml
---
title: My Talk
talk_date: 2026-08-06
conference: Example Conference 2026
permalink: /talks/my-talk/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/my-talk/latest.json
pdf_url: https://media.mbgsec.com/decks/my-talk/slides.pdf
schedule_url: https://conference.example.com/schedule/my-talk
recording_url: https://www.youtube.com/watch?v=example
github_url: https://github.com/example/my-talk
---
```

The `pdf_url`, `schedule_url`, `recording_url`, and `github_url` fields are optional.
Use `github_url` for a public source repository shared with the talk. The deck page
shows only the resource buttons whose URLs are present. Link the corresponding row
in `_pages/talks.md` to `/talks/my-talk/` when the live deck is ready.

## Source conversion notes

- PowerPoint and Keynote need to be rendered to one image per slide while their
  embedded video files and on-slide bounds are extracted into `deck.json`.
- Google Slides should be exported or copied locally first. Linked YouTube/Drive
  videos need explicit handling because they are references, not embedded files.
- Use MP4/H.264 for the widest browser support, and WebP or PNG for slide images.
- Keep the original deck and generated bundle outside Git; only the viewer and
  page belong in this repository. Publish large PDFs to R2.
