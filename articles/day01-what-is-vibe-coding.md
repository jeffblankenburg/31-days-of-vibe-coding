# Day 1: What Is Vibe Coding?

I was three hours into a refactoring session when I realized I hadn't actually written any code in the last 45 minutes. I was in a conversation with Claude, iterating on an API design. I'd describe what I wanted, Claude would generate an implementation, I'd spot the problems, we'd refine it, and repeat. By the time we were done, I had a clean, tested endpoint with proper error handling and logging hooks.

The weird part? It felt more like pair programming than using a tool. We were in flow.

That's vibe coding.

## What Is Vibe Coding, Actually?

Vibe coding is staying in creative flow while using AI as your pair-programming partner. Not a replacement for your brain. Not a code generator you copy-paste from. A collaborative partner that helps you iterate faster and explore alternatives while you stay in control.

When you're vibe coding:
- You're still the architect
- The AI is your junior developer
- You iterate in tight loops (5-10 minutes, not hours)
- You verify everything with tests and observability
- You stay in flow instead of context-switching

It's not about "letting the AI write code for you." It's about accelerating the parts of development that kill momentum: boilerplate, test scaffolding, documentation, debugging, refactoring. The AI handles the typing. You handle the thinking.

## Why This Matters Now

AI coding tools hit an inflection point in 2024. Claude can reason about system design. ChatGPT can debug production logs. GitHub Copilot can suggest entire functions. These aren't autocomplete anymore. They're collaborators.

But here's the problem: most developers use them incorrectly.

They treat AI like a magic code generator. Ask for a feature, get some code, paste it in, ship it. No tests. No logging. No thought to what happens when it breaks in production at 2am.

That's not vibe coding. That's HDD: hope-driven development.

Vibe coding is different because it acknowledges a truth: **when you ship faster, you need better observability**. If you're generating code in minutes instead of days, you need to know instantly if it works in production.

## The Four Principles

### 1. Speed Through Iteration

Don't ask the AI to write your entire feature. Ask it to help you explore one piece at a time. Write a function. Test it. Refine it. Move to the next piece.

Small loops beat big swings. Always.

### 2. Intent Over Implementation

Tell the AI what you're trying to accomplish and why. Not just what code you want. The more context you provide about business logic, performance requirements, and error cases, the better the output.

"Write a function that validates email addresses" gets you regex.

"Write a function that validates email addresses for a user signup flow, needs to handle internationalized domains, should log validation failures for analytics, and return user-friendly error messages" gets you production code.

### 3. Flow Over Efficiency

Vibe coding prioritizes staying in flow over raw speed. If stopping to write tests breaks your momentum, generate the tests too. If documenting as you go kills your vibe, have the AI write the docs from your working code.

The goal isn't to be maximally efficient in any one task. It's to maintain momentum across the whole session.

### 4. Observability as a Safety Net

This is the non-negotiable principle: every piece of AI-generated code needs instrumentation.

When I generate a function, I immediately ask for:
- Logging at key decision points
- Metrics for performance
- Error tracking
- Test coverage

Why? Because I'm shipping faster, which means I'm taking more risk. Observability is how I know if that risk paid off or blew up.

## Trust, But Verify

Here's what I learned the hard way: AI-generated code is optimistic. Really optimistic.

It assumes your database is always up. Your network is always fast. Your users always send valid JSON. Your dependencies never break. Your disk never fills up.

In other words, it writes code for a world that doesn't exist.

Your job in vibe coding is to add the pessimism. Ask the AI: "What happens when this fails?" Then make it handle that case. Then instrument it so you know when it happens in production.

This is why observability isn't optional. When you're generating code faster than you can fully reason about it, you need runtime verification. Logs that show you what's actually happening. Metrics that prove (or disprove) your assumptions. Traces that connect the dots when something goes wrong.

I use Dynatrace for this, but the principle applies regardless of your tooling. The faster you ship, the faster you need feedback.

## What Vibe Coding Is Not

Let me be clear about what this isn't:

**It's not "AI writes all your code."** You're still doing the hard parts: system design, architectural decisions, understanding business requirements, knowing when to stop adding features and ship.

**It's not "turn off your brain and trust the output."** You're reviewing every line. You're writing tests. You're asking hard questions about edge cases and failure modes.

**It's not "eliminate all manual coding."** Sometimes you need to write code yourself. That's fine. Vibe coding is about choosing the right tool for the moment.

**It's not "one prompt and done."** It's iterative. Collaborative. Conversational. More like pair programming than code generation.

## What's Coming in This Series

Over the next 31 days, I'm going to help you rebuild your relationship with code.

I'll cover:
- How to write prompts that generate production-ready code (not demos)
- Setting up your environment for flow
- The iteration loop that keeps you moving fast
- Code review with AI assistance
- Testing, debugging, and refactoring at scale
- Building observability into everything
- Working with AI as a team
- Measuring the actual impact on your velocity

Each article includes real code, real examples, and real lessons from shipping AI-assisted features to production. No theory without practice. No claims without evidence.

## Your Turn

Here's what I want you to do today:

Pick one small task you need to do this week. Not a whole feature. Just one function, one test, one refactor. Something that would normally take you 30-60 minutes.

Try vibe coding it. Have a conversation with your AI tool of choice (I use Claude, but use what works for you). Iterate in small loops. Ask it to add logging. Ask it to handle edge cases. Ask it to write the tests.

Notice how it feels. Notice where you stay in control and where you're tempted to just trust the output. Notice what breaks.

Then come back tomorrow. I'm going to compare several coding agents head-to-head and show you which one fits different vibes.

## Example Prompts to Get Started

Not sure what to ask? Here are some real prompts I use. Copy them, adapt them, make them yours.

**For a new function:**
```
I need a function that fetches user data from our API and handles rate limiting.
It should:
- Accept a user ID
- Make a GET request to /api/users/{id}
- Handle 429 rate limit responses with exponential backoff
- Log all requests and rate limit hits for monitoring
- Return the user object or throw a descriptive error
- Include retry count in the response metadata

Language: TypeScript
```

**For refactoring:**
```
This function works but it's hard to test and has no error handling.
Can you refactor it to:
- Extract the database logic into a separate function
- Add proper error handling for network failures
- Add logging at decision points
- Make it easier to mock for testing
- Keep the same public interface

Here's the current code: [paste your code]
```

**For adding tests:**
```
I need comprehensive tests for this function. Include:
- Happy path with valid input
- Edge cases (null, undefined, empty strings)
- Error cases (network failure, invalid response)
- Rate limiting scenarios
- Verify logging calls are made

Use Jest. Show me both the test file and any test helpers I need.

Here's the function: [paste your code]
```

**For debugging:**
```
This code is throwing an error in production but works fine locally.
Here's the error log: [paste error]
Here's the code: [paste code]
Here's what I know about the production environment: [describe differences]

Help me figure out:
1. What's causing this
2. How to fix it
3. What logging I should add to catch this earlier next time
```

The pattern: Be specific. Explain the context. State your requirements. Ask for observability.

## Getting Started with AI Coding Tools

Here's the hard truth: if you're copy-pasting code between a web interface and your editor, you're not vibe coding. You're breaking flow every single time.

Real vibe coding requires tools that can access your codebase, read and write files, run tests, and iterate without you leaving your terminal or editor. That means CLI agents or deep IDE integrations.

Here's the full landscape:

### CLI Agents (Full Codebase Access)

**Claude Code** (what I use)
- [Get started](https://docs.anthropic.com/en/docs/claude-code/getting-started)
- Full codebase access, file read/write, runs commands, git integration
- Requires API key (paid)

**Aider**
- [aider.chat](https://aider.chat)
- Works with Claude, GPT-4, and other models
- Git-aware, can edit multiple files
- Open source, pay for API access to your chosen model

**GitHub Copilot CLI**
- [Get started](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli)
- Terminal-based, explains commands and suggests fixes
- Part of Copilot subscription

### AI-First IDEs (Built Around AI)

**Cursor**
- [cursor.sh](https://cursor.sh)
- VS Code fork with deep AI integration
- Full codebase context, chat in the editor
- Very popular, subscription-based

**Windsurf**
- [codeium.com/windsurf](https://codeium.com/windsurf)
- From the Codeium team
- AI-native editing experience
- Free tier available

### IDE Extensions (Integrations for Existing Editors)

**GitHub Copilot**
- [Set up](https://docs.github.com/en/copilot/getting-started-with-github-copilot)
- Works in VS Code, JetBrains, Neovim, and more
- Inline suggestions + chat
- Subscription required, free for students/OSS maintainers

**Continue**
- [continue.dev](https://continue.dev)
- Open source autopilot for VS Code and JetBrains
- Works with multiple models (Claude, GPT-4, local models)
- Free and open source

**Codeium**
- [codeium.com](https://codeium.com)
- Free alternative to Copilot
- Inline completions + chat
- Works in most major editors

**Amazon CodeWhisperer**
- [aws.amazon.com/codewhisperer](https://aws.amazon.com/codewhisperer)
- Free tier available
- Integrated with AWS tools

### Web Interfaces (Good for Learning, Break Flow)

**Claude Web**
- [claude.ai](https://claude.ai)
- Great for learning and experimentation
- Can upload files but no live codebase access
- Free tier, Pro for longer conversations

**ChatGPT**
- [chat.openai.com](https://chat.openai.com)
- Similar limitations (no codebase integration)
- Free tier, Plus for GPT-4 access

**Google Gemini**
- [gemini.google.com](https://gemini.google.com)
- Free to use
- No codebase integration

### My Take

If you're serious about vibe coding, start with one of these:
1. **Claude Code** - Best for iterative development with full project context
2. **Cursor** - Best if you want an IDE built around AI
3. **GitHub Copilot** - Best if you love your current editor and want AI added

The web interfaces are fine for today's exercise, but notice how much you're context-switching. That's the flow killer.

**Tomorrow** I'll compare several of these tools head-to-head with the same coding challenge. You'll see exactly why codebase access matters.

---

**Tomorrow:** Day 2 - The AI Coding Landscape: Claude, ChatGPT, Gemini, and Copilot

**Subscribe:** Watch this repo or follow along at [31daysofvibecoding.com](https://31daysofvibecoding.com)
