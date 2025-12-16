---
layout: post
title: "Day 13: Stop AI From Changing What You Didn't Ask For"
date: 2026-01-13
author: Jeff Blankenburg
excerpt: "You asked for a one-line fix. AI rewrote the function, renamed variables, and 'cleaned up' unrelated code. Here's how to keep AI focused on exactly what you requested."
---

I needed to change an error message.

One line. The error said "Invalid user" and I wanted it to say "User not found or inactive." A five-word change.

Claude changed the error message. Great.

Claude also renamed the function from `validateUser` to `checkUserStatus` because the new behavior was "more accurately described." It refactored the validation logic "for clarity." It updated three other files that referenced the old function name.

I asked for five words. I got a mini-refactor across four files.

This happens constantly. AI sees opportunities to "improve" and takes them, even when you didn't ask. The improvements might even be good ideas. But they're not what you asked for, they're not what you tested, and they might break things you weren't thinking about.

AI needs boundaries. Here's how to set them.

## Why AI Over-Helps

AI is trained to be helpful. Really helpful. When it sees code that could be "better," it wants to fix it. When it sees inconsistent naming, it wants to clean it up. When it sees an opportunity to improve, it takes it.

This comes from good intentions. But in a real codebase, unsolicited changes are dangerous:

- They're not tested
- They're not reviewed
- They might break things
- They're not in scope
- They confuse git history
- They make code review harder

You need AI to do exactly what you ask. No more.

## The Magic Phrase

The single most effective constraint I've found:

```
Make this exact change and NOTHING else.
Do not modify any other code, rename anything, or make improvements.
```

That's it. Those two sentences dramatically reduce scope creep.

Put them at the end of any surgical request:

```
Change the error message on line 45 from "Invalid user" to "User not found or inactive."

Make this exact change and NOTHING else.
Do not modify any other code, rename anything, or make improvements.
```

AI will make that one change. Nothing more.

## Constraining By File

When you want changes limited to specific files:

```
Fix the null check in userService.ts.

ONLY modify userService.ts.
Do not modify any other files, even if they seem related.
If other files need changes, tell me but don't make them.
```

This prevents the "helpful" cascade where AI fixes one file and then "updates" the files that reference it.

## Constraining By Function

For changes within a file:

```
Update the validateEmail function to also check for banned domains.

ONLY modify the validateEmail function.
Do not change any other functions in this file.
Do not rename variables or refactor for "clarity."
```

AI stays focused on one function.

## Constraining By Line

For surgical precision:

```
On line 127, change `status === 'active'` to `status !== 'inactive'`.

Change only that line. Do not modify surrounding code.
```

Sometimes you need this level of precision. AI can handle it.

## The "Ask First" Pattern

When you're not sure about scope, make AI ask:

```
Add caching to the getUser function.

Before making changes:
1. Tell me which files you plan to modify
2. List each function you'll change
3. Describe any other changes you think are needed

Wait for my approval before making any changes.
```

Now you see the scope before it happens. You can say "yes to 1 and 2, no to 3."

## The "Show Don't Apply" Pattern

For risky changes:

```
Show me how you would add rate limiting to this endpoint.

Do NOT modify any files yet.
Just show me the code you would add or change.
```

Review the proposed changes. If they're right:

```
Apply those changes.
```

If they include unwanted extras:

```
Apply only the middleware addition. Don't change the error handling.
```

## Explicit Scopes

Be explicit about what's in and out of scope:

```
Add pagination to the /api/cards endpoint.

In scope:
- Add limit and offset query parameters
- Update the database query
- Update the response format to include total count

Out of scope:
- Do not change error handling
- Do not add caching
- Do not modify the card model
- Do not update other endpoints
```

The out-of-scope list is as important as the in-scope list. It tells AI where the boundaries are.

## When AI Says It Needs More Changes

Sometimes AI will push back:

"I notice that adding pagination would also require updating the response type. Should I do that?"

This is AI asking permission. Good.

Answer specifically:

```
Yes, update the response type.
But do not update the other endpoints that use this type.
```

Or:

```
No, leave the response type as is. We'll handle that separately.
```

Don't just say "sure" to everything AI suggests. Each expansion of scope is a choice.

## Red Flags to Watch For

Review AI's changes for unsolicited modifications:

**Renamed variables or functions.** You didn't ask for renaming. Why did it happen?

**"Cleaned up" code.** Did AI simplify something you didn't ask about?

**Modified other files.** You asked for changes to file A. Why did files B, C, D change?

**Added features.** You asked for X. Why is there also Y?

**Changed formatting.** Did AI reformat code it didn't need to touch?

When you see these, either:
1. Roll back and re-request with tighter constraints
2. Accept this change but note the pattern for next time

## Using Git to Verify Scope

After AI makes changes, always check:

```bash
git diff --stat
```

This shows which files changed and how much. If you asked for a one-line change and see 10 files modified, something went wrong.

```bash
git diff
```

This shows exactly what changed. Look for:
- Changes outside your requested scope
- Renamed identifiers
- Reformatted code
- Additional features

If you see unexpected changes:

```bash
git restore .
```

Start over with tighter constraints.

## Template for Surgical Changes

```
## Change Request
[Exactly what needs to change]

## Location
File: [exact file]
Function/Line: [exact location]

## Constraints
- ONLY modify [specific thing]
- Do NOT change [related things that should stay same]
- Do NOT rename, refactor, or improve other code
- If you think other changes are needed, tell me but don't make them

## Verification
After change, [exactly what should be different]
```

Example:

```
## Change Request
Update validation error message to include field name

## Location
File: server/services/userService.ts
Function: validateUserInput

## Constraints
- ONLY modify the error message strings
- Do NOT change validation logic
- Do NOT rename the function or variables
- Do NOT modify error handling approach

## Verification
After change, validation errors should say "Invalid email format" instead of "Invalid input"
```

## When Broad Changes Are Okay

Not every change needs tight constraints. Broad AI assistance works for:

- New features (AI can design the structure)
- Initial implementations (no existing code to break)
- Exploratory work (you'll review everything anyway)
- Refactoring tasks (where broad changes are the point)

Use tight constraints for:
- Bug fixes in existing code
- Small changes to working systems
- Changes near complex logic
- Anything in production-critical paths

## The Balance

There's a tension here. Too tight and you're micromanaging. Too loose and you're cleaning up surprises.

My rule: the more important the existing code, the tighter the constraints.

For a throwaway script, let AI do whatever. For the payment processing service, constrain every line.

## Tomorrow

You've learned to constrain AI's changes. But sometimes AI goes beyond unwanted changes. It starts hallucinating. Generating functions that don't exist. Referencing APIs that aren't real. Confidently producing nonsense.

Tomorrow I'll show you how to spot hallucination and stop it before it breaks your code.

---

## Try This Today

Next time you ask AI for a small change:

1. Add "Make this exact change and NOTHING else"
2. Run `git diff --stat` after to see what changed
3. Note if AI stayed in scope or drifted
4. If it drifted, refine your constraints and try again

Build the habit of explicit constraints. It takes a few extra words but saves significant review and rollback time.

AI wants to help. Your job is to define exactly what "help" means for each request.
