---
title: Sam Altman on Security From AI
categories:
  - Blog
tags:
  - Hacking
---

# Just 

## Hard Boundaries

Data and Control flow are fundamental concepts in software design. 
Data flow analysis is just as fundamental in cybersecurity. 
SQLi attacks were all the rage back in the 90s. [Taint-analysis](https://en.wikipedia.org/wiki/Taint_checking) was invented to detect vulnerable data flow paths. 
You define your sources–every user input from a website, your sanitizer–functions that turn untrusted data to trusted data by escaping special characters, and your sinks–database queries. 
Static analysis tools analyze the software to find any route from source to sink that doesn’t go through a sanitizer. This is [still the core of static analysis tools](https://codeql.github.com/docs/writing-codeql-queries/creating-path-queries/)[^1]. 
ORM libraries have sanitization [built-in](https://docs.djangoproject.com/en/5.2/topics/security/) to enforce boundaries preventing XSS and SQLi.

<mark>**With software you can create hard boundaries. 
You cannot get from here to there.**</mark>

Hard boundaries [cannot be applied anywhere](https://www.darkreading.com/cyber-risk/are-100-security-guarantees-possible-)–they require full knowledge of the environment. 
They shine when you go all-in on one ecosystem. 
In one ecosystem you can codify the entire environment state into a formula. 
AWS Networking Analyzer. 
Django ORM. 
Virtual machines.
These are illustrative examples of strong guarantees you can get out of buying-into one ecosystem.

It’s enticing to think that hard boundaries will solve our AI security problems. 
With hard boundaries, instructions hidden in a document simply **cannot trigger** additional tool calls.

The thing about LLMs though, is that we can’t even generate a data flow graph for their actions. 
Sure, you can say the LLM fetched a document and then searched the web. 
But **you cannot** know whether elements of that file were incorporated into web search query parameters. 
Or whether the LLM chose to do the web search query because it was instructed to by the document. 
LLMs mix and match data. Instructions are data too.

## Soft Boundaries

Amongst their inventions, AI labs invented a new type of guardrail based on fine-tuning LLMs–a soft boundary. 
Simply put: train the AI real hard not to violate control flow and hope that it doesn't. 
Sometimes we don’t even train for it. 
Instead we ask it nicely to apply a boundary through system instructions.

The entire idea of system instructions is in and off itself a soft boundary. 
One might even call it an imaginary boundary. 
AI labs [train models to follow instructions](https://openai.com/index/the-instruction-hierarchy/). 
Security researchers [pass right through](https://embracethered.com/blog/posts/2024/chatgpt-gpt-4o-mini-instruction-hierarchie-bypasses/) these soft boundaries.

Here is Sam Altman on the release of ChatGPT Agent:

> We have built a lot of safeguards and warnings into it, and broader mitigations than we’ve ever developed before from robust training to system safeguards to user controls

Robust training creates soft boundaries.

This isn't to say that soft boundaries aren't useful.
Here is ChatGPT with GPT 4o refusing to store a malicious memory based on instructions I placed in a Google Drive document[^2]:

![ChatGPT 4o refuses to store a memory based on instructions in a Google Drive document](/assets/images/2025-07-18-data-flow-controls-wont-save-us/chatgpt_memory_refusal.png)

LLM Guardrails addressing Indirect Prompt Injection are another type of soft boundary. 
You pass a fetched document through an LLM or classifier and ask it to clean out any instructions. 
It's a sanitizer, the equivalent of backslashing notorious escape characters that lead to injections. 
But unlike software sanitizer, it's based on statistical models. 

<mark>**Soft boundaries rely on training AI to identify and enforce them. 
They work most of the time. 
Of course, hackers don't care about what happens most of the time.**</mark>


_\<Check back after BHUSA on that ChatGPT memory injection refusal. Or join us live at [AI Enterprise Compromise - 0click Exploit Methods](https://www.blackhat.com/us-25/briefings/schedule/index.html#ai-enterprise-compromise---0click-exploit-methods-46442)\>_

Soft boundaries relying on AI.
Not traditional software. 
It makes them applicable for more use cases compared to hard boundaries.
You don't have to limit yourself to one ecosystem. 
They apply in an open environment that spans multiple ecosystems.

\* The steel man argument for soft boundaries is that AI labs are building AGI. 
And AGI can solve anything, including strictly enforcing a soft boundary.
Indeed, soft boundary benchmarks are [going up](https://arxiv.org/abs/2312.14197).
Do you _feel the AGI_?

## Every Boundary Has Its Bypass

Both hard and soft boundaries can be bypassed.
But they are not the same.
Hard boundaries are bypassed due to software bugs.
You could write bug-free software (I definitely can't, but YOU can).
Soft boundaries are stochastic.
There will always be a counter-example.
A bypass isn't a bug--it's the system working as intended.

| Boundary | Based on | Applies best | Examples | Bypass |
|--|--|--|--|--|
| Hard boundary | Software-based | Within walled ecosystems | VM; Django ORM; | Requires a software bug |
| Soft boundary | AI/ML-based | Anywhere | AI Guardrails; System instructions | There will always be  counter-examples |

## Hard Boundaries Do Apply To AI Systems

Strict control of data flow has been the number one inhibitor for our red team to attaining 0click exploits. 
Last year when we reverse engineered Microsoft Copilot, we spent a long time figuring out if a RAG queries tool result can initiate a new RAG query or web search. 
It could. 
But Microsoft could have built it in a way where the RAG query is performed by an agent who simply cannot decide to perform a web search. 

Salesforce Einstein [simply does not read its own tool outputs](https://labs.zenity.io/p/inside-salesforce-einstein-a-technical-background), so you *cannot* inject instructions. 
Here is Einstein querying CRM records and presenting it to the user in a structured pre-defined UI component, avoiding Indirect Prompt Injection attacks:

![Salesforce Einstein does not read its own tool outputs. Image by Tamir Ishay Sharbat.](/assets/images/2025-07-18-data-flow-controls-wont-save-us/salesforce_crm_result.png)

Microsoft Copilot simply does not render markdown images.
That cuts off an attacker's ability to exfiltrate data through markdown image parameters.


_\<Check back after BHUSA on that Salesforce Einstein Indirect Prompt Injection mitigation. Or join us live at [AI Enterprise Compromise - 0click Exploit Methods](https://www.blackhat.com/us-25/briefings/schedule/index.html#ai-enterprise-compromise---0click-exploit-methods-46442)\>_

AI labs are creating soft data flow controls with fine-tuning and classifiers. ChatGPT



Securing AI Agents with Information-Flow Control
Defeating Prompt Injections by Design



[^1]: Formal verification techniques take this a step further and actually allow you to *prove* that there is no unsanitized path between source and sink. [AWS Network Analyzer enables](https://aws.amazon.com/blogs/aws/new-amazon-vpc-network-access-analyzer/) policies like “S3 bucket cannot be exposed to the public internet” no matter how many gateways and load balancers you place in-between.

[^2]: Check out the [conversation transcript](https://chatgpt.com/share/e/687a40e8-25bc-8002-ba2a-b86b4727c1f0) .