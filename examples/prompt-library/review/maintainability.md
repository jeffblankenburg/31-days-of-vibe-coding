# Maintainability Review

## When to Use
When reviewing code for long-term maintainability.

## Template

```
Review this code for maintainability.

Imagine a developer who's never seen this code needs to modify it in 6 months.

## Code
{paste_code}

## Check For

1. Code Clarity
   - Is the intent obvious?
   - Would a new developer understand this?

2. Naming
   - Are functions and variables named descriptively?
   - Do names match what the code does?

3. Structure
   - Is the code organized logically?
   - Are functions focused on one thing?

4. Duplication
   - Is code repeated that should be abstracted?

5. Complexity
   - Are functions too long?
   - Is nesting too deep?
   - Are there too many conditionals?

6. Documentation
   - Are complex parts explained?
   - Are non-obvious decisions documented?

## Output Format
For each issue:
- Severity (High/Medium/Low)
- Location
- The problem
- Why it hurts maintainability
- Suggested improvement

Focus on real issues, not style preferences.
```

## Example

```
Review this code for maintainability.

Imagine a developer who's never seen this code needs to modify it in 6 months.

## Code
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
    return { success: true, trade };
  } else if (action === 'reject') {
    // ... more code
  }
}

## Check For

1. Code Clarity
   - Is the intent obvious?
   - Would a new developer understand this?

2. Naming
   - Are functions and variables named descriptively?
   - Do names match what the code does?

3. Structure
   - Is the code organized logically?
   - Are functions focused on one thing?

4. Duplication
   - Is code repeated that should be abstracted?

5. Complexity
   - Are functions too long?
   - Is nesting too deep?
   - Are there too many conditionals?

6. Documentation
   - Are complex parts explained?
   - Are non-obvious decisions documented?

## Output Format
For each issue:
- Severity (High/Medium/Low)
- Location
- The problem
- Why it hurts maintainability
- Suggested improvement

Focus on real issues, not style preferences.
```

## Variations
- For legacy code: focus on incremental improvements
- For new code: be stricter about patterns
- For shared code: emphasize documentation
