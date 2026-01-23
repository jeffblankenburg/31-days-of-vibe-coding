---
layout: post
title: "Day 23: Asking AI for Edge Cases You'd Never Think Of"
date: 2026-01-23
author: Jeff Blankenburg
excerpt: "You thought of the happy path. What about the 50 ways it could break? Learn to use AI to find edge cases before they find your users."
---

The bug report said it all: "Username displays as undefined undefined."

Somewhere in my code, I'd assumed every user had a first name and last name. Most do. But one user had only entered an email. No name at all. My concatenation code produced "undefined undefined" and displayed it proudly.

I thought about names. I didn't think about missing names.

This is the edge case problem. You build for what you expect. You break on what you don't expect. And there's always something you don't expect.

AI has seen millions of edge cases. When you ask it what could break your code, it pulls from all of them. It thinks of the empty strings, the null values, the Unicode characters, the leap years, the timezone boundaries. The things you forget because you're focused on making it work.

## The Edge Case Generation Prompt

For any function:

```
Generate edge cases that could break this code.

Function: [paste the code]

Think about:
- Empty, null, undefined inputs
- Boundary values (0, -1, MAX_INT)
- Type coercion issues
- Unicode and special characters
- Concurrent access
- Network and database failures
- Time and timezone issues
- Very large or very small values
- Malformed but valid-looking data

For each edge case:
1. The input that breaks it
2. What goes wrong
3. How to handle it
```

## A Real Edge Case Analysis

Here's a simple function:

```typescript
function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
```

AI's edge case analysis:

**Empty/Missing Values:**
- `user.firstName` is undefined → "undefined Smith"
- `user.lastName` is undefined → "John undefined"
- Both undefined → "undefined undefined"
- Empty strings → " " (just a space)
- Whitespace only → "  " (multiple spaces)

**Unicode and Special Characters:**
- Name contains emoji → "John 🚀" (might display wrong)
- Right-to-left characters → Display order issues
- Very long names → UI overflow
- Names with quotes → "John O'Brien" (apostrophe might cause issues in certain contexts)
- Names with HTML → `<script>alert()</script>` (XSS if not escaped)

**Type Issues:**
- `user` is null → TypeError
- `user` is undefined → TypeError
- `firstName` is a number → "123 Smith" (type coercion)

**Edge Cases in Valid Data:**
- Single word name (like "Madonna") → Unclear how to handle
- Hyphenated names → "Mary Jane Watson-Parker"
- Multiple middle names → Not handled
- Prefixes/suffixes → "Dr. John Smith Jr."

A better implementation:

```typescript
function formatUserName(user: User | null | undefined): string {
  if (!user) {
    return 'Unknown User';
  }

  const parts = [user.firstName, user.lastName]
    .filter(part => part && part.trim())
    .map(part => part.trim());

  if (parts.length === 0) {
    return user.email || 'Unknown User';
  }

  return parts.join(' ');
}
```

## The Input Validation Prompt

For API endpoints:

```
Generate all the ways users could send invalid data to this endpoint.

Endpoint: [describe or paste code]
Expected input: [describe expected format]

Categories to consider:
1. Missing required fields
2. Wrong types (string instead of number)
3. Out of range values
4. Invalid formats (email, date, UUID)
5. SQL injection attempts
6. XSS attempts
7. Very large payloads
8. Unusual but valid values
9. Boundary values
10. Unicode edge cases

For each case:
- The invalid input
- What happens without validation
- Proper validation to add
```

## The State Machine Prompt

For features with multiple states:

```
Map the state transitions for this feature and find invalid states.

Feature: [describe the feature]
States: [list known states]

Questions:
1. What states can transition to what other states?
2. What transitions are impossible but might be attempted?
3. What happens if the same transition is triggered twice?
4. What happens if transitions happen out of order?
5. What happens if the system crashes mid-transition?
6. Can you end up in an unrecoverable state?

For each problematic scenario, describe what goes wrong and how to prevent it.
```

## Time and Date Edge Cases

Time is always harder than you think:

```
Find time-related edge cases in this code.

Code: [paste code that deals with time]

Consider:
1. Timezone boundaries (UTC vs local)
2. Daylight saving time transitions
3. Midnight (00:00 vs 24:00)
4. End of month/year boundaries
5. Leap years (Feb 29)
6. Dates far in past or future
7. Unix timestamp overflow (2038 problem)
8. Different calendar systems
9. Server time vs user time vs database time
10. Clock skew between systems

What breaks? What should be handled differently?
```

## Concurrency Edge Cases

When multiple things happen at once:

```
Find concurrency issues in this code.

Code: [paste code]

Consider:
1. Two users doing the same action simultaneously
2. Same user on two devices
3. Retry after timeout (request succeeded but response failed)
4. Race condition between read and write
5. Deadlocks between resources
6. Lost updates (both read, both write, one wins)
7. Phantom reads (data changes between queries)

For each issue:
- How to trigger it
- What goes wrong
- How to prevent it
```

## The Failure Mode Prompt

For integrations and external dependencies:

```
What happens when things fail?

This code depends on: [list dependencies - database, APIs, services]

For each dependency, what happens when:
1. It's completely down
2. It's very slow (30 second response)
3. It returns an error
4. It returns invalid data
5. It returns partial data
6. Connection is lost mid-request
7. It times out
8. It rate limits you

For each failure mode:
- What does the user experience?
- What gets logged?
- How do you recover?
```

## The User Behavior Prompt

Users do unexpected things:

```
What unexpected user behaviors could break this feature?

Feature: [describe it]

Consider users who:
1. Click submit multiple times rapidly
2. Navigate away mid-operation
3. Refresh during a multi-step process
4. Use browser back button
5. Have multiple tabs open
6. Copy-paste unexpected data
7. Use autofill with wrong data
8. Have slow or flaky connections
9. Use old cached versions
10. Are actively trying to break things

For each behavior:
- What happens?
- Should it be prevented or handled?
- How?
```

## The Data Volume Prompt

Scale reveals edge cases:

```
What breaks at scale?

Current assumption: [what you're building for]
Scale scenario: [10x, 100x, 1000x]

Consider:
1. Database tables with millions of rows
2. API returning thousands of items
3. User with thousands of records
4. Processing millions of events
5. Files that are gigabytes
6. Requests at 10,000/second

What assumptions break?
What queries become slow?
What memory limits get hit?
What timeouts get exceeded?
```

## Building Edge Cases Into Your Workflow

Don't wait until production. Ask for edge cases:

**During design:** "What inputs could break this?"
**During implementation:** "What am I not handling?"
**During review:** "What edge cases should tests cover?"
**During testing:** "What else should I test?"

Make edge case thinking habitual.

## The Edge Case Checklist

For any feature:

```
□ Null and undefined inputs
□ Empty strings, arrays, objects
□ Boundary values (0, -1, max)
□ Invalid types
□ Malformed data
□ Very large inputs
□ Concurrent access
□ Network failures
□ Database failures
□ Time/timezone issues
□ Unicode edge cases
□ User mistakes
□ Malicious input
```

## Tomorrow

You've found the edge cases. Now you need to deploy the fixes. Deployment is scary, especially with AI-generated code. Tomorrow I'll show you how to use AI to generate deployment automation: migrations, rollback scripts, and runbooks.

---

## Try This Today

1. Take a feature you built recently
2. Run the edge case generation prompt
3. Pick one edge case you didn't handle
4. Fix it

There's always at least one. Usually there are ten. Find them before your users do.
