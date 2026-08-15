---
title: "Windows RCE as a Service"
talk_date: 2022-11-17
conference: "OWASP Global AppSec US 2022"
permalink: /talks/2022-11-17-owasp-global-appsec-us-2022-windows-rce-as-a-service/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2022-11-17_OWASP-US-2022_Windows_RCE_as_a_Service/latest.json
pdf_url: https://media.mbgsec.com/decks/2022-11-17_OWASP-US-2022_Windows_RCE_as_a_Service/slides.pdf
schedule_url: https://owasp2022globalappsecsf.sched.com/event/1BS5H/windows-rce-as-a-service
github_url: https://github.com/mbrg/power-pwn/wiki/Modules:-No%E2%80%90Code-Malware
description: "Windows 11 ships with a nifty feature called Power Automate, which lets users automate mundane processes. In a nutshell, Users can build custom processes and hand them to Microsoft, which in turn ensures they are distributed to all user machines or Office…"
abstract_source_url: "https://owasp2022globalappsecsf.sched.com/event/1BS5H/windows-rce-as-a-service"
abstract_retrieved_at: "2026-08-14"
---
<!-- talk-enrichment:start -->
## Abstract

Windows 11 ships with a nifty feature called Power Automate, which lets users automate mundane processes. In a nutshell, Users can build custom processes and hand them to Microsoft, which in turn ensures they are distributed to all user machines or Office cloud, executed successfully and reports back to the cloud. You can probably already see where this is going.

In this presentation, we will show how Power Automate can be repurposed to power malware operations. We will demonstrate the full cycle of distributing payloads, bypassing perimeter controls, executing them on victim machines and exfiltrating data. All while using nothing but Windows baked-in and signed executables, and Office cloud services.

We will then take you behind the scenes and explore how this service works, what attack surface it exposes on the machine and in the cloud, and how it is enabled by-default and can be used without explicit user consent. We will also point out a few promising future research directions for the community to pursue.

Finally, we will share an open-source command line tool to easily accomplish all of the above, so you will be able to add it into your Red Team arsenal and try out your own ideas.

_[Official conference abstract](https://owasp2022globalappsecsf.sched.com/event/1BS5H/windows-rce-as-a-service)_
<!-- talk-enrichment:end -->
