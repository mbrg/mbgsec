# Source-format routes

Select the least lossy route that the current environment supports. Always inspect the source before deciding that a simple PDF render is sufficient.

## PowerPoint (`.pptx`)

1. Use the presentation tooling to inspect slide size, count, notes, text, images, transitions, animations, hyperlinks, and embedded/linked media.
2. Prefer PowerPoint or LibreOffice export for the PDF and slide renders when available. Compare representative renders against the source.
3. Inspect the OOXML package when media must be preserved. Resolve slide relationships to `ppt/media/` files and determine the owning shape's bounds before writing manifest overlays.
4. Convert extracted videos to a browser-safe MP4/H.264 variant only when required; retain captions and poster images when present.
5. Treat unsupported transitions and build animations as static final-state renders unless a faithful overlay can be produced.

## Google Slides

1. Use the connected Google Drive/Slides tooling for a supplied native deck or URL when available; preserve the original deck.
2. Export an authoritative PPTX or PDF copy into `.deck-sources/`. Use a stable local export to compute the content version.
3. Inspect linked YouTube/Drive videos separately. An exported PPTX or PDF may contain only a poster or hyperlink, not the media.
4. Do not assume that private Drive video URLs are publicly playable. Publish only media the user is authorized to expose and that the public viewer can fetch.
5. Render slide images from the native deck or best export and compare aspect ratio and representative slides.

## Keynote (`.key`)

1. Prefer Keynote's own export to PDF and PowerPoint because it best preserves layout and fonts.
2. Export slide images from Keynote when possible. If only a PPTX export is practical, follow the PowerPoint route and visually compare it with Keynote.
3. Inspect the Keynote package for original media only when necessary; do not depend on undocumented internal structure when an application export is available.
4. Expect some Keynote transitions, Magic Move effects, and builds to flatten. Preserve critical demonstrations as extracted video overlays when their placement is reliable.

## PDF or prepared images

1. Use the PDF skill to inspect page count, dimensions, text, and representative renders.
2. Check the PDF, existing page, recording, related deck versions, and user context for signs of video, animation, builds, or interactive demonstrations.
3. If media may be missing and no editable source or separate media is available, stop and ask the user for the original deck/media or explicit approval for a disclosed static fallback. Never infer that a PDF-only source means the original talk had no media, and never replace the old links with a static page without that approval.
4. Only after that check or explicit approval, render one image per page in order and preserve the original PDF as the downloadable file when it is authoritative.
5. A PDF cannot reliably reconstruct animation or embedded video behavior. Add media overlays only from separately supplied source files and verified coordinates.

## Existing web bundle

1. Validate `deck.json` against the current repository example and publisher.
2. Confirm every referenced local asset, MIME type, overlay bound, and slide order.
3. Reuse supplied renders when visually sound; do not recompress blindly.
4. Generate or accept a separate PDF if the talk needs a Download button.

## Output quality

- Keep slide filenames zero-padded so lexical and presentation order match.
- Use the source's true aspect ratio rather than assuming 16:9.
- Render at sufficient resolution for a large desktop stage; choose image quality by visual comparison, not a fixed byte target.
- Preserve text legibility, gradients, diagrams, code, and thin lines on representative slides.
- Always exclude hidden slides from rendered images, the interactive manifest, and the downloadable PDF. Treat hidden status as a publication boundary, not as a visual preference.
- Strip sensitive speaker notes, comments, and unused embedded assets unless the user explicitly wants them published.
- Never publish private URLs, credentials, source-only notes, or hidden material discovered inside the deck.
