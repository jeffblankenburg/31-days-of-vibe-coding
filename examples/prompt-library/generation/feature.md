# Feature Implementation

## When to Use
When building a new feature that spans multiple files or requires significant new code.

## Template

```
Build this feature.

## Context
Tech stack: {stack}
Relevant files: {files}

## The Feature
{description}

## Requirements
{requirements}

## Constraints
{constraints}

## Reference
Follow the patterns in {reference_file}

## Output
1. Implementation code
2. Tests
3. Any migrations needed

Do you have any questions before you start?
```

## Example

```
Build this feature.

## Context
Tech stack: Node.js, Express, PostgreSQL, Prisma
Relevant files: src/routes/cards.ts, src/services/cardService.ts

## The Feature
Users can add cards to a wishlist for later purchase.

## Requirements
- Add/remove cards from wishlist
- View all wishlisted cards
- Wishlist persists across sessions
- Maximum 100 cards per wishlist

## Constraints
- Use existing auth middleware
- Follow our API response format: { success, data, error }
- Add telemetry for all operations

## Reference
Follow the patterns in src/routes/collections.ts

## Output
1. Implementation code
2. Tests
3. Any migrations needed

Do you have any questions before you start?
```

## Variations
- For simple features: skip the Reference section
- For complex features: add an Architecture section
- For UI features: add mockup or design reference
