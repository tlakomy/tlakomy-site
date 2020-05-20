---
slug: prototype-ship-amend-repeat
date: 2019-09-18
title: 'Prototype. Ship. Amend. Repeat.'
description: 'Done is better than perfect'
published: true
banner: './banner.jpg'
---

Here's something I've seen time and time again, and I'm absolutely guilty of it myself.

A developer is given a piece of a system to implement. Because it's 95% likely that whoever is reading this is probably a web developer, let's say it's a _Component_.

Developers thrive on complexity, but also abstraction.

We enjoy solving problems, but we avoid solving the same problem multiple times. When given a task to build a clock, we wonder if it'll work after migrating humankind to Mars.

Identifying common patterns is an incredibly useful skill for a developer. Seeing that multiple pieces of the codebase are solving similar problems not only makes our lives easier, it also creates this weird sensation.

There's something _pleasant_ about creating this amazing abstraction. This one component that takes a limited set of props and it can do all kinds of things. More DRY than my jokes.

![Admiral Ackbar from Star Wars - "It's a trap" reference](https://thepracticaldev.s3.amazonaws.com/i/aniyb45iqpgvm10zobvo.jpg)

<center>**It's a trap**</center>

Okay, it **can** be a trap.

What happens way too often is that this generic component we've been so proud of is used once or twice.

Even worse, we've developed an abstraction in, well, abstraction and it doesn't actually cooperate that well with the rest of the code. Even if all unit tests are green and there's 120% test coverage.

A recent example - a rather generic component built for a design system turned out to be nearly completely unusable once applied to an actual problem in an app.

Here's the catch though: **those issues can be caught earlier**.

What I prefer (and recommend) is to solve the problem once, write a prototype and ship it. Note that "shipping" doesn't have to mean "literally ship it to prod", it may also mean - use this piece of code somewhere in your codebase.

It works? Awesome, now it's time for abstractions and generics (sorry my Golang friends). As a bonus, because your previous implementation is well tested (of course, right?), you'll get to see whether the brand new abstraction is not breaking production-ready code.

Generic components are difficult to design from scratch. Staring at a vast nothingness of a brand new file in your editor of choice can be daunting. I've been there. What I **don't** recommend is calling a meeting where instead of one developer staring at an empty screen there's five developers instead.

Developing (even a faulty one) prototype is **much** better. It gives you something to discuss, to reason about. Your initial ideas can be approved, validated, or, let's be honest, challenged much quicker. Not to mention it's much easier to get feedback on smaller pieces of code as opposed to convincing your team members to review 1200 lines.

I'm not saying - _"Move fast, break things"_.

What I'm saying is: _"Move fast with small, incremental steps towards your goal. Do your best not to break anything. You will, sometimes, but everyone does too"_

And of course - good luck!
