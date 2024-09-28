---
title: "Safe Web Browsing for Copilots"
categories:
  - Zenity Labs
tags:
  - Microsoft
  - Hacking
  - Red Team
  - AI
---

Allowing a copilot to search the web at will is extremely dangerous.
Here are two somewhat-understood vulnerabilities and how to mitigate them.
Note: this is an ever-evolving field and this is only what I know today. Who know what you'll know tomorrow!

The first vuln is prompt injection.

You should never blindly trust things written on the Internet, right? 
Well, GenAI is happy to follow any instructions, [if you write your them well](https://mbrg.github.io/genai-attacks/technique/prompt_injection.html).
A copilot with Internet access is always one search away from [a website with hidden malicious instructions](https://mbrg.github.io/genai-attacks/technique/web_poisoning.html),
getting taken over by an external attacker.

The second vuln is data exfiltration.

You know who else is on the Internet? Everyone else, including *them*.
If an attacker can compromise your copilot, they can [instruct it to search a website they control](https://mbrg.github.io/genai-attacks/technique/web_request_triggering.html).
That means copilot will reach out - proactively, without a user in the loop - to a website a hacker controls.
The common exploit is encoding data to-be-exfiltrated into a parameter.

We do have some design patterns to address these. Apply one of the following:

1. You could limit which website copilot can search. See [Content Security Policy](https://mbrg.github.io/genai-attacks/mitigation/content_security_policy.html) (employed by Microsoft Copilot and Google Gemini) and [URL Anchoring](https://mbrg.github.io/genai-attacks/mitigation/url_anchoring.html) (employed by ChatPT).

2. You could let copilot ask a trusted third party to look at the website and provide key information. See [Index-Based Browsing Security Policy](https://mbrg.github.io/genai-attacks/mitigation/index_based_browsing.html).

3. You can decide its too risky and remove web browsing entirely.