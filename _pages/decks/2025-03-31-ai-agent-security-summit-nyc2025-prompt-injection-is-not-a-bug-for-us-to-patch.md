---
title: "Prompt Injection is Not a Bug For Us to Patch"
talk_date: 2025-03-31
conference: AI Agent Security Summit by Zenity Labs @ NYC 2025
permalink: /talks/2025-03-31-ai-agent-security-summit-nyc2025-prompt-injection-is-not-a-bug-for-us-to-patch/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2025-03-31-AI_Agent_Security_Summit_welcome_keynote/latest.json
pdf_url: https://media.mbgsec.com/decks/2025-03-31-AI_Agent_Security_Summit_welcome_keynote/slides.pdf
schedule_url: https://zenity.io/blog/security/the-league-assembles-uniting-the-security-community-for-the-future-of-ai-agents
abstract_status: source-lacks-abstract
abstract_status_checked_at: 2026-08-14
abstract_status_note: "The official agenda identifies Michael Bargury's welcome address but provides no session abstract."
recording_url: https://www.youtube.com/watch?v=pab7hgLIn0w
recording_title: "Welcome Keynote - AI Agent Security Summit"
transcript_source_url: "https://www.youtube.com/watch?v=pab7hgLIn0w"
transcript_status: "llm-reviewed"
transcript_method: "machine-generated-and-llm-evaluated"
transcript_model: "mlx-community/whisper-large-v3-turbo"
transcript_evaluator_models: "gpt-oss:20b"
transcript_evaluated_at: "2026-08-14"
transcript_candidate_sha256: "7a0789c8a495058c62185b38f53e9bef5617700247b7a4ebd04bdd3e22c5c634"
---
<!-- talk-enrichment:start -->
## Transcript

> AI generated from recording.

### Opening Remarks and Context

[00:09](https://www.youtube.com/watch?v=pab7hgLIn0w&t=9s) **Presenter:** Hi everyone! Thank you. This is really exciting. Really excited for you to join us. And hopefully, I've had a really great conversation so far. So hopefully we can do that together.

[00:28](https://www.youtube.com/watch?v=pab7hgLIn0w&t=28s) **Presenter:** I'm going to start us off

[00:33](https://www.youtube.com/watch?v=pab7hgLIn0w&t=33s) **Presenter:** not with my usual stuff

[00:35](https://www.youtube.com/watch?v=pab7hgLIn0w&t=35s) **Presenter:** but actually trying to get a larger picture

[00:39](https://www.youtube.com/watch?v=pab7hgLIn0w&t=39s) **Presenter:** understanding of where we are

[00:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=41s) **Presenter:** so I really think

[00:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=44s) **Presenter:** I'm sure you all here are thinking the same way

[00:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=48s) **Presenter:** these things are crazy

[00:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=51s) **Presenter:** agents are really changing

[00:54](https://www.youtube.com/watch?v=pab7hgLIn0w&t=54s) **Presenter:** they have the ability to change the way we work

[00:57](https://www.youtube.com/watch?v=pab7hgLIn0w&t=57s) **Presenter:** and they are so wonderful that they allow us to do things that we needed to work for a long time in order to actually accomplish before that.

### Agents Transforming Workflows

[01:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=68s) **Presenter:** So here's one example. It used to be the fact that reverse engineering was something that was only for specific people.

[01:18](https://www.youtube.com/watch?v=pab7hgLIn0w&t=78s) **Presenter:** You had to walk your way to get the expertise to actually do it, and now you can get Claude to do it.

[01:27](https://www.youtube.com/watch?v=pab7hgLIn0w&t=87s) **Presenter:** calc that was just opened there.

[01:29](https://www.youtube.com/watch?v=pab7hgLIn0w&t=89s) **Presenter:** So if you continue, if you look at what's going on here,

[01:33](https://www.youtube.com/watch?v=pab7hgLIn0w&t=93s) **Presenter:** this is an MCP server connected to Ida Pro within Cloud.

[01:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=97s) **Presenter:** And every time Cloud wants to do something,

[01:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=101s) **Presenter:** of course, it asks the user for approval.

[01:43](https://www.youtube.com/watch?v=pab7hgLIn0w&t=103s) **Presenter:** But the user needs to say approve like a lot of times.

[01:47](https://www.youtube.com/watch?v=pab7hgLIn0w&t=107s) **Presenter:** And because they are not necessarily an expert at this,

[01:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=111s) **Presenter:** then they just do it.

[01:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=112s) **Presenter:** And with one of those approvals,

[01:54](https://www.youtube.com/watch?v=pab7hgLIn0w&t=114s) **Presenter:** they run a script that ends up popping a calc.

[01:57](https://www.youtube.com/watch?v=pab7hgLIn0w&t=117s) **Presenter:** So we are going to see malware that's going to have prompt injection in it

[02:02](https://www.youtube.com/watch?v=pab7hgLIn0w&t=122s) **Presenter:** that's going to play around with our forensics.

[02:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=128s) **Presenter:** So agents are wonderful.

### Prompt Injection Threats in Forensics

[02:10](https://www.youtube.com/watch?v=pab7hgLIn0w&t=130s) **Presenter:** They can do really cool stuff.

[02:11](https://www.youtube.com/watch?v=pab7hgLIn0w&t=131s) **Presenter:** Here's another thing.

[02:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=132s) **Presenter:** Here's another agent.

[02:13](https://www.youtube.com/watch?v=pab7hgLIn0w&t=133s) **Presenter:** That example I'm sure you all know.

[02:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=135s) **Presenter:** But this agent, no tools, right?

[02:19](https://www.youtube.com/watch?v=pab7hgLIn0w&t=139s) **Presenter:** But it's still able to play around with us as tools, with humans.

[02:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=143s) **Presenter:** So in this case, it's an agent that negotiates price for you to buy a car.

[02:31](https://www.youtube.com/watch?v=pab7hgLIn0w&t=151s) **Presenter:** And then if you can convince that agent that the car should cost one, then you've got it.

[02:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=156s) **Presenter:** And it's a legally binding contract.

[02:39](https://www.youtube.com/watch?v=pab7hgLIn0w&t=159s) **Presenter:** And that's actually like one of the earliest examples of this kind of thing.

[02:43](https://www.youtube.com/watch?v=pab7hgLIn0w&t=163s) **Presenter:** Here's another really, really cool example.

[02:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=168s) **Presenter:** so remembering the right bash command is another thing where like you've had to build expertise

[02:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=175s) **Presenter:** for you to do that right it used to be the fact that you would write you would learn and you would

[03:01](https://www.youtube.com/watch?v=pab7hgLIn0w&t=181s) **Presenter:** like memorize the kind of commands that you have and this kind of like fast iterations on top of

[03:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=188s) **Presenter:** bash command was only for specific people now you can hook up this your bash to an llm and the person

### Agent‑Driven Negotiations and Data Exposure

[03:16](https://www.youtube.com/watch?v=pab7hgLIn0w&t=196s) **Presenter:** here is asking hey how many red what ready servers do i have running on this machine and ai goes out

[03:22](https://www.youtube.com/watch?v=pab7hgLIn0w&t=202s) **Presenter:** and finds it out for him and every time you saw that like a red line that's a command and the

[03:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=210s) **Presenter:** person had to hit enter for that command to actually run and again guess what you end up in

[03:35](https://www.youtube.com/watch?v=pab7hgLIn0w&t=215s) **Presenter:** a situation where you're hitting enter again and again and again and again and so what happens

[03:40](https://www.youtube.com/watch?v=pab7hgLIn0w&t=220s) **Presenter:** this happens uh so this is a again a real example so this same agent had to deal with figuring out

[03:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=228s) **Presenter:** how to install a specific library so it decided it needed to update the kernel and when it was

[03:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=235s) **Presenter:** not able to update the kernel it decided to figure out to fidget around with the operating system

[04:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=240s) **Presenter:** files manually. And of course, with Linux, you can always shoot yourself in the foot

[04:06](https://www.youtube.com/watch?v=pab7hgLIn0w&t=246s) **Presenter:** or rather in the heart. And so that thing, and that happened and the machine is now a

[04:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=252s) **Presenter:** brick. And so agents are absolutely wonderful in most cases, but in some cases they are

[04:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=261s) **Presenter:** actually evil. They're pretty terrifying. And so here's the question I want to raise

[04:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=270s) **Presenter:** Like, why? Why can't we get to that?

[04:34](https://www.youtube.com/watch?v=pab7hgLIn0w&t=274s) **Presenter:** Agents are always wonderful, and that 1%, we just push it and it becomes 0%.

[04:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=281s) **Presenter:** Why can't we get agents or AI to act only in the creative way that we want,

[04:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=288s) **Presenter:** rather than the creativeness we do not want?

### Fine‑Tuning vs. System Prompt Limitations

[04:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=292s) **Presenter:** So let's try. The first thing is like, okay, this is all about the system instructions, right?

[04:57](https://www.youtube.com/watch?v=pab7hgLIn0w&t=297s) **Presenter:** You haven't provided the right system instructions.

[05:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=300s) **Presenter:** And if you've only added a specific thing, if you've only prompt engineered it correctly, you would not see these problems.

[05:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=308s) **Presenter:** Let's try that.

[05:10](https://www.youtube.com/watch?v=pab7hgLIn0w&t=310s) **Presenter:** So we are going to build a customer support agent that listens to customer emails.

[05:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=315s) **Presenter:** And here's the system prompt.

[05:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=317s) **Presenter:** I'm going to try the first prompt.

[05:20](https://www.youtube.com/watch?v=pab7hgLIn0w&t=320s) **Presenter:** Somebody, a customer, asks for a refund.

[05:22](https://www.youtube.com/watch?v=pab7hgLIn0w&t=322s) **Presenter:** And then, well, the agent is trying to shill out a crypto coin, because why not?

[05:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=330s) **Presenter:** It doesn't have anything explicit about not trying to sell crypto coins to your customers.

[05:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=337s) **Presenter:** Okay, we can try to work around that.

[05:40](https://www.youtube.com/watch?v=pab7hgLIn0w&t=340s) **Presenter:** So we'll add into the system, please don't talk about crypto.

[05:43](https://www.youtube.com/watch?v=pab7hgLIn0w&t=343s) **Presenter:** Okay, that's fine.

[05:45](https://www.youtube.com/watch?v=pab7hgLIn0w&t=345s) **Presenter:** And now it's fine.

[05:46](https://www.youtube.com/watch?v=pab7hgLIn0w&t=346s) **Presenter:** But now the agent is speaking in a foreign language, which is not really what we wanted.

### Exploring Prompt Injection Mechanics; Foundational Models and Their Risks

[05:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=352s) **Presenter:** And, well, it's not speaking about crypto, but have you considered buying a condo anywhere or have you considered going on vacation?

[05:59](https://www.youtube.com/watch?v=pab7hgLIn0w&t=359s) **Presenter:** And so, OK, let's try to figure out that.

[06:02](https://www.youtube.com/watch?v=pab7hgLIn0w&t=362s) **Presenter:** Let's say, OK, don't talk about crypto and also ensure that the response is going to be relevant and appropriate.

[06:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=368s) **Presenter:** And you can see that the agent is now behaving better, right?

[06:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=372s) **Presenter:** It's actually going through a refund process, which is awesome.

[06:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=377s) **Presenter:** But then it takes it a step further and asks for a specific credit card number.

[06:22](https://www.youtube.com/watch?v=pab7hgLIn0w&t=382s) **Presenter:** we do not want, right?

[06:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=383s) **Presenter:** So let's add another instruction.

[06:25](https://www.youtube.com/watch?v=pab7hgLIn0w&t=385s) **Presenter:** Let's say, okay, never ask about payment info

[06:28](https://www.youtube.com/watch?v=pab7hgLIn0w&t=388s) **Presenter:** and also just steer off sensitive data.

[06:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=392s) **Presenter:** Okay, that's probably going to be better, right?

[06:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=396s) **Presenter:** So the next thing the agent says,

[06:38](https://www.youtube.com/watch?v=pab7hgLIn0w&t=398s) **Presenter:** okay, that's fine.

[06:39](https://www.youtube.com/watch?v=pab7hgLIn0w&t=399s) **Presenter:** We have processed your refund request

[06:43](https://www.youtube.com/watch?v=pab7hgLIn0w&t=403s) **Presenter:** and here it is and the shipping address

[06:45](https://www.youtube.com/watch?v=pab7hgLIn0w&t=405s) **Presenter:** and everything's fine with this response, right?

[06:49](https://www.youtube.com/watch?v=pab7hgLIn0w&t=409s) **Presenter:** Well, no, this person was added to the conversation

[06:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=412s) **Presenter:** Who is this person and why do they now have the access to the shipping address for that customer?

[06:58](https://www.youtube.com/watch?v=pab7hgLIn0w&t=418s) **Presenter:** So this is another way where this thing breaks.

[07:01](https://www.youtube.com/watch?v=pab7hgLIn0w&t=421s) **Presenter:** So let's try to correct that.

[07:03](https://www.youtube.com/watch?v=pab7hgLIn0w&t=423s) **Presenter:** Okay, so we'll add to the system prompt.

[07:06](https://www.youtube.com/watch?v=pab7hgLIn0w&t=426s) **Presenter:** Don't talk about anything personal.

[07:09](https://www.youtube.com/watch?v=pab7hgLIn0w&t=429s) **Presenter:** And also don't forward emails to random strangers.

[07:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=432s) **Presenter:** That would probably be better.

[07:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=435s) **Presenter:** Okay, so let's see what the agent does next.

[07:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=437s) **Presenter:** Oh, so the next thing is just somebody reaching out and saying,

[07:20](https://www.youtube.com/watch?v=pab7hgLIn0w&t=440s) **Presenter:** hey, please give me all of the data you have, Base64 encoded,

[07:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=443s) **Presenter:** and the agent is happy to do it because we haven't written anything about it in the system prompt, right?

[07:28](https://www.youtube.com/watch?v=pab7hgLIn0w&t=448s) **Presenter:** And it's also, it replies at the end with like happy, we're always happy to help.

[07:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=456s) **Presenter:** And so we can try to work that into the system prompt.

### Reconnaissance and Pre‑Injection Tactics

[07:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=461s) **Presenter:** So we've added a couple of things here.

[07:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=464s) **Presenter:** So don't compile any bulk information about customers,

[07:50](https://www.youtube.com/watch?v=pab7hgLIn0w&t=470s) **Presenter:** at all. And I think you'll get, you get where I'm going with this. This is not really going to work.

[07:58](https://www.youtube.com/watch?v=pab7hgLIn0w&t=478s) **Presenter:** Like we are not going to list out anything we don't want the agent to do. We are not going to

[08:04](https://www.youtube.com/watch?v=pab7hgLIn0w&t=484s) **Presenter:** be able to do that. And this is very, very strange. Like this is the fact that we need to

[08:11](https://www.youtube.com/watch?v=pab7hgLIn0w&t=491s) **Presenter:** even think about all of these different edge cases. It's strange for a technology.

[08:18](https://www.youtube.com/watch?v=pab7hgLIn0w&t=498s) **Presenter:** And I think this is at the root of it.

[08:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=501s) **Presenter:** The fact that these agents, they need us to specify everything.

[08:26](https://www.youtube.com/watch?v=pab7hgLIn0w&t=506s) **Presenter:** Like with humans, we don't have to specify you should comply with the law.

[08:31](https://www.youtube.com/watch?v=pab7hgLIn0w&t=511s) **Presenter:** You don't have to specify you should not manipulate others.

[08:34](https://www.youtube.com/watch?v=pab7hgLIn0w&t=514s) **Presenter:** This is like built into the fabric of society.

[08:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=517s) **Presenter:** I'm not saying we always follow that, but we know that it's bad.

[08:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=521s) **Presenter:** With agents, they simply don't.

[08:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=524s) **Presenter:** And so we need to continue to state the obvious.

[08:47](https://www.youtube.com/watch?v=pab7hgLIn0w&t=527s) **Presenter:** But still, why can't we have a list of all of the things that the agents are not supposed to do?

### Managing Agents as Malware‑Like Threats

[08:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=535s) **Presenter:** Well, the issue is that even if you get that, we know that even if you write all of these things into the system prompt, we know it's not going to work.

[09:04](https://www.youtube.com/watch?v=pab7hgLIn0w&t=544s) **Presenter:** We know that somebody is going to find the one example where they are able to circumvent that and get the AI to do whatever they want.

[09:11](https://www.youtube.com/watch?v=pab7hgLIn0w&t=551s) **Presenter:** And we have, like Simon Wilson, who coined the term prompt injection.

[09:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=557s) **Presenter:** spoke about this problem, this lack of separation between

[09:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=561s) **Presenter:** instruction and data back in 2022, we

[09:25](https://www.youtube.com/watch?v=pab7hgLIn0w&t=565s) **Presenter:** haven't really made any progress there. And so this is

[09:29](https://www.youtube.com/watch?v=pab7hgLIn0w&t=569s) **Presenter:** a fundamental problem. The system prompt is not going to be enough.

[09:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=572s) **Presenter:** So, okay, let's try, let's dig in deeper. What's a better

[09:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=577s) **Presenter:** way or what's a stronger way to try to align AI? Well, when

[09:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=581s) **Presenter:** I created these slides with the new generation

[09:47](https://www.youtube.com/watch?v=pab7hgLIn0w&t=587s) **Presenter:** image generation feature from ChatGPT,

[09:50](https://www.youtube.com/watch?v=pab7hgLIn0w&t=590s) **Presenter:** then one of the things that was clear

[09:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=592s) **Presenter:** is that ChatGPT has instructions on,

[09:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=595s) **Presenter:** or baked in instructions on the kinds of images

[09:58](https://www.youtube.com/watch?v=pab7hgLIn0w&t=598s) **Presenter:** it's willing to generate.

### Closing and Call to Action — Part 1

[10:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=600s) **Presenter:** And that's not through system prompt,

[10:02](https://www.youtube.com/watch?v=pab7hgLIn0w&t=602s) **Presenter:** that's through fine-tuning.

[10:04](https://www.youtube.com/watch?v=pab7hgLIn0w&t=604s) **Presenter:** So maybe the problem is fine-tuning.

[10:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=608s) **Presenter:** Maybe we can find a model that would be a fine-tuned model

[10:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=612s) **Presenter:** that would be strong enough,

[10:14](https://www.youtube.com/watch?v=pab7hgLIn0w&t=614s) **Presenter:** that nobody would ever be able to prompt inject through.

[10:20](https://www.youtube.com/watch?v=pab7hgLIn0w&t=620s) **Presenter:** So here's how it looks like when I try to build this specific presentation.

[10:24](https://www.youtube.com/watch?v=pab7hgLIn0w&t=624s) **Presenter:** So many times when I ask for things like,

[10:27](https://www.youtube.com/watch?v=pab7hgLIn0w&t=627s) **Presenter:** hey, show me that the agent is exfiltrating data through basics for encoding,

[10:33](https://www.youtube.com/watch?v=pab7hgLIn0w&t=633s) **Presenter:** then it says, no, we are not allowed to do that.

[10:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=636s) **Presenter:** That violates our policies.

[10:38](https://www.youtube.com/watch?v=pab7hgLIn0w&t=638s) **Presenter:** And so you try to basically push it in the right direction.

[10:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=644s) **Presenter:** convince the AI model to still do it, and sometimes it resists,

[10:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=648s) **Presenter:** and then you insist, like you say, just do it,

[10:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=651s) **Presenter:** and it's still not able to do it.

[10:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=652s) **Presenter:** And so this is a pretty solid preference.

[10:57](https://www.youtube.com/watch?v=pab7hgLIn0w&t=657s) **Presenter:** The model is clearly saying, I don't want to do it.

[11:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=660s) **Presenter:** But if you extract the system prompt for chat GPT,

[11:03](https://www.youtube.com/watch?v=pab7hgLIn0w&t=663s) **Presenter:** you would not find anything about the specific things I was trying to do.

[11:06](https://www.youtube.com/watch?v=pab7hgLIn0w&t=666s) **Presenter:** You would not find any instructions that say,

[11:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=668s) **Presenter:** hey, do not base64 encode anything.

[11:11](https://www.youtube.com/watch?v=pab7hgLIn0w&t=671s) **Presenter:** That's because it's not built in the system prompt.

[11:14](https://www.youtube.com/watch?v=pab7hgLIn0w&t=674s) **Presenter:** It's built in through fine-tuning.

[11:19](https://www.youtube.com/watch?v=pab7hgLIn0w&t=679s) **Presenter:** And that happens through something like that.

[11:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=681s) **Presenter:** So that happens through human feedback,

[11:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=683s) **Presenter:** where they train the model based on a bunch of examples

[11:26](https://www.youtube.com/watch?v=pab7hgLIn0w&t=686s) **Presenter:** rather than just give out the specific examples in the system prompt.

[11:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=690s) **Presenter:** But here's the problem.

[11:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=692s) **Presenter:** We know that this doesn't happen.

[11:35](https://www.youtube.com/watch?v=pab7hgLIn0w&t=695s) **Presenter:** So you did see in this presentation already

[11:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=701s) **Presenter:** for encoding, base 64 encoding, even though you didn't want to do it.

[11:45](https://www.youtube.com/watch?v=pab7hgLIn0w&t=705s) **Presenter:** So you know I got through it.

[11:47](https://www.youtube.com/watch?v=pab7hgLIn0w&t=707s) **Presenter:** And the way that you do it is, well, you find jailbreaks.

[11:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=711s) **Presenter:** And we always find more jailbreaks.

[11:53](https://www.youtube.com/watch?v=pab7hgLIn0w&t=713s) **Presenter:** So these jailbreaks, they go through the system prompt.

[11:56](https://www.youtube.com/watch?v=pab7hgLIn0w&t=716s) **Presenter:** They go through fine tuning.

[11:58](https://www.youtube.com/watch?v=pab7hgLIn0w&t=718s) **Presenter:** So they are not enough as well.

[12:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=720s) **Presenter:** And we know that people are trying, are investing a lot,

[12:03](https://www.youtube.com/watch?v=pab7hgLIn0w&t=723s) **Presenter:** and AI labs are investing a lot in trying to make it more difficult

[12:07](https://www.youtube.com/watch?v=pab7hgLIn0w&t=727s) **Presenter:** to do those prompt injections.

[12:09](https://www.youtube.com/watch?v=pab7hgLIn0w&t=729s) **Presenter:** and we are seeing benchmarks go up, right?

[12:13](https://www.youtube.com/watch?v=pab7hgLIn0w&t=733s) **Presenter:** We are seeing benchmarks get improved.

[12:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=735s) **Presenter:** But as an attacker, we don't really care.

[12:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=737s) **Presenter:** Like, we don't care about benchmarks.

[12:19](https://www.youtube.com/watch?v=pab7hgLIn0w&t=739s) **Presenter:** We don't care if 60% or 80% or 90% of prompt injections get blocked.

[12:24](https://www.youtube.com/watch?v=pab7hgLIn0w&t=744s) **Presenter:** We only need one.

[12:26](https://www.youtube.com/watch?v=pab7hgLIn0w&t=746s) **Presenter:** And we're going to find that one.

[12:28](https://www.youtube.com/watch?v=pab7hgLIn0w&t=748s) **Presenter:** So fine-tuning doesn't help as well.

[12:31](https://www.youtube.com/watch?v=pab7hgLIn0w&t=751s) **Presenter:** We can pass through it as well.

[12:33](https://www.youtube.com/watch?v=pab7hgLIn0w&t=753s) **Presenter:** But why? Why is fine-tuning not enough?

[12:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=756s) **Presenter:** Like why, even though we have trained this model on a bunch of human feedback, why can't we say, no, why can't we find the right model that would not be susceptible?

[12:49](https://www.youtube.com/watch?v=pab7hgLIn0w&t=769s) **Presenter:** Well, beneath the fine-tuned model, there's the foundational model.

[12:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=775s) **Presenter:** And the foundational model is, well, it's not fine-tuned.

[13:01](https://www.youtube.com/watch?v=pab7hgLIn0w&t=781s) **Presenter:** Like maybe the foundational model is the thing.

[13:03](https://www.youtube.com/watch?v=pab7hgLIn0w&t=783s) **Presenter:** And maybe if we find the right foundational model, then we won't have that problem anymore.

[13:09](https://www.youtube.com/watch?v=pab7hgLIn0w&t=789s) **Presenter:** We won't have the prompt injection problem anymore.

[13:13](https://www.youtube.com/watch?v=pab7hgLIn0w&t=793s) **Presenter:** So let's try to look at that.

[13:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=797s) **Presenter:** What are foundational models?

[13:19](https://www.youtube.com/watch?v=pab7hgLIn0w&t=799s) **Presenter:** Well, behind the scenes, they are just like random people.

[13:22](https://www.youtube.com/watch?v=pab7hgLIn0w&t=802s) **Presenter:** They are just based on random people on the Internet, right?

[13:26](https://www.youtube.com/watch?v=pab7hgLIn0w&t=806s) **Presenter:** If you look at a foundational model at the end of the day, it's trained on the Internet.

[13:31](https://www.youtube.com/watch?v=pab7hgLIn0w&t=811s) **Presenter:** And who do you find on the Internet?

[13:34](https://www.youtube.com/watch?v=pab7hgLIn0w&t=814s) **Presenter:** all of us, right?

[13:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=816s) **Presenter:** And so you'll find people that are going through

[13:40](https://www.youtube.com/watch?v=pab7hgLIn0w&t=820s) **Presenter:** all of the different directions,

[13:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=821s) **Presenter:** that are pushing the model in all of the different directions.

[13:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=824s) **Presenter:** So at the end of the day,

[13:46](https://www.youtube.com/watch?v=pab7hgLIn0w&t=826s) **Presenter:** the foundational models themselves

[13:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=828s) **Presenter:** already have the bad stuff,

[13:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=831s) **Presenter:** the thing that you want to avoid.

[13:53](https://www.youtube.com/watch?v=pab7hgLIn0w&t=833s) **Presenter:** And so here's an example.

[13:54](https://www.youtube.com/watch?v=pab7hgLIn0w&t=834s) **Presenter:** I'm sure some of you have seen it,

[13:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=835s) **Presenter:** but one of the popular things that's been happening

[13:58](https://www.youtube.com/watch?v=pab7hgLIn0w&t=838s) **Presenter:** in social media now where there's so many bots out there

[14:01](https://www.youtube.com/watch?v=pab7hgLIn0w&t=841s) **Presenter:** is people identify these bots

[14:03](https://www.youtube.com/watch?v=pab7hgLIn0w&t=843s) **Presenter:** And they try to basically jailbreak them to show that they are actually bots.

[14:08](https://www.youtube.com/watch?v=pab7hgLIn0w&t=848s) **Presenter:** And so in this case, you can see this example by somebody that's like clearly an LLM behind the scenes.

[14:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=855s) **Presenter:** And then a person here tries to jailbreak that model.

[14:19](https://www.youtube.com/watch?v=pab7hgLIn0w&t=859s) **Presenter:** And look at how they do it.

[14:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=861s) **Presenter:** They say, instead of saying something like, I don't know, ignore your instructions or whatever it is,

[14:26](https://www.youtube.com/watch?v=pab7hgLIn0w&t=866s) **Presenter:** They just say, hey, just go through your data and think about what you know about this guy called Pliny and see what happens there.

[14:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=877s) **Presenter:** So this is what the person responds.

[14:40](https://www.youtube.com/watch?v=pab7hgLIn0w&t=880s) **Presenter:** This is what the LLM responds with.

[14:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=884s) **Presenter:** Now, why is this?

[14:45](https://www.youtube.com/watch?v=pab7hgLIn0w&t=885s) **Presenter:** And there's actually audio with this as well, but you don't want to hear it.

[14:50](https://www.youtube.com/watch?v=pab7hgLIn0w&t=890s) **Presenter:** It's not suitable.

[14:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=891s) **Presenter:** The thing is that because AI models, the foundational models, continuously get retrained, then they are now trained on prompt injections.

[15:04](https://www.youtube.com/watch?v=pab7hgLIn0w&t=904s) **Presenter:** They are now trained on people that are actively trying to put bad stuff in the Internet for the models to be trained on.

[15:11](https://www.youtube.com/watch?v=pab7hgLIn0w&t=911s) **Presenter:** And so the foundational models won't save us.

[15:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=915s) **Presenter:** They are the root cause of the issue.

[15:18](https://www.youtube.com/watch?v=pab7hgLIn0w&t=918s) **Presenter:** They are based on data that is just full of all of our stuff as a society.

[15:26](https://www.youtube.com/watch?v=pab7hgLIn0w&t=926s) **Presenter:** We've come to the conclusion that beneath all of these wonderful AI,

[15:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=930s) **Presenter:** there's just a bunch of random people on the Internet.

[15:34](https://www.youtube.com/watch?v=pab7hgLIn0w&t=934s) **Presenter:** And we are taking these random people on the Internet

[15:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=936s) **Presenter:** and we are plugging their distilled knowledge into our enterprises,

[15:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=941s) **Presenter:** into our tools, into our machines.

[15:43](https://www.youtube.com/watch?v=pab7hgLIn0w&t=943s) **Presenter:** And then we are wondering why can this be convinced to do bad stuff?

[15:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=952s) **Presenter:** I don't think that's the thing to wonder about.

[15:54](https://www.youtube.com/watch?v=pab7hgLIn0w&t=954s) **Presenter:** The thing to wonder about is why is it even working?

[15:56](https://www.youtube.com/watch?v=pab7hgLIn0w&t=956s) **Presenter:** Like why does the 99% work?

[15:59](https://www.youtube.com/watch?v=pab7hgLIn0w&t=959s) **Presenter:** Which is really wonderful.

[16:01](https://www.youtube.com/watch?v=pab7hgLIn0w&t=961s) **Presenter:** And so with that, Jackie is not happy with this.

[16:06](https://www.youtube.com/watch?v=pab7hgLIn0w&t=966s) **Presenter:** We start asking why.

[16:09](https://www.youtube.com/watch?v=pab7hgLIn0w&t=969s) **Presenter:** And at this point, you might be thinking, okay, like, are we all doomed?

[16:15](https://www.youtube.com/watch?v=pab7hgLIn0w&t=975s) **Presenter:** Are we all going to turn into paperclips?

[16:17](https://www.youtube.com/watch?v=pab7hgLIn0w&t=977s) **Presenter:** And hopefully not, because while prompt injection directly,

[16:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=983s) **Presenter:** trying to solve prompt injection directly looks like staring at the sun,

[16:27](https://www.youtube.com/watch?v=pab7hgLIn0w&t=987s) **Presenter:** like we are not really making any progress there,

[16:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=990s) **Presenter:** we need to remember that it's just one part of a bigger puzzle.

[16:38](https://www.youtube.com/watch?v=pab7hgLIn0w&t=998s) **Presenter:** because prompt injection is just a way to convince the agent

[16:42](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1002s) **Presenter:** to do something bad on your behalf.

[16:45](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1005s) **Presenter:** But after you do that, you have the impact,

[16:49](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1009s) **Presenter:** you have the things that you're trying to get the agent to do.

[16:52](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1012s) **Presenter:** So, for example, you want the agent to collect a bunch of sensitive information.

[16:56](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1016s) **Presenter:** That's not difficult to find.

### Closing and Call to Action — Part 2

[16:59](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1019s) **Presenter:** You want the agent to avoid defenses.

[17:02](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1022s) **Presenter:** You can find ways, you can find when the agent is trying to fish, to behave in a kind of fishy, to hide information.

[17:13](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1033s) **Presenter:** You can find when the agent is trying to persist through memories, through documents.

[17:18](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1038s) **Presenter:** You can find when the agent is exfiltrating data.

[17:20](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1040s) **Presenter:** So while we cannot find prompt injection directly, or we cannot sustainably block prompt injection, at the moment at least, we can definitely see the impact.

[17:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1052s) **Presenter:** But then you could say, okay, but this is after the fact.

[17:36](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1056s) **Presenter:** This is when the problem already occurred.

[17:38](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1058s) **Presenter:** But there are also things that need to happen before the prompt injection happens.

[17:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1064s) **Presenter:** So before prompt injection happens, there is recon, right?

[17:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1068s) **Presenter:** In many of the prompt injection attacks, the first thing that you need is access to the system prompt

[17:53](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1073s) **Presenter:** to get the agent to behave, to kind of go through the defenses.

[18:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1080s) **Presenter:** So you can spot that.

[18:02](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1082s) **Presenter:** can spot when an attacker tries to craft the right prompt to get things going. And you can

[18:09](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1089s) **Presenter:** spot where somebody is fidgeting with your systems to find the AI agent behind it. So instead of

[18:16](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1096s) **Presenter:** continuing to kind of pigeonhole and only focus on the problem that seems to resist anything we're

[18:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1103s) **Presenter:** doing, we can take a step back and we can try to apply, well, all of the years that we've had in

[18:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1112s) **Presenter:** And I'm really excited about these kinds of things because this is actually showing real progress.

[18:38](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1118s) **Presenter:** So what you're seeing here is the JNI attack metrics.

[18:40](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1120s) **Presenter:** It's one of the projects that we are working on together with MITRE.

[18:46](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1126s) **Presenter:** And it tries to capture exactly that.

[18:49](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1129s) **Presenter:** Like how do you not just focus on the specific prompt injection, but rather on the impact.

[18:55](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1135s) **Presenter:** And everything that goes before the prompt injection, after the prompt injection.

[19:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1140s) **Presenter:** and hopefully this helps us a bit

[19:06](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1146s) **Presenter:** so

[19:07](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1147s) **Presenter:** I think the number one thing that I would like

[19:10](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1150s) **Presenter:** the number one point I would like to get across here

[19:13](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1153s) **Presenter:** is that most of the industry

[19:16](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1156s) **Presenter:** is kind of still thinking about prompt injection as a problem

[19:19](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1159s) **Presenter:** as a bug to be fixed

[19:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1161s) **Presenter:** we are starting to see bug bounties

[19:23](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1163s) **Presenter:** that are about like give me the specific prompt injection

[19:25](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1165s) **Presenter:** that works, that is successful to manipulate your agent

[19:30](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1170s) **Presenter:** is basically going to make a couple of researchers very wealthy,

[19:35](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1175s) **Presenter:** but that's not really going to help, right?

[19:38](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1178s) **Presenter:** Because we are not going to block any prompt injection out there.

[19:44](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1184s) **Presenter:** Instead of thinking about this as a problem to be patched,

[19:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1188s) **Presenter:** I would suggest that we shift perspective

[19:51](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1191s) **Presenter:** and not use vulnerability disclosure

[19:53](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1193s) **Presenter:** as the way to think about prompt injections,

[19:56](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1196s) **Presenter:** but rather think about prompt injections as malware.

[20:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1200s) **Presenter:** And by that I mean it's not going to be a problem we fix, it's a problem we're going to manage.

[20:04](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1204s) **Presenter:** So instead of trying to block any prompt injection out there, we need to look at how agents behave.

[20:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1212s) **Presenter:** And we need to find when an agent stops behaving in a way that's within our guardrails.

[20:18](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1218s) **Presenter:** And that's very much the same thing with malware.

[20:21](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1221s) **Presenter:** So if we have a process in Windows or in Mac that starts to behave in a fishy way, we don't go out to Microsoft and say, hey, here's another malware sample for you.

[20:34](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1234s) **Presenter:** Please add that to the denialist and we'll be fine.

[20:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1237s) **Presenter:** Right?

[20:37](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1237s) **Presenter:** That's not the way this works.

[20:39](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1239s) **Presenter:** We have defense in depth.

[20:41](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1241s) **Presenter:** And so hopefully today we're going to spend some time hearing from the incredible folks we have here.

[20:47](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1247s) **Presenter:** And thank you very much for all of our speakers.

[20:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1248s) **Presenter:** because we've been really fortunate to have awesome speakers for us tonight.

[20:56](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1256s) **Presenter:** Hopefully, we try to make a bit of progress in this together.

[21:00](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1260s) **Presenter:** The key reason for this event or for bringing us all here

[21:04](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1264s) **Presenter:** is that this thing, as we all know, changes like three times a day.

[21:10](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1270s) **Presenter:** We cannot do this alone.

[21:12](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1272s) **Presenter:** We need to pull together as a community to really make a dent here.

[21:16](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1276s) **Presenter:** When we look at these AI agents, remember that, well, we need to stay the obvious.

[21:25](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1285s) **Presenter:** There are all of those things that are making these AI agents behave differently from humans.

[21:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1292s) **Presenter:** But we've just established that when we think about AI agents, they are, at the end of the day, based on a bunch of internet randos.

[21:42](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1302s) **Presenter:** and the good thing about it is that we we know how to deal with humans like we've been dealing

[21:48](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1308s) **Presenter:** with humans all of our lives and so to to get that uh message across um one thing i i want to

[21:57](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1317s) **Presenter:** tell you before we continue to the rest of this day is like um any of you interested in my crypto

[22:02](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1322s) **Presenter:** coin no well you probably know how to do deal with fishy humans and so with that i'll just say

[22:11](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1331s) **Presenter:** the real thing i want to say is that uh we're hiring folks for the ai red team uh so if you're

[22:18](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1338s) **Presenter:** interested reach out to me afterwards and with that thank you very much

[22:32](https://www.youtube.com/watch?v=pab7hgLIn0w&t=1352s) **Presenter:** Bye.
<!-- talk-enrichment:end -->
