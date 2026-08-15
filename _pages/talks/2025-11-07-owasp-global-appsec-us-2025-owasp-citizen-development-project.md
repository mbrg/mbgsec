---
title: "OWASP Citizen Development Project"
talk_date: 2025-11-07
conference: OWASP Global AppSec US 2025
presented_by: Kayla Underkoffler and Shauna Rathbun
permalink: /talks/2025-11-07-owasp-global-appsec-us-2025-owasp-citizen-development-project/
layout: talk
schedule_url: https://owaspglobalappsecusa2025.sched.com/event/29ImG/ultimate-build-power-itty-bitty-security-controls-owasps-new-top-10-for-citizen-developer-risk
schedule_title: "Ultimate Build Power, Itty Bitty Security Controls: OWASP's New Top 10 for Citizen Developer Risk"
abstract_status: source-lacks-abstract
abstract_status_checked_at: 2026-08-14
abstract_status_note: "The official Sched session page identifies the talk and presenters but exposes no session description."
recording_url: https://www.youtube.com/watch?v=1NA95XxW4_U
transcript_source_url: "https://www.youtube.com/watch?v=1NA95XxW4_U"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "46c1ecb9093a4ed264f678b28ec136e4f2ce62058f80d20eb13ca2ac8f680da3"
---
<!-- talk-enrichment:start -->
## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Introduction & Project Launch

[00:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=0s) **Presenter:** So thank you guys for being here with us today. Start my timer so I say even though we have help with the timer. I appreciate that. We're super excited to be here today presenting the new OWASP Top 10 Risks for Citizen Development. So this is not necessarily a completely new project as we'll talk about, but this is a new project.

[00:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=30s) **Presenter:** This is the launch of the refactored version. This has been a true labor of love over the past few months for this community and especially for Shauna and myself working on this. We have had a bunch of community input on the document. Ken Wang is in our audience today. He was one of the reviewers who we had a panel of reviewers who helped make sure everything was in line before we launched.

[00:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=58s) **Presenter:** So yeah, today is the day that we're announcing all the new changes. So I'm Kayla Underkoffler. I'm the director of AI Security and Policy Advocacy at Zenity. And I have Shauna with me here today.

[01:13](https://www.youtube.com/watch?v=1NA95XxW4_U&t=73s) **Presenter:** I'm Shauna Rathbun. I'm a platform security engineer with Zenity.

[01:17](https://www.youtube.com/watch?v=1NA95XxW4_U&t=77s) **Presenter:** Yes. And we're going to split the talk. So it'll be, I'll go through the first half of this and then Shauna's going to talk about some of the new components that we've added into this Top 10.

[01:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=89s) **Presenter:** So we're going to go through a background, talk about where this project originated from, how it changed over time, go over some key definitions.

[01:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=97s) **Presenter:** And of course, talk about the Top 10 and how everything has changed. So let's dig in.

[01:46](https://www.youtube.com/watch?v=1NA95XxW4_U&t=106s) **Presenter:** That way. Okay. So the origin story for the Citizen Development Top 10 actually comes from the Low Code, No Code Top 10.

[02:01](https://www.youtube.com/watch?v=1NA95XxW4_U&t=121s) **Presenter:** This project has been in existence now for over three years. And it was introduced to address the security gap of organizations having these new Low Code, No Code technologies available to the non-traditional developers and builders in their organization.

[02:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=144s) **Presenter:** So it was this whole new audience building with new platforms and technology with the same results as a professional development in-house, which is, you know, final production level application software and technology.

[02:41](https://www.youtube.com/watch?v=1NA95XxW4_U&t=161s) **Presenter:** So the original list was released to help security teams understand, first off, acknowledge that this is a building audience that you have in-house creating technology.

[02:54](https://www.youtube.com/watch?v=1NA95XxW4_U&t=174s) **Presenter:** Also understand what risks are introduced through this building. And then also critically, how to mitigate those risks.

[03:01](https://www.youtube.com/watch?v=1NA95XxW4_U&t=181s) **Presenter:** So, like I said, the list is three years old. And in today's day and age, three years old is basically a millennia. So we already knew that we needed to reassess the top 10 just in general.

### Origins & Evolution of the Citizen Development Top 10

[03:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=196s) **Presenter:** But on top of the three years, this past three years has been pretty formative in new technologies available to non-traditional developers, right?

[03:28](https://www.youtube.com/watch?v=1NA95XxW4_U&t=208s) **Presenter:** With the introduction of AI-assisted coding or vibe coding, which is now what, like the top word for the year?

[03:36](https://www.youtube.com/watch?v=1NA95XxW4_U&t=216s) **Presenter:** I don't know if anybody saw that, but vibe coding has officially been called the top word for this year. We didn't use it very much.

[03:43](https://www.youtube.com/watch?v=1NA95XxW4_U&t=223s) **Presenter:** So I'm sorry. The marketers in here will probably roll your eyes that we didn't use the term vibe coding.

[03:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=229s) **Presenter:** We went with AI-assisted coding to keep it more generic and, you know, plan for the future.

[03:56](https://www.youtube.com/watch?v=1NA95XxW4_U&t=236s) **Presenter:** But with the rise of AI-assisted coding, we recognized that citizen developers today have more than just low code, no code at their fingertips

[04:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=246s) **Presenter:** to create production level technology and software on the output.

[04:12](https://www.youtube.com/watch?v=1NA95XxW4_U&t=252s) **Presenter:** So we decided that we needed to reframe the whole project.

[04:17](https://www.youtube.com/watch?v=1NA95XxW4_U&t=257s) **Presenter:** And instead of focusing in the low code, no code technology, we were going to focus on the citizen developer

[04:23](https://www.youtube.com/watch?v=1NA95XxW4_U&t=263s) **Presenter:** who has various tools at their fingertips to build final technology.

[04:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=269s) **Presenter:** So along with that effort, we had to change, I mean, rewrite, of course, the framing of all the language within the list,

[04:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=277s) **Presenter:** but also specifically address the scope, the mission, and the audience, and, of course, the new top 10.

[04:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=285s) **Presenter:** So I would be remiss here if I didn't actually go back a little bit and talk about the definitions for some of this.

[04:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=291s) **Presenter:** So a citizen developer is really a non-traditional builder.

[05:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=300s) **Presenter:** They are not IT.

[05:04](https://www.youtube.com/watch?v=1NA95XxW4_U&t=304s) **Presenter:** They are not trained in development practices.

### Defining Citizen Developers & Platform Scope

[05:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=309s) **Presenter:** They're most certainly not security.

[05:12](https://www.youtube.com/watch?v=1NA95XxW4_U&t=312s) **Presenter:** But they are subject matter experts in their own right.

[05:15](https://www.youtube.com/watch?v=1NA95XxW4_U&t=315s) **Presenter:** They're subject matter experts in finance, in human resources, in marketing.

[05:22](https://www.youtube.com/watch?v=1NA95XxW4_U&t=322s) **Presenter:** These are the people who always envision how their life could be so much better with a little bit of technological help,

[05:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=331s) **Presenter:** you know, a little bit of automation, a little bit of internal capabilities that make their job better.

[05:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=337s) **Presenter:** That's who these people are.

[05:38](https://www.youtube.com/watch?v=1NA95XxW4_U&t=338s) **Presenter:** They're building critical applications internally that touch critical data, finance data, human resources data,

[05:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=349s) **Presenter:** and they're doing that with citizen development platforms.

[05:53](https://www.youtube.com/watch?v=1NA95XxW4_U&t=353s) **Presenter:** So we have called, we have created this bucket of citizen development platform.

[05:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=358s) **Presenter:** We'll talk more about the scope of what that actually means.

[06:01](https://www.youtube.com/watch?v=1NA95XxW4_U&t=361s) **Presenter:** But in order to facilitate the creation of this whole list, we decided to bucket this as citizen development platforms.

[06:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=369s) **Presenter:** And then we dig into the examples of how these risks manifest in the different types of technologies.

[06:17](https://www.youtube.com/watch?v=1NA95XxW4_U&t=377s) **Presenter:** So how did we take those definitions and address them into the new framing of the project?

[06:26](https://www.youtube.com/watch?v=1NA95XxW4_U&t=386s) **Presenter:** So for the scope, like I said, we started with low-code, no-code platforms, right?

[06:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=390s) **Presenter:** That was, that's the origin story.

[06:32](https://www.youtube.com/watch?v=1NA95XxW4_U&t=392s) **Presenter:** But today, with AI-assisted, when you're talking about the fascinating web that citizen developers have at their fingertips,

### Risk Landscape: From Low‑Code to AI‑Assisted Development

[06:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=402s) **Presenter:** you can use these things independently, right?

[06:44](https://www.youtube.com/watch?v=1NA95XxW4_U&t=404s) **Presenter:** You can use AI-assisted, an AI-assisted technology or platform to create something final on the other end.

[06:50](https://www.youtube.com/watch?v=1NA95XxW4_U&t=410s) **Presenter:** You can use low-code, no-code to do that.

[06:52](https://www.youtube.com/watch?v=1NA95XxW4_U&t=412s) **Presenter:** But where it gets extra complex is you can have a citizen developer who is going to use a low-code, no-code platform to build an AI agent that they will then use as a coding companion with AI-assisted coding to build something final.

[07:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=429s) **Presenter:** So you have all of these layers of the technology available to your citizen developer.

[07:13](https://www.youtube.com/watch?v=1NA95XxW4_U&t=433s) **Presenter:** We specifically started with business innovation platforms being mostly the low-code, no-code platforms, the AI-assisted and AI agents.

[07:22](https://www.youtube.com/watch?v=1NA95XxW4_U&t=442s) **Presenter:** So you can think of these like Ping Identity, a low-code, no-code platform.

[07:27](https://www.youtube.com/watch?v=1NA95XxW4_U&t=447s) **Presenter:** Microsoft Power Platform.

[07:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=449s) **Presenter:** Salesforce.

[07:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=449s) **Presenter:** Agent Force.

[07:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=450s) **Presenter:** ServiceNow.

[07:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=451s) **Presenter:** When you talk about the AI-assisted coding, you have all the Vibe coding tools, Cursor, you know, working with Claude.

[07:38](https://www.youtube.com/watch?v=1NA95XxW4_U&t=458s) **Presenter:** So you have all of these different tools that make up these categories.

[07:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=462s) **Presenter:** We expect this to change.

[07:44](https://www.youtube.com/watch?v=1NA95XxW4_U&t=464s) **Presenter:** Like we expect to have more technologies.

[07:47](https://www.youtube.com/watch?v=1NA95XxW4_U&t=467s) **Presenter:** The biggest thing for us is finding the underlying risks that are common in all of them, but then explain how they manifest because the risks manifest differently.

### Audience & Mission: Empowering Security & Governance

[07:56](https://www.youtube.com/watch?v=1NA95XxW4_U&t=476s) **Presenter:** So the audience here is very true to the first top ten.

[08:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=480s) **Presenter:** One, we focused in on security and governance teams because in the end, they're the ones who are responsible for these applications, the security of these applications floating around in the organization that most of the time they don't even know they're supposed to be responsible for.

[08:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=496s) **Presenter:** So security and governance teams, very important audience for us.

[08:19](https://www.youtube.com/watch?v=1NA95XxW4_U&t=499s) **Presenter:** But also in true OWASP style, citizen developers are a class of developer.

[08:28](https://www.youtube.com/watch?v=1NA95XxW4_U&t=508s) **Presenter:** OWASP has always had the mission of educating developers on how to build more secure technology and software.

[08:35](https://www.youtube.com/watch?v=1NA95XxW4_U&t=515s) **Presenter:** And that's why we include citizen developers in this audience because the way we have framed the language within this top ten list is supposed to be approachable for a citizen developer.

[08:47](https://www.youtube.com/watch?v=1NA95XxW4_U&t=527s) **Presenter:** It seems to be accessible by anybody.

[08:50](https://www.youtube.com/watch?v=1NA95XxW4_U&t=530s) **Presenter:** Someone in finance.

[08:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=531s) **Presenter:** They need to understand the risks that they're introducing as well, but you can't frame it in the same way as some of the more complex security topics we discuss because that will shut them out immediately.

[09:03](https://www.youtube.com/watch?v=1NA95XxW4_U&t=543s) **Presenter:** It has to be accessible.

[09:04](https://www.youtube.com/watch?v=1NA95XxW4_U&t=544s) **Presenter:** So we kept that in mind as we reframed this.

[09:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=546s) **Presenter:** And the original top ten was also created with that purpose in mind.

[09:11](https://www.youtube.com/watch?v=1NA95XxW4_U&t=551s) **Presenter:** So then for the mission, it's the same mission.

[09:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=554s) **Presenter:** It's to empower security and governance teams to be able to ensure that the applications that are being built by their citizen developers are as secure as they possibly can be in the final level, the final operating that they have.

[09:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=570s) **Presenter:** So without further ado, this is our citizen development top ten.

[09:38](https://www.youtube.com/watch?v=1NA95XxW4_U&t=578s) **Presenter:** So if you are familiar with the low-code, no-code top ten, you will see some of the same risks because seeing as how we were starting with low-code, no-code technology, low-code technology is still represented in this.

### The New Top 10 Overview & Key Changes

[09:54](https://www.youtube.com/watch?v=1NA95XxW4_U&t=594s) **Presenter:** What we've done, though, is changed the language within.

[10:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=600s) **Presenter:** So again, each one of these now is framed for the citizen developer using various tools, not just the low-code, no-code perspective.

[10:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=606s) **Presenter:** We've also adjusted to represent example risk scenarios, not attack scenarios.

[10:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=616s) **Presenter:** We very specifically chose to use the term risk scenario instead of attack scenario because we feel that when you're talking about a citizen developer, the misconfigurations and the issues that they can release into the wild,

[10:33](https://www.youtube.com/watch?v=1NA95XxW4_U&t=633s) **Presenter:** yes, there are trickle-down attack scenarios to include, but the risk in and of itself is enough to include that as an example for what security teams need to be aware of.

[10:43](https://www.youtube.com/watch?v=1NA95XxW4_U&t=643s) **Presenter:** So we specifically called them example risk scenarios instead of attack scenarios.

[10:47](https://www.youtube.com/watch?v=1NA95XxW4_U&t=647s) **Presenter:** We also combined a couple of them, and really the biggest thing that we're going to spend the rest of our time talking about is we have a new addition, which is blind trust.

[10:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=658s) **Presenter:** This is a very different risk entry.

[11:05](https://www.youtube.com/watch?v=1NA95XxW4_U&t=665s) **Presenter:** It is certainly something that could be a debatable point.

[11:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=670s) **Presenter:** This is version one of this, so I'm super excited to get the feedback from people.

[11:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=674s) **Presenter:** In our experience with this, the blind trust component can trickle down into each of these risks,

[11:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=684s) **Presenter:** but it's so important when you're talking about citizen developers using these new technologies to build things that we felt it deserved a call-out,

[11:35](https://www.youtube.com/watch?v=1NA95XxW4_U&t=695s) **Presenter:** even though it's not a traditional vulnerability category you would see in the other top 10 lists.

[11:41](https://www.youtube.com/watch?v=1NA95XxW4_U&t=701s) **Presenter:** So I'm going to pass it over to Shauna, who's going to take us through blind trust for the rest of this and explain the process we went through,

[11:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=711s) **Presenter:** and especially now what security teams can take from this in their environment.

[11:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=718s) **Presenter:** So I'm going to pass it over to Shauna for the rest.

### Blind Trust: The New #1 Risk; Blind Trust Secure Framework – Step 1: Secure Defaults

[11:59](https://www.youtube.com/watch?v=1NA95XxW4_U&t=719s) **Presenter:** Shauna

[12:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=720s) **Presenter:** All right. Thank you, Kayla.

[12:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=730s) **Presenter:** Imagine your GPS has you drive straight into a lake.

[12:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=734s) **Presenter:** Sounds insane, right?

[12:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=736s) **Presenter:** That's exactly what happens when you take a tool or machine's output at face value without checking it first.

[12:21](https://www.youtube.com/watch?v=1NA95XxW4_U&t=741s) **Presenter:** We call this blind trust.

[12:25](https://www.youtube.com/watch?v=1NA95XxW4_U&t=745s) **Presenter:** Think about it.

[12:26](https://www.youtube.com/watch?v=1NA95XxW4_U&t=746s) **Presenter:** Whether you're using AI to write code, a no-code platform to build an app, or just a simple automation tool.

[12:32](https://www.youtube.com/watch?v=1NA95XxW4_U&t=752s) **Presenter:** Every time the solution looks right, but is it?

[12:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=757s) **Presenter:** Blind trust is when you take that solution and move it straight into production without asking two critical questions.

[12:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=762s) **Presenter:** Is it accurate?

[12:43](https://www.youtube.com/watch?v=1NA95XxW4_U&t=763s) **Presenter:** And more importantly, is it secure?

[12:47](https://www.youtube.com/watch?v=1NA95XxW4_U&t=767s) **Presenter:** Blind trust doesn't just create risk.

[12:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=769s) **Presenter:** It defines the core risk profile of this entire movement.

[12:54](https://www.youtube.com/watch?v=1NA95XxW4_U&t=774s) **Presenter:** The world of non-traditional developers building apps fast with powerful tools,

[12:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=778s) **Presenter:** and also allowing it to earn its spot as our number one risk.

[13:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=782s) **Presenter:** And it's not just technical.

[13:04](https://www.youtube.com/watch?v=1NA95XxW4_U&t=784s) **Presenter:** It's human.

[13:05](https://www.youtube.com/watch?v=1NA95XxW4_U&t=785s) **Presenter:** We naturally trust what looks easy, what's visible, or what we started with.

[13:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=789s) **Presenter:** We see the final solution, we check the boxes, and we move on.

[13:13](https://www.youtube.com/watch?v=1NA95XxW4_U&t=793s) **Presenter:** That's how small mistakes can sneak into critical systems.

[13:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=796s) **Presenter:** Now, why do we fall into blind trust so easily?

[13:22](https://www.youtube.com/watch?v=1NA95XxW4_U&t=802s) **Presenter:** Well, it actually comes down to a few common human biases.

[13:26](https://www.youtube.com/watch?v=1NA95XxW4_U&t=806s) **Presenter:** The first is automation bias, or when we assume that because a machine or tool did something, it must be correct.

[13:32](https://www.youtube.com/watch?v=1NA95XxW4_U&t=812s) **Presenter:** Similar to how earlier our GPS drove us into a lake.

[13:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=814s) **Presenter:** The second is the availability heuristic, or when we pick the easiest or most obvious option instead of the best one.

[13:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=822s) **Presenter:** It's kind of like picking the restaurant closest to your hotel.

[13:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=825s) **Presenter:** Looking convenient, but maybe not the best in town.

[13:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=829s) **Presenter:** And finally, we have anchoring bias, or when we stick too closely to our first choice or starting point, even if it's flawed.

[13:56](https://www.youtube.com/watch?v=1NA95XxW4_U&t=836s) **Presenter:** It's kind of like starting a puzzle with the first piece you see, and forcing everything around it to fit, even if it doesn't quite work.

[14:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=842s) **Presenter:** When you combine these biases, you end up with a real security gap.

[14:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=849s) **Presenter:** Applications built fast, but with unverified, potentially insecure pieces at their core.

### Blind Trust Secure Framework – Step 2: Governance & Visibility; Blind Trust Secure Framework – Step 3: Continuous Protection & Adoption

[14:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=854s) **Presenter:** So, our challenge becomes not to just secure the code, but to secure the relationship between the developer and the tool.

[14:21](https://www.youtube.com/watch?v=1NA95XxW4_U&t=861s) **Presenter:** We must assume that citizen developers, and even our own engineers, are operating with a degree of blind trust.

[14:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=870s) **Presenter:** This means our security controls, our scans, our gates, and our training, must be designed to intercept and challenge this trust,

[14:39](https://www.youtube.com/watch?v=1NA95XxW4_U&t=879s) **Presenter:** stepping in to catch mistakes before they hit production.

[14:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=885s) **Presenter:** Let's talk about the great responsibility that comes with blind trust.

[14:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=889s) **Presenter:** We spend a lot of time talking about blind trust as a risk.

[14:53](https://www.youtube.com/watch?v=1NA95XxW4_U&t=893s) **Presenter:** The risk of citizen developers simply trusting the platform to handle security.

[14:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=898s) **Presenter:** But what if we stopped fighting that impulse?

[15:01](https://www.youtube.com/watch?v=1NA95XxW4_U&t=901s) **Presenter:** What if we accepted that trust is inevitable, and instead channeled it to guarantee security by design?

[15:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=910s) **Presenter:** That's exactly what the blind trust secure framework is designed to do.

[15:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=914s) **Presenter:** It moves us from playing defense, catching mistakes after they happen,

[15:18](https://www.youtube.com/watch?v=1NA95XxW4_U&t=918s) **Presenter:** to building security into the process from the start.

[15:23](https://www.youtube.com/watch?v=1NA95XxW4_U&t=923s) **Presenter:** And here's the kicker.

[15:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=924s) **Presenter:** It breaks down into three actionable steps security teams can actually use.

[15:28](https://www.youtube.com/watch?v=1NA95XxW4_U&t=928s) **Presenter:** Think of it as a wish list for your security posture.

[15:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=931s) **Presenter:** Follow these steps, and you can make blind trust work for you instead of against you.

[15:35](https://www.youtube.com/watch?v=1NA95XxW4_U&t=935s) **Presenter:** The first step is to acknowledge the fundamental bias.

[15:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=942s) **Presenter:** Citizen developers care about three things.

[15:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=945s) **Presenter:** Simplicity, speed, and immediate access.

[15:48](https://www.youtube.com/watch?v=1NA95XxW4_U&t=948s) **Presenter:** Our job isn't to slow them down or police every step.

[15:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=951s) **Presenter:** It's to make the easy path the secure path.

[15:55](https://www.youtube.com/watch?v=1NA95XxW4_U&t=955s) **Presenter:** Here's the magic.

[15:56](https://www.youtube.com/watch?v=1NA95XxW4_U&t=956s) **Presenter:** We make the default the most secure option.

[15:59](https://www.youtube.com/watch?v=1NA95XxW4_U&t=959s) **Presenter:** Security isn't extra or optional.

[16:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=962s) **Presenter:** It's automatic, built-in, and ready to go.

[16:05](https://www.youtube.com/watch?v=1NA95XxW4_U&t=965s) **Presenter:** Developers don't have to think about it, and nothing slips through the cracks.

[16:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=969s) **Presenter:** They move fast, and security moves with them.

[16:13](https://www.youtube.com/watch?v=1NA95XxW4_U&t=973s) **Presenter:** For example, we automatically enforce least privilege access via governed data connections.

[16:18](https://www.youtube.com/watch?v=1NA95XxW4_U&t=978s) **Presenter:** If a citizen developer attempts to connect to a data source, the platform must automatically apply the lowest necessary permissions.

[16:26](https://www.youtube.com/watch?v=1NA95XxW4_U&t=986s) **Presenter:** They don't have to think about security.

[16:27](https://www.youtube.com/watch?v=1NA95XxW4_U&t=987s) **Presenter:** They simply trust the platform to do the right thing.

[16:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=991s) **Presenter:** Second, we focus on incentives by curating and enforcing a vetted component library.

### Closing & Next Steps: Community Engagement & Feedback — Part 1

[16:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=997s) **Presenter:** If the pre-approved safe building blocks are easier and faster to use than risky custom code,

[16:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1002s) **Presenter:** citizen developers are naturally incentivized to build only with these secure components.

[16:46](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1006s) **Presenter:** In short, we turn blind trust into a security advantage when we align it with the path of least resistance.

[16:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1018s) **Presenter:** The second action is to extend our scope.

[17:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1022s) **Presenter:** Have you ever felt like these apps are outside the rules?

[17:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1026s) **Presenter:** That stops here.

[17:08](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1028s) **Presenter:** Citizen-built apps aren't floating in the void.

[17:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1030s) **Presenter:** They're part of our trusted environment.

[17:12](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1032s) **Presenter:** By treating them as governed extensions of the platform, we get visibility into configurations, permissions, and data access,

[17:19](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1039s) **Presenter:** keeping compliance and security intact without slowing anyone down.

[17:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1044s) **Presenter:** Here's the bottom line.

[17:25](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1045s) **Presenter:** The business needs to classify these apps as part of the core ecosystem.

[17:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1049s) **Presenter:** That allows security teams to extend governance and policies to them, holding them to the same standards as every other application.

[17:36](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1056s) **Presenter:** It also ensures clear ownership and accountability, preventing apps from being abandoned or orphaned when teams change or move on.

[17:43](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1063s) **Presenter:** This finally kills the myth that citizen apps are somehow exempt from the rules.

[17:46](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1066s) **Presenter:** To make this work, the business needs to be an active partner.

[17:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1071s) **Presenter:** Success comes from strategic collaboration.

[17:54](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1074s) **Presenter:** By aligning on shared goals and clear metrics, we partner with the business to ensure every app is secure, compliant, and held to the same policies and regulations as any other application.

[18:04](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1084s) **Presenter:** Protecting the organization while enabling innovation.

[18:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1086s) **Presenter:** The third action is this.

[18:12](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1092s) **Presenter:** Securing innovation through trust.

[18:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1094s) **Presenter:** At every stage.

[18:15](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1095s) **Presenter:** We're not just adding more gates or rules.

[18:18](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1098s) **Presenter:** We're weaving security directly into how we build so it becomes part of quality itself.

[18:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1104s) **Presenter:** Through reviews, training, and continuous monitoring, security stops being an afterthought.

[18:28](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1108s) **Presenter:** It becomes a natural part of how great apps are made.

[18:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1111s) **Presenter:** Because the goal isn't to just stop bad things.

[18:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1114s) **Presenter:** It's to enable good things.

[18:35](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1115s) **Presenter:** Faster.

[18:36](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1116s) **Presenter:** Think about it like seat belts and airbags.

[18:38](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1118s) **Presenter:** Nobody wants to slow down driving, but you definitely want protection in case of a crash.

[18:44](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1124s) **Presenter:** Let's talk about the practical ways security teams can execute on this idea.

[18:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1129s) **Presenter:** First of all, we want to embed systems that instantly flag when something drifts from our secure patterns, catching issues early.

[18:55](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1135s) **Presenter:** Next, we make it easy for developers to stay on the right path, giving them just-in-time guidance, clear documentation, and fast feedback loops.

[19:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1142s) **Presenter:** Before anything goes live, automated or manual checks ensure every deployment meets our standards.

[19:08](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1148s) **Presenter:** And once in production, we stay vigilant.

[19:11](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1151s) **Presenter:** Continuously monitoring for new risk, learning and adapting as threats evolve.

[19:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1154s) **Presenter:** The idea is simple.

[19:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1156s) **Presenter:** When the right path is obvious and supported, there's less back and forth, fewer mistakes, and minimal rework.

[19:21](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1161s) **Presenter:** Now, when we talk about building security into our process, it often starts with automation.

[19:28](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1168s) **Presenter:** Our security team simply cannot keep up with the sheer volume of new applications being created.

[19:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1174s) **Presenter:** Automation is no longer a convenience.

[19:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1177s) **Presenter:** It's the only way security is equipped to scale with this rapid growth.

[19:40](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1180s) **Presenter:** So, where does this all lead?

[19:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1185s) **Presenter:** By one, securing the default, two, extending governance into every citizen-built app, and three, embedding protection at every stage of deployment,

[19:53](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1193s) **Presenter:** the Blind Trust Secure Framework flips Blind Trust from a risk into our greatest advantage.

[19:59](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1199s) **Presenter:** Developers can innovate at full speed, manage your CFE incidents, and the whole organization moves faster without ever sacrificing security.

[20:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1206s) **Presenter:** This isn't just about protecting today's apps.

[20:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1209s) **Presenter:** It's about laying a foundation of trust so the next generation of developers can build boldly and securely.

[20:15](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1215s) **Presenter:** When security is the easiest path, Blind Trust isn't a liability.

[20:18](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1218s) **Presenter:** It's our greatest asset.

[20:22](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1222s) **Presenter:** So, to recap, we've explored the new top 10, highlighted our new number one category, and introduced the Blind Trust Secure Framework.

[20:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1231s) **Presenter:** Think of everything we've just covered as season one of this project.

[20:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1234s) **Presenter:** Now we've officially reached the end credit scene of this presentation.

[20:38](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1238s) **Presenter:** That little teaser that sets up the sequel.

[20:40](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1240s) **Presenter:** And as we all know, the sequel is where things get really good.

[20:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1245s) **Presenter:** We are incredibly excited about this relaunch, as this project is fundamentally community-focused.

[20:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1251s) **Presenter:** The relaunch is just the first step, and the immediate and critical next phase is adoption.

[20:55](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1255s) **Presenter:** And the core result of widespread adoption is feedback.

[21:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1260s) **Presenter:** Currently, we are lacking in the quantitative metrics that come from real-world usage.

[21:05](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1265s) **Presenter:** More adoption means better data, which will allow us to iterate more effectively for the project's next major jump.

[21:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1270s) **Presenter:** Data-driven incorporation of new use cases, technologies, and risk scenarios.

[21:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1274s) **Presenter:** Our vision is clear.

[21:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1276s) **Presenter:** To help tell the story of what is happening in the world of citizen development, and continuously improve and expand the top 10 list.

[21:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1284s) **Presenter:** This is a truly crucial OWASP project, and we need your support.

[21:28](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1288s) **Presenter:** We encourage you to join us.

[21:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1289s) **Presenter:** You can find us right now on our Slack channel, and keep an eye out for the official top 10 publication coming very soon.

[21:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1294s) **Presenter:** We look forward to building this new phase with you together.

[21:36](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1296s) **Presenter:** And to kick off phase two, we've prepared a brief survey.

[21:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1302s) **Presenter:** So while you're pulling that up, as I know you guys are probably so ecstatic to see another QR code, what questions do you have for us?

[21:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1318s) **Presenter:** What is the new publication going to be out there?

[22:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1322s) **Presenter:** So as a doc right now, it's public.

[22:06](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1326s) **Presenter:** We should probably actually repost it in the Slack channel.

[22:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1329s) **Presenter:** It's been public the whole time.

[22:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1330s) **Presenter:** But what we need to do next week is update the GitHub landing page.

[22:15](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1335s) **Presenter:** So that will incorporate all of the new entries.

[22:22](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1342s) **Presenter:** So the GitHub landing page will be updated next week.

[22:24](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1344s) **Presenter:** And we also want to make the actual top 10 more available as like a PDF.

[22:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1349s) **Presenter:** Similar to how a lot of the projects have started to do that today.

[22:32](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1352s) **Presenter:** Right now, it's really only in existence in the GitHub page.

[22:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1354s) **Presenter:** We want to make the PDF more generally available for folks.

[22:40](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1360s) **Presenter:** So most of that's going to happen next week.

[22:43](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1363s) **Presenter:** Is it open source?

[22:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1365s) **Presenter:** 100% open source.

[22:47](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1367s) **Presenter:** Yeah.

[22:48](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1368s) **Presenter:** It's OWASP.

[22:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1371s) **Presenter:** You know, one of the...

[22:52](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1372s) **Presenter:** Yeah.

[22:52](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1372s) **Presenter:** So 100%.

[22:53](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1373s) **Presenter:** Everything obnoxiously opens for us.

[22:57](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1377s) **Presenter:** That's the goal.

[22:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1378s) **Presenter:** Yeah.

[23:01](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1381s) **Presenter:** The biggest thing for us is going to be working on prioritization.

[23:05](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1385s) **Presenter:** Because this round, a lot of the prioritization is based off of the low-code, no-code top 10.

[23:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1390s) **Presenter:** Which went through a feedback, like a survey process when they originally created the list in order to prioritize.

[23:19](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1399s) **Presenter:** And there are some tools out there as well that use the low-code, no-code top 10.

[23:23](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1403s) **Presenter:** So data from tools and usage has helped prioritize the top 10 from that.

### Closing & Next Steps: Community Engagement & Feedback — Part 2

[23:27](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1407s) **Presenter:** But now we need to redo that from the citizen development lens using also the fact that there's AI-assisted programming in the mix.

[23:37](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1417s) **Presenter:** And so the next step for us is how do we get that feedback, get those metrics, and help prioritize this new list?

[23:45](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1425s) **Presenter:** Should it need to be changed around?

[23:47](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1427s) **Presenter:** So that's a big part of the data collection.

[23:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1429s) **Presenter:** Yes.

[23:49](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1429s) **Presenter:** I have a question.

[23:50](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1430s) **Presenter:** So I think earlier you mentioned, how does this situate within organizations that do not have security?

[24:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1440s) **Presenter:** So I use case...

[24:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1442s) **Presenter:** That's why I'm going to join.

[24:05](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1445s) **Presenter:** So I'm thinking that was like, teachers adopting these types of...

[24:09](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1449s) **Presenter:** Yeah.

[24:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1450s) **Presenter:** ...to develop, you know, easier ways to be in a grade, but they're using these as a way to kind of make their lives easier.

[24:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1456s) **Presenter:** So if they don't have security changes, they can be able to kind of vet the type of things that's outlining.

[24:23](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1463s) **Presenter:** So there's a blind trust that's like a glaring thing.

[24:26](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1466s) **Presenter:** Yeah.

[24:27](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1467s) **Presenter:** You're putting in like data.

[24:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1469s) **Presenter:** Yeah.

[24:29](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1469s) **Presenter:** That's what happens.

[24:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1470s) **Presenter:** Yeah.

[24:31](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1471s) **Presenter:** How do you envision this kind of ?

[24:33](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1473s) **Presenter:** Those types of scenarios.

[24:36](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1476s) **Presenter:** That's what I love about this project specifically is there's an additional challenge.

[24:40](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1480s) **Presenter:** Because how do you communicate a top 10 risk to a teacher?

[24:46](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1486s) **Presenter:** So what we need to be able to do is get out into audiences that are not...

[24:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1491s) **Presenter:** I mean, I think OWASP has a challenge in and of itself getting to developer audiences.

[24:55](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1495s) **Presenter:** We need to get to business user and end user audiences.

[25:00](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1500s) **Presenter:** So that's definitely one of the things we want to explore.

[25:03](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1503s) **Presenter:** Like, what conferences can we go to that have nothing to do with security?

[25:07](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1507s) **Presenter:** Like, are there teachers conferences where, you know, sitting up here?

[25:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1510s) **Presenter:** Yeah.

[25:11](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1511s) **Presenter:** And being like, look, this is a thing.

[25:13](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1513s) **Presenter:** It's called citizen development.

[25:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1514s) **Presenter:** These are the risks introduced through this.

[25:16](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1516s) **Presenter:** This is the best practice.

[25:17](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1517s) **Presenter:** You know?

[25:18](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1518s) **Presenter:** And help educate audiences that have nothing to do with these topics.

[25:23](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1523s) **Presenter:** It's definitely a big one.

[25:25](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1525s) **Presenter:** And I would say, like, if you're in it...

[25:26](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1526s) **Presenter:** If typically something like this, at best, might fall under IT or biz apps.

[25:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1534s) **Presenter:** You know?

[25:34](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1534s) **Presenter:** Because that's what people see a lot of these applications as biz apps applications.

[25:39](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1539s) **Presenter:** And so it's IT's problem to make sure it's secure.

[25:42](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1542s) **Presenter:** So that's another audience.

[25:44](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1544s) **Presenter:** Yeah.

[25:44](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1544s) **Presenter:** And I guess just to add to that, I think part of the vision is also, for anyone who saw,

[25:48](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1548s) **Presenter:** like, the keynote yesterday morning, you know, how do you keep your skills sharp?

[25:51](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1551s) **Presenter:** Well, this is going...

[25:52](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1552s) **Presenter:** Even for our own developers, this is already going to be...

[25:55](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1555s) **Presenter:** It's already a problem.

[25:56](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1556s) **Presenter:** And it's going to be even more as that expands.

[25:58](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1558s) **Presenter:** And I think blind trust is going to become even more of an issue.

[26:02](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1562s) **Presenter:** So I think we're also just looking to address, kind of get ahead of that and see how we can do that

[26:08](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1568s) **Presenter:** for our system developers.

[26:10](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1570s) **Presenter:** But I think eventually, even as our regular developers fall to it,

[26:14](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1574s) **Presenter:** I think they're going to move in that direction as well.

[26:21](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1581s) **Presenter:** Great.

[26:22](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1582s) **Presenter:** Well, if there aren't any questions anymore, thank you all.

[26:25](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1585s) **Presenter:** We hope to see you on the Slack channel.

[26:27](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1587s) **Presenter:** See you all on the Slack channel and in the future stuff.

[26:30](https://www.youtube.com/watch?v=1NA95XxW4_U&t=1590s) **Presenter:** Thank you.
<!-- talk-enrichment:end -->
