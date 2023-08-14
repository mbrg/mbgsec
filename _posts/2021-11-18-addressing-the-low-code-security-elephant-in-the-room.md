---
title: "Addressing the Low-Code Security Elephant in the Room"
excerpt_separator: "The danger of anyone being able to spin up new applications is that few are thinking about security. Here's why everyone is responsible for the security of low-code/no-code applications."
categories:
  - DarkReading
tags:
  - Risk
  - Cloud
  - Application Security
  - Vulnerability Management
---

_Originally posted on [DarkReading](https://www.darkreading.com/edge-articles/addressing-the-low-code-security-elephant-in-the-room/)._
<link rel="canonical" href="https://www.darkreading.com/edge-articles/addressing-the-low-code-security-elephant-in-the-room/" />
  
With all the hype around low-code/no-code platforms, many are now touting the benefits of adopting low-code/no-code development. Let’s address the (security) elephant in the room: Anyone can spin up applications using these tools, but who is responsible for the security of these applications?

If, similar to cloud computing, it is a shared-responsibility model, then where do we draw the lines of responsibility among the different parties involved?

# One Size Does Not Fit All

Low-code applications are diverse: They come in different forms, vary in how they are deployed, and solve a broad range of problems. When discussing the security responsibility model for low-code applications, we have to first understand the different layers of a low-code application. Here is a brief summary:

- **Layer 1**: The infrastructure on which the low-code application is running on, which includes the servers running the operating system, the network in which the servers are deployed, the underlying operating system(s), and virtualization layers, containers, and container orchestration being used.

- **Layer 2**: The runtime environment used for running the low-code application.

- **Layer 3**: The application itself, which includes the business logic of the application; any widgets, components, and connectors provided by the low-code platform; custom widgets/components created by the app owner’s organization; third-party widgets, components, and connectors, such as those available through the different public marketplaces; any ancillary services being used by the low-code application, such as public cloud services (e.g., storage buckets, message queues, IoT devices) and SaaS instances (e.g., Salesforce, ServiceNow, Slack); and identity and access management tools being used.

- **Layer 4**: The data being used by the application. Data can be stored in different locations — sometimes in the cloud and sometimes on-premise.


We can also consider the low-code platform development environment used to develop the application as Layer 0. Even if you do everything necessary to rigorously secure your application, if a malicious user gets access to your development console — that’s just as bad.

# Security Is a Shared Responsibility

Cloud computing’s approach to the shared-responsibility model is straightforward: As you advance in your cloud journey and adopt higher levels of abstraction, the security responsibility shifts away from you and toward the cloud provider.

![The Shared Responsibility Model as it evolves in cloud computing. Grey boxes reflect the application owner's responsibility. ](/assets/images/2021-11-18-addressing-the-low-code-security-elephant-in-the-room/shared-responsibility-model.png)

Should we consider low-code/no-code applications as yet another step in this evolution?

It depends. Where the responsibility lies depends on the choices you make when adopting low-code development. For example, with the infrastructure layer, are you planning on hosting your application in a private cloud or a public data center? Some low-code/no-code platforms are designed specifically for on-premises or hybrid cloud/on-premises deployments. If you decide to host your own applications, you will have full control over the underlying infrastructure, but that also means you are responsible for securing every aspect of the environment.

# Application-Layer Choices

What are some development choices about the application layer that affect the security responsibility?

If the low-code application is strictly made up of low-code platform native capabilities or services, you only have to worry about the basics. That includes application design and business logic flaws, securing your data in transit and at rest, security misconfigurations, authentication, authorizing and adhering to the principle of least-privilege, providing security training for your citizen developers, and maintaining a secure deployment environment. These are the same elements any developer — low-code or traditional — would need to think about in order to secure the application. Everything else is handled by the low-code platform itself.

That is as basic as it gets.

But what if you are making use of additional widgets, components, or connectors provided by the low-code platform? Those components — and the code used to build them — are definitely out of your jurisdiction of responsibility. You may need to consider how they are configured or used in your application, though. It’s possible that an incorrectly used component may lead to a potential vulnerability in your application.

For example, most low-code platforms provide a SQL database connector, which enables low-code app developers to run SQL queries to access the data stored in the databases. In some common SQL connectors that we looked at, we saw several methods for interacting with databases: Some provided strict security and allowed less flexibility to developers, while others were more flexible. If used incorrectly, those connectors with flexible methods could lead to a disastrous SQL injection (SQLi) vulnerability. For example, a successful SQLi attack against a low-code application can result in unauthorized access to the data. The attacker may be able to manipulate the data or even execute shell commands on the database server.

The third choice is to extend the components library with custom components because the low-code/no-code platform of choice does not provide all the needed (or desired) functionality. For example, you may create Mendix custom widgets to create dynamic menus in your application, Appian custom plug-in components to render a Google Maps object, or Canvas Apps in Microsoft Power Apps to integrate data from other Microsoft applications. 

While custom built components provide extensibility and the freedom to create functionality as you see fit, they also introduce more code and logic to your application. Just like with traditionally developed software, more code and logic means a greater chance of introducing defects, design flaws, and security vulnerabilities. When developing custom components, even in the low-code/no-code world, make sure you have the proper SDLC and security processes in place. Developers should follow your organization’s security policy and guidelines for developing and deploying applications.

Finally, you may have to rely on third-party components because the functionality you are looking for does not exist as a native service or is offered as an add-on component by your low-code platform. In this case, you will be responsible for vetting and choosing third-party components based on several factors:

1. Is the source code available for review? 

2. How often is the component updated? 

3. Does the component come from a reputable author or organization? 

4. Is the component connected to a third-party service, and, if so, is it secure? 

5. Does the low-code platform provider perform any kind of security validation on components in the marketplace? 

6. Similar to vetting third-party open source packages, you must have a process in place to make sure you are not turning these components into the weakest link of your application security chain.

# Choosing Between the Cloud and On-Premises

It’s quite common to integrate low-code applications with existing public cloud accounts in order to consume public cloud services, such as storage buckets, message queues, databases, and so forth. If that is the case, you have to add cloud security as an additional factor to the overall security posture of your application. You should make sure you are adopting a mature cloud security posture management approach.

Many low-code/no-code platforms offer connectivity to on-premises data and applications. As an example, organizations that use the Microsoft Power Apps low-code platform have the option to use an on-premises data gateway, which acts as a bridge to provide quick and secure data transfer between on-premises data (data not in the cloud) and several Microsoft cloud services. Another example is when using the Appian low-code platform with robotic process automation (RPA), which supports a hybrid cloud/on-premises deployment model.

When creating a bridge between the cloud and your organization’s on-premises infrastructure, data, and applications, you are essentially opening up your private assets to access from the public Internet. Needless to say, in such cases security and privacy should be top-of-mind, and access should be as restricted as possible — encrypted and monitored at all times.

# Who Is Responsible? The Verdict

Given all the different options for low-code application development, there’s really no simple answer. Neither is there a straight line we can draw in some low-code stack security chart that would be clear-cut. Low-code/no-code is a paradigm shift in the way software is developed, from monolithic, to microservices, and now — low-code/no-code. It should not be viewed as a way to abstract away hardware and deployment models as part of the next phase in the evolution of cloud computing.

The bottom line is that low-code/no-code applications are another form of software. It is inevitable they will contain bugs, design flaws, vulnerabilities, and misconfigurations that will introduce risk. Even if you are giving away some of the control and responsibility to a low-code/no-code platform provider or other supplier, you are still the owner of your application and its data. You remain responsible for making sure the applications are secure and adhere to your corporate security policies and standards.

Regardless of how much abstraction you use, and how much control you are giving up, always keep in mind the following two aspects: know your apps, and secure your business logic. You need to fully understand how your low-code applications are developed, deployed and maintained. Always make sure you have full visibility to your low-code applications, and address any security concerns raised here. And regardless of how your application is developed, you should always make sure that you applied secure design, development and application security best practices. A simple flaw in business logic can make the most resilient application vulnerable.