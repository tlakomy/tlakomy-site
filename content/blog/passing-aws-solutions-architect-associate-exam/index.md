---
slug: passing-aws-solutions-architect-associate-exam
date: 2019-09-18
title: 'Passing AWS Solutions Architect Associate exam'
description: "If I've passed this exam, you can do it too, seriously"
published: true
banner: './banner.png'
---

_Disclaimer: this post is based on **my** personal experiences, I'm not saying this is the best way possible, but it worked for me and I think it might work for you too._

# So you want to be a Solutions Architect, huh?

A while ago my manager [Maciej](https://twitter.com/mthenw) gave me a goal to pass the [AWS Solutions Architect Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/) exam on my first attempt. Our company, [OLX Group](https://www.olxgroup.com/) is using AWS quite heavily and since the company is betting on AWS, its engineers should bet on it as well.

A bit of background: I'm a JavaScript/React developer with 7 years of frontend experience. Which means that I was not an expert on networking, databases, security etc. (I'm still not, but that was even more true couple of months ago).

According to AWS website, this exam is meant for:

>The AWS Certified Solutions Architect - Associate examination is intended for individuals who perform a solutions architect role and have one or more years of hands-on experience designing available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.

Which is not exactly saying: "you've been doing Backbone.js for 2 years, it'll be a cakewalk for you".

Spoiler: it's wasn't.

# Learning path

Our project at work is based on serverless stack (including, but not limited to: DynamoDB, serverless framework, Lambda, S3, SQS, CloudFormation) so I had a *bit* of a headstart. In general, the more actual, practical experience you have with AWS, the better.

When it comes to passing the actual exam, I've started with an excellent AWS Certified Solutions Architect Associate 2019 course on [A Cloud Guru](https://acloud.guru/learn/aws-certified-solutions-architect-associate). It's around 12 hours of content, the videos are really well made and [Ryan](https://twitter.com/KroonenburgRyan) is a fantastic teacher.

After finishing the course, I thought that I was ready for the exam. Unfortunately (at least in my case) going through the videos is not enough. My very first practice exam was an embarrassment, I clearly needed to learn more: "The fuck is a Kinesis, is that a vegetable?"

In order to learn more, I went through AWS Certified Solutions Architect – Associate Level course on [Linux Academy](https://linuxacademy.com/course/aws-certified-solutions-architect-2019-associate-level/). It's **much** longer than A Cloud Guru one (over FOURTY hours of videos) and I highly recommend watching the videos at 1.5x speed, especially if this is not your first rodeo with AWS. Linux Academy has also fantastic Labs where you get to actually build and configure stuff in AWS (for instance - your very own VPC and a load balancer).

Okay, after two courses I was 100% ready for the exam, right? **Nope**.

I was unable to get more than 69% (nice) on practice exams. So many points were lost on tricky VPC and IAM questions. If only there was like a website with free videos that I could watch to learn more...

I've started watching **Re:Invent 2018** videos on YouTube and it helped **A LOT**. Make sure to watch this excellent [Securing Your Virtual Data Center in the Cloud talk](https://www.youtube.com/watch?v=2DF_EXmxbLM), as well as [Become an IAM Policy Master in 60 Minutes or Less](https://www.youtube.com/watch?v=YQsK4MtsELU). I wouldn't pass the exam without those videos.

Multiple people told me to read AWS Whitepapers and FAQs(including the famous Well-Architected framework one). It's a great advice but I personally was straight-up unable to go through S3 FAQ without falling asleep. Instead, I went through [Tutorials Dojo Cheatsheets](https://tutorialsdojo.com/aws-cheat-sheets/) which are the same thing, but shorter.

# Passing the exam(s)

If you were to listen to only one of my pieces of advice, listen to this one:

Buy [this](https://www.udemy.com/aws-certified-solutions-architect-associate-amazon-practice-exams/) exam set on Udemy and try to pass them all. I paid 50 złotys (around 12 USD, probably less than you've spend on Starbucks this week).

I cannot stress this enough, not only are those exam questions on exactly the same level as the real one but also if you pick the wrong answer on a question (you will), there's a really detailed explanation which one was the correct answer and **why**.

It's not going to be easy, probably a whole weekend, but it's 100% worth it. 

# Okay, how do I choose the right answer? Is it always Lambda?

Well, kinda.

There are definitely some patterns and things you can expect at the exam. I'm going to list some of the things I can remember, but for the love of jQuery, do not select Lambda as an answer without reading the actual question because I told you so.

* Read the whole question. Twice. And then once more.
* You will be expected to know how to access DynamoDB from EC2 (hint: sending DB keys over email to someone is not a good idea)
* It’s (almost) never third-party. If you can do something using an AWS service or a third-party product, the answer is not likely to be the third-party. Except Splunk, for some reason
* Make sure to remember various EBS storage types. You will get a couple of questions on that, free points!
* If you can connect API Gateway, DynamoDB and Lambda, it’s the correct answer. Those three things are AWS lovechild, and Bezos (and whoever creates the tests) seems to be really proud of them.
* AWS uses the exam as a marketing tool so it’s not likely that "X is not possible in AWS" to be the correct answer. 
* I personally had little to no questions about connecting on-premise datacenter to AWS - probably another marketing strategy. _Why would you keep your data on your filthy on-premise when you could move everything to **the cloud**_
* A company wants to move their existing MQ messaging system to AWS - the answer is Amazon MQ, not SNS. SNS is not really compatible with things like RabbitMQ and it will require additional development to migrate that bit of your stack to AWS.
* Databases are ~30% of the exam, make sure to understand differences between them. That was really weird, as I was definitely expecting more networking stuff and not three questions on Aurora and 5 on Redshift.
* Understand the difference between Reserved, Scheduled Reserved, On-Demand etc. EC2 instances. Again, this **will** be on the exam, free points
* If a question mentions something taking less than 15 minutes, it’s probably Lambda
* Make sure to understand the difference between long and short polling in SQS
* Understand the difference between a Network ACL and a Security Group. Consider getting a "SGs are stateful, NACLs are stateless" tattoo on your forearm
* Understand different S3 storage options. If you need to store the data till Half Life 3 releases, use Glacier
* You cannot upload data directly to Glacier using Amazon Console, for some reason
* If you can copy and paste something OR use CloudFormation, it’s always CloudFormation

And the last one, something that nearly caused me not to be able to take the exam in the first place:

**You are required to bring TWO IDs (one with your signature)**

I have no idea what happens if you don't own two ID documents ¯\\_(ツ)_/¯

With that being said, good luck! If you found this post interesting, something is not clear, or you'd like to call me an idiot because I made a typo - feel free to reach out to me on my [Twitter](https://twitter.com/tlakomy).

# Good luck!