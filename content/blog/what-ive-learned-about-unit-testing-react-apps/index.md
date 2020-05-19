---
slug: what-ive-learned-about-unit-testing-react-apps
date: 2019-11-01
title: "What I've Learned About Testing React Apps - Part 1: Unit Tests"
description: 'Ship and refactor your code with confidence'
published: true
banner: './banner.png'
---

There's only one thing you can be absolutely sure when it comes to software development - something will break, eventually.

No matter how many years of experience you have under your belt, the framework you're using, your team structure etc. You **will** encounter bugs on production (provided you're not shipping basic todo apps as a service).

The good news is that programming is a bit like video games. The more you progress, the harder the problems you'll face will become and the reward (that is - happiness of your users) will be ever greater.

That's why testing is so crucial in shipping non-trivial software. At some point it's not even remotely possible to "click through" the app to see if everything is fine.

There are a couple of types of testing - most notably unit, integration and e2e (end-to-end) testing. For the purpose of this post I'd like to combine unit and integration tests under the name of "unit tests" (any QA engineers who are reading this, please forgive me). My _personal_ distinction is:

- unit tests are the tests that developers care about
- e2e tests are the tests that **users** care about (more on that later, in part 2)

# Unit tests

Writing unit tests is tricky because you can put a number on them. And chasing this magic number can lead you on a wrong path. This number is, of course, **test coverage**.

**Do not try to achieve 100% test coverage**

You are more than likely to end up with this:

![A picture of a children's alphabet toy with every letter in a wrong place](https://thepracticaldev.s3.amazonaws.com/i/b7fue01ckw5c6bcvxhbj.jpeg)

_I mean, technically it's 100%, right?_

Chasing test coverage is not the same as chasing quality.

My personal advice would be to aim to achieve roughly 70-80% unit test coverage as well as maintaining an extensive "dear coverage tool, pls ignore that file" list. You don't want to "pollute" your results with locale or config files which, oh no, were not covered with unit tests.

In general, as an owner of your codebase, you should at least be aware of the things you're not testing and why. We're not perfect, some pieces of our code will be difficult to cover with unit tests, things happen (that's where I'd recommend trying to test that part of the system with e2e tests).

One more thing - make sure that your tests **CAN FAIL**. Time and time again I've written tests (especially with async behaviour) that were always passing. Which is awesome, unless you consider they were also passing when I straight up removed the function I was trying to test. Lesson learned? Start with a failing test first, then ensure that it can pass and gives you value.

# Test behaviour, not the implementation

Let me ask you something: _who cares whether you've named a piece of your state `disableAwesomeButton`_?

Most likely you, _maayyybe_ your team but apart from that? No one. Users don't care [_citation needed_] and neither should your tests.

It might be tempting to write tests which go as follows: "when I click on this button, I'm expecting the state of the component to change to X and props passed in to child component should equal Y". That's how you end up with brittle tests.

Someone renames a prop or fixes a typo in a state field, and they break. **You don't want that**.

Luckily, there's an excellent tool that helps: [React Testing Library](https://github.com/testing-library/react-testing-library). I've been personally using it for the last couple of months and while it takes a while to get used to (especially after using Enzyme for _years_, like I did), the benefits are massive.

It's _really freaking difficult_ to write objectively bad tests with React Testing Library because it's been built with best practices in mind. For instance, I'm not entirely sure how to write a check whether the state of a component equals X with React Testing Library.

What I **do** test is the **behaviour** of the component.

- Are we displaying the right content to the user?
- Is it possible to find images using their `alt` text?
- Are we rendering correct error messages?
- Is the component react-ing (React, get it?) to clicks and other events properly? And by "_properly_" I mean - "_is the behaviour of the component consistent with what users might expect?_"

By default, React Testing Library will not shallowly render your component. Which means that if you render a `Menu` component, it'll also fully render all `MenuItem`s component below.

That allows you to test the actual behaviour of your menu, instead of checking "alright, there are 5 `<MenuItem/>` components in my tree, I'm done here".

# Refactoring shouldn't break tests

This approach is excellent because it allows you to do one more thing: to refactor your components as much as you want.

True story: when React Hooks were released we had difficulty adopting them in our codebase because (as of October 2019), hooks were not supported by the testing library we were using - Enzyme. Not to mention that our tests were a bit too implementation-focused.

When you switch to an approach of **not** testing the implementation, you can honestly do whatever you want within your component. Refactor it to hooks, to classes, to jQuery - as long as the **behaviour** (you know, the thing that users care about) doesn't change.

Even if the tests will fail as a result of a refactoring - it's a chance for you to take a second look. Maybe they are failing for a very good reason? Refactors are difficult, there's a decent chance you might break something. As always - it's better to have your tests tell you that than your users.

Tests are not only for the users - they are also for us, developers. For the sake of our own mental health, it feels **good** to have all tests passing after a major refactoring. Like I mentioned before, you won't be able to "click through" the whole app so that reassuring "all tests passed, ship it to prod, yolo" message really helps.
