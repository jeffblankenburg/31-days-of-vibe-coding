---
title: "Card Games"
date: 2026-02-13
excerpt: "Building a card game scoring app."
category: blog
layout: blog
permalink: /blog/:year/:month/:day/:title/
---
I spent the weekend with some old friends and all of our children in a tradition we call “No Moms Weekend.” It’s 7 dads, and 15 kids of varying ages all doing wintery outdoor activities like hiking, making campfires, and playing lots of games. Moms have to stay home and suffer through the peace and quiet of an empty house.

One of our favorite games to play is called Backalley. It’s a trick-taking card game played with a standard 52-card deck. It always involves 5 players, and it’s played in 20 rounds. The first round every player gets 10 cards, then 9, then 8, until you get down to 1. Then you repeat the entire process back up to 10. There are some important data points to record for each round as we play:

- How many tricks did each player think they would win this round (bids)?
- How many total bids were made?
- How many tricks did each player actually win?
- What was the trump suit?
- What is the user’s score?

Here’s what a standard scoring table (on paper) might look like:

<figure><img src="https://assets.buttondown.email/images/8c313869-025e-4a78-8782-86bc0f198503.jpeg?w=960&amp;fit=max" draggable="false"><figcaption>A backalley score sheet</figcaption></figure>

I mentioned to the group that this seemed like something I could probably have Claude build for us in the time it took to play a game. So I did.

[https://backalleyscore.com](https://backalleyscore.com)

<figure><img src="https://assets.buttondown.email/images/e3fa88ba-5900-4b46-8b2c-3f18512886a0.png?w=960&amp;fit=max" draggable="false"><figcaption>Home Screen</figcaption></figure><figure><img src="https://assets.buttondown.email/images/b5801d40-92a5-46a4-ba06-3cc51a25f88b.png?w=960&amp;fit=max" draggable="false"><figcaption>Empty Scoresheet</figcaption></figure><figure><img src="https://assets.buttondown.email/images/6bc6e960-9f1b-4649-9ae2-e5da14a9c4f7.png?w=960&amp;fit=max" draggable="false"><figcaption>Trump Suit Selection &amp; Dealer Indication</figcaption></figure><figure><img src="https://assets.buttondown.email/images/37beaa89-a279-4d78-80f0-8567d6c6b284.png?w=960&amp;fit=max" draggable="false"><figcaption>Bid Entry</figcaption></figure><figure><img src="https://assets.buttondown.email/images/c3ea740a-c517-46d6-b7c7-9c649553c682.png?w=960&amp;fit=max" draggable="false"><figcaption>Bids Complete</figcaption></figure><figure><img src="https://assets.buttondown.email/images/1acc93a4-87a5-4063-a37c-ee746cc7ff9f.png?w=960&amp;fit=max" draggable="false"><figcaption>First Round Complete</figcaption></figure>

## Things I Learned

One of the most amazing things I discovered in this process was how good Claude was at interpreting that hand-written image above. We had already talked through some of the rules of the game, but it was able to identify all of the different components, and use that drawing as a template for what our digital scoresheet became. It makes me think I could be drawing pictures to describe my interfaces when words aren’t getting me where I want to be.

For most of my vibe coding adventures, I’ve leaned into a database, whether that is Supabase, or SQL Server. Claude’s initial instinct on this one was to use [dexie.js](https://dexie.org/), a client browser-based database. While this worked very well, it didn’t allow for aggregation of data across users and games. It wasn’t an option I had used before, and I can definitely see a place for it in future apps.

I’d also been using SMS-based authentication for most of my applications. Still using Supabase, I was able to easily build an email-based magic link auth system pretty quickly, including using my own custom domain for the emails.

The app also has an audible “announce standings” button that will read off everyone’s current rank and score. While I’ve done lots of things with text-to-speech in my career, I was surprised how easy this was.

[If you want to find the entire project, you can always find these kinds of things in my GitHub repositories.](https://github.com/jeffblankenburg/backalley-scorekeeper)
