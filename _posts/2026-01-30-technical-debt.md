---
layout: post
title: "Day 30: Managing Technical Debt When Shipping Fast"
date: 2026-01-30
author: Jeff Blankenburg
excerpt: "AI helps you ship fast. Fast creates debt. Learn to manage debt without drowning in it."
---

The code worked. The code was a mess.

AI had generated features at unprecedented speed. Two months in, I had a product. I also had a codebase that scared me. Inconsistent patterns. Functions doing too much. Tests that passed but didn't actually test anything. Comments that lied about what the code did.

I'd traded velocity for debt. Now the debt was coming due.

This is the dark side of vibe coding. Speed is addictive. Debt accumulates silently. Then one day you try to add a simple feature and it takes three days because everything is tangled.

Managing debt isn't about not having debt. It's about having the right amount of debt and paying it down strategically.

## Why AI Code Accumulates Debt Faster

AI code has specific debt patterns:

**Inconsistency:** Each generation might use slightly different patterns. Small inconsistencies compound into chaos.

**Over-engineering:** AI often generates more than you need. That extra code is debt you maintain forever.

**Shallow testing:** AI writes tests that pass, but don't actually verify behavior. You think you have coverage. You don't.

**Missing context:** AI doesn't know why past decisions were made. It might undo intentional choices.

**Copy-paste sprawl:** It's easy to generate similar code instead of abstracting. Duplication is debt.

## The Debt Inventory Prompt

Start by knowing what you have:

```
Analyze this codebase for technical debt.

Categories:
1. Code duplication - similar code that should be abstracted
2. Inconsistent patterns - same thing done different ways
3. Missing tests - code without adequate coverage
4. Missing docs - complex code without explanation
5. Dead code - code that's never executed
6. Outdated dependencies - libraries that need updates
7. Performance debt - known slow paths not optimized
8. Security debt - known vulnerabilities not addressed

For each item:
- Location
- Severity (blocking / painful / annoying)
- Effort to fix (hours)
- Risk if not fixed
```

## Prioritizing Debt

Not all debt is equal. Prioritize by:

**Impact on velocity:** Does this debt slow down every feature? Fix it.

**Risk:** Could this debt cause production issues? Fix it soon.

**Compounding:** Will this debt get worse over time? Address before it spreads.

**Effort:** How hard is it to fix? Sometimes quick wins are worth doing.

```
Priority = (Impact × Risk × Compounding) / Effort
```

High impact, high risk, compounding, low effort = fix immediately.
Low impact, low risk, isolated, high effort = maybe never.

## The 20% Rule

Reserve 20% of your time for debt reduction.

Every week, every sprint, every cycle: 20% goes to making the codebase better.

- 4 days on features, 1 day on debt
- 4 features, 1 cleanup task
- Every PR improves one thing beyond its scope

This isn't optional. It's investment. Skip it, and velocity drops over time.

## AI-Assisted Debt Paydown

Use AI to fix what AI created:

### Pattern Consolidation

```
I have the same pattern implemented multiple ways.

Example 1: [paste code]
Example 2: [paste code]
Example 3: [paste code]

Create a single abstraction that handles all these cases.
Then show me how to refactor each usage.
```

### Test Improvement

```
These tests pass but I don't trust them.

Tests: [paste tests]
Code they test: [paste code]

Identify:
1. What behaviors aren't actually tested?
2. What edge cases are missed?
3. What assertions are too weak?

Generate improved tests that would catch real bugs.
```

### Documentation Generation

```
This code is complex and undocumented.

Code: [paste code]

Generate:
1. High-level explanation of what this does
2. Inline comments for non-obvious parts
3. Examples of how to use it
4. Known limitations or gotchas
```

## The Debt Log

Track debt explicitly:

```markdown
# Technical Debt Log

## Critical (fix this sprint)
- [ ] User auth has no rate limiting (security risk)
- [ ] Card search uses N+1 queries (performance)

## High (fix this month)
- [ ] Three different error handling patterns
- [ ] Tests mock at wrong level, don't catch bugs

## Medium (fix this quarter)
- [ ] Duplicate validation logic in 5 places
- [ ] Old migration files never cleaned up

## Low (fix when convenient)
- [ ] Inconsistent naming in legacy module
- [ ] Console.logs left in non-critical paths

## Accepted (won't fix)
- [ ] Old admin panel uses deprecated patterns (replacing soon)
```

Review this log weekly. Move items up as they become urgent.

## Prevention Strategies

Better to not create debt than to pay it down:

### Pre-Generation Review

Before asking AI to generate significant code:

```
I'm about to generate code for [feature].

Before I do, tell me:
1. What existing patterns should this follow?
2. What abstractions already exist that I should use?
3. What could I generate that would create debt?
4. What should I specify to prevent mess?
```

### Post-Generation Cleanup

After AI generates code, before committing:

```
Review this AI-generated code for debt indicators:

[paste code]

Check for:
- Duplicates what exists elsewhere?
- Inconsistent with established patterns?
- Over-engineered for the need?
- Missing tests for important paths?
- Hardcoded values that should be config?

What should be cleaned up before committing?
```

### The PR Checklist

Before every merge:

```
□ Follows existing patterns (or intentionally changes them)
□ No new duplication
□ Tests cover actual behavior
□ No unnecessary complexity
□ No new warnings or linting issues
□ Documentation updated if needed
□ One thing improved beyond the feature
```

## Debt Sprints

Sometimes you need focused cleanup:

Every quarter, schedule a debt sprint. One week focused entirely on debt reduction.

- No new features
- Only cleanup, consolidation, testing, documentation
- Measure: lines deleted, patterns consolidated, test coverage increased

One week of cleanup buys months of velocity.

## The Strangler Pattern for Legacy AI Code

When you have AI-generated code that needs major improvement:

1. Don't rewrite all at once
2. Build new code correctly alongside old
3. Route new features to new code
4. Gradually migrate old features
5. Delete old code when nothing uses it

AI can help:

```
I have legacy code that needs replacement.

Old code: [paste]
What it does: [describe]

Generate a new, cleaner implementation.
Show me how to run both in parallel during migration.
```

## Signs You Have Too Much Debt

- Features take longer and longer
- Every change breaks something unrelated
- New developers can't understand the code
- You avoid touching certain areas
- Tests pass but production breaks
- Simple bugs take hours to fix

When you see these signs, stop features and pay down debt.

## Tomorrow

Final day. You've learned tactics for AI-assisted development. Tomorrow we'll build your personal playbook: the practices you'll keep, the workflow you'll use, the principles that guide your vibe coding.

---

## Try This Today

1. Pick one area of your codebase that scares you
2. Run the debt inventory prompt on it
3. Fix one thing. Just one.

Small, consistent debt payment beats occasional massive rewrites. Start today. Continue tomorrow. In a month, the scary area is manageable.

Debt is normal. Unmanaged debt is the problem.
