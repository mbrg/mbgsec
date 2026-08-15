---
title: "How to Govern and Secure Low-Code/No-Code Apps"
talk_date: 2022-11-02
conference: "LowCodeCon 2022"
permalink: /talks/2022-11-02-lowcodecon-2022-how-to-govern-and-secure-low-code-no-code-apps/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2022-11-02_LowCodeCon/latest.json
pdf_url: https://media.mbgsec.com/decks/2022-11-02_LowCodeCon/slides.pdf
recording_url: https://www.youtube.com/watch?v=lgPzDD2TaCE
github_url: https://github.com/OWASP/www-project-citizen-development-top10-security-risks
schedule_url: https://web.archive.org/web/20230131203304/https://lowcodecon.org/watch-again-2022/
abstract_status: source-lacks-abstract
abstract_status_checked_at: 2026-08-14
abstract_status_note: "The archived official LowCodeCon 2022 lineup confirms Michael Bargury, the exact talk title, and date, but contains no session abstract."
transcript_source_url: "https://www.youtube.com/watch?v=lgPzDD2TaCE"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "a520bb1edf09bdf82d2a5fb5cbe9fe1a3c704ebfeb00c48a70f08639f789518b"
---
<!-- talk-enrichment:start -->
## Transcript

> Generated from the talk recording and evaluated by three independent LLM reviewer roles.

### Opening & Event Overview; Agenda & Presenter Introduction; Low‑Code Adoption in the Enterprise

[00:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=12s) **Presenter:** Welcome, everyone, to LowCodeCon 2022. My name is Michael Cares and I'm your host. We're celebrating our second year with this global event focused on all things low-code and open source. Our purpose is to bring together the low-code and open source communities to share the experience and knowledge of thought leaders and experts from around the world.

[00:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=30s) **Presenter:** As the host company and organizer of the event, AOT Technologies is committed to the values of low-code and open-source,

[00:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=35s) **Presenter:** so much so that we developed our own free open-source low-code development platform, FormsFlow.ai,

[00:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=41s) **Presenter:** which is core to our vision of a democratized development for government and business.

[00:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=48s) **Presenter:** Today, I'd like to introduce you to our presenter, Michael Bargery, CTO at Zenity.

[00:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=53s) **Presenter:** Michael is a low-code, no-code security expert.

[00:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=55s) **Presenter:** He leads the Open Web Application Security Project, Top 10 Security Issues for Low-Code, No-Code Project,

[01:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=63s) **Presenter:** writes about low-code security in dark reading, and is a frequent speaker in security conferences

[01:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=67s) **Presenter:** sharing both the defender and the attacker's perspective on low-code, no-code.

[01:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=72s) **Presenter:** Michael is the co-founder and CTO of Zenity, a startup helping large enterprises adopt low-code, no-code in a secure way,

[01:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=79s) **Presenter:** and was previously part of Microsoft's Cloud Security CTO office.

[01:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=84s) **Presenter:** Michael's presentation today is how to govern and secure low-code, no-code apps.

[01:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=89s) **Presenter:** Michael, over to you.

[01:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=92s) **Presenter:** Thank you very much, Michael, for that introduction, and thank you, everybody, for being here.

[01:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=98s) **Presenter:** So here's what we're going to do today.

[01:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=102s) **Presenter:** Let's start with kind of a brief intro.

[01:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=106s) **Presenter:** So you already heard a bit about myself.

[01:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=109s) **Presenter:** I've been in the intersection between low-code and security for the last four years now.

[01:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=116s) **Presenter:** About two years ago, I co-founded Zenity, which is a company focused on helping the enterprise adopt low-code, no-code in a secure way

[02:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=124s) **Presenter:** with the tools that IT and security needs to maintain visibility and control,

[02:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=132s) **Presenter:** but also promoting low-code within the enterprise.

[02:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=139s) **Presenter:** About six years at Microsoft's cloud division on multiple areas, specifically in security.

[02:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=144s) **Presenter:** I lead an OWASP group, which for those of you who don't know, OWASP is a cross-company collaboration where open source projects are created in order to illustrate the top risks or the most important risk for applications created for professional pro code and other places.

[02:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=169s) **Presenter:** I lead the product that is dedicated to identifying those low-code, no-code vulnerabilities or risks, and we'll see them during this talk.

[02:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=179s) **Presenter:** If you have any questions that will not be covered in this talk, please feel free to reach out to me.

[03:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=186s) **Presenter:** I'm happy to have a discussion with you later.

[03:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=190s) **Presenter:** Here's what we're going to do today.

[03:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=191s) **Presenter:** We're going to start by talking about low-code in the enterprise, how low-code finds its way into the enterprise, and how does this adoption take place?

[03:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=204s) **Presenter:** I mean, who's leading it? How fast is it going?

[03:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=207s) **Presenter:** The second point that I'm going to cover is how secure those low-code, no-code applications are, and basically give you an application security practitioner's view into low-code, no-code,

[03:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=221s) **Presenter:** security side. We'll touch a bit on SDLC, on how these applications get developed and where do

[03:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=227s) **Presenter:** security teams find concerns. And later on, we'll go through the common security pitfalls for

[03:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=233s) **Presenter:** low-code, no-code. The number one thing that you should get out of this talk is how do you

[04:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=241s) **Presenter:** accelerate adoption of low-code, no-code within an enterprise by getting together with the people

[04:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=248s) **Presenter:** that lead low-code and security and bringing those teams closer together.

[04:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=254s) **Presenter:** So hopefully I can help you figure out how to do that today.

[04:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=262s) **Presenter:** So let's start with low-code, no-code in the enterprise.

[04:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=265s) **Presenter:** How does it look like and where is it going?

[04:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=268s) **Presenter:** I'm going to start with something that would kind of the end,

[04:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=273s) **Presenter:** but that's actually the most interesting,

[04:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=276s) **Presenter:** one of the most interesting slides that you'll see in this talk.

[04:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=280s) **Presenter:** This is a chart showing the adoption in the number of applications

[04:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=285s) **Presenter:** that were developed, low-code, no-code applications,

[04:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=289s) **Presenter:** developed in a single organization.

[04:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=290s) **Presenter:** These are anonymized statistics, so it has some variance.

[04:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=294s) **Presenter:** But you can see that in about three years or three and a half years,

[05:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=301s) **Presenter:** They developed over 70,000 applications.

[05:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=307s) **Presenter:** These are, of course, micro-applications.

[05:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=308s) **Presenter:** Some of them are simple automations, flows that are like if this, then that automations.

[05:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=314s) **Presenter:** Other are applications, some external, some internal.

[05:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=317s) **Presenter:** These numbers, of course, elude to citizen development.

[05:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=321s) **Presenter:** This is actually why low-quality enterprise can be scary from the IT or security side,

[05:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=330s) **Presenter:** they are losing control, but also why the benefit is so large, right?

[05:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=335s) **Presenter:** Because every such application has a use case.

[05:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=338s) **Presenter:** It solves something for the business.

[05:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=339s) **Presenter:** And so we can see that this particular organization is gaining a lot from

### Security Perspective on Low‑Code

[05:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=344s) **Presenter:** local local.

[05:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=346s) **Presenter:** And I'll share more about that briefly.

[05:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=350s) **Presenter:** So kind of touching on local and how local funds went into enterprise.

[05:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=356s) **Presenter:** I mean, I won't go into a lot of details here.

[06:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=360s) **Presenter:** But it's pretty clear that IT teams cannot do anything that cannot accommodate all of the need that the business needs.

[06:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=366s) **Presenter:** And the idea about empowering the business has a lot of power.

[06:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=372s) **Presenter:** One thing to keep in mind, though, is that even though low-code, no-code does this in a very good way, empowering it to business, low-code, no-code is definitely not the first technology to try.

[06:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=385s) **Presenter:** We can argue that this is the first technology to succeed.

[06:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=387s) **Presenter:** But what you're seeing here is a whole bunch of technologies throughout the years from applications that used to kind of record your keyboard and mouse, the same very naive version of what RPA does today, to Visual Basic and Macros and Excel spreadsheets, to what we have today with low code.

[06:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=407s) **Presenter:** So this idea of enabling the business and providing business teams the ability to move without IT is a very old idea.

[06:58](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=418s) **Presenter:** And it also has kind of a background.

[07:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=421s) **Presenter:** So for security professionals, each one of these points along this graph came with a bunch of new issues, security issues, that were raised because of these particular technologies.

[07:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=435s) **Presenter:** So Visual Basic, for example, or Excel macros, these are very infamous in the security world.

[07:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=442s) **Presenter:** So you can see why there's some sort of a baggage, some sort of context security professionals come with when they start to look at low code.

[07:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=453s) **Presenter:** One thing that is really interesting about low code in the enterprise today, and this is something that I go through with many different enterprises,

[07:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=464s) **Presenter:** is the realization that they don't really have a choice

[07:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=468s) **Presenter:** whether low-code, no-code is inside of the organization.

[07:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=471s) **Presenter:** And this is because low-code, no-code is now the standard,

[07:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=474s) **Presenter:** not only for platforms that are dedicated for low-code, no-code,

[07:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=477s) **Presenter:** but for the major SaaS vendors.

[08:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=480s) **Presenter:** So services like Microsoft, ServiceNow, and Salesforce

[08:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=483s) **Presenter:** are plugging low-code, no-code capabilities

[08:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=487s) **Presenter:** directly into their existing capabilities, their existing platforms.

[08:13](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=493s) **Presenter:** cases, enterprises don't really have a choice. They're using Microsoft, they're using Salesforce,

[08:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=497s) **Presenter:** and those capabilities get kind of embedded within those platforms. It also means that the

[08:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=504s) **Presenter:** low-code, low-code applications that are built on top of these platforms are built on business

[08:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=508s) **Presenter:** sensitive data. And so this is why this is crucial. It also shows why the graph that we saw earlier,

[08:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=517s) **Presenter:** how can it happen within an organization sometimes without the organization even knowing?

[08:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=523s) **Presenter:** many cases when I start to work with kind of a new enterprise,

[08:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=527s) **Presenter:** they typically reach out because they are concerned about the specific platform.

[08:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=533s) **Presenter:** But very soon in the engagement, we find that enterprises have six to seven different local platforms

[09:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=540s) **Presenter:** where business users are actively developing applications on.

[09:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=545s) **Presenter:** The other thing that I'll mention is that, of course, a lot of these development is done by professional developers,

[09:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=550s) **Presenter:** not only business developers or citizen developers.

[09:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=552s) **Presenter:** So there's a mixture here.

[09:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=556s) **Presenter:** This one is, again, just kind of a recap.

[09:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=558s) **Presenter:** How does it look like from the security perspective?

[09:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=560s) **Presenter:** Of course, there's a lot of benefit to low-code applications.

[09:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=570s) **Presenter:** One thing that is important to figure out with the large adoption

[09:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=575s) **Presenter:** that you saw demonstrated with your earlier chart

[09:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=581s) **Presenter:** So when did low-code become something that is directed specifically to the business user?

[09:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=587s) **Presenter:** And how did this come to be?

[09:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=590s) **Presenter:** So let me take you through a brief journey from the perspective.

[09:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=594s) **Presenter:** This is going to focus specifically on the perspective of Microsoft,

[09:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=597s) **Presenter:** just because there's a lot of information out there,

[09:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=599s) **Presenter:** and they also have one of the largest low-code, no-code platforms out there, Power Platform.

[10:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=604s) **Presenter:** So let's see.

[10:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=606s) **Presenter:** This is a quote from Satya Nadella, Microsoft CEO, back from 2018.

[10:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=612s) **Presenter:** You can see that he's, this is from an announcement from one of Microsoft conferences.

### Integrating Security into the SDLC

[10:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=617s) **Presenter:** You can see that he's referring to Power Platform as a way for ISVs to work faster and better with Dynamics, which is their Salesforce alternative.

[10:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=627s) **Presenter:** And so this is directed at professional developers, professional development teams, that instead of using codes like .NET, would use low code as a way to more easily extend dynamics.

[10:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=642s) **Presenter:** Now let's look at a quote from the same person, the same company, a year later.

[10:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=649s) **Presenter:** So I'll give you a moment to briefly read through this, but this is a major change.

[10:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=655s) **Presenter:** You can see that instead of talking about extendability, he's talking about empowerment.

[11:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=661s) **Presenter:** Empowerment of those citizen developers, the business users that are going to use this technology to solve a whole host of business use cases.

[11:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=669s) **Presenter:** You can also see that he's referring to a number, 2.5 million citizen developers already using this platform.

[11:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=676s) **Presenter:** This also helps us understand why this is a good step to go to, right?

[11:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=680s) **Presenter:** It's enablement to more people or more potential users.

[11:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=686s) **Presenter:** And the last quote here is actually amazing because this is when Satya is basically referring to low code as the new Excel,

[11:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=696s) **Presenter:** as potentially something that would have as high as impact on the entire industry as Excel did,

[11:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=704s) **Presenter:** creating new jobs, giving people more power than they had before.

[11:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=709s) **Presenter:** Okay.

[11:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=710s) **Presenter:** Here's a quote from Satya three years later.

[11:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=713s) **Presenter:** You can see that the number of business users that are using Power Platform has gone up almost 10x, so 20 million active users.

[12:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=723s) **Presenter:** And you can also see that, I mean, you don't see it here from the quotes, but if you look it up, you see that today low-code, no-code is a big major pillar in the way that Microsoft discusses its future.

[12:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=740s) **Presenter:** This has been a tremendous change.

[12:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=742s) **Presenter:** And of course, this is not only Microsoft.

[12:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=744s) **Presenter:** This has been across the industry.

[12:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=745s) **Presenter:** But this is kind of a nice demonstration to see how far we've gone in the last few years.

[12:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=756s) **Presenter:** So, kind of to summarize this, we are now at a crucial point in history where, one, there are a lot of big vendors that have access to the enterprise.

[12:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=767s) **Presenter:** They already sold something to the enterprise that sits there, like Salesforce or ServiceNow or Microsoft, and have a big incentive to empower those business users because it brings new business.

[12:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=779s) **Presenter:** It's also very useful for the companies, right?

[13:02](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=782s) **Presenter:** So this is something that companies are looking for.

[13:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=785s) **Presenter:** And the tech is actually good enough for it to empower business users.

[13:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=792s) **Presenter:** So there's a lot of history where we have tried to put more power in the ends of the business.

[13:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=797s) **Presenter:** Low-code, non-code is really doing it.

[13:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=799s) **Presenter:** It's really achieving that goal.

[13:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=801s) **Presenter:** And this is why I think now is the time for us to focus on how does low-code,

[13:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=807s) **Presenter:** how does low-code, non-code work with the enterprise?

[13:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=810s) **Presenter:** And how can an enterprise take advantage of low-code?

[13:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=814s) **Presenter:** When you think about an enterprise,

[13:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=816s) **Presenter:** the number one thing that is preventing enterprises today

[13:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=820s) **Presenter:** from adopting low-code, no-code in an official way

[13:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=824s) **Presenter:** is security.

[13:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=825s) **Presenter:** And this is, of course, reasonable.

[13:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=829s) **Presenter:** For security, I mean, from the enterprise perspective,

[13:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=833s) **Presenter:** security is a must.

[13:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=835s) **Presenter:** It's not something that an enterprise could compromise on.

[13:58](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=838s) **Presenter:** Of course, when I say security, I also mean,

[14:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=841s) **Presenter:** I mean, compliance is important too.

[14:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=843s) **Presenter:** Privacy is important too.

[14:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=846s) **Presenter:** are really crucial to an enterprise because the trust of its customers and the financial risk is very large.

[14:13](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=853s) **Presenter:** And of course, because low-code, no-code applications are built on top of business critical data,

[14:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=859s) **Presenter:** it's really important that the importance of security only becomes large.

[14:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=866s) **Presenter:** And so in the next section, what I would like to do is to give you a perspective from a security practitioner's perspective on low-code, no-code.

[14:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=876s) **Presenter:** will realize what are the challenges that security teams face when they try to go on

[14:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=884s) **Presenter:** board with low-code, no-code.

[14:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=886s) **Presenter:** And by the end of this section, we will realize together what is the best way to help security

[14:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=892s) **Presenter:** teams solve their problems or address their concerns so they can be part of the people

[15:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=901s) **Presenter:** that are pushing low-code, no-code forward in the enterprise.

[15:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=906s) **Presenter:** So here's how it looks like.

### Security Challenges & Governance

[15:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=908s) **Presenter:** From the security perspective, when we look at low code, no code, it really breaks all of the assumptions that security professionals have when it comes to the way that they establish their security strategy.

[15:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=922s) **Presenter:** First of all, the scale.

[15:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=925s) **Presenter:** So security, in many cases, relies on manual processes.

[15:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=929s) **Presenter:** You can't really do a security review with a dedicated team of architects for 70,000 different apps.

[15:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=936s) **Presenter:** It's just unfeasible.

[15:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=939s) **Presenter:** And so this is one area where security is very much reliant on this manual process, manual discussion between the developer and the security team.

[15:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=951s) **Presenter:** And in the low-code, no-code case, in many cases, it's just too difficult.

[15:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=957s) **Presenter:** There are just too many applications.

[15:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=959s) **Presenter:** In other cases where this is mostly in low code, where you have professional development teams using low code, we do find that the number of applications can be manageable.

[16:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=971s) **Presenter:** But in many cases, the teams that are developing these applications are not part of the traditional professional development teams within the organization.

[16:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=980s) **Presenter:** They could be in the business.

[16:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=982s) **Presenter:** And so their relationship with the security team might be a bit different.

[16:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=985s) **Presenter:** So that's one thing that's different.

[16:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=987s) **Presenter:** Yeah.

[16:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=990s) **Presenter:** The second thing is about SDLC, Secure Development Lifecycle, and this is a software development life cycle.

[16:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=998s) **Presenter:** And we'll see in a moment. We'll dive into it a bit more.

[16:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1002s) **Presenter:** But there's really a whole host of different maturity levels for development life cycle with low code, no code.

[16:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1010s) **Presenter:** In some cases, we find development life cycles that are pretty similar to pro-code applications.

[16:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1016s) **Presenter:** But in other cases, we'll find development lifecycle processes that really are non-existent, where people basically create an application, save it, and that's it.

[17:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1028s) **Presenter:** There's no monitoring, there's no tests, there's no verification.

[17:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1032s) **Presenter:** We'll dive into it in a moment.

[17:13](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1033s) **Presenter:** The last part is that with professional code, there's a whole bunch of tools that help developers make sure that they catch mistakes early.

[17:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1046s) **Presenter:** mistakes. Everybody sometimes forgets hardcodes something into the application like a secret

[17:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1053s) **Presenter:** or forgets to verify, forgets to tag a field as secure input rather than free text. I mean,

[17:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1061s) **Presenter:** people make mistakes and that's fine. But the security industry has a whole bunch of tools

[17:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1068s) **Presenter:** that help developers catch those mistakes early and correct them. These are code scanners.

[17:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1076s) **Presenter:** and container scanners, and vulnerability scanners that run on top of your existing infrastructure once it's in production.

[18:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1083s) **Presenter:** In the world of low-code, no-code, because there is no code to scan, these solutions don't apply.

[18:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1089s) **Presenter:** And then people try to do all sorts of things like scan binaries or maybe pen test.

[18:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1096s) **Presenter:** But in many cases, those solutions don't really fit the low-code, no-code world.

[18:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1100s) **Presenter:** You'll end up finding a lot more issues that are about the platform, not your own application.

[18:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1104s) **Presenter:** And so you can see why from a security practitioner's perspective, where all of my assumptions on an application simply don't hold, I'm kind of in a problem.

[18:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1116s) **Presenter:** And of course, on the bottom side here, you can find the concerns.

[18:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1119s) **Presenter:** These are regular application security concerns.

[18:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1121s) **Presenter:** They are not dedicated to low-code.

[18:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1123s) **Presenter:** These are the concerns for every application.

[18:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1125s) **Presenter:** But they hold for a low-code, non-code application.

[18:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1127s) **Presenter:** And so, of course, this is why the security teams can be concerned.

[18:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1134s) **Presenter:** So the other piece is that this is a security for low-code, no-code, or security concerns for low-code, no-code has really been growing in attention in the industry as the enterprise adopts low-code, no-code.

[19:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1148s) **Presenter:** So you can see a few different headlines here.

[19:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1151s) **Presenter:** One of them is the data exposure, the data leakage for Microsoft about a year ago,

[19:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1157s) **Presenter:** where an insecure misconfiguration, an insecure default configuration

[19:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1164s) **Presenter:** made millions of records of user records available to anonymous users,

[19:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1169s) **Presenter:** so anybody that could fetch that endpoint.

[19:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1172s) **Presenter:** We'll dive into that example later on.

[19:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1174s) **Presenter:** You can also see a survey by dark reading on the right side of the screen where many security practitioners basically say, I have no governance into low-code, low-code.

[19:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1186s) **Presenter:** I'm not sure what people are doing there.

[19:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1188s) **Presenter:** Some of them even say they don't trust the platforms, but that's something that we can kind of address.

[19:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1193s) **Presenter:** So there is a general concern, and we'll try to address that in a moment again.

[19:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1199s) **Presenter:** The last thing that I'll note here on this slide is that the other, basically the other group that has gained attention of low-code, no-code is hackers.

[20:13](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1213s) **Presenter:** And so hackers have been using low-code, no-code as a way to, as we call it in the security industry, to leave off the land, to basically exploit existing resources to do their bidding, to hide within the enterprise, and then use that as a hacking infrastructure.

[20:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1231s) **Presenter:** So there's one example here, but a few other examples that have popped up.

[20:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1238s) **Presenter:** And this makes sense. I mean, the same kind of advantages that we have as local developers or local developers, the hackers would have as well.

[20:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1247s) **Presenter:** And they also know that this is typically something that security teams don't have visibility into.

[20:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1252s) **Presenter:** And that raises their concerns even higher.

[20:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1256s) **Presenter:** So to summarize, from a security perspective, this is where most security teams are.

[21:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1264s) **Presenter:** They are stuck in a place where either they inhibit the adoption of low-code, no-code within the enterprise, which means that they are stopping business enablement.

[21:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1276s) **Presenter:** Nobody wants to be a blocker.

[21:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1278s) **Presenter:** Nobody in the enterprise and nobody in security wants to be a blocker.

[21:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1282s) **Presenter:** But the other side, if they enable it to go kind of without having any controls, they will have a rough time basically accomplishing their goals of maintaining security for the enterprise.

[21:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1297s) **Presenter:** And so this is a struggle where we are today.

[21:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1300s) **Presenter:** And this is why there's some sort of a, like, this is why sometimes this conversation can be difficult.

[21:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1308s) **Presenter:** I'm hoping that once we figure out, once both sides understand the benefits and the concerns of each other, we can try and address them together.

[21:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1319s) **Presenter:** And so you have seen so far that I think that most security teams are really unaware of what's going on within local and local.

[22:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1328s) **Presenter:** How can they be part of the conversation?

[22:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1331s) **Presenter:** So the next thing that we need to look at before we can look at specific issues is to figure out where do security teams usually plug in into the development cycle and how can it work in the world of local and non-com.

[22:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1350s) **Presenter:** So let's look at the development lifecycle.

[22:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1353s) **Presenter:** How do applications get built?

[22:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1356s) **Presenter:** Here's the typical software development lifecycle.

[22:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1359s) **Presenter:** And this is kind of generic.

### Top 10 Low‑Code Security Risks

[22:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1360s) **Presenter:** and I put here kind of the different types of personas

[22:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1365s) **Presenter:** that are relevant to each step.

[22:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1368s) **Presenter:** So first you envision,

[22:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1370s) **Presenter:** you basically find the business use case,

[22:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1373s) **Presenter:** the thing that needs solving.

[22:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1375s) **Presenter:** That typically happens in the business.

[22:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1377s) **Presenter:** Then there's planning by the engineering or product teams,

[23:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1380s) **Presenter:** the actual development of the application,

[23:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1383s) **Presenter:** verification, which means testing,

[23:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1385s) **Presenter:** including security testing, deployment,

[23:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1390s) **Presenter:** monitoring of that application to see that it actually works,

[23:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1394s) **Presenter:** and then management.

[23:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1394s) **Presenter:** So you need to patch it.

[23:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1396s) **Presenter:** You need to have operations around it.

[23:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1399s) **Presenter:** Of course, this process can vary.

[23:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1401s) **Presenter:** There are a whole bunch of different options here.

[23:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1403s) **Presenter:** But the crucial point is that security teams have kind of tried to become –

[23:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1409s) **Presenter:** security teams are in many cases relevant by inserting themselves

[23:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1413s) **Presenter:** into this development lifecycle in a way that is not disruptive

[23:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1418s) **Presenter:** the teams that are developing the app.

[23:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1420s) **Presenter:** So for example, where you have the verify step and there are tests there to verify that

[23:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1425s) **Presenter:** the application is actually doing what it should be doing, you could plug in security

[23:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1429s) **Presenter:** tests as well.

[23:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1430s) **Presenter:** And that's kind of a good place for developers to get feedback early.

[23:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1433s) **Presenter:** There's also the monitoring phase where you would monitor for application performance.

[23:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1436s) **Presenter:** You could also be monitoring for security issues.

[23:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1439s) **Presenter:** So that's the way that typically we see security teams or application security teams plug into

[24:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1446s) **Presenter:** the development process.

[24:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1448s) **Presenter:** Now, for non-code, it really varies.

[24:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1452s) **Presenter:** I mean, you have the envision part where you think about the business problem, and you

[24:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1457s) **Presenter:** have the creation part, which for citizen development could be done by the business

[24:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1462s) **Presenter:** as well.

[24:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1463s) **Presenter:** And everything else is not mandatory.

[24:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1466s) **Presenter:** In some cases, it is completely the same as we saw in the earlier slide.

[24:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1471s) **Presenter:** So we do find a lot of low-code development teams that are professional developers.

[24:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1477s) **Presenter:** They're doing things exactly the same way like you would build a pro-code application.

[24:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1483s) **Presenter:** But in many cases, that's not the case.

[24:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1485s) **Presenter:** And by the way, that really stems from the maturity of the industry as a whole.

[24:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1493s) **Presenter:** I mean, working on a development lifecycle with a pro-code application,

[25:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1501s) **Presenter:** of open source tools and Git and a lot of technologies that are around making this process

[25:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1507s) **Presenter:** easy. For low code, it's not really there. It really depends on the type of platform that you're

[25:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1512s) **Presenter:** working with. And so there are a lot of caveats and that's why we're seeing a different type of

[25:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1518s) **Presenter:** process. The important thing here is to know that this is, again, a place where security teams can't

[25:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1524s) **Presenter:** plug in the way that they're used to. They can't be part of your process because your process is

[25:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1529s) **Presenter:** different. The other important thing to note here is that this is exactly why no code in particular

[25:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1536s) **Presenter:** and citizen development is so strong because you don't have to exchange hands because between

[25:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1540s) **Presenter:** multiple different personas, you can just have the business user that has the need develop their

[25:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1546s) **Presenter:** own application, which is again, very cool. But, but of course has these implications. And so now

[25:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1554s) **Presenter:** that we understand that there are kind of these risks and that there are this and the difference

[25:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1559s) **Presenter:** in the in the development life cycle the last thing i want to tell you before before we go into

[26:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1564s) **Presenter:** kind of specifics is why is this your problem or why is this our problem as people that are using

[26:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1571s) **Presenter:** local because there's kind of uh one thing that you could that you could be thinking is well why

[26:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1578s) **Presenter:** is this not the vendor's problem so the the platform the vendor the uh local platform is

[26:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1584s) **Presenter:** out there, an application development platform.

[26:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1587s) **Presenter:** And some customers expect the platforms themselves

[26:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1590s) **Presenter:** to solve the security problem.

[26:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1592s) **Presenter:** Or as they say, basically,

[26:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1594s) **Presenter:** so everything that they built within this application

[26:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1596s) **Presenter:** is 100% secure.

[26:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1599s) **Presenter:** Now, in security, we have something

[26:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1602s) **Presenter:** called the shared responsibility model.

[26:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1604s) **Presenter:** And this is actually something that has become

[26:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1607s) **Presenter:** really popular since the adoption of the public cloud.

[26:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1614s) **Presenter:** So here's the idea.

[26:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1616s) **Presenter:** When you go to the public, when customers started first going into the public cloud,

[27:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1621s) **Presenter:** their first impression was, hey, the public cloud should be secured.

[27:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1626s) **Presenter:** Everything that I build on top of this public cloud should be secured.

[27:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1629s) **Presenter:** But imagine kind of the minutes of the actual things that you need to do

[27:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1635s) **Presenter:** in order to make sure that something is secured.

[27:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1637s) **Presenter:** In many cases, and for many risks, you have to figure out what this application, what the thing that you have built is actually meant to be doing.

[27:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1645s) **Presenter:** So, for example, an application could be exposing information to anonymous users, non-registered users.

[27:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1651s) **Presenter:** This could be fine if the information should be exposed out there.

[27:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1655s) **Presenter:** And this could be very bad if the information is sensitive.

[27:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1659s) **Presenter:** So this is something that Vendo would have very difficult problems.

[27:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1663s) **Presenter:** and we have a very difficult time actually answering.

[27:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1667s) **Presenter:** This is something that the organization using no-code,

[27:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1670s) **Presenter:** building no-code.

[27:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1671s) **Presenter:** They are the only ones that can answer this question

[27:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1673s) **Presenter:** the right way.

[27:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1675s) **Presenter:** And so this is what the shared responsibility model tells us.

[28:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1680s) **Presenter:** The low-code vendor or the no-code vendor,

[28:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1683s) **Presenter:** they are in charge of building a secure platform

[28:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1685s) **Presenter:** with secure building blocks.

[28:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1687s) **Presenter:** So they will provide you with a platform

[28:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1690s) **Presenter:** that certifies to a whole host of standards,

### Concrete Risk Examples

[28:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1694s) **Presenter:** they will also give you security features.

[28:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1696s) **Presenter:** Like, for example, here's a text box that is a secured input,

[28:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1700s) **Presenter:** and so the input will not be logged,

[28:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1703s) **Presenter:** where you can store passwords, for example.

[28:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1705s) **Presenter:** But using those features correctly,

[28:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1710s) **Presenter:** building applications that make business sense,

[28:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1713s) **Presenter:** that don't expose business data,

[28:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1715s) **Presenter:** that don't share identities between users,

[28:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1717s) **Presenter:** that is up to the people that are building the applications.

[28:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1720s) **Presenter:** The vendor has no way to help you with that.

[28:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1723s) **Presenter:** They can only provide you with tools.

[28:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1725s) **Presenter:** But the actual responsibility for that is on the customer that is building the application.

[28:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1731s) **Presenter:** And so this is where I will focus the rest of my talk in figuring out what are those problems that we're seeing with low-code, no-code applications on the customer's side of the shared responsibility model.

[29:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1744s) **Presenter:** Another way to state that is what are the things that we need to look for when you're building low-code applications that would address the top security concerns for this space?

[29:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1756s) **Presenter:** And the last thing before I show you that is why are we doing it?

[29:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1760s) **Presenter:** And of course, we're doing it first to secure the enterprise, but we're also doing it because there's a very big opportunity here to turn security from something that can be blocking low-code, no-code adoption into a driver of low-code, no-code adoption.

[29:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1778s) **Presenter:** And here's why.

[29:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1779s) **Presenter:** Security teams have always been concerned with things that they don't know,

[29:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1785s) **Presenter:** that they can't control, and they need to protect the enterprise.

[29:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1788s) **Presenter:** Copy-paste integration is something that happens all the time, right?

[29:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1792s) **Presenter:** People are sharing files.

[29:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1794s) **Presenter:** People are moving information from here to there.

[29:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1796s) **Presenter:** This is something that is very difficult to gain visibility into the security team

[30:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1801s) **Presenter:** and to help users avoid doing things that would put their organization at risk.

[30:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1807s) **Presenter:** problem in the security industry.

[30:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1811s) **Presenter:** Low-code, no-code has a potential for much better visibility into what's happening within

[30:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1817s) **Presenter:** an organization for the security team.

[30:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1819s) **Presenter:** Because if they become part of the low-code, no-code industry, if they figure out that

[30:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1828s) **Presenter:** by viewing these applications, those applications are replacing copy-paste integration.

[30:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1834s) **Presenter:** And so by having visibility into these applications, they'll have visibility into things that they never had visibility to before.

[30:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1841s) **Presenter:** This is a common language where we can use security teams and low-code practitioners can use together to basically push low-code, low-code, no-code in the enterprise as a way to make the enterprise more secure.

[30:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1859s) **Presenter:** So the next thing I would like to do is to show you examples of the concrete risks, security risks that we see in low-code, no-code application.

[31:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1869s) **Presenter:** And before I dive into those risks, I'll give you a brief kind of context here.

[31:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1877s) **Presenter:** I've mentioned OWASP when I started.

[31:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1879s) **Presenter:** This is a group that is dedicated.

[31:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1882s) **Presenter:** This is a cross-company collaboration dedicated to finding and categorizing those risks, those low-code, no-code security risks.

[31:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1891s) **Presenter:** OWASP is much larger than this project alone.

[31:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1894s) **Presenter:** But our project specifically has been working with other companies like Palo Alto and Microsoft and multiple low-code, no-code vendors to try and figure out what are these things that our enterprises are struggling with,

[31:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1909s) **Presenter:** the organization or identities could be shared and how can we make that easy for practitioners to

[31:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1916s) **Presenter:** kind of figure out what are these problems and and be able to avoid them and this uh this entire

[32:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1921s) **Presenter:** work uh runs stems from scanning more than a hundred thousand different local network applications

[32:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1928s) **Presenter:** so there's a lot of information that has been crunched to create those uh uh to create those

[32:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1935s) **Presenter:** categories. Now, the last thing I mentioned before I'll go to dive deep, dive deep there,

[32:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1941s) **Presenter:** is that we are always looking for collaborators. And so if you're interested in sharing your

[32:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1947s) **Presenter:** expertise, in providing the context from your organization, and in helping us making this

[32:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1954s) **Presenter:** project better for the entire community, please reach out to me after this talk. My details will

[32:40](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1960s) **Presenter:** be shared at the last slide.

[32:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1964s) **Presenter:** Okay.

[32:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1965s) **Presenter:** These are the top 10 risks for low-code, no-code.

[32:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1968s) **Presenter:** And I will, without further ado, I'll just go to the first one.

[32:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1972s) **Presenter:** In many cases, we find that low-code has the potential to create what we call here a user

[33:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1981s) **Presenter:** impersonation.

[33:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1981s) **Presenter:** And that's where one user is able to access a system looking like they're another user.

[33:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1990s) **Presenter:** platforms that have this connection or connector notion where I,

[33:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1995s) **Presenter:** as the maker of the application, I built an application,

[33:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1997s) **Presenter:** I embed my own identity within the application.

[33:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=1999s) **Presenter:** And then every user of that application would end up using my identity.

[33:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2003s) **Presenter:** Let's see an example.

[33:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2008s) **Presenter:** So this is a real example,

[33:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2010s) **Presenter:** a customer care team at a large e-commerce company.

[33:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2013s) **Presenter:** Basically they had this problem where people are,

[33:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2017s) **Presenter:** people were part of tickets, addressing customer tickets across the organization.

[33:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2022s) **Presenter:** But those people didn't have context about the organization, about the customer,

[33:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2027s) **Presenter:** and their previous history and the previous history of their support.

[33:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2031s) **Presenter:** So this ended up creating a very poor experience for the customer.

[33:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2035s) **Presenter:** And people were upset because they couldn't provide good service.

[33:58](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2038s) **Presenter:** And so the customer care team took an initiative and built an application

[34:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2044s) **Presenter:** where they would basically provide access

[34:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2049s) **Presenter:** to other users within the organization

[34:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2052s) **Presenter:** to information about the customer.

[34:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2055s) **Presenter:** Now, this was a very sophisticated citizen development team

[34:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2061s) **Presenter:** or a team that was also very sophisticated in citizen development.

[34:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2065s) **Presenter:** Here's what they did.

[34:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2067s) **Presenter:** So they created an application.

[34:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2070s) **Presenter:** They embedded their own identity.

[34:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2074s) **Presenter:** own identity within the application.

[34:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2076s) **Presenter:** And they had an admin privilege to the customer database.

[34:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2078s) **Presenter:** So they were able to view all of the different customers on that database.

[34:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2082s) **Presenter:** And they have actually implemented role-based access control on this application.

[34:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2086s) **Presenter:** So every enterprise user could go into this application and they would see only the customer

[34:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2092s) **Presenter:** records that are related to them.

[34:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2095s) **Presenter:** So, so far, everything is fine, right?

[34:58](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2098s) **Presenter:** This is an application.

[34:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2099s) **Presenter:** It works fine.

[35:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2101s) **Presenter:** Every user is only able to access their own records that they should have access to, that they are related to.

[35:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2107s) **Presenter:** So it seems like we're fine, right?

[35:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2109s) **Presenter:** So I'll give you a moment here.

[35:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2115s) **Presenter:** Here's the problem.

[35:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2116s) **Presenter:** When you look at it from a security perspective, from the security operations center perspective,

### Additional Risks & Mitigations — Part 1

[35:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2121s) **Presenter:** what's actually happening here is that there's a bunch of people across the enterprise

[35:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2131s) **Presenter:** reaching out to the customer database with the same user account, which is an admin account,

[35:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2137s) **Presenter:** but running multiple queries, multiple IPs, multiple computers.

[35:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2142s) **Presenter:** So look at it from the network perspective, from the security perspective.

[35:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2147s) **Presenter:** There's no way to know that there's even an application there.

[35:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2150s) **Presenter:** So everything goes directly from the client to the customer database.

[35:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2154s) **Presenter:** And so what you'll find is that what the security team has found here is that basically

[36:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2161s) **Presenter:** They thought that somebody has stole a credential within the organization and was reaching out to the database to basically query all of the information within the database, like scrape the database, because this is how it looked like.

[36:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2174s) **Presenter:** Many people were accessing the database all at once.

[36:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2177s) **Presenter:** And so you can see why there's a confusion, because from the security team's perspective, there's no application here.

[36:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2185s) **Presenter:** Everybody is using their own identity.

[36:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2189s) **Presenter:** now of course this is the problem the problem is that uh the application embedded an identity of

[36:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2196s) **Presenter:** one user and allowed all of the users to actually access that identity and so uh and so of course

[36:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2202s) **Presenter:** this is not best practice the best practice would be for every user to use their own identity even

[36:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2207s) **Presenter:** when they actually reach the database later so the identity should be uh should uh should should

[36:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2213s) **Presenter:** go all the way to the database as well. By the way, there's another problem here where with some

[37:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2221s) **Presenter:** platforms, the actual connection to the database can be implicitly shared while the application is

[37:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2230s) **Presenter:** shared. So once the application is shared, that database connection could be shared as well

[37:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2235s) **Presenter:** separately, which leads to basically direct access to the connection. So this is one example,

[37:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2243s) **Presenter:** But there are a whole bunch of these kind of problems where one user ends up being able to use another user's identity.

[37:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2250s) **Presenter:** Let's see the second risk.

[37:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2255s) **Presenter:** So the second risk is about authorization.

[37:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2258s) **Presenter:** This is where we basically, low code, no code, breaks the permission model within an organization

[37:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2264s) **Presenter:** and allow people to view information they shouldn't be able to view or to perform operations they shouldn't be able to perform.

[37:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2273s) **Presenter:** So one thing that is very common across local and local platforms is this notion of a default environment and a shared connection.

[38:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2281s) **Presenter:** Now, this is very crude for productivity, but this has risks.

[38:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2285s) **Presenter:** And one of the risks is that people can just pick up those connections and use them.

[38:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2290s) **Presenter:** And they could use them for basically whatever they want.

[38:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2292s) **Presenter:** Now, of course, there's permissioning around this.

[38:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2295s) **Presenter:** This is not the default in many platforms.

[38:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2298s) **Presenter:** But when there is room for mistakes and room for errors, those will occur.

[38:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2304s) **Presenter:** That's just reality.

[38:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2306s) **Presenter:** And so in many cases, we found that in the different environments, there's a whole host of connections that can be used and, of course, end up being used.

[38:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2315s) **Presenter:** And so it's very important to keep those kind of connection sharing to very limited use cases and especially limit the number of users that can use these connections,

[38:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2328s) **Presenter:** using any sort of a default environment

[38:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2332s) **Presenter:** to store shared connections that are crucial.

[38:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2337s) **Presenter:** Here's another example.

[38:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2339s) **Presenter:** In many cases, we find that,

[39:02](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2342s) **Presenter:** I mean, it's very difficult to work with.

[39:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2344s) **Presenter:** Working with APIs can be complex.

[39:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2346s) **Presenter:** And so we find that what some developers end up doing

[39:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2350s) **Presenter:** is provide all of the different users in their applications.

[39:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2354s) **Presenter:** So a user, an admin, an operator,

[39:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2356s) **Presenter:** they all use the underlying underlying the same role to the API,

[39:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2362s) **Presenter:** which allows them to query the API, but the UI ends up being different.

[39:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2366s) **Presenter:** And so if you log out, if you log in as an admin or you log in as a user,

[39:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2371s) **Presenter:** you'll see a different UI, but behind that UI,

[39:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2374s) **Presenter:** your actual permissions to the API are the same.

[39:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2379s) **Presenter:** And so for a benign user, for somebody that's kind of a regular user in the enterprise,

[39:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2383s) **Presenter:** that's fine because they won't try to bypass it.

[39:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2386s) **Presenter:** For a malicious user, this is very easy to bypass.

[39:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2388s) **Presenter:** And so this is very critical to get right.

[39:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2393s) **Presenter:** You need to provide a separate API permission for each type of user.

[39:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2399s) **Presenter:** Preventing access on the UI side is not enough.

[40:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2405s) **Presenter:** Here's the next risk.

[40:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2407s) **Presenter:** And this is mainly about data leakage or things going wrong.

[40:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2412s) **Presenter:** And so many low-code, no-code applications are essentially moving data between two places or connecting an operation in one place with an operation in another.

[40:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2424s) **Presenter:** Now, this is great, but when you have lots of these kind of micro-applications, it can be confusing to figure out what's going on.

[40:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2433s) **Presenter:** So you could have one table in one database connected to another, connected to another, and those are kind of separate applications.

[40:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2439s) **Presenter:** it's difficult to figure out what's going on.

[40:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2442s) **Presenter:** We do find that one of the challenges

[40:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2445s) **Presenter:** with those kinds of applications

[40:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2448s) **Presenter:** is that people sometimes use them

[40:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2450s) **Presenter:** to bypass the data perimeter controls

[40:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2457s) **Presenter:** and enterprises have.

[40:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2459s) **Presenter:** Here is an example.

[41:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2460s) **Presenter:** So we find in many cases

[41:02](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2462s) **Presenter:** that people create these sort of automations

[41:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2465s) **Presenter:** that move, for example, corporate email

[41:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2467s) **Presenter:** outside of the corporate

[41:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2469s) **Presenter:** Gmail account. And they do this by simply copying the content of the email rather than forwarding

[41:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2475s) **Presenter:** the email. So forwarding the email is in most cases not allowed to personal account, but copying

[41:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2482s) **Presenter:** the content is much more difficult to detect. And of course, this is one example, but it's far more

[41:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2489s) **Presenter:** than just email. There are many examples where there's an opportunity to move data outside of

[41:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2496s) **Presenter:** the organization by copying the content.

[41:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2505s) **Presenter:** Another thing to worry about is that these kinds of applications,

[41:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2509s) **Presenter:** of course, have access to business critical data.

[41:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2511s) **Presenter:** They can just be used to do malicious operations.

[41:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2515s) **Presenter:** And so this example, for example, this one is an example of ransomware.

[42:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2520s) **Presenter:** So essentially going through a SharePoint and encrypting that SharePoint.

[42:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2526s) **Presenter:** usage, right? This is not something that somebody in the enterprise would just do, but this is what

[42:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2530s) **Presenter:** security teams need to worry about and need to be able to catch. And so we can try and find

### Additional Risks & Mitigations — Part 2

[42:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2537s) **Presenter:** ways in which they are able to spot this kind of problem. Here's another problem.

[42:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2545s) **Presenter:** In many cases, local, no-code applications plug into the rest of the enterprise. It could be SaaS,

[42:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2550s) **Presenter:** it could be on-prem. Now, when you do this, when you perform these connections, you need to have,

[42:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2556s) **Presenter:** choices. Those choices sometimes include information about the type of authentication

[42:42](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2562s) **Presenter:** that you would do with the different data sources. Here's an example. Many of the platforms allow

[42:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2569s) **Presenter:** you some sort of a connection to an FTP server, so a file sharing server. This is great, but most

[42:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2577s) **Presenter:** of them offer two types of connections, FTP and FTPS. Now, from the security perspective, the S

[43:02](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2582s) **Presenter:** stands for secure. So if you're using

[43:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2584s) **Presenter:** FTP rather than FTPS, the entire

[43:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2586s) **Presenter:** communication is plain text,

[43:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2588s) **Presenter:** which means everybody that listens to

[43:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2590s) **Presenter:** the wire can actually, that is listening

[43:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2592s) **Presenter:** to your network can view the information

[43:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2594s) **Presenter:** that is going there. But this is

[43:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2596s) **Presenter:** not something that we can expect, especially

[43:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2598s) **Presenter:** not from business users. This is not really

[43:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2600s) **Presenter:** part of the

[43:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2602s) **Presenter:** this is not really reasonable

### Recap & Takeaways

[43:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2604s) **Presenter:** expectations to have.

[43:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2606s) **Presenter:** And so the main point here

[43:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2608s) **Presenter:** is that when you create connections, it's

[43:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2610s) **Presenter:** really important to figure out

[43:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2612s) **Presenter:** that you're making the right choices.

[43:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2614s) **Presenter:** And if you're not sure,

[43:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2617s) **Presenter:** reach out to somebody that can help you make those choices.

[43:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2621s) **Presenter:** In many cases, these details look like very minute details.

[43:46](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2626s) **Presenter:** Like here, it's not really clear that if you click on FTP,

[43:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2630s) **Presenter:** it will be very dangerous,

[43:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2634s) **Presenter:** but it is still very dangerous.

[43:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2639s) **Presenter:** Here's another example, misconfiguration.

[44:02](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2642s) **Presenter:** This is something that we see across the industry.

[44:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2645s) **Presenter:** We've seen this with public cloud again and again.

[44:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2647s) **Presenter:** But essentially, in many cases, there are security features that are put out there to protect applications.

[44:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2655s) **Presenter:** But you need to make sure that you're using them.

[44:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2659s) **Presenter:** Adversely, there are features that make sense in some contexts.

[44:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2664s) **Presenter:** So, for example, having an application where anonymous users can access the application or can access the API of the application makes sense.

[44:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2672s) **Presenter:** a web application where everybody can just view the application and perhaps sign up.

[44:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2676s) **Presenter:** But of course, it depends on what kind of information you're exposing to those users.

[44:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2681s) **Presenter:** So let's see how this can go wrong.

[44:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2684s) **Presenter:** You'll recognize this from the slide I had earlier.

[44:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2687s) **Presenter:** This is from the issue that Microsoft had about a year ago, where basically the default

[44:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2693s) **Presenter:** setting for the API that is exposed by one of their low-code applications, a type of

[44:58](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2698s) **Presenter:** local application, had it so that anonymous users were able to access the API and fetch

[45:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2704s) **Presenter:** all of the data behind it.

[45:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2705s) **Presenter:** Let's see how it worked.

[45:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2707s) **Presenter:** So there's API access.

[45:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2710s) **Presenter:** This API access allows you to access information that is behind that application.

[45:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2717s) **Presenter:** And you can see that the portal, the actual URL for that application is almost kind of

[45:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2724s) **Presenter:** the same.

[45:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2724s) **Presenter:** So there's always this domain, the powerappsperl.com,

[45:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2729s) **Presenter:** and the subdomain belongs to the customer,

[45:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2731s) **Presenter:** so it differs by the customer.

[45:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2733s) **Presenter:** And the API endpoint was always on the same address,

[45:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2736s) **Presenter:** so with the underscore data.

[45:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2738s) **Presenter:** That means that from a hacker's perspective,

[45:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2741s) **Presenter:** it's very easy to iterate through those domains.

[45:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2745s) **Presenter:** So those subdomains will just figure out all of the websites

[45:48](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2748s) **Presenter:** that are behind this endpoint and fetch their data.

[45:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2751s) **Presenter:** Let's see an example of how this looks like.

[45:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2754s) **Presenter:** So when you go into that endpoint, you'll get this particular response.

[46:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2761s) **Presenter:** And you can see that from the response that I have the ability, again, I'm not signed in here.

[46:06](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2766s) **Presenter:** I have the ability to view three separate entities.

[46:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2769s) **Presenter:** One is the default.

[46:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2770s) **Presenter:** It really has nothing.

[46:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2772s) **Presenter:** The other one is the entity form set.

[46:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2774s) **Presenter:** That's basically the Power Platform's way to save responses to forms.

[46:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2780s) **Presenter:** And so, again, it's not really interesting.

[46:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2781s) **Presenter:** but there's also this global variable entity here.

[46:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2785s) **Presenter:** Let's see what's inside.

[46:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2789s) **Presenter:** So inside, we are hard-coded access keys to Azure, Microsoft's cloud.

[46:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2793s) **Presenter:** And this is actually a real example from a large financial company,

[46:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2799s) **Presenter:** which we found kind of just by browsing online, looking for these problems,

[46:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2805s) **Presenter:** and then, of course, notifying the customers that have these issues.

[46:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2809s) **Presenter:** This was already mitigated.

[46:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2811s) **Presenter:** So you can see the problem here, of course.

[46:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2814s) **Presenter:** And also you can see how this problem could occur,

[46:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2816s) **Presenter:** but actually this is kind of,

[46:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2819s) **Presenter:** this is very common that you can get these configurations wrong.

[47:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2825s) **Presenter:** Another risk I like to point out is injection handling.

[47:10](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2830s) **Presenter:** You really need to make sure

[47:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2832s) **Presenter:** when you create any sort of query to database,

[47:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2835s) **Presenter:** any sort of parsing of user input,

[47:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2837s) **Presenter:** that this user input is sanitized.

[47:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2839s) **Presenter:** This is not only true for low code,

[47:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2841s) **Presenter:** logbook as well. It's not enough to trust your vendor to verify that the text fields have been

[47:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2848s) **Presenter:** sanitized because it's important to know where this information is going. So if you're plugging

[47:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2853s) **Presenter:** in queries from users and you're using them directly on a database, that's very dangerous.

[47:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2859s) **Presenter:** And I really encourage you to talk with your security teams.

[47:45](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2865s) **Presenter:** the next risk that we that we typically see is uh is is just components so you could be plugging in

[47:52](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2872s) **Presenter:** we just form a marketplace you could be taking open source projects uh you could be uh using

[47:58](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2878s) **Presenter:** all sorts of third party connectors those have a risk of uh being vulnerable or potentially

[48:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2885s) **Presenter:** malicious and so security teams are investing a lot in categorizing these finding where uh where

[48:13](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2893s) **Presenter:** potentially unmanaged components lie.

[48:16](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2896s) **Presenter:** It's very important to have...

[48:18](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2898s) **Presenter:** So the problem here is basically lack of visibility

[48:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2900s) **Presenter:** into the kinds of components that you're using.

[48:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2903s) **Presenter:** And it's very important to make sure

[48:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2905s) **Presenter:** that you're using components

[48:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2906s) **Presenter:** from a certified place that are trusted.

[48:31](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2911s) **Presenter:** The next one is about just handling of data.

[48:35](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2915s) **Presenter:** So let me give you a specific example.

[48:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2919s) **Presenter:** In one of the organizations that I worked with

[48:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2923s) **Presenter:** company, the HR team created a giveaway campaign where essentially you can donate money to charity

[48:50](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2930s) **Presenter:** and the enterprise would kind of put a dollar on every dollar that you spend.

[48:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2935s) **Presenter:** This is a very cool cause.

[48:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2936s) **Presenter:** And so they created an application that allowed employees to plug in their credit card, write

[49:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2943s) **Presenter:** the name of where they want to donate their money and how much money they want to donate.

[49:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2949s) **Presenter:** The credit cards, along with the user information, were stored in text in a database that was available to the entire organization.

[49:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2959s) **Presenter:** Now, I don't think it's fair to expect people from the HR team to know how to store credit cards.

[49:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2966s) **Presenter:** But that's exactly the problem here.

[49:28](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2968s) **Presenter:** I mean, in one case, it's really cool that the HR team was able to do this.

[49:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2972s) **Presenter:** But of course, there's a large security risk.

[49:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2974s) **Presenter:** So, of course, any data that is sensitive, secrets, potentially information, personal information, personal identifiable information, finance information, those should all be managed properly.

[49:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2991s) **Presenter:** And so bear with me.

[49:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2993s) **Presenter:** We only have a couple of two here left.

[49:55](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2995s) **Presenter:** But so let's see.

[49:57](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2997s) **Presenter:** Let's see the next one.

[49:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=2999s) **Presenter:** One of the things that is critical about low-code is that there's just a whole lot of applications.

### Q&A Session

[50:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3005s) **Presenter:** So it's easier to create applications.

[50:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3008s) **Presenter:** It's easier to maintain them.

[50:09](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3009s) **Presenter:** And many more people can create them.

[50:11](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3011s) **Presenter:** So, of course, you end up with lots of applications, right?

[50:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3015s) **Presenter:** The problem is that some of these applications that are built specifically by citizen developers can become very popular.

[50:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3021s) **Presenter:** And when they do, it's a really good point to get somebody from IT involved so they can be monitored.

[50:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3026s) **Presenter:** So if somebody leaves the organization, then somebody else would pick up the ownership of that application.

[50:33](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3033s) **Presenter:** And in many cases, we see lots of low-code, no-code applications that are still there are still used by abandoned by their creator because they moved to another role or maybe to a company.

[50:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3044s) **Presenter:** So this is, again, another area of concern.

[50:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3047s) **Presenter:** And the last one that I'm going to stress out is simply logging and monitoring.

[50:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3051s) **Presenter:** So just figuring out what's happening within those applications, who's using those applications, who's accessing them, and making sure that these logs are sufficient.

[51:01](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3061s) **Presenter:** In many cases, this is kind of blocking.

[51:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3064s) **Presenter:** And so I want to leave some time for questions.

[51:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3068s) **Presenter:** So let's stop here, and we'll do a very quick recap of what we've seen so far and go to questions.

[51:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3079s) **Presenter:** so we've seen that low-code no-code is rapidly growing within the enterprise

[51:23](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3083s) **Presenter:** and it's actually already in most of the large enterprise out there there's also a shift to

[51:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3090s) **Presenter:** focus on business users alongside enabling professional developers application developer

[51:37](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3097s) **Presenter:** application security teams are a concern to the growth that might be inhibiting growth

[51:43](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3103s) **Presenter:** But if you do it correctly and you have the conversation with the security team and you help them cover their needs, security can be a driver for low-code, no-code adoption.

[51:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3113s) **Presenter:** And that would be really empowering and allow the enterprise to move forward with low-code, no-code because it could be a more secure way to build applications.

[52:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3123s) **Presenter:** And lastly, we saw the top 10 risks for low-code, no-code security.

[52:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3127s) **Presenter:** There's a whole bunch of information out there in the web about this project, a lot more than just what I've shared today.

[52:14](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3134s) **Presenter:** And please, we are always looking for collaborators, so reach out.

[52:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3139s) **Presenter:** There's a lot of opportunity, so thank you very much.

[52:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3145s) **Presenter:** Thank you, Michael. That was great. Really appreciate your presentation today.

[52:30](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3150s) **Presenter:** There are a few questions that have come up.

[52:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3152s) **Presenter:** The first one is, can we rely on presentation tests to ensure security?

[52:38](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3158s) **Presenter:** Sure. So I'm guessing this refers to penetration testing.

[52:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3161s) **Presenter:** Penetration test, yes.

[52:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3164s) **Presenter:** So unfortunately, my answer, so my opinion is no.

[52:49](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3169s) **Presenter:** And let me tell you why.

[52:51](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3171s) **Presenter:** Penetration testing is really important.

[52:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3173s) **Presenter:** It helps you identify cases where the application might be exposing a vulnerability.

[52:59](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3179s) **Presenter:** The problem is that most modern penetration tests,

[53:03](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3183s) **Presenter:** they do not treat low-code, no-code applications separately

[53:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3188s) **Presenter:** or in a different way than they would a pro-code application.

[53:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3192s) **Presenter:** And then many of the underlying,

[53:15](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3195s) **Presenter:** many of the problems that you'll find are not actual problems

[53:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3197s) **Presenter:** because they are not part of your responsibility.

[53:19](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3199s) **Presenter:** You won't know anything.

[53:20](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3200s) **Presenter:** You won't know what to do with them.

[53:22](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3202s) **Presenter:** They're part of the platform itself.

[53:24](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3204s) **Presenter:** And there might be some controls that are preventing the issue.

[53:29](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3209s) **Presenter:** recommendation would be if you're aiming for penetration tests to help you with security of

[53:34](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3214s) **Presenter:** low-code, no-code apps, make sure you're using a vendor that is doing specific tests that are

[53:41](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3221s) **Presenter:** specific for low-code, no-code. That is an expert in the platform where you've built the application.

[53:47](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3227s) **Presenter:** Thank you. Another question has come up. How can business leaders get buy-in from IT and security

[53:53](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3233s) **Presenter:** teams to accelerate low code, no code adoption? So the number one thing, this is a very good

[54:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3240s) **Presenter:** question. The number one thing to do is first of all, to understand their concerns and understand

[54:05](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3245s) **Presenter:** why they might be cautious and then address them. The first thing that they are looking for is to

[54:12](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3252s) **Presenter:** make sure that they are not losing control, that they still will have visibility. They will still

[54:17](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3257s) **Presenter:** be able to govern and to find those cases where they need to intervene.

[54:21](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3261s) **Presenter:** Work with them to make sure that they have visibility into the platforms that you're

[54:26](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3266s) **Presenter:** choosing to develop on.

[54:27](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3267s) **Presenter:** Make sure that they have access to those platforms, that they can use existing capabilities

[54:32](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3272s) **Presenter:** within those platforms or external solutions to gain visibility into those platforms.

[54:39](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3279s) **Presenter:** And most of all, open up the conversation.

[54:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3284s) **Presenter:** Excellent.

[54:44](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3284s) **Presenter:** And then the last question I have right now is with citizen developing applications and being done so rapidly, how can we ensure our environment stays manageable?

[54:56](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3296s) **Presenter:** That's a very, that's a tough question.

[55:00](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3300s) **Presenter:** I don't think that relying on manual processes could help.

[55:04](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3304s) **Presenter:** We've seen the large numbers.

[55:07](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3307s) **Presenter:** Those are pretty much out the window.

[55:08](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3308s) **Presenter:** So my, I mean, the biggest, with organizations that I've been working with, the number one thing that is helping them reduce risk is setup automations, where they identify, where they categorize and identify the crucial risks.

[55:25](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3325s) **Presenter:** And you can use the OS top 10 for that. They identify them and they mitigate them as they become available.

[55:36](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3336s) **Presenter:** Thank you. That's the last of our questions. Michael, I want to thank you for joining us today. I want to thank all the attendees for joining your webinar and for joining Low Code Con 2022. Thank you, everybody. Please look forward to the next session coming up today and three more tomorrow. Thank you for everyone for your time.

[55:54](https://www.youtube.com/watch?v=lgPzDD2TaCE&t=3354s) **Presenter:** Thank you very much.
<!-- talk-enrichment:end -->
