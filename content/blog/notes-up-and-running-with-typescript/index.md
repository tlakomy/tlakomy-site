---
slug: notes-from-up-and-running-with-typescript
date: 2020-11-08
title: "Notes from Up and Running with TypeScript on egghead.io"
published: true
banner: './banner.png'
---

I've decided to revisit a [Up and Running with TypeScript](https://egghead.io/courses/up-and-running-with-typescript?af=6p5abz) [egghead.io](https://egghead.io/s/km6vr) course by [John Lindquist](https://egghead.io/instructors/john-lindquist?af=6p5abz) and since I'm learning in public, feel fre to check out my notes below:

- The fastest way to kickstart a local project with TypeScript is to use [parcel-bundler](https://github.com/parcel-bundler/parcel)
- With Parcel getting started with TypeScript requires us to create an `index.html` and a `index.ts` file. Once we create a `<script src="/index.ts"></script>` running:

```bash
parcel index.html
```

will install TypeScript and we can see the results on `localhost:1234`
- If we want to use TypeScript for node.js, instead of targeting the `index.html` we can run:

```bash
parcel index.ts --target=node
```

in order to create an index.js file compiled for node.js
- In order to use TypeScript with React, the TypeScript file extension needs to be updated from `.ts` to `.tsx`
- Next, once we create an `#app` element in `index.html`, we can create a small React component:

```ts
import React from 'react';
import { render } from 'react-dom';

const App = () => <div>Hi!</div>;

render(<App />, document.getElementById('app'));
```

Unfortunately, this part won't work:

```ts
import React from 'react';
```

because of a minor difference when it comes to default exports in JS/TS. There are two ways to solve this, we can either change the way we import `React`

```ts
import * as React from 'react';
```

or (and this is better imho), we can create a `tsconfig.json` file in which we can specify `"jsx": "react"` compiler option (you might need to delete `.cache` folder before restarting `parcel`)

- One minor thing, you might need to enable `esModuleInterop` in your `tsconfig.json` file, check out [this StackOverflow question](https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file) for more details
- If we install `TypeScript` globally, we get access to `tsc` - a TypeScript compiler. Most bundlers (Webpack/Parcel etc.) use it under the hood so you won't need to re-run the compiler manually.
- Running `tsc --init` creates a `tsconfig.json` file will al the possible options listed (useful for learning TS in depth)
- When learning TypeScript it's useful to always have the **Problems** tab open in VSCode so you can see whether TypeScript is complaining or not.
- Writing a couple of simple functions is a good way to get up and running with TypeScript
- For instance - you may notice that you don't need to declare a return type for a function that always returns a `string`, since TypeScript can infer it'll always be a `string`, without your help. Check out the example function by John [here](https://codesandbox.io/s/github/johnlindquist/typescript-lessons/tree/explore/?from-embed)
- It's possible to enable TypeScript checks in a JavaScript file using `@ts-check` without actually converting the file to TypeScript. You can read more here about ts-check [here](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html). You'll have to add JSDoc comments in order to make it work (IMHO it would be better to just convert the file to TS, but if for some reason you're not able to - there's always a way)
- Working with DOM elements in TypeScript can be tricky because if you `getElementById`, TypeScript won't know what kind of element is that (is it an `audio` tag or a `div`?). That's why Type Assertions are handy, as an example:

```ts
const input = document.getElementById("input") as HTMLInputElement
```

## Generics in TypeScript

- We use generics in TypeScript when we have some information about the types (e.g. we pass in a variable of type X to a function and we'll return an array of type X items), but we don't know exactly what type will be passed in. This is useful for utility functions, because for example a `map()` function does not care whether we're passing in an array of strings, numbers or objects.
- In order to create a function that can take in a generic type, use `<SomeType>`, as an example:

```ts
function MyGenericFunction<SomeType>(array: SomeType[]):SomeType {}
```

^ in this example `MyGenericFunction` would take an array of `SomeType` as an argument (which can be anything - number, string, object, whatever) and returns a value of type `SomeType`.
- Once we call a generic function, TypeScript will infer the type that's actually being passed to the function (and for example - won't let us call `toUpperCase()` on a number)
