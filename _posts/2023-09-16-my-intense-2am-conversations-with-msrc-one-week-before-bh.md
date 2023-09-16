---
title: "My intense 2am conversation with MSRC one week before BlackHat"
categories:
  - Blog
tags:
  - BlackHat
  - Microsoft
  - Vulnerability Management
---

## Research as usual

A couple of months before BlackHat (USA 2023) I got an email from Microsoft Security Response Center. 
They saw the abstract of my [upcoming BlackHat talk](https://www.blackhat.com/us-23/briefings/schedule/index.html#all-you-need-is-guest-32647) and were like, Hi, you’re not planning on dropping any 0days on us are you? 
Nahh we’re sure you’re not *that* type of researcher. 
We must keep our customers safe, you know.

I was expecting this after getting a similar email before my [NoCodeMalware talk at defcon](https://github.com/mbrg/defcon30) last year so I responded casually that they shouldn’t worry, that I won’t be sharing any undisclosed vulns and that I’m happy to share my slides to help them see that. 
Based on my defcon experience I expected that to be it. Ohh boy, was I wrong.

You see, things are fine and dandy until you’re seen as a threat. 
Sure, the PR parts of the house might downplay your research and say that its contrived. 
Heck, they might even plain out say that [you’re wrong and misleading](https://www.wired.com/story/windows-11-power-automate-attack/). 
But the technical folks getting those disclosures will continue being friendly and collaborative in parallel. 
But when you really hit a nerve and they fear you might use it to put them in a bad position, the conversation changes.

## Sunlight is the perfect cure

Three weeks before the conference I had the opportunity to discuss my then upcoming talk with Dark Reading’s Ericka Chicokwsky. 
Ericka was awesome. The conversation went great, we discussed the issues I’m about to discuss, customer’s responsibility in owning their LCNC apps and driving them to action with clear in-your-face-demonstrations like this one. 
That conversation led to [an article](https://www.darkreading.com/black-hat/azure-ad-guests-steal-data-microsoft-power-apps). 
That article found its way to the [top slot on Dark Reading](https://x.com/mbrg0/status/1680244125793124353). Customers saw it, emails started pouring. Microsoft got pissed.

At this point, the conversation with MSRC has been slowly moving forward in the background. 
I gave them  got early access to [powerpwn](https://github.com/mbrg/power-pwn), I shared the agenda and promised to share slides once I have a draft ready. 
I did have a few open vuln disclosures at the MSRC portal waiting for a review with no apparent urgency, and was waiting on a verdict to see if they could be part of the talk. 
Tbh, based on my previous experience reporting logical type of bugs to the Power Platform team and getting them rejected as by-design, I didn’t expect any difference here. 
[Others have had a similar experience](https://www.tenable.com/security/research/tra-2023-25).

## *That* kind of researcher

But the DR article has completely changed the conversation. 
Pretty soon, I was dealing with an entire group of folks across MSRC and the Power Platform team. 
It was clear my case got escalated and I was now considered *that* kind of researcher. 
What followed was an intense week where the team and I were having difficult conversations for a few hours every day (Or mostly night given the time difference). 
The conversation were also very nice and polite, and both MSRC and I made sure to clarify that we appreciate each other’s work. But we did exchange some strong messages. 
At the end of the day it was about trust (isn’t it always?). 
They didn’t trust me to not drop 0days and put customers at risk. 
I didn’t trust them to fix the issues without overwhelming public pressure.

I thought they were trying to get me to pull the talk. 
I feared they would use their corporate magic powers to make it go away along with hours of hard work. 
They never said anything about legal action, but they didn’t have to for it to be there in my head. 
I thought about the negative impact on our company and its employees which works closely with large Microsoft shops. 
I thought about the negative impact to my own credibility.

At this point I also started doubting myself. 
I was doing this to help shed light over a risk that’s already being exploited in the wild. 
To push customers and Microsoft to take responsibility and drive action. 
Or was I just telling that to myself to justify boosting my own ego? I am well aware that security research is a double edged sword, and that what I was about to reveal to the community could be used for good and bad. 
Was I doing everything I can to make sure the outcomes are positive for the industry? 
Talking to the company lawyer who basically told me that I should pull the talk proactively to protect my company didn’t help either (note: at this point, I should have gone to the amazing folks at [EFF](https://www.eff.org). 
So I reached out to some security friends which I absolutely trust and asked for their take on things. 
I wanted to know what they would have done. 
I wanted them to tell me the hard truth.

They did, the hard truth was that I was absolutely fine and doing the right thing. 
They also helped me navigate the sharp edge I had to travel through. 
How do I push forward shedding light over this issue in the most responsible way that leaves everyone better for it afterwards. 
I came off these discussions with a strong sense of purpose and confidence in my path forward. 
Thank you, you know who you are.

Look, this is not what I wanted to be doing a week before the conference. 
I had a full backlog of finishing off my presentation, making final touches to powerpwn and prepping for meetings. 
But most of all, I mostly wanted to have some off time with my family before I disappear for a week.

At this point, I would like to acknowledge the amazing folks I got to meet at Microsoft during these difficult conversations. 
While I am critical at Microsoft as an organization, I have nothing but respect for the MSRC and Power Platform folks who handled my case. 
This could have been a very bad experience, but it wasn’t. 
I wouldn’t say it was stress-free, but the team was professional, respectful, clear and absolutely wanted to find a win-win, and for that I thank them.

## Back to normal

After several hours of video calling, we got to the crux of it. 
From their side, they were worried I was going to drop a 0day DLP bypass vuln which I had reported and they were now fixing (More on that coming soon). 
From my side, I wanted to hold them accountable to my open reports, and for them to publicly acknowledge that recent Power Automate Desktop improvements were a direct result of my defcon research. 
Last year they [downplayed the issue](https://www.wired.com/story/windows-11-power-automate-attack/), [took more than 6 months to (partially) fix it](https://x.com/mbrg0/status/1654143352353312770) and [didn’t provide any acknowledgement](https://support.microsoft.com/en-us/topic/tenant-restrictions-for-power-automate-desktop-machine-registration-f0b44662-7a18-403d-989a-c1445c376768). 
Once we both understood what the other is is really hurting about, fixing these was easy. 
I promised I would not expose any technical details about the vuln and coordinated the messaging around that with them, and they made an effort to acknowledge my research and provided clarity on existing reports. 
Once this was done, you could just feel the change in atmosphere. 
We were no longer in crisis mode, we were building a collaboration.

After the talk, TheRegister’s Brandon Vigliarolo [published an amazing deep dive into the issues I’ve uncovered and what they mean to Microsoft customers](https://www.theregister.com/2023/08/10/microsoft_365_guest_accounts_power/). I’m sure they found it difficult to read. But this time, there was no PR response downplaying the issue.

That same evening I had the opportunity to meet in person some of the Microsoft team members I’ve been video calling with, alongside other folks at Microsoft security organization. Those conversations were absolutely positive. I felt a sincere attempt to do good together. I even got to laugh around with members of a team that was actively working on reacting to the research I’ve just shared, I.e. people who’s weekend I’ve just ruined, who were awesome about it.

## The aftermath

The reaction to my talks has been overwhelming. 
Other hackers and researchers have been really supportive and were asking about what comes next. 
Security engineers and architects at large Microsoft shops asked for practical advice and tooling. 
The reaction in social media as been positive. Thank you everyone.

I’m mostly happy after learning of several huge organizations that are now going through a complete overhaul of their guest strategy and their LCNC initiatives. 
The combined impact of [the](https://www.blackhat.com/us-23/briefings/schedule/index.html#all-you-need-is-guest-32647) [talks](https://www.blackhat.com/us-23/briefings/schedule/#sure-let-business-users-build-their-own-what-could-go-wrong-33403), the [powerpwn](https://github.com/mbrg/power-pwn) tool and the community reaction created urgency and buy-in which security leaders across the industry are now using to go and fix problems that require heavy lifting. 
As we all know, big changes are always put on perpetual snooze until something makes them urgent. 
This is now urgent, which means we now have a window to go ahead and make things better. 
That is the outcome I was hoping for.
