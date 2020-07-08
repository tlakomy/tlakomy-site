---
slug: elastic-beanstalk-deployment-policies
date: 2020-07-08
title: 'AWS Made Simple: Elastic Beanstalk deployment policies'
published: true
banner: './banner.png'
---

I'm currently studying for AWS Certified Developer: Associate exam and the post you're about to (hopefully!) enjoy is a part of my learning process - learning in public helps me a lot!

# AWS Elastic Beanstalk deployment policies

Elastic Beanstalk (that's an odd name, btw) provides several options for how new deployments are processed which is a great thing - it gives you freedom in deciding how exactly do you want to update your production application.

With development environments you may be okay with the whole thing going down for a couple of minutes _[citation needed]_ but most production environments are supposed to be up 24/7/365.

There are a couple of deployment policies available in Beanstalk:

-   _All at once_
-   _Rolling_
-   _Rolling with additional batch_
-   _Immutable_
-   and _Traffic splitting_

(along with options that let you configure batch size and healthcheck behaviour during deployments).

In this context, a _batch_ refers to the number of EC2 instances that will be launched during your next deployment. Even if you have a huge budget, you definitely would like to avoid spinning up unnecessary instances.

By default - your Beanstalk environment uses _All at once_ deployments.

(buuut if you've created your environment with Elastic Beanstalk CLI and did not specify the `--single` option, you'll get an automatically scaling environment that uses _rolling_ deployments).

Let's go through those policies one by one (and you can read more in the official AWS docs [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html)):

## All at once

**All at once** deployment deploys the new version of your app to all of your EC2 instances simultaneously, which means that every single instance in your environment will be out of service for a short time during the deployment.

This type of deployment is fast (because no new instances are being created) but you must be okay with some downtime (I'd suggest giving it a shot in the middle of the night, when your traffic is the lowest).

## Rolling

**Rolling** deployment deploys a new version in batches but **without creating any new EC2 instances**. For example, if your production EB environment has 10 EC2 instances and a batch size is set to 2, a rolling deployment will first deploy the new version to the first two instances, before moving to the next two and so on.

What's important to highlight here is that even though all of your instances are not down at the same time - this type of deployment reduces your envionment's capacity by the number of instances in a batch, which may lead to worse user's experience.

Luckily this deployment is not very long because no new instances are being created, allowing you to avoid spending \$\$.

## Rolling with additional batch

**Rolling with additional batch** is very similar to a **Rolling** deployment with one core difference - this type of deployment ensures that your full capacity is maintained during the deployment process.

Full capacity is ensured by launching a new fresh batch of instances before starting the actual deployment - it's a little more costly (since you need to launch new instances) but your environment's capactiy is not limited.

## Immutable

Since you're looking into **Immutable** deployments, I'm going to assume that you have extra budget - you'll need it!

Immutable update launches a fresh group of instances and **then** deploys new version of your environment on all of them. In other words - for the duration of deployment, you'll have double the usual amount of EC2 instances launched.

This is not cheap but if something goes wrong during the deployment - you only need to kill the new instances (because your current production environment is **not** affected before switching to the new instances).

## Traffic splitting

You know, let me just quote the docs here:

"**Traffic splitting** – Deploy the new version to a fresh group of instances and temporarily split incoming client traffic between the existing application version and the new one."

"For the Traffic splitting deployment policy you can configure the following:

-   **Traffic split** – The initial percentage of incoming client traffic that Elastic Beanstalk shifts to environment instances running the new application version you're deploying.
-   **Traffic splitting evaluation time** – The time period, in minutes, that Elastic Beanstalk waits after an initial healthy deployment before proceeding to shift all incoming client traffic to the new application version that you're deploying."

# I'd like to learn more about AWS, how do I do that?

Excellent question!

A while ago I've launched an entire AWS course on [egghead.io](https://egghead.io/s/km6vr) - check out [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz)

[![A Build an App with the AWS Cloud Development Kit course header](./cdk-logo.png)](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz)

It's the best piece of content I've ever created and I'm incredibly proud of it 🌟

Apart from that, I also have [egghead.io](https://egghead.io/s/km6vr) collections about serverless topics, such as:

-   [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
-   [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)
