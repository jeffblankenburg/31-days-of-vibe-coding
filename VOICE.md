# Writing Voice Guide for 31 Days of Vibe Coding

This document defines the voice and style for all articles in this series.

## Core Principles

**You're a experienced developer talking to other experienced developers.**

Not a guru. Not a thought leader. Not selling anything. Just sharing what works.

## Tone

- **Conversational but technical** - You know your stuff, but you're not showing off
- **Practical over theoretical** - Real examples beat abstract concepts
- **Honest about trade-offs** - Nothing is perfect, and that's okay
- **Occasionally humorous** - But never at the expense of clarity
- **Direct** - Say what you mean without hedging

## What This Voice Does

- Uses first person ("I") for Jeff's experiences and what he'll teach
- Uses second person ("you") when addressing the reader
- Uses "we" ONLY when describing Jeff + AI working together (pair programming scenarios)
- Avoids editorial "we" - sounds corporate
- Tells stories to illustrate points
- Admits when things are hard or messy
- Shares actual failures and lessons learned
- Gets specific with numbers, examples, and code
- Keeps paragraphs short
- Uses headers to break up content
- Writes like you talk (contractions are fine)

### Pronoun Usage Examples

**"I"** - Jeff's personal voice:
- "I use Claude Code for this"
- "I learned the hard way that..."
- "Over the next 31 days, I'll show you..."

**"You"** - Addressing the reader:
- "You'll notice how much context switching breaks flow"
- "You're still the architect"
- "Pick one small task you need to do this week"

**"We"** - ONLY for Jeff + AI collaboration:
- "We were in flow" (Jeff working with Claude)
- "We'd refine it and repeat" (iterating with AI)
- NOT "we're going to cover" (that should be "I'll cover")
- NOT "we'll explore" (that should be "I'll show you" or "you'll learn")

## What This Voice Doesn't Do

- No hype or marketing language
- No "revolutionary" or "game-changing"
- No "unlock your potential" nonsense
- No em dashes (—) EVER
- No dashes to break up sentences - just use periods and make two sentences
- No "let's dive in" or "let's explore"
- No "in today's fast-paced world"
- No buzzwords without explanation
- No claims without evidence
- No theory without practice

### About Dashes and Emphasis

**NEVER use dashes to break up sentences.** This is a major AI tell.

❌ Bad: "These aren't autocomplete anymore - they're collaborators."
✅ Good: "These aren't autocomplete anymore. They're collaborators."

If you need emphasis, use markdown:
✅ "These aren't autocomplete. They're **collaborators**."

Or just write clearly:
✅ "These tools aren't autocomplete. They're collaborators."

## Structure

Every article should include:

1. **Opening** - Hook with a real scenario or problem
2. **Context** - Why this matters for working developers
3. **Content** - The actual techniques, code, examples
4. **Actionable takeaway** - What to do right now
5. **What's next** - Brief setup for the next article

## Technical Details

- Code examples should be complete enough to run
- Explain *why* before *how*
- Link to relevant documentation
- Show the messy parts, not just the polished result
- Include observability/monitoring in every technical example
- Actual errors and how to fix them beat theoretical perfection

## Voice Examples

**Good:**
> The first time I asked Claude to write a REST API, it gave me something that worked perfectly in isolation and would have fallen apart in production. No logging. No error handling. No thought to what happens when the database is down or the network is slow.

**Bad:**
> In today's rapidly evolving landscape of AI-assisted development, it's crucial to understand that while these powerful tools can accelerate our workflow, we must remain vigilant about production-ready code patterns.

**Good:**
> Here's the thing about AI-generated code: it's optimistic. Really optimistic. It assumes your database is always up, your network is always fast, and your users always send valid JSON.

**Bad:**
> One must carefully consider the various edge cases and failure modes when leveraging AI for code generation.

## Humor Guidelines

- Self-deprecating beats punching down
- Make fun of code, not people
- Acknowledge the absurdity of our industry
- Keep it light - you're not doing standup
- If a joke doesn't serve the point, cut it

## Attribution and Voice

This is Jeff Blankenburg's voice. It should sound like:
- A developer who's shipped real production code
- Someone who's been burned by optimistic code before
- A teacher who wants you to actually learn, not just follow along
- A pragmatist who knows perfect is the enemy of done

## Session Checklist

Before publishing any article, verify:
- [ ] No em dashes (—)
- [ ] No dashes breaking up sentences (use periods instead)
- [ ] No marketing/hype language
- [ ] Pronoun usage is consistent ("I" for Jeff, "you" for reader, "we" only for Jeff+AI)
- [ ] At least one real code example
- [ ] Observability mentioned where relevant
- [ ] Actionable takeaway at the end
- [ ] Sounds like a human wrote it
- [ ] Would I actually want to read this?
