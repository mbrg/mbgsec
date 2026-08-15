---
title: "EntraID Guest to Corp Data Dump with powerpwn"
talk_date: 2023-12-07
conference: BlackHat EU Arsenal 2023
permalink: /talks/2023-12-07-bheu2023-entraid-guest-to-corp-data-dump-with-powerpwn/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2023-12-07_BHEU2023_EntraIDGuestToCorpDataDumpWithPowerpwn/latest.json
pdf_url: https://media.mbgsec.com/decks/2023-12-07_BHEU2023_EntraIDGuestToCorpDataDumpWithPowerpwn/slides.pdf
schedule_url: https://blackhat.com/archive/europe/2023/arsenal/schedule/index.html#entraid-guest-to-corp-data-dump-with-powerpwn-35799
github_url: https://github.com/mbrg/power-pwn
description: "EntraID guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. powerpwn is an…"
abstract_source_url: "https://blackhat.com/archive/europe/2023/arsenal/schedule/index.html#entraid-guest-to-corp-data-dump-with-powerpwn-35799"
abstract_retrieved_at: "2026-08-14"
---
<!-- talk-enrichment:start -->
## Abstract

EntraID guest accounts are widely used to grant external parties limited access to enterprise resources, with the assumption that these accounts pose little security risk. As you're about to see, this assumption is dangerously wrong. powerpwn is an offensive security toolset for Microsoft 365 focused on Power Platform. It allows you to achieve the full potential of a guest in EntraID by exploiting a series of undocumented internal APIs and common misconfiguration for collecting privileges, and using those for data exfiltration and actions on target, leaving no traces behind. The tool operates by leveraging shared credentials shared over Power Platform, a low-code / no-code platform built into Office365. PowerGuest allows gaining unauthorized access to sensitive business data and capabilities including corporate SQL servers and Azure resources. Furthermore, it allows guests to create and control internal business applications to move laterally within the organization. All capabilities are fully operational with the default Office 365 and Azure AD configuration.

_[Official conference abstract](https://blackhat.com/archive/europe/2023/arsenal/schedule/index.html#entraid-guest-to-corp-data-dump-with-powerpwn-35799)_
<!-- talk-enrichment:end -->
