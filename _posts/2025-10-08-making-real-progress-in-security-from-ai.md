---
title: Make Real Progress In Security From AI
description: "Links and deck for my keynote at AI Agent Security Summit, SF Oct 8. There's a big discrepancy between our feeling of progress and reality for hackers. AI security and safety benchmarks go up. But hackers don't notice. Their partying like its 1999. Security from AI has been going in the wrong direction, relying on soft boundaries like AI guardrails and safety training. We CAN make progress though. Reverse engineering different flagship AI agent systems reveals design choices that introduce hard boundaries. Ones that attacks cannot cross without a software vulnerability. We'll learn from these choices, and take a step back to offer a better way forward with defense in depth."
categories:
  - Blog
tags:
  - AI Agent Security Summit
  - AI Agents
  - AI Security
  - Hard Boundaries
header:
  teaser: /assets/images/2025-10-08-making-real-progress-in-security-from-ai/AIAgentSummit.png
  og_image: /assets/images/2025-10-08-making-real-progress-in-security-from-ai/AIAgentSummit.png
---

I gave a talk at the [AI Agent Security Summit](https://zenity.io/resources/events/ai-agent-security-summit-2025) on October 8th in San Francisco.
I'll post a blog version of that talk here shortly.

But for now, here are my links and references:

- [https://x.com/jack_w_lindsey/status/1972732219795153126](Anthropic applying mechanistic interpretability to a frontier model for the first time)
- [https://openai.com/index/the-instruction-hierarchy/](OpenAI's early attempts at "solving" prompt injection")
- [https://www.microsoft.com/en-us/security/blog/2024/06/26/mitigating-skeleton-key-a-new-type-of-generative-ai-jailbreak-technique/](Microsoft's early attempts at "solving" prompt injection)
- [https://www.youtube.com/@embracethered/videos](Johann's youtube channel)
- [https://monthofaibugs.com/](Johann's phenomenal Month of AI Bugs breaking any agentic app out there)
- [https://www.koi.ai/blog/postmark-mcp-npm-malicious-backdoor-email-theft](First MCP malware observed in the wild)
- [https://www.koi.ai/blog/mcp-malware-wave-continues-a-remote-shell-in-backdoor](Another MCP malware)
- [https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks](Prompt injection attack through MCP tool descriptions which we can dynamically changed by the server)
- [https://zenitymcp.com/](Zenity's MCP registry)
- [https://brave.com/blog/comet-prompt-injection/](Brave showing a prompt injection attack on Perplexity Comet that breaks CORS)
- [https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web](Perpelexity defending its stance that agents should not respect browser rules)
- [https://www.mbgsec.com/posts/2025-08-08-enterprise-ai-compromise-0click-exploit-methods-sneak-peek/](Our 0click persistent attack on ChatGPT and other flagship AIs)
- [https://embracethered.com/blog/posts/2024/chatgpt-macos-app-persistent-data-exfiltration/](Johann's original discovery of AI memory as a persistence mechanism)
- [https://www.makeuseof.com/ai-browser-for-privacy-brave-leo/](Brave's Leo AI intentionally nerfs its capabilities to stay secure)
- [https://embracethered.com/blog/posts/2023/chatgpt-webpilot-data-exfil-via-markdown-injection/](Johann's original discovery of markdown images as a data exfiltration vector)
- [https://www.aim.security/aim-labs/aim-labs-echoleak-blogpost](Aim Labs researchers find a bypass to M365 Copilot's image filtering mechanism)
- [https://noma.security/blog/forcedleak-agent-risks-exposed-in-salesforce-agentforce/](Noma researchers find a bypass to Agentforce's image filtering mechanism)
- [https://github.com/anthropics/claude-quickstarts/tree/main/computer-use-demo](Anthropic is saying computer use is dangerous)
- [https://x.com/AnthropicAI/status/1960417002469908903](Anthropic announcing Claude for Chrome, computer use for the browser)
- [https://x.com/cramforce/status/1954192748208066772](Malte Ubl (Vercel CTO)'s work on image-free markdown rendering)
- [https://www.anthropic.com/news/detecting-countering-misuse-aug-2025](Anthropic reporting on adversaries using Claude despite of AI guardrail)
- [http://aos.owasp.org/](OWASP Agent Observability Standard (AOS))