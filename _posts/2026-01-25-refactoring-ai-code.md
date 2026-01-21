---
layout: post
title: "Day 25: Refactoring AI Code: From Working to Maintainable"
date: 2026-01-25
author: Jeff Blankenburg
excerpt: "AI writes code that works. Working isn't the same as maintainable. Learn to systematically refactor AI code into something your future self will thank you for."
---

The feature worked perfectly. The code was a mess.

AI had generated 400 lines in a single file. Functions that did three things. Variables named `data`, `result`, `temp`. No comments explaining the non-obvious parts. It worked, but I dreaded having to modify it later.

This is the AI code paradox. The faster you ship, the more you accumulate code that's hard to maintain. AI optimizes for "make it work," not "make it understandable."

But here's the thing: AI is also good at refactoring. The same tool that created the mess can help clean it up. You just have to ask.

## The Code Smell Detection Prompt

Start by identifying problems:

```
Analyze this code for maintainability issues.

Look for:
1. Functions doing too many things
2. Poor naming (unclear variables, generic names)
3. Code duplication
4. Deep nesting
5. Long functions (over 30 lines)
6. Missing error handling
7. Implicit behavior that should be explicit
8. Tight coupling between components
9. Missing abstractions
10. Inconsistent patterns

For each issue:
- Location (function/line)
- The problem
- Why it matters
- Suggested fix

Code:
[paste code]
```

## The Incremental Refactoring Prompt

Don't refactor everything at once. Go step by step:

```
Help me refactor this code incrementally.

Current code:
[paste code]

Goal: Make this more maintainable without changing behavior.

Step 1: What's the single most impactful refactoring?
- What to change
- Why it helps
- The refactored code

After each step, I'll verify tests still pass before the next step.
```

## The Function Extraction Prompt

When functions do too much:

```
This function does too many things. Help me break it apart.

Function:
[paste the long function]

For this refactoring:
1. Identify distinct responsibilities
2. Extract each into a separate function
3. Name each function clearly
4. Keep the original function as an orchestrator

Constraints:
- Tests must still pass
- No behavior changes
- Each extracted function should be testable independently
```

## A Real Refactoring Session

Here's code AI generated for handling a card trade:

```typescript
async function handleTrade(tradeId: string, action: string, userId: string) {
  const trade = await db.trade.findUnique({ where: { id: tradeId }, include: { offeredCards: true, requestedCards: true, fromUser: true, toUser: true } });

  if (!trade) throw new Error('Trade not found');

  if (action === 'accept') {
    if (trade.toUserId !== userId) throw new Error('Not authorized');
    if (trade.status !== 'pending') throw new Error('Trade not pending');

    for (const card of trade.offeredCards) {
      await db.card.update({ where: { id: card.id }, data: { ownerId: trade.toUserId } });
    }
    for (const card of trade.requestedCards) {
      await db.card.update({ where: { id: card.id }, data: { ownerId: trade.fromUserId } });
    }

    await db.trade.update({ where: { id: tradeId }, data: { status: 'completed', completedAt: new Date() } });

    await db.notification.create({ data: { userId: trade.fromUserId, type: 'trade_accepted', message: `Your trade was accepted by ${trade.toUser.username}` } });

    return { success: true, trade };
  } else if (action === 'reject') {
    if (trade.toUserId !== userId) throw new Error('Not authorized');
    if (trade.status !== 'pending') throw new Error('Trade not pending');

    await db.trade.update({ where: { id: tradeId }, data: { status: 'rejected' } });

    await db.notification.create({ data: { userId: trade.fromUserId, type: 'trade_rejected', message: `Your trade was rejected by ${trade.toUser.username}` } });

    return { success: true, trade };
  } else if (action === 'cancel') {
    if (trade.fromUserId !== userId) throw new Error('Not authorized');
    if (trade.status !== 'pending') throw new Error('Trade not pending');

    await db.trade.update({ where: { id: tradeId }, data: { status: 'cancelled' } });

    await db.notification.create({ data: { userId: trade.toUserId, type: 'trade_cancelled', message: `Trade was cancelled by ${trade.fromUser.username}` } });

    return { success: true, trade };
  }

  throw new Error('Invalid action');
}
```

After refactoring:

```typescript
async function handleTrade(
  tradeId: string,
  action: TradeAction,
  userId: string
): Promise<TradeResult> {
  const trade = await findTradeWithDetails(tradeId);
  validateTradeAction(trade, action, userId);

  switch (action) {
    case 'accept':
      return acceptTrade(trade);
    case 'reject':
      return rejectTrade(trade);
    case 'cancel':
      return cancelTrade(trade);
  }
}

async function findTradeWithDetails(tradeId: string): Promise<TradeWithDetails> {
  const trade = await db.trade.findUnique({
    where: { id: tradeId },
    include: {
      offeredCards: true,
      requestedCards: true,
      fromUser: true,
      toUser: true
    }
  });

  if (!trade) {
    throw new NotFoundError('Trade not found');
  }

  return trade;
}

function validateTradeAction(
  trade: TradeWithDetails,
  action: TradeAction,
  userId: string
): void {
  if (trade.status !== 'pending') {
    throw new InvalidStateError('Trade is not pending');
  }

  const authorizedUser = action === 'cancel' ? trade.fromUserId : trade.toUserId;
  if (authorizedUser !== userId) {
    throw new ForbiddenError('Not authorized for this action');
  }
}

async function acceptTrade(trade: TradeWithDetails): Promise<TradeResult> {
  await transferCards(trade.offeredCards, trade.toUserId);
  await transferCards(trade.requestedCards, trade.fromUserId);

  const updated = await updateTradeStatus(trade.id, 'completed');

  await notifyUser(
    trade.fromUserId,
    'trade_accepted',
    `Your trade was accepted by ${trade.toUser.username}`
  );

  return { success: true, trade: updated };
}

async function transferCards(cards: Card[], newOwnerId: string): Promise<void> {
  await db.card.updateMany({
    where: { id: { in: cards.map(c => c.id) } },
    data: { ownerId: newOwnerId }
  });
}

// ... similar for rejectTrade and cancelTrade
```

The refactored version is longer but:
- Each function has one job
- Functions are testable independently
- Error types are specific
- The flow is easy to follow
- Changes are isolated

## The Naming Improvement Prompt

When names are unclear:

```
Improve the naming in this code.

Code:
[paste code]

For each rename:
1. Current name
2. Suggested name
3. Why it's better

Naming rules to follow:
- Functions should be verbs (getUser, validateInput)
- Booleans should be questions (isValid, hasPermission)
- Collections should be plural (users, items)
- Avoid generic names (data, result, temp, info)
- Abbreviations should be obvious (id, url) or spelled out
```

## The Duplication Elimination Prompt

When you see patterns repeated:

```
Find and eliminate duplication in this code.

Code:
[paste code]

For each duplication:
1. Where it appears
2. A shared abstraction
3. The refactored code

Don't over-abstract. Only extract if:
- The pattern appears 3+ times
- The extracted function has a clear name
- Future changes would need to happen in all places
```

## The Complexity Reduction Prompt

When code is too nested:

```
Reduce the complexity of this code.

Code:
[paste code]

Techniques to apply:
- Early returns instead of deep nesting
- Guard clauses at function start
- Extract conditions into named booleans
- Replace conditionals with polymorphism where appropriate

Show the refactored code with complexity reduced.
```

## The Consistency Prompt

When patterns are inconsistent:

```
Make this code consistent with our patterns.

Our patterns:
[describe your patterns or reference a file]

Code to update:
[paste code]

Check for:
- Error handling pattern consistency
- Naming convention consistency
- Structure consistency
- Response format consistency

Show the code updated to match our patterns.
```

## The Comments and Documentation Prompt

When code needs explanation:

```
Add appropriate documentation to this code.

Code:
[paste code]

Add:
1. Function documentation (what it does, parameters, returns)
2. Comments for non-obvious logic (why, not what)
3. TODO comments for known issues
4. Type documentation where types are complex

Don't add:
- Comments that just repeat the code
- Comments for obvious things
- Excessive inline comments
```

## Refactoring With Tests As Safety Net

Always have tests before refactoring:

```
I want to refactor this code. First, what tests should exist?

Code:
[paste code]

Generate tests that verify:
1. Happy path behavior
2. Error cases
3. Edge cases

These tests should pass before AND after refactoring.
Then show me the refactoring.
```

## The Boy Scout Rule

Leave code better than you found it:

```
I'm working on this file. What small improvements can I make while I'm here?

File:
[paste code]

Current task: [what you're actually trying to do]

Suggest 2-3 small improvements that:
- Won't take more than 5 minutes each
- Don't change behavior
- Make future work easier
- Are in the same area I'm already touching
```

## When NOT to Refactor

Refactoring isn't always worth it:

- **Code that's about to be deleted**: Don't polish what's leaving
- **Code that never changes**: If it works and you never touch it, leave it
- **During an incident**: Fix first, refactor later
- **Without tests**: Refactoring without tests is gambling

Ask AI:

```
Should I refactor this code, or leave it alone?

Code:
[paste code]

Consider:
- How often is this code modified?
- What's the cost of a bug here?
- Are there tests?
- Is this blocking other work?

Recommend: refactor now, refactor later, or leave alone.
```

## Tomorrow

Refactoring one service is straightforward. But what about features that span multiple services? Frontend, backend, database, external APIs. Tomorrow I'll show you how to coordinate AI work across multiple services.

---

## Try This Today

1. Find a piece of AI-generated code you've been avoiding
2. Run the code smell detection prompt
3. Pick one smell and fix it

You don't have to fix everything. Start with the worst part. Make it a little better. Repeat next time you're in the file.

Code quality is incremental. Perfect is the enemy of better.
