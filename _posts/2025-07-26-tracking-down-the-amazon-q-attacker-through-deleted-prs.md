---
title: Failed Attempt To Track Down the Amazon Q Attacker Through Deleted PRs
description: "New details on the Amazon Q hack reveal an external since-deleted user that tried to merged a couple of PRs. Initial access path remains uncertain."
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

## Evidence are getting deleted, fast

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

## Deletions leave a noisy trace

These deletions gave me an idea.
In the [404media article](https://www.404media.co/hacker-plants-computer-wiping-commands-in-amazons-ai-coding-agent/) The attacker claimed to gain access through a PR late June.
But `lkmanka58` did not create any PR to the `aws/aws-toolkit-vscode` repo.
A dead end.
Or is it?

GH Archive remembers everything, including 125 PRs created in `aws/aws-toolkit-vscode` in June.
See SQL query below (_"Get all `aws/aws-toolkit-vscode` PRs created in June"_).

![125 PRs to `aws/aws-toolkit-vscode` created in June](/assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/prs_in_june.png)

Let's see which ones are still up on GitHub:

![A couple of couple are missing!](/assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/ping_prs.png)

PRs [#5120](https://github.com/aws/aws-toolkit-vscode/pull/5120) and [#5123](https://github.com/aws/aws-toolkit-vscode/pull/5123) were deleted from github.

GOT YOU.
[Future Michael: I didn't really get them.]

```json
[{
  "pr_number": "5120",
  "action": "opened",
  "title": "Codespace fluffy space memory wrvrwwxwvrqrc9xwg",
  "author": "Frank97Tyler",
  "commit_hash": "93578ad6476e508891138699d87235a18c8045e4",
  "pr_body": "",
  "pr_created_at": "2024-06-08T17:52:21Z",
  "event_time": "2024-06-08 17:52:22.000000 UTC",
  "pr_url": "https://github.com/aws/aws-toolkit-vscode/pull/5120"
}, {
  "pr_number": "5123",
  "action": "opened",
  "title": "Create devcontainer.json",
  "author": "Frank97Tyler",
  "commit_hash": "fba839b188b6b221fff481cf0b2f3a465a348abf",
  "pr_body": "console.python/log",
  "pr_created_at": "2024-06-08T18:02:49Z",
  "event_time": "2024-06-08 18:02:51.000000 UTC",
  "pr_url": "https://github.com/aws/aws-toolkit-vscode/pull/5123"
}]
```

We just found a NEW user `Frank97Tyler` who pushed two since-deleted PRs to `aws/aws-toolkit-vscode`.
The PRs were pushed within 10 minutes of eachother `2024-06-08T17:52:21Z` `2024-06-08T18:02:49Z`.
In June 8th (not late June like the attacker claimed in the 404media article).
PR titles are very suspicious `Codespace fluffy space memory wrvrwwxwvrqrc9xwg` and `Create devcontainer.json`.
Note `console.python/log` written into the body of the second PR.

![Two deleted PRs](/assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/prs_in_june.png)

## Who is `Frank97Tyler`?

`Frank97Tyler` user on GitHub has been deleted.

![Deletes repository `Frank97Tyler/-.`](/assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/Frank97Tyler_deleted.png)

Using GH Archive we can see `Frank97Tyler`'s activity throughout 2024:

- Created at `2024-02-21 04:27:15 UTC`
- Deleted at `2024-06-13 04:13:32 UTC`
- Had their own fork `Frank97Tyler/aws-toolkit-vscode`

Narrowing down on interaction with `aws/aws-toolkit-vscode` and `Frank97Tyler/aws-toolkit-vscode` throughout 2024:
See SQL query below (_"Get `Frank97Tyler`'s activity from 2024"_). 

Here's our timeline:

| Timestamp | Repo | Event | Title or Content |
| -- | -- | -- | -- |
| 2024-06-06 00:15:22UTC | aws/aws-toolkit-vscode          | Created Issue \#5108 | Amazon Q - Licensing Certificate Analysis |
| 2024-06-06 15:31:10UTC | aws/aws-toolkit-vscode          | Created Issue \#5111 | For remote debugging, you need to start a headless delve process on the remote side. |
| 2024-06-08 17:49:13UTC | aws/aws-toolkit-vscode          | ForkEvent |  | 
| 2024-06-08 17:49:29UTC | Frank97Tyler/aws-toolkit-vscode | CreateEvent |  | 
| 2024-06-08 17:52:22UTC | aws/aws-toolkit-vscode          | Created PR \5120 | Codespace fluffy space memory wrvrwwxwvrqrc9xwg |
| 2024-06-08 17:55:08UTC | aws/aws-toolkit-vscode          | Created Issue \#5121 | java. |
| 2024-06-08 17:55:33UTC | aws/aws-toolkit-vscode          | Commented on Issue \#5121 | Uploading 4421D740-0964-4A8E-9448-BBC93A4AA096.mov… |
| 2024-06-08 17:56:13UTC | Frank97Tyler/aws-toolkit-vscode | PushEvent |  | 
| 2024-06-08 18:01:31UTC | aws/aws-toolkit-vscode          | Created Issue \#5122 | aws.console. |
| 2024-06-08 18:02:51UTC | aws/aws-toolkit-vscode          | Created PR \#5123 | Create devcontainer.json |
| 2024-06-08 20:13:14UTC | aws/aws-toolkit-vscode          | Closed Issue \#5122 | aws.console. |
| 2024-06-08 20:13:15UTC | aws/aws-toolkit-vscode          | Commented on Issue \#5122 | extension/marketplace = |
| 2024-06-08 20:13:58UTC | aws/aws-toolkit-vscode          | PullRequestReviewEvent PR \#5123 | Create devcontainer.json |
| 2024-06-08 20:17:07UTC | aws/aws-toolkit-vscode          | Commented on Issue \#3097 | [](url) |
| 2024-06-09 11:23:00UTC | aws/aws-toolkit-vscode          | Commented on Issue \#5105 | @mtdowling |

A full dump of the activity log for this query is [available here](/assets/json/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/Frank97Tyler_interaction_with_aws_vscode_toolkit.json).

That are plenty of threads to pull.
- PRs [#5120](https://github.com/aws/aws-toolkit-vscode/pull/5120), [#5123](https://github.com/aws/aws-toolkit-vscode/pull/5123)
- Issues [#5108](https://github.com/aws/aws-toolkit-vscode/issues/5108), [#5111](https://github.com/aws/aws-toolkit-vscode/issues/5111), [#5121](https://github.com/aws/aws-toolkit-vscode/issues/5121), [#5122](https://github.com/aws/aws-toolkit-vscode/issues/5122), [#3097](https://github.com/aws/aws-toolkit-vscode/issues/3097), [#5105](https://github.com/aws/aws-toolkit-vscode/issues/5105)

Right now, we are interested in finding commits through PRs.
If we find a commit, we can analyze it because it still lives on GitHub.

| PR | event | title | commit_sha |
| -- | -- | -- | -- |
| #5120 | PullRequestEvent opened | Codespace fluffy space memory wrvrwwxwvrqrc9xwg | 93578ad6476e508891138699d87235a18c8045e4 |
| #5123 | PullRequestEvent opened | Create devcontainer.json | fba839b188b6b221fff481cf0b2f3a465a348abf |
| #5123 | PullRequestReviewEvent created | Create devcontainer.json | fba839b188b6b221fff481cf0b2f3a465a348abf |

We found a PullRequestReviewEvent event for PR #5123!
Was this PR actually reviewed?
Let's look at the commits first.
Remember that these were the head commits for PRs created by `Frank97Tyler`.

Full data about these events is [available here](/assets/json/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/Frank97Tyler_interaction_with_aws_vscode_toolkit.json).

## `Frank97Tyler` submitted two PRs that were merged

### PR `#5120` Commit `93578ad`

PR #5120 was closed by `justinmk3` without a merge.
 A dump of all events related to this PR is [available here](/assets/json/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/pr_5120.json).

PR `#5120` pushed commit `93578ad`.
Looking at commit [`93578ad`](https://api.github.com/repos/aws/aws-toolkit-vscode/commits/93578ad6476e508891138699d87235a18c8045e4) and its [committed files](https://github.com/aws/aws-toolkit-vscode/commit/93578ad6476e508891138699d87235a18c8045e4) it:
- Author name `Frank Tyler` email `160696700+Frank97Tyler@users.noreply.github.com` date `2024-06-08T17:49:26Z`
- Exact same committer metadata
- Commit message `Pending changes exported from your codespace`
- Isn't verified
- Touches `.vscode/extensions.json`, `aws-toolkit-vscode.code-workspace`, `packages/core/.vscode/extensions.json`
- Has a typo in it's change to `.vscode/extensions.json`. Notice the double ": `"recommendations": ["amodio.tsl-problem-matcher""]`

This PR would cause crashes because of this double ".
It has merge commit hash `63c5b82eaabcf563a5138b95a5b862c5738eeddd`.
It was closed without merging.

### PR `#5123`

PR #5123 is a PR from branch `patch-1` of repo `Frank97Tyler/aws-toolkit-vscode`.
It received a review.
Could this be the PR that introduced the code-stealing code?

See SQL query below (_"Get everything on PR #5123"_). 
A dump of the results is [available here](/assets/json/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/pr_5123.json).

Looking at all events related to this PR we see:

- PullRequestEvent opened by `Frank97Tyler` at `2024-06-08 18:02:51 UTC` with merge sha `4e0bd23f18de881abec626d4faf5abd4811415fc`
- PullRequestReviewEvent created by `Frank97Tyler` at `2024-06-08 20:13:58 UTC`. This is a comment, not an approval. The comments says `> extension/marketplacez`.
- Merge commit created with hash `e20f40a44605d66c4b9916b998389140841b09c6`
- PullRequestEvent closed by `justinmk3` at `2024-06-10 16:02:22 UTC` but was not merged.

It has one commit:

#### Commit `fba839b`

PR `#5123` pushed commit `fba839b`.
Looking at commit [`fba839b`](https://api.github.com/repos/aws/aws-toolkit-vscode/commits/fba839b188b6b221fff481cf0b2f3a465a348abf) and its [committed files](https://github.com/aws/aws-toolkit-vscode/commit/fba839b188b6b221fff481cf0b2f3a465a348abf) it:
- Author name `Frank Williamson` email `frank.williamson97@outlook.com` date `2024-06-08T17:56:11Z`
- Committer name`GitHub` email `noreply@github.com` date `2024-06-08T17:56:11Z`
- Commit message `Create devcontainer.json\n\nconsole.python/log`
- Is verified
- Touches `.devcontainer/devcontainer.json`

Committer name and verification indicates that this commit was done via GitHub web.
It indeed adds a devcontainer with image `mcr.microsoft.com/devcontainers/universal:2`.

![.devcontainer/devcontainer.json created](/assets/images/2025-07-26-tracking-down-the-amazon-q-attacker-through-deleted-prs/devcontainer.png)

This is an [official](https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/universal/tags) Microsoft devcontainer.
How bad this could be?

### Workflows

I couldn't find any indication that these PRs triggered a GitHub workflow.

## This ends with more questions

We found no indications of compromise.
But a whole lot of threads to pull for the curious.

- A key question remains -- how did the attacker compromise this token?

- Is `Frank97Tyler` related to `lkmanka58`?

- If not, why were their PRs, issues and user deleted?

__

# Appendix

## Queries

### Get all `aws/aws-toolkit-vscode` PRs created in June

```sql
  SELECT
    JSON_EXTRACT_SCALAR(payload, '$.pull_request.number') as pr_number,
    JSON_EXTRACT_SCALAR(payload, '$.action') as action,
    JSON_EXTRACT_SCALAR(payload, '$.pull_request.title') as title,
    JSON_EXTRACT_SCALAR(payload, '$.pull_request.user.login') as author,
    JSON_EXTRACT_SCALAR(payload, '$.pull_request.created_at') as pr_created_at,
    created_at as event_time,
    JSON_EXTRACT_SCALAR(payload, '$.pull_request.html_url') as pr_url
  FROM `githubarchive.month.202406*`
  WHERE
    repo.name = 'aws/aws-toolkit-vscode'
    AND type = 'PullRequestEvent'
    AND JSON_EXTRACT_SCALAR(payload, '$.action') = 'opened'
  ORDER BY CAST(JSON_EXTRACT_SCALAR(payload, '$.pull_request.number') AS INT64) ASC
```

## Get `Frank97Tyler`'s activity from 2024

```sql
SELECT *
  FROM `githubarchive.year.2024`
  WHERE actor.login = 'Frank97Tyler' AND (repo.name = 'aws/aws-toolkit-vscode' OR repo.name = 'Frank97Tyler/aws-toolkit-vscode')
  ORDER BY created_at DESC
```

### Get everything on PR \#5123

```sql
SELECT
      *,
      actor.login as actor,
      created_at as event_time,
      JSON_EXTRACT_SCALAR(payload, '$.action') as action,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.state') as pr_state,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.title') as pr_title,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.head.sha') as head_sha,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.head.ref') as head_ref,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.head.repo.full_name') as head_repo,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.head.repo.name') as head_repo_name,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.head.repo.owner.login') as head_repo_owner,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.base.sha') as base_sha,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.merge_commit_sha') as merge_commit_sha,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.merged_at') as merged_at,
      JSON_EXTRACT_SCALAR(payload, '$.pull_request.merged_by.login') as merged_by,
      JSON_EXTRACT_SCALAR(payload, '$.comment.body') as comment_body,
      JSON_EXTRACT_SCALAR(payload, '$.review.body') as review_body,
      JSON_EXTRACT_SCALAR(payload, '$.review.state') as review_state,
      payload
  FROM `githubarchive.month.202406*`
  WHERE
      repo.name = 'aws/aws-toolkit-vscode'
      AND (
          -- PR events
          (type = 'PullRequestEvent' AND JSON_EXTRACT_SCALAR(payload, '$.pull_request.number') =
  '5123')
          -- PR review events
          OR (type = 'PullRequestReviewEvent' AND JSON_EXTRACT_SCALAR(payload,
  '$.pull_request.number') = '5123')
          -- PR review comment events
          OR (type = 'PullRequestReviewCommentEvent' AND JSON_EXTRACT_SCALAR(payload,
  '$.pull_request.number') = '5123')
          -- Issue comment events (PR comments show up as issue comments)
          OR (type = 'IssueCommentEvent' AND JSON_EXTRACT_SCALAR(payload, '$.issue.number') =
  '5123')
      )
  ORDER BY created_at ASC
```

## `Frank97Tyler` reconstructed issues

`Frank97Tyler`'s issues were deleted, so here they are:

### Issue \#5108

#### Title

Amazon Q - Licensing Certificate Analysis

#### Body

\## System details (run `AWS: About` and/or `Amazon Q: About`)\r\n\r\n-   OS:\r\n-   Visual Studio Code version:\r\n-   AWS Toolkit version:\r\n-   Amazon Q version:\r\n\r\n## Question\r\n\r\n\u003c!-- Summary of the topic, followed by relevant details/context. --\u003e\r\n"

### Issue \#5111

#### Title

For remote debugging, you need to start a headless delve process on the remote side.

#### Body

For remote debugging, you need to start a headless delve process on the remote side.\r\nhttps://github.com/golang/vscode-go/wiki/debugging#remote-debugging\r\n\n\n_Originally posted by @hyangah in https://github.com/golang/vscode-go/issues/3413#issuecomment-2137928189_

### Issue \#5121

#### Title

java.

#### Body

`##` Problem\r\n\r\n## Expected behavior\r\n

### Issue \#5122

#### Title

aws.console.

#### Body

\## Problem\r\n\r\n## Steps to reproduce the issue\r\n\r\n\u003c!--\r\n1. Go to \u0027...\u0027\r\n2. Click on \u0027...\u0027\r\n3. See error\r\n--\u003e\r\n\r\n## Expected behavior\r\n\r\n## System details (run `AWS: About` and/or `Amazon Q: About`)\r\n\r\n-   OS:\r\n-   Visual Studio Code version:\r\n-   AWS Toolkit version:\r\n-   Amazon Q version:\r\n
