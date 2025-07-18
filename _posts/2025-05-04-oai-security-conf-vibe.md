---
title: The Vibe at OpenAI's Inaugural Security Research Conf
description: "We're all n00bs figuring out AI security."
categories:
  - Blog
tags:
  - Hacking
  - Vulnerability Discovery
  - AI
  - Red Teaming
  - OpenAI
---

The conversation around AI is always about vibes.
So let's talk about the vibes at [OpenAI's inaugural Security Research Conference](https://www.linkedin.com/posts/daveaitel_thanks-everyone-for-coming-to-the-inaugural-activity-7324492962892046336-Gyu9) last week.

TL;DR: excitement, inquiry, humbleness.

A few observations stuck with me.
Most of these surprised me at the moment, but seem trivial in retrospect.

Walking into a room full of people whose work I've devoured for years was intimidating.
But everyone was genuinely curious and out to learn from each other.
There's a sense that [we are all n00bs](https://youtu.be/FH6P288i2PE?si=9TxeP06NUap2fJMk&t=2276) trying to figure it out.
It's humbling to see world-class experts step out of their zones and dive into emerging research.
Every hallway conversation initiated in fifth gear.
Folks were happy to openly share perspectives.
They immediately inquired about anything that seemed novel or different from their observations.

Most of the focus was placed on AI for security, not much on security from AI.
There was general consensus that prompt injection and hallucinations are a massive security problem.
When it came to solutions, most people believed that [prompt injection is not a solvable problem](https://www.mbgsec.com/posts/2025-04-29-there-is-nothing-responsible-about-disclosure-of/).
Though some -- particularly those who work at AI labs -- hinted at ongoing research, and expressed hopes of absorbing most of the problem away from customers.
I've made the case before why I believe this line of effort is futile, and [we need a radically new approach](https://www.mbgsec.com/posts/2025-04-28-beyond-prompt-injection/).

The relationship between government and OpenAI was palpable.
Observable from friendly relationships, and the strong emphasis on policy conversations relative to security conferences: opening keynote, multiple talks.
Most subtly -- physical security guards at every corner also gave it away.
These left an overwhelming appreciation of what's at stake at the national level (or even Western level).
Last time I sensed that mix of urgency and gravitas I was in uniform.

![OpenAI Security Research Conference Badge](https://mbgsec.com/assets/images/2025-05-04-oai-security-conf-vibe/9741B7CF-7828-4E6C-AA0A-5A3644E1173D_1_105_c.jpeg)

In government circles, 0day development remains the pinnacle of security research.
I almost forgot about that, having spent more than a decade out in industry where we're still struggling with *"the basics"*.
It explains then why the allure of having AI find 0days is so strong.
Its intuitively understood as the ultimate test of intelligence.
An exciting goal for both security and AI researchers.

There is a ton of innovation in and around [AIxCC](https://aicyberchallenge.com/), both by contestants and at DARPA.
That was expected.
I was flabbergasted the first time I learned about [CGC](https://www.darpa.mil/research/programs/cyber-grand-challenge).
It seemed futuristic and, to be honest, unattainable even though I was learning about it in retrospect.
The most exciting thing about AIxCC innovation -- they seem to be applicable to all of us right now.
I'll be following the teams very closely from now on.
Can't wait to read the writeups.

People have built incredibly capable autonomous systems already.
These systems are discovering vulnerabilities in Open Source projects, pen-testing web services, crafting patches.
Rather than relying on traditional security tooling, they lean on the LLMs.
As [Dave Aitel](https://x.com/daveaitel) put it in his keynote, the LLM **understands and reasons** rather than scans.
Bugs are miscommunications in LLM's native language -- code.
Incredible results are achieved by combining software engineering and data science skills, no heavy model-training required. 
There is a general feeling that we're crossing a chasm and everything is about to change.

I really appreciate OpenAI bringing the community together, and everyone that contributed and shared their perspectives.
A huge thank you [Dave Aitel](https://x.com/daveaitel), [Matt Knight](https://x.com/embeddedsec) and [Ian Brelinsky](https://www.linkedin.com/in/ianbre) for throwing a welcoming, super interesting and fun conference!