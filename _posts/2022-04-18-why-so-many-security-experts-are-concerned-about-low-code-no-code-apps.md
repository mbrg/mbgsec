---
title: "Why So Many Security Experts Are Concerned About Low-Code/No-Code Apps"
excerpt_separator: "IT departments must account for the business impact and security risks such applications introduce."
categories:
  - DarkReading
tags:
  - Vulnerabilities/Threats 
  - Cloud 
  - Remote Workforce 
  - Application Security
---

_Originally posted on [DarkReading](https://www.darkreading.com/dr-tech/why-so-many-security-experts-are-concerned-about-low-code-no-code-apps)._
<link rel="canonical" href="https://www.darkreading.com/dr-tech/why-so-many-security-experts-are-concerned-about-low-code-no-code-apps" />
  
Last month, Dark Reading released an [enterprise application security survey](https://www.informationweek.com/whitepaper/cybersecurity/cloud-security/how-enterprises-are-securing-the-application-environment/437083) that raised serious concerns by IT and security teams about the state of low-code/no-code applications. The survey exposed a deep lack of visibility, control, and knowledge necessary to maintain the level of security maturity expected in the enterprise. Here we will look at concrete concerns raised by the survey, examine their root causes, and offer recommendations on ways to address them today.

The following concerns were raised under the question, "[What security concerns do you have regarding low-code/no-code applications?](https://www.darkreading.com/tech-trends/low-code-no-code-tools-are-popular-but-untrusted)"

## Concern No. 1: Governance

According to 32% of respondents, "There is no governance over how these applications are accessing and using our data."

Indeed, many useful low-code/no-code applications rely on storing data either in managed storage provided by the platform or in another platform via a connector. The tricky part is that low-code/no-code platforms make it extremely easy for makers to essentially bake their identity into the applications, so that every application user ends up triggering operations on behalf of the maker. Within enterprise environments, it is not uncommon for useful business applications to store their data in the maker's Dropbox or OneDrive account. Baked-in accounts can become an even bigger issue when an honest mistake causes data to be stored in a personal rather than business account.

Another popular use of low-code/no-code are data-movers or operation-stitchers. They connect source and destination, either by moving data between multiple points or by linking together an operation in one system to another in a different system.

As an example, a popular automation flow in enterprise scenarios is email forwarding. Users build an application that monitors their professional inbox for new emails, copies their content, and pastes it in their personal email for various reasons. Note that by copying the data, users are easily able to [bypass DLP controls](https://www.zenity.io/blog/low-code-security-and-business-email-compromise-via-email-auto-forwarding/) that would have prevented email forwarding.

## Concern No. 2: Trust

According to 26% of respondents, "I don't trust the platforms used to create the applications."

Low-code/no-code platform vendors are increasingly directing their attention to provide strong security assurance for their platforms, but there is a long way to go. While enterprise customers have become used to the security benefits provided by public cloud vendors, with their mature security teams, vulnerability disclosure programs, and state-of-the-art SOCs, low-code/no-code platforms are just getting used to the fact that they are now business-critical systems.

Of course, vendors investing in the security of their platform is not enough. Customers have to hold their part of the [shared responsibility model](https://www.darkreading.com/edge-articles/addressing-the-low-code-security-elephant-in-the-room), too. While platform vendors are improving their security posture, enterprises using low-code/no-code platforms must figure out how to approach these applications with the same level of security vigor as they would their pro-code applications. After all, the impact of both types of applications on data, identity, and the enterprise as a whole is the same.

Take security testing, for example. To catch security issues early, pro-code applications are typically built with code and configuration scanning tools in place, as part of the CI/CD. There are a host of tools to help detect issues throughout the SDLC, including SAST, DAST, and SCA, which has become very popular in recent years with the rise in open source security issues. Low-code/no-code applications are prone to the same problems that these tools detect, such as injection-based attacks, security misconfiguration, and untrusted dependencies. However, these applications typically rely on manual processes for security assurance or try to use pro-code tools to scan artifacts generated with low-code; unfortunately, pro-code tools fail to understand the business logic of low-code/no-code applications and therefore provide little value.

## Concern No. 3: AppSec

According to 26% of respondents, "I don't know how to check for security vulnerabilities in these applications."

How do I make sure my code makes sense, and that it is secure and robust, without access to that code? This point is tricky, and new solutions are required to tackle it.

When public cloud providers started introducing the concept of platform-as-a-service for compute services such as managed virtual machines (VMs), managed Kubernetes clusters, or serverless functions, the same kind of concerns were raised. Our entire strategy, as a security community, to secure compute instances was based on our ability to observe and leverage the host machine running our applications. While stripping away the complexities of managing VMs, cloud providers also stripped away the ability of security teams to observe and protect them. As a result, novel solutions had to be introduced to provide the same level of security assurance with cloud-native building blocks.

The same approach is desperately needed in low-code/no-code applications. Instead of trying to apply existing tools like code scanning or web security monitoring to artifacts generated by low-code/no-code, security teams should adopt solutions that understand the language of low-code/no-code in order to [identify logical vulnerabilities in those applications](https://owasp.org/www-project-top-10-low-code-no-code-security-risks/).

## Concern No. 4: Visibility

According to 25% of respondents, "The security team doesn't know what applications are being created."

This point is particularly important because you can't protect what you can't see. Most low-code/no-code platforms have little to no capabilities for allowing admins to view applications built on these platforms. Basic questions like, "How many applications do we have?" are simply unanswerable without pervasive measures. For example, some platforms allow admins to make themselves the owners of every application separately but do not allow them to see the application otherwise. So admins must resort to an active change on the platform to take a look at the application. 

Other platforms go even further, allowing business users to create applications in a private folder that administrators cannot review, other than knowing the number of applications that exist in them. A maker could be exfiltrating data through a private application, and the admin is left with no way to even know anything besides the fact that the application exists.

Visibility becomes even trickier once companies realize that they are using more than one low-code/no-code platform. In fact, most large enterprises are already using multiple platforms. With low-code/no-code platforms becoming more popular, citizen development tools being introduced bottom-up, and software-as-a-service (SaaS) vendors becoming platforms themselves, it's clear why enterprises are suddenly finding themselves using several different platforms.

## Concern No. 5: Knowledge and Awareness

According to 33% of respondents, "I don't have any security concerns," "Other," or "Don't know."

Since low-code/no-code platforms often find their way into the enterprise through business units rather than top-down through IT, they can easily slip through the cracks and be missed by security and IT teams. While security teams are in most cases part of the procurement process, it's easy to treat a low-code/no-code platform as just another SaaS application used by the business, not realizing that the result of adopting this platform would be empowering a whole array of new citizen-developers in the business.

In one large organization, citizen-developers in the finance team built an expense management application to replace a manual process filled with back-and-forth emails. Employees quickly adopted the application since it made it easier for them to get reimbursed. The finance team was happy because it automated part of its repetitive work. But IT and security were not in the loop. It took some time for them to notice the application, understand that it was built outside of IT, and reach out to the finance team to bring the app under the IT umbrella.

Security and IT teams are always in a state where the backlog of concerns is much larger than their ability to invest. To make sure resources are allocated to the most critical security risks, teams must first be aware of the criticality of low-code/no-code applications to the business and the security risks that they introduce. For the former, this means that low-code/no-code applications' impact on the enterprise must be demonstrated and clear. Security teams must be part of the discussion when thinking about adopting citizen development. 

For the latter, we as a community have to research, categorize, and share concrete security risks we identify to help others to build more secure applications. Bringing IT and security into the low-code/no-code conversation would allow the adoption of these technologies to accelerate, unleashing their full potential to increase business velocity and productivity.
