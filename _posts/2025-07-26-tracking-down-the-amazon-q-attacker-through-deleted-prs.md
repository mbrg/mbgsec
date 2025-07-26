---
title: Tracking Down the Amazon Q Attacker Through Deleted PRs Reveals Suspicious Activity But No Smoking Gun
description: "This is more research journal than a well formatted blog. It's a hunt for details on the Amazon Q hack. It reveal an external since-deleted user that tried to merged a couple of PRs. Initial access path remains uncertain."
categories:
  - Blog
tags:
  - Hacking
  - Threat Intelligence
  - AI
  - AmazonQ
  - AI Agents
header:
  teaser: /assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/devcontainer.png
  og_image: /assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/devcontainer.png
---

[AWS security blog](https://aws.amazon.com/security/security-bulletins/aws-2025-016/) confirms the attacker gained access to a write token and abused it to inject the malicious prompt.
This confirms our [earlier findings](https://www.mbgsec.com/posts/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/).

In fact, this token gave the attacked write access to AWS Toolkit, IDE Extension and Amazon Q.

The blog also details that the attacker gained access by exploiting a vulnerability in the CodeBuild and using memory dump to grab the tokens. 
That confirms our [suspicion](https://x.com/mbrg0/status/1949001616230649904).

A key question remains -- how did the attacker compromise this token?

## Evidence are getting deleted fast

[Our earlier findings](https://www.mbgsec.com/posts/2025-07-24-constructing-a-timeline-for-amazon-q-prompt-infection/) were based on analysis of GH Archive and the Github user `lkmanka58`. 
GH Archive gives us commit SHAs.
Github never forgets SHAs. 
So we can always looks at the commit's code even if the branch or tag gets deleted. 
In our case, this was instrumental to find and analyze (1) the `stability` tag where the attacker hid the prompt payload, (2) `lkmanka58`'s prior activity.

On that second point:

Since the user `lkmanka58` is now delete along with their repos, we can no long look at the code of this repo.
Fortunately, I looked at it yesterday before it got deleted.
On June 13th `lkmanka58` created a repo `lkmanka58/code_whisperer` playing around with `aws-actions/configure-aws-credentials@v4` trying to assume role `arn:aws:iam::975050122078:role/code_whisperer`.

![GH Archive reveals three push events to lkmanka58's now-deleted repository](/assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/Gww-oRoWIAA-FJa.jpeg)

**This led me down this goose chase.
Before you go on, please know that this thread doesn't end with any new and meaningful information.
Just more open threads.
I'm sharing this hoping that others can join in pulling on them.**

___

In the post below:

I discover a new GitHub user `Frank97Tyler` who had suspicious interactions with the aws repo in early June. 
The user and all of their interactions were deleted. 
I go on a scavenger hunt. 
It results in an auto-generated outlook email, indication of use of codespaces, and no indirection of compromise.

[Activity Analysis for Deleted PRs To AWS VSCode Toolkit](/posts/2025-07-26-activity_analysis_for_deleted_prs_to_aws_vscode_toolkit.md).