---
layout: post
title: "Day 2: GitHub Issues Are Your AI's Product Backlog"
date: 2026-01-02
author: Jeff Blankenburg
excerpt: "Stop throwing half-formed ideas at AI. Write GitHub Issues like you're managing a development team. Get complete, working features on the first try."
---

Yesterday I defined vibe coding as staying in flow while AI builds features for you. Today I'm going to show you how I learned to actually do that.

My approach to AI coding has evolved through three stages. Each one taught me something about how to work with AI effectively.

## Stage 1: Asking for Functions

Here's what I used to do:

"Write me a function that validates email addresses."

AI gives me a function. I look at it. It checks for an @ symbol. Maybe a dot. Probably misses edge cases. Doesn't handle internationalized email addresses. Has no tests. I ask for tests. Get tests that only check the happy path. I ask for error handling. Get try/catch blocks around things that can't throw. This takes 20 minutes and I end up rewriting half of it.

This is painful. I'm doing all the integration thinking. AI gives me pieces and I'm the glue.

## Stage 2: Asking for Features

Then I learned to think bigger. Stop asking for functions. Start asking for features.

"I need email validation for user registration. Users should get clear feedback if their email is invalid. This needs to handle edge cases like plus addressing, international domains, and disposable email detection. Plan the implementation before writing code."

AI gives me a plan. Database schema considerations. Validation library options. Where validation happens (client, server, both). Error messages. Rate limiting for the disposable email API. Tests for edge cases. Observability for tracking validation failures.

I review the plan. Catch that it's calling a third-party API synchronously in the registration flow. Ask it to move that to background validation. Approve the revised plan.

Then I ask it to implement.

The difference? I'm thinking like a product manager and tech lead, not a programmer. AI is my engineering team.

This was way better. But I made a mistake.  I assumed that AI would complete everything I asked it to do, on the first try.  I didn't have a backlog.  I was dropping great ideas left and right, and many of them were never completed.

## Stage 3: Features in GitHub Issues (The Right Way)

I was still doing all of this in the chat. I'd open a conversation and start typing: "Build me OAuth login." Then halfway through I'd remember I also needed rate limiting. And maybe password reset. Oh, and we're using Postgres, not MySQL. By the time I got my thoughts together, I'd wasted 10 minutes and the AI had already started writing code based on incomplete requirements.

It was sloppy. I was treating AI like a chatbot instead of a development team.

Then I realized something obvious: I wouldn't manage a team of developers by walking up to them and blurting out half-formed ideas. I'd write a ticket. Put it in the backlog. Let them ask clarifying questions. Review their approach before they started coding.

Why should AI be different?

## GitHub Issues Are Your Feature Specs

Here's what I do now. Every feature starts as a GitHub Issue. No matter how small.

Changing button text? Issue.
Adding OAuth? Issue.
Entire new dashboard? Issue.

<div style="text-align: left; margin: 2em 0;">
  <a href="https://github.com/jeffblankenburg/collectyourcards.com/issues?q=is%3Aissue&page=1" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 32px; background: #002d46; color: #fdbe01; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; transition: all 0.2s ease; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
    See The GitHub Issue Backlog
  </a>
</div>

This gives me three things I didn't have before:

**1. Time to think.** Writing an issue forces me to articulate what I actually want. Not just "add OAuth" but why, what providers, how it affects existing users, what happens on errors.

**2. Memory across sessions.** I can close my laptop, come back three days later, and the context is still there. AI doesn't remember conversations. Issues do.

**3. A paper trail.** When AI implements something and I realize we forgot error handling, I can look back at the issue and see if I ever specified it. Usually I didn't. That's on me, not the AI.

The issue is my specification. Not my prompt. My spec.

## What Makes a Good Issue for AI

A GitHub Issue for AI isn't the same as a ticket for a human developer. Humans can read between the lines. AI takes you literally.

Here's what I include in every issue:

<div style="background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; padding: 20px; margin: 1.5em 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;" markdown="1">

**User need:** What is the user trying to accomplish? Not "add a button" but "users need a way to export their data."

**Acceptance criteria:** What does done look like? "User clicks export, gets a CSV with all their data, download starts immediately."

**Technical context:** What systems are involved? "This touches the API server, needs to query Postgres, and should stream the response to avoid memory issues."

**Constraints:** What are the limitations? "File must be under 100MB. If larger, send via email. Rate limit to 1 export per hour per user."

**Non-functional requirements:** Security, performance, observability. "Log all export requests. Alert if export takes over 10 seconds. No PII in logs."

</div>

That's enough for AI to plan an implementation. And enough for me to review whether AI understood what I wanted.

## AI Can Help You Write Better Issues

Here's the thing. I'm not always good at writing specs. I forget edge cases. I miss security requirements. I think about the happy path and ignore errors.

So I have AI help me write the issue.

I'll open a chat and say: "I need to add data export functionality. Users should be able to download all their data as CSV. Help me write a complete GitHub Issue with acceptance criteria, technical context, constraints, and non-functional requirements."

> **AI:** "What format should dates be in? What happens if the data is too large? Should this be available to all users or just paid accounts? What about GDPR compliance?"
{: .conversation}

Questions I should have thought of myself. But didn't.

We iterate until the issue is complete. Then I create the issue in GitHub. Now it's the source of truth.

When I'm ready to implement, I don't paste the issue into chat. I tell AI: "Implement GitHub Issue #47. Read the issue, propose an implementation plan, and wait for my approval before writing code."

AI reads the issue. Proposes a plan. I review. We iterate on the plan. Then implementation starts.

The issue never changes. The plan evolves. This separation matters.

## AI Creates Follow-Up Issues During Implementation

Here's where this workflow really shines. AI discovers work you didn't think of.

We're implementing Issue #47 (data export). AI is writing the migration for the exports table. It realizes: "The dev database has this table, but production doesn't. You'll need to run this migration on prod before deploying."

Old workflow: I'd make a mental note. Maybe write a TODO comment. Probably forget until deployment fails.

New workflow: AI creates Issue #48: "Run exports table migration on production database." Tags it as "deployment" and "blocking." Links it to Issue #47.

Now I can't forget. The work is tracked. When I get to deployment, I see Issue #48 and remember to run the migration first.

This happens constantly. AI writes a feature, realizes it needs environment variables. Creates an issue. Realizes the API needs rate limiting. Creates an issue. Realizes we should add monitoring. Creates an issue.

I'm not tracking this in my head anymore. The issue tracker is tracking it for me.

## Small Issues Ship Faster

One issue, one feature. Not one issue, five features.

I used to write massive issues. "Build admin dashboard with user management, analytics, and reporting." That's three features. AI would build all three. I'd review all three. Find problems in all three. Deployment would touch a dozen files. Something would break and I wouldn't know which feature caused it.

Now I write small issues. Issue #50: "Add user list to admin dashboard." That's it. AI implements. I review. Tests pass. Ship it. Move to the next issue.

This is the same principle as small pull requests. Easier to review. Easier to test. Easier to deploy. Easier to roll back.

The difference is that with AI, I can ship these small issues fast. What would take a team a week of splitting work, coordinating, and integrating takes me a day. One issue at a time. Deploy between each one. Know exactly what's in production.

My issue tracker looks busy. Lots of small issues. That's good. It means I'm shipping constantly.

## The Workflow in Practice

Here's what my workflow looks like now:

**Planning:** Tell AI "Implement Issue #52. Read the issue, propose a complete implementation plan with architecture, data model, API design, error handling, tests, deployment steps, and observability. Don't write code yet."

**Review:** AI proposes a plan. I ask hard questions. "What goes wrong here? How do we handle failures? What about security? How will we monitor this?" AI revises. We iterate until the plan is solid.

**Implementation:** "Looks good. Implement the plan." AI writes code. Creates tests. Updates documentation. Creates follow-up issues for anything it discovers.

**Verification:** Run tests. Run linter. Run security scanner. Check that AI created appropriate follow-up issues. If something's missing, create an issue for it.

**Ship:** Deploy. Monitor. Close the issue.

**Repeat:** Next issue.

This is vibe coding. Not because AI is magic. Because the workflow is structured.

## Real Example: Achievement System for collectyourcards.com

Let me show you how this works with a real feature. I needed to add an achievement system to gamify collection building.

**Step 1: Create the issue with AI's help**

> **Me:** "I want to add achievements to collectyourcards.com. Users should earn points for collection milestones. Similar to Xbox Gamerscore. Help me write a complete issue."
>
> **AI:** "How should achievements be awarded? Real-time when they add cards, or batch processed daily? What categories of achievements? Should there be different point values based on difficulty?"
>
> **Me:** "Real-time for collection milestones. Batch for daily streaks. Categories: collection size, rookie cards, autographs, specific players, crowdsourcing contributions. Points scale from 5 for easy achievements to 1000 for nearly impossible ones."
>
> **AI:** "What about achievement tiers? How do users view their achievements? Should there be leaderboards? Can achievements be lost if they sell cards?"
>
> **Me:** "Six tiers based on rarity. Users see achievements on their profile with progress tracking. Global leaderboards plus category-specific ones. Achievements are permanent once earned."
{: .conversation}

We iterate. AI drafts an issue covering the database schema for 1,200+ achievements across 14 categories, real-time event processing, notification system, leaderboard calculations, and point weighting by rarity. I add details about caching strategy and create Issue #87 in GitHub.

**Step 2: Get an implementation plan**

> **Me:** "Implement Issue #87. Propose a complete plan. Don't write code yet."
{: .conversation}

AI reads the issue. Proposes a multi-phase approach:

Phase 1: Core achievement engine and 100 basic achievements (collection milestones, rookie cards).

Phase 2: Event hooks to trigger achievement checks when users add/remove cards.

Phase 3: Advanced categories (player focus, vintage cards, special cards).

Phase 4: Leaderboards, notifications, and social features.

I review the plan. Ask questions:

> **Me:** "What happens if a user adds 1,000 cards at once? Do we check all achievements synchronously?"
>
> **AI:** Queue achievement checks, process asynchronously, batch similar checks together, cache user stats.
>
> **Me:** "How do we handle achievement checks that require complex queries?"
>
> **AI:** Added query optimization strategy, pre-computed stats tables, incremental progress tracking.
{: .conversation}

**Step 3: Implementation**

> **Me:** "Looks good. Start with Phase 1."
{: .conversation}

AI writes the achievement engine. Database schema with achievement definitions, user progress tracking, achievement history, statistics tables. Seed script to populate 150 initial achievements. API endpoints for fetching achievements and user progress.

During implementation, AI creates follow-up issues:

Issue #88: "Add database indexes for achievement queries - user_id, achievement_id combinations."

Issue #89: "Implement achievement notification service with real-time websocket updates."

Issue #90: "Create admin dashboard for managing achievement definitions."

Issue #91: "Add analytics events for tracking which achievements get unlocked most."

I didn't think about the admin dashboard. AI caught that we'd need a way to add achievements without database migrations.

**Step 4: Verification and ship**

Tests pass. I manually add 100 cards to a test account. Watch achievements unlock in real-time. Check the database. Progress tracking working correctly. Achievement points calculated properly.

Deploy Phase 1. Monitor. Users start unlocking achievements. Check logs. No performance issues.

Close Issue #87 Phase 1. Move to Issue #88 for the indexes.

Total time: 4 days across multiple sessions. The structured issue kept context when I came back each day. AI never forgot what we were building because it was all documented in the issue.

## Why This Works

Using GitHub Issues as your AI's product backlog solves three problems:

**1. You stop being sloppy.** Writing an issue forces you to think. What does this feature actually need? What are the edge cases? What could go wrong? You're not throwing half-formed ideas at AI anymore.

**2. You maintain context across sessions.** AI doesn't remember yesterday's conversation. Issues do. You can come back to a feature days later and everything you decided is still there.

**3. Work doesn't get lost.** When AI discovers tasks during implementation, it creates issues. When you think of something at 2am, you create an issue. When a user reports a bug, you create an issue. Nothing lives in your head. Everything is tracked.

This is how professional teams work. Now you're applying the same discipline to working with AI.

The issue tracker is not overhead. It's how you stay organized while moving fast.

## Tomorrow

You have issues. AI implements them. But when AI generates UI, it looks nothing like your application.

Tomorrow I'll show you how to build a component library that teaches AI your design system. How to show AI what good looks like so it generates UI that matches your application from the start.

---

**Try This Today:**

Create a GitHub Issue for a feature you need to build. Include:
- User need (what are they trying to accomplish?)
- Acceptance criteria (what does done look like?)
- Technical context (what systems are involved?)
- Constraints (size limits, rate limits, performance requirements)
- Non-functional requirements (security, observability, error handling)

Don't ask AI to implement yet. Just create the issue. See how much clarity you get from writing it down.

Tomorrow you'll learn how to make sure AI-generated UI actually matches your application's design system.
