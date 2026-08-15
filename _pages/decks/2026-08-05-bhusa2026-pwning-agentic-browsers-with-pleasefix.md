---
title: "Pwning Agentic Browsers with PleaseFix: A New Vulnerability Class for 0-Click Takeover"
talk_date: 2026-08-05
conference: Black Hat USA 2026
permalink: /talks/2026-08-05-bhusa2026-pwning-agentic-browsers-with-pleasefix/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2026-08-05_BHUSA2026_PwningAgenticBrowsers_PleaseFix/latest.json
pdf_url: https://media.mbgsec.com/decks/2026-08-05_BHUSA2026_PwningAgenticBrowsers_PleaseFix/slides.pdf
schedule_url: https://blackhat.com/us-26/briefings/schedule/#pwning-agentic-browsers-with-pleasefix-a-new-vulnerability-class-for-0-click-takeover-53888
description: "Decades of isolation techniques and exploit mitigations are being intentionally dismantled to make way for agentic browsers. Atlas breaks Same-Origin Policy (SOP). Gemini and Edge add untethered localhost access. Comet opens up your filesystem. Claude…"
abstract_source_url: "https://blackhat.com/us-26/briefings/schedule/#pwning-agentic-browsers-with-pleasefix-a-new-vulnerability-class-for-0-click-takeover-53888"
abstract_retrieved_at: "2026-08-14"
---
<!-- talk-enrichment:start -->
## Abstract

Decades of isolation techniques and exploit mitigations are being intentionally dismantled to make way for agentic browsers. Atlas breaks Same-Origin Policy (SOP). Gemini and Edge add untethered localhost access. Comet opens up your filesystem. Claude executes scripts on any website, giving you XSS as a service. Their main mitigation is model safety training. These are design choices, not vulnerabilities. Subsequently, XSS, sandbox escapes, and drive-by exploitation are making a comeback! We uncover PleaseFix, the evolution of ClickFix as a new vulnerability class targeting agents rather than humans. We also craft Intent Collision, a universal technique to exploit it. We'll demonstrate just how bad it gets, with full end-to-end 0click attack chains on up-to-date flagship agentic browsers. User interaction with social media leads to drive-by exploitation, while weaponized calendar invites deliver targeted payloads. We use these entry vectors to achieve full account takeover of Slack, X, 1password, and Claude. Silently exfiltrate from Gmail, GDrive and the local filesystem. Persist long-term by deploying an implant via agent memory, drive files and browser history. We'll have some fun using your WhatsApp account for phishing, and your Amazon assistant to order our hacking equipment with your credit card. We'll wrap it up by achieving full RCE on your local machine, escaping the browser sandbox. Finally, we'll detail how some browser agents meaningfully made our lives as hackers difficult with creative engineering. We will share hard boundaries they implemented that limit AI agency, including deterministic filters and human reviews. We'll discuss the vulnerabilities we discovered to bypass these boundaries, the collaboration with affected vendors to improve security mitigations, and share conclusions applicable to anyone building agents.

_[Official conference abstract](https://blackhat.com/us-26/briefings/schedule/#pwning-agentic-browsers-with-pleasefix-a-new-vulnerability-class-for-0-click-takeover-53888)_
<!-- talk-enrichment:end -->
