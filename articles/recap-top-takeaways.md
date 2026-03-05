# 10 Things I Learned Writing 49,000 Words About Vibe Coding

In January 2026, I published a blog post every single day for 31 days about using AI to write production software. Not toy demos. Not "hello world" chatbots. Real, shipped, production code. The whole series was built around one project: [collectyourcards.com](https://collectyourcards.com), a sports card collection app I built entirely with Claude Code over three months of nights and weekends. 900,000+ cards, an achievement system, universal sub-200ms search, Excel exports. [All of it](https://31daysofvibecoding.com/2026/01/01/what-is-vibe-coding/).

Here's what I actually learned.

## 1. You're the architect. AI is the junior developer.

This is the framing that makes everything else work. You decide what to build, how it should be structured, and what trade-offs are acceptable. AI helps you build it faster. When you flip that relationship and start expecting AI to make design decisions for you, things go sideways fast.

I learned this the hard way when I described a notification system to Claude and [asked it to "figure out the best approach."](https://31daysofvibecoding.com/2026/01/21/ai-as-architect/) It picked polling every 30 seconds. That works fine for 10 users. At 10,000 users, that's 333 requests per second hitting your server for no reason. When I instead described my proposed approach and asked Claude to poke holes in it, it identified five real problems I hadn't considered, including the scaling issue. Same tool, completely different outcome, because I stayed in the architect role.

AI doesn't replace your judgment. It accelerates your execution.

## 2. Write specs, not prompts.

Early on, I was typing things like "build me a card search feature" into Claude and getting back something that technically worked but was missing pagination, fuzzy matching, error handling, and observability. The output was exactly as vague as my input.

The fix was treating every feature like a spec. I started [writing GitHub Issues as full feature specifications](https://31daysofvibecoding.com/2026/01/02/github-issues-are-your-product-backlog/) before ever opening a conversation with AI. Context, intent, constraints, examples, and [how to verify it works](https://31daysofvibecoding.com/2026/01/05/the-prompting-pattern-that-actually-works/). When I built the achievement system for collectyourcards.com (1,200+ achievements across 14 categories), the entire thing was driven by a single well-written GitHub Issue. AI even helped me write the spec before a single line of code existed, and then created follow-up issues during implementation for database indexes, notification hooks, and edge cases I'd missed.

Vague input gets vague output. Specific input gets production-ready output. Every time.

## 3. Break every feature into phases.

[Never ask AI to build a complex feature in one shot.](https://31daysofvibecoding.com/2026/01/06/breaking-features-into-phases/) I tried this exactly once with the achievement system. Forty-five minutes of generated code spread across dozens of files, and none of it worked because everything was interdependent and untestable. I couldn't even figure out where to start debugging.

I threw it all away and started over with phases. Phase 1: core achievement engine with 150 basic achievements. That shipped in one session and worked immediately. Phase 2 added categories. Phase 3 added the notification system. Each phase produced working, deployable, independently verifiable software. The total time was less than my failed single-shot attempt.

This applies to everything. My universal search feature went from basic text matching to fuzzy search to multi-entity results to filters to autocomplete, each phase shipping on its own. If Phase 1 alone isn't useful, your phases are too small. If Phase 1 takes more than one session, your phases are too big.

## 4. Commit before every AI operation.

[Git is your undo button.](https://31daysofvibecoding.com/2026/01/09/git-is-your-undo-button/) This sounds obvious until you skip it once and lose an hour of your life.

I asked Claude to change a five-word error message in a validation function. Simple, right? When I looked at the diff afterward, it had touched 12 files. It renamed the function from `validateUser` to `checkUserStatus`, refactored the validation logic, and updated three other files that referenced the original function name. The app crashed. Without a prior commit, I spent 50 minutes manually figuring out what had changed and reversing the damage.

Now I commit before every significant AI operation. `WIP: before achievement refactor`. `WIP: before search update`. It takes five seconds. When AI inevitably changes something you didn't ask for (and it will), you run `git diff`, see exactly what happened, and revert cleanly. Think of it like saving before a boss fight in a video game.

## 5. Configure your AI once, not every conversation.

AI has no memory between conversations. Every new session starts from zero. For weeks, I was repeating the same instructions: "Use TypeScript, use Prisma, use the service layer pattern, add structured logging, don't use console.log." Every. Single. Time.

The fix was a [CLAUDE.md file](https://31daysofvibecoding.com/2026/01/10/agent-configuration/) in my project root that defines my tech stack, coding patterns, and explicit "Always" and "Never" lists. I added [annotated pattern files](https://31daysofvibecoding.com/2026/01/11/teaching-ai-your-patterns/) that show, not describe, how services should be structured. I added a [common mistakes file](https://31daysofvibecoding.com/2026/01/12/common-ai-mistakes-file/) documenting errors AI kept making so it would stop making them.

Before configuration, asking Claude to "create an endpoint to update user email" produced JavaScript with raw SQL and console.log. After configuration, the exact same prompt produced TypeScript with strict types, Prisma, a proper service layer, and structured telemetry logging. Same AI, same prompt, dramatically different output, because the context was already there.

## 6. AI builds for the happy path. You have to demand the rest.

AI-generated code is optimistic. Really optimistic. It assumes your database is always up, your network is always fast, and your users always send valid JSON. It writes code that works perfectly when everything goes right and fails silently when anything goes wrong.

I built a card-fetch endpoint that looked clean and correct. Eight lines of straightforward code. When I ran a [security audit](https://31daysofvibecoding.com/2026/01/16/ai-as-security-auditor/) (by asking Claude to switch into adversarial "penetration tester" mode), it found four vulnerabilities: no ownership check (any user could fetch any other user's cards), sensitive data exposure (returning all owner fields including email), no rate limiting, and no access logging. The fix was about 15 lines, but I never would have written them unless I explicitly asked.

Security, [operability](https://31daysofvibecoding.com/2026/01/17/ai-as-sre/), [edge cases](https://31daysofvibecoding.com/2026/01/23/edge-cases/), and [test coverage](https://31daysofvibecoding.com/2026/01/18/ai-as-test-generator/) don't happen unless you ask for them separately. I started using what I call the "3am test" for every feature: if this broke at 3am, would I know it happened? Would I know why? Would I know how to fix it? If the answer to any of those is no, the feature isn't done.

## 7. Observability replaces code review.

When you're shipping AI-generated code, you're not reading every line. You can't. The volume is too high and the iteration speed is too fast. So how do you know it works?

You watch it run.

I added [structured logging, metrics, and tracing](https://31daysofvibecoding.com/2026/01/04/observability-first/) to every feature from Day 1. When a user gets locked out of their account on collectyourcards.com, I can diagnose why in 30 seconds by looking at the authentication telemetry: user ID, IP, user agent, error message, all structured and searchable. Before I had this, the same diagnosis took hours of guessing.

This isn't optional when you're building with AI. It's the substitute for the line-by-line code review you're no longer doing. OpenTelemetry with traces, metrics, and logs became the foundation of every feature I built. If I couldn't observe it in production, I didn't ship it.

## 8. Use AI to review AI.

One of the most useful patterns I found was using AI to check AI's own work. But there's a trick: run multiple focused review passes, not one general review.

A single "review this code" pass might catch 3 or 4 issues. [Four separate focused passes](https://31daysofvibecoding.com/2026/01/19/ai-as-code-reviewer/) (security, performance, edge cases, maintainability) routinely caught 12 or more. I'd ask Claude to review a user registration endpoint once for security vulnerabilities, once for performance problems, once for missing edge cases, and once from the perspective of someone maintaining this code at 3am. Each pass found things the others missed.

I also used AI to [write tests](https://31daysofvibecoding.com/2026/01/18/ai-as-test-generator/) for AI-generated code, to [refactor](https://31daysofvibecoding.com/2026/01/25/refactoring-ai-code/) AI-generated code, and to [find edge cases](https://31daysofvibecoding.com/2026/01/23/edge-cases/) I'd never think of. A `formatUserName()` function seems simple until AI points out: what about right-to-left text? Emoji in names? HTML injection? A user who entered no name at all (producing "undefined undefined" on the profile page, which actually happened)?

## 9. Measure whether it's actually helping.

Here's the honest part. I spent 31 days writing about how AI makes you faster and more productive. And when I [actually measured my output](https://31daysofvibecoding.com/2026/01/29/measuring-what-matters/), my features-shipped-per-week, bugs-in-production, and time-from-issue-to-deploy were... about the same as before.

I *felt* faster. The moment-to-moment experience of coding with AI feels incredible. Code appears instantly. Features take shape in minutes instead of hours. But the total cycle time, including prompt crafting, output review, fixing hallucinations, and debugging unexpected changes, often washed out the speed gains.

Where AI genuinely helped: boilerplate generation, code review, exploring unfamiliar APIs, enumerating edge cases, and writing documentation. Where it consistently hurt: novel problems with no clear pattern, subtle bugs that required deep context, and any situation where it over-engineered a simple solution. If you're not tracking which category your work falls into, you're flying blind.

## 10. Document what you learn, because AI won't remember.

AI's context [degrades within a single session](https://31daysofvibecoding.com/2026/01/15/context-tokens-and-compacting/) and [vanishes completely between sessions](https://31daysofvibecoding.com/2026/01/07/context-management/). Around message 30 or 40 in a long conversation, I'd start seeing Claude reference models that didn't exist, import from paths that were never created, and contradict decisions it made 20 messages earlier.

The fix is aggressive documentation. Progress docs that summarize what was built, what decisions were made, and what's next. A [mistakes file](https://31daysofvibecoding.com/2026/01/12/common-ai-mistakes-file/) that records patterns AI keeps getting wrong (with "wrong" and "right" examples) so you can reference it in future sessions. Proactive compaction at natural breakpoints, not after quality has already collapsed.

Your configuration files, your mistakes file, and your progress docs are the substitute for the institutional knowledge a human teammate would accumulate over months. AI doesn't learn from working with you. But your documentation can simulate that learning for every future session.

## What actually changed

After 31 days and nearly 49,000 words, the biggest shift wasn't in how I use AI. It was in how I think about what I'm building. I plan more carefully because the cost of planning is low and the cost of a bad AI-generated implementation is high. I commit more often. I monitor everything. I write better specs than I ever did when I was the one writing every line.

AI didn't make me a faster coder. It made me a better architect.

The full series is free at [31daysofvibecoding.com](https://31daysofvibecoding.com). If any of these lessons resonated, the detailed posts have the code, the prompts, and all the messy parts I couldn't fit here.
