---
title: Raptor Finds Root Cause of Cline's Supply-Chain Compromise
description: "Investigating the recent Cline CLI supply-chain compromise using the Raptor AI agent to conduct OSS forensics and uncover the root cause."
categories:
  - Blog
tags:
  - AI Agents
  - AI Security
  - Threat Intelligence
  - Supply Chain
header:
  teaser: /assets/images/2026-02-18-raptor-finds-cline-compromise/HBb2TkmWIAA9u68.jpeg
  og_image: /assets/images/2026-02-18-raptor-finds-cline-compromise/HBb2TkmWIAA9u68.jpeg
---

12 hours ago Cline [released](https://github.com/cline/cline/security/advisories/GHSA-9ppg-jx86-fqw7) an advisory about an unauthorized npm publication.
For 8 hours, installing Cline CLI resulted in also.. installing OpenClaw.
As [Johann said](https://x.com/wunderwuzzi23/status/2024027082397761621), you can't make this up.

The "unauthorized" language and the "benign compromise" got me interested.
Pretty quickly I spotted [Adnan Khan's blog](https://adnanthekhan.com/posts/clinejection/) -- full disclosure of a supply chain vulnerability in cline.
Attackers could steal repo auth tokens through prompt injection.
Adnan's blog mentions reaching out privately to cline on Jan 1st and repeatedly since, eventually resulting in full disclosure on Feb 7th (after no response).

This seemed like an amazing test case for [Raptor](https://github.com/gadievron/raptor) and its [/oss-forensics command](https://github.com/gadievron/raptor/blob/main/.claude/commands/oss-forensics.md).
I kicked off Raptor with this prompt:

> /oss-forensics look at this advisory: https://github.com/cline/cline/security/advisories/GHSA-9ppg-jx86-fqw7. how
pushed the malicious commit? what else did they do?

Long story short, it nailed it.
![Raptor finds the compromising user](/assets/images/2026-02-18-raptor-finds-cline-compromise/results.png).

This is an ongoing investigation, I will continue to update this blog with details.
You find the important pieces on [xitter](https://x.com/mbrg0/status/2024073788204240929).
Raptor works much faster than I do, so here is its [forensic report](/assets/files/2026-02-18-raptor-finds-cline-compromise/forensic-report.md) and [full session history](/assets/files/2026-02-18-raptor-finds-cline-compromise/raptor_session.html). 
Stay tuned.