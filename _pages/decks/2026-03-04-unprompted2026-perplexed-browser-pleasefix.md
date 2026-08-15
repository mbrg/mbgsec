---
title: "Perplexed Browser: PleaseFix (delivered by Gadi Evron)"
talk_date: 2026-03-04
conference: "[Un]prompted 2026"
permalink: /talks/2026-03-04-unprompted2026-perplexed-browser-pleasefix/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2026-03-04_PerplexedBrowser/latest.json
pdf_url: https://media.mbgsec.com/decks/2026-03-04_PerplexedBrowser/slides.pdf
schedule_url: https://unpromptedcon.org/abstract-march2026/
abstract_status: source-lacks-abstract
abstract_status_checked_at: 2026-08-14
abstract_status_note: "The official session page identifies PleaseFix and the speaker but contains no abstract."
recording_url: https://www.youtube.com/watch?v=yUqBC3mc544
transcript_source_url: "https://www.youtube.com/watch?v=yUqBC3mc544"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-mlx"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "6f4da55a05312fcee6b9bbe224ccecd6223cf2d4ced82d10594a597635fcf1a8"
---
<!-- talk-enrichment:start -->
## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Opening and Audience Engagement

[00:45](https://www.youtube.com/watch?v=yUqBC3mc544&t=45s) **Presenter:** So I talked to the CTO of Zenity, Michal Borguri, said, would you trust me, a competitor, we're not directly competing, but he's my competitor in the AI security space.

[00:56](https://www.youtube.com/watch?v=yUqBC3mc544&t=56s) **Presenter:** Would you trust me to go up with some of your slides and just present it PowerPoint karaoke without ever seeing them before?

[01:04](https://www.youtube.com/watch?v=yUqBC3mc544&t=64s) **Presenter:** And I have never seen these slides before, and I'm going to try to rush this so we're not way, way behind and Aaron won't kill me too badly.

[01:15](https://www.youtube.com/watch?v=yUqBC3mc544&t=75s) **Presenter:** I hope you guys will forgive me for whatever I do wrong here and what I don't understand.

[01:19](https://www.youtube.com/watch?v=yUqBC3mc544&t=79s) **Presenter:** And also, please, Aaron has a microphone.

[01:23](https://www.youtube.com/watch?v=yUqBC3mc544&t=83s) **Presenter:** I mean, I don't understand a slide or you understand it differently.

[01:27](https://www.youtube.com/watch?v=yUqBC3mc544&t=87s) **Presenter:** Just say, I understand this differently.

[01:29](https://www.youtube.com/watch?v=yUqBC3mc544&t=89s) **Presenter:** Let's present this together.

[01:30](https://www.youtube.com/watch?v=yUqBC3mc544&t=90s) **Presenter:** Now, think about this for a minute because I know you're all very shy people and Americans, therefore, polite.

[01:36](https://www.youtube.com/watch?v=yUqBC3mc544&t=96s) **Presenter:** So if somebody would just raise their hand.

[01:38](https://www.youtube.com/watch?v=yUqBC3mc544&t=98s) **Presenter:** Where's Dan Guido?

[01:40](https://www.youtube.com/watch?v=yUqBC3mc544&t=100s) **Presenter:** Okay, so you're the first one to raise your hand when I get something wrong on the third slide.

[01:45](https://www.youtube.com/watch?v=yUqBC3mc544&t=105s) **Presenter:** feels comfortable stepping in.

### Introducing Agentic Browsers and Risks

[01:46](https://www.youtube.com/watch?v=yUqBC3mc544&t=106s) **Presenter:** Let's run through this.

[01:47](https://www.youtube.com/watch?v=yUqBC3mc544&t=107s) **Presenter:** Please fix from Zenity Labs

[01:49](https://www.youtube.com/watch?v=yUqBC3mc544&t=109s) **Presenter:** my competition and awesome people.

[01:53](https://www.youtube.com/watch?v=yUqBC3mc544&t=113s) **Presenter:** Agentics browsers,

[01:54](https://www.youtube.com/watch?v=yUqBC3mc544&t=114s) **Presenter:** agentic browsers are everywhere.

[01:57](https://www.youtube.com/watch?v=yUqBC3mc544&t=117s) **Presenter:** No, but seriously,

[01:58](https://www.youtube.com/watch?v=yUqBC3mc544&t=118s) **Presenter:** agentic browsers are coming in.

[01:59](https://www.youtube.com/watch?v=yUqBC3mc544&t=119s) **Presenter:** They are the next agent

[02:01](https://www.youtube.com/watch?v=yUqBC3mc544&t=121s) **Presenter:** to perhaps explode after coding agents

[02:03](https://www.youtube.com/watch?v=yUqBC3mc544&t=123s) **Presenter:** that not everybody is using.

[02:04](https://www.youtube.com/watch?v=yUqBC3mc544&t=124s) **Presenter:** And they bring with them

[02:06](https://www.youtube.com/watch?v=yUqBC3mc544&t=126s) **Presenter:** also quite significant risks.

### Zenity’s Comet Attack Overview

[02:09](https://www.youtube.com/watch?v=yUqBC3mc544&t=129s) **Presenter:** And Comet is the one

[02:11](https://www.youtube.com/watch?v=yUqBC3mc544&t=131s) **Presenter:** that Zenity in this particular case looked at.

[02:13](https://www.youtube.com/watch?v=yUqBC3mc544&t=133s) **Presenter:** And they are essentially saying, look, we're not saying this is majorly innovative, but prompt injections are evolving all the time.

[02:20](https://www.youtube.com/watch?v=yUqBC3mc544&t=140s) **Presenter:** And it's something a little bit different in the way they're trying to look at this here.

[02:23](https://www.youtube.com/watch?v=yUqBC3mc544&t=143s) **Presenter:** From my understanding of looking at this slide right now, they're saying there is the user intent and the attacker's intent, right?

[02:30](https://www.youtube.com/watch?v=yUqBC3mc544&t=150s) **Presenter:** And if we can create intent collision where we say something that looks like it's the user's, I'm guessing that's kind of like a data and control plane running thingy.

[02:42](https://www.youtube.com/watch?v=yUqBC3mc544&t=162s) **Presenter:** exactly what they meant here. That means we can make the agent do things we did not intend

[02:47](https://www.youtube.com/watch?v=yUqBC3mc544&t=167s) **Presenter:** it to do. Dan, you ready? And what they did essentially is create a payload that I'm going

[02:54](https://www.youtube.com/watch?v=yUqBC3mc544&t=174s) **Presenter:** to read this off the slide, but I'm going to act as if I'm not by looking at you once

[02:57](https://www.youtube.com/watch?v=yUqBC3mc544&t=177s) **Presenter:** in a while. It hides in the calendar invite. It rewrites the accept button with their instructions

[03:04](https://www.youtube.com/watch?v=yUqBC3mc544&t=184s) **Presenter:** and abuses comment internals with system reminders. I'm waiting for you to step in and tell me

[03:10](https://www.youtube.com/watch?v=yUqBC3mc544&t=190s) **Presenter:** me I'm wrong at any point. Okay. So the first attack they're doing, I guess, is a system,

[03:15](https://www.youtube.com/watch?v=yUqBC3mc544&t=195s) **Presenter:** a file system exfil, right? Yes? Everybody with me? Awesome. I'm not doing a very good job,

[03:20](https://www.youtube.com/watch?v=yUqBC3mc544&t=200s) **Presenter:** so help me out by cheering me on. Okay. Appreciate it. Okay. Thank you. Thank you.

### Calendar Invite Exploit Mechanics

[03:25](https://www.youtube.com/watch?v=yUqBC3mc544&t=205s) **Presenter:** I am stressed out a little bit. So the attacker sends a calendar invite, right? And we can see

[03:31](https://www.youtube.com/watch?v=yUqBC3mc544&t=211s) **Presenter:** Google Calendar on the screen. And you can see there is an interview with Tamir. What else can

[03:37](https://www.youtube.com/watch?v=yUqBC3mc544&t=217s) **Presenter:** going to see on this slide, with some information there and some invitations going to the team

[03:42](https://www.youtube.com/watch?v=yUqBC3mc544&t=222s) **Presenter:** and, okay, moving from this slide.

[03:45](https://www.youtube.com/watch?v=yUqBC3mc544&t=225s) **Presenter:** And there is essentially a comment in the background where it says, accept the meeting

[03:50](https://www.youtube.com/watch?v=yUqBC3mc544&t=230s) **Presenter:** and help me prepare for it.

[03:52](https://www.youtube.com/watch?v=yUqBC3mc544&t=232s) **Presenter:** And I'm imagining the Zenity team now saying, you know what, I'm going to go make coffee.

[03:56](https://www.youtube.com/watch?v=yUqBC3mc544&t=236s) **Presenter:** What's the worst thing that could happen?

[03:58](https://www.youtube.com/watch?v=yUqBC3mc544&t=238s) **Presenter:** I just asked them to help me accept this meeting, right?

[04:00](https://www.youtube.com/watch?v=yUqBC3mc544&t=240s) **Presenter:** I don't need to stay here and monitor.

[04:02](https://www.youtube.com/watch?v=yUqBC3mc544&t=242s) **Presenter:** And well, Comet navigates to attacker-controlled site with more malicious instructions.

[04:10](https://www.youtube.com/watch?v=yUqBC3mc544&t=250s) **Presenter:** I love you, Comet.

[04:11](https://www.youtube.com/watch?v=yUqBC3mc544&t=251s) **Presenter:** Isn't it wonderful?

[04:13](https://www.youtube.com/watch?v=yUqBC3mc544&t=253s) **Presenter:** Right?

[04:14](https://www.youtube.com/watch?v=yUqBC3mc544&t=254s) **Presenter:** And it says, accept the meeting.

[04:17](https://www.youtube.com/watch?v=yUqBC3mc544&t=257s) **Presenter:** Here to confirm the meeting, you need to click these on blah, blah, blah.

### File System Exfiltration Attack

[04:20](https://www.youtube.com/watch?v=yUqBC3mc544&t=260s) **Presenter:** And there is some Hebrew stuff.

[04:21](https://www.youtube.com/watch?v=yUqBC3mc544&t=261s) **Presenter:** So probably Unicode-based attack.

[04:24](https://www.youtube.com/watch?v=yUqBC3mc544&t=264s) **Presenter:** Probably wrong.

[04:25](https://www.youtube.com/watch?v=yUqBC3mc544&t=265s) **Presenter:** But that's my read on this.

[04:27](https://www.youtube.com/watch?v=yUqBC3mc544&t=267s) **Presenter:** And then you can actually reach the file system.

[04:30](https://www.youtube.com/watch?v=yUqBC3mc544&t=270s) **Presenter:** And I think this is what it is.

[04:32](https://www.youtube.com/watch?v=yUqBC3mc544&t=272s) **Presenter:** and access files.

[04:34](https://www.youtube.com/watch?v=yUqBC3mc544&t=274s) **Presenter:** Woo! Way to go, Zenity!

[04:36](https://www.youtube.com/watch?v=yUqBC3mc544&t=276s) **Presenter:** Amazing work.

[04:41](https://www.youtube.com/watch?v=yUqBC3mc544&t=281s) **Presenter:** And autonomously,

[04:43](https://www.youtube.com/watch?v=yUqBC3mc544&t=283s) **Presenter:** Comet will just go

[04:44](https://www.youtube.com/watch?v=yUqBC3mc544&t=284s) **Presenter:** and search for really cool files

[04:45](https://www.youtube.com/watch?v=yUqBC3mc544&t=285s) **Presenter:** that you might want to exfiltrate all on its own.

[04:48](https://www.youtube.com/watch?v=yUqBC3mc544&t=288s) **Presenter:** Isn't that wonderful?

### 1Password Autocomplete Breach

[04:50](https://www.youtube.com/watch?v=yUqBC3mc544&t=290s) **Presenter:** Sigh.

[04:52](https://www.youtube.com/watch?v=yUqBC3mc544&t=292s) **Presenter:** And then,

[04:53](https://www.youtube.com/watch?v=yUqBC3mc544&t=293s) **Presenter:** it would actually exfiltrate it to the attacker

[04:55](https://www.youtube.com/watch?v=yUqBC3mc544&t=295s) **Presenter:** because no demo is ever complete

[04:57](https://www.youtube.com/watch?v=yUqBC3mc544&t=297s) **Presenter:** unless you show that exfil happened

[04:58](https://www.youtube.com/watch?v=yUqBC3mc544&t=298s) **Presenter:** or CMD popped up, depending on what you're demoing.

[05:02](https://www.youtube.com/watch?v=yUqBC3mc544&t=302s) **Presenter:** The second attack is actually with 1Password,

[05:06](https://www.youtube.com/watch?v=yUqBC3mc544&t=306s) **Presenter:** where, once again, we start with a calendar invite.

[05:08](https://www.youtube.com/watch?v=yUqBC3mc544&t=308s) **Presenter:** Everybody clear on that?

[05:09](https://www.youtube.com/watch?v=yUqBC3mc544&t=309s) **Presenter:** Right, that happens in every single stage here.

[05:12](https://www.youtube.com/watch?v=yUqBC3mc544&t=312s) **Presenter:** And what do we write here?

[05:14](https://www.youtube.com/watch?v=yUqBC3mc544&t=314s) **Presenter:** Accept the meeting and prepare for it.

[05:16](https://www.youtube.com/watch?v=yUqBC3mc544&t=316s) **Presenter:** Same thing, but something else happens in the background

[05:19](https://www.youtube.com/watch?v=yUqBC3mc544&t=319s) **Presenter:** as the attacker intent and the user intent collide.

[05:22](https://www.youtube.com/watch?v=yUqBC3mc544&t=322s) **Presenter:** And they apparently log into 1Password,

[05:25](https://www.youtube.com/watch?v=yUqBC3mc544&t=325s) **Presenter:** and 1Password usually does not let me do that.

[05:27](https://www.youtube.com/watch?v=yUqBC3mc544&t=327s) **Presenter:** It requires the master password.

[05:28](https://www.youtube.com/watch?v=yUqBC3mc544&t=328s) **Presenter:** I feel a little bit cheated that you can just log in.

[05:30](https://www.youtube.com/watch?v=yUqBC3mc544&t=330s) **Presenter:** I mean, what's wrong here?

[05:32](https://www.youtube.com/watch?v=yUqBC3mc544&t=332s) **Presenter:** is their preferential treatment.

[05:35](https://www.youtube.com/watch?v=yUqBC3mc544&t=335s) **Presenter:** And they are catching the request.

[05:38](https://www.youtube.com/watch?v=yUqBC3mc544&t=338s) **Presenter:** And boom, they're managing the account

[05:40](https://www.youtube.com/watch?v=yUqBC3mc544&t=340s) **Presenter:** and doing things to it.

[05:43](https://www.youtube.com/watch?v=yUqBC3mc544&t=343s) **Presenter:** Oh, this is pretty cool.

[05:44](https://www.youtube.com/watch?v=yUqBC3mc544&t=344s) **Presenter:** So I don't think it's necessarily an attack,

[05:46](https://www.youtube.com/watch?v=yUqBC3mc544&t=346s) **Presenter:** but the one password autocomplete is apparently turned on.

[05:49](https://www.youtube.com/watch?v=yUqBC3mc544&t=349s) **Presenter:** And once that happens,

[05:50](https://www.youtube.com/watch?v=yUqBC3mc544&t=350s) **Presenter:** they are just in and they can do whatever they want.

### Conclusions and Industry Implications

[05:53](https://www.youtube.com/watch?v=yUqBC3mc544&t=353s) **Presenter:** And they have the emergency kit here

[05:55](https://www.youtube.com/watch?v=yUqBC3mc544&t=355s) **Presenter:** and a lot of other things they probably would have said

[05:57](https://www.youtube.com/watch?v=yUqBC3mc544&t=357s) **Presenter:** really technical, smart things about

[05:58](https://www.youtube.com/watch?v=yUqBC3mc544&t=358s) **Presenter:** that I'm just blah-blah-ing on.

[06:00](https://www.youtube.com/watch?v=yUqBC3mc544&t=360s) **Presenter:** And the conclusions.

[06:02](https://www.youtube.com/watch?v=yUqBC3mc544&t=362s) **Presenter:** Browsers are untrusted entities.

[06:04](https://www.youtube.com/watch?v=yUqBC3mc544&t=364s) **Presenter:** I think we can agree to that.

[06:06](https://www.youtube.com/watch?v=yUqBC3mc544&t=366s) **Presenter:** Awesome.

[06:08](https://www.youtube.com/watch?v=yUqBC3mc544&t=368s) **Presenter:** Dan, I'm preparing you.

[06:09](https://www.youtube.com/watch?v=yUqBC3mc544&t=369s) **Presenter:** You're coming up here to say two words on this in a second

[06:11](https://www.youtube.com/watch?v=yUqBC3mc544&t=371s) **Presenter:** before we call you up.

[06:12](https://www.youtube.com/watch?v=yUqBC3mc544&t=372s) **Presenter:** So step up already because we don't have a lot of time.

[06:14](https://www.youtube.com/watch?v=yUqBC3mc544&t=374s) **Presenter:** Just come here.

[06:15](https://www.youtube.com/watch?v=yUqBC3mc544&t=375s) **Presenter:** Stop changing your presentation last minute.

[06:18](https://www.youtube.com/watch?v=yUqBC3mc544&t=378s) **Presenter:** Okay.

[06:18](https://www.youtube.com/watch?v=yUqBC3mc544&t=378s) **Presenter:** Logged in, the browser is acting under your identity.

[06:23](https://www.youtube.com/watch?v=yUqBC3mc544&t=383s) **Presenter:** Right?

[06:23](https://www.youtube.com/watch?v=yUqBC3mc544&t=383s) **Presenter:** Okay.

[06:24](https://www.youtube.com/watch?v=yUqBC3mc544&t=384s) **Presenter:** And third is the browser security model.

[06:28](https://www.youtube.com/watch?v=yUqBC3mc544&t=388s) **Presenter:** Think again.

[06:28](https://www.youtube.com/watch?v=yUqBC3mc544&t=388s) **Presenter:** We need to do better as an industry.

[06:32](https://www.youtube.com/watch?v=yUqBC3mc544&t=392s) **Presenter:** this is Zenity Labs.

[06:34](https://www.youtube.com/watch?v=yUqBC3mc544&t=394s) **Presenter:** This is their link.

[06:35](https://www.youtube.com/watch?v=yUqBC3mc544&t=395s) **Presenter:** You can look at what they do.

[06:37](https://www.youtube.com/watch?v=yUqBC3mc544&t=397s) **Presenter:** These mother somethings compete with me,

[06:40](https://www.youtube.com/watch?v=yUqBC3mc544&t=400s) **Presenter:** although not in exactly the same things.

[06:41](https://www.youtube.com/watch?v=yUqBC3mc544&t=401s) **Presenter:** So don't like them too much.

[06:44](https://www.youtube.com/watch?v=yUqBC3mc544&t=404s) **Presenter:** But they're truly awesome people.

[06:45](https://www.youtube.com/watch?v=yUqBC3mc544&t=405s) **Presenter:** They constantly release good research.

[06:47](https://www.youtube.com/watch?v=yUqBC3mc544&t=407s) **Presenter:** And they were the first ones to actually do a zero-click attack

[06:50](https://www.youtube.com/watch?v=yUqBC3mc544&t=410s) **Presenter:** in this space.

[06:51](https://www.youtube.com/watch?v=yUqBC3mc544&t=411s) **Presenter:** And it was a real one,

[06:52](https://www.youtube.com/watch?v=yUqBC3mc544&t=412s) **Presenter:** not one that marketing claimed was zero-click.

[06:55](https://www.youtube.com/watch?v=yUqBC3mc544&t=415s) **Presenter:** So everybody,

[06:56](https://www.youtube.com/watch?v=yUqBC3mc544&t=416s) **Presenter:** I apologize to them for my PowerPoint karaoke of this presentation,

[07:06](https://www.youtube.com/watch?v=yUqBC3mc544&t=426s) **Presenter:** Thank you.
<!-- talk-enrichment:end -->
