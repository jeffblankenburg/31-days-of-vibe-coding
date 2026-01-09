---
layout: post
title: "Day 18: AI as Test Generator"
date: 2026-01-18
author: Jeff Blankenburg
excerpt: "AI writes features fast. Testing them manually is slow. Learn to use AI to generate comprehensive test suites that catch bugs before production."
---

I used to skip tests.

Not intentionally. But when AI generates a feature in 10 minutes, spending an hour writing tests feels backwards. The feature works. I tested it manually. Ship it.

Then the bugs started. Edge cases I didn't think to test. Regressions when I changed something else. The "it worked on my machine" problems that only appeared in production.

Now AI writes my tests too. The same tool that generates the feature generates the tests that verify it. Often AI thinks of edge cases I wouldn't have considered. Empty arrays. Null values. Unicode characters. Concurrent access.

The trick is knowing how to ask.

## Why AI-Generated Tests Are Different

When you write tests manually, you test what you thought about. When AI writes tests, it tests what the code does. These aren't the same thing.

You might forget to test the empty array case. AI sees the code handles arrays and generates tests for empty, one element, many elements.

You might not think about Unicode. AI sees string handling and tests with emoji, special characters, different alphabets.

The limitation: AI also doesn't know your business logic. It tests what the code does, not what the code should do. You need to guide it.

## The Basic Test Generation Prompt

Here's the prompt that generates useful tests:

```
Generate comprehensive tests for this code.

Include:
1. Happy path - normal expected usage
2. Edge cases - boundaries, empty inputs, maximum values
3. Error cases - invalid inputs, missing data, failures
4. Security cases - malicious inputs, injection attempts

For each test:
- Clear name describing what's being tested
- Arrange: Set up the test data
- Act: Call the function/endpoint
- Assert: Verify the result

Use [Jest/Vitest/your framework] with TypeScript.
Match the testing patterns in our codebase.

Code to test:
[paste code]
```

## A Real Example

Here's a function AI generated:

```typescript
async function transferCard(
  cardId: string,
  fromUserId: string,
  toUserId: string
): Promise<Card> {
  const card = await db.card.findUnique({
    where: { id: cardId }
  });

  if (!card) {
    throw new NotFoundError('Card not found');
  }

  if (card.ownerId !== fromUserId) {
    throw new ForbiddenError('Not your card');
  }

  const recipient = await db.user.findUnique({
    where: { id: toUserId }
  });

  if (!recipient) {
    throw new NotFoundError('Recipient not found');
  }

  return db.card.update({
    where: { id: cardId },
    data: { ownerId: toUserId }
  });
}
```

Here's what AI generated for tests:

```typescript
describe('transferCard', () => {
  // Happy path
  describe('successful transfer', () => {
    it('transfers card to new owner', async () => {
      const card = await createTestCard({ ownerId: 'user-1' });
      await createTestUser({ id: 'user-2' });

      const result = await transferCard(card.id, 'user-1', 'user-2');

      expect(result.ownerId).toBe('user-2');
    });

    it('returns the updated card', async () => {
      const card = await createTestCard({ ownerId: 'user-1' });
      await createTestUser({ id: 'user-2' });

      const result = await transferCard(card.id, 'user-1', 'user-2');

      expect(result.id).toBe(card.id);
      expect(result.name).toBe(card.name);
    });
  });

  // Error cases
  describe('card not found', () => {
    it('throws NotFoundError for non-existent card', async () => {
      await createTestUser({ id: 'user-1' });
      await createTestUser({ id: 'user-2' });

      await expect(
        transferCard('non-existent-id', 'user-1', 'user-2')
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('authorization', () => {
    it('throws ForbiddenError when user does not own card', async () => {
      const card = await createTestCard({ ownerId: 'user-1' });
      await createTestUser({ id: 'user-2' });
      await createTestUser({ id: 'user-3' });

      await expect(
        transferCard(card.id, 'user-2', 'user-3')
      ).rejects.toThrow(ForbiddenError);
    });
  });

  describe('recipient not found', () => {
    it('throws NotFoundError for non-existent recipient', async () => {
      const card = await createTestCard({ ownerId: 'user-1' });

      await expect(
        transferCard(card.id, 'user-1', 'non-existent-user')
      ).rejects.toThrow(NotFoundError);
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('handles transfer to self', async () => {
      const card = await createTestCard({ ownerId: 'user-1' });

      const result = await transferCard(card.id, 'user-1', 'user-1');

      expect(result.ownerId).toBe('user-1');
    });

    it('handles cards with special characters in id', async () => {
      const card = await createTestCard({
        id: 'card-with-special-chars-!@#',
        ownerId: 'user-1'
      });
      await createTestUser({ id: 'user-2' });

      const result = await transferCard(card.id, 'user-1', 'user-2');

      expect(result.ownerId).toBe('user-2');
    });
  });

  // Security cases
  describe('security', () => {
    it('prevents SQL injection in cardId', async () => {
      await createTestUser({ id: 'user-1' });
      await createTestUser({ id: 'user-2' });

      await expect(
        transferCard("'; DROP TABLE cards; --", 'user-1', 'user-2')
      ).rejects.toThrow(NotFoundError);
    });

    it('validates user IDs are not empty', async () => {
      const card = await createTestCard({ ownerId: 'user-1' });

      await expect(
        transferCard(card.id, '', 'user-2')
      ).rejects.toThrow();
    });
  });
});
```

Notice what AI caught: transfer to self, special characters, SQL injection attempts, empty strings. These are edge cases I might not have written manually.

## The Edge Case Prompt

When you want AI to dig deeper on edge cases:

```
For this function, generate edge case tests.

Consider:
- Empty values (null, undefined, '', [], {})
- Boundary values (0, -1, MAX_INT, empty string, very long string)
- Type coercion (string '0' vs number 0)
- Unicode and special characters
- Concurrent access (what if called twice simultaneously?)
- Time-sensitive cases (dates, timeouts, race conditions)
- Resource limits (very large inputs, many iterations)

For each edge case, explain:
1. What condition you're testing
2. Why it might fail
3. The expected behavior

Function:
[paste code]
```

## Integration Test Generation

Unit tests verify functions. Integration tests verify flows:

```
Generate integration tests for this feature.

The feature: [describe the user flow]

Test the complete flow:
1. Set up: Create necessary data in the database
2. Execute: Call the API endpoints in sequence
3. Verify: Check database state and responses

Include:
- Happy path through the entire flow
- What happens when step 2 fails
- What happens when step 3 fails
- Cleanup between tests

Mock external services, but use real database.

Code:
[paste relevant files]
```

## API Endpoint Tests

For REST APIs, be specific about what to test:

```
Generate tests for this API endpoint.

Test:
1. Successful response (status code, body shape, data)
2. Authentication (missing token, invalid token, expired token)
3. Authorization (user accessing another user's data)
4. Validation (missing fields, invalid types, out of range)
5. Error responses (proper status codes, error messages)
6. Headers (content-type, CORS, cache-control)

For validation tests, test each field:
- Missing
- Wrong type
- Empty
- Too short/long
- Invalid format

Endpoint:
[paste code]
```

## The Test Pyramid Prompt

Different levels of testing catch different problems:

```
Create a test plan following the test pyramid:

Unit tests (70%):
- Individual functions in isolation
- Mock all dependencies
- Fast, many of them

Integration tests (20%):
- Multiple components together
- Real database, mocked external services
- Slower, fewer of them

E2E tests (10%):
- Complete user flows
- Real everything
- Slowest, fewest of them

For this feature:
[describe feature]

What should we test at each level?
Generate example tests for each level.
```

## When AI Tests Go Wrong

AI-generated tests have failure modes:

**Testing implementation, not behavior:**
```typescript
// Bad: tests that the function calls the database
expect(db.card.findUnique).toHaveBeenCalledWith({ where: { id: '123' } });

// Good: tests that the function returns the right data
expect(result.id).toBe('123');
```

**Tautological tests:**
```typescript
// Bad: test that always passes
it('returns what the function returns', async () => {
  const result = await getCard('123');
  expect(result).toBe(result);
});
```

**Missing assertions:**
```typescript
// Bad: no assertion, test passes even if broken
it('should get card', async () => {
  const result = await getCard('123');
  // no expect!
});
```

Tell AI to avoid these:

```
Generate tests that:
- Test behavior, not implementation details
- Have meaningful assertions (not just "toBeDefined")
- Verify the actual result, not just that something was called
- Would fail if the code was broken
```

## Coverage-Focused Generation

When you need to hit coverage targets:

```
I need 90% test coverage for this file.

Current coverage: [paste coverage report if you have it]

Generate tests that cover:
- All branches (if/else, switch cases, ternary)
- All error paths (catch blocks, throw statements)
- All function parameters used
- All return statements

For each test, comment which lines it covers.

File:
[paste code]
```

## Testing AI Code vs Manual Code

AI code often needs more tests than code you write yourself. Why?

You understand the code you write. You know the edge cases because you thought through them while writing. AI code is a black box. You need tests to understand what it actually does.

My rule: if AI wrote it, it needs twice the test coverage I'd write for my own code.

## Test Maintenance

AI generates tests, but you maintain them. Make them maintainable:

```
Generate tests that are:
- Self-documenting (clear names, obvious purpose)
- Independent (can run in any order)
- Repeatable (same result every time)
- Using test factories for data creation
- Following our existing test patterns

Avoid:
- Shared mutable state between tests
- Sleep/setTimeout for async (use proper async patterns)
- Hardcoded dates (use relative or mocked dates)
- Tests that depend on external services

Existing test pattern example:
[paste an existing test file]
```

## Tomorrow

You've generated tests. But who reviews the code? Manual code review is slow. AI can do multiple review passes faster than you can do one.

Tomorrow I'll show you how to use AI as a code reviewer. Multiple passes, different focuses, comprehensive feedback.

---

## Try This Today

1. Take a function AI generated recently
2. Ask AI to generate tests for it
3. Run the tests
4. See if any fail

Failing tests from AI-generated test suites often reveal bugs in AI-generated code. The same tool that created the bug might write the test that catches it.

That's not irony. That's leverage.
