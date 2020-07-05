---
slug: run-cdk-lambda-function-locally
date: 2020-07-05
title: 'AWS CDK Made Simple: Run a Lambda function locally'
published: true
banner: './banner.png'
---

Every single development workflow looks like this and building stuff with AWS Lambda is no exception:

![A fake book cover with a 'Changing Stuff and Seeing What Happens' title](./book.jpeg)

Luckily, there's a way of testing AWS-CDK powered lambda functions on our local machine, without fiddling with the AWS Console.

It's definitely easier and faster than re-deploying a function to _THE CLOUD_ every time we want to test something.

In order to do that, we need to have **AWS SAM** - AWS Serverless Application Model installed on our machine (if you'd like to get a short introduction to AWS SAM, check out [WTF is AWS Serverless Application Model (AWS SAM)](https://egghead.io/lessons/aws-wtf-is-aws-serverless-application-model-aws-sam?af=6p5abz))

## How do I run a Lambda function built with CDK locally?

Imagine that we have a simple CDK stack, with a single Lambda function that we'd like to be able to run on our local machine:

```ts
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

export class SampleCdkAppStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const myLambda = new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset('lambda'),
        });
    }
}
```

**In order to do that, go through the following steps:**

1. Run

```bash
cdk synth --no-staging > template.yaml
```

in order to create a CloudFormation template and store it in a `template.yaml` file

2. Find the logical ID for your Lambda function in template.yaml. It will look like `MyFunction12345678`, where `12345678` represents an 8-character unique ID that the AWS CDK generates for all resources. The line right after it should look like `Type: AWS::Lambda::Function`
3. Run the function by executing:

```bash
sam local invoke HelloLambda12345678
```

4. We can also pass custom events to the function, to do that - for instance, given a sample `hello.json` file:

```json
{
    "path": "/hello/friends",
    "body": "hello"
}
```

5. To execute a lambda function locally with a custom event, run

```bash
sam local invoke HelloLambda3D9C82D6 -e sample_events/hello.json
```

# I'd like to learn more, how can I do that?

Excellent question!

I've launched an entire AWS CDK course on [egghead.io](https://egghead.io/s/km6vr) - check out [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz)

[![A Build an App with the AWS Cloud Development Kit course header](./cdk-logo.png)](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz)

It's the best piece of content I've ever created and I'm incredibly proud of it 🌟

Apart from that, I also have [egghead.io](https://egghead.io/s/km6vr) collections about serverless topics, such as:

-   [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
-   [Learn AWS Serverless Application Model (AWS SAM) from scratch](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)

On top of that those are excellent resources that I'm more than happy to recommend:

-   https://github.com/eladb/awesome-cdk
-   https://aws.amazon.com/cdk/
-   https://docs.aws.amazon.com/cdk/latest/guide/home.html
-   https://github.com/cdk-patterns/serverless
