---
title: "All You Need is Guest: Beyond Enumeration"
talk_date: 2023-08-08
conference: BSidesLV 2023
permalink: /talks/2023-08-08-bsideslv2023-all-you-need-is-guest-beyond-enumeration/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-08-08_BSidesLV-2023_All_You_Need_is_Guest/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-08-08_BSidesLV-2023_All_You_Need_is_Guest/slides.pdf
schedule_url: https://archive.bsideslv.org/2023/schedule
recording_url: https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29530s
recording_end_seconds: 32230
github_url: https://github.com/mbrg/power-pwn
description: "Azure AD guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you’re about to see, this assumption is dangerously wrong. In this talk, we will…"
abstract_source_url: "https://archive.bsideslv.org/2023/talks#all-you-need-is-guest-beyond-enumeration"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29530s"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "8b23fd9dfe78bf77c97b36c54e6a9373e55fe4f223a5dcce51504ec8bf01d4ad"
---


<!-- talk-enrichment:start -->
## Abstract

Azure AD guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you’re about to see, this assumption is dangerously wrong.

In this talk, we will show how guests can leverage undocumented APIs to bypass limitations and gain unauthorized access to sensitive business data and capabilities including corporate SQL servers, SharePoint sites, and KeyVault secrets. Furthermore, we will reveal how guests can create and control internal business applications to move laterally within the organization. All capabilities presented in the talk work will be demonstrated with the default Office 365 and Azure AD configuration.

Next, we will drop PowerGuest, a powerful tool designed to uncover the true scope of guest access in your tenant. PowerGuest can automate limitation bypass, enumerate and dump all accessible data, and allow for interactive non-read actions by the researcher.

Finally, we will make up for shattering the illusion of guests having limited access by sharing concrete steps to harden your Azure AD and Office 365 configurations to prevent such attacks and suggest detection logic to catch them if a change in configuration is not possible.

_[Official conference abstract](https://archive.bsideslv.org/2023/talks#all-you-need-is-guest-beyond-enumeration)_

## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Opening the Door: Guest Accounts and the Power of Collaboration

[00:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29531s) **Presenter:** Does it work? Can you hear me? All right. So, first of all, thank you for staying with me. I know it's kind of late in the day. And because this is, I mean, it's late in the day for all of us, so I think we can make it like a more, more chill kind of talk. So if you have questions, if you have comments, if you want to say that I'm wrong somewhere, just, just shout out during the talk. Okay? Don't, don't wait for the end.

[00:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29560s) **Presenter:** we're going to, you know, before I explain anything,

[00:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29563s) **Presenter:** let me do a quick slide-based demo, okay?

[00:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29567s) **Presenter:** So, say you have access to an Azure Active Directory guest account.

[00:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29573s) **Presenter:** We've all received these emails

[00:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29577s) **Presenter:** where you get invited to somebody else's tenant,

[00:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29579s) **Presenter:** and that's, so it could happen because you work with them,

[00:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29584s) **Presenter:** you're a contractor or something.

[00:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29585s) **Presenter:** Well, all right.

[00:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29588s) **Presenter:** When you actually log in to to this guest account and you go to their tenant by default

[01:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29595s) **Presenter:** By default you'll you'll actually

[01:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29598s) **Presenter:** Find nothing there because guests don't have access to anything

[01:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29602s) **Presenter:** Unless unless that somebody actively gives them the access right and so

[01:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29607s) **Presenter:** What we're going to show today is this is that this is definitely not true

[01:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29610s) **Presenter:** The tool that I'm going to release in this talk is going to produce for you with a guest account

[01:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29617s) **Presenter:** SQL servers, Azure resources.

[01:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29619s) **Presenter:** I'm not talking about enumeration here.

[01:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29621s) **Presenter:** I'm talking about full dumps of all of the data

[01:34](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29624s) **Presenter:** behind all of these resources.

[01:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29626s) **Presenter:** This is a true example.

[01:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29627s) **Presenter:** You'll understand what's going on here

[01:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29629s) **Presenter:** at the end of this talk.

[01:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29631s) **Presenter:** And so now that I hopefully,

[01:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29634s) **Presenter:** and yeah, there's also a dump.

[01:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29637s) **Presenter:** And so now that I hopefully have your attention,

[01:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29641s) **Presenter:** hi, my name is Michael.

[01:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29643s) **Presenter:** I am focused on security for low code, no code apps,

[01:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29647s) **Presenter:** which is the kind of applications

[01:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29648s) **Presenter:** that business users are building.

[01:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29649s) **Presenter:** I've been doing that for about four years now.

[02:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29651s) **Presenter:** There's a bunch of research I put out there.

[02:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29654s) **Presenter:** So if you're interested about, on this topic,

[02:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29657s) **Presenter:** please reach out afterwards.

[02:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29658s) **Presenter:** And we're looking for more smart people

[02:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29661s) **Presenter:** to kind of focus on this area, so reach out to me.

[02:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29667s) **Presenter:** All right.

[02:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29669s) **Presenter:** So before we understand kind of what's,

[02:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29672s) **Presenter:** what's going on here, we need to spend a brief moment

[02:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29677s) **Presenter:** what the guests are, what this mechanism actually is.

[02:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29680s) **Presenter:** So if you, the scenario is that,

[02:34](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29684s) **Presenter:** well, you wanna be able to share with someone.

[02:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29688s) **Presenter:** I work for a small company, like a 25 people startup,

[02:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29692s) **Presenter:** and we work with very large enterprises.

[02:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29694s) **Presenter:** And so in most of the cases,

[02:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29697s) **Presenter:** we need to find a way to collaborate on files, right?

[02:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29700s) **Presenter:** You need to share decks, you need to share legal docs.

[02:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29704s) **Presenter:** And so there are multiple ways in which you can share those those dogs around one thing you can do

[03:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29710s) **Presenter:** Which is pretty obvious

[03:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29712s) **Presenter:** You can just share those files of email right?

[03:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29716s) **Presenter:** It's kind of funny, but we've all done that and so this is one one thing that you can absolutely do you can always you can also just

[03:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29723s) **Presenter:** Trust a random website on the internet, which is also something that we've all that we've all done

[03:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29729s) **Presenter:** I've found out that you can also do this in real life.

[03:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29733s) **Presenter:** So there are USB ports all around the world.

[03:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29734s) **Presenter:** You can just plug in your computer and drop whatever you'd like.

[03:28](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29738s) **Presenter:** So you can do that as well.

[03:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29741s) **Presenter:** That's a real thing.

[03:34](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29744s) **Presenter:** Check out the website. It's really cool.

[03:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29745s) **Presenter:** So what you can also do is you can invite those guests into your tenant.

[03:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29752s) **Presenter:** And that's actually what Azure AD guests is all about.

[03:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29756s) **Presenter:** Basically the idea is that you bring people into your tenants and then two things happen

[03:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29762s) **Presenter:** One is that they can bring their own identities

[03:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29764s) **Presenter:** Which means you don't have to worry about how they authenticate and two you are still in control and those are two

[04:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29771s) **Presenter:** Significant promises to try and hold together so let's try and figure out

[04:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29775s) **Presenter:** What exactly does that mean in order for this mechanism to actually walk two things need to be need to hold one is that?

[04:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29783s) **Presenter:** This needs to be very easy to onboard every vendor every contractor. They use a different thing

[04:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29787s) **Presenter:** They need to be able to get on your your tenant quickly and the second thing it of course needs to be

[04:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29794s) **Presenter:** Easy to control right because otherwise you've just invited a guest into your tenant. I mean what could happen?

[04:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29800s) **Presenter:** And so let's try and figure out these two things so the first thing

[04:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29809s) **Presenter:** Yeah

[04:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29819s) **Presenter:** Does that help in any way?

[04:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29824s) **Presenter:** All right.

[04:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29827s) **Presenter:** So the first thing I need to prove to you is that

[05:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29831s) **Presenter:** like getting a guest account is very easy.

[05:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29833s) **Presenter:** And while I talk, you can see that I'm inviting myself

[05:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29836s) **Presenter:** to a guest with a bunch of different ways to do that

[05:09](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29839s) **Presenter:** through Microsoft.

[05:10](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29840s) **Presenter:** Notice that all of these options to invite guests are embedded into productivity apps

[05:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29845s) **Presenter:** So you own a team's channel or you own a SharePoint site

[05:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29849s) **Presenter:** You just want to collaborate with someone so you plug in their email and it invites them as a guest

[05:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29854s) **Presenter:** This is a decision that the business user makes no decision that the admin makes right and so this is very

[05:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29861s) **Presenter:** Easy to achieve and actually when you look at the ad tenant for any large enterprise

[05:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29866s) **Presenter:** most of them you'll find lots of guests.

[05:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29868s) **Presenter:** You can go down the very strict round

[05:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29870s) **Presenter:** of kind of cutting this and not using this feature,

[05:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29874s) **Presenter:** but then, well, how do you share files?

[05:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29876s) **Presenter:** We've seen the other options.

[05:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29878s) **Presenter:** And so it's very easy to get guests.

[05:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29881s) **Presenter:** In some cases, it might even be too easy.

[05:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29884s) **Presenter:** So again, this is the email that you receive as a guest.

[05:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29889s) **Presenter:** Actually, in a talk last year,

### From Invitation to Access: Understanding Azure AD Guest Mechanics

[06:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29892s) **Presenter:** here, Dirkian showed that you can hijack guest accounts.

[06:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29896s) **Presenter:** I talked about Black Hat last year.

[06:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29897s) **Presenter:** He showed that you can hijack guest accounts, guest

[06:09](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29899s) **Presenter:** invites that were not redeemed, and then redeem them

[06:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29903s) **Presenter:** yourself with any email address that you'd like.

[06:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29905s) **Presenter:** This was actually fixed, but this was a pretty cool thing

[06:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29910s) **Presenter:** because any user in the organization could just query

[06:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29913s) **Presenter:** open tickets and then just grab them.

[06:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29916s) **Presenter:** And so it's very easy to get guests.

[06:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29919s) **Presenter:** I think that's kind of really pretty established the second thing that I need to prove to you is that it's

[06:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29925s) **Presenter:** Still easy to control it's easy for IT and security to control

[06:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29928s) **Presenter:** And so let's see that part and so in order to do that

[06:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29932s) **Presenter:** We need to understand how does Azure Active Directory guest actually work and so on the vendor side partner side

[06:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29938s) **Presenter:** You could be using any any any type of identity provider you could be using another

[06:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29942s) **Presenter:** AAD account, but you can just you can use a Google suite or

[06:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29945s) **Presenter:** or Okta, whatever you'd like.

[06:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29947s) **Presenter:** And so the way it works is that it creates a link

[06:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29949s) **Presenter:** between those two directories.

[07:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29951s) **Presenter:** And so you get authenticated with your home tenant

[07:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29953s) **Presenter:** and your guest tenant just trust that authentication.

[07:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29957s) **Presenter:** And the cool thing about it is that because it's done this

[07:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29961s) **Presenter:** way, all of the security controls that Microsoft

[07:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29964s) **Presenter:** provides for you apply.

[07:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29965s) **Presenter:** So if you have conditional access, MFA enforced,

[07:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29969s) **Presenter:** whatever you'd like, this all get enforced automatically

[07:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29972s) **Presenter:** on guests, which is awesome, right?

[07:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29976s) **Presenter:** And so one thing that we need to understand, though,

[07:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29979s) **Presenter:** is that, well, in order to give somebody guest access,

[07:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29983s) **Presenter:** we want security controls, right?

[07:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29986s) **Presenter:** Because otherwise you've just invited somebody into your tenant

[07:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29989s) **Presenter:** and they can do whatever they like.

[07:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29990s) **Presenter:** In order to get security controls,

[07:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29992s) **Presenter:** we need to have an AID account

[07:45](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29995s) **Presenter:** because otherwise we can't apply the security mechanisms

[07:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=29998s) **Presenter:** that we already have as an enterprise.

[07:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30000s) **Presenter:** And so in order to have that account,

[07:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30005s) **Presenter:** the ID which actually grants full access to your tenant.

[07:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30008s) **Presenter:** So what's, what's actually happening here?

[08:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30011s) **Presenter:** So the crucial piece is that you don't get full access.

[08:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30016s) **Presenter:** You get access that's denied by default.

[08:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30018s) **Presenter:** You get access that gives you access to nothing, basically.

[08:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30021s) **Presenter:** So if I invited you through Teams, you'll only, you'll only get access to that specific

[08:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30025s) **Presenter:** team channel.

[08:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30027s) **Presenter:** Or at least that's what it should, that's what should happen.

[08:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30032s) **Presenter:** So a quick recap here.

[08:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30035s) **Presenter:** all very very very easy to guess we should we should assume that a compromise in a guest

[08:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30039s) **Presenter:** account within our tenant is easy. AAD controls apply, security controls apply which is great

[08:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30045s) **Presenter:** and access should be denied by default and now when I've talked so much good things about

[08:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30049s) **Presenter:** this mechanism let's see what happens in practice because in practice as we know things are

[08:45](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30055s) **Presenter:** a bit a bit more a bit dirtier and so first of all there are so okay so let's start by

[08:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30062s) **Presenter:** kind of just inviting some, a guest around. And every time you see this icon on the bottom

[08:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30068s) **Presenter:** right corner, that's kind of the, the user, the legitimate user that's, that's doing something.

[09:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30073s) **Presenter:** And you'll see in a, in a moment an icon, a different icon for, for a hacker. Just because

[09:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30077s) **Presenter:** I'm gonna move between users a lot. And so, I'm, I'm in teams. I'm going to kind of just

[09:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30084s) **Presenter:** say, invite somebody. I'm going to invite a hacker in because why not? That's my hacker

[09:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30089s) **Presenter:** account here. And then once I invite that guest, I click on that and that guest is invited

[09:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30095s) **Presenter:** and they will get that email that we saw earlier. From the hacker perspective, and you can see

[09:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30102s) **Presenter:** the hacker icon here, I just log into my account and then I need to allow this tenant to get

[09:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30109s) **Presenter:** access to basic information about my profile and I'll do that. Zenity demo is kind of the

[09:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30116s) **Presenter:** the, the thing that I'm hacking.

[09:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30118s) **Presenter:** And again, I get to this, to this portal which is empty

[09:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30122s) **Presenter:** because it's showing me all of the apps that I have access

[09:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30125s) **Presenter:** to which is actually none, okay?

[09:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30127s) **Presenter:** And so there's, there are two things that we already know

[10:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30131s) **Presenter:** how to do, and if you've Googled it before,

[10:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30133s) **Presenter:** you would have found it before this talk.

[10:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30135s) **Presenter:** One is phishing through teams.

[10:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30137s) **Presenter:** Once you get invited into, into a guest, into a tenant

[10:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30141s) **Presenter:** as a guest, then you can do phishing through the internal

[10:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30144s) **Presenter:** teams of that organization, which is actually pretty nice, because it adds some believability

[10:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30150s) **Presenter:** into your phishing attempt. The other thing that you can do is recon on the directory.

[10:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30155s) **Presenter:** So you can actually find, there's some sophisticated ways in which you can find a list of users

[10:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30160s) **Presenter:** within that organization, even though you are not allowed to directly enumerate the

[10:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30165s) **Presenter:** users. If you want to look at it, there's a nice link there that it will share everything

[10:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30171s) **Presenter:** about it. And so this is the state of the art for

[10:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30174s) **Presenter:** guest exploitation, but of course we want more.

[10:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30177s) **Presenter:** Right? We want access to resources. And so this is the

[10:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30180s) **Presenter:** point in the talk where I'm basically suggesting that if

[10:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30185s) **Presenter:** you don't want to have a responsibility when you go back

[10:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30189s) **Presenter:** to work, then, then this is the time to live.

[11:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30191s) **Presenter:** Because right now I'm going to show how this is completely,

[11:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30196s) **Presenter:** how, how the reality differs from, from your expectations.

[11:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30203s) **Presenter:** All right, so what I'm going to do right now is just virtually click on that link

[11:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30210s) **Presenter:** So when I click on that link I get invited to something I get it into something called power-ups

[11:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30214s) **Presenter:** Which is the local local platform for for Microsoft which is built into office

[11:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30219s) **Presenter:** And the first thing that you'll see here is that

[11:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30222s) **Presenter:** Well, I get I get some sort of an L

[11:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30225s) **Presenter:** Which is telling me basically you're trying to reach an environment which does not belong to your tenant

[11:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30231s) **Presenter:** I've set earlier is in the guest tenant, right? Not my home tenant. And so I click on this

[11:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30237s) **Presenter:** go to home page and I get to my home page and now I'm in power, in power ups but you

### The Hidden Risks: Business Users Sharing Credentials

[11:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30242s) **Presenter:** can see here that I'm in my own tenant, Pontoso, which is the hacker's tenant. And so now I

[11:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30249s) **Presenter:** need to be able to switch to the guest tenant. That's pretty easy. You just kind of, you

[12:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30254s) **Presenter:** go to switch directory and now I'm in the right, I'm going to move to the right tenant,

[12:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30258s) **Presenter:** So you can move to any one of the tenants

[12:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30261s) **Presenter:** that you have access to.

[12:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30262s) **Presenter:** Again, when you get access as a guest

[12:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30266s) **Presenter:** to somebody else's corporate,

[12:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30267s) **Presenter:** this is just waiting for you.

[12:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30269s) **Presenter:** All right?

[12:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30270s) **Presenter:** And so once you do that,

[12:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30272s) **Presenter:** then you get to where I actually sent you

[12:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30275s) **Presenter:** with this link,

[12:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30276s) **Presenter:** which is a screen called Connections.

[12:28](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30278s) **Presenter:** And you can see that these connections

[12:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30280s) **Presenter:** have Azure connections,

[12:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30282s) **Presenter:** connections for SQL servers.

[12:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30283s) **Presenter:** You can see their names.

[12:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30285s) **Presenter:** And for some reason, as a guest,

[12:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30289s) **Presenter:** And so let's try and figure out what the hell is this?

[12:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30294s) **Presenter:** Why does this exist and why do we have access into it?

[12:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30298s) **Presenter:** And so let's examine one of them.

[12:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30300s) **Presenter:** This is an Azure file storage,

[12:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30302s) **Presenter:** and it's called something like Jamie Redding customer data.

[12:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30307s) **Presenter:** All right.

[12:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30308s) **Presenter:** So first of all, you can see this little menu here,

[13:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30311s) **Presenter:** two interesting things.

[13:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30312s) **Presenter:** So one is details.

[13:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30313s) **Presenter:** Well, we'll see that in a moment.

[13:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30315s) **Presenter:** But the other is share.

[13:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30317s) **Presenter:** So there's a share button here.

[13:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30318s) **Presenter:** on a connection to Azure file storage.

[13:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30321s) **Presenter:** Let's look at that share button.

[13:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30323s) **Presenter:** All right.

[13:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30325s) **Presenter:** So this file storage connection

[13:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30329s) **Presenter:** is apparently shared with three different entities.

[13:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30332s) **Presenter:** The first thing is shared with org.

[13:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30334s) **Presenter:** The second thing is shared with Jamie.

[13:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30337s) **Presenter:** This is probably the Jamie that created this connection.

[13:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30339s) **Presenter:** And the third thing here is Jamie,

[13:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30341s) **Presenter:** and you can almost barely see that this is an Outlook account,

[13:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30346s) **Presenter:** a personal account.

[13:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30348s) **Presenter:** that each of them have. And so this is the root cause issue of

[13:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30353s) **Presenter:** why we're seeing this connection right now. Okay? So Jamie has,

[13:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30357s) **Presenter:** has created this connection and has shared this with everyone.

[13:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30361s) **Presenter:** And actually what's going on here is that this connection is

[13:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30366s) **Presenter:** a wrapper around credentials. It can be an OAuth token,

[13:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30369s) **Presenter:** a refresh token, or so Jamie's own refresh token,

[14:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30372s) **Presenter:** her own identity. Or it could be like a username

[14:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30374s) **Presenter:** password or a client secret or whatever you'd like.

[14:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30376s) **Presenter:** And then you could just take this up and share it with everyone everyone means your entire ad guest your retire ad tenant

[14:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30383s) **Presenter:** You can also share this with the groups with specific individuals with your own outlook account whatever just just kind of be productive

[14:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30391s) **Presenter:** And so this this works in this kind of this is pretty cool

[14:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30396s) **Presenter:** Let's try and figure out what this connection actually is why does this exist and so going back to details and now

[14:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30402s) **Presenter:** I can see a bunch of information about this connection. I can see that indeed it was created

[14:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30407s) **Presenter:** It is owned by Jamie reading and trying to figure out who Jamie is

[14:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30411s) **Presenter:** I can see that Jamie is a customer service representative that works in in sales ops so Jamie is a business user

[14:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30417s) **Presenter:** So Jamie made made the decision which was a bad decision to share this connection around and we'll see in a moment that this is

[14:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30426s) **Presenter:** This is a common mistake to make because it that the platform just make it very easy for you to

[15:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30432s) **Presenter:** do it so before we move forward with this talk I'm not sure how many of you

[15:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30438s) **Presenter:** are familiar with low-code no-code and so I need to explain to you why is this

[15:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30442s) **Presenter:** happening why does why is it believable that somebody from the business would

[15:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30446s) **Presenter:** create a connection to Azure and share it with the dialogue so here's the

[15:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30450s) **Presenter:** reason yeah okay so you won't get the video but here's the reason basically

[15:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30462s) **Presenter:** NoCode is putting power in the hands of business users

[15:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30466s) **Presenter:** to build their own applications and automations

[15:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30468s) **Presenter:** on top of business data.

[15:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30469s) **Presenter:** What this video actually shows is that right now

[15:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30472s) **Presenter:** they've integrated ChatGPT into their platform.

[15:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30476s) **Presenter:** So you can just kind of ask ChatGPT to create an app for you.

[15:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30480s) **Presenter:** And it would create a table on a database

[15:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30482s) **Presenter:** and share it with everyone and create the columns

[15:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30486s) **Presenter:** and create the actual app.

[15:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30487s) **Presenter:** And so this is something that business users are actually

[16:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30490s) **Presenter:** using to solve their own business problems and when they do it they do them on business data of course and

[16:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30496s) **Presenter:** So as a business user you mostly don't have access to service accounts, right?

[16:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30501s) **Presenter:** You do have access to your own credentials

[16:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30502s) **Presenter:** So why not wrap them around with a thing called connections and share them share your refresh tokens with whoever wants it?

[16:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30510s) **Presenter:** and so this is the way that this typically works and

[16:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30513s) **Presenter:** One of the things that is important for you to understand that this is a big issue is just

[16:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30520s) **Presenter:** And so here's what I did here

[16:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30529s) **Presenter:** Okay, this is a slide showing

[16:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30533s) **Presenter:** Right now a single number five million. That's the number of

[16:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30538s) **Presenter:** Of developers using dotnet today according to Microsoft all right a

[16:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30543s) **Presenter:** Pretty big number how many developers do you think are using this like business developers are using this local no code tool?

[17:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30550s) **Presenter:** in order to build their own applications.

[17:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30552s) **Presenter:** Just have a number in your head, something that fits

[17:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30555s) **Presenter:** with your model of the world, where if you look at where we

[17:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30558s) **Presenter:** focus most of our attention, it's on applications that

[17:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30561s) **Presenter:** those people are building, right?

[17:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30564s) **Presenter:** People that are building it with code.

### Exploiting the Connections: From Phishing to Data Dump

[17:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30566s) **Presenter:** And so I actually went through Microsoft

[17:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30568s) **Presenter:** earning reports for the few years back, and they

[17:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30574s) **Presenter:** mentioned the numbers here and there.

[17:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30576s) **Presenter:** So here are the here are the numbers from the from the from the reports according to the

[17:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30582s) **Presenter:** Small kind of linear regression I did here. There are about 8 million developers today

[17:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30587s) **Presenter:** And so I'm sure that most of the people in this room have

[17:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30592s) **Presenter:** Either never heard of this before or didn't dedicate a lot of their career to try and solve this problem

[17:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30598s) **Presenter:** This is actually kind of becoming huge huge within the top organizations in the world

[17:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30604s) **Presenter:** So we need to start dedicating our time here and so

[17:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30609s) **Presenter:** Now that we understand that this thing is happening is happening in every major org really every major org out there because just show me

[18:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30616s) **Presenter:** My an ent a large enterprise. That's not a microsoft shop

[18:10](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30620s) **Presenter:** Let's figure out. How do we get from those connections to actually doing something with them?

[18:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30625s) **Presenter:** And so in this in this part right now

[18:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30628s) **Presenter:** I'm just gonna take you through the rabbit hole of how do we get to these so we were able to see this connection

[18:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30634s) **Presenter:** that's fine. But now we want to automate things, we want to dump the data behind this, we want

[18:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30639s) **Presenter:** to make this into something that we can use as hackers. And so let's try to figure out

[18:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30643s) **Presenter:** how that works.

[18:34](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30644s) **Presenter:** Just before we get into the next phase here. We do a thing called outrageous

[18:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30657s) **Presenter:** speaker requests here at B-Sides every year. When someone submits a talk, there's a field

[18:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30662s) **Presenter:** right at the very end that says any outrageous requests,

[18:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30664s) **Presenter:** and a lot of times they throw something in there

[18:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30666s) **Presenter:** at two in the morning and forget about it.

[18:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30668s) **Presenter:** The request that we have from you

[19:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30670s) **Presenter:** was to help you find more hacker friends,

[19:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30672s) **Presenter:** I think is the actual thing.

[19:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30674s) **Presenter:** So first off, I want to make sure, is this you?

[19:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30677s) **Presenter:** Yeah.

[19:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30677s) **Presenter:** Okay, so I'm going to ask everybody in the audience,

[19:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30681s) **Presenter:** if you can, if you are on Twitter,

[19:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30684s) **Presenter:** and this one's you as well?

[19:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30686s) **Presenter:** Yep.

[19:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30686s) **Presenter:** Okay, so I'm going to

[19:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30688s) **Presenter:** at MBRG0,

[19:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30691s) **Presenter:** and I'm going to follow him,

[19:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30694s) **Presenter:** and I'm going to go to LinkedIn,

[19:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30700s) **Presenter:** where we have...

[19:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30703s) **Presenter:** And I'm sorry, how do you pronounce your last name?

[19:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30705s) **Presenter:** Bargari.

[19:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30706s) **Presenter:** Bargari, okay.

[19:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30707s) **Presenter:** Michael Bargari, and I'm going to add him,

[19:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30709s) **Presenter:** and I encourage everyone here,

[19:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30710s) **Presenter:** pull out your phones,

[19:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30711s) **Presenter:** and do the same thing right now.

[19:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30714s) **Presenter:** Help me fill this outrageous speaker request.

[19:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30717s) **Presenter:** Cheers.

[19:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30718s) **Presenter:** Have a good day.

[19:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30720s) **Presenter:** Thank you.

[19:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30725s) **Presenter:** Actually, there are so many avenues for research here,

[19:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30729s) **Presenter:** and we are so little,

[20:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30732s) **Presenter:** the group of people that is focused on this area

[20:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30734s) **Presenter:** is so small.

[20:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30735s) **Presenter:** If you're interested in like an interesting challenge

[20:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30738s) **Presenter:** and just banging your heads against the world with this,

[20:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30742s) **Presenter:** just reach out to me.

[20:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30743s) **Presenter:** There are plenty of things we can collaborate on.

[20:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30745s) **Presenter:** All right, so now let's do some hacking first of all I

[20:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30751s) **Presenter:** And again, I'm authenticated as the guest here and I'm looking at the specific connection

[20:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30755s) **Presenter:** Let's try to figure out what information lies behind this Azure file storage thing and so

[20:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30761s) **Presenter:** I'm going through the there's a tab here called applications that use this connection and so let's just try to

[20:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30767s) **Presenter:** Look log into that application customer insight something all right

[20:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30773s) **Presenter:** This takes me to a page which gives me some information about this app, and then there's

[20:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30777s) **Presenter:** this link.

[20:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30778s) **Presenter:** And by the way, you'll notice that this link is a Microsoft link inside of the Microsoft

[20:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30782s) **Presenter:** own domain.

[20:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30783s) **Presenter:** And in DefCon last year, what I showed was that you can create a phishing app that would

[20:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30788s) **Presenter:** be hosted by Microsoft in this link and supports SSO, and everything is kind of nice and believable.

[21:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30793s) **Presenter:** So check that out if you're interested.

[21:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30796s) **Presenter:** And so when I click on this app, I get this kind of thing that's stopping me.

[21:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30802s) **Presenter:** me to actually view this app. And if you look, kind of open this up, and if you look closely,

[21:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30809s) **Presenter:** this is telling me that I don't have a license. And so this makes sense, right? I'm a guest.

[21:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30815s) **Presenter:** I don't have a, by default, I don't, I'm not supposed to be able to do anything. And so

[21:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30820s) **Presenter:** the clue to understand how do we circumvent this is the sentence above here. So I'll read it out.

[21:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30826s) **Presenter:** You don't have the correct plan to access this app ask your admin for one or ask the admin at your at the organization in which you're a guest

[21:45](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30835s) **Presenter:** Can you guess what I'm what I'm gonna do to bypass this

[21:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30839s) **Presenter:** So I need a license. I don't have a license in the guest tenant

[21:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30843s) **Presenter:** What would happen if I have a license in my own tenant now that that that shouldn't work, right?

[21:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30848s) **Presenter:** Okay, let's try

[22:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30850s) **Presenter:** Here's like a developer plan. I can get for free, but for Microsoft

[22:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30854s) **Presenter:** I'll just say hey can I get a license for this hacker account and they'll say yeah of course here's a license

[22:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30861s) **Presenter:** And now of course I'm in because why not if you have a license in one tenant then it applies to another tenant

[22:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30867s) **Presenter:** That's great and

[22:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30870s) **Presenter:** Now after this thing loads

[22:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30872s) **Presenter:** Then I get to this screen which is telling me something very weird that this app is not compliant with the latest data

[22:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30879s) **Presenter:** prevention policies all right

[22:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30881s) **Presenter:** And you can see here something about a policy name, deny Azure file storage, DLP inside of this power-ups thing, inside of this low-code thing.

[22:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30892s) **Presenter:** That's kind of weird.

[22:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30894s) **Presenter:** And so let's try and, so I was able to circumvent the license issue, but now I'm blocked by DLP.

[22:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30902s) **Presenter:** And so Microsoft has actually integrated something they call DLP data loss policies inside inside of this

[23:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30910s) **Presenter:** Power up thing inside of this local no good thing which is great right we have business users. They are building applications

[23:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30915s) **Presenter:** We are worried about data moving out of our tenant. Let's have a DLP built in this is a great idea

### Bypassing Licenses and DLP: The Hacker's Toolkit

[23:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30921s) **Presenter:** So let's use this great idea again. I'm logged in as the as the

[23:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30925s) **Presenter:** As the user that's kind of the trusted user that uses that's fine

[23:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30928s) **Presenter:** And I'm going to create a DLP policy to find social security numbers within my tenant. It's gonna be awesome. I'm going to choose

[23:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30937s) **Presenter:** Connectors all right, so I need to choose a connector. I'm gonna choose the SharePoint connector something about it not being blockable

[23:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30946s) **Presenter:** I'm kind of stuck. I'm not not really sure. I'm not sure if you kind of what would you do next in this screen like

[23:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30952s) **Presenter:** How do I move forward with applying this DLP policy?

[23:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30957s) **Presenter:** So actually the thing here is that this is not DLP

[23:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30962s) **Presenter:** This is not DLP in the sense that you think about DLP. This is a an allow list denialist for connectors

[23:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30969s) **Presenter:** connectors mean

[24:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30971s) **Presenter:** connector to SharePoint like SharePoint as a whole

[24:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30975s) **Presenter:** Everybody's SharePoint every site every tenant whatever you'd like every one drive for business some connectors are not blockable at all

[24:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30983s) **Presenter:** SharePoint, but you can block, I don't know,

[24:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30985s) **Presenter:** SQL Server, for example. This is definitely

[24:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30987s) **Presenter:** not DLP in the sense that

[24:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30989s) **Presenter:** we think about as security people.

[24:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30991s) **Presenter:** So it needs to be kind of

[24:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30993s) **Presenter:** clear here. And the second thing that's interesting

[24:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30995s) **Presenter:** is that this DLP is

[24:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30997s) **Presenter:** actually full of holes, and one of my

[24:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=30999s) **Presenter:** hobbies is to try and

[24:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31001s) **Presenter:** figure out all of the different holes

[24:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31003s) **Presenter:** within this DLP. Currently, I know

[24:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31005s) **Presenter:** of five, and so

[24:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31007s) **Presenter:** here's one of them, and

[24:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31009s) **Presenter:** another one, and another one, and another one, and another one.

[24:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31012s) **Presenter:** There's ways in which you, you create a sophisticated DLP policy that bypasses itself.

[24:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31018s) **Presenter:** This is all completely public.

[24:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31021s) **Presenter:** Admittedly, there are some advanced features in this DLP policy.

[24:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31025s) **Presenter:** You can do kind of endpoint filtering, but it also only works in, in compile mode rather

[25:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31031s) **Presenter:** than run time.

[25:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31031s) **Presenter:** So, not a security, not a security mechanism.

[25:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31035s) **Presenter:** This would, this might prevent users from making mistakes.

[25:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31038s) **Presenter:** This would definitely not prevent a hacker from doing something within your org

[25:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31042s) **Presenter:** But having said all of that. I mean we are still blocked right?

[25:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31047s) **Presenter:** We are still blocked by this thing right now, and we need to circumvent that and

[25:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31053s) **Presenter:** I'm gonna be honest with you

[25:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31055s) **Presenter:** I I have a way to I have a way forward but unfortunately I won't be able to actually share

[25:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31061s) **Presenter:** That that that beat right now because Microsoft asked me not to and so they're gonna

[25:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31067s) **Presenter:** They're gonna they're gonna fix it which is great and so after they fix it

[25:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31071s) **Presenter:** I'm gonna put the information there in the link but until then let's just kind of let's forget about it

[25:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31079s) **Presenter:** All right, so forget about it. I cannot I was not able to

[25:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31083s) **Presenter:** To actually get something from Azure file storage. Let's just take another connection here. Here's a sequel storage

[25:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31089s) **Presenter:** Called Enterprise customers sounds nice. So again going to details applications using these connections

[26:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31097s) **Presenter:** applications. I click on one of those applications. And this time I actually got into the app.

[26:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31102s) **Presenter:** And the first thing that I see when I go into the app is this screen that is telling me,

[26:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31107s) **Presenter:** hey, I'm going to use this SQL connection in this app. By the way, again, think about

[26:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31112s) **Presenter:** like regular applications. You tend to see like an O of consent form, something like

[26:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31117s) **Presenter:** that. This is not it. This is, I'm going to use this connection which somebody else

[26:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31122s) **Presenter:** Is already shared with you and I'm going to use it in this app and it's not limited by permissions because it's whatever you gave the

[26:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31128s) **Presenter:** Token initially all right, so I'm gonna gonna go to this app and now I can actually

[26:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31134s) **Presenter:** Finally see data. This is the sequel server data behind this connection that this app is actually fetching so you can see information about

[26:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31142s) **Presenter:** Customers right this is just like a list of users

[26:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31145s) **Presenter:** And then for each one of those users I can click on a user and I can see information about that user including

[27:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31152s) **Presenter:** This is all generated by chit by chgpt. So thank you open AI for that

[27:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31156s) **Presenter:** And now we want to understand how we can kind of fetch this data in a more

[27:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31161s) **Presenter:** I don't know robust way and so

[27:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31164s) **Presenter:** Just looking at the requests that this thing is actually sending you can see that all of this information is being fetched

[27:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31170s) **Presenter:** through this request and

[27:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31172s) **Presenter:** Looking at the and at that request. I can see two things so one

[27:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31177s) **Presenter:** I'm sure if that's gonna work so right here. I'm going to something called as you a PIM

[27:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31182s) **Presenter:** We'll see that in a moment and here inside of this request URL

[27:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31185s) **Presenter:** You can see this long URL which has something with the enterprise customers table

[27:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31191s) **Presenter:** All right, we'll try to figure out figure out what that means in a moment, but just to

[27:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31197s) **Presenter:** show you that

[27:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31199s) **Presenter:** Yeah, all right, so

[27:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31202s) **Presenter:** Again, what I'm going to do is just copy this this

[27:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31207s) **Presenter:** Requests and then just replay it and I get all of the all of the information right and so this is just what the app is doing

[28:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31214s) **Presenter:** This is not the entire data behind behind this SQL server, so let's try and figure out what's actually going on here

[28:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31221s) **Presenter:** this is

[28:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31222s) **Presenter:** Power up is actually using this endpoint as way a p a p.m. Net to fetch the

[28:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31229s) **Presenter:** Information behind that connection actually any any

[28:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31233s) **Presenter:** Operation that this app would like to do with this connection it will do through this as well p.m. Instance

[28:28](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31238s) **Presenter:** Okay, so let's let's try to figure out this URL it starts with as right apm. That's just an actual

[28:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31245s) **Presenter:** API gateway that's hosted in Azure

[28:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31247s) **Presenter:** And all right after that it goes to sequel and then an ID for for this specific connection

[28:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31253s) **Presenter:** If you use the same thing in your power apps instance, then you'll get the same URL

[28:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31259s) **Presenter:** But just in a different ID you'll probably not be in Europe, but well and then after the sequel I get I

[28:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31267s) **Presenter:** I need to choose choose the data set

[28:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31269s) **Presenter:** This is because if you authenticate to sequel with your all of token that you have actually access to multiple sequel

[29:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31275s) **Presenter:** SQL servers because this is using your own kind of Azure manager identity and so you can see that I'm

[29:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31282s) **Presenter:** choosing the customer inside database

[29:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31284s) **Presenter:** and the specific enterprise customers data database,

[29:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31288s) **Presenter:** so that's a server and a database.

[29:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31290s) **Presenter:** And then there's a request here to tables,

[29:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31294s) **Presenter:** and let me just fix the URL here.

[29:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31296s) **Presenter:** So tables, the name of the table, items.

[29:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31299s) **Presenter:** All right, so this is actually just an interface

[29:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31302s) **Presenter:** to query the SQL server.

[29:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31307s) **Presenter:** So let's back up for a moment,

[29:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31310s) **Presenter:** and now I need to tell you what the hell is this thing.

### Unveiling the API Hub: Token Exchange and Automation

[29:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31314s) **Presenter:** The way that power-ups work, but actually,

[29:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31318s) **Presenter:** this is kind of Microsoft-focused,

[29:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31320s) **Presenter:** but most local local platforms work this way

[29:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31323s) **Presenter:** because they need to be able to impersonate business users

[29:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31326s) **Presenter:** because business users need to be able to create apps

[29:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31328s) **Presenter:** with their own credentials.

[30:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31330s) **Presenter:** And so here's how it works.

[30:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31331s) **Presenter:** On the left side, you have the app,

[30:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31333s) **Presenter:** and on the right side, you have the API

[30:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31334s) **Presenter:** that it would like to call.

[30:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31336s) **Presenter:** And now there's this Azure API management thing

[30:09](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31339s) **Presenter:** that the app will go up to Azure API.

[30:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31344s) **Presenter:** have your credentials it it has the ID for that app and it goes out out to

[30:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31350s) **Presenter:** Azure API management and it says hey on this app please provide me access to to

[30:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31356s) **Presenter:** that specific request through that API and now note that as a user you can

[30:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31363s) **Presenter:** share your credentials with other users you can also share your credentials with

[30:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31367s) **Presenter:** an app all right or an automation the plans of the back on the background

[30:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31371s) **Presenter:** Without without you actually being there all right so what actually happens here is that they have built a token storage

[30:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31378s) **Presenter:** that is

[30:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31379s) **Presenter:** managed inside of this azure API management instance and the tokens get injected every time you

[30:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31386s) **Presenter:** You you reach out with a request, and then they cleaned it up them out on the way back

[30:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31389s) **Presenter:** All right, so this is how it works, and it works like that in with with most with most of the platforms

[31:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31397s) **Presenter:** And so let's try and take a look

[31:09](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31399s) **Presenter:** And so again this this this thing is going to allow us we've seen I mean we've seen one request

[31:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31405s) **Presenter:** But this thing is going to allow us much more than that so

[31:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31410s) **Presenter:** What we have up until now is the ability to well we we went to the UI we copied the request now

[31:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31417s) **Presenter:** We can replay that request that's fine

[31:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31419s) **Presenter:** But can we actually generate the request without going through the manual processes?

[31:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31425s) **Presenter:** thing. In order to do that,

[31:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31427s) **Presenter:** we need to be able to

[31:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31429s) **Presenter:** make this request. In order to

[31:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31431s) **Presenter:** make this request, we need the token.

[31:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31433s) **Presenter:** Let's figure out what this token

[31:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31434s) **Presenter:** actually grants us.

[31:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31437s) **Presenter:** Opening out the Jot token

[31:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31438s) **Presenter:** shows that I get an audience

[31:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31441s) **Presenter:** of API hub, azure.com.

[31:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31443s) **Presenter:** This is actually an internal thing

[31:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31445s) **Presenter:** Microsoft created on top of API management

[31:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31446s) **Presenter:** that does this entire

[31:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31448s) **Presenter:** token exchange thing.

[32:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31450s) **Presenter:** What I need is a token

[32:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31452s) **Presenter:** with the right permissions

[32:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31455s) **Presenter:** query this API and the question and that's that's the next question we need to answer and so in

[32:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31462s) **Presenter:** order to do that

[32:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31465s) **Presenter:** First remember that I can generate tokens right this is my user. It's not that's not that's not the problem

[32:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31469s) **Presenter:** I need to generate the token with the right resource with the right client

[32:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31473s) **Presenter:** I did to actually allow me to fetch information from this internal API and so

[32:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31479s) **Presenter:** I'm going to use this snippet which is just like using a common Python libraries to generate this token and

[32:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31485s) **Presenter:** I just need to find the right client idea it would allow me to get this resource if I try to use a built-in client app a

[32:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31492s) **Presenter:** Public client app again. This needs to be in the in the guest tenant right so I cannot just

[32:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31497s) **Presenter:** Create an app there so if I if I try to use a public client app

[32:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31500s) **Presenter:** It doesn't work because the app needs to be pre consented to have that to have permissions to that resource

[32:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31508s) **Presenter:** If I try to use my own app in the in the home tenant and make it a multi tenant app

[33:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31515s) **Presenter:** work because I can't even ask for that permission.

[33:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31518s) **Presenter:** So if you go to the app and you try to ask for the right

[33:10](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31520s) **Presenter:** API permissions to query API hub, you won't find it there

[33:14](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31524s) **Presenter:** because it's an internal API.

[33:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31525s) **Presenter:** They didn't expose it to everybody.

[33:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31528s) **Presenter:** And so we're kind of stuck.

[33:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31531s) **Presenter:** We were able to copy and then replay that request through

[33:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31537s) **Presenter:** the browser, but that means we can do manual things.

[33:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31541s) **Presenter:** That's fine.

[33:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31542s) **Presenter:** that's not like a wide-scale exfiltration thing.

[33:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31547s) **Presenter:** And so let's try and figure out

[33:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31548s) **Presenter:** how do we get to that token.

[33:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31550s) **Presenter:** And before that, I'm going to do a very quick recap.

[33:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31552s) **Presenter:** So we get access to an account

[33:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31554s) **Presenter:** which is outside of our corporate.

[33:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31558s) **Presenter:** We get a guest account.

[33:50](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31560s) **Presenter:** We find a bunch of credentials

[33:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31562s) **Presenter:** on this thing called power-ups

[33:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31564s) **Presenter:** which business users are building

[33:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31565s) **Presenter:** and then sharing those connections with everybody.

[33:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31569s) **Presenter:** We try to get access.

[34:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31570s) **Presenter:** We are blocked by license.

[34:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31572s) **Presenter:** so we just got a license

[34:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31574s) **Presenter:** we were blocked by DLP and

[34:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31577s) **Presenter:** then I did a bunch of hand waving and we'll move forward and

[34:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31582s) **Presenter:** We were blocked by a programmatic by being able to program get programmatic access to API hub

[34:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31587s) **Presenter:** And that's the last thing that's stopping us from getting access to those credentials

[34:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31592s) **Presenter:** And so we need an AID app that is able to do a few things one

[34:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31596s) **Presenter:** It needs to be owned by default because this needs to be already available in the guest tenant which I cannot change

[34:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31602s) **Presenter:** It needs to be pre-approved to query this API hub thing.

[34:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31605s) **Presenter:** And it needs to be a public client because I need to be able to generate tokens.

[34:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31608s) **Presenter:** If it's a confidential client that I need a certificate in order to generate tokens,

[34:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31613s) **Presenter:** then I won't have that certificate.

[34:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31616s) **Presenter:** And so let's try to get that.

[34:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31619s) **Presenter:** We already know of one app that is able to generate those tokens,

[34:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31623s) **Presenter:** and that's, of course, PowerAppsPortal, right?

### Building the PowerPoint Tool: Automating Data Exfiltration

[34:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31625s) **Presenter:** Because that's where we found this token.

[34:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31628s) **Presenter:** And so this is on by default.

[34:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31629s) **Presenter:** Every tenant will have PowerApps.

[35:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31632s) **Presenter:** to query API hub, but unfortunately it's a,

[35:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31635s) **Presenter:** it's not a public client application.

[35:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31636s) **Presenter:** They've done their job well here,

[35:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31637s) **Presenter:** so it's a confidential app.

[35:09](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31639s) **Presenter:** You can't just generate tokens on its behalf.

[35:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31641s) **Presenter:** And so what can we do in order to circumvent this thing?

[35:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31646s) **Presenter:** We can use this very clever piece of research.

[35:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31649s) **Presenter:** I'm not sure how many of you are aware.

[35:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31651s) **Presenter:** If not, I really recommend you go out and read this.

[35:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31655s) **Presenter:** Basically, think about what happens

[35:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31657s) **Presenter:** when you log into one Microsoft app, like Teams,

[35:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31662s) **Presenter:** to another Microsoft apps like Outlook,

[35:34](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31664s) **Presenter:** and you don't get re-authenticated.

[35:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31666s) **Presenter:** Something happens there.

[35:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31668s) **Presenter:** These are different apps in different domains,

[35:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31670s) **Presenter:** different tokens.

[35:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31671s) **Presenter:** If you look at the tokens, you'll see different tokens.

[35:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31673s) **Presenter:** So the way that this works

[35:45](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31675s) **Presenter:** is that there's undocumented behavior

[35:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31677s) **Presenter:** on the AAD side

[35:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31678s) **Presenter:** that allows you to exchange one refresh token

[35:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31681s) **Presenter:** with one client ID and one resource permission

[35:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31683s) **Presenter:** with another refresh token,

[35:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31685s) **Presenter:** with another client ID

[35:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31688s) **Presenter:** and another refresh token

[35:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31689s) **Presenter:** and another resource.

[36:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31692s) **Presenter:** entire the entire Microsoft suite of products so there are I think we'll see

[36:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31697s) **Presenter:** in a moment a list but something like 20 different client IDs which you can just

[36:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31703s) **Presenter:** exchange the tokens between them seemingly without without seamlessly

[36:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31707s) **Presenter:** without the user knowing so if you get a refresh token to one of them you

[36:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31710s) **Presenter:** actually get all of them this also allows you in some cases to buy first

[36:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31714s) **Presenter:** things like MFA but check out this research it's really cool and so this is

[36:28](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31718s) **Presenter:** going to help us because if we look at those client IDs, this is the list of the client

[36:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31723s) **Presenter:** IDs that are currently public that we all, that we've already identified as a community.

[36:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31728s) **Presenter:** You'll find two things that are really helpful here. One is power-ups, which is actually

[36:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31733s) **Presenter:** helpful, right? This is what we need. And the other is the Microsoft Azure CLI, which

[36:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31737s) **Presenter:** is of course something I can very easily generate tokens for, all right? So now you can see

[36:52](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31742s) **Presenter:** the solution, right? I'm gonna, I'm gonna authenticate to Azure CLI with permissions

[36:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31748s) **Presenter:** with Azure CLI, just query the Azure graph,

[37:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31751s) **Presenter:** the Microsoft graph or something,

[37:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31753s) **Presenter:** and then I'm just gonna exchange that token

[37:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31755s) **Presenter:** for an API hub token.

[37:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31757s) **Presenter:** Because power-ups can, can get access

[37:09](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31759s) **Presenter:** to this API hub token.

[37:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31761s) **Presenter:** And so this is exactly what, what I'm going to do,

[37:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31763s) **Presenter:** and this is how this screenshot actually shows

[37:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31766s) **Presenter:** how it looks like to use the tool

[37:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31768s) **Presenter:** that I'm gonna drop in a second,

[37:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31770s) **Presenter:** which allows you to, again, this is, this is,

[37:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31773s) **Presenter:** this is what you, what you,

[37:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31775s) **Presenter:** the permissions that you need to provide, right?

[37:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31779s) **Presenter:** Microsoft Azure CLI and then you have you get a whole bunch of goodies from

[37:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31782s) **Presenter:** Kind of you get different tokens that in specifically here. I'm I'm looking for the API hub token

[37:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31789s) **Presenter:** Alright, so now that we've solved this problem. Let me show you what I can do with it

[37:45](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31795s) **Presenter:** This entire thing is just gonna be a demo of PowerPoint PowerPoint is a tool that I'm releasing today

[37:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31801s) **Presenter:** You can find it in github already. It's actually a kind of a the next version of something. I put in I

[37:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31808s) **Presenter:** Defcon last year and PowerPoint is going to allow you to do everything I explained so far and actually much more

[38:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31816s) **Presenter:** So PowerPoint has different modules

[38:10](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31820s) **Presenter:** The dump module which we're gonna talk about right now

[38:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31823s) **Presenter:** There are also three models. I'm not gonna talk about

[38:16](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31826s) **Presenter:** Creating a backdoor which is actually a backdoor that persists through even if you delete the user

[38:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31832s) **Presenter:** phishing campaigns inside of an org no code malware which is a reference to kind of a

[38:28](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31838s) **Presenter:** Less at the Defcon last year check this out. This is a kind of just people are doing really really cool things with this already and so

[38:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31848s) **Presenter:** We're gonna focus on this part and so what I'm going to do is just run a powerpoint dump and I'm gonna

[38:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31853s) **Presenter:** And this is the ID for the guest tenants

[38:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31856s) **Presenter:** And then it's gonna wait a kind of think for a second. It's gonna acquire a token first of all to power ups

[38:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31863s) **Presenter:** And with that token to power ups

[38:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31865s) **Presenter:** I'm going to go to device login of course you can use the token that you get from somewhere else

[39:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31872s) **Presenter:** Whatever you'd like

[39:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31874s) **Presenter:** I'm going to authenticate why them authenticated as the hacker user

[39:10](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31880s) **Presenter:** Okay, and now it's going to first of all enumerate all of the different resources that they have access to

[39:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31887s) **Presenter:** I showed you connections credentials, but actually I have access to much more. We'll see that in a moment

[39:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31892s) **Presenter:** And so I started with the token to power-ups

[39:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31895s) **Presenter:** Through the token to power-offs, I was able to identify six applications that are available for me as a guest to use and also nine credentials

[39:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31905s) **Presenter:** And now I'm going to exchange this token for an API hub token and I'm going to use this API hub token

[39:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31912s) **Presenter:** To actually go through each one of those credentials and dump and dump that credential

[39:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31918s) **Presenter:** And I'm fetching some API specs for that you'll see that in a moment and so and by the time this is finished

[39:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31925s) **Presenter:** Now the dump is already on your drive.

[39:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31927s) **Presenter:** You can see a few things here.

[39:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31929s) **Presenter:** So one is that these are all of the types of connections

[40:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31932s) **Presenter:** where I found that were, that I found that were,

[40:05](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31935s) **Presenter:** that were shared.

[40:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31936s) **Presenter:** And I'm actually generating a,

[40:08](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31938s) **Presenter:** well you said it in a moment.

[40:10](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31940s) **Presenter:** There's actually the data behind those connections.

[40:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31942s) **Presenter:** So here's for example the SQL server that we saw earlier.

[40:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31945s) **Presenter:** You can see the different tables that exist

### Mitigations and the Shared Responsibility Model

[40:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31947s) **Presenter:** in the SQL server.

[40:18](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31948s) **Presenter:** And if I look into any one of them,

[40:21](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31951s) **Presenter:** then I see a full dump of that table.

[40:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31954s) **Presenter:** I also have a nice little GUI for you to just kind of use.

[40:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31959s) **Presenter:** And this GUI shows all of the different things that I was able to find in this tenant.

[40:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31963s) **Presenter:** You can see that there are credentials, automations, and applications.

[40:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31966s) **Presenter:** Applications you can, you can go into those applications and see what they have.

[40:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31970s) **Presenter:** Automations you can, you can actually run those automations.

[40:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31974s) **Presenter:** Okay, you can, you can, and then those automations can do a whole bunch of different things.

[40:48](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31978s) **Presenter:** Clicking on credentials would show you the credentials we saw earlier in this talk.

[40:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31983s) **Presenter:** So these are available here.

[40:54](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31984s) **Presenter:** And so the first thing you can do is go to dump.

[40:56](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31986s) **Presenter:** You go to dump.

[40:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31987s) **Presenter:** You see all of the tables.

[40:59](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31989s) **Presenter:** Here's the data for this entire SQL server

[41:01](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31991s) **Presenter:** with the generated social security numbers.

[41:06](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=31996s) **Presenter:** You can also kind of look at other queries here.

[41:11](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32001s) **Presenter:** And the other thing that's interesting here

[41:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32003s) **Presenter:** is that there's a playground

[41:15](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32005s) **Presenter:** where we are actually generating a Swagger UI

[41:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32007s) **Presenter:** for each one of those connections.

[41:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32009s) **Presenter:** So you can actually dynamically use these things

[41:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32013s) **Presenter:** to push whatever you'd like through these connections,

[41:26](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32016s) **Presenter:** specifically with SQL, note SQL pass through native query.

[41:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32019s) **Presenter:** This allows you to just run whatever you'd like on the server,

[41:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32023s) **Presenter:** which is kind of awesome.

[41:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32025s) **Presenter:** So, and you can use the Swagger API to do that.

[41:38](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32028s) **Presenter:** That's great.

[41:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32031s) **Presenter:** Check out the tool.

[41:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32032s) **Presenter:** There's plenty of more things you can do with it.

[41:44](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32034s) **Presenter:** And we're gonna give a few demos at Arsenal

[41:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32037s) **Presenter:** that cover what I've covered today,

[41:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32039s) **Presenter:** but also other scenarios you can do with the same tool.

[41:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32045s) **Presenter:** All right, so in the like four minutes or three minutes I have left

[42:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32050s) **Presenter:** Okay, I need to I need to give you something

[42:04](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32054s) **Presenter:** All right, so here's what first of all I'm gonna say this has been like we've strongly collaborated with Microsoft

[42:13](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32063s) **Presenter:** Throughout this entire thing they are aware of it. They're trying to fix what they can fix

[42:17](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32067s) **Presenter:** They are trying to make defaults better

[42:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32069s) **Presenter:** We have some of the mitigations that I'm just that I'm going to share with you right now. We've actually collaborated on

[42:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32075s) **Presenter:** creating them

[42:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32077s) **Presenter:** There are no in this stock what you've seen right now. There are no kind of vulnerabilities

[42:32](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32082s) **Presenter:** There's just like I don't creative reading of the docs and so

[42:36](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32086s) **Presenter:** I'm just gonna show I'm gonna brief very very briefly here

[42:40](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32090s) **Presenter:** I think the number one thing that we are missing is that if we think about the shared responsibility model for for example serverless

[42:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32099s) **Presenter:** right? But with low code, with the things that business users are building, we think,

[42:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32103s) **Presenter:** hey, that's probably secure. The vendor is in charge of everything. That's, of course,

[42:58](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32108s) **Presenter:** not true. I mean, you don't own the code, fine, but you own the business logic because

[43:02](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32112s) **Presenter:** they are using these tools to create business logic which doesn't make sense. For example,

[43:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32117s) **Presenter:** an app that impersonates its own users. If you're interested in that part, I'm going

[43:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32122s) **Presenter:** to explain a lot more about it in a talk tomorrow called something like show that business users

[43:20](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32130s) **Presenter:** what could go wrong.

[43:22](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32132s) **Presenter:** And so, again,

[43:24](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32134s) **Presenter:** the shared responsibility

[43:25](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32135s) **Presenter:** model applies here as well.

[43:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32137s) **Presenter:** The platforms themselves need to own their part

[43:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32139s) **Presenter:** and if you're looking

[43:31](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32141s) **Presenter:** at news, just last week,

[43:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32143s) **Presenter:** Tenable found a crucial

[43:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32145s) **Presenter:** multi-tenant vulnerabilities in this specific

[43:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32147s) **Presenter:** organization, in this specific platform

[43:39](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32149s) **Presenter:** that allowed them to basically replace

[43:41](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32151s) **Presenter:** your code with somebody else's code

[43:43](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32153s) **Presenter:** and do whatever they like,

[43:46](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32156s) **Presenter:** unauthenticated. But you as a

[43:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32159s) **Presenter:** to own your part. If you help, if you are, if you work for a

[43:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32163s) **Presenter:** large Microsoft shop or you help a large Microsoft shop, can

[43:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32167s) **Presenter:** you answer those questions? Like, what are your business

[44:00](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32170s) **Presenter:** users are building? Who are they sharing with? What is the

[44:03](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32173s) **Presenter:** data that they are actually using? I think the answer is

[44:07](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32177s) **Presenter:** probably no. This needs to be part of AppSec. And so we need

[44:12](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32182s) **Presenter:** to start carrying our own. And so now, in order to protect

[44:19](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32189s) **Presenter:** I'm gonna just send out, send you out in a few different directions.

[44:23](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32193s) **Presenter:** All of the links are gonna be there, okay?

[44:27](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32197s) **Presenter:** One minute?

[44:29](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32199s) **Presenter:** Okay.

[44:30](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32200s) **Presenter:** So very quickly, don't overshare credentials.

[44:33](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32203s) **Presenter:** That's kind of obvious, right?

[44:35](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32205s) **Presenter:** This is for developers.

[44:37](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32207s) **Presenter:** There's also a project called the OWASP Low Code, No Code Top 10, which would illustrate

[44:42](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32212s) **Presenter:** all of the different things that could go wrong when business users create applications,

[44:45](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32215s) **Presenter:** and this is actually speaking in a language

[44:47](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32217s) **Presenter:** that business users can understand.

[44:49](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32219s) **Presenter:** So you can just send them to those links

[44:51](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32221s) **Presenter:** and they'll hopefully understand

[44:53](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32223s) **Presenter:** what they need to do better.

[44:55](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32225s) **Presenter:** You can harden your environment.

[44:57](https://www.youtube.com/watch?v=Eh6b1H_-U20&t=32227s) **Presenter:** There's secure configuration you can apply.
<!-- talk-enrichment:end -->
