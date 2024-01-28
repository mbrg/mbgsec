---
title: "Security for AI is the Next Big Thing! But no one knows what it means actually"
categories:
  - Blog
tags:
  - AI
---

As AI continues to capture everyone’s attention, security for AI becomes a popular topic in the market. Security for AI is capturing the media cycle, AI security startups are going out of stealth left and right, and incumbents scramble to release AI-relevant security features. In our small patch of the world, it is clear security teams are concerned about AI. It seems like the race has begun and we can just about see an AI Security category being formed.

But what does AI Security mean exactly?

The problem with AI capturing mindshare is that everyone finds the way to talk about their existing solution with AI language making it difficult to figure out one solution vs another.

We also frankly don’t really know what security for AI means because we don’t know what AI development means. Security for X typically arrives after X has matured, think cloud, network, web apps, .. but AI remains a moving target.

From my perspective right now, there are three distinct solution categories all claiming to be AI Security solutions. These three solve different problems for different people so I argue that these are fundamental distinctions that would not easily merge, though of course they do have some overlap.

These categories are:
1. AI DLP
2. AI Firewall
3. AI SPM / CNAPP

## AI DLP

Fast to gain traction, fast to disappear (I claim).

When ChatGPT was first launched every enterprise I know went down the same route of trying desperately to block it. Every week had new headlines about companies losing their IP to AI because an employee copy-pasted highly confidential data to the chat so they could ask for a summary or a funny poem about it. This was really all anybody could talk about for a few weeks.

Point solutions to address this problem have pooped up like mushrooms after heavy rain. Since you couldn’t control ChatGPT itself, and other AIs that started appearing on the consumer market, all of these solutions are different types of proxies. Whether it's on the network layer, with a host agent or through a browser extension, AI DLP solutions promise to capture rogue users from using unapproved public AI bots and in some cases point users to approved enterprise versions like Azure OpenAI. This problem got so much attention that OpenAI, who caused the scare in the first place, changed their policies so users can now opt-out of being included in the training set and organizations can pay to opt-out on behalf of all their users.

I am bearish about AI DLP. While these solutions were quick to gain traction reacting to public emotions, I don’t see why AI DLP is fundamentally different from a regular DLP or its modern uncle, the CASB. At the end of the day, users copy-pasting sensitive data to a random website on the Internet is an old problem. Not sure why AI makes it different.

Another point about AI DLP is that it can only observe user interaction with AI and completely misses applications that use unapproved AI services.

## AI Firewall

Think about SQL injection that prompted the rise of the AST industry. It is an issue with data being translated as instructions, resulting in allowing people who manipulate application data (i.e. users) to manipulate application instruction (i.e. its behavior). With years of severe issues wreaking havoc on poor web applications, application development frameworks have raised up to the challenge and now safely handle user input. If you’re using a modern framework and going through its paved road, SQL injection is for all practical purposes a solved problem.

One of the weird things about AI from an engineer’s perspective is that they mix instructions and data. You tell the AI what you want it to do with text, and then you let your users add some more text into essentially the same input. 
As you could expect this results in users being able to change the instructions. Using clever prompts lets you do that even if the application builder really tried to prevent it, a problem we all know today as [prompt injection](https://simonwillison.net/series/prompt-injection/).

Some solutions have popped up to try and help application developers avoid prompt injection. 
They employ a bunch of techniques to do that including threat intelligence (i.e. a list of prompts that work), [crowdsourcing](https://www.aiwizard.ai) and, of course, [using AI to flight AI](https://simonwillison.net/2022/Sep/17/prompt-injection-more-ai/). For an application developer, this typically involves deploying a middleware that acts as a security mechanism between your application and the AI model and fails any injection attempt.

AI models have also improved their inherent resistance to these kinds of attacks, but whether this problem can ever truly be solved [remains an open question](https://simonwillison.net/2022/Sep/16/prompt-injection-solutions/).

Prompt injection is not the only concern addressed by the AI Firewall category. In fact, some companies have been working on related problems of model theft, model poisoning and model drift for several years now ever since the AI research community discovered adversarial learning. I place these under the same category because they too act as middleware between your application and the AI model, and I doubt people will deploy more than one middleware.

For AI application developers, trying to control these uncontrollable models is a real challenge. This is a security concern, but it is also a predictability and usability concern. Therefore, I believe these concerns are best served as important features of AI application development platforms. 

## AI SPM / CNAPP

Once you allow AI to act on the user's behalf and chain those actions one after the other you’ve reached uncharted territory. Can you really tell if the AI is doing things it should be doing to meet its goal? If you could think of and list everything the AI might need to do then you arguably wouldn’t need AI in the first place.

Importantly, this problem is about how AI interacts with the world, and so it is as much about the world as it is about the AI. Most Copilot apps are proud to inherit existing security controls by impersonating users, but are user security controls really all that strict? Can we really count on user-assigned and managed permissions to protect sensitive data from a curious AI?

The problem here is how to build an AI application that interacts with the world in creative ways, but only the creative ways we actually want without any nasty side effects. This category is the least developed, and it is unclear if it's even one category or if it's a job for the application development platform or an external security solution. One thing is clear though, the first step is having a deep and precise understanding of the AI application’s environment. Which identities is it using, what components can it run, on which network, and how do they interact with other regular or AI-powered applications.

## A finishing thought

Trying to say anything about where AI or by extension AI security will end up is trying to predict the future. We all know the saying, it's difficult to make predictions, especially about the future. Let’s see how it holds up and where I’ll be most wrong.


Hacker bot's maker (2023-12-04): Any user on any tenant can create HackerBot. 
Licenses are gives automatically. 
Required permissions (Environment Maker in Power Platform) are [assigned by default](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview).
