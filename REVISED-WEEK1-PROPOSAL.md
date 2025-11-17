# Revised Week 1: Universal Best Practices (Tool-Agnostic)

## Philosophy Shift

**Old approach:** Compare specific AI agents and tools
**New approach:** Teach practices that work with any AI coding partner, now or future

**Why:** The AI landscape changes monthly. Best practices are timeless.

## Core Themes for Week 1

1. **Spec-driven development** - Define what you want before generating code
2. **Observability-first** - Instrument as you generate, not after
3. **Communication patterns** - How to talk to AI regardless of the model
4. **Iteration discipline** - Small loops, fast feedback, constant verification
5. **Safety mindset** - Guardrails that prevent AI from breaking production
6. **Universal tooling** - Practices that work in any environment

---

## Day 1 – What Is Vibe Coding? ✅ KEEP AS-IS

Already written. Sets the foundation well.

---

## Day 2 (NEW) – Spec-Driven Development: Writing the Contract First

**Abstract:**
Before you ask AI to write code, write the spec. Not documentation. Not requirements. The actual interface, types, and behavior contract. This is TDD for the AI age: specification-driven development where the AI implements what you've already defined.

### Why This Matters
- AI generates better code when it knows the exact contract
- Specs catch design flaws before any code exists
- Tests flow naturally from specs
- Refactoring is safe because the contract is fixed

### Outline
1. **The Problem with "Just Write It"** - Why vague prompts create technical debt
2. **What Is a Spec?** - Interface definitions, type signatures, behavior contracts
3. **Spec-First Workflow** - Define interface → Generate implementation → Verify contract
4. **Example: Building a Spec** - Real TypeScript interface with JSDoc, expected behaviors
5. **AI as Implementation Partner** - How AI fills in the gaps when the contract is clear
6. **Observability in Specs** - Including logging/metrics requirements in the contract
7. **Verification Loop** - Testing that implementation matches spec

### Assets
- Template for TypeScript interface specs with observability hooks
- Example spec → prompt → implementation workflow
- Comparison: spec-first vs code-first outcomes

### Call to Action
- Write one function spec before asking AI to implement it
- Compare the quality to your last "just write this" prompt

---

## Day 3 (REVISED) – Prompt Engineering: Communication, Not Commands

**Abstract:**
Stop treating AI like a compiler. Start treating it like a junior developer who's smart but needs context. Learn the universal principles of prompting that work across any AI model: context, constraints, examples, and verification criteria.

### Key Shift
Not "which prompt works best with Claude vs ChatGPT" but "how to communicate effectively with any AI"

### Outline
1. **Prompts Are Communication** - Like code review comments or pair programming dialogue
2. **The Universal Pattern** - Context → Intent → Constraints → Format → Verification
3. **Context That Matters** - Architecture, performance needs, error scenarios, observability requirements
4. **Constraints That Help** - Language, framework, style, patterns to follow/avoid
5. **Examples That Teach** - Showing the AI your coding style through examples
6. **Verification Built In** - "How will we know this works?" as part of the prompt
7. **Anti-Patterns** - Over-specifying, under-specifying, missing context

### Assets
- Prompt template with all key sections
- Before/after examples showing how context improves output
- Checklist: "Did I include...?"

### Call to Action
- Rewrite one of your recent prompts using the template
- Note what changed in the AI's response

---

## Day 4 (REVISED) – The Iteration Loop: Small, Fast, Verified

**Abstract:**
Vibe coding isn't one big prompt. It's a rhythm: specify → generate → verify → refine. Learn to work in 5-minute loops where each iteration is tested, observed, and improved before moving forward. This is the core discipline that makes AI-assisted development reliable.

### Core Concept
**Don't ask AI to build your entire feature.** Ask it to build one piece at a time, verify it works, then move to the next piece.

### Outline
1. **Why Big Prompts Fail** - Context loss, compounding errors, untestable output
2. **The 5-Minute Loop** - Spec one thing → Generate → Test → Observe → Next
3. **Defining "Done" Per Loop** - Clear exit criteria for each iteration
4. **Example Session** - Building an API endpoint in 4 iterations
5. **Observability Per Loop** - Each iteration must be observable before the next
6. **When to Stop** - Knowing when "good enough" is good enough
7. **Loop Mistakes** - Going too fast, skipping verification, losing context

### Assets
- Loop template with checkpoints
- Real transcript of a 4-loop feature build
- Metrics: iteration size vs bug rate

### Call to Action
- Build one small feature in 3-5 loops
- Track: time per loop, issues caught, final quality

---

## Day 5 (REVISED) – Observability-First: Logging Before It Breaks

**Abstract:**
When you generate code faster, you ship bugs faster. The only defense is observability from line one. Learn to build logging, metrics, and tracing into your prompts so you know immediately when AI-generated code misbehaves in production.

### Core Principle
**Never generate code without instrumentation.** Logs, metrics, and traces are not optional. They're part of the specification.

### Outline
1. **Why AI Code Needs More Observability** - It's optimistic by default
2. **The Observability Contract** - What every function must log/measure
3. **Prompting for Instrumentation** - Including logging requirements in specs
4. **What to Log** - Decisions, errors, performance, state changes
5. **What to Measure** - Request counts, latencies, error rates, retry counts
6. **Verification Through Logs** - Using observability to prove code works
7. **Example** - Same function with/without observability

### Assets
- Observability spec template
- Prompt additions for logging/metrics
- Example of catching AI bugs through logs

### Call to Action
- Add observability requirements to your next prompt
- Deploy and watch the logs - what did you learn?

---

## Day 6 (REVISED) – Safety First: Guardrails for AI-Generated Code

**Abstract:**
AI moves fast and can break things. Learn to build safety nets: automated tests, type checking, code review checklists, and runtime verification that catch problems before they reach production. These practices work regardless of which AI you use.

### Core Concept
**Trust but verify.** AI is a tool, not a substitute for engineering judgment.

### Outline
1. **Common AI Failure Modes** - Hallucinations, missing edge cases, security issues
2. **Pre-Commit Checks** - Linting, type checking, security scanning
3. **Test Generation** - Using AI to write tests for AI-generated code
4. **Code Review for AI Code** - What to look for specifically
5. **Runtime Verification** - How observability catches issues tests miss
6. **The Human Override** - When to stop and rewrite manually
7. **Checklist** - Minimum safety requirements before merging

### Assets
- AI code review checklist
- Test generation prompt templates
- Example: Catching a hallucinated import before production

### Call to Action
- Review one piece of AI-generated code with the checklist
- Add one safety check to your workflow

---

## Day 7 (NEW) – Building Your Vibe: Environment, Style, and Workflow

**Abstract:**
Vibe coding requires the right setup. Learn to configure your development environment, establish coding style that AI can follow, and create workflow patterns that keep you in flow regardless of which AI tool you're using.

### Key Shift
Not "how to set up Claude Code vs Cursor" but "how to create an environment where any AI tool enhances your flow"

### Outline
1. **Flow Requires Friction Removal** - Minimize context switching
2. **Editor Setup** - Fast access to AI, testing, and observability
3. **Style Guide for AI** - Teaching any AI your coding conventions
4. **Workflow Patterns** - Keyboard shortcuts, templates, checklists
5. **Observability Integration** - Quick access to logs and metrics
6. **The Minimal Viable Setup** - Start here, expand later
7. **Personal Optimization** - Find what keeps YOU in flow

### Assets
- Environment setup checklist (tool-agnostic)
- Style guide template for AI context
- Workflow patterns that work with any AI

### Call to Action
- Implement one environment improvement
- Measure: did it reduce context switching?

---

## Key Changes from Original Week 1

**Removed:**
- Day 2: Tool comparison (dated quickly)
- Tool-specific setup instructions
- "Which AI is best" discussions

**Added:**
- Spec-driven development as core practice
- Universal prompting principles
- Explicit iteration discipline
- Observability-first mindset from day 2
- Safety practices that work with any AI

**Why This Is Better:**
1. **Timeless** - Practices remain relevant as tools evolve
2. **Practical** - Immediately applicable regardless of AI choice
3. **Professional** - Focuses on engineering discipline, not tool features
4. **Observability-centric** - Maintains the core theme throughout
5. **Spec-driven** - Introduces the methodology that makes AI reliable

## What This Sets Up for Later Weeks

Week 2-4 already focus on practices (testing, debugging, refactoring, etc.). This revised Week 1 creates a better foundation:

- **Week 1** - Core practices and mindset
- **Week 2** - Applying practices to common tasks
- **Week 3** - Scaling practices to teams and production
- **Week 4** - Advanced topics and future thinking

The series now flows from principles → practices → scale → future, all tool-agnostic.
