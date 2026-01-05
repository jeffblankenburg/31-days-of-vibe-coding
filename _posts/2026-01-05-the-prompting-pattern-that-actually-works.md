---
layout: post
title: "Day 5: The Prompting Pattern That Actually Works"
date: 2026-01-05
author: Jeff Blankenburg
excerpt: "Stop writing vague prompts. Learn the five-part structure that gets AI to generate exactly what you need, plus prompt boosters that change how AI approaches any task."
---

Most prompts are bad.

Not intentionally bad. Just incomplete. You ask AI to "add user authentication" and wonder why the result needs 20 follow-up conversations to get right.

The problem isn't AI. The problem is that vague prompts get vague results.

I used to write prompts like grocery lists. "Add login. Add registration. Use JWT. Make it secure." Then I'd spend an hour clarifying what I actually meant. What database? What error messages? What happens on failure? What about rate limiting?

Every question AI asked was something I should have included in the original prompt.

So I developed a structure. Five parts that cover everything AI needs to generate production-ready code on the first try. Context, Intent, Constraints, Examples, Verification.

## The Five-Part Prompting Pattern

Here's the structure:

1. **Context** - What AI needs to understand before starting
2. **Intent** - What you're trying to accomplish (the why, not the what)
3. **Constraints** - The boundaries and requirements
4. **Examples** - What good looks like
5. **Verification** - How to know if it worked

Every prompt needs all five. Skip one, and you'll end up clarifying later.

Let me break down each part.

## Part 1: Context

Context is everything AI needs to understand before it writes a single line of code. Your tech stack. Your architecture. The relevant files. What already exists.

Without context, AI makes assumptions. Usually wrong ones.

Bad context:
```
Add password reset functionality.
```

AI has no idea what framework you're using, how your auth system works, what database stores users, or what email service you have.

Good context:
```
We're building a Node.js/Express API with PostgreSQL.
Authentication uses JWT tokens stored in httpOnly cookies.
Users are stored in the 'users' table with email, password_hash, and reset_token columns.
We use Resend for transactional email.
The auth routes are in server/routes/auth.js.
Our telemetry service is at server/services/telemetryService.js using OpenTelemetry, exporting to Dynatrace.
```

Now AI knows your stack, your patterns, your file locations, and your existing services. It can write code that fits.

### Context Checklist

Include these when relevant:
- Tech stack (language, framework, database)
- Architecture pattern (monolith, microservices, serverless)
- Relevant file locations
- Related existing code
- External services and APIs
- Coding standards or conventions
- Security requirements already in place

## Part 2: Intent

Intent is the why, not the what. It's the goal you're trying to achieve.

"Add a button" is the what. "Let users export their data for GDPR compliance" is the why.

When AI understands intent, it makes better decisions about implementation. It anticipates edge cases. It adds features you didn't think to ask for but obviously need.

Bad intent:
```
Add a password reset endpoint.
```

AI will add an endpoint. Minimal. Functional. Missing everything that makes it production-ready.

Good intent:
```
Users who forget their password need a way to regain access to their account
without contacting support. This should be secure (time-limited tokens,
one-time use), user-friendly (clear error messages, email confirmation),
and trackable (we need to know if someone is abusing the reset flow).
```

Now AI understands the full picture. Security matters. UX matters. Observability matters. It will include rate limiting without you asking because it understands someone could abuse the flow.

### Intent Signals

Good intent statements include:
- Who is doing this action (user, admin, system)
- Why they need it (solve what problem)
- What success looks like
- What failure looks like
- What could go wrong

## Part 3: Constraints

Constraints are the boundaries. What you must do. What you cannot do. What already exists that can't change.

Every project has constraints. Database schema that can't break backward compatibility. API contracts with mobile clients. Performance requirements. Security policies.

AI doesn't know your constraints unless you tell it.

Bad constraints (none specified):
```
Add password reset.
```

AI might create new database tables when you need to use existing ones. Might return different error formats than your API standard. Might use a library you don't have installed.

Good constraints:
```
Constraints:
- Use the existing reset_token and reset_token_expires columns in the users table
- Follow our API response format: { success: boolean, data?: any, error?: string }
- Reset tokens must expire in 1 hour
- Rate limit: max 3 reset requests per email per hour
- Don't install new packages; use existing crypto and email services
- All routes must go through our authMiddleware for logging
```

Now AI works within your boundaries. No surprise package installs. No schema migrations. No breaking API contracts.

### Common Constraints to Specify

- Database schema (existing tables, columns, relationships)
- API response format
- Error handling patterns
- Package restrictions (no new dependencies, or only specific packages)
- Performance requirements (response time, memory usage)
- Security requirements (encryption, PII handling)
- Backward compatibility requirements
- File and folder structure

## Part 4: Examples

Examples show AI what good looks like. Your patterns. Your style. Your conventions.

Documentation explains. Examples demonstrate.

If you have existing code that follows the pattern you want, reference it. AI learns faster from examples than from descriptions.

Bad examples (none provided):
```
Add password reset following our patterns.
```

AI doesn't know your patterns.

Good examples:
```
Follow the pattern from our existing login endpoint in server/routes/auth.js:

1. Validate input with express-validator
2. Use early returns for validation errors
3. Wrap database calls in try/catch
4. Log events using telemetryService.trackAuthEvent()
5. Return consistent response format

Reference the email sending pattern in server/services/emailService.js
for how we structure transactional emails.
```

Now AI has concrete patterns to follow. Not just "make it look right" but "make it look like this specific code that already works."

### Types of Examples

- Reference files with similar functionality
- Code snippets showing your style
- API response examples
- Error message formats
- Test examples
- Database query patterns

## Part 5: Verification

Verification is how you'll know if the code works. The tests to pass. The behavior to confirm. The metrics to check.

This part does two things. First, it tells AI what success looks like, which shapes how it implements. Second, it gives you a checklist for reviewing the output.

Bad verification (none specified):
```
Make sure it works.
```

Good verification:
```
Verification:
- Unit tests for: valid email, invalid email, expired token, used token, rate limiting
- Integration test: complete flow from request to email to reset to login
- Manual testing: verify email arrives within 30 seconds
- Security check: tokens are cryptographically random, not sequential
- Observability: reset_requested and reset_completed events appear in logs
- Error cases: rate limit returns 429, invalid token returns 400, expired returns 400
```

Now you have a checklist. AI should generate tests covering these cases. You can verify each item. Nothing ambiguous.

### Verification Checklist

Include these when relevant:
- Unit tests to write
- Integration tests to pass
- Manual testing steps
- Security requirements to verify
- Performance benchmarks
- Observability events to confirm
- Edge cases to handle

## The Complete Pattern in Action

Here's a real prompt using all five parts:

```
## Context
Building collectyourcards.com, a Node.js/Express API with PostgreSQL.
Users are stored in the users table with columns: id, email, password_hash,
reset_token, reset_token_expires, failed_reset_attempts, last_reset_request.
Auth routes are in server/routes/auth.js.
Telemetry service at server/services/telemetryService.js using OpenTelemetry, exporting to Dynatrace.
Email service at server/services/emailService.js using Resend.

## Intent
Users who forget their password need a secure way to reset it without
contacting support. The flow must be abuse-resistant (rate limiting,
token expiration) and fully observable (every event logged for
debugging and security monitoring).

## Constraints
- Use existing database columns, no schema changes
- Reset tokens expire in 1 hour
- Rate limit: 3 requests per email per hour
- Follow existing API response format: { success, data, error }
- Use existing crypto.randomBytes for token generation
- No new package installations
- All errors must be logged with full context

## Examples
Follow the login endpoint pattern in server/routes/auth.js:
- Input validation with express-validator
- Early returns for errors
- try/catch around database operations
- telemetryService.trackAuthEvent() for all outcomes
- Consistent response format

Follow the email pattern in emailService.js for the reset email template.

## Verification
- Tests: valid request, invalid email, expired token, used token, rate limit exceeded
- Integration: request → email → click link → reset → login works
- Security: tokens are 32 bytes of randomness, not guessable
- Observability: password_reset_requested and password_reset_completed events visible in Dynatrace
- Errors: 429 for rate limit, 400 for invalid/expired token
```

That's a complete prompt. AI has everything it needs. No follow-up questions about the database schema. No confusion about error handling. No guessing at your patterns.

## Before and After

Let me show you the difference this pattern makes.

**Vague prompt:**
```
Add a feature to search for cards by player name.
```

What AI generates: A basic search endpoint that queries the database. No pagination. No fuzzy matching. No performance optimization. No error handling for empty results. No observability.

**Five-part prompt:**
```
## Context
collectyourcards.com has 900,000+ cards in PostgreSQL.
Cards table has player_id foreign key to players table.
Players table has name (varchar), normalized_name (lowercase, no accents).
Search endpoint should be GET /api/cards/search.
We use pg_trgm extension for fuzzy matching.

## Intent
Users need to find cards even when they're not sure of exact spelling.
"Mike Trout" should find "Mike Trout" and "Michael Trout."
Search should feel instant (under 200ms) even with typos.

## Constraints
- Return max 50 results per page
- Support pagination with cursor-based approach
- Use existing pg_trgm index on normalized_name
- Results sorted by relevance score, then by year descending
- No new packages; use existing pg driver

## Examples
Follow the existing /api/sets/search endpoint pattern.
Use the same pagination response format: { results, nextCursor, totalCount }

## Verification
- Tests: exact match, partial match, typo tolerance, empty results, pagination
- Performance: under 200ms for any query on production data
- Edge cases: empty query returns error, special characters handled
```

What AI generates: A complete search endpoint with fuzzy matching, pagination, performance optimization using existing indexes, proper error handling, observability, and tests. Because it understood what you actually needed.

## Prompt Templates You Can Use Today

### Template 1: Feature Implementation

```
## Context
[Tech stack, relevant files, existing patterns]

## Intent
[Who needs this, why they need it, what success looks like]

## Constraints
[Database requirements, API contracts, performance targets, security rules]

## Examples
[Reference files, code patterns to follow]

## Verification
[Tests to write, behavior to confirm, metrics to check]
```

### Template 2: Bug Fix

```
## Context
[Affected code, how the bug manifests, environment details]

## Intent
[What should happen vs what is happening, impact of the bug]

## Constraints
[Don't break these other things, backward compatibility needs]

## Examples
[Working similar code, expected vs actual behavior]

## Verification
[Tests that should pass after fix, manual verification steps]
```

### Template 3: Refactoring

```
## Context
[Current code, why it needs refactoring, affected files]

## Intent
[Goal of refactoring: performance, maintainability, readability]

## Constraints
[Behavior must not change, tests must still pass, API contracts preserved]

## Examples
[Target patterns, reference implementations]

## Verification
[All existing tests pass, no behavior changes, performance benchmarks]
```

### Template 4: Test Generation

```
## Context
[Code to test, existing test patterns, test framework]

## Intent
[What behavior to verify, coverage goals]

## Constraints
[Test file location, naming conventions, mocking approach]

## Examples
[Existing test files showing your patterns]

## Verification
[Coverage percentage, all tests pass, edge cases covered]
```

## Common Mistakes

**Mistake 1: Skipping context because "AI should figure it out"**

AI can't read your mind or your project. If you don't say "we use PostgreSQL," AI might generate MySQL queries. If you don't mention your error handling pattern, AI will invent one that doesn't match.

Always include context. Even when it feels obvious.

**Mistake 2: Intent that's just a restatement of the task**

"The intent is to add password reset" isn't intent. That's the what.

Intent is: "Users who forget their password should regain access without contacting support, in a way that's secure and observable."

The why shapes how AI implements.

**Mistake 3: Constraints that are too vague**

"Make it secure" isn't a constraint. AI doesn't know what secure means to you.

"Rate limit to 3 requests per hour per IP, use cryptographically random tokens of 32 bytes, expire tokens after 1 hour, hash tokens before storing" is a constraint.

Be specific.

**Mistake 4: No examples**

"Follow our patterns" means nothing without showing what those patterns are.

Point to specific files. Show code snippets. Give AI something concrete.

**Mistake 5: Verification that's just "test it works"**

List specific tests. Name edge cases. Describe the exact behavior to verify.

Vague verification leads to vague testing.

## Prompt Boosters

The five-part structure is your foundation. But there are phrases you can add to any prompt that change how AI approaches the work. I call them prompt boosters.

These aren't about structure. They're about steering AI's behavior. Use them when the situation calls for it.

### Before AI Starts

**"Do you have any questions before you start?"**

This one phrase has saved me hours. AI often has questions but won't ask unless invited. Maybe it's unclear which file to modify. Maybe it noticed a conflict in your requirements. Maybe it needs to know about a dependency.

When you ask this, AI pauses and surfaces uncertainties instead of guessing wrong.

**"What assumptions are you making?"**

AI makes assumptions constantly. About your database schema. About error handling. About what "secure" means. Usually it doesn't tell you.

This phrase forces AI to list its assumptions explicitly. You can correct the wrong ones before it writes code based on them.

**"Tell me your plan before writing code."**

For complex tasks, you want to review the approach before AI commits to it. This phrase gets you a roadmap. You can redirect before AI goes down the wrong path.

**"If you're unsure about something, ask rather than guess."**

AI defaults to confident. It will invent plausible answers rather than admit uncertainty. This phrase gives it permission to say "I don't know" and ask for clarification.

### Keeping AI Focused

**"Only modify the files I mention."**

AI loves to help. Sometimes too much. You ask for a fix in one file, it refactors three others "while it's in there." This phrase keeps scope tight.

**"Make the minimal change to fix this."**

Similar to above, but for the change itself. You want a one-line fix, not a rewrite of the function. AI will default to comprehensive. This phrase steers toward surgical.

**"Don't refactor anything I didn't ask about."**

AI sees code it doesn't like and wants to improve it. Sometimes that's helpful. Often it's scope creep that introduces bugs. Be explicit when you want restraint.

### Quality and Edge Cases

**"What could go wrong with this approach?"**

AI tends toward optimism. It shows you the happy path. This phrase activates critical thinking. AI will surface race conditions, edge cases, failure modes.

**"What edge cases should I consider?"**

More specific than the above. Good for when you want a list of scenarios to test. AI will enumerate the nulls, the empty arrays, the boundary conditions.

**"What am I not thinking about?"**

My favorite. AI has seen millions of similar implementations. It knows what bites people. This open-ended question surfaces things outside your mental model.

### After AI Finishes

**"Read the file again after editing to confirm your changes are correct."**

AI makes mistakes. Off-by-one errors in line numbers. Edits that didn't apply cleanly. This phrase forces a self-check. AI will catch its own errors before you have to.

**"Does this match the patterns in the codebase?"**

AI might generate working code that looks nothing like your existing code. This phrase prompts a consistency check against your conventions.

**"Review your code for security issues before finishing."**

AI doesn't automatically think adversarially. This phrase shifts it into security review mode. It will look for injection vulnerabilities, auth bypasses, data leaks.

### Managing Uncertainty

**"Tell me what you're confident about and what you're uncertain about."**

AI presents everything with equal confidence. The well-understood parts and the educated guesses look the same. This phrase forces calibration. You know where to scrutinize.

**"If this requires information you don't have, tell me what you need."**

Sometimes AI doesn't have enough context to do good work. But it tries anyway. This phrase gives it an exit. "I need to see the database schema" is more useful than a wrong guess about the schema.

### Iteration

**"What's the simplest version of this that would work?"**

AI tends toward complete solutions. Sometimes you want an MVP. This phrase resets expectations toward minimal viable.

**"Don't try to do everything at once. Let's start with X."**

For big features, break the work into steps. This phrase sets the scope for iteration one. You'll build up, not debug down.

### Using Prompt Boosters

You don't need all of these in every prompt. Pick the ones that fit your situation.

Starting a complex feature? Use "Tell me your plan" and "What assumptions are you making?"

Need a surgical fix? Use "Make the minimal change" and "Only modify the files I mention."

Worried about edge cases? Use "What could go wrong?" and "What am I not thinking about?"

The five-part structure gets AI the information it needs. Prompt boosters shape how it uses that information.

## Why This Works

The five-part pattern works because it eliminates ambiguity.

Every time AI asks a clarifying question, that's something your prompt didn't specify. The five-part pattern anticipates those questions and answers them upfront.

Context tells AI where it's working. Intent tells AI why. Constraints tell AI the boundaries. Examples show AI the patterns. Verification tells AI what success looks like.

Cover all five, and AI has everything it needs.

## Tomorrow

You have a prompting pattern. But some features are too big for a single prompt. AI loses context. Hallucinates details. Produces code that's impossible to test.

Tomorrow I'll show you how to break complex features into phases. How to ship working code incrementally instead of hoping one giant prompt produces a working result.

Small prompts. Frequent verification. Better code.

---

## Try This Today

Take a feature you need to build and write a prompt using the five-part pattern.

1. **Context**: What does AI need to know about your project?
2. **Intent**: Why does this feature exist? What problem does it solve?
3. **Constraints**: What are the boundaries? What can't change?
4. **Examples**: What existing code should AI follow?
5. **Verification**: How will you know it works?

Don't implement yet. Just write the prompt. See how much clearer your requirements become when you structure them this way.

Then notice how many fewer follow-up questions AI asks.
