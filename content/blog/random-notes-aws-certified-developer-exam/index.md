---
slug: random-notes-aws-certified-developer-exam
date: 2020-06-26
title: 'Random notes taken while preparing for AWS Certified Developer Associate exam'
published: true
banner: './banner.png'
---

I'm currently studying for the AWS Certified Developer Associate exam and I'll be taking my notes here, maybe you'll find it useful

BTW - I also produce my own **free** content for [egghead.io](https://egghead.io/s/km6vr) which will help you pass the exam:

-   [Learn AWS Lambda from scratch](https://egghead.io/playlists/learn-aws-lambda-from-scratch-d29d?af=6p5abz)
-   [Build serverless applications with AWS Serverless Application Model (AWS SAM)
    ](https://egghead.io/playlists/learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9?af=6p5abz)
-   [Learn DynamoDB from scratch (work in progress)](https://egghead.io/playlists/learn-aws-dynamodb-from-scratch-21c3)

## Notes

-   Elastic Beanstalk provides platforms for programming languages (Go, Java, Node.js, PHP, Python, Ruby), application servers (Tomcat, Passenger, Puma), and Docker containers.

-   DynamoDB: One **read request unit** represents one strongly consistent read request, or two eventually consistent read requests, for an item up to 4 KB in size. Transactional read requests require 2 read request units to perform one read for items up to 4 KB.

-   DynamoDB: One **write request unit** represents one write for an item up to 1 KB in size. If you need to write an item that is larger than 1 KB, DynamoDB needs to consume additional write request units. Transactional write requests require 2 write request units to perform one write for items up to 1 KB.

-   If you'd like to create an API with API Gateway that will be available to other developers for \$\$, the feature you should use is Usage Plans and API Keys - you can configure usage plans and API keys to allow customers to access selected APIs at agreed-upon request rates and quotas that meet their business requirements and budget constraints.

-   AWS Systems Manager Parameter Store provides secure, hierarchical storage for configuration data management and secrets management. You can store data such as passwords, database strings, and license codes as parameter values.

-   Route 53: CNAME record are used to map one name to another. An A record is used to point a domain or subdomain to an IP address

-   CloudTrail is used to record all API calls

-   X-Ray is used to provide tracing data and debug your applications. It also be used cross accounts.

-   Cognito User Pools are managed by AWS, if you'd like to use a 3rd party authorizer, you need to implement a Lambda Authorizer

-   KMS Encryption SDK allows you to implement encryption best practices in your application. KMS Encrypt API Call might be used to encrypt small amounts of data (like a password) but they are not designed to encrypt application data.

-   **AWS Storage Gateway** - The Storage Gateway service is primarily used for attaching infrastructure located in a Data center to the AWS Storage infrastructure. The AWS documentation states that; "You can think of a file gateway as a file system mount on S3."

-   **Cognito** - A user authenticates against the **Cognito User Pool** to receive a set of JWT tokens. Those tokes are later exchanged for temporary AWS credentials in **Cognito Identity Pool**

## Cloudwatch

By default Cloudwatch monitors: CPU, Network, Disk and Status Check.

**RAM Utilization is a custom metric. By default EC2 monitoring is 5 minute intervals, unless you enable detailed monitoring (not free) which will then make it 1 minute intervals**

By default CloudWatch logs will store the data indefinitely (and you can change the retention of each Log Group at any time)

**You can receive data from any terminated EC2 or ELB instance after its termination**

CloudWatch custom metrics - the minimum granularity that you can have is 1 minute

Cloudwatch can be used on premise (just download the CloudWatch agent)

-   Cloudwatch monitors performance (for instance - CPU utilization on an EC2 instance)
-   Cloudtrail monitors API calls in the AWS platform
-   AWS Config records the state of your AWS environment and can notify you of changes

## Kinesis:

-   Kinesis Streams - has shards which can handle up to 1000 writes per second and 5 reads, both in range of single digit MBs. Requires an EC2 fleet of consumers that are going to process the data.

-   Kinesis Hirehose - allows for automatic data processing with a Lambda function and the data is stored directly in S3 (both analyzed and non-analyzed data). Data can be also moved into RedShift but it'll need to be stored in S3 and copied to RedShift afterwards.

![Different Kinesis products](https://dev-to-uploads.s3.amazonaws.com/i/8ij2clmyao3nhlhysog7.png)

-   The number of shards can waaay exceed the number of EC2 consumers, since they can process multiple shards at the same time.

> A shard is a uniquely identified sequence of data records in a stream. A stream is composed of one or more shards, each of which provides a fixed unit of capacity.

> Each shard can support up to 5 transactions per second for reads, up to a maximum total data read rate of 2 MB per second and up to 1,000 records per second for writes, up to a maximum total data write rate of 1 MB per second (including partition keys). The data capacity of your stream is a function of the number of shards that you specify for the stream. The total capacity of the stream is the sum of the capacities of its shards.

## Random stuff:

-   SQS Delay Queues allow you to postpone delivery of new messages for a number of seconds. For instance we might want to add a delay of few seconds to allow for updates to the database to process before sending a notification to customers.

-   The maximum size of an SQS message is 256kB, for something bigger (up to 2GB) we can use S3 to store them. You'd need to use Amazon SQS Extended Client Library for Java to manage them.

-   When using AWS CLI, the default page size (that is - the number of responses) is 1000. That may cause problems, timeouts etc. In order to fix those errors use the `--page-size X` option of AWS CLI which will set the page size to X (so if you have 1000 items in a bucket and the page size is 100, it'll send 10 requests to the API). You can also limit maximum number of items returned with `--max-items`

-   An AWS Lambda function can access VPC Resources and to do that you need to provide a subnetId and a securityGroupId to the lambda function\

-   AWS CLI `--dry-run` option: The `--dry-run` option checks whether you have the required permissions for the action, without actually making the request, and provides an error response. If you have the required permissions, the error response is DryRunOperation, otherwise it is UnauthorizedOperation.

## One more thing:

![AWS Cloud Development Kit egghead.io course logo](https://dev-to-uploads.s3.amazonaws.com/i/9p45p74bklgke0gsjjrl.png)

I've also launched an AWS Cloud Development Kit course on [egghead.io](https://egghead.io/s/km6vr) - make sure to check out [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz)!

**AWS Cloud Development Kit** allows you to build the **_entire_** stack (frontend, serverless backend, AWS infrastructure) using a **single** programming language - TypeScript!

🔥🔥🔥
