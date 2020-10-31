---
slug: build-a-simple-graphql-server-with-apollo-and-cdk
date: 2020-10-31
title: "Build a simple GraphQL server with Apollo Server and AWS CDK"
published: true
banner: './banner.png'
---

(Before we start - if you've never heard of AWS Cloud Development Kit, I've created a quick, 64 minute course on [egghead.io](https://egghead.io/s/km6vr) - [Build an App with the AWS Cloud Development Kit](https://egghead.io/courses/build-an-app-with-the-aws-cloud-development-kit?af=6p5abz))

## First steps

Let's start by creating an empty AWS CDK project, to do that run:

```bash
mkdir graphql-lambda #the name of the project is up to you
cd graphql-lambda
cdk init app --language=typescript
```

After installing all necessary dependencies and creating a project run `npm run watch` in order to enable a TypeScript compiler in a `watch` mode.

Next, open up the newly created project in your editor of choice (I'm using VSCode but this makes no difference here).

There's an empty CDK stack created for us `lib/graphql-lambda-stack`:

```ts
import * as cdk from '@aws-cdk/core';

export class GraphqlLambdaStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
    }
}
```

## Create a Hello, World! lambda function + an API Gateway

Let's start small - before we create a GraphQL server with Apollo Server, let's ship a "Hello, World!" lambda with CDK. We're going need two packages - `@aws-cdk/aws-lambda` and `@aws-cdk/aws-apigateway`.

In a separate terminal window (remember not to kill `npm run watch` process) run:

```bash
npm install @aws-cdk/aws-lambda @aws-cdk/aws-apigateway
```

While you're waiting for `npm install` to finish, go ahead and create a new `lambda` directory in the root of your project. Inside of it, create a `graphql.ts` file with following content:

```ts
exports.handler = async function () {
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: `Hello, world!`,
    };
};
```

As you can see, this lambda function is not doing anything GraphQL related (yet!) - just a plain old "Hello World!".

Next, import previously installed packages in  `lib/graphql-lambda-stack`, as well as `path` package from node:

```ts
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';
```

And create a lambda function with `lambda` imported from `@aws-cdk/aws-lambda`:

```ts
const graphqlLambda = new lambda.Function(this, 'graphqlLambda', {
    // Where our function is located - in that case, in `lambda` directory at the root of our project
    code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    // What should be executed once the lambda is invoked - in that case, the `handler` function exported by `graphql.ts`
    handler: 'graphql.handler',
    // Our runtime of choice - in that case, node.js 12.x
    runtime: lambda.Runtime.NODEJS_12_X,
});
```

and expose this function via an API Gateway:

```ts
new apiGateway.LambdaRestApi(this, 'graphqlEndpoint', {
    handler: graphqlLambda,
});
```

At this point, your `lib/graphql-lambda-stack` should look more or less like this:

```ts
import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';

export class GraphqlLambdaCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const graphqlLambda = new lambda.Function(this, 'graphqlLambda', {
            code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
            handler: 'graphql.handler',
            runtime: lambda.Runtime.NODEJS_12_X,
        });

        new apiGateway.LambdaRestApi(this, 'graphqlEndpoint', {
            handler: graphqlLambda,
        });
    }
}
```

Awesome! Let's run `cdk deploy` and test if our "Hello, world!" function works fine!

This is going to take a minute but if everything goes fine - you'll get an endpoint that you can `curl` (or visit in a browser) to witness the glory of a "Hello, World!" message.

## Adding Apollo Server

Next, go into the `lambda` directory and run `npm init -y` in order to create a `package.json` with all the default values.

Once this is done, run:

```bash
npm install apollo-server-lambda graphql
```

inside of `lambda` directory. Your `package.json` should look more or less like this:

```json
{
  "name": "lambda",
  "version": "1.0.0",
  "description": "",
  "main": "graphql.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server-lambda": "^2.19.0",
    "graphql": "^15.4.0"
  }
}
```

Next, add replace the contents of `graphql.ts` with:

```ts
const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

exports.handler = server.createHandler();
```

As we can see, our lambda function will now import `apollo-server-lambda` (which is an AWS Lambda integration of Apollo GraphQL Server). 

Next up it'll create `typeDefs` - currently we have a single field `hello` which is of type `String` but this can be obviously extended.

This GraphQL server has a single resolver - when the server will be asked for `hello`, it'll return `Hello world!` (but this time from a GraphQL server!).

And lastly we're creating the `ApolloServer` passing in the `typeDefs` and `resolvers` and using the `createHandler()` call to create a lambda function handler.

Before we deploy this definitely-production-ready server, let's make sure we can test that easily by enabling the in-browser GraphQL playground:

```ts
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // If you'd like to have GraphQL Playground and introspection enabled in production,
    // the `playground` and `introspection` options must be set explicitly to `true`.
    playground: true,
    introspection: true,
});
```

Nice! Now our GraphQL server is ready to be deployed, let's run `cdk deploy` once more.

After a successful deploy, copy&paste the endpoint address provided by CDK into the browser.

Let's test our server, run a following query in the GraphQL playground:

```graphql
query {
  hello
}
```

and if you'll receive a following response

```json
{
  "data": {
    "hello": "Hello world!"
  }
}
```

then congrats, you've just shipped an AWS Lambda powered Apollo GraphQL server with AWS Cloud Development Kit (feel free to add this to your LinkedIn!).

You can check out the source code for this example here: https://github.com/tlakomy/cdk-graphql-lambda-example