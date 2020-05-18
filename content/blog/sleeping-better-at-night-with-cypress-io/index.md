---
slug: sleeping-better-at-night-with-cypress-io
date: 2019-06-29
title: 'Sleeping better at night with cypress.io'
description: "Releasing to prod on a Friday has never been easier"
published: true
banner: './banner.jpg'
---

FYI: This post is heavily based on the talk I gave at [React India 2019](https://www.youtube.com/watch?v=Ty74jsFHhUU)

# The scene

Imagine. 

It's Friday, 3pm. Sun is shining, birds are singing and even though you like your job you kinda-sorta want to go home already.

Someone stops by your desk and they say:

>Hey, so I just merged that feature to master, awesome right? Anyway, I'm off to pick my kids from school, do you mind releasing it to prod?

Your heart skips a beat. And not in a good way. Of course you don't want to be seen as an impostor and you agree to release the code. I mean, _what can go wrong_?

Suddenly you're becoming ever more nervous. Why is that? 

Luckily, science has an answer:

![](https://thepracticaldev.s3.amazonaws.com/i/2d3plj3mzezs4ic9z3u3.png)
<figcaption>This is not entirely accurate</figcaption>

Question to you, the reader: 

_Are you okay with releasing your code on Friday?_ _Why?_ _Why not?_

# Ownership and balance

All human beings want to feel safe, it's one of our most basic needs (right after having a relatively fast CI pipeline).

If every single release to prod may lead to bugs, production incidents, annoyed customers or (even worse) spending _long_ hours in regression test phase before any release this may very well lead to burnout.

(And not [this](https://en.wikipedia.org/wiki/Burnout_3:_Takedown) one, that was _my jam_)

As a developer, I strongly believe in maintaining healthy work-life balance as well as having a sense of ownership of whatever you ship to your users. 

At [OLX Group](https://www.olxgroup.com/) we build websites that are used by millions of users daily. In classifieds business, having a production incident is equivalent to thousands of annoyed (to say the least) customers and lots of wasted money and time.

Members of my own family are earning extra cash by selling things on OLX.pl, if we screw up, their lives are affected. 

# Rise of the machines

In my [career](https://dev.to/tlakomy/7-years-as-a-developer-lessons-learned-29ic) I've had an opportunity to work with a large number of development teams. In most of those teams, we attempted to cover our codebase with

##<center>🤖 *Automated Tests* 🤖</center>

with a varying degree of success.

(_If you don't know what automated tests (or e2e tests) are, imagine hiring someone who can type and click on stuff really, really fast and you tell them how to test your app_)

### Stability issues

Most tools we've used produced unreliable results. It was possible to restart the same test suite 5 times and get five different results. In some cases, the tests were passing only if Mars and Venus were aligned. 

Having randomly failing/passing tests is actually much worse than having no tests at all. If you don't have tests, then at least you **know** that you're doing yolo releases.

### Difficult to write, harder to debug

Automated tests are not meant to be [DRY](https://kentcdodds.com/blog/aha-programming/). If a test is broken, it should be _trivial_ for a developer to open up the spec file and investigate what went wrong. Some of the tests we were writing were using [Gherkin](https://cucumber.io/docs/gherkin/) and while the idea was solid, the reality was... suboptimal.

Debugging tests should be easy as eating a whole pizza when hangover. Unfortunately, a large number of e2e tools forces you to go through thousands of lines of logs on Jenkins, Jarvis etc. just to find out that someone changed a label in the login form. 

# Enter cypress.io

God damn.

![](https://thepracticaldev.s3.amazonaws.com/i/0q7jqrvjsdpvb025n0fy.png)
<figcaption>This is written in large font on cypress.io homepage, so it's true</figcaption>

[Cypress](https://www.cypress.io/) is the second (after jQuery) tools in Web Development I've immediately fallen in love with.

I still remember the meeting when one of our Engineering Managers at OLX wanted to demo this "new e2e testing tool". What I thought was:

>Yeah, it's going to be the same crap but with different API

Then I saw this:

![](https://thepracticaldev.s3.amazonaws.com/i/htjck1gii87xp0mt4z71.png)
<figcaption>What e2e testing was meant to be</figcaption>

Let me quickly go through what you can do in cypress UI

- You get to see your test playing live
- There's a detailed log which tells you what's going on
- You can stop the test at any moment and the tested app is **fully interactive** and you can see how the hell did you manage to be logged in and out at the same time
- After clicking on a request, you can see the state of the app before and after the request fired. 
- When developing the tests, every change to a spec file results in starting the test over. Did I mention that the runner is blazing fast? (_it's blazing fast, FYI_)
- Tests can be recorded and you get to check out both screenshots and video recordings from failing tests (or from passing ones, but I suppose that's not really interesting)
- Debugging? Just open up Google Chrome console, debug like you're used to.

# The Dashboard

It's not only about the runner. At OLX Group we are also happy clients of [cypress dashboard](https://www.cypress.io/dashboard) service which allows us to take a good look at the state of our tests and run tests in parallel which saves **a lot** of time.

![](https://thepracticaldev.s3.amazonaws.com/i/idbffnmssvik11ks5wqb.png)

Given the fact that in Poland we support multiple countries throughout Europe, can you imagine clicking through all that manually?

![](https://thepracticaldev.s3.amazonaws.com/i/707ty8wxfs68ufhyyb3i.png)
<figcaption>This is not even 40% of the full screenshot</figcaption>

# Why am I writing this?

Ever since we adopted cypress I know that I can merge things to `master` and go home. 

Given the number of tests we have written, it's quite difficult to introduce a code change that is going to break our product. We are not perfect, our goal is to improve constantly but I personally managed to avoid a few potential production fucku... incidents thanks to cypress tests. 

I get to sleep better at night, and I hope you will too. 

Give it a try, I think you'll like it - I'd love to hear your thoughts on Twitter [@tlakomy](https://twitter.com/tlakomy).

You know what they say:

>Test your code, not your patience