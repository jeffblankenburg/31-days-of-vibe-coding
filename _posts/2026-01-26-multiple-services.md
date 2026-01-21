---
layout: post
title: "Day 26: Working Across Multiple Services With AI"
date: 2026-01-26
author: Jeff Blankenburg
excerpt: "Features don't live in one file. They span frontend, backend, database, and more. Learn to coordinate AI work across your entire system."
---

The feature touched everything.

Frontend components. Backend API endpoints. Database schema. Redis caching. Third-party integrations. A simple "add to wishlist" feature required changes in six different places.

AI is great at generating code for one thing at a time. But real features aren't one thing. They're systems of things that need to work together. Types that need to match. Contracts that need to align. Changes that need to happen in the right order.

This is where vibe coding gets tricky. You're not just prompting for code. You're orchestrating changes across a system.

## The Multi-Service Planning Prompt

Start with the big picture:

```
I need to build this feature across multiple services.

Feature: [describe the feature]

Services involved:
- Frontend: [React/Vue/etc.]
- Backend: [Node/Python/etc.]
- Database: [PostgreSQL/MongoDB/etc.]
- Other: [caching, queues, third-party APIs]

Help me plan:
1. What changes in each service?
2. What's the dependency order? (What must exist before what?)
3. What contracts connect the services? (API shapes, types, events)
4. What's the migration/deployment order?
5. What could go wrong during the transition?
```

## The Contract-First Approach

Define the interfaces before the implementations:

```
Design the contracts for this feature.

Feature: [describe it]

Generate:
1. API endpoint contracts (request/response shapes)
2. Database schema changes
3. TypeScript interfaces for shared types
4. Event schemas if using event-driven architecture

These contracts will be the source of truth. Frontend and backend
will both use them.
```

Example output:

```typescript
// contracts/wishlist.ts

// API Contract
interface AddToWishlistRequest {
  cardId: string;
}

interface AddToWishlistResponse {
  success: boolean;
  wishlistItem: WishlistItem;
}

interface WishlistItem {
  id: string;
  cardId: string;
  userId: string;
  addedAt: string;
  card: CardSummary;
}

interface CardSummary {
  id: string;
  name: string;
  imageUrl: string;
}

// Database Schema
interface WishlistItemRow {
  id: string;
  user_id: string;
  card_id: string;
  added_at: Date;
}

// Event (if using events)
interface WishlistItemAddedEvent {
  type: 'wishlist.item.added';
  userId: string;
  cardId: string;
  timestamp: string;
}
```

Now every service implementation references these contracts.

## The Backend Implementation Prompt

With contracts defined:

```
Implement the backend for this feature.

Contract:
[paste the API contract]

Database schema:
[paste the schema]

Existing patterns:
[reference similar endpoints in your codebase]

Generate:
1. API endpoint implementation
2. Service layer logic
3. Database queries
4. Input validation
5. Error handling
6. Tests

Match our existing patterns from [reference file].
```

## The Frontend Implementation Prompt

Similarly for frontend:

```
Implement the frontend for this feature.

API Contract:
[paste the API contract]

UI Requirements:
[describe what the user sees and does]

Existing patterns:
[reference similar components]

Generate:
1. API client function
2. React component(s)
3. State management (if needed)
4. Loading and error states
5. Tests

Match our existing patterns from [reference file].
```

## The Database Migration Prompt

For schema changes:

```
Generate database migration for this feature.

Current schema: [describe or paste]
New schema: [paste the contract schema]

Consider:
- Can this run without downtime?
- What about existing data?
- Index requirements
- Rollback procedure
```

## Keeping Types in Sync

When types exist in multiple places:

```
I have the same type defined in multiple places. Help me keep them in sync.

Backend (TypeScript):
[paste backend type]

Frontend (TypeScript):
[paste frontend type]

Database (SQL):
[paste schema]

Check:
1. Are these consistent with each other?
2. What mismatches exist?
3. How should I keep them in sync long-term?

Suggest a single source of truth approach.
```

## The Integration Test Prompt

Testing across services:

```
Generate integration tests for this cross-service feature.

The flow:
1. Frontend sends request
2. Backend processes and updates database
3. Backend returns response
4. Frontend updates UI

Test scenarios:
- Happy path
- Backend error
- Database constraint violation
- Network timeout
- Partial failure (what's rolled back?)

Use our existing test setup from [reference file].
```

## The Dependency Order Prompt

When changes must happen in sequence:

```
I need to deploy changes to multiple services. Help me order them.

Changes:
- Database: [describe]
- Backend: [describe]
- Frontend: [describe]
- Other: [describe]

Constraints:
- [any constraints, like "frontend can't deploy before backend"]

Questions:
1. What order should these deploy?
2. Can any deploy in parallel?
3. What breaks if I deploy out of order?
4. Can I deploy incrementally (one service at a time working)?
```

## The Backward Compatibility Prompt

When you can't deploy everything at once:

```
I need to change this API but can't break existing clients.

Current API:
[paste current endpoint/contract]

New API:
[paste desired endpoint/contract]

How do I:
1. Support both old and new during transition
2. Know when it's safe to remove old support
3. Avoid duplicating logic
4. Handle mixed old/new client traffic

Generate the backward-compatible implementation.
```

## Coordinating Prompts Across Files

When one prompt needs to inform another:

```
I'm generating related code for multiple files. Here's the context:

Already generated:
- API endpoint: [paste or summarize]
- Database schema: [paste or summarize]

Now generate:
- Frontend component that uses this API
- Follow the contracts defined above
- Import types from @/types/wishlist

The code should work with the previously generated code.
```

## The System Context Document

For complex features, create a context document:

```markdown
# Feature: Wishlist

## Overview
Users can save cards to a wishlist for later.

## Services Affected
- Frontend: New WishlistButton component, WishlistPage
- Backend: New /api/wishlist endpoints
- Database: New wishlist_items table
- Cache: Wishlist counts cached in Redis

## Contracts
[paste contracts]

## Implementation Status
- [ ] Database migration
- [ ] Backend endpoints
- [ ] Backend tests
- [ ] Frontend components
- [ ] Frontend tests
- [ ] Integration tests
- [ ] Documentation

## Open Questions
- [any unresolved decisions]
```

Reference this document in every prompt for consistent context.

## The Cross-Service Debug Prompt

When something isn't working across services:

```
Cross-service bug. Help me trace it.

Expected flow:
[describe what should happen]

Actual behavior:
[describe what's happening]

I have logs from:
- Frontend: [paste relevant logs]
- Backend: [paste relevant logs]
- Database: [paste relevant queries/logs]

Where in the flow is it breaking?
What's the mismatch between services?
```

## The Feature Flag Prompt

For gradual cross-service rollout:

```
I want to roll out this cross-service feature gradually.

Feature: [describe]
Services: [list services]

Help me design:
1. Feature flag implementation in each service
2. How to keep flag state synchronized
3. Rollout stages (1%, 10%, 50%, 100%)
4. What to monitor at each stage
5. How to roll back if issues arise
```

## Tomorrow

You've been writing a lot of prompts. Some work great. Some don't. Tomorrow I'll show you how to build a prompt library: capturing what works, organizing by task type, and never having to write the same prompt twice.

---

## Try This Today

1. Think of a feature that spans multiple services
2. Write out the contracts first (API shapes, types, schemas)
3. Use those contracts in prompts for each service

Starting with contracts forces you to think about the interfaces between services before you think about implementations. AI can help you maintain consistency across services, but only if you give it a consistent source of truth.
