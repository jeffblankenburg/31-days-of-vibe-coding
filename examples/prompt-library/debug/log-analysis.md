# Log Analysis

## When to Use
When you have logs but can't see the pattern or find the problem.

## Template

```
Analyze these logs to find the problem.

## The Issue
{describe_what_went_wrong}

## Logs from Successful Operation
{paste_success_logs}

## Logs from Failed Operation
{paste_failure_logs}

## Find
1. What's different between success and failure?
2. What's missing in the failure case?
3. What sequence of events leads to failure?
4. Any timing patterns?
```

## Example

```
Analyze these logs to find the problem.

## The Issue
Card trade sometimes fails silently. API returns success but cards don't transfer.

## Logs from Successful Operation
2024-01-15T10:23:45.123Z INFO  trade.started tradeId=abc123 fromUser=user1 toUser=user2
2024-01-15T10:23:45.156Z INFO  trade.validated tradeId=abc123 cardCount=3
2024-01-15T10:23:45.234Z INFO  card.transferred cardId=card1 newOwner=user2
2024-01-15T10:23:45.267Z INFO  card.transferred cardId=card2 newOwner=user2
2024-01-15T10:23:45.301Z INFO  card.transferred cardId=card3 newOwner=user2
2024-01-15T10:23:45.345Z INFO  trade.completed tradeId=abc123 duration=222ms

## Logs from Failed Operation
2024-01-15T10:25:12.456Z INFO  trade.started tradeId=def456 fromUser=user3 toUser=user4
2024-01-15T10:25:12.478Z INFO  trade.validated tradeId=def456 cardCount=2
2024-01-15T10:25:12.534Z INFO  card.transferred cardId=card4 newOwner=user4
2024-01-15T10:25:12.612Z INFO  trade.completed tradeId=def456 duration=156ms

## Find
1. What's different between success and failure?
2. What's missing in the failure case?
3. What sequence of events leads to failure?
4. Any timing patterns?
```

## Variations
- For distributed systems: include logs from multiple services
- For performance issues: focus on timing information
- For intermittent issues: include multiple success/failure examples
