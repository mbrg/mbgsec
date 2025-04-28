---
title: Beyond Prompt Injection
categories:
  - Blog
tags:
  - Hacking
  - AI
  - Prompt Injection
---

Naming is powerful. An excellent name does more than frame the problem, it hints at ownership, solutions, and urgency to address it. 
In a very real sense, they are like equivalence proofs in mathematics--allowing us to apply knowledge from one domain to the other.

When [Simon Willison’s](https://simonwillison.net/2022/Sep/12/prompt-injection/) _prompt injection_ term got widely accepted, it changed reality for both the AI and security communities. 
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

We've started to conflate _The Problem_ with the name that was coined to describe it.
Prompt injection is not the entire problem.
The problem is that AI inherently does not follow instructions, and we act like it does.
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

I am tempted to end this piece with a suggested alternative of my own.
But that would dilute my argument.
So I won't.