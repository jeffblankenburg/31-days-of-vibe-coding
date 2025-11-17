# Day 3: Observability Is Your Code Review

AI just wrote 400 lines of OAuth authentication code for me. Database migrations. API endpoints. Session handling. CSRF protection. The whole thing.

I didn't write any of it.

How do I know what it does?

Here's what I don't do: read all 400 lines trying to trace the logic. That's slow. I'll miss things. And honestly, reading code is a terrible way to understand what code actually does.

Here's what I do instead: I instrument the code with logs, metrics, and traces. Then I run it and watch what happens.

Observability is how I understand code I didn't write.

## The Problem with Reading Code

You've done this before. You're reviewing a pull request. 300 lines of changes across 8 files. You read through it. Looks fine. Logic makes sense. You approve it.

It ships. Breaks immediately. Turns out there was a race condition on line 142 that only happens when two users click the button at the same time. You didn't catch it because you can't see race conditions by reading code.

Reading code tells you what code is supposed to do. Running code and observing it tells you what code actually does.

These are not the same thing.

And when AI writes the code, the gap gets bigger. Because AI is optimistic. It writes code that assumes databases are always up, networks are always fast, and users always send valid input. The happy path works great. Everything else breaks in ways you won't see by reading the code.

## Observability Is How You Verify AI Code

Here's my workflow: when AI writes a feature, I immediately ask it to instrument that feature with observability. Before I run a single test. Before I deploy anything. Before I even look at the code.

I need three things:

1. **Structured logs** that show me what the code is doing
2. **Metrics** that measure whether it's working
3. **Traces** that connect the dots across services

Then I run it. In my local environment, in staging, wherever. And I watch.

I watch the logs. Is it doing what I think it's doing? Are there errors I didn't expect? Is it handling edge cases correctly?

I watch the metrics. Is it fast? Is it failing? How often?

I watch the traces. Does the request flow make sense? Are there unnecessary database calls? Is something blocking that shouldn't be?

This tells me more about the code than reading 400 lines ever could.

## What to Log (And What Not To)

AI loves to add console.log everywhere. That's useless.

What you need is structured logging with context. Every log should answer three questions:

1. What happened?
2. Why did it happen?
3. What was the state when it happened?

Here's an example. AI writes OAuth login. I ask it to add logging. It gives me this:

```typescript
console.log('User logged in');
```

This tells me nothing. Who logged in? When? Using what provider? Was there an error?

I tell AI: "Use structured logging. Include user ID, OAuth provider, timestamp, and session ID. Log at key decision points: start of flow, token exchange, user lookup, session creation, and completion."

AI rewrites:

```typescript
import { logger } from './logger';

async function handleOAuthCallback(code: string, state: string) {
  const correlationId = crypto.randomUUID();

  logger.info('OAuth flow started', {
    correlationId,
    provider: 'github',
    hasCode: !!code,
    hasState: !!state
  });

  try {
    const tokens = await exchangeCodeForToken(code);

    logger.info('Token exchange successful', {
      correlationId,
      provider: 'github',
      tokenType: tokens.token_type
    });

    const githubUser = await fetchGitHubUser(tokens.access_token);

    logger.info('GitHub user fetched', {
      correlationId,
      githubId: githubUser.id,
      email: githubUser.email
    });

    const existingUser = await db.users.findByEmail(githubUser.email);

    if (existingUser) {
      logger.info('Linking OAuth to existing user', {
        correlationId,
        userId: existingUser.id,
        provider: 'github'
      });
    } else {
      logger.info('Creating new user from OAuth', {
        correlationId,
        email: githubUser.email,
        provider: 'github'
      });
    }

    const session = await createSession(user);

    logger.info('OAuth flow completed', {
      correlationId,
      userId: user.id,
      sessionId: session.id,
      duration: Date.now() - startTime
    });

    return session;
  } catch (error) {
    logger.error('OAuth flow failed', {
      correlationId,
      provider: 'github',
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}
```

Now when I run this, I can see exactly what's happening:

```json
{"level":"info","msg":"OAuth flow started","correlationId":"abc123","provider":"github","hasCode":true,"hasState":true}
{"level":"info","msg":"Token exchange successful","correlationId":"abc123","provider":"github","tokenType":"bearer"}
{"level":"info","msg":"GitHub user fetched","correlationId":"abc123","githubId":123456,"email":"user@example.com"}
{"level":"info","msg":"Linking OAuth to existing user","correlationId":"abc123","userId":"user_789","provider":"github"}
{"level":"info","msg":"OAuth flow completed","correlationId":"abc123","userId":"user_789","sessionId":"sess_xyz","duration":847}
```

I didn't read the code. I watched it run. I know:
- The flow took 847ms
- It successfully exchanged the code for a token
- It found an existing user and linked the account
- No errors occurred

If something breaks, the correlation ID lets me trace the entire flow. I can see exactly where it failed and what the state was.

## What to Measure

Logs tell you what happened. Metrics tell you if it's working.

When AI writes a feature, I ask for metrics on three things:

**1. Success rate** - How often does this work?

```typescript
metrics.increment('oauth.login.attempt', { provider: 'github' });
metrics.increment('oauth.login.success', { provider: 'github' });
```

Now I can measure: out of 100 login attempts, how many succeed? If success rate drops from 98% to 75%, something's wrong.

**2. Duration** - How long does this take?

```typescript
const start = Date.now();
// ... do the work
metrics.timing('oauth.login.duration', Date.now() - start, { provider: 'github' });
```

I can see p50, p95, p99 latency. If p95 latency jumps from 500ms to 5 seconds, I know there's a performance problem.

**3. Error rates** - What's failing and why?

```typescript
metrics.increment('oauth.error', {
  provider: 'github',
  errorType: 'token_exchange_failed'
});
```

If GitHub's API starts returning errors, I'll see error rates spike before users complain.

These three metrics tell me if the feature is healthy. I don't need to read code to know if OAuth is working. I look at the dashboard.

## Tracing: Understanding the Flow

Logs and metrics tell you what's happening in one place. Traces tell you what's happening across your entire system.

When AI writes a feature that touches multiple services, I ask for distributed tracing.

Example: User logs in with OAuth. That triggers:
1. API server receives callback
2. API calls GitHub to exchange code for token
3. API calls user service to find or create user
4. User service queries database
5. API creates session in Redis
6. API returns response

Without tracing, if this is slow, I have no idea which step is the problem. I'd have to add logging to each service, correlate timestamps manually, hope I didn't miss anything.

With tracing, I see the entire flow:

```typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('oauth-service');

async function handleOAuthCallback(code: string) {
  return tracer.startActiveSpan('oauth.callback', async (span) => {
    span.setAttribute('oauth.provider', 'github');

    const tokens = await tracer.startActiveSpan('oauth.token_exchange', async (tokenSpan) => {
      const result = await exchangeCodeForToken(code);
      tokenSpan.setAttribute('oauth.token_type', result.token_type);
      return result;
    });

    const user = await tracer.startActiveSpan('user.lookup', async (userSpan) => {
      const result = await findOrCreateUser(tokens);
      userSpan.setAttribute('user.id', result.id);
      userSpan.setAttribute('user.is_new', !result.existed);
      return result;
    });

    const session = await tracer.startActiveSpan('session.create', async (sessionSpan) => {
      const result = await createSession(user);
      sessionSpan.setAttribute('session.id', result.id);
      return result;
    });

    span.end();
    return session;
  });
}
```

Now when I look at the trace in Dynatrace (or Jaeger, or Honeycomb, whatever you use), I see:

```
oauth.callback [1247ms]
  └─ oauth.token_exchange [834ms]  ← This is slow!
  └─ user.lookup [45ms]
  └─ session.create [12ms]
```

Token exchange is taking 834ms. That's the bottleneck. I didn't read code. I didn't guess. The trace showed me.

## How to Ask AI for Observability

When AI writes a feature, I don't just ask for the feature. I ask for observability built in.

Here's my template:

```
Implement [feature] with comprehensive observability:

Logging:
- Use structured JSON logging
- Include correlation IDs in every log
- Log at key decision points (start, major operations, completion, errors)
- Include relevant context (user IDs, resource IDs, timing)
- Never log PII or secrets

Metrics:
- Track attempt/success/failure counts
- Measure duration (use percentiles, not averages)
- Count errors by type
- Tag metrics with relevant dimensions (provider, method, etc)

Tracing:
- Create spans for each major operation
- Include meaningful span names (service.operation)
- Add attributes for important values
- Ensure trace context propagates across service calls

Error handling:
- Log errors with full context
- Emit error metrics
- Include error type and message in traces
- Don't swallow exceptions
```

AI implements the feature with observability from the start. Not as an afterthought.

## Real Example: OAuth with Observability

Let me show you what this looks like. I asked AI to implement GitHub OAuth with full observability. Here's what I got:

**Logging:**
```typescript
logger.info('OAuth callback received', {
  correlationId,
  provider: 'github',
  hasCode: !!code,
  hasState: !!state
});
```

**Metrics:**
```typescript
metrics.increment('oauth.callback.received', { provider: 'github' });
metrics.timing('oauth.flow.duration', duration, {
  provider: 'github',
  outcome: 'success'
});
```

**Tracing:**
```typescript
await tracer.startActiveSpan('oauth.github.callback', async (span) => {
  span.setAttribute('oauth.provider', 'github');
  // ... implementation
});
```

Then I ran it. Logged in with my GitHub account. Watched the logs in real time:

```json
{"level":"info","msg":"OAuth callback received","correlationId":"a1b2c3","provider":"github","hasCode":true,"hasState":true}
{"level":"info","msg":"Exchanging code for token","correlationId":"a1b2c3","provider":"github"}
{"level":"info","msg":"Token received","correlationId":"a1b2c3","provider":"github","scopes":["user:email"]}
{"level":"info","msg":"Fetching GitHub user","correlationId":"a1b2c3"}
{"level":"info","msg":"User found in database","correlationId":"a1b2c3","userId":"user_123"}
{"level":"info","msg":"Linking GitHub account","correlationId":"a1b2c3","userId":"user_123","githubId":"456789"}
{"level":"info","msg":"Session created","correlationId":"a1b2c3","sessionId":"sess_abc"}
{"level":"info","msg":"OAuth flow completed","correlationId":"a1b2c3","duration":892}
```

Perfect. I know exactly what happened. Flow took 892ms. Found an existing user. Linked the GitHub account. Created a session.

Then I checked the metrics dashboard:

```
oauth.callback.received (provider:github): 1
oauth.flow.duration p95 (provider:github): 892ms
oauth.flow.success (provider:github): 1
oauth.errors (provider:github): 0
```

Then I looked at the trace. Saw that token exchange was the slowest part (723ms). That's expected since it's calling GitHub's API. Everything else was fast.

I didn't read the code. I observed it working. That told me more than reading 400 lines ever could.

## Observability Catches What Code Review Misses

Here's where observability proves its value. A week after deploying OAuth, I'm looking at metrics:

```
oauth.flow.success: 847
oauth.errors (type:state_mismatch): 23
```

23 state mismatch errors. That's 2.6% error rate. Not catastrophic, but not zero.

I look at the logs for those errors:

```json
{"level":"error","msg":"OAuth state mismatch","correlationId":"xyz789","expectedState":"abc123","receivedState":"def456"}
```

The state parameter doesn't match. Why?

I check the trace. See that some users are taking over 10 minutes between starting the OAuth flow and completing it. The state token expires after 5 minutes.

This is a bug. But code review wouldn't have caught it. The code is correct. It's the timeout value that's wrong.

I tell AI: "Users are seeing state mismatch errors when OAuth flow takes longer than 5 minutes. Increase the state token TTL to 15 minutes."

AI makes the change. I deploy. Monitor for a day. Error rate drops to 0.1%.

Observability found the bug. Metrics showed the symptom. Logs showed the context. Traces showed the timing. I fixed it without reading any code.

## Why This Matters More for AI Code

When you write code yourself, you have a mental model of how it works. You know what it's supposed to do. You can reason about edge cases because you thought about them while writing.

When AI writes code, you don't have that model. You can read the code and build a model, but that's slow and error-prone.

Observability gives you a different model. Not "what does the code say it does" but "what does the code actually do when it runs."

This is better. Because code lies. It says it handles errors, but only for some errors. It says it's performant, but only with small inputs. It says it's thread-safe, but only if you call it in the right order.

Observability doesn't lie. It shows you what actually happened.

For AI-generated code, observability is not optional. It's how you understand what you shipped.

## The Workflow

Here's my daily workflow:

1. Create GitHub Issue for the feature
2. Tell AI: "Implement this with full observability. Structured logging, metrics, and tracing."
3. AI writes the feature and instruments it
4. I run it locally and watch the logs
5. I trigger edge cases (invalid input, network errors, race conditions) and watch what happens
6. I check that metrics are being emitted correctly
7. I look at the traces to understand the flow
8. If observability shows a problem, I tell AI to fix it
9. Deploy to staging and monitor for a day
10. If metrics look good, deploy to production
11. Keep watching metrics forever

Notice what I'm not doing: reading the code line by line. I read the logs. I watch the metrics. I inspect the traces.

The code is documentation. Observability is verification.

## Tomorrow

You have observability telling you what your code does. But there's a category of problems observability can't see until it's too late: security vulnerabilities.

Tomorrow I'll show you the security checklist I use for every AI-generated feature. The attacks AI doesn't consider. The vulnerabilities scanners miss. The questions you need to ask before you ship code that handles user data, authentication, or money.

---

**Try This Today:**

Pick a function in your codebase. Don't read the code. Instead:

1. Add structured logging at the start, end, and key decision points
2. Add metrics for duration and success/failure
3. Run it and watch the logs
4. Trigger different scenarios (success, error, edge cases)
5. See what you learn from observing it

Notice how much you understand without reading a single line of implementation.

That's the power of observability. And it's essential when AI is writing your code.

---

**Next:** [Day 4 - Security in AI-Generated Code: What to Watch For](#)

**Previous:** [Day 2 - GitHub Issues Are Your AI's Product Backlog](day02-feature-planning.md)
