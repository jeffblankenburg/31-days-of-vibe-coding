---
title: "Building Bro Madness"
date: 2026-02-20
excerpt: "Building an app to watch March Madness."
category: blog
layout: blog
permalink: /blog/:year/:month/:day/:title/
---
![image.png](https://assets.buttondown.email/images/ae59cdda-c4d2-4770-a765-b9dc18abd478.png?w=960&fit=max)

Last week, I talked about how quickly I was able to create a scoring app for a card game. I had a similar experience this week.

Next month in the United States, the college basketball tournament starts. The best 64 teams play 63 games to determine a champion.

<figure><img src="https://assets.buttondown.email/images/4b695f6e-f2b4-45f6-a4d2-c8d5033522cc.png?w=960&amp;fit=max" draggable="false"><figcaption>A standard bracket for the tournament</figcaption></figure>

The most fun part of this tournament for me is the first weekend of games. Thursday: 16 games. Friday: 16 games. Saturday: 8 games. Sunday: 8 games. This eliminates 75% of the teams from the tournament.

Each year, 25 of my friends rent a giant cabin, and spend the weekend watching those 48 weekend games. Lots of wagers and games take place as a result, and those games have all traditionally been entered and managed on paper.

It felt like this was an opportunity to use AI to build an app that would make all of these games much simpler to administer and score, but also a way to have everyone connect with each other before the tournament as well.

Here are some of the things that amazed me while building this app.

### I didn’t have to explain the bracket concept at all.
With my simple prompt, it was able to establish that there are 4 regions, winning teams flow from one game to the next, and those regions meet in a final four.

![image.png](https://assets.buttondown.email/images/72be4479-8eec-4d84-98aa-2ce75240d28a.png?w=480&fit=max)
  
### I wanted chat features, with notifications and emoji.
Claude was able to build a really compelling chat that is pretty similar to iMessage.  It was even able to add Giphy support.

![image.png](https://assets.buttondown.email/images/b72d3656-13ca-4da0-a452-b9713f6a9da2.png?w=480&fit=max)

### Administration Tools were the most impressive
I asked for a set of administrative tools that would allow things like game score updates. Tools to manage the data the games needed.  What I didn't expect:

* Full user management, including marking payments for each contest.
* Trip cost management. I can mark, in several installments if necessary, how much a user has paid for their trip.
* The system automatically calculates payouts for contests, and gives me a place to mark that I've paid the winner.
* A tool to enter the weekend's menu options for each meal.  No more "what's for dinner tonight?"
* Two powerful dev tools. The first is a time simulator, so that I can see what the app will look like at specific moments.  For example, did the picks lock after the first game started?  Did the default menu update when the day changed?
* The second dev tool is a user simulator.  This allows me to use the site as any user of the system.  If someone can't or won't use the site, I can still go in and enter their picks for them.  I can see what they see in real time.

![image.png](https://assets.buttondown.email/images/d29f1eba-2ed4-4492-8cf2-1f7a5795e425.png?w=960&fit=max)

The tournament starts on March 19th.  Can't wait to see how this performs!

