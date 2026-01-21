---
layout: post
title: "Day 27: Building Your Prompt Library: Capture What Works"
date: 2026-01-27
author: Jeff Blankenburg
excerpt: "You've written hundreds of prompts. Some worked great. Stop reinventing them. Build a library of what works and reuse it."
---

I wrote the same prompt three times last week.

Each time I needed to generate tests, I wrote a new prompt from scratch. Each time it was slightly different. Each time I forgot something the previous version had.

This is inefficient. When you find a prompt that works, save it. Categorize it. Reuse it. Stop reinventing prompts every time you need to do the same kind of task.

Your prompt library is an investment. Build it once, benefit forever.

## What Goes in a Prompt Library

Prompts that:
- You use more than once
- Took time to get right
- Work consistently well
- Apply to common tasks

Don't save:
- One-off prompts for unique situations
- Prompts that didn't work
- Prompts that are just your project context

## Get the Starter Kit

I've created a prompt library starter kit you can use right now:

<div style="text-align: left; margin: 2em 0;">
  <a href="https://github.com/jeffblankenburg/31-days-of-vibe-coding/raw/main/examples/prompt-library.zip" style="display: inline-block; padding: 16px 32px; background: #002d46; color: #fdbe01; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; transition: all 0.2s ease; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
    Download Prompt Library Starter Kit (ZIP)
  </a>
</div>

Or browse the templates directly: [examples/prompt-library](https://github.com/jeffblankenburg/31-days-of-vibe-coding/tree/main/examples/prompt-library)

## Library Structure

I organize by task type:

```
prompt-library/
├── generation/        # Creating new code
│   ├── feature.md
│   ├── api-endpoint.md
│   ├── component.md
│   └── test-suite.md
├── review/           # Auditing existing code
│   ├── security.md
│   ├── sre.md
│   ├── maintainability.md
│   └── edge-cases.md
├── debug/            # Finding and fixing problems
│   ├── investigate.md
│   ├── log-analysis.md
│   └── stack-trace.md
├── refactor/         # Improving existing code
│   ├── code-smells.md
│   ├── extract-function.md
│   └── naming.md
└── deploy/           # Shipping to production
    ├── migration.md
    ├── rollback.md
    └── checklist.md
```

Each file contains one prompt template with placeholders, an example, and variations.

## Prompt Template Format

Each saved prompt should have:

```markdown
# Generate API Endpoint

## When to Use
When you need to create a new REST API endpoint.

## Template
```
Generate a REST API endpoint.

Context:
- Framework: {framework}
- Database: {database}
- Auth: {auth_method}

Endpoint:
- Method: {method}
- Path: {path}
- Purpose: {purpose}

Request body:
{request_schema}

Response:
{response_schema}

Include:
- Input validation
- Error handling
- Telemetry
- Tests

Follow the patterns in {reference_file}.
```

## Example Usage
[Show a filled-in example]

## Variations
- For authenticated endpoints: add auth middleware
- For file uploads: add multipart handling
- For pagination: add cursor/offset parameters
```

## Building Your Library Incrementally

Don't create everything at once. Build as you go:

1. **Write a prompt** for your current task
2. **It works well** and produces good output
3. **Extract the template** by replacing specifics with placeholders
4. **Save it** in the appropriate category
5. **Next time**, use the template instead of starting from scratch

## My Core Prompts

Here are the prompts I use most often:

### Feature Generation

```markdown
# Feature Implementation

Build this feature.

## Context
Tech stack: {stack}
Relevant files: {files}

## The Feature
{description}

## Requirements
{requirements}

## Constraints
{constraints}

## Reference
Follow the patterns in {reference}

## Output
1. Implementation code
2. Tests
3. Any migrations needed
```

### Test Generation

```markdown
# Generate Tests

Generate comprehensive tests for this code.

## Code
{code}

## Test Framework
{framework}

## Coverage Goals
- Happy path
- Edge cases: {specific_edge_cases}
- Error cases: {specific_error_cases}
- Security cases if applicable

## Test Patterns
Follow the patterns in {reference_test_file}
```

### Code Review

```markdown
# Code Review: {focus}

Review this code focusing on {focus}.

## Code
{code}

## Check For
{checklist}

## Output Format
For each issue:
- Location (file:line)
- Severity (Critical/High/Medium/Low)
- The problem
- Suggested fix
```

### Debug

```markdown
# Debug This Issue

## Symptom
{what_is_happening}

## Expected
{what_should_happen}

## Context
{relevant_code_and_logs}

## Help Me
1. List likely causes
2. How to confirm each
3. Most likely root cause
4. Suggested fix
```

## Parameterizing Prompts

Good templates have clear placeholders:

**Bad:**
```
Generate code for the thing I'm working on.
Follow our patterns.
```

**Good:**
```
Generate a {component_type} component.

Purpose: {purpose}
Props: {props}
State: {state_requirements}
Events: {events_to_handle}

Follow the patterns in {reference_component}.
```

Clear placeholders remind you what to fill in.

## Prompt Composition

Complex tasks combine multiple prompts:

```markdown
# Complex Feature Workflow

For large features, run these prompts in order:

1. **Architecture Review** (prompts/review/architecture.md)
   Input: Feature description
   Output: Approved approach

2. **Contract Definition** (prompts/generation/contracts.md)
   Input: Approved approach
   Output: API contracts and types

3. **Backend Implementation** (prompts/generation/api-endpoint.md)
   Input: Contracts
   Output: Backend code

4. **Frontend Implementation** (prompts/generation/component.md)
   Input: Contracts
   Output: Frontend code

5. **Test Generation** (prompts/generation/test-suite.md)
   Input: All code
   Output: Tests

6. **Security Review** (prompts/review/security.md)
   Input: All code
   Output: Security issues
```

## Version Controlling Your Prompts

Your prompts are code. Version control them:

- Store in your repo or a dedicated prompts repo
- Commit changes with messages explaining improvements
- Tag versions that work well
- Branch for experiments

## Sharing With Your Team

Prompt libraries multiply when shared:

1. **Central repo** with team prompts
2. **Contributing guidelines** for adding new prompts
3. **Review process** for quality control
4. **Documentation** on when to use what

A team prompt library means everyone benefits from anyone's discoveries.

## Evolving Your Prompts

Prompts need maintenance:

```markdown
# Prompt Improvement Log

## 2024-01-15: test-suite.md
Added edge case categories after forgetting them twice.
Now explicitly lists: null inputs, empty collections, boundary values.

## 2024-01-20: api-endpoint.md
Added telemetry requirement after shipping endpoints without logging.
Now includes: "Add telemetry with {telemetry_service}."

## 2024-02-01: security.md
Expanded OWASP categories after missing an injection vulnerability.
Now covers all OWASP Top 10 explicitly.
```

Track why prompts change. Learn from what didn't work.

## The Prompt Development Loop

1. **Use** a prompt
2. **Evaluate** the output
3. **Identify** what was missing or wrong
4. **Update** the prompt
5. **Repeat**

Your prompts should get better over time.

## Quick Access

Make your prompts easy to use:

- **Keyboard shortcuts** to insert templates
- **Snippets** in your editor
- **CLI tool** to cat prompts
- **Browser bookmarks** if using web UI

Friction kills reuse. Make it effortless.

## Tomorrow

You have prompts that work. You have a library. But how do you know AI is actually helping? Tomorrow I'll cover measuring what matters: is AI making you faster, or just making you feel faster?

---

## Try This Today

1. Think of a prompt you've written multiple times
2. Extract it into a template
3. Save it somewhere you'll find it
4. Use the template next time

Start with one prompt. Add more as you encounter them. In a month, you'll have a library that saves you real time.
