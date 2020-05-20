---
slug: create-an-aws-lambda-function-from-scratch
date: 2020-01-20
title: 'Create an AWS Lambda function from scratch'
description: 'Get started building your very first serverless function'
published: true
banner: './banner.png'
---

## Before we start

If you don't feel like reading and prefer to watch a bunch of quick (less than 3 minutes) videos - this blog series is based on a 💰free 💰[egghead.io](https://egghead.io/s/km6vr) video collection I've published recently, check it out here: [Learn AWS Lambda from scratch](https://egghead.io/lessons/aws-wtf-is-aws-lambda?pl=learn-aws-lambda-from-scratch-d29d?af=6p5abz).

## How do I create an AWS Lambda function?

First up, you'll need to log in to your AWS account.

If you don't have an AWS account, feel free to use my credentials:

```
email: tlakomy@jqueryIndustries.com
password: NeverShareYourCredentialsWithAnyone
```

Once you're in, navigate to **Lambda** (you'll find it under **Compute** section in **Services** menu) and click on `Create function`, you should see something like this:

![AWS Lambda create function menu](https://thepracticaldev.s3.amazonaws.com/i/80u9m72oy56sz8t8wfv5.png)

There are three options available here:

- **Author from scratch** - you'll start with a simple "Hello World" example and you'll be able to implement your function on your own
- **Use a blueprint** - allows you to build a lambda function using a "blueprint". A blueprint in this context means a piece of code and configuration for common use cases, for instance logging updates made to a DynamoDB table or triggering a function when something is uploaded to S3
- **Browse serverless app respository** - allows you to deploy entire sample applications from the AWS Serverless Application Repository. The packages can be either provided by AWS or by the community

The last two options are definitely worth checking if you have a feeling that the problem you're trying to solve has already been solved by someone else, no need to re:Invent (get it?) the wheel. Not to mention you can learn quite a lot by checking them out.

One more thing before we create our function:

**AWS Lambda is not a global service**

What that means it that you'll create your functions in one of the AWS regions:

![Available AWS Regions](https://thepracticaldev.s3.amazonaws.com/i/k4ut814yd4jigyncmv3i.png)

I'm going to be deploying my functions in Frankfurt because it's only 143h by foot from my office:

![Google Maps showing the distance between Poznan, Poland and Frankfurt](https://thepracticaldev.s3.amazonaws.com/i/a814t1iyzwdrg3dgcp4e.png)

### Runtime

In order to create a function we need to specify what kind of runtime we're going to use - in other words, which programming language do we want to write our function in. There are a number of programming languages supported by AWS Lambda:

![A list of programming languages supported by AWS Lambda](https://thepracticaldev.s3.amazonaws.com/i/se6lreabzirp3pzmxooa.png)

<figcaption>I have a strange feeling that node.js is not exactly a language though </figcaption>

There's Go, JavaScript, Java, Python, .NET and Ruby - a little something for everyone. If you're coding on Halloween you might even decide to raise the dead and write your functions in Python 2.7 [*].

Okay, let's roll - we're going to choose Node.js as our runtime, leave
everything as default and create a function.

**Behold, a Lambda function designer**

![AWS Lambda function designer](https://thepracticaldev.s3.amazonaws.com/i/xnh2h97niwt3609ijor8.png)

There are a couple of things to notice here.

First up - every Lambda function (this is also true for every resource of AWS) has a unique ARN (Amazon Resource Name) which you can see in the upper right corner.

Each function can have multiple triggers and destinations.

As discussed in my [previous post](https://dev.to/tlakomy/wtf-is-aws-lambda-47ba), your functions can be triggered by various sources, including:

- _AWS Gateway_ can trigger your lambda function by an HTTP request (useful when you want to create an API)
- _AWS IoT_ - you can literally have a "push to prod" button on your desk
- _AWS S3_ - a lambda function can be triggered by uploading a file to an S3 bucket
- _AWS DynamoDB_ - you can trigger a lambda function by for instance adding an item to your DynamoDB table

When it comes to destinations - your function invocation records can be sent to multiple places: an SQS queue, a SNS topic or an event bus. Useful when you'd like to keep a track of your lambda function failures (or receive an email every single time someone calls your function, terrible idea btw)

This is the our lambda function in its beauty:

```
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

Not much, huh?

It's a convention when it comes to AWS Lambda that every function implements a `handler` function that gets called whenever a lambda gets triggered. In this case, we'll always return a response with HTTP code 200 (`OK`) and a body `'Hello from Lambda!'`)

### How do I test my function?

In order to test (and actually call) our function, we need to create a test event. To do that (you guessed it), click on the **Test** button.

Before we're allowed to test our function, we need a test event to be sent to it. Every time a lambda function gets executed, it'll receive an `event` as its argument (you can see it in the example above)

Currently we're not doing anything with the event so let's call it "myTestEvent" (or whatever) leave everything as default and smash that **save** button

![Creating a test event screen](https://thepracticaldev.s3.amazonaws.com/i/acok09909ikmzrw2j6bb.png)

Okay, now that we're ready - let's click on **Test** again and see the result:

![An AWS Lambda function invocation result](https://thepracticaldev.s3.amazonaws.com/i/zr2nbvta83wkue4am3ja.png)

**Congrats!!** You've just ran your very first lambda function!

We can see the result we've specified earlier, as well as logs detailing the function duration, memory size, max memory used and billed (ka-ching!) duration. Note that you won't get charged for the first million invocations of your lambda function in a month.

That's it! In the next post we'll tackle adding an API Gateway trigger to a AWS Lambda function to create a REST API
