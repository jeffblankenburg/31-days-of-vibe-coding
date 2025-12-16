---
layout: post
title: "Day 11: Teaching AI Your Patterns With Examples"
date: 2026-01-11
author: Jeff Blankenburg
excerpt: "AI writes generic code. You want your code. Show AI an example of what good looks like in your codebase, and watch it match your patterns exactly."
---

I asked Claude to build a new service for handling card trades. It generated a perfectly reasonable service. Clean code. Good structure. Worked fine.

It looked nothing like my other services.

My services use dependency injection. Claude's didn't. My services separate database operations into private methods. Claude inlined everything. My services have specific error handling patterns. Claude used generic try/catch.

The code worked, but it didn't belong in my codebase. It was a stranger among friends.

So I tried something different. I showed Claude my CardService.ts and said: "Build a TradeService following this exact pattern."

Claude matched it perfectly. Same structure. Same dependency injection. Same error handling. Same method organization. It looked like I wrote it.

AI learns faster from examples than from descriptions.

## Why Examples Beat Descriptions

When you describe a pattern in words, there's interpretation. "Use dependency injection" means different things to different developers. Constructor injection? Property injection? Service locator? What gets injected? How?

When you show an example, there's no interpretation. The code is the spec. AI sees exactly what you mean.

Compare these two prompts:

**Description:**
```
Build a service for handling trades.
Use dependency injection for the database and logger.
Separate database operations into private methods.
Use our standard error handling pattern.
```

**Example:**
```
Build a TradeService following the pattern in server/services/CardService.ts.
Match the structure exactly: constructor injection, private DB methods, error handling.
```

The second prompt produces better results because AI has a concrete target to match.

## The Reference Pattern

Here's how to use examples effectively:

**1. Identify your best code**

What file in your project best represents how you want things done? Not average code. Your cleanest, most pattern-compliant code.

For me, CardService.ts is that file. When I built it, I was careful. It represents what I want all services to look like.

**2. Reference it explicitly**

```
Build a new TradeService.

Reference: server/services/CardService.ts

Match:
- Constructor pattern (lines 10-20)
- Method structure (public methods call private helpers)
- Error handling (try/catch with telemetry logging)
- Return types (explicit Promise<T> with custom types)
```

Point to specific sections if the file is long. AI can read the whole file but benefits from knowing what matters.

**3. Call out what to preserve**

```
Keep these patterns from CardService:
- Dependency injection in constructor
- Private methods prefixed with underscore
- Database operations in private methods
- All public methods logged with telemetry

Change only:
- Entity type (Trade instead of Card)
- Business logic specific to trades
```

This tells AI what's the pattern (copy it) vs what's the content (adapt it).

## Different Types of Examples

### Service Pattern Example

```
Create NotificationService following server/services/CardService.ts.

Same patterns:
- Constructor takes db and logger
- Public methods for business operations
- Private methods for database queries
- Error handling with telemetry

Different content:
- Operations: sendEmail, sendPush, getNotificationHistory
- Tables: notifications, notification_preferences
```

### Route Pattern Example

```
Add routes for trades at server/routes/trades.ts.

Reference: server/routes/cards.ts

Copy:
- Router setup pattern
- Middleware chain (auth, validation)
- Error response format
- Request typing approach

New content:
- POST /trades (create trade offer)
- GET /trades/:id (get trade details)
- POST /trades/:id/accept (accept trade)
- POST /trades/:id/decline (decline trade)
```

### Component Pattern Example

```
Build a TradeCard component in client/components/TradeCard.tsx.

Reference: client/components/CardDisplay.tsx

Match:
- Props interface at top
- Styled-components pattern
- Loading state handling
- Error boundary pattern

Content:
- Display trade offer between two users
- Show cards being traded each direction
- Accept/decline buttons for recipient
```

### Test Pattern Example

```
Write tests for TradeService in server/services/TradeService.test.ts.

Reference: server/services/CardService.test.ts

Copy exactly:
- Test file structure (describe blocks)
- Mock setup pattern
- beforeEach/afterEach usage
- Assertion style

Test these scenarios:
- Create trade offer
- Accept trade (swap cards)
- Decline trade
- Cancel trade (by creator)
- Expired trade handling
```

## When Examples Work Best

Examples are powerful but not always necessary. Use them when:

**Building something similar to existing code.** New service like existing service. New component like existing component. New route like existing route.

**Matching style is important.** Team codebases. Open source contributions. Anywhere consistency matters.

**The pattern is complex.** Simple things don't need examples. Complex patterns (state machines, event handlers, middleware chains) benefit from concrete references.

**AI keeps getting it wrong.** If you've described something twice and AI still misses it, show an example. Works better than more words.

## Making Your Best Code Easy to Reference

Some files become your go-to references. Make them good:

**Keep them clean.** Your reference files are templates. Keep them well-commented, well-structured, exemplary.

**Keep them current.** When patterns evolve, update reference files first. They're the source of truth.

**Keep them documented.** Add a comment at the top: "This file is used as a pattern reference for new services."

**Keep them discoverable.** Mention them in CLAUDE.md. "For service patterns, reference server/services/CardService.ts."

## The Pattern Library Approach

Some teams create explicit pattern files:

```
patterns/
  service-pattern.ts       # Template service
  route-pattern.ts         # Template route
  component-pattern.tsx    # Template component
  test-pattern.test.ts     # Template test
```

These aren't runnable code. They're templates with comments:

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
Build UserPreferencesService following patterns/service-pattern.ts.
```

## Combining Examples with Configuration

Your CLAUDE.md (from Day 10) can reference example files:

```markdown
## Reference Files

When building new code, reference these files for patterns:

- Services: server/services/CardService.ts
- Routes: server/routes/cards.ts
- Components: client/components/CardDisplay.tsx
- Tests: server/services/CardService.test.ts
- Migrations: server/migrations/20240101_create_cards.ts
```

Now AI knows where to look without you specifying each time.

## When AI Misses the Pattern

Sometimes AI reads the example but still misses something. Be specific:

```
The TradeService you generated doesn't match CardService.

In CardService:
- All database calls are in private methods (lines 45-80)
- Public methods only contain business logic

In your TradeService:
- createTrade has inline database calls

Refactor to match the CardService pattern exactly.
```

Point to the specific mismatch. AI can fix targeted issues better than vague "make it match."

## The Feedback Loop

Over time, you build intuition for which examples work:

1. Reference an example
2. Check if AI matched the pattern
3. If not, figure out why (example unclear? AI missed something?)
4. Improve the example or be more specific next time

Good reference files get refined through use. Bad ones get replaced.

## Tomorrow

Your AI knows your standards (Day 10) and your patterns (today). But what about the mistakes it keeps making? The same wrong assumptions. The same bad habits.

Tomorrow I'll show you how to build a "common AI mistakes" file. Document the mistakes once, reference it in prompts, stop repeating corrections.

---

## Try This Today

1. Find your best service/component/route file. The one that exemplifies your patterns.
2. Ask AI to build something similar: "Create X following the pattern in Y"
3. Compare the output to your original. Did AI match the structure?
4. Note what matched and what didn't
5. Refine your prompt to call out specific patterns that matter

The first time you see AI perfectly match your codebase style, you'll understand why examples beat descriptions.

It's the difference between "use my patterns" and "use these patterns, exactly, see this file."

Specificity wins.
