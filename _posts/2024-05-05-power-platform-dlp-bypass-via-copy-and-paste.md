---
title: "Power Platform DLP Bypass via Copy-And-Paste"
description: "Microsoft's DLP fix for credential sharing? Copy-paste the blocked connection—because apparently security through UI controls is the new perimeter defense."
categories:
  - Blog
tags:
  - Red Team
  - Hacking
  - Vulnerability Disclosure
  - Microsoft
---

Last August I gave a talk at BlackHat USA titled [All You Need Is Guest](https://www.blackhat.com/us-23/briefings/schedule/index.html#all-you-need-is-guest-32647).
In it, I showed how simple guest access to EntraID could be escalated into full control over Azure resources and SQL servers. This method still works today mostly on the large enterprises and government customers.

[I got some heat from MSRC](https://www.mbgsec.com/blog/my-intense-2am-conversations-with-msrc-a-week-before-bh/) prior to the talk which I wrote about briefly after. When I got to one of the juicy parts – bypassing Power Platform DLP – I had to waive my hands and ask the audience to look the other way.

![DLP bypass to be disclosed](https://mbgsec.com/assets/images/2024-05-04-all-you-need-is-guest/dlp-bypass-look-away.png)

After the talk I was asked by Microsoft to sit on those details for longer.
I appreciate that some fixes require deep architectural work, so I waited.
On Nov 2023 I finally got my MSRC case resolved and a greenlight to publish.

[With everything going on today](https://www.theverge.com/24148033/satya-nadella-microsoft-security-memo) and the problem unfixed, I feel a strong urge to finally share the details with the broad security community.

It is time to share the full story. Hopefully this helps drive urgency to fix it.

Before I do though I would like to point out the obvious – DLP bypass was not the most interesting or scary part of the talk.

The most striking part was the fact that this mechanism exists in every M365 tenant today:

1.	Power Platform is pushing hard on citizen development – the powerful concept of having every corporate user be an app creator.

2.	To build a useful app users plug in their credentials to any enterprise system (say SQL server) to integrate it with Power Apps.

3.	Microsoft stores those credentials and adds a nice little Share button to be used at the user’s discretion. The user can even share with the Everyone  group, which means EVERYONE in your EntraID tenant, guests included. It could also directly be shared with any user of group in your tenant.

4.	Other users who got access can now use those credentials, fully impersonating the connection’s creator. They do not get access to the actual secret, but they can perform any action facilitated by Microsoft infra. There are no logs, no way to distinguish the original user from others who got access.

5.	This is all up to user choice. Admins have no say in the matter (nor usable visibility into those choices).

This issue still is out there available to exploit in every M365 environment today.

We’ve observed credentials SQL servers, Azure blob storage accounts and proprietary systems shared with guests or _just_ with thousands of employees on many major enterprises.
In fact, we’ve observed one everywhere we looked.

This problem is not going away. It’s a feature, and a useful one indeed.

Imagine you wanted to empower every corporate user to become a developer – what would be the number one hurdle to do so? Well, credentials.

Citizen developers can’t provision a service account or ask for a service principal. To allow them to create, Power Platform had to circumvent the entire modern IAM architecture. Instead of OAuth, we get credential sharing.

I call this Credential Sharing as a Service.

## Power Platform DLP bypass

Power Platform’s response to my research – and in general to most security concerns raised by the community – has been to emphasize the Power Platform DLP.

This is not a DLP in the Data Loss Prevention sense (data labeling, classification, leak prevention etc’).
Instead, it is an allow/deny list for which service types can be connected to through Power Platform. An admin can choose to deny connections to SQL server, for example. The unfortunate name choice means sometimes people get a false sense of security.

The fact that Power Platform DLP is not a security mechanism is [well documented](https://www.zenity.io/blog/research/microsoft-power-platform-dlp-bypass-uncovered-finding-5-parent-and-child-flow-execution/).
It won’t prevent a threat actor. And won’t hold up to most bypass attempts by capable citizen developers as well.

It is built to keep users in check, not prevent hacks.

Regardless, Power Platform’s response to my research has been – if you don’t want people to overshare SQL credentials just deny SQL in the DLP.

In the BlackHat talk, I showed an overshared SQL credential from an attacker’s perspective.
When trying to exploit it to dump the server I got denied by Power Platform DLP because that connection was blocked.
This is the part I had to skim over.

## And now for the juice -  the exploit!

There is none. It just worked.

If you try to access an app that uses a blocked connection you get blocked, as seen above. But the connection still lives, and you can just use it directly.

![Copy and paste to bypass DLP](https://mbgsec.com/assets/images/2024-05-05-all-you-need-is-guest-dlp-bypass/copy-and-paste%20to%20bypass%20DLP.png)

This is a fundamental design flaw. Power Platform DLP applied only to applications and automation that use a blocked connection. The connections themselves are simply not in scope.

The fix Microsoft put in place in Nov 2023 – the one I waited for to release these highly sophisticated details – was to prevent the creation of connections blocked by DLP.
There are two major things missing in that fix.

First and foremost, it leaves existing customers vulnerable because existing connections still bypass DLP. You can exploit this issue today just as well as you could exploit it before my disclosure.

Second, DLP policies change because policy changes. Every time you change your policy, you now have a bunch of trailing connections to deal with which you have no visibility into or control over. This is not a comprehensive fix and the problem persist.

Another fix implemented by Microsoft the week of the talk (kudos for the quick turnaround on that one) was to introduce a new tenant-level flag to limit the Everyone special group such that it doesn’t include guests. This is nice, but it too has major shortcomings.

Even if guests don’t have access, sharing credentials with the entire tenant is a major exposure and just plain wrong. Also, guests can always be granted access directly or through EntraID groups even if you’ve limited the Everyone group.

Most importantly, these fixes miss the point.

You are not going to block any useful Power Platform connector because it’s a useful platform. Sharing credentials with guests is crazy, sharing it with all enterprise users is just as crazy.

The problem is credential sharing and user impersonation, and that problem has been left untouched.

## Go hack yourself

I highly encourage you to go and check it out on your own.
[PowerPwn](https://github.com/mbrg/power-pwn) is a free open source tool that would allow you take an offensive look into your Power Platform tenant so you can fix things before attackers find them.

## Timeline

2023-06-27 DLP bypass vulnerability disclosure

2023-07-12 MSRC acknowledge the issue and decides not to issue a CVE (cloud service)

2023-07-26 MSRC and I collaborate to adjust my BlackHat slides, point to Microsoft-suggested mitigation and follow up with a Microsoft technical blog (thank you to the 
folks involved at MSRC and BAP security team)

2023-08-10 All You Need Is Guest at Black Hat 2023 does not reveal technical details

2023-08-22 Microsoft decides not a release a technical blog on the issue

2023-08-23 I query about mitigation timeline and agree to wait for a full deployment of the fix

2023-11-21 MSRC closes the case as fixed

2024-05-05 Blog released
