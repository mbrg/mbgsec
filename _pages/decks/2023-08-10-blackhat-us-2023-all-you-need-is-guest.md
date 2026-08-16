---
title: "All You Need Is Guest"
talk_date: 2023-08-10
conference: BlackHat US 2023
permalink: /talks/2023-08-10-blackhat-us-2023-all-you-need-is-guest/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-08-10_BHUSA-2023_All_You_Need_is_Guest/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-08-10_BHUSA-2023_All_You_Need_is_Guest/slides.pdf
schedule_url: https://www.blackhat.com/us-23/briefings/schedule/index.html#all-you-need-is-guest-32647
recording_url: https://www.youtube.com/watch?v=dmbRpwP5L9s
github_url: https://github.com/mbrg/power-pwn
description: "Azure AD guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. In this talk, we will…"
abstract_source_url: "https://www.blackhat.com/us-23/briefings/schedule/index.html#all-you-need-is-guest-32647"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://www.youtube.com/watch?v=dmbRpwP5L9s"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "a79d65e462ec4f44456eb5ba0066173c979692d72e6995b2456b8818accfabd5"
---


<!-- talk-enrichment:start -->
## Abstract

Azure AD guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. In this talk, we will show how guests can leverage undocumented APIs to bypass limitations and gain unauthorized access to sensitive business data and capabilities including corporate SQL servers, SharePoint sites, and KeyVault secrets. Furthermore, we will reveal how guests can create and control internal business applications to move laterally within the organization. All capabilities presented in the talk will be demonstrated with the default Office 365 and Azure AD configuration. Next, we will drop PowerGuest, a powerful tool designed to uncover the true scope of guest access in your tenant. PowerGuest can automate limitation bypass, enumerate and dump all accessible data, and allow for interactive non-read actions by the researcher. Finally, we will make up for shattering the illusion of guests having limited access by sharing concrete steps to harden your Azure AD and Office 365 configurations to prevent such attacks and suggest detection logic to catch them if a change in configuration is not possible.

_[Official conference abstract](https://www.blackhat.com/us-23/briefings/schedule/index.html#all-you-need-is-guest-32647)_

## Transcript

> AI generated from recording.

### Introduction & Guest Access Overview

[00:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2s) **Presenter:** So, when you get an invite to be guest in somebody else's tenant, you get this email. I'm sure you're probably familiar with this email. And once you click on accept, you typically see nothing, right? So you see an empty screen because, well, guests have access to nothing by default, right? So, no, that's completely wrong.

[00:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=25s) **Presenter:** what we're going to see today

[00:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=27s) **Presenter:** is that guests can actually get access

[00:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=29s) **Presenter:** to a bunch of overshared credentials,

[00:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=32s) **Presenter:** applications, and automations

[00:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=33s) **Presenter:** that they can just pick up and use.

[00:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=34s) **Presenter:** You're seeing resources from SQL Server, Azure.

[00:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=38s) **Presenter:** And we won't stop there.

[00:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=40s) **Presenter:** We also show that these guests can use these credentials

[00:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=43s) **Presenter:** to get full dumps of the data sources there.

[00:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=47s) **Presenter:** All right.

[00:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=48s) **Presenter:** So now that I hopefully have your attention,

[00:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=52s) **Presenter:** hi, everyone.

[00:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=52s) **Presenter:** My name is Michael.

[00:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=54s) **Presenter:** I've been focused on security for low-code, no-code apps

[00:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=57s) **Presenter:** for like four or five years now,

[00:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=59s) **Presenter:** co-founded a company in this area called Xenity,

[01:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=61s) **Presenter:** and I'm hiring.

[01:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=62s) **Presenter:** So if you're looking for an interesting challenge,

[01:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=64s) **Presenter:** reach out to me afterwards.

[01:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=66s) **Presenter:** And if you can please have the slides on the monitor,

### Why Guest Access Exists & Onboarding

[01:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=69s) **Presenter:** that would be helpful.

[01:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=70s) **Presenter:** Thank you.

[01:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=71s) **Presenter:** All right.

[01:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=73s) **Presenter:** So I think we have to start by figuring out

[01:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=77s) **Presenter:** why does this mechanism of guests even exist,

[01:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=80s) **Presenter:** because otherwise we won't understand

[01:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=83s) **Presenter:** So let's start with that.

[01:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=85s) **Presenter:** When you need to share resources between different organizations,

[01:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=91s) **Presenter:** you're kind of in a pickle.

[01:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=92s) **Presenter:** So I work for a very small company, about 25 employees,

[01:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=96s) **Presenter:** and we work with large enterprises.

[01:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=97s) **Presenter:** So you start collaborating,

[01:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=100s) **Presenter:** and you need to collaborate over a bunch of files, right?

[01:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=103s) **Presenter:** You have legal documents.

[01:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=104s) **Presenter:** You have a bunch of decks you want to share.

[01:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=107s) **Presenter:** How would you do that?

[01:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=108s) **Presenter:** So there are a few ways for you to do that in a way that's safe.

[01:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=113s) **Presenter:** one option is, well,

[01:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=115s) **Presenter:** just to send the files over email, and

[01:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=117s) **Presenter:** we've probably all done that, right?

[02:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=120s) **Presenter:** That's not really

[02:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=121s) **Presenter:** advisable, but, well.

[02:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=123s) **Presenter:** Another option is just to

[02:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=125s) **Presenter:** trust somebody on the internet, like

[02:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=127s) **Presenter:** drag and drop it somewhere. You can use

[02:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=129s) **Presenter:** a random service that you find, and

[02:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=131s) **Presenter:** you'll find that this works.

[02:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=133s) **Presenter:** Again, I'm not sure how safe it is.

[02:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=135s) **Presenter:** You can also do this in real life. This is actually

[02:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=137s) **Presenter:** a real thing that I discovered preparing

[02:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=139s) **Presenter:** for this talk. You can just plug in

[02:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=140s) **Presenter:** your laptop into these USBs. This is a really

[02:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=143s) **Presenter:** project, check it out. But like, kidding aside, if you're in an enterprise and you want to do this

[02:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=148s) **Presenter:** right, then Microsoft offers for you a way to basically invite guests in. So you bring the guests

[02:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=155s) **Presenter:** into your tenant in hopes to have better controls. This is how this mechanism works. So it has a

[02:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=161s) **Presenter:** couple of things. One is that external users can bring their own identities. That means that they

[02:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=166s) **Presenter:** can authenticate however they choose, right? And the other thing that's important is that you still

[02:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=173s) **Presenter:** within the tenant.

[02:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=174s) **Presenter:** All right.

[02:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=175s) **Presenter:** So in order for this mechanism to be useful,

### Guest Exploitation Basics

[02:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=177s) **Presenter:** to really work in a safe way,

[02:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=179s) **Presenter:** two things need to happen.

[03:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=180s) **Presenter:** One is that it needs to be super easy

[03:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=182s) **Presenter:** for a vendor to onboard,

[03:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=183s) **Presenter:** and the other is that it needs to be super easy

[03:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=185s) **Presenter:** for IT and security to actually control what's going on.

[03:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=188s) **Presenter:** All right?

[03:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=189s) **Presenter:** So let's go through both of them.

[03:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=192s) **Presenter:** First of all,

[03:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=193s) **Presenter:** and if we can try to get this video working, thank you,

[03:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=197s) **Presenter:** getting a guest access into an organization

[03:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=199s) **Presenter:** is relatively easy.

[03:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=201s) **Presenter:** You can see here a bunch of examples

[03:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=203s) **Presenter:** works, but if you have a Teams channel, if you have a SharePoint site, then you can just

[03:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=208s) **Presenter:** type in somebody's email, and once you do that and you click on a few buttons, then

[03:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=213s) **Presenter:** that person will get invited as a guest to your tenant.

[03:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=215s) **Presenter:** The important thing to remember is that the people that are making those decisions are

[03:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=220s) **Presenter:** business users, right?

[03:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=221s) **Presenter:** Those are typically not IT administrators that are enabling this guest access, but just

[03:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=227s) **Presenter:** people that want to enable whatever they're doing at the time, like the collaboration

[03:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=231s) **Presenter:** that they're having.

[03:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=233s) **Presenter:** getting guest access is relatively easy.

[03:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=236s) **Presenter:** In some cases, it might even be too easy.

[04:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=240s) **Presenter:** So last year at Black Hat,

[04:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=242s) **Presenter:** check out this amazing talk.

[04:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=244s) **Presenter:** They can show that you could hijack invites

[04:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=249s) **Presenter:** to guest accounts that were not redeemed yet

[04:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=252s) **Presenter:** and then redeem them with a different email.

[04:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=255s) **Presenter:** So every user in the organization

[04:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=256s) **Presenter:** could query Microsoft APIs

[04:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=258s) **Presenter:** to fetch all of the invites

[04:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=261s) **Presenter:** that were not redeemed yet,

[04:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=263s) **Presenter:** Then grab them and reuse them with a different email.

[04:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=266s) **Presenter:** Now, this vulnerability is already resolved.

[04:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=268s) **Presenter:** Don't worry.

[04:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=269s) **Presenter:** But it does show that the ability of people to accidentally get invited as a guest to your tenant is pretty huge.

[04:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=278s) **Presenter:** There's also self-service mechanism.

[04:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=280s) **Presenter:** So there's a lot of ways for that to happen.

[04:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=282s) **Presenter:** And so check out this talk.

[04:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=284s) **Presenter:** It's really cool.

[04:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=285s) **Presenter:** So we covered the first thing, easy for vendors to onboard.

[04:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=289s) **Presenter:** Now we need to figure out how does IT security supposed to control this thing.

[04:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=293s) **Presenter:** And so let me show you how this works.

[04:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=296s) **Presenter:** It starts with the vendor having some sort of an authentication mechanism on the left side.

[05:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=303s) **Presenter:** So they could use any IDP.

[05:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=306s) **Presenter:** It could be Okta, another AAD tenant.

[05:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=309s) **Presenter:** I mean, anything works here.

[05:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=310s) **Presenter:** And the way that this works for them to connect to your tenant is through a link.

[05:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=316s) **Presenter:** So Azure AD would trust your tenant, would trust their tenant to authenticate you.

[05:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=323s) **Presenter:** about this is that the entire

[05:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=325s) **Presenter:** Microsoft suite of security services

[05:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=327s) **Presenter:** operate on top of that. So if you have single

[05:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=329s) **Presenter:** sign unconditional access

[05:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=331s) **Presenter:** policies, all of these things, you can

[05:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=333s) **Presenter:** apply them to guests the same way

[05:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=335s) **Presenter:** that you can apply them to your own organization,

[05:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=337s) **Presenter:** to your own users, which is really awesome.

[05:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=340s) **Presenter:** And so

[05:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=341s) **Presenter:** one thing that we need to figure out, though, is that

[05:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=343s) **Presenter:** well, in order to give

### Power Platform Credentials & DLP

[05:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=345s) **Presenter:** a guest access to someone, we really

[05:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=347s) **Presenter:** need security controls, right? Because we can't just

[05:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=349s) **Presenter:** invite a guest to our tenant.

[05:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=351s) **Presenter:** In order to get those security controls,

[05:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=353s) **Presenter:** We need to provision those users with an AID account.

[05:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=357s) **Presenter:** Otherwise, those security controls don't apply.

[06:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=360s) **Presenter:** Right?

[06:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=361s) **Presenter:** But then, does this mean that they get full access?

[06:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=364s) **Presenter:** Because once I give somebody access to my Azure AD account,

[06:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=367s) **Presenter:** I will get full access, like, to the tenant?

[06:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=370s) **Presenter:** All right, so no.

[06:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=371s) **Presenter:** Actually, what happens here is that this is not full access.

[06:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=375s) **Presenter:** This is an access that should be denied by default.

[06:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=378s) **Presenter:** So as a guest, by default, you should have access to nothing.

[06:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=381s) **Presenter:** Nothing at all.

[06:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=383s) **Presenter:** something with you specifically, explicitly,

[06:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=385s) **Presenter:** then you should have access.

[06:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=387s) **Presenter:** Alright, so a quick recap.

[06:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=389s) **Presenter:** Guests are really easy to attain,

[06:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=392s) **Presenter:** they are really easy to control,

[06:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=395s) **Presenter:** and access is denied by default.

[06:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=396s) **Presenter:** And now, once we cover the docs,

[06:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=400s) **Presenter:** let's talk about reality.

[06:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=401s) **Presenter:** Alright?

[06:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=402s) **Presenter:** So here's reality.

[06:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=404s) **Presenter:** Let's start by inviting a guest to our tenant,

[06:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=407s) **Presenter:** and what you're seeing here,

[06:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=409s) **Presenter:** I'm going to be logged into two different users.

[06:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=413s) **Presenter:** the trusted user, the business user,

[06:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=415s) **Presenter:** and the other would be the hacker.

[06:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=417s) **Presenter:** And you can see this icon, this blue icon

[06:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=419s) **Presenter:** on the right button side, that's the trusted user's icon.

[07:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=422s) **Presenter:** And in a moment, you'll see the hacker icon.

[07:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=423s) **Presenter:** But that would allow you to understand always

[07:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=425s) **Presenter:** which user I'm authenticated with.

[07:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=427s) **Presenter:** All right.

[07:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=428s) **Presenter:** So as the trusted user, I'm in Teams.

[07:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=431s) **Presenter:** I'm just going to invite somebody into my Teams channel.

[07:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=435s) **Presenter:** Why not invite a hacker at Pontoso at Microsoft.com?

[07:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=440s) **Presenter:** And once I've done that, I click on that invite.

[07:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=443s) **Presenter:** This person is invited.

[07:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=444s) **Presenter:** Now, logged in as the hacker, and you can see the hacker icon right now,

[07:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=449s) **Presenter:** I'm logging into my own account in my own tenant.

[07:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=452s) **Presenter:** And accepting the invite, I get this ask to provision the guest tenant

[07:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=457s) **Presenter:** with permissions to fetch some basic information about my account.

[07:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=461s) **Presenter:** And once I log in, of course, I don't see anything, right?

[07:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=465s) **Presenter:** Guests should be denied by default.

[07:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=467s) **Presenter:** And now, very briefly, we already know from the security perspective

[07:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=473s) **Presenter:** to exploit guest access.

[07:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=475s) **Presenter:** So one thing that we've seen is that once a guest is invited into a tenant,

[07:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=479s) **Presenter:** you can use Teams, and then it allows you to do some sophisticated fishing

[08:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=483s) **Presenter:** through Teams, and check out this link here.

[08:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=485s) **Presenter:** The other thing that you can do is some recon on the actual directory.

[08:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=489s) **Presenter:** So a guest could, by sophisticated methods, find out information about the users

[08:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=494s) **Presenter:** that are part of your directory.

[08:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=495s) **Presenter:** We have kind of lived with these things.

[08:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=498s) **Presenter:** We know that they exist, but we still provision guest access because, well,

[08:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=502s) **Presenter:** it's useful.

[08:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=503s) **Presenter:** But actually, as hackers, hackers want more, right?

[08:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=507s) **Presenter:** The idea that just where this ends is not good enough for hackers,

[08:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=512s) **Presenter:** and so they will try to get more than that.

[08:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=515s) **Presenter:** They will try to get into your data.

[08:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=517s) **Presenter:** So this is the point in the talk where I'm going to give you an option

[08:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=521s) **Presenter:** because after the next slide, you're going to know, right?

[08:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=526s) **Presenter:** And you'll probably have some work to do on Monday.

[08:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=530s) **Presenter:** so if you don't want to do that

[08:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=532s) **Presenter:** I really invite you to have an early lunch

[08:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=535s) **Presenter:** any takers?

[08:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=538s) **Presenter:** alright

[08:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=538s) **Presenter:** so I'm just going to click on this link

[09:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=540s) **Presenter:** as the hacker

[09:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=542s) **Presenter:** this takes me to a service called

[09:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=544s) **Presenter:** Microsoft Power Apps

[09:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=545s) **Presenter:** and it's inviting me in

[09:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=547s) **Presenter:** and once I click on the button here

[09:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=550s) **Presenter:** then I get to this disconnect

[09:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=552s) **Presenter:** and this is telling me basically

[09:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=553s) **Presenter:** the link that you've entered which has the environment

[09:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=556s) **Presenter:** on the guest tenant

[09:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=558s) **Presenter:** there's some confusion, it's not in your tenant.

### Token Exchange & Programmatic Access

[09:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=561s) **Presenter:** So fine, I'm logged into,

[09:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=562s) **Presenter:** it routes me to my own tenant,

[09:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=564s) **Presenter:** my home tenant, all right?

[09:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=566s) **Presenter:** And you can see that this is a full portal,

[09:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=568s) **Presenter:** but it has nothing.

[09:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=569s) **Presenter:** But then I can very, so we're here,

[09:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=571s) **Presenter:** I'm in the Pontoso tenant, the hacker tenant.

[09:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=574s) **Presenter:** And then I can very easily

[09:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=575s) **Presenter:** just switch to another tenant, all right?

[09:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=578s) **Presenter:** And you'll see here all of the different tenants

[09:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=580s) **Presenter:** that I have access to.

[09:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=581s) **Presenter:** Because as a guest, I can just switch

[09:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=583s) **Presenter:** to a tenant where I'm a guest in.

[09:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=585s) **Presenter:** And when I switch to that tenant right now,

[09:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=588s) **Presenter:** would take me to the link that I showed you earlier.

[09:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=590s) **Presenter:** Here's what I see.

[09:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=593s) **Presenter:** I see a bunch of credentials.

[09:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=595s) **Presenter:** And you can see that

[09:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=596s) **Presenter:** this page is in a

[09:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=598s) **Presenter:** service called Power Apps, something

[10:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=600s) **Presenter:** called Connections. We'll figure that out

[10:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=602s) **Presenter:** in a moment. Those connections are actually

[10:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=604s) **Presenter:** wrappers around credentials. And you can see here

[10:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=606s) **Presenter:** SQL Server and Azure

[10:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=608s) **Presenter:** Storage and a whole bunch of things. Let's try

[10:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=610s) **Presenter:** and figure out what this actually is.

[10:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=612s) **Presenter:** So let's just click on one of them. This is

[10:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=614s) **Presenter:** Azure File Storage. I'm gonna

[10:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=618s) **Presenter:** like in this little menu here,

[10:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=621s) **Presenter:** that there are a few options I can use.

[10:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=623s) **Presenter:** The first option that's kind of weird

[10:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=625s) **Presenter:** to see on credentials is a share button.

[10:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=629s) **Presenter:** A share button on a credential is very weird, right?

[10:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=632s) **Presenter:** Let's see what this does.

[10:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=634s) **Presenter:** So this specific credential

[10:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=636s) **Presenter:** is shared with three different entities.

[10:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=638s) **Presenter:** One is org.

[10:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=640s) **Presenter:** We'll get back to that in a moment.

[10:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=642s) **Presenter:** The other is Jamie Redding.

[10:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=643s) **Presenter:** You'll see that that's the person

[10:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=644s) **Presenter:** who's created this connection.

[10:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=646s) **Presenter:** And the third one is Jamie Redding

[10:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=648s) **Presenter:** at Outlook, so Jamie's

[10:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=650s) **Presenter:** personal account.

[10:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=651s) **Presenter:** And now we understand

[10:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=655s) **Presenter:** somewhat why are we

[10:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=656s) **Presenter:** even seeing this here.

[10:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=657s) **Presenter:** Because Jamie has shared this credential

[10:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=659s) **Presenter:** with the entire org.

[11:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=662s) **Presenter:** The entire org means everybody in your

[11:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=664s) **Presenter:** Azure AD tenant. That includes guests.

[11:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=666s) **Presenter:** That includes everybody.

[11:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=667s) **Presenter:** And that's a decision that

[11:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=670s) **Presenter:** Jamie has made. So let's try and figure out

[11:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=672s) **Presenter:** what this credential actually does.

[11:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=674s) **Presenter:** So why is Jamie creating this credential?

[11:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=677s) **Presenter:** All right.

[11:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=677s) **Presenter:** Going to details, I can see a bunch of information

[11:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=680s) **Presenter:** about this credential, like when it was created

[11:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=682s) **Presenter:** and who created it.

[11:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=683s) **Presenter:** Indeed, we're seeing Jamie.

[11:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=684s) **Presenter:** And just let's figure out who Jamie is.

[11:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=688s) **Presenter:** So Jamie is actually working for a customer service.

[11:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=692s) **Presenter:** So Jamie is a business user.

[11:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=694s) **Presenter:** Jamie has created an app, and that app required credentials.

[11:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=698s) **Presenter:** So Jamie added those credentials.

[11:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=700s) **Presenter:** And then Jamie wanted to share this app with everyone

[11:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=704s) **Presenter:** because it's a useful app.

[11:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=706s) **Presenter:** Well, the credentials were shared underneath.

[11:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=709s) **Presenter:** And so Jamie, a business user, had to make a decision.

[11:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=712s) **Presenter:** So she made the wrong decision.

[11:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=714s) **Presenter:** But, well, she's a business user, right?

[11:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=717s) **Presenter:** And so, not sure if this is going to work.

[12:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=720s) **Presenter:** Can we try and get the video to work?

[12:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=731s) **Presenter:** All right.

[12:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=733s) **Presenter:** I'm going to let you try.

[12:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=736s) **Presenter:** I'm not sure if you're aware of this, but business users are actually creating full-blown applications on top of your Microsoft instances.

[12:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=744s) **Presenter:** So there's a thing called Power Platform, which is a low-code, no-code platform baked into Office 365.

[12:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=750s) **Presenter:** It allows business users to build their own applications and automations.

[12:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=753s) **Presenter:** This is amazing, right?

[12:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=755s) **Presenter:** This puts a lot of power in the hands of business users.

[12:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=758s) **Presenter:** The video that I'm not able to show you right now shows that users can actually use a chat interface, an AI interface.

[12:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=766s) **Presenter:** That's with the text, they send text messages,

[12:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=769s) **Presenter:** and the bot underlying would create a table in a database,

[12:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=773s) **Presenter:** an application on top of that.

[12:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=775s) **Presenter:** You can share that application forward.

[12:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=776s) **Presenter:** Imagine like every conversation you had with ChatGPT

[13:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=780s) **Presenter:** leaves behind an application that now lives.

[13:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=782s) **Presenter:** It's a thing.

[13:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=784s) **Presenter:** It can even persist after the user has left the organization.

[13:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=788s) **Presenter:** So this is actually going on right now

[13:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=789s) **Presenter:** within most large organizations

[13:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=792s) **Presenter:** because this is really useful.

[13:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=793s) **Presenter:** Business users are creating really useful applications.

[13:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=796s) **Presenter:** And one thing you could do right now to try and kind of get yourself off the hook is to think that this is probably small.

[13:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=804s) **Presenter:** This probably doesn't belong to your organization.

[13:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=806s) **Presenter:** So I'm sorry to burst your bubble.

[13:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=809s) **Presenter:** This is the number of .NET developers today, according to Microsoft.

[13:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=813s) **Presenter:** You can see 5 million.

[13:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=815s) **Presenter:** 5 million .NET developers.

### Tool Demonstration & Capabilities

[13:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=817s) **Presenter:** How many developers do you think are using this low-code, no-code?

[13:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=820s) **Presenter:** Like, how many business users are building applications?

[13:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=824s) **Presenter:** Just have a number in your head.

[13:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=826s) **Presenter:** All right, so I went through Microsoft earning reports

[13:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=828s) **Presenter:** to try and figure that out,

[13:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=830s) **Presenter:** and according to the estimation that I have here,

[13:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=833s) **Presenter:** like the small regression here, about 8 million.

[13:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=837s) **Presenter:** How many security resources are we investing

[14:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=840s) **Presenter:** in what .NET developers are building?

[14:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=842s) **Presenter:** And then compare that to what business users are building.

[14:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=845s) **Presenter:** Well, we're not in a good situation.

[14:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=847s) **Presenter:** All right, so now that we figured out that this is big

[14:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=849s) **Presenter:** and this is happening in any organization,

[14:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=851s) **Presenter:** now we're going to get to the fun part

[14:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=853s) **Presenter:** because we're going to see how we can exploit this thing.

[14:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=856s) **Presenter:** Okay.

[14:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=857s) **Presenter:** So, logging in as the hacker,

[14:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=859s) **Presenter:** I go to this Azure file storage thing,

[14:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=862s) **Presenter:** and now there's a tab here called applications

[14:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=864s) **Presenter:** that use this connection.

[14:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=865s) **Presenter:** I want to see what data lies behind this connection,

[14:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=868s) **Presenter:** this credential.

[14:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=869s) **Presenter:** So, there's an application here.

[14:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=871s) **Presenter:** Let's try to open up that application.

[14:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=873s) **Presenter:** It takes me to a page which gives me

[14:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=875s) **Presenter:** a bunch of information about that app,

[14:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=877s) **Presenter:** and you can see that there's a link there

[14:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=878s) **Presenter:** that I can click to to get into the app.

[14:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=881s) **Presenter:** And once I click on that link,

[14:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=883s) **Presenter:** I get an issue.

[14:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=885s) **Presenter:** And that issue, I'm not sure if you can see this,

[14:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=888s) **Presenter:** but this issue is basically telling me,

[14:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=889s) **Presenter:** hey, you don't have the right license.

[14:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=891s) **Presenter:** You don't have the license to be able to use this application.

[14:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=895s) **Presenter:** And, I mean, it makes sense, right?

[14:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=897s) **Presenter:** I'm a guest.

[14:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=898s) **Presenter:** By default, I have access to nothing at all.

[15:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=900s) **Presenter:** And so why would I have a license to log into that?

[15:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=903s) **Presenter:** So here's the clue.

[15:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=905s) **Presenter:** You already have it on screen.

[15:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=907s) **Presenter:** Here's the clue of how we're going to bypass this.

[15:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=909s) **Presenter:** And I'll try to read this out to you.

[15:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=911s) **Presenter:** Maybe here it would be easier.

[15:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=913s) **Presenter:** You don't have the correct plan to access this app.

[15:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=916s) **Presenter:** Ask your admin for one,

[15:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=917s) **Presenter:** or ask the admin at the organization in which you're a guest.

[15:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=922s) **Presenter:** So can you guess how we're going to bypass this?

[15:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=925s) **Presenter:** What happens if we have a license in our own tenant?

[15:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=928s) **Presenter:** Would this work?

[15:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=928s) **Presenter:** Nah.

[15:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=929s) **Presenter:** I don't think this will work.

[15:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=931s) **Presenter:** Let's try.

[15:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=932s) **Presenter:** Here's a way for you to get a free plan from Microsoft,

[15:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=937s) **Presenter:** a free license in your own tenant.

[15:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=939s) **Presenter:** So I'm going to ask nicely for Microsoft for a license.

[15:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=944s) **Presenter:** Hi, I'm a hacker.

[15:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=945s) **Presenter:** Please give me a license.

[15:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=946s) **Presenter:** And they're going to say, yeah, okay, fine.

[15:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=948s) **Presenter:** Here's a license.

[15:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=948s) **Presenter:** And now I have a license in my home tenant.

[15:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=951s) **Presenter:** And I go back to that app.

[15:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=953s) **Presenter:** And now I'm in.

[15:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=954s) **Presenter:** Because if you have a license in your own tenant, that's fine.

[15:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=957s) **Presenter:** And you can use it for the guest tenant as well.

[16:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=960s) **Presenter:** All right.

[16:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=961s) **Presenter:** So once this continued to Lowe's, we actually hit another wall.

[16:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=965s) **Presenter:** and this is now telling me something very different.

[16:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=968s) **Presenter:** It's telling me that it looks like this app

[16:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=970s) **Presenter:** isn't compliant with the latest data loss prevention policies.

[16:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=974s) **Presenter:** Let's open this up.

[16:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=976s) **Presenter:** And it's telling us this is something about

[16:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=978s) **Presenter:** data loss prevention, deny Azure file storage.

[16:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=983s) **Presenter:** Is there like a, this looks like there's a DLP policy

[16:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=987s) **Presenter:** built into this local, local platform, to Power Platform.

[16:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=991s) **Presenter:** I mean, DLP, let's try to figure out

[16:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=996s) **Presenter:** So, indeed, there's something called DLP policies within this platform that allows you to control what users can and cannot create.

[16:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1005s) **Presenter:** So, well, this is great.

[16:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1007s) **Presenter:** Let's try to create.

[16:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1008s) **Presenter:** Let's log in as the trusted user and try to create a policy that would find social security numbers and then block, like, the usage of those.

[16:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1017s) **Presenter:** All right.

[16:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1017s) **Presenter:** Let's do that.

[16:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1019s) **Presenter:** Oh, but now it's showing me that I need to choose a bunch of connectors.

[17:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1023s) **Presenter:** Let's choose SharePoint.

[17:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1026s) **Presenter:** I can block SharePoint.

[17:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1028s) **Presenter:** I mean, I can move into business.

[17:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1030s) **Presenter:** So something is actually going on here.

[17:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1034s) **Presenter:** The crucial piece to understand

[17:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1035s) **Presenter:** is that this is not the DLP you're thinking about.

[17:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1039s) **Presenter:** This is a security mechanism,

[17:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1040s) **Presenter:** but it's not a security DLP

[17:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1043s) **Presenter:** like you're used to thinking about DLP.

[17:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1045s) **Presenter:** It's not looking for patterns in data.

[17:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1047s) **Presenter:** It's actually allowing you to set which connectors

[17:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1049s) **Presenter:** are allowed to operate or denied to operate.

[17:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1052s) **Presenter:** So, for example, you could say,

[17:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1055s) **Presenter:** where nobody could use OneDrive,

[17:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1057s) **Presenter:** you can see that some connectors are not blockable at all,

[17:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1059s) **Presenter:** for example, SharePoint.

[17:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1061s) **Presenter:** And there are more sophisticated mechanisms there,

[17:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1063s) **Presenter:** but the gist of it is kind of an allowed denialist

### Mitigations & Defenses

[17:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1067s) **Presenter:** with some sophisticated features about kind of endpoints.

[17:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1071s) **Presenter:** All right, so this is actually not really a security mechanism, okay?

[17:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1076s) **Presenter:** Because one of my hobbies in the last year or so

[17:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1079s) **Presenter:** has been to try and find ways to go around this mechanism,

[18:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1082s) **Presenter:** but in a way that's like just a creative usage of applications within this platform.

[18:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1090s) **Presenter:** So currently, I know of five ways to try and bypass this through creating an app that calls another app.

[18:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1101s) **Presenter:** I mean, most of these things, if you really, really try, you can try and block them.

[18:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1106s) **Presenter:** The issue with DLP policies here is that, I mean, it's a great mechanism.

[18:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1112s) **Presenter:** to make sure that business users are making less mistakes.

[18:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1115s) **Presenter:** But this would not block the hackers.

[18:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1118s) **Presenter:** This would not block somebody that really wants to push forward.

[18:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1124s) **Presenter:** And so even though we talked a bit about this DLP policy,

[18:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1128s) **Presenter:** I'm still stuck, right?

[18:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1130s) **Presenter:** Because we just saw that I need to open an application,

[18:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1133s) **Presenter:** and I tried to open the application.

[18:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1135s) **Presenter:** I was blocked by DLP.

[18:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1137s) **Presenter:** And so unfortunately, I can't share a lot of details

[18:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1139s) **Presenter:** on this specific issue right now

[19:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1142s) **Presenter:** and we're going to fix some issues, so that's great.

[19:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1145s) **Presenter:** And so I'm going to ask you to kind of allow me to move to the next point.

[19:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1150s) **Presenter:** And if you're interested, I'll share more details once I can.

[19:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1154s) **Presenter:** Microsoft is working on making this better.

[19:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1157s) **Presenter:** All right.

[19:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1158s) **Presenter:** So we were blocked by DLP when we tried to get into the Azure file storage information.

[19:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1165s) **Presenter:** Fine.

[19:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1165s) **Presenter:** Let's just go to another connection.

[19:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1167s) **Presenter:** So here's the second credential here.

[19:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1169s) **Presenter:** It's a SQL credential.

[19:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1170s) **Presenter:** Let's open it up.

[19:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1172s) **Presenter:** by Jamie. Now, going to applications,

[19:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1175s) **Presenter:** I can see a bunch of applications.

[19:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1177s) **Presenter:** Here's one of them. And then

[19:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1178s) **Presenter:** again, I'm going to go to that app.

[19:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1181s) **Presenter:** I'm going to click on that link.

[19:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1182s) **Presenter:** And now, I'm actually logged into the app

[19:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1185s) **Presenter:** because this app lets

[19:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1187s) **Presenter:** me log in. And the first thing that it asks me

[19:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1188s) **Presenter:** is to kind of which connection,

[19:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1191s) **Presenter:** which credential I'm going to use. And this is the

[19:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1192s) **Presenter:** credential I'm going to use. Alright.

[19:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1194s) **Presenter:** And once I get into the app,

[19:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1197s) **Presenter:** here's what I see. This is the actual application.

[19:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1199s) **Presenter:** It has a bunch of customers.

[20:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1200s) **Presenter:** You can see that this is showing me a table like

[20:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1202s) **Presenter:** PBOs or customers, and there are a bunch of customers here.

[20:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1206s) **Presenter:** And when I click on each one of the lines here,

[20:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1210s) **Presenter:** then I get information about that customer,

[20:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1212s) **Presenter:** including personal information and social security numbers.

[20:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1215s) **Presenter:** And don't worry, this is all generated by ChatGPT,

[20:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1217s) **Presenter:** so nothing to see here.

[20:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1220s) **Presenter:** So let's try and figure out how does this application work.

[20:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1223s) **Presenter:** How does it get the data that we're seeing right here?

[20:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1227s) **Presenter:** So if we look at the request,

[20:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1229s) **Presenter:** this is the request that's actually going out

[20:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1233s) **Presenter:** information on behalf of power-ups

[20:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1236s) **Presenter:** that gets

[20:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1237s) **Presenter:** this data for us.

[20:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1239s) **Presenter:** And looking at

[20:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1240s) **Presenter:** where this request is actually going,

[20:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1242s) **Presenter:** we can see

[20:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1244s) **Presenter:** a URL, a header

[20:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1247s) **Presenter:** here that tries to go to,

[20:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1249s) **Presenter:** you can see that it goes to like

[20:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1251s) **Presenter:** APIM something and SQL,

[20:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1252s) **Presenter:** so let's try and figure out what exactly

[20:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1255s) **Presenter:** this request is. But before

[20:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1257s) **Presenter:** you do that, of course, let's try and see

[20:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1259s) **Presenter:** whether we can just

[21:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1260s) **Presenter:** use this request. So if we just

[21:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1262s) **Presenter:** copy this request, and of course we

[21:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1264s) **Presenter:** replay it on our own, then

[21:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1266s) **Presenter:** of course we get the data, right? It's kind of the same thing.

[21:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1268s) **Presenter:** So we copied the data with the token

[21:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1270s) **Presenter:** from the browser, and we see the same thing.

[21:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1273s) **Presenter:** Alright. So this is what we're after.

[21:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1275s) **Presenter:** Right? Because we don't

[21:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1276s) **Presenter:** want, as a hacker,

[21:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1278s) **Presenter:** in the hacker mindset, we don't really

[21:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1280s) **Presenter:** want to use the app to see

[21:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1282s) **Presenter:** the data. We want to be able to see

[21:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1284s) **Presenter:** all of the information behind

[21:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1286s) **Presenter:** that credential, not just the information

[21:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1288s) **Presenter:** that is exposed through applications.

[21:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1291s) **Presenter:** And so this would be the way for us to do that.

[21:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1294s) **Presenter:** And so let's try and do that.

[21:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1296s) **Presenter:** Here's this link again.

[21:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1297s) **Presenter:** Let's try and figure out what's going on here.

[21:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1299s) **Presenter:** The first line is the domain.

[21:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1302s) **Presenter:** Azure API management is an API gateway, all right?

[21:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1305s) **Presenter:** So everything goes through this API gateway.

[21:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1308s) **Presenter:** That's fine.

[21:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1309s) **Presenter:** After that, it's going to a SQL.

[21:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1311s) **Presenter:** Because I'm specifically querying a credential of a SQL server.

[21:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1316s) **Presenter:** And you can see an ID for that specific credential.

[21:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1318s) **Presenter:** and then it's choosing the relevant

[22:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1321s) **Presenter:** SQL server and SQL database.

[22:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1323s) **Presenter:** So you can see customer inside server,

[22:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1325s) **Presenter:** enterprise customer database

[22:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1327s) **Presenter:** and now there's the query portion

[22:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1331s) **Presenter:** and let me just fix that URL for you.

### Recommendations & Best Practices — Part 1

[22:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1333s) **Presenter:** So you see tables

[22:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1334s) **Presenter:** and there's the customer table

[22:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1336s) **Presenter:** and I'm iterating through items.

[22:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1338s) **Presenter:** So this is actually allowing power-ups

[22:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1342s) **Presenter:** to fetch information behind this credential.

[22:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1346s) **Presenter:** and this API management instance

[22:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1349s) **Presenter:** is basically a proxy

[22:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1351s) **Presenter:** that allows Power Platform, allows the Power Apps

[22:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1353s) **Presenter:** to fetch information that sits behind those connections

[22:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1356s) **Presenter:** let's figure out how exactly this works

[22:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1359s) **Presenter:** this is a slide that I'm taking from Microsoft Docs

[22:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1362s) **Presenter:** you can see on the left side

[22:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1364s) **Presenter:** there are the applications, there are the users

[22:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1367s) **Presenter:** there are the automations

[22:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1368s) **Presenter:** and on the right side there's an API that they want to query

[22:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1370s) **Presenter:** for example an API to fetch information through SQL

[22:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1375s) **Presenter:** management instance there that allows, that facilitates those requests.

[23:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1381s) **Presenter:** And note that when you as a user, when you log into something, then you get generated

[23:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1386s) **Presenter:** some sort of a token, and that's fine.

[23:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1388s) **Presenter:** You can use the token to reach out to the API.

[23:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1391s) **Presenter:** How would an automation do that behind the scenes?

[23:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1394s) **Presenter:** How would an application do that?

[23:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1396s) **Presenter:** And think again about the fact that the people that are building applications with this thing,

[23:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1400s) **Presenter:** those are business users, right?

[23:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1402s) **Presenter:** But business users don't have access to create service accounts for themselves.

[23:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1406s) **Presenter:** If you want to allow business users to build applications, you have to allow them to do this with their own identities.

[23:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1413s) **Presenter:** So that's a lot of what's going on here.

[23:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1417s) **Presenter:** What's actually happening with this architecture is that a user would authenticate with their own connection, with their own credential.

[23:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1425s) **Presenter:** It could be a service account as well, but most users use their own identities.

[23:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1429s) **Presenter:** and then they would embed that identity

[23:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1432s) **Presenter:** within the application.

[23:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1434s) **Presenter:** And then once they create

[23:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1436s) **Presenter:** this refresh token or this client secret

[23:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1438s) **Presenter:** or whatever, that gets stored

[24:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1440s) **Presenter:** in a token

[24:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1442s) **Presenter:** database behind this API management

[24:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1444s) **Presenter:** instance and then you can share that.

[24:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1446s) **Presenter:** You can share that with other users.

[24:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1448s) **Presenter:** You can share that with guest users.

[24:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1450s) **Presenter:** You can also share that with an application or an automation

[24:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1452s) **Presenter:** that operates on your behalf

[24:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1453s) **Presenter:** on the backend.

[24:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1455s) **Presenter:** So if you look at it from the identity

[24:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1459s) **Presenter:** to understand. From the identity

[24:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1461s) **Presenter:** perspective, this is user impersonation

[24:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1464s) **Presenter:** in many cases, right?

[24:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1465s) **Presenter:** You will not be able to distinguish an application

[24:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1467s) **Presenter:** or a user using the same credentials.

[24:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1470s) **Presenter:** So this is actually what's going on

[24:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1471s) **Presenter:** here, and this is what we're fetching, and

[24:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1473s) **Presenter:** we just saw a get request,

[24:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1475s) **Presenter:** but of course there was many more. We can do a lot of

[24:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1477s) **Presenter:** other things on top of a SQL connection.

[24:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1480s) **Presenter:** So let's try and take

[24:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1481s) **Presenter:** a deeper look into this

[24:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1483s) **Presenter:** request, because remember, I mean

[24:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1485s) **Presenter:** I just copied this off of the browser, but I need

[24:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1487s) **Presenter:** to be able to query this in

[24:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1489s) **Presenter:** a programmatic way for it to be useful for a hacker.

[24:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1493s) **Presenter:** So here's the JWT token, and you can see that there's a specific resource that I need here.

[24:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1497s) **Presenter:** It's called API Hub at Azure.

[25:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1500s) **Presenter:** And let's try and figure out whether we can generate this token.

[25:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1504s) **Presenter:** Now, recall that generating token is easy because I have the user, right?

[25:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1508s) **Presenter:** So the problem is just generating the right token rather than just generating tokens.

[25:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1513s) **Presenter:** And so the only thing that we are going to need is to find a client ID, an application,

[25:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1517s) **Presenter:** that will already be provisioned on the guest tenant

[25:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1520s) **Presenter:** that would allow us to create this token.

[25:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1523s) **Presenter:** And so one thing I can try is a built-in public client app.

[25:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1529s) **Presenter:** So just one of the public client apps

[25:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1531s) **Presenter:** that's already available on the tenant.

[25:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1533s) **Presenter:** And when I try to do that, I actually fail

[25:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1535s) **Presenter:** because, unfortunately, the app needs to be pre-approved

[25:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1539s) **Presenter:** to actually get this resource.

[25:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1540s) **Presenter:** This is an internal resource.

[25:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1542s) **Presenter:** All right, let's try and do another thing.

[25:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1544s) **Presenter:** Let's try to create an application,

[25:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1547s) **Presenter:** in our own tenant and give it those permissions,

[25:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1550s) **Presenter:** like grant those permissions in our own tenant.

[25:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1553s) **Presenter:** That doesn't work as well.

[25:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1554s) **Presenter:** Because you wouldn't find this permission

[25:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1556s) **Presenter:** in the Entry ID or AID portal

[26:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1560s) **Presenter:** because it's an internal permission.

[26:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1562s) **Presenter:** Microsoft won't allow you to do this.

[26:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1564s) **Presenter:** So we're kind of stuck, which is annoying.

[26:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1569s) **Presenter:** Let's kind of recap how annoying this is.

[26:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1572s) **Presenter:** Because we got access to somebody else's tenant.

[26:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1577s) **Presenter:** We saw a bunch of credentials there in PowerApp

[26:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1579s) **Presenter:** just waiting for us.

[26:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1581s) **Presenter:** We tried to get access,

[26:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1583s) **Presenter:** but we were blocked by a license.

[26:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1586s) **Presenter:** So we just got a license.

[26:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1588s) **Presenter:** That's fine.

[26:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1589s) **Presenter:** We were blocked by DLP.

[26:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1591s) **Presenter:** And then I basically waved my hands

[26:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1594s) **Presenter:** and told you I'll explain this later.

[26:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1596s) **Presenter:** And then we get blocked by programmatic access

[26:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1599s) **Presenter:** to API Hub,

[26:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1599s) **Presenter:** so we are not able to generate the right token.

[26:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1601s) **Presenter:** And so let's try to solve that.

[26:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1605s) **Presenter:** What we need is an app that can do three things

[26:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1608s) **Presenter:** It will be on by default

[26:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1610s) **Presenter:** On every tenant

[26:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1612s) **Presenter:** It will be pre-approved

[26:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1613s) **Presenter:** To use this resource to query API Hub

[26:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1616s) **Presenter:** And it will be a public client

[26:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1618s) **Presenter:** Because we need to generate tokens with this app

[27:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1620s) **Presenter:** And so can you think of an app

[27:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1622s) **Presenter:** That might do that for us

[27:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1624s) **Presenter:** So we already know about one app

[27:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1626s) **Presenter:** That is pre-approved to query API Hub

[27:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1629s) **Presenter:** Right?

[27:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1629s) **Presenter:** This is Power Apps

[27:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1630s) **Presenter:** We just saw that

[27:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1632s) **Presenter:** So Power Apps is actually,

[27:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1634s) **Presenter:** another thing is also on by default on every user,

[27:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1637s) **Presenter:** on every account, tenant, sorry,

[27:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1639s) **Presenter:** but of course they've done their job well here

[27:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1642s) **Presenter:** and it's a confidential app,

[27:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1644s) **Presenter:** so you can't authenticate on behalf of Power Apps.

[27:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1647s) **Presenter:** So we're kind of in a problem here.

[27:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1649s) **Presenter:** The way that we're going to solve this

[27:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1651s) **Presenter:** is with a neat piece of research

[27:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1653s) **Presenter:** that shows an undocumented way

[27:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1657s) **Presenter:** in which Microsoft Azure Active Directory behaves.

[27:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1661s) **Presenter:** This is the family of client IDs.

[27:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1665s) **Presenter:** In order to understand that,

[27:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1666s) **Presenter:** think about the experience

[27:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1667s) **Presenter:** where you log into one Microsoft app,

[27:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1669s) **Presenter:** like Teams,

[27:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1670s) **Presenter:** and then you go to Outlook

[27:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1672s) **Presenter:** or you go to any other, like OneDrive.

[27:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1675s) **Presenter:** Are you getting prompted to re-authenticate?

[27:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1678s) **Presenter:** No, right?

[27:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1679s) **Presenter:** The single sign-on still works.

[28:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1680s) **Presenter:** How does that happen?

[28:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1681s) **Presenter:** Those are different domains,

[28:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1683s) **Presenter:** different tokens, different resources.

[28:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1685s) **Presenter:** How does that happen?

[28:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1686s) **Presenter:** Well, the way that it happens

[28:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1688s) **Presenter:** is that you can take one refresh token

[28:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1691s) **Presenter:** from one client ID, from one resource,

[28:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1693s) **Presenter:** and exchange it with another for another client ID,

[28:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1697s) **Presenter:** for another resource, inside of the Microsoft ecosystem.

[28:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1701s) **Presenter:** This is undocumented behavior that was discovered

[28:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1705s) **Presenter:** by people much smarter than I am.

[28:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1708s) **Presenter:** Check out this research. This is really cool.

[28:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1710s) **Presenter:** But the client ID that we are aware of,

[28:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1713s) **Presenter:** that we can exchange as tokens today,

[28:35](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1715s) **Presenter:** you can see the list on screen right now.

[28:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1718s) **Presenter:** So can you identify the ones that we're going to use?

[28:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1721s) **Presenter:** First of all, there's power-ups here, which is great.

[28:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1724s) **Presenter:** But what do we need more?

[28:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1726s) **Presenter:** We need a public client application

[28:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1728s) **Presenter:** where we can just generate how many tokens we'd like

[28:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1730s) **Presenter:** in every tenant.

[28:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1731s) **Presenter:** Do you see one here?

[28:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1734s) **Presenter:** Here it is.

[28:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1734s) **Presenter:** So Azure CLI.

[28:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1737s) **Presenter:** Azure CLI can generate token on behalf of a user

[29:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1742s) **Presenter:** inside of every tenant.

[29:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1743s) **Presenter:** So this will actually solve our problem

[29:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1745s) **Presenter:** because what we're going to do

[29:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1746s) **Presenter:** is we're going to log in to Microsoft Azure CLI

[29:11](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1751s) **Presenter:** to API Hub.

### Recommendations & Best Practices — Part 2

[29:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1753s) **Presenter:** All right?

[29:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1753s) **Presenter:** And this will solve all of our problems.

[29:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1756s) **Presenter:** And so now that we have found a way

[29:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1758s) **Presenter:** to circumvent everything that we've seen,

[29:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1761s) **Presenter:** we have the ability to programmatically

[29:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1764s) **Presenter:** generate the right token,

[29:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1765s) **Presenter:** to go to this API Hub,

[29:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1767s) **Presenter:** and to be able to query each connection,

[29:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1769s) **Presenter:** each credential we have access to as a guest.

[29:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1771s) **Presenter:** And now let's see what we can actually do with this.

[29:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1774s) **Presenter:** And I'm going to be very brief here

[29:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1776s) **Presenter:** because we have an arsenal session

[29:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1780s) **Presenter:** later this day, where we'll share a bunch more information.

[29:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1783s) **Presenter:** So check it out.

[29:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1784s) **Presenter:** But let's try and look at this.

[29:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1786s) **Presenter:** So we have just released, like a couple of hours ago,

[29:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1789s) **Presenter:** we've released a tool called PowerPoint,

[29:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1791s) **Presenter:** which allows you to play around with everything

[29:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1793s) **Presenter:** that you've seen in this talk today.

[29:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1795s) **Presenter:** And PowerPoint has different modules.

[29:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1797s) **Presenter:** The modules that we spoke about in this talk right now

[30:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1800s) **Presenter:** is the dump and the GUI modules,

[30:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1803s) **Presenter:** but there are actually others.

[30:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1804s) **Presenter:** So if you're interested, really check out the SNL talk.

[30:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1807s) **Presenter:** But let's see what this tool does.

[30:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1809s) **Presenter:** So when I use the dump module,

[30:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1812s) **Presenter:** and I just need to plug in the tenant I'd like to go to,

[30:16](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1816s) **Presenter:** then it would authenticate to Microsoft Azure CLI

[30:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1822s) **Presenter:** on the hacker's behalf, which is fine.

[30:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1825s) **Presenter:** And once I do that, we do the exchange of tokens

[30:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1827s) **Presenter:** and everything that you've seen in this talk.

[30:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1829s) **Presenter:** And what I get to is this screen

[30:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1831s) **Presenter:** that you saw at the beginning of the talk.

[30:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1833s) **Presenter:** But now we understand what's going on here.

[30:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1837s) **Presenter:** you can see that there are a bunch of credentials here,

[30:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1839s) **Presenter:** and you can identify the two credentials

[30:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1841s) **Presenter:** that we've seen throughout this talk,

[30:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1842s) **Presenter:** but you can also see that I have access

[30:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1844s) **Presenter:** to applications and automations.

[30:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1846s) **Presenter:** I'm not going to show this today,

[30:47](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1847s) **Presenter:** but you can actually use them.

[30:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1848s) **Presenter:** You can run these automations,

[30:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1850s) **Presenter:** so there are plenty more things you can do here.

[30:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1853s) **Presenter:** But for each one of those connections,

[30:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1855s) **Presenter:** we're not going to stop with enumeration

[30:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1856s) **Presenter:** because we want to see what's behind those connections,

[31:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1860s) **Presenter:** not just through apps.

[31:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1861s) **Presenter:** So let's do that.

[31:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1862s) **Presenter:** So there's a dump table here for you,

[31:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1864s) **Presenter:** and when I go to a dump for the SQL server,

[31:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1866s) **Presenter:** I would get a dump for each one of the tables

[31:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1868s) **Presenter:** behind the SQL server.

[31:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1870s) **Presenter:** And just going to one of them, the customers table,

[31:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1873s) **Presenter:** which is what I'm actually interested in,

[31:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1875s) **Presenter:** here's the entire table.

[31:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1880s) **Presenter:** All right.

[31:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1881s) **Presenter:** We will not stop here, because

[31:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1883s) **Presenter:** just getting the

[31:25](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1885s) **Presenter:** dump of the data is just one thing that we can

[31:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1887s) **Presenter:** do, but we can also do

[31:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1888s) **Presenter:** other operations on top of the database.

[31:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1890s) **Presenter:** We can change information in the database.

[31:33](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1893s) **Presenter:** We can delete things. We can create

[31:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1894s) **Presenter:** different tables. I mean, why not?

[31:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1896s) **Presenter:** there's something here called a playground

[31:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1898s) **Presenter:** which actually creates for you a dynamic interface

[31:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1902s) **Presenter:** where you can pass through arbitrary commands

[31:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1905s) **Presenter:** to these credentials.

[31:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1906s) **Presenter:** And in this example, you're seeing a SQL query,

[31:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1910s) **Presenter:** which you can just pass to the application.

[31:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1913s) **Presenter:** So if you're interested in this,

[31:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1916s) **Presenter:** check out the tool, check out PowerGuest.

[31:59](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1919s) **Presenter:** If you're thinking about how you protect

[32:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1922s) **Presenter:** your organization from this thing,

[32:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1924s) **Presenter:** PowerPoint will help you as well

[32:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1926s) **Presenter:** to identify. You think, you put on your

[32:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1928s) **Presenter:** hacker hat and you see what a hacker

[32:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1930s) **Presenter:** would get to.

[32:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1932s) **Presenter:** Alright.

[32:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1934s) **Presenter:** I think what I'm going to go

[32:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1937s) **Presenter:** through now is probably the most important

[32:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1938s) **Presenter:** thing in this talk, and that's

[32:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1940s) **Presenter:** how do we defend ourselves from this.

[32:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1942s) **Presenter:** And before I go to specific

[32:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1944s) **Presenter:** recommendations, I would like to acknowledge

[32:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1946s) **Presenter:** that a strong

[32:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1949s) **Presenter:** collaboration that we've had with Microsoft

[32:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1950s) **Presenter:** Security Response Team, they've been great.

[32:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1952s) **Presenter:** We've been collaborating a lot

[32:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1954s) **Presenter:** these recent weeks.

[32:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1956s) **Presenter:** They have, so we've been working together to create good mitigations for you, so you'll see that in a moment, suggesting on what you can do better.

[32:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1964s) **Presenter:** We've been working on enabling, on figuring out which defaults can be different to make this problem less severe.

[32:51](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1971s) **Presenter:** There are currently no vulnerabilities at all.

[32:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1974s) **Presenter:** There's also a few disclosures that we're working through, but really, they've been great, so thank you for that.

[33:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1982s) **Presenter:** before I go to specific mitigations

[33:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1984s) **Presenter:** we need to figure, we need to understand

[33:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1985s) **Presenter:** the underlying problem here

[33:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1987s) **Presenter:** so when you think about

[33:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1990s) **Presenter:** cloud, there's an obvious

[33:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1992s) **Presenter:** shared responsibility model

[33:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1993s) **Presenter:** and I'm showing the shared responsibility model here for serverless

[33:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1995s) **Presenter:** and we know that while the platform

[33:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1998s) **Presenter:** is in charge of

[33:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=1999s) **Presenter:** building secure building blocks

[33:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2001s) **Presenter:** we are in charge of what we're building

[33:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2003s) **Presenter:** when we build an app

[33:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2004s) **Presenter:** the only way for us to

[33:27](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2007s) **Presenter:** actually make sure that app is safe

[33:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2010s) **Presenter:** as well. This is true for low-code

[33:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2012s) **Presenter:** and no-code as well. This is true for what your business users

[33:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2014s) **Presenter:** are building. So you don't own the code, that's

[33:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2016s) **Presenter:** fine, but you do own the business logic, you do

[33:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2018s) **Presenter:** own the data and access

[33:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2020s) **Presenter:** to that application. We are not

[33:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2022s) **Presenter:** pulling our part here.

[33:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2024s) **Presenter:** And so when we leave business users to make

[33:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2026s) **Presenter:** decisions on their own, of course, they

[33:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2028s) **Presenter:** might make mistakes because they're not security

[33:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2030s) **Presenter:** aware, and I'm not sure how much can

[33:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2032s) **Presenter:** they be, right? Because we're forcing

[33:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2034s) **Presenter:** them to make very tough decisions. So

[33:56](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2036s) **Presenter:** on this shared responsibility

[33:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2038s) **Presenter:** model, of course we need to push the platforms

[34:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2040s) **Presenter:** to be better.

[34:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2041s) **Presenter:** And I've been talking about Microsoft here,

[34:03](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2043s) **Presenter:** but there are many local and local platforms

[34:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2044s) **Presenter:** that we need to help them be better at this,

[34:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2047s) **Presenter:** provide better controls, better visibility.

[34:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2049s) **Presenter:** Just last week, researchers from Tenable

[34:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2052s) **Presenter:** found a multi-tenant vulnerability within Power Platform,

[34:15](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2055s) **Presenter:** the same thing that we've been discussing about today.

[34:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2058s) **Presenter:** And Microsoft, of course, fixed this already,

[34:20](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2060s) **Presenter:** and they were great in response.

[34:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2062s) **Presenter:** But it's important for us to remain vigilant,

[34:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2066s) **Presenter:** to push the platforms to be better.

[34:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2069s) **Presenter:** but it's also important for us to hold our part

[34:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2071s) **Presenter:** so if you work for a Microsoft shop

[34:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2074s) **Presenter:** for a large enterprise

[34:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2076s) **Presenter:** can you answer these questions

[34:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2078s) **Presenter:** do you know

[34:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2079s) **Presenter:** what applications your business users are building

[34:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2081s) **Presenter:** which data they're touching

[34:43](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2083s) **Presenter:** who are they sharing this with

[34:45](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2085s) **Presenter:** are you leaving your business users

[34:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2088s) **Presenter:** to make decisions

[34:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2089s) **Presenter:** about who they share their app with

[34:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2092s) **Presenter:** on their own

[34:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2093s) **Presenter:** because if you do well

[34:54](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2094s) **Presenter:** then you shouldn't expect anything else

[34:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2098s) **Presenter:** So this all translates to AppSec.

[35:01](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2101s) **Presenter:** We need to bring the business development

[35:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2105s) **Presenter:** under the security umbrella.

[35:07](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2107s) **Presenter:** And before we do that,

[35:10](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2110s) **Presenter:** I'm not sure how much we'll see this improve.

[35:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2113s) **Presenter:** And so let me now move to concrete things you can do.

[35:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2117s) **Presenter:** The first thing is how to build more secure applications.

[35:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2121s) **Presenter:** And the first kind of obvious recommendation,

[35:24](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2124s) **Presenter:** just don't share with everyone.

[35:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2126s) **Presenter:** Just don't share with too many people.

[35:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2128s) **Presenter:** Don't share with large groups.

[35:30](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2130s) **Presenter:** We've talked about the, like, share with everyone feature here for Power Platform,

[35:34](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2134s) **Presenter:** but guests can just get access directly.

[35:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2136s) **Presenter:** They can get access through groups.

[35:38](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2138s) **Presenter:** We've seen this happen multiple times in multiple ways.

[35:41](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2141s) **Presenter:** So just don't do that.

[35:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2142s) **Presenter:** And by the way, I'm going to give you a few resources here,

[35:46](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2146s) **Presenter:** and all of the links are below here.

[35:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2149s) **Presenter:** The other thing you can do is you can harden the...

[35:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2152s) **Presenter:** Sorry.

[35:52](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2152s) **Presenter:** You can make sure that your business users are actually building secure applications.

[35:57](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2157s) **Presenter:** And if you're thinking about what does this mean to help business users build secure applications,

[36:02](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2162s) **Presenter:** what are the problems that can happen, there's an OWASP project dedicated to this.

[36:06](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2166s) **Presenter:** So OWASP, local, local, top 10.

[36:08](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2168s) **Presenter:** Check it out.

### Recommendations & Best Practices — Part 3

[36:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2169s) **Presenter:** It provides the risks in two modes.

[36:13](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2173s) **Presenter:** One is for security folks, and the other, which we just had contributed to the project,

[36:18](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2178s) **Presenter:** in plain language that you can just send to your business users

[36:21](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2181s) **Presenter:** and hopefully they'll be able to understand.

[36:23](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2183s) **Presenter:** This includes threat scenarios, everything translated to a language

[36:26](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2186s) **Presenter:** that business users can understand.

[36:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2188s) **Presenter:** Check it out.

[36:28](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2188s) **Presenter:** It's the best framework we have today to try and guide those business users

[36:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2192s) **Presenter:** to make better decisions and to try to guide our own AppSec frameworks.

[36:37](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2197s) **Presenter:** So that's about building secure applications.

[36:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2200s) **Presenter:** You can also harden your environment.

[36:42](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2202s) **Presenter:** So one thing you can do is you can change the defaults

[36:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2204s) **Presenter:** because the defaults are on the productivity side

[36:49](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2209s) **Presenter:** rather than on the security side.

[36:50](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2210s) **Presenter:** You can change the defaults on Azure Active Directory.

[36:53](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2213s) **Presenter:** You can change the defaults on Power Apps.

[36:55](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2215s) **Presenter:** You're seeing one screenshot here, but just go to the link.

[36:58](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2218s) **Presenter:** You'll find there a bunch of information

[37:00](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2220s) **Presenter:** about the specific defaults that you can change to.

[37:04](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2224s) **Presenter:** AppSec.

[37:05](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2225s) **Presenter:** We need to bring business users under the security umbrella,

[37:09](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2229s) **Presenter:** and AppSec needs to own what those business users are building.

[37:12](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2232s) **Presenter:** This is not an easy job.

[37:14](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2234s) **Presenter:** in checking and understanding how this looks like.

[37:17](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2237s) **Presenter:** How are people succeeding to do this already?

[37:19](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2239s) **Presenter:** There are organizations that have been able to do this already.

[37:22](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2242s) **Presenter:** Check out the talk I gave yesterday on the stage, like close here.

[37:29](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2249s) **Presenter:** Well, you'll just find it.

[37:31](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2251s) **Presenter:** All right.

[37:32](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2252s) **Presenter:** And the last recommendation is hack your own environment.

[37:36](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2256s) **Presenter:** Because we are already seeing hackers using these techniques.

[37:39](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2259s) **Presenter:** That's why it's important.

[37:40](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2260s) **Presenter:** That's why it was important for me to talk to you about it today.

[37:44](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2264s) **Presenter:** on and hack your own environment and get yourself secured.

[37:48](https://www.youtube.com/watch?v=dmbRpwP5L9s&t=2268s) **Presenter:** Thank you very much.
<!-- talk-enrichment:end -->
