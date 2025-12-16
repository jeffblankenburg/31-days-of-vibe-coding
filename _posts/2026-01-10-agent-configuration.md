---
layout: post
title: "Day 10: Agent Configuration - Set Your Standards Once"
date: 2026-01-10
author: Jeff Blankenburg
excerpt: "Stop repeating 'use TypeScript' and 'add error handling' in every prompt. Configure your AI agent once with your tech stack, patterns, and standards. Every session starts right."
---

Every conversation started the same way.

"We're using Node.js with Express. TypeScript strict mode. PostgreSQL database. Prisma ORM. Jest for testing. Use the service layer pattern. Always add error handling. Always add logging. Format with Prettier. Use OpenTelemetry for observability, exported to Dynatrace."

That's 50 words I typed at the start of every single chat. Sometimes I'd forget something. Then Claude would generate JavaScript instead of TypeScript. Or skip the logging. Or use a different testing framework.

Then I discovered agent configuration files.

CLAUDE.md. Or .cursorrules. Or custom instructions in ChatGPT. Every AI tool has some way to set persistent context that applies to every conversation.

Now I set my standards once. Every session inherits them. No more repetitive setup. No more forgotten requirements.

## What Agent Configuration Does

Agent configuration is context that persists across conversations. Instead of telling AI your setup every time, you tell it once. That configuration loads automatically at the start of each session.

Think of it as your project's instruction manual for AI. Tech stack. Coding standards. File structure. Common patterns. Things to avoid.

When you start a new conversation, AI already knows:
- What language and framework you use
- Where files should go
- How to handle errors
- What patterns to follow
- What mistakes to avoid

You skip the setup and go straight to the work.

## CLAUDE.md for Claude Code

If you're using Claude Code, create a file called `CLAUDE.md` in your project root. Claude reads this automatically at the start of every session.

Here's what mine looks like:

```markdown
# Project: collectyourcards.com

## Tech Stack
- Backend: Node.js with Express, TypeScript strict mode
- Database: PostgreSQL with Prisma ORM
- Frontend: React with TypeScript
- Testing: Jest (backend), React Testing Library (frontend)
- Observability: OpenTelemetry exporting to Dynatrace

## Project Structure
```
server/
  routes/       # Express route handlers
  services/     # Business logic
  models/       # Prisma schema and types
  middleware/   # Express middleware
  utils/        # Shared utilities
client/
  components/   # React components
  hooks/        # Custom hooks
  services/     # API client functions
  pages/        # Page components
```

## Coding Standards

### Always
- Use TypeScript with strict mode
- Add error handling to all async functions
- Log errors with context using telemetryService
- Write tests for new functionality
- Use early returns over nested conditionals
- Validate input at API boundaries

### Never
- Use `any` type (use `unknown` and narrow)
- Catch errors without logging them
- Skip input validation on public endpoints
- Use console.log (use telemetryService instead)
- Commit code without tests

## Patterns

### Service Layer
All business logic goes in services. Routes are thin:
```typescript
// Route: just handles HTTP
router.post('/cards', async (req, res) => {
  const result = await cardService.create(req.body);
  res.json(result);
});

// Service: contains logic
class CardService {
  async create(data: CreateCardInput): Promise<Card> {
    // validation, business logic, database operations
  }
}
```

### Error Handling
```typescript
try {
  const result = await someOperation();
  return result;
} catch (error) {
  telemetryService.logError('Operation failed', error, {
    context: 'relevant context here'
  });
  throw new AppError('User-friendly message', 500);
}
```

### Database Queries
Always use Prisma transactions for multi-step operations:
```typescript
await prisma.$transaction(async (tx) => {
  await tx.user.update(...);
  await tx.card.create(...);
});
```

## Common Mistakes to Avoid
- Don't use raw SQL when Prisma can handle it
- Don't forget to handle the empty array case
- Don't assume environment variables exist (validate at startup)
- Don't create new files when existing ones should be extended
```

This file lives in my repo. When I start Claude Code in the project directory, it reads CLAUDE.md and applies these standards to everything.

## Other Tools

Different AI tools have different configuration methods:

**Cursor:** Uses `.cursorrules` file in project root. Similar format to CLAUDE.md.

**ChatGPT:** Uses "Custom Instructions" in settings. Limited to 1500 characters, so prioritize.

**GitHub Copilot:** Can use `.github/copilot-instructions.md` for repository-level instructions.

**Aider:** Uses `.aider.conf.yml` for configuration.

The syntax varies but the concept is the same. Define your standards once.

## What to Include

Good agent configuration covers:

### 1. Tech Stack Basics
What language? What framework? What database? What testing framework?

```markdown
## Tech Stack
- Language: TypeScript 5.x, strict mode
- Framework: Express 4.x
- Database: PostgreSQL 15 with Prisma
- Testing: Jest with supertest for API tests
```

### 2. Project Structure
Where do files go? What's the naming convention?

```markdown
## Structure
- Routes in server/routes/{resource}.ts
- Services in server/services/{Resource}Service.ts
- Tests next to source: {file}.test.ts
```

### 3. Patterns to Follow
How should common things be done? Show examples.

```markdown
## Patterns
### API Responses
Always return: { success: boolean, data?: T, error?: string }

### Validation
Use zod schemas at API boundaries:
const schema = z.object({ email: z.string().email() });
```

### 4. Things to Avoid
What mistakes does this AI need to not make?

```markdown
## Don't
- Use any type
- Skip error handling
- Generate console.log (use logger)
- Create new utility files (extend existing)
```

### 5. File References
What existing code should AI reference for patterns?

```markdown
## Reference Files
- For service patterns: server/services/CardService.ts
- For route patterns: server/routes/cards.ts
- For test patterns: server/services/CardService.test.ts
```

## Keep It Updated

Your configuration isn't static. Update it when:

- You adopt a new pattern
- You discover an AI mistake that keeps happening
- You add a new technology
- Team standards change

I review mine weekly. Usually add one or two things based on that week's AI sessions.

## Testing Your Configuration

After setting up configuration, test that it works:

```
Generate a new endpoint for user preferences.
```

Check:
- Did AI use TypeScript?
- Did it put the file in the right location?
- Did it follow your service layer pattern?
- Did it add error handling?
- Did it use your logging approach?

If something's missing, your configuration needs to be more explicit about that requirement.

## Configuration for Teams

If your team uses AI, share the configuration file:

1. Add CLAUDE.md (or equivalent) to your repo
2. Document it in your README
3. Review and update as a team

Now everyone's AI sessions follow the same standards. Consistent code regardless of who generated it.

## Example: Before and After

**Before configuration:**

Me: "Create an endpoint to update user email"

Claude generates JavaScript, no error handling, uses raw SQL, logs to console.

**After configuration:**

Me: "Create an endpoint to update user email"

Claude generates TypeScript with strict types, adds try/catch with telemetry logging, uses Prisma, follows service layer pattern, includes input validation.

Same prompt. Dramatically different output. The configuration does the work.

## The Meta-Prompt

You can even ask AI to help write your configuration:

```
I'm setting up a CLAUDE.md file for my project.

Project: [description]
Tech stack: [list]
Patterns I use: [list]

Generate a CLAUDE.md file that will help AI sessions
follow my standards. Include:
- Tech stack summary
- Project structure
- Coding patterns with examples
- Common mistakes to avoid
- Reference files for patterns
```

AI generates a starting point. You refine based on experience.

## What Doesn't Belong in Configuration

Keep configuration focused. Don't include:

- Feature requirements (those go in GitHub Issues)
- One-time instructions (those go in prompts)
- Personal preferences that don't affect code quality
- Things that change frequently

Configuration is for stable, project-wide standards. Not session-specific context.

## The Payoff

Setting up configuration takes 30 minutes. That 30 minutes saves you:

- 2 minutes per conversation (no setup repetition)
- Debug time when AI forgets a standard
- Code review time catching missed patterns
- Frustration from inconsistent output

Over a month of daily AI use, that's hours saved. And better code.

## Tomorrow

Your AI now knows your standards. But what about your specific coding patterns? The way you structure services. The way you handle errors. The nuances that make your codebase consistent.

Tomorrow I'll show you how to teach AI your patterns through examples. Reference your best code and AI will match it.

---

## Try This Today

1. Create CLAUDE.md (or your tool's equivalent) in your project root
2. Start with basics: tech stack, project structure, key patterns
3. Add three "always do" and three "never do" rules
4. Test with a simple prompt and verify AI follows your standards
5. Commit the file to your repo

You'll immediately notice cleaner output. Less correction needed. More consistency.

That's the power of telling AI your standards once instead of every time.
