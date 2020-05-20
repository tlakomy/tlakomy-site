---
slug: five-reasons-why-you-might-use-aws-lambda
date: 2020-01-23
title: '5 reasons why you might use AWS Lambda for your next project'
description: '#6 - to get richer than Jeff Bezos and buy Amazon with cash'
published: true
banner: './banner.png'
---

## Before we start

If you don't feel like reading and prefer to watch a bunch of quick (less than 3 minutes) videos - this blog series is based on a 💰free 💰[egghead.io](https://egghead.io/s/km6vr) video collection I've published recently, check it out here: [Learn AWS Lambda from scratch](https://egghead.io/lessons/aws-wtf-is-aws-lambda?pl=learn-aws-lambda-from-scratch-d29d?af=6p5abz).

## Why do I need that?

This is the kind of question we tend to ask ourselves before we dive deep into a new technology.

Learning something new is always useful (and I do **highly** recommend constantly trying to expand your horizons) but what's even more useful is understanding what kind of problems we can solve with this shiny new thing in our toolkit.

That's why I figured out that before we move forward with the **Learn AWS Lambda from scratch** series, we'll quickly take a look at the common AWS Lambda Use Cases to understand what problems we can solve with lambda and serverless

## AWS Lambda Use Cases

- **HTTP API** - This is the most obvious (?) one. By using Lambda you can implement and deploy your backend logic to the cloud and invoke those functions only when necessary via an HTTP call. By combining API Gateway and AWS Lambda not only you'll minimize costs (because you'll only pay for the execution time of your functions, and the first 1M requests are free) but also use a highly-managed and scalable service without having worry about your own servers.

- **Processing data** - If your application processes a lot of data stored in DynamoDB you can trigger your Lambda function whenever you write, update or delete items in that table. Those events can trigger lambda functions which are going to process, analyze and can push this data to other AWS services. In other words - you can create an entire data processing pipeline by gluing different AWS resources together with AWS Lambda.

- **File processing** - Imagine that your app allows users to upload pictures to an S3 bucket. Your functions can be executed whenever (and only when) a new file gets uploaded, which can generate other versions of this file (with different resolutions for example) and for instance, store them in `my-amazing-app-thumbnails` bucket. What matters is that you get to call your logic **on demand** and only when it's actually needed

- **Real time processing** - If you have significant traffic you can use AWS Lambda and Kinesis to process real-time streaming data for application activity tracking, click stream analysis and a whole bunch of smart user analytics stuff I'm absolutely not qualified to write about so I'll stop now.

**Okay, now it's the time for the best one**

- **PUSH TO PROD BUTTON** (I mean, Internet of Things) - AWS Lambda functions can also be triggered by IoT devices (like Amazon Alexa). What that means that you can **literally** build a **push to prod** button with AWS.

You can have **THIS** on your desk:

![A giant ENTER key](https://thepracticaldev.s3.amazonaws.com/i/z8gmipwsucvyypn1nwei.jpg)

Make sure to teach Alexa the "rollback" command before teaching her to push to prod though
