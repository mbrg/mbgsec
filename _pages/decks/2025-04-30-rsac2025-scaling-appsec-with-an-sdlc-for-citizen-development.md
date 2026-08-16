---
title: "Scaling AppSec With an SDLC for Citizen Development (ft Ryan McDonald)"
talk_date: 2025-04-30
conference: RSAC 2025
permalink: /talks/2025-04-30-rsac2025-scaling-appsec-with-an-sdlc-for-citizen-development/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2025-04-30_Scaling_AppSec_With_an_SDLC_for_Citizen_Development/latest.json
pdf_url: https://media.mbgsec.com/decks/2025-04-30_Scaling_AppSec_With_an_SDLC_for_Citizen_Development/slides.pdf
schedule_url: https://path.rsaconference.com/flow/rsac/us25/FullAgenda/page/catalog/session/1727440189535001bZIe
recording_url: https://www.youtube.com/watch?v=ge9q6WIDzso
github_url: https://github.com/mbrg/power-pwn
description: "AppSec programs are difficult, filled with vulnerabilities. Overloaded staff and inadequate budget. The era of Citizen Development where non-IT folks develop code, often using LCNC tools, brings new challenges. The traditional approach of narrow scope and…"
abstract_source_url: "https://www.rsaconference.com/library/presentation/usa/2025/scaling-appsec-with-an-sdlc-for-citizen-development"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://www.youtube.com/watch?v=ge9q6WIDzso"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-mlx"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "3cc589133adc5426d6a6669f659feed5ab2a94e2c9c38824d96583cc71477564"
---


<!-- talk-enrichment:start -->
## Abstract

AppSec programs are difficult, filled with vulnerabilities. Overloaded staff and inadequate budget. The era of Citizen Development where non-IT folks develop code, often using LCNC tools, brings new challenges. The traditional approach of narrow scope and focus on crown jewels will no longer work. This session will reveal a solution to address increasing the scope to result in program remediation.

_[Official conference abstract](https://www.rsaconference.com/library/presentation/usa/2025/scaling-appsec-with-an-sdlc-for-citizen-development)_

## Transcript

> AI generated from recording.

### Introduction & Scale of Citizen Development; Why Citizen Development is So Prevalent; The Risks of Uncontrolled Citizen Development

[00:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=0s) **Presenter:** Thank you everyone for being here. This is going to be a really exciting session. There aren't a lot of opportunities for us to really learn not just about like risk, but what actually is working and not working in large organizations within the enterprise that is usually kept out of like off stage. And so I'm really excited for this talk together.

[00:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=25s) **Presenter:** together. All right. 55,000 developers. 90,000 co-pilots and agents. 500,000 apps. More than a million automations. 10 million credentials. These are the numbers that Microsoft is dealing with in their citizen developer environment.

[00:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=55s) **Presenter:** These are crazy numbers.

[00:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=59s) **Presenter:** And by the title of this talk,

[01:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=62s) **Presenter:** you understand that we're going to talk about

[01:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=64s) **Presenter:** how do you figure out a security program around it.

[01:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=69s) **Presenter:** So one question you should have in your head first here

[01:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=73s) **Presenter:** is how are these numbers even possible?

[01:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=77s) **Presenter:** That's one question.

[01:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=78s) **Presenter:** The other question is imagine how many problems you can find

[01:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=81s) **Presenter:** with this number of assets.

[01:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=85s) **Presenter:** do you even go at it? And so what we're gonna do today is we're gonna share the

[01:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=91s) **Presenter:** story of how we made an AppSec program work at this scale, which is just

[01:38](https://www.youtube.com/watch?v=ge9q6WIDzso&t=98s) **Presenter:** incredible. This is what we are gonna cover today in this talk. So here's our

[01:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=105s) **Presenter:** agenda. Here's our agenda. We're gonna start with why there are so many

[01:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=112s) **Presenter:** applications, why these staggering numbers, how does this even possible. Then we're

[01:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=117s) **Presenter:** gonna go to understand why are these important, why it's important for you to

[02:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=121s) **Presenter:** invest your time in securing those applications. We're gonna share a bit on

[02:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=125s) **Presenter:** how on everything that we try to do that failed, all of the avenues we went through

[02:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=131s) **Presenter:** that went nowhere and then we're gonna share exactly how we made it work. And so

[02:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=138s) **Presenter:** So hi, everyone.

[02:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=140s) **Presenter:** My name is Michael Barguri.

[02:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=142s) **Presenter:** I've been at this space of trying to figure out security for citizen development for over four years now.

[02:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=147s) **Presenter:** And then everything became no code, and we are all vibe coding everything.

[02:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=152s) **Presenter:** So this became like a very, very, very big deal for the rest of the community.

[02:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=157s) **Presenter:** I've been doing these kind of talks for a while now.

[02:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=160s) **Presenter:** Thank you very much.

[02:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=160s) **Presenter:** Really excited to be here.

[02:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=162s) **Presenter:** Hi, everyone.

[02:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=162s) **Presenter:** I'm Ryan McDonald.

[02:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=164s) **Presenter:** I've been in technology for the last 25 years and I've been at Microsoft for the last three

[02:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=168s) **Presenter:** and a half years working on our internal security teams on remediation and governance programs.

[02:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=176s) **Presenter:** And I currently lead our citizen dev security assurance and remediation program.

[03:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=183s) **Presenter:** And I want to give a big thank you to some of my colleagues who are a big part of the

[03:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=187s) **Presenter:** internal Microsoft story that you're going to hear a little bit later.

[03:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=190s) **Presenter:** and so thank you Jake, Andrew, PJ, Don, CJ, and Lee. Without some great cross-team collaboration,

[03:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=199s) **Presenter:** we wouldn't be up here today. So let's start by figuring out why there are so many applications

[03:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=206s) **Presenter:** here. Why so many assets? The reason is, of course, the fact that building applications has never been

[03:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=213s) **Presenter:** easier. So you drag and drop a bunch of boxes, and now you have a conversation with an AI,

[03:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=221s) **Presenter:** and behind that conversation, an application lives. And now it has identity, it can be shared,

[03:47](https://www.youtube.com/watch?v=ge9q6WIDzso&t=227s) **Presenter:** it has its own life cycle. So imagine every time somebody has a conversation with a chatbot,

[03:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=232s) **Presenter:** an application gets left behind. And we are seeing this across the industry,

[03:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=235s) **Presenter:** not just at Microsoft. This is something that everybody's using. So we are in a place right

[04:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=240s) **Presenter:** right now where everybody is a developer in a very, very real sense.

[04:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=247s) **Presenter:** People in the business, across the business,

[04:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=249s) **Presenter:** can create really sophisticated applications with AI.

[04:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=252s) **Presenter:** And so just to give you an example,

[04:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=254s) **Presenter:** first time I went to the Microsoft campus as part of our engagement

[04:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=258s) **Presenter:** from Zenity, it was during COVID,

[04:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=262s) **Presenter:** and you had to upload your vaccination proof to enter the building,

[04:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=267s) **Presenter:** and you did that through a low-code app.

[04:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=270s) **Presenter:** that you can see on screen.

[04:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=272s) **Presenter:** Now, of course, that low-code app,

[04:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=273s) **Presenter:** even though it's no code,

[04:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=275s) **Presenter:** even though it's built by the business,

[04:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=277s) **Presenter:** well, it does something pretty important, right?

[04:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=281s) **Presenter:** It has to store personal information,

[04:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=284s) **Presenter:** healthcare information.

[04:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=285s) **Presenter:** Like, citizen development usually would not know

[04:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=288s) **Presenter:** how to do that securely.

[04:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=289s) **Presenter:** Now, one of the important things

[04:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=292s) **Presenter:** that you might be thinking right now

[04:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=294s) **Presenter:** to kind of get yourself off the hook

[04:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=296s) **Presenter:** is, hey, we're not going to have citizen development.

[04:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=298s) **Presenter:** we only have professional developers, we're never going to let people build their own.

[05:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=303s) **Presenter:** I'm sorry to say that, but you don't really have a choice.

[05:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=307s) **Presenter:** The existing ecosystems that enterprises are already bought into, they are infused with

[05:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=313s) **Presenter:** no-code tools, they are infused with AI tools today.

[05:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=316s) **Presenter:** So you don't get a choice, this just finds its way into your organization.

[05:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=321s) **Presenter:** So just to clarify what that means, here's a quote from Satya Nadella from back in 2019.

[05:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=325s) **Presenter:** And he's speaking about no-code apps, and he's saying, hey, in the next five years, so until two years ago, we're going to build 500 million apps more than the last 40 years combined.

### Initial Attempts & Why They Failed

[05:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=339s) **Presenter:** This was, so this is what he said in 2019.

[05:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=343s) **Presenter:** And then Gen AI hits.

[05:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=345s) **Presenter:** And guess what happens?

[05:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=346s) **Presenter:** We are seeing Gen AI take those, take that already incredible trend and 3x, 4x it.

[05:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=355s) **Presenter:** seeing the growth in the number of applications that we've been

[05:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=359s) **Presenter:** tracking at Microsoft.

[06:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=361s) **Presenter:** You're seeing a 300% growth.

[06:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=363s) **Presenter:** We're actually seeing a 400% growth right now.

[06:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=366s) **Presenter:** This is just incredible.

[06:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=369s) **Presenter:** And when you look at Microsoft's

[06:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=373s) **Presenter:** report for just now, so you'll see just like the last

[06:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=376s) **Presenter:** quarter, you can see that everybody is using agents.

[06:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=379s) **Presenter:** Everybody's using this in development activities.

[06:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=382s) **Presenter:** This is across the entire ecosystem.

[06:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=385s) **Presenter:** So hopefully now we got your attention on why this is actually happening.

[06:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=392s) **Presenter:** And now we're going to figure out the next thing we need to figure out is, okay, why is it important?

[06:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=397s) **Presenter:** Why is it important for you to invest your time in these applications that are built across your business?

[06:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=404s) **Presenter:** And so in order to justify that, we need to look at what happens when we don't.

[06:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=408s) **Presenter:** When we leave that up for grabs, we let the developers build, and we don't help them build correctly.

[06:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=416s) **Presenter:** So I want to show you a few examples.

[06:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=419s) **Presenter:** Here's the first one.

[07:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=420s) **Presenter:** Let's say we want to build a community website, and you do it through an encode ecosystem.

[07:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=426s) **Presenter:** And in this case, I'm going to cover the Salesforce ecosystem.

[07:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=429s) **Presenter:** So you go through a nice little wizard that creates a portal for you.

[07:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=433s) **Presenter:** And that portal has information for all the different products that you provide.

[07:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=438s) **Presenter:** of course, come from the CRM. So now, when you create this application, you have a bunch

[07:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=445s) **Presenter:** of configurations. One of the configurations is allowing people to view it from the outside.

[07:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=450s) **Presenter:** This basically means it's a website out there on the internet that people can browse without

[07:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=455s) **Presenter:** logging in. Okay. So you have a portal, and you have people anonymously being able to

[07:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=462s) **Presenter:** connect to that portal. So far, so good. Now, you need this thing to be able to fetch information

[07:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=468s) **Presenter:** about your products, right?

[07:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=470s) **Presenter:** Your products may change.

[07:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=472s) **Presenter:** So this needs access to your CRM.

[07:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=474s) **Presenter:** How does it happen?

[07:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=475s) **Presenter:** So it happens through an automation.

[07:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=477s) **Presenter:** So that automation now goes out to the CRM,

[08:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=480s) **Presenter:** fetches information,

[08:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=481s) **Presenter:** and fetches information about products

[08:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=483s) **Presenter:** and puts it out on the website.

[08:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=485s) **Presenter:** So now you have this public website.

[08:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=487s) **Presenter:** It can execute this automation

[08:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=490s) **Presenter:** that fetches information about products,

[08:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=492s) **Presenter:** and it's publicly accessible.

[08:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=495s) **Presenter:** When you develop this automation,

[08:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=498s) **Presenter:** choose a bunch of configurations, one of them is what is the context under which that automation

[08:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=503s) **Presenter:** will run. And in this case, just with one click, you can choose that this automation

[08:28](https://www.youtube.com/watch?v=ge9q6WIDzso&t=508s) **Presenter:** runs in system mode. What does that mean? That means permissions are out the door. This

[08:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=515s) **Presenter:** has access to every piece of data, specifically here in the CRM object. So now we have a problem,

[08:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=522s) **Presenter:** because on one hand, we have a public website, but on the other hand, that public website

[08:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=529s) **Presenter:** that is running in system context.

### Reevaluating SDL for Low‑Code Platforms

[08:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=531s) **Presenter:** Now, you could be thinking, and many times what we're seeing

[08:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=535s) **Presenter:** is that, well, this is the case,

[08:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=537s) **Presenter:** but you don't have the right screen for that.

[08:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=539s) **Presenter:** So if you log into that website,

[09:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=541s) **Presenter:** it's not like it's going to say, hey, here's all of our products.

[09:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=544s) **Presenter:** But on the API side, well, you can just fetch all of the information.

[09:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=548s) **Presenter:** So a bad actor can find your website,

[09:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=551s) **Presenter:** identify the fact that you can fire off these automations,

[09:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=554s) **Presenter:** and then route them not to what you expected,

[09:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=558s) **Presenter:** So you can see why, because this is a misconfiguration, basically a combination of two misconfigurations that create this issue, you can't really expect the citizen developers to find this thing.

[09:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=571s) **Presenter:** Let me show you another example.

[09:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=573s) **Presenter:** So let's say you want to build an Ask HR copilot.

[09:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=577s) **Presenter:** You have your SharePoint site.

[09:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=579s) **Presenter:** It has a bunch of information, HR information, and you want to build a copilot based on that.

[09:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=584s) **Presenter:** Well, today it's very easy.

[09:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=585s) **Presenter:** You have these wizards.

[09:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=588s) **Presenter:** co-pilot for you, you have a small conversation, co-pilot is out, you have that agent, it's

[09:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=593s) **Presenter:** operational. The first thing that you'll see is that you'll ask is like, who can access,

[10:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=600s) **Presenter:** who can have a conversation with this agent? And actually, and one of the, and this is the

[10:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=606s) **Presenter:** settings that you can set there, and one of those settings would allow anybody anonymously to have

[10:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=613s) **Presenter:** a conversation with this agent. Actually, this was the default for quite a few months until we

[10:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=618s) **Presenter:** the Microsoft team and they fix it,

[10:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=621s) **Presenter:** they change the defaults.

[10:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=622s) **Presenter:** Now, the default is not available to everyone,

[10:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=624s) **Presenter:** but people can still misconfigure.

[10:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=627s) **Presenter:** So, that's the first piece that can happen here.

[10:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=630s) **Presenter:** So, you have an automation,

[10:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=632s) **Presenter:** you have an agent, it's publicly accessible.

[10:34](https://www.youtube.com/watch?v=ge9q6WIDzso&t=634s) **Presenter:** Now, you want to give this agent skills,

[10:38](https://www.youtube.com/watch?v=ge9q6WIDzso&t=638s) **Presenter:** so it can go out and fetch information.

[10:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=640s) **Presenter:** So, this is an SK HR copilot,

[10:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=643s) **Presenter:** where you want to kick off HR processes.

[10:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=646s) **Presenter:** So you go out, you connect it to an AI skill.

[10:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=651s) **Presenter:** That AI skill is tied to the Fabric ecosystem.

[10:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=655s) **Presenter:** And in Fabric, you can publish an AI skill unrelated to the Copilot Studio side,

[11:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=660s) **Presenter:** and now everybody can consume it.

[11:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=663s) **Presenter:** And so now you've got an agent that has an action,

[11:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=668s) **Presenter:** and that action fires off an AI skill on the Fabric side.

[11:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=672s) **Presenter:** and that AI skill behind the scenes in fabric

[11:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=676s) **Presenter:** connects to a data source that has sensitive information.

[11:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=679s) **Presenter:** In all of those hops,

[11:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=682s) **Presenter:** every context about whether or not this is sensitive data

[11:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=685s) **Presenter:** or not gets lost.

[11:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=686s) **Presenter:** So now you have public access on one hand,

[11:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=689s) **Presenter:** sensitive data on the other hand,

[11:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=691s) **Presenter:** and you get where this is going.

[11:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=692s) **Presenter:** This is not a theoretical scenario.

[11:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=696s) **Presenter:** We are finding this kind of problem

[11:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=699s) **Presenter:** again and again across the industry,

[11:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=702s) **Presenter:** much that we've built automated tooling. This is an open source tool that you can

### Building a Scalable Remediation Program

[11:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=706s) **Presenter:** use, that you can use to find these open agents that are out there on the

[11:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=711s) **Presenter:** Internet, fuzz them to try and see whether they have sensitive data that

[11:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=715s) **Presenter:** are spewing out, and we use this tool to scan the Internet for the Fortune, for

[11:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=719s) **Presenter:** bots that are focused on the Fortune 500. We found more than a thousand of

[12:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=724s) **Presenter:** these agents that were outside having conversations willing to spew sensitive

[12:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=729s) **Presenter:** data at us. This is really easy to misconfigure. And please, you can go

[12:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=737s) **Presenter:** ahead and check out this tool. It's an open source tool. You can use it for free.

[12:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=743s) **Presenter:** All right, let's dive into another real-world example. This one's about a

[12:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=747s) **Presenter:** fictitious vendor we'll call John, and he's what I call a persistent vendor. And

[12:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=752s) **Presenter:** this story illustrates why identity and access can remain active in ways that

[12:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=759s) **Presenter:** expect even after onboarding. So John was contracted for 18 months as a vendor from a

[12:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=766s) **Presenter:** fictitional company, you guessed it, Contoso, and during that time he built low-code no-code

[12:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=774s) **Presenter:** automations, things like automated data flows. And when his contract ended, his intra-ID account

[13:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=780s) **Presenter:** was properly disabled, which means he could no longer run and edit those flows with his vendor

[13:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=786s) **Presenter:** identity. So far so good, right? But before his account was disabled, John made some

[13:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=793s) **Presenter:** changes. He added two additional identities to the flow. The first one was

[13:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=799s) **Presenter:** from his company, Contoso LLC. So even after offboarding, someone from Contoso,

[13:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=805s) **Presenter:** or even John himself with his Contoso credentials, could still get in

[13:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=812s) **Presenter:** and modify and run that flow.

[13:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=816s) **Presenter:** And this is something we see with vendors a lot.

[13:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=819s) **Presenter:** And honestly, sometimes I wonder if it's encouraged

[13:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=822s) **Presenter:** or even required as a way for them

[13:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=824s) **Presenter:** to retain access to the assets that they built.

[13:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=829s) **Presenter:** The second identity John added

[13:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=831s) **Presenter:** was his personal email address.

[13:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=834s) **Presenter:** And that one was granted viewer access.

[13:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=836s) **Presenter:** And so while he couldn't make any changes,

[13:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=839s) **Presenter:** he could still run and collect the data from the flow.

[14:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=843s) **Presenter:** And there's really no business justification for this.

[14:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=847s) **Presenter:** And it's not just vendors either.

[14:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=850s) **Presenter:** This is a pattern we see with full-time employees.

[14:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=854s) **Presenter:** But it's way more common with vendors.

[14:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=857s) **Presenter:** And so what's the takeaway?

[14:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=859s) **Presenter:** This is a clear case of unintended or potentially malicious access to sensitive data.

[14:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=867s) **Presenter:** It's not something that's exclusive to vendors, but it's a very common scenario with them.

[14:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=872s) **Presenter:** And the scary part, these types of hidden connections in apps and flows and co-pilots are really difficult to find unless you inspect every one of them.

[14:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=883s) **Presenter:** And so this story shows why governance and visibility into identity relationships is critical in low-code, no-code platforms.

[14:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=895s) **Presenter:** So just to recap, citizen developers are across the enterprise.

[15:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=900s) **Presenter:** They are building stuff.

[15:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=902s) **Presenter:** And in most cases, we as security professionals, we are just leaving them to it.

[15:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=907s) **Presenter:** That means that they need to make all of those choices.

[15:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=910s) **Presenter:** and when they need to choose between something

[15:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=913s) **Presenter:** that might feel like a security problem and productivity,

[15:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=917s) **Presenter:** we know what they're going to choose.

[15:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=919s) **Presenter:** They're going to choose to move the business forward.

[15:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=921s) **Presenter:** So right now we are just leaving this app for grabs,

[15:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=923s) **Presenter:** and of course we know what that means.

[15:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=927s) **Presenter:** And so hopefully now,

[15:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=930s) **Presenter:** so we've covered why there are so many apps,

[15:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=933s) **Presenter:** and we've covered what happens when we leave them alone.

[15:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=936s) **Presenter:** Data goes out of the organization.

[15:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=939s) **Presenter:** So now we're going to start to figure out together how do you take control of this?

[15:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=945s) **Presenter:** How do you build a program that actually scales to this level?

[15:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=949s) **Presenter:** And we're going to start by sharing what didn't work.

[15:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=952s) **Presenter:** And I think this is really important because all of our intuitions, they fail on this space.

[15:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=959s) **Presenter:** Because they just don't work when you 10x, 100x, 1000x the problem.

[16:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=965s) **Presenter:** It just doesn't work.

[16:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=966s) **Presenter:** So let's see.

[16:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=969s) **Presenter:** The first place where we started was with best practice.

[16:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=974s) **Presenter:** That's where we start.

[16:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=975s) **Presenter:** You're like, okay, this is an AppSec program.

[16:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=978s) **Presenter:** Let's look at the best practice for AppSec.

[16:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=980s) **Presenter:** Let's apply them.

[16:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=981s) **Presenter:** Let's see what happens.

[16:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=982s) **Presenter:** Okay, let's try that.

[16:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=983s) **Presenter:** So here are three best practices.

[16:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=985s) **Presenter:** One, instead of focusing on the two million apps,

[16:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=989s) **Presenter:** let's find the hundred apps that matter.

[16:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=992s) **Presenter:** Makes a lot of sense.

[16:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=995s) **Presenter:** Second, let's get developer buy-in.

### Automating Fixes & Gaining Buy‑In

[16:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=997s) **Presenter:** Let's educate developers.

[16:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=999s) **Presenter:** Educate the developers on those choices.

[16:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1001s) **Presenter:** Make sure they make better choices.

[16:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1003s) **Presenter:** Sounds good.

[16:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1004s) **Presenter:** And the last thing, let's do a secure development lifecycle.

[16:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1008s) **Presenter:** Let's make sure we test things as soon as possible.

[16:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1011s) **Presenter:** Let's find problems at the design phase, the threat model.

[16:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1015s) **Presenter:** There are a bunch of things that we know to do,

[16:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1018s) **Presenter:** how to build secure applications.

[16:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1019s) **Presenter:** Let's try to apply this to citizen development.

[17:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1023s) **Presenter:** Okay, so the first thing, focusing on crown jewels.

[17:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1026s) **Presenter:** How many crown jewels do you think we'll find out of those 2 million assets?

[17:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1032s) **Presenter:** Okay, so we talked about 10 million credentials.

[17:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1037s) **Presenter:** Here's some statistics about those credentials.

[17:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1041s) **Presenter:** More than a million credentials going out to Office, to SharePoint, to Outlook.

[17:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1046s) **Presenter:** More than 100,000 credentials going out to SQL in Azure, to Excel, to Entry ID, to OneDrive, to Azure DevOps.

[17:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1056s) **Presenter:** See my point?

[17:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1057s) **Presenter:** You cannot find 100 that matter.

[17:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1060s) **Presenter:** These are all crown jewels.

[17:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1061s) **Presenter:** The problem with citizen development,

[17:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1064s) **Presenter:** or the best thing about citizen development,

[17:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1066s) **Presenter:** is that it's built on top of your business applications.

[17:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1068s) **Presenter:** It's built on top of your crown jewels.

[17:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1071s) **Presenter:** So by definition, you're in a problem there.

[17:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1073s) **Presenter:** Every one of these apps is important.

[17:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1075s) **Presenter:** It's tied directly into where you hold your most sensitive data.

[17:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1078s) **Presenter:** So that's out the window.

[18:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1080s) **Presenter:** Let's try another thing.

[18:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1081s) **Presenter:** Let's try to get developer buying.

[18:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1083s) **Presenter:** Let's try to educate the citizen developer

[18:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1086s) **Presenter:** to help them understand how to make better security conscious choices.

[18:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1092s) **Presenter:** Okay, now imagine trying to...

[18:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1095s) **Presenter:** So, okay, we know that getting developer buying is difficult.

[18:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1099s) **Presenter:** Like how many of us have had a conversation with a developer about,

[18:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1104s) **Presenter:** for example, how do you store social security numbers

[18:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1106s) **Presenter:** in a way that's compliant?

[18:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1109s) **Presenter:** Anyone?

[18:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1110s) **Presenter:** Not an easy conversation, right?

[18:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1112s) **Presenter:** Now imagine having that conversation with somebody from finance.

[18:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1116s) **Presenter:** from sales. Good luck with that. That doesn't make sense. It doesn't make sense because it

[18:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1123s) **Presenter:** doesn't make sense for us to ask them to know all of that. They are not security experts. They

[18:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1128s) **Presenter:** should not be security experts. They should run the business forward. We need to help them.

[18:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1133s) **Presenter:** So that's also out the window. We are not going to educate everybody in the enterprise about

[18:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1139s) **Presenter:** security conscious choices. We need to make their lives easier.

[19:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1147s) **Presenter:** All right. So Michael looked at the first two and why those didn't work. Let's look

[19:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1154s) **Presenter:** at SDL. So just some background first. Microsoft introduced SDL over 20 years ago and it's

[19:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1162s) **Presenter:** been the foundation for how we look at creating secure software. And even before that, Bill

[19:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1170s) **Presenter:** Gates in the trustworthy computing memo in 2002 laid the foundation for how we think

[19:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1176s) **Presenter:** building security in all of our products.

[19:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1179s) **Presenter:** And while Zero Trust is a newer addition to the model,

[19:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1183s) **Presenter:** today we're here to talk about how SDL applies

[19:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1186s) **Presenter:** or doesn't apply to low-code, no-code.

[19:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1190s) **Presenter:** So how well does SDL guidance fit?

[19:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1193s) **Presenter:** And we're not just talking about power platform here.

[19:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1196s) **Presenter:** This question applies across the board

[19:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1198s) **Presenter:** to all low-code, no-code platforms

[20:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1200s) **Presenter:** where business users are building workflows and automations.

[20:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1204s) **Presenter:** So let me show you what we found

[20:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1206s) **Presenter:** we looked at this internally. A huge chunk, 71% of SDL guidance, just doesn't apply.

[20:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1216s) **Presenter:** About 25% is in a gray area, not impossible, but tough to enforce and validate. And only 2%

### Results, Lessons, and Future Directions — Part 1

[20:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1225s) **Presenter:** is clearly applicable, mostly around things like power pages. Why is this? Because low-code,

[20:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1233s) **Presenter:** no-code platforms abstract away a lot of the complexity and most of SDL was

[20:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1239s) **Presenter:** written assuming things like digital studio, source code, compiled binaries and

[20:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1246s) **Presenter:** traditional pipelines and low code no-code tools just don't operate that

[20:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1250s) **Presenter:** way. Another challenge is tooling. Most SDL aligned security tools, things like

[20:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1258s) **Presenter:** codeQL. They all assume you're working with source code or build artifacts. And

[21:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1265s) **Presenter:** low code, no code, there's often no code file and there's nothing to compile. So

[21:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1271s) **Presenter:** when those, so these tools can't see what's going on and they can't help us

[21:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1276s) **Presenter:** catch things like insecure connections or poor input validation. These flows are

[21:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1282s) **Presenter:** are powerful and their power is hidden behind abstraction. Next is SDL content is written for

[21:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1293s) **Presenter:** engineers, not for business users. It's got lots of great technical information, but to a citizen

[21:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1301s) **Presenter:** developer, it's just technical noise. Let's say someone builds a power app and they're connecting

[21:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1309s) **Presenter:** to a data source using an external URL? Is the back-end secure? Is it using HTTPS?

[21:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1319s) **Presenter:** Is the certificate even valid? These are probably not questions they're asking

[22:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1324s) **Presenter:** themselves or even know to look for. And let's look at lifecycle. In Pro Code SDLC,

[22:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1334s) **Presenter:** see we've got clear division of labor. Business envisions, engineering builds,

[22:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1340s) **Presenter:** QA tests, ops deploys, manages, and monitors. This structure helps us build

[22:28](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1348s) **Presenter:** security into each phase of the process and there's accountability at every

[22:34](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1354s) **Presenter:** handoff. Now let's contrast that to low code, no code. It's often just the

[22:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1361s) **Presenter:** business user doing everything. They're envisioning, they're creating, and they're

[22:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1365s) **Presenter:** publishing. And the rhythm's more like envision, create, publish, repeat. And that

[22:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1373s) **Presenter:** publish button may move sensitive data into production without a single

[22:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1379s) **Presenter:** security check. There's no SDLC scaffolding, which means there's no hooks

[23:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1384s) **Presenter:** for security reviews or testing. So to review how well does SDL guidance fit? It

[23:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1393s) **Presenter:** was written for code and low code no code hides that. Our security tools don't

[23:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1398s) **Presenter:** speak low code no code and the content isn't accessible to business users and

[23:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1405s) **Presenter:** while we do have CI some CI CD tools like ALM pipelines and

[23:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1411s) **Presenter:** than power pages, adoption is inconsistent.

[23:34](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1414s) **Presenter:** And so to quote Michael from his Black Hat talk,

[23:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1417s) **Presenter:** sure, let business users build their own.

[23:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1420s) **Presenter:** What could go wrong?

[23:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1423s) **Presenter:** And that's the reality that we're living in,

[23:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1425s) **Presenter:** and it's a challenging situation.

[23:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1428s) **Presenter:** So at this point, we tried to go through best practice.

[23:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1432s) **Presenter:** We miserably failed.

[23:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1434s) **Presenter:** So now we're stuck.

[23:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1436s) **Presenter:** And the question is, can we actually make progress?

[23:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1439s) **Presenter:** And this is a very real scenario.

[24:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1444s) **Presenter:** Like, imagine in one of your orgs, you look at how many apps you have,

[24:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1450s) **Presenter:** and maybe you don't have 2 million.

[24:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1451s) **Presenter:** Maybe you have just half a million.

[24:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1454s) **Presenter:** Like, that's the scale you're going to see.

[24:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1457s) **Presenter:** And then you try to apply the best practice.

[24:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1460s) **Presenter:** What do you do?

[24:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1461s) **Presenter:** What's the next step?

[24:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1462s) **Presenter:** Like, you cannot go out and ask for, I don't know,

[24:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1466s) **Presenter:** an army of 100 AppSec engineers to do something about it, right?

[24:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1470s) **Presenter:** So here's the crucial insight. Here's how we made it. Here's the first crack that we were able to do to make it a problem.

[24:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1479s) **Presenter:** Building has never been easier, right? We just saw that. That's what's behind this entire thing.

[24:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1486s) **Presenter:** But what is vulnerability fixing? Well, it's building. Fixing a vulnerability is just changing an application.

[24:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1495s) **Presenter:** So if building applications is easy, wouldn't fixing vulnerabilities,

[25:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1501s) **Presenter:** shouldn't it be easy as well?

[25:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1503s) **Presenter:** Shouldn't there be any sort of equivalence?

[25:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1506s) **Presenter:** And so this was the original insight.

[25:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1508s) **Presenter:** And when we tried to figure that out, we found these cases,

[25:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1512s) **Presenter:** these cases where you have enough context, where you have enough confidence,

[25:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1517s) **Presenter:** where you can automatically fix problems.

[25:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1519s) **Presenter:** Automatically, by automatically, I mean no human in the loop.

[25:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1525s) **Presenter:** at if this is like a triage in this problem. No, I'm talking about big chunks

[25:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1530s) **Presenter:** of problem that you can just make go away. And you are seeing on screen the

[25:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1536s) **Presenter:** first things that we found to work. I'll give you an example. You have an

[25:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1540s) **Presenter:** automation. That automation logs every piece of data that goes through it. That

[25:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1544s) **Presenter:** automation includes, that data includes sensitive data that now gets written to

[25:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1548s) **Presenter:** logs. You turn off those logs for specifically the sensitive data that

[25:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1552s) **Presenter:** that goes out, that doesn't impact the automation.

[25:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1555s) **Presenter:** No business impact, but you reduce risk.

[25:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1558s) **Presenter:** This allowed us to automatically fix a huge chunk

[26:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1562s) **Presenter:** of the problems that we were able to find.

[26:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1565s) **Presenter:** And so what does that do?

[26:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1568s) **Presenter:** So you find these ways to automatically fix problems,

[26:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1572s) **Presenter:** that gives you early success.

[26:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1574s) **Presenter:** Again, you don't need to ask for head counts,

[26:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1577s) **Presenter:** you don't need to go out to management and ask for a lot,

[26:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1579s) **Presenter:** just the ability to remediate stuff. And you can fix from our experience across

[26:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1585s) **Presenter:** working with different large organizations, you can fix something like

[26:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1589s) **Presenter:** 25% of the problems automatically like this. So you have this early success. What

[26:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1596s) **Presenter:** does that give you? That gives you buying from your management because now you can

[26:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1599s) **Presenter:** go to management and say, hey, I have a plan, like I can actually make this work.

[26:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1604s) **Presenter:** Give me some head counts, let's work on this. And of course if you have

[26:47](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1607s) **Presenter:** have management buying, then you can take over the world, right?

[26:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1610s) **Presenter:** Well, no, you don't have to.

[26:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1612s) **Presenter:** You can scale the program.

[26:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1614s) **Presenter:** That's great.

[26:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1615s) **Presenter:** That's what we're after.

[26:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1617s) **Presenter:** And so right now, we come to the most important part of the talk, which is how we made it

[27:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1622s) **Presenter:** work.

[27:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1624s) **Presenter:** And so this is, I'm going to let Ryan go take us to that.

[27:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1629s) **Presenter:** All right.

[27:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1630s) **Presenter:** Let's walk through how we actually made this work from the initial vision to implementation.

[27:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1634s) **Presenter:** I'll show you how we built our remediation program with limited resources and got real results.

[27:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1642s) **Presenter:** Our goal was clear.

### Results, Lessons, and Future Directions — Part 2

[27:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1644s) **Presenter:** Remediate all vulnerabilities.

[27:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1646s) **Presenter:** We wanted to get the green and we wanted to stay green and we wanted the benefits of de facto SDL.

[27:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1655s) **Presenter:** We had a very small team,

[27:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1656s) **Presenter:** just two to three people, and so we knew we had to make it count. And with those two to three headcounts,

[27:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1664s) **Presenter:** to deliver something meaningful in a short amount of time. We weren't going to have a big engineering

[27:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1669s) **Presenter:** cycle. We weren't going to have a lot of custom development. And so we knew we had to work smarter,

[27:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1674s) **Presenter:** not harder. With a six-month timeline, we knew we had to be creative. By reusing proven automation,

[28:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1684s) **Presenter:** leaning on existing tools, and prioritizing self-service, we crossed the finish line in a

[28:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1690s) **Presenter:** little bit over four months. I'll be honest, it wasn't magic. It was focus, fast iteration,

[28:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1697s) **Presenter:** and there was a couple late nights here and there.

[28:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1701s) **Presenter:** We started with the concept of an MVP, and we knew the MVP had to be self-service. And we knew

[28:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1709s) **Presenter:** that if we wanted this to scale, the solution couldn't rely on humans in the loop. And wherever

[28:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1716s) **Presenter:** Wherever possible, we were thinking about the future.

[28:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1719s) **Presenter:** What could we build and reuse?

[28:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1724s) **Presenter:** From the beginning, the experience centered around the citizen developer.

[28:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1730s) **Presenter:** Every step-by-step instruction had to be dead simple.

[28:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1735s) **Presenter:** Screenshots were annotated with visual cues to reduce ambiguity and ensure self-service

[29:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1741s) **Presenter:** success.

[29:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1742s) **Presenter:** And just note how different this thing is from the SDL, like from the pure, like technical

[29:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1751s) **Presenter:** SDL.

[29:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1752s) **Presenter:** No, no, these are screenshots with like, here's the thing you need to click.

[29:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1757s) **Presenter:** And so to recap, remediate vulnerabilities, small team, fast timeline, minimum viable

[29:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1766s) **Presenter:** product, self-service, and auto-fix where possible.

[29:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1771s) **Presenter:** we made those goals real. First question, can we auto remediate? We knew that if we

[29:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1780s) **Presenter:** could use automation to safely and effectively resolve the violation that

[29:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1786s) **Presenter:** was always going to be our first and best approach. So for each violation we

[29:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1792s) **Presenter:** had to understand did we have the right API's, did we have the right connectors

[29:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1798s) **Presenter:** to automatically fix the issue.

[30:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1802s) **Presenter:** If we did have enough context, we didn't wait.

[30:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1805s) **Presenter:** We would trigger the automation, reduce the risk without disrupting anyone.

[30:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1811s) **Presenter:** But sometimes we didn't have enough context.

[30:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1814s) **Presenter:** And in those cases, the user needed to fix the issue.

[30:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1817s) **Presenter:** And so we designed that process to be as painless as possible.

[30:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1822s) **Presenter:** For everything else that we couldn't auto-remediate,

[30:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1825s) **Presenter:** we gave the users a 30-day to fix window and that was the window that we found

[30:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1832s) **Presenter:** that balanced urgency and practicality.

[30:38](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1838s) **Presenter:** That 30-day window, it started when we notified the user and so

[30:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1844s) **Presenter:** whether it was a new violation or an existing one, that clock started ticking

[30:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1849s) **Presenter:** when the user got the email. We called everything that we created before

[30:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1858s) **Presenter:** January 1st brownfield and that was our pre-existing risk and we focused on

[31:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1863s) **Presenter:** burning that down first. Anything created after January 1st we considered that

[31:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1870s) **Presenter:** greenfield or net new risk. Our initial automation wasn't focused on new issues

[31:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1876s) **Presenter:** that were created, at least not yet. The other thing I'll say about Greenfield is

[31:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1882s) **Presenter:** that when you detect it, you can be reasonably assured that it's not being

[31:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1886s) **Presenter:** used in production yet, and so you have an opportunity to automate it in a more

[31:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1890s) **Presenter:** pervasive way. Here's a simplified campaign process. Day zero, email goes out.

[31:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1899s) **Presenter:** day 14, reminder, day 23, final notice, day 30, if the issue isn't fixed, we deleted

[31:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1909s) **Presenter:** it. Along the way we had to deal with support issues, false positives, and

[31:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1916s) **Presenter:** exceptions. All of our remediation instructions lived in a SharePoint list.

[32:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1923s) **Presenter:** list. This gave us a central location for all of our documentation. Here's a view of

[32:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1931s) **Presenter:** how we updated the instructions. When we learned something new, we updated the docs and made

[32:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1937s) **Presenter:** it better. This is the first email that users received. We partnered with a professional

[32:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1945s) **Presenter:** editor to make sure that the wording was crisp, clear, and direct. This was the

[32:34](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1954s) **Presenter:** final warning email. Clear subject, red banner, no ambiguity. You knew what action

[32:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1962s) **Presenter:** you had to take. And this is the dashboard that users would click into to

[32:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1968s) **Presenter:** to view their violations.

[32:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1971s) **Presenter:** And so the first one here is a connection to on-prem.

[32:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1975s) **Presenter:** And that's not necessarily a bad thing

[32:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1977s) **Presenter:** as not everything has moved to the cloud.

[33:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1980s) **Presenter:** So this one might need an exception.

[33:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1982s) **Presenter:** The other two are more concerning though.

[33:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1984s) **Presenter:** One of them used a shareable authentication method,

[33:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1988s) **Presenter:** meaning it's not using intra-ID.

[33:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1990s) **Presenter:** And the other was tenant-wide accessible.

[33:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1994s) **Presenter:** And so depending on how that asset is built,

[33:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=1996s) **Presenter:** it could open up risk. These are the types of issues that we're surfacing.

[33:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2004s) **Presenter:** Clicking on one of the violation gives you full details, exact steps to fix, all

[33:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2010s) **Presenter:** pulled from our SharePoint list. No guesswork required. And this is where the

[33:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2016s) **Presenter:** user experience again comes together because these instructions were

[33:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2022s) **Presenter:** were written for the citizen developer.

[33:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2024s) **Presenter:** Plain language, annotated screenshots, zero ambiguity.

[33:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2029s) **Presenter:** This is the level of clarity

[33:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2031s) **Presenter:** that made self-service realistic and scalable.

[33:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2038s) **Presenter:** Behind the scenes, we used playbooks.

[33:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2039s) **Presenter:** This was our logic that applied

[34:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2042s) **Presenter:** to both Greenfield and Brownfield.

[34:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2045s) **Presenter:** Once we were in stay green mode,

[34:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2048s) **Presenter:** when a new violation was discovered,

[34:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2052s) **Presenter:** trigger automation to resolve the issue, or we would send the email out to the user for

[34:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2058s) **Presenter:** them to fix, starting that 30-day window.

### Results, Lessons, and Future Directions — Part 3

[34:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2063s) **Presenter:** And the results speak for themselves.

[34:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2066s) **Presenter:** We scaled up, we cleaned up two major environments, and we proved the approach was repeatable

[34:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2072s) **Presenter:** and effective.

[34:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2075s) **Presenter:** So again, with over 2 million assets across apps and agents, we needed to make sure that

[34:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2082s) **Presenter:** the process could scale.

[34:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2083s) **Presenter:** And so this graph shows our progress over six months.

[34:47](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2087s) **Presenter:** And you can see where we started to clear the backlog and then start to address net

[34:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2094s) **Presenter:** new risk as it came in.

[34:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2096s) **Presenter:** And so when we got to June, the only open violations were ones that had come in within

[35:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2103s) **Presenter:** 30 days. And that was a really important milestone for us because it meant that we were keeping

[35:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2108s) **Presenter:** pace with net new violations in real time. Now, leadership would ask, why can't you get

[35:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2116s) **Presenter:** to 100%? And it was because of that 30-day to fix window. And so again, you can see by

[35:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2122s) **Presenter:** May we had cleared, you know, pretty much all of the legacy risk and then everything

[35:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2126s) **Presenter:** everything in June was within that 30-day SLA window.

[35:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2133s) **Presenter:** So yeah, this was a huge win for us.

[35:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2136s) **Presenter:** We got to green, we stayed green, and

[35:38](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2138s) **Presenter:** we did it with a small team and minimal friction.

[35:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2141s) **Presenter:** We proved it's possible, and we were really proud of the outcome.

[35:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2146s) **Presenter:** And I wanna take a moment to say just how incredible I think it is for

[35:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2150s) **Presenter:** Microsoft to share this story out there.

[35:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2152s) **Presenter:** Like, everybody's struggling with setting up these programs,

[35:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2157s) **Presenter:** and the kind of success that the team has had is incredible.

[35:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2159s) **Presenter:** So thank you for being willing to share it.

[36:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2162s) **Presenter:** Yeah.

[36:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2163s) **Presenter:** And let's talk about takeaways.

[36:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2166s) **Presenter:** What did we really learn from all this?

[36:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2169s) **Presenter:** Not just what we did, but what we wanted to build on and carry forward.

[36:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2175s) **Presenter:** One big takeaway, leverage industry standard security risk categorizations.

[36:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2180s) **Presenter:** That structure gave us a shared language, which is especially useful when you're aligning priorities across teams.

[36:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2192s) **Presenter:** Another anchor is the OWASP top 10 for low-code, no-code.

[36:38](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2198s) **Presenter:** This gave us a clear lens to view risk through.

[36:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2202s) **Presenter:** So things like identity issues, secret management, platform misuse, you name it,

[36:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2208s) **Presenter:** we mapped them to one of these categories.

[36:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2212s) **Presenter:** And this gave us the ability to prioritize our campaigns.

[36:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2219s) **Presenter:** And this one's gaining traction fast.

[37:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2222s) **Presenter:** This is the OWASP top 10 for large language models.

[37:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2228s) **Presenter:** And as co-pilots and AI features become more sophisticated,

[37:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2232s) **Presenter:** this one's going to matter more and more.

[37:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2234s) **Presenter:** And we're starting to see overlap already

[37:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2238s) **Presenter:** two low code no code tools with embedded copilots for example another lesson

[37:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2249s) **Presenter:** prioritize what you want to fix first I know it sounds simple but with you when

[37:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2255s) **Presenter:** you've got dozens of risks flying at you having a framework help keeps you

[37:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2260s) **Presenter:** grounded and so we ended up launching six campaigns based on the OWASP

[37:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2268s) **Presenter:** things like guest access, hard-coded secrets, AI issues. Originally we thought

[37:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2276s) **Presenter:** we'd go one by one, but life the real life is messier than that. And then every

[38:01](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2281s) **Presenter:** time we were about to kick off a campaign, leadership would ask, can you

[38:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2285s) **Presenter:** add this one too? And so we adjusted and our campaigns usually ran

[38:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2292s) **Presenter:** across two or three of these categories. And here's a snapshot from our dashboard.

[38:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2298s) **Presenter:** with some fields redacted. I'll draw your attention to the lower right hand side

[38:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2302s) **Presenter:** as it shows the percentage of violations that we remediated in each category. The

[38:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2309s) **Presenter:** heat map and other visualizations helped us view our progress over time and that

[38:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2315s) **Presenter:** was huge for keeping leadership informed and giving us momentum to keep pushing

[38:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2320s) **Presenter:** forward. And finally, we needed a shared responsibility model. In our

[38:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2329s) **Presenter:** documentation, Microsoft has published shared responsibility models

[38:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2333s) **Presenter:** for things like Azure and AI. And so that pattern was already there and that was

[38:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2339s) **Presenter:** good. And Michael had laid the foundation for a low-code, no-code shared

[39:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2344s) **Presenter:** shared responsibility in some of his talks at RSA and Black Hat. We realized we needed to go

[39:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2351s) **Presenter:** beyond just mentioning this at a high level internally. It had to be built in

[39:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2357s) **Presenter:** how we worked, how we messaged, and how we empowered teams to do their part.

[39:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2365s) **Presenter:** So this slide shows a serverless

[39:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2371s) **Presenter:** responsibility model and a low-code, no-code responsibility model.

[39:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2376s) **Presenter:** And so with serverless, your platform provider, whether it's Azure or AWS,

[39:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2382s) **Presenter:** is responsible for the platform components.

[39:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2385s) **Presenter:** And those are all the building blocks that you can build from.

[39:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2388s) **Presenter:** And your responsibility starts with your application or the code.

[39:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2393s) **Presenter:** And then you're responsible for access, business logic, and all the data.

[39:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2399s) **Presenter:** in the environment.

[40:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2402s) **Presenter:** And it's the same with low-code, no-code,

[40:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2405s) **Presenter:** except that you're not writing the code.

[40:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2408s) **Presenter:** The platform is abstracting that for you.

[40:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2412s) **Presenter:** The point here is simple.

[40:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2415s) **Presenter:** We have to own our side of the shared responsibility model

[40:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2418s) **Presenter:** in low-code, no-code, just like we do in serverless.

[40:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2424s) **Presenter:** This chart reflects how we thought about

[40:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2425s) **Presenter:** shared responsibility in the low-code, no-code space.

[40:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2429s) **Presenter:** We started with domains like access control, business logic, data management, and we expanded

[40:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2435s) **Presenter:** it to add governance, platform responsibility, and other adjacent platforms. Our goal was a

[40:43](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2443s) **Presenter:** clean list of actual responsibilities and who owns what.

[40:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2451s) **Presenter:** And finally, the last of our priorities was to deliver de facto SDL, even if we

[40:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2459s) **Presenter:** skipped a few formalities. Remember the gap analysis slide from before? We didn't

[41:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2466s) **Presenter:** get formal threat models, but we got SDL enforcement where it matters. We hit core

[41:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2471s) **Presenter:** technical requirements, we integrated enforcement into our tooling and process,

### Results, Lessons, and Future Directions — Part 4

[41:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2476s) **Presenter:** and so in practice we close the gap. To wrap things up, here's what we learned.

[41:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2484s) **Presenter:** Start with industry frameworks. Don't reinvent risk categories. Prioritize

[41:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2490s) **Presenter:** ruthlessly. You can't fix everything at once. Use the shared responsibility model

[41:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2496s) **Presenter:** to clarify ownership and even if you're working outside of traditional SDL

[41:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2501s) **Presenter:** processes you can still enforce smartly and effectively this project showed us

[41:47](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2507s) **Presenter:** that you didn't need a huge team or complex infrastructure to make real

[41:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2511s) **Presenter:** progress and with focus and clarity and the right amount of automation and human

[41:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2516s) **Presenter:** touch you too can scale security even in the fast-moving world of low code no

[42:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2523s) **Presenter:** code. So as we wrap things up, this was a lot, but we want to offer this way to

[42:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2535s) **Presenter:** apply what you learned here today to your organization. And here's our

[42:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2539s) **Presenter:** offer. And by the way, you see the link on the right bottom side. This will

[42:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2543s) **Presenter:** get you to our website with like all of the everything you've seen in the deck.

[42:28](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2548s) **Presenter:** So as you can imagine, there's a lot of information we couldn't share in a

[42:34](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2554s) **Presenter:** The first thing you should do, like the first thing you should do next week is to figure out how is citizen development used in your organization.

[42:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2562s) **Presenter:** Just figure out the platforms.

[42:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2564s) **Presenter:** Figure out which platforms are being used.

[42:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2566s) **Presenter:** Look for those platforms you already use.

[42:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2568s) **Presenter:** Your typical suspects would be your MSR-65, your Salesforce, your ServiceNow.

[42:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2573s) **Presenter:** This is where we typically find it go out.

[42:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2576s) **Presenter:** And focus on AI usage.

[42:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2578s) **Presenter:** focus on platforms that allow people to build agents. This is both happening as

[43:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2585s) **Presenter:** the fastest and building the most advanced application. So this is what

[43:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2590s) **Presenter:** matters. In the first three months, you should try to, you should first

[43:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2595s) **Presenter:** create and get to a point where you have an inventory of not the platforms that

[43:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2601s) **Presenter:** you're using but what have people actually built with them. How many agents

[43:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2605s) **Presenter:** you've got, how many applications you've got, how many credentials, how many of them are

[43:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2609s) **Presenter:** touching business sensitive data, how many of them are being used by your vendors.

[43:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2612s) **Presenter:** These are questions that you should be able to answer.

[43:34](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2614s) **Presenter:** You should also start to do the policy work.

[43:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2617s) **Presenter:** What are you comfortable with?

[43:39](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2619s) **Presenter:** What are the approved use cases that you have for citizen development?

[43:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2625s) **Presenter:** Do you have a security standard for citizen development?

[43:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2629s) **Presenter:** This should be your next topic.

[43:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2631s) **Presenter:** And of course, use existing controls.

[43:55](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2635s) **Presenter:** OWASP LLM, OWASP Low Code, No Code, Top 10.

[43:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2638s) **Presenter:** We're actually working on the OWASP Low Code, No Code, Top 10

[44:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2640s) **Presenter:** and a new version of it this year.

[44:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2643s) **Presenter:** If you're interested, reach out to us.

[44:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2644s) **Presenter:** We're looking out for more folks to join the group.

[44:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2649s) **Presenter:** And within the next six months,

[44:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2651s) **Presenter:** you should think about how you take that policy,

[44:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2654s) **Presenter:** how you take that understanding of what you've got

[44:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2656s) **Presenter:** and how you codify it in technical controls

[44:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2659s) **Presenter:** that auto-fix things.

[44:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2661s) **Presenter:** One big point here is that you have to automate things.

[44:29](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2669s) **Presenter:** You cannot do things manually with this scale.

[44:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2671s) **Presenter:** And the scale is only going to get far bigger.

[44:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2675s) **Presenter:** So find the technical control that will allow you to codify your policy

[44:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2681s) **Presenter:** and enforce it across your enterprise.

[44:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2684s) **Presenter:** With that, there's more details in the URL.

[44:47](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2687s) **Presenter:** Thank you very much.

[44:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2689s) **Presenter:** Thank you.

[44:53](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2693s) **Presenter:** And we do have some time for Q&A, so there are two mics here.

[45:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2700s) **Presenter:** Hey, so I think you got me.

[45:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2704s) **Presenter:** I didn't see, or maybe I missed, how are you doing vulnerability detection?

[45:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2709s) **Presenter:** So I appreciate you know that you've got automation, and you know the crown jewels are there,

[45:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2716s) **Presenter:** and now you have remediation, but there's this big hole in the middle about, like,

[45:21](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2721s) **Presenter:** Which of my apps have bad stuff going on?

[45:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2723s) **Presenter:** We use Zenity.

[45:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2725s) **Presenter:** So Zenity is a third-party tool to Microsoft

[45:28](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2728s) **Presenter:** and is effectively the application that we use

[45:32](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2732s) **Presenter:** to detect vulnerabilities in our state.

[45:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2735s) **Presenter:** Ah, you couldn't give the product code.

[45:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2736s) **Presenter:** Yeah, we didn't want this to be a product showcase.

[45:41](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2741s) **Presenter:** But yeah, it provides inventory,

[45:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2742s) **Presenter:** provides all of the violations that are detected

[45:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2746s) **Presenter:** in our inventory,

[45:47](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2747s) **Presenter:** and then we build our automation from there.

[45:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2751s) **Presenter:** Thanks.

[45:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2751s) **Presenter:** So second question, I didn't understand, did you end up not building an SDLC policy?

[45:57](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2757s) **Presenter:** So I appreciate you're fixing the stuff after the fact, but how do, I mean, in terms of stopping them at the front door, giving the guidance to those business people who, right, they're not going to read my technical engineering-facing SDLC, but did you develop anything for them, or where did that land?

[46:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2773s) **Presenter:** Yeah, we do have an internal site called Builder's Hub, and it provides documentation and best practices written in language that citizen developers understand on best practices that they should be following.

[46:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2790s) **Presenter:** But to your point on after the fact, you don't have SDLC in the local space, so somebody just goes out, they drag a bunch of boxes, they talk to AI, it changes the production.

[46:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2800s) **Presenter:** so you have to do like retrospective

[46:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2804s) **Presenter:** retrospective

[46:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2804s) **Presenter:** application of things but when you go to

[46:46](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2806s) **Presenter:** green fit so an application that was just created

[46:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2809s) **Presenter:** you can spot it very

[46:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2810s) **Presenter:** quickly after and fix it

[46:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2812s) **Presenter:** so it doesn't have to be like a week

[46:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2814s) **Presenter:** later it can be like a few months later

[46:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2816s) **Presenter:** cool

[46:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2818s) **Presenter:** are you sharing the

[47:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2820s) **Presenter:** the STO you developed or is that

[47:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2822s) **Presenter:** proprietary

[47:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2824s) **Presenter:** sorry

[47:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2825s) **Presenter:** the what did you call it

[47:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2830s) **Presenter:** policies for business developers?

[47:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2835s) **Presenter:** We're not sharing them right now,

[47:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2837s) **Presenter:** although Michael and I were just talking about this

[47:19](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2839s) **Presenter:** before the session, that we may work on open sourcing

[47:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2842s) **Presenter:** a lot of the work that we've done around the policies,

[47:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2846s) **Presenter:** maybe even some of the automations

[47:28](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2848s) **Presenter:** and those types of things.

[47:30](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2850s) **Presenter:** I mean, at this point, as a security leader

[47:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2853s) **Presenter:** whose business is getting into low-code, no-code,

[47:36](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2856s) **Presenter:** I don't yet have a good appreciation for the risks,

[47:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2860s) **Presenter:** nor do I have a good appreciation for how to translate my developer focus,

[47:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2865s) **Presenter:** SDLC, into something that's like this business focus.

[47:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2868s) **Presenter:** And so that kind of guidance would be super important.

[47:49](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2869s) **Presenter:** So you should look at the OWASP Local No-Code Top 10.

[47:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2871s) **Presenter:** It's not just the Local No-Code Top 10.

[47:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2874s) **Presenter:** It's also just a community of folks like yourself

[47:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2876s) **Presenter:** that are looking into how do we build those programs,

[47:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2879s) **Presenter:** and we are sharing things amongst each other.

[48:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2880s) **Presenter:** I'm one of the project leaders for that project.

[48:03](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2883s) **Presenter:** So please join us.

[48:05](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2885s) **Presenter:** You can reach out to us afterwards.

[48:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2886s) **Presenter:** We're happy to have details out there in that link.

[48:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2890s) **Presenter:** 100% what he said.

[48:12](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2892s) **Presenter:** Those were the two things I was going to ask.

[48:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2895s) **Presenter:** Sorry.

### Results, Lessons, and Future Directions — Part 5

[48:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2895s) **Presenter:** No, great.

[48:17](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2897s) **Presenter:** So you said after the talk on that second thing,

[48:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2900s) **Presenter:** you can maybe provide us with a link to some information or something?

[48:24](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2904s) **Presenter:** So in this link, we are writing.

[48:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2907s) **Presenter:** This is not up yet.

[48:28](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2908s) **Presenter:** We're going to upload it right after this talk.

[48:31](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2911s) **Presenter:** This link, you're going to find the deck.

[48:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2913s) **Presenter:** You're going to find everything that we shared here.

[48:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2915s) **Presenter:** You can see that many of these are automations.

[48:37](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2917s) **Presenter:** These are standards.

[48:40](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2920s) **Presenter:** everything that we can share, we will share today

[48:42](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2922s) **Presenter:** on this link. We are also

[48:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2924s) **Presenter:** starting to work together on

[48:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2925s) **Presenter:** can we share more? I'm not sure

[48:48](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2928s) **Presenter:** how much more we will be able

[48:50](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2930s) **Presenter:** to share, but the

[48:51](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2931s) **Presenter:** OWASP group has

[48:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2934s) **Presenter:** folks like Microsoft and

[48:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2936s) **Presenter:** others that have been building those

[48:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2938s) **Presenter:** programs and are happy to share their insights,

[49:00](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2940s) **Presenter:** are happy to share their standards,

[49:02](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2942s) **Presenter:** share what worked, what didn't work.

[49:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2944s) **Presenter:** It's like a working group together.

[49:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2946s) **Presenter:** Great. Yeah, we're in the same boat.

[49:08](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2948s) **Presenter:** We actually have

[49:10](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2950s) **Presenter:** the first two bullet points pretty well. We have a team dedicated, but our teams don't have the

[49:15](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2955s) **Presenter:** expertise or the tooling yet to deal with it. It's a kind of a good problem. People come into security

[49:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2962s) **Presenter:** asking and we're like, oh, we'll get back to you. We'll work with you on it, but we don't

[49:27](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2967s) **Presenter:** have the existing. So reach out to us. We're happy to have the discussion and try and help.

[49:35](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2975s) **Presenter:** Okay, I wanted to ask, in the first part of the presentation, you mentioned about that

[49:45](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2985s) **Presenter:** you shouldn't rely on developer buying, and in the shared responsibility model, all the

[49:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2992s) **Presenter:** data management and business logic part was directly accountable for the developer.

[49:58](https://www.youtube.com/watch?v=ge9q6WIDzso&t=2998s) **Presenter:** So I wanted to know how the developer can make sure that they are handling the data securely, especially with all the connectors.

[50:13](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3013s) **Presenter:** And it's making the architecture very complex and not easy to see the data flow.

[50:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3022s) **Presenter:** So, yeah.

[50:23](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3023s) **Presenter:** Yeah, it's a great question.

[50:25](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3025s) **Presenter:** And you're right.

[50:26](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3026s) **Presenter:** it's not a simple process. I mean, when you do build an application, you do have to manage

[50:33](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3033s) **Presenter:** those, you know, the connections and the logic and those types of things. And so, again,

[50:38](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3038s) **Presenter:** I would go back to kind of continuing education, making sure that you're sending your citizen

[50:44](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3044s) **Presenter:** developers information on their responsibilities when you build an application. And so, we

[50:52](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3052s) **Presenter:** we publish all of that information internally

[50:54](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3054s) **Presenter:** into SharePoint sites

[50:56](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3056s) **Presenter:** and then, you know, continually reinforce that

[50:59](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3059s) **Presenter:** with messaging to our internal employees.

[51:04](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3064s) **Presenter:** And also you need to assume that, like,

[51:06](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3066s) **Presenter:** education will take you so far,

[51:07](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3067s) **Presenter:** but there's so much complexity there

[51:09](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3069s) **Presenter:** and so much accidental complexity.

[51:11](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3071s) **Presenter:** You need technical controls to find these places

[51:14](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3074s) **Presenter:** where the risk is just too high and you need to intervene.

[51:16](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3076s) **Presenter:** I think we're getting kicked out.

[51:18](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3078s) **Presenter:** So we're going to...

[51:20](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3080s) **Presenter:** Thank you very much.

[51:22](https://www.youtube.com/watch?v=ge9q6WIDzso&t=3082s) **Presenter:** to be available over them.
<!-- talk-enrichment:end -->
