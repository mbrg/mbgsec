---
title: "All You Need Is Guest"
categories:
  - Blog
tags:
  - Red Team
  - Hacking
  - Vulnerability Disclosure
  - Microsoft
---

This is a long overdue blog version of a talk I gave at BlackHat USA 2023 titled All You Need Is Guest. [Slides](https://www.mbgsec.com/assets/pdfs/2023-08-10_BHUSA-2023_All_You_Need_is_Guest.pdf) and [video recording](https://www.youtube.com/watch?v=dmbRpwP5L9s) are available as well.

## Intro

When you get invited as a guest to an EntraID tenant you get restricted deny-by-default access. You shouldn’t have access to any resource not explicitly shared with you, right?

![Guest resource access is deny-by-default](/assets/images/2024-05-04-all-you-need-is-guest/guest-has-no-apps-by-default.png)

Well, no. By the end of this post, you’ll see how guests can find credentials to Azure resources and SQL servers and exploit them to get full data dumps of everything behind them.

![PowerPwn finds credentials available for guests to abuse](/assets/images/2024-05-04-all-you-need-is-guest/powerpwn-creds.png)
![PowerPwn dumps sensitive corporate data](/assets/images/2024-05-04-all-you-need-is-guest/powerpwn-dump.png)

## Why invite guests in?

As a small cybersecurity company every enterprise engagement starts the same – how do we share sensitive data back and forth? We don’t want to use email (you’ve never done that, right?).

![Sharing sensitive files via email](/assets/images/2024-05-04-all-you-need-is-guest/share-files-via-email.png)

How do we share resources securely? EntraID external identities – guests – are the mechanism to do that in a safe way. 

![EntraID external identities](/assets/images/2024-05-04-all-you-need-is-guest/entraid.png)

To accomplish that, it needs to satisfy two conditions: It needs to be easy for vendors to onboard and for IT/security to control.

Indeed, it's super easy to gain access and thus for vendors to onboard. Under default configuration, any user on Teams can just invite a guest in by adding them to a new team. In most enterprises, this is up to individual user choice.

<video controls>
  <source src="/assets/videos/2024-05-04-all-you-need-is-guest/invite-a-guest.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

For IT/security the promise is incredible - by inviting guests in you can apply your existing Microsoft security infrastructure to them. Conditional access policies, Intune, the entire Microsoft Security stack.

![Microsoft Security suite applies to guests](/assets/images/2024-05-04-all-you-need-is-guest/microsoft-security-suite.png)

There is a caveat here though, it is crucial that guests don’t get full access to your tenant otherwise you have just compromised your own controls. Guest access should be deny-by-default.

![Guest access must be deny-by-default](/assets/images/2024-05-04-all-you-need-is-guest/qed.png)

## Guest accounts in practice

Reality differs. Grab any corporate account, go to [make.powerapps.com](https://make.powerapps.com) and click on connections.

![Enters Power Apps](/assets/images/2024-05-04-all-you-need-is-guest/blue-red-pill.png)

You will see enterprise credentials lying around waiting to be leveraged. 

![Power Apps shared connections](/assets/images/2024-05-04-all-you-need-is-guest/power-apps-connections.png)

These were overshared due to a simple mistake by a business user. They are available for ANY EntraID account to pick up and use, including guests.

![Connections are shared with EVERYONE](/assets/images/2024-05-04-all-you-need-is-guest/share-with-all.png)

These connections are created by business users. Or more precisely, anyone in your organization can just plug in their credentials and create a connection. There are thousands of connectors available for people to use to any enterprise system you can think of. Including on-prem.

![Connections created by citizen developers](/assets/images/2024-05-04-all-you-need-is-guest/connections-created-by-citizen-devs.png)

## Exploit

These credentials are not just available for use directly.
They are used to give Power Apps or Power Automate access to enterprise resources.

There are a few mechanisms protecting these credentials from a wondering guest (or insider malicious insider, for that matter). Most of the talk was focused on bypassing each and every one of those. Here is a quick overview of each:

### Blocked by license

Guests cannot view Power Apps or query connections through Power Apps because they don't have they right license. While licensing is definitely not a security mechanism, it is somethings used as such nevertheless.

![Guests are blocked by license](/assets/images/2024-05-04-all-you-need-is-guest/no-license.png)

But wait, what if we get a trial license on our home tenant - the one we control? That should work for the guest tenant, right?

Well, it works! Power Apps validate that you have a license in at least one of the tenant you are part of. Not the specific one you are trying to access.

### Blocked by DLP

The main security mechanism for Power Platform is their [DLP](https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention). Do not get confused, this is not a DLP in the cybersecurity sense. It does not allow labeling of sensitive data not does it provide data leakage controls. Instead, it is an allow/deny list for which connectors can be used. It provides very blunt controls - allowing or blocking entire categories of services like SharePoint or SQL Servers. If you want to get to a more granular level, you need to manage a tight and ever-changing URL list.

It is also VERY [easy to bypass](https://www.zenity.io/blog/research/microsoft-power-platform-dlp-bypass-uncovered-finding-5-parent-and-child-flow-execution/).

Nevertheless, it can deny access to connections in case those are blocked in the DLP policy. Here, we have a DLP policy that blocks SQL Server connections.

![Access blocked by DLP](/assets/images/2024-05-04-all-you-need-is-guest/blocked-by-dlp.png)

At this point, [I basically had to](https://www.mbgsec.com/blog/my-intense-2am-conversations-with-msrc-a-week-before-bh/) wave my hands and ask the audience to allow me to move forward. I will share full details on a subsequent post.

![DLP bypass to be disclosed](/assets/images/2024-05-04-all-you-need-is-guest/dlp-bypass-look-away.png)

Say the connection isn't blocked by DLP then. What now?

Digging into the API calls made by a Power App using a SQL server connection you can spot a call to a service called API Hub. Though those calls, the app makes both read and write operations on top of the SQL server.

![Digging into Power Apps API calls](/assets/images/2024-05-04-all-you-need-is-guest/power-apps-uses-apim.png)
![Power Apps uses API Hub](/assets/images/2024-05-04-all-you-need-is-guest/power-apps-uses-apihub.png)

[API Hub](https://learn.microsoft.com/en-us/connectors/connector-architecture) is a service an intermediary service that allows Power Platform apps and users to use shared credentials without actually getting access to the credentials themselves.
Instead, API Hub generate a REST API interface for any imaginable operation on the underlying service.
Any call to API Hub gets translated to a call to the underlying service using the credentials stored in its internal storage.
Those can be user credentials (OAuth refresh tokens), passwords or long-lived secrets.
This is how connection sharing works.
Sharing a connection in Power Platform means allowing another user to use your credentials which are stored in API Hub.

### Blocked by programmatic access to API Hub

Users can't just generate tokens with the right scope to query API Hub, it is an internal Microsoft resource.

You can't use a built-in public client app because those need to be pre-approved to query API Hub.

You can'y use your own app because API Hub is an internal resource you cannot grant your apps access to.

![A scope away from victory](/assets/images/2024-05-04-all-you-need-is-guest/generate-api-hub-scope.png)

### FOCI to the rescue

At this point, we are stuck.

![A bypass recap](/assets/images/2024-05-04-all-you-need-is-guest/bypass-recap.png)

We know that these credentials are available for us in the Power Apps UI but we want direct access to API Hub.
We can't generate the right token though.

We know that the Power Apps app can generate tokens to API Hub, but it is a confidential app so we can't generate tokens on its behalf.

![Solving for API Hub scope](/assets/images/2024-05-04-all-you-need-is-guest/solving-for-apihub-scope.png)

Or can we?

Recalling [FOCI](https://github.com/secureworks/family-of-client-ids-research), we can take a look into the list of know FOCI apps.

![FOCI apps](/assets/images/2024-05-04-all-you-need-is-guest/foci-apps.png)

We can generate a token using Azure CLI (of course we can) and exchange that token for a Power Apps token to API Hub! Actually, it turned out you can just ask Azure CLI for a token to API Hub directly.

## The fun part

[powerpwn](https://github.com/mbrg/power-pwn) is an offensive toolset for M365 focused on Power Platform.
It combines the methods above we now have full access to the services behinds those credentials shared in the Power Platform.

It can also [install a backdoor](https://github.com/mbrg/power-pwn/wiki/Modules:-Install-a-backdoor) that persist even if the user gets deleted, [deploy a phishing app](https://github.com/mbrg/power-pwn/wiki/Modules:-Internal-phishing) on a Microsoft owned domain and more. But that is a story for another day.

![Introducing PowerPwn](/assets/images/2024-05-04-all-you-need-is-guest/intro-powerpwn.png)

`powerpwn recon -t <tenant_id>` finds all of the overshared credentials, apps and automations your user has access to.

![powerpwn recon](/assets/images/2024-05-04-all-you-need-is-guest/power-pwn-recon.png)

`powerpwn dump -t <tenant_id>` goes through each and every one of those and dumps all data from their underlying services. Every SQL server table, every blob in a storage account.

![powerpwn dump](/assets/images/2024-05-04-all-you-need-is-guest/power-pwn-dump.png)

You also gain access to a full Swagger UI for each credential that allows you to run arbitrary commands using those credentials (whatever is possible in Power Platform). For SQL Server, you can pass any SQL command to run on the server.

![powerpwn playground](/assets/images/2024-05-04-all-you-need-is-guest/powerpwn-playground.png)

I strongly encourage you to play around with it!

## Defense

Tactically, use powerpwn.
Find and delete these overshared connections.
Ideally, do it on a schedule or even automated.

But admittedly this is a tactical patch.
We are placing dev-level power in the hands of every enterprise user without guardrails or training.
Of course people will make bad judgment calls.
Still, share with everyone? That it just too much.

![Who owns AppSec for business users?](/assets/images/2024-05-04-all-you-need-is-guest/appsec-for-biz-users.png)

I strongly suggest using the [OWASP LCNC Top 10](https://owasp.org/www-project-top-10-low-code-no-code-security-risks/) to start getting a handle on citizen development.
