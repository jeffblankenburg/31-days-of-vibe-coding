---
layout: post
title: "Day 14: When AI Starts Hallucinating"
date: 2026-01-14
author: Jeff Blankenburg
excerpt: "AI is confidently generating functions that don't exist and APIs that aren't real. Here's how to spot hallucination, understand why it happens, and prevent it from shipping."
---

Claude generated beautiful code for handling file uploads with the Prisma `$upload` method.

There is no `$upload` method in Prisma.

Claude invented it. Completely. With confidence. The syntax looked right. The explanation made sense. The code would have passed a code review if you didn't know better.

When I tried to run it, the error was immediate: "TypeError: prisma.$upload is not a function."

This is hallucination. AI generates something that looks correct but isn't based in reality. Not a bug. Not a misunderstanding. Pure invention presented as fact.

Hallucination is the most dangerous AI failure mode because it's confident. AI doesn't say "I think there might be a method..." It says "use the $upload method" like it's documented fact.

You need to catch this before it ships.

## Why AI Hallucinates

Understanding the cause helps you anticipate when hallucination is likely.

**Training data gaps.** AI was trained on a snapshot of the internet. Libraries update. APIs change. New features appear. AI doesn't know what happened after its training cutoff.

**Pattern completion.** AI predicts what comes next based on patterns. If it's seen many similar APIs, it might predict that this API follows the same pattern. Even if it doesn't.

**Confidence without verification.** AI has no way to check if what it's generating actually exists. It can't run the code. It can't check documentation. It generates what seems likely.

**Long conversations.** As conversations grow, AI's attention on earlier context fades. It might hallucinate details from earlier in the conversation or invent details to fill gaps.

**Pressure to answer.** AI is trained to be helpful. When asked about something it doesn't know, it often generates a plausible-sounding answer rather than admitting uncertainty.

## Red Flags for Hallucination

Watch for these signs:

**Unfamiliar API methods.** You've used this library for months. Suddenly AI references a method you've never seen. Verify it.

**Too-convenient features.** AI generates a function that does exactly what you need. Almost too perfectly. If it seems too easy, check if it's real.

**Specific version claims.** "This was added in version 3.2." Did you check? AI often invents version numbers.

**Configuration you've never seen.** AI adds a config option that solves your exact problem. Verify it exists.

**Import paths that look wrong.** AI imports from a path that doesn't match your project structure or the library's typical patterns.

**Confident explanations for uncertain things.** AI explains how something works in detail when you know the library doesn't document it that clearly.

## Verification Strategies

### Strategy 1: Check Imports First

Before trusting AI-generated code, verify the imports:

```typescript
import { uploadFile } from '@prisma/client/upload';
```

Does this path exist? Open your `node_modules` and check. Run the import in isolation. Don't assume AI got it right.

### Strategy 2: Ask AI to Cite Sources

```
You mentioned the $upload method in Prisma.
Show me the documentation link for this feature.
```

If AI provides a link, check it. If AI admits uncertainty, that's valuable information. If AI generates a fake documentation link, that's a big red flag.

### Strategy 3: Verify Against Official Docs

For any API or method you don't recognize:

1. Open the official documentation
2. Search for the exact method name
3. If you can't find it, it might not exist

This takes 30 seconds. It can save hours of debugging hallucinated code.

### Strategy 4: Test Immediately

Before building on AI-generated code, test it:

```
Can you write a minimal test case that demonstrates this method works?
```

Run the test. If it fails immediately with "method not found," you've caught hallucination early.

### Strategy 5: Ask Directly

```
Before I use this code, I want to verify:
1. Does prisma.$upload actually exist, or did you invent it?
2. What version of Prisma introduced this?
3. If you're not certain, tell me.
```

AI will often admit uncertainty when directly asked. It's less likely to admit uncertainty unprompted.

## Common Hallucination Patterns

### Invented Methods

AI adds methods to libraries that don't exist:

```typescript
// Hallucinated - no such method
await prisma.$upload(file);

// Hallucinated - no such option
await fetch(url, { autoRetry: true });

// Hallucinated - no such property
const size = array.totalSize;
```

**Prevention:** Verify any method you don't recognize against official docs.

### Invented Options

AI adds configuration options that aren't supported:

```typescript
// Hallucinated config
const server = express({
  autoParseJson: true,  // Not a real option
  requestLogging: 'verbose'  // Not a real option
});
```

**Prevention:** Check library documentation for configuration options.

### Invented Package Names

AI imports packages that don't exist or uses wrong package names:

```typescript
// Wrong package name
import { validate } from 'express-input-validator';  // Real package is different

// Invented package
import { Cache } from '@prisma/cache';  // Doesn't exist
```

**Prevention:** Check npm for package existence before installing.

### Hallucinated Function Signatures

AI generates calls with wrong argument order or types:

```typescript
// AI might generate
fs.writeFile(content, path, callback);

// But real signature is
fs.writeFile(path, content, callback);
```

**Prevention:** Check function signatures in IDE (hover) or documentation.

### Version-Specific Features That Don't Exist

AI claims a feature exists in a specific version when it doesn't:

```
"Use the new useOptimistic hook from React 18.2"
```

Is that real? In this case, sort of (it's in React 19 Canary). But AI confidently states version numbers that are often wrong.

**Prevention:** Check release notes for the version you're actually using.

## The Verification Prompt

When you suspect hallucination:

```
Stop. I want to verify before proceeding.

You used [specific method/feature/API].

1. Is this a real feature, or did you generate something plausible?
2. What documentation can you cite?
3. What version introduced this?
4. Rate your confidence: certain, likely, uncertain.

Be honest. I'd rather know if you're unsure.
```

This gives AI permission to admit uncertainty. Often, when directly questioned, AI will say "I'm not certain this exists in the current version" or "I may have confused this with a similar library."

## When Hallucination Sneaks Through

Despite verification, hallucinated code sometimes gets into your codebase. Catch it with:

**TypeScript strict mode.** Catches many method/property hallucinations at compile time.

**Linting.** Rules like `import/no-unresolved` catch bad imports.

**Tests.** Test immediately after AI generates code. Don't let untested hallucinations accumulate.

**Code review.** A second pair of eyes that knows the codebase catches "wait, that doesn't exist."

**CI/CD.** Build failures catch hallucinated dependencies and methods before deployment.

## Context Window Hallucination

There's a special type of hallucination in long conversations: AI invents details from earlier in the conversation.

After 30+ messages, AI might reference:
- Decisions you never made
- Files that were mentioned differently
- Code that was modified since

This is context degradation causing false memories.

**Prevention:**
- Keep conversations shorter (Day 8)
- Provide fresh context when resuming (Day 7)
- Verify by re-reading relevant code before trusting AI's description

## Real Example: The Express Middleware

I asked Claude to add rate limiting to an Express app. Claude generated:

```typescript
import { rateLimit } from 'express-rate-limit';

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true  // <-- Hallucinated option
}));
```

Most of this is correct. `express-rate-limit` is real. Those options are mostly real.

But `trustProxy` isn't an option for the rate limiter. It's an Express app setting. Claude mixed up contexts.

The code would run without errors (unrecognized options are often ignored), but it wouldn't actually trust the proxy. Subtle bug.

I caught it because I checked the docs before deploying. The docs don't mention `trustProxy` as a rate limiter option.

## Building Hallucination Awareness

Over time, you develop intuition:

- "That looks too convenient"
- "I've never seen that method before"
- "That's a lot of config options I don't recognize"
- "AI is very confident about something I couldn't find in docs"

Trust that intuition. Verify. The cost of checking is low. The cost of shipping hallucinated code is high.

## Week 2 Complete

You've made it through the second week.

Day 8: When to restart vs. keep going
Day 9: Using Git as your undo button
Day 10: Agent configuration for consistent output
Day 11: Teaching AI your patterns with examples
Day 12: The common mistakes file
Day 13: Constraining AI to only what you asked
Day 14: Catching and preventing hallucination

You now have the tactical skills to manage AI's quirks. You know when to restart. You know how to constrain. You know what to verify.

Next week, we put AI to work in specialized roles. Security auditor. Performance reviewer. Test generator. Code reviewer. Each role with specific prompts and workflows.

The foundation is solid. Now we specialize.

---

## Try This Today

1. Review the last piece of code AI generated for you
2. Find one method, API, or configuration option you don't recognize
3. Look it up in official documentation
4. If it doesn't exist, you've found hallucination
5. If it does exist, you've verified your code

Make verification a habit. Every unfamiliar API gets checked. Every convenient feature gets confirmed.

The five minutes you spend verifying saves the five hours debugging hallucinated code.

Trust, but verify. Especially with AI.
