---
layout: post
title: "Day 21: AI as Architect"
date: 2026-01-21
author: Jeff Blankenburg
excerpt: "You're about to build something. Is your approach right? Learn to use AI to evaluate architectural decisions before you're too deep to change them."
---

There's a moment before you start building where everything is still possible. You could structure it this way or that way. Use this pattern or that pattern. Once you start, you're committed. The architecture solidifies like concrete.

AI makes implementation so fast that it's tempting to skip this moment. Just start building, see what happens. But the architecture decisions you make (or don't make) in that moment will haunt you for the life of the project.

Here's what I've started doing: before building anything significant, I describe my approach to AI and ask it to poke holes. What could go wrong? What will be painful to change later? What am I not thinking about?

AI won't make the decision for you. But it will stress-test your thinking before you pour the concrete.

## Why Architecture Decisions Matter More With AI

AI makes implementation fast. That's both the opportunity and the danger.

When implementation was slow, architecture decisions got scrutiny. Committing to an approach meant weeks of work. You thought carefully before starting.

When implementation takes hours, you might not think carefully at all. Just build it, see if it works. But the architectural problems are still there. You just hit them faster.

Speed of implementation makes architecture review more important, not less.

## The Architecture Review Prompt

Before starting anything significant:

```
I'm planning to build this feature. Review my approach before I start.

Feature: [describe what you're building]

My proposed approach:
[describe how you plan to build it]

Evaluate:
1. What are the strengths of this approach?
2. What could go wrong?
3. What will be hard to change later?
4. What am I not thinking about?
5. What are 2-3 alternative approaches with tradeoffs?

Assume this will be in production for 5 years and maintained by developers
who didn't build it.
```

## A Real Architecture Review

I was planning to add a notifications system. Here was my initial approach:

```
Feature: User notifications for card activity

My proposed approach:
- Add a notifications table
- When something happens, write a notification row
- API endpoint returns notifications for a user
- Frontend polls every 30 seconds
```

AI's review:

**Strengths:**
- Simple to implement
- Easy to understand
- Works for low scale

**What could go wrong:**
- Polling every 30 seconds from 10,000 users = 333 requests/second just for notifications
- Users with 10,000 notifications will have slow queries
- No way to push urgent notifications
- Polling even when no new notifications wastes resources

**Hard to change later:**
- If you later need real-time, WebSocket integration will require significant frontend changes
- If you need to categorize or filter notifications, schema changes affect all existing data
- No notification preferences means no way to respect user choices

**Not thinking about:**
- Notification cleanup (do you keep them forever?)
- Batch notifications (10 events in a minute = 10 notifications or 1?)
- Cross-device sync (read on phone, still shows on web?)
- Email/push integration (this architecture doesn't support it)

**Alternative approaches:**

1. **Event-driven with WebSocket**
   - Events published to a queue
   - Notification service consumes events, delivers via WebSocket
   - Tradeoff: More complex, but real-time and scalable

2. **Hybrid polling with push for urgent**
   - Poll for routine notifications
   - WebSocket channel for urgent ones
   - Tradeoff: Two delivery mechanisms to maintain

3. **Third-party service (Firebase, Pusher)**
   - Outsource the delivery infrastructure
   - Tradeoff: Cost, dependency, but proven at scale

The review didn't tell me what to do. It showed me what I hadn't considered. I still chose polling for MVP, but I designed the schema to support future migration to events.

## The Tradeoff Analysis Prompt

When you're deciding between approaches:

```
Help me decide between these approaches.

The problem: [what you're trying to solve]

Option A: [describe first approach]
Option B: [describe second approach]
Option C: [describe third approach]

For each option, analyze:
1. Implementation complexity
2. Performance characteristics
3. Maintainability over time
4. Scalability limits
5. What breaks first under load?
6. What's hardest to change?

Then recommend which option for:
- MVP with 100 users
- Scale to 10,000 users
- Scale to 1,000,000 users
```

## The "What Could Go Wrong" Prompt

For risk analysis:

```
I'm about to implement this. What could go wrong?

The feature: [describe it]
The approach: [describe your plan]
The constraints: [timeline, team, tech stack]

List everything that could go wrong:
1. Technical risks
2. Operational risks
3. Security risks
4. Performance risks
5. Integration risks
6. User experience risks

For each risk:
- Likelihood (high/medium/low)
- Impact (high/medium/low)
- Mitigation strategy
```

## The Scalability Prompt

When you need to think about growth:

```
Analyze the scalability of this architecture.

Current scale: [users, requests, data volume]
Target scale: [where you expect to be in 1-2 years]

Architecture:
[describe your system]

Identify:
1. What breaks first as you scale?
2. What's the scaling limit of each component?
3. What would need to change for 10x scale?
4. What would need to change for 100x scale?
5. What should you build differently now to make scaling easier?
```

## The Maintenance Prompt

For long-term thinking:

```
I'm building this feature. In 2 years, a developer who didn't build it
will need to modify it.

Feature: [describe it]
Current design: [describe your approach]

What will make maintenance hard?
1. What assumptions are implicit but not documented?
2. What will be confusing without context?
3. What coupling will make changes risky?
4. What will break in unexpected places?

What should I do differently now to make maintenance easier?
```

## The Integration Analysis

When your feature touches other systems:

```
Analyze how this feature integrates with existing systems.

New feature: [describe it]

Existing systems it will touch:
[list them]

For each integration:
1. What data flows between them?
2. What happens if the other system is down?
3. What happens if the other system is slow?
4. What happens if the other system returns unexpected data?
5. Are there version compatibility concerns?
6. Who owns the contract between them?
```

## The Migration Strategy Prompt

When you're changing something that exists:

```
I need to migrate from the old system to the new system.

Old system: [describe current state]
New system: [describe target state]
Constraints: [uptime requirements, data volume, timeline]

Design a migration strategy:
1. Can we do this without downtime?
2. Can we run both systems in parallel?
3. How do we validate data integrity?
4. What's the rollback plan?
5. What's the sequence of steps?
6. What could go wrong at each step?
```

## When to Ask for Architecture Help

Not every feature needs architecture review. Ask for help when:

**High impact:** The feature is core to your product
**High complexity:** Multiple components or services involved
**High uncertainty:** You're not sure the approach is right
**High cost of change:** Changing later would be very expensive
**Long lifespan:** This will be in production for years

Skip it for small, isolated, easily-changed features.

## Architecture Review Checklist

Before starting significant work:

```
□ Problem clearly defined
□ Approach documented
□ Alternatives considered
□ Tradeoffs understood
□ Scalability analyzed
□ Failure modes identified
□ Migration path exists
□ Maintenance burden acceptable
□ Integration points mapped
□ Rollback plan exists
```

## The Humbling Part

AI often finds things I miss. Not because AI is smarter, but because AI has no ego.

When I design something, I want it to be right. I'm biased toward my own approach. AI doesn't care. It just analyzes the tradeoffs.

That objectivity is valuable. It's like having a team member who will always tell you the uncomfortable truth about your architecture.

## Tomorrow

Architecture reviewed. Approach decided. But what happens when it's 2am and production is on fire?

Tomorrow I'll cover production debugging: using AI when you're under pressure and things are broken.

---

## Try This Today

1. Think of a feature you're planning to build
2. Write up your proposed approach
3. Run the architecture review prompt
4. See what you hadn't considered

The best time for architecture review is before you write code. The second best time is before you write more code.
