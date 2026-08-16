---
title: "All You Need Is Guest"
talk_date: 2024-06-27
conference: BSidesTLV 2024
presented_by: Avishai Efrat
permalink: /talks/2024-06-27-bsidestlv2024-all-you-need-is-guest/
layout: talk
recording_url: https://www.youtube.com/watch?v=9EEnS7nUxrY
description: "EntraID guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. In this talk, we will…"
abstract_source_url: "https://web.archive.org/web/20240419233147/https://www.caro2024.org/agenda/#inline_16-2"
abstract_retrieved_at: "2026-08-14"
abstract_source_scope: "same-talk-official-agenda"
abstract_source_conference: "CARO Workshop 2024"
abstract_source_talk_slug: "2024-05-02-caro2024-all-you-need-is-guest"
transcript_source_url: "https://www.youtube.com/watch?v=9EEnS7nUxrY"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "e5479701bd2612c8ca86640b9c621cb2263276eba1b545c1b2ae0e16d17e9370"
---


<!-- talk-enrichment:start -->
## Abstract

EntraID guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong.

In this talk, we will show how guests can leverage undocumented APIs to bypass limitations and gain unauthorized access to sensitive business data and capabilities including corporate SQL servers and Azure resources. Furthermore, we will reveal how guests can create and control internal business applications to move laterally within the organization. All capabilities presented in the talk will be demonstrated with default Office 365 and EntraID configuration.

Next, we will drop PowerPwn, an offensive security toolset for Microsoft 365 focused on Power Platform. PowerPwn uncovers the true scope of guest access in your tenant. It automates limitation bypass, enumerate and dump all accessible data, and allow for interactive write and delete operations by the researcher.

Finally, we will make up for shattering the illusion of guests having limited access by sharing concrete steps to harden your Azure AD and Office 365 configurations to prevent such attacks and suggest detection logic to catch them if a change in configuration is not possible.

_[Official agenda abstract for this talk, sourced from CARO Workshop 2024](https://web.archive.org/web/20240419233147/https://www.caro2024.org/agenda/#inline_16-2)_

## Transcript

> AI generated from recording.

### Opening the Stage; Why Guest Users Matter

[00:00](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=0s) **Presenter:** The stage is yours.

[00:01](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1s) **Presenter:** Thank you and welcome. I'm here to talk to you today about guest users in Entry ID and what they can do in your tenant. And I'll give you a small hint. It's much more than you might think.

[00:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=17s) **Presenter:** So I'm actually going to talk to you about Michael Barguri's research.

[00:22](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=22s) **Presenter:** He's the CTO and co-founder at Zenity, a company that's focused on low-code, no-code security,

[00:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=29s) **Presenter:** recently also Gen.AI.

[00:31](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=31s) **Presenter:** I'm a senior security researcher there, and I'm also the answer to the question,

[00:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=36s) **Presenter:** hacker or rock star, why not both?

[00:40](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=40s) **Presenter:** Thank you.

[00:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=41s) **Presenter:** I heard that clapping.

[00:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=43s) **Presenter:** Thank you.

[00:44](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=44s) **Presenter:** It's also my first time here.

[00:45](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=45s) **Presenter:** I'm actually very excited.

[00:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=49s) **Presenter:** Okay, let's start.

[00:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=50s) **Presenter:** I want to talk to you about the guests in Entry ID

[00:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=53s) **Presenter:** and what the real security boundaries for them are.

[00:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=57s) **Presenter:** And I want to start doing so by actually talking about

[01:00](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=60s) **Presenter:** why do we even have a mechanism in the tenants in Entry ID

[01:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=66s) **Presenter:** to actually invite guests.

[01:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=68s) **Presenter:** Okay, why do we even have that?

[01:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=70s) **Presenter:** Okay, so let's say you're working in an organization,

[01:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=72s) **Presenter:** you want to collaborate maybe with other vendors, people from the outside, you have a million reasons to do that, right?

[01:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=80s) **Presenter:** Send sensitive data around, whatever, okay?

[01:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=83s) **Presenter:** We have a few options to do that.

[01:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=84s) **Presenter:** We can just send those emails, right?

[01:27](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=87s) **Presenter:** That's one option.

[01:27](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=87s) **Presenter:** It's a very bad option, of course.

[01:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=89s) **Presenter:** I think everybody can agree on that for numerous reasons.

[01:33](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=93s) **Presenter:** Also, we can just choose a file sharing platform, for example, and just put it there.

[01:40](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=100s) **Presenter:** But that's very bad, right?

[01:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=102s) **Presenter:** some random person on the street, a random USB, we basically leave ourselves wide open.

[01:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=109s) **Presenter:** We have no information about what they do security-wise.

### The Guest Invitation Process

[01:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=114s) **Presenter:** Another option, actually, pretty interesting, is inviting them into our organization, to

[01:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=119s) **Presenter:** our tenant.

[02:00](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=120s) **Presenter:** That might be a better option.

[02:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=122s) **Presenter:** Now, why is that a better option?

[02:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=124s) **Presenter:** Because when we invite them as guests, basically, we create external identities in the Active

[02:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=130s) **Presenter:** directory and we can both share more resources with them while also enforcing some restrictions

[02:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=138s) **Presenter:** and protecting our resources, so to speak, which, okay, that's a win-win, right? That sounds pretty

[02:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=144s) **Presenter:** good, I think, okay? So we can agree that in order for us to achieve safe guest access, which

[02:31](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=151s) **Presenter:** sounds good, it's really promising, we need two things, right? First of all, it needs to be easy,

[02:37](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=157s) **Presenter:** right it can't be difficult okay no matter what your identity is google okta microsoft whatever

[02:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=162s) **Presenter:** the second thing is that it needs to be really easy for it and security to control okay we said

[02:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=169s) **Presenter:** something about security controls um yeah it needs to be easy to enforce those security controls okay

[02:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=175s) **Presenter:** so getting guest access the first thing okay let's talk about that is actually very very easy okay

[03:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=182s) **Presenter:** It's super easy.

[03:03](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=183s) **Presenter:** Let me show you here.

[03:05](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=185s) **Presenter:** Yes.

[03:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=186s) **Presenter:** Okay.

[03:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=186s) **Presenter:** So we can see here a bunch of ways to do that.

[03:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=190s) **Presenter:** It's basically we just need to plug in the email.

[03:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=192s) **Presenter:** Okay?

[03:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=192s) **Presenter:** That's the TLDR.

[03:14](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=194s) **Presenter:** You can do it through Teams.

[03:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=196s) **Presenter:** You can do it through SharePoint.

[03:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=197s) **Presenter:** You can do it through whatever you want.

[03:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=199s) **Presenter:** It's very easy.

[03:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=199s) **Presenter:** It takes five seconds.

[03:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=200s) **Presenter:** And basically you just create that guest user.

[03:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=203s) **Presenter:** You've just invited a guest user.

[03:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=205s) **Presenter:** It can be a hacker.

[03:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=205s) **Presenter:** It can be not a hacker.

### Security Boundaries for Guests; Guest Access in Practice

[03:27](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=207s) **Presenter:** Whatever.

[03:27](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=207s) **Presenter:** Okay?

[03:28](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=208s) **Presenter:** Super easy.

[03:28](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=208s) **Presenter:** So we can agree that point one happens, right?

[03:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=212s) **Presenter:** specific type of access and we'll talk about what that means shortly. But let's talk about the second

[03:38](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=218s) **Presenter:** thing. Is it really easy for IT and security to control? Well, in order to answer that, let's

[03:44](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=224s) **Presenter:** actually understand what happens. Because on the left side we have the identity providers

[03:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=230s) **Presenter:** of the external entities or whatever, the guests. On the right side we have the identity provider

[03:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=236s) **Presenter:** for our organization, okay?

[03:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=238s) **Presenter:** And the cool thing here is that when the link is established,

[04:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=242s) **Presenter:** basically we enforce a bunch of security protections upon them, right?

[04:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=246s) **Presenter:** We said that they have now external,

[04:09](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=249s) **Presenter:** they created in our Active Directory as external identities,

[04:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=252s) **Presenter:** and so we can activate things like security controls, MFA,

[04:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=255s) **Presenter:** and all these good things.

[04:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=257s) **Presenter:** That sounds perfect, right?

[04:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=259s) **Presenter:** Sounds really, really good, okay?

[04:22](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=262s) **Presenter:** But wait a minute.

[04:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=263s) **Presenter:** Didn't we just say something about active directory, guests, somebody external in our active directory?

[04:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=269s) **Presenter:** That sounds a little odd.

[04:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=272s) **Presenter:** What does that mean?

[04:33](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=273s) **Presenter:** Do they get full access?

[04:35](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=275s) **Presenter:** Well, luckily, no.

[04:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=276s) **Presenter:** Okay, that would be really strange if they would, because we'd be basically inviting somebody random or somebody external to have the same permissions as someone that works for us.

[04:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=289s) **Presenter:** Okay, we don't want that.

[04:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=290s) **Presenter:** And so we want a deny-by-default access, okay?

[04:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=295s) **Presenter:** And this is really, really important.

[04:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=297s) **Presenter:** But this is also part of the mechanism that we want to examine in this talk, okay?

[05:03](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=303s) **Presenter:** This is part of it, okay?

[05:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=304s) **Presenter:** And the reason for that is all that we've discussed so far is the promise of security for guests, okay?

[05:11](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=311s) **Presenter:** It's the theory, okay?

[05:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=313s) **Presenter:** Now let's talk about the practice, okay?

[05:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=315s) **Presenter:** And you might see, you might find some main key differences, okay?

[05:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=320s) **Presenter:** So as a benign user, let's go into our tenant, okay, into our entry ID.

[05:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=325s) **Presenter:** You can see that I'm a benign user because of the green icon on the right lower side, okay.

[05:31](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=331s) **Presenter:** I'm logging in.

[05:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=332s) **Presenter:** I'm already logged in, actually.

[05:34](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=334s) **Presenter:** I want to invite somebody in, okay.

[05:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=336s) **Presenter:** Let's see that, okay, as a benign user.

[05:38](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=338s) **Presenter:** I start just, I want to add it as a member.

[05:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=341s) **Presenter:** I'm starting to add them.

[05:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=342s) **Presenter:** Okay, I entered the email.

[05:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=343s) **Presenter:** Why not a hacker?

[05:44](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=344s) **Presenter:** You know, why not?

[05:46](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=346s) **Presenter:** And I'm inviting them, okay.

[05:48](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=348s) **Presenter:** That's everything, okay.

[05:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=350s) **Presenter:** Basically, they're invited.

[05:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=351s) **Presenter:** Real easy.

[05:52](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=352s) **Presenter:** We said that.

[05:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=353s) **Presenter:** What happens on the other side, right?

[05:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=355s) **Presenter:** As the hacker now, okay?

[05:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=356s) **Presenter:** And we can see that according to the red icon, okay?

[05:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=359s) **Presenter:** I log into my hacker tenant, right?

[06:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=362s) **Presenter:** I have a hacker tenant.

[06:03](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=363s) **Presenter:** And then my email gets, my tenant gets a consent, okay?

[06:09](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=369s) **Presenter:** I have to accept the invitation from that guest tenant, okay?

[06:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=373s) **Presenter:** Once I accept that, I go to that guest tenant that I've been invited to, but I don't see anything, right?

[06:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=380s) **Presenter:** see an app's window and it's empty okay there's nothing there this is great actually because we

[06:26](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=386s) **Presenter:** said we want to deny by default okay this is great so you know maybe everything works as expected

[06:33](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=393s) **Presenter:** and you know maybe we can just go home I think maybe we're done but but not exactly of course

### Phishing via Teams

[06:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=401s) **Presenter:** because we have to talk about the real attack surface of guests okay and I want to start doing

[06:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=410s) **Presenter:** explaining something. So what we're trying to see is that guests are much more powerful than you might think.

[06:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=417s) **Presenter:** Two examples of that are, first of all, team-based phishing. So Teams is one of the main platforms that organizations use to collaborate.

[07:07](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=427s) **Presenter:** And it's both a collaborative platform, but it's also an enterprise platform. And those things sometimes don't work well.

[07:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=435s) **Presenter:** They don't mix well. And one example of that is that users in Teams from one tenant can actually send messages to users in another tenant.

[07:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=444s) **Presenter:** And we're all used to Teams being internal. So this is kind of confusing.

[07:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=450s) **Presenter:** And attackers abuse this. This is just from the Microsoft blog, an example of how APTs use something called Teamfisher.

[07:37](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=457s) **Presenter:** You can look it up. It's an open source tool.

[07:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=459s) **Presenter:** It's pretty cool because they actually not only abused the fact that you can send cross-tenant messages,

[07:46](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=466s) **Presenter:** but they also were able to bypass some security restrictions and attach files to Teams.

[07:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=473s) **Presenter:** So that's, in a way, moving phishing from emails to Teams.

[07:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=479s) **Presenter:** That's really powerful, and you can do that as a guest if you invite somebody as a guest because there are two tenants involved.

[08:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=486s) **Presenter:** And this is actually pretty interesting because if you look on how it looks like in Teams, can you even spot that it's an external user?

[08:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=496s) **Presenter:** Maybe not from the distance, but it's really, really small.

[08:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=500s) **Presenter:** That's right there, the upper red box.

[08:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=503s) **Presenter:** That's your protection mechanism.

[08:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=504s) **Presenter:** It says like really, really small, external in two parentheses, okay?

[08:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=510s) **Presenter:** So that's your protection mechanism, okay?

[08:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=512s) **Presenter:** And this is somewhat concerning, okay?

[08:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=516s) **Presenter:** we can do as guests. Another really cool thing that I always love is recon. So you wouldn't

[08:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=523s) **Presenter:** expect that somebody that I had just invited to my organization as a guest would be able

[08:48](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=528s) **Presenter:** to recon users on my tenant, right? That doesn't make sense. Why would he be able to do that?

[08:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=533s) **Presenter:** He's a guest. He's not supposed to have like denied by default access. But there's a really,

[08:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=539s) **Presenter:** really cool tool and research that I really recommend you go to called AAD Internals if

[09:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=546s) **Presenter:** interested in all this subject, okay? And what it says actually is that you can definitely do that,

[09:14](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=554s) **Presenter:** okay? It's really possible and you can do that. And we're not going to like dive into it because

[09:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=559s) **Presenter:** that's beyond the scope of this talk, but it's basically abusing the fact that you can say,

[09:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=565s) **Presenter:** okay, I have my user ID. If I have a user ID, even as a guest, I can know which roles and which

[09:31](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=571s) **Presenter:** groups that user ID has. Now the guest is always in the guest group, okay? And if I have a guest,

[09:38](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=578s) **Presenter:** sorry, a group, a certain group's ID, I can know which users are there. So you understand where

### Reconnaissance with Guest Accounts

[09:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=583s) **Presenter:** I'm getting here. You can do this recursively, and sometimes the guest is in more than one group,

[09:47](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=587s) **Presenter:** and you end up with a much larger number of users that you can actually enumerate. And this

[09:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=593s) **Presenter:** is not, it will probably not be for all the tenants' users, but it's a large list, okay?

[09:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=598s) **Presenter:** So that's pretty crazy, right?

[10:00](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=600s) **Presenter:** I mean, if we haven't updated our threat models with guests being abused by attackers,

[10:07](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=607s) **Presenter:** guest access, then we actually should do this.

[10:11](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=611s) **Presenter:** But hackers always want more, right?

[10:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=613s) **Presenter:** We want to change stuff.

[10:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=615s) **Presenter:** We want to destroy stuff.

[10:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=616s) **Presenter:** We want to edit stuff.

[10:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=618s) **Presenter:** Okay, what else can we actually do?

[10:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=620s) **Presenter:** So let's switch gears now and actually go to the main part of the talk,

[10:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=624s) **Presenter:** which is the real attack surface of guests.

[10:28](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=628s) **Presenter:** And before we do that, I have to tell you that you have a choice.

[10:34](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=634s) **Presenter:** You can stop here, assuming you have a tenant at home and enter ID.

[10:38](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=638s) **Presenter:** You can just go home because I might kind of ruin your week now

[10:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=642s) **Presenter:** because you'll understand that you have a load of work to do when you get back to the office.

[10:47](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=647s) **Presenter:** Or you can stay and listen to what I have to say.

[10:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=651s) **Presenter:** Assuming there's no takers here, I'll actually continue, okay?

[10:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=655s) **Presenter:** And by continuing, I'm actually going to go to that link on the left.

[11:01](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=661s) **Presenter:** And when I click on it as a guest, I'm actually going to go to something called Power Apps within the Power Platform ecosystem.

[11:11](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=671s) **Presenter:** Okay, I get, again, as a hacker, I get to this hello screen.

[11:14](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=674s) **Presenter:** Okay, that's great.

[11:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=675s) **Presenter:** And then there's a disconnect.

[11:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=677s) **Presenter:** Okay, basically it's saying, hey, wait, wait a minute.

[11:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=679s) **Presenter:** It's a deny by default.

[11:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=680s) **Presenter:** Who are you?

[11:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=680s) **Presenter:** You're not part of this tenant.

[11:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=681s) **Presenter:** Go home.

[11:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=683s) **Presenter:** Okay, I go home to my tenant.

### Power Platform Credentials Exposure

[11:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=685s) **Presenter:** direct, that's cool, I guess. But then I can see, okay, that shows us that we're in our home tenant,

[11:33](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=693s) **Presenter:** Pontoso, by the way, which is a tribute, yes, somebody understood. And if we click on switch

[11:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=699s) **Presenter:** directory, we can actually see whatever other tenants, whatever full tenants we can access to,

[11:45](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=705s) **Presenter:** okay, the ones, for example, that we've been invited to. What if I just switch to that tenant

[11:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=709s) **Presenter:** again and i go to connections okay now this is by the way the original url that we tried to enter

[11:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=717s) **Presenter:** now the thing about this is we're looking at a list of something it looks kind of interesting

[12:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=722s) **Presenter:** right as security uh people we're seeing like azure file storage sql azure store blah blah blah

[12:09](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=729s) **Presenter:** it's it's kind of interesting okay and that's because connections in the power platform ecosystem

[12:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=736s) **Presenter:** are actually interchangeable with credentials.

[12:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=738s) **Presenter:** And I'll explain what that means.

[12:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=740s) **Presenter:** But basically, we're looking at a credentials list for different data sources.

[12:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=745s) **Presenter:** And that's kind of weird.

[12:26](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=746s) **Presenter:** Why would a guest like ourselves, as a hacker in this situation, be even able to see this?

[12:33](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=753s) **Presenter:** It's kind of odd, right?

[12:35](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=755s) **Presenter:** Let's try to understand that a little bit further.

[12:37](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=757s) **Presenter:** Let's click on one.

[12:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=759s) **Presenter:** And if we click here, we see a share button.

[12:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=763s) **Presenter:** Now, I don't know about you, but my mother always said, don't share your credentials.

[12:47](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=767s) **Presenter:** So it's kind of weird that we have a share button on something that we just said, hey, it's exactly like credentials.

[12:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=776s) **Presenter:** That's kind of odd.

[12:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=777s) **Presenter:** And let's try to understand exactly what's happening here, okay?

[13:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=782s) **Presenter:** So if we press on share, we see that this connection, okay, has already been shared with several entities, okay?

[13:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=792s) **Presenter:** is the entire organization, which could explain maybe why we're seeing it.

[13:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=797s) **Presenter:** And we have two other entries for Jamie, wherever Jamie is.

[13:22](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=802s) **Presenter:** We have an Outlook and a Non-Outlook, because why not?

[13:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=805s) **Presenter:** And folks, this is of course the problem, right?

[13:27](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=807s) **Presenter:** Somebody shared this connection, which again is interchangeable with a credential in a power platform ecosystem with the entire organization.

[13:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=816s) **Presenter:** It might have been Jamie, we'll figure that out.

[13:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=819s) **Presenter:** But this is the root of the issue, okay?

[13:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=822s) **Presenter:** this is concerning.

### Bypassing DLP in Power Apps; Exploiting API Management

[13:44](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=824s) **Presenter:** So let's try to understand what's exactly behind this.

[13:47](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=827s) **Presenter:** Why is this even happening, right?

[13:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=829s) **Presenter:** We click on details next,

[13:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=833s) **Presenter:** and we see that Jamie is the owner.

[13:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=835s) **Presenter:** Oh, Jamie, she shared it.

[13:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=839s) **Presenter:** But Jamie is basically a business user, okay?

[14:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=842s) **Presenter:** So what does that mean?

[14:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=844s) **Presenter:** Why are business users,

[14:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=846s) **Presenter:** in this case a customer service representative,

[14:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=848s) **Presenter:** why are they sharing credentials?

[14:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=850s) **Presenter:** What's happening here?

[14:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=853s) **Presenter:** here is that business users in the low-code, no-code era are building apps.

[14:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=861s) **Presenter:** Okay?

[14:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=861s) **Presenter:** They're doing it.

[14:22](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=862s) **Presenter:** They've been doing it actually for years using dragging and dropping, and they are doing

[14:26](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=866s) **Presenter:** it now using Gen.AI.

[14:28](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=868s) **Presenter:** They can just plug into a chat GPT like text, LLM, whatever, and just create an application

[14:35](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=875s) **Presenter:** including all the misconfigurations that come along with it, and they can just do it themselves.

[14:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=881s) **Presenter:** Okay?

[14:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=882s) **Presenter:** is already happening okay if you kind of think yeah you know my organization we're a financial

[14:48](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=888s) **Presenter:** service we don't really do that i have to convince you that according to microsoft i have to convince

[14:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=894s) **Presenter:** you that's probably wrong because according to microsoft last year there were eight million

[14:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=898s) **Presenter:** of these citizen developers okay compared to for example c sharp.net which were only there were

[15:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=904s) **Presenter:** only five million okay and how much security are we investing in these citizen developers okay

[15:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=910s) **Presenter:** these business users. Now also remember their business users, they're not supposed to be security experts.

[15:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=917s) **Presenter:** They aren't and they shouldn't be. So of course they're going to make misconfigurations.

[15:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=925s) **Presenter:** We have to help them, we have to own this. So now that we've actually seen all of this, this is kind of interesting,

[15:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=932s) **Presenter:** what can we actually do with that as attackers? Let's look at that.

[15:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=936s) **Presenter:** So we're back here at the specific connection we observed earlier as the attacker.

[15:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=941s) **Presenter:** You can actually see two different tabs here.

[15:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=943s) **Presenter:** Okay, let's click on the apps using this connection.

[15:46](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=946s) **Presenter:** And we can see that there's an application actually using what we said was a credential,

[15:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=951s) **Presenter:** what we said was a connection, and we'll explain that shortly.

[15:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=954s) **Presenter:** We click on it because as hackers we're saying, okay, let's see what we can find.

[15:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=959s) **Presenter:** Can we actually exfil some data here?

[16:01](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=961s) **Presenter:** And then we get to this page.

[16:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=964s) **Presenter:** We see that there's a link here and a bunch of info.

[16:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=966s) **Presenter:** Let's click on the link and try to understand what's going on.

[16:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=968s) **Presenter:** Oh, we get an error.

[16:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=970s) **Presenter:** Okay, what's going on here?

[16:11](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=971s) **Presenter:** Okay, we get some error about something.

[16:14](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=974s) **Presenter:** We don't have a correct plan or something.

[16:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=976s) **Presenter:** Ask your admin, whatever.

[16:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=978s) **Presenter:** If we read this a little bit more thorough,

[16:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=981s) **Presenter:** we actually notice that it's basically saying,

[16:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=984s) **Presenter:** listen, you don't have a license for Power Apps,

[16:26](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=986s) **Presenter:** but you can ask your admin for one.

[16:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=989s) **Presenter:** So maybe if we ask our hacker tenant admin for one,

[16:35](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=995s) **Presenter:** would that work?

[16:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=996s) **Presenter:** Could we be able to access this Power Apps in another tenant for which we saw an error

[16:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1002s) **Presenter:** that we don't have a license?

[16:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1003s) **Presenter:** Let's try.

[16:44](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1004s) **Presenter:** I mean, why not?

[16:46](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1006s) **Presenter:** We go to Microsoft.

[16:47](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1007s) **Presenter:** We say, hi, I'm a hacker.

[16:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1009s) **Presenter:** Please give me a license.

[16:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1011s) **Presenter:** And we get a license because it's our home tenant.

[16:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1014s) **Presenter:** And basically we can get whichever license we want, right?

[16:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1018s) **Presenter:** And then it works.

[17:00](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1020s) **Presenter:** Okay.

### Token Exchange and Red Teaming Tools

[17:01](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1021s) **Presenter:** That's cool.

[17:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1022s) **Presenter:** So we've kind of bypassed that issue.

[17:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1026s) **Presenter:** Okay, it's interesting.

[17:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1028s) **Presenter:** It says something about a data loss prevention policy, blah, blah.

[17:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1032s) **Presenter:** We look through it.

[17:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1033s) **Presenter:** We actually see that it's basically blocking us.

[17:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1036s) **Presenter:** Okay, a DLP, which we might be familiar with from other aspects of security, is blocking us.

[17:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1041s) **Presenter:** And that's actually pretty great because we know what a DLP is from other sections of security.

[17:28](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1048s) **Presenter:** And it's supposed to mitigate that access.

[17:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1050s) **Presenter:** It's supposed to safeguard it.

[17:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1052s) **Presenter:** That's great.

[17:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1052s) **Presenter:** Okay, let's try to actually understand what's going on here.

[17:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1056s) **Presenter:** the DLP is actually built into Power Platform. Oh, perfect. So let's actually create one now as a

[17:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1063s) **Presenter:** benign user to try to understand what a DLP is here, okay? And let's say social security numbers,

[17:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1071s) **Presenter:** you know, just create like a demo one. Okay, let's assign connectors. Connectors in Power Platform

[17:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1076s) **Presenter:** are basically data source types, okay? We can see SharePoint, OneDrive. Okay, cool. Okay. But then

[18:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1084s) **Presenter:** when we actually pick one, we start noticing something maybe a little strange, okay? We don't

[18:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1088s) **Presenter:** have any granularity, and basically, this isn't a DLP in maybe the sense that we are used to, okay?

[18:16](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1096s) **Presenter:** It's not labeling. It's not really doing some data exfiltration protection. It's basically an

[18:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1101s) **Presenter:** allow and deny list, okay? And that's a problem in a way, and you sometimes have more security

[18:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1109s) **Presenter:** mechanisms in Power Platform, but these things, these DLPs, they're basically allowing denialists

[18:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1116s) **Presenter:** for the data sources that these apps use, okay? And that's a little bit of an issue because we

[18:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1122s) **Presenter:** don't have any user association here, and we're basically saying, okay, I don't want any app to

[18:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1129s) **Presenter:** use this kind of data source. You know, you could start to think about this as a hacker and say,

[18:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1134s) **Presenter:** wait a minute, that leaves a bit of a security hole, right?

[18:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1139s) **Presenter:** So we at the company actually have a hobby to find these security holes.

[19:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1144s) **Presenter:** There are quite a few.

[19:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1146s) **Presenter:** And the thing about these are that it's, I'm talking about this,

[19:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1152s) **Presenter:** not to say that the DLP mechanism is bad, it's a good tool,

[19:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1155s) **Presenter:** but it's not a security boundary, okay?

### Defensive Takeaways — Part 1

[19:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1158s) **Presenter:** It's a governance tool, okay?

[19:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1159s) **Presenter:** It will not stop any hacker or any persistent citizen developer

[19:24](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1164s) **Presenter:** actually abusing Power Platform. And this is important for us to understand.

[19:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1170s) **Presenter:** So let's actually go back to the hacker perspective here and let's try to see what we can do.

[19:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1181s) **Presenter:** So for a moment I'm going to deactivate that DLP because I want to see what we can get from the

[19:48](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1188s) **Presenter:** data source. So I'm going into the DLP and I'm actually going to close things. I'm going to

[19:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1194s) **Presenter:** unblock data sources, the one that we saw, maybe some others, that the application is using. Don't

[19:59](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1199s) **Presenter:** worry, we'll get back to this in a moment, okay? I won't forget, I promise. So as a benign user,

[20:05](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1205s) **Presenter:** we now log into the app again without that restriction. And we have this screen, okay?

[20:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1210s) **Presenter:** and it says allow, and notice that it's an allow, but it's not granting access in the OAuth scope

[20:19](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1219s) **Presenter:** permission sense. This is credentials sharing, okay? This is what's going to happen here, and I'll

[20:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1225s) **Presenter:** explain that in a moment, okay? We press on allow, and then we see the data. Okay, that's great. That's

[20:31](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1231s) **Presenter:** what we wanted, okay? We are seeing data via power-ups, okay? We can see the customers here. Okay,

[20:38](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1238s) **Presenter:** Okay, interesting.

[20:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1239s) **Presenter:** What's actually happening here though, okay?

[20:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1242s) **Presenter:** When we look at through our browser, we open the developer tools,

[20:46](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1246s) **Presenter:** we can see that actually there's an API invocation call here, okay?

[20:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1250s) **Presenter:** There's an API call getting that data, okay?

[20:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1253s) **Presenter:** And this is actually interesting because when we observe this further,

[20:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1256s) **Presenter:** we're not seeing anything like an OAuth that we get access to

[21:02](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1262s) **Presenter:** to perform operations on the user's behalf or anything.

[21:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1264s) **Presenter:** We're basically seeing an API call that is replaying some secret back, and that's what's allowing us to access that data source.

[21:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1275s) **Presenter:** And that's kind of surprising, okay?

[21:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1278s) **Presenter:** And it also, we can see that it starts with APIM, which is the API hub.

[21:22](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1282s) **Presenter:** It's an internal Microsoft resource, okay?

[21:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1285s) **Presenter:** So let's try to figure out what's going on here.

[21:27](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1287s) **Presenter:** Let's copy this request to the side, okay?

[21:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1290s) **Presenter:** Let's just look at it as a curl request or whatever.

[21:34](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1294s) **Presenter:** a get in this example. Could have been, by the way, another method. And we can see that there's

[21:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1301s) **Presenter:** a domain here, the API M, the API hub that we talked about that allows us to get this information.

[21:47](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1307s) **Presenter:** Then we can see SQL, which is the data source, right? We have a specific ID because it's a specific

[21:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1311s) **Presenter:** instance of an SQL. This is, by the way, also what the credentials are related to.

[21:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1317s) **Presenter:** Then we have an operation related to the data set, to the application. And finally, we have

[22:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1324s) **Presenter:** actually when we decode it, it's the table, right? It's the table that was accessed through the app.

[22:09](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1329s) **Presenter:** Okay, that's pretty cool. What the hell is going on here?

[22:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1333s) **Presenter:** So what's going on here is that we have the API management for Azure that sits between power platform and whatever data source that we actually fetch, okay?

[22:26](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1346s) **Presenter:** And what that API has is a credential, a metadata store in which it stores secrets, okay?

[22:34](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1354s) **Presenter:** When you create a connection, you actually plug in credentials that are being stored there.

[22:41](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1361s) **Presenter:** And you actually share, if you share that connection, you share not the credentials themselves directly, but you actually share the ability to call that API and then use it on your behalf.

[22:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1373s) **Presenter:** And that's interesting.

[22:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1376s) **Presenter:** Okay, maybe we can use that.

[22:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1377s) **Presenter:** What if we just copy that request and don't go through Power Apps at all now?

[23:05](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1385s) **Presenter:** we have an API code,

[23:06](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1386s) **Presenter:** what do we need Power Apps directly now?

[23:09](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1389s) **Presenter:** Would we be able to see the data maybe?

[23:12](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1392s) **Presenter:** Well, the answer is yes.

[23:14](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1394s) **Presenter:** We can just see the data

[23:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1395s) **Presenter:** that the DLP or the Power Apps tried to stop us.

[23:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1400s) **Presenter:** We can just access it directly.

[23:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1403s) **Presenter:** And the reason why this works

[23:26](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1406s) **Presenter:** is because the DLP wasn't blocking the connection.

[23:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1409s) **Presenter:** It wasn't blocking the connection to the data source.

[23:32](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1412s) **Presenter:** it was blocking apps from using it.

[23:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1416s) **Presenter:** And now this has been disclosed and resolved, okay?

[23:40](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1420s) **Presenter:** But notice that it's one of the holes that we mentioned earlier.

[23:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1423s) **Presenter:** But note that you should still be aware

[23:45](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1425s) **Presenter:** because the fix is only relevant for new connections, okay?

[23:50](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1430s) **Presenter:** And this is kind of concerning, I think, okay?

[23:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1435s) **Presenter:** And, okay, so what actually can we do with this?

[23:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1438s) **Presenter:** How can we really leverage it to get a full home run from the hacker perspective?

[24:03](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1443s) **Presenter:** So let's take a closer look at this API.

[24:07](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1447s) **Presenter:** Now, this API, it uses a token.

[24:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1450s) **Presenter:** Now we're looking at Jot.io to actually understand.

[24:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1453s) **Presenter:** We needed a token to actually be able to send that API request.

[24:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1458s) **Presenter:** We couldn't just do it right off the bat.

[24:21](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1461s) **Presenter:** We needed a token to do that.

[24:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1463s) **Presenter:** And we could do that with a Power Apps token, which has this specific scope for that API hub that we just mentioned.

[24:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1470s) **Presenter:** So, I mean, we want to get a full home run or whatever the phrase is.

[24:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1476s) **Presenter:** Can we maybe generate our own token to do that?

[24:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1479s) **Presenter:** Well, we know that we can generate tokens, right?

[24:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1482s) **Presenter:** That's a mechanism that we understand.

[24:44](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1484s) **Presenter:** But we need the correct client ID.

[24:46](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1486s) **Presenter:** We need the correct application.

[24:48](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1488s) **Presenter:** So, what if we use a public app maybe to do that?

[24:53](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1493s) **Presenter:** Can we maybe do that?

[24:54](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1494s) **Presenter:** Well, no.

[24:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1495s) **Presenter:** And the reason is because it needs to be pre-approved in the tenant.

[24:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1498s) **Presenter:** So in other words, this means that it wouldn't exist in any tenant.

[25:04](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1504s) **Presenter:** The second thing that we want to try is maybe if we can create our own app.

[25:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1508s) **Presenter:** So no also because it needs to be able to query the MSFT internal scope.

[25:15](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1515s) **Presenter:** So now we're really, really, really close.

[25:17](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1517s) **Presenter:** So what can we do?

[25:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1518s) **Presenter:** So we're going to solve this actually by doing three things.

[25:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1523s) **Presenter:** owned by default, that is pre-approved to query that internal resource, and that is

[25:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1529s) **Presenter:** able to generate tokens on demand.

[25:31](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1531s) **Presenter:** We want a full bypass here, and it's supposed to be a public client for that.

[25:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1536s) **Presenter:** And one application that does that is the PowerApps portal, because we saw it earlier, we were

[25:42](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1542s) **Presenter:** able to do that, but not exactly.

[25:45](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1545s) **Presenter:** We couldn't actually generate tokens on its behalf.

[25:48](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1548s) **Presenter:** So we're going to solve this using a really, really neat piece of research called the family of client IDs research.

[25:55](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1555s) **Presenter:** And in a nutshell, it just enables you to exchange one token for another.

[26:00](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1560s) **Presenter:** But they have to be within the same family of tokens.

[26:03](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1563s) **Presenter:** That's what it basically says.

[26:05](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1565s) **Presenter:** And this is exactly why you don't have to re-log into SharePoint and stuff like that when you go to it from another subdomain or whatever, from another Microsoft domain.

[26:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1573s) **Presenter:** So this is a family of tokens, for example.

### Defensive Takeaways — Part 2

[26:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1578s) **Presenter:** one we basically compromise all of them so power apps is what we wanted it worked and we can also

[26:23](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1583s) **Presenter:** use the azure cli because we we know that we can generate tokens on demand so would that work could

[26:29](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1589s) **Presenter:** we create one and exchange for the other well yes that works we get a login screen and that's a full

[26:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1596s) **Presenter:** home one so just to finish i want to show you how you can do this too okay so introducing power upon

[26:43](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1603s) **Presenter:** It's an open source red teaming tool that's also Michael's red team research contribution.

[26:49](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1609s) **Presenter:** It has several modules.

[26:51](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1611s) **Presenter:** We're going to focus on the Dump on GUI, but I really recommend you focus on other experiments

[26:56](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1616s) **Presenter:** on others as well.

[26:57](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1617s) **Presenter:** It's on GitHub.

[26:58](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1618s) **Presenter:** If we use it on the tenant and we log in, we can just get to this.

[27:05](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1625s) **Presenter:** We can see this screen after it does all the heavy lifting for us.

[27:08](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1628s) **Presenter:** We can see some of the connections we saw earlier as a hacker.

[27:10](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1630s) **Presenter:** If we press on dump, we can actually see those data sources.

[27:13](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1633s) **Presenter:** Okay?

[27:14](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1634s) **Presenter:** And we have all the information that we saw.

[27:18](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1638s) **Presenter:** Yeah, I'm just finishing.

[27:20](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1640s) **Presenter:** And then if we press on playground, we can just send arbitrary queries.

[27:25](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1645s) **Presenter:** And we can basically do anything for those connections.

[27:28](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1648s) **Presenter:** So I really recommend you look at it.

[27:30](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1650s) **Presenter:** Do I have time to say a few less words of defense of how we can protect against?

[27:35](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1655s) **Presenter:** No.

[27:36](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1656s) **Presenter:** Okay.

[27:37](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1657s) **Presenter:** So thank you very much.

[27:38](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1658s) **Presenter:** With that, we're done.

[27:39](https://www.youtube.com/watch?v=9EEnS7nUxrY&t=1659s) **Presenter:** Thank you.
<!-- talk-enrichment:end -->
