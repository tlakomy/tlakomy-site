---
slug: crap-i-broke-production
date: 2020-02-06
title: '"Crap, I broke production" - How do we ensure it never happens again?'
description: 'How to get better at shipping software without pointing fingers'
published: true
banner: './banner.jpg'
---

Let me start with a story.

Suppose you're a developer (if you're reading this, it's highly likely) who just pushed this code to `master` (that part hopefully doesn't apply to many of you):

```
ReactDOM.render(<OurEntireFrontend />, document.getElementById('ro git pushot'));
```

(If you're not familiar with React, the point is that we're trying to render an app in an element with an id of `#root`).

As you can see, while trying to push your changes to `master`, the focus was in a wrong place and instead of writing `git push` in your terminal, you did so in your codebase. The result is fairly obvious - the entire page is broken, and this is not the best day of your career.

If you're thinking that _obviously_ no one would ever do that, I pushed something like this to a remote branch.

_Today._

_(Didn't break prod though, keep reading to find out why it's impossible)_

You start to wonder - "_Am I getting fired?_".

**No.**

Shit happens to all of us and to the best of us. NASA, Amazon, Twitter, Facebook - name any company and if you dig in, you'll find tons of stories about their production incidents.

This is not your fault as a developer, the system you're operating in is at fault (and I don't mean Windows!).

What separates engineering teams who are willing to learn and grow from those that don't is how you react (you don't have to use React though) to those incidents.

## Finger pointing

You may wonder why I decided to name "you" as a person who wrote the faulty code instead of Sally, Joe, Samuel or Katarzyna.

The reason is simple - we judge others by their actions and we judge ourselves by our intentions.

It's so much easier to put blame on others if they were the ones to make a mistake. Even easier if they are a part of a different team, organisation or company. Tribalism is a ridiculously strong mechanism and it's difficult to challenge that bias.

Pointing fingers doesn't lead anywhere.

The only thing you'll gain is a stressed, burned out individual who will know that in time of great stress and danger the entire fault was put on them.

Broken production environment is never a fault of one person (unless you literally work alone).

In other words - mature teams ensure that breaking a product that literally pays their salary is close to impossible.

## Tower Defense

Remember those old Flash games where you had to build towers in order to stop an army of invaders? (For younger readers out there, Flash was the best thing ever and we're still catching up to it)

Good engineering teams do something like that on daily basis - building towers of stability in a codebase.

Let's talk about why it should not be possible to release `document.getElementById('ro git pushot')` to actual users, in this case our "towers" would be:

### Reviewing carefully the commit you're about to push to the repository

I never do that so let's go immediately to the next one

### Automated linter

A code linter should be able to catch weird issues which may break your code. Adding a linter to a programming language of your choice takes only a short while and there are no reasons not to do it (unless you adapt an overly strict set of rules).

Okay, if that fails:

### Code Review

Having (at least) a second pair of eyes to take a look at your code is crucial and this kind of issue would most likely be spotted by another human.

If that fails:

### Unit tests

An app that is broken this badly should not be able to pass unit tests. If it does - you've identified your problem (or, at least one). Major, core flows such as **literally** starting up the app should be absolutely covered with unit tests.

This might be controversial but working on a non-trivial product and saying that "I don't have time for tests" is a bit like McDonalds saying that they don't have time for buns because they have meat to ship. And yes, this is a hill I’m willing to die on.

Let's suppose that your tests pass with broken code and this tower fails:

### End-To-End tests

Those tests operate on a bit higher level, interacting directly with the UI. If there's no UI (because the app is 100% broken), then those tests are going to fall immediately.

Do you need to hire an Automated Tests Engineer to do that? Absolutely not, writing a simple smoke test that checks if your app is up and running with cypress.io ([this might be useful to you](https://dev.to/tlakomy/sleeping-better-at-night-with-cypress-io-59m2)) is something you can definitely give a go yourself. Even a simple automated test can give you significantly more confidence in your software.

But maybe you're not convinced and this tower fails:

### Staging environment

Some teams/companies have that, some don't. I don't know your infrastructure costs so I'm not going to spend too much time on this section but if you can afford it - having a closed environment that gets to blow the heck away before production is usually a good idea. (This obviously doesn't apply if you have a continuous delivery process.)

Okay, but what if nobody will notice that staging is broken?

### Monitoring

**Humans make mistakes, nobody is perfect.**

Team members shouldn't be required to refresh staging environment every 5 minutes to understand if something is broken (although if your commit/feature lands on staging it's definitely highly recommended to at least take one last final look).

Assume that something will break at any given moment (it will) and get machines to tell you that your software is broken before your users do. The best response to users complaining about not being able to log in is "We know, our engineers have been working on a fix since our monitoring told us about it. The fix will be deployed in 5 minutes".

Monitoring sounds scary and complicated but it doesn't have to be, in my case [New Relic Synthetics](https://newrelic.com/products/synthetics) are something I've used and can recommend because it's not overly complicated.

Okay, what if my monitoring screams at me?

### Rollbacks

Again, humans make mistakes. Faulty code **will** end up being deployed.

A great metric to measure is - how quickly am I able to get rid of faulty code?

How many minutes, hours (if it's literally hours - **run**, we're hiring) it takes to push a fix to production?

Shipping reliable software is not only about resilience, quality, checks and tests. It's also about your team's ability to react to situations that require quick and rapid actions.

# Implementing change

If your team has all those processes in place, you're in a great shape. You'll still have production incidents, sure, but they will much, much rarer.

How do you implement those (and many others - this is by no means a complete list) practices in your software engineering process?

There's a two step program:

- **Talk to each other**
- **Learn from mistakes**

After each incident gather in a room and try to figure out what happened, what part of our process failed (again, processes - not people) and most importantly - **how we can ensure that it never happens again**.

The last part is not easy, but [five whys](https://en.wikipedia.org/wiki/Five_whys) make it at least approachable.

Good teams don't think too much about the past, they consider the future where incidents are rarer and rarer.

If you wear shirts you've probably seen a note that you shouldn't iron a shirt while wearing it. I mean - **who would do that?!**.

Well, people did and that's why it's there. Behind every weird rule and warning sign there's a story.

Behind every best practice there's a story of broken products, stress and teams working overnight trying to fix a bug.

So - meet with your team, discuss in a blame-free atmosphere, figure out what can you do to ensure that it'll never happen again and most importantly:

**Share it**

If your company is okay with sharing stories like that (or maybe they're legally obliged to) in public, this is definitely a great lesson for others. If not the public, then sharing the lessons learned with other teams is **absolutely mandatory** in my opinion.

Don't let others suffer as you did, share best practices and build on each other.

<hr>

PS. Write tests
