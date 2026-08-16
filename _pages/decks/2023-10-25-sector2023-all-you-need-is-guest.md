---
title: "All You Need is Guest"
talk_date: 2023-10-25
conference: SecTor 2023
permalink: /talks/2023-10-25-sector2023-all-you-need-is-guest/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-10-25_SecTor2023_AllYouNeedIsGuest/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-10-25_SecTor2023_AllYouNeedIsGuest/slides.pdf
schedule_url: https://www.blackhat.com/sector/2023/briefings/schedule/index.html#all-you-need-is-guest-36062
recording_url: https://player.vimeo.com/video/883401486?h=01f06f968f
recording_acquisition_url: http://2023.video.sector.ca/video/883401486
github_url: https://github.com/mbrg/power-pwn
description: "AAD (EntraID) guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. In this talk, we…"
abstract_source_url: "https://www.blackhat.com/sector/2023/briefings/schedule/index.html#all-you-need-is-guest-36062"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://player.vimeo.com/video/883401486?h=01f06f968f"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "cbfcdb67aa7930ba2f57618474f712df950c8585f4933bba639e24e7bf64ca1b"
---


<!-- talk-enrichment:start -->
## Abstract

AAD (EntraID) guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. In this talk, we will show how guests can leverage undocumented APIs to bypass limitations and gain unauthorized access to sensitive business data and capabilities including corporate SQL servers and Azure resources. Furthermore, we will reveal how guests can create and control internal business applications to move laterally within the organization. All capabilities presented in the talk will be demonstrated with default configuration. Next, we will drop PowerPwn, an offensive security toolset for Microsoft 365 focused on Power Platform. PowerPwn uncovers the true scope of guest access in your tenant. It automates limitation bypass, enumerates and dumps all accessible data, and allows for interactive write and delete operations by the researcher. Finally, we will make up for shattering the illusion of guests having limited access by sharing concrete steps to harden your configuration to prevent such attacks and suggest detection logic to catch them if a change in configuration is not possible.

_[Official conference abstract](https://www.blackhat.com/sector/2023/briefings/schedule/index.html#all-you-need-is-guest-36062)_

## Transcript

> AI generated from recording.

### Introduction & Demo of Guest Access; Understanding Guest Mechanism & Threat Landscape; Why Invite Guests? Business Use Cases; Guest Onboarding & Security Controls

[00:04] **Presenter:** Hi, everyone. Welcome to All You Need is Guest for this special edition virtual conversation. Before I get to anything, let me start with a demo to figure out why should you spend an hour with me right now. So I'm sure many of you have seen this email before or something like that.

[00:30] **Presenter:** guest to your Azure Active Directory tenant.

[00:32] **Presenter:** This is the email that you'll receive.

[00:33] **Presenter:** And this is telling you, hey, somebody's invited you to their tenant.

[00:37] **Presenter:** Feel free to join in.

[00:38] **Presenter:** You click on that link and you provide your own user.

[00:43] **Presenter:** And then you get to a screen where actually you don't really have access to anything because

[00:48] **Presenter:** guests don't have access to anything by default.

[00:50] **Presenter:** So somebody has invited you in, but you don't have access to like, you're not seeing any

[00:57] **Presenter:** office app here. You're not saying SharePoint or anything like that, right? So guests are probably

[01:02] **Presenter:** all right, right? Well, no. What I'm going to show you today is that guests can actually get

[01:08] **Presenter:** to information, business-sensitive information inside of your organization. Here's an example.

[01:15] **Presenter:** So what we are going to show, and you're going to understand what's going on here by the end of

[01:19] **Presenter:** this talk, but you can see that this guest is actually able to get to a whole bunch of credentials,

[01:25] **Presenter:** automations, applications that are available for them to use,

[01:28] **Presenter:** execute across the organization, inside of that specific organization

[01:35] **Presenter:** with business data laying behind those connections.

[01:38] **Presenter:** You can see the host names there of the different kinds of resources.

[01:44] **Presenter:** And so guests are actually pretty powerful.

[01:48] **Presenter:** And this is not just enumeration.

[01:51] **Presenter:** Just to make sure we're clear,

[01:52] **Presenter:** we will get to full dumps of all of the data behind all of these credentials.

[01:58] **Presenter:** We are talking about SQL servers and Azure resources

[02:01] **Presenter:** that are sitting around waiting for the guests to use them

[02:04] **Presenter:** across many organizations today.

[02:06] **Presenter:** And so with that very brief demo, hopefully I got your attention.

[02:11] **Presenter:** So at this point, let me kind of take a step back.

[02:15] **Presenter:** My name is Michael.

[02:18] **Presenter:** I've been focused on security for low-code, no-code apps

[02:22] **Presenter:** that business users are building for the last several years.

[02:26] **Presenter:** Co-founded a company called Zenity that's focused on helping customers

[02:31] **Presenter:** secure those kinds of applications.

[02:33] **Presenter:** I lead an OWASP group dedicated to this topic.

[02:37] **Presenter:** And by the way, I'm hiring.

[02:39] **Presenter:** So if you're interested, if you're looking for a way to make an impact

[02:43] **Presenter:** on the industry and to kind of join something fresh and new,

[02:48] **Presenter:** reach out to me.

[02:49] **Presenter:** All right.

[02:49] **Presenter:** So in order to understand what we just saw,

[02:52] **Presenter:** We need to figure out first, what is this guest mechanism?

[02:56] **Presenter:** Why are we even inviting guests into our own tenant?

[02:59] **Presenter:** What is the mechanism behind it?

[03:01] **Presenter:** And so here's, let me share a real story.

[03:05] **Presenter:** So we're a small cybersecurity company, and we work with large organizations.

[03:10] **Presenter:** And of course, when you start to collaborate with somebody else in a different organization,

[03:16] **Presenter:** the first thing that you'll need to do is pretty quickly you'll end up having to share files, right?

[03:22] **Presenter:** And so you can see files about a POC or maybe contracts or maybe a success criteria for a successful POC.

[03:30] **Presenter:** And so these files have to be shared somewhere, right?

[03:33] **Presenter:** How do you do that?

[03:34] **Presenter:** And so let's go through a few options.

[03:37] **Presenter:** One thing you can do is kind of simply ignore the problem, just email those files around what could go wrong, right?

[03:45] **Presenter:** And we've all been there, like we've all seen or shared ourselves sensitive information in emails.

[03:52] **Presenter:** not the right way to do it. And so that's one thing you can do. The other thing you could

[03:57] **Presenter:** probably do is just trust a random site on the internet, just like drag and drop your file

[04:04] **Presenter:** somewhere, have them fetch the information from the other side. And then of course, you've shared

[04:10] **Presenter:** that sensitive information with a random site, but whatever. There's also the real world version of

[04:17] **Presenter:** this. So this is

[04:19] **Presenter:** actually pretty cool. I've learned about this

### Enumerating Guest Capabilities; Exploiting Power Platform Connections; Bypassing Licensing & DLP Restrictions

[04:21] **Presenter:** while I was preparing for this talk.

[04:23] **Presenter:** This is a project where you have

[04:26] **Presenter:** real USB ports,

[04:27] **Presenter:** drop-off

[04:29] **Presenter:** points that would allow you to

[04:32] **Presenter:** just write

[04:33] **Presenter:** whatever files you'd like. So you can actually

[04:35] **Presenter:** trust the random on real life

[04:37] **Presenter:** as well. And so, of course,

[04:39] **Presenter:** that's funny, but

[04:40] **Presenter:** these are the ways

[04:41] **Presenter:** that we... These words

[04:45] **Presenter:** are actually being used, right? People are

[04:47] **Presenter:** People do need to share those files.

[04:48] **Presenter:** So what's a better mechanism to share those files?

[04:51] **Presenter:** That's where guests come in.

[04:53] **Presenter:** So the idea is where you have, let's say,

[04:57] **Presenter:** you still have that Fortune 1000 company.

[04:59] **Presenter:** They want to work with a vendor.

[05:01] **Presenter:** So guests or Azure Active Directory or Enter ID guests

[05:06] **Presenter:** are a mechanism for them to do two things in parallel.

[05:10] **Presenter:** One is that these external users can bring their own identities.

[05:17] **Presenter:** what that means.

[05:18] **Presenter:** And they can also access your internal applications,

[05:22] **Presenter:** for example, your SharePoint or your OneDrive,

[05:25] **Presenter:** but you get to stay in control.

[05:28] **Presenter:** So it tries to capture a way to successfully share files

[05:34] **Presenter:** with an untrusted party,

[05:36] **Presenter:** but in a way that keeps you in control.

[05:39] **Presenter:** So in order for this mechanism to actually be useful,

[05:42] **Presenter:** to actually perform to what it live up to its promise,

[05:48] **Presenter:** two things need to hold.

[05:49] **Presenter:** The first thing is that it needs to be very easy

[05:52] **Presenter:** for vendors to onboard.

[05:54] **Presenter:** Like any vendor would have,

[05:55] **Presenter:** like vendors would have different types

[05:57] **Presenter:** of identity providers, right?

[06:00] **Presenter:** You can't assume that they'll be using Active Directory,

[06:03] **Presenter:** Okta, or their own IDP.

[06:04] **Presenter:** You need to support all of them.

[06:06] **Presenter:** And so that's one problem here,

[06:09] **Presenter:** one thing that has to hold.

[06:10] **Presenter:** The other thing is, of course,

[06:12] **Presenter:** needs to be very easy for IT and security to control, right? Because otherwise you've just

[06:16] **Presenter:** allowed somebody into your tenant and, well, of course, they'll be able to get to information that

[06:21] **Presenter:** you wouldn't want them to get to. So let's try to figure out, let's look at both of these points

[06:28] **Presenter:** and see how Enter ID guests hold in that respect. So for the first point, guests are actually super

### Token Exchange & API Hub Access; Demonstration of PowerPoint Tool

[06:37] **Presenter:** easy to get. And while I'm talking right here, you can see in the background a few, like I've

[06:44] **Presenter:** recorded several ways in which people can invite guests into an enterprise tenant. Now, bear in

[06:52] **Presenter:** mind that these are all ways for business users to invite people that they need to work with

[06:58] **Presenter:** into your tenant. So you're not seeing here anything about like inviting a guest. You're

[07:04] **Presenter:** saying, maybe I own a Teams channel, or maybe I own a SharePoint site, and I want to invite

[07:12] **Presenter:** other collaborators.

[07:13] **Presenter:** And so I just look for their emails, I go through a few clicks, and that's it.

[07:20] **Presenter:** They will get access into the organization's account.

[07:24] **Presenter:** And so business users are making these decisions.

[07:27] **Presenter:** And so we typically very soon would have a lot of guest accounts.

[07:32] **Presenter:** Of course, once you get invited as a guest, you'll get this email, which we saw earlier, with the invite.

[07:41] **Presenter:** And actually, like in a talk last year, in Black Hat last year by Dirkian, he showed that these invites, if they are left unredeemed,

[07:51] **Presenter:** any user within the organization could just query for those unredeemed invites and redeem them with a different account.

[08:00] **Presenter:** So you can hijack those invites that were not used by anybody to get anybody into the tenant.

[08:08] **Presenter:** This vulnerability has already been fixed, but I think it's important for us to understand that getting a guest account into an enterprise tenant is not such a difficult thing to do.

[08:22] **Presenter:** Like a typical enterprise tenant would have lots and lots and lots of guests, more guests than actually users that they have internally, because this is assumed to be a safe mechanism.

[08:32] **Presenter:** And we'll touch more on that later.

[08:35] **Presenter:** And this is actually a really cool talk.

[08:37] **Presenter:** I really recommend you watch it if you want to learn more.

[08:40] **Presenter:** So we saw that guests are very easy to onboard.

[08:44] **Presenter:** The next thing that I need to prove to you is that it's easy for IT and security to control.

[08:48] **Presenter:** And now for that, you need to understand how this mechanism works.

[08:52] **Presenter:** let's drill into that. On the left side, you have the vendor. They could be using any IDP provider.

[08:59] **Presenter:** You're seeing like social identity providers, another Active Directory or entry ID tenant.

[09:06] **Presenter:** And on the right side, you have the Fortune 1000 organization. And so the way that this works is

[09:12] **Presenter:** that the identities get linked. So Azure Active Directory, the Fortune 500 Active Directory,

[09:18] **Presenter:** trusts the identity provider of the vendor

[09:22] **Presenter:** in order to authenticate users.

[09:25] **Presenter:** And the cool thing about this mechanism

[09:26] **Presenter:** is once you plug in Azure Active Directory there,

[09:29] **Presenter:** all of the security controls that Microsoft can provide for you

[09:33] **Presenter:** for your own users, they apply for these guests as well.

[09:36] **Presenter:** So conditional access,

[09:38] **Presenter:** multi-factor authentication requirements,

### Mitigations & Recommendations — Part 1

[09:42] **Presenter:** SASE, all of those things would work

[09:44] **Presenter:** because the identity provider would just

[09:48] **Presenter:** users to use the same mechanism.

[09:51] **Presenter:** So you can actually reuse what you've

[09:52] **Presenter:** set up for your own users for guests

[09:54] **Presenter:** as well. So this mechanism is actually pretty cool

[09:57] **Presenter:** because it allows you to

[09:59] **Presenter:** use those mechanisms that you

[10:00] **Presenter:** already have in place. But we do have

[10:03] **Presenter:** kind of a logical

[10:04] **Presenter:** problem here, right? So

[10:06] **Presenter:** we would like to apply

[10:08] **Presenter:** security controls to guests.

[10:11] **Presenter:** And so here's how it works.

[10:13] **Presenter:** We need guest access,

[10:15] **Presenter:** right? We need to be able to share

[10:17] **Presenter:** files with people.

[10:18] **Presenter:** And so in order to do that, we want to maintain our control.

[10:22] **Presenter:** So we want security controls, right?

[10:24] **Presenter:** In order to have those security controls,

[10:27] **Presenter:** we have to have those guests have an account in our Active Directory

[10:32] **Presenter:** because that's the way to implement security controls in the Microsoft suite.

[10:36] **Presenter:** But of course, once we give somebody access to an Azure Active Directory account,

[10:40] **Presenter:** then they get full access to the tenant, right?

[10:42] **Presenter:** So what's going on here?

[10:44] **Presenter:** Something is weird, right?

[10:47] **Presenter:** So there's one inaccuracy here, and let me correct that for you.

[10:52] **Presenter:** This is not full access.

[10:53] **Presenter:** So guests should be a different type of access.

[10:57] **Presenter:** It's access where it's denied by default.

[11:00] **Presenter:** So the guest only has access to the specific SharePoint site that somebody has shared with them

[11:05] **Presenter:** or the specific Teams channel that has invited them into the tenant.

[11:08] **Presenter:** They should not have access to any business productivity apps, any databases, nothing at all.

[11:15] **Presenter:** All right?

[11:17] **Presenter:** This is the mechanism behind guests.

[11:20] **Presenter:** And so a quick recap.

[11:21] **Presenter:** Guests are, A, very easy to use or very easy to get

[11:26] **Presenter:** from outside of an organization.

[11:28] **Presenter:** I really think we should think about them

[11:30] **Presenter:** as like a public-facing endpoint.

[11:32] **Presenter:** You should not assume that getting a guest account

[11:34] **Presenter:** on your tenant is a difficult thing to do.

[11:36] **Presenter:** The second thing is that Azure Active Directory

[11:41] **Presenter:** security controls apply, which is actually pretty cool.

[11:44] **Presenter:** So this mechanism is very powerful.

[11:46] **Presenter:** And access should be denied by default.

[11:48] **Presenter:** And now when I sold you like this perfect security mechanism,

[11:53] **Presenter:** let's see how it works in practice.

[11:55] **Presenter:** All right.

[11:56] **Presenter:** So now we're going to get our hands dirty for a second.

[12:02] **Presenter:** So what I'm going to do is you're seeing me right now

[12:07] **Presenter:** logged in into Teams as a benign user,

[12:10] **Presenter:** as just a normal user in the organization.

[12:16] **Presenter:** icon on the right button side, that icon tells you that I'm a legitimate user, just a user

[12:22] **Presenter:** in the organization.

[12:23] **Presenter:** In a moment, you'll see a different icon for the hacker perspective because I'm going to

[12:28] **Presenter:** switch between different users a lot.

[12:30] **Presenter:** So this would help you understand whether I'm logged in as a legitimate user or as a

[12:36] **Presenter:** hacker.

[12:37] **Presenter:** All right.

[12:37] **Presenter:** So logging in as a legitimate user.

[12:40] **Presenter:** I have a Teams channel here, and I'm just going to add a member to this Teams channel.

[12:47] **Presenter:** And let's type in the email of the hacker, because why not?

[12:51] **Presenter:** I'll click on add hacker to my organization.

[12:55] **Presenter:** And once I've done that, that hacker gets the email that we saw earlier.

[12:59] **Presenter:** So switching to the hacker's perspective, and again, you can see the hacker icon right now on the right button side.

[13:06] **Presenter:** I'm just going to log in with my own credentials.

[13:10] **Presenter:** the hacker controls because we just invited them with their own tenant.

[13:13] **Presenter:** You can see that the hacker's home tenant is pontoso at microsoft.com.

[13:18] **Presenter:** So I'm just going to log in and it's asking me for access.

[13:22] **Presenter:** It's saying, hey, the tenant's in the demo has invited you to their organization.

[13:26] **Presenter:** That's the organization we're hacking.

[13:28] **Presenter:** We're going to say accept.

[13:30] **Presenter:** And once I log in as the hacker, again, I get to this screen of applications, which is

[13:35] **Presenter:** empty, right?

[13:36] **Presenter:** Because that's what it should be.

[13:37] **Presenter:** It should be void of anything that these hackers could do.

[13:42] **Presenter:** And so right now we are in a situation where we invited the hacker in and they were able to log in.

[13:48] **Presenter:** And now the next step we should ask ourselves is, okay, what can they do?

[13:52] **Presenter:** Like, what's the worst thing that could happen?

[13:53] **Presenter:** And so before this talk, like, let's try to, before we get into the subject of this specific research, let's figure out what we already know.

[14:02] **Presenter:** What is the state of the art for guest exploitation?

[14:04] **Presenter:** There are two things that we already know that are possible with this guest account.

[14:09] **Presenter:** The first thing is phishing.

[14:12] **Presenter:** So, of course, once you add to phishing another dimension of the ability to reach out to people on Teams, on their internal Teams tenant, then it makes the phishing attempt more credible.

[14:25] **Presenter:** So once you invite a guest into your tenant, you can watch this great demo link here where you would actually be able to fish.

[14:36] **Presenter:** You can use Teams as part of your phishing campaign.

[14:39] **Presenter:** So that's one thing you can do.

[14:41] **Presenter:** The other thing is reconnaissance on the directory itself.

[14:46] **Presenter:** And so by default, guests have some limitation on what kind of information they can fetch from Azure Active Directory.

[14:57] **Presenter:** But actually through a bunch of sophisticated methods here, AAD internals allow you to actually find a lot of accounts within an organization.

[15:09] **Presenter:** The way this works is that as a guest, you can actually enumerate any group that you're a part of, like enumerate all of the users within any Azure Active Directory group that you're a part of.

[15:20] **Presenter:** And then you can continue to recursively do the same because you go to a group where you enumerate a specific group.

[15:30] **Presenter:** And then for each user, you can enumerate the groups that they belong to.

[15:33] **Presenter:** And you repeat that process.

[15:35] **Presenter:** And then you get to a whole bunch of users.

[15:37] **Presenter:** And so I do want you to note that this is beyond what you would think guests would be able to do.

[15:47] **Presenter:** But this is still only about enumeration.

[15:50] **Presenter:** And of course, hackers want more than that.

[15:53] **Presenter:** Hackers want to gain access to actual data.

[15:56] **Presenter:** And so what we're going to do today is focus on that.

[16:00] **Presenter:** And this is the point in the talk where you're going to have a choice right now.

[16:08] **Presenter:** And I want to suggest to you that if you don't want to have like a work to do or a responsibility when you get back to the office after sector is done,

[16:19] **Presenter:** then this is now a great time to kind of go and have an early lunch and enjoy your time.

[16:25] **Presenter:** But if not, then I'm going to show you some things in a moment that would change your perspective on guests.

[16:32] **Presenter:** All right.

[16:33] **Presenter:** So if there are no takers, we are going to continue.

### Mitigations & Recommendations — Part 2

[16:38] **Presenter:** And what I'm going to do is simply click on that link that you see here on the left side.

[16:43] **Presenter:** And before I do that, you can see that this link takes me to something called Power Apps and to a specific environment.

[16:49] **Presenter:** And you can see that the last part of the URL there is connections.

[16:53] **Presenter:** So let's see, where do we get?

[16:56] **Presenter:** All right, so there's this thing.

[16:58] **Presenter:** So it takes me to Power Apps.

[16:59] **Presenter:** Power Apps is part of the low-code, no-code platform,

[17:03] **Presenter:** part of the Office suite.

[17:04] **Presenter:** I'm just going to click on Next.

[17:07] **Presenter:** And then it's going to tell me,

[17:09] **Presenter:** hey, you don't really have access to this environment.

[17:12] **Presenter:** And this is because the URL that I added there,

[17:15] **Presenter:** the ID is for an environment in the guest tenant,

[17:19] **Presenter:** what I'm trying to hack.

[17:21] **Presenter:** All right, so I'll just click on Go to Home page.

[17:24] **Presenter:** And now I'm inside Power Apps,

[17:28] **Presenter:** but you can see that I'm in the home tenant.

[17:31] **Presenter:** So I'm in my hackers, as a hacker,

[17:33] **Presenter:** I belong to Pontoso, to a tenant called Pontoso,

[17:38] **Presenter:** and I'm logged in there.

[17:39] **Presenter:** So nothing special here, right?

[17:41] **Presenter:** But actually, I can just,

[17:43] **Presenter:** what I would like to do is log into Power Apps

[17:45] **Presenter:** for the guest tenant.

[17:47] **Presenter:** All right, so I can just click on,

[17:50] **Presenter:** view on a switch directory here.

[17:52] **Presenter:** And once I do that,

[17:54] **Presenter:** I can see all of the different tenants

[17:55] **Presenter:** that I have access to

[17:57] **Presenter:** because I'm a guest in that tenant.

[17:59] **Presenter:** I'm going to switch to Zenity demo,

[18:00] **Presenter:** which is the, again,

[18:01] **Presenter:** the tenant that we're hacking.

[18:04] **Presenter:** And now I'm in.

[18:06] **Presenter:** All right.

[18:06] **Presenter:** You can see on the right,

[18:08] **Presenter:** on the right upper,

[18:09] **Presenter:** on the upper right side

[18:10] **Presenter:** that we are in Zenity demo.

[18:12] **Presenter:** We are in something called

[18:14] **Presenter:** connections in Zenity demo.

[18:16] **Presenter:** And like, take a moment to understand,

[18:18] **Presenter:** to try and figure out

[18:19] **Presenter:** what you're looking at.

[18:20] **Presenter:** This is a list of things that look like credentials.

[18:25] **Presenter:** They have icons for things like SQL Server, Azure Table Storage.

[18:31] **Presenter:** You can see the host names there.

[18:33] **Presenter:** Things like customer data, enterprise IP.

[18:38] **Presenter:** These are credentials to business data that belongs to the guest organization.

[18:47] **Presenter:** To the guest organization that we're trying to hack.

[18:50] **Presenter:** I really should not have access to see anything like that.

[18:54] **Presenter:** So let's try to figure out what exactly are we looking at.

[18:58] **Presenter:** All right.

[18:58] **Presenter:** And we'll start with this Azure file storage.

[19:01] **Presenter:** You can see that this is a file storage that goes to something like Jamie Redding customer data.

[19:06] **Presenter:** Okay.

[19:07] **Presenter:** Let's try to figure out what that means.

[19:09] **Presenter:** And so clicking on that, on those three dots there, we can see the little menu that we get.

[19:15] **Presenter:** We can edit those connections.

[19:17] **Presenter:** And there's a little icon here that says share.

[19:24] **Presenter:** Now, share on a credential is interesting, right?

[19:28] **Presenter:** Let's figure out what this means.

[19:32] **Presenter:** So we can see that this connection to Azure File Storage

[19:37] **Presenter:** is actually being shared with three different things, entities.

[19:42] **Presenter:** One is shared with org, all right?

[19:44] **Presenter:** We'll understand what that means in a moment.

[19:47] **Presenter:** Redding. This might be the Jamie Redding that has their name on the file storage as well.

[19:56] **Presenter:** And you can also see Jamie Contoso, and you can barely see there, but the email address is an

[20:02] **Presenter:** Outlook account. So Jamie has probably also shared this with their Outlook account.

[20:09] **Presenter:** This shared with org line is exactly the problem that we have here. And this is actually why we're

[20:15] **Presenter:** seeing this connection. Because there's a feature here that allows people to create a connection

[20:22] **Presenter:** and then share it with the entire org. And when they say the entire org, they mean everybody in

[20:27] **Presenter:** your tenant, which of course includes guests. So we understand what are we actually seeing here.

[20:34] **Presenter:** If we go through each one of these connections, we would see that they were all shared with org,

[20:40] **Presenter:** shared with everyone.

[20:41] **Presenter:** All right, let's try to figure out what...

[20:43] **Presenter:** We know that this is a connection.

[20:45] **Presenter:** It was shared with me,

[20:46] **Presenter:** but I don't really see the data

[20:48] **Presenter:** or I can't really use it, right?

[20:49] **Presenter:** So let's try and figure out

[20:51] **Presenter:** what this is actually doing.

[20:53] **Presenter:** So going to details,

[20:55] **Presenter:** I can see a bunch of information

[20:56] **Presenter:** about this connection.

[20:58] **Presenter:** The first thing that you can see

[20:59] **Presenter:** is indeed that the owner of this connection

[21:01] **Presenter:** is a user called Jamie Redding.

[21:03] **Presenter:** And now just to figure out

[21:04] **Presenter:** who's this Jamie Redding,

[21:06] **Presenter:** why are they creating an Azure file storage

[21:08] **Presenter:** and why they're sharing it with everyone.

[21:10] **Presenter:** Let's try to look them up in the directory.

[21:14] **Presenter:** And you'll find that Jamie Redding

[21:16] **Presenter:** is actually a customer service representative

[21:20] **Presenter:** that's part of the sales operation team.

[21:23] **Presenter:** So Jamie is a business user.

[21:25] **Presenter:** So why is a business user creating a connection

[21:28] **Presenter:** to an Azure storage account

[21:29] **Presenter:** and then sharing it with the entire org?

[21:31] **Presenter:** So let me show why.

[21:33] **Presenter:** Here's why Jamie is creating a connection

[21:38] **Presenter:** Azure File Storage and sharing it with everyone.

[21:40] **Presenter:** Actually, business users have been using low-code, no-code applications

[21:44] **Presenter:** to solve their own problems without waiting for IT.

[21:47] **Presenter:** So they plug into business data with their own accounts,

[21:50] **Presenter:** they build a little application around it,

[21:52] **Presenter:** and they share it with everyone.

[21:54] **Presenter:** And we have already seen business-critical applications

[21:57] **Presenter:** that have been built using this technology.

[22:00] **Presenter:** And right now, what you're seeing on screen

[22:01] **Presenter:** is that these applications can actually be generated by AI.

[22:05] **Presenter:** So right now, business users can chat with AI, with a chat GPT-like interface.

[22:10] **Presenter:** And by the time that this chat is done, the AI has already created an application for them with a database behind that application that the AI generated as well.

[22:21] **Presenter:** And the application is already deployed.

[22:23] **Presenter:** So it's straight to production.

[22:25] **Presenter:** You can now share this application.

[22:27] **Presenter:** So it has a life of its own.

[22:29] **Presenter:** So imagine what happens when every time a business user talks to ChatGPT, they leave behind an application.

[22:36] **Presenter:** Pretty soon you have a trail of application that sits behind all of those conversations.

[22:42] **Presenter:** And so this is why Jamie has created this connection.

[22:46] **Presenter:** Because Jamie has tried to create an application that was built on top of this Azure file storage account.

[22:52] **Presenter:** But they are not a security expert.

[22:55] **Presenter:** They wanted to share their application with the entire organization because it's a useful application.

[23:00] **Presenter:** And so, and implicitly, that connection gets shared as well.

[23:04] **Presenter:** And if you think that this is like a small thing that not a lot of people are like, if you're thinking right now something like, well, how many businesses are actually building those kind of applications?

[23:15] **Presenter:** Will I see these kind of connections laying around in my organization?

[23:19] **Presenter:** So let me try and answer that for you.

[23:25] **Presenter:** So this chart shows one number.

[23:28] **Presenter:** It shows the number 5 million.

### Mitigations & Recommendations — Part 3

[23:30] **Presenter:** This is actually the number of .NET developers that are active today, according to Microsoft.

[23:39] **Presenter:** So Microsoft says that there are over 5 million .NET developers today building applications.

[23:46] **Presenter:** How many developers do you think are using low-code, no-code platforms,

[23:50] **Presenter:** specifically Microsoft's low-code, no-code platform, to build their own application?

[23:53] **Presenter:** Just have a number in your head.

[23:55] **Presenter:** and try to compare it with the number of .NET developers.

[24:00] **Presenter:** So I went through Microsoft's earning reports

[24:02] **Presenter:** and actually found that, like with a small linear regression here,

[24:07] **Presenter:** that today there are something like 8 million active local,

[24:12] **Presenter:** local developers, citizen developers,

[24:14] **Presenter:** using the Microsoft suite alone.

[24:16] **Presenter:** So far more citizen developers than .NET developers.

[24:19] **Presenter:** And now think about how much security input are we putting into,

[24:25] **Presenter:** that .NET developers are building

[24:26] **Presenter:** compared to what business users are building.

[24:29] **Presenter:** Well, this doesn't put us

[24:31] **Presenter:** in a terribly good situation here, right?

[24:36] **Presenter:** Okay.

[24:37] **Presenter:** So now that we understand

[24:38] **Presenter:** why are these connections there,

[24:41] **Presenter:** the next part is to figure out

[24:43] **Presenter:** what can we do with them.

[24:44] **Presenter:** Because right now,

[24:44] **Presenter:** we just saw that they exist,

[24:46] **Presenter:** which is actually not a lot.

[24:50] **Presenter:** Okay.

[24:50] **Presenter:** Logging in as the hacker again.

[24:52] **Presenter:** Let's try to see

[24:53] **Presenter:** what we can get out of this connection.

[24:56] **Presenter:** Can we actually see the data behind it?

[24:59] **Presenter:** And so the first thing that I'm going to do

[25:00] **Presenter:** is just kind of dig into it.

[25:04] **Presenter:** You can see that there's an application

[25:06] **Presenter:** that is using this connection

[25:07] **Presenter:** and the application is called Customer Insights.

[25:09] **Presenter:** Let's try to dive into it.

[25:13] **Presenter:** All right, clicking on that application

[25:16] **Presenter:** brings me to a page with information about that app.

[25:19] **Presenter:** And you can see that there's a link there

[25:20] **Presenter:** and I'll click it to be able to log into the application.

[25:25] **Presenter:** And now I get this error, which is sending me,

[25:28] **Presenter:** hey, you need a Power Apps plan.

[25:30] **Presenter:** Let's expand that.

[25:34] **Presenter:** Actually, what's going on here

[25:36] **Presenter:** is that I don't have a license.

[25:38] **Presenter:** Like I'm stopped because there's no,

[25:40] **Presenter:** you can see like the error here is saying

[25:43] **Presenter:** you don't have the correct plan to access this app.

[25:46] **Presenter:** Ask your admin for one

[25:47] **Presenter:** or ask the admin at the organization

[25:50] **Presenter:** which you're a guest.

[25:52] **Presenter:** All right.

[25:53] **Presenter:** Can you think of what I'm going to do in order to bypass this protection?

[25:57] **Presenter:** Because this is telling me I can ask either my own admin or the admin of the organization

[26:03] **Presenter:** in which I'm a guest.

[26:04] **Presenter:** So if I have a license in my own home tenant that would work for the guest tenant, now

[26:09] **Presenter:** that's not possible, right?

[26:11] **Presenter:** Well, let's try.

[26:13] **Presenter:** Here's a way that Microsoft allows us to ask for a free license.

[26:20] **Presenter:** Okay, so I'm just going to ask for a license.

[26:22] **Presenter:** I'm going to add in my hacker account and ask nicely.

[26:26] **Presenter:** And Microsoft is going to say, yeah, okay, of course, here you have a license.

[26:29] **Presenter:** And now I'm going to try to log in again.

[26:32] **Presenter:** And this time I'm in because why not?

[26:35] **Presenter:** So it turns out that if you have a license in your home tenant, then it applies to your guest tenant as well.

[26:42] **Presenter:** So all you need to do is just sign up for this free license and you can bypass this protection on the guest site.

[26:52] **Presenter:** But after a brief moment when this loads, I get this screen, which is telling me something about data loss prevention policies and expanding this.

[27:03] **Presenter:** You can see that something is stopping me and it says that the policy name is deny Azure file storage.

[27:10] **Presenter:** So I got through the licensing issue,

[27:15] **Presenter:** but it seems like I'm blocked by something called DLP,

[27:18] **Presenter:** by a DLP, by data loss prevention.

[27:21] **Presenter:** So does this mean that this local no-code platform

[27:26] **Presenter:** that Microsoft has is actually like has DLP embedded in it?

[27:31] **Presenter:** So let's figure that out.

[27:34] **Presenter:** So indeed, Microsoft, the Power Platform,

[27:37] **Presenter:** which is their local no-code platform,

[27:39] **Presenter:** data loss prevention policies.

[27:41] **Presenter:** And it's baked into the platform,

[27:43] **Presenter:** which sounds really, really cool.

[27:44] **Presenter:** So let's try to use it as the legitimate user

[27:47] **Presenter:** to set up a classic DLP policy,

[27:50] **Presenter:** like finding social security numbers

[27:52] **Presenter:** and making sure that those are encrypted or are labeled.

[27:56] **Presenter:** And so I'm going to go to the admin center,

[27:59] **Presenter:** create a new DLP policy,

[28:01] **Presenter:** which would find social security numbers.

[28:05] **Presenter:** And then it's taking me to a screen

[28:06] **Presenter:** that says something about connectors.

[28:10] **Presenter:** different types of services here, for example, SharePoint.

[28:15] **Presenter:** You can also see that SharePoint has something in some,

[28:19] **Presenter:** like a column here saying that it's not blockable.

[28:21] **Presenter:** So, and I'm not seeing anything here about adding patterns.

[28:25] **Presenter:** So how exactly am I looking for social security numbers?

[28:28] **Presenter:** Something is weird here, right?

[28:30] **Presenter:** This is not what you would expect when you clicked on DLP.

[28:34] **Presenter:** So actually, it's important to know that this is not a DLP in the way that we're used to,

[28:41] **Presenter:** in the way that we're used to thinking about as security experts.

[28:45] **Presenter:** Like DLP in the security world means a very specific thing.

[28:50] **Presenter:** You can classify data.

[28:51] **Presenter:** You can find patterns.

[28:53] **Presenter:** You can make sure the data doesn't move between a high sensitivity and low sensitivity.

[28:58] **Presenter:** This is not it.

[29:00] **Presenter:** This is mainly an allow list and deny list for the connectors,

[29:05] **Presenter:** the types of services that you can use within Power Platform.

[29:10] **Presenter:** And you can see here that this is a very,

[29:14] **Presenter:** like the granularity level is very coarse.

[29:18] **Presenter:** So I can control SharePoint as a whole

[29:21] **Presenter:** rather than a specific SharePoint site

[29:22] **Presenter:** or a specific file on the specific SharePoint site.

[29:25] **Presenter:** Now, admittedly, there are more advanced features,

[29:29] **Presenter:** But they are related to just a handful of those connectors here.

[29:34] **Presenter:** And even with this mechanism, that is like, even with the good things about this mechanism,

[29:41] **Presenter:** and there are, of course, good things about it, there are still ways to bypass it.

[29:45] **Presenter:** And one of our hobbies is to try to collect these ways to bypass the DLP.

[29:52] **Presenter:** And so here are a few of them.

[29:53] **Presenter:** So here's one, and here's another, and here's another, and here's another, and here's another.

[29:59] **Presenter:** If you would like to learn more information, there's a link here that would allow you to understand more.

[30:06] **Presenter:** So I think it's important for us to understand that this DLP mechanism within Power Platform is great at what it was built for.

[30:18] **Presenter:** It was built to help prevent mistakes that business users would make.

### Mitigations & Recommendations — Part 4

[30:23] **Presenter:** But this is not a mechanism that would actually prevent an attacker from getting data outside of our tenant.

[30:32] **Presenter:** It's not what it's meant to do.

[30:34] **Presenter:** And there are also ways to bypass it.

[30:36] **Presenter:** So I think it's important for us to note that.

[30:40] **Presenter:** But having said that, we are still stuck here, right?

[30:42] **Presenter:** I still got to an application.

[30:43] **Presenter:** I wanted to move to see the application, but I got blocked by this DLP message.

[30:50] **Presenter:** And so this is a point in the talk where, unfortunately, I'm going to have to wave my hands and tell you that we're going to need to skip through it.

[31:00] **Presenter:** Basically, there's some stuff I wanted to share with you today about what would we do with that.

[31:07] **Presenter:** But Microsoft has asked me not to.

[31:09] **Presenter:** We are kind of working with them as part of vulnerability disclosure, and they are actually going to fix it.

[31:15] **Presenter:** So we are very happy about it, and so we are not going to share anything.

[31:20] **Presenter:** been at work for a while now, but they are still working on it. So we're going to give

[31:24] **Presenter:** a bit more time. So check back on this website in a few weeks and we'll share all of the

[31:31] **Presenter:** information. And so let's move somewhere else because we were not able to actually see anything

[31:39] **Presenter:** for Azure File Storage. Let's look at the SQL Server. All right. So this is just taking another

[31:45] **Presenter:** thing from the same list. I'm going to go to the SQL server, which

[31:49] **Presenter:** says something about customer care insights. And then I'm going to look

[31:53] **Presenter:** at applications that are using this connection, click on one of those

[31:57] **Presenter:** applications, click on the URL. You saw this earlier. And now

[32:01] **Presenter:** I'm logging into the app and there's no DLP policy here, so I'm in.

[32:05] **Presenter:** And the first thing it says, it's sending me, hey, I'm going to use this connection

[32:09] **Presenter:** when I'm logging into the app. And I'm like, okay, why not? This is the connection

[32:13] **Presenter:** that was shared with everyone, so we have access to it, again, as a guest.

[32:18] **Presenter:** And now that I'm in, you can see the application.

[32:20] **Presenter:** It exposes information about customers for that company.

[32:25] **Presenter:** And you can see records for each one of those customers.

[32:28] **Presenter:** And if you click on one of them, then you get information about that specific user,

[32:34] **Presenter:** including first name, last name, email, customer ID, and their social security number.

[32:40] **Presenter:** Now, don't worry.

[32:41] **Presenter:** These were all generated by ChatGPT.

[32:43] **Presenter:** sensitive information here.

[32:45] **Presenter:** So let's try and understand how the application gets access to this information.

[32:50] **Presenter:** So what exactly is happening here on the back end?

[32:53] **Presenter:** If I just open up my browser developer tools,

[32:57] **Presenter:** so you can see that there's a single request,

[33:02] **Presenter:** and we'll zoom in in a moment,

[33:04] **Presenter:** where this application is getting information,

[33:07] **Presenter:** is getting all of this customer information.

[33:11] **Presenter:** and this request, again, a single request,

[33:14] **Presenter:** which goes to, which has something about

[33:16] **Presenter:** like some endpoint here

[33:19] **Presenter:** that says something like APIM, SQL,

[33:23] **Presenter:** and then there's an ID.

[33:24] **Presenter:** So let's try to, in a moment,

[33:26] **Presenter:** we'll try to dive into what this endpoint actually is,

[33:29] **Presenter:** but just to make sure that this endpoint

[33:31] **Presenter:** is what we're looking at, what we're after,

[33:34] **Presenter:** let's just copy this request

[33:39] **Presenter:** to replay it outside of the browser.

[33:42] **Presenter:** So this is just a simple request.

[33:46] **Presenter:** I'm sending a GET request to this endpoint.

[33:51] **Presenter:** And of course, I get all of the information back

[33:53] **Presenter:** because why not?

[33:54] **Presenter:** We just copied it from the browser.

[33:56] **Presenter:** So actually, the PowerApp application

[34:00] **Presenter:** doesn't really have access directly to the data.

[34:02] **Presenter:** It goes through this endpoint.

[34:04] **Presenter:** So let's try to figure out what this endpoint actually is.

[34:07] **Presenter:** So here is that endpoint again.

[34:09] **Presenter:** And we're going to understand what this endpoint does.

[34:13] **Presenter:** And the reason why is that this is not only the endpoint

[34:17] **Presenter:** that allows the application to get information

[34:20] **Presenter:** from that SQL database.

[34:22] **Presenter:** This is the endpoint that would stream any operation

[34:26] **Presenter:** that would use this connection.

[34:27] **Presenter:** So actually the application would use this endpoint

[34:30] **Presenter:** to fetch information behind that connection.

[34:32] **Presenter:** So let's understand what this endpoint looks like.

[34:35] **Presenter:** First of all, you can see Azure API.

[34:37] **Presenter:** And this is actually just an API gateway hosted in Azure.

[34:42] **Presenter:** Next, you can see that this is a connection of type SQL.

[34:46] **Presenter:** We saw others like file storage and others.

[34:49] **Presenter:** And you can see the ID of the specific SQL connection.

[34:54] **Presenter:** Then you can see that I'm querying a specific operation.

[34:57] **Presenter:** That operation is looking at, we are looking at specific data sets.

[35:01] **Presenter:** So the data set is, you can see that this actually gives me the SQL server and database name.

[35:08] **Presenter:** So Customer Care Insights and Enterprise Customers.

[35:12] **Presenter:** And the specific operation is going to tables and then something that, let me fix that URL encoding for you.

[35:20] **Presenter:** So tables, DBO customers, items.

[35:24] **Presenter:** So this is just like a very simple request saying, hey, give me all of the items in that table.

[35:28] **Presenter:** So how exactly does this work?

[35:33] **Presenter:** At the end of the day, on one side, on the left side, you have your Power Apps or your Power Automate, which needs to operate with some identity.

[35:44] **Presenter:** And on the right side, you have an API and a service.

[35:49] **Presenter:** And now, just think about a business user that tries to build an application.

[35:54] **Presenter:** They can't generate a service account for their application to use, right?

[35:59] **Presenter:** So the way that low-code, no-code platforms work, and this is not just a Microsoft problem, this is across every low-code, no-code platform, is that they allow users to impersonate their own identities.

[36:09] **Presenter:** So the user embeds their identity, their personal identity, within their application.

[36:15] **Presenter:** And then every application user uses that identity and replays it.

[36:20] **Presenter:** And so this is how this works.

[36:22] **Presenter:** The user would create the connection.

[36:25] **Presenter:** the connection credentials would get stored in some secret storage,

[36:32] **Presenter:** and then the application would route all of its API calls through API Gateway,

[36:39] **Presenter:** and the API Gateway would dynamically plug in the user token in the request

[36:44] **Presenter:** before it goes off to the external service.

[36:48] **Presenter:** This means that the endpoint we just saw actually has access to the user credential that is being used and shared across the organization.

[36:58] **Presenter:** So you don't get direct access to the connection, but you can use through this API gateway endpoint, you can just use this connection to do whatever you'd like.

[37:08] **Presenter:** So let's take a closer look at that specific request,

[37:14] **Presenter:** because what we just understood Appentine right now,

### Mitigations & Recommendations — Part 5

[37:17] **Presenter:** Appentine now, means that if we can replicate that request,

[37:23] **Presenter:** that specific request that's going through API Gateway,

[37:26] **Presenter:** then we can actually use the connection, not just see it.

[37:29] **Presenter:** And again, we are logged in as the guest here, as you can see,

[37:31] **Presenter:** with the malicious user icon on the right bottom side.

[37:35] **Presenter:** So let's figure out what is the authentication token

[37:39] **Presenter:** that is required in order to actually perform this operation.

[37:43] **Presenter:** So opening up the JW token,

[37:46] **Presenter:** you can see that this needs to be a token

[37:48] **Presenter:** that allows me to fetch information

[37:50] **Presenter:** from something called API hub at azure.com.

[37:53] **Presenter:** And this is actually an internal Microsoft API.

[37:56] **Presenter:** So the question becomes,

[37:59] **Presenter:** can we generate a token to API hub?

[38:01] **Presenter:** Because if we can, as a guest,

[38:06] **Presenter:** to run requests, to execute requests through that connection,

[38:11] **Presenter:** which allows us to do anything we want with those credentials,

[38:13] **Presenter:** all of the credentials that you saw earlier.

[38:16] **Presenter:** We need to remember that generating tokens is trivial, right?

[38:19] **Presenter:** This is our user.

[38:20] **Presenter:** So we know we can authenticate.

[38:23] **Presenter:** That's easy.

[38:23] **Presenter:** The problem is that we need a client ID.

[38:26] **Presenter:** We need an application that is allowed to generate a token to API Hub.

[38:32] **Presenter:** This is, again, an internal resource.

[38:34] **Presenter:** So let's try a couple of ways.

[38:37] **Presenter:** The first thing we can try is just to use any built-in public client application.

[38:41] **Presenter:** So any application that already exists in the guest tenant that is a public client application,

[38:47] **Presenter:** meaning you don't have to know a secret in order to use it.

[38:52] **Presenter:** But unfortunately, this would not work because those applications need to be pre-approved

[38:57] **Presenter:** to be able to query API Hub.

[39:00] **Presenter:** So we're stuck there.

[39:02] **Presenter:** One other thing we can do is we can build our own application,

[39:05] **Presenter:** of course, not in the guest tenant because we don't have access to do that,

[39:08] **Presenter:** but in our own tenant, we can build a multi-tenant application

[39:11] **Presenter:** and then try to use that application.

[39:13] **Presenter:** But that would not work as well because even if you try to give yourself

[39:17] **Presenter:** your application the right permissions,

[39:19] **Presenter:** you would not find API hub listed there in Azure Active Directory

[39:23] **Presenter:** because, again, it's an internal API.

[39:25] **Presenter:** You cannot give yourself access to use this API.

[39:29] **Presenter:** And so we're kind of stuck.

[39:32] **Presenter:** So we need that token.

[39:34] **Presenter:** If we were able to get that token, we'll be done.

[39:37] **Presenter:** Let's try to figure out where we are.

[39:39] **Presenter:** Like a very quick recap.

[39:42] **Presenter:** We got guest access to an organization and we saw nothing.

[39:45] **Presenter:** Like we didn't see any application, anything that we could actually do, actually use.

[39:50] **Presenter:** But then when we clicked on that magic link to power-ups,

[39:54] **Presenter:** then we saw that there are a bunch of credentials

[39:56] **Presenter:** that are just sitting around there and waiting for us.

[40:00] **Presenter:** And of course, we want to get behind that.

[40:01] **Presenter:** We want to get more than enumeration.

[40:04] **Presenter:** We try to get access to the applications

[40:08] **Presenter:** that use these connections.

[40:09] **Presenter:** We were blocked by a license,

[40:11] **Presenter:** but we pretty easily circumvented that

[40:14] **Presenter:** by just getting a license.

[40:16] **Presenter:** Then we were blocked by DLP.

[40:19] **Presenter:** And I did a bunch of hand-waving to tell you

[40:21] **Presenter:** that there are ways to move forward there,

[40:26] **Presenter:** later. And now we're blocked by getting access to API hub, but you need to be able to generate

[40:34] **Presenter:** a token. And so let's try to figure out how can we solve that last bit? Because if we do,

[40:41] **Presenter:** then it's game over. We have full access to those credentials. So we need to find an application

[40:48] **Presenter:** that has a few properties. One thing, it has to be on by default because this needs to be

[40:56] **Presenter:** because we cannot generate applications in that tenant.

[40:59] **Presenter:** The second thing is that it has to be pre-approved

[41:02] **Presenter:** to query API Hub

[41:03] **Presenter:** because we cannot provide an application

[41:05] **Presenter:** with the permissions to do it ourselves.

[41:09] **Presenter:** And it has to be a public client application

[41:11] **Presenter:** because otherwise we cannot generate tokens on its behalf

[41:14] **Presenter:** because we don't have the right credentials.

[41:17] **Presenter:** So what applications do we know of

[41:20] **Presenter:** that could have some of these properties?

[41:23] **Presenter:** These are the properties that we need.

[41:26] **Presenter:** know of one application that has some of these properties, right? Because we already saw an

[41:32] **Presenter:** instance where an application was able to generate a token to API Hub. That application is the

[41:37] **Presenter:** PowerApps portal. So the PowerApps portal was able to generate this kind of token. Indeed,

[41:46] **Presenter:** it is, A, owned by default because PowerApps is part of Office and it's owned by default in every

[41:52] **Presenter:** tenant. It's also pre-approved to

[41:54] **Presenter:** Query API app, which

[41:56] **Presenter:** again, we know because we just saw it.

[41:58] **Presenter:** But unfortunately, Power Apps

[42:00] **Presenter:** portal is not a public client application.

[42:03] **Presenter:** It's actually a confidential client

[42:04] **Presenter:** application. It uses

[42:07] **Presenter:** a certificate in order

[42:08] **Presenter:** to authenticate. So we cannot really generate

[42:10] **Presenter:** tokens on its behalf.

[42:12] **Presenter:** So here's

[42:14] **Presenter:** the way in which we're going

[42:16] **Presenter:** to circumvent that. We're going to use

[42:19] **Presenter:** a very

[42:20] **Presenter:** cool undocumented property that was discovered by a few cool researchers about Active Directory,

[42:29] **Presenter:** and that's called the family of client IDs. So just think about what happens when you go to

[42:36] **Presenter:** an office account, when you log into your office account, and then you move between different apps.

[42:41] **Presenter:** Remember that every different office app has a different domain name, right? You go to Excel

[42:48] **Presenter:** or to OneDrive or to Teams.

[42:51] **Presenter:** These would have different domain names,

[42:54] **Presenter:** different application IDs,

[42:56] **Presenter:** different resources in the scope of the token.

[42:59] **Presenter:** So different tokens need to be generated.

[43:02] **Presenter:** How exactly does this work?

[43:03] **Presenter:** You do not get asked to reauthenticate

[43:06] **Presenter:** every time that you move between those apps.

[43:09] **Presenter:** So actually the way that this works

[43:11] **Presenter:** is that Microsoft has an undocumented behavior

[43:15] **Presenter:** where if you have a token, a refresh token,

[43:18] **Presenter:** to any one of the applications within the Microsoft DECA system,

[43:22] **Presenter:** you can exchange it for a token of another application.

[43:27] **Presenter:** And so this is actually going to solve our problem.

[43:30] **Presenter:** So let's see the list of applications that we already know of as a community

[43:34] **Presenter:** that are a part of this group of application

[43:38] **Presenter:** where you can exchange tokens between them.

[43:41] **Presenter:** So here's the list of applications that we know of as a community

[43:45] **Presenter:** that are part of this group where you can exchange token between them.

[43:49] **Presenter:** And you can see a whole bunch of applications there.

[43:51] **Presenter:** These are all applications within the Office suite.

[43:53] **Presenter:** And you'll see two applications here which are important for us.

[43:56] **Presenter:** One is Power Apps, which is exactly what we're looking for, right?

[44:00] **Presenter:** And the other is Microsoft Azure CLI,

[44:02] **Presenter:** which we know is a public client application.

[44:05] **Presenter:** Everybody that's using Azure knows that this is a public client application

[44:08] **Presenter:** that you can very easily generate tokens on its behalf.

[44:11] **Presenter:** So now we have our solution.

[44:14] **Presenter:** And here it is.

### Mitigations & Recommendations — Part 6

[44:15] **Presenter:** We are going to use the Microsoft CLI.

[44:18] **Presenter:** We're going to authenticate on behalf of Microsoft Azure CLI,

[44:21] **Presenter:** which allows us to generate tokens

[44:23] **Presenter:** because it's a public client application.

[44:24] **Presenter:** And then we're going to exchange that token

[44:26] **Presenter:** with a token to Azure API Hub.

[44:29] **Presenter:** And that would allow us to actually get the token that we need.

[44:32] **Presenter:** And so this gives us everything we wanted.

[44:35] **Presenter:** These are all applications that are owned by default.

[44:38] **Presenter:** PowerHubs is pre-approved to Query API Hub.

[44:41] **Presenter:** And the Azure CLI is actually a public client application.

[44:45] **Presenter:** And so now we have that solution.

[44:47] **Presenter:** And because we have the solution,

[44:49] **Presenter:** we can move on to the best part about this talk,

[44:54] **Presenter:** which is the fun part where I can show you

[44:56] **Presenter:** what we can actually do with these connections

[44:58] **Presenter:** or what is the true power of a guest within an organization.

[45:07] **Presenter:** All right.

[45:08] **Presenter:** So this part is going to be focused on demoing a tool called PowerPoint.

[45:13] **Presenter:** PowerPoint is a tool that accomplishes everything that you saw here in this talk.

[45:17] **Presenter:** It was released on Black Hat 2023, USA, and you can find it on GitHub right now.

[45:25] **Presenter:** And PowerPoint allows you to do a whole bunch of things, actually.

[45:29] **Presenter:** You can see that there are several modules here.

[45:32] **Presenter:** Today, we're going to focus on the DAP module, but there are actually others.

[45:38] **Presenter:** a backdoor within the organization that persists, even if the user that you compromised initially

[45:46] **Presenter:** is deleted, the backdoor would still work. There is a module for no-code malware, which is

[45:53] **Presenter:** a way to kind of take control of Microsoft services to publish your own malware, which I talked about

[46:00] **Presenter:** at DEF CON last year. And there are ways to generate a phishing application, which would

[46:08] **Presenter:** inside of the attacked organization

[46:12] **Presenter:** on a Microsoft domain that is trusted,

[46:14] **Presenter:** that is fully plugged into the organization's SSO.

[46:18] **Presenter:** So there are plenty of things to see here on PowerPoint.

[46:21] **Presenter:** So just check them out.

[46:23] **Presenter:** Check out the GitHub repository.

[46:25] **Presenter:** You'll find all of that.

[46:26] **Presenter:** But let me show you what we can do

[46:28] **Presenter:** with regards to the connections that you saw earlier.

[46:31] **Presenter:** So I'm going to run PowerPoint dump

[46:33] **Presenter:** and provide the tenant ID for the guest tenant,

[46:36] **Presenter:** the one that I'm trying to hack.

[46:39] **Presenter:** and it's going to collect a bunch of information.

[46:42] **Presenter:** The first thing that it will do is acquire a token on behalf of Power Apps.

[46:48] **Presenter:** And I'm going to do that with device login.

[46:51] **Presenter:** But of course, you can do this.

[46:54] **Presenter:** You can use any token that you already have.

[46:56] **Presenter:** So if you have a token from somewhere else,

[46:58] **Presenter:** even a non-prem token, you can exchange it for a better token,

[47:01] **Presenter:** and then you can use the same tool.

[47:03] **Presenter:** I'm going to log in as the hacker.

[47:05] **Presenter:** Of course, you're seeing that I'm using Azure CLI,

[47:08] **Presenter:** mentioned earlier. And once I'm in, it's going to wait for, it's going to think for a while.

[47:13] **Presenter:** And then it's going to, first of all, after it, again, it generated the token for powerups,

[47:19] **Presenter:** it's going to, first of all, enumerate the environment. You can see that I found one

[47:23] **Presenter:** environment with six credentials, sorry, with nine credentials that have been shared with everyone.

[47:30] **Presenter:** These are the credentials we saw earlier. There are also connections, there are also applications

[47:34] **Presenter:** shared with everyone and automations,

[47:35] **Presenter:** which we did not cover,

[47:37] **Presenter:** but there are other resources

[47:39] **Presenter:** that you could use as a hacker

[47:40] **Presenter:** that were shared with everyone,

[47:42] **Presenter:** including yourself as a guest.

[47:44] **Presenter:** The next thing that this is going to do

[47:46] **Presenter:** is create a token for Azure API Hub.

[47:50] **Presenter:** And then you're also seeing

[47:53] **Presenter:** that it's fetching a bunch of open API specs.

[47:55] **Presenter:** So it's dynamically finding

[47:57] **Presenter:** how do you act with Azure API management

[48:02] **Presenter:** with all of those pieces of information

[48:04] **Presenter:** earlier, Azure Blob Storage, Azure File Storage, Azure SQL.

[48:07] **Presenter:** And then at the end of it, it's telling us, hey, you have a dump ready.

[48:12] **Presenter:** Okay, so let's understand what is actually accomplished.

[48:21] **Presenter:** So on your local disk, you'll find that you have a bunch of data and resources.

[48:26] **Presenter:** First of all, we are fetching information about each one of the, these are all of the

[48:30] **Presenter:** types of credentials that we found.

[48:34] **Presenter:** information that allows you to understand what you can actually do with these connections.

[48:37] **Presenter:** But then we go one step farther for each one of the connections.

[48:41] **Presenter:** We're just going to enumerate all of the information in the underlying database,

[48:46] **Presenter:** just dump every table there.

[48:48] **Presenter:** And so you can see that the SQL connection we saw earlier has three different tables.

[48:53] **Presenter:** One of them is the customers table, and we just dumped it to our disk.

[48:58] **Presenter:** And of course, you don't have to just look at it with your bare eyes.

[49:05] **Presenter:** We also have a nice little GUI app for you.

[49:09] **Presenter:** So that app allows you to see the types of things that we were able to find

[49:14] **Presenter:** that you as a guest can actually leverage.

[49:17] **Presenter:** You can see that there are credentials, automations,

[49:20] **Presenter:** and applications that are available for you to use.

[49:22] **Presenter:** Let's drill down on those credentials.

[49:24] **Presenter:** So these are the same credentials that we saw earlier at the beginning of the talk.

[49:29] **Presenter:** But now you understand what's going on.

[49:30] **Presenter:** So we were able to use this, everything that you saw here in the talk up until now,

[49:36] **Presenter:** to find out all of these connections.

[49:39] **Presenter:** But now, and these are the two connections that we actually focused on.

[49:43] **Presenter:** And you can see the dump link there on the right side.

[49:47] **Presenter:** Let's see what this actually does.

[49:50] **Presenter:** So this takes us to a kind of a file storage thing where you can see the same tables for the database that we saw earlier on disk.

[49:57] **Presenter:** And of course, you can click on any one of them and you get a full dump of all of the table, of the entire table that sits behind this.

[50:05] **Presenter:** Of course, this is just like, this is just what we've implemented, a full dump, but you can actually do more.

[50:11] **Presenter:** Let's see what you can actually do.

[50:12] **Presenter:** So there's also the playground module here, which generates a Swagger UI for each one of the connections.

[50:20] **Presenter:** where you can see that there are a bunch of operations

[50:22] **Presenter:** you can run on behalf of this connection.

[50:25] **Presenter:** So for example, a SQL connection allows you to actually run,

[50:29] **Presenter:** you can see a SQL procedure or, thankfully,

[50:35] **Presenter:** a SQL pass-through native query,

[50:37] **Presenter:** which actually means you can just pass on

[50:39] **Presenter:** whatever SQL query you'd like and get the response.

[50:42] **Presenter:** All right, so this is far more than just dumping data.

[50:45] **Presenter:** You can actually do destructive operations here.

[50:50] **Presenter:** the underlying storage behind those connections.

[50:53] **Presenter:** Again, we are logged in as a guest here.

[50:56] **Presenter:** So please check out PowerPoint.

[50:59] **Presenter:** There's already kind of a community around

[51:01] **Presenter:** that people are doing really cool things.

[51:03] **Presenter:** And if you are interested or have questions

[51:06] **Presenter:** or would like to contribute,

[51:08] **Presenter:** reach out to me afterwards.

[51:09] **Presenter:** We'd love to chat.

[51:13] **Presenter:** All right.

### Mitigations & Recommendations — Part 7

[51:13] **Presenter:** So the last thing I want to do

[51:16] **Presenter:** is to give you some ways

[51:20] **Presenter:** and to figure out what's the next thing that you can do as an organization.

[51:24] **Presenter:** So let me start off by saying that we've been in strong collaboration with Microsoft throughout this research,

[51:30] **Presenter:** and they've been great at working together to try and find mitigations.

[51:36] **Presenter:** They are working on making better defaults and better security controls.

[51:40] **Presenter:** So what you saw here in this talk, there are no kind of vulnerabilities there other than the one that I told you we're going to wait before we reveal.

[51:50] **Presenter:** creative reading of the docs,

[51:53] **Presenter:** of proper features.

[51:56] **Presenter:** And I think it's important for us to figure out

[51:59] **Presenter:** why this is happening.

[52:01] **Presenter:** So I think at the end of the day,

[52:04] **Presenter:** when you think about the shared responsibility model,

[52:06] **Presenter:** this is a slide that you probably saw something similar.

[52:12] **Presenter:** And for serverless applications, right?

[52:14] **Presenter:** So serverless applications within cloud

[52:16] **Presenter:** have a clear shared responsibility model

[52:18] **Presenter:** where the service provider,

[52:20] **Presenter:** the cloud provider, is in charge of some parts of the identity,

[52:27] **Presenter:** the runtime, the machines themselves.

[52:29] **Presenter:** But you as the customer, you're in charge of what you actually built.

[52:32] **Presenter:** You're in charge of the code.

[52:33] **Presenter:** You're in charge of access to that application,

[52:36] **Presenter:** of the business logic that actually runs in that serverless application

[52:40] **Presenter:** and the data that goes through it.

[52:42] **Presenter:** This is the exact same thing for a low-code, no-code app

[52:46] **Presenter:** built by a citizen developer.

[52:47] **Presenter:** We're just not owning our part.

[52:50] **Presenter:** A low-code, no-code app would not have code because you are dragging and dropping things.

[52:54] **Presenter:** You're making choices as business users, for example, to share with everyone.

[52:58] **Presenter:** But you still own the business logic.

[53:00] **Presenter:** You have to own what you built.

[53:02] **Presenter:** Nobody else can do it for you.

[53:05] **Presenter:** So the share responsibility model applies for low-code, no-code as well.

[53:09] **Presenter:** Of course, platforms have to hold their part.

[53:13] **Presenter:** Every major SaaS vendor today has become a low-code, no-code platform.

[53:17] **Presenter:** So we have Microsoft and Salesforce and ServiceNow and others as well.

[53:23] **Presenter:** Everybody is building a way for citizen developers, business users to actually build things on top of those platforms.

[53:30] **Presenter:** And when you think about an office or a Salesforce, this is no longer a specific app.

[53:35] **Presenter:** This is actually an entire cloud meant to build applications.

[53:39] **Presenter:** Of course, platforms have to hold their part.

[53:42] **Presenter:** And one example we saw specifically with Microsoft is a research by Tenable that they shared a few months ago when they were able to exploit a vulnerability in Power Platform to get multi-tenant access, so move between tenants within Power Platform.

[54:01] **Presenter:** Of course, this is something that platforms need to fix and they need to be better and making sure that these things cannot occur.

[54:08] **Presenter:** but we also have to own our part as a customer.

[54:12] **Presenter:** So one thing that I would ask you is,

[54:15] **Presenter:** can you answer all of those questions,

[54:17] **Presenter:** the questions that you see here?

[54:18] **Presenter:** So if you have Microsoft in your organization

[54:22] **Presenter:** and most enterprises do,

[54:25] **Presenter:** then, well, do you have applications

[54:27] **Presenter:** within your organization that are built by business users?

[54:30] **Presenter:** How many of them are sharing data with external parties?

[54:34] **Presenter:** Are you allowing guest access to your organization?

[54:38] **Presenter:** These are all things that we are leaving business users to decide on their own.

[54:42] **Presenter:** So guess what?

[54:43] **Presenter:** They will make the wrong choice.

[54:45] **Presenter:** We really need to own application security for those organizations, for those applications.

[54:51] **Presenter:** We need to bring them under the security umbrella.

[54:54] **Presenter:** And so, and I think this is really at the crux of it.

[54:58] **Presenter:** So let me finish off with some clear things that you can do when you get back to your job after you're done enjoying Toronto.

[55:10] **Presenter:** Let me give you a clear advice.

[55:15] **Presenter:** The first thing is that we need to make sure that we build secure applications.

[55:22] **Presenter:** And so one clear takeaway here is just don't overshare, right?

[55:28] **Presenter:** Don't overshare with, don't share with everyone.

[55:31] **Presenter:** Like this, this for sure is, everyone is for sure too much, which of course, and even more

[55:37] **Presenter:** so when everyone means guests as well.

[55:40] **Presenter:** And there are clear ways in which you can help citizen developers avoid those wrong

[55:45] **Presenter:** choices.

[55:46] **Presenter:** Check on that.

[55:47] **Presenter:** Each one of those points would have like more information in the link that you see here.

[55:52] **Presenter:** So please do check that out.

[55:55] **Presenter:** but this is just one mistake that business users can do when they build those applications

[55:59] **Presenter:** there's actually an entire OWASP top 10 project dedicated to low-code non-code applications

[56:04] **Presenter:** and the types of problems that can occur when you use low-code non-code platforms

[56:09] **Presenter:** to build those applications I'm one of the leaders of that project

[56:13] **Presenter:** please do check that project out it's a some of it is written in a language

[56:18] **Presenter:** where business users should be able to understand so it's there are sections that are meant for

[56:23] **Presenter:** the security risk, you can use this as a free resource to educate your users. And you can also

[56:29] **Presenter:** use this as a framework to build your security program on. The second thing I would recommend

[56:35] **Presenter:** is harden your environment. There are configurations that you can put in place to limit who can be a

[56:43] **Presenter:** guest in your tenant and what those guests would actually be able to do. And again, plenty of more

[56:49] **Presenter:** information in the link that you see here. There's also an opportunity to create an application

[56:55] **Presenter:** security program. This is an application security problem, but we're just not, we're just leaving

[57:00] **Presenter:** those citizen developers alone and focusing on the professional developers, those that are building

[57:05] **Presenter:** applications with code. But of course, as we know now, we have many more citizen developers because

[57:12] **Presenter:** we have many more business users than developers in our organization. So there's a huge opportunity

[57:19] **Presenter:** for AppSec to bring those business users,

[57:21] **Presenter:** bring those citizen developers under the security umbrella.

[57:24] **Presenter:** And the last recommendation I'll give you

[57:26] **Presenter:** is just hack your own environment

[57:28] **Presenter:** because hackers, of course, are already trying.

[57:32] **Presenter:** And so thank you very much.

[57:34] **Presenter:** This has been a great experience.

[57:36] **Presenter:** I'm going to leave you off with a few sound bites.

[57:40] **Presenter:** And thanks again.

[57:42] **Presenter:** Reach out if you'd like to learn more or to work together.

[57:49] **Presenter:** Thank you.
<!-- talk-enrichment:end -->
