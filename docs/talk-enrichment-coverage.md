# Talk enrichment coverage

Generated 2026-08-14 by the repository-local `enrich-mbgsec-talks` skill. Working artifacts are ignored; published frontmatter is the authoritative public state.

## Coverage

| Measure | Count |
| --- | ---: |
| Talk pages | 69 |
| Official agenda links | 64 |
| Published agenda abstracts | 59 |
| Verified agenda exceptions | 10 |
| Resolved abstract records | 69/69 |
| Recording links | 47 |
| Recording-derived raw transcripts | 47 |
| Transcript candidates | 47 |
| Evaluator runs | 5 |
| LLM-reviewed published transcripts | 44 |

## Operating rule

Abstracts are copied from a validated official agenda source, including a transparently labeled official agenda for the exact same talk when the target event published none. Exhausted source searches remain explicit exceptions rather than generated substitutes. Transcripts are generated from recording audio, retain timestamped source segments, and are published only when deterministic checks and three independent LLM evaluator roles approve the exact candidate SHA-256.

Run `npm run talks:enrichment:report` after every batch. Use `npm run talks:enrichment:queue -- --stage transcribe --limit 5` to select a bounded recording batch. Follow `.agents/skills/enrich-mbgsec-talks/SKILL.md` for acquisition, evaluation, correction, approval, and publication commands.

## All talk pages

| Date | Talk | Abstract state | Recording | Transcript stage | Next action |
| --- | --- | --- | :---: | --- | --- |
| 2026-08-06 | `2026-08-06-bhusa2026-promptware-eod-skillful-agent-detonation` | published | — | no-recording | Abstract complete; No recording source listed |
| 2026-08-05 | `2026-08-05-bhusa2026-pwning-agentic-browsers-with-pleasefix` | published | — | no-recording | Abstract complete; No recording source listed |
| 2026-05-27 | `2026-05-27-ai-agent-security-summit-sf2026-no-country-for-old-ideas` | published | yes | complete | Abstract complete; Transcript complete |
| 2026-05-06 | `2026-05-06-bluehat2026-0click-enterprise-compromise-in-ai-systems` | published | yes | complete | Abstract complete; Transcript complete |
| 2026-04-30 | `2026-04-30-vertex-create-value-in-cybersecurity` | source-lacks-abstract | — | no-recording | Agenda verified without an abstract (2026-08-14); No recording source listed |
| 2026-03-23 | `2026-03-23-rsac2026-your-ai-agents-are-my-minions` | published | — | no-recording | Abstract complete; No recording source listed |
| 2026-03-04 | `2026-03-04-unprompted2026-perplexed-browser-pleasefix` | source-lacks-abstract | yes | complete | Agenda verified without an abstract (2026-08-14); Transcript complete |
| 2025-11-19 | `2025-11-19-intent2025-pwn-the-enterprise-thank-you-ai` | source-unavailable | yes | complete | Official agenda unavailable after archive search (2026-08-14); Transcript complete |
| 2025-11-13 | `2025-11-13-defcamp2025-0click-enterprise-compromise-thank-you-ai` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-11-07 | `2025-11-07-owasp-global-appsec-us-2025-owasp-aivss-project` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-11-07 | `2025-11-07-owasp-global-appsec-us-2025-owasp-citizen-development-project` | source-lacks-abstract | yes | complete | Agenda verified without an abstract (2026-08-14); Transcript complete |
| 2025-11-06 | `2025-11-06-owasp-global-appsec-us-2025-0click-enterprise-compromise-thank-you-ai` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-10-24 | `2025-10-24-ekoparty2025-0click-enterprise-compromise-thank-you-ai` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-10-08 | `2025-10-08-ai-agent-security-summit-sf2025-making-real-progress-in-security-from-ai` | published | — | no-recording | Abstract complete; No recording source listed |
| 2025-08-09 | `2025-08-09-why2025-0click-enterprise-compromise-thank-you-ai` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-08-06 | `2025-08-06-bhusa2025-ai-enterprise-compromise-0click-exploit-methods` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-04-30 | `2025-04-30-rsac2025-scaling-appsec-with-an-sdlc-for-citizen-development` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-04-29 | `2025-04-29-rsac2025-your-copilot-is-my-insider` | published | yes | complete | Abstract complete; Transcript complete |
| 2025-03-31 | `2025-03-31-ai-agent-security-summit-nyc2025-prompt-injection-is-not-a-bug-for-us-to-patch` | source-lacks-abstract | yes | complete | Agenda verified without an abstract (2026-08-14); Transcript complete |
| 2024-11-28 | `2024-11-28-defcamp2024-15-ways-to-break-your-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-11-19 | `2024-11-19-intent2024-living-off-microsoft-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-11-13 | `2024-11-13-ekoparty2024-15-ways-to-break-your-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-10-30 | `2024-10-30-bluehat2024-scaling-appsec-with-an-sdl-for-citizen-development` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-10-24 | `2024-10-24-hacklu2024-the-good-the-bad-and-the-ugly-microsoft-copilot` | published | yes | recording-exception | Abstract complete; Recording failed both independent ASR publication gates |
| 2024-10-24 | `2024-10-24-sector2024-15-ways-to-break-your-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-10-23 | `2024-10-23-iss-ohio2024-ai-empowers-your-business-what-does-that-mean-for-security` | source-lacks-abstract | — | no-recording | Agenda verified without an abstract (2026-08-14); No recording source listed |
| 2024-09-26 | `2024-09-26-owasp-globalappsec-sf2024-living-off-microsoft-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-08-08 | `2024-08-08-bhusa2024-living-off-microsoft-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-08-07 | `2024-08-07-bhusa2024-15-ways-to-break-your-copilot` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-08-07 | `2024-08-07-bhusa2024-arsenal-living-off-o365-land-with-powerpwn` | published | — | no-recording | Abstract complete; No recording source listed |
| 2024-06-27 | `2024-06-27-bsidestlv2024-all-you-need-is-guest` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-06-27 | `2024-06-27-owasp-globalappsec-lisbon2024-owasp-low-code-no-code-top-10` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-06-13 | `2024-06-13-x33fcon2024-all-you-need-is-guest` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-05-06 | `2024-05-06-rsac2024-all-you-need-is-guest` | published | yes | complete | Abstract complete; Transcript complete |
| 2024-05-02 | `2024-05-02-caro2024-all-you-need-is-guest` | published | — | no-recording | Abstract complete; No recording source listed |
| 2024-04-19 | `2024-04-19-t2-2024-all-you-need-is-guest` | published | — | no-recording | Abstract complete; No recording source listed |
| 2024-04-15 | `2024-04-15-sans-uk2024-ai-is-here-for-business-users` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-12-07 | `2023-12-07-bheu2023-entraid-guest-to-corp-data-dump-with-powerpwn` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-10-31 | `2023-10-31-owasp-globalappsec-dc2023-owasp-low-code-no-code-top-10` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-10-30 | `2023-10-30-owasp-globalappsec-dc2023-credential-sharing-as-a-service-the-dark-side-of-no-code` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-10-26 | `2023-10-26-sector2023-sure-let-business-users-build-their-own-what-could-go-wrong` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-10-25 | `2023-10-25-sector2023-all-you-need-is-guest` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-08-10 | `2023-08-10-blackhat-us-2023-all-you-need-is-guest` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-08-10 | `2023-08-10-blackhat-us-arsenal-2023-powerguest-aad-guest-exploitation-beyond-enumeration` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-08-09 | `2023-08-09-blackhat-us-2023-sure-let-business-users-build-their-own-what-could-go-wrong` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-08-09 | `2023-08-09-bsideslv-2023-wolves-in-windows-clothing-weaponizing-trusted-services-for-stealthy-malware` | published | yes | recording-exception | Abstract complete; Recording failed both independent ASR publication gates |
| 2023-08-09 | `2023-08-09-bsideslv2023-sure-let-business-users-build-their-own-what-could-go-wrong` | published | yes | recording-exception | Abstract complete; Recording failed both independent ASR publication gates |
| 2023-08-08 | `2023-08-08-bsideslv2023-all-you-need-is-guest-beyond-enumeration` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-05-17 | `2023-05-17-owasp-appsecil2023-sure-let-business-users-build-their-own-what-could-go-wrong` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-04-27 | `2023-04-27-rsac-2023-credential-sharing-as-a-service-the-dark-side-of-no-code` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-04-23 | `2023-04-23-bsidessf-2023-sure-let-business-users-build-their-own-what-could-go-wrong` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-04-23 | `2023-04-23-bsidessf2023-windows-11-at-your-service` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-04-22 | `2023-04-22-bsidesnyc-2023-low-code-high-risk-enterprise-domination-via-low-code-abuse` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-04-18 | `2023-04-18-sans-cybersecurity-leadership-summit-uk-2023-credential-sharing-as-a-service-the-dark-side-of-no-code` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-03-28 | `2023-03-28-codefrenzy-2023-credential-sharing-as-a-service-the-dark-side-of-no-code` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-02-28 | `2023-02-28-dc9723-no-code-malware-windows-11-at-your-service` | published | — | no-recording | Abstract complete; No recording source listed |
| 2023-02-15 | `2023-02-15-owasp-global-appsec-dublin-2023-credential-sharing-as-a-service-the-dark-side-of-no-code` | published | yes | complete | Abstract complete; Transcript complete |
| 2023-01-23 | `2023-01-23-workato-il-community-event-2023-automated-security-governance` | source-unavailable | — | no-recording | Official agenda unavailable after archive search (2026-08-14); No recording source listed |
| 2023-01-05 | `2023-01-05-rsac-365-owasp-top-10-security-risks-for-low-code-no-code` | published | yes | complete | Abstract complete; Transcript complete |
| 2022-11-19 | `2022-11-19-bsides-orlando-no-code-malware-windows-at-your-service` | published | yes | complete | Abstract complete; Transcript complete |
| 2022-11-19 | `2022-11-19-bsides-vienna-0x7e6-no-code-malware-windows-at-your-service` | published | — | no-recording | Abstract complete; No recording source listed |
| 2022-11-17 | `2022-11-17-owasp-global-appsec-us-2022-windows-rce-as-a-service` | published | — | no-recording | Abstract complete; No recording source listed |
| 2022-11-02 | `2022-11-02-lowcodecon-2022-how-to-govern-and-secure-low-code-no-code-apps` | source-lacks-abstract | yes | complete | Agenda verified without an abstract (2026-08-14); Transcript complete |
| 2022-10-28 | `2022-10-28-lascon-2022-no-code-risk-what-happens-when-we-leave-no-code-up-for-grabs` | source-lacks-abstract | yes | complete | Agenda verified without an abstract (2026-08-14); Transcript complete |
| 2022-09-22 | `2022-09-22-bsides-singapore-2022-malware-powered-by-windows-11-no-code` | published | — | no-recording | Abstract complete; No recording source listed |
| 2022-09-01 | `2022-09-01-owasp-global-appsec-apac-2022-no-code-risk-what-happens-when-we-leave-no-code-up-for-grabs` | source-unavailable | — | no-recording | Official agenda unavailable after archive search (2026-08-14); No recording source listed |
| 2022-08-31 | `2022-08-31-owasp-global-appsec-apac-2022-dominating-the-enterprise-via-low-code-abuse` | published | — | no-recording | Abstract complete; No recording source listed |
| 2022-08-13 | `2022-08-13-defcon30-low-code-high-risk-enterprise-domination-via-low-code-abuse` | published | yes | complete | Abstract complete; Transcript complete |
| 2022-08-13 | `2022-08-13-defcon30-no-code-malware-windows-11-at-your-service` | published | yes | complete | Abstract complete; Transcript complete |
