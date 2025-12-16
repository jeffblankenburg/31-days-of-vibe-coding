# SRE / Operability Review

## When to Use
When auditing code for operational readiness before shipping.

## Template

```
Act as an SRE reviewing this code for operational readiness.

Assume you'll need to debug this at 3am when something goes wrong.
You're tired, you didn't write this code, and you need to fix it fast.

## Code
{paste_code}

## Review For

1. Observability
   - Are important operations logged?
   - Are logs structured and searchable?
   - Do logs include enough context to debug?
   - Are metrics exposed for key operations?

2. Failure Modes
   - What can fail?
   - How does each failure manifest?
   - Are failures silent or visible?
   - Do errors include actionable information?

3. Debuggability
   - Can you trace a request through the system?
   - Can you reproduce issues from logs alone?

4. Recoverability
   - Can the system recover automatically?
   - What manual intervention might be needed?

## Output Format
For each gap found:
- The problem
- Why it matters when debugging
- How to fix it with code example
```

## Example

```
Act as an SRE reviewing this code for operational readiness.

Assume you'll need to debug this at 3am when something goes wrong.
You're tired, you didn't write this code, and you need to fix it fast.

## Code
async function processTrade(tradeId: string): Promise<void> {
  const trade = await db.trade.findUnique({
    where: { id: tradeId },
    include: { offeredCards: true, requestedCards: true }
  });

  if (!trade || trade.status !== 'accepted') {
    return;
  }

  for (const card of trade.offeredCards) {
    await db.card.update({
      where: { id: card.id },
      data: { ownerId: trade.toUserId }
    });
  }

  await db.trade.update({
    where: { id: tradeId },
    data: { status: 'completed' }
  });
}

## Review For

1. Observability
   - Are important operations logged?
   - Are logs structured and searchable?
   - Do logs include enough context to debug?
   - Are metrics exposed for key operations?

2. Failure Modes
   - What can fail?
   - How does each failure manifest?
   - Are failures silent or visible?
   - Do errors include actionable information?

3. Debuggability
   - Can you trace a request through the system?
   - Can you reproduce issues from logs alone?

4. Recoverability
   - Can the system recover automatically?
   - What manual intervention might be needed?

## Output Format
For each gap found:
- The problem
- Why it matters when debugging
- How to fix it with code example
```

## Variations
- For background jobs: add idempotency and retry considerations
- For user-facing code: add user impact assessment
- For data pipelines: add data integrity checks
