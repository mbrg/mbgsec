---
title: Sam Altman on Security From AI
categories:
  - Blog
tags:
  - Hacking
  - Vulnerability Discovery
  - AI
  - Red Teaming
  - OpenAI
---

This is part 3 on OpenAI's inaugural Security Research Conference. Here are [part 1](https://mbgsec.com/posts/2025-05-04-oai-security-conf-vibe.md) and [part 2](https://mbgsec.com/posts/2025-05-08-oai-security-conf-automated-vuln-discovery.md).

As soon as they opened up the room for questions I raised my hand.
I was preparred.
I also primed Matt in advance, joking if we could ask *"real questions"*, to which he replied -- what is a *real* question?

I ended up asking two questions (thank you Ian).
Here is an imperfect summary of a few questions and answers I found interesting, including my own.
These are my recollections after more than 48 hours and 24 hours in an airplane, so please take it with a grain of salt.

**Question:** LLMs were a black box from the get go, and are only getting more obscure with reasoning models. How can we trust them if we can't figure out what they are doing?

**Answer:** Doesn't have high hopes for mechanical interpterability, much of the results have been over-stated. They do have other promising ideas. He belives that hallucination will be solved.

**Question:** Content moderation is pushing offensive security researchers to use weaker models (not OpenAI). Would you consider a program where they could get unfiltered access to models?

**Answer:** Yes, we are thinking about it. We want the good guys to have a head start.

**Question:** What security problems you think the community should focus about, besides prompt injection?

**Answer:** Privacy. Attackers getting the model to regeagerate training data, thereby getting access to infromation they shouldn't have access to ([MB] another user's data used for training).

**Question:** Given that, as you stated, prompt injection is still a big problem, and getting to 99.999% wouldn't prevent attackers from getting their way, how should people think about deploying agents that can now have tools that can make real harm?

**Answer:** People should not deploy agents that can make real harm. He believes that some of the research they are working on could solve prompt injection 100% of the time. ([MB] asking around, OpenAI researchers do not agree)

**Answers to questions I cannot recall:** 

- OSS
- GPT4

![Sam Altman thinking about a question; Matt Knight preparring to fire the next one](https://mbgsec.com/assets/images/2025-05-12-oai-security-conf-sam-altman/8B3E9522-5A28-4F34-AF36-0FC4463CB955_1_105_c.jpeg)