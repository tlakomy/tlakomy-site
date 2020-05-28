---
slug: create-a-netlify-function-from-scratch
date: 2020-05-28
title: 'AWS (?) made simple: What is a Netlify function?'
description: 'a.k.a. focus on things you care about and let others manage the rest'
published: true
banner: './banner.png'
---

# ~Simple~

Let's face it, AWS (a.k.a "the cloud") is not simple.

Even though some AWS services have the world 'simple' in their name (e.g. S3, SQS, SNS) they are anything but simple.

I'm personally trying my best to level the playing field by [learning AWS Lambda in public](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz) but still, serverless functions are not simple and may be extremely confusing for a beginner.

Even in my [egghead.io AWS Lambda collection](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz) we're able to actually _call_ the lambda function via a GET request only after the third lesson in the series. Not to mention that we're manually creating an API Gateway and the thing is that maybe you don't even **want** to know what an API Gateway is?

Maybe you're just trying to solve a problem with a serverless function without getting a PhD in AWS?

> I want to create a function, ship it _somewhere_ and call it via an API, why is this so confusing? 😿

# Serverless made painless

![Netlify Functions homepage](https://dev-to-uploads.s3.amazonaws.com/i/337jvy4n8th5hphdkaqi.png)

_"Severless made painless"_ is the goal that [Netlify Functions](https://www.netlify.com/products/functions/) team had in mind while developing that service.

In my humble opinion, they've managed to do it right.

What they do is that they abstract AWS Lambda away from you.

In other words, with Netlify functions you're literally _only_ responsible for providing the code - the rest is configured, provisioned, deployed, scaled and tested (okay, without that last one - _write tests pls_) for you.

Note: if you find this kind of tech interesting I'd still recommend you to learn AWS Lambda but here's a thing - it's just a recommendation.

You don't **have** to learn AWS in order to start using serverless functions. Better yet - an AWS account is not required at all!

# How do I do that?

Allow me to present you a "_How do I create a Netlify Function_" tutorial:

1. In your app/site hosted by Netlify, create a `functions` directory
2. Inside of that directory create a hello.js file:

```js
exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: 'Witaj świecie!', // Our function is Polished 🇵🇱
    };
};
```

3. Deploy the site

**THAT'S IT**

Your function is now deployed and can be called from the outside! [Give it a shot](https://tlakomy.com/.netlify/functions/hello)

What happens behind the scenes? **I'm glad you asked!**

Netlify is going to:

-   deploy your code to AWS (to be more precise - to `us-east-1` AWS region)
-   it'll provide the function with 1024MB of memory (so your dreams of running Slack with Lambda are over, apologies)
-   and a 10 second execution limit (more than enough time to execute even my code which is more often than not slow or terrible, sometimes both).
-   make sure that your function can be called from the Internet by setting up an API Gateway in front of it

I'm a **huge fan** of solutions like this.

The kind where you get to solve your problem without reinventing the wheel when you're just trying to get some work done.

I'm not (yet?) an expert on Netlify Functions but from what I can see, they have lots and lots of interesting use cases and I'm definitely giving them a shot!

![A screenshot of netlify function use cases](https://dev-to-uploads.s3.amazonaws.com/i/1bznqvck43e695psw2pi.png)

(I'm especially going to dive into Netlify Identity because manging auth is **NOT** fun)

If you've enjoyed this post, I'd appreciate if you'd share it on Twitter/FB, maybe even subscribe to my newsletter? 🥳
