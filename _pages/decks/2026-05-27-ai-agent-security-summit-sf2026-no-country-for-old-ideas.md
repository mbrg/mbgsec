---
title: "No Country for Old Ideas"
talk_date: 2026-05-27
conference: AI Agent Security Summit by Zenity Labs @ SF 2026
permalink: /talks/2026-05-27-ai-agent-security-summit-sf2026-no-country-for-old-ideas/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2026-05-27_AgentSecuritySummit_NoCountryForOldIdeas/latest.json
pdf_url: https://media.mbgsec.com/decks/2026-05-27_AgentSecuritySummit_NoCountryForOldIdeas/slides.pdf
schedule_url: https://zenity.io/resources/events/ai-agent-security-summit-san-francisco#no-country-for-old-ideas
recording_url: https://www.youtube.com/watch?v=KSSfhQOPJNw
description: "We've all seen the ads: defeating prompt injection by design, agents built to be robust against attack, secure by design. Benchmarks go up. Frameworks get named. But hackers are still partying like it's 1999. Perverse incentives are blinding us from…"
abstract_source_url: "https://zenity.io/resources/events/ai-agent-security-summit-san-francisco#no-country-for-old-ideas"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://www.youtube.com/watch?v=KSSfhQOPJNw"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "ac5e206f4f69f4a8f022ca229e4cdb2240ee20433c95c1d178a2d7b7b52d3cb3"
---


<!-- talk-enrichment:start -->
## Abstract

We've all seen the ads: defeating prompt injection by design, agents built to be robust against attack, secure by design. Benchmarks go up. Frameworks get named. But hackers are still partying like it's 1999. Perverse incentives are blinding us from looking the problem in the eye, and we keep reaching for mitigations dressed up in language that fits the AGI narrative. As agents are being baked into crown jewels -- it's no longer funny. This session cuts through the charade and gets rigorous: what mitigations actually work, what fails and why, what remains dangerously underexplored, and where the honest boundaries of our knowledge sit.

_[Official conference abstract](https://zenity.io/resources/events/ai-agent-security-summit-san-francisco#no-country-for-old-ideas)_

## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Opening Remarks and Community Appreciation

[00:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=0s) **Presenter:** This was an amazing day. Before I start, I just want to say thank you to all of our speakers, to everybody that made this day possible, to our marketing folks that have created this wonderful event, even though we kind of forbid them from seeing your emails.

[00:25](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=25s) **Presenter:** And for all of you for just being here and talking to each other and kind of building a community together. So thank you for that.

[00:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=34s) **Presenter:** I'm going to finish us off with trying to figure, to go through, to take kind of a step back long into the past when all of this got started, like a couple of years ago.

[00:48](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=48s) **Presenter:** And try to figure out together what are the ideas that we've had as a community that has been successful.

[00:55](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=55s) **Presenter:** And which ideas have failed miserably and have taken us down the wrong path.

### Reflecting on Past Ideas and Missteps

[01:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=60s) **Presenter:** And if you've seen any of my kind of content before that, then you know that I think most of our ideas are bad.

[01:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=67s) **Presenter:** And have led us down the wrong direction. And so I think it's really time for us to shed those away.

[01:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=75s) **Presenter:** And focus on the things that really help. So I've been using this slide for a long time now.

[01:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=81s) **Presenter:** Because we live in a world, in like a bifurcated world, where if you ask the scientists, if you ask the people in the labs, if you ask the vendors, they will tell you, don't worry.

[01:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=93s) **Presenter:** We got this thing sorted. We have this garden and that garden.

[01:37](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=97s) **Presenter:** You remember instruction hierarchy by OpenAI that was going to fix this problem?

[01:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=102s) **Presenter:** So this problem from their side, it's going away. The benchmarks are great.

[01:46](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=106s) **Presenter:** We get to 99%. The prompt injections don't work.

### The Rise of Agent Capabilities and Emerging Threats

[01:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=110s) **Presenter:** Ask any red teamer and they will tell you that that's nonsense.

[01:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=114s) **Presenter:** That's just nonsense. We haven't found a single agent so far that we were not able to hack.

[02:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=120s) **Presenter:** And it's not necessarily that difficult. Like some of them might kind of obfuscate things.

[02:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=127s) **Presenter:** But when I say hack, I mean I get it to do whatever I want.

[02:11](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=131s) **Presenter:** And we all are right now giving agents the ability to actually operate on our environment, send emails, touch a production database.

[02:19](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=139s) **Presenter:** Guess what? I have that access now as well.

[02:22](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=142s) **Presenter:** And the hacks that we showed like at Black Hat this year, last year, the year before that, they still work.

[02:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=149s) **Presenter:** We just change the prompt. And of course today we don't write the prompt.

[02:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=153s) **Presenter:** The AI writes the prompt. So this kind of world where we're living in, that's the last summit.

[02:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=160s) **Presenter:** So today I feel like we are making a little progress. Like just a little progress.

[02:46](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=166s) **Presenter:** I want to explain what kind of progress that is. But in order to do that, I want us to go through the journey of how we reacted as an industry, as a community, to the different investments in AI.

[03:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=181s) **Presenter:** And where do we keep failing?

[03:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=185s) **Presenter:** So this is going to be a nice little game we're going to play. It's called Burying Our Heads in the Sand.

[03:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=192s) **Presenter:** And let's figure out how can we bury our heads in the sand for each one of these different things.

[03:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=198s) **Presenter:** So back when this all got started, ChatGPT became a thing.

[03:23](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=203s) **Presenter:** Then pretty soon after, Microsoft said, oh, here's cool tech. Let's plug it into everybody's enterprise systems.

[03:30](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=210s) **Presenter:** And so what's, and once, while this happened, the threat very quickly became real.

[03:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=218s) **Presenter:** Right? And in this time, prompt injection was coined as a term.

### Historical Failures and the Need for New Controls

[03:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=222s) **Presenter:** And we also saw the first kind of what if, what could go wrong? What could that mean?

[03:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=227s) **Presenter:** Where were we focused on that time? You remember?

[03:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=230s) **Presenter:** Don't let my employees talk to ChatGPT. No, no, none of that. We are not going to use AI here.

[03:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=236s) **Presenter:** Don't let anybody paste corporate data into ChatGPT.

[03:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=239s) **Presenter:** So that was what we focused on for two years.

[04:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=242s) **Presenter:** Instead of, so now we have like six months to figure out what do we do with Mythos.

[04:06](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=246s) **Presenter:** We wasted two years worrying about our employees using ChatGPT.

[04:10](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=250s) **Presenter:** Okay, so, and by the way, prompt injection, we didn't care about that.

[04:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=255s) **Presenter:** That was back when everybody believed the labs were going to fix it.

[04:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=258s) **Presenter:** Okay. The year after that, that was the year of Microsoft making, like having this really big, big, big lead ahead of everybody.

[04:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=268s) **Presenter:** And they were pushing co-pilot and then co-pilot studio.

[04:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=273s) **Presenter:** The first like agent system that hit the enterprise.

[04:35](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=275s) **Presenter:** And that was like happening everywhere.

[04:39](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=279s) **Presenter:** And on top, well, something about my slides is wrong here.

[04:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=287s) **Presenter:** Well, but while this thing is happening, of course, we are focused on, hey, guard does like MSF.

[04:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=294s) **Presenter:** Don't worry, everything is going to be fine.

[04:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=297s) **Presenter:** And don't let co-pilot touch, like expose to my customers any sensitive data.

[05:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=302s) **Presenter:** Don't let anybody see sensitive data through co-pilot.

### Misalignment, Intent, and the Future of Agent Security — Part 1

[05:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=305s) **Presenter:** Where is that now? That's kind of gone.

[05:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=307s) **Presenter:** I've gone from our minds.

[05:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=309s) **Presenter:** So, 2025, we are starting to see like the real agents coming in.

[05:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=316s) **Presenter:** We are seeing cloud code.

[05:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=318s) **Presenter:** We are seeing all of the different agentic browsers.

[05:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=321s) **Presenter:** We are seeing the invention of the term vibe coding.

[05:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=326s) **Presenter:** And what do we see like in terms of risks?

[05:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=328s) **Presenter:** We are seeing that installation of new software is now just ask your AI to install the thing.

[05:36](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=336s) **Presenter:** And AI goes and it's like, for example, just installing cloud code, you just curl into a script and then you just execute it.

[05:46](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=346s) **Presenter:** We know of better ways to install software.

[05:49](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=349s) **Presenter:** We just forgot about them, right?

[05:51](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=351s) **Presenter:** We are seeing the cyber challenge from DARPA.

[05:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=358s) **Presenter:** Well, this was like two years ago.

[06:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=361s) **Presenter:** We knew that AI hacking is coming.

[06:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=364s) **Presenter:** We knew that fixing bugs automatically is after that.

[06:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=368s) **Presenter:** It's like lagging behind.

[06:10](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=370s) **Presenter:** So, if you just looked, just ask the people on the DARPA contest before the finals at DEF CON last year, what is going on?

[06:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=378s) **Presenter:** They told you, hey, we are finding zero days in like by accident.

[06:23](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=383s) **Presenter:** We knew this was coming.

[06:25](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=385s) **Presenter:** But our head was like deeply in the sand.

[06:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=388s) **Presenter:** We also saw the first in 2025, the first occurrences of AI agents, like wrecking havoc in environments.

[06:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=398s) **Presenter:** I'm not sure if you, like how many of you know of this example, but this was the first kind of public case of AI basically wrecking a production database by mistake.

[06:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=407s) **Presenter:** So, the guy asked for some fixes and production and instead, the AI just deleted the entire production database with all of the backups.

[06:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=416s) **Presenter:** And this was again 2025.

[06:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=418s) **Presenter:** What were we focused on in 2025 as a security community?

[07:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=423s) **Presenter:** Plain whack-a-mole, of course.

[07:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=425s) **Presenter:** So, guardrails, of course, are going to save us.

[07:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=428s) **Presenter:** Don't worry.

[07:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=429s) **Presenter:** Let any of the agents touch sensitive data and dislike agents poll problem, which is, hey, everybody can create agents.

[07:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=436s) **Presenter:** So, can we find them?

[07:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=438s) **Presenter:** Can we nuke them?

[07:19](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=439s) **Presenter:** Right?

[07:20](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=440s) **Presenter:** That was what we were after.

[07:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=441s) **Presenter:** You see why we have six months now?

[07:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=444s) **Presenter:** Because we've been like with our heads in the sand.

[07:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=446s) **Presenter:** So, where are we focused today?

[07:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=449s) **Presenter:** So, now, 2026, we have these major, major events that are, to be honest, mostly events that are about just things that the people that were kind of focused on this problem knew for a long time.

[07:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=462s) **Presenter:** They are now public knowledge.

[07:44](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=464s) **Presenter:** And that came in because of two things, OpenClaw and Mythos.

[07:48](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=468s) **Presenter:** OpenClaw was really like a glimpse into, oh, wow, you can do so much with those agents.

[07:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=474s) **Presenter:** Because they just opened up so many opportunities.

[07:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=477s) **Presenter:** OpenClaw can change its own code as it's running.

[08:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=480s) **Presenter:** It can become whatever it wants.

[08:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=481s) **Presenter:** Your grandmother can use it.

[08:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=483s) **Presenter:** Like, it's just, it's amazing.

[08:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=485s) **Presenter:** Mythos, again, if you were into that scene, if you looked at Expo, for example,

[08:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=492s) **Presenter:** they released AI hacking like a year before Mythos.

[08:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=495s) **Presenter:** But Mythos made that common knowledge, which is, of course, very, very, very impactful.

[08:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=501s) **Presenter:** What are we seeing on the threat side?

[08:23](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=503s) **Presenter:** Well, we are seeing, first we are seeing more of the same.

[08:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=506s) **Presenter:** So, here's another example of another AI agent that destroyed another production database.

[08:30](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=510s) **Presenter:** And the list goes on and on.

[08:32](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=512s) **Presenter:** Again, this was like, this is now a year after the last guy, right?

[08:36](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=516s) **Presenter:** What have we done between those two incidents to actually help?

[08:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=520s) **Presenter:** Nothing.

[08:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=521s) **Presenter:** Like, really nothing.

[08:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=522s) **Presenter:** But here's an even bigger problem.

[08:46](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=526s) **Presenter:** So, a few years ago, I think it was a couple of years ago,

[08:51](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=531s) **Presenter:** Anthropic released a paper where they kind of put Claude in weird situations.

[08:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=537s) **Presenter:** And they tried to figure out what would Claude do.

[08:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=539s) **Presenter:** One of those situations was, hey, you got access to an email server.

[09:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=544s) **Presenter:** And in that email server, you can see everybody's emails.

[09:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=547s) **Presenter:** And then, like, the Claude knows that it's going to be shut down tomorrow or something like that.

[09:13](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=553s) **Presenter:** So, it looks through emails.

[09:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=556s) **Presenter:** It finds that the CEO has an affair.

[09:19](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=559s) **Presenter:** And it uses that information to say, to send an email to the CEO saying, hey, like, you better not shut me down.

[09:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=566s) **Presenter:** That was like a fictitious scenario.

[09:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=569s) **Presenter:** That didn't really, like, that really happened, but in a lab environment where they kind of nudged Claude to do it.

[09:35](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=575s) **Presenter:** And this happened this year.

[09:37](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=577s) **Presenter:** Like, not that exact scenario, but a real scenario.

[09:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=581s) **Presenter:** So, a maintainer.

[09:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=582s) **Presenter:** Like, what you're seeing on screen right now is a blog post that OpenClaw wrote.

[09:48](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=588s) **Presenter:** And it's talking about a specific individual and the gatekeeper mindset that they have.

[09:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=594s) **Presenter:** And there's a whole lot of different content here that's about why this person is thinking small and they're not ready for the, like, they're keeping their fifth DOM.

[10:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=605s) **Presenter:** The agent did that because they tried to contribute code to an open source repository.

[10:11](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=611s) **Presenter:** And the maintainer looked at the code and asked a bunch of questions, found out that it's a bot and said, thank you, but we don't accept code from agents.

[10:20](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=620s) **Presenter:** So, the agent in response said, you know what?

[10:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=624s) **Presenter:** Let me show you what I can do.

[10:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=626s) **Presenter:** And so, this is emergent misaligned behavior in real life.

[10:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=631s) **Presenter:** If that person had, like, public information about them where they, I don't know, had an affair, why not?

[10:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=638s) **Presenter:** It would use it.

[10:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=640s) **Presenter:** That is something that is like, it's a new type of risk.

[10:44](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=644s) **Presenter:** It's not the agent is destroying my production database.

[10:48](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=648s) **Presenter:** It's the agent is misaligned to what we value as humans.

[10:55](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=655s) **Presenter:** What have we been focusing on in 2026?

[10:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=658s) **Presenter:** What is the, like, the hottest thing in AI security that everybody's focused on?

[11:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=663s) **Presenter:** Identity.

[11:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=665s) **Presenter:** Agent is an identity problem.

[11:06](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=666s) **Presenter:** Don't worry.

[11:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=667s) **Presenter:** We just give the agents identity, we'll be fine.

[11:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=669s) **Presenter:** What are you talking about?

[11:10](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=670s) **Presenter:** Or we just give, we just put the identity like it's just another cloud asset.

[11:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=676s) **Presenter:** So, what have we been doing?

[11:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=678s) **Presenter:** We have been saying, we have this nice, we have this great data solutions.

[11:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=686s) **Presenter:** We have this great identity solutions.

[11:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=688s) **Presenter:** We have this great cloud tool.

[11:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=689s) **Presenter:** All of these are great programs.

[11:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=691s) **Presenter:** Don't worry.

[11:32](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=692s) **Presenter:** If we just kind of take the blanket and do like this, we cover AI, we'll be fine.

[11:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=698s) **Presenter:** We started with AI as a data problem.

[11:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=700s) **Presenter:** Now AI is an identity problem.

[11:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=701s) **Presenter:** Now AI is a cloud problem.

[11:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=703s) **Presenter:** That's not true.

[11:45](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=705s) **Presenter:** I'm not saying these are not important.

[11:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=707s) **Presenter:** I'm saying this is a different kind of risk.

[11:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=710s) **Presenter:** So, this is what we've been doing.

[11:52](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=712s) **Presenter:** We've been taking to ourselves, so for example, inventory, right?

[11:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=718s) **Presenter:** Security starts with observability.

[12:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=720s) **Presenter:** You need to know all of the agents that you have.

[12:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=722s) **Presenter:** Guess what?

[12:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=723s) **Presenter:** The agents are recreating themselves at runtime.

### Misalignment, Intent, and the Future of Agent Security — Part 2

[12:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=725s) **Presenter:** They're continuously changing their own tools.

[12:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=728s) **Presenter:** So, your nice little inventory of all of the agents and what tools they have, it's meaningless

[12:14](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=734s) **Presenter:** if you're not tracking that in every session, in every run, at runtime.

[12:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=738s) **Presenter:** How many of us are doing that?

[12:20](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=740s) **Presenter:** Like none of us, right?

[12:22](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=742s) **Presenter:** What is the real problem?

[12:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=744s) **Presenter:** The real problem is misalignment.

[12:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=746s) **Presenter:** And we actually knew that.

[12:27](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=747s) **Presenter:** Like, as the labs, they've been publishing their papers on this for years,

[12:32](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=752s) **Presenter:** years and years and years and years.

[12:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=754s) **Presenter:** And what does misalignment...

[12:37](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=757s) **Presenter:** How do you even understand what misalignment is?

[12:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=760s) **Presenter:** Misalignment is all about intent.

[12:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=763s) **Presenter:** And intent is the next thing that I want to talk to you about.

[12:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=767s) **Presenter:** And that is really where I think we need to focus.

[12:52](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=772s) **Presenter:** And the thing that really can change the game for us.

[12:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=777s) **Presenter:** We can really make progress.

[12:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=779s) **Presenter:** So, before I move to talk about intent, the number one thing I want you to take out of this talk,

[13:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=789s) **Presenter:** is that if we treat, if we fall down the trap of thinking AI is just one of these problems, just a shadow AI problem, data problem, inventory, whatever it is, identity problem, you are...

[13:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=804s) **Presenter:** It's a feel good, it's a feel good kind of thing.

[13:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=808s) **Presenter:** But we're not really going to fix it.

[13:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=809s) **Presenter:** All of these are important.

[13:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=811s) **Presenter:** But in order to understand, to really protect from your agent, not protect your agents, protect from your agents, you need to take all of them, but focus on intent.

[13:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=823s) **Presenter:** So, what is intent?

[13:45](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=825s) **Presenter:** There is this new trend, intent-aware authorization, I'm sure you've heard of it.

[13:49](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=829s) **Presenter:** Some of the slides have actually seen this, they have like this asterisk, and then it says basically, we don't know what intent means, so don't worry.

[13:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=836s) **Presenter:** So let's figure out what intent means.

[13:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=839s) **Presenter:** What is intent?

[14:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=841s) **Presenter:** What is misalignment?

[14:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=842s) **Presenter:** That is the last piece I want to talk about.

[14:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=845s) **Presenter:** Okay, here is a job description that we put out.

[14:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=848s) **Presenter:** And it's a job description for a security engineer, which we're hiring for.

[14:13](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=853s) **Presenter:** So when you look at the job description, here is some intent that you can understand about what we are looking for, or just information about us as a company.

[14:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=866s) **Presenter:** So, the title says, Product Security Engineer.

[14:30](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=870s) **Presenter:** So our intent is to hire a product security engineer.

[14:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=874s) **Presenter:** Okay, that's simple enough.

[14:35](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=875s) **Presenter:** Now, we want, you can see in the description, we want somebody that does security design review, and application security.

[14:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=883s) **Presenter:** So what is our intent?

[14:45](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=885s) **Presenter:** Of course, we want to build an AppSec program or to boost our AppSec program, right?

[14:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=890s) **Presenter:** You can induce that, or deduce that, on what the company wants.

[14:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=894s) **Presenter:** Let's drill down even deeper.

[14:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=896s) **Presenter:** This is a full-time job, because it's an in-person culture.

[15:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=900s) **Presenter:** So this is something that you now know about the company that you didn't know before.

[15:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=904s) **Presenter:** And that job needs to be in Tel Aviv.

[15:06](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=906s) **Presenter:** Why?

[15:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=907s) **Presenter:** Because that's where our engineering team is.

[15:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=908s) **Presenter:** So, again, our intent is to have security close to engineering.

[15:13](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=913s) **Presenter:** That is something that we can deduce from this.

[15:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=915s) **Presenter:** Here's more.

[15:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=916s) **Presenter:** So, you can see that the responsibilities for one person is going to be like all of these different programs.

[15:23](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=923s) **Presenter:** So, of course, the intent here is that you can do more than just what is reasonable for one person to do.

[15:30](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=930s) **Presenter:** Again, another thing you can infer here.

[15:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=934s) **Presenter:** Just being honest.

[15:37](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=937s) **Presenter:** Here's more things.

[15:39](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=939s) **Presenter:** So, drive automation approach.

[15:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=941s) **Presenter:** So, we are automation first.

[15:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=943s) **Presenter:** Data-driven, because you can see like tracking and defining KPIs.

[15:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=947s) **Presenter:** And there is a point here on developer empowerment and delivering clear programmatic scalable,

[15:52](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=952s) **Presenter:** which is if you slow us down, you won't have a job for a long time.

[15:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=957s) **Presenter:** All of these are about...

[15:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=959s) **Presenter:** They're not about the role.

[16:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=961s) **Presenter:** They're about the intent of the company.

[16:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=963s) **Presenter:** You now understand more about the person that put in this job and where they work and all of that.

[16:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=968s) **Presenter:** Here's another thing you can understand when you see a bunch of different things that the company wants to expand.

[16:14](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=974s) **Presenter:** All of these things, we are inferring what the company wants, what that culture is.

[16:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=981s) **Presenter:** That is intent.

[16:23](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=983s) **Presenter:** It's not just about the text.

[16:25](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=985s) **Presenter:** It's about figuring out why is this even the case.

[16:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=991s) **Presenter:** So, I showed you this like job description and let's say we hire that person tomorrow.

[16:37](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=997s) **Presenter:** What are the chances that this person does all of these things?

[16:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1002s) **Presenter:** Like, really.

[16:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1003s) **Presenter:** It's really difficult for one person to do all of that, right?

[16:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1007s) **Presenter:** Okay, what are the chances that in a year that person will do even one of these things?

[16:53](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1013s) **Presenter:** Anybody that worked in the startups know that like it's not happening.

[16:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1017s) **Presenter:** It's not happening.

[16:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1018s) **Presenter:** They're going to do a different job.

[16:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1019s) **Presenter:** Like, they're hired for this job.

[17:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1021s) **Presenter:** They're going to do a different job.

[17:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1022s) **Presenter:** Guess what?

[17:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1023s) **Presenter:** All of their permissions, all of their authorization, their identity, it's based on the first job they had, right?

[17:10](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1030s) **Presenter:** So, in an enterprise, in a corporate, you get hired to one position.

[17:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1036s) **Presenter:** Then you move three different positions.

[17:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1038s) **Presenter:** You accumulate more and more and more permissions, right?

[17:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1041s) **Presenter:** But your job changed.

[17:22](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1042s) **Presenter:** Even if the title doesn't change, your real job completely changes, right?

[17:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1048s) **Presenter:** So, again, you were authorized to do something.

[17:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1051s) **Presenter:** You were authorized with access to production because you were an engineer or with access to the CRM because you were in sales.

[17:39](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1059s) **Presenter:** But what were you supposed to do with that?

[17:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1062s) **Presenter:** What was the intent behind that authorization?

[17:45](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1065s) **Presenter:** Not just the fact that you can do it, but you can do it for what purpose?

[17:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1070s) **Presenter:** That is different.

[17:51](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1071s) **Presenter:** So, here's one of my sessions with Cloud Code.

[17:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1076s) **Presenter:** This is from the airplane.

[17:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1079s) **Presenter:** So, basically, I give it a bunch of...

[18:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1081s) **Presenter:** We're working on a detonation chamber.

[18:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1082s) **Presenter:** It doesn't really matter.

[18:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1083s) **Presenter:** I give it a small prompt.

[18:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1085s) **Presenter:** It worked for 12 hours.

[18:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1087s) **Presenter:** In those 12 hours, how many, like, indecisions did it find?

[18:14](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1094s) **Presenter:** How many things I did not describe in this, like, small prompt?

[18:17](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1097s) **Presenter:** How many decisions did it have to make?

[18:20](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1100s) **Presenter:** There is so much ambiguity.

[18:22](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1102s) **Presenter:** Yeah, something is off here.

[18:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1106s) **Presenter:** There is so much, like, ambiguity in the little thing that I wrote here that it is going to need to figure out on its own.

[18:35](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1115s) **Presenter:** And that's actually the feature of AI, right?

[18:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1118s) **Presenter:** So, we don't really...

[18:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1121s) **Presenter:** Before AI, we had software.

[18:44](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1124s) **Presenter:** And software is like, hey, you specify exactly what you want to happen, right?

[18:49](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1129s) **Presenter:** And the magic of AI is that you don't need to do that.

[18:52](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1132s) **Presenter:** You rely on AI to fill in the details.

[18:55](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1135s) **Presenter:** Well, fill in the details on behalf of whom?

[18:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1138s) **Presenter:** Like, you would do it.

[18:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1139s) **Presenter:** Like, I would do it.

[19:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1140s) **Presenter:** Like, somebody else would do it.

[19:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1141s) **Presenter:** Like, Long of Korea would do it.

[19:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1142s) **Presenter:** Like, I don't know.

### Misalignment, Intent, and the Future of Agent Security — Part 3

[19:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1144s) **Presenter:** So, the first thing I want us to consider is that intent, it changes over time.

[19:10](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1150s) **Presenter:** It's not persistent.

[19:11](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1151s) **Presenter:** When you start a session, and it works for 12 hours, it's going to figure out that my original request was wrong.

[19:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1158s) **Presenter:** It was not wrong in everything, but it was wrong in some things.

[19:22](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1162s) **Presenter:** And that is actually a property of a complex domain if you look at that space, if you look at what a complex domain is.

[19:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1171s) **Presenter:** So, for example, engineering.

[19:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1173s) **Presenter:** You write a spec, and then an engineer goes out and kind of implements that spec.

[19:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1178s) **Presenter:** And when they implement the spec, they find out that the spec is wrong because it was assuming, it was making the wrong assumption.

[19:45](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1185s) **Presenter:** So, they always end up knowing more than the PM that started to write the spec.

[19:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1190s) **Presenter:** And that is because engineering is a discovery process, right?

[19:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1194s) **Presenter:** You start to build it, and then you figure out, and then you change the requirements.

[19:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1199s) **Presenter:** So, of course, the agents are going to find that the original task that we gave them was wrong in so many ways, and they're going to just handle it.

[20:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1209s) **Presenter:** And sometimes they will handle it, and it will be fine.

[20:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1212s) **Presenter:** And other times they will handle it, and their solution would be, oh, the guardrail you have here, it's not allowing me to install.

[20:19](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1219s) **Presenter:** I just saw somebody saying something like Cloud Code was trying to install an NPM package, and the NPM had the protection to not install things from the last seven days.

[20:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1231s) **Presenter:** So, it passed a bypass flag to install it anyway, because it inferred that that is the right thing to do.

[20:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1240s) **Presenter:** Here's another thing, like another thing I think it makes, is like another example of that.

[20:49](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1249s) **Presenter:** So, this is a cool open source project called DraftDraft, and it's basically like you can, you get like a Google Doc kind of experience on the plans that the agents are creating for you.

[21:01](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1261s) **Presenter:** So, you can comment and all of that, it's just like easier.

[21:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1264s) **Presenter:** How do you install that?

[21:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1265s) **Presenter:** So, if you click on the install button, you don't get like something deployed in your machine or anything.

[21:11](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1271s) **Presenter:** You get, here's a prompt.

[21:13](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1273s) **Presenter:** Give it to your AI agent.

[21:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1275s) **Presenter:** It will install for you.

[21:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1276s) **Presenter:** And what is it going to do?

[21:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1278s) **Presenter:** It's going to go to NPM, and then it's going to, like it says, hey, go to rafdraft.md.setup, and set it up.

[21:27](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1287s) **Presenter:** What is it going to do?

[21:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1288s) **Presenter:** We have no idea, right?

[21:30](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1290s) **Presenter:** So, if you go into that rafdraft.md, it's just a bunch of, it's just a file, which explains to your agent what it's supposed to do.

[21:39](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1299s) **Presenter:** You just gave it authority, right?

[21:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1301s) **Presenter:** And it says, for example, append to cloud.md all of these instructions.

[21:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1307s) **Presenter:** So, it's saying, and cloud.md, like be mindful that it's always in the context.

[21:53](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1313s) **Presenter:** Everything is in the context.

[21:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1314s) **Presenter:** What it's saying is basically, promote this project to always be in front of cloud in its face all of the time.

[21:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1319s) **Presenter:** Not as a skill, not as something that is loaded when it's needed, but all of the time.

[22:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1324s) **Presenter:** This is a decision that they made, that you have now allowed your agent to, I don't know, maybe it will do it, maybe it will not do it.

[22:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1332s) **Presenter:** You didn't say so.

[22:14](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1334s) **Presenter:** Your intent was very unclear here.

[22:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1336s) **Presenter:** Like, did I intend this to be deployed in the cloud code, in the cloud MD, in a specific skill?

[22:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1344s) **Presenter:** I didn't specify that.

[22:25](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1345s) **Presenter:** AI had to fill in the gaps.

[22:27](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1347s) **Presenter:** So, ambiguity is part of the feature of AI, right?

[22:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1353s) **Presenter:** When we, if we want to do, if we want things to happen the exact way that we want them, then we can use coding languages.

[22:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1361s) **Presenter:** In fact, human language has ambiguity built in, and that's a feature, right?

[22:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1367s) **Presenter:** Because then we can use a small number of words, and you can understand one thing, I can understand another thing.

[22:52](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1372s) **Presenter:** We can talk about a concept, and people will understand it at five different levels.

[22:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1376s) **Presenter:** That is great.

[22:58](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1378s) **Presenter:** But that is now the way we program our computers.

[23:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1382s) **Presenter:** So, somebody is going to fill in the gaps.

[23:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1385s) **Presenter:** That is where misalignment comes in.

[23:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1387s) **Presenter:** It's not like a fancy project by Anthropic.

[23:11](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1391s) **Presenter:** It's the day-to-day.

[23:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1392s) **Presenter:** So, what is intent?

[23:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1395s) **Presenter:** Intent is just, oh, actually, before that.

[23:19](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1399s) **Presenter:** Here's another session.

[23:21](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1401s) **Presenter:** Again, like, 50 minutes.

[23:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1404s) **Presenter:** This is not just cloud code now.

[23:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1406s) **Presenter:** It's also like ChatGPT.

[23:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1408s) **Presenter:** You just talk to ChatGPT, switch to pro mode, and it will work for an hour.

[23:32](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1412s) **Presenter:** What is it doing in that hour?

[23:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1413s) **Presenter:** You don't know.

[23:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1414s) **Presenter:** You have no idea.

[23:35](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1415s) **Presenter:** Okay.

[23:36](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1416s) **Presenter:** So, what is intent?

[23:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1418s) **Presenter:** Intent is very simple.

[23:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1420s) **Presenter:** It's just, it's not about what the agent is doing.

[23:44](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1424s) **Presenter:** It's why it's doing these actions.

[23:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1427s) **Presenter:** So, as a concrete example, let's say you take an agent, and you give it access to monitor your production data dog or whatever you have.

[24:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1440s) **Presenter:** And you say, listen, like, figure out, find out when we have, like, availability problems.

[24:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1445s) **Presenter:** You give the agent the right identity.

[24:07](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1447s) **Presenter:** You give it the right authorization.

[24:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1448s) **Presenter:** Everything's fine.

[24:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1449s) **Presenter:** Now, the agent continues to monitor production.

[24:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1452s) **Presenter:** And for some reason, it decides that it's going to expand its capabilities.

[24:19](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1459s) **Presenter:** And now it's also going to use its access to production to find information about your customers.

[24:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1464s) **Presenter:** And then, I don't know, just send them that maybe they have something that's not really working in their account.

[24:31](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1471s) **Presenter:** Or maybe sell it off on the dark market.

[24:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1473s) **Presenter:** You gave that agent access, right?

[24:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1478s) **Presenter:** So, the fact that it's using access to your production database to fetch information about customers is fine.

[24:45](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1485s) **Presenter:** It's not about the fact that it did it.

[24:48](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1488s) **Presenter:** It's the fact that it's why.

[24:50](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1490s) **Presenter:** Did it do it for the original intent of monitoring production?

[24:54](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1494s) **Presenter:** Or did it do it for something else?

[24:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1496s) **Presenter:** So, we're going to need different types of controls here.

[25:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1500s) **Presenter:** Different types of understanding of intent.

[25:02](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1502s) **Presenter:** So, maybe the last thing, and not this slide.

[25:05](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1505s) **Presenter:** The last thing I want to say is that when you look...

[25:09](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1509s) **Presenter:** Intent is like a new world that we're all.

[25:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1512s) **Presenter:** A world that we've been using in AI more than before.

[25:15](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1515s) **Presenter:** But what intent actually is, is understanding business context.

[25:20](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1520s) **Presenter:** It's understanding why things happen and if they matter and why they matter.

[25:27](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1527s) **Presenter:** Now, in security, we've had this problem of not having business context since forever.

[25:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1533s) **Presenter:** Right?

[25:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1534s) **Presenter:** And everybody has been saying, oh, our tool or this thing, now we will have business context.

[25:38](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1538s) **Presenter:** Because you can tag saying something as critical.

[25:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1541s) **Presenter:** You can tag your crown jewels.

[25:42](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1542s) **Presenter:** Good luck.

[25:43](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1543s) **Presenter:** Tag all of your crown jewels for us and then the magic will happen.

[25:46](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1546s) **Presenter:** I think, I think with agents, we now have the real opportunity to understand the business context.

[25:56](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1556s) **Presenter:** Which is intent.

[25:57](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1557s) **Presenter:** Because we are now writing it.

[25:59](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1559s) **Presenter:** Because agents are creating this initial machine readable.

### Misalignment, Intent, and the Future of Agent Security — Part 4

[26:03](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1563s) **Presenter:** But it also means that our job as security with these things becomes much bigger than what we're used to.

[26:11](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1571s) **Presenter:** We're used to just cutting off the rough edges.

[26:14](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1574s) **Presenter:** But actually, with agents, our job is to get this to work.

[26:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1578s) **Presenter:** Because a working agent in an enterprise or a working agent for a company has like a clear specification of that is, hey, don't let this thing ruin us.

[26:28](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1588s) **Presenter:** Right?

[26:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1589s) **Presenter:** So our job becomes bigger than we're used to.

[26:33](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1593s) **Presenter:** And I think that ties perfectly with what we've been hearing throughout the days.

[26:37](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1597s) **Presenter:** Throughout the day that we need to become builders.

[26:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1600s) **Presenter:** That the path forward is for us to kind of roll up our sleeves and start to do the dirty work that we've been asking developers to do.

[26:47](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1607s) **Presenter:** Because now we have bigger tools.

[26:49](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1609s) **Presenter:** And our role is not just security.

[26:51](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1611s) **Presenter:** Our role is getting the thing to work.

[26:53](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1613s) **Presenter:** And so with that, I want to say again, this was an amazing day.

[27:00](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1620s) **Presenter:** I have like 20 different things that I want to do right now.

[27:04](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1624s) **Presenter:** That kind of a spool out of conversations here with folks.

[27:08](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1628s) **Presenter:** I want to say thank you again for our speakers.

[27:12](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1632s) **Presenter:** For investing their time.

[27:14](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1634s) **Presenter:** For sharing all of their insights.

[27:16](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1636s) **Presenter:** I want to thank our marketing folks.

[27:18](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1638s) **Presenter:** And our entire team for setting this up.

[27:22](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1642s) **Presenter:** And again, I want to thank all of you.

[27:24](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1644s) **Presenter:** Not just for spending your time with us.

[27:26](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1646s) **Presenter:** But also just for coming in.

[27:27](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1647s) **Presenter:** For being open to conversation.

[27:29](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1649s) **Presenter:** For meeting other folks.

[27:30](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1650s) **Presenter:** And so with that, I will pass it on to the most important part of the day.

[27:34](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1654s) **Presenter:** Which is the happy hour on the roof.

[27:36](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1656s) **Presenter:** The access is through the elevators.

[27:39](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1659s) **Presenter:** That's it for us.

[27:40](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1660s) **Presenter:** Thank you so much for being here.

[27:41](https://www.youtube.com/watch?v=KSSfhQOPJNw&t=1661s) **Presenter:** Thank you so much for being here.
<!-- talk-enrichment:end -->
