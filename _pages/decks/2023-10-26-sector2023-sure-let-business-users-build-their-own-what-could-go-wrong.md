---
title: "Sure, Let Business Users Build Their Own. What Could Go Wrong?"
talk_date: 2023-10-26
conference: "SecTor 2023"
permalink: /talks/2023-10-26-sector2023-sure-let-business-users-build-their-own-what-could-go-wrong/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-10-25_Sector-23_SureLetBusinessUsersBuildTheirOwnWhatCouldGoWrong/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-10-25_Sector-23_SureLetBusinessUsersBuildTheirOwnWhatCouldGoWrong/slides.pdf
schedule_url: https://www.blackhat.com/sector/2023/briefings/schedule/#sure-let-business-users-build-their-own-what-could-go-wrong-36063
recording_url: https://player.vimeo.com/video/883408879?h=e4adbb5d0d
recording_acquisition_url: http://2023.video.sector.ca/video/883408879
github_url: https://github.com/mbrg/power-pwn
description: "Business professionals are tired of waiting for IT to address their needs. Instead, they are increasingly building their own applications with low-code / no-code platforms. Recent surveys show that most enterprise apps are now built outside of IT by…"
abstract_source_url: "https://www.blackhat.com/sector/2023/briefings/schedule/#sure-let-business-users-build-their-own-what-could-go-wrong-36063"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://player.vimeo.com/video/883408879?h=e4adbb5d0d"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "851d15c3ce88268f706f371f34b426e90203698881fdb79bf74270b083feeec3"
---


<!-- talk-enrichment:start -->
## Abstract

Business professionals are tired of waiting for IT to address their needs. Instead, they are increasingly building their own applications with low-code / no-code platforms. Recent surveys show that most enterprise apps are now built outside of IT by business professionals who hold no previous experience in building software. And so, enterprises are placing *developer-level power* in the hands of 100x *new* business developers. What could go wrong? In short, everything. In this presentation, we will share extensive research on the security of low-code / no-code applications based on scanning >100K applications across hundreds of enterprise environments. We will demonstrate how most applications get identity, access and data flow wrong, cover a wide range of security issues found in real environments, and share their backstories and implications. We will share the OWASP Low-Code / No-Code Top 10, the first-ever security framework for the categorization and mitigation of common security issues with business-led development. We will illustrate why the involvement of AppSec teams is desperately missing from business-led development, and share stories about organizations that got it right. Finally, we will share resources to help educate others and become a low-code security champion in your organization.

_[Official conference abstract](https://www.blackhat.com/sector/2023/briefings/schedule/#sure-let-business-users-build-their-own-what-could-go-wrong-36063)_

## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Introduction & Speaker Background

[00:04] **Presenter:** Hi, everyone. Welcome to Sure, Let Business Users Build Their Own. What Could Go Wrong?

[00:10] **Presenter:** This is going to be a bit of a different one that I'm sure you've seen up until now.

[00:16] **Presenter:** So I think at the end of it, you'll decide whether different means good or bad, but this is going to be quite a different story and a different focus than what we're used to seeing in security, and hopefully you'll find it interesting.

[00:30] **Presenter:** So a bit of background about myself.

[00:33] **Presenter:** I've been dealing with security implications of what business users are building for the last several years.

[00:40] **Presenter:** Co-founded Zenity, which is a company that's focused on helping organizations secure their low-code, no-code applications and what their citizen developers are building.

[00:48] **Presenter:** I also lead an OWASP project that's dedicated to this world

[00:54] **Presenter:** and to try and get more information about the kind of problems that happen there.

[01:00] **Presenter:** And we are sharing a whole bunch of research out there, and we are hiring.

[01:06] **Presenter:** So if you're looking for an opportunity to join something that's fresh

[01:11] **Presenter:** and to try and kind of help business users actually be empowered

[01:18] **Presenter:** please reach out.

[01:20] **Presenter:** So here's what we're going to do today.

[01:24] **Presenter:** We're going to start off by figuring out

[01:26] **Presenter:** what business users are building.

[01:28] **Presenter:** So I'm going to convince you

[01:31] **Presenter:** that business users are already building their own applications

[01:34] **Presenter:** and they're not waiting around for anyone else.

[01:38] **Presenter:** We're going to continue on to understand

[01:40] **Presenter:** what could go wrong with these kind of applications

[01:42] **Presenter:** and why exactly does it go wrong?

[01:45] **Presenter:** Like taking a step back and understanding fundamentally

[01:49] **Presenter:** And then we'll end up with the reason behind this talk,

[01:52] **Presenter:** which is how can we fix it?

[01:53] **Presenter:** So what can we do to get to a better state?

[01:59] **Presenter:** The state of the art with business development

[02:01] **Presenter:** is that people have started building

[02:04] **Presenter:** and they are no longer waiting for us.

[02:08] **Presenter:** This is kind of a joke, but it's true.

[02:12] **Presenter:** Like business users, they have so many things that they need

[02:16] **Presenter:** in order to get the business up and running,

[02:18] **Presenter:** to be better at what they're doing.

[02:20] **Presenter:** And who knows better how to drive the business forward

[02:23] **Presenter:** and how to do digital transformation

[02:26] **Presenter:** than the business users who are the experts at what they do.

[02:29] **Presenter:** But of course, IT has limited capacity

[02:32] **Presenter:** and we are not really able to get everything that they need

[02:36] **Presenter:** for them as quick as possible.

[02:38] **Presenter:** And if this idea of business users

[02:42] **Presenter:** having to solve their own issues instead of waiting for us,

[02:46] **Presenter:** if this sounds familiar,

[02:48] **Presenter:** It's because, well, it's like it's the latest evolution in a long trend of citizen development and decentralization of IT.

[02:59] **Presenter:** And so since people started working with computers, there has been ways to empower people that are not developers,

[03:07] **Presenter:** less technical savvy, to actually be able to be digitally native, to move around in their environments,

[03:15] **Presenter:** to be able to create in the digital environment.

[03:20] **Presenter:** And I mean, Microsoft Office is one example

[03:23] **Presenter:** where like this one thing,

[03:26] **Presenter:** there are entire careers built around Microsoft Office,

[03:30] **Presenter:** entire professions that have been created

[03:31] **Presenter:** because there's a tool that empower businesses

[03:33] **Presenter:** to do something they were not able to do before

### Citizen Development Landscape

[03:35] **Presenter:** in that specific case analysis.

[03:37] **Presenter:** And now we have low-code, low-code applications.

[03:39] **Presenter:** We have Gen.AI, which is another entire wave

[03:42] **Presenter:** of putting more powerful tools

[03:45] **Presenter:** in the hands of business users.

[03:47] **Presenter:** And so this is how it looks like,

[03:49] **Presenter:** which is actually pretty amazing.

[03:51] **Presenter:** So right now within many local local platforms,

[03:55] **Presenter:** including you're seeing here,

[03:56] **Presenter:** the one by Microsoft that's built into Office,

[03:59] **Presenter:** you can chat with a ChatGPT-like interface

[04:02] **Presenter:** and it would generate an application for you on the fly.

[04:06] **Presenter:** This is amazing.

[04:07] **Presenter:** This is creating a database,

[04:10] **Presenter:** like a table in a database behind the scenes.

[04:13] **Presenter:** designing this entire application for you.

[04:15] **Presenter:** It's also deploying it to production

[04:17] **Presenter:** and allowing you to share that application

[04:19] **Presenter:** with other users.

[04:20] **Presenter:** That application has identity.

[04:22] **Presenter:** It has a lifecycle.

[04:23] **Presenter:** Somebody needs to own it.

[04:24] **Presenter:** You can understand that this means

[04:27] **Presenter:** that every time a user would have a chat

[04:31] **Presenter:** with a chatbot,

[04:33] **Presenter:** it could create an application behind it

[04:35] **Presenter:** and you end up creating this trail

[04:37] **Presenter:** of application behind you.

[04:39] **Presenter:** This very easily means

[04:42] **Presenter:** pretty soon we end up in a place where most applications in the enterprise

[04:45] **Presenter:** are built by those business users.

[04:47] **Presenter:** And now let me give you a couple of examples of concrete applications

[04:51] **Presenter:** that were built by business users or were built with low-code, no-code.

[04:55] **Presenter:** Because I think it's important for us to have examples in mind

[04:59] **Presenter:** when we're thinking about the security problems here

[05:01] **Presenter:** to understand how important this topic actually is.

[05:05] **Presenter:** So here's one.

[05:07] **Presenter:** Back at COVID days, like the worst COVID days,

[05:13] **Presenter:** we had to collect proofs of vaccination everywhere.

[05:17] **Presenter:** When you went and visited Microsoft offices physically,

[05:20] **Presenter:** you had to provide your proof of vaccination through this little application.

[05:25] **Presenter:** And this application was actually built with a low-code, no-code platform.

[05:29] **Presenter:** Now, of course, this has a physical location of people.

[05:32] **Presenter:** This has confidential healthcare information about visitors to the organization.

[05:37] **Presenter:** So this is a pretty sensitive application.

[05:41] **Presenter:** Let me show you another.

[05:43] **Presenter:** So this application is about product launch management.

[05:49] **Presenter:** So the product launch team within the marketing team at Microsoft figured out that they have different processes that people were using before they were launching a product.

[06:00] **Presenter:** And they wanted to find a way to streamline all of that and to make sure that they have one process that is easy to follow with a quick application.

[06:09] **Presenter:** So they build an application with this low-code, low-code platform.

[06:12] **Presenter:** People from the marketing team has done this.

[06:15] **Presenter:** And this application became the go-to standard

[06:17] **Presenter:** where over 150 people in that organization

[06:24] **Presenter:** were using it to streamline product launches.

[06:28] **Presenter:** Now, this is amazing, right,

[06:29] **Presenter:** the fact that the marketing team was able to create this.

[06:33] **Presenter:** But, of course, the marketing team are not security experts,

[06:36] **Presenter:** so we can understand why there's potential risk here.

[06:39] **Presenter:** Here's another example.

[06:43] **Presenter:** institution, this is an application that's facilitating the process of making sure that

[06:49] **Presenter:** businesses could get the right credit or businesses or persons can get the right credit.

[06:55] **Presenter:** And this is basically an approval process.

[06:57] **Presenter:** So there is a risk assessment.

[06:59] **Presenter:** They pull in information from a bunch of risk applications or risk platforms.

[07:07] **Presenter:** And then they bring all of that information to a decision maker, which assigns whether

[07:12] **Presenter:** credit. This is a crucial piece of software, but it was built not by developers, but by business

[07:21] **Presenter:** developers. And one thing you could be thinking about right now to try and get yourself off the

[07:26] **Presenter:** hook, to try and think that this is not your problem to solve, is that this doesn't belong

[07:32] **Presenter:** to your organization. Your organization is, I don't know, you could think that you are highly

[07:37] **Presenter:** regulated or maybe you're a large enterprise and you're thinking, well, in my organization,

### OWASP Low‑Code/No‑Code Top 10 Overview

[07:43] **Presenter:** give business users the ability to build their own things.

[07:45] **Presenter:** So I'm sorry to be the one to tell you this,

[07:50] **Presenter:** but this is not really an option.

[07:52] **Presenter:** Show me an enterprise that doesn't have at least

[07:56] **Presenter:** one of the vendors that are up here on screen right now,

[08:01] **Presenter:** doesn't have software from one of these vendors.

[08:04] **Presenter:** If you're using Microsoft, Office 365,

[08:07] **Presenter:** if you're using Salesforce, if you're using ServiceNow,

[08:10] **Presenter:** These are no longer specific applications like a CRM.

[08:15] **Presenter:** These are not point solutions.

[08:17] **Presenter:** These are entire platforms, and these are now platforms that allow business users to solve general-purpose business problems.

[08:24] **Presenter:** You can build an application on top of Microsoft Office or on top of Salesforce in the same way that you build an application on top of Azure, AWS, or Google Cloud.

[08:35] **Presenter:** These are just different kinds of cloud that are targeting different kinds of developers for different kind of use cases.

[08:43] **Presenter:** And more importantly, this is already widely used.

[08:47] **Presenter:** This is already inside of your organization.

[08:49] **Presenter:** Nobody's asking you before this gets introduced into your org where data already, where your business data already is.

[08:58] **Presenter:** And so here's a number by Microsoft.

[09:02] **Presenter:** Microsoft is claiming,

[09:04] **Presenter:** Microsoft is publishing that today

[09:06] **Presenter:** there are over 5 million .NET developers,

[09:09] **Presenter:** 5 million professional developers using .NET

[09:11] **Presenter:** to write their applications.

[09:13] **Presenter:** How many citizen developers, business users,

[09:17] **Presenter:** do you think there are

[09:17] **Presenter:** using Microsoft low-code, no-code platforms

[09:20] **Presenter:** in order to build no-code, no-code platform,

[09:22] **Presenter:** which is called Power Platform,

[09:23] **Presenter:** to build applications?

[09:25] **Presenter:** How many of them do you think there are?

[09:27] **Presenter:** So I actually went through Microsoft's earning reports,

[09:32] **Presenter:** Today, something like 8 million of these developers.

[09:35] **Presenter:** So far more citizen developers,

[09:38] **Presenter:** people building applications with low-code, no-code,

[09:41] **Presenter:** than people that are building applications with .NET.

[09:45] **Presenter:** I mean, just think about all of the security effort we put in

[09:49] **Presenter:** to protect the things that our professional developers are building.

[09:53] **Presenter:** CICD pipelines, their secure development lifecycle,

[09:57] **Presenter:** and then compare it with how much are we helping

[10:02] **Presenter:** build their applications correctly.

[10:05] **Presenter:** So a quick recap.

[10:08] **Presenter:** Citizen development is like the next big thing

[10:11] **Presenter:** and the next big productivity boost.

[10:14] **Presenter:** This is something that even if you ask Microsoft

[10:22] **Presenter:** or if you ask analysts,

[10:24] **Presenter:** you'll find statistics like it's predicted to power

[10:27] **Presenter:** 70% of enterprise apps by 2025.

[10:32] **Presenter:** Even if you don't believe those statistics, you can already see the numbers today.

[10:37] **Presenter:** Like this is far bigger than most people understand.

[10:45] **Presenter:** And it's important to note that this is already available in every major organization.

[10:50] **Presenter:** So in your organization, probably as well.

[10:53] **Presenter:** These are millions of business users that have been introduced for the first time.

[11:00] **Presenter:** They are building new applications.

[11:02] **Presenter:** And of course, this is growing fast because there are more business users, far more business users than they are professional developers.

[11:09] **Presenter:** And so we really need to get on top of this quickly.

[11:14] **Presenter:** And so we understand now, like, what is business development and what are people building with this?

[11:21] **Presenter:** So the next section would be to understand what could actually go wrong here.

[11:25] **Presenter:** What could happen when we leave business users to build their own applications without giving them proper guardrails?

[11:32] **Presenter:** And the way that we are thinking about this and the framework that I'm going to use is actually an OWASP project that's dedicated to the kinds of applications that these business users are building and what could happen when we leave them to it.

[11:48] **Presenter:** This is the OWASP Low-Code, No-Code Top 10.

[11:51] **Presenter:** It's a top 10 project dedicated to those kinds of applications.

[11:54] **Presenter:** And this is actually a community of over 200 members right now with people that have contributed from across the industry.

[12:02] **Presenter:** I'm one of the project leaders and there are many others that have contributed so far.

[12:06] **Presenter:** And you can see the top 10 here on the list, but I really on the screen, but I really recommend you kind of you go there.

[12:14] **Presenter:** You just Google it. You'll find you'll find it quickly.

[12:17] **Presenter:** The cool thing about the OWASP blog code non-code app done

[12:20] **Presenter:** is that aside from the technical details

[12:25] **Presenter:** that you can find about the kind of problems that we're seeing,

[12:28] **Presenter:** you'll also find plain text language

[12:32] **Presenter:** that would allow you to explain those things to a business user.

[12:36] **Presenter:** So you can actually use this as a resource

[12:38] **Presenter:** to build your application security framework on.

[12:40] **Presenter:** Of course, this is an OWASP project,

[12:42] **Presenter:** so the entire methodology here is public.

[12:47] **Presenter:** We are right now in a process of creating the 2024 version of the top 10.

[12:52] **Presenter:** But as a project, we have seen now more than a million different applications,

[12:58] **Presenter:** applications and automations that were built with low-code and low-code.

[13:01] **Presenter:** So we have pretty wide visibility into what's happening in organizations.

[13:05] **Presenter:** So in this section, we're going to switch gears and focus and go deep to focus on specific stories.

[13:11] **Presenter:** I'm going to share with you concrete things that business users have built.

[13:17] **Presenter:** I share kind of what they try to do and how they build it, I would strongly urge you to

### Real‑World Application Case Studies — Part 1

[13:23] **Presenter:** pause the video and think for yourself, what is the problem here?

[13:27] **Presenter:** What, like, try to think of the threat model, try to think of the vulnerabilities that could

[13:31] **Presenter:** occur in this application.

[13:33] **Presenter:** The, well, we are going to focus on the actual business logic of the application because

[13:38] **Presenter:** that's where most of the problems are.

[13:40] **Presenter:** So, and one last point here, this entire section is going to be focused on Microsoft's Power Platform because Microsoft is so prolific within the enterprise.

[13:53] **Presenter:** And so we're seeing so many applications that have been developed with that platform.

[13:56] **Presenter:** So let's start.

[13:58] **Presenter:** The first story is employee onboarding.

[14:01] **Presenter:** So just think of somebody from HR.

[14:04] **Presenter:** they need to collect a bunch of information from users, from employees,

[14:08] **Presenter:** once they onboard the company.

[14:10] **Presenter:** And, of course, there are many scenarios like that, right?

[14:13] **Presenter:** You need just like a sophisticated form that would collect information somewhere.

[14:17] **Presenter:** So here's what the developer has actually built.

[14:21] **Presenter:** And you can see that I'm logged into Power Apps, which is part of Power Platform.

[14:25] **Presenter:** You can also see on the right bottom side an icon,

[14:28] **Presenter:** which is the icon of the legitimate user.

[14:30] **Presenter:** I'm going to switch off between a legitimate user and an attacker here

[14:34] **Presenter:** for different perspectives and different users.

[14:36] **Presenter:** So when you see this icon,

[14:37] **Presenter:** you always know that I'm taking the builder's perspective,

[14:42] **Presenter:** the legitimate user's perspective,

[14:43] **Presenter:** and we'll see in a moment the attacker's icon.

[14:46] **Presenter:** All right.

[14:47] **Presenter:** So I'm logged into Power Apps.

[14:49] **Presenter:** You can see that I'm logged into something

[14:51] **Presenter:** called the default environment,

[14:52] **Presenter:** which is actually something

[14:53] **Presenter:** that every user would have access to.

[14:56] **Presenter:** I'm going to create an application,

[14:58] **Presenter:** and that application is just a form,

[15:01] **Presenter:** and it's asking for all of the information

[15:02] **Presenter:** that I need from the user.

[15:04] **Presenter:** legal name, the address, date of birth, personal email, phone number, and the social security

[15:09] **Presenter:** number.

[15:10] **Presenter:** And you can see in terms of the data source here that I'm using something called Microsoft

[15:15] **Presenter:** Dataverse.

[15:16] **Presenter:** So let's try to figure out what that is.

[15:20] **Presenter:** So Microsoft Dataverse is actually just a wrapped up SQL query.

[15:24] **Presenter:** This SQL query is managed by Microsoft on behalf of the user, and it allows business

[15:30] **Presenter:** users to talk in the language that they understand.

[15:34] **Presenter:** the information that we'd like to store,

[15:36] **Presenter:** like you saw earlier.

[15:37] **Presenter:** And underlying, Microsoft would create a table

[15:41] **Presenter:** on that managed SQL server.

[15:43] **Presenter:** So it's pretty cool.

[15:44] **Presenter:** So business users are able to create those tables

[15:46] **Presenter:** and to use them and store information

[15:48] **Presenter:** without worrying about the underlying infrastructure.

[15:51] **Presenter:** One other thing that we're going to do here

[15:53] **Presenter:** in this application is to make sure that we get notified.

[15:56] **Presenter:** So you can see that every time a new entry

[15:59] **Presenter:** gets written into this SQL server,

[16:04] **Presenter:** to the entire HR team to let them know

[16:06] **Presenter:** that somebody has gotten through onboarding.

[16:08] **Presenter:** All right, now is the time to pause.

[16:10] **Presenter:** Like, think about the problems

[16:12] **Presenter:** that could occur with this application.

[16:15] **Presenter:** Okay.

[16:18] **Presenter:** So I'm moving forward.

[16:21] **Presenter:** Putting on the hacker's perspective,

[16:23] **Presenter:** and you can see the hacker icon on the right bottom side.

[16:26] **Presenter:** The first thing that you notice

[16:28] **Presenter:** is that we were working in the default environment.

[16:32] **Presenter:** And I mentioned that the default environment is accessible to everyone.

[16:35] **Presenter:** Well, it's accessible to everyone, including the hacker.

[16:39] **Presenter:** If the hacker has a user within the organization, it could be a guest as well.

[16:43] **Presenter:** And so you can see that there's a bunch of tables inside of this default environment.

[16:50] **Presenter:** These tables are the actual tables on the Man and SQL server.

[16:55] **Presenter:** And we can find the specific table that was created for that application called sensitive data.

[17:02] **Presenter:** and just look at it, right?

[17:03] **Presenter:** And so every user in the organization

[17:05] **Presenter:** has access to all of the data

[17:07] **Presenter:** that has been collected through this application.

[17:09] **Presenter:** So one clear risk that we find here

[17:12] **Presenter:** is that this is data that's accessible to everyone, right?

[17:16] **Presenter:** So there's an authorization problem here.

[17:20] **Presenter:** But kind of thinking back about what we just saw,

[17:23] **Presenter:** you can see the type of information that we have here.

[17:25] **Presenter:** And this includes personal information,

[17:28] **Presenter:** social security numbers.

[17:29] **Presenter:** Of course, don't worry,

[17:32] **Presenter:** HHGPT, they're not real, but there's another issue here, right? You shouldn't be storing

[17:38] **Presenter:** sensitive data like social security numbers in plain text. And so there's a security issue here,

[17:45] **Presenter:** and there's also a very strong compliance problem here, right? So just two things off the bat. And

[17:51] **Presenter:** of course, I mean, you wouldn't think that somebody from HR would know how to store

[17:55] **Presenter:** social security numbers, right? It doesn't really make sense to ask them to do that.

[18:00] **Presenter:** And so one other thing about this application is when you think about it, again, from the legitimate user's perspective,

[18:08] **Presenter:** let's just use this application to fill in information about a specific user.

[18:13] **Presenter:** So here's my information as a user submitted to the application.

[18:17] **Presenter:** Recall this automation, the automation that we have that would send the email every time a record gets updated.

[18:24] **Presenter:** Actually, this automation by default records all of the information that goes through it.

[18:31] **Presenter:** The actual data that goes through the automation is recorded in the automation's logs.

[18:36] **Presenter:** In this case, everything that was written to the database table is showing up here in logs, including the social security number.

[18:46] **Presenter:** and remember that everybody that has access,

[18:50] **Presenter:** like this automation is used by the HR team

[18:53] **Presenter:** and specifically this automation was shared

[18:55] **Presenter:** with the entire HR team.

[18:57] **Presenter:** So the entire HR team now has access

[18:59] **Presenter:** to the sensitive data

[19:02] **Presenter:** through the logs of this automation as well.

[19:05] **Presenter:** So even if they clean up the public database

[19:08] **Presenter:** that is using these applications,

[19:09] **Presenter:** that is used by this application,

[19:13] **Presenter:** this still leaks sensitive data to logs.

[19:17] **Presenter:** And so there's another problem here

[19:19] **Presenter:** where, of course, we have sensitive data

[19:20] **Presenter:** that is leaking into those logs.

[19:22] **Presenter:** So here are three findings

[19:24] **Presenter:** that we saw in this specific application.

[19:25] **Presenter:** It had data accessible to everyone.

[19:28] **Presenter:** It has sensitive data that was just mishandled.

[19:33] **Presenter:** And it has sensitive data that was written to logs

[19:36] **Presenter:** and then overshot.

[19:38] **Presenter:** All right, let's see another one.

[19:41] **Presenter:** productivity sync

[19:42] **Presenter:** so one feature of working

[19:45] **Presenter:** in an enterprise is that you get

[19:47] **Presenter:** a whole bunch of security controls

[19:48] **Presenter:** that as a user are let's admit

[19:51] **Presenter:** pretty annoying right

[19:52] **Presenter:** one common thing that's

[19:55] **Presenter:** getting people frustrated

[19:56] **Presenter:** is that they have

[19:58] **Presenter:** to use the approved email

[20:01] **Presenter:** client because many people

[20:03] **Presenter:** like to use something like their personal

[20:05] **Presenter:** email so let's say their Gmail

[20:06] **Presenter:** or maybe they'd like to sync their

[20:10] **Presenter:** calendar and their personal calendar.

[20:12] **Presenter:** And so we do have a bunch of mechanisms as security professionals that allow us to catch

[20:18] **Presenter:** and prevent those instances, right?

[20:21] **Presenter:** We have DLP.

### Real‑World Application Case Studies — Part 2

[20:22] **Presenter:** We have email servers that we can put something on the email server to make sure that these

[20:27] **Presenter:** things that happen.

[20:28] **Presenter:** So here's the latest innovation in email exfiltration.

[20:32] **Presenter:** You can use a low-code, no-code app.

[20:35] **Presenter:** instead of forwarding the email, you have one app.

[20:39] **Presenter:** And with the one hand, that application would use your corporate identity

[20:45] **Presenter:** to subscribe to new emails or new calendar events on your professional identity.

[20:51] **Presenter:** And with the other hand, with another identity that's completely unrelated,

[20:54] **Presenter:** your own personal identity, it would just copy the content of that email

[20:58] **Presenter:** or that calendar event and would save it in your personal account.

[21:05] **Presenter:** right now. So every time a professional email arrives to my box, I would just send it to myself

[21:13] **Presenter:** from my Gmail account. Because data is being copied here on servers that belong to Microsoft

[21:20] **Presenter:** in some SaaS service that you don't have access to, there's no way for you to actually understand

[21:25] **Presenter:** that this is happening. So, well, what are the issues here? This one is a bit more obvious,

[21:35] **Presenter:** This is data leakage.

[21:35] **Presenter:** This is clear data leakage.

[21:37] **Presenter:** Business data that's moving to a personal account here.

[21:40] **Presenter:** We actually see this, like this is a very common finding,

[21:45] **Presenter:** this kind of thing.

[21:46] **Presenter:** But it goes farther because, well, what you just saw

[21:50] **Presenter:** just moves new emails to the personal account.

[21:53] **Presenter:** What about my existing emails?

[21:55] **Presenter:** So here's a nice little application.

[21:58] **Presenter:** You give it, it's a nice little application

[22:02] **Presenter:** that syncs the history from Outlook to your Gmail account.

[22:07] **Presenter:** You give it an email address

[22:09] **Presenter:** and you tell it how many emails you'd like to sync.

[22:13] **Presenter:** And that email address would be used to send,

[22:15] **Presenter:** you will be sending those emails

[22:18] **Presenter:** from your Gmail account to that email address.

[22:21] **Presenter:** And so here's the automation behind it.

[22:25] **Presenter:** We're going to just query X number of emails

[22:29] **Presenter:** that you've mentioned

[22:29] **Presenter:** and then iterate through those emails

[22:32] **Presenter:** and just send them to the email that you chose

[22:38] **Presenter:** through your personal email.

[22:40] **Presenter:** So again, this is just data being copied.

[22:41] **Presenter:** You won't find it on the network.

[22:43] **Presenter:** You won't find it on the email server.

[22:45] **Presenter:** Now, the next thing that I can do

[22:46] **Presenter:** is share this application with the entire organization.

[22:49] **Presenter:** And when I say the entire organization,

[22:52] **Presenter:** I mean everyone.

[22:53] **Presenter:** That includes everyone in your Azure Active Directory tenant,

[22:56] **Presenter:** including guests, including vendors,

[22:58] **Presenter:** including everyone that's there.

[23:00] **Presenter:** And you can see that once I do that, by the way, if you're interested in that, there's a separate talk that I'm giving in Sector.

[23:08] **Presenter:** It's called All You Need Is Guest.

[23:09] **Presenter:** Check it out.

[23:10] **Presenter:** You'll find a whole bunch of other information about that.

[23:12] **Presenter:** You can see that once you share this application, it tells you that a few other things are going to be shared, like the Outlook.

[23:20] **Presenter:** So it tells you that the application requires a bunch of permissions in order to run.

[23:25] **Presenter:** It requires an Outlook account.

[23:27] **Presenter:** It requires a Gmail account.

[23:29] **Presenter:** the automation behind the scenes.

[23:31] **Presenter:** And so one other finding that we have here

[23:35] **Presenter:** is, of course, sharing something with everyone.

[23:38] **Presenter:** It's like it's a really bad choice.

[23:42] **Presenter:** And to my point earlier,

[23:46] **Presenter:** there's a whole bunch of things

[23:47] **Presenter:** that we can do with it as an attacker.

[23:48] **Presenter:** So check out that talk.

[23:51] **Presenter:** But now let's...

[23:53] **Presenter:** So let's say that somebody has created this application

[23:55] **Presenter:** within my organization.

[23:57] **Presenter:** And I want to use it as a legit...

### Security Challenges & Threat Modeling

[23:59] **Presenter:** I'm like a legitimate user.

[24:02] **Presenter:** I log into the application,

[24:03] **Presenter:** and I'm going to use it to sync my own emails

[24:06] **Presenter:** because I want them to be in my Gmail account.

[24:08] **Presenter:** So you can see that I'm logging in.

[24:11] **Presenter:** It is asking me for my Outlook account,

[24:14] **Presenter:** for my Gmail account.

[24:15] **Presenter:** I'm just going to use my own account

[24:17] **Presenter:** and note that I am an admin at zanadestage.com.

[24:21] **Presenter:** All right.

[24:22] **Presenter:** I'm going to send 20 emails to my own Gmail account.

[24:27] **Presenter:** Now think again on the attacker's perspective

[24:30] **Presenter:** And recall that these automations

[24:31] **Presenter:** Are recording all of the information

[24:34] **Presenter:** That goes through them

[24:35] **Presenter:** So now as the attacker that has created this application

[24:40] **Presenter:** I can actually view all of the information

[24:42] **Presenter:** For every user that uses my application

[24:45] **Presenter:** So I created an app

[24:47] **Presenter:** I'm sharing it with the entire org

[24:49] **Presenter:** That app is actually useful

[24:50] **Presenter:** And people find it useful

[24:52] **Presenter:** And they use it for their day-to-day work

[24:53] **Presenter:** Guess what?

[24:56] **Presenter:** maker of that application, the developer of the application, gain access to all of the

[25:00] **Presenter:** information that passes through that app.

[25:04] **Presenter:** So the problem here is, of course, personal data that's been leaked into logs and then

[25:09] **Presenter:** allows me to have direct access to those logs.

[25:14] **Presenter:** One more interesting thing about the screen that you just saw is that when I logged into

[25:18] **Presenter:** the application and it was asking me for permissions, we didn't see the typical OAuth

[25:26] **Presenter:** would expect to see. We saw this thing called connections that we are

[25:30] **Presenter:** allowing the applications to actually run.

[25:33] **Presenter:** What actually is going on here is that the application

[25:37] **Presenter:** is gaining access to a token,

[25:42] **Presenter:** an authentication token that allows the application to do whatever it wants

[25:46] **Presenter:** with our credentials. This is not limited to specific permissions.

[25:49] **Presenter:** And this also is a way,

[25:52] **Presenter:** So this mechanism can actually be leveraged by an attacker to create a phishing application inside of an organization.

[26:00] **Presenter:** And actually in DEF CON last year, I saw how you can take this mechanism, you can build an application, a beta application that does something useful within an organization.

[26:11] **Presenter:** It's plugged into the organization single sign-on.

[26:14] **Presenter:** It's hosted on a trusted Microsoft domain.

[26:17] **Presenter:** and then every time a user uses it,

[26:20] **Presenter:** they just share their credential with me

[26:22] **Presenter:** and then I own their account.

[26:23] **Presenter:** And so if you're interested, check it out.

[26:25] **Presenter:** There's also a tool that would allow you

[26:27] **Presenter:** to play around with it.

[26:30] **Presenter:** So wrapping up this example,

[26:34] **Presenter:** we saw that business data could be leaking

[26:39] **Presenter:** into personal accounts.

[26:40] **Presenter:** We saw the share with everyone feature,

[26:43] **Presenter:** which is of course a big authorization problem.

[26:47] **Presenter:** A personal data that leaks into logs that allows the maker of the application to own the account or the data of people that are using the application.

[26:55] **Presenter:** So moving on to another example.

[26:59] **Presenter:** When you have business users that are creating applications, let's say somebody from marketing, somebody from sales or from the risk team in finance, these users are creating applications with their own identities.

[27:09] **Presenter:** Now what happens when these users leave the organization?

[27:13] **Presenter:** Of course, what happens is that applications remain without an owner.

[27:17] **Presenter:** don't have anybody to reach out to. If the application breaks, if there's an issue with

[27:22] **Presenter:** that application, you don't have anybody to talk to. And this is actually an entire category of

[27:26] **Presenter:** problems that are focused around asset management. And so people have been needing, like people need

[27:33] **Presenter:** a way to take ownership of those applications, to change the ownership of applications for users

[27:40] **Presenter:** that have left the organization.

[27:42] **Presenter:** And so one thing that we saw one organization do

[27:46] **Presenter:** is create a little management application

[27:48] **Presenter:** that allows a manager to browse through all of their employees.

[27:53] **Presenter:** So I log in as a manager to that application.

[27:55] **Presenter:** I can see all of my direct employees

[27:58] **Presenter:** and I can just get access to everything that they own,

[28:02] **Presenter:** like every application that they have developed.

[28:05] **Presenter:** I can become a co-owner of those resources

[28:07] **Presenter:** and then I can continue to manage them on their behalf

[28:11] **Presenter:** or move it to somebody else.

[28:13] **Presenter:** And behind the scenes, there's an automation here

[28:16] **Presenter:** which gets the email of my employee

[28:21] **Presenter:** and then it gets all of the applications

[28:24] **Presenter:** that are relevant to that employee

[28:25] **Presenter:** and it would set my user as an owner.

[28:29] **Presenter:** So this is how this works.

[28:31] **Presenter:** You can see that this is a specific action.

[28:34] **Presenter:** Of course, this is a privileged action

[28:39] **Presenter:** The manager themselves, they don't have the access to set themselves as an owner.

[28:45] **Presenter:** This needs to be an administrative permission.

[28:47] **Presenter:** So now let's think about what the problems are here.

[28:54] **Presenter:** So the first thing that you should recognize is that think about what's going on here.

[29:01] **Presenter:** There's one application where multiple users within the organization are going to use it.

[29:08] **Presenter:** is underlying using the same identity

[29:11] **Presenter:** to do some sort of an administrative operation.

[29:16] **Presenter:** So think about it from the SOX perspective.

[29:18] **Presenter:** It looks like a breach, right?

[29:20] **Presenter:** It looks like somebody has stolen those credentials

[29:22] **Presenter:** and is using them across the organization to crawl.

[29:25] **Presenter:** These are different queries coming from different database,

[29:29] **Presenter:** from different IPs, different hosts across time.

[29:32] **Presenter:** This definitely looks like a breach.

[29:35] **Presenter:** So, of course, the problem here is that there's an application that's actually embedded with an admin identity.

[29:41] **Presenter:** This is an application that's impersonating an administrator to do its job.

[29:46] **Presenter:** Now, let's think about it from an attacker's perspective, because there are more problems in the application that we've just described up until now.

[29:56] **Presenter:** So, here's the application again, and we can see my employees as an attacker.

[30:01] **Presenter:** And now I'm going to click on Get Access, and let's look at the request behind the scenes of what actually goes back to Microsoft Services.

[30:11] **Presenter:** So you can see that there's a specific request that goes to something like Azure API Management.

[30:16] **Presenter:** And when we look at the actual payload of that request, you consider that request is sending off the email of my employee, the one that I need to take ownership of their applications.

[30:34] **Presenter:** So what can I do as a hacker?

[30:35] **Presenter:** Well, I can just change this email because this is just a property coming from my client's application to the backend automation.

[30:46] **Presenter:** surface here where a malicious

[30:50] **Presenter:** hacker can just

[30:51] **Presenter:** change the email and then own

[30:52] **Presenter:** the, take ownership of

[30:55] **Presenter:** applications of other people

[30:56] **Presenter:** that are not their direct reports.

[30:59] **Presenter:** And so, and

[31:00] **Presenter:** the reason why this happens is because, well,

[31:03] **Presenter:** somebody has, like,

[31:04] **Presenter:** think about how this application was created.

[31:07] **Presenter:** Like, nobody thought about

[31:09] **Presenter:** risk modeling or threat modeling

[31:11] **Presenter:** or trying to think of whether

[31:13] **Presenter:** or not the client trusts the backend.

[31:14] **Presenter:** I mean, these are business users building applications.

[31:17] **Presenter:** We can't expect them to do that.

[31:19] **Presenter:** So again, wrapping up the self-service example,

### Shared Responsibility & Governance Models

[31:23] **Presenter:** we have applications that are built,

[31:25] **Presenter:** that was embedded with an admin identity,

[31:28] **Presenter:** which results in a counterpersonation.

[31:31] **Presenter:** And we have a clear injection surface here,

[31:33] **Presenter:** which is, again, something that business users would find

[31:36] **Presenter:** very difficult to understand.

[31:38] **Presenter:** And so I think, like, doing a quick recap here,

[31:45] **Presenter:** we are leaving business users to make heavy security decisions

[31:52] **Presenter:** and we are really not giving them any tools to work around these problems.

[31:58] **Presenter:** When you leave, like, these are all cases

[32:02] **Presenter:** where business users were just trying to get their job done, right?

[32:07] **Presenter:** They're not thinking about security.

[32:08] **Presenter:** They're not thinking about the threat model.

[32:10] **Presenter:** It's not part of their mindset at all.

[32:15] **Presenter:** what would we expect?

[32:16] **Presenter:** So in the next section,

[32:18] **Presenter:** we're going to take a step back

[32:19] **Presenter:** because all of these problems

[32:21] **Presenter:** that we saw so far were,

[32:23] **Presenter:** like we saw a bunch of concrete problems

[32:25] **Presenter:** that happened with these applications,

[32:27] **Presenter:** but actually there's an underlying problem here

[32:30] **Presenter:** where the way that these applications get built

[32:33] **Presenter:** is very different from what we're used to.

[32:35] **Presenter:** So let's understand that for a moment.

[32:38] **Presenter:** So recall the SDLC for professional development,

[32:42] **Presenter:** like the way that we build software as developers,

[32:46] **Presenter:** this has been shaped by kind of years of experience, right?

[32:50] **Presenter:** And we have a full methodology of how software gets built,

[32:54] **Presenter:** how we handle the requirements,

[32:58] **Presenter:** how we build it in the right way with shift left and other things,

[33:02] **Presenter:** how we make sure that that software actually behaves like we think it should,

[33:06] **Presenter:** and how do we monitor and manage it in production.

[33:10] **Presenter:** I think it's important for us to remember

[33:14] **Presenter:** that we as security teams rely on the software development cycle

[33:18] **Presenter:** to actually implement a whole bunch of our security mechanisms

[33:22] **Presenter:** so if you think about security

[33:26] **Presenter:** training and modeling and security reviews and shift left

[33:30] **Presenter:** code scanning, security gates, runtime protection

[33:33] **Presenter:** these are all baked into different parts of the SDLC

[33:38] **Presenter:** we don't miss anything.

[33:40] **Presenter:** And now let's try to understand

[33:43] **Presenter:** what happens with citizen developers

[33:45] **Presenter:** or with business users.

[33:47] **Presenter:** Well, with business users,

[33:49] **Presenter:** I mean, there's no SDLC

[33:51] **Presenter:** or at least there is nothing forcing them

[33:55] **Presenter:** to have an SDLC.

[33:56] **Presenter:** You are a business user.

[33:57] **Presenter:** You find a problem,

[33:59] **Presenter:** you have a problem that you need fixing

[34:01] **Presenter:** and so you just fix it, right?

[34:03] **Presenter:** You just build the application,

[34:05] **Presenter:** you build a specific automation

[34:08] **Presenter:** production. If you want to change it, you just click on edit, you drag a few boxes

[34:12] **Presenter:** and it's in production again. There is no

[34:16] **Presenter:** built-in review. There is no verification. There is no

[34:20] **Presenter:** secure, there is nowhere to put a security gate. Now, admittedly

[34:24] **Presenter:** this is not always the case. Like some organizations are

[34:28] **Presenter:** putting in place SDLC for low-code, no-code as well. But when

[34:32] **Presenter:** you think about a business user, when you think about somebody from the finance team

[34:38] **Presenter:** from HR. I mean, you can't really expect them to follow the SDLC. They are just building whatever

[34:44] **Presenter:** they need to do in order to get their job done. And so what happens is that we've given business

[34:52] **Presenter:** users power that used to only belong to developers. There's no best practice. We're just

[35:00] **Presenter:** leaving them to make their own decisions. There are no controls because there is no SDLC.

[35:05] **Presenter:** We don't have any visibility into what they're actually building.

[35:09] **Presenter:** And of course, no guardrails.

[35:10] **Presenter:** So if they're building something that's wrong, like, I don't know, storing social security numbers in plain text in a database that everyone can access, we are not stopping them from doing that.

[35:22] **Presenter:** So with all of that, of course, we have a lot of problems.

[35:26] **Presenter:** Of course, we're seeing basic problems resurface because we've just left business users to their own.

[35:35] **Presenter:** And so I think the most important point that I would like to make is that low-code, no-code, and citizen developers, we have to apply the shared responsibility model here.

[35:49] **Presenter:** When we think about the, we have to own our part in making sure that business users, whatever they are building, they have the support of the security team, and we help them make the right choices.

[36:02] **Presenter:** When we think about the shared responsibility model,

[36:07] **Presenter:** think about something like serverless in a public cloud.

[36:09] **Presenter:** So, of course, the platform itself would provide a whole bunch of secure building blocks for you.

[36:17] **Presenter:** The network would be handled and identity and runtime.

[36:21] **Presenter:** But there's a bunch of things that you own as a customer.

[36:24] **Presenter:** You own the code.

[36:25] **Presenter:** You own access.

[36:26] **Presenter:** You are the only one that can secure what you have built.

[36:29] **Presenter:** And with low-code, no-code, it seems like we have forgotten about it.

[36:33] **Presenter:** And we trust the vendors that everything that would be built on top of these platforms would be secure.

[36:38] **Presenter:** At least that's what business users think because that's what the platforms tell them.

[36:43] **Presenter:** Now, you can't really blame business users for thinking like that, but we know better.

[36:47] **Presenter:** We know that even if the platform will tell us that everything would secure because the building blocks are secure,

[36:53] **Presenter:** that's not really how it works.

[36:55] **Presenter:** So for low-code, no-code, there's a shared responsibility model as well.

[37:00] **Presenter:** And the only difference between low-code, no-code, and serverless

[37:03] **Presenter:** is that you don't own the code.

[37:05] **Presenter:** You do own the business logic,

[37:07] **Presenter:** but the platform would end up generating code on your behalf

[37:11] **Presenter:** based on the business logic.

[37:12] **Presenter:** Does it really matter?

[37:14] **Presenter:** Like you still own, we still have to own the business logic

[37:17] **Presenter:** of those applications.

[37:19] **Presenter:** So when we think about low-code, no-code,

[37:22] **Presenter:** and the shared responsibility model,

[37:25] **Presenter:** platforms have to hold their part

[37:27] **Presenter:** and they do have to step up.

[37:29] **Presenter:** Like platforms today are still mostly claiming

[37:33] **Presenter:** that everything is secure by default

[37:35] **Presenter:** and you'll never have a security problem

[37:37] **Presenter:** when you operate on top of these platforms,

[37:40] **Presenter:** which of course is not true.

[37:41] **Presenter:** And there are also concrete issues.

[37:43] **Presenter:** So just a few, a couple of months ago,

[37:46] **Presenter:** researchers from Tenable found a multi-tenant vulnerability

[37:49] **Presenter:** in a Microsoft Power platform

[37:51] **Presenter:** that allowed them to move between one tenant to another,

[37:55] **Presenter:** get information, get data from another tenant.

[37:57] **Presenter:** This was remediated.

[37:59] **Presenter:** And of course, Microsoft fixed this issue.

[38:01] **Presenter:** And we all have security problems.

[38:02] **Presenter:** But this is where local, no-code platforms need to focus.

[38:08] **Presenter:** And I think if Microsoft is having trouble with this,

[38:14] **Presenter:** because this is difficult,

[38:15] **Presenter:** think about the smaller vendors.

[38:17] **Presenter:** There are small, local, no-code vendors.

[38:19] **Presenter:** Can they really handle multi-tenancy?

[38:22] **Presenter:** That's where they need to focus.

[38:25] **Presenter:** we have another responsibility as customers.

[38:28] **Presenter:** We need to own our part.

[38:30] **Presenter:** So can you answer the following questions for your organization?

[38:34] **Presenter:** Which applications that were built by citizen developers with low-code, no-code,

[38:39] **Presenter:** which of them are moving data outside of the corporate boundary?

[38:42] **Presenter:** Which of them are oversharing identities?

[38:44] **Presenter:** Or do they have vulnerabilities?

[38:46] **Presenter:** Who's building those applications?

[38:49] **Presenter:** At the end of the day, do we own application security for those applications?

[38:55] **Presenter:** who is going to help those business developers build secure applications.

### Practical Guidance & Closing Remarks

[39:00] **Presenter:** So now I'd like to give you a better version for the future

[39:06] **Presenter:** because I do have some good news.

[39:09] **Presenter:** Some organizations have already put in place security programs

[39:13] **Presenter:** that help those business users make the right choices.

[39:17] **Presenter:** And so let me share a few concrete challenges,

[39:21] **Presenter:** but also from those organizations,

[39:26] **Presenter:** but also some tips about how to make that program successful.

[39:33] **Presenter:** It's important for us to understand from the get-go

[39:36] **Presenter:** that there's a difference between application security

[39:39] **Presenter:** for traditional apps or those that are built by professional developers

[39:43] **Presenter:** and low-code, no-code applications.

[39:44] **Presenter:** The first clear difference is the security awareness.

[39:48] **Presenter:** If you think that talking to professional developers about security is difficult, try doing it with business users.

[39:54] **Presenter:** I would even say that it doesn't really make sense to ask a business user to be a security professional.

[40:00] **Presenter:** We need to make it easy for them to make the right choices and to stop them from doing terrible mistakes.

[40:07] **Presenter:** We saw the changes in SDLC.

[40:10] **Presenter:** So even though developers are using the SDLC, business users are not really using SDLC or they don't have to.

[40:18] **Presenter:** they probably never will.

[40:21] **Presenter:** Security, in terms of security controls,

[40:23] **Presenter:** all of the security controls that you already have,

[40:26] **Presenter:** like they don't apply in this new world

[40:29] **Presenter:** of business development,

[40:31] **Presenter:** mostly because these applications are operating

[40:34] **Presenter:** based on user impersonation.

[40:36] **Presenter:** So you can't really rely on a network or any other logs

[40:39] **Presenter:** because you cannot distinguish,

[40:40] **Presenter:** the application doesn't really exist from your perspective.

[40:43] **Presenter:** You cannot distinguish between two users.

[40:45] **Presenter:** One of them is the maker of that application

[40:48] **Presenter:** of the application.

[40:49] **Presenter:** They are both using the same identity.

[40:52] **Presenter:** And the last issue here is the scale.

[40:56] **Presenter:** The scale of citizen development is incredible.

[40:59] **Presenter:** When we talk about professional developers,

[41:03] **Presenter:** the top organizations in the world,

[41:05] **Presenter:** how many applications are they building each year?

[41:07] **Presenter:** Like 100 apps, 1,000 apps if they're really successful.

[41:12] **Presenter:** Business users are easily building tens of thousands

[41:16] **Presenter:** or hundreds of thousands of applications each year.

[41:18] **Presenter:** And so if you have those numbers, of course, pretty soon, most of your professional applications inside of your organization are going to be applications built by those business users.

[41:30] **Presenter:** So it's really important that we get on this early.

[41:35] **Presenter:** And so here's a good way forward.

[41:42] **Presenter:** You do now have an opportunity, a new opportunity that we've never had before.

[41:50] **Presenter:** Because business users are now reimagining the way that business is being done,

[41:57] **Presenter:** is being followed with low-code, no-code, with Gen.AI.

[42:02] **Presenter:** Business users are building their own things.

[42:04] **Presenter:** We have an opportunity right now to bring them in under the security umbrella.

[42:09] **Presenter:** and you have an opportunity to champion low-code, no-code security within your organization.

[42:14] **Presenter:** And so here are a few resources to help you do that.

[42:19] **Presenter:** One thing is to raise awareness with your business users,

[42:23] **Presenter:** and you can use the OWASP Top 10 for that.

[42:26] **Presenter:** You'll find concrete sections that would help you,

[42:31] **Presenter:** that are talking in a language that business users would understand,

[42:35] **Presenter:** in plain language that business users could understand.

[42:38] **Presenter:** So you can use this as a free tool for you to send in your organization.

[42:43] **Presenter:** In terms of the SDLC, there's a clear opportunity to create a standard,

[42:47] **Presenter:** a security standard for low-code, no-code.

[42:49] **Presenter:** And again, the organizations that are forward-thinking here have already done this.

[42:53] **Presenter:** Think about what are the approved use cases for each one of the platforms.

[42:56] **Presenter:** How do you think about, how do you separate environments?

[43:01] **Presenter:** Can you collect an S-bomb for these types of applications?

[43:04] **Presenter:** These are things that we need to think about.

[43:08] **Presenter:** In terms of security controls,

[43:11] **Presenter:** so like the bad news is that most security controls don't apply.

[43:15] **Presenter:** But the good news is that if you remember

[43:18] **Presenter:** just how deep the visibility here could be,

[43:22] **Presenter:** because the applications, the automations

[43:24] **Presenter:** are actually logging all of the data behind them,

[43:26] **Presenter:** this could actually be a huge opportunity.

[43:29] **Presenter:** So we've been trying as security teams

[43:34] **Presenter:** are doing for ages.

[43:35] **Presenter:** And they've been using copy and paste automation

[43:37] **Presenter:** to move data around,

[43:39] **Presenter:** and we've never had visibility into it.

[43:41] **Presenter:** Now, we have a fresh opportunity

[43:44] **Presenter:** to gain more visibility than we've ever had before.

[43:48] **Presenter:** Because if we plug into those systems,

[43:50] **Presenter:** we can now ask,

[43:51] **Presenter:** hey, what are all of the applications

[43:52] **Presenter:** that the HR team is using

[43:54] **Presenter:** or that the finance team is using?

[43:55] **Presenter:** And then we can understand

[43:57] **Presenter:** how data moves within our organization.

[43:59] **Presenter:** We can understand what business processes

[44:04] **Presenter:** If we do this right, we'll be in a far better place

[44:07] **Presenter:** than we've ever been before in understanding our business.

[44:12] **Presenter:** And in terms of the numbers of applications,

[44:14] **Presenter:** how do you, like the only thing I would say there

[44:19] **Presenter:** is that, I mean, you have to fight fire with fire, right?

[44:23] **Presenter:** If you have 10x or 100x more applications developed each year,

[44:28] **Presenter:** like don't think about it in terms of manually work.

[44:31] **Presenter:** anything that depends on like security review,

[44:35] **Presenter:** threat modeling that is done by a professional,

[44:37] **Presenter:** it's out the window because you cannot scale your security,

[44:41] **Presenter:** you will not scale your security team 10x or 100x

[44:45] **Presenter:** in the coming year, right?

[44:47] **Presenter:** So we need to use automation to automatically detect those issues

[44:52] **Presenter:** and help business users make better choices

[44:55] **Presenter:** or prevent them from doing terrible choices.

[44:58] **Presenter:** And so with that, I'm going to finish it off

[45:01] **Presenter:** and leave here a few soundbites for you to use.

[45:04] **Presenter:** Thank you very much.

[45:06] **Presenter:** And please reach out to me if you're interested in any collaboration.
<!-- talk-enrichment:end -->
