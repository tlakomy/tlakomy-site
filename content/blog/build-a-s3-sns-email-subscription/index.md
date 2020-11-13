---
slug: build-a-simple-graphql-server-with-apollo-and-cdk
date: 2020-11-13
title: "Build a file upload email subscription with CDK, S3 and SNS"
published: true
banner: './banner.png'
---

(Before we start - if you've never heard of AWS Cloud Development Kit, I've created a quick, 64 minute course on [egghead.io](https://egghead.io/s/km6vr) - [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz))

## First steps

Let's start by creating an empty AWS CDK project, to do that run:

```bash
mkdir s3-upload-notifier #the name of the project is up to you
cd s3-upload-notifier
cdk init app --language=typescript
```

After installing all necessary dependencies and creating a project run `npm run watch` in order to enable a TypeScript compiler in a `watch` mode.

Next, open up the newly created project in your editor of choice (I'm using VSCode but this makes no difference here).

There's an empty CDK stack created for us `lib/s3-upload-notifier-stack`:

```ts
import * as cdk from '@aws-cdk/core';

export class S3UploadNotifierStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
    }
}
```

Before we move on, let's figure out:
- what do we want to accomplish?
- which CDK constructs can help us with our goal?

*What do we want to accomplish?*

We'd like to be notified via email whenever someone is going to upload an object to a S3 bucket. Perhaps we're teaching an university class and we'd like to be notified whenever someone completes their assignment and uploads it to S3.

*Which CDK constructs can help us with our goal?*

Obviously we're going to need an S3 bucket to upload the objects to. We could use a pre-existing one, but in this example we're going to create a bucket with out stack.

Next up - since we want to _subscribe_ to an object upload event, we're going to need a SNS (Simple Notification Service) topic to subscribe to and send an email.

We also need to ensure that S3 will send a notification to that topic whenever there is an object upload event.

## Let's get to work

First up, let's install all necessary dependencies:

```bash
npm install @aws-cdk/aws-s3 @aws-cdk/aws-sns @aws-cdk/aws-s3-notifications @aws-cdk/aws-sns-subscriptions
```

Next, create an S3 bucket and an SNS topic:

```ts
// We're going to leave everything by default, but you might want to enable versioning on the bucket
const dataBucket = new s3.Bucket(this, 'DataBucket');
const topic = new sns.Topic(this, 'Topic');
```

Afterwards, add an event notification to `OBJECT_CREATED` event:

```ts
// Whenever there's an OBJECT_CREATED event, send a notification to SNS topic
dataBucket.addEventNotification(
    s3.EventType.OBJECT_CREATED,
    new s3Notifications.SnsDestination(topic),
);
```

And lastly - we need to create an `emailSubscription`. But here's a catch - how do we make our CDK stack customizable? After all, we don't want to hardcode an email address in our codebase. Privacy concern aside - what if we simply want to reuse that stack with a different email?

In order to avoid that problem, we're going to use a [`CfnParameter`](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ssm.CfnParameter.html):

```ts
// This value is provided as a CloudFormation parameter
const emailAddress = new cdk.CfnParameter(this, 'subscriptionEmail');

topic.addSubscription(
    new snsSubscriptions.EmailSubscription(
        // Since we're using TypeScript, we will immediately know if we've forgot to convert the `value` to a `string`
        emailAddress.value.toString(),
    ),
);
```

Let's deploy it! Run `cdk deploy` and observe the result:

```bash
❌  S3UploadNotifierStack failed: Error: The following CloudFormation Parameters are missing a value: subscriptionEmail
```

*Whoops*

Since we're using a `CfnParameter` in our stack, we need to provide a value, luckily `cdk deploy` accepts a `parameters` option:

```bash
cdk deploy --profile=aws-cdk --parameters subscriptionEmail="myemail@email.com"
```

Once the stack has been successfully deployed, you'll get an email sent to address you've provided. After accepting the subscrption, whenever a file will be uploaded to `DataBucket`, you'll receive an email!

(BTW: If you'd like to experiment further, try calling a lambda function instead)

The end result should look more or less like this:

```ts
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as sns from '@aws-cdk/aws-sns';
import * as s3Notifications from '@aws-cdk/aws-s3-notifications';
import * as snsSubscriptions from '@aws-cdk/aws-sns-subscriptions';

export class S3UploadNotifierStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // We're going to leave everything by default, but you might want to enable versioning on the bucket
        const dataBucket = new s3.Bucket(this, 'DataBucket');
        const topic = new sns.Topic(this, 'Topic');

        // Whenever there's an OBJECT_CREATED event, send a notification to SNS topic
        dataBucket.addEventNotification(
            s3.EventType.OBJECT_CREATED,
            new s3Notifications.SnsDestination(topic),
        );

        // This value is provided as a CloudFormation parameter
        const emailAddress = new cdk.CfnParameter(this, 'subscriptionEmail');

        topic.addSubscription(
            new snsSubscriptions.EmailSubscription(
                // Since we're using TypeScript, we will immediately know if we've forgot to convert the `value` to a `string`
                emailAddress.value.toString(),
            ),
        );
    }
}
```

31 lines of code!

As an experiment, you can check out the CloudFormation template that CDK uses under the hood for this stack, running `cdk synth > template.yml` will generate a 255 lines of YAML.

I don't know about you, but I prefer to maintain 31 lines vs. 255 😎

You can check out the source code for this example here: https://github.com/tlakomy/cdk-s3-upload-notifier