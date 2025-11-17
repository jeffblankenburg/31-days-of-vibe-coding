# Day 1: What Is Vibe Coding?

Last Tuesday I shipped a complete OAuth implementation in 47 minutes.

Database migration. API endpoints. Session management. CSRF protection. Error handling. Tests. The whole thing.

Here's the part that surprised me. I didn't feel rushed. I wasn't cutting corners. I was in flow the entire time. Thinking about the architecture. Making decisions about error handling. Deciding which OAuth providers to support and how sessions should work.

The AI wrote the code. I stayed focused on the problems that actually mattered.

That's vibe coding.

## What Actually Is This?

Vibe coding is what happens when you stop fighting with AI and start working with it. When you're not context-switching between "thinking about the problem" and "typing the solution." When the code appears while you're still in flow.

It's not about typing less. It's about staying in the interesting part of programming.

The interesting part is figuring out what to build and why. What could go wrong. How to handle edge cases. What the user actually needs. The AI handles the translation from "here's what this needs to do" to "here's 200 lines of TypeScript that does it."

You're still the architect. You're making all the hard decisions. The AI is just really fast at typing.

## Why Most People Get This Wrong

Here's what I see developers do with AI tools. They ask for a function. Get some code. Copy it. Paste it. Run it. It breaks. They ask AI to fix it. Get new code. Copy. Paste. Run. Still broken. Repeat until it works or they give up and write it themselves.

That's not vibe coding. That's just a slower way to write code.

The problem is treating AI like a search engine. You ask a question. Get an answer. Take the answer and leave.

Vibe coding is different. It's a conversation. You're iterating. Refining. Asking "what did you miss?" and "what goes wrong here?" You're building the feature together. You're thinking. AI is typing.

This matters because the thinking is the hard part. The typing is just the typing.

## The Four Things That Make This Work

I've been doing this for eight months. Shipped probably 40 features with AI. Here's what I learned separates vibe coding from hope-driven development.

**1. Iterate in small loops**

Don't ask AI to build your entire feature. Ask it to build one piece. Get that piece working. Then the next piece.

I used to ask for whole features. "Build OAuth login with GitHub and Google." AI would write 400 lines across 8 files. Half of it was wrong. I'd spend an hour figuring out which half.

Now I ask for pieces. "Build the OAuth callback handler for GitHub. Just the handler. I'll integrate it later." AI writes one function. I test that function. It works or it doesn't. If it doesn't, I know exactly where the problem is.

Small loops mean you catch problems immediately. Not after AI has built a whole system on top of a broken assumption.

**2. Explain what you're actually trying to do**

Here's a prompt I used to write: "Create a function that validates email addresses."

Here's what I write now: "I need email validation for user registration. Users should get clear feedback if their email is invalid. This needs to handle plus addressing and international domains. Return a validation result with a user-friendly error message if it fails."

The first prompt gets you regex that checks for an @ symbol.

The second prompt gets you something you can actually use in production.

The difference is context. AI doesn't know you're building a registration flow. It doesn't know you care about UX. It doesn't know you need internationalization. Tell it these things.

The more context you provide, the better the code you get.

**3. Stay in flow**

This is the whole point of vibe coding. Don't let tools pull you out of flow.

When I'm building a feature, I stay in flow by having AI handle the stuff that would break my momentum. Writing tests. Adding logging. Updating documentation. Handling edge cases I didn't think of at first.

Old way: Implement the feature. Switch context to write tests. Lose my train of thought. What was I building again?

New way: Implement the feature. Ask AI to write comprehensive tests while I'm looking at the implementation. Stay in the same context. Keep moving.

The goal isn't maximum efficiency on any one task. The goal is to never leave flow.

**4. Trust but verify**

AI-generated code is optimistic. Really optimistic.

It assumes your database is always up. Your network is always fast. Your users always send valid data. Your API keys are always valid. Your disk never fills up.

This is fine. This is expected. Your job is to add the pessimism.

After AI writes something, I ask: "What breaks this?" AI lists 6 things it didn't handle. I pick the ones that matter and have it add error handling.

Then I test it. Not just the happy path. The error paths. The edge cases. The "what if this API is down" scenarios.

AI writes optimistic code fast. You make it production-ready by being pessimistic.

## What This Looks Like in Practice

Here's an actual conversation I had with Claude last week. I needed to add CSV export to a dashboard.

**Me:** I need to add a CSV export feature to the user dashboard. Users should be able to download their activity data as CSV. Plan this out before writing any code.

**Claude:** Here's what I'm thinking...
- Add an export button to the dashboard
- API endpoint that queries user activity and streams CSV response
- Rate limit to 1 export per minute per user
- Handle large datasets by streaming instead of building in memory
- Questions: What columns should be included? Any date range filtering?

**Me:** Include all activity columns. Let them filter by last 30/90/365 days or all time. Default to last 90 days.

**Claude:** Got it. Here's the implementation plan...
[Claude shows a complete plan: API route, streaming response, rate limiting, error handling, tests]

**Me:** Looks good. One thing. What happens if they have 100,000 rows of activity?

**Claude:** Current plan would stream it, but that's still a 20MB+ file. Should we cap it at 50k rows and let them filter by date range to get older data? Or implement pagination?

**Me:** Cap at 50k. Show them a warning if they hit the cap.

**Claude:** Perfect. Implementing now...

Notice what happened there. I didn't write code. I stayed focused on product decisions. What should the feature do? What could go wrong? How should it behave?

AI wrote the code. I made the decisions.

That's vibe coding.

## Try This Today

Pick the smallest thing on your backlog. Not a feature. Just a function or a component. Something that would take you 20 minutes.

Have a conversation with your AI tool. Explain what you need and why. Ask it to show you a plan before writing code. Review the plan. Ask "what could go wrong?" Make it implement.

Then test it. Ask what edge cases you missed. Have it add error handling.

See how it feels. Notice when you're in flow and when you're fighting the tool.

That's day one. You're not trying to change your whole workflow. Just trying one small thing with AI as a partner instead of a code generator.

## What's Coming

Over the next 30 days, I'll show you the tactics that make vibe coding work in production.

How to write GitHub Issues that give AI complete context. How to build a component library AI can reference. How to instrument code for observability. How to break features into phases AI can handle. How to use AI as a security auditor, performance reviewer, and debugger.

Every day is a specific problem and a specific solution. Prompt templates you can use immediately. Real examples from production. Honest about what works and what doesn't.

No theory. No hype. Just what actually works.

Tomorrow I'll show you how to use GitHub Issues as your AI's product backlog. How to write specs that maintain context across sessions so you're not explaining the same thing over and over.

---

**Try This Today:**

1. Pick one small task (a function, a component, a refactor)
2. Open your AI tool
3. Explain what you need and why
4. Ask for a plan before code
5. Ask "what could go wrong?"
6. Have it implement
7. Test the edge cases

Notice how much time you spend thinking vs typing. That ratio is what matters.

---

**Tomorrow:** [Day 2: GitHub Issues Are Your AI's Product Backlog](day02-github-issues-are-your-product-backlog.md)

**Subscribe:** Watch this repo or follow along at [31daysofvibecoding.com](https://31daysofvibecoding.com)
