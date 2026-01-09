---
layout: post
title: "Day 19: AI as Code Reviewer"
date: 2026-01-19
author: Jeff Blankenburg
excerpt: "One review pass catches some issues. Multiple passes catch more. Learn to run AI through focused review passes that find what single reviews miss."
---

Code review is a single pass.

Someone looks at your code, leaves comments, you address them, done. One perspective, one set of concerns, one opportunity to catch problems.

The problem with single-pass review: different people catch different things. The security expert sees vulnerabilities. The performance person sees bottlenecks. The maintainability person sees code smells. One reviewer can't hold all these lenses simultaneously.

AI can do multiple passes. Each pass with a different focus. Security pass, then performance pass, then maintainability pass, then edge cases. Four perspectives instead of one. More issues caught before production.

## The Multi-Pass System

Here's how I structure AI code reviews:

**Pass 1: Security**
Does this code create vulnerabilities?

**Pass 2: Performance**
Will this code be fast enough at scale?

**Pass 3: Maintainability**
Will future developers understand this code?

**Pass 4: Edge Cases**
What inputs will break this code?

Each pass has a specific prompt. Each finds different issues. Together, they're more thorough than any single review.

## Pass 1: Security Review

```
You are a senior security engineer reviewing this code for vulnerabilities.

Check for:
1. Injection vulnerabilities (SQL, NoSQL, command, XSS)
2. Authentication issues (weak checks, bypassable auth)
3. Authorization issues (accessing others' data, privilege escalation)
4. Data exposure (secrets in code, PII in logs, sensitive data in responses)
5. Insecure dependencies (known vulnerable packages)
6. Missing security headers or configurations

For each issue:
- Severity: Critical / High / Medium / Low
- Line number
- The vulnerability
- How to exploit it
- Fix with code example

If no issues found, confirm what security measures are correctly implemented.

Code:
[paste code]
```

## Pass 2: Performance Review

```
You are a senior performance engineer reviewing this code for efficiency.

Check for:
1. N+1 query patterns
2. Missing pagination or limits
3. Unnecessary data fetching
4. Missing caching opportunities
5. Blocking operations that should be async
6. O(n²) algorithms that could be O(n)
7. Memory leaks or unbounded growth
8. Missing database indexes

For each issue:
- Impact: Critical / High / Medium / Low
- Line number
- Current behavior under load
- Expected behavior after fix
- Fix with code example

Assume 10,000 concurrent users and tables with millions of rows.

Code:
[paste code]
```

## Pass 3: Maintainability Review

```
You are a senior engineer reviewing this code for maintainability.

Check for:
1. Code clarity - Is intent obvious? Would a new developer understand this?
2. Naming - Are functions and variables named well?
3. Structure - Is the code organized logically?
4. Duplication - Is code repeated that should be abstracted?
5. Complexity - Are functions too long? Too many branches?
6. Documentation - Are complex parts explained?
7. Error handling - Are errors handled consistently?
8. Testing - Is this code testable? Are there tests?

For each issue:
- Severity: High / Medium / Low
- Line number
- The problem
- Why it matters
- Suggested improvement

Focus on real issues, not style preferences.

Code:
[paste code]
```

## Pass 4: Edge Case Review

```
You are a QA engineer looking for edge cases that will break this code.

For each function, consider:
1. What happens with null/undefined inputs?
2. What happens with empty strings, arrays, objects?
3. What happens with very large inputs?
4. What happens with negative numbers?
5. What happens with special characters or Unicode?
6. What happens with concurrent access?
7. What happens with network failures?
8. What happens with database errors?

For each potential edge case:
- The input that breaks it
- What goes wrong
- Fix with code example

Be adversarial. Try to break this code.

Code:
[paste code]
```

## Consolidating Feedback

After four passes, you have a lot of feedback. Consolidate it:

```
I ran four review passes on this code. Here's the feedback:

Security pass:
[paste security feedback]

Performance pass:
[paste performance feedback]

Maintainability pass:
[paste maintainability feedback]

Edge case pass:
[paste edge case feedback]

Consolidate this feedback:
1. Remove duplicates
2. Prioritize by impact
3. Group related issues
4. Create a prioritized list of changes

Output format:
## Critical (fix immediately)
## High (fix before merge)
## Medium (fix soon)
## Low (nice to have)
```

## A Real Multi-Pass Review

Here's code AI generated for user registration:

```typescript
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  const existingUser = await db.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json({ user, token });
});
```

**Security pass found:**
- Email existence exposed (timing attack + information disclosure)
- No password strength validation
- JWT token never expires
- Full user object returned (might include sensitive fields)
- No rate limiting (brute force registration)

**Performance pass found:**
- No issues at this scale

**Maintainability pass found:**
- Magic number 10 for bcrypt rounds should be constant
- No input validation before database operation
- Error handling doesn't log for observability

**Edge case pass found:**
- No validation on email format
- No validation on name (empty string accepted)
- Very long strings accepted (no length limits)
- Password can be empty string

Consolidated and prioritized:

**Critical:**
- Add rate limiting to prevent abuse
- Add JWT expiration
- Don't reveal if email exists

**High:**
- Validate password strength
- Validate email format
- Limit returned user fields

**Medium:**
- Extract bcrypt rounds to constant
- Add input length limits
- Add observability logging

**Low:**
- Add name validation

One review pass might catch 3-4 of these. Four passes caught 12.

## Review by Persona

Sometimes you want specific expertise:

```
Review this code as if you were:

1. A junior developer joining the team
   - What would confuse you?
   - What would you need explained?

2. The on-call engineer at 3am
   - Is this debuggable?
   - Are error messages helpful?
   - Can you trace what happened?

3. A developer maintaining this in 2 years
   - Will this make sense without context?
   - What implicit knowledge is required?
   - What will be painful to change?

For each persona, list the top 3 concerns.
```

## The Pre-Commit Review

Quick review before committing:

```
Quick review before I commit this change.

Check for:
1. Any obvious bugs?
2. Any security issues?
3. Any performance problems?
4. Anything that would embarrass me in code review?

Be brief. Just flag issues, don't explain in detail.

Change:
[paste diff]
```

## The PR Description Generator

AI can also write your PR description based on code review:

```
Based on this code change, write a PR description.

Include:
1. Summary: What does this change do?
2. Why: What problem does it solve?
3. How: Brief technical approach
4. Testing: How was this tested?
5. Risks: What could go wrong?
6. Rollback: How to revert if needed

Keep it concise. Focus on what reviewers need to know.

Change:
[paste diff]
```

## When AI Review Falls Short

AI reviews aren't perfect:

**Business logic:** AI doesn't know your business rules. It can't tell if the logic is correct for your domain.

**Context:** AI doesn't know why you made certain decisions. It might flag something as wrong that's intentionally that way.

**Style debates:** AI will have opinions about formatting, naming, structure. Not all of them match your team's style.

**False positives:** AI sometimes flags things that aren't actually problems.

Use AI review as a first pass, not the only pass. It catches the obvious stuff so human reviewers can focus on business logic and context.

## Building Review Into Your Workflow

Don't save review for the end. Review as you go:

```
Before implementing: Review the plan for architectural issues
After each file: Quick security and performance scan
Before PR: Full multi-pass review
During PR: Human review focuses on business logic
```

AI review is cheap. Run it often.

## The Review Checklist

Before any code goes to PR:

```
□ Security pass completed, critical issues fixed
□ Performance pass completed, N+1 queries eliminated
□ Maintainability pass completed, obvious issues addressed
□ Edge cases identified and handled
□ Tests written for flagged scenarios
□ All critical and high issues addressed
□ Medium issues tracked for follow-up
```

## Tomorrow

Code reviewed. Tests written. But there's a bug. Where is it?

Tomorrow I'll show you how to use AI as a debugger. Systematic bug hunting that narrows down the problem faster than printf debugging.

---

## Try This Today

1. Take a piece of code you're about to commit
2. Run the security pass
3. Run the edge case pass
4. See what you missed

Two passes will likely find something one pass missed. That's the point. More lenses, more coverage, fewer bugs in production.
