---
layout: post
title: "Day 9: Git Is Your Undo Button for AI Mistakes"
date: 2026-01-09
author: Jeff Blankenburg
excerpt: "AI changed 15 files and broke everything. Without Git discipline, you're screwed. With it, you're one command away from a working state. Here's the workflow."
---

Claude rewrote my authentication system.

I'd asked for a small change. Add a new field to the user profile. Simple. Should have touched two files. Maybe three.

Claude touched twelve. The user model. The authentication middleware. The profile service. The registration flow. Three different API routes. Two frontend components. A migration file. And some "cleanup" I didn't ask for.

The app crashed on startup. Errors everywhere. I spent 20 minutes trying to understand what changed. Another 30 trying to manually undo the damage.

I didn't have a commit from before the changes. I hadn't committed in three hours. All my working code was mixed with Claude's changes.

Never again.

Now I commit before every significant AI operation. It takes five seconds. It's saved me hours.

## The Problem With AI Changes

AI changes are different from human changes.

When you code manually, you change one thing at a time. You test. You change another thing. You're in control. If something breaks, you know what you just did.

AI changes come in batches. You ask for a feature, AI generates 10 files. You ask for a fix, AI rewrites a function. The changes are atomic in AI's mind but spread across your codebase.

When those changes break something, you don't know:
- Which file has the bug
- What the original code looked like
- Which changes were necessary vs "helpful" extras
- How to get back to working state

Without Git, you're debugging blind.

## The Workflow

Here's the discipline that saves you:

**1. Commit before asking AI to make changes**

```bash
git add -A
git commit -m "WIP: before AI changes to auth"
```

Takes five seconds. Now you have a checkpoint.

**2. Let AI make changes**

Do your normal AI workflow. Generate code. Accept changes. See what happens.

**3. Test**

Does it work? Does it do what you wanted?

**4a. If it works: commit the changes**

```bash
git add -A
git commit -m "Add email field to user profile"
```

Clean commit message describing what changed.

**4b. If it doesn't work: decide your path**

Option A: Debug and fix (if the problem is small)
Option B: Reset and try again (if the problem is big)

**5. For reset: use git restore**

```bash
git restore .
```

You're back to your pre-AI checkpoint. No damage. No lost work. Try a different approach.

## Checkpoint Commits

I use "WIP" (Work In Progress) commits as checkpoints. They're not meant to be permanent. They're save points.

```bash
git commit -m "WIP: before adding validation"
git commit -m "WIP: before refactoring service layer"
git commit -m "WIP: before AI implements caching"
```

After the AI work is done and verified, I often squash these into cleaner commits. But during development, the checkpoints are invaluable.

Think of it like a video game. You save before the boss fight. If you die, you reload. You don't start the whole game over.

## Asking AI What Will Change

Before letting AI make big changes, ask what it plans to modify:

```
Before implementing this, list all the files you expect to modify and why.
Don't make any changes yet. Just show me the plan.
```

AI responds with something like:

```
I'll need to modify:
1. server/models/user.js - Add email field to schema
2. server/services/userService.js - Update create/update methods
3. server/routes/users.js - Handle email in API
4. server/migrations/20240115_add_email.js - New migration

I'll also need to update:
5. client/components/ProfileForm.jsx - Add email input
6. client/services/userApi.js - Include email in requests
```

Now you know the scope. If the list is bigger than expected, you can narrow it:

```
Only modify the backend for now. I'll handle the frontend separately.
```

Better to know before than discover after.

## The "Show Me First" Pattern

For risky changes, ask AI to show the code without applying it:

```
Show me the changes you'd make to userService.js, but don't modify the file yet.
I want to review before applying.
```

Claude shows you the proposed changes. You review. If it looks good:

```
Looks good. Apply those changes.
```

If it looks wrong:

```
That changes too much. Only modify the createUser function.
Show me the revised changes.
```

This costs a few extra messages but prevents the "AI changed everything" problem.

## Smaller Commits, Better Safety

The more frequently you commit, the less you can lose.

My rhythm:
- Commit before starting any AI task
- Commit after any successful AI change
- Commit before trying a different approach

Sometimes I commit every 10 minutes. Sometimes every 5. Depends on how much is changing.

```bash
git commit -m "WIP: basic endpoint working"
# AI adds validation
git commit -m "WIP: validation added"
# AI adds error handling
git commit -m "WIP: error handling added"
# AI adds tests
git commit -m "Add user endpoint with validation and tests"
```

The final commit is clean. The WIP commits are safety nets.

## Branching for Experiments

When I'm not sure if an approach will work, I branch:

```bash
git checkout -b experiment/caching-approach
```

Now I can let AI go wild. If it works, merge. If it doesn't, delete the branch.

```bash
# If it worked
git checkout main
git merge experiment/caching-approach

# If it didn't
git checkout main
git branch -D experiment/caching-approach
```

The main branch never gets polluted with failed experiments.

## Git Diff as Review Tool

After AI makes changes, use `git diff` to see exactly what changed:

```bash
git diff
```

This shows you every modification. Every added line. Every removed line.

Scan for:
- Files you didn't expect to change
- Deletions of code you wanted to keep
- Changes outside the scope you requested

If you see something wrong, now's the time to catch it. Before you test. Before you commit. Before you forget what the original looked like.

```bash
# See what changed in a specific file
git diff server/services/userService.js

# See what files changed
git diff --stat
```

## Reverting Specific Files

Sometimes AI changes are mostly good but one file went wrong. Revert just that file:

```bash
# Revert a single file to last commit
git restore server/services/authService.js
```

Keep the good changes, undo the bad. Surgical precision.

## The Stash for Quick Pivots

Sometimes you want to try something different without losing current changes:

```bash
# Save current changes
git stash

# Try a different approach with AI
# ...

# If new approach is better, drop the stash
git stash drop

# If original was better, restore it
git stash pop
```

Stash is like a clipboard for code changes. Useful when you're not sure which direction is right.

## Prompt Template: Asking for Safe Changes

When you want AI to be careful:

```
Make this change to [file]:
[description of change]

Constraints:
- Only modify [specific function/section]
- Do not change [related but out-of-scope code]
- Do not add new dependencies
- Preserve existing tests

Before making changes, tell me exactly what you'll modify.
```

This sets expectations. AI knows the boundaries. You know what to expect in the diff.

## When Things Go Really Wrong

Sometimes you need to go back further than the last commit.

```bash
# See commit history
git log --oneline

# Go back to specific commit
git checkout abc123

# Or reset to specific commit (careful, this discards subsequent commits)
git reset --hard abc123
```

This is why frequent commits matter. More commits means more restore points.

## Real Example: The Refactor Gone Wrong

I asked Claude to refactor a service for better testability. Simple request. Extract some dependencies. Add injection points.

Claude did that. It also "cleaned up" the error handling. And "simplified" some logic. And renamed some functions for "clarity."

The tests passed. But the service behaved differently in production. A subtle change in error handling meant certain failures were silently swallowed.

I spent two hours debugging. The issue was in the "cleanup" code. Code I hadn't asked for.

With git diff, I would have seen those extra changes. With a checkpoint commit, I could have reverted and asked for just the dependency extraction.

Now I always diff before accepting AI changes. And I commit before risky operations.

## Building the Habit

This workflow feels like overhead at first. It's not.

Time cost of frequent commits: 30 seconds per commit.
Time cost of recovering from AI mistakes without commits: 30 minutes to hours.

The math is clear. The habit takes a week to build. Then it's automatic.

Start today:
1. Before any AI operation, `git add -A && git commit -m "WIP: before X"`
2. After AI changes, `git diff` to review
3. If good, commit. If bad, restore.

That's it. Three steps. Your safety net.

## Tomorrow

Git keeps you safe from AI mistakes. But what about preventing those mistakes in the first place? Tomorrow I'll show you how to configure AI agents with your standards. Set it up once, and every session starts with your patterns, your tech stack, your rules.

No more repeating "use TypeScript" in every conversation.

---

## Try This Today

1. Before your next AI session, commit your current state
2. Make a checkpoint commit: `git commit -m "WIP: before AI session"`
3. Let AI make some changes
4. Run `git diff` to see exactly what changed
5. Practice restoring: `git restore .` then redo

Get comfortable with the rhythm. Commit, change, diff, decide. It'll become second nature, and you'll never lose hours to an AI mistake again.
