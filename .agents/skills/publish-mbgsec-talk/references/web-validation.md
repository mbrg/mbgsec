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

## Validate the video recording

1. Search the exact talk title plus speaker and conference. Prefer the official conference, organizer, or speaker channel.
2. Open the final public video URL. Confirm that its title, channel or account, description, or visible event context identifies the same talk. YouTube, Vimeo, and other stable official hosts are equally valid.
3. When page rendering is limited, use the provider's official oEmbed metadata, when available, as an additional availability/title/channel check. Do not treat oEmbed alone as proof that a generically titled video is the right session.
4. Canonicalize the final link and remove playlist, share-session, and tracking parameters unless they are required to identify the recording.
5. Do not substitute a trailer, short clip, playlist, livestream waiting page, mirror, or search result without explicit user direction.

## Validate shared GitHub source code

1. Search the exact talk title, project name, speaker, and conference with `site:github.com`.
2. Prefer a public repository owned by the speaker, research team, or their organization, or a repository linked directly from an authoritative talk or project page.
3. Open the repository or talk-specific source path and confirm its README, description, release notes, or linked materials connect it to the talk's project or demonstration.
4. Use the narrowest durable URL that contains the shared source. Do not use a generic profile, organization page, search URL, issue, fork, unrelated similarly named project, or repository without a clear identity match.
5. Omit GitHub fields when public source has not been shared or the match cannot be validated. Use `github_url` for one validated repository or a labeled `github_urls` list when multiple distinct repositories are directly shared by the talk.

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
| Recording | Canonical public video URL | Official/verified channel or account | Title, speaker/event context, public availability |
| Source code | Public GitHub repository/path | Speaker, team, or official project source | README/project identity and talk connection |

Cite the authoritative URLs in the final response next to the values they support. Do not cite search-result pages.
