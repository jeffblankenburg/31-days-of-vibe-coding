---
layout: default
title: "31 Days of Vibe Coding"
permalink: /31-days/
---

# 31 Days of Vibe Coding

I built an entire website with AI. [collectyourcards.com](https://collectyourcards.com) lets users track and manage their sports card collections without all of the work. 900,000+ sports cards (and growing). Universal search. Achievement system. Social features. Sales tracking down to the cost of an individual envelope. All of it.

This completely free series teaches you how to write real software with artificial intelligence.<br/>No theory. No hype. Just the tactics that actually worked.

(Yes, AI helped me build this site, too.)

## What You'll Learn

**Week 1: Foundation (Days 1-7)**
Learning to work with AI. GitHub Issues as your backlog, component libraries, observability, prompting patterns, breaking features into phases, and context management.

**Week 2: Tactics (Days 8-14)**
Managing AI's quirks. When to restart, Git as your undo button, agent configuration, teaching AI your patterns, the "common AI mistakes" file, constraining AI, and spotting hallucinations.

**Week 3: Expert Roles (Days 15-21)**
AI as your team. Context and tokens, then using AI as security auditor, SRE, test generator, code reviewer, debugger, and architect.

**Week 4: Production & Mastery (Days 22-31)**
Real-world tactics. Production debugging, edge cases, deployment automation, refactoring, multi-service work, prompt libraries, the tool landscape, measuring impact, technical debt, and building your personal playbook.

## The Articles

<div class="series-list-wrapper" markdown="0">
{%- assign sorted_posts = site.posts | sort: 'date' -%}
<ul class="series-list">
{%- for post in sorted_posts -%}
{%- if post.date <= site.time -%}
<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{%- endif -%}
{%- endfor -%}
</ul>
</div>

<style>
.series-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}
.series-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}
.series-list li:last-child {
  border-bottom: none;
}
.series-list a {
  color: #002d46;
  text-decoration: none;
  font-weight: 500;
}
.series-list a:hover {
  color: #fdbe01;
}
</style>

## About This Series

Every article includes:
- Actual conversations about real AI-assisted software development topics
- Honest lessons from what didn't work
- Tactics you should use immediately

## Subscribe

<a href="https://buttondown.com/jeffblankenburg">Subscribe to get notified</a> when new articles are published.
