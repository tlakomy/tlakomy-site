---
slug: what-is-aws-cdk
date: 2020-05-25
title: "WTF is AWS CDK (Cloud Development Kit) and why it's awesome 🤩"
description: 'description: Unlock a superpower - use a single language for frontend, backend *and* cloud infrastructure'
published: true
banner: './banner.png'
---

Let me start with a quick story.

When I started to learn how to program it was obvious at the time that you need separate languages for frontend and backend. For instance - JavaScript at the front and PHP at the back (which, for the record, is still a valid choice for a web service).

Since then the lines are getting more and more blurry - node.js came to the scene and it allowed us to use JavaScript for BOTH frontend and backend.

The advent of node.js unlocked a huge superpower for JavaScript developers - they could build both part of the stack with a single programming language.

Still, you had to host your application somewhere, you needed a server.

Fast forward a couple of years - we live in 2020, and THE CLOUD is everywhere.

If you were to ask me in the middle of the night _"what is the cloud?"_ I'd probably answer with two things:

_"AWS is essentially a synonym for the cloud in 2020 and will rule the cloud world for quite some time"_

and

"_Why are you in my room in the middle of the night?_"

# What is AWS Cloud Development Kit

In order to have a working webapp you need three things:

- frontend
- backend
- infrastructure to run the app on (or simply put - at least a server)

Now, imagine that you can define **ALL OF THOSE** with a **SINGLE** programming language - TypeScript.

That's what **AWS Cloud Development Kit** allows us to do.

Let me quote the official docs:

> The AWS Cloud Development Kit (AWS CDK) is an open source software development framework to model and provision your cloud application resources using familiar programming languages.

Vast majority of folks who will read this post (yes, that's you my dear reader!) are probably familiar with (or at least - heard of) TypeScript but luckily AWS CDK supports multiple programming languages.

> AWS CDK enables you to model application infrastructure using TypeScript, Python, Java, and .NET.

AWS Lambda, S3 buckets, DynamoDB tables, API Gateways - we can define all those resources (and connections between them) with TypeScript and deploy those to the Cloud without even leaving our editor.

In other words - you can build your **entire** app + infrastructure with a single tool and programming language and provision services all within VS Code, vim or whatever editor you happen to use.

# How does it work?

Cloud Development Kit is built on top of CloudFormation which is an AWS service that allows you to describe a stack in AWS using a static file (either YAML or JSON).

In essence - it's going to convert our code written in TypeScript, to JavaScript, which will be then converted to CloudFormation and CloudFormation will be used to deploy our infrastructure.

Sounds complicated, right? Luckily CDK abstracts a lot of things away from us, so we get to focus on solving our problems instead of writing YAML by hand.

Let me show you an example, this is how you define an SNS Topic and a SQS queue with CDK:

```
const queue = new sqs.Queue(this, "TestCdkQueue", {
  visibilityTimeout: cdk.Duration.seconds(300)
});

const topic = new sns.Topic(this, "TestCdkTopic");
```

🤯 4 lines of code. 🤯

CDK is not "Infrastructure As Code".

CDK is "Infrastructure **IS** Code".

## CDK Patterns

Since CDK abstracts a lot of things away from us, it's possible to entire architectures defined by other developers from the community.

[CDK Patterns](https://github.com/cdk-patterns/serverless) is an amazing collection of architecture patterns built with CDK for developers to use. All patterns come in Typescript and Python with the exported CloudFormation also included.

![A lambda-based serverless architecture](https://github.com/cdk-patterns/serverless/raw/master/the-destined-lambda/img/arch.png)

<figcaption>This architecture can be built and deployed with a single command 🤯</figcaption>

## Where do I start?

Excellent question!

I'm launching an AWS CDK course on [egghead.io](https://egghead.io/s/km6vr) **soon** so make sure to get a subscription!
It's the best piece of content I've ever created and I'm incredibly proud of it.

By the way - if you'd like to learn some AWS **for free** from yours truly, check out those free video collections on [egghead.io](https://egghead.io/s/km6vr):

- [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
- [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)

Apart from that those are excellent resources that I'm more than happy to recommend:

- https://github.com/eladb/awesome-cdk
- https://aws.amazon.com/cdk/
- https://docs.aws.amazon.com/cdk/latest/guide/home.html
- https://github.com/cdk-patterns/serverless
