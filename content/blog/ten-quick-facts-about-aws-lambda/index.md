---
slug: ten-quick-facts-about-aws-lambda
date: 2020-11-15
title: '10 quick facts about AWS Lambda'
published: true
banner: './banner.png'
---

1. By default there's a limit of 1000 concurrent lambda executions, this can be raised with a support ticket. There are companies that have this limit raised up to tens of thousands concurrent lambda executions.
1. There's a default limit of 75GB of code storage (so up to 10 React apps, lol) which can also be raised
1. It's possible to run Lambda functions on a custom VPC, which is useful when you need to work with RDS, EC2, containers etc. When using a custom VPC you should create a custom subnet for lambda functions to prevent issues when the function will scale massively
1. You get charged for the lambda execution time in 100ms blocks (so if your function takes 10ms to execute, you'll pay for 100ms)
2. With aliases you can run different versions of Lambda function with a different probability (for instance run version A 90% of the time and version B 10% of the time)
1. You can push failed async lambda function invocations to dead letter queue (for instance - SQS)
1. Pricing: 

First 1 million requests per month are free, afterwards you pay $0.20 per additional 1 million requests
- 400,000 GB seconds free per month, afterwards you pay $0.0000166667 for every GB second
- Example: **128MB of Memory x 30M executed per month x 200ms run time per invocation = $5.83**
1. Cold starts affect less than 1% of production workloads (they are much more common in development environments, since there is way less traffic). A duration of a cold start varies from less than 100ms to more than 1s. It's not possible to 'target' warm environments.
2. In order to reuse existing connections (and improve the performance of functions using http(s) request) use keep-alive property in order to reuse TCP connections on warm execution environments. More details: https://bit.ly/reuse-connection
3.  It's possible to use custom runtimes for Lambda (apart from Node, .NET, Python etc.) so if you **really** want to use Haskell you can do that

If you'd like to learn more I'd recommend:

- [Best practices for working with AWS Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Optimizing Lambda Performance for Your Serverless Applications](https://www.youtube.com/watch?v=FTCaOQJvG6Y)
- [Learn you some Lambda best practice for great good!](https://theburningmonk.thinkific.com/courses/learn-you-some-lambda) by [Yan Cui](https://twitter.com/theburningmonk)