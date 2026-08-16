---
title: "Credential Sharing as a Service: the Dark Side of No Code"
talk_date: 2023-03-28
conference: CodeFrenzy 2023
permalink: /talks/2023-03-28-codefrenzy-2023-credential-sharing-as-a-service-the-dark-side-of-no-code/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-03-28_CodeFrenzy_Credential_Sharing_as_a_Service_the_Dark_Side_of_No_Code/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-03-28_CodeFrenzy_Credential_Sharing_as_a_Service_the_Dark_Side_of_No_Code/slides.pdf
schedule_url: https://web.archive.org/web/20230325203549/https://codefrenzy.pl/#agenda
recording_url: https://www.youtube.com/watch?v=Nrc9dT-Gx3Y
github_urls:
  - label: ZapCreds
    url: https://github.com/mbrg/zapcreds
  - label: Powerful
    url: https://github.com/mbrg/powerful
description: "Why focus on heavily guarded crown jewels when you can dominate an organization through its shadow IT? Low-Code applications have become a reality in the enterprise, with surveys showing that most enterprise apps are now built outside of IT, with lacking…"
abstract_source_url: "https://owasp2023globalappsecdublin.sched.com/event/1FWLC/credential-sharing-as-a-service-the-dark-side-of-no-code"
abstract_retrieved_at: "2026-08-14"
abstract_source_scope: "same-talk-official-agenda"
abstract_source_conference: "OWASP Global AppSec Dublin 2023"
abstract_source_talk_slug: "2023-02-15-owasp-global-appsec-dublin-2023-credential-sharing-as-a-service-the-dark-side-of-no-code"
transcript_source_url: "https://www.youtube.com/watch?v=Nrc9dT-Gx3Y"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "10408a18389eb3aed366a504d2f3c0d232771f763497de317c941f12a22bd100"
---


<!-- talk-enrichment:start -->
## Abstract

Why focus on heavily guarded crown jewels when you can dominate an organization through its shadow IT? Low-Code applications have become a reality in the enterprise, with surveys showing that most enterprise apps are now built outside of IT, with lacking security practices. Unsurprisingly, attackers have figured out ways to leverage these platforms for their gain. In this talk, we demonstrate a host of attack techniques found in the wild, where enterprise No-Code platforms are leveraged and abused for every step in the cyber killchain. You will learn how attackers perform an account takeover by making the user simply click a link, move laterally and escalate privileges with zero network traffic, leave behind an untraceable backdoor, and automate data exfiltration, to name a few capabilities. All capabilities will be demonstrated with POCs, and their source code will be shared. Next, we will drop two isolation-breaking vulnerabilities that allow for privilege escalation and cross-tenant access. We will explain how these vulnerabilities were discovered and assess their pre-discovery impact. Finally, we will introduce an open-source recon tool that identifies opportunities for lateral movement and privilege escalation through low-code platforms.

_[Official agenda abstract for this talk, sourced from OWASP Global AppSec Dublin 2023](https://owasp2023globalappsecdublin.sched.com/event/1FWLC/credential-sharing-as-a-service-the-dark-side-of-no-code)_

## Transcript

> AI generated from recording.

### Introduction and Presenter Background

[00:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=16s) **Presenter:** All right. So let's get started.

[00:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=20s) **Presenter:** Kind of very briefly about myself. My name is Michael. I've been focused on security for low-code,

[00:30](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=30s) **Presenter:** four years now, or the intersection of those two worlds.

[00:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=32s) **Presenter:** I did an OWASP group that is dedicated to low-code,

[00:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=37s) **Presenter:** no-code applications and how we can build them in a secure way.

[00:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=40s) **Presenter:** I, so feel free to check it out later.

[00:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=44s) **Presenter:** I, a couple of years ago, I started a company that's focused on this area.

[00:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=48s) **Presenter:** It's called Xenity.

[00:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=49s) **Presenter:** We are helping organizations secure their own low-code, no-code applications.

[00:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=54s) **Presenter:** I spent several years at Microsoft as part of the cloud security division.

[01:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=60s) **Presenter:** all around security, API security, IoT, cloud, confidential computing.

[01:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=66s) **Presenter:** And I write in dark reading.

[01:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=69s) **Presenter:** So if anything, if you find these topics interesting,

[01:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=72s) **Presenter:** there's a bunch of information that I've also put out there.

[01:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=75s) **Presenter:** If anything in this lecture resonates with you,

[01:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=78s) **Presenter:** please feel free to reach out.

[01:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=80s) **Presenter:** You can see my contacts there.

[01:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=82s) **Presenter:** DMs are open on Twitter.

[01:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=85s) **Presenter:** So before I start, this is a really important slide.

[01:30](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=90s) **Presenter:** The reason, of course, to understand the attacker's perspective on local is just to make sure that we use it in a correct way.

[01:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=100s) **Presenter:** So local and local technologies are really empowering business users to solve their own problem.

### Low‑Code / No‑Code Fundamentals

[01:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=106s) **Presenter:** The impact it's having on enterprises is amazing.

[01:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=109s) **Presenter:** And so, of course, the idea behind this talk and this kind of research is to illuminate what the risks are to make sure that we do it in the right way, in a secure way.

[02:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=120s) **Presenter:** going to do today we're going to start by making sure that we're all on the same page on what low

[02:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=125s) **Presenter:** code actually is or what low code no code actually is um and we'll do that briefly later on we we are

[02:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=132s) **Presenter:** going to uh cover several attacks that were observed in the wild uh that were using low

[02:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=139s) **Presenter:** code no code as the way to as the attack factor the way to get in we'll see attacks that are uh

[02:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=145s) **Presenter:** living off the land of low code no code or using local no code for an attacker's advantage we'll

[02:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=151s) **Presenter:** see hiding within local local platforms and we'll see how we can leverage predictable misconfigurations

[02:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=156s) **Presenter:** in those platforms to gain access to corporate data of course we leave you with uh with a

[02:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=163s) **Presenter:** a couple of takeaways one is how to defend your organization what is the thing what are the things

[02:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=168s) **Presenter:** that you should be thinking of doing right when you uh when you leave today and we will give you

[02:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=175s) **Presenter:** allow you to test these capabilities and play around with them as part of your own red team arsenal.

[03:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=183s) **Presenter:** So let's start by making sure we are all on the same page on what low-code know could actually use.

[03:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=188s) **Presenter:** And before we show you, before we go into details, the more important part that I need to convince

[03:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=195s) **Presenter:** you of is that this is actually important, that this is an area that is critical for you to invest

[03:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=202s) **Presenter:** And I think the next slide is maybe the most important slide in this entire talk.

[03:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=208s) **Presenter:** This chart represents the growth in the number of applications, low-code, no-code applications, representing a single Fortune 500 organization.

[03:39](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=219s) **Presenter:** So these are, of course, anonymous statistics, but these represent real organizations from information that we're seeing with orgs that have shared this with the OWASP group.

[03:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=230s) **Presenter:** And you can see that very quickly, in something like three years, almost 70,000 applications will be.

[03:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=238s) **Presenter:** The reason behind this is that it's very easy to create applications because of the drag and drop interface.

[04:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=244s) **Presenter:** More people can create those applications because business users can do it, not just professional developers.

[04:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=250s) **Presenter:** And so you end up with a lot of applications.

[04:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=253s) **Presenter:** This exponential chart, we are seeing it again and again with organizations using low-code, no-code.

[04:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=260s) **Presenter:** If you compare this to professional applications developed with code, you'll find that the top organizations can generate 1,000, 2,000 applications per year.

[04:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=273s) **Presenter:** These numbers are unprecedented.

[04:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=276s) **Presenter:** And that's why this is important for us to take a look at.

[04:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=280s) **Presenter:** And so let's start now by kind of figuring out, making sure we're all on the same page on what low-code is.

[04:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=288s) **Presenter:** First of all, low code and no code has been brought into the world in order to address this problem where as a business user, you are typically under budgeted.

[05:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=302s) **Presenter:** You have lots of needs that are unanswered and IT cannot realistically cover all of those needs.

[05:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=310s) **Presenter:** So if each one of the applications that we just saw on the chart represents a single business need, of course, no IT group can really grow to satisfy that demand.

[05:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=320s) **Presenter:** And so people are looking to solve their own problems.

[05:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=325s) **Presenter:** Now, this is not new.

[05:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=327s) **Presenter:** People have been trying to empower business users to build their own applications, to solve their own problems.

[05:35](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=335s) **Presenter:** Ever since productivity and corporate started, I mean, we started.

[05:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=340s) **Presenter:** with things like macros, which are close friends

[05:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=344s) **Presenter:** as security professionals, all sorts of kind of screen grabbers.

[05:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=349s) **Presenter:** And today, this has kind of shifted and matured

[05:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=353s) **Presenter:** into applications that can be built with drag-and-drop interfaces,

[05:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=358s) **Presenter:** which is low-code, no-code.

[05:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=359s) **Presenter:** But it's important to know that this is part of a larger trend

### Risk Landscape and Attack Motivation

[06:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=362s) **Presenter:** of IT decentralization, giving more people more power

[06:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=366s) **Presenter:** to build applications and automations.

[06:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=370s) **Presenter:** building with these technologies? Well, they're building a whole bunch of things. So they are

[06:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=375s) **Presenter:** building automation. So for example, if I get a new email or if somebody mentions me on Slack,

[06:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=382s) **Presenter:** then do something else. For example, upload something in Teams. They can do integration.

[06:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=388s) **Presenter:** So for example, moving data from one place to another. They can build business applications

[06:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=393s) **Presenter:** that facilitate a specific process. So for example, if you'd like to do a campaign across

[06:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=400s) **Presenter:** organization to collect information from different users in the org, you can do that through a bit.

[06:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=405s) **Presenter:** There are entire products, customer-facing products that are built with low-code, no-code because of its ability to operate faster.

[06:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=412s) **Presenter:** There are more mobile applications. These applications can be very advanced.

[06:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=417s) **Presenter:** And one of the things you should be asking yourself right now is, well, is it related to my org?

[07:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=424s) **Presenter:** So do we use low-code, no-code?

[07:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=428s) **Presenter:** Does the typical organization use low-code, no-code?

[07:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=431s) **Presenter:** And the answer is that in most organizations,

[07:14](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=434s) **Presenter:** you'll find more than one no-code, low-code platform.

[07:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=438s) **Presenter:** And the reason behind this is not that each organization

[07:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=441s) **Presenter:** has to choose using those platforms.

[07:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=444s) **Presenter:** Essentially, every major SaaS provider

[07:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=447s) **Presenter:** has now become a low-code, no-code platform.

[07:30](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=450s) **Presenter:** So if you're using Microsoft Office 365,

[07:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=454s) **Presenter:** if you're using ServiceNow.

[07:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=456s) **Presenter:** All of those platforms are now embedded

[07:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=460s) **Presenter:** with low-code, no-code capabilities

[07:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=462s) **Presenter:** that are built on top of the business data

[07:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=464s) **Presenter:** that already sits there.

[07:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=465s) **Presenter:** And they are empowering business users,

[07:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=468s) **Presenter:** first of all, to customize their experience

[07:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=469s) **Presenter:** in those platforms, but also to build things

[07:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=472s) **Presenter:** on top of that.

[07:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=473s) **Presenter:** So you can build applications in Salesforce

[07:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=475s) **Presenter:** that are not related to sales.

[07:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=477s) **Presenter:** You can build applications in Microsoft Power Platform

[08:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=480s) **Presenter:** that are fetching data from AWS, so from GCP.

[08:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=484s) **Presenter:** And so this has become a new type of cloud.

[08:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=488s) **Presenter:** This is available, again, in every major organization.

[08:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=490s) **Presenter:** This is what makes this super important,

[08:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=493s) **Presenter:** because no matter your org, if you're a large enough org,

[08:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=497s) **Presenter:** you'll see you're probably using those platforms.

[08:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=502s) **Presenter:** And more than that, in a typical organization,

[08:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=504s) **Presenter:** we typically see between five and seven different local-nocal platforms

[08:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=509s) **Presenter:** that are actually being used.

[08:30](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=510s) **Presenter:** And so when we think about those platforms, one thing to understand or to think about is what is actually going on there.

[08:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=522s) **Presenter:** So first of all, these applications we've seen that they are available in every major enterprise.

[08:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=526s) **Presenter:** They have access to business data because they are kind of by definition, they are built on top of business data platforms.

[08:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=534s) **Presenter:** They are built on top of your Salesforce or your ServiceNow or Microsoft.

[08:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=537s) **Presenter:** They run as a SaaS in the SaaS providers cloud.

[09:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=543s) **Presenter:** So it's difficult to monitor from our perspective as security professionals.

[09:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=547s) **Presenter:** And of course, from the security perspective, there is lacking information or lacking focus on this area, which makes it a good place for hackers to focus on.

[09:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=558s) **Presenter:** And this is what we're going to see today.

[09:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=563s) **Presenter:** All right.

[09:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=564s) **Presenter:** So we're going to, in a moment, we're going to start seeing real-world attacks that we're observed in the wild.

[09:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=573s) **Presenter:** And we'll start with the living-of-the-land attacks.

[09:35](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=575s) **Presenter:** So attacks where, if you think about the recap we've just did, these are platforms that have compute.

[09:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=582s) **Presenter:** They have access to credentials and data.

[09:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=586s) **Presenter:** And they run on somebody else's cloud, which is kind of the perfect storm for living-of-the-land attack.

[09:51](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=591s) **Presenter:** So we'll see that in a moment.

[09:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=594s) **Presenter:** Let me show you one concrete example of a low-code application so we can just make sure that we have something to think about when we go through the next phases of watching attacks.

[10:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=608s) **Presenter:** So this is a very simple application.

[10:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=613s) **Presenter:** basically what I'm doing here is that we're using Slack in my org and then there's this thing where

[10:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=619s) **Presenter:** if somebody mentions you on a public channel in Slack then you feel obliged to reply quickly

### Living‑of‑the‑Land Attacks and Credential Leakage

[10:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=627s) **Presenter:** so in this kind of funny little lemmo I'm creating an automation that subscribe to every new mention

[10:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=634s) **Presenter:** of my account in Slack and whenever I get mentioned I'm going to change my status so people

[10:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=642s) **Presenter:** I'm on a call as if I'm currently in a meeting the icon next to my name will change so people

[10:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=649s) **Presenter:** will know that I'm occupied and they should not bother me right now and then just to make sure

[10:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=654s) **Presenter:** they're not suspicious a few minutes later I'm going to change my status back to be available

[11:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=660s) **Presenter:** now this is a kind of a funny joke right that is that is meant as an example but you can see that

[11:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=668s) **Presenter:** while i'm explaining what this application actually does on the background here i'm actually

[11:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=673s) **Presenter:** building this application and this is a very uh easy process to to to create so you can see i'm

[11:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=680s) **Presenter:** dragging and dropping uh you uh you can note that i'm not logging in anywhere so i will touch

[11:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=686s) **Presenter:** briefly on that in a moment but you can see that the application has a few steps each of these

[11:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=692s) **Presenter:** steps is operating or is creating a specific operation some of them are managed within this

[11:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=698s) **Presenter:** particular platform's api and others are fetch are going out to the slack api to actually fetch

[11:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=704s) **Presenter:** information from that api so again i uh the first step is uh subscribing to new mentions in slack

[11:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=710s) **Presenter:** then i'm going i'm changing my icon as if i'm on a call i i use a delay step to make sure that

[11:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=718s) **Presenter:** to wait a few minutes.

[12:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=720s) **Presenter:** And then once those minutes pass,

[12:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=722s) **Presenter:** I change my status back to a regular status.

[12:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=726s) **Presenter:** And once I have gone through all of that,

[12:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=729s) **Presenter:** you can see that the,

[12:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=731s) **Presenter:** let me move a bit,

[12:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=735s) **Presenter:** push this forward a bit.

[12:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=741s) **Presenter:** All right.

[12:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=741s) **Presenter:** So the last thing that I wanted you to see,

[12:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=747s) **Presenter:** we'll see it later, is the fact that once you go through all of that,

[12:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=753s) **Presenter:** the application is actually being deployed.

[12:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=756s) **Presenter:** So once the entire process is terminated, I just click save,

[12:41](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=761s) **Presenter:** and the application is deployed, and that's it.

[12:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=762s) **Presenter:** There's no CICD, there's no pipeline, there's no security review, nothing.

[12:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=767s) **Presenter:** And so the number one thing that is interesting about this application,

[12:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=772s) **Presenter:** so maybe, okay, let's take a step back.

[12:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=774s) **Presenter:** it's important to note how sophisticated this application actually is so it's it has to fetch

[13:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=782s) **Presenter:** information from different apis and address those changes to those apis it has to authenticate it has

[13:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=790s) **Presenter:** to wait around in the background it has to subscribe to a webhook this is a sophisticated

[13:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=796s) **Presenter:** piece of software that you can build without any any knowledge of professional development

[13:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=804s) **Presenter:** The number one thing that is interesting from our perspective as a security professional is under which identity is this application actually operating?

[13:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=816s) **Presenter:** So when it reaches out to Slack, how does it look like from the Slack perspective?

[13:41](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=821s) **Presenter:** How do the network logs that are being generated by that action, how do they do?

[13:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=825s) **Presenter:** And you can see that I haven't really authenticated to Slack in any stage at that demo.

[13:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=832s) **Presenter:** So what really happened here?

[13:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=833s) **Presenter:** So here's what happened.

[13:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=834s) **Presenter:** When you first connect a new application to Zapier or to any other local local platform, you get prompted with the usual O of concept flow.

[14:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=842s) **Presenter:** And you can see it right here.

[14:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=844s) **Presenter:** Now, when you terminate that concept flow, you, of course, get an authentication token.

[14:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=849s) **Presenter:** The authentication token gets wrapped in an object called connection.

[14:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=853s) **Presenter:** And the most interesting part about this connection is that little share button that you're seeing here.

[14:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=858s) **Presenter:** So local non-code platforms allow users to share those authenticated sessions with other users and embed those sessions within the automations and the applications that they create.

[14:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=872s) **Presenter:** This means that if you look at it from the network perspective, there's no application there.

[14:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=877s) **Presenter:** It's actually using my own personal identity when connecting to Slack.

[14:41](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=881s) **Presenter:** So let's try and figure out how this happens.

[14:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=885s) **Presenter:** So on the one side, we have Zapier or any other local local platform.

[14:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=889s) **Presenter:** This is actually a slide from Microsoft showing how power platform, Microsoft's local local platform is operating.

[14:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=899s) **Presenter:** And on the other side, you have Slack and the REST API.

[15:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=901s) **Presenter:** So essentially what happens is that in the middle there, there's an API layer, an API gateway layer that dynamically switches the tokens for those that belong to a user.

[15:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=915s) **Presenter:** So an automation runs or an application runs.

[15:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=918s) **Presenter:** And when they run the connection to Slack, my user token gets embedded there.

[15:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=926s) **Presenter:** Now the crucial piece here is that I can share this automation with other users.

[15:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=931s) **Presenter:** users are still using my personal token and there's no way to distinguish between the two

[15:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=936s) **Presenter:** and so because um and one of the things that you'll find in in those local local platforms

[15:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=943s) **Presenter:** is a whole bunch of of of connection or a whole bunch of automation so you've seen the graph uh

[15:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=949s) **Presenter:** when we started these are just a few examples that are taken out of the uh of platform marketplaces

[15:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=957s) **Presenter:** for types of applications that are being built.

[16:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=961s) **Presenter:** And the important thing here is to watch the icons.

[16:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=965s) **Presenter:** These icons represent connections to data

[16:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=967s) **Presenter:** or ability to perform operations on behalf of users.

[16:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=971s) **Presenter:** And so there are lots of logos here.

[16:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=973s) **Presenter:** There are lots of applications.

[16:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=975s) **Presenter:** So this means eventually you'll have lots of credentials.

[16:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=978s) **Presenter:** You have a tray of credentials that are waiting around

[16:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=981s) **Presenter:** in these local, local platforms.

[16:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=983s) **Presenter:** And it looks something like this.

[16:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=987s) **Presenter:** a screenshot for one of the platforms,

[16:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=989s) **Presenter:** you can see that the platforms can connect

[16:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=992s) **Presenter:** in to many different places.

[16:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=994s) **Presenter:** This is basically a bag of credential

[16:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=998s) **Presenter:** waiting for somebody to log in.

[16:41](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1001s) **Presenter:** And you can see that this is connecting way across

[16:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1004s) **Presenter:** the specific platform that you are using.

[16:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1008s) **Presenter:** So if you're using Microsoft, if you're using Salesforce,

[16:51](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1011s) **Presenter:** it is not contained,

[16:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1012s) **Presenter:** if you're not the local local platform

### Persistence via Low‑Code Platforms

[16:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1014s) **Presenter:** is not contained only to data that is sitting within that platform.

[16:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1019s) **Presenter:** It can connect to other places.

[17:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1021s) **Presenter:** And many of those platforms have hundreds of connectors

[17:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1025s) **Presenter:** that are ready for you to connect on-prem, cloud, other SaaS.

[17:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1030s) **Presenter:** Data and operations are available.

[17:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1033s) **Presenter:** And so in many of these platforms,

[17:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1036s) **Presenter:** you also have a notion of a default environment,

[17:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1040s) **Presenter:** some place, some default scope container

[17:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1044s) **Presenter:** contains all of the applications that are being created.

[17:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1047s) **Presenter:** And in this default environment,

[17:30](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1050s) **Presenter:** you end up having lots of shared credentials.

[17:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1053s) **Presenter:** Again, these are real examples of a few platforms.

[17:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1058s) **Presenter:** And you can see that, of course, as a hacker,

[17:41](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1061s) **Presenter:** this is kind of a very basic privilege escalation, right?

[17:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1066s) **Presenter:** Once I have a user for the credentials for a specific user

[17:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1070s) **Presenter:** and I log into one of those platforms, it's Jackpot.

[17:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1072s) **Presenter:** and this is why we are calling this credentials

[17:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1075s) **Presenter:** as a service because this is essentially

[17:56](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1076s) **Presenter:** what the platforms have built.

[17:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1079s) **Presenter:** And so this is the first thing

[18:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1081s) **Presenter:** that I wanted to show you

[18:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1083s) **Presenter:** and we'll see this again and again

[18:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1084s) **Presenter:** when hackers are leveraging the fact

[18:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1086s) **Presenter:** that they own an account

[18:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1089s) **Presenter:** for a specific user.

[18:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1091s) **Presenter:** They log in on behalf of that user

[18:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1093s) **Presenter:** to the local network platform

[18:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1095s) **Presenter:** and they are presented

[18:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1096s) **Presenter:** with a bunch of connections that they can use.

[18:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1099s) **Presenter:** They can be connections

[18:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1102s) **Presenter:** for other users as well.

[18:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1105s) **Presenter:** So that's kind of the first thing I wanted to show you.

[18:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1108s) **Presenter:** The next step, you can also use those connections

[18:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1111s) **Presenter:** to perform actions.

[18:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1113s) **Presenter:** And so here's a very simple example,

[18:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1117s) **Presenter:** a ransomware attack being done completely

[18:41](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1121s) **Presenter:** with low code, no code.

[18:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1122s) **Presenter:** So this is a very simple automation.

[18:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1124s) **Presenter:** I trigger it manually,

[18:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1125s) **Presenter:** and then I iterate over a SharePoint site.

[18:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1129s) **Presenter:** and each one of the files in that SharePoint site,

[18:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1133s) **Presenter:** I'm going to use an encryption function

[18:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1135s) **Presenter:** that is actually provided by the platform itself

[18:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1137s) **Presenter:** to encrypt that file

[18:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1139s) **Presenter:** and replace the original file with the encrypted version.

[19:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1143s) **Presenter:** And again, this is very simple.

[19:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1144s) **Presenter:** You can see that I've built this automation with drag and drop.

[19:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1147s) **Presenter:** And of course, you might be recognizing a specific platform here,

[19:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1151s) **Presenter:** but this actually works across different types of platforms.

[19:14](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1154s) **Presenter:** So again, this is a very easy way for hackers

[19:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1157s) **Presenter:** to accomplish their goals without actually writing any line of code.

[19:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1161s) **Presenter:** And remember that this is operating on the cloud providers,

[19:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1167s) **Presenter:** on the SaaS providers cloud,

[19:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1169s) **Presenter:** so it would be very difficult to actually identify.

[19:39](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1179s) **Presenter:** Next up, you don't have to stop with actually creating damage.

[19:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1187s) **Presenter:** outside of the organization.

[19:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1188s) **Presenter:** This is an example which is very, very common.

[19:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1192s) **Presenter:** I can't tell you how many organizations that I've worked with.

[19:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1194s) **Presenter:** I saw, we spotted this example quickly.

[19:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1199s) **Presenter:** Basically, there are a bunch of tools out there that organizations have

[20:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1203s) **Presenter:** to protect themselves from data exfiltration.

[20:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1206s) **Presenter:** So you can find DLP, you can try to create DLP on the network level,

[20:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1210s) **Presenter:** on the email server level.

[20:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1213s) **Presenter:** These solutions are great, but they can easily be bypassed with low-code, no-code.

[20:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1218s) **Presenter:** Here's what's going on here.

[20:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1220s) **Presenter:** There are two separate connections to email.

[20:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1223s) **Presenter:** One connection is using a corporate account.

[20:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1226s) **Presenter:** Another connection is using a personal account.

[20:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1228s) **Presenter:** And now, instead of forwarding data between the corporate account and the personal account,

[20:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1234s) **Presenter:** which would be flagged by a DLP solution,

[20:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1236s) **Presenter:** the data is simply being copied from one connection to the other.

[20:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1242s) **Presenter:** This is being copied in the SaaS platform.

[20:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1245s) **Presenter:** So there's no way for your DLP solution to actually solve it.

[20:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1248s) **Presenter:** No data is actually being moved on the network.

[20:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1250s) **Presenter:** So if you would look at it from an X-Force perspective,

[20:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1252s) **Presenter:** on one hand, you'll see the local, no-code platform

[20:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1255s) **Presenter:** reaching out to the corporate data.

[20:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1257s) **Presenter:** And on the other, you'll see the same platform reaching out

[21:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1260s) **Presenter:** to personal data.

[21:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1261s) **Presenter:** But you wouldn't know that these two connections

[21:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1263s) **Presenter:** are actually related.

[21:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1264s) **Presenter:** And that's what's going on here.

[21:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1265s) **Presenter:** This allows users to very easily and trivially bypass

[21:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1270s) **Presenter:** data exfiltration controls.

[21:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1273s) **Presenter:** One other thing you can do here is you can actually move to on-prem, to on-prem to people's machines.

[21:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1281s) **Presenter:** So low-code, no-code has a version of it that is typically run on a user's laptop, which is called RPA.

[21:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1288s) **Presenter:** RPA is about automating the keyboard, the mouse, so emulating a user on a user's machine in order to mostly integrate with legacy systems.

[21:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1298s) **Presenter:** This also means that some of those connections that are stored on the cloud providers, SAS service allow you to execute code on the user's own machine.

[21:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1309s) **Presenter:** And I actually gave a talk at DEFCON about the kind of last DEFCON on how these abilities can be used to power a malware operation.

[21:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1318s) **Presenter:** You feel free to check it out.

[22:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1321s) **Presenter:** And so all of the things that I've just showed here

[22:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1326s) **Presenter:** are part of the usual assessment that I help customers do at OWASP.

[22:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1331s) **Presenter:** And so one of the things that I wanted to do in order to help people experience this

[22:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1337s) **Presenter:** is just create some sort of a tool that allows you to do it yourself.

[22:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1344s) **Presenter:** And so I'd like to introduce you to ZapGrid.

[22:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1347s) **Presenter:** It's a very simple script.

[22:30](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1350s) **Presenter:** in the address here.

[22:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1352s) **Presenter:** And what it does is very simple.

[22:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1354s) **Presenter:** You give it a user name and a user credentials

[22:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1357s) **Presenter:** to one of those platforms, to Zapier,

[22:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1360s) **Presenter:** and it will reach out to the platform

[22:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1362s) **Presenter:** and fetch for you all of the different connections

[22:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1364s) **Presenter:** that are available for you to use.

[22:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1365s) **Presenter:** And it will also show you, as you can see,

[22:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1368s) **Presenter:** which credentials are being used by the connection,

[22:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1370s) **Presenter:** whether they are the credentials of the users

[22:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1372s) **Presenter:** that you provided or some other user,

[22:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1374s) **Presenter:** which is an overshot.

[22:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1377s) **Presenter:** And again, I encourage you to use this tool

[23:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1380s) **Presenter:** your teammates and also to play around and understand yourself uh how do these things operate

[23:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1386s) **Presenter:** okay so we've seen what you can do with existing connections what the next logical step is how can

[23:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1395s) **Presenter:** we make how can we uh full users how can we push users to uh to be to create connections so if uh

[23:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1403s) **Presenter:** every connection that is available on those platforms is available for me as a hacker to use

[23:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1406s) **Presenter:** the next logical step is for me to entice them to actually create more connections.

[23:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1414s) **Presenter:** And so here's the idea.

[23:35](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1415s) **Presenter:** I set up an application that does something useful.

[23:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1418s) **Presenter:** An application could be, for example, I'll show you in a moment,

[23:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1422s) **Presenter:** but what I'm going to do is take an application from the Microsoft Marketplace.

[23:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1427s) **Presenter:** This would be a simple application that creates an out-of-office arrangement.

[23:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1432s) **Presenter:** So I tell it when I need to be out of office, and it will decline invites for me.

### Predictable Misconfigurations and External Exposure — Part 1

[23:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1437s) **Presenter:** that application ends up creating connections on the fly.

[24:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1440s) **Presenter:** It needs access to people's emails.

[24:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1442s) **Presenter:** And so it creates that connection when people log in.

[24:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1445s) **Presenter:** Now, I'm going to entice users to users

[24:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1448s) **Presenter:** because it's going to be useful.

[24:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1449s) **Presenter:** But of course, while the application is running,

[24:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1452s) **Presenter:** I have access to their connection.

[24:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1453s) **Presenter:** And so I can use it for my malicious purposes as well.

[24:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1459s) **Presenter:** Let's see that in action.

[24:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1468s) **Presenter:** All right, so I'm going to the Microsoft Office Marketplace.

[24:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1473s) **Presenter:** I'm going to choose the out-of-office application.

[24:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1476s) **Presenter:** Again, this is a simple application.

[24:39](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1479s) **Presenter:** What it's going to do is, first of all, ask me for connections.

[24:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1482s) **Presenter:** You can see, and I'll show you this.

[24:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1485s) **Presenter:** I'll get back to this in a moment.

[24:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1486s) **Presenter:** So the application is now created.

[24:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1488s) **Presenter:** You can see that I play around with this application.

[24:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1492s) **Presenter:** Essentially, you tell it when you're out-of-office.

[24:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1494s) **Presenter:** You choose a bunch of parameters.

[24:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1497s) **Presenter:** be forwarded to, and it will accomplish a lot of that for you.

[25:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1501s) **Presenter:** So it will deny current events and auto-forward your email.

[25:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1506s) **Presenter:** What I'm going to do is simply insert a very small,

[25:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1511s) **Presenter:** kind of a one-liner where I'm using the connection to email,

[25:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1515s) **Presenter:** in this case, to send myself an email saying,

[25:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1519s) **Presenter:** oops, I've been pwned.

[25:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1522s) **Presenter:** Essentially, this is business email compromise,

[25:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1524s) **Presenter:** but of course I'm not going to do anything very malicious in here.

[25:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1529s) **Presenter:** And so you can see me typing pretty slowly.

[25:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1533s) **Presenter:** Once I finish typing, you'll find that, again, this is a very simple one-liner.

[25:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1545s) **Presenter:** Once I'm done, what I'm going to do is save this application.

[25:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1548s) **Presenter:** Again, save means deploy.

[25:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1550s) **Presenter:** and you can see it's fine, I've saved it

[25:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1554s) **Presenter:** and now I'm going to, this creates

[25:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1557s) **Presenter:** a URL at Microsoft

[26:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1561s) **Presenter:** I'm sharing this application with the entire

[26:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1565s) **Presenter:** organization because well, why not? And you can see that I'm copying the link here

[26:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1569s) **Presenter:** this link is running on a Microsoft domain

[26:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1573s) **Presenter:** and now from a different user, I'm going to go into this application

[26:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1577s) **Presenter:** Once I log in, it asks me to allow access to specific connections that it needs.

[26:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1584s) **Presenter:** And then once I'm in that application, I'm a user, I can use this application,

[26:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1588s) **Presenter:** and you can see that my email has been compromised.

[26:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1593s) **Presenter:** And so this is an interesting application

[26:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1603s) **Presenter:** where you can basically own a user's credentials

[26:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1607s) **Presenter:** while they use the application.

[26:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1610s) **Presenter:** Now, so before I move to the next part,

[26:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1615s) **Presenter:** what I want you to think about is that, of course,

[26:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1618s) **Presenter:** it's true that every application that uses some sort of connection

[27:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1623s) **Presenter:** actually has access to that connection while it runs.

[27:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1627s) **Presenter:** But the crucial piece here is that the people that are building this application

[27:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1633s) **Presenter:** This is not sophisticated at all.

[27:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1635s) **Presenter:** You can, every business user can do it.

[27:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1637s) **Presenter:** And more than that, it is hosted on a Microsoft domain.

[27:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1640s) **Presenter:** So imagine a scenario where somebody in your organization that you don't know sends you a link to an application.

[27:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1647s) **Presenter:** This application, the link is on a domain that belongs to Microsoft.

[27:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1652s) **Presenter:** So the chances of you clicking that link are pretty high.

[27:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1656s) **Presenter:** And once you click that link, what you get is this approval window.

[27:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1660s) **Presenter:** You can see that this is not the typical OWL consent approval window, right?

[27:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1665s) **Presenter:** It doesn't tell you which permissions it's going to use

[27:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1668s) **Presenter:** or which application is going to use it

[27:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1670s) **Presenter:** because this is essentially a full-scoped connection

[27:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1675s) **Presenter:** to across all of the different services,

[27:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1677s) **Presenter:** so across your Office 365, across Office 365 users,

[28:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1681s) **Presenter:** which is actually Microsoft Graph behind the scene.

[28:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1683s) **Presenter:** Once I click on Allow, the application can do much more

[28:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1687s) **Presenter:** than what I think I thought it would do.

[28:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1690s) **Presenter:** an out-of-office application it should for example decline my emails my calendar invites but as you

[28:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1696s) **Presenter:** can as you've seen i can also use it to do other things and so the the the only thing that is

[28:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1703s) **Presenter:** disturbing for me here as a hacker is the fact that this there's this approval window so this is

[28:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1709s) **Presenter:** a two steps where the first step in order to compromise somebody's email the first step i

[28:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1714s) **Presenter:** need to do is to get them to click on a link that belongs to microsoft and the second step is that

[28:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1720s) **Presenter:** can we skip the second step?

[28:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1723s) **Presenter:** The unfortunate answer is that this is actually provided by Microsoft.

[28:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1728s) **Presenter:** So there's a way for admins to set a flag which removes this window

[28:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1733s) **Presenter:** across the entire tenant that this is being done for productivity reasons.

[29:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1741s) **Presenter:** And so, of course, if this is the case in your organization,

[29:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1745s) **Presenter:** This is the one-click action that is required from users in order to compromise their identity, again, on a Microsoft domain.

[29:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1757s) **Presenter:** All right.

[29:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1758s) **Presenter:** So next up, we understand how much damage you could do with accessing local and local platform.

[29:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1768s) **Presenter:** And then the next question is, how do we persist or how can hackers persist within those local local platforms?

[29:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1776s) **Presenter:** And what I'm going to do in this section is follow a single case that was published about two years ago,

[29:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1784s) **Presenter:** where an APT group used Microsoft's power platform.

[29:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1789s) **Presenter:** So the local local platform around office to persist within a network for more than six months while defenders were looking for them.

[29:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1799s) **Presenter:** The scenario here is that they have compromised an admin, an IT admin for the network, a global admin, and instead of installing something on their laptop or moving laterally through the network, they created an automation that used e-discovery tools to find passwords and sensitive information and then just send it off to an exfiltration endpoint.

[30:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1823s) **Presenter:** And that automation was still up and running six months in because nobody was thinking about looking at that particular area.

[30:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1831s) **Presenter:** And you can use this link here to actually learn more about that case.

[30:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1834s) **Presenter:** So let's try to see how it can work.

[30:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1838s) **Presenter:** So here's a very kind of a, this is basically a reproduction of what happened in this attack.

[30:45](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1845s) **Presenter:** So there's a flow here that runs on a recurrence or on a specific frequency.

[30:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1850s) **Presenter:** It lists an entire SharePoint site.

[30:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1853s) **Presenter:** of the SharePoint files.

### Predictable Misconfigurations and External Exposure — Part 2

[30:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1855s) **Presenter:** It dumps the entire encrypted SharePoint file

[30:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1858s) **Presenter:** on Pastebin,

[31:00](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1860s) **Presenter:** and then it tweets about it

[31:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1862s) **Presenter:** because why not?

[31:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1863s) **Presenter:** Nobody will find me anyway.

[31:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1865s) **Presenter:** And so this is a nice example

[31:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1867s) **Presenter:** of kind of the same thing

[31:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1871s) **Presenter:** that happens with attackers.

[31:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1872s) **Presenter:** Let's try to take it one level farther.

[31:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1877s) **Presenter:** So instead of running this on a recurrence,

[31:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1879s) **Presenter:** let's run this with an HTTP webhook

[31:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1883s) **Presenter:** just trigger this whenever I want to then I hack it and and one of the things that you'll find is

[31:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1888s) **Presenter:** that these these webhooks that are put out there by those platforms are actually not authenticated

[31:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1893s) **Presenter:** so there's a secret you need to know in order to which is created once you create your webhook

[31:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1898s) **Presenter:** but that's it and so you can fetch it from from toro or wherever you'd like so again

[31:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1904s) **Presenter:** this is a slight improvement on what you've already seen and so now that we are that we

[31:51](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1911s) **Presenter:** that we've gone one step further,

[31:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1912s) **Presenter:** let's try to think what do we need

[31:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1914s) **Presenter:** in order to persist?

[31:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1915s) **Presenter:** As a hacker,

[31:56](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1916s) **Presenter:** what are all of the things that we need

[31:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1918s) **Presenter:** in order to actually persist in an organization?

[32:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1921s) **Presenter:** So the first thing we need is remote execution,

[32:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1925s) **Presenter:** which is kind of obvious.

[32:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1926s) **Presenter:** The second thing is that we need to create,

[32:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1928s) **Presenter:** we would like to be able to run arbitrary payload.

[32:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1931s) **Presenter:** So not just a single payload,

[32:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1933s) **Presenter:** but every type of payload that we would like.

[32:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1935s) **Presenter:** We would like to maintain access

[32:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1937s) **Presenter:** even if the user we initially compromised

### Summary of Threats and Detection Opportunities

[32:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1939s) **Presenter:** is no longer available.

[32:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1941s) **Presenter:** We'd like to avoid detection.

[32:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1943s) **Presenter:** And in case we get detected, we'd like to avoid attribution.

[32:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1946s) **Presenter:** And we want to leave no log behind.

[32:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1948s) **Presenter:** Let's see how an attacker could accomplish all of that with local no-code.

[32:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1952s) **Presenter:** So first of all, let's see what we already have, what we had in the previous example.

[32:39](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1959s) **Presenter:** And so this HTTP webhook is, of course, a persistency mechanism, right?

[32:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1966s) **Presenter:** because you can just send out those requests

[32:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1970s) **Presenter:** without having to still maintain the login

[32:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1973s) **Presenter:** for the specific user that has created that automation.

[32:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1977s) **Presenter:** And so we have remote execution here.

[33:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1981s) **Presenter:** What we don't have is, of course, arbitrary payloads

[33:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1983s) **Presenter:** because this is a specific payload to exfiltrate, in this case, a Google Drive.

[33:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1988s) **Presenter:** So let's see if we can make this better.

[33:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=1993s) **Presenter:** of course sorry so of course one thing to note here is that maintaining access is also

[33:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2001s) **Presenter:** is also covered because again you could the only secret here is the little uid that you're seeing

[33:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2009s) **Presenter:** here inside of the url so you can just call it without authentication avoiding detection is also

[33:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2016s) **Presenter:** pretty easy. There are no logs that are easily generated by somebody creating that webhook.

[33:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2022s) **Presenter:** And even if there are, this is somebody else's cloud, so it would become very difficult for you

[33:51](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2031s) **Presenter:** to actually gain access to it and view that information. Avoiding attribution is even easier

[33:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2037s) **Presenter:** because that endpoint can be used from an anonymous source like Tor. So that's, again, pretty easy.

[34:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2043s) **Presenter:** and logs, well, not so much.

[34:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2045s) **Presenter:** So these automations are actually generating

[34:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2048s) **Presenter:** a whole bunch of logs for each one of the cores

[34:11](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2051s) **Presenter:** that is being performed to these endpoints.

[34:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2053s) **Presenter:** And so we'll see in a moment how we can circumvent that.

[34:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2058s) **Presenter:** And so let's try something else,

[34:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2061s) **Presenter:** something more advanced to cover the two points

[34:23](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2063s) **Presenter:** that we have here, arbitrary payloads and logs.

[34:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2066s) **Presenter:** And so instead of running one payload,

[34:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2068s) **Presenter:** why don't we have one HTTP endpoint that allows us to run multiple different payloads?

[34:35](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2075s) **Presenter:** And you've seen a few different payloads that I've created here.

[34:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2078s) **Presenter:** So leak an entire SharePoint, leak attachments from Outlook,

[34:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2083s) **Presenter:** execute a stored procedure in SQL and others.

[34:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2087s) **Presenter:** And so let's think if this actually solved our problem.

[34:52](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2092s) **Presenter:** So unfortunately, no.

[34:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2094s) **Presenter:** So these are more payloads, but these are definitely not arbitrary payloads.

[34:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2099s) **Presenter:** And we are still generating loads.

[35:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2101s) **Presenter:** And so let's see how we can solve both of those problems.

[35:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2106s) **Presenter:** This is what we're going to do right now.

[35:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2108s) **Presenter:** And the key insight to solve both of those problems is that low-code,

[35:14](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2114s) **Presenter:** low-code platforms allow you to manage themselves with low-code,

[35:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2118s) **Presenter:** low-code.

[35:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2118s) **Presenter:** So you can use, for example, a connection, that connector called

[35:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2124s) **Presenter:** power automate management to create and run and delete power automate flows and this is the same

[35:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2131s) **Presenter:** for other local local platforms so let me introduce you to a tool we are calling powerful and again

[35:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2138s) **Presenter:** this is available as open source you can you can play around with it um which is uh which is using

[35:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2144s) **Presenter:** which is creating this persistency endpoint

[35:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2149s) **Presenter:** within the Microsoft 365 local no-code platform

[35:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2154s) **Presenter:** that allows you to run arbitrary payloads.

[35:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2158s) **Presenter:** This is what it looks like.

[35:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2159s) **Presenter:** So there's a single HTTP endpoint.

[36:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2163s) **Presenter:** Once you send off,

[36:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2165s) **Presenter:** instead of sending a specific command

[36:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2168s) **Presenter:** to run a specific payload,

[36:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2169s) **Presenter:** you actually send the definition of the payload

[36:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2172s) **Presenter:** you'd like to actually operate.

[36:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2176s) **Presenter:** And then what this automation does is three things.

[36:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2180s) **Presenter:** It creates the automation.

[36:22](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2182s) **Presenter:** It runs the automation.

[36:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2184s) **Presenter:** And then it deletes the automation.

[36:26](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2186s) **Presenter:** And you can see that there are a few different types.

[36:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2188s) **Presenter:** There's also one other operation that we're allowing here,

[36:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2191s) **Presenter:** which is to list available connections

[36:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2193s) **Presenter:** or available credentials that can be used by that automation.

[36:39](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2199s) **Presenter:** So this is the entire automation.

[36:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2202s) **Presenter:** uh three separate operations and of course because uh we we wouldn't want to play around with this

[36:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2207s) **Presenter:** we want to this to plug into the rest of our team arsenal um there's also a nice little uh rest api

[36:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2214s) **Presenter:** and python wrapper that python cli that wraps everything here um so again feel free to to play

[37:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2221s) **Presenter:** around this is uh you can see that the step that it that it's that this takes here are pretty simple

[37:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2228s) **Presenter:** you create this once you store this persistency endpoint somewhere you create a connection to that

[37:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2235s) **Presenter:** endpoint you fetch all of the different credentials that you can use you create an

[37:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2239s) **Presenter:** automation that uses those credentials you run that automation and then you simply delete it

[37:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2245s) **Presenter:** now the important piece here is that we have solved both the arbitrary payloads and load

[37:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2251s) **Presenter:** and logs part the arbitrary payloads is of course solved because you can just

[37:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2257s) **Presenter:** And the other thing of logs is that the logs are actually saved with the automation itself.

[37:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2262s) **Presenter:** So by deleting the automation, the logs get deleted as well.

[37:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2277s) **Presenter:** All right.

[37:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2279s) **Presenter:** And so up until now, we saw attacks that required you to have initial access to the platform.

[38:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2288s) **Presenter:** Let's now dive into a couple of attacks that don't require any access at all.

### Defensive Recommendations and Closing Remarks — Part 1

[38:14](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2294s) **Presenter:** So attacks you can do from the outside token in as the first vector of attack.

[38:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2300s) **Presenter:** One common thing we've seen in the industry is attacks where there's a predictable misconfiguration

[38:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2308s) **Presenter:** by hackers. And so Microsoft, so one example you could have in mind is AWS S3 buckets.

[38:36](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2316s) **Presenter:** For years, the default setting was that they were available to anonymous users. And so people made

[38:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2323s) **Presenter:** the mistake of leaving this default on. And then hackers were, hackers can easily scan open S3

[38:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2330s) **Presenter:** buckets and still send the information. So let me show you a parallel in the world of local

[38:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2335s) **Presenter:** no force power folders or power pages in their new name are a type of local application in the

[39:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2342s) **Presenter:** microsoft 365 suite and they are essentially a public facing application that is built on top

[39:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2350s) **Presenter:** of a managed sql server instance so business data these these applications are used for public facing

[39:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2359s) **Presenter:** endpoints. You can see a real example here. And these can be used, for example, to

[39:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2365s) **Presenter:** onboard new vendors into your company, or every time somebody visits your organization physically,

[39:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2371s) **Presenter:** they need somewhere to log in. So this would be these types of apps. And then because these apps

[39:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2380s) **Presenter:** have to be used, they need to be websites. So you can use them anonymously. There's a default

[39:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2388s) **Presenter:** where anonymous users can actually access information

[39:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2393s) **Presenter:** in a specific location, in a specific,

[39:55](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2395s) **Presenter:** if there's an API that is being exposed

[39:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2397s) **Presenter:** to these anonymous users.

[39:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2399s) **Presenter:** One of the challenges here is which data

[40:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2403s) **Presenter:** should actually be used,

[40:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2404s) **Presenter:** should actually be accessible to those anonymous users.

[40:07](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2407s) **Presenter:** So the website would have authenticated users

[40:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2410s) **Presenter:** which should have access to their data,

[40:14](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2414s) **Presenter:** and it should also have anonymous users

[40:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2418s) **Presenter:** data. The problem here that the team at AppGuard has found about a year ago was that the default

[40:25](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2425s) **Presenter:** configuration was such that every table that was being used by this application was available to

[40:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2431s) **Presenter:** anonymous users. This includes tables that should be available to admins only or that should be

[40:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2437s) **Presenter:** available to authenticated users only. All of those were available to everyone. So let me show you an

[40:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2442s) **Presenter:** example of how this looks like uh by the way before before i get to the example the default

[40:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2448s) **Presenter:** setting once the team at afgard found this microsoft was very quick to react and change the

[40:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2453s) **Presenter:** default setting so if you create a power uh power page app today the set the the default setting

[40:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2459s) **Presenter:** would be secured it doesn't mean that users cannot change the default setting to make it insecure

[41:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2464s) **Presenter:** not because they want to but because they made a simple mistake so let me show an example

[41:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2470s) **Presenter:** So here's an example from a real application. This is an application for a financial services company, large and US-based. You can see by going to the API endpoint, I get a list of all of the different entities or those objects that are available for me to query.

[41:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2487s) **Presenter:** Default is not really interesting.

[41:29](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2489s) **Presenter:** There's nothing there.

[41:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2491s) **Presenter:** Entity forms, it is just the way that the form submissions are being stored.

[41:35](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2495s) **Presenter:** But you can also see this nice little global variables object.

[41:39](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2499s) **Presenter:** And when I go to this global variable object to find out what's there,

[41:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2504s) **Presenter:** of course, I get authentication tokens,

[41:48](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2508s) **Presenter:** and specifically authentication tokens to Azure.

[41:50](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2510s) **Presenter:** And so, of course, this is available to every anonymous user.

[41:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2514s) **Presenter:** this was actually disclosed to the relevant company

[41:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2517s) **Presenter:** and they have fortunately solved it quickly.

[42:01](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2521s) **Presenter:** Now, the crucial piece here is that this is not a one-off thing.

[42:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2526s) **Presenter:** All of these applications, these Power Automate,

[42:08](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2528s) **Presenter:** these Power Pages apps are available on the same domain

[42:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2535s) **Presenter:** in different subdomains.

[42:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2537s) **Presenter:** So, of course, as hackers, the very quick things we can do

[42:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2541s) **Presenter:** is to enumerate those subdomains,

[42:24](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2544s) **Presenter:** to get a list of all of the potentially vulnerable apps

[42:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2548s) **Presenter:** we could extract data from.

[42:31](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2551s) **Presenter:** And because this is Microsoft, we can use Bing.

[42:33](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2553s) **Presenter:** You can see that a very simple query

[42:37](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2557s) **Presenter:** finds a whole bunch of these applications

[42:38](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2558s) **Presenter:** that could be available with this vulnerability.

[42:42](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2562s) **Presenter:** And so a very short recap of what we actually saw,

[42:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2566s) **Presenter:** of what we found here.

[42:49](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2569s) **Presenter:** So we submitted multiple vulnerability disclosures

[42:54](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2574s) **Presenter:** we found was emails and names and information

[42:57](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2577s) **Presenter:** about specific people.

[42:59](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2579s) **Presenter:** We found secrets leading to Azure and to AWS,

[43:02](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2582s) **Presenter:** and we found a whole bunch of business data,

[43:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2585s) **Presenter:** including records and receipts and PDFs.

[43:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2589s) **Presenter:** And so this is kind of one example.

[43:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2592s) **Presenter:** And there are other examples

[43:13](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2593s) **Presenter:** where predictable misconfigurations can be used by hackers

[43:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2597s) **Presenter:** to access business data because it's available by default

[43:20](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2600s) **Presenter:** or because somebody has made a configuration mistake.

[43:27](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2607s) **Presenter:** let's do a quick summary before we uh before we talk about how how we can stay safe so we've seen

[43:35](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2615s) **Presenter:** that low code is huge within the enterprise there's no there's no real choice there you have to

[43:40](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2620s) **Presenter:** if you if you if you work in a large enterprise you have local no code and your plat your business

[43:46](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2626s) **Presenter:** users are already using it and it could be because you have brought it in uh yourself

[43:51](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2631s) **Presenter:** or because the platforms that you already use have built low-code, no-code on top.

[43:58](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2638s) **Presenter:** We've seen that in many cases, low-code, no-code platforms are underrated by security teams

[44:03](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2643s) **Presenter:** and that the way for you to monitor those platforms is severely lacking.

[44:10](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2650s) **Presenter:** And we've seen many ways in which hackers can take advantage of low-code, no-code,

[44:16](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2656s) **Presenter:** to breach an organization.

[44:17](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2657s) **Presenter:** We've seen several leave-in-of-the-land techniques where hackers can leverage these existing connections in order to steal information or do damage within your organization.

[44:28](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2668s) **Presenter:** We've seen that low-code and no-code platforms can be perfect for a persistency mechanism within an organization.

[44:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2674s) **Presenter:** And we've seen that predictable misconfigurations, such as the ones we see in cloud, pop up again with low-code and no-code and expose business data outside of the organization.

[44:44](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2684s) **Presenter:** We've seen a couple of tools that you can use.

[44:47](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2687s) **Presenter:** And of course, the idea here is that you use those tools to educate yourself, educate your

[44:51](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2691s) **Presenter:** themes against the threats and create detections that will be able to catch those types of

[44:56](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2696s) **Presenter:** issues.

[44:56](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2696s) **Presenter:** And so the last thing I'd like to do today is to give you a very quick kind of a point

[45:05](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2705s) **Presenter:** on how you can defend your organization against what we've seen today.

### Defensive Recommendations and Closing Remarks — Part 2

[45:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2712s) **Presenter:** So the first thing I really suggest you go ahead and do is to review configurations for these local and local platforms.

[45:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2721s) **Presenter:** In many cases, the local platforms or their particularly worrisome features can be flagged or limited in a way that would reduce your risk.

[45:32](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2732s) **Presenter:** In particular, I highly encourage you to, if you're using Microsoft, I highly encourage you to look at this bypass consent flag, which can expose you to significant risk.

[45:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2743s) **Presenter:** I also encourage you to review and monitor any external facing endpoint that has been created on your behalf by these local and local platforms.

[45:53](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2753s) **Presenter:** Those would include webhook URLs by different automations, the OData or the API behind that is being created by Microsoft for Power Apps.

[46:06](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2766s) **Presenter:** And for other platforms, the same kind of things.

[46:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2769s) **Presenter:** These are endpoints that expose your data or your operation that somebody else manages.

[46:19](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2779s) **Presenter:** The third thing I advise you to do is to review those shared connections, go to those different environments, understand which local no-code platforms your organization has, and review those shared environments to find shared connections and purge them from the organization or reduce permission to those connections.

[46:43](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2803s) **Presenter:** And if you're thinking of how do we use low-code, no-code in a secure way, in a way that on one hand allows the business to continue to operate and to push forward to accelerate productivity, and on the other hand, we remain secure, I highly encourage you to check out the OWASP low-code, no-code top 10.

[47:04](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2824s) **Presenter:** It's a growing community of over 200 security professionals.

[47:09](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2829s) **Presenter:** There are a bunch of voices there from different perspectives,

[47:12](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2832s) **Presenter:** and you'll find a whole bunch of examples of attacks

[47:15](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2835s) **Presenter:** that were found in the wild and were not covered in this talk

[47:18](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2838s) **Presenter:** in the OWASP Top 10.

[47:21](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2841s) **Presenter:** So thank you very much.

[47:34](https://www.youtube.com/watch?v=Nrc9dT-Gx3Y&t=2854s) **Presenter:** you
<!-- talk-enrichment:end -->
