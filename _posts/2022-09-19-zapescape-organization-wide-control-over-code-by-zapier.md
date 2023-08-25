---
title: "ZAPESCAPE: Organization-wide control over Code by Zapier"
categories:
  - Zenity blog
tags:
  - low code
  - no code
  - vuln mgmt
  - vuln disclosure
  - hacking
  - red team
  - Zapier
link: https://www.zenity.io/zapescape-organization-wide-control-over-code-by-zapier/
---

In the middle of March 2022, Zenity research team discovered a sandbox-escape vulnerability in Code by Zapier, a service used by Zapier to execute custom code as part of a Zap. Exploiting this vulnerability, any user could take full control over the execution environment of their entire account allowing them to manipulate results and steal sensitive data. For example, a Zapier user could take control over the admin’s custom code execution environment. Furthermore, the exploit could be performed via the user’s private folder, which admins cannot monitor, thus avoiding detection.
