---
layout: post
title: "Day 11: Teaching AI Your Patterns With Examples"
date: 2026-01-11
author: Jeff Blankenburg
excerpt: "AI writes generic code. You want your code. Show AI an example of what good looks like in your codebase, and watch it match your patterns exactly."
---

Back on Day 3, I showed you how to create a design system reference so AI generates UI that matches your application. The idea was simple: instead of describing what you want, show AI an example of what good looks like.

That concept doesn't just apply to UI.

Every developer has patterns. The way you structure services. How you handle errors. Where you put validation logic. Your naming conventions. The shape of your test files. These patterns accumulate over years of writing code, debugging production issues, and learning what works for you.

AI doesn't know your patterns. It knows patterns from the internet. From Stack Overflow answers. From GitHub repositories. From training data that represents how millions of developers write code.

That's the problem. Without guidance, your AI agent will do what it thinks is right in the moment. It'll generate perfectly reasonable code that looks nothing like the rest of your codebase.

## Generic Code vs Your Code

Ask AI to build a service without any context, and you'll get something like this:

```typescript
export class UserService {
  async getUser(id: string) {
    try {
      const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return user;
    } catch (error) {
      console.log('Error fetching user:', error);
      throw error;
    }
  }
}
```

This code works. It's also generic. Maybe you use dependency injection. Maybe you separate database operations into private methods. Maybe you have specific error handling that logs to your telemetry system instead of console.log. Maybe you validate inputs before querying.

AI doesn't know any of that unless you tell it.

You could describe your patterns in words:

```
Build a user service.
Use dependency injection for the database and logger.
Separate database operations into private methods.
Use our standard error handling pattern with telemetry.
Validate inputs before operations.
```

This is better than nothing. But "standard error handling pattern with telemetry" means different things to different developers. There's interpretation. Room for AI to guess wrong.

Here's what works better: show it an existing service and say "match this."

## The Reference Pattern

Find a file in your codebase that represents your patterns well. Not average code. Your cleanest, most pattern-compliant code. The file you'd point a new team member to and say "do it like this."

Then reference it explicitly:

```
Build a NotificationService.

Reference: server/services/UserService.ts

Match:
- Constructor pattern (dependency injection)
- Method structure (public methods call private helpers)
- Error handling (try/catch with telemetry logging)
- Return types (explicit Promise<T> with custom types)
- Input validation approach
```

Point to specific patterns if the file is long. AI can read the whole file but benefits from knowing what matters.

## What Patterns Are Worth Teaching?

Not everything needs a reference example. Save this technique for patterns that:

**Repeat across your codebase.** If you have 20 services that all follow the same structure, showing AI one example pays off on the other 19.

**Are easy to get wrong.** Error handling, logging, validation. The stuff that's boring to write but critical to get right.

**Define your codebase's character.** The patterns that make your code feel like your code. When someone opens a file, they should know immediately they're in your codebase.

**AI consistently misses.** If you've described something twice and AI still gets it wrong, stop describing. Start showing.

## Different Types of References

### Service Structure

```
Create OrderService following server/services/UserService.ts.

Same patterns:
- Constructor takes db and logger
- Public methods for business operations
- Private methods for database queries
- Error handling with telemetry

Different content:
- Operations: createOrder, getOrder, cancelOrder
- Tables: orders, order_items
```

### Route Patterns

```
Add routes for orders at server/routes/orders.ts.

Reference: server/routes/users.ts

Copy:
- Router setup pattern
- Middleware chain (auth, validation)
- Error response format
- Request typing approach

New content:
- POST /orders (create order)
- GET /orders/:id (get order details)
- DELETE /orders/:id (cancel order)
```

### Test Structure

```
Write tests for OrderService in server/services/OrderService.test.ts.

Reference: server/services/UserService.test.ts

Copy exactly:
- Test file structure (describe blocks)
- Mock setup pattern
- beforeEach/afterEach usage
- Assertion style

Test these scenarios:
- Create order with valid items
- Create order with empty cart (should fail)
- Get order by ID
- Cancel order
- Cancel already-cancelled order (should fail)
```

### Component Patterns

```
Build an OrderSummary component in client/components/OrderSummary.tsx.

Reference: client/components/UserProfile.tsx

Match:
- Props interface at top
- Styled-components pattern
- Loading state handling
- Error boundary pattern

Content:
- Display order details
- Show line items with prices
- Total calculation
- Status indicator
```

## Making Your Best Code Easy to Reference

Some files become your go-to references. Make them good:

**Keep them clean.** Your reference files are templates. They should be well-structured and exemplary.

**Keep them current.** When patterns evolve, update reference files first. They're the source of truth.

**Keep them discoverable.** Mention them in CLAUDE.md:

```markdown
## Reference Files

When building new code, reference these files for patterns:

- Services: server/services/UserService.ts
- Routes: server/routes/users.ts
- Components: client/components/UserProfile.tsx
- Tests: server/services/UserService.test.ts
```

Now AI knows where to look without you specifying each time.

## The Pattern Library Approach

Some teams create explicit pattern files that aren't part of the running application. Just templates:

```
patterns/
  service-pattern.ts       # Template service
  route-pattern.ts         # Template route
  component-pattern.tsx    # Template component
  test-pattern.test.ts     # Template test
```

These files include comments explaining the pattern:

```typescript
// patterns/service-pattern.ts

import { Database } from '../db';
import { TelemetryService } from './telemetryService';

// PATTERN: Services take dependencies via constructor
export class ExampleService {
  constructor(
    private db: Database,
    private telemetry: TelemetryService
  ) {}

  // PATTERN: Public methods are business operations
  async publicMethod(input: InputType): Promise<OutputType> {
    try {
      // PATTERN: Validate at entry point
      this.validateInput(input);

      // PATTERN: Call private helpers for DB operations
      const result = await this._fetchFromDatabase(input);

      return result;
    } catch (error) {
      // PATTERN: Always log with context
      this.telemetry.logError('publicMethod failed', error, { input });
      throw error;
    }
  }

  // PATTERN: Private methods prefixed with underscore
  private async _fetchFromDatabase(input: InputType): Promise<Data> {
    // Database operation here
  }

  // PATTERN: Validation in separate private method
  private validateInput(input: InputType): void {
    // Validation logic
  }
}
```

Reference these in prompts:

```
Build PaymentService following patterns/service-pattern.ts.
```

## When AI Misses the Pattern

Sometimes AI reads the example but still misses something. Be specific about the mismatch:

```
The OrderService you generated doesn't match UserService.

In UserService:
- All database calls are in private methods (lines 45-80)
- Public methods only contain business logic

In your OrderService:
- createOrder has inline database calls

Refactor to match the UserService pattern exactly.
```

Point to the specific mismatch. AI can fix targeted issues better than vague "make it match."

## Why Examples Beat Descriptions

When you describe a pattern in words, there's interpretation. "Use dependency injection" could mean constructor injection, property injection, or a service locator. "Handle errors properly" means different things to every developer.

When you show an example, there's no interpretation. The code is the spec. AI sees exactly what you mean.

This is the same principle from Day 3 with the design system. AI is better at reading code than reading prose. Code shows. Documentation describes. Showing wins.

## Tomorrow

Your AI knows your standards (Day 10) and your patterns (today). But what about the mistakes it keeps making? The same wrong assumptions. The same bad habits.

Tomorrow I'll show you how to build a "common mistakes" file. Document the mistakes once, reference it in prompts, stop repeating corrections.

---

## Try This Today

1. Find your best service, component, or route file. The one that exemplifies your patterns.
2. Ask AI to build something similar: "Create X following the pattern in Y"
3. Compare the output to your original. Did AI match the structure?
4. Note what matched and what didn't.
5. Refine your prompt to call out specific patterns that matter.

The first time you see AI perfectly match your codebase style, you'll understand why examples beat descriptions.

It's the difference between "use my patterns" and "use these patterns, exactly, see this file."

Specificity wins.
