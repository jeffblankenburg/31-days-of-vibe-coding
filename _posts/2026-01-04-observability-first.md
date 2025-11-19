---
layout: post
title: "Day 4: Observability First - Know When AI Code Breaks"
date: 2026-01-04
author: Jeff Blankenburg
excerpt: "You shipped AI-generated code. How do you know it works? Build observability into every prompt so you know immediately when something breaks."
---

I shipped AI-generated authentication code to production. Email verification. Password reset. Session management. The whole system.

Two days later, users couldn't log in. Password resets were failing. I had no idea why. No logs. No metrics. No traces. Just angry support tickets.

I spent 6 hours debugging code I didn't write, trying to figure out what broke and when. Eventually found it: a database connection pool exhaustion issue that started happening gradually over 48 hours. If I had proper observability, I would have known in 5 minutes.

That was the last time I shipped AI code without instrumentation.

## The Problem

AI writes optimistic code. It assumes everything works. Database calls succeed. Network requests complete. Users behave correctly. External APIs respond instantly.

Then you ship to production and reality hits. Database queries timeout. API calls fail. Users send malformed data. You have no idea what's happening because you didn't instrument anything.

The code AI generated works fine in your development environment. It passes tests. It looks good. But you have no visibility into what it's doing in production when real users hit it with real traffic.

## Why This Happens

When you ask AI to build a feature, it focuses on the happy path. "Build user authentication" gets you login and registration. It doesn't get you:

- Logging for failed login attempts
- Metrics for authentication success rates
- Traces showing how long password hashing takes
- Alerts when account lockout rates spike
- Database query performance monitoring

You have to explicitly ask for observability. Otherwise AI gives you code that works but is invisible in production.

## The Solution

Build observability into every prompt. Don't ask for it afterwards. Include it in your GitHub Issue from the start.

Here's how I do it now. Every feature requirement includes an observability section:

**GitHub Issue Template:**
```
## Feature: User Authentication

### Functional Requirements
- User registration with email verification
- Login with JWT tokens
- Password reset flow
- Account lockout after failed attempts

### Observability Requirements
- Log all authentication events (success and failure)
- Track metrics: login success rate, registration rate, lockout rate
- Trace authentication flow end-to-end
- Alert on: >5% auth failure rate, password reset spike, slow queries
- Monitor: database connection pool, email service calls, token generation time
```

When observability is in the spec, AI includes it in the implementation plan. Not as an afterthought. As a first-class requirement.

## Real Example: Authentication API for collectyourcards.com

I needed to build complete authentication for collectyourcards.com. Registration, login, verification, password reset. The whole system.

Here's the GitHub Issue I wrote:

> Build authentication system with registration, email verification, login, and password reset.
>
> **Functional requirements:**
> - User registration with email/password
> - Email verification before login allowed
> - Login with JWT tokens (24 hour expiry)
> - Account lockout after 5 failed attempts
> - Password reset with time-limited tokens
>
> **Observability requirements:**
> - Use OpenTelemetry for all instrumentation
> - Log every auth event to both database and telemetry service
> - Track metrics: auth success/failure rates by event type
> - Trace complete auth flows with timing
> - Include: user ID, email, IP address, user agent, error messages
> - Monitor database operations for auth queries
> - Alert-worthy scenarios: lockout spikes, reset token abuse, slow queries

AI gave me an implementation plan that included building a complete telemetry service first.

### Step 1: AI Built the Observability Foundation

The first thing AI did was create a telemetry service using OpenTelemetry. This became the foundation for observing everything the auth system does.

The service tracks three signal types:

**Traces** - Show the flow of auth operations with timing:
```javascript
telemetryService.trackAuthEvent('login_success', userId, email, true, {
  ip: req.ip,
  userAgent: req.get('User-Agent'),
  error: null
})
```

**Metrics** - Quantify what's happening:
```javascript
// Auto-tracked by OpenTelemetry middleware
// - auth.events counter (by event type and success/failure)
// - api.request.duration histogram
// - database.operation.duration histogram
```

**Logs** - Provide context when things break:
```javascript
telemetryService.logError('Password reset failed', error, {
  user_id: userId,
  email: email,
  error_type: 'invalid_token'
})
```

### Step 2: AI Instrumented Every Auth Event

Every authentication action gets tracked automatically. Not just the happy path. Every path.

**Registration:**
```javascript
// Success case
await logAuthEvent(email, 'registration_success', true, null, user.user_id, req)

// Validation failure
await logAuthEvent(req.body.email, 'registration_failed', false, 'Validation errors', null, req)

// Email already exists
await logAuthEvent(email, 'registration_failed', false, 'Email already registered', null, req)
```

**Login:**
```javascript
// Account locked
await logAuthEvent(email, 'login_failed', false, 'Account locked', user.user_id, req)

// Invalid password
await logAuthEvent(email, 'login_failed', false, 'Invalid password', user.user_id, req)

// Success
await logAuthEvent(email, 'login_success', true, null, user.user_id, req)
```

**Password Reset:**
```javascript
// Request sent
await logAuthEvent(email, 'password_reset_requested', true, null, user.user_id, req)

// Token invalid
await logAuthEvent('unknown', 'password_reset_failed', false, 'Invalid or expired token', null, req)

// Success
await logAuthEvent(user.email, 'password_reset_success', true, null, user.user_id, req)
```

Every event goes to two places:
1. **Database** - for permanent audit trail
2. **Telemetry service** - for monitoring and alerting

### Step 3: AI Added Automatic Middleware

The telemetry service includes Express middleware that automatically tracks every API call:

```javascript
// In server setup
app.use(telemetryService.expressMiddleware())

// This middleware automatically tracks:
// - Request URL and method
// - Response time
// - Status code
// - User ID (if authenticated)
// - Request/response sizes
```

No manual tracking needed. Every request to `/api/auth/login` gets timed and recorded automatically.

### Step 4: AI Monitored Database Operations

Prisma middleware tracks every database query:

```javascript
// Automatically tracks:
// - Query type (findUnique, create, update, etc.)
// - Table name
// - Duration
// - Success/failure
// - Record count

// Example: Login query
// Operation: findUnique
// Table: user
// Duration: 12ms
// Success: true
```

This caught the connection pool exhaustion issue I mentioned earlier. I could see query times climbing from 12ms to 400ms over 48 hours. That pattern led me straight to the problem.

## What I Can See Now

In production, I have complete visibility:

**Authentication Dashboard:**
- Login success rate: 94.2% (last hour)
- Registration rate: 12 per hour
- Account lockouts: 3 (last 24 hours)
- Password resets: 8 (last 24 hours)
- Average login time: 187ms

**When Something Breaks:**

User reports: "I can't log in."

I check the dashboard:
- Last login attempt: 2 minutes ago
- Event: `login_failed`
- Reason: `Account locked`
- IP address: matches user's location
- Failed attempts: 6 in the last 10 minutes
- User agent: Mobile Safari

Response: "Your account was locked due to multiple failed login attempts. You can reset your password or wait 30 minutes for automatic unlock."

Total debugging time: 30 seconds.

Compare that to the 6 hours I spent debugging the connection pool issue when I had no observability.

## The Prompt Templates That Work

### Template 1: Adding Observability to a Feature Request

```
Build [feature name] with complete observability.

Functional Requirements:
- [What the feature does]
- [User flows]
- [Business logic]

Observability Requirements:
- Use OpenTelemetry for instrumentation
- Log all significant events (success and failure cases)
- Track metrics for: [success rate, duration, counts]
- Trace complete workflows with timing
- Include in every event: [user context, error details, operation metadata]
- Monitor: [database queries, external API calls, resource usage]
- Alert on: [error rate thresholds, performance degradation, unusual patterns]

Use the existing telemetry service at server/services/telemetryService.js
```

### Template 2: Auditing Existing Code for Missing Observability

```
Review [file/feature] and identify missing observability.

Check for:
- Functions without error logging
- API endpoints without timing metrics
- Database queries without performance tracking
- External API calls without retry/failure logging
- User actions without event tracking

For each gap, suggest:
- What to log (with severity level)
- What metrics to track
- What traces to add
- What alerts would catch issues

Propose specific code additions using our telemetry service.
```

### Template 3: Building the Observability Foundation

```
Build a telemetry service using OpenTelemetry with the following:

Signal Types:
- Traces: Distributed tracing with timing
- Metrics: Counters, histograms, gauges
- Logs: Structured logging with severity levels

Exporters:
- Development: Console output
- Production: [Dynatrace/Datadog/Application Insights/etc.]

Instrumentation:
- Auto-instrument: Express, HTTP, database (Prisma/Sequelize/etc.)
- Custom events: Auth, business logic, critical operations
- Middleware: Automatic API timing, database query tracking

Configuration:
- Environment-based (dev vs production)
- Service name and version
- Resource attributes
- Sampling (if needed)

Include methods for:
- Tracking custom events with attributes
- Creating custom spans
- Logging at different severity levels
- Getting service status

Make it a singleton that initializes on import.
```

## Development vs Production

The telemetry service works differently in development vs production. This is important.

**Development mode** (no credentials configured):
```
🔍 OpenTelemetry initialized successfully
   📊 Traces: exporting to console (development mode)
   📈 Metrics: exporting to console (development mode)
   📝 Logs: exporting to console (development mode)
```

Everything prints to your terminal. You see every auth event, every API call, every metric. Perfect for debugging locally.

**Production mode** (credentials configured):
```
🔍 OpenTelemetry initialized successfully
   📊 Traces: exporting to Dynatrace
   📈 Metrics: exporting to Dynatrace
   📝 Logs: exporting to Dynatrace
```

Everything goes to your observability platform. You get dashboards, alerts, query capabilities, long-term storage.

Same code. Different behavior based on environment. AI built this automatically because I specified it in the requirements.

## Common Pitfalls

**Pitfall 1: Adding observability after the code is written**

I see developers build a feature, test it, then ask AI: "Add logging to this."

The result is inconsistent. Some errors logged, some not. Metrics halfway implemented. Traces missing timing data.

Build observability into the initial prompt. It's easier than retrofitting.

**Pitfall 2: Logging everything**

AI will happily log every function call if you ask it to. This creates noise that drowns out signal.

Be specific about what matters:
- "Log authentication failures with reason and user context"
- "Track API response times for requests over 100ms"
- "Alert when database query time exceeds 500ms"

Not: "Add comprehensive logging everywhere."

**Pitfall 3: Not testing observability locally**

You won't know if observability works until you need it in production. By then it's too late.

Test it locally:
1. Trigger an error case
2. Check that it logged with the right context
3. Verify the metric incremented
4. Confirm the trace captured timing

If you can't see it locally, it won't work in production.

**Pitfall 4: Using console.log instead of structured logging**

```javascript
// Bad
console.log('User login failed for some reason')

// Good
telemetryService.logError('Login failed', error, {
  event_type: 'login_failed',
  user_id: userId,
  email: email,
  reason: 'invalid_password',
  ip_address: req.ip
})
```

Structured logging lets you query, filter, and alert on specific fields. Console logs are just strings.

## What About Cost?

<!-- Observability platforms charge for data volume. Won't this get expensive?

For collectyourcards.com:
- ~50,000 API requests per day
- ~500 authentication events per day
- ~10,000 database queries per day

Total telemetry data: ~2GB per month

Cost in Dynatrace: $0 (within free tier)

You'd have to be doing millions of requests per day before cost becomes a concern. And if you're at that scale, observability is non-negotiable anyway. -->

## Tomorrow

You have observability. You can see what your AI-generated code is doing in production. But you're still writing prompts from scratch every time.

Tomorrow I'll show you the prompting pattern that actually works: Context → Intent → Constraints → Examples → Verification.

A structured approach that gets AI to generate exactly what you need, with all the observability, error handling, and edge cases included from the start.

---

## Try This Today

Take a feature you've already built with AI and audit it for observability gaps.

1. Pick one API endpoint or function
2. Ask AI: "What observability is missing from this code? Check for logging, metrics, and tracing gaps."
3. For each gap, ask: "If this broke in production, would I know why?"
4. Add instrumentation for the top 3 gaps

Don't try to instrument everything at once. Start with your most critical code path. Auth. Payment. Data import. Whatever breaks your app if it fails.

Then make observability a requirement in every GitHub Issue you write.
