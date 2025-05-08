---
title: Fully-Autonomous AI Systems Are Discovering Vulnerabilities Today
categories:
  - Blog
tags:
  - Hacking
  - Vulnerability Discovery
  - AI
  - Red Teaming
  - OpenAI
---

This is part 2 on OpenAI's Security Research Conference. [Here is part 1](/posts/2025-05-04-oai-security-conf-vibe.md).

People have built incredibly capable autonomous systems already.
Some under the umbrella of AIxCC, and some independently ([Dan Guido](https://x.com/dguido), Tyler Nighswander, [Xinyu Xing](https://x.com/xingxinyu), [Matthew McLure](https://www.linkedin.com/in/ACoAAAscunYBw7DKenrTnIShCO-6MjkP8PFDiko), [Dave Aitel](https://x.com/daveaitel), [Oege de Moor](https://x.com/oegerikus)).
These systems are discovering vulnerabilities in Open Source projects, pen-testing web services, crafting patches.
One of these systems, XBOW, is now first in the [HackerOne US leaderboard](https://hackerone.com/leaderboard?year=2025&quarter=2&owasp=a1&country=US&assetType=WEB_APP&tab=bbp).
Most powerful results were demonstrated on visible source code and nudgeable APIs.
We've seen AI reasoning over an entire codebase, honing in on auth-related classes, get confused and pigeonholed, reason out of it.
Binary analysis was mentioned several times as the next step.
While initial intuitions relied on traditional static analysis and fuzzing to guide AI, these are now set aside.
As Dave Aitel put it in his keynote, the LLM **understands and reasons** rather than scans.
Bugs are miscommunications in LLM's native language -- code.

![XBOW leads the HackerOne US leaderboard true to May 5th, 2025](/assets/images/2025-05-08-oai-security-conf-automated-vuln-discovery/Screenshot_2025-05-05_at_11.23.56.png)

The people building these incredible systems are not training models (tho say its the next step).
The are building **scaffolding** -- software that uses LLMs in just the right way to squeezes maximum value.
They spend their time experimenting with context.
Is it better to chuck in the entire codebase? The current location with 100 lines from each side? 200 lines?
Do the outputs of traditional security tools help?
They also benchmark models for specific tasks.
Finding that just because a model is good for writing code it doesn't mean that its good for reading it.
They create evals that help them track which model is best for a given sub-task as-of-today.
On top of building an AI harness, they also have to solve real engineering problems.
Support an obscure build system.
An uncommon language.
These challenges seem very similar to those Cursor and other coding assistants have to solve.

These left a very strong impression on me.
We are going to see a fundamental change in the analysis systems we build and use.
That shift is possible with the models we've got today.

While the tech is there, a common theme has been that humans are just not ready for it.
Code maintainers won't know what to do with hundreds of vulnerabilities submitted all at once.
Trust in automated systems is low in the first place.
Human systems (i.e. companies) are complicated and often learn the wrong lesson.
Fixing vulnerabilities is going to be much harder than finding them, at least in the short term.
That is a scary thought.