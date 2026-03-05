# 31 Days of Vibe Coding - Publishing Schedule

## How It Works

Posts are automatically published based on their date. Posts with future dates will NOT appear on the site until that date arrives.

## Complete Schedule (January 2026)

### Week 1: Foundation - Learning to Work With AI

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 1 | 2026-01-01 | `2026-01-01-what-is-vibe-coding.md` | What Is Vibe Coding? |
| 2 | 2026-01-02 | `2026-01-02-github-issues-are-your-product-backlog.md` | GitHub Issues Are Your AI's Product Backlog |
| 3 | 2026-01-03 | `2026-01-03-component-libraries-and-style-guides.md` | Component Libraries & Style Guides: Show AI What Good Looks Like |
| 4 | 2026-01-04 | `2026-01-04-observability-first.md` | Observability First: Know When AI Code Breaks |
| 5 | 2026-01-05 | `2026-01-05-the-prompting-pattern-that-actually-works.md` | The Prompting Pattern That Actually Works |
| 6 | 2026-01-06 | `2026-01-06-breaking-features-into-phases.md` | Breaking Features Into Phases (Don't Build It All At Once) |
| 7 | 2026-01-07 | `2026-01-07-context-management.md` | Context Management: What to Include, When to Start Fresh |

### Week 2: Tactics - Managing AI's Quirks

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 8 | 2026-01-08 | `2026-01-08-when-to-restart-vs-keep-going.md` | When to Restart vs When to Keep Going |
| 9 | 2026-01-09 | `2026-01-09-git-is-your-undo-button.md` | Git Is Your Undo Button for AI Mistakes |
| 10 | 2026-01-10 | `2026-01-10-agent-configuration.md` | Agent Configuration: Set Your Standards Once |
| 11 | 2026-01-11 | `2026-01-11-teaching-ai-your-patterns.md` | Teaching AI Your Patterns With Examples |
| 12 | 2026-01-12 | `2026-01-12-common-ai-mistakes-file.md` | The "Common AI Mistakes" File That Saves Your Sanity |
| 13 | 2026-01-13 | `2026-01-13-stop-ai-from-changing-everything.md` | Stop AI From Changing What You Didn't Ask For |
| 14 | 2026-01-14 | `2026-01-14-when-ai-hallucinates.md` | When AI Starts Hallucinating: How to Spot and Stop It |

### Week 3: Expert Roles - AI as Your Team

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 15 | 2026-01-15 | `2026-01-15-context-tokens-and-compacting.md` | Context, Tokens, and When to Compact |
| 16 | 2026-01-16 | `2026-01-16-ai-as-security-auditor.md` | AI as Security Auditor: Finding Vulnerabilities You'd Miss |
| 17 | 2026-01-17 | `2026-01-17-ai-as-sre.md` | AI as SRE: Is This Code Operable? |
| 18 | 2026-01-18 | `2026-01-18-ai-as-test-generator.md` | AI as Test Generator: Comprehensive Test Coverage |
| 19 | 2026-01-19 | `2026-01-19-ai-as-code-reviewer.md` | AI as Code Reviewer: Multiple Review Passes |
| 20 | 2026-01-20 | `2026-01-20-ai-as-debugger.md` | AI as Debugger: Systematic Bug Hunting |
| 21 | 2026-01-21 | `2026-01-21-ai-as-architect.md` | AI as Architect: Evaluating Design Decisions |

### Week 4: Production & Mastery

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 22 | 2026-01-22 | `2026-01-22-production-debugging.md` | Production Debugging: When It's On Fire |
| 23 | 2026-01-23 | `2026-01-23-edge-cases.md` | Asking AI for Edge Cases You'd Never Think Of |
| 24 | 2026-01-24 | `2026-01-24-deployment-automation.md` | Deployment Automation: Let AI Generate the Scary Parts |
| 25 | 2026-01-25 | `2026-01-25-refactoring-ai-code.md` | Refactoring AI Code: From Working to Maintainable |
| 26 | 2026-01-26 | `2026-01-26-multiple-services.md` | Working Across Multiple Services With AI |
| 27 | 2026-01-27 | `2026-01-27-prompt-library.md` | Building Your Prompt Library: Capture What Works |
| 28 | 2026-01-28 | `2026-01-28-ai-tool-landscape.md` | The AI Tool Landscape: When to Use What |
| 29 | 2026-01-29 | `2026-01-29-measuring-what-matters.md` | Measuring What Matters: Is AI Actually Helping? |
| 30 | 2026-01-30 | `2026-01-30-technical-debt.md` | Managing Technical Debt When Shipping Fast |
| 31 | 2026-01-31 | `2026-01-31-personal-playbook.md` | Your Personal Vibe Coding Playbook |

## Front Matter Template

For each new post, use this template:

```yaml
---
layout: post
title: "Day X: Your Title Here"
date: 2026-01-XX
author: Jeff Blankenburg
excerpt: "Brief excerpt for homepage listing (1-2 sentences)"
---
```

## Publishing Workflow

### 1. Write All Posts in Advance

Create all 31 posts with their respective dates (2026-01-01 through 2026-01-31).

### 2. Commit and Push Everything

```bash
git add _posts/
git commit -m "Add all 31 posts"
git push
```

### 3. Automatic Daily Publishing

- Posts will automatically appear on their scheduled date
- GitHub Pages checks dates when it rebuilds
- No manual action needed each day

### 4. Force a Manual Rebuild (if needed)

If a post doesn't appear on its date, trigger a rebuild:

```bash
git commit --allow-empty -m "Trigger rebuild"
git push
```

Or go to: `Settings → Pages` and click "Re-run jobs"

## Testing Locally

**Preview only published posts** (what production looks like):
```bash
bundle exec jekyll serve
```

**Preview ALL posts including future ones** (for proofreading):
```bash
bundle exec jekyll serve --future
```

## Current Status

- ✅ All 31 posts written
- ⏳ Publishing starts January 1, 2026

---

**Notes:**
- All posts are dated January 2026 and will auto-publish on their respective dates
- The site is configured with `future: false` so future posts won't appear until their date
