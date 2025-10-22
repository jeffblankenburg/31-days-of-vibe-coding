# Claude Context for 31 Days of Vibe Coding

This document provides session-to-session context for AI assistants working on this project.

## Project Overview

A 31-day blog series teaching experienced developers how to use AI coding tools (primarily Claude) to ship faster without sacrificing quality. The core theme is "vibe coding" - staying in flow while treating AI as a collaborative junior developer.

Published at: **31daysofvibecoding.com**
GitHub repo: **github.com/jeffblankenburg/31-days-of-vibe-coding**

## Author

**Jeff Blankenburg** - Developer, blogger, teacher. Previously wrote "31 Days of Windows Phone 7" series. See that series for voice reference.

## Core Themes

1. **Observability First** - AI-generated code needs monitoring, logging, and metrics more than hand-written code
2. **Trust but Verify** - AI is a tool, not a replacement for developer judgment
3. **Practical over Perfect** - Real examples beat theoretical concepts
4. **Production-Ready** - Everything must work in production, not just demos

## Voice and Style

See **VOICE.md** for complete guidelines.

Key points:
- Conversational but technical
- No hype, no marketing speak
- **NO DASHES TO BREAK UP SENTENCES** - use periods instead
- No em dashes (—) EVER
- Experienced developer talking to experienced developers
- Honest about trade-offs and failures
- Actionable, specific, detailed

**Pronoun usage (IMPORTANT):**
- Use "I" for Jeff's personal voice and what he'll teach
- Use "you" when addressing the reader
- Use "we" ONLY when describing Jeff + AI working together (pair programming)
- Never use editorial "we" (sounds corporate)

## Series Structure

31 articles, published daily. Titles are in `/outlines/week1.md` through `/outlines/week4.md`.

Current status:
- README.md is complete
- Articles are commented out in README until published
- Day 1 is currently visible

To publish a new day: Uncomment that day's line in README.md

## Key Concepts

**Vibe Coding** - Staying in creative flow while using AI as a pair-programming partner. Not about outsourcing thinking, but about accelerating iteration.

**The AI is your junior developer** - This framing matters. You're still the architect. The AI helps you move faster.

**Observability as a safety net** - When shipping faster with AI, you need confidence through monitoring and metrics.

## Article Structure

Each article should include:
1. Opening scenario or problem
2. Why it matters
3. Practical techniques/code
4. Actionable takeaway
5. Brief next article setup

Every article should:
- Include real code examples
- Show the messy parts
- Connect to observability where relevant
- Be immediately actionable
- Have a minimum of 1,500 words.

## Technical Context

- Primary tool: Claude
- Day 2 compares Claude, ChatGPT, Gemini, GitHub Copilot
- Examples include various observability platforms (especially Dynatrace)
- Code examples should be production-ready, not toy demos

## Content Organization

```
/articles - Published blog posts
/outlines - Planning documents (week1-4.md)
/examples - Code samples and prompts
/resources - Checklists, templates, guides
```

## License

CC BY 4.0 - Anyone can use, modify, translate, or republish with attribution.

## When Writing Articles

1. Read VOICE.md first
2. Check the outline in `/outlines/weekN.md`
3. Write in Jeff's voice (see VOICE.md)
4. Include code examples
5. Make it actionable
6. No AI tells (em dashes, hype, etc.)

## When Updating README

- Uncomment the day's entry when article is published
- Keep it simple - readers see the rendered version
- Commented entries are in source for easy publishing

## Important Context for AI Assistants

- This is a real production series, not a demo
- Quality matters more than speed
- The goal is to help developers ship better code faster
- Every article should make someone a better developer
- Jeff's voice is authentic - don't polish it into marketing speak

## Common Pitfalls to Avoid

- Don't make it too polished (sounds like AI wrote it)
- **Don't use dashes to break up sentences** - this is a major AI tell
- Don't use em dashes (—) EVER
- Don't use editorial "we" (use "I" for Jeff's voice instead)
- Don't write hype/marketing copy
- Don't forget observability themes
- Don't make examples that only work in demos
- Don't write theory without practice
