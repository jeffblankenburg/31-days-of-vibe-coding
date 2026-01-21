---
layout: post
title: "Day 22: Production Debugging: When It's On Fire"
date: 2026-01-22
author: Jeff Blankenburg
excerpt: "Production is broken. Users are complaining. You can't add console.log. Learn to use AI for incident response when time matters."
---

Picture the worst debugging scenario. Something's broken in production. You can't add console.log and redeploy. You can't attach a debugger. You can't reproduce it locally because you don't know what's causing it.

All you have is what's already there: logs, error messages, metrics if you were smart enough to add them.

This is where AI earns its keep. Not because it has magic access to your systems, but because it's good at exactly the thing you need: analyzing information and finding patterns. You paste in logs, stack traces, error messages. AI spots the anomaly you'd miss after staring at the screen for an hour.

## The Incident Response Prompt

When things are on fire, start here:

```
Production incident in progress. Help me triage.

Error message:
[paste the error]

What I'm seeing:
[describe symptoms - errors, timeouts, user reports]

What changed recently:
[recent deploys, config changes, traffic patterns]

System overview:
[relevant architecture - what talks to what]

Help me:
1. What's the most likely cause?
2. What should I check first?
3. What's the fastest way to confirm?
4. What's the quickest mitigation (even if not a fix)?
```

Keep it short. You're in a hurry.

## Stack Trace Analysis Under Pressure

When you have a stack trace:

```
Quick analysis of this production error:

[paste stack trace]

Tell me:
1. What's the actual error (one sentence)?
2. Is this our code or a library?
3. What file and line to look at first?
4. Most likely cause?
```

No elaborate explanations needed. You need direction, not education.

## Log Pattern Recognition

When you have logs but can't see the pattern:

```
Find the pattern in these production logs.

These are from the last hour. Something is wrong.

[paste logs]

What I'm looking for:
- When did the problem start?
- What's different before vs after?
- Any correlation with specific users, endpoints, or data?
- What's the error rate pattern?
```

AI can spot patterns in logs faster than scrolling through them manually.

## The Correlation Prompt

When multiple things seem broken:

```
Multiple things are failing. Help me find the root cause.

Symptom 1: [describe]
Symptom 2: [describe]
Symptom 3: [describe]

Started at: [time]
Recent changes: [deploys, configs]

What single cause could explain all of these?
What should I check to confirm?
```

Often multiple symptoms have one root cause. AI helps find the connection.

## Quick Mitigation Strategies

When you need to stop the bleeding:

```
Production is broken. I need mitigation options.

The problem: [describe]
The impact: [who's affected, how badly]
Rollback possible: [yes/no/partial]

Give me mitigation options ranked by:
1. Speed to implement
2. Risk of making things worse
3. Effectiveness

I need to stop the bleeding, then I can fix properly.
```

Sometimes the right answer is a workaround that buys you time.

## Database Issue Diagnosis

Database problems need specific analysis:

```
Production database issue.

Symptoms:
[slow queries / connection errors / deadlocks / ???]

Current metrics:
- Connections: [number]
- Active queries: [number]
- Slow query log: [paste if relevant]

Recent database changes:
[migrations, new queries, data growth]

What's the likely cause?
What query would show me the problem?
What's the quick fix?
```

## The Rollback Decision

When you're not sure whether to rollback:

```
Deciding whether to rollback.

Current situation: [describe the problem]
Last deploy: [what changed, when]
Rollback would: [describe what gets reverted]
Rollback risks: [data migration issues, etc.]

Help me decide:
1. Is the problem likely caused by the deploy?
2. What would rollback fix?
3. What would rollback break?
4. Should I rollback or fix forward?
```

## Post-Incident Analysis Prompt

After the fire is out:

```
We had an incident. Help me analyze it.

What happened:
[timeline of events]

Impact:
[duration, users affected, severity]

Root cause:
[what we found]

Help me create:
1. Timeline of events with gaps identified
2. What monitoring would have caught this sooner
3. What would have prevented this
4. Action items for follow-up
```

## The "I Have No Idea" Prompt

Sometimes you're truly stuck:

```
I'm stuck. Production is broken and I don't know why.

What I see: [symptoms]
What I've checked: [what you ruled out]
What I've tried: [attempted fixes]

I'm out of ideas. Help me:
1. What haven't I checked?
2. What assumptions might be wrong?
3. What's a completely different angle?
```

Admitting you're stuck is the first step to getting unstuck.

## Information Gathering Under Pressure

When you need to collect more data quickly:

```
I need more information to debug this. Generate the commands.

System: [Linux, AWS, Kubernetes, etc.]
Problem: [what's failing]

Generate commands to check:
1. System resources (CPU, memory, disk, network)
2. Process status
3. Recent logs
4. Database connections
5. Network connectivity
6. Service health

Just the commands, I'll run them.
```

## The Customer Impact Prompt

When you need to communicate:

```
Help me write a status update for customers.

What happened: [technical description]
Current status: [ongoing / resolved / monitoring]
Impact: [what customers experienced]
ETA: [if known]

Write a customer-facing update that is:
- Honest without being alarming
- Non-technical but not condescending
- Includes what we're doing about it
- Includes when we'll update next
```

Communication matters during incidents. AI can help you write clearly when you're stressed.

## Building Your Incident Playbook

After enough incidents, you have patterns. Document them:

```
I want to create an incident response playbook.

Common incident types we see:
1. [type 1]
2. [type 2]
3. [type 3]

For each type, help me create:
- Symptoms to look for
- First things to check
- Common causes
- Mitigation options
- Resolution steps
- Verification steps
```

Then when an incident happens, you have a starting point.

## What AI Can't Do in Incidents

AI can't:
- Access your systems
- See your actual metrics
- Know your specific architecture
- Make decisions for you
- Tell you what changed recently
- Know your organizational context

You still need to:
- Gather the information
- Run the commands
- Make the judgment calls
- Communicate with stakeholders
- Execute the fixes

AI is your thinking partner, not your incident commander.

## The Incident Checklist

Keep this handy:

```
□ Acknowledge the incident
□ Assess severity and impact
□ Notify stakeholders
□ Check recent changes
□ Gather logs and errors
□ Form hypothesis
□ Test hypothesis
□ Mitigate or fix
□ Verify resolution
□ Communicate resolution
□ Schedule post-mortem
```

## Tomorrow

Incidents often come from edge cases you didn't anticipate. Tomorrow I'll show you how to use AI to find edge cases before they find you. Proactive problem-finding instead of reactive firefighting.

---

## Try This Today

Think about your last production incident.

1. What information did you have?
2. What questions did you need answered?
3. How would you have prompted AI?

Having prompts ready before incidents happen means you can move faster when they do.
