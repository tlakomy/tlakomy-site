---
slug: aws-cdk-basics
date: 2020-05-29
title: 'AWS Made Simple: AWS Cloud Development Kit basics'
description: 'Unlock a superpower - use a single language for frontend, backend *and* cloud infrastructure'
published: true
banner: './banner.png'
---

## What is AWS CDK?

According to the docs:

> "The AWS Cloud Development Kit (AWS CDK) is an open source software development framework to model and provision your cloud application resources using familiar programming languages."

In other words: AWS CDK allows us to use a programming language that we all know and love (or at least tolerate) - TypeScript - to define and provision an infrastructure of an app in AWS cloud.

AWS Lambda, S3 buckets, DynamoDB tables, API Gateways - we can define all those resources (and connections between them) with TypeScript and deploy those to the Cloud without even leaving our editor.

You don't have to use TypeScript though! AWS CDK supports TypeScript, JavaScript, Python, C# and Java.

# How does it work?

Cloud Development Kit is built on top of CloudFormation which is an AWS service that allows you to describe a stack in AWS using a static file (either YAML or JSON).

In essence - it's going to convert our code written in TypeScript, to JavaScript, which will be then converted to CloudFormation and CloudFormation will be used to deploy our infrastructure.

Sounds complicated, right? Luckily CDK abstracts **a lot** of things away from us, so we get to focus on solving our problems instead of writing YAML by hand.

# How do I install AWS CDK on my machine?

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?refid=em_127222) (if you don't have one already).
1. Install **AWS CLI (Command Line Interface)**. Consider using [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) which is available for Linux, MacOS and Windows
1. Configure **AWS CLI** using [this guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
1. To verify that the **AWS CLI** has been successfully installed and configured you can run `aws s3 ls` in your terminal which should list all S3 buckets in the region you've chosen.
1. Install **AWS CDK (Cloud Development Kit)** by running `npm install -g aws-cdk`
1. Verify that AWS CDK has been successfully installed by running `cdk --version` in your terminal. You should see something similar to `1.42.0 (build e251651)`.

# How does it compare against AWS SAM, Serverless Framework and CloudFormation?

Great question!

This is honestly a material for an entire blogpost which I'll link here later.

For now let's just say that CloudFormation, AWS SAM, Serverless Framework and CDK are solving a similar problem (defining and deploying your app architecture in the cloud). CDK is different than rest of them because it uses a general purpose programming language to define infrastructure, whereas CF, SAM and Serverless Framework use YAML/JSON.

(BTW: if you'd like to learn more about AWS SAM, check out [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz))

# What's inside of a CDK stack?

In order to create a a sample stack, run:

```
cdk init sample-app --language=typescript
```

in your terminal - that command creates a sample stack with an SQS Queue and SNS Topic.

(_Note: you don't need to know what SQS and SNS are, that's perfectly fine, that's not necessary to read this blogpost and experiment with CDK_).

Behold, our very first CDK stack:

```js
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';

export class HelloWorldStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const queue = new sqs.Queue(this, 'TestQueue', {
            visibilityTimeout: cdk.Duration.seconds(300),
        });

        const topic = new sns.Topic(this, 'TestTopic');

        topic.addSubscription(new subs.SqsSubscription(queue));
    }
}
```

## Anatomy of a stack

Let's go through it from the top:

```js
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
```

The only thing you **need** to import is the `@aws-cdk/core` part. The rest of imports depends on what kind of resources you're going to use in your stack.

For instance - if you're going to create an S3 bucket, you'd import:

```js
import * as s3 from '@aws-cdk/aws-s3';
```

Next, we're creating a new class which extends from `cdk.Stack`. Inside of it, we're going to initialize all resources that we'd like to provision in AWS.

In this example, we see that our stack is going to create an SQS Queue and SNS Topic (again, you don't _have_ to know what they are, just that they are going to be created).

```js
const queue = new sqs.Queue(this, 'TestCdkQueue', {
    visibilityTimeout: cdk.Duration.seconds(300),
});

const topic = new sns.Topic(this, 'TestCdkTopic');
```

Both `sqs.Queue` and `sns.Topic` are instancs of something that is called a **construct** in CDK.

Let me quote the official docs here:

> Constructs are the basic building blocks of AWS CDK apps. A construct represents a "cloud component" and encapsulates everything AWS CloudFormation needs to create the component.

> A construct can represent a single resource, such as an Amazon Simple Storage Service (Amazon S3) bucket, or it can represent a higher-level component consisting of multiple AWS CDK resources.

In other words - a **construct** is an instance of **something** that will get provisioned inside of an AWS cloud.

The best part is that you can create your own constructs and even use constructs that were created by the community!

Every construct takes 3 arguments:

-   `scope` - a context in which the construct is created (it's always `this` to be honest, at least in my experience)
-   `id` - an identifier for a construct which is unique within its scope. (This allows you to call something `myS3Bucket` instead of `S3BucketRANDOM_ID_WHAT_IS_THIS`)
-   `props` - a set of properties for this construct. Since we're using TypeScript, our editor will help us understand what kind of props we can set for each construct and which ones are mandatory.

# I'd like to learn more, how can I do that?

Excellent question!

I'm launching an AWS CDK course on [egghead.io](https://egghead.io/s/km6vr) **soon** so make sure to get a subscription!
It's the best piece of content I've ever created and I'm incredibly proud of it 🌟

By the way - if you'd like to learn some AWS **for free** from yours truly, check out those free video collections on [egghead.io](https://egghead.io/s/km6vr):

-   [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
-   [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)

Apart from that those are excellent resources that I'm more than happy to recommend:

-   https://github.com/eladb/awesome-cdk
-   https://aws.amazon.com/cdk/
-   https://docs.aws.amazon.com/cdk/latest/guide/home.html
-   https://github.com/cdk-patterns/serverless
