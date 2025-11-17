---
layout: post
title: "Day 2: Fundamental #1 - Plan Features, Not Functions"
date: 2025-01-02
author: Jeff Blankenburg
excerpt: "When you ask AI to write a function, you get a function. When you ask AI to implement a feature, you get everything you need to ship."
---

The first time I asked Claude to "write a function that validates email addresses," I got exactly what I asked for.

```javascript
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

Technically correct. Completely useless. It checks for an @ symbol and a dot. Doesn't handle plus addressing. Doesn't support internationalized domains. Doesn't provide any error feedback. Can't tell you why an email failed validation.

I took that function, dropped it into my registration flow, and immediately ran into problems. Users typed valid emails that the regex rejected. The error message was generic. I had no way to track validation failures for analytics.

I went back to Claude. "Add support for plus addressing." It did. "Now handle international domains." It did. "Now return detailed error messages." It did. "Now add logging for analytics." It did.

After six iterations, I had a function that actually worked in production. Total time: 45 minutes.

Here's what I should have asked from the start:

"I need email validation for user registration. Users should get clear feedback when their email is invalid. This needs to handle plus addressing (user+tag@domain.com) and internationalized domains. Return a validation result object with success/failure and a user-friendly error message. Log validation failures for analytics without storing the email address."

That prompt gets you production-ready code on the first try. Because you're describing a feature, not a function.

This is the first fundamental of vibe coding: **Plan features, not functions.**

## Why This Matters

When you ask AI to write a function, you get a function. That's it. No context. No integration. No error handling. No observability. Just the function you asked for.

When you ask AI to implement a feature, you get everything you need to ship. The function. Error handling. Logging. Tests. Documentation. Integration with the rest of your system.

The difference is context. Features have context. Functions don't.

A function answers "how do I do this specific thing?"

A feature answers "what does the user need and why?"

AI is really good at implementing features when you give it the full picture. It's terrible at guessing what you actually need when you only describe the implementation.

## The GitHub Issue Template

Here's how I plan every feature for collectyourcards.com. I write a GitHub Issue before I write any code. The issue becomes my specification.

Every issue has the same structure:

**User Need:** What is the user trying to accomplish?

**Acceptance Criteria:** What does done look like?

**Technical Context:** What systems are involved?

**Constraints:** What are the limitations?

**Non-Functional Requirements:** Security, performance, observability.

That's it. Five sections. Every time.

Here's a real example. I needed to add spreadsheet generation so users could download Excel files of card set checklists.

### Issue #47: Spreadsheet Generation for Card Sets

**User Need:**
Users want to download Excel spreadsheets for card set checklists. They need this for offline tracking, printing, and integration with other tools.

**Acceptance Criteria:**
- User can select any card set and download an Excel file
- Spreadsheet includes: card number, player name, team, rookie status, autograph status, relic status
- User can filter by year, manufacturer, or series before generating
- Download starts immediately, no email delivery
- Works for sets up to 5,000 cards

**Technical Context:**
- API endpoint needed: POST /api/spreadsheets/generate
- Frontend: Add download button to set detail pages
- Use ExcelJS library for generation
- Query card data from existing database views
- User must be authenticated

**Constraints:**
- File must be under 10MB
- Rate limit: 5 downloads per user per hour
- Timeout: 30 seconds maximum generation time
- No personally identifiable information in files

**Non-Functional Requirements:**
- Log all generation requests with set_id and user_id
- Track download count per set for analytics
- Monitor generation time, alert if >10 seconds
- Cache generated files for 5 minutes (same set, same filters)
- Graceful failure if Excel generation fails

That's the complete specification. I didn't write any code. I didn't describe functions. I described what the user needs and what constraints matter.

## How AI Uses This

I took that issue and gave it to Claude: "Implement Issue #47. Read the issue, propose an implementation plan, and wait for my approval before writing code."

Claude came back with a plan:

1. API endpoint using Express route
2. Database query to fetch card data based on filters
3. ExcelJS to generate the file with proper formatting
4. Streaming response to handle large files
5. Redis caching with 5-minute TTL
6. Rate limiting middleware
7. Analytics events for tracking
8. Error handling for timeouts, query failures, generation errors
9. Tests for happy path, edge cases, and error cases

I reviewed the plan. Asked questions:

"What happens if the query returns 10,000 cards even though the user filtered?"

Claude revised: "Add a hard limit in the query. Return top 5,000 cards sorted by card_number. Show a warning in the UI if results are capped."

"How do we handle concurrent requests for the same spreadsheet?"

Claude revised: "Cache uses a hash of (set_id + filters) as the key. First request generates, subsequent requests within 5 minutes get cached version."

"What if Redis is down?"

Claude revised: "Try cache, fall back to direct generation if cache unavailable. Log cache failures but don't block the request."

Then I said "looks good, implement it."

Claude wrote everything. API endpoint. Query logic. Excel generation. Caching. Rate limiting. Analytics. Error handling. Tests. All of it.

Total time: 90 minutes from issue creation to working feature in production.

## What Makes a Good Feature Issue

The key is complete context. AI needs to understand:

1. **What the user is trying to accomplish** - Not "download a file" but "track their collection offline"

2. **What success looks like** - Specific acceptance criteria, not vague goals

3. **What systems are involved** - Database, API, frontend, third-party services

4. **What could go wrong** - Rate limits, timeouts, failures, edge cases

5. **What you need to monitor** - Logs, metrics, alerts

When you provide this context, AI can plan a complete solution. When you skip it, AI makes assumptions. Those assumptions are usually wrong.

Here's a bad issue:

"Add email validation to the registration form."

Here's a good issue:

"User registration needs email validation. Users should get immediate feedback if their email is invalid. Support standard formats, plus addressing, and international domains. Return clear error messages like 'Email must include an @ symbol' instead of 'Invalid format'. Log validation failures (without storing the email) for analytics to identify common user errors."

The bad issue takes 6 iterations and 45 minutes. The good issue ships on the first try.

## AI Can Help You Write Better Issues

Here's the secret. I don't always know what edge cases matter. I don't always remember to specify observability requirements. I forget constraints.

So I have AI help me write the issue.

I start with a rough idea: "I need to add spreadsheet downloads for card sets."

I ask Claude: "Help me write a complete GitHub Issue for this feature. Ask clarifying questions about user needs, acceptance criteria, technical constraints, and non-functional requirements."

Claude asks:

"What format should the spreadsheet use? Excel, CSV, both?"

"What columns should be included? Just basic card info or full details?"

"Should users be able to customize which columns appear?"

"What's the maximum size set we need to support? 1,000 cards? 10,000?"

"How should we handle sets with missing data (no player, no team, etc)?"

"Do you want filtering options before generation? Year, team, card type?"

"Should this be available to all users or just paid accounts?"

"What's the expected use case? Printing checklists, offline tracking, importing to other tools?"

I answer those questions. Claude drafts the complete issue with all five sections filled out. User need. Acceptance criteria. Technical context. Constraints. Non-functional requirements.

Now I review the issue, add anything Claude missed, and create it in GitHub.

Then we implement from that complete specification.

## Real Example: Universal Search v2

The best example from collectyourcards.com is search v2. I wanted order-agnostic search that could handle complex queries like "trout 2020 topps chrome auto" regardless of token order.

I created Issue #34 and documented 57 different search patterns I wanted to support:

Single-token patterns: player name, card number, year, set name, team, etc.

Two-token patterns: player + year, player + team, card number + year, set + card type, etc.

Three-token patterns: player + year + set, player + set + card type, etc.

Four-token patterns: player + year + set + card type.

For each pattern, I specified what results users should get and how fast (under 200ms).

That issue became the complete specification. Claude used it to propose a 7-phase implementation plan:

Phase 1: Token extraction (player names, card numbers, years, card types)
Phase 2: Pattern recognition (identify query type, select search strategy)
Phase 3: Query builder (generate optimized SQL)
Phase 4: Advanced tokens (sets, teams, parallels)
Phase 5: Remaining search strategies
Phase 6: Fuzzy matching (typo tolerance, phonetic matching)
Phase 7: Testing and migration

Each phase was its own mini-issue. We implemented one phase at a time. Tested. Shipped. Moved to the next phase.

The complete feature took 6 weeks. But each phase shipped in days. Users got improvements incrementally instead of waiting for the whole thing.

That only worked because the original issue was complete. Claude knew exactly what patterns to support, what performance targets to hit, and how to break it into shippable phases.

## The Pattern for Every Feature

Here's the workflow that works:

1. **Start with user need** - What are they trying to do? Why?

2. **Write rough issue** - Just the basics, what you think matters

3. **Ask AI for help** - "Help me write a complete issue for this. Ask clarifying questions."

4. **Answer AI's questions** - It will catch things you forgot

5. **Review AI's draft issue** - Add anything it missed, remove anything wrong

6. **Create the issue in GitHub** - This becomes your source of truth

7. **Ask AI to propose implementation plan** - "Read issue #X, propose a plan, wait for approval"

8. **Iterate on the plan** - Ask hard questions, refine the approach

9. **Approve and implement** - "Looks good, implement it"

10. **Verify and ship** - Tests, staging, production

This process forces you to think. What does the user actually need? What edge cases matter? What could break? How will you monitor it?

That thinking happens before any code gets written. When you skip this step and jump straight to "write me a function," you end up iterating on code instead of iterating on requirements.

It's faster to get the requirements right first, then generate code once.

## Small Issues Ship Faster

One more thing. Don't write massive issues that try to do everything at once.

I used to write issues like: "Build admin dashboard with user management, analytics, and content moderation."

That's three features. AI would implement all three. I'd review all three. Find problems in all three. Deployment would be complex. Something would break and I wouldn't know which feature caused it.

Now I write small issues. Issue #50: "Add user list to admin dashboard." That's it. Just the user list. View users, search by email, sort by registration date, paginate results.

AI implements it. I test it. It works. I ship it.

Then Issue #51: "Add user detail view." Then Issue #52: "Add user ban functionality."

Three issues. Three deployments. Each one small and tested. Each one working before the next starts.

This is the same principle as small pull requests. But with AI, I can implement these small features in hours instead of days. What would take a team a week takes me an afternoon.

The issue tracker looks busy. Lots of small issues. That's good. It means I'm shipping constantly.

## Why This Is Fundamental #1

Plan features, not functions. This is the most important shift you'll make.

Get this right and everything else follows. Your issues become specifications. AI implements complete solutions. You ship faster because you're iterating on requirements, not code.

Get this wrong and you'll spend your life asking AI to modify functions. "Add error handling." "Now add logging." "Now handle this edge case." "Now write tests." Six iterations to get what you should have gotten the first time.

The difference between a good prompt and a bad prompt is context. Features have context. Functions don't.

Write issues like you're explaining the feature to a new team member. What does the user need? Why? What matters? What could go wrong? How will we know it's working?

Then let AI turn that specification into code.

## Tomorrow

Tomorrow is Fundamental #2: Tests are your specification, not documentation.

You'll learn why "write tests for this function" gets you useless tests, and how "generate comprehensive tests that prove this feature works correctly" gets you a test suite that actually catches bugs.

Tests aren't documentation of what the code does. Tests are the specification of what the code should do. When you understand that difference, test-driven development with AI becomes the fastest way to ship quality code.

---

**Try This Today:**

Pick a feature you need to build. Don't write any code. Write a GitHub Issue instead.

Five sections:
1. User need - what are they trying to accomplish?
2. Acceptance criteria - what does done look like?
3. Technical context - what systems are involved?
4. Constraints - what are the limitations?
5. Non-functional requirements - security, performance, observability

Ask AI to help you write it. Let it ask clarifying questions. Review its draft. Create the issue.

Tomorrow you'll learn how to turn that issue into code with tests that prove it works.

