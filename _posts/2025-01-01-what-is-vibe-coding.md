---
layout: post
title: "Day 1: What Is Vibe Coding?"
date: 2025-01-01
author: Jeff Blankenburg
excerpt: "I built collectyourcards.com entirely with AI. 793,740 cards. Universal search. Achievement system. The whole thing. Here's how vibe coding works."
---

I built collectyourcards.com entirely with AI.

The entire site. Authentication system. Universal search across 793,740 cards. Achievement system with over 1,000 achievements. Social features. Crowdsourcing. Admin tools. Spreadsheet generation. The database schema. The API. The frontend. Production deployment to Azure.

All of it. With AI writing the code while I stayed in flow.

That's vibe coding.

## What collectyourcards.com Actually Is

Before we get into how I built it, here's what the site does. It's a comprehensive platform for sports card collectors to catalog and manage their collections.

The database has 793,740 cards. 6,965 players. 135 teams. Users can search for cards, track what they own, see their collection value, earn achievements for milestones, share with other collectors, and contribute data to improve the platform.

The search is order-agnostic. Type "trout 2020 topps chrome auto" or "auto chrome 2020 topps trout" and it works. It extracts player names, years, set names, card types, and serial numbers from your query in any order. Then it finds what you're looking for in under 200 milliseconds.

The achievement system awards points for collection milestones. First card added. 100 cards collected. Complete a vintage set. Own a 1/1. There are achievements for rookie cards, autographs, specific players, teams, decades, manufacturers, and crowdsourcing contributions.

Users can generate Excel spreadsheets from any set checklist. Filter by year, manufacturer, or series. Download a complete checklist with columns for card details, ownership tracking, and notes.

The whole thing is in production. Real users. Real data. Real features.

I built it in about three months. Nights and weekends. With Claude Code writing most of the code.

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

"Users should be able to download Excel spreadsheets for any card set. The spreadsheet should include all cards in the set with columns for card number, player name, team, rookie status, autograph status, and user ownership tracking. Users should be able to filter by year, manufacturer, or specific series before generating."

Then I had Claude read that issue and plan the implementation.

Claude came back with a complete plan. Database queries needed. Excel generation library to use. API endpoint structure. Frontend UI for the filters and download button. Error handling for large sets. Rate limiting so users don't hammer the server.

I reviewed the plan. Asked questions. "What happens if a set has 50,000 cards?" Claude revised the plan to stream the Excel file instead of building it in memory.

"What if two users request the same spreadsheet at the same time?" Claude added caching with a 5-minute TTL.

"How do we track which spreadsheets get downloaded most?" Claude added analytics events.

Then I said "looks good, implement it."

Claude wrote the code. Database queries. Excel generation. API endpoint. Frontend component. Tests. Error handling. Analytics tracking. All of it.

I ran the tests. They passed. I tested the feature locally. Worked perfectly. I deployed to staging. Monitored for issues. Shipped to production.

Total time: about 90 minutes. Most of that was me thinking through edge cases and testing scenarios.

That's vibe coding. I stayed focused on what the feature should do. Claude handled turning those requirements into working code.

## What Makes This Different

Most developers I talk to are using AI wrong. They're treating it like a better Stack Overflow. Ask a question, get some code, copy it, paste it, see if it works. That's not vibe coding. That's just slower development with extra steps.

The difference is the conversation. I'm not asking for code. I'm describing what I need and why. The AI asks clarifying questions. We iterate on the approach. Then it implements.

Think of it like pair programming. When you're pairing with another developer, you don't just say "write a function that validates email addresses." You explain the context. What this is for. What edge cases matter. What the rest of the system looks like.

That's how you work with AI. Give it context. Explain the problem. Discuss the approach. Let it write the code.

The other mistake I see is developers trying to read and understand every line of AI-generated code. That doesn't scale. When AI writes 400 lines across 8 files, you can't review it like a pull request.

Instead, you verify it works. Run the tests. Use the feature. Check the logs. Monitor production. That's how you know if the code is correct.

Observability replaces code review. I don't read the implementation. I watch what it does when it runs.

## The Foundation You Need

Vibe coding isn't just "use AI and hope for the best." There are specific practices that make it work. I learned these building collectyourcards.com. Some from things that went right. Most from things that broke.

Over the next 30 days, I'm going to teach you the tactics that separate confident vibe coding from hope-driven development.

Days 2 through 11 are the 10 fundamentals. The non-negotiable principles. Plan features, not functions. Tests are your specification. Observability is proof. Automate verification. Every deployment must be reversible. These are the rules that keep you shipping fast without breaking production.

Days 12 through 29 are the tactics. GitHub Issues as your product backlog. Component libraries that teach AI your design system. Breaking features into phases. Context management across sessions. Using AI as a security auditor, performance reviewer, and debugger. Prompt templates that actually work. How to know when to restart versus when to keep going.

Day 30 is the tool landscape. Claude Code versus ChatGPT versus Copilot versus Cursor. When to use what. Real comparison across capabilities, cost, and usefulness.

Day 31 is the send-off. Summary of what matters most. Encouragement for when it gets hard. What to do next.

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

Tomorrow we start the 10 fundamentals. Day 2 is the first one: Plan features, not functions.

You'll learn why asking AI to "write a function that validates email addresses" gets you garbage, and how asking it to "implement email validation for user registration that handles internationalized domains and provides clear error messages" gets you production code.

This is the most important shift you'll make. Get this right and everything else follows.

---

**Try This Today:**

Look at collectyourcards.com. It's live at collectyourcards.com. Browse the card database. Run a search. Look at the achievement system. See what's possible when you use AI correctly.

Then think about what you could build if you learned to work with AI like this. Not just faster. Actually faster without sacrificing quality.

That's what the next 30 days are about.
