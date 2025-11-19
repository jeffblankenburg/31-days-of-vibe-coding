---
layout: post
title: "Day 1: What Is Vibe Coding?"
date: 2026-01-01
author: Jeff Blankenburg
excerpt: "I built collectyourcards.com entirely with AI. 793,740 cards. Universal search. Achievement system. The whole thing. Here's how vibe coding works."
---

I built [collectyourcards.com](https://collectyourcards.com) entirely with AI.

All of it. With AI writing the code while I stayed in flow.

That's vibe coding.

## What collectyourcards.com Actually Is

Before we get into how I built it, here's what the site does. It's a comprehensive platform for sports card collectors to catalog and manage their collections.

The database has over 900,000 cards. 7,000+ players. 150+ teams. Users can search for cards, track what they own, see their collection value, earn achievements for milestones, share with other collectors, and contribute data to improve the platform.

The search is universal. Type what you know about a card, and then it finds what you're looking for in under 200 milliseconds.

The site has become a definitive source for complete, downloadable checklists.  It will even show you which ones you already own.

The whole thing is in production. Real users. Real data. Real features.

I built it in about three months. Nights and weekends. With Claude Code writing most of the code.

<img src="/images/cyc_homepage.png" alt="Description" width="500">

## What Is Vibe Coding?

Vibe coding is staying in creative flow while AI handles the typing.

You're still making all the decisions. What features to build. How they should work. What could go wrong. How to handle errors. What the user experience should be. The AI translates those decisions into code.

You're the architect. The AI is really fast at implementing what you designed.

This matters because the hard part of programming isn't typing. It's figuring out what to build and why. Understanding the problem. Thinking through edge cases. Deciding how pieces fit together. That's where your brain needs to be.

When I'm building a feature, I stay focused on those questions. What does the user need? How should this behave? What breaks this? The AI writes the implementation while I'm thinking about the next problem.

That's flow. Not "AI writes code and I review it later." Not "I write code and AI suggests completions." It's a conversation where I'm solving problems and AI is generating solutions.

## How It Actually Works

Here's a real example from building collectyourcards.com. I needed to add a feature where users could generate spreadsheets from card set checklists.

I opened an issue in GitHub:

"Users should be able to download Excel spreadsheets for any view they have. The spreadsheet should include all cards in their filtered view with columns for card number, player name, team, rookie status, autograph status, and user ownership tracking. Users should be able to filter by year, manufacturer, or specific series before generating."

Then I had Claude read that issue and plan the implementation.

Claude came back with a complete plan. Database queries needed. Excel generation library to use. API endpoint structure. Frontend UI for the filters and download button. Error handling for large sets. Rate limiting so users don't hammer the server.

I reviewed the plan. Asked questions:

> **Me:** "What happens if a view has 50,000 cards?"
>
> **Claude:** Revised the plan to stream the Excel file instead of building it in memory.
>
> **Me:** "How do we track which spreadsheets get downloaded most?"
>
> **Claude:** Added analytics events to track download patterns by set and user.
>
> **Me:** "Looks good, implement it."
{: .conversation}

Claude wrote the code. Database queries. Excel generation. API endpoint. Frontend component. Tests. Error handling. Analytics tracking. All of it.

I ran the tests. They passed. I tested the feature locally. Worked perfectly. I deployed to staging. Monitored for issues. Shipped to production.

Total time: about 90 minutes. Most of that was me thinking through edge cases and testing scenarios.

That's vibe coding. I stayed focused on what the feature should do. Claude handled turning those requirements into working code.

## What Makes This Different

Many developers I talk to are using AI wrong. They're treating it like a better Stack Overflow. Ask a question, get some code, copy it, paste it, see if it works. That's not vibe coding. That's just slower development with extra steps.

The difference is the conversation. I'm not asking for code. I'm describing what I need and why. The AI asks clarifying questions. We iterate on the approach. Then it implements.

Think of it like pair programming. When you're pairing with another developer, you don't just say "write a function that validates email addresses." You explain the context. What this is for? What edge cases matter? What does the rest of the system looks like?

That's how you work with AI. Give it context. Explain the problem. Discuss the approach. Let it write the code.

The other mistake I see is developers trying to read and understand every line of AI-generated code. That doesn't scale. When AI writes 400 lines across 8 files, you can't review it like a pull request.

Instead, you verify it works. Run the tests. Use the feature. Check the logs. Monitor production. That's how you know if the code is correct.

Observability replaces code review. I don't read the implementation. I watch what it does when it runs.

## The Foundation You Need

Vibe coding isn't just "use AI and hope for the best." There are specific practices that make it work. I learned these building collectyourcards.com. Some from things that went right. Most from things that broke.

Over the next 30 days, I'm going to teach you the tactics that separate confident vibe coding from hope-driven development.

Every article includes real examples from building collectyourcards.com. Real code. Real issues. Real decisions. No theory without practice. No claims without evidence.

## Why This Matters

I'm not a 10x developer. I'm a regular developer who learned to work effectively with AI.

Three months ago, collectyourcards.com didn't exist. Now it's in production with real users and real data. That's what vibe coding makes possible.

Not because AI is magic. Because when you stop fighting the tools and start working with them, you can build faster than you ever could alone.

You're still doing the hard work. Understanding users. Solving problems. Making decisions. Designing systems. The AI just handles the translation from "here's what this needs to do" to "here's 200 lines of TypeScript that does it."

That's the promise. Build more. Ship faster. Stay in flow.

But only if you know how to work with AI correctly. That's what this series teaches.

## What You'll Build

By the end of these 31 days, you'll know how to build production features with AI. Not demos. Not prototypes. Real features that work in production with real users.

You'll know how to write GitHub Issues that give AI complete context. How to break complex features into phases AI can handle. How to instrument code for observability. How to use AI as multiple team members with different expertise.

You'll have prompt templates you can use immediately. A component library structure. An agent configuration file. A workflow that keeps you in flow while shipping quality code.

And you'll understand the 10 fundamentals that separate vibe coding from hoping AI gets it right.

## Tomorrow

Tomorrow we talk about how to organize your work with AI. Day 2: GitHub Issues Are Your AI's Product Backlog.

You'll learn why throwing half-formed ideas at AI in a chat window gets you incomplete features, and how writing complete GitHub Issues gets you production-ready code on the first try.

Stop being sloppy with your prompts. Start treating AI like a development team that needs proper specifications.

---

**Try This Today:**

Take a look at collectyourcards.com. Browse the card database. Run a search. Add some cards to your collection. See what's possible when you use AI effectively.

Then think about what you could build if you learned to work with AI like this. Not just faster. Actually faster without sacrificing quality.

That's what the next 30 days are about.
