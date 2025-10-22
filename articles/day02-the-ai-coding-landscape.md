# Day 2: How to Choose Your AI Coding Partner

The AI coding landscape is crowded and confusing. Claude. ChatGPT. Gemini. GitHub Copilot. Cursor. Codeium. Windsurf. Everyone claims to be the best at helping you ship code faster.

But here's the truth: there is no "best" tool. There's only the right tool for your workflow, your language, your vibe, and what you're building right now.

I'm not here to tell you which one to pick. I'm here to show you how to evaluate them yourself.

## The Framework: What Makes a Good AI Coding Partner?

Before you commit to any tool, you need to understand what you're evaluating. When I test an AI coding assistant, I look for five things:

### 1. Code Quality
Does it write code that actually works? Not just in a demo, but in production. Does it handle edge cases? Does it think about what happens when things go wrong?

### 2. Observability Mindset
This is critical. Does the AI include logging? Error tracking? Metrics? Or does it give you code that works perfectly until it doesn't, and then you have no idea why?

### 3. Context Awareness
Can it read your codebase? Does it understand your existing patterns? Or are you copy-pasting between a web interface and your editor?

### 4. Iteration Speed
How fast can you iterate? Can it edit files directly? Run tests? Or do you have to manually apply every change?

### 5. Your Vibe
This one's subjective but crucial. Does the tool match how you think? Does it break your flow or enhance it?

## The Test: A Real-World Challenge

Here's a challenge I use to evaluate any AI coding tool. It's simple enough to complete in a few minutes, but complex enough to reveal how the tool thinks about production code.

**The task:** Write a TypeScript function that fetches weather data from an external API.

```
Requirements:
- Accept a city name as input
- Make a GET request to a weather API endpoint
- Handle HTTP 429 (rate limit) responses with exponential backoff
- Retry up to 3 times with backoff: 1s, 2s, 4s
- Log all requests, retries, and errors for observability
- Return typed weather data or throw a descriptive error
- Include proper TypeScript types
- Add JSDoc comments
```

This is a real-world scenario. You're calling someone else's API. It might rate-limit you. It might fail. You need to know what's happening in production.

When you run this test, look for:
- Does it handle just rate limits, or network errors too?
- Are the logs useful for debugging?
- Is error handling defensive or optimistic?
- Would you ship this code to production?

## The Landscape: What's Out There

The tools fall into three categories, and each one changes how you work.

### 1. CLI Agents (Full Codebase Access)

These tools run in your terminal and can read your entire codebase, edit files, run commands, and iterate with you.

**Claude Code** (what I use)
- Reads your codebase, edits files directly, runs tests
- Strong reasoning about architecture and edge cases
- Conversational iteration, not just code generation
- Requires Claude API access (paid)

**Aider**
- Works with multiple models (Claude, GPT-4, others)
- Git-aware, can edit multiple files
- Open source, pay for API access to your model of choice
- Popular in the command-line-first crowd

**GitHub Copilot CLI**
- Terminal-based, explains commands, suggests fixes
- Part of Copilot subscription
- Good for command-line help, less for full development

### 2. AI-First IDEs (Built Around AI)

These are complete development environments designed with AI at the center.

**Cursor**
- VS Code fork with deep AI integration
- Full codebase context, chat directly in editor
- Very popular, lots of momentum
- Subscription-based

**Windsurf**
- From the Codeium team
- AI-native editing experience
- Newer but growing fast
- Free tier available

### 3. IDE Extensions (Add AI to Your Editor)

These integrate into the editor you already use.

**GitHub Copilot**
- Works in VS Code, JetBrains, Neovim, more
- Inline suggestions plus chat
- Most widely adopted
- Subscription required (free for students/OSS)

**Continue**
- Open source autopilot
- VS Code and JetBrains
- Works with multiple models (Claude, GPT-4, local)
- Free

**Codeium**
- Free alternative to Copilot
- Inline completions and chat
- Works in most major editors

**Amazon CodeWhisperer**
- Free tier available
- AWS integration
- Good if you're in the AWS ecosystem

### What About Web Interfaces?

Claude.ai, ChatGPT, and Gemini are great for learning and exploration. But for real vibe coding, they break flow. Every time you copy code from a web interface to your editor, you're context-switching. That kills momentum.

Use web interfaces for understanding concepts or trying out ideas. Use codebase-integrated tools for shipping.

## What I Learned From Actually Using These

I use Claude Code for most of my work. Not because it's "the best," but because it matches how I think and work.

Here's what I've learned from using it and talking to developers who use other tools:

### Different Tools Have Different Personalities

Some AI models are defensive. They think about edge cases. They add error handling you didn't ask for. They're cautious.

Others are pragmatic. They give you exactly what you asked for, cleanly, and assume you'll add more if you need it.

Others are thorough. They give you structured logging, configurability, timing instrumentation. Production-ready from the start.

And some are fast. They autocomplete your intent and get you 80% there immediately. You refine from there.

**None of these approaches is wrong.** They're just different vibes.

### Context Matters More Than You Think

The difference between a web interface and a tool that reads your codebase is huge.

When the AI can see your existing code, it writes code that matches your patterns. Same naming conventions. Same error handling style. Same logging approach.

When it can't, you get generic code that you have to adapt.

For quick scripts or learning, generic is fine. For production code in an existing codebase, context is everything.

### Observability Is Still Your Job

No AI tool automatically integrates with Dynatrace, Datadog, Sentry, or whatever you use for observability. They all give you console.log and assume you'll wire it up properly.

This is important: **AI tools give you scaffolding, not integration.**

You still need to:
- Replace console.log with structured logging
- Add trace IDs for request correlation
- Wire up metrics (request count, error rate, latency)
- Connect to your actual observability stack

The AI gets you maybe 70% there. You finish the last 30%. That 30% is what makes it production-ready.

## How to Choose

Here's my honest advice:

**If you want to stay in your terminal:**
- Claude Code or Aider
- Best for iterative development with full project context
- Higher learning curve but powerful once you're comfortable

**If you want an IDE built around AI:**
- Cursor
- Best if you're willing to switch editors for AI-native experience
- Lots of momentum, active development

**If you love your current editor and want AI added:**
- GitHub Copilot if you're willing to pay
- Continue or Codeium if you want open source/free
- Lowest friction to get started

**If you're just getting started:**
- Try Claude.ai or ChatGPT in a browser first
- Learn what AI coding feels like
- Then invest in codebase-integrated tools

## Your Turn: Run the Test

I've put the challenge prompt in `/examples/day02-model-comparison/challenge.md` in this repo.

Here's what I want you to do:

1. **Pick an AI tool you have access to**
2. **Run the challenge** - Give it the weather API prompt
3. **Evaluate the result** using the five-point framework above
4. **Notice what it prioritizes** - Speed? Safety? Observability? Simplicity?

If you can, try the same challenge with a different tool. Compare the approaches. Notice which vibe matches yours.

There's no right answer. There's only what works for you.

**Bonus challenge:** Take whatever code you get and ask the AI to add production-ready observability:
- Integration with a structured logger (Winston, Pino, etc.)
- Trace IDs for request correlation
- Metrics emission (request count, retry count, failure rate)
- Error categorization (rate limit vs network vs API error)

See how it handles the request. Does it know how to wire up real observability tools? Or does it give you more console.log?

## What I Actually Use

Real talk: I use Claude Code in my terminal.

Why?
- It reads my entire codebase
- It edits files directly
- It runs tests and shows me results
- We iterate in a conversation
- I never leave my terminal

No copy-paste. No context-switching. No breaking flow.

The web interface (Claude.ai) is great for asking questions or learning something new. But for shipping code, I need something that lives in my development environment.

That's my choice based on my workflow. Your choice might be different. And that's fine.

The goal of vibe coding isn't to use the "best" tool. It's to find the tool that keeps you in flow.

## Tomorrow: Writing Better Prompts

Now that you know how to evaluate tools, tomorrow I'll show you how to write prompts that get you production-ready code instead of demos.

The difference comes down to how you ask. Be specific about observability. Be explicit about error handling. Ask for what you actually need, not just what works in a demo.

See you tomorrow.

## Key Takeaways

1. **There is no "best" AI coding tool.** Only the right tool for your workflow and vibe.
2. **Evaluate tools on five things:** code quality, observability mindset, context awareness, iteration speed, and vibe.
3. **Use the weather API challenge** to see how any tool thinks about production code.
4. **Context-aware tools** (CLI agents, AI IDEs, editor extensions) beat web interfaces for shipping code.
5. **All AI tools give you scaffolding.** You still wire up real observability.
6. **Match the tool to your vibe.** What keeps you in flow?

---

**Tomorrow:** Day 3 - Prompt Like a Pro: Writing for Machines, Thinking Like a Dev

**Try the challenge:** Prompt and instructions in `/examples/day02-model-comparison/` in this repo

**Subscribe:** Watch this repo or follow along at [31daysofvibecoding.com](https://31daysofvibecoding.com)
