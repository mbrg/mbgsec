---
title: "OWASP AIVSS Project: What it is, why we need it and how we are doing it"
talk_date: 2025-11-07
conference: OWASP Global AppSec USA 2025
presented_by: Michael Bargury, Vineeth Sai Narajala, and Ken Huang
permalink: /talks/2025-11-07-owasp-global-appsec-us-2025-owasp-aivss-project/
layout: deck
schedule_url: https://owaspglobalappsecusa2025.sched.com/event/7121c6e3936dff75425ec558aa8f0eb0
recording_url: https://www.youtube.com/watch?v=Vcg_DjYtQig
description: "Introducing OWASP AIVSS Project: The AI Vulnerability Scoring System for Modern Threats Traditional CVSS frameworks excel at scoring software vulnerabilities but fall short when addressing AI-specific risks like prompt injection, goal manipulation, and…"
abstract_source_url: "https://owaspglobalappsecusa2025.sched.com/event/7121c6e3936dff75425ec558aa8f0eb0"
abstract_retrieved_at: "2026-08-14"
transcript_source_url: "https://www.youtube.com/watch?v=Vcg_DjYtQig"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-mlx"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "dc579d8b48b6dc3a6ee685cf5690b241e8576d1451faef3516bc8b6ada8623e8"
---


<!-- talk-enrichment:start -->
## Abstract

Introducing OWASP AIVSS Project: The AI Vulnerability Scoring System for Modern Threats

Traditional CVSS frameworks excel at scoring software vulnerabilities but fall short when addressing AI-specific risks like prompt injection, goal manipulation, and memory poisoning. The AI Vulnerability Scoring System (AIVSS) extends CVSS to tackle the unique challenges of AI systems, particularly agentic AI deployed in enterprise environments.

This session introduces AIVSS, an OWASP initiative developed by a coalition of security leaders from government, academia, and industry. We'll explore why AI demands new vulnerability assessment approaches, dive into the top 10 agentic AI vulnerabilities, and demonstrate the AIVSS scoring methodology through live examples. Attendees will gain practical insights into assessing AI-specific risks and learn how to contribute to this critical open-source framework that's shaping the future of AI security.

_[Official conference abstract](https://owaspglobalappsecusa2025.sched.com/event/7121c6e3936dff75425ec558aa8f0eb0)_

## Transcript

> AI generated from recording.

### Introduction and Context

[00:02](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=2s) **Presenter:** Welcome to my session. This is a project showcase. We're talking about the AIVSS project, the AI Vulnerability Scoring Project.

[00:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=16s) **Presenter:** project, but I want to put it into more broad scope to kind of argue that why we need AIVSS

[00:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=28s) **Presenter:** project.

[00:29](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=29s) **Presenter:** So I have to put it into the general agentic AI risk management framework.

[00:36](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=36s) **Presenter:** So basically I will cover mostly AIVSS, but also broad a little bit of scope here.

[00:44](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=44s) **Presenter:** A little bit about myself. I currently lead the AIVS project with other co-founders and other co-leaders, which I will introduce later.

[01:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=61s) **Presenter:** I also wrote a few books published by Cambridge University Press, Springer, and China Machine Press, John Wiley, Packet, and the BPB.

### Risk Management Frameworks and Governance

[01:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=77s) **Presenter:** so different than the publisher.

[01:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=80s) **Presenter:** Maybe the most relevant book is this book for today's topic,

[01:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=90s) **Presenter:** Securing AI Agents.

[01:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=91s) **Presenter:** So I just brought one copy here if you're interested in browsing it.

[01:37](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=97s) **Presenter:** Another book potentially will be relevant is Generative AI Security,

[01:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=102s) **Presenter:** which was published last year.

[01:44](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=104s) **Presenter:** and if you want to broaden scope in terms of how agent is used in different business

[01:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=110s) **Presenter:** and what is the workflow and also security, there's a third book.

[01:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=118s) **Presenter:** And the Beyond AI book was quite popular actually.

[02:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=123s) **Presenter:** We have more than 35,000 downloads in Spring website alone.

[02:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=130s) **Presenter:** long. Recently it was translated by

[02:13](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=133s) **Presenter:** Beijing University into Chinese, so I just come back in China

[02:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=137s) **Presenter:** for the book launch of that

[02:21](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=141s) **Presenter:** translated version of that book.

[02:25](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=145s) **Presenter:** But just about myself,

[02:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=150s) **Presenter:** let's actually focus on the project, the AIBS

[02:34](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=154s) **Presenter:** project. Where it sits in terms of

[02:40](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=160s) **Presenter:** framework. I think one of the

[02:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=163s) **Presenter:** very good risk management framework is the

[02:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=167s) **Presenter:** NIST AI

[02:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=170s) **Presenter:** risk management framework. If you

[02:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=175s) **Presenter:** read the document from NIST, it

[02:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=179s) **Presenter:** really have four important phase.

[03:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=184s) **Presenter:** The govern, the map, and the

### Agentic AI: Definitions and Threat Landscape

[03:07](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=187s) **Presenter:** measure and manage. Each one is very

[03:11](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=191s) **Presenter:** descriptive in the NIST

[03:15](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=195s) **Presenter:** document. The idea of the

[03:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=199s) **Presenter:** overall framework, it's not want to be too prescriptive.

[03:24](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=204s) **Presenter:** But if you really want to implement it

[03:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=207s) **Presenter:** in your company, you need the tools.

[03:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=211s) **Presenter:** You need other methodologies.

[03:34](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=214s) **Presenter:** And this is why actually from the OWASP and the Cloud Security Alliance, we try to work on.

[03:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=222s) **Presenter:** And the government piece is really the Cloud Security Alliance organizational responsibility,

[03:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=232s) **Presenter:** has been working since last year, actually since last two years.

[03:57](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=237s) **Presenter:** And we published some white papers.

[04:00](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=240s) **Presenter:** I co-chair this organization.

[04:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=246s) **Presenter:** And for the MAP, we do have the framework to do,

[04:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=252s) **Presenter:** and I will dive a little bit deeper in today's talk.

[04:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=257s) **Presenter:** For measure is really the project that we're talking about,

[04:22](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=262s) **Presenter:** and I will spend the majority of my time talking about the AIVSS project.

[04:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=268s) **Presenter:** and the manager, right, manages how you do it in terms of red teaming and how do you

[04:36](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=276s) **Presenter:** prioritize and implement the controls. So we have the CSA AI control matrix

[04:44](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=284s) **Presenter:** framework. So this is the overall kind of risk management and how AI VSS is fit

[04:51](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=291s) **Presenter:** into this framework.

[04:54](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=294s) **Presenter:** In terms of

[04:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=295s) **Presenter:** government,

[04:57](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=297s) **Presenter:** this is an open source

[04:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=299s) **Presenter:** project. So you can download

[05:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=301s) **Presenter:** from the cloud security

[05:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=303s) **Presenter:** lines.

[05:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=304s) **Presenter:** Just register with email.

[05:07](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=307s) **Presenter:** You can

[05:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=308s) **Presenter:** this is all published last year.

[05:11](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=311s) **Presenter:** One is the core security.

[05:14](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=314s) **Presenter:** We focus on the

[05:15](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=315s) **Presenter:** model security, data security

[05:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=317s) **Presenter:** and

[05:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=319s) **Presenter:** also the

[05:21](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=321s) **Presenter:** other like

[05:24](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=324s) **Presenter:** cultures related to it. But most importantly, we talk about

[05:29](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=329s) **Presenter:** the responsibility

[05:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=333s) **Presenter:** matrix or RACI model and how do you

[05:37](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=337s) **Presenter:** implement the responsibilities. Like if you

[05:41](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=341s) **Presenter:** have AI system, who is responsible? Is this

### The AIVSS Project Overview

[05:44](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=344s) **Presenter:** CAIO responsible or is CISO responsible or CTO?

[05:51](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=351s) **Presenter:** to argue it, it's a team sport, right?

[05:54](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=354s) **Presenter:** So these are three document.

[05:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=356s) **Presenter:** The second document is more from the GRC and culture aspect.

[06:02](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=362s) **Presenter:** And also the last one is really genetic AI,

[06:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=366s) **Presenter:** the applications and the tools.

[06:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=372s) **Presenter:** So since today's focus is more on IVSS,

[06:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=376s) **Presenter:** I will go very quick in terms of government and map.

[06:21](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=381s) **Presenter:** really is trying to deal with the identification or mapping of the threat

[06:32](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=392s) **Presenter:** if you want to develop your agentic AI applications what are potential threat

[06:39](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=399s) **Presenter:** you are facing right and how do you deal with it you can use in traditional

[06:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=407s) **Presenter:** select modeling framework, things like Strata, right,

[06:53](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=413s) **Presenter:** Pasta, there's lots of good framework.

[06:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=415s) **Presenter:** You still can leverage it.

[06:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=418s) **Presenter:** We argue that this is not enough,

[07:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=421s) **Presenter:** because those framework usually are used

[07:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=424s) **Presenter:** for the traditional deterministic coding, right,

[07:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=432s) **Presenter:** or configurations, those kind of computational framework,

[07:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=437s) **Presenter:** So we need to deal with the non-deterministic nature of agentic AI or generative AI.

[07:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=448s) **Presenter:** And also, agentic AI must have a little bit of autonomy.

[07:34](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=454s) **Presenter:** If you don't have autonomy, it's not agent, right?

[07:38](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=458s) **Presenter:** You may not have full autonomy, but autonomy can introduce risks, additional risks.

[07:48](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=468s) **Presenter:** It's a way called the risk amplification factor.

[07:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=472s) **Presenter:** So risk itself, like autonomy, is not a vulnerability.

[07:57](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=477s) **Presenter:** So if we really want to use a vulnerability scoring system, we cannot say autonomy is a vulnerability.

[08:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=485s) **Presenter:** autonomy is a risk amplification because for agent.

[08:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=490s) **Presenter:** So this is what we try to do.

[08:14](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=494s) **Presenter:** And also we try to threat modeling it, right?

[08:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=496s) **Presenter:** And in traditional threat modeling, like, you can have a boundary,

[08:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=500s) **Presenter:** like this is my trust boundary with threat model within it.

[08:24](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=504s) **Presenter:** We're using data flow diagram.

[08:26](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=506s) **Presenter:** This all good.

[08:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=507s) **Presenter:** You're using iris risk threat model, all this good tool.

[08:32](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=512s) **Presenter:** You can use it, right?

[08:35](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=515s) **Presenter:** But with agentic AI, you really should not assume the transfer modeling.

[08:41](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=521s) **Presenter:** You can have an agent in one platform to talk another cloud platform from AWS to GPC to Azure, right, using Google A2A.

[08:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=536s) **Presenter:** So you have to select model it as well.

[09:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=541s) **Presenter:** Also, we actually published the agent identity approach document.

[09:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=548s) **Presenter:** It is a cloud security alliance.

[09:11](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=551s) **Presenter:** And also, in the OWASP, we also have the current working on the agent AI top ten.

[09:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=560s) **Presenter:** It's also located as an identity piece.

[09:24](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=564s) **Presenter:** and I'm the entry leader for the identity impersonation and control,

[09:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=570s) **Presenter:** but we cannot really assume the static identity that you defined in the deployment time,

[09:38](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=578s) **Presenter:** meaning that you can specify the policy during deployment time.

[09:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=583s) **Presenter:** That's not sufficient.

[09:44](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=584s) **Presenter:** With agent AI, you need the identity to be ephemeral and dynamic assigned with the identity,

[09:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=598s) **Presenter:** and also using dynamic policy based on the task.

[10:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=603s) **Presenter:** So it's task-based, because otherwise agent will be limited.

[10:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=610s) **Presenter:** Then it's not really agent.

[10:14](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=614s) **Presenter:** really want to have it to have autonomy, you certainly need to give it the privilege it

### Scoring Methodology and Tooling

[10:24](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=624s) **Presenter:** needs to finish the task. And this cannot really be solved by traditional

[10:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=631s) **Presenter:** simul-assertion or OWASP scope. So there is a lot of effort, including Cloud

[10:40](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=640s) **Presenter:** or the security allies or WASP is trying to define

[10:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=643s) **Presenter:** what the new identity framework

[10:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=647s) **Presenter:** or access management framework is, right?

[10:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=650s) **Presenter:** And how do you actually measure this kind of risk

[10:54](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=654s) **Presenter:** and mapping it?

[10:57](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=657s) **Presenter:** As the multiple agent communication is another one.

[11:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=661s) **Presenter:** For the agent A is not doing good, it's a luck agent.

[11:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=666s) **Presenter:** it can impact the whole multiple agent system.

[11:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=670s) **Presenter:** It seems the multiple agent system is the way to go, right?

[11:14](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=674s) **Presenter:** Single agent system has limited use.

[11:18](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=678s) **Presenter:** If you ask it to do too much things, it breaks down.

[11:21](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=681s) **Presenter:** So multiple agent system, based on lots of research, is the way to go.

[11:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=688s) **Presenter:** But it increases the complexity.

[11:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=691s) **Presenter:** How do you measure mapping those kinds of risks?

[11:36](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=696s) **Presenter:** Maestro Framework, if we have time, there's a demo video I will

[11:40](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=700s) **Presenter:** play, but let's actually focus on the

[11:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=703s) **Presenter:** AI VSS project. So what is

[11:48](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=708s) **Presenter:** AI VSS? The AI Volatility Scoring System.

[11:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=712s) **Presenter:** Our initial focus is on the agentic AI.

[11:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=716s) **Presenter:** Since we talk with lots of our

[12:00](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=720s) **Presenter:** customers and open source communities, agentic AI

[12:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=723s) **Presenter:** AI is on the top of their mind?

[12:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=726s) **Presenter:** And how do you measure the risk?

[12:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=730s) **Presenter:** Because if you cannot measure it,

[12:14](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=734s) **Presenter:** it's very hard to manage it,

[12:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=736s) **Presenter:** close to impossible to manage it, right?

[12:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=740s) **Presenter:** Firstly, you have to measure.

[12:21](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=741s) **Presenter:** So what can be the measurement framework?

[12:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=748s) **Presenter:** It's hard.

[12:29](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=749s) **Presenter:** We're trying to do it.

[12:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=750s) **Presenter:** And we're trying to leverage CVSS.

[12:34](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=754s) **Presenter:** Actually, our initial framework is based on the Common Vulnerability Scoring System, or CVSS, right?

[12:46](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=766s) **Presenter:** And there is debate when we try to do within our participant, like funding members and lots of contributors.

[12:57](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=777s) **Presenter:** There's some debate if we can leverage it, because CVSS is really focused on vulnerabilities,

[13:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=783s) **Presenter:** and those are deterministic code, right?

[13:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=788s) **Presenter:** And how can we extend it to support a dynamic, non-deterministic agent vulnerability or risk?

[13:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=799s) **Presenter:** So we have to actually think more on the risk, less on the vulnerability, right?

[13:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=807s) **Presenter:** So this is a consensus I think eventually we reach. Like there is a vulnerability

[13:35](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=815s) **Presenter:** we still need to think a little bit, but we leverage it. But mostly we should talk

[13:41](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=821s) **Presenter:** about the risk. This is actually not in the CVSS community, the first community.

[13:49](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=829s) **Presenter:** not want to talk about risk, right?

[13:51](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=831s) **Presenter:** They focus on vulnerability.

[13:53](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=833s) **Presenter:** So there's a lot of work for us, actually.

[13:57](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=837s) **Presenter:** But we do have our approach, and we published the version 0.5

[14:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=844s) **Presenter:** a few months ago.

[14:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=845s) **Presenter:** Get lots of good feedback.

[14:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=848s) **Presenter:** And we're trying to work on the version 1 about this.

[14:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=852s) **Presenter:** So we have the version 1 is under review now.

### Community Collaboration and Contributions

[14:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=859s) **Presenter:** I will share the document, so everyone just reach out to me through LinkedIn.

[14:25](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=865s) **Presenter:** I will have LinkedIn.

[14:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=867s) **Presenter:** I will share the document with you.

[14:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=870s) **Presenter:** Yeah, we have many people participate.

[14:32](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=872s) **Presenter:** So our goal is to have this published March next year.

[14:39](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=879s) **Presenter:** So you still have time to contribute.

[14:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=883s) **Presenter:** So we try to publish it at the ISA conference.

[14:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=887s) **Presenter:** And yeah, you can visit our website,

[14:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=892s) **Presenter:** aivss.owasp.org, and we have the GitHub.

[14:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=896s) **Presenter:** But the most important thing we're currently working on

[15:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=901s) **Presenter:** is the document there in the Google Doc.

[15:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=905s) **Presenter:** So there's a kind of instruction for how you can contribute.

[15:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=910s) **Presenter:** We do have a lot of people already contributing.

[15:13](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=913s) **Presenter:** So people from the NIST, right, from Entropic and different banks,

[15:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=928s) **Presenter:** pharmaceutical companies, open source community, they all contribute.

[15:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=933s) **Presenter:** And some top AI companies also, they contribute.

[15:37](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=937s) **Presenter:** So we hope this will be useful.

[15:39](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=939s) **Presenter:** The key idea is we're trying to make it simple enough, but still it can cover the actual

[15:48](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=948s) **Presenter:** agent AI deployment.

[15:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=950s) **Presenter:** And we will provide the tool so it will be useful.

[15:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=955s) **Presenter:** We do have some initial tool already developed by the member of our community, right?

[16:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=963s) **Presenter:** It's in the demo, so the last one.

[16:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=965s) **Presenter:** one, he implemented the demo tool for us.

[16:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=972s) **Presenter:** And we also have the slack, but the majority of the contribution

[16:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=977s) **Presenter:** is in the document.

[16:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=980s) **Presenter:** So yeah, we have the support.

[16:22](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=982s) **Presenter:** We have the, in June, we have the kickoff meeting.

[16:29](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=989s) **Presenter:** So Rob Joyce, who is the former cybersecurity director at NSA,

[16:35](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=995s) **Presenter:** special assistant to Whitehorse, advisor to OpenAI and the PwC. He gave us the

[16:45](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1005s) **Presenter:** support and also his idea of how we should run our project, so really thanks

[16:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1012s) **Presenter:** to Locke. Castling from the TAPA and also contributed his opening remarks.

[17:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1021s) **Presenter:** Jackson, Clinton, Apostolo, Vasilev, they also contribute.

[17:07](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1027s) **Presenter:** So they are the huge support for our project.

[17:13](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1033s) **Presenter:** So this project is co-lead by myself, Michael, from Zenite.

[17:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1039s) **Presenter:** People may know Zenite is a huge agent.

[17:23](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1043s) **Presenter:** I have to call out Kyla is also in the audience.

[17:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1048s) **Presenter:** Yes, so huge support on this.

[17:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1051s) **Presenter:** Also the leader of top 10 for the citizen development

[17:36](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1056s) **Presenter:** framework, right?

[17:37](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1057s) **Presenter:** So thank you very much.

[17:40](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1060s) **Presenter:** And Venice is contribute a lot from the AWS,

[17:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1067s) **Presenter:** currently in MEDA.

[17:49](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1069s) **Presenter:** Bhavia from the ISO office in the Stanford University.

[17:54](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1074s) **Presenter:** So we co-lead this project.

[17:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1076s) **Presenter:** Of course, we need a lot of support.

[17:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1079s) **Presenter:** So those are founding members.

[18:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1081s) **Presenter:** We have more actually coming since we kick off.

[18:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1085s) **Presenter:** So you can see people from different companies, even from Gartner.

[18:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1092s) **Presenter:** They all contribute and support us.

[18:17](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1097s) **Presenter:** Yeah, so I think I talked a little bit about what and why already.

### Future Directions and Call to Action — Part 1

[18:23](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1103s) **Presenter:** but here is the tool you can use and here's again like to reiterate why we need AIVSS.

[18:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1113s) **Presenter:** We cannot manage risk if we cannot measure it, right? Otherwise, how do you know which risk to

[18:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1122s) **Presenter:** manage it? How do you know if you manage it, right? And we have the agentic factor such as autonomy,

[18:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1130s) **Presenter:** non-determinism, and agent can use tool.

[18:54](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1134s) **Presenter:** MCP server is in wide use.

[18:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1138s) **Presenter:** I think it's now becoming mainstream.

[19:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1141s) **Presenter:** Many people, if they develop agent AI applications,

[19:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1146s) **Presenter:** they use the MCP server.

[19:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1148s) **Presenter:** MCP server expose what?

[19:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1150s) **Presenter:** Expose tools.

[19:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1152s) **Presenter:** So tool could be misused.

[19:15](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1155s) **Presenter:** I will give some example in the next slide.

[19:18](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1158s) **Presenter:** but tool can be misused. It's all this also memory, right? Agent can use memory.

[19:25](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1165s) **Presenter:** So maybe a little bit step back, what is agent? Agent, AI or agent, there's no

[19:34](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1174s) **Presenter:** kind of official definition yet for good reason because it's still rapidly

[19:40](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1180s) **Presenter:** involved field, right? But I think from the industry we do have kind of a

[19:46](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1186s) **Presenter:** consensus of what the agent is. It has a certain level

[19:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1190s) **Presenter:** of autonomy. It's based on the language models.

[19:54](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1194s) **Presenter:** It uses the tools and also has

[19:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1198s) **Presenter:** access to the memory. The memory is really

[20:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1201s) **Presenter:** to have short-term memory

[20:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1204s) **Presenter:** in the real use or you can have persistent

[20:09](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1209s) **Presenter:** long-term memory. You have the context. It's also

[20:13](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1213s) **Presenter:** agent is goal-oriented. So you give a task, it has a goal, it will do what the

[20:21](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1221s) **Presenter:** task is asked for. So this is one reason you need to also give it a good

[20:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1227s) **Presenter:** appropriate level of identity so it can do the task. You should not limit it

[20:35](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1235s) **Presenter:** too much and give it too much. You cannot say, okay, you are the HR agent.

[20:41](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1241s) **Presenter:** Your goal is to scan the resume and find the good candidate to give a call using 11 labs to give a call to the candidate.

[20:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1256s) **Presenter:** And then you give all the HR identity or privilege to this agent.

[21:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1264s) **Presenter:** That's too much.

[21:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1265s) **Presenter:** You can only give it the access to the resume database and the email or maybe the phone call.

[21:15](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1275s) **Presenter:** You cannot give access to the cellular database or the performance review database.

[21:23](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1283s) **Presenter:** So this is the idea.

[21:28](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1288s) **Presenter:** Yeah, so the key idea is we still can leverage CVSS.

[21:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1293s) **Presenter:** So we should not really get rid of it.

[21:35](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1295s) **Presenter:** Actually, CVS is like all the major security tools,

[21:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1302s) **Presenter:** like Quora, Snyk, you name it, right?

[21:46](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1306s) **Presenter:** And we still need to leverage it.

[21:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1310s) **Presenter:** This is why we leverage the CVS version 4.

[21:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1315s) **Presenter:** So when AIVS project start, we actually leverage v3.5.

[22:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1321s) **Presenter:** and we'll review it.

[22:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1326s) **Presenter:** We think that V4, which is a vector-based matrix, is better.

[22:13](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1333s) **Presenter:** So we actually upgrade as well.

[22:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1336s) **Presenter:** But this is still a starting point.

[22:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1339s) **Presenter:** And this is more for the quantitative measurement.

[22:23](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1343s) **Presenter:** Maybe it's not enough, right?

[22:25](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1345s) **Presenter:** So there's another approach is called the SSVC or stakeholders.

[22:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1353s) **Presenter:** This is more for qualitative approach.

[22:36](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1356s) **Presenter:** So we do have a simple kind of draft for that.

[22:39](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1359s) **Presenter:** Like if you look at the link of the document, we do have that link there.

[22:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1367s) **Presenter:** So we provide two documents.

[22:51](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1371s) **Presenter:** One is a qualitative using the CVSS as the base for the scoring.

[22:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1379s) **Presenter:** Another is really decision-based, qualitative.

[23:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1383s) **Presenter:** So this is something exciting, I think.

[23:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1388s) **Presenter:** We have a lot of support doing it, and hopefully we can cover the majority of this.

[23:15](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1395s) **Presenter:** So this is the whole, over the last, actually this project, AIVSS project started in June,

[23:22](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1402s) **Presenter:** but the whole preparation work done is a year ago, even long, right?

[23:29](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1409s) **Presenter:** So there's a colossal industrial effort in terms of coming up with some core risks, right?

[23:36](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1416s) **Presenter:** We're still working on the agentic AI top 10, but it's happened to be we also have 10 risks here

[23:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1423s) **Presenter:** here from the agent AI tool misuse to the goal manipulation

[23:51](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1431s) **Presenter:** or instruction manipulation.

[23:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1436s) **Presenter:** So in our document, we actually try

[23:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1438s) **Presenter:** to measure each of those risks given

[24:02](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1442s) **Presenter:** the sum of implication factors.

[24:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1446s) **Presenter:** If you look at this document, we also

[24:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1448s) **Presenter:** have ten amplification factor like autonomy or tool use all this right so

[24:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1456s) **Presenter:** that make it very complex maybe there's a reason for that so we're still

[24:24](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1464s) **Presenter:** debating right but those are the core risk that I think there's industry

[24:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1471s) **Presenter:** consensus that we need to measure it and so we can manage it right just example

[24:38](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1478s) **Presenter:** misuse, what we look at like in the tool selection, when you select a tool,

[24:46](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1486s) **Presenter:** there should be some risk in it. Like it could be the tool selection attack,

[24:53](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1493s) **Presenter:** like impersonation, right? Or you need to discover the MCP server, that could be

[25:00](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1500s) **Presenter:** hacked and it give you some tool which is not good, right? So the tool selection

[25:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1508s) **Presenter:** could be. And also the insecure tool usage.

[25:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1512s) **Presenter:** After you discover, even this is a good tool,

[25:18](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1518s) **Presenter:** maybe tool itself is

### Future Directions and Call to Action — Part 2

[25:22](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1522s) **Presenter:** not very well protected, although it will do the work that you need

[25:26](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1526s) **Presenter:** to ask it to do. But it can have a command injection,

[25:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1531s) **Presenter:** SQL injection, and

[25:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1533s) **Presenter:** and other kind of potential risk from the tool,

[25:38](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1538s) **Presenter:** including the misinterpretation.

[25:43](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1543s) **Presenter:** And also there could be the tool governance.

[25:46](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1546s) **Presenter:** You need to govern the tool, right?

[25:48](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1548s) **Presenter:** And how do you govern it?

[25:50](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1550s) **Presenter:** So this is one issue that we need to talk about.

[25:56](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1556s) **Presenter:** Select for goal manipulation.

[25:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1559s) **Presenter:** If you look at my sub stack,

[26:00](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1560s) **Presenter:** I actually get very deep into all this.

[26:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1565s) **Presenter:** Yeah, you go to my LinkedIn.

[26:07](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1567s) **Presenter:** I think I have the sub-stack shared there.

[26:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1570s) **Presenter:** There's like if you're using Crescendo attack.

[26:15](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1575s) **Presenter:** Crescendo attack is meaning it's, I think it's invented by Microsoft.

[26:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1580s) **Presenter:** It's gradually kind of ask the agent to do something that it should not to do, right?

[26:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1590s) **Presenter:** it will have gradual gold drift.

[26:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1593s) **Presenter:** For example, you ask it to lock the port.

[26:38](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1598s) **Presenter:** It will not lock the port.

[26:40](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1600s) **Presenter:** It actually opens more ports.

[26:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1602s) **Presenter:** If you are smart enough, you're using crescendo attack.

[26:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1607s) **Presenter:** Malicious gold expansion, it will do the work that you ask it to do,

[26:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1612s) **Presenter:** but in addition, it will do something else

[26:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1615s) **Presenter:** which could expose some risk, right,

[27:00](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1620s) **Presenter:** or maybe disclose some information that is secret.

[27:05](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1625s) **Presenter:** And the goal exhaustion loop is really,

[27:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1628s) **Presenter:** it will just stick on the same thing, endless, right?

[27:14](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1634s) **Presenter:** Without completion.

[27:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1636s) **Presenter:** So we totally have top 10 all here,

[27:18](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1638s) **Presenter:** and this example, you can take a look.

[27:22](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1642s) **Presenter:** But we only have five minutes, I speed up a little bit,

[27:25](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1645s) **Presenter:** so I can leave some minutes for the questions.

[27:31](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1651s) **Presenter:** Yeah, so call for action.

[27:34](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1654s) **Presenter:** We plan to have this document published before the ISA conference,

[27:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1662s) **Presenter:** March 23rd, I think.

[27:45](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1665s) **Presenter:** And, yeah, you can visit our website and register to contribute.

[27:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1672s) **Presenter:** So that's a call for action.

[27:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1675s) **Presenter:** But remember, we have the risk management framework.

[27:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1679s) **Presenter:** We have the govern.

[28:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1681s) **Presenter:** We have the map.

[28:02](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1682s) **Presenter:** We have measure.

[28:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1683s) **Presenter:** Then we have manage.

[28:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1684s) **Presenter:** So manage is really, we have the agent AI red teaming guide,

[28:10](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1690s) **Presenter:** which was published a few months ago.

[28:13](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1693s) **Presenter:** And we have the tool also there.

[28:19](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1699s) **Presenter:** So also the AI control matrix, recently published as well,

[28:23](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1703s) **Presenter:** for the manager side of it.

[28:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1707s) **Presenter:** Yeah, so this demo actually also has a code repository.

[28:33](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1713s) **Presenter:** It is a Cloud Secular Alliance for using tool.

[28:37](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1717s) **Presenter:** You can use this tool for free,

[28:39](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1719s) **Presenter:** just plugging your own API, right?

[28:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1722s) **Presenter:** So if you do your applications,

[28:44](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1724s) **Presenter:** you can just do the threat modeling here.

[28:47](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1727s) **Presenter:** I don't think we have time for the demo,

[28:51](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1731s) **Presenter:** but you click the link here, it will show you the demo.

[28:58](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1738s) **Presenter:** So, Red Teaming Tool, yeah, this you can take a look

[29:01](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1741s) **Presenter:** at the Red Teaming Tool demo and also code the repo.

[29:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1744s) **Presenter:** You are welcome to extend it.

[29:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1748s) **Presenter:** With that, I think the key takeaway from today

[29:12](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1752s) **Presenter:** is agentic AI certainly is here,

[29:16](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1756s) **Presenter:** and it may take 10 years to play this out

[29:20](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1760s) **Presenter:** and it presents the risk that is not before with code,

[29:27](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1767s) **Presenter:** deterministic coding, right?

[29:30](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1770s) **Presenter:** It's really a behavior of semantic risk that we're facing.

[29:35](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1775s) **Presenter:** We do need a new risk management approach

[29:38](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1778s) **Presenter:** and those tools, we list the tools,

[29:42](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1782s) **Presenter:** including the CSA tools, right?

[29:46](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1786s) **Presenter:** and also the other tools here, Maestro and AIVSS.

[29:52](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1792s) **Presenter:** So you can, yeah.

[29:55](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1795s) **Presenter:** So I see that we're already done with time,

[29:59](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1799s) **Presenter:** so maybe you can ask me questions later.

[30:03](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1803s) **Presenter:** How about that?

[30:04](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1804s) **Presenter:** Yeah, just scan.

[30:06](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1806s) **Presenter:** Yeah, take care.

[30:07](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1807s) **Presenter:** Cool, thank you.

[30:08](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1808s) **Presenter:** Thank you.

[30:09](https://www.youtube.com/watch?v=Vcg_DjYtQig&t=1809s) **Presenter:** Thank you.
<!-- talk-enrichment:end -->
