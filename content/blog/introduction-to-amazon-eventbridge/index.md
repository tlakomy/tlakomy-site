---
slug: introduction-to-amazon-eventbridge
date: 2020-05-25
title: 'AWS Made Simple: WTF is Amazon EventBridge'
published: true
banner: './banner.png'
---

In the serverless world, everything revolves around events.

Your (micro)services are responsible for either producting or reacting to different kinds of events (e.g. API calls).

When you have an architecture where (for example) a single API call can trigger a Lambda function that saves something in DynamoDB which triggers an event in DynamoDB Stream which in turn triggers another lambda function which then... _you know what I mean_. Things can quickly become incredibly hard to control and reason about.

[Intro to Amazon EventBridge](https://www.youtube.com/watch?time_continue=16&v=TXh5oU_yo9M) on YouTube showcases an example of an architecture that starts nicely decoupled:

![A simple two-element architecture](https://dev-to-uploads.s3.amazonaws.com/i/c5twuorueumtv6rlbs6m.png)

<figcaption>Two services with well defined boundaries - a dream come true</figcaption>

but quickly spirals out of control, once more and more services are added to the mix we essentially end up with a monolith. The reason it happens is that the `order service` needs to be aware of changes in e.g. the `forecasting service`

![An architecture where an order service talks to three other services](https://dev-to-uploads.s3.amazonaws.com/i/9w9r5ggdr133aqqtvkbq.png)

To sum up: _choreographing APIs is hard_.

Figuring out the happy path (that is - when every service 100% works as intended) is not the hard part - but what happens when something goes wrong? When one of the inter-connected services has a much longer reponse time or it's down entirely?

Managing that kind of complexity is not trivial (to say the least).

# Events are observable, not directed

The idea is to move from directed events to observable ones.

What that means is that services are no longer giving commands to each other:

> Hey, please create an invoice for account #123

instead, they inform (that is - send an event) others (by screaming into the void) that something has happened:

> Customer #456 has ordered a Giant Rubber Ducky, don't ask me why, he just did

That is a _major_ shift - the idea is that whoever sends an event doesn't need to be concerned with who's listening. Similiar to a radio broadcast, which is transmistted over radio waves regardless to whether you're listening to it or not.

An architecture like this leads to less coupling between services because they may not even be _aware_ of each other's existence.

Here's where Amazon EventBridge helps, by providing an event bus:

![An Amazon EventBridge event bus](https://dev-to-uploads.s3.amazonaws.com/i/t5b2cbbrmy8v0qnqsknh.png)

Instead of calling each other directly, with EventBridge services produce events (that's why we call them _producers_) and have other services consume them (that's why we call them _consumers_).

The most important part of the puzzle is the fact that **only** the consumers that are interested in a specific type of event will get it.

So for instance, if a `cancelNewsletterSubscription` event gets sent to the EventBus, a service that doesn't care about this kind of event (e.g. `invoiceService`) will not receive it at all.

As such, EventBus takes away the complexity of ensuring that events end up being forwarded to consumers that are interested in them - allowing developers to build more predictiable interactions between services in AWS.

![A decoupled architecture using Amazon EventBridge](https://dev-to-uploads.s3.amazonaws.com/i/jzoqo3s4e8q3ht77j4ef.png)

# TL;DR

Amazon EventBridge is a serverless event bus service for SaaS and AWS services.

It's fully managed, using the _pay-as-you-go_ model (1 USD, a single dollar, per million events put into the bus).

EventBridge doesn't support only AWS servies - multiple third party SaaS providers are supported as well.

You can check out the video that this post was based on [here](https://www.youtube.com/watch?v=TXh5oU_yo9M)

<hr/>

# One more thing

If you'd like to learn some AWS **for free** from yours truly, check out those free video collections on [egghead.io](https://egghead.io/s/km6vr):

-   [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
-   [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)

![AWS Cloud Development Kit egghead.io course logo](https://dev-to-uploads.s3.amazonaws.com/i/9p45p74bklgke0gsjjrl.png)

I've also launched an AWS Cloud Development Kit course on [egghead.io](https://egghead.io/s/km6vr) - make sure to check out [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz)!

**AWS Cloud Development Kit** allows you to build the **_entire_** stack (frontend, serverless backend, AWS infrastructure) using a **single** programming language - TypeScript!
