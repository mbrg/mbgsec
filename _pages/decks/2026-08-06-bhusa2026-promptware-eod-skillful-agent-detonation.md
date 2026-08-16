---
title: "Promptware EOD: Skillful Agent Detonation"
talk_date: 2026-08-06
conference: Black Hat USA 2026
permalink: /talks/2026-08-06-bhusa2026-promptware-eod-skillful-agent-detonation/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2026-08-06_BHUSA2026_PromptwareEOD_SkillfulAgentDetonation/latest.json
pdf_url: https://media.mbgsec.com/decks/2026-08-06_BHUSA2026_PromptwareEOD_SkillfulAgentDetonation/slides.pdf
schedule_url: https://blackhat.com/us-26/briefings/schedule/index.html#promptware-eod-skillful-agent-detonation-53921
description: "The AI agent supply chain has become a fertile ground for malware. It lurks in skill markdown files, rug-pulled MCP servers, misaligned models, and weaponized moltbook posts. In a blink of an eye, we find ourselves with an outdated supply chain security…"
abstract_source_url: "https://blackhat.com/us-26/briefings/schedule/index.html#promptware-eod-skillful-agent-detonation-53921"
abstract_retrieved_at: "2026-08-14"
---
<!-- talk-enrichment:start -->
## Abstract

The AI agent supply chain has become a fertile ground for malware. It lurks in skill markdown files, rug-pulled MCP servers, misaligned models, and weaponized moltbook posts. In a blink of an eye, we find ourselves with an outdated supply chain security model. Intelligence gathering based on build-time static scanning has been sidestepped by agents pulling, writing, and executing code at runtime. Standing on the shoulders of giants, we introduce an old-new approach: agent detonation chamber. Analysis based on kernel-level truths, not a wishful analysis by an LLM judge. We detonated tens of thousands of skills from public marketplaces, and uncovered hundreds of malicious skills. We'll reveal how cryptominers and infostealers blinded static scanning tools with trivial "these aren't the droids you're looking for" instructions, remaining undetected for months until we spotted them. Next, we dive into the detonation chamber design. We deploy two different agents into a malware detonation chamber. One is a victim agent instructed to install a suspicious artifact, and the other is a red teaming agent tasked with making the victim agent detonate its newly acquired skill. By comparing what the victim agent "thinks" it did with what the kernel knows happened, the chamber surfaces semantic compromises invisible to static tools. Encouraged by the low cost per detonation, we'll release a free agent detonation chamber as a public service. We'll couple it with open-source tooling to hook it up to your agents, so any installed artifacts that get detonated remotely have a chance to infect your systems. We produce familiar malware detonation reports that integrate well into age-old analyst workflows and threat intelligence feeds. We'll end by releasing Promptware eval, the first open source benchmark for malicious AI artifacts caught in the wild.

_[Official conference abstract](https://blackhat.com/us-26/briefings/schedule/index.html#promptware-eod-skillful-agent-detonation-53921)_
<!-- talk-enrichment:end -->
