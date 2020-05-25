---
slug: why-im-excited-about-serverless
date: 2020-05-23
title: "Why I'm excited about serverless as a frontend engineer"
description: 'a.k.a. focus on things you care about and let others manage the rest'
published: true
banner: './banner.png'
---

# Back to the basics

Basically every non-trivial web app (e.g. Uber for Bunnies) is composed out of three basic components, think of it as a recipe:

- **Visuals (frontend)** - a layer that users interact with, so your good ol' trio of HTML/CSS/JavaScript (with a dash of jQuery plugins, tracking scripts and whatnot. Sometimes even with some animations sprinkled here and there)
- **Logic (backend)** - the _brainz_ of your app. This is where the vast majority of logic lives and here be dragons (and databases). Before the node.js days working with backend was more or less a completely separate skillset than writing frontend code (e.g. PHP backend and jQuery-driven frontend)
- **Where-it-all-lives (infrastructure)** - the website you're seeing right now is hosted _somewhere_. Code and logic doesn't exist in a vacuum - something **has** to run it. Therefore to handle production-grade load of your Uber for Bunnies website you need a server (or servers) (or an old PC in the corner of your room running your entire site, I don't judge).

![A picture of two bunnies](https://dev-to-uploads.s3.amazonaws.com/i/kmrxsx8ejz0ouyneg8ql.jpeg)
_All of this just to move those two c h u n k s from point A to point B_

# Problems

I've personally been focused strictly on frontend part of this trio for the last couple of years. From vanilla JS, through jQuery, Backbone, Angular, CoffeeScript (_I don't want to talk about it_), React, and React to React.

To be honest here for a second - I found the rest of that to be straight up _daunting_ for the majority of my career.

Writing a node.js script to perform an action? _Sure I can do that!_

Configuring a MySQL DB from scratch, provisioning a server to run it and spending 4 days to be able to save a `todo` in a database? _Please tell me we have an IE8 bug to fix, I don't want to do that_

After a couple of years I'm fairly confident that given enough time and will power I'm able to figure out quite a lot of stuff on my own but here's the thing:

**I don't want to do everything on my own**

At this point I've lost track of how many times I've said _"this shouldn't be this difficuly, it's 20XX!_ in my career.

As a developer I'm getting paid for building products, solving problems, causing bugs and fixing them. And I love that!

Building products that allow others to solve problems is my jam.

Setting up entire node.js sever to host a single index.js function that will get called a couple of times per day is not.

# Focusing on what's important

The reason why I'm so excited about serverless from a frontend engineer perspective is that it allows me to delegate away my problems.

And it's not the first time I see a shift like this happen.

Q: _Why did I move from Backbone to React?_

A: Because React abstracted away _a lot_ of problems I've personally had with building Backbone apps (e.g. performance issues and lack of reusable components)

Q: _Why I'm excited about serverless?_

A: Because serverless technologies abstract away the problems I don't want to deal with (setting up servers, scaling them, hosting my logic etc.) and allow me to just run my code whenever I need it to.

To make things simple - in this post when I mention `serverless` I'm referring to AWS Lambda (feel free to check out [WTF is AWS Lambda](https://tlakomy.com/wtf-is-aws-lambda)).

Why do we refer to AWS Lambda as a serverless technology? Because yes, there **are** servers but you don't _have_ to think about them.

The whole problem of managing, provisioning, scaling and whole lotta -ing is managed by somebody else. And the best part is that this 'somebody' is AWS - a company that has _world class experts_ on the job, not to mention more servers that you could count in a month _[citation needed]_.

Honestly, for me it's as if a whole new world of possibilities has opened 🎉

A Full Stack Serverless Developer might be the most desired engineering role in the next couple of years. For a very good reason - having someone on the team that knows how to best combine various serverless technologies to solve your problems (with greatly optimized costs!) is going to be _incredibly_ valuable.

This slide from AWS Re:Invent 2017 is a glimpse in the future we're already seeing with the advance of serverless technologies:

![A conference talk slide with 'So what does the future look like? All the code you ever write is business logic'](https://dev-to-uploads.s3.amazonaws.com/i/36k1q8170qp2ddx22lgg.jpeg)

You know, I'm just really happy to have more tools in my toolkit that I get to play with and use to build better features, products and solving problems faster (and cheaper!)

# I'm hyped, where do I start?

Excellent question!

If you'd like to learn some AWS **for free** from yours truly, check out those free video collections on [egghead.io](https://egghead.io/s/km6vr):

- [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
- [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)

![AWS Cloud Development Kit egghead.io course logo](https://dev-to-uploads.s3.amazonaws.com/i/9p45p74bklgke0gsjjrl.png)

I'm also launching an AWS Cloud Development Kit [egghead.io](https://egghead.io/s/km6vr) soon and to sum up why you shoul...might be hyped to take it:

**AWS Cloud Development Kit** allows you to build the **_entire_** stack (frontend, serverless backend, AWS infrastructure) using a **single** programming language - TypeScript!

🔥🔥🔥
