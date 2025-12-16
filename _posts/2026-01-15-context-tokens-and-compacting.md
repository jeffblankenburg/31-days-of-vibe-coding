---
layout: post
title: "Day 15: Context, Tokens, and When to Compact"
date: 2026-01-15
author: Jeff Blankenburg
excerpt: "Every conversation has a limit. Learn how tokens work, when context starts degrading, and how to compact effectively without losing the thread."
---

The conversation was going great. Forty messages in, Claude and I had built a complete authentication system. Database schema. API endpoints. Frontend components. Tests.

Then I asked Claude to add password reset.

Claude's response referenced a "UserAuth" model we'd never created. It imported from a file path that didn't exist. It used patterns completely different from everything we'd built.

The conversation had exceeded Claude's effective context. Not the hard limit. The soft limit where quality degrades. Where AI can technically see all the messages but can't actually hold them all in focus.

Understanding context and tokens isn't academic. It's the difference between productive sessions and frustrating ones.

## What Are Tokens?

Tokens are how AI measures text. Not words. Not characters. Tokens.

A token is roughly 4 characters or about 3/4 of a word. The word "authentication" is 3-4 tokens. The word "the" is 1 token. Code tends to use more tokens per line than prose because of punctuation and special characters.

Every AI model has a context window measured in tokens. That window includes:
- Your system prompt (CLAUDE.md, etc.)
- The entire conversation history
- AI's current response as it's being generated

When you hit the limit, the oldest messages start getting dropped. Before that hard limit, there's a soft degradation where AI technically sees everything but can't effectively process it all.

## The Real Limits

Claude's context window is large. 200K tokens for Claude 3. That sounds like a lot.

It is a lot for a single prompt. It's not as much for a long conversation.

Consider a typical development session:

- System prompt and configuration: 2,000 tokens
- Each human message (code + explanation): 500-2,000 tokens
- Each AI response: 1,000-5,000 tokens
- Code files you paste in: 500-3,000 tokens each

A 40-message conversation with code can easily hit 80,000-100,000 tokens. You're not at the hard limit, but you're in degradation territory.

The issue isn't running out of space. It's attention. AI models don't give equal attention to all tokens. Recent messages get more focus. Earlier messages fade. By message 40, the decisions from message 5 are fuzzy at best.

## Signs of Context Degradation

Watch for these indicators:

**Contradicting earlier decisions.** You agreed on PostgreSQL in message 10. In message 45, AI generates MySQL queries. It's not being stubborn. It's lost that context.

**Forgetting file contents.** You pasted a file in message 8. AI references it incorrectly in message 35. The details have faded.

**Inventing details.** AI confidently states things about your codebase that aren't true. It's filling gaps with plausible-sounding inventions.

**Asking questions you answered.** "What database are you using?" You told it. It forgot.

**Pattern drift.** Early code followed your patterns. Later code uses different patterns. AI lost track of the established conventions.

**Quality decline.** Responses that were sharp and specific become vague and generic.

When you see these signs, the conversation needs intervention.

## The Compact Command

Claude Code has a `/compact` command that summarizes the conversation and frees up context space. Use it when:

- The conversation is getting long (30+ messages)
- You notice quality degradation
- You're about to start a new phase of work
- AI seems to be forgetting earlier context

What compact does:
1. Summarizes the key points from the conversation
2. Preserves important decisions and context
3. Removes the detailed back-and-forth
4. Gives you a fresh context window with the essentials

After compacting, AI has room to breathe. New messages get full attention. The summary maintains continuity.

## When to Compact

**Compact proactively at natural breakpoints:**

- Finished Phase 1 of a feature? Compact before starting Phase 2.
- Completed a debugging session? Compact before new work.
- About to paste a large file? Compact first to make room.

**Compact reactively when you see degradation:**

- AI contradicted something? Compact and clarify.
- Quality dropped noticeably? Compact and refresh.
- AI seems confused? Compact and reorient.

**Don't wait until it's broken.** Compact when things are still working. It's preventive maintenance, not emergency repair.

## Manual Compacting

If your AI tool doesn't have automatic compacting, do it manually. Start a new conversation with a summary:

```
## Summary of Previous Session

We're building a card trading feature for collectyourcards.com.

### Completed
- Trade offer model (server/models/trade.ts)
- Create trade endpoint (POST /api/trades)
- Accept/decline endpoints
- Database migrations

### Key Decisions
- Trades are immutable once created (no editing)
- Both parties must have the cards they're offering
- Cards are locked during pending trade
- 48-hour expiration on pending trades

### Current Code
[paste current state of key files]

### Next Steps
- Add trade history endpoint
- Add trade notification emails
- Frontend for trade management
```

This is manual compacting. You've distilled the essential context. AI starts fresh with everything it needs.

## What to Include in a Summary

Good summaries include:

**What exists.** Files created. Endpoints built. Tests written.

**Key decisions and why.** Not just "we use PostgreSQL" but "PostgreSQL for JSONB support on card metadata."

**Current state.** What the code looks like now. Paste current versions of key files.

**What's next.** Where you're headed. Helps AI understand priorities.

**Open questions.** Anything unresolved that needs to carry forward.

Bad summaries are either too vague ("we built some stuff") or too detailed (pasting the entire conversation). Hit the middle ground.

## The 30-Message Checkpoint

I use 30 messages as a checkpoint. At message 30, I pause and assess:

1. How's the quality? Still sharp or getting fuzzy?
2. Is AI remembering earlier decisions?
3. Am I repeating myself?
4. How much code has been pasted?

If any answers concern me, I compact. If everything's fine, I continue with awareness that degradation is coming.

Some conversations stay coherent for 50+ messages. Some degrade at 20. The 30-message checkpoint catches most issues before they become problems.

## Token-Efficient Practices

Reduce token usage to extend productive conversation length:

**Don't paste entire files when you need specific sections:**

```
# Instead of pasting all 500 lines of userService.ts:

Here's the relevant function from userService.ts (lines 45-60):
[paste just that section]
```

**Reference files instead of pasting when AI has access:**

```
# Instead of pasting:
Read server/services/userService.ts and modify the validateUser function.
```

**Summarize previous work instead of letting context accumulate:**

```
# Instead of letting AI infer from 20 messages:
Summary: We've built CRUD for trades. The model is at server/models/trade.ts.
```

**Remove resolved discussion:**

After you've agreed on an approach, you don't need the 10 messages of discussion. That's what compacting removes.

## Context Budgeting

Think of context as a budget. You have X tokens to spend. Choose wisely.

**High-value token spending:**
- Current code state (AI needs to see what exists)
- Key decisions (AI needs to respect these)
- Specific task context (what you're working on now)

**Low-value token spending:**
- Resolved discussions (you agreed, move on)
- Old code versions (current state matters more)
- Tangential exploration (interesting but not relevant)

Every message costs tokens. Long AI responses cost tokens. Pasted files cost tokens.

When you're deep in a conversation, ask: "Is this worth the context space?"

## Handling Large Files

Large files are context killers. A 1000-line file can use 5000+ tokens. Options:

**Paste only relevant sections:**

```
Here's the authentication middleware (server/middleware/auth.ts lines 20-45):
[relevant section]

The rest of the file handles [brief summary].
```

**Let AI read files directly:**

In Claude Code and similar tools:

```
Read server/middleware/auth.ts and tell me what changes are needed for multi-tenant support.
```

AI reads the file on demand without clogging the conversation context.

**Create focused reference files:**

Instead of one massive service file, keep related concerns separate. Smaller files mean smaller context footprint.

## The Fresh Start Alternative

Sometimes compacting isn't enough. The conversation is too tangled. Better to start fresh.

Fresh start criteria:
- Conversation has fundamental confusion (not just detail loss)
- You've compacted and quality is still poor
- You're changing direction significantly
- The codebase has changed substantially since conversation started

Fresh starts aren't failure. They're recognition that a clean slate serves better than patching a degraded conversation.

## Multi-Session Projects

For projects spanning days or weeks:

**End-of-session summary:**

Before closing for the day, write a summary. What's done. What's decided. What's next. Save it.

**Start-of-session context:**

Begin the next session by providing that summary. AI has full context immediately.

**Maintain a running document:**

Keep a PROGRESS.md that tracks:
- Completed work
- Key decisions
- Current state
- Next steps

Update it as you go. It becomes your compacting source material.

## Real Example: The Trading Feature

Here's how context management played out for me:

**Messages 1-15:** Designed trade data model. Debated approaches. Settled on design.
**Messages 16-30:** Implemented create trade endpoint with validation.
**Message 31:** `/compact` to summarize before moving on.
**Messages 32-40:** Implemented accept/decline with card transfer logic.
**Messages 41-45:** Quality started degrading. AI forgot validation decisions.
**Message 46:** Manual summary + fresh context injection.
**Messages 47-55:** Completed trade history and notifications.

Total: ~55 messages across two effective conversations (one compact, one fresh start).

Without context management, I'd have hit serious degradation around message 35 and spent the rest of the session fighting confusion.

## The Attention Budget Mental Model

Think of AI's attention as a budget that depletes through the conversation.

Early messages: 100% attention
Message 20: 80% attention on early content
Message 40: 50% attention on early content
Message 60: 20% attention on early content

These numbers are illustrative, not exact. But the pattern is real.

When you compact, you reset the budget. Critical information gets summarized into recent context. Attention concentrates on what matters.

## Tomorrow

You understand context and tokens. You know when to compact. Tomorrow we'll put AI to work in a specialized role: security auditor. Different prompts. Different focus. Using AI to find vulnerabilities you'd miss.

---

## Try This Today

1. Check your current AI conversation length
2. If over 30 messages, try compacting or manual summary
3. Notice the quality difference in responses after compacting
4. Practice writing a compact summary: what's done, what's decided, what's next

Build the habit of context awareness. Watch for degradation signs. Compact proactively.

Your conversations will stay sharper longer. And when they do degrade, you'll know exactly what to do about it.
