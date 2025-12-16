---
layout: post
title: "Day 8: When to Restart vs When to Keep Going"
date: 2026-01-08
author: Jeff Blankenburg
excerpt: "AI went down a rabbit hole. Your instinct is to keep refining. Sometimes that's right. Sometimes you need to burn it down and start over. Here's how to tell the difference."
---

I was three hours into a conversation with Claude about a card import feature. The basic import worked. Then I asked for validation. Then error handling. Then batch processing. Then retry logic.

Somewhere around message 40, Claude suggested rewriting the validation logic. The same validation logic it had written 30 messages earlier. The new version contradicted the error handling from message 25.

I kept going. "No, we already decided to validate at the boundary. Keep the existing pattern."

Claude apologized and generated new code. It still didn't match what we'd built. I clarified again. More code. Still wrong.

I spent another hour trying to get Claude back on track. The conversation was so long that Claude couldn't hold the full context anymore. Every new message pushed earlier decisions further out of focus.

I should have restarted at message 30. Instead, I burned two hours fighting a losing battle.

## The Sunk Cost Problem

Here's why this happens: you've invested time. The conversation has history. Context. Decisions. Starting over feels like throwing that away.

It's not.

When AI loses context, continuing costs more than restarting. Every clarification takes a message. Every correction takes a message. Each message pushes useful context further away. You're not making progress. You're treading water.

The time you invested is gone either way. The question is how much more time you'll lose before admitting it.

## The Three Request Rule

Here's my rule: if I've made three requests to fix the same issue, and it's still wrong, I restart.

Not three related issues. Three attempts at the same thing.

"Fix the validation logic."
"No, I meant the boundary validation, not the internal checks."
"You're still modifying the wrong function. The validation at line 45."

That's three. Time to restart.

The reasoning is simple. If AI understood the issue, it would fix it. Three failed attempts means AI has lost the context needed to understand. More attempts won't help. More words won't help. AI doesn't have the foundation to make sense of them.

A fresh start with clear context will get you there faster.

## Signs AI Is In a Rabbit Hole

Beyond the three request rule, watch for these patterns:

**Contradicting earlier decisions.** AI suggests something you explicitly rejected 20 messages ago. It's not being stubborn. It's forgotten.

**Apologizing repeatedly.** One apology is fine. Three apologies in a row means AI is thrashing, not converging.

**Generating more code than necessary.** You asked for a one-line fix. AI rewrote the entire function. It's lost track of scope.

**Introducing new patterns mid-stream.** You've been using async/await. Suddenly AI generates callbacks. It's lost the thread of your codebase.

**Asking questions you already answered.** "What database are you using?" You told it PostgreSQL in message 3. Context is gone.

**Confident nonsense.** AI explains why your code should work when it clearly doesn't. It's hallucinating based on incomplete context.

When you see these signs, don't fight them. Restart.

## The Restart Conversation

Starting over doesn't mean losing everything. It means distilling what matters into a fresh context.

Here's what to include:

```
## Context
[Your standard project context]

## What We're Building
[The feature, summarized in 2-3 sentences]

## What's Done
- [Completed piece 1]
- [Completed piece 2]
- [Completed piece 3]

## Key Decisions Made
- [Decision 1 and why]
- [Decision 2 and why]

## Current State
[Paste the current working code]

## What Needs to Happen Next
[The specific task that was failing]
```

This is maybe 10 minutes of work. Compare that to the hours you'd lose fighting degraded context.

The restart conversation has everything AI needs. Clean context. Clear decisions. Working code. Specific task. No accumulated confusion.

## When to Keep Going

Not every difficulty means restart. Sometimes you should push through.

**Keep going when:**

The conversation is short (under 20 messages). Context is still fresh. Issues are likely misunderstandings, not context loss.

**Keep going when:**

AI is making progress, just not perfect progress. Each response is better than the last. You're converging, not diverging.

**Keep going when:**

The problem is complexity, not confusion. AI understands what you want but the implementation is legitimately hard. Restarting won't make the problem easier.

**Keep going when:**

You can see the finish line. You're 90% done. The remaining issues are small. Starting over would cost more than finishing.

## The Decision Framework

When something's wrong, ask yourself:

1. **Is AI understanding my requests?**
   - Yes → Keep going, refine your request
   - No → Consider restart

2. **Are responses getting better or worse?**
   - Better → Keep going, you're converging
   - Worse → Restart, you're diverging

3. **How many messages has this conversation been?**
   - Under 20 → Keep going, context is fresh
   - 20-30 → Be alert for degradation
   - Over 30 → Lean toward restart

4. **Am I repeating myself?**
   - No → Keep going
   - Yes → Count the repetitions, apply three request rule

5. **Is AI introducing new contradictions?**
   - No → Keep going
   - Yes → Restart, context is corrupted

## The "Stop and Assess" Prompt

When you're unsure whether to continue or restart, ask AI to assess:

```
Stop for a moment. I want to verify we're on the same page.

Summarize:
1. What feature we're building
2. The key decisions we've made
3. What the current code does
4. What we're trying to accomplish next

Don't generate any new code. Just summarize your understanding.
```

If AI's summary matches your understanding, keep going. If it's confused, contradictory, or missing key points, restart.

This takes 30 seconds and can save hours.

## The Partial Restart

Sometimes you don't need a full restart. You need a checkpoint reset.

```
Let's step back. The last few changes introduced problems.

Here's the version of searchService.js that was working:
[paste working code]

From this working state, let's implement just the pagination.
Don't modify the search logic itself. Just add pagination.
```

You're not starting the whole conversation over. You're resetting to a known good state and continuing from there.

This works well when:
- A specific change broke things
- You have a working version to restore
- The overall conversation context is still good
- Just one piece went wrong

## Real Example: The Import Feature

Let me show you how this plays out.

I was building a card import feature. The conversation went like this:

**Messages 1-10:** Basic import working. Parse CSV, insert records. Good.

**Messages 11-20:** Add validation. Check for required fields, valid data types. Still good.

**Messages 21-30:** Add batch processing for large files. Process 100 at a time. Works but getting complex.

**Messages 31-35:** Add error handling. This is where it went wrong. Claude started generating error handling that conflicted with the validation from messages 11-20.

**Messages 36-40:** I tried to correct. "Keep the validation at the boundary, add error handling for database failures." Claude apologized, generated new code, still conflicting.

**Message 41:** I asked Claude to summarize our decisions. The summary was missing the validation architecture entirely.

That's when I restarted.

**New conversation:**

```
## Context
collectyourcards.com card import feature.
Node.js/Express, PostgreSQL, using importService pattern.

## What's Working
- CSV parsing (server/services/csvParser.js)
- Basic import endpoint (server/routes/import.js)
- Validation at API boundary (validateCardImport middleware)
- Batch processing (100 records per batch)

## Key Decisions
- Validation happens BEFORE import service, at API boundary
- Import service assumes valid data
- Batch processing uses transaction per batch
- Individual record failures don't fail entire batch

## Current Code
[pasted importService.js]

## Next Step
Add database error handling to importService.processsBatch()
Should catch connection errors, constraint violations, deadlocks.
Should NOT re-validate data (that's the boundary's job).
```

Ten messages later, error handling was done. Clean implementation that respected the validation architecture.

The restart cost me 10 minutes to write context. The failed continuation had already cost me an hour.

## Building the Habit

Restarting feels wrong. It feels like giving up. It feels like wasted effort.

Reframe it: restarting is recognizing when the current approach isn't working. It's a skill, not a failure.

Good developers restart. They recognize sunk costs. They don't throw good time after bad.

The habit:
1. Watch for the warning signs
2. Apply the three request rule
3. Use the "stop and assess" prompt when unsure
4. Restart decisively when needed
5. Include good context in the restart

Don't fight a conversation that's lost context. Start fresh. Move on.

## Tomorrow

You know when to restart. But even in a good conversation, AI can make big changes that break things. Tomorrow I'll show you how to use Git as your undo button. Small commits. Easy rollbacks. Never lose more than a few minutes of work.

---

## Try This Today

Next time you're in a long AI conversation and something goes wrong:

1. Count how many times you've tried to fix the same issue
2. Use the "stop and assess" prompt to check AI's understanding
3. If AI's summary is confused, restart with clear context
4. Track how long the restart conversation takes vs how long you spent fighting

You'll probably find that restarting is faster. Most people do. The hard part is admitting the current conversation is broken.

That admission is the skill. Practice it.
