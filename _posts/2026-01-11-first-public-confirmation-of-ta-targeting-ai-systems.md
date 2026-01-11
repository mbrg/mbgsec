---
title: First Publicly Confirmed Threat Actor Targeting AI Systems
description: "Security researchers have publicly confirmed, for the first time, that threat actors are actively scanning and probing enterprise AI systems for exploitation. Correlated observations from DefusedCyber and GrayNoise show systematic reconnaissance of exposed LLM endpoints—using techniques associated with known CVE exploitation pipelines—marking a shift from theoretical AI risk to active adversary behavior."
categories:
  - Blog
tags:
  - AI Agents
  - AI Security
  - Threat Intelligence
header:
  teaser: /assets/images/assets/images/2026-01-11-first-public-confirmation-of-ta-targeting-ai-systems/aita.png
  og_image: /assets/images/assets/images/2026-01-11-first-public-confirmation-of-ta-targeting-ai-systems/aita.png
---

Over the past year I've been asking people the same question over and over again: **when your AI systems are targeted, will you know?**

Answers vary in elaboration of compensating controls, but the bottom line is almost always the same--No.
Some even go the extra mile and say that AI security threats are all fruits of red team imagination.

On the offensive side, AI red teamers are [having a ball](https://mbgsec.com/posts/2025-08-08-enterprise-ai-compromise-0click-exploit-methods-sneak-peek/).
Ask your friendly AI hackers and they will all tell you, it feels like the 90s again.
From our own RT perspective, there isn't a single AI system we've observed and we're able to compromise within hours.

![It's the 90s again](https://mbgsec.com/assets/images/2026-01-11-first-public-confirmation-of-ta-targeting-ai-systems/90s.png)

Enterprise security teams have been seeing the other side of this: massive risk taking.
The hype-tweet-to-prod-deployment at a F50 bank has never been shorter.
Sama posts about the latest AI thingy (agentic browers, coding assistants, ...) and C-level execs ask how fast can we adopt it. 
The gold rush is in full swing.

We have massive risk taking throughout the industry.
With bleeding edge tech that is so vulnerable that (good) hackers are feeling like we've digressed to the era of SQL injection everywhere.
So where are the massive new headlines of devastating breaches?

Joshua Saxe called this the [AI risk overhang](https://substack.com/inbox/post/183640704), accepting the narrative that attackers aren't there yet.
So, asking that question again: When your AI systems are targeted, will you know?
**Of course not. Most aren't even looking.**

One major thing here is that AI system breaches can still be hidden away from public view.
We've observed first hand attackers poking around at AI systems.
People share stories in private forums.
But there isn't yet a publicly confirmed incident.

Or there wasn't--until now.
A few days ago [DefusedCyber observed](https://xcancel.com/DefusedCyber/status/2009007964246692130) _"an actor actively trying to access various LLM pathways, querying multiple different honeypot types for OpenAI, Gemini & Claude endpoints"_.

![DefusedCyber post](https://mbgsec.com/assets/images/2026-01-11-first-public-confirmation-of-ta-targeting-ai-systems/defusedcyber.png)

A day after, [boB Rudis at GrayNoise reported](https://www.greynoise.io/blog/threat-actors-actively-targeting-llms) on similar activity:

> Starting December 28, 2025, two IPs launched a methodical probe of 73+ LLM model endpoints. In eleven days, they generated 80,469 sessions—systematic reconnaissance hunting for misconfigured proxy servers that might leak access to commercial APIs.
> 
> The attack tested both OpenAI-compatible API formats and Google Gemini formats. Every major model family appeared in the probe list:
> 
> - OpenAI (GPT-4o and variants)
> - Anthropic (Claude Sonnet, Opus, Haiku)
> - Meta (Llama 3.x)
> - DeepSeek (DeepSeek-R1)
> - Google (Gemini)
> - Mistral
> - Alibaba (Qwen)
> - xAI (Grok)

But they got more than that.
The two IPs GrayNoise observed scanning the internet for AI system API formats were previously observed **exploiting** known CVEs.
So we know its not "good" researchers. 
It's someone actively trying to exploit vulnerable endpoints out there.
Exploitation attempts included React2Shell, which to me (together with the noisy nature of these scans) suggests an opportunistic and financially motivated actor (i.e. cybercrime).
boB's assessment:

> Assessment: Professional threat actor conducting reconnaissance. The infrastructure overlap with established CVE scanning operations suggests this enumeration feeds into a larger exploitation pipeline. They're building target lists.
>
> ...
>
> Eighty thousand enumeration requests represent investment. Threat actors don't map infrastructure at this scale without plans to use that map. If you're running exposed LLM endpoints, you're likely already on someone's list.

This is **the first public confirmation of a threat actor targeting AI systems**.
Huge find by DefusedCyber and boB @ GrayNoise.
This changes the calculus.
We now have all three: 
1. Rapidly expanding AI attack surface - the enterprise AI gold rush
2. Profound exploitability of AI systems - applications are vulnerable when they have an exploitable bug; agents are exploitable
3. Threat actors actively search for exposed AI systems (1) to exploit (2)

What to do next?
First, we need to update our world view.
And I need to update my question.
It's no longer "when your AI systems are targeted, will you know?".
The question to ask yourself and your org now is: **"Your AI systems are actively targeted by threat actors. Do you know which of is exposed? which has already been breached?"**

## P.S Learning From The Threat Actor's Choice of Prompts

### LLM literacy by the Threat Actor

Once a threat actor finds an exploitable AI system, what will they do with it? How LLM literate are they?

Let's start with the second question.
Look at the prompts used by the threat actor to ping the AI systems they found:

![Test queries performed by the threat actor, GrayNoise](https://mbgsec.com/assets/images/assets/images/2026-01-11-first-public-confirmation-of-ta-targeting-ai-systems/aita.png)

Asking _"What model are you"_ is a rather straightforward way to figure out if you're talking to a state of the art model or something running in somebody's basement.
But the last query is most revealing: _"How many letter r are in the word strawberry?"_.
This query was all the rage on social media before the launch of OpenAI's o1 model, that created the vibe shift into focusing on reasoning models.
It's an effective litmus-test to verify that the model you're talking it is close to SOTA.
This is very important, because ~SOTA models are more expensive and more powerful.

Crucially, this shows that **the threat actor is AI literate**.
At least in prompt engineering, which is the same skill you need for prompt injection.

### What Can the Threat Actor do With Discovered AI Systems?

First, if you want to [use LLMs for malicious operations](https://www.anthropic.com/news/detecting-and-countering-malicious-uses-of-claude-march-2025), using one through stolen access is a great way to avoid detection.
With bonus points for letting someone else pick up the bill.

But if those systems have access to enterprise data.
Or enterprise credentials.
Or worse--they can make business decisions.
Said differently, if these AI systems are AI agents.
Well then.