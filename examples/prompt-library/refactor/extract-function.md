# Extract Function

## When to Use
When a function does too much and needs to be broken into smaller pieces.

## Template

```
This function does too many things. Help me break it apart.

## Function
{paste_long_function}

## Goal
Extract distinct responsibilities into separate functions.

## Requirements
- Each extracted function should do one thing
- Each extracted function should have a clear, descriptive name
- The original function becomes an orchestrator
- Tests must still pass (no behavior changes)
- Each extracted function should be testable independently

## Output
1. Identify the distinct responsibilities
2. Show each extracted function
3. Show the refactored original function
```

## Example

```
This function does too many things. Help me break it apart.

## Function
async function handleTradeAccept(tradeId: string, userId: string) {
  const trade = await db.trade.findUnique({
    where: { id: tradeId },
    include: { offeredCards: true, requestedCards: true }
  });

  if (!trade) throw new Error('Trade not found');
  if (trade.toUserId !== userId) throw new Error('Not authorized');
  if (trade.status !== 'pending') throw new Error('Trade not pending');

  for (const card of trade.offeredCards) {
    await db.card.update({
      where: { id: card.id },
      data: { ownerId: trade.toUserId }
    });
  }

  for (const card of trade.requestedCards) {
    await db.card.update({
      where: { id: card.id },
      data: { ownerId: trade.fromUserId }
    });
  }

  await db.trade.update({
    where: { id: tradeId },
    data: { status: 'completed', completedAt: new Date() }
  });

  await sendNotification(trade.fromUserId, 'Your trade was accepted');

  return trade;
}

## Goal
Extract distinct responsibilities into separate functions.

## Requirements
- Each extracted function should do one thing
- Each extracted function should have a clear, descriptive name
- The original function becomes an orchestrator
- Tests must still pass (no behavior changes)
- Each extracted function should be testable independently

## Output
1. Identify the distinct responsibilities
2. Show each extracted function
3. Show the refactored original function
```

## Variations
- For deeply nested code: focus on reducing nesting first
- For code with side effects: be careful about extraction order
- For performance-critical code: consider if extraction adds overhead
