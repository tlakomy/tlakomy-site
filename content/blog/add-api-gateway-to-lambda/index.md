---
slug: add-api-gateway-to-lambda
date: 2020-05-27
title: 'AWS Made Simple: Trigger a lambda function via API Gateway'
description: 'Get started building your very first serverless function'
published: true
banner: './banner.png'
---

Once we create an AWS Lambda function we _probably_ want to be able to call it (otherwise, why bother creating a function at all?).

As we established in the [previous](https://tlakomy.com/create-an-aws-lambda-function-from-scratch) [posts](https://tlakomy.com/wtf-is-aws-lambda/), an AWS Lambda function can be triggered by various events - including an HTTP request, which [_citation needed_] is probably the most common use case.

With AWS Lambda you can create a serverless REST API in no time!

Let's start with a brand new lambda function, which as you can see - by default has no triggers.

![A brand new AWS Lambda function in AWS Console](https://dev-to-uploads.s3.amazonaws.com/i/wswwy1kgi1o965aw5dwl.png)

Consider clicking on the `Add trigger` button, who knows what will happen!

![AWS Lambda trigger menu](https://dev-to-uploads.s3.amazonaws.com/i/l46nclle8f4f11361zuy.png)

As we can see, there's a surprising number of things that can trigger a lambda function. Maybe one day we'll be able to trigger lambda by just thinking about it, who knows.

In any case - let's select `API Gateway` from the list and let's create an API from scratch:

![API Gateway creation screen](https://dev-to-uploads.s3.amazonaws.com/i/89qnfoob19dbn6lguvxx.png)

<figcaption>HTTP API and REST API are the most googleable names *EVER*</figcaption>

We can choose between `HTTP API` and `REST API`. `HTTP API` is still in beta but it's cutting edge and we want to one of the cool kids - let's go with that.

Leave everything as default and click on `Add`.

(_Quick note: by default the newly created API will be open, so we'll be able to access it from the Internet. Not a huge deal now, but we might consider being more careful once our lambda functions deal with sensitive data etc._)

**Lo and behold!**
**We have created an API Gateway and connected it to our Lambda function**

![API Gateway trigger connected to AWS Lambda](https://dev-to-uploads.s3.amazonaws.com/i/fhfm5xcqsh4eqdhwanak.png)

(Consider adding this skill to your LinkedIn, more than happy to endorse you)

Our brand new API endpoint will look more or less like this:

`https://RANDOM_STUFF.execute-api.eu-central-1.amazonaws.com/default/MY_FUNCTION_NAME`

And once we paste it into our browser, something magical will happen - a `"Hello from Lambda!"` string will appear on our screen 🎉

This is **fantastic** - now we're able to create our own APIs in no time, and the whole process takes minutes (if not seconds!)

## Óne more thing!

If you don't feel like reading and prefer to watch a bunch of quick (less than 3 minutes) videos - this blog series is based on a 💰free 💰[egghead.io](https://egghead.io/s/km6vr) video collection I've published recently, check it out here: [Learn AWS Lambda from scratch](https://egghead.io/lessons/aws-wtf-is-aws-lambda?pl=learn-aws-lambda-from-scratch-d29d?af=6p5abz).

![AWS Cloud Development Kit egghead.io course logo](https://dev-to-uploads.s3.amazonaws.com/i/9p45p74bklgke0gsjjrl.png)

I'm also launching an AWS Cloud Development Kit [egghead.io](https://egghead.io/s/km6vr) soon and to sum up why you shoul...might be hyped to take it:

**AWS Cloud Development Kit** allows you to build the **_entire_** stack (frontend, serverless backend, AWS infrastructure) using a **single** programming language - TypeScript!

🔥🔥🔥
