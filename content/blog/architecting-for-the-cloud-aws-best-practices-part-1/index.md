---
slug: architecting-for-the-cloud-aws-best-practices-part-1
date: 2019-12-02
title: 'Architecting for the Cloud - AWS Best Practices (part 1)'
description: "A summary of 'Architecting for the Cloud - AWS Best Practices' whitepaper"
published: true
banner: './banner.png'
---

This series is my attempt to summarise the AWS ["Architecting for the Cloud - AWS Best Practices"](https://d1.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf) whitepaper in a slightly more digestable form because not everyone feels like reading a 50 page PDF file.

# Differences Between Traditional and Cloud Computing Environments

In a traditional computing environment, a company needs to provision capacity based of their best guess of a maximum peak traffic (for instance - Black Friday). Which means that for extended periods of time, a vast majority of your capacity is essentially wasted.

This is more or less why Cloud Computing was born - you get to use other's (in AWS case - Amazon's) extra capacity for your own purposes. Servers, databases, storage etc. can be started and shut down within hours or even minutes based on the requirements.

There are four main benefits of Cloud Computing with AWS:

- provisioning services whenever they are needed
- using global AWS infrastructure to deploy your applications physically closer to the users (in a traditional model you'd have to build your own data centers where users are)
- large number of managed services means that you get to focus on building your product and the low-level complexity is abstracted away by AWS
- being able to architect for cost, with the option to track how much your organization is spending on each service

# Design Principles

## Scalability

There are two ways in which an IT architecture can be scaled:

- **vertical scaling** - upgrading a single resource. Which means more RAM, faster CPU, or more storage capacity. This is a valid approach but up to a limit, you cannot attach infinite amount of RAM to a machine
- **horizontal scaling** - scaling by increasing the number of resources. Sounds easy on paper (_just buy more servers_) but not every application and architecture was designed with a horizontal approach in mind and that makes things tricky.

### Stateless applications

Horizontal scaling is best suited for _stateless applications_. A stateless application is an application that doesn't need the knowledge of previous request sent to this app, and as such - doesn't store the session information. If you're familiar with functional programming - a stateless application is essentially a pure function, always providing the same output given the same input.

Distributing the workload to different machines is easier said than done, there are two main approaches:

- _push model_ - using an _Elastic Load Balancer_ (ELB) in order to distribute incoming traffic to multiple instances running your application. Alternatively, you could use Amazon Route 53 (a DNS service) to implement a DNS round robin, but this is not an elastic solution and comes with its limitations.

- _pull model_ - storing the tasks that need to be done in a queue (Amazon SQS) and having the instances pull their own unit of work that needs to be done.

### Stateless components

Most applications are not 100% stateless, they do maintain some kind of state information (for instance: they need to know whether the user is logged in so it's possible to render content specific to that user). You can still make a portion of these architectures stateless by not storing anything that needs to persist for more than a single request in the local file system.

You could use HTTP cookies to store session information but not only cookies need to be sent with every request, they can also be tampered with on the client side.

A recommended approach would be to store a unique session identifier in an HTTP cookie and storing more detailed user data on the server side. Storing the data on the server creates a stateful architecture so the common solution is to store this information in a database (a DynamoDB is a great choice).

If you need to handle large files, they should go into a storage layer such as Amazon S3 or Amazon EFS, which will help you avoid stateful components.

### Stateful components

There are applications out there that are specifically designed to run on a single machine (for instance - real-time multiplayer games which require extremely low latency). If you're developing an application like this - you don't want to spread the traffic to a random horizontally scaled instance.

A recommended approach for HTTP/HTTPS traffic is to use sticky session feature of an Application Load Balancer to bind a user's session to a specific instance. That ensures that as long as they keep playing - they won't be moved to a different physical machine. In other cases, you might want to implement client-side load balancing. It introduces extra complexity but might be necessary sometimes.

## Disposable Resources Instead of Fixed Servers

In a traditional infrastructure environment you end up buying physical servers, installing them in a data center and manually ssh'ing into them to upgrade packages etc. Not only it's expensive, it can also cost you your entire business if something were to happen to those machines.

With AWS you end up treating servers and all other components as temporary resources, provisioning them only when necessary.

In order to be able to quickly provision multiple identical (or highly similar) resources you can use:

- **Bootstrapping** - a script that you configure when provisioning an EC2 instance for example. It's going to be executed once you launch the instance and it's possible to provide configuration details that vary between different environments (staging and production for instance).

- **Golden Images** - certain AWS resources (EC2, RDS and _Elastic Block Storage_ EBS) can be launched from a _golden image_, which is a snapshot of a resource in a given moment. This approach is generally faster than bootstrapping an instance and allows to quickly an reliably launch additional resources by essentially "cloning" an instance.

It's possible to configure an instance and save its configuration to create an AMI (_Amazon Machine Image_) - afterwards you can use it to launch as many instances as you want. There are multiple AMIs available in AWS, so before creating your own - check whether your case was already solved.

Containers are also an option - both Docker (using Amazon ECS - Elastic Container Service) is supported, as well as Kubernetes (with Amazon EKS).

There's also a hybrid model where some parts of the configuration are captured in a golden image, while others are configured dynamically through bootstrap scripts. AWS Elastic Beanstalk follows this model - it allows you to use AMIs to start up a new service as well as run bootstrap actions through .ebextensions files, as well as environment variables.

### Infrastructure as code

Infra can (and should) be stored as code and version controlled. With AWS CloudFormation templates it's possible to create and manage resources and update them in an orderly and predictable fashion. This simplifies reusing architectures, as well as extending existing ones which is highly useful for larger organisations.

### Automation

Traditionally, someone had to manually react to incidents in order to increase storage capacity, deploy additional servers etc. With AWS, it's possible to automate those steps away.

Examples:

- Amazon EC2 Auto Recovery: you can create a CloudWatch alarm that monitors an EC2 instance and automatically recovers it if something bad is going on. This is definitely better than restarting the machine manually.
- Auto Scaling: you can scale the number of EC2 instances, DynamoDB, ECS and EKS capacity as needed, based on the desired capacity. That way, you don't end up running more services than needed (wasting money) or running less services than required (and not being able to keep up with the traffic. If a peak traffic time is known (for instance, more traffic during business hours or huge Black Friday sale) - it's possible to schedule auto scaling group to kick off during a certain time, so it's not necessary to wait until AWS "notices" bigger traffic.
- Using alarms an events: for instance, creating a CloudWatch alarm that sends a SNS message when a particular metric goes beyond a specified threshold. Those messages can then execute a lambda function, send a message to SQS queue or send a request to HTTP or HTTPS endpoint, allowing you to react to an event.
