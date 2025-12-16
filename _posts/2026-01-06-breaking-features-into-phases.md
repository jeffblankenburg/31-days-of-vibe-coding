---
layout: post
title: "Day 6: Breaking Features Into Phases"
date: 2026-01-06
author: Jeff Blankenburg
excerpt: "Don't ask AI to build everything at once. Break complex features into phases. Ship working code. Verify each piece. Build confidence incrementally."
---

I asked Claude to build an achievement system for [collectyourcards.com](https://collectyourcards.com).

The prompt was detailed. User achievements for collection milestones. Point values by rarity. Leaderboards. Notifications. Progress tracking. Social sharing. Six different achievement categories. Over a thousand individual achievements.

Claude started writing code. And writing. And writing.

Forty-five minutes later, I had a massive codebase spanning dozens of files. Database migrations. API endpoints. Frontend components. Background jobs. Notification services.

It didn't work.

Not because any single piece was wrong. Because everything was connected and nothing was testable in isolation. The leaderboard code assumed the achievement engine worked. The notification system assumed the leaderboard existed. The frontend assumed all the APIs were done.

I couldn't verify any of it without finishing all of it.

I scrapped everything and started over. This time, in phases.

## The Problem With Big Prompts

When you ask AI to build a complete feature in one prompt, several things go wrong.

**Context degradation.** AI models have context windows. As the conversation grows, earlier details fade. By the time AI is writing file 20, it's forgotten decisions from file 3.

**Hallucination compounds.** A small hallucination early on becomes the foundation for more code. AI invents a function name in file 5. Uses that invented name in files 10, 15, and 20. Now you have a cascading failure that's hard to trace.

**Testing becomes impossible.** You can't test the search feature until the database is set up. You can't test the database until the schema is created. You can't test the schema until... you get the point. Everything depends on everything else.

**Debugging is a nightmare.** Something doesn't work. Is it the frontend? The API? The database query? The background job? When everything is built at once, the bug could be anywhere.

**No working software.** Until the entire feature is complete, you have nothing deployable. No incremental progress. No user feedback. Just a growing pile of untested code.

## The Solution: Phased Implementation

Break every complex feature into 3-5 phases. Each phase:

- Can be implemented independently
- Can be tested in isolation
- Produces working software
- Builds on previous phases

You don't move to phase 2 until phase 1 works. You don't move to phase 3 until phase 2 works. At every step, you have verified, working code.

This is how professional teams build software. It's how you should work with AI.

## How to Break Features Into Phases

Start with the core. What's the minimum version of this feature that provides value?

For the achievement system, the core was: users earn achievements when they hit collection milestones. That's it. No leaderboards. No notifications. No social sharing. Just: add cards, earn achievements.

Then layer on complexity:

**Phase 1: Core achievement engine**
- Database schema for achievements and user progress
- Basic achievement definitions (collect 10 cards, collect 100 cards)
- Trigger that checks achievements when user adds cards
- API to get user's achievements

**Phase 2: Achievement categories and rarity**
- Expand to all achievement categories (rookies, autographs, teams)
- Add point values and rarity tiers
- Batch achievement checking for bulk imports

**Phase 3: Progress tracking and UI**
- Track progress toward incomplete achievements
- Frontend display of achievements and progress
- Achievement detail pages

**Phase 4: Leaderboards**
- Global leaderboard by total points
- Category-specific leaderboards
- Caching for performance

**Phase 5: Notifications and social**
- Real-time notifications when achievements unlock
- Share achievements to social media
- Achievement comparison between users

Each phase is a complete unit. Phase 1 alone is useful. Users can earn achievements. The feature works. Everything after that is enhancement.

## The Prompting Pattern for Phases

When you've identified your phases, prompt AI for each one separately.

**Phase 1 prompt:**

```
## Context
collectyourcards.com, Node.js/Express, PostgreSQL.
Users have collections stored in user_cards table.
We're building an achievement system in phases.
This is Phase 1: Core achievement engine.

## Intent
Users should earn achievements when they reach collection milestones.
Start simple: achievements for total cards owned (10, 50, 100, 500, etc).
This phase establishes the foundation. Future phases add complexity.

## Constraints
- Create achievements and user_achievements tables
- Trigger achievement checks on card add (not in real-time for bulk imports)
- No frontend yet; API only
- No notifications yet
- No leaderboards yet
- Keep it simple; we'll expand later

## Phase 1 Scope
- Database migrations for achievements, user_achievements
- Seed script for basic collection milestones (10, 50, 100, 250, 500, 1000 cards)
- Achievement service with checkAchievements(userId) function
- API: GET /api/achievements (list all)
- API: GET /api/users/:id/achievements (user's earned achievements)
- Hook into card add flow to trigger checks

## Examples
Follow the pattern from server/services/collectionService.js for service structure.
Use the migration pattern from server/migrations/ for schema changes.

## Verification
- Tests: user earns achievement at threshold, doesn't re-earn same achievement
- Manual: add 10 cards, verify achievement appears
- Database: achievements table seeded, user_achievements tracks earned
```

Notice what's NOT in this prompt. No leaderboards. No notifications. No complex UI. Just the core.

**After Phase 1 is complete and verified:**

```
## Context
Phase 1 of achievement system is complete and working.
Users earn achievements for collection milestones.
Tables: achievements, user_achievements (see schema in migrations)
Service: server/services/achievementService.js

Now implementing Phase 2: Achievement categories and rarity.

## Intent
Expand beyond collection milestones to multiple achievement categories.
Add point values and rarity to make achievements more meaningful.
Optimize for bulk imports (users adding hundreds of cards at once).

## Constraints
- Build on existing tables; add columns, don't rebuild
- Existing Phase 1 achievements must still work
- Performance: checking achievements for 1000-card import under 5 seconds

## Phase 2 Scope
- Add category, points, rarity columns to achievements table
- New achievement categories: rookie cards, autographs, specific teams
- Expand achievement service to check all categories
- Batch processing for bulk imports
- Update seed script with full achievement set

## Examples
Follow existing achievementService.js patterns.
Reference the batch processing in server/services/importService.js.

## Verification
- Tests: achievements from each category, batch processing performance
- Manual: bulk import 500 cards, achievements process in under 5 seconds
- Backward compatible: Phase 1 achievements still work
```

Each phase prompt includes:
- What phase we're on
- What already exists (from previous phases)
- What this phase adds
- What this phase does NOT include
- How to verify

## Why Phases Work Better

**Smaller context, better output.** Each phase prompt is focused. AI isn't trying to hold an entire feature in memory. It's implementing one piece.

**Early verification.** After Phase 1, you run tests. You verify the foundation works. If something's wrong, you catch it now, not after building four more phases on top of it.

**Working software at every step.** Phase 1 complete? You have a working achievement system. Minimal, but working. You could ship it. Get user feedback. Course-correct before investing in phases 2-5.

**Easier debugging.** Something breaks in Phase 3? The bug is in Phase 3 code. Phases 1 and 2 were already verified. Your search space is small.

**Flexibility to pivot.** After Phase 2, you might realize leaderboards aren't as important as notifications. You can reorder phases. With a monolithic prompt, you're committed to the original plan.

## Real Example: Search Feature in Phases

I needed to build universal search for [collectyourcards.com](https://collectyourcards.com). Search across cards, players, teams, sets. Autocomplete. Filters. Recent searches. Saved searches.

That's a lot. Here's how I phased it.

**Phase 1: Basic card search**
- Search endpoint for cards by name
- Simple LIKE query
- Return top 50 results
- No filters, no autocomplete

Result: Working search in 30 minutes. Users can find cards. Ship it.

**Phase 2: Fuzzy matching and performance**
- Add pg_trgm for fuzzy search
- Index optimization
- Performance target: under 200ms

Result: Search handles typos. "Mike Trout" finds "Michael Trout." Still fast.

**Phase 3: Multi-entity search**
- Extend to players, teams, sets
- Unified results format
- Result type indicators

Result: Universal search across all content types.

**Phase 4: Filters and sorting**
- Year filter
- Team filter
- Card type filter
- Sort by relevance, year, name

Result: Power users can narrow results.

**Phase 5: Search UX**
- Autocomplete suggestions
- Recent searches
- Search analytics

Result: Search feels polished and smart.

Each phase shipped independently. Users had working search from Phase 1. Each subsequent phase made it better. If I'd tried to build Phase 5 quality in one prompt, I'd still be debugging.

## Breaking Down Your Feature

Here's the process I use:

**Step 1: Identify the core value**

What's the minimum version that provides user value? Strip away everything that's nice-to-have. What's essential?

**Step 2: List the enhancements**

What would make the core better? Group related enhancements together. These become your later phases.

**Step 3: Order by dependency**

What needs to exist before other things can work? Database before API. API before frontend. Core logic before optimization.

**Step 4: Size each phase**

Each phase should be implementable in one AI session. If it feels too big, split it. If it's tiny, combine with the next phase.

**Step 5: Define verification for each phase**

How will you know this phase works? What tests? What manual verification? What metrics?

## Prompt Template for Phased Implementation

### Starting a New Feature

```
## Feature Overview
[What we're building overall]

## Phase Breakdown
Phase 1: [Core functionality]
Phase 2: [Enhancement 1]
Phase 3: [Enhancement 2]
Phase 4: [Polish and optimization]

## Starting with Phase 1

### Context
[Tech stack, relevant files]

### Intent
[What Phase 1 accomplishes, why it's the foundation]

### Constraints
[What's NOT in Phase 1, keep scope tight]

### Scope
[Specific deliverables for Phase 1 only]

### Verification
[How to verify Phase 1 works]
```

### Continuing to Next Phase

```
## Context
Phase [N-1] is complete and verified.
[Summary of what exists from previous phases]

Now implementing Phase [N]: [Phase name]

## Intent
[What this phase adds, why it matters]

## Constraints
- Build on existing code, don't rebuild
- Previous phases must continue working
- [Scope limitations for this phase]

## Scope
[Specific deliverables for this phase only]

## Verification
- [Phase-specific tests]
- [Backward compatibility checks]
```

## Common Mistakes

**Mistake 1: Phases that are too big**

If a phase takes more than a few hours, it's too big. Split it. You want frequent verification points.

**Mistake 2: Phases that depend on future phases**

Phase 1 should be deployable without Phase 2. If Phase 1 only makes sense with Phase 2, combine them or restructure.

**Mistake 3: Not verifying between phases**

The whole point of phases is incremental verification. If you rush through without testing, you lose the benefit.

**Mistake 4: Rebuilding previous phases**

Each phase should add to what exists, not rebuild it. If AI suggests rewriting Phase 1 code in Phase 3, push back. Add, don't replace.

**Mistake 5: Too many phases**

3-5 phases is usually right. More than that creates overhead. Fewer than that means phases are too big.

## The Discipline of Small Steps

Phased implementation requires discipline. When you see the full feature in your head, it's tempting to just ask for all of it. "AI is smart, it'll figure it out."

It won't. Or rather, it will produce something that looks complete but isn't verifiable.

Small steps. Frequent verification. Working software at every stage.

This is slower in the short term. It's much faster in the long term because you catch problems early, when they're cheap to fix.

## Tomorrow

You've learned to break features into phases. But what happens when a phase conversation gets too long? When AI starts forgetting what you discussed earlier? When you need to pick up tomorrow where you left off today?

Tomorrow I'll cover context management. What to include at the start of each session. When to start a fresh conversation. How to maintain continuity across days and weeks of development.

---

## Try This Today

Take a feature you've been putting off because it felt too big.

1. Identify the core value. What's the minimum useful version?
2. List 3-5 phases that build from core to complete
3. Write the Phase 1 prompt using the five-part pattern from Day 5
4. Implement Phase 1 only
5. Verify it works
6. Stop and celebrate

You've shipped. The feature exists. Everything else is enhancement.

That's the power of phases. You're never more than a few hours from working software.
