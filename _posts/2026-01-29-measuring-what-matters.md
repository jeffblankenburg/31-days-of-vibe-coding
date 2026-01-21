---
layout: post
title: "Day 29: Measuring What Matters: Is AI Actually Helping?"
date: 2026-01-29
author: Jeff Blankenburg
excerpt: "You're using AI. You feel faster. But are you? Learn what to measure to know if AI is actually improving your output."
---

I felt faster.

Prompts flying. Code generating. Features shipping. The vibe was strong.

Then I looked at my actual output. Features shipped per week. Bugs in production. Time from issue to deployment. The numbers told a different story than my feelings.

I wasn't faster. I was busier. More code was being written. But the important metrics were about the same.

That's when I learned: feeling productive and being productive are different things. If you want to know whether AI is actually helping, you need to measure.

## What Not to Measure

Some metrics are useless or misleading:

**Lines of code:** More code isn't better. AI generates verbose code. You might ship more lines and less value.

**Prompts per day:** Using AI more doesn't mean accomplishing more. You could be prompting in circles.

**Features started:** Starting is easy. Finishing is what matters.

**Time in AI tools:** Time spent doesn't equal value produced.

These metrics make you feel productive without telling you if you're productive.

## What to Measure

Focus on outcomes, not activities:

### Cycle Time

Time from starting a task to deploying it.

```
Cycle time = Deploy timestamp - Start timestamp
```

If AI is helping, cycle time should decrease. Track this per feature or per issue.

### Throughput

Features or issues completed per week.

```
Throughput = Completed items / Time period
```

If AI is helping, throughput should increase while quality stays constant.

### Quality Metrics

Bugs in AI-generated code vs. manually written code.

Track:
- Bugs reported per feature
- Time to find bugs (in testing vs. production)
- Severity of bugs
- Rework needed after initial implementation

If AI code has more bugs, you're not actually saving time.

### Time Distribution

Where does your time go?

Categories:
- Planning and design
- Writing prompts
- Reviewing AI output
- Fixing AI mistakes
- Manual implementation
- Testing
- Debugging
- Deployment

If you spend 2 hours prompting and reviewing to save 1 hour of coding, that's a net loss.

## Setting Up Tracking

You don't need complex tooling. Start simple:

### Option 1: GitHub Labels

Label issues with how they were built:
- `ai-assisted`
- `manual`
- `ai-heavy`

Compare metrics between labels.

### Option 2: Time Tracking

Track time per task with notes on AI usage. At the end of each week, review:
- What took longest?
- Where did AI help?
- Where did AI hurt?

### Option 3: Simple Spreadsheet

```
| Feature | Start | Deploy | AI? | Bugs | Rework? |
|---------|-------|--------|-----|------|---------|
| Wishlist | 1/15 | 1/17  | Yes | 1    | No      |
| Search   | 1/18 | 1/25  | Yes | 3    | Yes     |
| Profile  | 1/26 | 1/27  | No  | 0    | No      |
```

Patterns emerge quickly.

## Honest Assessment Questions

Ask yourself weekly:

1. **What did I ship this week?** Not start. Ship.

2. **What took longer than expected?** Was AI a factor?

3. **What bugs did I introduce?** How many were in AI code?

4. **What did I waste time on?** Prompting in circles? Fixing AI mistakes?

5. **What would I do differently?** With hindsight, would AI have been the right choice?

## The AI Overhead Trap

AI has overhead:
- Writing prompts takes time
- Reviewing output takes time
- Fixing mistakes takes time
- Context switching takes time

For simple tasks, this overhead can exceed the benefit.

```
AI benefit = Time saved - (Prompt time + Review time + Fix time)
```

If the benefit is negative, AI slowed you down.

## Where AI Actually Helps

In my tracking, AI helps most with:

**Boilerplate generation:** Tests, CRUD endpoints, similar components. High repetition, low complexity.

**Code review:** Finding issues I'd miss. Consistent multi-pass review.

**Exploration:** "How would I approach this?" Planning before coding.

**Edge cases:** Thinking of scenarios I wouldn't consider.

**Documentation:** Explaining code, writing docs, creating runbooks.

## Where AI Hurts

AI hurts most with:

**Novel problems:** Unique architecture, unusual requirements. AI has no patterns to draw from.

**Subtle bugs:** AI confidently generates code with subtle issues. Review time exceeds benefit.

**Over-engineering:** AI adds complexity when simplicity would work. Then I maintain the complexity.

**Context-heavy work:** When you need to understand 20 files to make a small change. AI's understanding is shallow.

## The Comparison Test

Try this experiment:

1. Pick two similar features
2. Build one with heavy AI assistance
3. Build one with minimal AI
4. Compare: time, quality, bugs, rework

What you find might surprise you. Sometimes the manual approach is faster for your context.

## Tracking Template

Weekly review template:

```markdown
# Week of [date]

## Shipped
- [feature 1] - AI heavy/light/none - [time] - [bugs]
- [feature 2] - ...

## Time Distribution
- Planning: X hours
- Prompting: X hours
- Reviewing AI: X hours
- Fixing AI: X hours
- Manual coding: X hours
- Testing: X hours
- Other: X hours

## What Worked
- [what AI helped with]

## What Didn't Work
- [where AI hurt]

## Next Week
- [what to do differently]
```

## The Honest Truth

AI doesn't make everyone faster on everything.

It makes some people faster on some things. The only way to know if it's helping you is to measure.

Track your outcomes. Be honest about what you find. Adjust your usage based on evidence, not vibes.

## Tomorrow

Fast is good. Sustainable is better. Tomorrow I'll cover managing technical debt when you're shipping fast with AI. How to stay fast without drowning in accumulated mess.

---

## Try This Today

1. Pick a feature you built with AI recently
2. Estimate the time breakdown: prompting, reviewing, fixing, manual work
3. Would it have been faster without AI?

Be honest. The answer might be yes. That's useful information. It tells you where to use AI and where not to.

The goal isn't to use AI. The goal is to ship good software. AI is one tool. Measure whether it's actually helping.
