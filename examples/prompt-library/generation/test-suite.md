# Test Suite Generation

## When to Use
When generating comprehensive tests for existing code.

## Template

```
Generate comprehensive tests for this code.

## Code
{paste_code}

## Test Framework
{framework}

## Coverage Goals
- Happy path scenarios
- Edge cases: {specific_edge_cases}
- Error cases: {specific_error_cases}
- Security cases (if applicable)

## Test Patterns
Follow the patterns in {reference_test_file}

## Requirements
- Each test should have a clear, descriptive name
- Use arrange/act/assert structure
- Mock external dependencies
- Tests should be independent (no shared state)
```

## Example

```
Generate comprehensive tests for this code.

## Code
async function addToWishlist(userId: string, cardId: string): Promise<WishlistItem> {
  const existing = await db.wishlistItem.findFirst({
    where: { userId, cardId }
  });

  if (existing) {
    throw new ConflictError('Card already in wishlist');
  }

  const count = await db.wishlistItem.count({ where: { userId } });
  if (count >= 100) {
    throw new LimitError('Wishlist limit reached');
  }

  return db.wishlistItem.create({
    data: { userId, cardId }
  });
}

## Test Framework
Jest with TypeScript

## Coverage Goals
- Happy path scenarios
- Edge cases: empty wishlist, wishlist with 99 items, wishlist with 100 items
- Error cases: card already wishlisted, invalid cardId, invalid userId
- Security cases: user trying to add to another user's wishlist

## Test Patterns
Follow the patterns in src/services/__tests__/cardService.test.ts

## Requirements
- Each test should have a clear, descriptive name
- Use arrange/act/assert structure
- Mock external dependencies
- Tests should be independent (no shared state)
```

## Variations
- For integration tests: specify which dependencies to mock vs use real
- For E2E tests: add user flow description
- For performance tests: add timing requirements
