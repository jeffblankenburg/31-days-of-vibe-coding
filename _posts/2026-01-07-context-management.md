---
layout: post
title: "Day 7: Context Management"
date: 2026-01-07
author: Jeff Blankenburg
excerpt: "AI doesn't remember yesterday. Learn what context to include, when to start fresh, and how to maintain continuity across sessions without losing the thread."
---

It's Tuesday. You're building a search feature. You and Claude spent two hours yesterday setting up the database schema, discussing query optimization, and implementing the basic endpoint. Good progress.

You open a new chat today. "Continue working on the search feature."

Claude responds: "I'd be happy to help with the search feature. What database are you using? What's the current state of the implementation? What should the search endpoint return?"

All the context from yesterday is gone. Claude doesn't remember the conversation. Doesn't remember the decisions. You're starting over.

This happens to everyone. AI conversations don't persist. Every new chat is a blank slate. And even within a single conversation, context degrades as the chat grows longer.

Managing context is the difference between productive AI sessions and frustrating reruns.

## The Context Problem

AI has two limitations that create the context problem.

**No memory between conversations.** When you close a chat and open a new one, everything is gone. Every decision. Every file discussed. Every pattern established. Fresh start.

**Degrading attention within conversations.** AI models have context windows. They can hold a certain amount of text. As your conversation grows, earlier messages get less attention. By message 50, the AI might have forgotten what you discussed in message 5.

Both problems get worse on complex features. More decisions to track. More files to reference. More context that matters.

## When to Start Fresh

Sometimes you should start a new conversation. Sometimes you should continue. Knowing when to do which matters.

**Start fresh when:**

- The conversation has gone over 30-40 messages
- AI is repeating itself or contradicting earlier statements
- You're changing topics (new feature, different file, unrelated task)
- AI is hallucinating things that don't exist
- Quality is noticeably declining
- You're returning after a break (next day, after lunch)

**Continue when:**

- You're in the middle of implementing something
- The conversation is short and focused
- AI is producing good results
- You're iterating on the same piece of code
- Context is fresh and accurate

The default should be starting fresh more often than you think. A clean slate with good context beats a long conversation with degraded attention.

## What Context to Include

When you start a new conversation (or provide a substantial update), include these categories:

### 1. Project Context

What are you building? What tech stack? What patterns do you use?

```
Project: collectyourcards.com
Stack: Node.js/Express backend, React frontend, PostgreSQL database
Patterns: Service layer (server/services/), routes in server/routes/
Testing: Jest for backend, React Testing Library for frontend
Style: ESLint + Prettier, TypeScript strict mode
```

This doesn't change much. Keep it in a file you can paste.

### 2. Session Context

What have you been working on? What decisions have been made?

```
Current work: Search feature, Phase 2 (fuzzy matching)
Phase 1 complete: Basic search endpoint at GET /api/cards/search
Decisions made:
- Using pg_trgm extension for fuzzy matching
- Index on normalized_name column
- Maximum 50 results per page
- Cursor-based pagination

Files involved:
- server/routes/search.js (endpoint)
- server/services/searchService.js (logic)
- server/migrations/20240115_add_search_index.js
```

This changes per session. Update it as you go.  You can even have your AI update it for you.

### 3. Relevant Code

The actual code AI needs to see. Not everything. Just what's relevant.

```
Current searchService.js implementation:
[paste current code]

Database schema for cards table:
[paste relevant columns]
```

AI works better when it can see the code, not just hear about it.

### 4. Current Task

What specifically are you trying to do right now?

```
Task: Add fuzzy matching to the search endpoint.
The current implementation uses exact LIKE matching.
Need to integrate pg_trgm for typo tolerance.
Performance requirement: under 200ms for any query.
```

Be specific. Not "improve search" but "add fuzzy matching with pg_trgm."

## The Context Template

Here's the template I use when starting a session:

```
## Project
[One paragraph: what you're building, tech stack, key patterns]

## Current State
Working on: [feature/phase]
What's done: [completed parts]
What's next: [current task]

## Key Decisions
- [Decision 1 and why]
- [Decision 2 and why]
- [Decision 3 and why]

## Relevant Files
[List of files that matter for this task]

## Current Task
[Specific thing to accomplish this session]
```

It takes 5 minutes to write. It saves 30 minutes of re-explaining.

## Maintaining Context During Long Sessions

Even within a single conversation, context can drift. Here's how to keep it sharp.

**Summarize periodically.** Every 10-15 messages, summarize where you are.

```
Quick summary of where we are:
- Search endpoint working with fuzzy matching
- Added pg_trgm index, queries under 100ms
- Next: implement pagination
```

This refreshes AI's attention on the important points.

**Reference specific decisions when relevant.** Instead of "use the pattern we discussed," say "use the cursor-based pagination pattern from message 12."

AI can look back, but it helps to point to exactly what you mean.

**Keep scope narrow.** Don't let conversations sprawl across multiple features. One feature per conversation. Start fresh for the next feature.

**Explicitly close topics.** When you finish something, say so.

```
Pagination is done and tested. Moving on to error handling for edge cases.
```

This signals to AI that pagination context can be deprioritized.

## Handling Day-to-Day Continuity

The biggest context challenge is picking up where you left off. Tuesday's progress needs to be available on Wednesday.

**Option 1: Document as you go**

Keep a running document with decisions and status. Have your agent update it at the end of each session.

```markdown
# Search Feature Progress

## Completed
- Phase 1: Basic endpoint (2024-01-14)
- Phase 2: Fuzzy matching (2024-01-15)

## Current: Phase 3 (Pagination)
Started: 2024-01-16
Status: In progress, cursor-based approach implemented
Blocker: Need to handle edge case where cursor references deleted record

## Decisions
- Using cursor-based pagination (not offset) for consistency with large result sets
- Cursors are base64-encoded JSON with {id, score}
- ...

## Next Session
- Resolve deleted record cursor issue
- Add tests for pagination edge cases
- Start Phase 4: filters
```

Tomorrow, paste this document into your new conversation. AI has full context immediately.

**Option 2: GitHub Issues as context**

If you're using GitHub Issues (from Day 2), the issue itself provides context.

```
Continue implementing GitHub Issue #52 (Search feature).
Read the issue for requirements and acceptance criteria.
Here's the current state:
- Phase 1 complete
- Phase 2 complete
- Phase 3 in progress: [current status]
```

The issue is the source of truth. Your context update is just current status.

**Option 3: Let AI help rebuild context**

At the start of a new session:

```
I'm continuing work on the search feature. Here are the relevant files:
- server/routes/search.js
- server/services/searchService.js

Read these files and summarize:
1. What's currently implemented
2. What patterns are being used
3. What the current state is

Then I'll tell you what to work on next.
```

AI reads your code and reconstructs the context. You verify it understood correctly. Then you continue.

This is slower but useful when you don't have documentation.

## Context for Different Scenarios

### Scenario: Continuing yesterday's work

```
## Project
[Standard project context]

## Session Context
Yesterday I worked on: [feature]
What was completed: [list]
Where I stopped: [specific point]
Open questions: [if any]

## Today's Goal
Pick up from [specific point] and complete [next milestone]

Here are the relevant files in their current state:
[paste code]
```

### Scenario: Starting a new feature

```
## Project
[Standard project context]

## Previous Work
Last feature shipped: [what it was]
Patterns established: [relevant patterns for new feature]

## New Feature
Starting: [feature name]
Phase 1 scope: [what Phase 1 includes]
Related existing code: [files to reference for patterns]

See GitHub Issue #[N] for full requirements.
```

### Scenario: Debugging a problem

```
## Project
[Standard project context]

## Problem
What's happening: [description]
What should happen: [expected behavior]
When it started: [after what change]
Error message: [exact error]

## Relevant Code
[paste the problematic code]

## What I've Tried
- [Attempt 1, result]
- [Attempt 2, result]
```

### Scenario: Code review

```
## Project
[Standard project context]

## Code to Review
Feature: [what it does]
PR/Changes: [list of files]

## Review Focus
- Security (especially [specific concerns])
- Performance (especially [specific concerns])
- Patterns (should match [reference files])

Here's the code:
[paste code]
```

## Red Flags That Context Is Lost

Watch for these signs that AI has lost context:

- Asking questions you already answered
- Using different variable names than established
- Suggesting patterns that contradict earlier decisions
- Generating code that doesn't match your tech stack
- Confidently describing code that doesn't exist

When you see these, don't keep going. Either refresh context with a summary or start a new conversation.

## The 30-Message Rule

As a rough guideline: consider starting fresh after 30 messages.

This isn't a hard rule. Some conversations stay coherent for 50+ messages. Some drift after 15. But 30 is a useful checkpoint.

At message 30, ask yourself:
- Is AI still tracking the full context?
- Are responses as good as they were at the start?
- Would a fresh start with good context be clearer?

Usually the answer is yes, start fresh.

## Building Your Context Habit

Context management isn't exciting. It feels like overhead. But it's the difference between productive AI sessions and frustrating ones.

Here's the habit:

1. **Start every session with context.** Even if it takes 5 minutes to write. Especially if it takes 5 minutes to write.

2. **Document decisions as you make them.** Not after. During. Keep a running log.

3. **Summarize before stepping away.** End of day. Before lunch. Before a meeting. Capture where you are.

4. **Start fresh more often.** When in doubt, new conversation with good context.

5. **Let AI help.** Ask AI to summarize, to read files, to verify understanding.

The goal is never losing the thread. Never starting from scratch. Always being able to pick up exactly where you left off.

## Week 1 Complete

You've made it through the first week.

* Day 1: What vibe coding is and why it works.
* Day 2: Using GitHub Issues as your AI's product backlog.
* Day 3: Component libraries that teach AI your design system.
* Day 4: Observability first, so you know when AI code breaks.
* Day 5: The five-part prompting pattern that gets results.
* Day 6: Breaking features into phases for incremental delivery.
* Day 7: Managing context across sessions.

These are the fundamentals. The foundation for everything that follows.

Next week, we go tactical. What to do when AI goes down a rabbit hole. Using Git as your undo button. Agent configuration that encodes your standards. Teaching AI your patterns through examples.

The foundation is set. Now we build on it.

---

## Try This Today

Create a context template for your project. Include:

1. **Project context** (tech stack, patterns, key files)
2. **Session context template** (current work, decisions, status)
3. **Relevant files section** (what to paste for different features)

Save it somewhere accessible. Use it to start your next AI session.

Notice how much smoother the conversation goes when AI has context from the start.

That's the power of managing context deliberately instead of hoping AI figures it out.
