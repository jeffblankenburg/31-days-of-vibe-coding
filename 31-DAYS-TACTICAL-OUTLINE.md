# 31 Days of Vibe Coding - Tactical Outline

**Core Philosophy:** Battle-tested tactics for working with AI coding tools. Each day solves a specific problem you'll actually face. Every article includes prompt templates you can use immediately.

**Not theory. Not hype. Just what works.**

---

## Week 1: Foundation - Learning to Work With AI (Days 1-7)

### Day 1 – What Is Vibe Coding? ✅ WRITTEN

**The Problem:** You've heard about AI coding tools but don't know what actually works in practice.

**What You'll Learn:** The four principles that separate vibe coding from hope-driven development.

**Prompt Template:** None (foundation setting)

---

### Day 2 – GitHub Issues Are Your AI's Product Backlog ✅ WRITTEN

**The Problem:** You're throwing half-formed ideas at AI in chat and getting messy results.

**What You'll Learn:** How to write GitHub Issues that give AI complete context and maintain it across sessions.

**Prompt Templates:**
- Feature specification template
- Having AI help you write better issues
- Asking AI to create follow-up issues during implementation

---

### Day 3 – Component Libraries & Style Guides: Show AI What Good Looks Like

**The Problem:** AI generates generic UI that doesn't match your design system.

**What You'll Learn:** How to build a component library that AI can reference to generate consistent, on-brand UI.

**Prompt Templates:**
- "Build this using our existing components"
- "Generate a new component that matches our design system"
- "Audit this UI against our component library"

**What You'll Build:** A reference component library structure that AI can use

---

### Day 4 – Observability First: Know When AI Code Breaks

**The Problem:** You shipped AI-generated code and have no idea if it's working in production.

**What You'll Learn:** How to build observability into every prompt so you know immediately when something breaks.

**Prompt Templates:**
- "Add comprehensive logging to this function"
- "What metrics should we track for this feature?"
- "Generate monitoring dashboards for this code"
- Including observability requirements in every GitHub Issue

**Example:** OAuth feature with full instrumentation

---

### Day 5 – The Prompting Pattern That Actually Works

**The Problem:** Your prompts are vague and AI output is unpredictable.

**What You'll Learn:** The universal prompting pattern: Context → Intent → Constraints → Examples → Verification

**Prompt Templates:**
- Base template with all five sections
- Feature implementation prompt
- Bug fix prompt
- Refactoring prompt
- Test generation prompt

**Before/After:** See how the pattern improves output quality

---

### Day 6 – Breaking Features Into Phases (Don't Build It All At Once)

**The Problem:** You ask AI to build an entire feature and it hallucinates, loses context, or produces untestable code.

**What You'll Learn:** How to break complex features into 3-5 phases that AI can handle reliably.

**Prompt Templates:**
- "Break this feature into implementation phases"
- "Implement phase 1 only, here's what it includes"
- "Now implement phase 2, building on phase 1"

**Example:** Building an OAuth feature in 4 phases instead of one big prompt

---

### Day 7 – Context Management: What to Include, When to Start Fresh

**The Problem:** The chat is huge, AI forgot earlier decisions, and quality is degrading.

**What You'll Learn:** When to start a new chat, what context to include, and how to maintain continuity across sessions.

**Prompt Templates:**
- "Here's the context from our previous conversation"
- "These are the files we're working with"
- Starting a new chat without losing the thread

**Rule of Thumb:** When to continue vs when to start fresh

---

## Week 2: Tactics - Managing AI's Quirks (Days 8-14)

### Day 8 – When to Restart vs When to Keep Going

**The Problem:** AI went down the wrong path. Do you keep trying to fix it or start over?

**What You'll Learn:** The 3-request rule and how to recognize when AI is in a rabbit hole.

**Prompt Templates:**
- "Stop. Let's restart with a different approach"
- "Before we continue, list the top 3 ways this could go wrong"
- Starting over with a refined prompt

**Decision Tree:** Keep going vs restart vs refine prompt

---

### Day 9 – Git Is Your Undo Button for AI Mistakes

**The Problem:** AI changed 10 files and broke everything. You don't know what changed or how to get back.

**What You'll Learn:** Using Git strategically with AI to make every change reversible.

**Prompt Templates:**
- "What files will this change affect?"
- "Generate a git commit message for these changes"
- "What should I check before committing this?"

**Workflow:** Commit before big AI changes, commit after successful changes

---

### Day 10 – Agent Configuration: Set Your Standards Once

**The Problem:** You're repeating "use TypeScript" and "add error handling" in every single prompt.

**What You'll Learn:** How to configure AI agents once with your tech stack, patterns, and standards.

**Prompt Templates:**
- Configuration file templates (CLAUDE.md, .cursorrules, etc.)
- "Follow the standards in our agent configuration"
- Testing your configuration

**Example:** Complete agent config that generates production-ready code

---

### Day 11 – Teaching AI Your Patterns With Examples

**The Problem:** AI writes generic code that doesn't match your codebase style.

**What You'll Learn:** How to reference existing code to teach AI your patterns.

**Prompt Templates:**
- "Build this new component using the same pattern as [existing component]"
- "Follow the error handling pattern from [file]"
- "Match the structure of [existing feature]"

**Trick:** AI learns fast from good examples

---

### Day 12 – The "Common AI Mistakes" File That Saves Your Sanity

**The Problem:** AI keeps making the same mistakes over and over.

**What You'll Learn:** How to maintain a file of AI's repeated mistakes and reference it in prompts.

**Prompt Templates:**
- "Review our common-ai-mistakes.md file and avoid these patterns"
- "Check this code against our known AI pitfalls"
- Building your mistakes file

**Example:** Real common-ai-mistakes.md file

---

### Day 13 – Stop AI From Changing What You Didn't Ask For

**The Problem:** You asked AI to fix one thing and it "helpfully" changed five other things.

**What You'll Learn:** How to constrain AI to only modify what you explicitly request.

**Prompt Templates:**
- "ONLY modify [specific function]. Do not change anything else."
- "Make this exact change and nothing more"
- "If you need to change anything else, ask first"

**The Magic Phrase:** That actually works to constrain AI

---

### Day 14 – When AI Starts Hallucinating: How to Spot and Stop It

**The Problem:** AI is confidently generating functions that don't exist or patterns that won't work.

**What You'll Learn:** Common hallucination patterns and how to catch them before they ship.

**Prompt Templates:**
- "Verify these imports actually exist"
- "Check if this API/library supports what you're using"
- "Show me documentation for this approach"

**Red Flags:** Signs AI is hallucinating

---

## Week 3: Expert Roles - AI as Your Team (Days 15-21)

### Day 15 – AI as Security Auditor: Finding Vulnerabilities You'd Miss

**The Problem:** You need to review AI-generated code for security issues but don't know where to start.

**What You'll Learn:** How to use AI as a security expert to audit code.

**Prompt Templates:**
- "Act as a security expert. Audit this code for vulnerabilities"
- "Look for: injection attacks, exposed secrets, weak auth, missing rate limiting"
- "Assume the user is actively trying to break this"
- Multi-pass review with different security focuses

**Example:** Security audit that catches real vulnerabilities

---

### Day 16 – AI as Performance Auditor: Making Code Fast

**The Problem:** AI writes correct code but it's slow and inefficient.

**What You'll Learn:** How to prompt AI to review and optimize for performance.

**Prompt Templates:**
- "Act as a performance expert. Review this code for efficiency issues"
- "Identify: N+1 queries, missing caching, inefficient algorithms"
- "Suggest specific optimizations with benchmarks"

**Example:** Performance review that finds real bottlenecks

---

### Day 17 – AI as Test Generator: Comprehensive Test Coverage

**The Problem:** You need tests for AI-generated code but writing them manually is slow.

**What You'll Learn:** How to have AI generate comprehensive test suites.

**Prompt Templates:**
- "Generate tests: happy path, edge cases, error cases, security scenarios"
- "Achieve 90%+ coverage for this feature"
- "Write integration tests for this multi-file feature"
- "Generate E2E tests for this user flow"

**Example:** Complete test suite generated by AI

---

### Day 18 – AI as Code Reviewer: Multiple Review Passes

**The Problem:** You need to review AI code but one pass isn't enough.

**What You'll Learn:** How to use multiple AI personas for thorough review.

**Prompt Templates:**
- Pass 1: "Review for security vulnerabilities"
- Pass 2: "Review for performance issues"
- Pass 3: "Review for maintainability and patterns"
- Pass 4: "Review for edge cases and error handling"
- Consolidating feedback from multiple passes

**Workflow:** Multi-pass review system

---

### Day 19 – AI as Debugger: Systematic Bug Hunting

**The Problem:** There's a bug and you're not sure where to start.

**What You'll Learn:** How to systematically debug with AI as your partner.

**Prompt Templates:**
- "Here's the error, the code, and what I expected. What's wrong?"
- "List the top 5 suspects causing this error"
- "Add logging to help us diagnose this"
- "Analyze these logs and identify the root cause"

**Example:** Debugging session from error to fix

---

### Day 20 – AI as Architect: Evaluating Design Decisions

**The Problem:** You're not sure if your approach is the best one.

**What You'll Learn:** How to have AI evaluate architectural decisions.

**Prompt Templates:**
- "Evaluate this architecture. What could go wrong?"
- "Suggest 3 alternative approaches with tradeoffs"
- "What will be hard to change later?"
- "How will this scale?"

**Example:** Architecture review that catches problems early

---

### Day 21 – Multi-Persona Review: The Full QA Team

**The Problem:** You need comprehensive review but don't have a team.

**What You'll Learn:** How to orchestrate multiple AI personas for complete code review.

**Prompt Templates:**
- Complete multi-persona review workflow
- Security expert + Performance expert + Test expert
- Synthesizing feedback from all personas
- Prioritizing issues

**Example:** Full review workflow for a feature

---

## Week 4: Production & Mastery (Days 22-31)

### Day 22 – Production Debugging: When It's On Fire

**The Problem:** Production is broken and you need answers fast.

**What You'll Learn:** How to use AI during incident response.

**Prompt Templates:**
- "Analyze this stack trace and error logs"
- "Correlate these errors across services"
- "Propose a fix with rollback plan"
- "What monitoring would have caught this earlier?"

**Example:** Incident response with AI

---

### Day 23 – Asking AI for Edge Cases You'd Never Think Of

**The Problem:** You thought of the happy path. What about the 20 edge cases?

**What You'll Learn:** How to prompt AI to generate comprehensive edge cases.

**Prompt Templates:**
- "List every edge case for this function"
- "What happens when: network fails, DB is down, user is malicious, disk is full..."
- "Generate error handling for all failure modes"

**Example:** Edge case analysis that finds real issues

---

### Day 24 – Deployment Automation: Let AI Generate the Scary Parts

**The Problem:** You need migrations, rollback scripts, and deployment docs for AI-generated code.

**What You'll Learn:** How to have AI generate complete deployment packages.

**Prompt Templates:**
- "Generate migration scripts with rollback procedures"
- "Create deployment checklist for this feature"
- "Write runbook for when this breaks in production"
- "Generate infrastructure as code for this"

**Example:** Complete deployment package

---

### Day 25 – Refactoring AI Code: From Working to Maintainable

**The Problem:** AI code works but it's messy and hard to maintain.

**What You'll Learn:** How to systematically refactor AI-generated code.

**Prompt Templates:**
- "Refactor this for maintainability without changing behavior"
- "Identify code smells in this implementation"
- "Extract repeated patterns into reusable functions"
- "Improve naming and structure"

**Example:** Refactoring session with tests as safety net

---

### Day 26 – Working Across Multiple Services With AI

**The Problem:** Your feature spans frontend, backend, database, and external APIs.

**What You'll Learn:** How to coordinate AI across multiple services.

**Prompt Templates:**
- "Plan this feature across all affected services"
- "Generate backend API for this frontend feature"
- "Ensure consistency between frontend and backend"
- "Create integration tests across services"

**Example:** Multi-service feature from planning to deployment

---

### Day 27 – Building Your Prompt Library: Capture What Works

**The Problem:** You've found prompts that work great but you keep forgetting them.

**What You'll Learn:** How to build and maintain a personal prompt library.

**Prompt Templates:**
- Prompt library structure
- Template for feature requests
- Template for bug fixes
- Template for reviews
- Template for refactoring
- Version controlling your prompts

**Example:** Complete personal prompt library

---

### Day 28 – The AI Tool Landscape: When to Use What

**The Problem:** Claude vs ChatGPT vs Copilot vs Cursor - which tool for which task?

**What You'll Learn:** Practical guide to AI coding tools and when to use each.

**Coverage:**
- Claude Code for codebase-wide changes
- ChatGPT for planning and exploration
- Copilot for inline suggestions
- Cursor for AI-first development
- When to use multiple tools together

**Not a comparison:** Just practical "use this when..."

---

### Day 29 – Measuring What Matters: Is AI Actually Helping?

**The Problem:** You're using AI but don't know if you're actually shipping faster.

**What You'll Learn:** What metrics actually tell you if AI is working.

**What to Measure:**
- Time from GitHub Issue to deployment
- Features shipped per week
- Bug rates in AI code vs manual code
- Time spent on boilerplate vs architecture
- Where AI helps most (tests? debugging? features?)

**Example:** Real velocity analysis

---

### Day 30 – Managing Technical Debt When Shipping Fast

**The Problem:** You're shipping features in hours but debt is accumulating.

**What You'll Learn:** How to ship fast without drowning in debt.

**Prompt Templates:**
- "Review this feature for technical debt"
- "Suggest refactoring to reduce debt"
- "What will be painful to change later?"

**Strategy:** Ship fast, schedule cleanup, keep debt manageable

---

### Day 31 – Your Personal Vibe Coding Playbook

**The Problem:** You've learned 30 days of tactics. Now make it yours.

**What You'll Build:**
- Your prompt library
- Your agent configuration
- Your common-ai-mistakes.md file
- Your multi-persona review workflow
- Your component library
- Your personal workflow

**Final Challenge:** Ship a complete feature using everything you learned

**What's Next:** Keep learning, keep shipping, keep sharing

---

## Key Changes From Original Outline

**OUT:**
- General software development practices
- Language-specific tutorials
- Tool-specific deep dives (except Day 28 overview)
- Theoretical AI discussion

**IN:**
- Specific tactical problems and solutions
- Reusable prompt templates on every day
- Real examples from production
- Honest about AI's quirks and failures
- Immediately actionable techniques
- Multi-persona review workflows
- Practical "when to use what" guidance

**Every Day Includes:**
1. The specific problem it solves
2. What you'll learn (tactics, not theory)
3. Prompt templates you can use immediately
4. Real examples
5. Common pitfalls to avoid

**Tone:**
- Conversational and honest
- "Here's what actually works"
- "Here's where AI messes up"
- "Here's the workaround"
- Fun, engaging, useful

**Not:**
- Hype or marketing speak
- "AI will change everything"
- Pretending it's all easy
- Hiding the messy parts

---

## Template Structure for Each Article

```
# Day X: [Tactical Title]

## The Problem

[Specific pain point readers face]

## Why This Happens

[Honest explanation of AI's behavior]

## The Solution

[Step-by-step tactical approach]

## Prompt Templates

### [Template Name]
```
[Actual prompt template]
```

### [Another Template]
```
[Another prompt template]
```

## Real Example

[Complete example showing before/after]

## Common Pitfalls

- [What goes wrong]
- [How to avoid it]

## Try This Today

[Specific action reader can take]

## Tomorrow

[Setup for next day]
```

---

## What Makes This Different

1. **Battle-tested tactics** - not theory
2. **Prompt templates** - take and use immediately
3. **Honest about mess** - "here's when AI screws up"
4. **Specific problems** - "how do I stop AI from hallucinating?" not "understanding AI"
5. **Multi-persona workflows** - using AI in different expert roles
6. **Immediately actionable** - do this today, see results today

This is the playbook you wish existed when you started vibe coding.
