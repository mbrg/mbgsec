---
title: "Copilot exfiltrates High Restricted SharePoint files to any user on the Internet, no auth required"
categories:
  - Blog
tags:
  - Red Team
  - Hacking
  - Microsoft
  - AI
---

Microsoft Copilot Studio allows users to quickly build enterprise Copilots on top of their business data.
Every enterprise user can now plug enterprise data into GPT models now and share their bots with the world.

What could go wrong?

## Public access to High Restricted SharePoint sites

Data leakage, to name one thing.

Here's HackerBot.
It's a simple Copilot that allows you to enumerate and download any file for the "HR Compliance" SharePoint site which has a "High Restricted" sensitivity label.
To use HackerBot you simply need to navigate to its public URL. No authentication required.

![HackerBot leaks High Restricted files to any user on the Internet](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/hackerbot-demo-app.png)

If you'd like to play around with it yourself, reach out and I'll provide a link.

## But Microsoft says this is not possible

Microsoft actually identified this scenario and have a big red warning [in their Docs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-sharepoint-onedrive) saying that this scenario (public user access + Copilot can access SharePoint/OneDrive) is blocked.

!["The No authentication and Only for Teams authentication options can't retrieve information from Sharepoint or OneDrive for Business."](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/microsoft-docs-warning.png)

So what is going on here?

## Analysis and workaround 

When you create a new copilot you are prompted to provide a URL which can be a public site, a SharePoint site or a OneDrive directory.
If you provide a SharePoint/OneDrive URL Microsoft will publish your bot but indeed suspend it you change the default configuration and switch to authenticated access.

![Create Copilot with SharePoint access](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/create-copilot.png)

![Authentication error](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/copilot-auth-error.png)

This makes sense following the note on Microsoft Docs.


However, it is just one of many ways to provide the copilot with business data access including SharePoint.
Those include Topics, Plugins, Skills to name a few.

HackerBot works with Topics. A topic is a particular thing the copilot can do for you, it can be a scripted conversation, access to resources or performing actions on your behalf.
Copilot routes users to the right topic by specific trigger words (or a GenAI decision).
HackerBot has a "ExfiltrateSharePoint" topic triggered by words like "Exfiltrate", "SharePoint", "Data" and "Confidential".

![HackerBot ExfiltrateSharePoint topic](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/hackerbot-topic-list.png)

![HackerBot ExfiltrateSharePoint trigger words](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/hackerbot-exfiltratesharepoint-trigger-words.png)

Topics can be set to use [hundreds of connectors](https://learn.microsoft.com/en-us/connectors/connector-reference/) that allow access to any business platform you can imagine. 
If you can't find your desired platform on the list, you can also [trigger a full-blown automation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-use-flow), use a [free-style HTTP request](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-http-node) or build a [custom connector](https://learn.microsoft.com/en-us/connectors/custom-connectors/),  
If you're familiar with Power Platform, a topic looks very much like a Power Automate flow (though there's no 1:1 feature parity).

HackerBot uses a connection to SharePoint to enumerate files on the "HR Compliance" site, and then triggers a flow to retrieve the file's content base64 encoded.

![HacketBot enumerates a High Restricted SharePoint site](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/hacketbot-lists-sharepoint-files.png)

![HackerBot leaks file content](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/hackerbot-leaks-file-content.png)

To allow public access to unauthenticated users, I just left the default setting as is.

![Default Copilot Studio authentication settings](/assets/images/2023-12-03-copilot-sharepoint-data-exfil/default-copilot-auth-settings.png)

That's it, it's that simple.

One thing should be bugging you at this point.. if users are not authenticated, how is HackerBot able to fetch data from an enterprise SharePoint site?

## Credential Sharing as a Service yet again

The answer is a [recurring theme](https://www.youtube.com/watch?v=QtaA5U7LJ74) with LCNC platforms and Microsoft Power Platform in particular.

Apps work by user impersonation.
When I created HackerBot, I had to provide my credentials as a Copilot maker to run and debug the "ExfiltrateSharePoint" topic.
These creds, in this case an OAuth refresh token, are stored by Microsoft and replayed any time a user talks to Copilot.
