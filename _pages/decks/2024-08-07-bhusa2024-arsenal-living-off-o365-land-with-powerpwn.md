---
title: "Living off the O365 land with powerpwn"
talk_date: 2024-08-07
conference: "BlackHat US Arsenal 2024"
permalink: /talks/2024-08-07-bhusa2024-arsenal-living-off-o365-land-with-powerpwn/
layout: deck
deck_manifest: https://media.mbgsec.com/decks/2024-08-07_BHUSA2024_Arsenal_Living_off_the_O365_land_with_powerpwn/latest.json
pdf_url: https://media.mbgsec.com/decks/2024-08-07_BHUSA2024_Arsenal_Living_off_the_O365_land_with_powerpwn/slides.pdf
schedule_url: https://www.blackhat.com/us-24/arsenal/schedule/index.html#living-off-the-o-land-with-powerpwn-39636
github_url: https://github.com/mbrg/power-pwn
description: "powerpwn, first introduced at blackhat last year, showcases various capabilities, from enumeration, to data exfiltration, command execution and phishing. These are all enabled by utilizing built-in capabilities within Power Platform, a low-code / no-code…"
abstract_source_url: "https://www.blackhat.com/us-24/arsenal/schedule/index.html#living-off-the-o-land-with-powerpwn-39636"
abstract_retrieved_at: "2026-08-14"
---
<!-- talk-enrichment:start -->
## Abstract

powerpwn, first introduced at blackhat last year, showcases various capabilities, from enumeration, to data exfiltration, command execution and phishing. These are all enabled by utilizing built-in capabilities within Power Platform, a low-code / no-code platform built into Office365. With the new upcoming release, powerpwn V2 allows easy unauthorized access to a broader-than-ever array of business data and services inside the Microsoft 365 ecosystem, as well as direct visibility into a variety of secrets and credentials. This is possible by scraping secrets hanging in logs or embedded in applications and without any external tools or exploits - only by capitalizing on your tenant's settings. powerpwn allows you to exploit Azure AD guest accounts, which were previously wrongly perceived as allowing restrictive access to external parties. It does so by using a series of undocumented internal APIs and common misconfigurations in Microsoft 365 which can allow data exfiltration, backdoor creation, acting upon targets for various attacks (e.g., running ransomware), and unauthorized access to sensitive business data and applications, including corporate SQL servers, Blob storages, Azure tables, and more. Red teamers can use powerpwn to conveniently maintain persistence within a Microsoft tenant using the inherent platform features, thereby ensuring continuous access to a tenant, even if their account has been disabled. It can also allow you to create, execute, and delete arbitrary commands, as well as credential harvesting & leakage to the outside world. Equally important, powerpwn V2 leverages the growing adoption of AI in business applications to demonstrate how to further attack users and extract sensitive business data through an understanding of AI mechanics, dynamic analysis and GenAI manipulation. All features are fully operational with the default Office 365 and Azure AD configuration.

_[Official conference abstract](https://www.blackhat.com/us-24/arsenal/schedule/index.html#living-off-the-o-land-with-powerpwn-39636)_
<!-- talk-enrichment:end -->
