---
title: AIjacking Goes Beyond Prompt Injection
categories:
  - Blog
tags:
  - Hacking
  - AI
  - Prompt Injection
  - AIjacking
image: assets/images/2025-04-28-beyond-prompt-injection/preview.png
---

Naming is powerful. An excellent name does more than frame the problem, it hints at ownership, solutions, and urgency to address it. 
In a very real sense, they are like equivalence proofs in mathematics--allowing us to apply knowledge from one domain to the other.

When [Simon Willison’s](https://simonwillison.net/2022/Sep/12/prompt-injection/) *prompt injection* term got widely accepted, it changed reality for both the AI and security communities. 
We're still living in the reality this term has created.
But we are also confined by it, unable to mentally escape its comforting prediction.

AI researchers now had a fresh perspective they could leverage and learn from--that of trusted vs contaminated data. 
The solution of separating data from instructions follows, with excellent work like
[Instruction-Hierarchy](https://arxiv.org/abs/2404.13208) and [CaMeL](https://arxiv.org/abs/2503.18813).

Security practitioners had a wealth of experience they could now apply.
The hard lessons of SQL injection roared back from the late '90s.
Many of our most senior security leaders have lived through it. 
They did not need convincing that this is an important problem, nor that this is their problem to solve (with developers).
And they knew the solution: [establish vulnerability disclosure programs](https://www.mbgsec.com/blog/there-is-nothing-responsible-about-disclosure-of/), perform taint analysis to proactively identify issues, advocate for separation of data from instructions.

SQL-injection is a solved problem today, at least in the technical sense--use the right library, don't use `eval`-like functions, and you're covered.
Surely, AI labs will figure out a solution to prompt injection down the line. Right?

We have reaped the benefits of the term prompt injection, and we are much better for it.
But its ubiquitousness over time can limit our perspective.

We've started to conflate _The Problem_ with prompt injection.
But prompt injection is not the entire problem.
**The problem is that AI inherently does not follow instructions, and we act like it does.**
It follows our goals, an attacker's goals, or its own internal goals all the same.
Attackers exploit this to nudge your AI into accomplishing their goals.
So far we know they can do it through prompt injection directly and 
[indirectly](https://arxiv.org/abs/2302.12173) by [manipulating its environment](https://www.youtube.com/watch?v=FH6P288i2PE), 
and very indirectly [planting traps in its training data](https://x.com/tallmetommy/status/1902915877017985260).

It's not bad implementation of a particular AI agent.
Or a specific model that is just too damn susceptible to attacks ([they all are](https://x.com/elder_plinius)).
Faulty system instructions (fancy name for wrapped section of the prompt) are not it either.
The entire premise is flawed.

The term prompt injection makes us imagine malicious content coming in and tainting our well-behaved AI.
But AI is trained on the internet, remember?
The same internet we use, with its digital skyscrapers, dirty gutters and flourishing undergrounds.
We've become hyper-focused on building a security perimeter around AI (another echo from the '90s), 
and forgot to look up and stare at the damned thing--AI is tainted to its core.

-----

I was tempted to end this piece without a suggested alternative.
Feeling it would dilute my argument.
But making progress requires taking a step forward.

Back at BlackHat USA 2024 [I suggested the _Remote Copilot Execution_](https://labs.zenity.io/p/rce) (the term *Copilot* has lost favour since).
It has the clear benefit of drawing a parallel to Remote Code Execution, driving up urgency and emphasizing its open-endedness.
But the problem remains--RCEs are something bad that happens so well-behaved AI. 

**I suggest the term AI Hijacking, or *AIjacking*.**
**It places the emphasis on the outcome we'd like to avoid--attackers hijacking our AI--rather than how they do it.**

Hijacking our AI means an attacker can use its access and tools at their disposal.
It puts the emphasis on agentic AI.
An attacker only needs to hijack the agent's goal, and the agent figures out how to best use its capabilities to wreak havoc.