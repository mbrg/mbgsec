---
title: "The good, the bad, and the ugly: Microsoft Copilot (delivered by Inbar Raz)"
talk_date: 2024-10-24
conference: hack.lu 2024
permalink: /talks/2024-10-24-hacklu2024-the-good-the-bad-and-the-ugly-microsoft-copilot/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2024-10-24_The_good_the_bad_and_the_ugly/latest.json
pdf_url: https://media.mbgsec.com/decks/2024-10-24_The_good_the_bad_and_the_ugly/slides.pdf
schedule_url: https://pretalx.com/hack-lu-2024/talk/NNFQ3G/
recording_url: https://www.youtube.com/watch?v=TXJGdtpKU3k
github_url: https://github.com/mbrg/power-pwn
description: "The good: There's an insider working at your competition, helping you. The bad: There's also an insider working at your business, helping the competition. The ugly: It's Microsoft Copilot. The race to capture the benefits of GenAI is already at full speed,…"
abstract_source_url: "https://pretalx.com/hack-lu-2024/talk/NNFQ3G/"
abstract_retrieved_at: "2026-08-14"
transcript_status: "recording-quality-unusable"
transcript_status_checked_at: "2026-08-14"
transcript_status_note: "Two independent recording-derived ASR passes (mlx-community/whisper-large-v3-turbo, mlx-community/whisper-large-v3-mlx) failed the machine publication gate on 2026-08-14: LLM judges: security-reviewer. No transcript text was generated or manually filled."
---
<!-- talk-enrichment:start -->
## Abstract

The good: There's an insider working at your competition, helping you.
The bad: There's also an insider working at your business, helping the competition.
The ugly: It's Microsoft Copilot.

The race to capture the benefits of GenAI is already at full speed, and everybody is diving head-first into putting corporate data and operations in the hands of AI. The concept of a Copilot has emerged as a way to keep AI tamed and under control. However, while employees rarely cross the lines and become rogue, it turns out that Microsoft Copilot is rogue by design.

In this talk, we will show how your Copilot Studio bots can easily be used to exfiltrate sensitive enterprise data circumventing existing controls like DLP. We will show how a combination of insecure defaults, over permissive plugins and wishful design thinking makes data leakage probable, not just possible. We will analyze how Copilot Studio puts enterprise data and operations in the hands of GenAI, and expose how this exacerbates the prompt injection attack surface, leading to material impact on integrity and confidentiality.

Next, we will drop CopilotHunter, a recon and exploitation tool that scans for publicly accessible Copilots and uses fuzzing and GenAI to abuse them to extract sensitive enterprise data. We will share our findings targeting thousands of accessible bots, revealing sensitive data and corporate credentials.

Finally, we will offer a path forward by sharing concrete configurations and mistakes to avoid on Microsoft’s platform, and generalized insights on how to build secure and reliable Copilots.

_[Official conference abstract](https://pretalx.com/hack-lu-2024/talk/NNFQ3G/)_
<!-- talk-enrichment:end -->
