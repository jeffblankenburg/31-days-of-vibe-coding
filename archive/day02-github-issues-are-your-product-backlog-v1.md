# Day 2: GitHub Issues Are Your AI's Product Backlog

Yesterday I defined vibe coding as staying in flow while AI builds features for you. Today I'm going to show you how I learned to actually do that.

My approach to AI coding has evolved through three stages. Each one taught me something about how to work with AI effectively.

## Stage 1: Asking for Functions

Here's what I used to do:

"Write me a function that validates email addresses."

AI gives me a function. I look at it. It checks for an @ symbol. Maybe a dot. Probably misses edge cases. Doesn't handle internationalized email addresses. Has no tests. I ask for tests. Get tests that only check the happy path. I ask for error handling. Get try/catch blocks around things that can't throw. This takes 20 minutes and I end up rewriting half of it.

This is painful. I'm doing all the integration thinking. AI gives me pieces and I'm the glue.

## Stage 2: Asking for Features

Then I learned to think bigger. Stop asking for functions. Start asking for features.

"I need email validation for user registration. Users should get clear feedback if their email is invalid. This needs to handle edge cases like plus addressing, international domains, and disposable email detection. Plan the implementation before writing code."

AI gives me a plan. Database schema considerations. Validation library options. Where validation happens (client, server, both). Error messages. Rate limiting for the disposable email API. Tests for edge cases. Observability for tracking validation failures.

I review the plan. Catch that it's calling a third-party API synchronously in the registration flow. Ask it to move that to background validation. Approve the revised plan.

Then I ask it to implement.

The difference? I'm thinking like a product manager and tech lead, not a programmer. AI is my engineering team.

This was way better. But I made a mistake.

## Stage 3: Features in GitHub Issues (The Right Way)

I was still doing all of this in the chat. I'd open a conversation and start typing: "Build me OAuth login." Then halfway through I'd remember I also needed rate limiting. And maybe password reset. Oh, and we're using Postgres, not MySQL. By the time I got my thoughts together, I'd wasted 10 minutes and the AI had already started writing code based on incomplete requirements.

It was sloppy. I was treating AI like a chatbot instead of a development team.

Then I realized something obvious: I wouldn't manage a team of developers by walking up to them and blurting out half-formed ideas. I'd write a ticket. Put it in the backlog. Let them ask clarifying questions. Review their approach before they started coding.

Why should AI be different?

## GitHub Issues Are Your Feature Specs

Here's what I do now. Every feature starts as a GitHub Issue. No matter how small.

Changing button text? Issue.
Adding OAuth? Issue.
Entire new dashboard? Issue.

This gives me three things I didn't have before:

**1. Time to think.** Writing an issue forces me to articulate what I actually want. Not just "add OAuth" but why, what providers, how it affects existing users, what happens on errors.

**2. Memory across sessions.** I can close my laptop, come back three days later, and the context is still there. AI doesn't remember conversations. Issues do.

**3. A paper trail.** When AI implements something and I realize we forgot error handling, I can look back at the issue and see if I ever specified it. Usually I didn't. That's on me, not the AI.

The issue is my specification. Not my prompt. My spec.

## What Makes a Good Issue for AI

A GitHub Issue for AI isn't the same as a ticket for a human developer. Humans can read between the lines. AI takes you literally.

Here's what I include in every issue:

**User need:** What is the user trying to accomplish? Not "add a button" but "users need a way to export their data."

**Acceptance criteria:** What does done look like? "User clicks export, gets a CSV with all their data, download starts immediately."

**Technical context:** What systems are involved? "This touches the API server, needs to query Postgres, and should stream the response to avoid memory issues."

**Constraints:** What are the limitations? "File must be under 100MB. If larger, send via email. Rate limit to 1 export per hour per user."

**Non-functional requirements:** Security, performance, observability. "Log all export requests. Alert if export takes over 10 seconds. No PII in logs."

That's enough for AI to plan an implementation. And enough for me to review whether AI understood what I wanted.

## AI Can Help You Write Better Issues

Here's the thing. I'm not always good at writing specs. I forget edge cases. I miss security requirements. I think about the happy path and ignore errors.

So I have AI help me write the issue.

I'll open a chat and say: "I need to add data export functionality. Users should be able to download all their data as CSV. Help me write a complete GitHub Issue with acceptance criteria, technical context, constraints, and non-functional requirements."

AI asks clarifying questions. "What format should dates be in? What happens if the data is too large? Should this be available to all users or just paid accounts? What about GDPR compliance?"

Questions I should have thought of myself. But didn't.

We iterate until the issue is complete. Then I create the issue in GitHub. Now it's the source of truth.

When I'm ready to implement, I don't paste the issue into chat. I tell AI: "Implement GitHub Issue #47. Read the issue, propose an implementation plan, and wait for my approval before writing code."

AI reads the issue. Proposes a plan. I review. We iterate on the plan. Then implementation starts.

The issue never changes. The plan evolves. This separation matters.

## AI Creates Follow-Up Issues During Implementation

Here's where this workflow really shines. AI discovers work you didn't think of.

We're implementing Issue #47 (data export). AI is writing the migration for the exports table. It realizes: "The dev database has this table, but production doesn't. You'll need to run this migration on prod before deploying."

Old workflow: I'd make a mental note. Maybe write a TODO comment. Probably forget until deployment fails.

New workflow: AI creates Issue #48: "Run exports table migration on production database." Tags it as "deployment" and "blocking." Links it to Issue #47.

Now I can't forget. The work is tracked. When I get to deployment, I see Issue #48 and remember to run the migration first.

This happens constantly. AI writes a feature, realizes it needs environment variables. Creates an issue. Realizes the API needs rate limiting. Creates an issue. Realizes we should add monitoring. Creates an issue.

I'm not tracking this in my head anymore. The issue tracker is tracking it for me.

## Small Issues Ship Faster

One issue, one feature. Not one issue, five features.

I used to write massive issues. "Build admin dashboard with user management, analytics, and reporting." That's three features. AI would build all three. I'd review all three. Find problems in all three. Deployment would touch a dozen files. Something would break and I wouldn't know which feature caused it.

Now I write small issues. Issue #50: "Add user list to admin dashboard." That's it. AI implements. I review. Tests pass. Ship it. Move to the next issue.

This is the same principle as small pull requests. Easier to review. Easier to test. Easier to deploy. Easier to roll back.

The difference is that with AI, I can ship these small issues fast. What would take a team a week of splitting work, coordinating, and integrating takes me a day. One issue at a time. Deploy between each one. Know exactly what's in production.

My issue tracker looks busy. Lots of small issues. That's good. It means I'm shipping constantly.

## The Workflow in Practice

Here's what my daily workflow looks like now:

**Morning:** Review the issue backlog. Pick the highest priority issue. Read it to refresh context.

**Planning:** Tell AI "Implement Issue #52. Read the issue, propose a complete implementation plan with architecture, data model, API design, error handling, tests, deployment steps, and observability. Don't write code yet."

**Review:** AI proposes a plan. I ask hard questions. "What goes wrong here? How do we handle failures? What about security? How will we monitor this?" AI revises. We iterate until the plan is solid.

**Implementation:** "Looks good. Implement the plan." AI writes code. Creates tests. Updates documentation. Creates follow-up issues for anything it discovers.

**Verification:** Run tests. Run linter. Run security scanner. Check that AI created appropriate follow-up issues. If something's missing, create an issue for it.

**Ship:** Deploy. Monitor. Close the issue.

**Repeat:** Next issue.

This is vibe coding. Not because AI is magic. Because the workflow is structured.

## Real Example: OAuth Authentication

Let me show you how this works with a real feature. I needed to add GitHub OAuth to an app.

**Step 1: Create the issue with AI's help**

Me: "I need GitHub OAuth login. Help me write a complete issue."

AI: "What should happen for existing users who add GitHub OAuth? Should they link accounts or create a new account? What about email mismatches?"

Me: "Link to existing account if email matches. If email doesn't match, show error and let them log in with existing credentials first."

AI: "Should this be required or optional? What happens to users who currently log in with passwords?"

Me: "Optional. Existing password auth stays. This is just an additional option."

We iterate. AI drafts an issue with acceptance criteria, edge cases, security requirements, and observability needs. I review it, add a few details about session handling, and create Issue #23 in GitHub.

**Step 2: Get an implementation plan**

Me: "Implement Issue #23. Propose a complete plan. Don't write code yet."

AI reads the issue. Proposes an architecture. Where the OAuth flow happens. How CSRF protection works. Where secrets are stored. Database migration strategy. Test coverage. Deployment steps.

I review the plan. Ask about error handling. "What if GitHub is down during login?" AI revises. Add retry logic with fallback to password auth.

**Step 3: Implementation**

Me: "Looks good. Implement it."

AI writes the code. Creates the database migration. Writes tests. Adds logging for auth attempts. Sets up metrics for tracking OAuth vs password login rates.

During implementation, AI creates Issue #24: "Add GitHub OAuth credentials to production environment variables." Creates Issue #25: "Run user schema migration on production database before deploying OAuth." Creates Issue #26: "Add OAuth login rate dashboard to monitoring."

I didn't think of these. AI did. And now they're tracked.

**Step 4: Verification and ship**

Tests pass. Linter passes. Security scanner finds no issues. I review the follow-up issues AI created, add them to my deployment checklist. Ship it.

Close Issue #23. Move on to Issue #24.

Total time: 30 minutes. Most of it spent reviewing the plan and asking hard questions about security.

## Why This Works

Using GitHub Issues as your AI's product backlog solves three problems:

**1. You stop being sloppy.** Writing an issue forces you to think. What does this feature actually need? What are the edge cases? What could go wrong? You're not throwing half-formed ideas at AI anymore.

**2. You maintain context across sessions.** AI doesn't remember yesterday's conversation. Issues do. You can come back to a feature days later and everything you decided is still there.

**3. Work doesn't get lost.** When AI discovers tasks during implementation, it creates issues. When you think of something at 2am, you create an issue. When a user reports a bug, you create an issue. Nothing lives in your head. Everything is tracked.

This is how professional teams work. Now you're applying the same discipline to working with AI.

The issue tracker is not overhead. It's how you stay organized while moving fast.

## Tomorrow

You have issues. AI implements them. But when AI generates UI, it looks nothing like your application.

Tomorrow I'll show you how to build a component library that teaches AI your design system. How to show AI what good looks like so it generates UI that matches your application from the start.

---

**Try This Today:**

Create a GitHub Issue for a feature you need to build. Include:
- User need (what are they trying to accomplish?)
- Acceptance criteria (what does done look like?)
- Technical context (what systems are involved?)
- Constraints (size limits, rate limits, performance requirements)
- Non-functional requirements (security, observability, error handling)

Don't ask AI to implement yet. Just create the issue. See how much clarity you get from writing it down.

Tomorrow you'll learn how to make sure AI-generated UI actually matches your application's design system.

---

**Next:** [Day 3: Component Libraries & Style Guides: Show AI What Good Looks Like](day03-component-libraries-show-ai-what-good-looks-like.md)

**Previous:** [Day 1: What Is Vibe Coding?](day01-what-is-vibe-coding.md)
