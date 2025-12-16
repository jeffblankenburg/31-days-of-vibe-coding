---
layout: post
title: "Day 12: The Common AI Mistakes File"
date: 2026-01-12
author: Jeff Blankenburg
excerpt: "AI makes the same mistakes over and over. Document them once, reference them in prompts, stop repeating corrections. Here's how to build your mistakes file."
---

Third time this week.

I asked Claude to add a new API endpoint. It generated the route, the service method, the tests. Everything looked good.

Then I noticed: no input validation. Again.

I'd corrected this same mistake on Monday. And Wednesday. Each time, I explained why validation matters at API boundaries. Each time, Claude apologized and fixed it. Each time, the next conversation started fresh and Claude made the same mistake.

AI doesn't remember across conversations. Your corrections are lost.

So I started keeping a file. Every time AI made a mistake I'd corrected before, I added it to the file. Now I reference the file in prompts. Claude reads it, sees the patterns to avoid, and stops making those mistakes.

I call it `common-ai-mistakes.md`.

## Why This Works

AI models are trained on millions of codebases. Some of those codebases have patterns you don't want. When AI generates code, it draws on all that training. Without guidance, it might produce code that's technically correct but wrong for your project.

Your agent configuration (CLAUDE.md) tells AI what to do. Your mistakes file tells AI what not to do. Both matter.

The mistakes file is especially useful because it's specific to your project. These aren't generic mistakes. They're mistakes that AI keeps making in your codebase, with your patterns, on your problems.

## Starting Your Mistakes File

Create `common-ai-mistakes.md` in your project root. Start with mistakes you've already encountered. Think about the last few times you corrected AI doing the same thing twice. Those go in the file.

The format matters. AI learns from contrast. For each mistake, include:

```markdown
### ❌ [Clear title of what's wrong]
[One sentence on why AI does this]

**Wrong:** [brief code or description]
**Right:** [brief code or description]

[One sentence on why this matters in your project]
```

That's it. Wrong pattern, right pattern, brief context. AI understands this format instantly.

Here's what a real entry looks like:

```markdown
### ❌ Missing Input Validation on Routes
AI generates routes that pass request body directly to services.

**Wrong:** Routes that call services without validation middleware
**Right:** Every route uses validateRequest(schema) before the handler

We've had production incidents from malformed input. Validate at the boundary.
```

Notice I'm not showing full code blocks with implementations. The AI doesn't need to see a complete route handler. It needs to know: "validate before handling." That's enough.

## Referencing Your Mistakes File

The file exists. Now AI needs to read it. You have options.

**Explicit reference in your prompt:**

```
Generate a new CardTradeService.

Before writing code, read common-ai-mistakes.md and avoid those patterns.

Requirements:
- Trade offer creation
- Trade acceptance/rejection
- Trade history
```

This works, but you have to remember to include it every time.

**Reference specific sections when relevant:**

```
Add an endpoint for listing trades.

Refer to the "API Routes" section of common-ai-mistakes.md.
```

Targeted references work better than "read everything" for focused tasks.

**Have AI confirm it read the file:**

```
Before starting, read common-ai-mistakes.md and tell me which
entries are relevant to this task.
```

This forces AI to acknowledge the patterns before generating code. If it summarizes the relevant entries, you know it's loaded that context.

**Include in CLAUDE.md for automatic loading:**

```markdown
## Required Reading
Before generating code, review:
- common-ai-mistakes.md - patterns to avoid
```

Now AI loads it automatically. No prompt gymnastics needed.

## Adding New Mistakes

When AI makes a mistake you've seen before:

1. Correct it in the current conversation
2. Add it to common-ai-mistakes.md
3. Include both the wrong and right patterns
4. Add brief context on why it matters

The file grows over time. That's fine. AI can read long files. What matters is that mistakes are documented.

Here's the workflow that works for me. When I correct AI, I ask myself: "Have I corrected this before?" If yes, I pause the current task and add the entry. Takes 30 seconds. Saves minutes of future corrections.

Sometimes I'll even tell AI to add the entry:

```
Add this mistake to common-ai-mistakes.md:
- Wrong: Creating new utility files for one-off helpers
- Right: Extend existing utils.ts files in the relevant directory
- Context: We consolidate utilities to avoid file sprawl
```

AI can maintain its own documentation. Let it help.

## What Belongs in This File

The mistakes file isn't a style guide or best practices document. It's about patterns where AI's training leads it astray in your specific project.

Good entries answer: "What does AI do by default that breaks our conventions?"

**Project conventions AI doesn't know:**
- Your team's error handling pattern
- Where files should go in your project structure
- Which libraries to use (and which to avoid)
- Your naming conventions
- How you structure tests

**Assumptions AI makes that are wrong for you:**
- Creating new files when you want existing files extended
- Using a popular pattern when you use an alternative
- Adding dependencies you've deliberately avoided
- Over-engineering simple features

**Things AI forgets even when told:**
- Your custom middleware or utilities
- Project-specific validation requirements
- Telemetry and logging standards

Notice these are about your project, not about coding in general. Don't fill the file with generic advice like "use meaningful variable names." Focus on what's specific to your codebase.

## Organizing Your File

Group mistakes by area so you can reference specific sections in prompts:

```
Generate tests for the trade flow.
Pay special attention to the "Tests" section of common-ai-mistakes.md.
```

Common categories: API/Routes, Services, Database, Types, Testing, Components. But use whatever fits your project.

## The Accumulation Effect

After a month, you'll have a comprehensive list of project-specific mistakes. Things like:

- This project's unique validation approach
- This project's error handling requirements
- This project's database patterns
- This project's testing conventions

AI calibrates to your project, not generic best practices.

## Sharing With Your Team

If your team uses AI, share the mistakes file:

1. Commit `common-ai-mistakes.md` to your repo
2. Encourage everyone to add mistakes they encounter
3. Review and consolidate periodically

Now the whole team benefits from everyone's corrections.

The shared file creates a feedback loop. Sarah catches AI generating raw SQL on Tuesday. She adds the entry. On Wednesday, when Marcus asks AI to query the database, AI reads the file and uses Prisma. Marcus never sees the problem Sarah already solved.

This works especially well for onboarding. New team members often work with AI to understand unfamiliar codebases. The mistakes file teaches AI (and the new developer) your conventions before they write code that violates them.

One caution: assign someone to maintain the file. Without ownership, entries accumulate without curation. Duplicates pile up. Outdated entries stay. Every few sprints, review the file. Merge similar entries. Remove ones that no longer apply. Keep it sharp.

## When to Update

Update your mistakes file when:

- AI makes a mistake you've corrected before
- You notice a pattern of similar mistakes
- Code review catches something AI should have known
- Team member reports a repeated issue

Don't wait. Add mistakes while they're fresh.

## Pitfalls to Avoid

The mistakes file can go wrong in a few ways.

**Too generic.** Entries like "write clean code" or "use good variable names" don't help. AI already knows generic best practices. Your file should capture what's specific to your project.

**Too detailed.** Long code examples make the file harder to scan. Brief descriptions work better. "Use validateRequest middleware" beats a 20-line code block showing exactly how.

**Too many entries.** If you have 50 entries, AI might not weight any of them strongly. Consolidate related items. Prune entries that no longer apply after refactors.

**Never referenced.** A file that exists but never gets loaded is worthless. Either reference it in prompts or add it to CLAUDE.md for automatic loading.

**Never updated.** If you corrected a mistake but didn't add it, you'll correct it again. Build the habit: fix it, then document it.

## Example: A Week of Updates

Monday: AI forgot validation. Added "Missing Input Validation" entry.

Tuesday: AI used raw SQL instead of Prisma. Added "Raw SQL vs Prisma" entry.

Wednesday: AI didn't handle empty arrays. Added to "Edge Cases" section.

Thursday: AI created a new utility file instead of extending existing one. Added "File Organization" entry.

Friday: AI used console.log. Already in mistakes file, but AI didn't read it. Updated prompt to explicitly reference the file.

By Friday, the file has grown. Next week's sessions are cleaner because the documented mistakes are avoided.

## Tomorrow

You have standards (CLAUDE.md), patterns (reference files), and anti-patterns (mistakes file). But sometimes AI still changes things you didn't ask for. You wanted a one-line fix, AI rewrote the function.

Tomorrow I'll show you how to constrain AI to only modify what you explicitly request. The magic phrases that keep AI focused.

---

## Try This Today

1. Create `common-ai-mistakes.md` in your project root
2. Add three mistakes AI has made in your project recently
3. For each: wrong pattern, right pattern, brief explanation
4. Reference the file in your next AI prompt
5. Notice if AI avoids those mistakes

Start small. Three mistakes. Add more over time.

Within a week, you'll stop repeating the same corrections. AI will have learned. Not because it remembers, but because you documented.

That documentation is your leverage. Use it.
