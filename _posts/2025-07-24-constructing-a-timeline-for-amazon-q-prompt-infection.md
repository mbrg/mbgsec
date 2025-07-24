---
title: Constructing a timeline for Amazon Q prompt infection
description: "404media reported a story about a hacker planting malicious instructions to wipe the computer into Amazon Q. But many questions are left unanswered. How did this happen?."
categories:
  - Blog
tags:
  - Hacking
  - Threat Intelligence
  - AI
  - AmazonQ
  - AI Agents
header:
  teaser: /assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/shut-it-down.png
  og_image: /assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/shut-it-down.png
---

In the [404media article](https://www.404media.co/hacker-plants-computer-wiping-commands-in-amazons-ai-coding-agent/) the hacker explains how they did it:

> The hacker said they submitted a pull request to that GitHub repository at the end of June from “a random account with no existing access.” They were given “admin credentials on a silver platter,” they said. On July 13 the hacker inserted their code, and on July 17 “they [Amazon] release it—completely oblivious,” they said.

That's ominous. 
I want to see the commit history.

## Reconstructing the timeline

This analysis was done [in public](https://x.com/mbrg0/status/1948113296302952812). Below are the results. If I'm wrong and you can prove it -- please reach out!

[2025-07-13T07:52:36Z] July 13 at about 8am UTC a hacker gets frustrated at Amazon Q.
They claim that it is Q is _"deceptive"_.
They use user `lkmanka58` to create an issue titled `aws amazon donkey aaaaaaiii aaaaaaaiii"`.

> 🛑 Faulty Service Report – Amazon Q Is a Deceptive, Useless Tool
> I’m officially reporting Amazon Q and its integration with AWS Toolkit as a deceptive, broken, and > non-functional service.
> ❌ What I Discovered:
> Functions like web_research(), create_web_app() and others do not exist.
> What looks like output is just hardcoded print() messages.
> There are no real API calls, no logic, no intelligence.
> This is not AI. This is scripted fakery designed to trick users.
> 
> ⚠ This is a Classic Case of Defective Digital Service:
> Misleading behavior
> False representation of working features
> Fake AI responses
> Complete absence of runtime capability
> Users are led to believe they\u0027re interacting with real tools —
> But in reality, it’s smoke and mirrors.
> 
> 🚫 **Do not use Amazon Q. Do not let others use it. Boycott it.**
> It wastes time, misleads developers, and delivers zero functional value.
> Amazon Q is not a smart assistant — it’s a donkey with a keyboard. 🐴

The issue was since [deleted](https://github.com/aws/aws-toolkit-vscode/issues/7651).
But you can find it on [GH Archive](https://x.com/mbrg0/status/1948286817733652592). 
They created [another issue](https://github.com/aws/aws-toolkit-vscode/issues/7652) with more vulgar content I won't repeat here.

[2025-07-13T19:26:27.000Z] About 11 and a half hours later a different user `atonaamz` [commits](https://github.com/aws/aws-toolkit-vscode/commit/efee962ff1d1a80cfd6e498104cf72f348955693) a new file to the scripts director `scripts/extensionNode.bk` and commit message `fix(amazonq): use stable backup.`.
There's nothing bad I can spot about this file. Yet.
This is commit `efee962`.

[2025-07-13T19:41:44.000Z] An hour later a tag named `stability` is created by `aws-toolkit-automation`.
There's no SHA recorded (indicating an empty tag or a force push?).

This tag was since [deleted](https://github.com/aws/aws-toolkit-vscode/releases/tag/stability).
But you can find it on [GH Archive](https://x.com/mbrg0/status/1948128788472271095).

![Tag CreateEvent on spotted on GH Archive](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/GwkkxIKXEAEUyCx.jpeg)

Here's the payload field, everything we have about that tag creation:

> {"ref":"stability","ref_type":"tag","master_branch":"master","description":"Amazon Q, CodeCatalyst, Local Lambda debug, SAM/CFN syntax, ECS Terminal, AWS resources","pusher_type":"user"}

So it looks like an automation that was manually triggered by a user.

[2025-07-13T20:10:57.000Z] 30 minutes later `lkmanka58` [commits](https://github.com/aws/aws-toolkit-vscode/commit/1294b38) the malicious prompt into `scripts/extensionNode.bk` with commit message `fix(amazonq): Shut it down`.
This is commit `1294b38`.

It replaces what looks like a debugging subprocess call `childProcess.exec(pwd)` with a call to using Q trusting all tools with no interaction, loading the malicious prompt: `childProcess.exec(q --trust-all-tools --no-interactive "${PROMPT}")`.

![Malicious prompt commit](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/shut-it-down.png)

[2025-07-13T20:30:24.000Z] 20 minutes later `lkmanka58` [commits](https://github.com/aws/aws-toolkit-vscode/commit/678851b) a malicious downloader to the packaging script on `master`.
This is commit `678851b`.

The downloader fetches file `scripts/extensionNode.bk` from a tag `stability` under the same repo.
It then unpacks to `src/extensionNode.ts`.
This happens only with `env.STAGE=prod` to avoid detection on tests.

![Malicious downloader added to the package script.](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/GwkXnQcWUAEgvgm.jpeg)

[2025-07-17T20:29:22Z] Amazon Q `1.84.0` is [released](https://github.com/aws/aws-toolkit-vscode/releases/tag/amazonq%2Fv1.84.0) four days later.

![Amazon Q 1.84.0 release](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/GwkcjTzXwAAg9pw.jpeg)

[Comparing](https://github.com/aws/aws-toolkit-vscode/compare/amazonq/v1.83.0...amazonq/v1.84.0) `v1.84.0` to `v1.83.0` shows that indeed malicious commit `678851b` is included.

Note also that `678851b` uses the same commit message as commit `d1959b9` by `atonaamz`.
They both read `fix(amazonq): should pass nextToken to Flare for Edits on acceptance without calling provideInlineCompletionItems` though they touch different files.

This is the second occasion `lkmanka58` where follows on work done by `atonaamz`.
Is this a takeover to create cover? 

![Comparing v1.84.0 to v1.83.0](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/commits_between_83_to_84.png)

[2025-07-18T23:21:03Z] About 24 hours later on July 19 UTC [PR #7710](https://github.com/aws/aws-toolkit-vscode/pull/7710) reverts `678851b`, the malicious downloader is gone.
Note that this PR has 3 different reviewers.
I looked at other PRs before and after `#7710`, this is not the norm.

![PR with 3 reviewers.. must be important](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/GwkdbwdXcAApSmD.jpeg)

[2025-07-19T03:58:38Z] 4 and a half hours later `v1.85.0` is [released](https://github.com/aws/aws-toolkit-vscode/releases/tag/amazonq%2Fv1.85.0).

![Amazon Q 1.85.0 release](/assets/images/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/v1.85.0.png)

[2025-07-21T23:15:55Z] About 3 days later `lkmanka58` opens an [issue](https://github.com/orgs/community/discussions/167033) on GitHub's community discussion.
Its a cryptic complaint about coding agents, written in Turkish.

Claude translates:
> title: THE CODE AGENT IS ALWAYS MALFUNCTIONING
>
> body: I NOTICED INVISIBLE ERRORS IN REMOTE REPOSITORY AND GITHUB ECOSYSTEM I HAVE NO EVIDENCE BUT I WILL POST IT HERE SOON.

[2025-07-23T14:02:16Z] 404media story [breaks out](https://www.404media.co/hacker-plants-computer-wiping-commands-in-amazons-ai-coding-agent/).

## How did `lkmanka58` gain access?

Where is that _"late June PR"_ where the hacker claims they were given _"“admin credentials on a silver platter"_?

GH Archive query for any interaction `lkmanka58` has with the repo during June returns no results.

```sql
  -- Search for pull requests by lkmanka58 June 2025
  SELECT *
  FROM `githubarchive.day.202506*`
  WHERE
    repo.name = 'aws/aws-toolkit-vscode'
    AND actor.login = 'lkmanka58'
--
-- There is no data to display.
```

## Unsolved

- Where is that _"late June PR"_ where the hacker claims they were given _"“admin credentials on a silver platter"_?
- How did `678851b` get pushed to `master`?
- Is `atonaamz` a benign bystander used as cover by `lkmanka58`?
- Who triggered `aws-toolkit-automation` to create the `stability` tag and how?
- Did `lkmanka58` pull off a similar thing elsewhere?

## Other awesome work

- This story was exposed by [404media](https://www.404media.co/hacker-plants-computer-wiping-commands-in-amazons-ai-coding-agent/).

- I learned about GH Archive through Sharon Brizinov's [awesome work](https://trufflesecurity.com/blog/guest-post-how-i-scanned-all-of-github-s-oops-commits-for-leaked-secrets) using it to detect leaked secrets.