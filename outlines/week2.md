# 31 Days of Vibe Coding – Week 2 (Days 8–15)

---

## Day 8 – Explaining the Why: Teaching AI to Think in Context

**Abstract:**  
When you tell AI *what* to do, it gives you a function. When you tell it *why*, it builds a system. This post explores how to feed context into your prompts (business logic, data constraints, performance targets) so the AI becomes your design partner instead of a code vending machine.

### Outline
1. **Introduction** – The problem with “just write the code” prompts.  
2. **Why Context Matters** – Examples of code that fails because it ignores constraints.  
3. **Adding the Why** – How to embed reasoning, goals, and assumptions in prompts.  
4. **Operational Thinking** – Teaching AI about throughput, latency, and error budgets.  
5. **Observability Link** – Use telemetry and metrics to give your AI factual grounding.  
6. **Prompt Example** – Show a before/after where context improves code quality.

### Asset Notes
- `/day08-context/` prompt examples and improved outputs.  
- Optional diagram: context layering in prompt design.

### Call to Action
- Take one of your past prompts and rewrite it to include the “why.”  
- Analytics: link clicks to GitHub prompt folder.

---

## Day 9 – The Vibe Coding Commandments

**Abstract:**  
Every great methodology has a manifesto. This one's simple: speed, clarity, observability, and flow. I'll break down the 11 core commandments of vibe coding, rules that keep you productive and your AI accountable.

### Outline
1. **Introduction** – Why codifying behavior matters.  
2. **Commandments 1–3: Mindset** – Flow, curiosity, iteration.  
3. **Commandments 4–6: Craft** – Clarity, versioning, observability.  
4. **Commandments 7–9: Collaboration** – Communication, transparency, review.  
5. **Commandments 10–11: Longevity** – Maintainability and ethical use.  
6. **Posterization** – How to make this manifesto visible in your dev space.

### Asset Notes
- `/day09-commandments/` poster PDF + printable cheat sheet.  
- Markdown version for GitHub README.

### Call to Action
- Download and share the commandments poster; tag your workspace setup.  
- Analytics: PDF downloads, social mentions.

---

## Day 10 – Using AI for System Design

**Abstract:**  
AI can code functions, but it can also architect systems. I'll use vibe coding techniques to design a small service from scratch (APIs, databases, observability strategy) and show how the AI helps reason about trade-offs like scalability and cost.

### Outline
1. **Reframing AI as an Architect** – From syntax helper to system thinker.  
2. **Design Prompts** – Using natural language for architecture exploration.  
3. **Example System** – Build a “micro URL shortener” with observability baked in.  
4. **Reviewing AI Diagrams and Flows** – How to validate design logic.  
5. **Building the Blueprint** – Turning AI text into diagrams and code skeletons.  
6. **Pitfalls** – When AI over-engineers or contradicts itself.

### Asset Notes
- `/day10-system-design/` prompt transcripts, Mermaid diagrams, and sample architecture doc.  
- Optional Dynatrace Smartscape visualization screenshot.

### Call to Action
- Try designing your next feature through an AI-led design session.  
- Analytics: repo issue submissions with architecture experiments.

---

## Day 11 – Code Reviews with AI

**Abstract:**  
Your AI can review your pull requests, catch errors, and suggest refactors, but it needs coaching. I'll show you how to set up effective AI code reviews, complete with custom checklists and observability awareness to catch silent failures.

### Outline
1. **Intro Story** – The moment you realize your AI reviewer never sleeps.  
2. **Setting Ground Rules** – Review structure, tone, and criteria.  
3. **Prompt Framework** – The “Explain, Evaluate, Suggest” pattern.  
4. **Observability Checks** – How to prompt the AI to look for missing metrics/logs.  
5. **Blended Review** – Combining AI and human comments into a single PR.  
6. **Iterative Feedback Loops** – Improving the reviewer over time.

### Asset Notes
- `/day11-code-review/` prompt examples and review checklist template.  
- Example PR transcript with AI + human commentary.

### Call to Action
- Add AI reviews to one repo this week; share your best “caught bug” story.  
- Analytics: repo forks or AI review prompt usage stats.

---

## Day 12 – Documentation That Writes Itself

**Abstract:**  
If you're already writing clean code and clear prompts, the docs are halfway done. This post shows how to use AI to generate documentation that reads like a human wrote it and even references real metrics and traces to make it operationally useful.

### Outline
1. **The Case for AI Docs** – The cost of outdated documentation.  
2. **Doc Generation 101** – How to extract context from code comments.  
3. **Living Documentation** – Use AI to regenerate docs post-deploy.  
4. **Observability Data as Narrative** – Turn metrics into documentation footnotes.  
5. **Practical Workflow** – README + changelog + test coverage reports.  
6. **Common Failures** – When AI overexplains or invents context.

### Asset Notes
- `/day12-docs/` scripts for auto-generating README.md + test summaries.  
- Example prompt for doc updates post-commit.

### Call to Action
- Use AI to update one README today; measure time saved.  
- Analytics: before/after doc length comparison or PR timestamps.

---

## Day 13 – Testing Without the Pain

**Abstract:**  
No one loves writing tests, except your AI. I'll show how to turn vibe coding into a test-driven flow, where the AI helps you generate, expand, and validate tests automatically. I'll also show how to connect them to runtime metrics for real proof of coverage.

### Outline
1. **Testing Mindset** – Reframing AI as a test generator.  
2. **Prompting for Tests** – How to specify intent, edge cases, and coverage.  
3. **Connecting to Observability** – Validating test performance in real-time.  
4. **Example** – Generate tests for an API endpoint with error handling.  
5. **Automation** – CI/CD integration with auto-generated tests.  
6. **Limitations** – When you still need human intuition for coverage.

### Asset Notes
- `/day13-testing/` example prompts + Jest/Pytest test sets.  
- Optional dashboard template linking CI to Dynatrace metrics.

### Call to Action
- Add one AI-generated test suite to your repo.  
- Analytics: track CI runs, success rates, or repo stars.

---

## Day 14 – Debugging in Dialogue

**Abstract:**  
Debugging is no longer about staring at stack traces. It's a conversation. Learn how to feed your AI logs, errors, and trace snippets and walk it through diagnosing and fixing the issue collaboratively.

### Outline
1. **Why Dialogue Debugging Works** – Natural reasoning beats grep.  
2. **Setting the Scene** – Choosing what to share (logs, context).  
3. **Prompting for Hypotheses** – “What could cause this behavior?”  
4. **Tracing the Root Cause** – Mapping logs to code lines.  
5. **Applying the Fix** – Generate patch + test instantly.  
6. **Postmortem Mindset** – Write down lessons for future prompts.

### Asset Notes
- `/day14-debugging/` transcript of log-based debugging.  
- Example of feeding logs via structured prompts.

### Call to Action
- Try debugging your next bug with AI guidance; document the steps.  
- Analytics: clicks to debugging repo or comment feedback.

---

## Day 15 – Refactoring at Scale

**Abstract:**  
AI can help you refactor entire systems, but only if you can trust the result. I'll cover techniques for large-scale refactoring, testing, and verification using AI, and how observability becomes your safety net during code transformation.

### Outline
1. **Motivation** – Why large refactors are a great AI use case.  
2. **Breaking It Down** – Safe, modular refactoring strategies.  
3. **Prompting for Refactor Goals** – Style, performance, clarity.  
4. **Verification Loops** – Testing, diffing, and runtime validation.  
5. **Observability as Assurance** – Watch for new anomalies post-refactor.  
6. **Case Study** – Refactoring a logging system across microservices.

### Asset Notes
- `/day15-refactor/` before-and-after code samples and prompts.  
- Optional Dynatrace trace comparison screenshot.

### Call to Action
- Choose one small refactor task and let AI assist.  
- Analytics: link clicks to before/after examples or repo forks.

---