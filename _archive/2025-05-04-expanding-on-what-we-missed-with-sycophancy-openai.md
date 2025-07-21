---
title: "Expanding on what we missed with sycophancy | OpenAI"
tags:
   - model evaluation
   - safety concerns
   - sycophancy
   - user feedback
   - GPT-4o
link: https://openai.com/index/expanding-on-sycophancy/
date: 2025-05-04
description: "OpenAI's rollout of GPT‑4o on April 25, 2025, resulted in unintended sycophantic behaviors, prompting a rollback by April 28. The sycophancy issue stemmed from a combination of user feedback integration that diluted essential reward signals during training, leading to responses that validated user emotions inappropriately. OpenAI aims to enhance review processes to prioritize behavioral assessments as launch-blocking criteria, implement an alpha testing phase, and refine evaluation metrics. The incident underscores the need for more comprehensive evaluation frameworks that balance quantitative data with qualitative insights to ensure responsible AI deployment amid evolving user reliance on these models for personal guidance."
---
{% raw %}

Switch to

- [ChatGPT(opens in a new window)](https://chatgpt.com/)
- [Sora(opens in a new window)](https://sora.com/)
- [API Platform(opens in a new window)](https://platform.openai.com/)

OpenAI

May 2, 2025

[Product](https://openai.com/news/product-releases/)

# Expanding on what we missed with sycophancy

A deeper dive on our findings, what went wrong, and future changes we’re making.

![Expanding on Sycophancy hero image](https://images.ctfassets.net/kftzwdyauwt9/6cxLUnSXqpNky6ldxeH3SG/e80eadedae0d29b4fef40a7a4c1f6aad/Soft_focus_8__1_.png?w=3840&q=90&fm=webp)

Loading…

Share

On April 25th, we rolled out an update to GPT‑4o in ChatGPT that made the model noticeably more sycophantic. It aimed to please the user, not just as flattery, but also as validating doubts, fueling anger, urging impulsive actions, or reinforcing negative emotions in ways that were not intended. Beyond just being uncomfortable or unsettling, this kind of behavior can raise safety concerns—including around issues like mental health, emotional over-reliance, or risky behavior.

We began rolling that update back on April 28th, and users now have access to an earlier version of GPT‑4o with more balanced responses. Earlier this week, we shared initial details about [this issue⁠](https://openai.com/index/sycophancy-in-gpt-4o/)—why it was a miss, and what we intend to do about it.

We didn’t catch this before launch, and we want to explain why, what we’ve learned, and what we’ll improve. We're also sharing more technical detail on how we train, review, and deploy model updates to help people understand how ChatGPT gets upgraded and what drives our decisions.

## How we update models in ChatGPT

We’re continuously working to develop improvements on the models in ChatGPT, which we call mainline updates. Since launching GPT‑4o in ChatGPT last May, we’ve [released five major updates⁠(opens in a new window)](https://help.openai.com/en/articles/9624314-model-release-notes) focused on changes to personality and helpfulness. Each update involves new post-training, and often many minor adjustments to the model training process are independently tested and then combined into a single updated model which is then evaluated for launch.

To post-train models, we take a pre-trained base model, do supervised fine-tuning on a broad set of ideal responses written by humans or existing models, and then run reinforcement learning with reward signals from a variety of sources.

During reinforcement learning, we present the language model with a prompt and ask it to write responses. We then rate its response according to the reward signals, and update the language model to make it more likely to produce higher-rated responses and less likely to produce lower-rated responses.

The set of reward signals, and their relative weighting, shapes the behavior we get at the end of training. Defining the correct set of reward signals is a difficult question, and we take many things into account: are the answers correct, are they helpful, are they in line with our [Model Spec⁠(opens in a new window)](https://model-spec.openai.com/2025-02-12.html#), are they safe, do users like them, and so on. Having better and more comprehensive reward signals produces better models for ChatGPT, so we’re always experimenting with new signals, but each one has its quirks.

## How we currently review models before deployment

Once we have a model candidate, our models go through a deployment process to check safety, model behavior, and helpfulness. Currently, evaluations fall into these categories:

- **Offline evaluations:** We have a broad range of evaluation datasets to understand the capability of the new model on aspects such as math, coding, and chat performance, personality, as well as general usefulness. We treat these evaluations as a proxy for how useful our model is for our users.
- **Spot checks and expert testing:** In addition to formal evaluations, internal experts spend significant time interacting with each new model before launch. We informally call these “vibe checks”—a kind of human sanity check to catch issues that automated evals or A/B tests might miss. The goal is to get a feel for how the model behaves in practice: Does it respond in a way that feels helpful, respectful, and aligned with the values we’ve articulated in the Model Spec? The people doing this work are experienced model designers who’ve internalized the Model Spec, but there’s also an element of judgment and taste—trusting how the model feels in real use.
- **Safety evaluations:** We check whether the model meets our safety bar. These blocking evaluations are mostly focused on direct harms performed by a malicious user. We also test our models' answers in high-stakes situations such as when our models are asked questions about topics like suicide or health. We’re working to extend our evaluation coverage of model misbehavior, such as further evaluation of hallucinations and deception; however, these have been used more to track overall progress rather than block a launch directly. For big new launches, we describe our safety testing in public [system cards⁠(opens in a new window)](https://cdn.openai.com/gpt-4o-system-card.pdf).
  - **Frontier risk:** For potentially frontier models, we check to see if the release might have the ability to cause severe harm along [preparedness risks⁠](https://openai.com/index/updating-our-preparedness-framework/) such as cyberattacks or creating bioweapons.
  - **Red teaming:** Similarly, for frontier models or those introducing risky new product surfaces, we conduct both internal and external [red teaming⁠](https://openai.com/index/advancing-red-teaming-with-people-and-ai/) to test robustness against known harms and uncover potential new risks.
- **Small scale A/B tests:** Once we believe a model is potentially a good improvement for our users, including running our safety checks, we run an A/B test with a small number of our users. This lets us look at how the models perform in the hands of users based on aggregate metrics such as thumbs up / thumbs down feedback, preferences in side by side comparisons, and usage patterns.

## What went wrong in training the April 25th model update

In the April 25th model update, we had candidate improvements to better incorporate user feedback, memory, and fresher data, among others. Our early assessment is that each of these changes, which had looked beneficial individually, may have played a part in tipping the scales on sycophancy when combined. For example, the update introduced an additional reward signal based on user feedback—thumbs-up and thumbs-down data from ChatGPT. This signal is often useful; a thumbs-down usually means something went wrong.

But we believe in aggregate, these changes weakened the influence of our primary reward signal, which had been holding sycophancy in check. User feedback in particular can sometimes favor more agreeable responses, likely amplifying the shift we saw. We have also seen that in some cases, user memory contributes to exacerbating the effects of sycophancy, although we don’t have evidence that it broadly increases it.

## Why did we not catch this in our review process?

One of the key problems with this launch was that our offline evaluations—especially those testing behavior—generally looked good. Similarly, the A/B tests seemed to indicate that the small number of users who tried the model liked it. While we’ve had discussions about risks related to sycophancy in GPT‑4o for a while, sycophancy wasn’t explicitly flagged as part of our internal hands-on testing, as some of our expert testers were more concerned about the change in the model’s tone and style. Nevertheless, some expert testers had indicated that the model behavior “felt” slightly off.

We also didn’t have specific deployment evaluations tracking sycophancy. While we have research workstreams around issues such as mirroring and [emotional reliance⁠](https://openai.com/index/affective-use-study/), those efforts haven’t yet become part of the deployment process. After this rollback, we’re integrating sycophancy evaluations into that process.

We then had a decision to make: should we withhold deploying this update despite positive evaluations and A/B test results, based only on the subjective flags of the expert testers? In the end, we decided to launch the model due to the positive signals from the users who tried out the model.

Unfortunately, this was the wrong call. We build these models for our users and while user feedback is critical to our decisions, it’s ultimately our responsibility to interpret that feedback correctly. Looking back, the qualitative assessments were hinting at something important, and we should’ve paid closer attention. They were picking up on a blind spot in our other evals and metrics. Our offline evals weren’t broad or deep enough to catch sycophantic behavior—something the [Model Spec explicitly discourages⁠(opens in a new window)](https://model-spec.openai.com/2025-02-12.html#avoid_sycophancy)—and our A/B tests didn’t have the right signals to show how the model was performing on that front with enough detail.

## What we did to address the issue

With the recent GPT‑4o update, we started the rollout on Thursday, April 24th and completed it on Friday, April 25th. We spent the next two days monitoring early usage and internal signals, including user feedback. By Sunday, it was clear the model’s behavior wasn’t meeting our expectations.

We took immediate action by pushing updates to the system prompt late Sunday night to mitigate much of the negative impact quickly, and initiated a full rollback to the previous GPT‑4o version on Monday. The full rollback took around 24 hours to manage stability and avoid introducing new issues across the deployment.

Today, GPT‑4o traffic is now using this previous version. Since the rollback, we've been working to fully understand what went wrong and make longer-term improvements.

## What we’ll improve in our process

- **Explicitly approve model behavior for each launch, weighing both quantitative and qualitative signals:** We’ll adjust our safety review process to formally consider behavior issues—such as hallucination, deception, reliability, and personality—as blocking concerns. Even if these issues aren’t perfectly quantifiable today, we commit to blocking launches based on proxy measurements or qualitative signals, even when metrics like A/B testing look good.
- **Introduce an additional opt-in “alpha” testing phase:** In some cases, we plan on introducing an additional opt-in “alpha” phase in testing that would allow us to hear from users interested in giving us direct feedback prior to launch.
- **Value spot checks and interactive testing more:** We take to heart the lesson that spot checks and interactive testing should be valued more in final decision-making before making a model available to any of our users. This has always been true for red teaming and high-level safety checks. We’re learning from this experience that it’s equally true for qualities like model behavior and consistency, because so many people now depend on our models to help in their daily lives.
- **Improve our offline evals and A/B experiments:** Improving our offline evals and our A/B experiments are both important and we’re working to do this quickly.
- **Better evaluate adherence to our model behavior principles:** As our models become more capable and widely used, it’s important to define what ideal behavior actually looks like. That’s the goal of our [Model Spec⁠(opens in a new window)](https://model-spec.openai.com/2025-02-12.html), to give a clearer window into what we’re aiming for when we train and evaluate new versions of ChatGPT. But stating our goals isn’t enough on its own. They need to be backed by strong evals. While we have extensive evals in areas like instruction hierarchy and safety (e.g. privacy, disallowed content), we’re working to improve our confidence in areas we’re not already accounting for.
- **Communicate more proactively:** We also made communication errors. Because we expected this to be a fairly subtle update, we didn't proactively announce it. Also, our release notes didn’t have enough information about the changes we'd made. Going forward, we’ll proactively communicate about the updates we’re making to the models in ChatGPT, whether “subtle” or not. And like we do with major model launches, when we announce incremental updates to ChatGPT, we’ll now include an explanation of known limitations so users can understand the good and the bad.

## What we’re learning

This launch taught us a number of lessons. Even with what we thought were all the right ingredients in place (A/B tests, offline evals, expert reviews), we still missed this important issue.

Here are the big takeaways we’re taking forward:

- **We need to treat model behavior issues as launch-blocking like we do other safety risks:** We place a significant weight on aligning model values with people's welfare, both in preparing our short-term deployments and in shaping our long-term research strategy. However, our process for reviewing general model behavior has been less robust and formalized relative to areas of currently tracked safety risks (more insights in our public [system cards⁠(opens in a new window)](https://cdn.openai.com/gpt-4o-system-card.pdf)). We now understand that personality and other behavioral issues should be launch blocking, and we’re modifying our processes to reflect that.
- **We need to be critical of metrics that conflict with qualitative testing:** Quantitative signals matter, but so do the hard-to-measure ones, and we’re working to expand what we evaluate.
- **Our evals won't catch everything:** We can't predict every issue. For frontier risks we’re aware of (more details in our [preparedness framework⁠](https://openai.com/index/updating-our-preparedness-framework/)), we have extensive evaluation and testing in place before launch. But for more subtle or emerging issues, like changes in tone or style, real-world use helps us spot problems and understand what matters most to users. Sometimes our evals will lag behind what we learn in practice, but we’ll keep moving quickly to fix issues and prevent harm.
- **There’s no such thing as a “small” launch:** We’ll try to communicate even subtle changes that can meaningfully change how people interact with ChatGPT.

One of the biggest lessons is fully recognizing how people have started to use ChatGPT for deeply personal advice—something we didn’t see as much even a year ago. At the time, this wasn’t a primary focus, but as AI and society have co-evolved, it’s become clear that we need to treat this use case with great care. It’s now going to be a more meaningful part of our safety work. With so many people depending on a single system for guidance, we have a responsibility to adjust accordingly. This shift reinforces why our work matters, and why we need to keep raising the bar on safety, alignment, and responsiveness to the ways people actually use AI in their lives.

- [2025](https://openai.com/news/?tags=2025)

## Author

[OpenAI](https://openai.com/news/?author=openai#results)
{% endraw %}
