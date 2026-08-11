# Web validation protocol

Use web search for every talk, even when the user provides all metadata and links. Search results are discovery aids; only opened destination pages count as evidence.

## Validate the date and conference

1. Search the exact quoted talk title with the conference name/year. Also search the speaker name with the conference when known.
2. Open the official conference session page, program, schedule, or event archive. Prefer the exact session page over an event overview.
3. Confirm the public conference name/year and the session's actual calendar date. Distinguish the talk date from the overall event range, announcement date, video upload date, and deck modification date.
4. Use the calendar date in the event's local timezone when the source exposes times or timezone information.
5. Cross-check the official result against the source deck. If authoritative sources disagree, keep the conflict visible and ask before deriving a permalink or R2 slug.

## Validate the schedule URL

1. Prefer the official, stable session-detail URL.
2. Accept an official schedule index only when a stable fragment or query opens the exact session entry.
3. Open the final deep link and confirm the talk title, speaker or organization, conference, and date. Do not accept a redirect to a generic landing page, an internal search page, or a schedule entry for a similarly named talk.
4. Preserve a necessary fragment identifier; remove unrelated tracking parameters.

## Validate the YouTube recording

1. Search the exact talk title plus speaker and conference. Prefer the official conference, organizer, or speaker channel.
2. Open the final `youtube.com/watch` or `youtu.be` URL. Confirm that the video is public and that its title, channel, description, or visible event context identifies the same talk.
3. When page rendering is limited, use YouTube's official oEmbed metadata as an additional availability/title/channel check. Do not treat oEmbed alone as proof that a generically titled video is the right session.
4. Canonicalize the final link and remove playlist, share-session, and tracking parameters unless they are required to identify the recording.
5. Do not substitute a trailer, short clip, playlist, livestream waiting page, mirror, or search result without explicit user direction.

## Validate supplied links

- Apply the same checks to user-supplied URLs; user input establishes intent but does not eliminate link or identity validation.
- Follow redirects and record the canonical destination.
- Reject broken, private, sign-in-only, region-blocked, unrelated, or mismatched destinations.
- Omit an optional link when it cannot be verified, and tell the user exactly what was searched.

## Record evidence

Keep a compact table or equivalent notes while working:

| Field | Accepted value | Authoritative URL | Match evidence |
|---|---|---|---|
| Date/conference | `YYYY-MM-DD`, event name | Official schedule/session | Title, speaker, displayed date |
| Schedule | Exact deep link | Official conference domain | Correct session entry opens |
| Recording | Canonical YouTube URL | Official/verified channel | Title, speaker/event context, public availability |

Cite the authoritative URLs in the final response next to the values they support. Do not cite search-result pages.
