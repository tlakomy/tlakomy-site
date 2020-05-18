---
slug: seven-years-as-a-developer-lessons-learned
date: 2019-05-13
title: '7 years as a developer - lessons learned'
description: "Lessons I've picked up along the way"
published: true
banner: 'https://thepracticaldev.s3.amazonaws.com/i/e2wlolwr0rdxb9ygkw5z.png'
---

_Time flies, doesn't it?_

My programming journey began in 2012, with my very first C++ internship. Frankly, I had absolutely no idea what I was doing (this hasn't really changed). Nevertheless, I've picked up some lessons along the way.

**Disclaimer:** There isn't going to be any code whatsoever in this post.

## Question: What is the most important language in programming?

It's English.

Or Spanish.

Or Chinese.

Or Polish.

Or whatever you use to communicate with other people at work.

# Talking to humans is way more important than talking to machines

Programming is a team sport. On rare occasions you might see a brilliant product built from scratch by a single person ([CodeSandbox](http://codesandbox.io) is a great example, although Ives has hired a couple of folks lately) but in the vast majority of cases - you need a team.

Communication skills can make or break a project. Don't worry, it's not just you and your team, NASA is [struggling with that](https://sma.nasa.gov/docs/default-source/safety-messages/safetymessage-2009-08-01-themarsclimateorbitermishap.pdf?sfvrsn=eaa1ef8_4) as well.

~~Soft~~ Professional skills can be more important to a project success than purely technical ones. Who cares if you hire 5 of the best database experts in the world if they refuse to talk to each other and you end up with 5 different instances of MySQL, Aurora and MongoDB.

# Have a deep understanding of what you are building and why

Most people are happier when they have a sense of purpose. This applies to work as well.

As a software developer your goal is not to translate JIRA to JavaScript, Trello to C# etc.

Your goal is to _solve problems_ with code.

If you have a deep understanding of the system you're building/maintaining then you can make decisions outside of pure tech. Is this feature even necessary? What problem does it solve? Can we solve this problem any other way? Do we **want** to solve this problem in the first place?

This line of thinking is sometimes referred to as _business context_, but if you want to do your job well, you should not only understand the context, but to be able to shape and influence that. You don't have to have a C-level position in your organisation to influence your product. Or at least - to understand it.

# If code review in your team is a stressful experience you are doing it terribly, terribly wrong

Oh boy. Code review.

We really don't think about it but the act of putting our work **out there** in public and have it reviewed by multiple other people is a bit unique to our profession. No wonder people can be anxious about the whole experience.

I have personally seen people submitting code reviews when X wasn't in the office, or Y was at a business trip. X was a brilliant programmer but enduring through his code review process was a chore. If you leave 50 nitpicky (is that a word?), unkind comments under a PR of someone who is a junior programmer, you are not proving your superiority as a developer. You are proving that you're not a good human being.

> Okay, but what do I do when I see that this feature is completely broken?

Stand up. Reach out to that person **in private**. Talk to them, find out why they implemented that code this way.

Most people do not want to write bad code. And if they do, they probably are dealing with constraints you're not aware of. They could also not be really good at programming (yet) and it's your opportunity to shine as a mentor.

# Something WILL go wrong, be prepared

According to wikipedia:

> Murphy's law is an adage or epigram that is typically stated as: "Anything that can go wrong will go wrong".

It's one of those things that are **too** true. Always assume that something may break when designing a system.

If you're building a login form, assume that people will copy&paste an entire book into the password field.

If you're building a WYSIWYG window, assume that someone will try to break it, and they are likely to succeed.

If you have a database, it will go down at some point. If you haven't tested recovering your database from a backup, it's not a backup.

If you're doing a live demo in front of an audience - make sure that the demo works online, offline, upside down and under water.

# Don’t be afraid to say “I don’t know”

The best part of having a **senior** next to my job title is that I can _finally_ respond to a question saying:

> I don't know, never tried that. I'll take a look and I'll get back to you.

When I was a junior, I was _terrified_ of someone figuring out that I'm a fraud. After a couple of years as a developer - if I haven't seen something, it could be that it wasn't relevant till now. Or I just have another cool piece of tech to learn. Lifelong learning is not a buzzphrase in software development, it's the reality.

Or I'm just an incredible fraudster, managing to fool all those people that I can actually do my job. You never know.

# Learn in public

Once you go from "I don't know" to "Okay, that was interesting" - share that with someone. Write a blogpost, record a video, do a talk at a company knowledge sharing event or just ... tell someone. If you think that something is obvious to _everyone_, it's not. Even the most senior people have something to learn from beginners and vice versa.

Teaching is an incredible way of ensuring that you _really_ understand the subject in question.

As the saying goes:

> When one teaches, two learn - _someone hella smart_

What are **your** lessons learned as a developer?
