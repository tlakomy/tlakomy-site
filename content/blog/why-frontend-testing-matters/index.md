---
slug: why-frontend-testing-matters
date: 2020-05-26
title: 'Why (frontend) testing matters'
description: 'Because well tested code does not wake you up at 2am'
published: true
banner: './banner.jpg'
---

Imagine the following.

You join a new project and after getting access to the repo you notice that there's no tests.

You decide to ask the team whether they are in different repo or something and unfortunately the answer is:

> We don't have any tests, we didn't have the time.

😐

Let's talk about why frontend testing matters.

## The value of tests

For the rest of this post I'm going to assume that you're working on a non-trivial app in a team. If your team is shipping Hello World as a Service you probably don't need tests (also, if you're literally paid for shipping "hello worlds" - _please_ let me know, I want to learn your ways).

Every software project starts out simple.

Brand new repository, perfectly tuned folder structure (that will go to hell literally 2 weeks later), a beautiful, fresh start.

At some point your app gets bigger and it seems that it'll keep on growing. It's hard to understand all features, quirks and expected behaviours.

Things start to break and become sloppy. Adding a change in one file breaks something else, seemingly unrelated. At some point you start getting production incidents because of "distributed testing" - that is, your users finding bugs before you do.

Sounds like fun? **Absolutely not.**

In my opinion - testing is all about **confidence**.

Having a testing routine and culture in place allows you to answer the question - "is the code I'm about to push to prod _actually_ working?"

## Who am I writing the tests for?

There are three groups of people who benefit from you writing tests:

- Your users
- Your team
- Yourself

Let's go through them all.

### Your users

Listen, there will _always_ be bugs. The way I see it - if you're not hitting any obstacles in live, you're not doing anything particularly interesting and the same applies to code.

So why should I write tests if I cannot avoid bugs?

Because you can avoid **obvious** (and frankly - embarrassing at times) bugs.

Imagine adding a small change to a search form and (by accident), locking the search button to be always `disabled`. This, obviously, completely breaks the user experience.

Right after you push the change to prod, a faint and ever increasing in volume sound of sirens can be heard in the background.

"_Heck_", you think, as you start yolo-deploying a fix.

What I **strongly** believe in is doing all you can to make such mistakes **impossible** to push to prod. Having even really simple tests for your core flows gives you immense value and makes your users happier.

They are the reason you get paid.

I personally work at [OLX Group](https://tech.olx.com/) where we build online marketplaces used by millions.

Including my mom.

I don't want to call her and explain that she cannot sell her cakes on OLX Poland because I forgot an `if`.

It all boils down to the sense of ownership - caring not only about writing code, but also about the value it provides to actual human beings.

Speaking of humans...

### Your team

A common argument against writing tests is that they take time and slow down development.

_Ahem_

Most things worth doing in life take time.

As to "they slow down development" - I cannot disagree more.

In fact, tests make your team **significantly** faster, especially in large codebases with multiple developers contributing to it.

Sure **you** may take a bit more time to ship JIRA-1234 ticket because you need to write both logic and tests (_the horror!_) but **your team** will get to work faster and be more productive because of your sacrifice.

Whoever will end up touching the code afterwards will know that they are not about to break something.

Refactoring is easier (and in some cases - it's finally possible) because well written tests don't care about the implementation - only the behaviour. So they're free to improve the quality of the code knowing that all is well.

That's incredible - not having to click through all possible use cases to test their changes, saving precious time that can be wasted endlessly scrolling Twitter for instance.

One more thing - by covering that tricky component with tests you made their day just a tiny bit better, without even knowing it.

Speaking of you...

### Yourself

In my humble opinion - testing is a form of self care.

I personally get to [sleep better at night](https://www.youtube.com/watch?v=mVGWQK8j_s0) knowing that I won't get a phone call at 2am because I missed something trivial (although, I always tell everyone that they're free to call me anytime, I _simply won't answer_).

Feeling safer, being more confident about your work and being able to move fast **WITHOUT** breaking things makes for a fantastic development experience.

Take care, write tests and ship to prod on Sunday!

(_You'll have an entire week to fix what you've broken_).
