---
title: "All You Need Is Guest"
talk_date: 2024-04-19
conference: t2 2024
permalink: /talks/2024-04-19-t2-2024-all-you-need-is-guest/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2024-04-19_t2-24_AllYouNeedIsGuest/latest.json
pdf_url: https://media.mbgsec.com/decks/2024-04-19_t2-24_AllYouNeedIsGuest/slides.pdf
schedule_url: https://t2.fi/schedule/2024/
github_url: https://github.com/mbrg/power-pwn
description: "EntraID guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. In this talk, we will…"
abstract_source_url: "https://t2.fi/schedule/2024/#speech10"
abstract_retrieved_at: "2026-08-14"
---
<!-- talk-enrichment:start -->
## Abstract

EntraID guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong.

In this talk, we will show how guests can leverage undocumented APIs to bypass limitations and gain unauthorized access to sensitive business data and capabilities including corporate SQL servers and Azure resources. Furthermore, we will reveal how guests can create and control internal business applications to move laterally within the organization. All capabilities presented in the talk will be demonstrated with default Office 365 and EntraID configuration.

Next, we will drop PowerPwn, an offensive security toolset for Microsoft 365 focused on Power Platform. PowerPwn uncovers the true scope of guest access in your tenant. It automates limitation bypass, enumerate and dump all accessible data, and allow for interactive write and delete operations by the researcher.

Finally, we will make up for shattering the illusion of guests having limited access by sharing concrete steps to harden your Azure AD and Office 365 configurations to prevent such attacks and suggest detection logic to catch them if a change in configuration is not possible.

_[Official conference abstract](https://t2.fi/schedule/2024/#speech10)_
<!-- talk-enrichment:end -->
