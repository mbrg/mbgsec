---
title: "Windows 11 At Your Service"
talk_date: 2023-04-23
conference: "BSidesSF 2023"
permalink: /talks/2023-04-23-bsidessf2023-windows-11-at-your-service/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-04-23_BSidesSF_Windows_11_At_Your_Service/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-04-23_BSidesSF_Windows_11_At_Your_Service/slides.pdf
schedule_url: https://bsidessf2023.sched.com/event/1HzuZ/windows-11-at-your-service
recording_url: https://www.youtube.com/watch?v=yVRglHWHLC8
github_url: https://github.com/mbrg/power-pwn/wiki/Modules:-No%E2%80%90Code-Malware
description: "Win 11 ships with a nifty feature which lets users automate mundane processes. Users can build custom processes and hand them to Microsoft, which in turn ensures they are distributed to all user machines, executed successfully and reports back to the…"
abstract_source_url: "https://bsidessf2023.sched.com/event/1HzuZ/windows-11-at-your-service"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://www.youtube.com/watch?v=yVRglHWHLC8"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "291abc6f2801e59ef82be1ff628ff6cf6db50b09f0df8efb9d864e280b6967b0"
---


<!-- talk-enrichment:start -->
## Abstract

Win 11 ships with a nifty feature which lets users automate mundane processes. Users can build custom processes and hand them to Microsoft, which in turn ensures they are distributed to all user machines, executed successfully and reports back to the cloud. You can probably see where this is going...

_[Official conference abstract](https://bsidessf2023.sched.com/event/1HzuZ/windows-11-at-your-service)_

## Transcript

> AI generated from recording.

### Opening Remarks and Speaker Introduction

[00:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=0s) **Presenter:** Thank you everyone for joining us this glorious morning. Next up we have Michael Bergeri with Windows 11 At Your Service.

[00:08](https://www.youtube.com/watch?v=yVRglHWHLC8&t=8s) **Presenter:** Thank you. So, first of all, I'd like to say thank you to everyone for skipping early lunch. I really appreciate it. And I'm going to make my best, I'm going to try my best to make it worthwhile for you.

[00:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=23s) **Presenter:** And since this is kind of an intimate setting,

[00:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=25s) **Presenter:** please feel free to just kind of raise your hand

[00:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=27s) **Presenter:** if you have a question during the talk.

[00:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=29s) **Presenter:** Don't wait until the end.

[00:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=30s) **Presenter:** We can make it a conversation.

[00:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=31s) **Presenter:** I think it will be much more interesting.

### Setting the Stage: Attacker Perspective and Goals

[00:34](https://www.youtube.com/watch?v=yVRglHWHLC8&t=34s) **Presenter:** Here's kind of briefly a few points about me.

[00:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=37s) **Presenter:** I've been focused on this area of security of no-code apps

[00:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=42s) **Presenter:** or trying to see where they break for about four years now.

[00:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=45s) **Presenter:** I come from a company that's focused on this space.

[00:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=49s) **Presenter:** I lead an OS group that is dedicated to low-code, no-code,

[00:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=53s) **Presenter:** that these apps represent.

[00:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=56s) **Presenter:** But what we're going to do today

[00:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=57s) **Presenter:** is we're going to take an attacker's perspective.

[00:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=59s) **Presenter:** So let's just jump into it.

[01:01](https://www.youtube.com/watch?v=yVRglHWHLC8&t=61s) **Presenter:** If we don't get into your questions during this session,

[01:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=65s) **Presenter:** reach out on Twitter.

[01:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=66s) **Presenter:** I'm happy to continue the conversation.

[01:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=69s) **Presenter:** And I promise this is the only slide

[01:12](https://www.youtube.com/watch?v=yVRglHWHLC8&t=72s) **Presenter:** that's going to talk kind of not taking an attacker's perspective.

[01:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=77s) **Presenter:** Of course, it's important to mention,

[01:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=79s) **Presenter:** even though this entire talk is going to focus

[01:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=83s) **Presenter:** no code as an attacker.

[01:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=85s) **Presenter:** The idea here is to see how we can use no code in a secure way.

[01:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=89s) **Presenter:** However, having said that, here's what we're going to do today.

[01:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=92s) **Presenter:** So there's a very big difference between initial compromise of a machine

### Understanding Malware Operations and Windows 11 RPA

[01:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=99s) **Presenter:** and an entire malware operation.

[01:41](https://www.youtube.com/watch?v=yVRglHWHLC8&t=101s) **Presenter:** So in order to set a malware operation,

[01:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=104s) **Presenter:** you need to be able to do many different things.

[01:47](https://www.youtube.com/watch?v=yVRglHWHLC8&t=107s) **Presenter:** And let's just kind of make sure we all understand

[01:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=110s) **Presenter:** what do I mean by malware ops.

[01:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=113s) **Presenter:** this talk, you'll see how you can do everything that a malware needs to do by using Microsoft

[02:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=120s) **Presenter:** executables, services, and cloud services, which are all baked into Windows.

[02:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=125s) **Presenter:** All right.

[02:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=126s) **Presenter:** So just kind of show we're all on the same page on what do I mean by malware, what you

[02:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=131s) **Presenter:** will be able to actually accomplish.

[02:13](https://www.youtube.com/watch?v=yVRglHWHLC8&t=133s) **Presenter:** Let's say that you have an initial access to a machine, which is fine.

[02:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=136s) **Presenter:** You might think you've won.

[02:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=138s) **Presenter:** But actually in the real world, there's a bunch of things that would prevent you from kind of getting what you want.

[02:24](https://www.youtube.com/watch?v=yVRglHWHLC8&t=144s) **Presenter:** So you need to be able to actually run malware on that machine, right, and not just have the initial access.

[02:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=150s) **Presenter:** You need to be able to communicate through a firewall or any sort of network perimeter because likely this machine is an internal network.

[02:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=160s) **Presenter:** You need to be able to expiltrate data outside.

[02:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=163s) **Presenter:** You need to be able to avoid defenses that might be on the machine itself

[02:46](https://www.youtube.com/watch?v=yVRglHWHLC8&t=166s) **Presenter:** or on the network or wherever else.

[02:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=169s) **Presenter:** And, of course, you also want to remain persistent.

[02:54](https://www.youtube.com/watch?v=yVRglHWHLC8&t=174s) **Presenter:** You want to avoid defenses.

[02:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=176s) **Presenter:** So there are a bunch of these things that you need to actually accomplish

[03:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=180s) **Presenter:** after you've already compromised the machine.

[03:02](https://www.youtube.com/watch?v=yVRglHWHLC8&t=182s) **Presenter:** And so all of these things are actually kind of grant work.

[03:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=187s) **Presenter:** They're kind of engineering.

[03:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=189s) **Presenter:** So you start off with initial access and you want to get to profit, but in the middle of it, there's a bunch of things that you need to do in order to really get the operation going.

[03:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=199s) **Presenter:** And what we're going to show is how you can accomplish all of this operation, all of these kind of intermediary sections here.

[03:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=206s) **Presenter:** All right.

[03:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=206s) **Presenter:** So the best thing that we could hope for is to have a SaaS platform that would do all of these things for us, right?

### Deep Dive into Microsoft Power Automate (RPA) Architecture

[03:34](https://www.youtube.com/watch?v=yVRglHWHLC8&t=214s) **Presenter:** Because today there's pretty much SaaS for everything.

[03:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=217s) **Presenter:** So I'm going to introduce to you today something called RPA.

[03:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=222s) **Presenter:** Not sure if you've heard of it, but RPA, Robotic Process Automation,

[03:46](https://www.youtube.com/watch?v=yVRglHWHLC8&t=226s) **Presenter:** it's basically a service that's actually running on users' laptops,

[03:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=230s) **Presenter:** and it is impersonating users in order to create business automations.

[03:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=236s) **Presenter:** So, for example, you move your mouse, you click things on your keyboard,

[04:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=240s) **Presenter:** it would record these things and then replay them.

[04:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=243s) **Presenter:** And it is used, for example, to integrate with legacy systems

[04:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=246s) **Presenter:** have an API. Now, the crucial piece about robotic process automation is it's composed of these three

[04:12](https://www.youtube.com/watch?v=yVRglHWHLC8&t=252s) **Presenter:** separate kind of things. One is the electional agent that runs either on a user's laptop or on

[04:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=259s) **Presenter:** some server. There's a controller that's able to operate to reach out through the network into those

[04:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=265s) **Presenter:** machines and send the payload and exfiltrate back or get back the results. And of course, there's a

[04:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=271s) **Presenter:** management platform on the SaaS side. The crucial piece here is that all of these are trusted.

[04:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=276s) **Presenter:** trusted, I mean that the

[04:38](https://www.youtube.com/watch?v=yVRglHWHLC8&t=278s) **Presenter:** EDRs trust them, the network security

[04:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=280s) **Presenter:** trust them, they all operate

[04:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=283s) **Presenter:** in

[04:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=284s) **Presenter:** boxes that have been

[04:46](https://www.youtube.com/watch?v=yVRglHWHLC8&t=286s) **Presenter:** pre-approved. And so if we use

[04:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=288s) **Presenter:** this specific, you can see where I'm

[04:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=290s) **Presenter:** going with this, right? This is an infrastructure

[04:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=293s) **Presenter:** to run code

[04:55](https://www.youtube.com/watch?v=yVRglHWHLC8&t=295s) **Presenter:** on users' laptop and

[04:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=297s) **Presenter:** then get the results back

[04:58](https://www.youtube.com/watch?v=yVRglHWHLC8&t=298s) **Presenter:** and all of this is being facilitated

[05:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=300s) **Presenter:** through, well, this is

[05:02](https://www.youtube.com/watch?v=yVRglHWHLC8&t=302s) **Presenter:** actually just using RPA, but

[05:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=304s) **Presenter:** just in a creative way and for malicious purposes.

[05:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=307s) **Presenter:** And so one important thing to note is that RPA is already pretty much everywhere in the enterprise.

[05:13](https://www.youtube.com/watch?v=yVRglHWHLC8&t=313s) **Presenter:** You'll find these are kind of the large vendors, but there are others.

[05:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=317s) **Presenter:** And you'll find that this is pretty prolific.

[05:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=320s) **Presenter:** And RPA will do much more than we initially wanted.

[05:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=325s) **Presenter:** It will actually take care of a bunch of engineering things for us.

[05:28](https://www.youtube.com/watch?v=yVRglHWHLC8&t=328s) **Presenter:** So handling errors, being able to support different types of OSs, different versions, being able to update the malware on the fly.

[05:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=337s) **Presenter:** All of those things would be handled by RPA itself.

[05:41](https://www.youtube.com/watch?v=yVRglHWHLC8&t=341s) **Presenter:** And so just one simple thing to understand about what RPA is.

[05:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=348s) **Presenter:** So essentially, it's about replacing this copy and paste that users are doing in order to move data between two places.

[05:55](https://www.youtube.com/watch?v=yVRglHWHLC8&t=355s) **Presenter:** There's kind of a nice drag-and-drop builder,

[05:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=357s) **Presenter:** and it emulates users' actions.

[05:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=359s) **Presenter:** This is crucial.

[06:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=360s) **Presenter:** This is running as the user in the context of that user,

[06:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=365s) **Presenter:** and there's no real easy way to distinguish between a user

[06:08](https://www.youtube.com/watch?v=yVRglHWHLC8&t=368s) **Presenter:** and what this thing is actually doing.

[06:10](https://www.youtube.com/watch?v=yVRglHWHLC8&t=370s) **Presenter:** All right.

[06:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=371s) **Presenter:** And it's also kind of in terms of use cases,

[06:15](https://www.youtube.com/watch?v=yVRglHWHLC8&t=375s) **Presenter:** there are actually valid use cases for this,

[06:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=377s) **Presenter:** again, mainly integration with legacy systems.

[06:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=380s) **Presenter:** Okay, that's enough kind of intro.

[06:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=383s) **Presenter:** Now we're going to see how we can actually use RPA to accomplish what we wanted.

[06:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=389s) **Presenter:** So here's what we're going to do today.

[06:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=391s) **Presenter:** We're going to start with, we've already gone through kind of very briefly the motivation and what RPA is.

[06:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=400s) **Presenter:** And we're going to go through a technical deep dive to see how RPA actually works.

### Exploiting RPA for Remote Code Execution and C2

[06:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=405s) **Presenter:** Then we'll see how we can abuse RPA for remote code execution as a C2 server.

[06:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=410s) **Presenter:** and then we're going to introduce a tool that will allow you to do all of that yourself.

[06:55](https://www.youtube.com/watch?v=yVRglHWHLC8&t=415s) **Presenter:** So let's start with a deep dive.

[06:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=417s) **Presenter:** And from this point in the talk, I'm going to focus specifically on Microsoft's RPA.

[07:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=424s) **Presenter:** And the reason behind it is that it's already included in every Windows 11 machine.

[07:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=429s) **Presenter:** So just take a fresh vanilla Windows 11 machine.

[07:12](https://www.youtube.com/watch?v=yVRglHWHLC8&t=432s) **Presenter:** You'll find this already there.

[07:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=434s) **Presenter:** By the way, if you've uninstalled it, they will install it back

[07:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=437s) **Presenter:** with all of the kind of default applications that you have there.

[07:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=440s) **Presenter:** So this is malware that's already installed in Windows 11 machines,

[07:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=445s) **Presenter:** and that's why I'm going to focus here.

[07:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=447s) **Presenter:** Of course, this is not just a problem about Microsoft.

[07:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=451s) **Presenter:** It's larger than that.

[07:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=452s) **Presenter:** It's the entire industry.

[07:33](https://www.youtube.com/watch?v=yVRglHWHLC8&t=453s) **Presenter:** However, the fact that this is already there on Windows machines is crucial

[07:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=457s) **Presenter:** because, again, Microsoft EDR, for example, will trust it.

[07:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=460s) **Presenter:** This is bundled in.

[07:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=462s) **Presenter:** So let's see this in action.

[07:46](https://www.youtube.com/watch?v=yVRglHWHLC8&t=466s) **Presenter:** Let's see how it works.

[07:46](https://www.youtube.com/watch?v=yVRglHWHLC8&t=466s) **Presenter:** So from a user's perspective, if I go to a vanilla Windows 11 machine,

[07:51](https://www.youtube.com/watch?v=yVRglHWHLC8&t=471s) **Presenter:** I'll search for Power Automate.

[07:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=473s) **Presenter:** I encourage you to do that if you have a Windows machine with you.

[07:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=476s) **Presenter:** You'll find this Power Automate executable.

[07:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=479s) **Presenter:** And once you click on it, you'll get into...

[08:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=483s) **Presenter:** Let's see if I can get this to work.

[08:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=491s) **Presenter:** All right.

[08:12](https://www.youtube.com/watch?v=yVRglHWHLC8&t=492s) **Presenter:** So this is just going to show you that kind of a small video of me opening up the RPA agent.

[08:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=498s) **Presenter:** So you can see I have a small kind of UI there.

[08:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=500s) **Presenter:** It's asking me for an email.

[08:22](https://www.youtube.com/watch?v=yVRglHWHLC8&t=502s) **Presenter:** This is actually a user for my office account.

[08:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=505s) **Presenter:** Crucially, I can put any office account here.

[08:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=507s) **Presenter:** So it could be kind of a malicious office account as well.

[08:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=510s) **Presenter:** Once I do that, I get a bunch of tasks that are fetched from the cloud.

[08:35](https://www.youtube.com/watch?v=yVRglHWHLC8&t=515s) **Presenter:** You will see that again in a moment that I've already pre-configured.

[08:38](https://www.youtube.com/watch?v=yVRglHWHLC8&t=518s) **Presenter:** And this is the drag and drop interface that Microsoft allows you to use in order to create those agents, those drag and drop, those RPA agents.

[08:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=528s) **Presenter:** And here I'm doing something kind of really silly.

[08:51](https://www.youtube.com/watch?v=yVRglHWHLC8&t=531s) **Presenter:** I'm just going to open up a file and then write something to that file.

[08:54](https://www.youtube.com/watch?v=yVRglHWHLC8&t=534s) **Presenter:** And you can see, so I click play and it works.

[08:58](https://www.youtube.com/watch?v=yVRglHWHLC8&t=538s) **Presenter:** And then in a moment you'll see that there's a file there.

[09:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=540s) **Presenter:** But the crucial thing is that the agent is doing all of that.

[09:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=544s) **Presenter:** And there are a bunch of operations that are, all of these things are provided by this platform, by the RPA platform.

[09:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=551s) **Presenter:** It is able to operate with the OS and do things on a user's behalf.

[09:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=556s) **Presenter:** Now, one thing you might have noticed is that once I connected and once I plugged in my account into this agent,

[09:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=566s) **Presenter:** it synced with the cloud and provided me a bunch of these tasks that I've already created.

[09:34](https://www.youtube.com/watch?v=yVRglHWHLC8&t=574s) **Presenter:** payloads that I have pre-created.

[09:38](https://www.youtube.com/watch?v=yVRglHWHLC8&t=578s) **Presenter:** This is actually going to Office.

[09:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=580s) **Presenter:** This is communicating with Office.

[09:41](https://www.youtube.com/watch?v=yVRglHWHLC8&t=581s) **Presenter:** Again, my Office.

### Silent Registration and Persistence Techniques

[09:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=582s) **Presenter:** It could be just kind of my malicious version of Office.

[09:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=588s) **Presenter:** And it's communicating with Office and actually fetching all of those payloads for us.

[09:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=593s) **Presenter:** And so one of the things that we should try and understand is how does this communication work?

[09:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=599s) **Presenter:** Because if you think about it, because this is prepackaged within Windows 11,

[10:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=605s) **Presenter:** nobody has asked a network admin to open a port somewhere in order for this to actually work.

[10:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=611s) **Presenter:** This has to work out of the box in every type of environment with every type of network configuration.

[10:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=616s) **Presenter:** And so we need to understand what is going on here.

[10:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=619s) **Presenter:** So here's kind of a high-level view of it.

[10:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=623s) **Presenter:** On one side, there's Power Automate.

[10:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=625s) **Presenter:** There's somebody's laptop.

[10:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=626s) **Presenter:** And on the other side, there's the cloud.

[10:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=629s) **Presenter:** laptop itself. So Power Automate is actually using two separate executables here that are running

[10:35](https://www.youtube.com/watch?v=yVRglHWHLC8&t=635s) **Presenter:** under two different services on the machine. You can see that one of the, so there's the Power

[10:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=642s) **Presenter:** Automate executable that runs on the user's own context. And there's also another service account

[10:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=648s) **Presenter:** that is created locally, which runs this machine runtime. The machine runtime is going to be the

[10:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=653s) **Presenter:** thing that is going to communicate with Office. And these two can communicate. The machine runtime

[10:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=659s) **Presenter:** can also spin up Power Automate agents on new user sessions.

[11:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=664s) **Presenter:** So you can provide it with a username and password, a local one,

[11:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=667s) **Presenter:** and it will start a session for that user and then use Power Automate to run things there.

[11:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=676s) **Presenter:** All right.

[11:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=678s) **Presenter:** Power Automate is also able to work with a browser, to automate a browser.

[11:22](https://www.youtube.com/watch?v=yVRglHWHLC8&t=682s) **Presenter:** And this is done through extensions.

[11:24](https://www.youtube.com/watch?v=yVRglHWHLC8&t=684s) **Presenter:** again Edge would come

[11:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=686s) **Presenter:** once you use Power Automate

[11:28](https://www.youtube.com/watch?v=yVRglHWHLC8&t=688s) **Presenter:** Edge would have this pre-installed

[11:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=689s) **Presenter:** and then it allows the agent

[11:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=692s) **Presenter:** to control whatever you have on the browser

[11:34](https://www.youtube.com/watch?v=yVRglHWHLC8&t=694s) **Presenter:** of course again because this is running on a user

[11:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=696s) **Presenter:** context you can steal whatever the user

[11:38](https://www.youtube.com/watch?v=yVRglHWHLC8&t=698s) **Presenter:** has in their browser context

[11:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=699s) **Presenter:** which of course opens up a whole wide

[11:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=702s) **Presenter:** range of opportunities

[11:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=703s) **Presenter:** and so there are executables

[11:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=705s) **Presenter:** there that are related to

[11:47](https://www.youtube.com/watch?v=yVRglHWHLC8&t=707s) **Presenter:** communicating with the browsers

[11:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=709s) **Presenter:** and actually I've only

[11:52](https://www.youtube.com/watch?v=yVRglHWHLC8&t=712s) **Presenter:** talked about three different

[11:54](https://www.youtube.com/watch?v=yVRglHWHLC8&t=714s) **Presenter:** executables that are prepackaged, but you can see in this picture that there are a whole

[11:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=717s) **Presenter:** bunch more of them.

[11:58](https://www.youtube.com/watch?v=yVRglHWHLC8&t=718s) **Presenter:** And if you're looking for an area that could be fun kind of to play around with, I strongly

[12:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=725s) **Presenter:** encourage you to look into it.

[12:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=726s) **Presenter:** Just like a few months ago, somebody found the NRC here in one of those.

[12:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=731s) **Presenter:** So go ahead.

[12:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=734s) **Presenter:** So that's kind of one side.

[12:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=736s) **Presenter:** And the thing to note is that all of these executables, they won't be stopped by the

[12:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=740s) **Presenter:** EDR because the EDR has to trust them.

[12:24](https://www.youtube.com/watch?v=yVRglHWHLC8&t=744s) **Presenter:** of Windows. All right. The next thing is how does the thing communicate with the cloud? How does it

[12:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=749s) **Presenter:** work in a way that can go through the network boundary, the corporate network boundary,

[12:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=756s) **Presenter:** without asking for permissions? Any ideas? Okay. So this is kind of, they're actually using a nice

[12:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=768s) **Presenter:** feature or a nice service by Azure called Azure Service Bus or Azure Relay. Essentially,

[12:54](https://www.youtube.com/watch?v=yVRglHWHLC8&t=774s) **Presenter:** outbound communication channel, and then they are querying a queue on a schedule,

### Payload Delivery and Data Exfiltration via RPA

[13:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=780s) **Presenter:** which means that they are able to go through anything because usually people don't block outbound communication.

[13:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=786s) **Presenter:** And so this is the way in which Office and this machine can work.

[13:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=789s) **Presenter:** Again, this is going to be the way for us to push payloads in and to exfiltrate data out.

[13:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=798s) **Presenter:** Okay.

[13:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=798s) **Presenter:** Once you connect your Power Automate agent, once you go through what I showed you a few minutes ago with the video,

[13:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=807s) **Presenter:** you get a nice little UI that shows you all of the machines that you have connected to your account.

[13:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=812s) **Presenter:** You can see the status of those machines, which ones are connected or not,

[13:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=816s) **Presenter:** how many jobs are executed on each one of those machines.

[13:41](https://www.youtube.com/watch?v=yVRglHWHLC8&t=821s) **Presenter:** Of course, you can run tasks from the cloud.

[13:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=823s) **Presenter:** So this is me going to the Microsoft UI with my malicious Microsoft tenant.

[13:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=830s) **Presenter:** And then I can just click on run some automation on somebody's machine, a machine that I've pre-registered, and I can run that on the machine.

[13:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=839s) **Presenter:** And once I do that, I get status for the tasks.

[14:02](https://www.youtube.com/watch?v=yVRglHWHLC8&t=842s) **Presenter:** I can debug errors.

[14:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=843s) **Presenter:** I mean, there are a whole bunch of engineering features here that can help me make sure that my malware is operating successfully.

[14:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=851s) **Presenter:** Okay.

[14:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=854s) **Presenter:** Now that we understand how Power Automate works

[14:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=857s) **Presenter:** and how it's able to actually do what it's supposed to do,

[14:22](https://www.youtube.com/watch?v=yVRglHWHLC8&t=862s) **Presenter:** let me show you how you can use it as a hacker.

[14:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=865s) **Presenter:** So what we're going to do is show you all of the things on our wish list,

[14:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=870s) **Presenter:** on our malware operation wish list,

[14:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=872s) **Presenter:** and how they can be accomplished with this Microsoft agent.

[14:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=876s) **Presenter:** All right.

[14:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=877s) **Presenter:** I'm going to start very simply.

[14:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=880s) **Presenter:** I'm just going to start by creating a Microsoft malicious tenant.

[14:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=884s) **Presenter:** This is pretty easy.

[14:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=885s) **Presenter:** You can just create your own tenant with a few clicks.

[14:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=888s) **Presenter:** You don't need to pay anything.

[14:51](https://www.youtube.com/watch?v=yVRglHWHLC8&t=891s) **Presenter:** You don't need to put in a credit card.

[14:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=893s) **Presenter:** It's very easy.

[14:55](https://www.youtube.com/watch?v=yVRglHWHLC8&t=895s) **Presenter:** Once you do that, you have your own version of Office,

[14:58](https://www.youtube.com/watch?v=yVRglHWHLC8&t=898s) **Presenter:** so your own tenant inside of Office.

[15:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=900s) **Presenter:** Here I called it Pantosa as a joke for Microsoft.

[15:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=903s) **Presenter:** And then you can start to register machines into this tenant,

[15:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=909s) **Presenter:** to do the infection.

[15:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=911s) **Presenter:** So how do we infect a new machine

[15:13](https://www.youtube.com/watch?v=yVRglHWHLC8&t=913s) **Presenter:** with this type of malware?

[15:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=916s) **Presenter:** Well, we've actually seen this, right?

[15:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=917s) **Presenter:** There's this little UI thing.

[15:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=919s) **Presenter:** When I go to a new machine,

[15:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=920s) **Presenter:** I can open up the UI

[15:22](https://www.youtube.com/watch?v=yVRglHWHLC8&t=922s) **Presenter:** and then I need to register.

[15:24](https://www.youtube.com/watch?v=yVRglHWHLC8&t=924s) **Presenter:** And when I enter a user here,

[15:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=926s) **Presenter:** I'm just going to enter the user

[15:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=927s) **Presenter:** for my malicious tenant.

[15:28](https://www.youtube.com/watch?v=yVRglHWHLC8&t=928s) **Presenter:** Now, of course, using a UI to do that

[15:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=932s) **Presenter:** wouldn't be really a very good malware, right?

[15:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=936s) **Presenter:** So in order to do this silently,

[15:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=939s) **Presenter:** will want to be able to avoid the UI.

[15:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=942s) **Presenter:** And the question is, can we do that?

[15:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=944s) **Presenter:** Can we bypass this UI and maybe operate directly with the internal APIs?

[15:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=949s) **Presenter:** Well, we don't really need to because this is provided by Microsoft.

[15:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=953s) **Presenter:** So there is a script that's bundled into Windows as well.

[15:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=957s) **Presenter:** You can see the title here, silently register a new machine.

[16:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=960s) **Presenter:** And when you do that, this is available through command line or PowerShell,

### No‑Code Ransomware and Advanced Automation Capabilities

[16:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=964s) **Presenter:** where when you do that, you provide your own malicious tenant.

[16:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=967s) **Presenter:** You can provide a malicious user within that tenant.

[16:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=971s) **Presenter:** And from that moment on, the agent is connected to your own malicious tenant.

[16:15](https://www.youtube.com/watch?v=yVRglHWHLC8&t=975s) **Presenter:** Now, one question somebody asked me once is,

[16:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=978s) **Presenter:** what happens if the agent is already registered, if people are already using this?

[16:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=983s) **Presenter:** So fortunately, you can register a few different tenants with the same machine.

[16:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=987s) **Presenter:** Okay, so there won't be any conflicts.

[16:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=990s) **Presenter:** And if the user opens up this Power Automate agent on their machine,

[16:33](https://www.youtube.com/watch?v=yVRglHWHLC8&t=993s) **Presenter:** it will still allow them to log in.

[16:38](https://www.youtube.com/watch?v=yVRglHWHLC8&t=998s) **Presenter:** they will not see the fact that it's already registered

[16:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1000s) **Presenter:** because I've used this silent registration script.

[16:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1003s) **Presenter:** All right.

[16:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1004s) **Presenter:** So this is infection.

[16:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1005s) **Presenter:** This is just once I have initial access,

[16:47](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1007s) **Presenter:** the only thing I need to do is run this script and that's it.

[16:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1010s) **Presenter:** Once I have that, the machine is registered to the list of machines

[16:55](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1015s) **Presenter:** that I have on my Microsoft tenant.

[16:58](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1018s) **Presenter:** And now one thing that's important about this silent registration script

[17:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1023s) **Presenter:** is the fact that I'm not sure if you've noticed,

[17:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1027s) **Presenter:** an admin for this PowerShell,

[17:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1029s) **Presenter:** which actually makes this kind of weaker, right?

[17:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1034s) **Presenter:** So one of the things we wanted to do

[17:16](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1036s) **Presenter:** is make sure that is see if we are able to bypass this

[17:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1039s) **Presenter:** to run this as a user.

[17:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1040s) **Presenter:** And so we did something very sophisticated.

[17:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1043s) **Presenter:** We tried and it just worked.

[17:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1046s) **Presenter:** So this script, even though it's advertised

[17:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1049s) **Presenter:** to only work for admins, it works for everybody.

[17:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1052s) **Presenter:** Microsoft is aware of this process and of this thing

[17:34](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1054s) **Presenter:** and are working on solving it.

[17:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1057s) **Presenter:** hasn't been solved yet.

[17:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1059s) **Presenter:** All right.

[17:40](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1060s) **Presenter:** Once I have this agent,

[17:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1062s) **Presenter:** this machine,

[17:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1062s) **Presenter:** registered to my malicious tenant,

[17:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1064s) **Presenter:** the next thing I need to do

[17:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1065s) **Presenter:** is just trigger the workload

[17:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1068s) **Presenter:** from the cloud.

[17:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1069s) **Presenter:** I set up a connection

[17:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1070s) **Presenter:** to the specific machine,

[17:51](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1071s) **Presenter:** and then I can distribute

[17:52](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1072s) **Presenter:** the payload from the machine

[17:54](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1074s) **Presenter:** to the specific,

[17:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1076s) **Presenter:** from the cloud

[17:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1076s) **Presenter:** to the specific machine.

[17:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1077s) **Presenter:** So this is a C2 server, right?

[18:01](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1081s) **Presenter:** The agent is going to Azure Relay.

[18:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1084s) **Presenter:** It's looking for payloads.

[18:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1086s) **Presenter:** And then every time

[18:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1087s) **Presenter:** that I can put there through this UI,

### Tool Release and Practical Deployment Guidance

[18:10](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1090s) **Presenter:** it will execute them on the machine.

[18:12](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1092s) **Presenter:** And I'm going to skip a couple of slides here

[18:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1094s) **Presenter:** because I know we're kind of out of time

[18:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1098s) **Presenter:** or reaching that point.

[18:21](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1101s) **Presenter:** But let's see what we have done so far,

[18:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1103s) **Presenter:** and we haven't done much,

[18:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1105s) **Presenter:** is one, we're able to deploy this malware,

[18:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1107s) **Presenter:** so we're able to infect a machine.

[18:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1109s) **Presenter:** We're able to avoid defenses by definition

[18:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1112s) **Presenter:** because, again, I've only used bundled-in executables

[18:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1117s) **Presenter:** that are operating with Microsoft Cloud.

[18:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1119s) **Presenter:** And of course, persistency is easy as well

[18:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1122s) **Presenter:** because, again, this is all things that are used by Microsoft.

[18:45](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1125s) **Presenter:** So they are in charge of making sure that

[18:47](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1127s) **Presenter:** if the laptop is rebooted or something,

[18:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1130s) **Presenter:** then we are still, this agent is still working.

[18:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1133s) **Presenter:** Of course, if somebody resets the machine

[18:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1137s) **Presenter:** kind of permanently, then we would be out.

[19:01](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1141s) **Presenter:** What I'm going to show you now

[19:02](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1142s) **Presenter:** is what kind of actual payloads we can do with this.

[19:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1145s) **Presenter:** So we're already in a machine.

[19:07](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1147s) **Presenter:** we can start to see what this agent can actually accomplish for us.

[19:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1154s) **Presenter:** Okay, let's start with something very simple.

[19:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1157s) **Presenter:** Let's say I want to do data exfiltration.

[19:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1159s) **Presenter:** So I want to steal a specific file from this machine.

[19:23](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1163s) **Presenter:** This is a very simple automation that I've just built here.

[19:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1166s) **Presenter:** I'm just opening up a file, storing its content in the output of this job.

[19:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1171s) **Presenter:** And once I run this from the cloud side, I give it an input of the specific file that I want, and the output would just be the bytes of that file.

[19:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1182s) **Presenter:** Now, one thing that we need to make sure we understand is how this data actually goes out.

[19:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1189s) **Presenter:** And so just as a reminder, this is operating through the trusted communication channel that Microsoft has established for us.

[19:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1197s) **Presenter:** payload is going through the trusted communication channel,

[20:00](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1200s) **Presenter:** and data exfiltration goes down the same route.

[20:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1203s) **Presenter:** So it would be very difficult for you to actually catch this data exfiltration ongoing.

[20:10](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1210s) **Presenter:** The next thing I want you to see is code execution.

[20:15](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1215s) **Presenter:** So what if we want to run just kind of whatever we want?

[20:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1219s) **Presenter:** So one thing we could try is to use the functions that are provided by this agent

[20:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1225s) **Presenter:** to actually run scripts.

[20:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1227s) **Presenter:** You can run Python, you can run command line

[20:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1230s) **Presenter:** or any other thing.

[20:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1231s) **Presenter:** But that would, of course, trigger if we,

[20:33](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1233s) **Presenter:** in this instance here, I'm running Mimikatz.

[20:35](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1235s) **Presenter:** That would, of course, trigger the defender, right?

[20:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1239s) **Presenter:** Because that part is not trusted.

[20:41](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1241s) **Presenter:** You're just running a script.

[20:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1243s) **Presenter:** So instead of running the script,

[20:46](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1246s) **Presenter:** what if we stay in the trusted zone?

[20:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1249s) **Presenter:** What if instead of running a script,

[20:51](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1251s) **Presenter:** an executable, a payload, something,

[20:52](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1252s) **Presenter:** we build our entire payload with no code,

[20:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1256s) **Presenter:** with this drag and drop interface.

### Defensive Measures and Closing Remarks

[20:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1257s) **Presenter:** So the question becomes, what can we do with it?

[21:01](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1261s) **Presenter:** How advanced is this language?

[21:03](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1263s) **Presenter:** Or what are the primitives that we have

[21:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1265s) **Presenter:** in order to actually build things on our own?

[21:08](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1268s) **Presenter:** And the answer to that is that these agents

[21:10](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1270s) **Presenter:** are very, very, very powerful.

[21:13](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1273s) **Presenter:** These are just a few examples,

[21:15](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1275s) **Presenter:** but you can trigger HTTP calls,

[21:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1279s) **Presenter:** you can encrypt files,

[21:20](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1280s) **Presenter:** You can communicate with Active Directory, Windows services, processes.

[21:26](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1286s) **Presenter:** You can look into files and folders.

[21:27](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1287s) **Presenter:** You can automate the browser.

[21:29](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1289s) **Presenter:** You can take screenshots.

[21:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1290s) **Presenter:** You can control the mouse and the keyboard.

[21:33](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1293s) **Presenter:** You can control the clipboard.

[21:34](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1294s) **Presenter:** This is basically everything you want, right?

[21:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1297s) **Presenter:** And as long as you build your payload with this drag-and-drop interface,

[21:41](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1301s) **Presenter:** Microsoft will execute it for you, and you won't go out of the trusted zone.

[21:47](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1307s) **Presenter:** I'm going to show you just one example, and then I'm going to skip forward because, unfortunately, we're running out of time.

[21:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1313s) **Presenter:** But here's kind of a very quick example of no-code ransomware.

[21:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1317s) **Presenter:** This is iterating through a directory and going through subdirectories and then using the encryption function,

[22:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1325s) **Presenter:** which is provided by this agent, in order to actually kind of override the file.

[22:11](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1331s) **Presenter:** And again, this is being done.

[22:13](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1333s) **Presenter:** This entire thing is running in a Microsoft executable.

[22:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1337s) **Presenter:** very difficult to try to remove this without removing Power Automate as a whole.

[22:24](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1344s) **Presenter:** I'm going to jump a few steps forward to show you.

[22:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1350s) **Presenter:** So again, there are many things.

[22:32](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1352s) **Presenter:** Once I have kind of arbitrary execution, I can do pretty much whatever I want.

[22:38](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1358s) **Presenter:** And everything that we wanted to do would be available through this agent.

[22:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1363s) **Presenter:** And so one thing that I want to leave you off with is a way for you to actually use this when you go back home.

[22:51](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1371s) **Presenter:** And so I'm going to – so there's a tool that I've released about six months ago called PowerPoint.

[23:01](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1381s) **Presenter:** And this tool basically does everything that I showed you here in this talk.

[23:05](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1385s) **Presenter:** So once you take this tool – let me switch here.

[23:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1389s) **Presenter:** Once you use this tool, it's available here on this link,

[23:14](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1394s) **Presenter:** it will accomplish all of these different things for you.

[23:17](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1397s) **Presenter:** So you'll be able to infect a specific machine.

[23:19](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1399s) **Presenter:** You will be able to exfiltrate data.

[23:21](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1401s) **Presenter:** All of the payloads are prepackaged.

[23:24](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1404s) **Presenter:** And in order to use it, all you need to do is actually just set up a Microsoft tenant for yourself.

[23:30](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1410s) **Presenter:** So if you're interested, we're just approaching a release of another version of this tool,

[23:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1416s) **Presenter:** which is going to be much more convenient and robust.

[23:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1419s) **Presenter:** If you're interested, check it out and start the repo.

[23:42](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1422s) **Presenter:** You'll get the notification.

[23:44](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1424s) **Presenter:** So the one thing I have to do before I finish off

[23:48](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1428s) **Presenter:** is help you defend yourself from this thing

[23:50](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1430s) **Presenter:** because otherwise I've just created harm.

[23:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1433s) **Presenter:** And so here's what you need to do.

[23:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1436s) **Presenter:** The first thing and the most important thing

[23:57](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1437s) **Presenter:** that could stop this entire attack

[23:59](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1439s) **Presenter:** is to monitor the usage of this prepackaged

[24:02](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1442s) **Presenter:** silent registration executable.

[24:04](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1444s) **Presenter:** You can see the name here.

[24:06](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1446s) **Presenter:** The number one thing you should be looking for

[24:09](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1449s) **Presenter:** that isn't yours, that should be a giant red flag.

[24:13](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1453s) **Presenter:** There is also a way if you're using,

[24:15](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1455s) **Presenter:** if you have a way to change group policies

[24:18](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1458s) **Presenter:** and pre-install them on every machine,

[24:21](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1461s) **Presenter:** you can actually limit which tenants can be registered

[24:25](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1465s) **Presenter:** to use this Power Automate agent.

[24:28](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1468s) **Presenter:** And other than that, there's a bunch more information

[24:31](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1471s) **Presenter:** about this specific attack and other attacks

[24:33](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1473s) **Presenter:** related to the no-code infrastructure

[24:36](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1476s) **Presenter:** that Microsoft has and others as well.

[24:37](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1477s) **Presenter:** There are a couple links here.

[24:39](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1479s) **Presenter:** And all of these, kind of the slides, the links, everything,

[24:43](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1483s) **Presenter:** will be available on this link up there.

[24:47](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1487s) **Presenter:** So there's a bunch more information.

[24:49](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1489s) **Presenter:** Thank you very much for being with me over lunch.

[24:53](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1493s) **Presenter:** It's been great fun.

[24:56](https://www.youtube.com/watch?v=yVRglHWHLC8&t=1496s) **Presenter:** Last to Michael.
<!-- talk-enrichment:end -->
