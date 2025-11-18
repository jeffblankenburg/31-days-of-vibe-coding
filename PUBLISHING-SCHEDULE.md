# 31 Days of Vibe Coding - Publishing Schedule

## How It Works

Posts are automatically published based on their date. Posts with future dates will NOT appear on the site until that date arrives.

## Complete Schedule (January 2025)

### Week 1: Introduction + The 10 Fundamentals (Start)

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 1 | 2025-01-01 | `2025-01-01-what-is-vibe-coding.md` | ✅ What Is Vibe Coding? |
| 2 | 2025-01-02 | `2025-01-02-plan-features-not-functions.md` | ✅ Fundamental #1: Plan Features, Not Functions |
| 3 | 2025-01-03 | `2025-01-03-tests-are-your-specification.md` | Fundamental #2: Tests Are Your Specification |
| 4 | 2025-01-04 | `2025-01-04-observability-is-proof.md` | Fundamental #3: Observability Is Proof |
| 5 | 2025-01-05 | `2025-01-05-automate-verification.md` | Fundamental #4: Automate Verification |
| 6 | 2025-01-06 | `2025-01-06-every-deployment-reversible.md` | Fundamental #5: Every Deployment Must Be Reversible |
| 7 | 2025-01-07 | `2025-01-07-security-is-automated.md` | Fundamental #6: Security Is Automated or It Doesn't Exist |

### Week 2: The 10 Fundamentals (Continued)

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 8 | 2025-01-08 | `2025-01-08-trust-but-verify.md` | Fundamental #7: Trust the AI, Verify Everything |
| 9 | 2025-01-09 | `2025-01-09-stay-in-flow.md` | Fundamental #8: Stay in Flow, Ship with Confidence |
| 10 | 2025-01-10 | `2025-01-10-when-to-override-ai.md` | Fundamental #9: When to Override the AI |
| 11 | 2025-01-11 | `2025-01-11-viral-ready-checklist.md` | Fundamental #10: The Viral-Ready Checklist |
| 12 | 2025-01-12 | `2025-01-12-component-libraries.md` | Component Libraries: Show AI What Good Looks Like |
| 13 | 2025-01-13 | `2025-01-13-breaking-features-into-phases.md` | Breaking Features Into Phases |
| 14 | 2025-01-14 | `2025-01-14-context-management.md` | Context Management Across Sessions |

### Week 3: Tactics & Best Practices

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 15 | 2025-01-15 | `2025-01-15-prompt-templates.md` | Prompt Templates That Actually Work |
| 16 | 2025-01-16 | `2025-01-16-ai-as-security-auditor.md` | Using AI as Your Security Auditor |
| 17 | 2025-01-17 | `2025-01-17-ai-as-performance-reviewer.md` | Using AI as Your Performance Reviewer |
| 18 | 2025-01-18 | `2025-01-18-ai-as-debugger.md` | Using AI as Your Debugger |
| 19 | 2025-01-19 | `2025-01-19-when-to-restart.md` | When to Restart vs When to Keep Going |
| 20 | 2025-01-20 | `2025-01-20-agent-configuration.md` | Agent Configuration: Set Your Standards Once |
| 21 | 2025-01-21 | `2025-01-21-multi-agent-workflows.md` | Multi-Agent Workflows |

### Week 4: Advanced Tactics

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 22 | 2025-01-22 | `2025-01-22-error-pattern-recognition.md` | Error Pattern Recognition |
| 23 | 2025-01-23 | `2025-01-23-refactoring-with-ai.md` | Refactoring with AI |
| 24 | 2025-01-24 | `2025-01-24-documentation-as-code.md` | Documentation as Code |
| 25 | 2025-01-25 | `2025-01-25-api-design-with-ai.md` | API Design with AI |
| 26 | 2025-01-26 | `2025-01-26-database-schema-evolution.md` | Database Schema Evolution |
| 27 | 2025-01-27 | `2025-01-27-deployment-strategies.md` | Deployment Strategies |
| 28 | 2025-01-28 | `2025-01-28-monitoring-ai-generated-code.md` | Monitoring AI-Generated Code in Production |

### Week 5: Wrap-Up

| Day | Date | File Name | Title |
|-----|------|-----------|-------|
| 29 | 2025-01-29 | `2025-01-29-lessons-learned.md` | Lessons Learned from 3 Months of Vibe Coding |
| 30 | 2025-01-30 | `2025-01-30-tool-landscape.md` | Tool Landscape: Claude vs ChatGPT vs Copilot vs Cursor |
| 31 | 2025-01-31 | `2025-01-31-keep-going.md` | Keep Going: What's Next in Your Vibe Coding Journey |

## Front Matter Template

For each new post, use this template:

```yaml
---
layout: post
title: "Day X: Your Title Here"
date: 2025-01-XX
author: Jeff Blankenburg
excerpt: "Brief excerpt for homepage listing (1-2 sentences)"
---
```

## Publishing Workflow

### 1. Write All Posts in Advance

Create all 31 posts with their respective dates (2025-01-01 through 2025-01-31).

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

- ✅ Day 1: Published (2025-01-01)
- ✅ Day 2: Published (2025-01-02)
- ⏳ Days 3-31: Write these posts with future dates

---

**Next Steps:**
1. Write Days 3-11 (complete the fundamentals)
2. Write Days 12-29 (tactics and best practices)
3. Write Days 30-31 (tool landscape and send-off)
4. Commit all posts
5. Push to GitHub
6. Site auto-publishes one per day!
