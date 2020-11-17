---
slug: deconstructing-the-eventbridge-etl-pattern
date: 2020-11-17
title: 'Deconstructing "The EventBridge ETL" CDK Pattern'
published: true
banner: './banner.png'
---

## The EventBridge ETL

This blogpost is based on [Deconstructing "The EventBridge ETL" AWS Serverless Architecture Pattern
](https://www.youtube.com/watch?v=8kg5bYsdem4) by [Matt Coulter](https://twitter.com/nideveloper)

Check out the pattern here: https://github.com/cdk-patterns/serverless/tree/master/the-eventbridge-etl
Or clone it by running:

```bash
npx cdkp init the-eventbridge-etl
```

Components:
- S3
- AWS Fargate
- Amazon EventBridge
- AWS Lambda
- DynamoDB

Purpose:
- taking a csv file form S3 and inserting all records into a DynamoDB table
- Standard ETL (extract, transform, load) process

Diagram:

![](assets/banner.png)

1. Upload a CSV file to Amazon S3
2. After file upload, an object creation event is sent to SQS with a Lambda function subscribed to that queue (note that file contents are not a part of the message). This lambda (and every other function in this pattern) is throttled intentionally to two concurrent executions.
3. Lambdas are throttled because this is a massively scalable pattern - if someone were to upload a file with hundred thousand rows, we don't want to start 100k parallel invocations of a lambda function consuming our entire capacity. By using SQS and a throttled Lambda we ensure that no matter how large the file - it'll be processed (in time)
4. Next step uses the AWS Fargate task.

In the meantime, how does **AWS Fargate** fit into the serverless spectrum?

AWS Fargate is AWS serverless container offering. Out of the box, Fargate is just a container (although slightly bigger than the one for Lambda) - as opposed to Lambda there's more flexibility: not only do we get to choose memory size & language (like in Lambda), but we can also choose the container itself.

How "serverless" your Fargate container is depends on what you're going to put in there. In his video Matt argues that not every Lambda is truly serverless - if you run a custom Lambda runtime in a Lambdalith pattern running a custom web framework it's not really server**less** as there's **a lot** to manage on your side.

To quote AWS docs:

>AWS Fargate is a technology that you can use with Amazon ECS to run containers without having to manage servers or clusters of Amazon EC2 instances. With AWS Fargate you no longer have to provision, configure, or scale clusters of virtual machines to run containers.

5. The Fargate task is going to download a file from S3 using AWS SDK and execute a Python script (the bucket name and file name are passed in as env variables). Why couldn't the Lambda function download the file itself? Imagine if the input csv filesize was in terabytes (or petabytes!), in order to download a file like that you'd need a container that can run longer than 15 minutes. For this kind of purpose, Fargate will be more flexible and cheaper (even though you could for instance process the file in chunks using multiple Lambda functions)
6. Once the file is downloaded in the container, each row will be sent to **Amazon EventBridge**.
7. Once the rows are sent as events are on an EventBridge bus, they will be transformed by `Transform Lambda` function (upper right in the diagram). The purpose of this Lambda function is to take EventBridge events and transform their payload into JSON. This JSON becomes a payload of an another EventBridge event
8. This event is being listened to by a `Load Lambda` which takes that event and saves it in a DynamoDB table. It'll also send a `load` event back to the EventBridge as a confirmation of data being successfully saved into DynamoDB
9. This EventBridge record (and all others) is being consumed by the `Observer Lambda` which forwards logs to CloudWatch for observability.

Make sure to follow [@cdkpatterns](https://twitter.com/cdkpatterns) on Twitter!