---
slug: wtf-is-aws-lambda
date: 2020-01-19
title: 'AWS Made Simple: WTF is AWS Lambda?'
description: 'Sooo... what is the deal with this whole serverless thing?'
published: true
banner: './banner.png'
---

## Before we start

If you don't feel like reading and prefer to watch a bunch of quick (less than 3 minutes) videos - this blog series is based on a 💰free 💰[egghead.io](https://egghead.io/s/km6vr) video collection I've published recently, check it out here: [Learn AWS Lambda from scratch](https://egghead.io/lessons/aws-wtf-is-aws-lambda?pl=learn-aws-lambda-from-scratch-d29d?af=6p5abz).

## WTF is AWS Lambda?

When someone says that:

> Yeah, we're going **serverless** with AWS

They probably mean [AWS Lambda](https://aws.amazon.com/lambda/)

![AWS Lambda Homepage](https://thepracticaldev.s3.amazonaws.com/i/hcs1olbhsbydgpejm6ti.png)

<figcaption>I'm not an expert but this is quite a lot of text for a landing page tbh</figcaption>

AWS Lambda is an Amazon Web Services service which operates in a Function as a Service (FaaS for short) model. What that means is that you, as a developer, are only responsible to provide the function (that is - the _code_) that needs to be executed once the lambda function runs. Everything else (servers, infrastructure, scaling) is taken care of by AWS.

### This is what **serverless** means.

Of course, there **ARE** servers, but you, as a developer, you don't have to care about provisioning and maintaining servers. Which means that you get to focus on implementing your business logic and solving your problems, instead of having to tinker with servers and worry whether they'll survive the next wave of customers.

_Okay, but this sounds expensive_

It's not! With AWS Lambda you only pay for the compute time you consume.

What that means is that a lambda function can take up to **15 minutes** to execute, but if your function takes only a second to run you will only pay for this one single second of execution time.

The best part is - **you don't start paying right away**.

AWS Lambda free tier usage includes **ONE FREAKING MILLION** free requests per month.

In other words - you only start paying one your service gets rather popular, one million request per month is pretty significant.

Once you go above a million requests per month, you pay only \$0.20 per million requests. (An exercise for the reader: calculate how many requests you'd need to handle before the cost of your serverless functions becomes more than a cup of coffee from Starbucks).

### What can I use to create my lambda functions?

Excellent question.

There are a number of programming languages supported in AWS Lambda:

![A list of programming languages supported by AWS Lambda](https://thepracticaldev.s3.amazonaws.com/i/faca7hjqt04vi36rh7gs.png)

.NET, Go, Java, Node.js, Python, Ruby - a little something for everyone (_no jQuery though_).

### How do I trigger a lambda function?

A lambda function can be triggered by quite a lot of sources.

![A list of AWS Lambda triggers](https://thepracticaldev.s3.amazonaws.com/i/uqvwqu66uex2pr4l3c1m.png)

Honorable mentions:

- AWS Gateway can trigger your lambda function by an HTTP request (useful when you want to create an API
- AWS IoT - you can **literally** have a "push to prod" button on your desk
- AWS S3 - a lambda function can be triggered by uploading a file to an S3 bucket (if you don't know what a bucket is, check [this post](https://dev.to/tlakomy/wtf-is-amazon-s3-840) out.)
- AWS DynamoDB - you can trigger a lambda function by for instance adding an item to your DynamoDB table

It's a **ridiculously** powerful paradigm, allowing you to compose major workflows and business logic out of serverless functions, while keeping your costs extremely low.
