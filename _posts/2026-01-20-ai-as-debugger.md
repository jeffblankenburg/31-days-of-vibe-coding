---
layout: post
title: "Day 20: AI as Debugger"
date: 2026-01-20
author: Jeff Blankenburg
excerpt: "Bugs happen. Finding them is slow. Learn to use AI as your debugging partner, systematically narrowing down problems instead of guessing."
---

You know the drill. Something's broken. You're not sure where. You add a console.log. Then another. Then twelve more. You run it again. The bug doesn't appear. You add more logs. Now it appears but the logs don't help. You start guessing.

This is debugging by wandering. It works eventually, but it's slow and frustrating.

Here's what I've learned: AI is annoyingly good at debugging. Not because it's smarter, but because it's systematic. You describe the symptoms, AI lists the likely causes in order of probability, and you work through them methodically.

While you're guessing, AI is pattern matching against every bug it's ever seen.

## Why AI Is Good at Debugging

Debugging is pattern matching. You have a symptom. You need to find the cause. The space of possible causes is large.

AI has seen millions of bugs. It recognizes patterns: "silently fails sometimes" often means race condition, async issue, or swallowed error. "Works locally but not in production" often means environment variables, database differences, or timing issues.

When you describe a bug, AI immediately narrows to the most likely categories. Then it helps you test each one systematically.

## The Debugging Prompt

Here's the prompt that starts most debugging sessions:

```
I have a bug. Help me find it.

Symptom: [describe what's happening]
Expected: [describe what should happen]
Frequency: [always / sometimes / rarely]
Environment: [local / staging / production]

Relevant code:
[paste the code you think is involved]

Recent changes:
[paste recent commits if relevant]

What I've tried:
[what have you already ruled out?]

Help me:
1. List the top 5 most likely causes
2. For each cause, how would I confirm or rule it out?
3. What logging would help narrow it down?
```

## A Real Debugging Session

Here's how the card transfer bug went:

**Me:**
```
I have a bug. Help me find it.

Symptom: Card transfers sometimes fail silently. The API returns
success, but the card stays with the original owner.

Expected: Card ownership should transfer to the new owner.

Frequency: Sometimes. Maybe 1 in 100 transfers.

Environment: Production only. Can't reproduce locally.

Relevant code:
[pasted the transferCard function]

What I've tried:
- Added logging to the function
- Checked for database errors
- Verified the API is being called correctly
```

**AI:**
```
Top 5 most likely causes for intermittent silent failures:

1. Race condition in concurrent transfers
   The ownership check and update aren't atomic. Two concurrent
   transfers could both pass the ownership check before either writes.

   Confirm: Add logging with timestamps before check and after write.
   Look for overlapping timestamps in production logs.

2. Database transaction isolation
   Default isolation level might allow dirty reads where the ownership
   check sees stale data.

   Confirm: Check your database isolation level. Test with two
   simultaneous transfers of the same card.

3. Stale cache
   If you're caching card data, the check might use cached ownership
   while the write goes to the database.

   Confirm: Check for any caching layer. Try disabling cache and
   testing.

4. Optimistic locking failure without proper handling
   If using optimistic locking, version conflicts might be silently
   swallowed.

   Confirm: Search for where version conflicts are caught. Check if
   they're being logged.

5. Unhandled promise rejection
   An async operation might be failing without the error bubbling up.

   Confirm: Add try/catch around all async operations. Add
   .catch() to any promises.
```

The race condition hypothesis led me to add timestamp logging. Sure enough, I found cases where two transfers were within 50ms of each other. Both passed the check. Both tried to write. Only one succeeded. The other silently did nothing because the ownership had already changed.

## The Hypothesis-Test Loop

Good debugging is scientific. Hypothesis, test, refine.

```
Based on our debugging so far:

Hypothesis: [what you now think the cause is]
Evidence: [what supports this hypothesis]
Against: [what doesn't fit this hypothesis]

Next test: [what would confirm or refute this]

Generate the specific code or query I should run to test this hypothesis.
```

This keeps the debugging focused. No more random changes hoping something works.

## Log Analysis

When you have logs but can't see the pattern:

```
Analyze these logs for the bug we're tracking.

Bug: [describe the symptom]

Logs from successful operation:
[paste logs]

Logs from failed operation:
[paste logs]

Compare them:
1. What's different between success and failure?
2. What's missing in the failure case?
3. What sequence of events leads to failure?
4. What timestamp patterns do you notice?
```

AI is good at spotting differences humans miss. Different order of operations. Missing log entries. Timing anomalies.

## Stack Trace Analysis

When you have a stack trace but don't understand it:

```
Explain this stack trace and help me find the root cause.

Error: [paste the error message]

Stack trace:
[paste the full stack trace]

For each frame:
1. What file and function?
2. What was it trying to do?
3. Is this library code or our code?

Then:
1. Where did the error actually originate?
2. What caused the error?
3. What's the fix?
```

## The Rubber Duck With Context

Sometimes you just need to explain the problem:

```
I'm stuck on a bug. Let me explain it to you, and ask questions
that help me think through it.

The bug: [describe it]

The code: [paste it]

Ask me questions about:
1. What I've already tried
2. What I expect vs what happens
3. Any recent changes
4. Edge cases I might have missed
```

AI asking you questions often reveals assumptions you didn't realize you were making.

## Narrowing Down

When the bug could be anywhere:

```
Help me narrow down where this bug lives.

System overview: [describe the components involved]

The bug: [describe the symptom]

Help me create a binary search:
1. What's the midpoint? What can I test to determine if the bug
   is in the first half or second half of the flow?
2. Based on that test, what's the next midpoint?

Goal: narrow to a single component in as few tests as possible.
```

## Common Bug Patterns

AI recognizes these patterns instantly:

**"Works sometimes"** → Race condition, caching, timing issue

**"Works locally, fails in production"** → Environment config, data volume, network latency

**"Worked yesterday, broken today"** → Recent commit, dependency update, data change

**"First request works, subsequent fail"** → State mutation, connection pool, memory leak

**"Works for me, fails for users"** → Permissions, data differences, browser/client differences

Tell AI which pattern matches your bug, and it knows where to look.

## Adding Strategic Logging

When you need more visibility:

```
I need to add logging to debug this issue.

The bug: [describe it]
The code: [paste it]

Generate logging that will help me:
1. Trace the exact path execution takes
2. See the state at each decision point
3. Capture timing information
4. Include enough context to identify the specific request

Use our logging format: [describe your logging pattern]

Make the logging easy to add and remove.
```

## The Fix Verification Prompt

Once you think you've found it:

```
I think I found the bug and have a fix.

The bug: [describe it]
The cause: [describe what was wrong]
The fix: [paste your fix]

Review this fix:
1. Does it actually address the root cause?
2. Could it introduce new bugs?
3. What tests should I add to prevent regression?
4. Are there other places with the same bug pattern?
```

## Debugging AI-Generated Bugs

AI code has predictable bug patterns:

```
This is AI-generated code that has a bug.

The bug: [describe it]
The code: [paste it]

Common AI code bugs:
- Off-by-one errors in loops
- Missing null checks
- Incorrect async/await handling
- Wrong array methods (map vs forEach vs filter)
- Missing error handling
- Incorrect type coercion

Check for these patterns first.
```

## Tomorrow

Debugging is reactive. You find bugs after they exist. But what about bugs in production where you can't just add console.log?

Tomorrow I'll cover production debugging: when it's on fire and you need to find problems with only the observability you already have.

---

## Try This Today

1. Think of a bug you recently spent too long finding
2. Write up the initial prompt as if you were starting fresh
3. See what AI suggests

Notice how quickly AI narrows to likely categories. That systematic approach is what makes AI debugging faster than random guessing.

Next time you hit a bug, start with AI instead of ending with it.
