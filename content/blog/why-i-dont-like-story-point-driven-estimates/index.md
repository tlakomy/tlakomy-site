---
slug: why-i-dont-like-story-point-driven-estimates
date: 2020-10-17
title: 'Why (frontend) testing matters'
description: 'Because well tested code does not wake you up at 2am'
published: true
banner: './banner.jpg'
---

_Disclaimer: all of this is my personal opinion, you are more than welcome to disagree - let's chat, I'd love to learn your perspective!_

Software engineering estimates are **ridiculously** hard.

Let's face it, when a developer tells you on Monday that:

>Oh yeah, I'm finishing that feature, it'll be merged to `main` branch today!

you can translate that to:

>There's a non-zero chance that it'll be pushed to code review this week.

Bear in mind that it's not because developers are slacking at work (even though the more senior you are, the more time you spend on Slack, but _that's a discussion for another time_).

There are multiple reasons why this happens - unforeseen requirements popping up in the middle of a sprint, tests that take a little longer to write due to legacy code, a tricky manual testing flow, deployment issues, just to name a few.

Unfortunately an ever-changing (or dare I say - agile?) environment is a part of our job. Some people think that's exciting, some folks thrive in managing growing complexity of software, some just want to _merge this feature and be done with it_.

Here's a thing though - other teams, stakeholders, your manager are probably not going to be very happy if every single ticket you're assigned to takes sometime between an hour and 40 months.

That's why we're constantly asked to **estimate** our work, which is the bane of our existence. I'm yet to meet anyone who enjoys estimating their work (although I've noticed that some consider themselves to be very good at estimating *other people's* work).

## The art of estimation

Back in 2013, I had my very first fulltime job as a Junior Software Engineer. At some point I was assigned my first very own large feature to implement and ... estimate.

>So, Tomasz - when is it going to be ready?

Here's what I thought:
>_crap, crap, crap, I have no idea?! Nobody taught me how to estimate, what do I say?! I don't want to appear slow, what if they find out that I'm an imposter?_

Here's what I said:
>I think it'll be ready in 2 weeks!

(_It wasn't_)

7 years later, estimation is still... tricky, to say the least.

In 2015 I was introduced to the concept of **story points**. Since everyone _[citation needed]_ uses JIRA, let me quote what Atlassian has to say about story points:

>Many agile teams, however, have transitioned to story points. Story points rate the relative effort of work in a Fibonacci-like format: 0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100. It may sound counter-intuitive, but that abstraction is actually helpful because it pushes the team to make tougher decisions around the difficulty of work.

(_I wonder what a 100 story points ticket looks like, I have a feeling that webpack is somehow involved_)

In essence the idea is to stop for a while before jumping in to implement a feature and **think**. 

_How difficult is this?_

_Is it more difficult to implement than the stuff we did before?_

_Is it possible to split the ticket into multiple smaller ones?_

(I've worked with teams that refused to take anything larger than 8/13 points since it should be split and it works well.)

Asking those questions is a **great** idea and you _should_ be doing that. The questions are not why I'm writing this post.

**Assigning an arbitrary number to JIRA ticket is.**

After the team finishes discussing a feature they have to estimate it (usually using something called a planning poker - to make sure that team members are not influencing each other estimates).

If a ticket is small, then the whole team will (usually) gues...estimate it 1/2 story points and they get to continue 

The _fun_ part begins when there's a range of estimates. I've personally been involved in (too) many discussions whether X is a 3 or 8 story point ticket. Look, having more opportunities for discussion is not a bad idea, but those conversations would often drag for ages. 

I've even personally witnessed engineers **implementing the feature** being discussed **during the meeting**. 

Perhaps establishing a rule of simply selecting a larger estimate would be a good idea?

## The numbers, what do they mean?

Okay, but why am I complaining about assigning (seemingly) harmless numbers to JIRA tickets?

The problem lies in what development teams are doing with story points and how they change the perception of our own work.

Many Agile/Scrum teams are measuring their _velocity_ (which is an amount of story points they usually deliver within a single sprint).

Let's assume that there are two teams contributing to the same codebase - Alpha and Beta.

The Beta team is seemingly beta (_hah!_) than the other team, their velocity is 60 story points, whereas Alpha team usually delivers around 35 points per sprint.

Even though you've never met those developers (mostly because they don't exist) you've most likely already established an unconscious bias regarding their performance. The idea behind velocity is _not_ to do that, obviously, since every team has a different way of estimating but we're only humans - given two numbers, we **will** compare them.

That's not the worst part, let's zoom on a perspective of a single team.

### Why do we even measure velocity?

To optimize for **predictability**.

Velocity does not help you optimize for user's experience, accessibility, performance, value provided, $$ - the only thing that it cares about is:

>Given 100 story points, how long it'll take the team to implement this.

Which would absolutely fantastic if it worked, since business needs to understand when/if features will be shipped to prod. The problem is that, in my experience, it rarely does.

Software engineers struggle to accurately estimate single tickets and now you want us to take the sum of our _wildly inaccurate_ estimates and make decisions based on this? Good luck.

Notice how assigning those numbers changes how we perceive work being done by the team. 

They're asked to estimate (guess) how much work is required to implement a large collection of features and that changes the whole discussion.

Instead of celebrating the amazing work done by them every sprint, the discussion shifts towards:

>Are we on track with the estimates we've provided a quarter ago when we barely understood the problem we're trying to solve?

This is not healthy.

A process like this introduces unreasonable expectations on the team and may cause them to work longer hours/weekends, eventual burnout and that 1on1 "I'm leaving" meeting.

## What should we do instead?

In larger software projects there are three factors that shape the final product:
- the deadline (_when do we need to ship it?_)
- the scope (_what do we need to ship?_)
- the size of the team (_who is going to ship it?_)

Imagine that your startup absolutely has to ship a large feature next quarter.

Your JIRA backlog can barely contain all the tickets, product managers can barely contain their excitement, and developers can barely ship their code to prod because of legacy prod pipelines (but I digress!)

Out of those three factors: **deadline, scope, size of the team**, I propose we set one of them "in stone":

**The deadline.**

>Wait, are you seriously suggesting that we should work with fixed deadlines? I thought that estimating software is difficult/impossible?

Yes. Exactly.

Since given a scope (a list of tickets) we cannot tell for sure _when_ they're going to be done, let's set the _when_ in place and modify only the _what_.

What do we need to solve our user's needs? Can we solve that particular problem without all those bells and whistles? 

In other words - given a deadline of 15 November, take a good look at what is **absolutely necessary** to ship this feature and **throw away everything else**.

And then throw away even more.

Notice how this technique will allow the team to have a laser focus on the problem they're trying to solve. Smaller scope usually results in more resilient code because there's simply more time to consider how it should be implemented (not to mention adding tests!)

Shifting the focus from:

>What do we need to do in order to finish all those tickets before the deadline?

to

>What more can we cut in order to solve our user's problem before the deadline?

helps establish a more healthy relationship between business and developers. The deadlines are met, unfortunately (?) not every idea gets implemented which is not always a bad thing.

Imagine building something that your users absolutely don't want for a year.

Isn't it better to ship something meaningful (even a MVP?) in a quarter and validate if their problems/needs are addressed?

Isn't it better to stop guessing and start focusing on our user's and solving their problems in a predictable fashion?

I honestly think so, but I'd love to hear your perspective 🥳