---
title: "Low Code High Risk: Enterprise Domination via Low Code Abuse"
talk_date: 2023-04-22
conference: BSidesNYC 2023
permalink: /talks/2023-04-22-bsidesnyc-2023-low-code-high-risk-enterprise-domination-via-low-code-abuse/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-04-22_BSidesNYC_Dominating_the_Enterprise_via_Low_Code_Abuse/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-04-22_BSidesNYC_Dominating_the_Enterprise_via_Low_Code_Abuse/slides.pdf
schedule_url: https://bsidesnyc.org/archive/#year-2023
recording_url: https://www.youtube.com/watch?v=j0uUpsuUoFQ
github_urls:
  - label: ZapCreds
    url: https://github.com/mbrg/zapcreds
  - label: Powerful
    url: https://github.com/mbrg/powerful
description: "Why focus on heavily guarded crown jewels when you can dominate an organization through its shadow IT? Low-Code applications have become a reality in the enterprise, with surveys showing that most enterprise apps are now built outside of IT, with lacking…"
abstract_source_url: "https://forum.defcon.org/node/242003"
abstract_retrieved_at: "2026-08-14"
abstract_source_scope: "same-talk-official-agenda"
abstract_source_conference: "DEFCON30"
abstract_source_talk_slug: "2022-08-13-defcon30-low-code-high-risk-enterprise-domination-via-low-code-abuse"
transcript_source_url: "https://www.youtube.com/watch?v=j0uUpsuUoFQ"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "4c73db5d8b0d979af2268a70b843236a312a030b84d1258900ee90fdc94f0a4d"
---


<!-- talk-enrichment:start -->
## Abstract

Why focus on heavily guarded crown jewels when you can dominate an organization through its shadow IT? Low-Code applications have become a reality in the enterprise, with surveys showing that most enterprise apps are now built outside of IT, with lacking security practices. Unsurprisingly, attackers have figured out ways to leverage these platforms for their gain. In this talk, we demonstrate a host of attack techniques found in the wild, where enterprise No-Code platforms are leveraged and abused for every step in the cyber killchain. You will learn how attackers perform an account takeover by making the user simply click a link, move laterally and escalate privileges with zero network traffic, leave behind an untraceable backdoor, and automate data exfiltration, to name a few capabilities. All capabilities will be demonstrated with POCs, and their source code will be shared. Finally, we will introduce an open-source recon tool that identifies opportunities for lateral movement and privilege escalation through low-code platforms.

_[Official agenda abstract for this talk, sourced from DEFCON30](https://forum.defcon.org/node/242003)_

## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Introduction to Low‑Code Threat Landscape; Defining Low‑Code and Business User Impact

[00:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=3s) **Presenter:** Those are the apps that business users are building themselves. And we're going to see

[00:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=8s) **Presenter:** just how far we can take it to really get where we want to be.

[00:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=12s) **Presenter:** So a quick note about myself. I lead an OWASP group dedicated to low code, no code. So that's

[00:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=20s) **Presenter:** like the top ten for low code, no code apps. If you're interested, check it out. We have

[00:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=25s) **Presenter:** I have over 200 people that are kind of part of this group already.

[00:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=29s) **Presenter:** I lead a company called Xenity, which is focused on this area.

[00:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=34s) **Presenter:** We've been around for something like two years.

[00:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=37s) **Presenter:** And I've actually been focused on security for low code for about four years now.

[00:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=42s) **Presenter:** Started off at Microsoft.

[00:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=44s) **Presenter:** I was part of a team there that created a bunch of new products that are around like Defender 4X.

[00:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=52s) **Presenter:** X, so Defender for APIs, Defender for IoT, and others. And also write in dark reading.

[00:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=59s) **Presenter:** If you're interested in this topic, there's a bunch more that I'm going to share, more

[01:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=64s) **Presenter:** than today. So reach out or shoot me an email or something.

[01:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=70s) **Presenter:** Okay. A quick disclaimer. Of course, even though this talk is given from an attacker's

[01:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=75s) **Presenter:** perspective, the idea, the kind of low code is awesome. This thing is really, and we're

[01:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=82s) **Presenter:** And local is really putting power in the hands of business users,

[01:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=86s) **Presenter:** which are, of course, the people that are kind of the best to move the business forward.

[01:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=91s) **Presenter:** And we're going to see just how kind of what those people are able to actually create.

[01:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=98s) **Presenter:** But it's important to do it in a secure way, and that's why we're giving this talk.

[01:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=102s) **Presenter:** So here's what we're going to do.

[01:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=104s) **Presenter:** This is a quick outline here.

[01:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=106s) **Presenter:** We're going to start by making sure that we're all on the same page on what low-code, no-code is,

[01:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=112s) **Presenter:** attacks that were observed in the wild.

[01:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=115s) **Presenter:** We'll start off with living-of-the-land attacks.

[01:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=117s) **Presenter:** You'll find that low-code apps, they have compute,

[02:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=120s) **Presenter:** they run on somebody else's cloud,

[02:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=122s) **Presenter:** they're really difficult to monitor,

[02:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=123s) **Presenter:** which makes them the perfect thing for living-of-the-land attacks.

[02:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=127s) **Presenter:** We'll also see a persistency mechanism,

[02:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=129s) **Presenter:** and we're going to follow an APT group

[02:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=132s) **Presenter:** that actually used Power Automate specifically

[02:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=135s) **Presenter:** as a persistency mechanism.

[02:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=136s) **Presenter:** And then we're going to see these predictable misconfigurations.

[02:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=140s) **Presenter:** Just think like OpenS3 buckets.

[02:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=142s) **Presenter:** and how long we've tried to solve that problem.

[02:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=145s) **Presenter:** So we're going to see this pop up again here.

[02:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=146s) **Presenter:** And of course, we'll drop it off with,

[02:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=149s) **Presenter:** A, how you can protect your organization when you go home,

[02:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=153s) **Presenter:** but also a few tools that you can play around with

[02:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=156s) **Presenter:** to just kind of get a feeling of it.

[02:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=160s) **Presenter:** So let's start with low code.

[02:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=162s) **Presenter:** The number one slide that's kind of throughout this presentation,

[02:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=167s) **Presenter:** the most important thing you're going to see today,

[02:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=169s) **Presenter:** is the next slide.

[02:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=170s) **Presenter:** So here it is.

[02:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=172s) **Presenter:** This is a chart that's representing a single Fortune 500 organization

[02:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=177s) **Presenter:** and the number of applications that were built by their business users using low-code, no-code.

[03:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=183s) **Presenter:** Of course, this is anonymized, and we are seeing this across multiple organizations,

[03:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=187s) **Presenter:** and the numbers could vary, but when you talk about business users building applications,

[03:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=192s) **Presenter:** or in other words, people are calling this citizen development,

[03:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=196s) **Presenter:** this is taking off in a way that's really unprecedented to what we know

[03:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=203s) **Presenter:** I mean, how many applications are built in your org every year?

[03:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=207s) **Presenter:** A hundred, a thousand if you're huge, you won't find 5,000 or 10,000 applications that

[03:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=214s) **Presenter:** were built by professional developers.

[03:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=216s) **Presenter:** That means that everything that relies on manual operations won't work.

[03:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=221s) **Presenter:** Security reviews won't work.

### Living‑of‑the‑Land Attacks and Misconfigurations

[03:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=223s) **Presenter:** Threat modeling won't work.

[03:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=224s) **Presenter:** Just kind of vulnerability management, if you need to take a look at all of these different

[03:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=229s) **Presenter:** applications, these won't work.

[03:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=230s) **Presenter:** We need a new approach here.

[03:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=232s) **Presenter:** this is important. You're also seeing that this chart goes up very rapidly. This is kind

[03:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=238s) **Presenter:** of just with the proliferation of these tools across the enterprise where more and more

[04:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=242s) **Presenter:** business users are becoming aware of it. Of course, not all of these applications are

[04:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=247s) **Presenter:** huge. Many of them are very small. You can call them micro-ups, but they still have identity.

[04:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=251s) **Presenter:** They still touch data. They can still do operations, so they still pose a risk.

[04:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=256s) **Presenter:** All right. So this is essentially trying to capture why local exists, right?

[04:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=262s) **Presenter:** and this is a perennial problem,

[04:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=264s) **Presenter:** we will never have enough IT resources

[04:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=267s) **Presenter:** to target everything that the business needs.

[04:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=270s) **Presenter:** And also, I mean, things get lost in translation, right?

[04:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=273s) **Presenter:** When somebody from the business needs something done

[04:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=276s) **Presenter:** and they need to get somebody convinced

[04:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=278s) **Presenter:** so they can actually go ahead and build it,

[04:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=281s) **Presenter:** things don't work properly.

[04:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=283s) **Presenter:** And if this sounds familiar,

[04:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=285s) **Presenter:** like this idea of enabling business users,

[04:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=287s) **Presenter:** if this sounds like not a new thing,

[04:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=290s) **Presenter:** well, it's not a new thing.

[04:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=293s) **Presenter:** sense forever. If you think about Excel, for example, that's like the perfect low-code tool,

[04:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=298s) **Presenter:** right? Everybody's using Excel. I've been using Excel across my career. I've learned a lot of

[05:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=303s) **Presenter:** things, but Excel has always been there. So, and imagine, and think just how many jobs are

[05:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=308s) **Presenter:** fully focused on Excel, are empowered by Excel. What low-code is trying to do is basically bring

[05:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=316s) **Presenter:** you the next generation of Excel. And when you look at this chart, one of the things that's

[05:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=320s) **Presenter:** obvious is that the risks

[05:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=322s) **Presenter:** associated with these technologies that

[05:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=324s) **Presenter:** are enabling business users, they

[05:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=326s) **Presenter:** have also been with us

[05:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=328s) **Presenter:** since forever. So Excel

[05:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=330s) **Presenter:** had macros, and macros are, of course, a

[05:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=332s) **Presenter:** problem until today. And so

[05:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=333s) **Presenter:** this is part of a trend.

[05:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=336s) **Presenter:** IT decentralization, giving

[05:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=338s) **Presenter:** more power to the business, to the

[05:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=340s) **Presenter:** people that actually move the business

[05:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=342s) **Presenter:** forward. So what are

[05:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=344s) **Presenter:** people building? So let's try and

[05:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=346s) **Presenter:** think, let's try and understand

[05:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=347s) **Presenter:** what are the types of things that these

[05:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=350s) **Presenter:** can be. So they actually, they can be whatever people want them to be. So a lot of them are

[05:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=356s) **Presenter:** these like if this, then that automations. So you take, for example, every time you get

[06:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=361s) **Presenter:** an email, you do something. Every time a file arrives on SharePoint, you send it off to

[06:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=365s) **Presenter:** your private Google Drive. These things are kind of the number one scenario. On top of

[06:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=372s) **Presenter:** that, you'll find integrations. So one system can talk to another. You'll find business

[06:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=376s) **Presenter:** applications that are facilitating a specific workflow.

[06:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=380s) **Presenter:** So, for example, at Microsoft, they built their marketing team, built an application

[06:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=385s) **Presenter:** that is used to basically coordinate product launches.

[06:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=389s) **Presenter:** So, everything around product launches is built into this app, built by the marketing

[06:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=393s) **Presenter:** team.

[06:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=394s) **Presenter:** You can find all products that have been built with low code, with professional development

[06:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=398s) **Presenter:** teams, and, of course, mobile apps, there's a lot of them.

[06:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=403s) **Presenter:** now one thing that you could have at the back of your mind right now that would allow you to

[06:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=408s) **Presenter:** kind of try and escape this uh this talk unharmed is to think that this doesn't apply to you or that

[06:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=413s) **Presenter:** this doesn't apply to your organization uh so i'm sorry to be the one to to say this but uh you

[06:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=419s) **Presenter:** don't have a choice if you're using any of the top sass platforms today the top enterprise sass

[07:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=425s) **Presenter:** platforms low code is being pushed in you don't get a choice nobody asks you if you have salesforce

[07:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=431s) **Presenter:** you have ServiceNow, if you have Microsoft, they are, in order to make the platforms more

[07:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=437s) **Presenter:** useful to your business users, the capabilities, the automation, the integration, the application

[07:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=443s) **Presenter:** capabilities are being pushed into those platforms, and you'll get some of them with a basic license.

[07:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=449s) **Presenter:** That means that in most organizations, it's already there. I've actually never seen an

[07:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=453s) **Presenter:** organization, and we do this engagement a lot where we go kind of partner with someone,

[07:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=458s) **Presenter:** and we look at their environment and we try to see what's already there,

### Persistence via Power Automate and APT Techniques

[07:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=462s) **Presenter:** and they're like, well, yeah, nobody's doing citizen development here.

[07:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=465s) **Presenter:** We're a bank or something like that.

[07:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=467s) **Presenter:** Nobody will ever let business users build their own things.

[07:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=470s) **Presenter:** Well, reality is different.

[07:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=472s) **Presenter:** And so I really encourage you to think of this as something that will happen.

[07:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=477s) **Presenter:** It's very similar kind of in nature to the way that we had to handle a mobile

[08:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=483s) **Presenter:** or bring your own device, where we had some time we thought

[08:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=486s) **Presenter:** that it might not reach the enterprise.

[08:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=488s) **Presenter:** bring your own device in this org.

[08:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=490s) **Presenter:** Well, today everybody's doing it, right?

[08:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=492s) **Presenter:** Because there's no other way.

[08:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=494s) **Presenter:** So it's really important for us to understand

[08:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=498s) **Presenter:** that this is already something

[08:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=500s) **Presenter:** that our business users have the capability to use.

[08:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=503s) **Presenter:** By the way, this is a good thing.

[08:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=505s) **Presenter:** It's not a bad thing.

[08:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=506s) **Presenter:** It's allowing business users

[08:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=508s) **Presenter:** to actually produce more value to your organizations.

[08:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=512s) **Presenter:** So a quick recap.

[08:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=515s) **Presenter:** Low code is available in every major organization,

[08:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=518s) **Presenter:** just saw this. Because these platforms are the platforms that hold your business data,

[08:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=523s) **Presenter:** so imagine your office, your Microsoft 365, your Salesforce, then by definition it has

[08:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=529s) **Presenter:** access to business data and it is able to do business operations. It also powers business

[08:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=534s) **Presenter:** processes because business users are building it to facilitate their operations. It runs

[08:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=539s) **Presenter:** as SaaS and we all know that it makes it challenging to monitor and to control. And as most of

[09:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=548s) **Presenter:** pretty underrated by IT and security teams.

[09:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=550s) **Presenter:** The things that business users

[09:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=552s) **Presenter:** are building, we're used to think about

[09:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=554s) **Presenter:** them as toys,

[09:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=557s) **Presenter:** as something that they use for their own personal

[09:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=558s) **Presenter:** use. That's really not the reality

[09:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=560s) **Presenter:** today, and we'll see...

[09:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=562s) **Presenter:** And one of the largest

[09:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=564s) **Presenter:** things that happened in the last couple

[09:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=566s) **Presenter:** of months, of course, with the introduction of

[09:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=568s) **Presenter:** things like ChatGPT into

[09:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=570s) **Presenter:** low-code, is that business apps

[09:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=572s) **Presenter:** have become even easier to build.

[09:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=575s) **Presenter:** So today, instead of

[09:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=576s) **Presenter:** writing a prompt that will give you

[09:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=578s) **Presenter:** an answer, you can write a prompt that will build an app.

[09:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=581s) **Presenter:** This is actually available in Microsoft 365 today.

[09:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=585s) **Presenter:** And so the number of apps, of course, only gets bigger.

[09:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=589s) **Presenter:** All right.

[09:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=590s) **Presenter:** So we've gone through the kind of intro section.

[09:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=598s) **Presenter:** One last thing I want all of us to make sure that we get correctly.

[10:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=605s) **Presenter:** Is this better?

[10:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=609s) **Presenter:** All right.

[10:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=610s) **Presenter:** I'm going to lean in.

[10:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=612s) **Presenter:** Okay.

[10:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=613s) **Presenter:** So we went through the intro.

[10:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=616s) **Presenter:** But one thing that I want us to make sure is that we understand,

[10:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=620s) **Presenter:** we have an intuitive understanding of what these applications are.

[10:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=623s) **Presenter:** And I also want to make sure that you're convinced that everybody can build these applications.

[10:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=627s) **Presenter:** So let me show you an example.

[10:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=630s) **Presenter:** And hopefully this will work.

[10:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=634s) **Presenter:** All right.

[10:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=635s) **Presenter:** So, yeah, you probably, maybe you'll see something in a moment.

[10:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=640s) **Presenter:** But while this is working, let me share what I'm actually building here.

[10:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=645s) **Presenter:** So we're using Slack in my company, and there's this annoying thing about Slack where if you mention someone on a public channel,

[10:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=652s) **Presenter:** then if somebody mentions you, then they expect you to answer pretty quickly, which is, I mean, this is kind of annoying.

[11:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=661s) **Presenter:** But I've noticed that if you have this small icon next to your name that says that you're on a call,

[11:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=666s) **Presenter:** then they're fine.

[11:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=667s) **Presenter:** They won't nudge you.

[11:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=668s) **Presenter:** So here's the automation.

[11:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=670s) **Presenter:** Every time I get mentioned on Slack, I'm going to change my status as if I'm on a call.

[11:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=676s) **Presenter:** So people won't bother me.

[11:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=678s) **Presenter:** And five minutes later, I'm going to change the status back to free so nobody will be suspicious.

[11:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=684s) **Presenter:** And so this is a small automation that I'm building.

[11:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=687s) **Presenter:** And while I'm building it, you can see that I'm dragging and dropping.

[11:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=691s) **Presenter:** I'm choosing, I had to choose a specific account on Slack that I'm going to use.

[11:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=695s) **Presenter:** This demo is actually showing you Zapier.

[11:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=699s) **Presenter:** So it's able to go to the Slack API.

[11:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=702s) **Presenter:** Think about kind of the complexities of this application.

[11:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=705s) **Presenter:** It needs to subscribe to Webhook.

[11:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=707s) **Presenter:** It needs to reach out to the API afterwards.

[11:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=710s) **Presenter:** That five-minute wait period means that there's some sort of state.

[11:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=713s) **Presenter:** It needs to wait, right?

[11:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=717s) **Presenter:** I'm building this, I mean, there's nothing sophisticated here on the builder side.

[12:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=722s) **Presenter:** This takes me about two minutes to build this application.

### Exfiltration and Ransomware with No‑Code Tools

[12:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=725s) **Presenter:** And I want you to notice a couple of things.

[12:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=728s) **Presenter:** One is that in no point in this, while building this application, do I need to provide access

[12:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=734s) **Presenter:** to Slack.

[12:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=736s) **Presenter:** So how does this work?

[12:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=738s) **Presenter:** How does Zapier connect to my Slack account?

[12:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=740s) **Presenter:** We'll see that in a moment.

[12:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=741s) **Presenter:** And the other thing is, think about the SDLC and compare it to what you're seeing on screen.

[12:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=747s) **Presenter:** Right? There's no SDLC here, right? I'm just building something, and once I click save, it will be deployed in production. And by the way, some platforms also auto-save. So any change that you make is automatically being pushed.

[12:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=764s) **Presenter:** And if you think about this as for a critical process,

[12:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=769s) **Presenter:** then think about all of the things that you lose by not having an SDLC, right?

[12:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=774s) **Presenter:** There's no review.

[12:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=775s) **Presenter:** There's no security gates.

[12:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=777s) **Presenter:** Kind of forget about shift left.

[12:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=779s) **Presenter:** Okay.

[13:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=780s) **Presenter:** So you just saw that I got kind of this little icon there.

[13:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=783s) **Presenter:** I'm publishing this app.

[13:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=784s) **Presenter:** That's it.

[13:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=784s) **Presenter:** It's operational.

[13:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=785s) **Presenter:** And now I'm kind of demoing that it works.

[13:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=788s) **Presenter:** So, again, this was just a couple of minutes.

[13:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=790s) **Presenter:** But you understand just how powerful this application is.

[13:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=796s) **Presenter:** So the number one thing that's important to us is the identity.

[13:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=799s) **Presenter:** And actually, before I created this application,

[13:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=802s) **Presenter:** I've gone through a very small process,

[13:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=805s) **Presenter:** which is called creating a connection.

[13:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=808s) **Presenter:** So what is a connection?

[13:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=809s) **Presenter:** A connection is basically an OA of consent flow for Slack in this case.

[13:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=815s) **Presenter:** And you can see the regular OA of consent flow

[13:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=817s) **Presenter:** that's asking me for specific permissions.

[13:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=819s) **Presenter:** I can choose a bunch of applications.

[13:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=821s) **Presenter:** These platforms have gone built in with hundreds of different connectors.

[13:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=824s) **Presenter:** Once I go through the OAuth consent flow,

[13:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=826s) **Presenter:** I get this object created which is called the connection.

[13:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=830s) **Presenter:** Okay, what's important about this connection?

[13:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=832s) **Presenter:** It has this little share button.

[13:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=835s) **Presenter:** This is weird.

[13:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=836s) **Presenter:** It's an OAuth, I went through an OAuth flow,

[13:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=839s) **Presenter:** I granted consent for Zapier to act on my behalf,

[14:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=842s) **Presenter:** and then I can share that consent,

[14:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=844s) **Presenter:** I can share that thing, that connection,

[14:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=847s) **Presenter:** that active connection with other users.

[14:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=850s) **Presenter:** How does it work?

[14:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=852s) **Presenter:** Okay, on one side we have Zapier or Power Automate or any other automation platform.

[14:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=857s) **Presenter:** This is not picking on a specific vendor.

[14:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=858s) **Presenter:** The entire industry is doing the same thing, and I'll tell you in a moment why.

[14:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=862s) **Presenter:** The other side, you have REST APIs.

[14:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=865s) **Presenter:** By the way, this could also be your on-prem, your cloud, anything.

[14:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=871s) **Presenter:** Okay, how does it work?

[14:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=873s) **Presenter:** Well, essentially, what they're doing there is that they are taking the refresh tokens out of the OAuth consent flow,

[14:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=881s) **Presenter:** are allowing you to share those refresh tokens

[14:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=883s) **Presenter:** with other users.

[14:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=885s) **Presenter:** Okay, think about what this means.

[14:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=887s) **Presenter:** This is completely breaking the permission model,

[14:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=890s) **Presenter:** completely breaking the OAuth model,

[14:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=892s) **Presenter:** because this is a user impersonation by design.

[14:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=895s) **Presenter:** The application is impersonating the user,

[14:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=897s) **Presenter:** and you are impersonating the user

[14:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=899s) **Presenter:** when you share those connections with other users.

[15:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=901s) **Presenter:** And so by storing these refresh tokens

[15:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=904s) **Presenter:** and then reusing them,

### Credential Sharing and Impersonation in Low‑Code Platforms

[15:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=905s) **Presenter:** you are able to, A, kind of bypass anything that,

[15:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=911s) **Presenter:** personality in the user, but also think about the productivity benefit.

[15:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=914s) **Presenter:** No more asking for permissions.

[15:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=916s) **Presenter:** You can build whatever app you'd like with your own permissions.

[15:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=920s) **Presenter:** As long as you can do it as a user, you can build an app that automates it.

[15:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=923s) **Presenter:** This is very different from your experience as a professional developer, right?

[15:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=927s) **Presenter:** As a developer, you need to ask for permission.

[15:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=929s) **Presenter:** You have an application.

[15:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=930s) **Presenter:** It has a service account or something like that.

[15:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=932s) **Presenter:** Not here.

[15:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=933s) **Presenter:** I mean, you can do it, but in many cases, you don't.

[15:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=936s) **Presenter:** Now, because you've seen the chart with so many applications,

[15:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=943s) **Presenter:** and it's so easy to create those applications,

[15:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=946s) **Presenter:** then you get a whole bunch of applications.

[15:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=948s) **Presenter:** And these are just examples from templates provided by the different vendors.

[15:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=954s) **Presenter:** The important thing about this is the logos next to the names of these applications.

[15:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=959s) **Presenter:** Why are the logos important?

[16:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=961s) **Presenter:** because that means that there's an active connection

[16:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=964s) **Presenter:** to each one of these systems.

[16:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=966s) **Presenter:** So when you have lots of different applications

[16:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=967s) **Presenter:** behind each application,

[16:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=969s) **Presenter:** there is a trail of connections,

[16:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=971s) **Presenter:** connections that can be shared,

[16:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=972s) **Presenter:** connections that can be overused.

[16:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=973s) **Presenter:** And so when you look at each one of these platforms,

[16:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=977s) **Presenter:** what you'll typically find

[16:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=978s) **Presenter:** is some notion of a default environment,

[16:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=981s) **Presenter:** somewhere where everybody can go into this platform,

[16:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=984s) **Presenter:** they can create applications, automations, connections,

[16:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=987s) **Presenter:** and they can share them with others.

[16:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=991s) **Presenter:** is one click away.

[16:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=992s) **Presenter:** In some platforms, in some cases,

[16:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=993s) **Presenter:** it can be shared with the entire org by default.

[16:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=996s) **Presenter:** And when I say the entire org,

[16:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=998s) **Presenter:** I mean everybody, for example,

[16:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1000s) **Presenter:** everybody in your Azure AD tenant.

[16:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1002s) **Presenter:** So that includes guests, by the way,

[16:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1004s) **Presenter:** or contractors and vendors.

[16:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1006s) **Presenter:** So when you go into one of those platforms,

[16:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1009s) **Presenter:** again, they are basically providing you

[16:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1011s) **Presenter:** credential sharing as a service, right?

[16:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1014s) **Presenter:** Which bypasses the entire security mechanism.

[16:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1016s) **Presenter:** Think about the SOC,

[16:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1017s) **Presenter:** trying to figure out what's the difference

[17:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1021s) **Presenter:** using your refresh token and yourself.

[17:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1023s) **Presenter:** I mean, it's just, it's very difficult.

[17:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1025s) **Presenter:** Now, of course, once we have that,

[17:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1028s) **Presenter:** then you can see the first attack here,

[17:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1030s) **Presenter:** which is just kind of privilege escalation.

[17:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1032s) **Presenter:** This is basic.

[17:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1034s) **Presenter:** So the end result here

[17:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1036s) **Presenter:** is that when I have a single account in your org,

[17:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1040s) **Presenter:** again, this can be a guest account as well,

[17:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1042s) **Presenter:** and I go to each one of those platforms,

[17:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1044s) **Presenter:** there's a bunch of connections

[17:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1045s) **Presenter:** that are waiting for me to pick them up and use them.

[17:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1047s) **Presenter:** You'll find FTP connections,

[17:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1051s) **Presenter:** to people's outlook and teams.

[17:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1053s) **Presenter:** You'll find connections to people's cloud environment,

[17:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1056s) **Presenter:** Azure and AWS and GCP.

[17:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1059s) **Presenter:** So this is a lot.

[17:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1062s) **Presenter:** Now, other than just using those connections,

[17:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1067s) **Presenter:** other than just kind of getting those connections

[17:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1069s) **Presenter:** and being able to escalate your privileges,

[17:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1071s) **Presenter:** you can also just use those connections

[17:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1073s) **Presenter:** to actually get what you want.

[17:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1075s) **Presenter:** So for example, here's one ransomware built with no code.

[18:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1081s) **Presenter:** I'm iterating, so I click a button,

[18:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1085s) **Presenter:** and then I'm iterating over a SharePoint site.

[18:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1087s) **Presenter:** For each file in that SharePoint site,

[18:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1088s) **Presenter:** I'm going to encrypt that file

[18:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1090s) **Presenter:** using a handy encrypted function

[18:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1092s) **Presenter:** provided by the platform, right?

[18:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1094s) **Presenter:** Because there are valid business use cases

[18:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1095s) **Presenter:** to encrypt files.

[18:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1096s) **Presenter:** And then I'm going to simply override the file

[18:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1100s) **Presenter:** with the encrypted version.

[18:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1102s) **Presenter:** So ransomware, again, using no-code tools

[18:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1105s) **Presenter:** and just, again, think about all of the protections

[18:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1107s) **Presenter:** you have in your org targeting ransomware

[18:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1111s) **Presenter:** they won't really find this.

[18:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1114s) **Presenter:** And we'll see in a moment how this goes well beyond SaaS.

[18:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1118s) **Presenter:** Here's another example.

[18:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1120s) **Presenter:** This one is, I think, in almost every organization I've worked with,

[18:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1124s) **Presenter:** I've seen this example in some form or another.

[18:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1127s) **Presenter:** We've tried to block business users or users in general

[18:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1131s) **Presenter:** from using their own personal accounts in a work context.

[18:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1136s) **Presenter:** I mean, we're all guilty of that as well, right?

[18:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1137s) **Presenter:** or everybody wants their calendar events in their personal Gmail.

[19:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1141s) **Presenter:** There are solutions to do that.

### Misconfigurations and Open‑S3/Power Pages Exploits

[19:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1143s) **Presenter:** You can use DLP.

[19:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1145s) **Presenter:** You can do something on the email server.

[19:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1147s) **Presenter:** A bunch of things you can do.

[19:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1148s) **Presenter:** But what if the business user creates an app that on one side connects to their corporate email

[19:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1155s) **Presenter:** and on the other side with a separate connection connects to their own Gmail account

[19:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1161s) **Presenter:** and simply copies the content?

[19:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1163s) **Presenter:** The content is being copied on the SaaS vendor's cloud

[19:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1168s) **Presenter:** So no network security appliance will help you there

[19:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1172s) **Presenter:** No monitoring will help you there

[19:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1173s) **Presenter:** The only thing you can do is look at the platform itself

[19:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1176s) **Presenter:** Because it's the only one that's aware that this application even exists

[19:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1179s) **Presenter:** Now, you're seeing here an example of email exfiltration

[19:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1182s) **Presenter:** And again, this is very common

[19:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1184s) **Presenter:** But we've seen this with other things as well

[19:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1186s) **Presenter:** So syncing up a corporate drive with a personal drive

[19:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1192s) **Presenter:** By mistake, I mean, they build an application that other business users are starting to use.

[19:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1198s) **Presenter:** It's useful.

[19:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1198s) **Presenter:** And it uses, for example, an Excel spreadsheet as a database.

[20:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1202s) **Presenter:** But where is that Excel spreadsheet stored?

[20:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1205s) **Presenter:** Because as easily as you can plug in your corporate account, you can plug in your personal account, and that's it.

[20:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1209s) **Presenter:** And the application is, the database behind the application is being stored in your personal account.

[20:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1215s) **Presenter:** Here's a thing that's kind of very non-trivial.

[20:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1219s) **Presenter:** you can jump to people's laptops through these platforms.

[20:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1224s) **Presenter:** Because there's a component or a version of low-code

[20:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1227s) **Presenter:** that's called RPA, robotic process automation,

[20:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1229s) **Presenter:** which is basically about emulating the mouse and the keyboard,

[20:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1232s) **Presenter:** the inputs by the user on the user's own machine.

[20:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1236s) **Presenter:** And it's a type of automation that's used for legacy systems

[20:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1240s) **Presenter:** that don't have a proper API.

[20:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1242s) **Presenter:** Now, again, imagine a SOC analyst trying to distinguish

[20:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1246s) **Presenter:** a bot that's doing that and a user that's doing that.

[20:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1249s) **Presenter:** is a bot that's running on a user context. Now, these connections allow you to send a payload,

[20:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1255s) **Presenter:** or in the world of a platform, like a task, from cloud to somebody's laptop and run it on somebody's

[21:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1263s) **Presenter:** laptop. And actually, at last DEF CON, I showed how these exact capabilities by Microsoft can be

[21:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1270s) **Presenter:** used to create malware with no code and with completely trusted services and executables.

[21:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1279s) **Presenter:** into every Windows 11 machine.

[21:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1281s) **Presenter:** So if you have Windows 11, open it up,

[21:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1284s) **Presenter:** search for Power Automate, you'll find it.

[21:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1287s) **Presenter:** It's trivial for an attacker to subscribe,

[21:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1291s) **Presenter:** to attach the Power Automate instance

[21:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1294s) **Presenter:** you have on your laptop to their own malicious cloud.

[21:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1296s) **Presenter:** And from then on out, they can send payloads

[21:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1299s) **Presenter:** to your machine through trusted channels

[21:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1302s) **Presenter:** facilitated by Microsoft.

[21:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1304s) **Presenter:** So if you're looking for network IOCs,

[21:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1307s) **Presenter:** these would be Microsoft domains.

[21:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1309s) **Presenter:** you're looking for executables, this would be Microsoft executables, right? Now, again, this is

[21:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1314s) **Presenter:** not picking on Microsoft. This is a problem with this entire space where impersonating the user is

[21:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1319s) **Presenter:** kind of the mainstream. All right. So the one thing that we wanted to do in order to make it easier

[22:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1326s) **Presenter:** for you to check kind of your own status and also to play around with this is to give you a tool

[22:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1331s) **Presenter:** that you can work with. So this is a tool that's available right now. You can check it out on

[22:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1337s) **Presenter:** GitHub. Basically, it's

[22:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1339s) **Presenter:** very simple. It's using the Zapier

[22:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1341s) **Presenter:** unofficial API

[22:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1342s) **Presenter:** to provide you with all of the connections that

[22:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1345s) **Presenter:** are available to a specific user.

[22:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1347s) **Presenter:** So you give it access to a specific user, and

[22:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1349s) **Presenter:** we show you all of the connections that

[22:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1351s) **Presenter:** this user can use, and who

[22:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1353s) **Presenter:** created those connections, and

[22:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1354s) **Presenter:** where are they leading.

[22:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1356s) **Presenter:** We are working on similar tools for other platforms

[22:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1359s) **Presenter:** as well. So if you're interested,

[22:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1361s) **Presenter:** start the repo. You'll

[22:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1362s) **Presenter:** get the notifications.

[22:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1364s) **Presenter:** All right.

[22:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1365s) **Presenter:** So the next thing I want to do is a bit more sophisticated.

[22:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1369s) **Presenter:** One of the, up until now, we were focused on a scenario where these connections already exist.

[22:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1375s) **Presenter:** But what if I want to entice the user to make user create those connections for us?

[23:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1380s) **Presenter:** Essentially, here's the idea.

[23:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1381s) **Presenter:** I'm going to build an application that's useful inside an org.

[23:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1384s) **Presenter:** Let's say I have an account for somebody inside an org.

[23:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1388s) **Presenter:** Again, could be a guest.

[23:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1389s) **Presenter:** And then I want to get to the, I don't know, to the CEO.

[23:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1394s) **Presenter:** that the CO would like to use.

[23:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1395s) **Presenter:** And then once the application is running,

[23:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1400s) **Presenter:** I can do whatever I want with the connections provided to me.

[23:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1403s) **Presenter:** And then I will, alongside doing the thing

[23:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1408s) **Presenter:** that is expected of this application to do,

[23:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1410s) **Presenter:** I'm just going to steal the account.

[23:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1412s) **Presenter:** So I'm going to continue to describe it while I do it.

[23:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1416s) **Presenter:** So again, you'll get a notion of just how easy it is.

[23:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1419s) **Presenter:** But essentially, this thing is not new.

[23:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1424s) **Presenter:** when a user logs into an application,

[23:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1427s) **Presenter:** the application can do whatever it wants

[23:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1429s) **Presenter:** with the permissions that the user has provided.

[23:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1431s) **Presenter:** This is not new.

[23:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1433s) **Presenter:** However, this is the first time

[23:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1435s) **Presenter:** that somebody from HR can do it,

[23:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1436s) **Presenter:** that a guest can do it,

[23:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1437s) **Presenter:** that anybody in the org can do it.

[23:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1439s) **Presenter:** And more than that,

[24:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1440s) **Presenter:** when these applications run,

[24:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1442s) **Presenter:** they are not telling the user,

[24:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1445s) **Presenter:** hey, here's the list of permissions

[24:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1446s) **Presenter:** we're going to use on your behalf.

[24:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1448s) **Presenter:** They're telling them,

[24:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1449s) **Presenter:** hey, give me a connection to Outlook.

[24:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1450s) **Presenter:** What do you think are the permissions

[24:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1452s) **Presenter:** behind that connection?

### Defense Strategies and OWASP Low‑Code Guidance — Part 1

[24:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1453s) **Presenter:** Everything in Outlook, right?

[24:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1455s) **Presenter:** Everything in Teams, everything in everywhere else.

[24:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1458s) **Presenter:** So this specific application that I'm building right now,

[24:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1460s) **Presenter:** I just took off a random application from the marketplace.

[24:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1465s) **Presenter:** This is an application for an out-of-office,

[24:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1467s) **Presenter:** to facilitate out-of-office,

[24:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1469s) **Presenter:** so it will auto-decline calendar events for you.

[24:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1473s) **Presenter:** And so it needs access to your email.

[24:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1475s) **Presenter:** So what I'm doing here right now

[24:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1477s) **Presenter:** is just typing a single line of code

[24:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1480s) **Presenter:** that will use this connection

[24:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1481s) **Presenter:** to send an email on the person's behalf

[24:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1483s) **Presenter:** my account saying I've been pwned.

[24:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1485s) **Presenter:** Now, of course, I could have done lots of other things,

[24:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1488s) **Presenter:** but the crucial piece here is that there's no way

[24:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1491s) **Presenter:** for the user to know what I'm actually doing

[24:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1493s) **Presenter:** with their account because they're providing me

[24:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1494s) **Presenter:** with a connection, which essentially is an asterisk

[24:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1497s) **Presenter:** over all of the permissions for that specific application.

[25:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1501s) **Presenter:** Now, I've created this application.

[25:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1502s) **Presenter:** I'm publishing it.

[25:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1504s) **Presenter:** You'll note it's difficult to see,

[25:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1505s) **Presenter:** but if you can see the URL, what you'll spot

[25:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1509s) **Presenter:** is that this application is going to be hosted

[25:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1511s) **Presenter:** on a Microsoft domain.

[25:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1514s) **Presenter:** creating an internal phishing campaign

[25:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1516s) **Presenter:** where all I need to do in order

[25:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1518s) **Presenter:** to get somebody's

[25:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1520s) **Presenter:** account is to get them to click

[25:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1522s) **Presenter:** on a link that is facilitated by

[25:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1524s) **Presenter:** Microsoft to log in with their own corporate account,

[25:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1526s) **Presenter:** which is something they will be used to

[25:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1528s) **Presenter:** doing because they're using these kind of applications,

[25:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1530s) **Presenter:** and then I will do whatever I

[25:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1532s) **Presenter:** want with their connection.

[25:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1534s) **Presenter:** Alright, then you can see

[25:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1535s) **Presenter:** that once a user

[25:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1537s) **Presenter:** connects to it, I get the email that I've been

[25:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1539s) **Presenter:** pwned. Now, the number

[25:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1541s) **Presenter:** one thing that is

[25:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1544s) **Presenter:** only constraint here in this

[25:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1546s) **Presenter:** entire kind of internal phishing campaign

[25:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1549s) **Presenter:** is this

[25:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1550s) **Presenter:** window. When a user

[25:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1552s) **Presenter:** uses the app, they get

[25:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1554s) **Presenter:** prompted with this window that is

[25:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1556s) **Presenter:** telling them, hey, this application is going

[25:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1558s) **Presenter:** to use these connections.

[26:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1560s) **Presenter:** Again, notice that this is

[26:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1562s) **Presenter:** not the O of consent flow. You're not seeing

[26:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1564s) **Presenter:** the permissions that I'm asking for. You're just

[26:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1566s) **Presenter:** seeing the services.

[26:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1568s) **Presenter:** If I get rid of

[26:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1570s) **Presenter:** this window, if this window

[26:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1573s) **Presenter:** I've reached a point where I can create an internal phishing campaign

[26:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1579s) **Presenter:** that requires a user to click a link provided by Microsoft, and that's it.

[26:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1584s) **Presenter:** So this would be very bad, right?

[26:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1586s) **Presenter:** This shouldn't happen.

[26:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1589s) **Presenter:** Unfortunately, it's an option provided by the platform.

[26:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1593s) **Presenter:** So there's actually a valid reason to do this.

[26:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1597s) **Presenter:** So because business users could be used to using those applications,

[26:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1601s) **Presenter:** and then you don't want to create hurdles for them to actually do it,

[26:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1603s) **Presenter:** So some organizations are choosing to remove this consent window, which is, of course, very dangerous.

[26:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1610s) **Presenter:** If you're a Microsoft shop, I strongly encourage you to make sure that this flag is off.

[26:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1616s) **Presenter:** All right.

[26:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1617s) **Presenter:** So we're done with the living of the land stuff.

[27:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1620s) **Presenter:** The next thing I want to show you is persistency.

[27:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1624s) **Presenter:** And this is actually pretty interesting because what we're going to do is we're going to follow through footsteps of an APT group

[27:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1631s) **Presenter:** that used Power Automate, Microsoft automation feature inside of Office,

[27:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1635s) **Presenter:** to remain persistent within an organization.

[27:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1638s) **Presenter:** And basically what happened there, the name of the organization wasn't disclosed,

[27:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1642s) **Presenter:** but what happened there is that there were a few different malware families in this organization,

[27:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1648s) **Presenter:** so they knew they were breached, they were looking for more infections,

[27:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1652s) **Presenter:** and the investigative team took about six months to find that this automation was actually active,

[27:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1661s) **Presenter:** code. And what is actually automation, and what happened is that the attackers, they

[27:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1666s) **Presenter:** were able to gain access to an admin's account. And then, I mean, the next logical step is

[27:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1671s) **Presenter:** typically kind of installing malware, moving laterally through the network, right? So they

[27:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1675s) **Presenter:** didn't do all of that. Instead, they created a single automation. This automation ran on

[28:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1680s) **Presenter:** a schedule, and every day it used the e-discovery feature, form office, to find secrets and PII

[28:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1687s) **Presenter:** inside of the organization

[28:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1688s) **Presenter:** and just send it off to a random endpoint,

[28:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1691s) **Presenter:** to a specific exfiltration endpoint.

[28:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1693s) **Presenter:** This simple automation was there for six months

[28:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1695s) **Presenter:** without anybody noticing,

[28:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1697s) **Presenter:** because again, how would you notice?

[28:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1699s) **Presenter:** You don't have logs for this.

[28:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1700s) **Presenter:** You don't know this is impersonating your user,

[28:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1704s) **Presenter:** and this is also not something you would typically expect.

[28:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1707s) **Presenter:** So let's try to rebuild this on our own.

[28:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1711s) **Presenter:** Here's a very rudimentary version.

[28:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1714s) **Presenter:** on a recurrence, I'm going to go to a specific SharePoint site.

[28:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1719s) **Presenter:** I'm going to loop through all of that SharePoint site.

[28:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1722s) **Presenter:** I'm going to encrypt each and every file,

[28:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1725s) **Presenter:** dump them to a random HTTP endpoint,

[28:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1727s) **Presenter:** and then tweet about it, because why not?

[28:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1729s) **Presenter:** I mean, nobody will catch me.

[28:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1731s) **Presenter:** Okay, so this is actually what the attacker did,

[28:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1735s) **Presenter:** but let's take it up kind of a few steps forward.

[28:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1739s) **Presenter:** One thing that I want to do is I want to have the capability

[29:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1744s) **Presenter:** whenever I want.

[29:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1745s) **Presenter:** And I want this capability to be detached from the fact

[29:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1749s) **Presenter:** that I still have a user to that organization.

[29:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1751s) **Presenter:** So instead of doing this on a schedule,

[29:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1753s) **Presenter:** I can create an HTTP webhook, an HTTP endpoint

[29:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1756s) **Presenter:** that would allow you that every time I hit that endpoint,

[29:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1760s) **Presenter:** this automation will run.

[29:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1761s) **Presenter:** And these endpoints typically use some sort of a hardcoded

[29:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1765s) **Presenter:** string as their secret.

[29:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1766s) **Presenter:** So you can connect to it from anywhere.

[29:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1768s) **Presenter:** We don't have to be authenticated.

[29:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1769s) **Presenter:** So again, this is very easy.

[29:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1771s) **Presenter:** And this is a snapshot from a different platform,

[29:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1775s) **Presenter:** Okay, so you see where I'm going with this.

[29:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1777s) **Presenter:** I'm going to try and create a more sophisticated persistency mechanism.

[29:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1781s) **Presenter:** So here's a laundry list of all of the things that I would like to do.

[29:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1784s) **Presenter:** So for full persistency, I would like to have the ability to run code remotely.

[29:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1792s) **Presenter:** That's obvious.

[29:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1793s) **Presenter:** I'd like to be able to run arbitrary payloads, not just one payload like you've seen a moment ago.

[29:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1798s) **Presenter:** So I'd like to be able to maintain access even if the user is revoked or deleted or whatever.

[30:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1805s) **Presenter:** Of course, avoid detection, avoid attribution, and I want to leave no logs behind.

[30:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1810s) **Presenter:** The question is, can I do this with low code?

[30:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1814s) **Presenter:** Okay, so this is the first version.

[30:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1816s) **Presenter:** We've already seen this.

[30:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1817s) **Presenter:** This is basically a persistency mechanism, this HTTP endpoint.

[30:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1822s) **Presenter:** Let's see what it covers and what it doesn't cover.

[30:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1825s) **Presenter:** So it does cover remote execution, right?

[30:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1828s) **Presenter:** I execute it remotely.

[30:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1830s) **Presenter:** This is a single payload, so we don't get arbitrary payloads.

[30:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1835s) **Presenter:** I can maintain access.

[30:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1836s) **Presenter:** You can see the, well, you might be able to see,

[30:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1839s) **Presenter:** the URL with the hard-coded secret there that allows me to actually go to this endpoint and trigger it.

[30:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1846s) **Presenter:** Avoiding detection, this is somebody else's cloud.

[30:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1848s) **Presenter:** You don't get logs on this endpoint.

[30:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1850s) **Presenter:** I mean, unless you're very sophisticated and try to do something kind of, well, not out of the box anyway.

[30:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1859s) **Presenter:** Avoiding attribution is easy

[31:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1860s) **Presenter:** because you can just call this root door.

[31:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1862s) **Presenter:** I mean, nobody's blocking you.

[31:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1863s) **Presenter:** There's nothing protecting.

[31:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1864s) **Presenter:** There's typically nothing sophisticated

[31:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1866s) **Presenter:** protecting this endpoint.

[31:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1868s) **Presenter:** And no logs, well, not at all.

[31:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1871s) **Presenter:** These platforms can generate a whole bunch of logs

### Defense Strategies and OWASP Low‑Code Guidance — Part 2

[31:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1873s) **Presenter:** for each application,

[31:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1874s) **Presenter:** for each execution of those automations.

[31:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1877s) **Presenter:** This is actually a problem in and of itself

[31:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1879s) **Presenter:** because the platforms can log actually the data

[31:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1882s) **Presenter:** that goes through these automations.

[31:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1884s) **Presenter:** So let's see if we can do something better.

[31:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1886s) **Presenter:** Here's a second attempt.

[31:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1888s) **Presenter:** So instead of having an HTTP endpoint

[31:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1891s) **Presenter:** that's going to use one payload,

[31:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1893s) **Presenter:** I'm just, I've created a bunch of payloads here.

[31:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1896s) **Presenter:** You can see leak SharePoint,

[31:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1900s) **Presenter:** ransomware SharePoint,

[31:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1901s) **Presenter:** execute a SQL stored procedure somewhere

[31:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1903s) **Presenter:** so you get the point.

[31:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1904s) **Presenter:** I can do whatever I want here with this.

[31:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1907s) **Presenter:** But again, I didn't really solve anything,

[31:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1909s) **Presenter:** not the arbitrary payloads and not the logs.

[31:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1911s) **Presenter:** So let's try and see how we can solve

[31:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1913s) **Presenter:** everything we wanted.

[31:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1915s) **Presenter:** Now the crucial piece in order to do this

[31:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1918s) **Presenter:** would be something which is the management features of those local platforms.

[32:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1925s) **Presenter:** So if you are trying to manage a local platform,

[32:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1930s) **Presenter:** what would be the best technology for you to do it with?

[32:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1934s) **Presenter:** Well, local, right?

[32:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1935s) **Presenter:** So you can build local applications to manage the local platforms themselves,

[32:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1941s) **Presenter:** which would require this interface, which is about management of these applications.

[32:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1948s) **Presenter:** to use the Power Automate Management connector,

[32:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1951s) **Presenter:** which allows me to create automations,

[32:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1954s) **Presenter:** delete automations, execute automations, et cetera.

[32:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1957s) **Presenter:** So here's a new tool I'm going to introduce to you today.

[32:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1960s) **Presenter:** What it's going to do is install a backdoor

[32:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1963s) **Presenter:** within an organization, within the Power Automate instance,

[32:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1966s) **Presenter:** if they're using Microsoft, which is kind of

[32:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1968s) **Presenter:** most organizations, and it will allow you to basically send

[32:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1972s) **Presenter:** every payload imaginable, execute it,

[32:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1979s) **Presenter:** Here's how it works.

[33:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1980s) **Presenter:** It has a single HTTP endpoint, which it installs.

[33:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1984s) **Presenter:** Behind that HTTP endpoint, I'm going to send the definition of the automation I'd like to build.

[33:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1993s) **Presenter:** So here's an automation.

[33:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=1995s) **Presenter:** Here's like a JSON file I need to send with all of the details about this automation.

[33:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2000s) **Presenter:** What this tool is actually going to do is it's going to create the automation, run the automation,

[33:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2005s) **Presenter:** and then delete the automation along with all of the logs of that specific automation.

[33:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2011s) **Presenter:** And it's going to do this one after the other.

[33:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2013s) **Presenter:** Of course, the tool also provides some convenience mechanisms for you.

[33:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2016s) **Presenter:** So we will handle errors and a whole bunch of things that you don't need to worry about it.

[33:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2021s) **Presenter:** So this is the final kind of automation that this tool will install on your target.

[33:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2028s) **Presenter:** And here's a kind of nice Python script around it because, well, we don't,

[33:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2032s) **Presenter:** where hackers or retimers usually prefer code to drag and drop.

[33:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2038s) **Presenter:** So you can use this.

[33:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2039s) **Presenter:** Again, this is what it does, what I just explained.

[34:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2043s) **Presenter:** It also allows you to continuously iterate through those connections,

[34:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2047s) **Presenter:** those existing connections.

[34:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2048s) **Presenter:** So if you'd like to use one of them, you can do it.

[34:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2051s) **Presenter:** Now, of course, the idea behind this kind of project

[34:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2057s) **Presenter:** is just to give you the tools

[34:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2059s) **Presenter:** so you can show inside of your organization just how risky this thing is

[34:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2064s) **Presenter:** and try to measure whether your defenses will help you here.

[34:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2068s) **Presenter:** So this is a tool to help you calibrate your defenses

[34:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2071s) **Presenter:** and also kind of get the mind show that you need to invest in this space.

[34:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2079s) **Presenter:** All right.

[34:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2079s) **Presenter:** So in terms of our laundry list, remote execution, well, of course,

[34:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2084s) **Presenter:** arbitrary payloads, I can send whatever automation I'd like here.

[34:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2087s) **Presenter:** So this is everything that can be done with Power Automate, but trust me, it's a pretty powerful platform.

[34:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2094s) **Presenter:** You can maintain access, of course.

[34:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2097s) **Presenter:** This is an HTTP endpoint.

[34:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2098s) **Presenter:** Avoid detection and attribution.

[35:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2100s) **Presenter:** We've talked about it.

[35:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2101s) **Presenter:** And logs, the main problem here is that once I delete the automation, the logs get deleted as well.

[35:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2106s) **Presenter:** So that leaves it at that.

[35:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2110s) **Presenter:** Okay.

[35:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2110s) **Presenter:** Okay, so we've seen how, and again, this went far and beyond what the APT group exactly did,

[35:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2118s) **Presenter:** but this was nothing sophisticated, right?

[35:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2121s) **Presenter:** Everything was kind of very basic.

[35:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2123s) **Presenter:** All right, so the last type of attacks I'd like to do, to show you today,

[35:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2128s) **Presenter:** is attacks that require nothing from the get-go,

[35:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2131s) **Presenter:** because everything I've shared up until now required some sort of initial access into an enterprise.

[35:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2137s) **Presenter:** Some account, could be a guest account, could be a low-privileged account,

[35:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2140s) **Presenter:** but it requires something.

[35:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2141s) **Presenter:** Now, what can I do with no access at all?

[35:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2145s) **Presenter:** So this is the world of kind of misconfiguration.

[35:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2149s) **Presenter:** And the number one thing you can think of,

[35:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2152s) **Presenter:** which I talked about at the beginning of this talk,

[35:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2155s) **Presenter:** was the OpenS3 bucket for AWS,

[35:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2158s) **Presenter:** which we've tried to solve for many years now.

[36:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2160s) **Presenter:** So AWS has actually this year produced some capabilities

[36:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2164s) **Presenter:** that are actually helping with this.

[36:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2166s) **Presenter:** But even if the default is fine,

[36:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2170s) **Presenter:** bucket with everybody, people can still make mistakes, right? So we're going to see how this

[36:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2175s) **Presenter:** pops up again in low code. Let's start with Microsoft. Microsoft has some, as an application,

[36:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2181s) **Presenter:** a type of application, a type of low code applications called PowerPorders or PowerPages.

[36:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2186s) **Presenter:** This is a low code application that is, that with the intention of being available to everybody on

[36:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2193s) **Presenter:** the internet. This is simply a website. And you use this, for example, for contractors that are

[36:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2197s) **Presenter:** arriving physically into your org, or people that are outside of your organization, they

[36:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2203s) **Presenter:** can register, they can view resources.

[36:45](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2205s) **Presenter:** Some resources in these websites are for administrators only, for example, but some of them are for

[36:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2211s) **Presenter:** everyone.

[36:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2212s) **Presenter:** So essentially, this is a website.

[36:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2214s) **Presenter:** It has a managed SQL server behind the scenes wrapped with an API.

[36:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2218s) **Presenter:** And so this, and one of the key features about, and this is how it looks like, it's like a

[37:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2223s) **Presenter:** very rudimentary website.

[37:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2225s) **Presenter:** One of the key features that this type of application creates for you is an API endpoint.

[37:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2231s) **Presenter:** You can spot it here.

[37:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2232s) **Presenter:** Replace portal with your own portal name.

[37:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2234s) **Presenter:** This API endpoint is always created for your portals.

[37:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2238s) **Presenter:** And it allows you to use the basically REST API to query everything behind the application.

[37:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2246s) **Presenter:** Of course, you should need to be authenticated in order to use this API.

[37:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2252s) **Presenter:** API. However, there are cases

[37:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2254s) **Presenter:** where you want data to be available to

[37:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2256s) **Presenter:** anonymous users. So users have just

[37:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2258s) **Presenter:** entered their website for the first time.

[37:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2260s) **Presenter:** You need them to be able to, I don't know,

[37:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2262s) **Presenter:** query images or something. So this

[37:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2264s) **Presenter:** needs to be a possibility, and so this

[37:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2266s) **Presenter:** endpoint is available to anonymous users

[37:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2268s) **Presenter:** as well. Alright.

[37:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2269s) **Presenter:** About a year and a half ago, the team

[37:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2272s) **Presenter:** at AppGuard discovered that the

[37:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2273s) **Presenter:** default setting for PowerPortal

[37:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2276s) **Presenter:** was for everything

[37:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2277s) **Presenter:** in the database to be available through this endpoint

[38:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2280s) **Presenter:** to anonymous users. Everything.

[38:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2282s) **Presenter:** Everything that is kind of administrative resources, everything.

[38:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2285s) **Presenter:** And this was the case for several years.

[38:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2287s) **Presenter:** By the way, I'm not sure that this is the case,

[38:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2292s) **Presenter:** but about six months later,

### Defense Strategies and OWASP Low‑Code Guidance — Part 3

[38:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2293s) **Presenter:** Microsoft did a rebranding of Power Portals to Power Pages

[38:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2297s) **Presenter:** with a high push on security,

[38:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2300s) **Presenter:** and they actually have done some work pretty quickly

[38:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2303s) **Presenter:** to change the default here

[38:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2304s) **Presenter:** and to help customers identify misconfigurations.

[38:27](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2307s) **Presenter:** But still, of course, people make mistakes.

[38:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2310s) **Presenter:** so one of the things we wanted to see

[38:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2313s) **Presenter:** is how many of these mistakes can we find

[38:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2316s) **Presenter:** and so here's our goal

[38:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2318s) **Presenter:** we're going to try to find misconfigurations

[38:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2321s) **Presenter:** misconfigured portal that expose these endpoints

[38:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2324s) **Presenter:** and this is a real example of a request

[38:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2327s) **Presenter:** of the response that you get when you query this endpoint

[38:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2330s) **Presenter:** you can see that this is basically a list of tables that I can query

[38:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2333s) **Presenter:** default has nothing interesting

[38:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2335s) **Presenter:** entity forms that is just where form submissions are being saved

[38:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2339s) **Presenter:** Global variables is an interesting one, right?

[39:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2342s) **Presenter:** And this is a real example from a large financial services company in the U.S.

[39:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2349s) **Presenter:** Here's what you get from global variables.

[39:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2351s) **Presenter:** You get authentication tokens, bearer tokens and authentication to Azure,

[39:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2357s) **Presenter:** API credentials to Azure.

[39:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2359s) **Presenter:** And, of course, this is, again, available to every organization.

[39:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2361s) **Presenter:** This was, of course, to everybody that queries the endpoint.

[39:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2365s) **Presenter:** This was, of course, disclosed and fixed.

[39:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2369s) **Presenter:** Now, the crucial, so we can see that there's a misconfiguration here.

[39:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2374s) **Presenter:** The other thing we need to see is, I mean, how do you find these things?

[39:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2378s) **Presenter:** How do you find these misconfigured portals?

[39:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2380s) **Presenter:** The problem is that it's very easy to find them

[39:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2383s) **Presenter:** because they are all in different subdomains in the same Microsoft domain.

[39:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2388s) **Presenter:** So just kind of a very basic subdomain enumeration,

[39:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2392s) **Presenter:** because this is Microsoft, I'm going to use Bing.

[39:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2394s) **Presenter:** Here's a quick subdomain enumeration for you.

[39:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2399s) **Presenter:** there are that are hosted on this platform.

[40:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2403s) **Presenter:** So again, there's an easy way for a hacker to iterate through all of those different

[40:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2411s) **Presenter:** portals and to scan them for this misconfiguration.

[40:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2414s) **Presenter:** It's very rudimentary.

[40:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2415s) **Presenter:** And when we did something like that in order to find all of the different vulnerable applications

[40:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2421s) **Presenter:** and then disclose them to the vendors, we found a whole bunch of information.

[40:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2425s) **Presenter:** You can see some of the types of the data we found here.

[40:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2429s) **Presenter:** there's more information in this link.

[40:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2431s) **Presenter:** Of course, we reached out to everybody that was infected.

[40:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2436s) **Presenter:** Okay.

[40:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2440s) **Presenter:** Let me show you one other example.

[40:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2444s) **Presenter:** So here's an example with Zapier.

[40:47](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2447s) **Presenter:** Zapier has this, Zapier runs automations,

[40:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2451s) **Presenter:** but these automations are stateless in nature,

[40:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2454s) **Presenter:** so you don't have any state that you can maintain.

[40:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2456s) **Presenter:** If you want state, if you need state inside of your automation, there's a service they have called Storage by Zapier.

[41:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2463s) **Presenter:** It's basically a key value storage.

[41:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2465s) **Presenter:** But the problem is that the secret behind it is a GUID.

[41:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2471s) **Presenter:** According to the documentation, it's a GUID.

[41:13](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2473s) **Presenter:** It's a GUID that the key that you need to provide for the storage is a random GUID.

[41:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2479s) **Presenter:** However, when we looked at the actual docs of the API, what you'll see here is that in the examples,

[41:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2486s) **Presenter:** are definitely not good.

[41:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2488s) **Presenter:** They are definitely not random.

[41:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2490s) **Presenter:** They are definitely not strong enough.

[41:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2492s) **Presenter:** And so we figured that, well, what the heck, let's try.

[41:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2496s) **Presenter:** Let's try and see whether we can find keys

[41:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2498s) **Presenter:** that are not these random goods.

[41:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2501s) **Presenter:** And bear in mind, the only thing you need to do

[41:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2503s) **Presenter:** in order to query this API, again, is to have that key.

[41:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2506s) **Presenter:** You don't need to be authenticated.

[41:50](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2510s) **Presenter:** Okay, so let's just try, for example, 1, 2, 3, 4, 5.

[41:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2513s) **Presenter:** We tried it, and of course it worked.

[41:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2516s) **Presenter:** So what we had there is, so you can see, I have an example, so I'll show them.

[42:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2522s) **Presenter:** Here's the message where the secret is incorrect.

[42:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2528s) **Presenter:** So you get the secret must be a valid UUID4, okay?

[42:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2532s) **Presenter:** Here's the message when it's correct, just a bunch of data.

[42:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2535s) **Presenter:** So we've got a bunch of information there, again, authentication tokens, API keys, emails.

[42:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2541s) **Presenter:** We simply use an enumeration attack, right?

[42:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2543s) **Presenter:** We just went through lists of common passwords and iterated through them.

[42:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2546s) **Presenter:** And actually when we went to Zapier with this and talked to them about it, what actually happened was that they initially didn't have any verification that the secret is actually a UUID4.

[42:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2559s) **Presenter:** Instead, they just told the user, hey, it's your responsibility.

[42:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2564s) **Presenter:** Please enter a good password.

[42:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2568s) **Presenter:** And so people used 1, 2, 3, 4, 5 like the docs say.

[42:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2572s) **Presenter:** Or they used password, password or whatever they used.

[42:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2577s) **Presenter:** And this was the case for several years.

[42:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2579s) **Presenter:** Until someone found it, they told Zapier about it.

[43:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2583s) **Presenter:** And Zapier's solution was to deal with every new secret out there.

[43:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2590s) **Presenter:** So today, if you use this platform, this feature, you have to use UID4.

[43:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2595s) **Presenter:** Well, but what about old passwords?

[43:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2598s) **Presenter:** These are still there.

[43:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2599s) **Presenter:** And by the way, they are still there today.

[43:23](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2603s) **Presenter:** So in some cases, people have stopped using them.

[43:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2606s) **Presenter:** kind of just a cleanup that is difficult to actually accomplish, and so this is still an

[43:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2611s) **Presenter:** active problem. All right. Here's a summary of what we've seen so far, and I have just one other

[43:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2622s) **Presenter:** thing to share with you today. And so we've seen that low code is a big thing, and it's a big thing

[43:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2628s) **Presenter:** in every organization, and I strongly encourage you, don't go into the place where you think it

[43:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2636s) **Presenter:** problem because you'll end up exactly where we ended up with bringing your own devices,

[44:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2640s) **Presenter:** solving it a few years too late. It's vastly underrated by security teams, and we actually

[44:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2646s) **Presenter:** don't have the right tools in our tool set to deal with this because we don't have the

[44:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2651s) **Presenter:** monitoring capabilities. There's no STLC. There's no way to do this manually. Business

[44:16](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2656s) **Presenter:** users are not security savvy, nor should they. There's a huge challenge for us to address

[44:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2661s) **Presenter:** here, and we need to be proactive about it. Attackers are already taking advantage of

[44:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2666s) **Presenter:** bunch of examples of living off the land attacks.

[44:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2669s) **Presenter:** Because these platforms operate as credential,

[44:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2672s) **Presenter:** like credential sharing as a service,

[44:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2674s) **Presenter:** they are basically the perfect place for a hacker to be at.

[44:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2678s) **Presenter:** And the permissions you need in order to gain access

[44:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2680s) **Presenter:** to these types of platforms in organizations are pretty low.

[44:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2684s) **Presenter:** You've seen hiding inside of those platforms,

[44:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2688s) **Presenter:** persistency mechanisms.

[44:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2689s) **Presenter:** Again, APTs have already used this.

[44:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2691s) **Presenter:** You've seen predictable misconfiguration.

[44:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2693s) **Presenter:** This is nothing new.

[44:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2694s) **Presenter:** We've seen this again and again with every important platform.

[44:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2697s) **Presenter:** This is just another one.

[44:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2698s) **Presenter:** And note that this is always about the platform saying that the choices are up to the user,

[45:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2705s) **Presenter:** that the platform has created a secure platform, but the user has to choose a good password.

### Defense Strategies and OWASP Low‑Code Guidance — Part 4

[45:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2710s) **Presenter:** The user has to choose the right permissions for their APIs.

[45:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2714s) **Presenter:** Of course, when it's easy to make mistakes, we make mistakes.

[45:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2719s) **Presenter:** And you've seen a couple of tools that I've shared here today.

[45:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2722s) **Presenter:** The very one is ZappGreds that allows you to identify these overshared credentials in Zapier.

[45:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2726s) **Presenter:** The other one is installing the backdoor in Microsoft 365 that you can play around with.

[45:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2731s) **Presenter:** I also encourage you, if you're interested, check out Google for no-code malware.

[45:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2736s) **Presenter:** You'll find a tool that allows you to use RPA basically as a malware for Windows 11.

[45:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2744s) **Presenter:** And now the last thing I'm going to finish with is actually defense.

[45:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2748s) **Presenter:** So what is the best way for us to approach it?

[45:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2754s) **Presenter:** The number one

[45:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2756s) **Presenter:** Okay, so there are a bunch of recommendations here

[45:58](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2758s) **Presenter:** But let me kind of narrow it down for you

[46:00](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2760s) **Presenter:** One thing that is pretty obvious

[46:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2762s) **Presenter:** Is that if you don't know what you need to protect

[46:05](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2765s) **Presenter:** You won't be able to protect it

[46:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2766s) **Presenter:** So I know it's a difficult thing to say

[46:11](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2771s) **Presenter:** But we need to inventory those applications

[46:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2774s) **Presenter:** We need to know who builds them

[46:15](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2775s) **Presenter:** We need to be able to have logs

[46:17](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2777s) **Presenter:** When something happens

[46:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2778s) **Presenter:** We need to be able to actually investigate it

[46:22](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2782s) **Presenter:** requires work. We need to work

[46:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2784s) **Presenter:** with the teams that are building those platforms,

[46:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2786s) **Presenter:** managing those platforms, search

[46:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2788s) **Presenter:** for them within your organizations, you'll find

[46:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2790s) **Presenter:** them. We need to be part

[46:32](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2792s) **Presenter:** of the conversation for low-code.

[46:34](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2794s) **Presenter:** And one other thing to say about that

[46:36](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2796s) **Presenter:** is that these people, they are,

[46:38](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2798s) **Presenter:** I mean, at least the people that are managing those

[46:40](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2800s) **Presenter:** platforms, they are aware of the risks, and

[46:42](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2802s) **Presenter:** they are afraid. They are afraid because they're alone

[46:44](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2804s) **Presenter:** and they don't have the security teams

[46:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2806s) **Presenter:** with them to guide them in that process.

[46:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2808s) **Presenter:** So be there to help them

[46:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2809s) **Presenter:** build it in a secure way,

[46:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2811s) **Presenter:** and they will appreciate it

[46:52](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2812s) **Presenter:** because they will be able to use the platform

[46:54](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2814s) **Presenter:** kind of more robustly.

[46:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2817s) **Presenter:** Review those configurations inside of those platforms.

[46:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2819s) **Presenter:** These platforms are creating HTTP endpoint on your behalf.

[47:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2822s) **Presenter:** They are exposing business data.

[47:04](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2824s) **Presenter:** You need to be able to control this.

[47:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2827s) **Presenter:** There are two specific configurations

[47:08](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2828s) **Presenter:** that I've shared in this talk

[47:10](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2830s) **Presenter:** that I strongly encourage you to look at.

[47:12](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2832s) **Presenter:** One is about connector uses,

[47:14](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2834s) **Presenter:** just kind of, and those open,

[47:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2839s) **Presenter:** endpoint, all data and storage.

[47:21](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2841s) **Presenter:** And the other is a bypass consent flow for Microsoft. Check out this one. It's really

[47:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2845s) **Presenter:** important. The number one resource that would help

[47:29](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2849s) **Presenter:** you if you want to be the champion of low-code security within

[47:33](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2853s) **Presenter:** your organization is the OWASP Top 10. This is a project that is

[47:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2857s) **Presenter:** dedicated to low-code, no-code apps and the types of problems that happen when

[47:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2861s) **Presenter:** business users are building those apps. This is different from the

[47:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2866s) **Presenter:** traditional

[47:46](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2866s) **Presenter:** OWASP top 10. It's focused on business logic.

[47:49](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2869s) **Presenter:** What these applications are actually doing.

[47:51](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2871s) **Presenter:** And it will give you concrete examples

[47:53](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2873s) **Presenter:** that were found across the

[47:55](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2875s) **Presenter:** industry of problems that

[47:57](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2877s) **Presenter:** were found. And also a language

[47:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2879s) **Presenter:** you can share with your business users

[48:01](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2881s) **Presenter:** and with your leaders to push this

[48:03](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2883s) **Presenter:** forward.

[48:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2886s) **Presenter:** That's

[48:07](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2887s) **Presenter:** everything I had. Thank you very much.

[48:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2889s) **Presenter:** Thank you.

[48:18](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2898s) **Presenter:** Yes?

[48:19](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2899s) **Presenter:** You have a question.

[48:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2900s) **Presenter:** Yeah?

[48:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2900s) **Presenter:** You mentioned that when you delete that automation flow,

[48:24](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2904s) **Presenter:** it leaves the logs.

[48:26](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2906s) **Presenter:** So there's no location where those logs would be stored?

[48:28](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2908s) **Presenter:** In the back, there's no permanent location?

[48:30](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2910s) **Presenter:** So there's no way to retrieve those?

[48:31](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2911s) **Presenter:** You can route those logs to a storage account that is separate,

[48:35](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2915s) **Presenter:** and then if the automation gets deleted,

[48:37](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2917s) **Presenter:** the logs won't get deleted,

[48:39](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2919s) **Presenter:** but it requires an action from your side,

[48:41](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2921s) **Presenter:** an administrative action.

[48:43](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2923s) **Presenter:** it doesn't come with the vanilla configuration

[48:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2928s) **Presenter:** yes

[48:48](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2928s) **Presenter:** only if you use a connector that is underlying

[48:56](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2936s) **Presenter:** under the surface using the graph API and then the new

[48:59](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2939s) **Presenter:** graph API login capabilities might help you

[49:02](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2942s) **Presenter:** but no, all of the power platform API that are being used

[49:06](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2946s) **Presenter:** here, they are not logged, again not by default

[49:09](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2949s) **Presenter:** yes

[49:20](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2960s) **Presenter:** again not by default if you want this to be part of your own kind of configuration of your

[49:25](https://www.youtube.com/watch?v=j0uUpsuUoFQ&t=2965s) **Presenter:** if you want your SOC to be able to monitor this you need to be active to be proactive
<!-- talk-enrichment:end -->
