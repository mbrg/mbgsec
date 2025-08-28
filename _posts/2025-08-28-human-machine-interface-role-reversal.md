---
title: How Should AI Ask for Our Input?
description: "How should we reason about machines taking over"
categories:
  - Blog
tags:
  - UX
  - Human-Machine Interface
  - Software Engineering
  - AI Agents
header:
  teaser: /assets/images/2025-08-28-human-machine-interface-role-reversal/second.png
  og_image: /assets/images/2025-08-28-human-machine-interface-role-reversal/second.png
---

Enterprise systems provide a terrible user experience. 
That's [common knowledge](https://en.wikipedia.org/wiki/Common_knowledge).
Check out one of the flash keynotes about the latest flagship AI product by big incumbents.
Look behind the fancy agent, what do you see?
You'll likely find a form-based system with strong early 2000s vibes.
But don't laugh, yet.
We're no better.

There's a common formula for cybersecurity user experience.
A nice useless dashboard as eye-candy, an inventory, list(s) of risks, knobs and whistles for configs.
When Wiz came out a few years ago breaking the formula with their graph-centric UX, people welcomed the change. 
Wiz popularized graphs and toxic combinations of risk.
They came out with a simple and intuitive UX.
Graphs are part of the common formula now (ty Wiz).

The issue isn't modern look-and-feel.
You can find the common formula applied with the latest hottest UI framework if you wish, just go to your nearest startup.
It's that cybersecurity is a [complex system](https://en.wikipedia.org/wiki/Complex_system).
You can try to hide complexity away, to provide templates, to achieve the holy "turn-key solution".
But then you sell to a F50 and discover 20 quirky regulations of regional community banks vs. national banks, or dual-regulated entities.
Besides, your product expands.
You end up trying to cater your turn-key solution to hundreds of different diverging views.
So they average user who's got one or two use cases in mind must filter out the noise.

Wiz is still highly regarded, but their UX is far from simple. 
Just look at that side menu.
Enterprise UX is complex because enterprises are complex and cybersecurity is complex.

But we've got AI now.

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">I&#39;m building a notes app that builds itself<br><br>now everyone gets their dream notes app<br>will open source soon <a href="https://t.co/nf3Ntk9Q5H">pic.twitter.com/nf3Ntk9Q5H</a></p>&mdash; Omer Vexler (@omer_vexler) <a href="https://twitter.com/omer_vexler/status/1936177164086317486?ref_src=twsrc%5Etfw">June 20, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Not those pesky right-panel copilots.
What Omer Vexler is doing [above](https://twitter.com/omer_vexler/status/1936177164086317486) is very cool.
He interweaves usage with development.
If devs can use Claude Code to vibe-code their product's UX, let's go all in, and let customers do it directly.

Want a new report? Here you go.
Table missing a column? Not anymore.
You've never used 90% of the views? Hide them away.
Let every user see only what *they* care about and nothing more.
**Let them vibe-code *your* UX.**

Can we expect customers to *know* what they want and to vibe-code correctly?
I don't think so, but do we have to?
TikTok figures out who your are based on profiling your attention, via a very natural signal of you scrolling thru videos.
We can build AI agents that infer what users need right now even without them asking (p.s. remember privacy?).

Maybe we could finally have a great user experience that stays great *for you* even as products evolve for the needs of others.

But.
Do we even need a user experience anymore?

The reason why we have dashboards and lists and graphs is for us humans to reason about complex data.
To manage a complex process.
AI doesn't need any of that.
It just eats up raw, messy, beautiful data.

What interface do humans need when AI performs the analysis, handles the process, manages the program, and asks us for direction?

We might need an interface to review AI's work.
But there's a big difference between an interface for creation and one for review.
Think code review software (PRs) vs. IDEs.

I asked this question to a very smart friend.
He thought about it for a while.
Then he reversed the roles and asked: what interface does AI need to ask the human for input?

We're no longer designing user experiences. 
We're designing a machine-human interface.