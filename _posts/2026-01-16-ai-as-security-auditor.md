---
layout: post
title: "Day 16: AI as Security Auditor"
date: 2026-01-16
author: Jeff Blankenburg
excerpt: "AI writes code fast. Sometimes too fast to think about security. Learn to use AI as your security auditor, catching vulnerabilities before they ship."
---

Here's a fun exercise. Ask AI to build you a login endpoint. Don't mention security. Just say "build a login endpoint."

You'll get working code. It'll authenticate users. It'll return tokens. It'll feel done.

Now ask AI to review that same code for security vulnerabilities. Watch what happens. Suddenly AI finds missing rate limiting, token expiration issues, information leakage in error messages. The same tool that wrote the code will happily tear it apart.

That's the trap with AI-generated code. It optimizes for what you ask. Ask for functionality, you get functionality. Security isn't included unless you ask for it.

The good news: AI is remarkably good at finding vulnerabilities. You just have to ask it to look.

## Why AI Misses Security Issues

AI optimizes for what you ask. If you ask for a login endpoint, AI generates a login endpoint. It focuses on making the login work. Authentication, session management, redirects.

Security is different. Security means thinking about how someone could break the login. What happens with malformed input? What if someone tries a million passwords? What if they manipulate the session token?

AI doesn't automatically think adversarially. It thinks constructively. Build the feature. Make it work. Ship it.

You have to explicitly switch AI into adversarial mode.

## The Security Audit Prompt

Here's the prompt that changed how I review AI-generated code:

```
Act as a security expert conducting a penetration test.

Review this code assuming the user is actively trying to break it.
They have unlimited time, technical skill, and motivation.

Look for:
1. Injection attacks (SQL, NoSQL, command, LDAP)
2. Authentication bypasses
3. Authorization failures (can users access other users' data?)
4. Sensitive data exposure
5. Missing rate limiting
6. Insecure direct object references
7. Cross-site scripting (XSS)
8. Cross-site request forgery (CSRF)
9. Security misconfigurations
10. Insufficient logging for security events

For each issue found:
- Severity (Critical/High/Medium/Low)
- How an attacker would exploit it
- Specific fix with code

Be paranoid. Assume everything is an attack vector.
```

The key phrase is "assuming the user is actively trying to break it." This flips AI from construction mode to destruction mode.

## A Real Audit

Let me show you what this looks like. Here's an endpoint AI generated for me:

```typescript
router.get('/api/cards/:cardId', async (req, res) => {
  const { cardId } = req.params;
  const card = await db.card.findUnique({
    where: { id: cardId },
    include: { owner: true }
  });

  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }

  res.json(card);
});
```

Looks fine, right? Card ID comes in, we look it up, we return it. Simple.

Here's what the security audit found:

**Issue 1: Insecure Direct Object Reference (High)**

Anyone can access any card by guessing or enumerating card IDs. There's no check that the requesting user owns or has permission to view this card.

Exploit: Iterate through card IDs to harvest all cards in the system.

Fix:
```typescript
router.get('/api/cards/:cardId', authMiddleware, async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user.id;

  const card = await db.card.findFirst({
    where: {
      id: cardId,
      OR: [
        { ownerId: userId },
        { visibility: 'public' }
      ]
    },
    include: { owner: { select: { id: true, username: true } } }
  });

  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }

  res.json(card);
});
```

**Issue 2: Sensitive Data Exposure (Medium)**

The `include: { owner: true }` returns all owner fields, potentially including email, password hash, or other sensitive data.

Exploit: Access any card to harvest owner information.

Fix: Select only the fields needed (shown above with `select`).

**Issue 3: Missing Rate Limiting (Medium)**

No rate limiting allows an attacker to enumerate all card IDs rapidly.

Fix: Add rate limiting middleware:
```typescript
router.get('/api/cards/:cardId',
  authMiddleware,
  rateLimiter({ windowMs: 60000, max: 100 }),
  async (req, res) => { ... }
);
```

**Issue 4: Insufficient Logging (Low)**

No logging of access attempts. If someone is enumerating cards, you won't know.

Fix:
```typescript
telemetry.trackEvent('card_accessed', {
  cardId,
  userId: req.user?.id,
  ip: req.ip
});
```

Four issues in eight lines of code. All of them real. None of them obvious when you're just checking if the feature works.

## The OWASP Checklist Prompt

For comprehensive coverage, I use OWASP categories as a framework:

```
Review this code against OWASP Top 10:

1. Broken Access Control - Can users access things they shouldn't?
2. Cryptographic Failures - Is sensitive data properly protected?
3. Injection - Can user input become executable code/queries?
4. Insecure Design - Are there fundamental design flaws?
5. Security Misconfiguration - Are defaults secure? Headers set?
6. Vulnerable Components - Are dependencies current and safe?
7. Authentication Failures - Can auth be bypassed or broken?
8. Data Integrity Failures - Can data be tampered with?
9. Logging Failures - Would you detect an attack?
10. Server-Side Request Forgery - Can users make the server request arbitrary URLs?

For this code:
[paste code]

Which categories apply? What specific vulnerabilities exist?
```

This systematic approach catches things the general prompt might miss.

## Authentication-Specific Audits

Authentication code needs extra scrutiny. Here's my auth-specific prompt:

```
Audit this authentication code for:

1. Password handling
   - Are passwords hashed with bcrypt/argon2 (not MD5/SHA1)?
   - Is there a minimum password strength requirement?
   - Are passwords ever logged or exposed in errors?

2. Session management
   - Are session tokens cryptographically random?
   - Do sessions expire?
   - Can sessions be invalidated on logout?
   - Are tokens stored securely (httpOnly, secure flags)?

3. Brute force protection
   - Is there rate limiting on login attempts?
   - Is there account lockout after failed attempts?
   - Are timing attacks prevented (constant-time comparison)?

4. Password reset
   - Are reset tokens single-use?
   - Do reset tokens expire quickly (< 1 hour)?
   - Is the reset flow logged?

5. Multi-factor authentication
   - If MFA exists, can it be bypassed?
   - Are backup codes handled securely?

Show me each finding with severity and fix.
```

## API-Specific Audits

APIs have their own vulnerability patterns:

```
Audit this API endpoint for:

1. Input validation
   - Is all input validated before use?
   - Are types enforced (string vs number)?
   - Are lengths limited?
   - Is the validation on the server (not just client)?

2. Authorization
   - Does every endpoint check permissions?
   - Can horizontal privilege escalation occur (user A accessing user B's data)?
   - Can vertical privilege escalation occur (user becoming admin)?

3. Output encoding
   - Is data sanitized before returning to prevent XSS?
   - Are error messages generic (not exposing internals)?

4. Rate limiting
   - Are expensive operations rate limited?
   - Are authentication endpoints protected?

5. CORS configuration
   - Is CORS properly restricted?
   - Are credentials allowed only for trusted origins?

For this endpoint:
[paste code]
```

## Database Query Audits

Database interactions are injection hotspots:

```
Review these database queries for injection vulnerabilities:

1. Are all user inputs parameterized?
2. Is any string concatenation used in queries?
3. Are ORMs being used correctly (no raw queries with user input)?
4. Are stored procedures called safely?
5. Is there any dynamic table or column name construction?

For each query, show:
- Is it safe or vulnerable?
- If vulnerable, how would you exploit it?
- The secure version of the query

Code:
[paste code]
```

## The Multi-Pass Approach

One security pass isn't enough. Different passes catch different issues.

**Pass 1: Injection and Input Handling**
```
Focus only on how user input flows through this code.
Trace every input from entry point to where it's used.
Can any input become code, queries, or commands?
```

**Pass 2: Authentication and Authorization**
```
Focus only on access control.
For every operation: who can do this? Who shouldn't be able to?
Can these checks be bypassed?
```

**Pass 3: Data Exposure**
```
Focus only on what data leaves the system.
What's in API responses? Error messages? Logs?
Could any of it be sensitive?
```

**Pass 4: Infrastructure and Configuration**
```
Focus only on how this code is deployed.
Headers, CORS, cookies, TLS, secrets management.
What's misconfigured?
```

Running four focused passes catches more than one broad pass.

## When to Audit

Not every line of code needs a security audit. Focus on:

**Always audit:**
- Authentication and authorization code
- Payment and financial operations
- User data handling
- API endpoints exposed to the internet
- File uploads and downloads
- Admin functionality

**Audit periodically:**
- Internal APIs
- Background jobs
- Database migrations

**Light review:**
- UI components without data handling
- Pure utility functions
- Test code

## Building Security Into Prompts

Prevention beats detection. Include security requirements in your original prompts:

```
Build a user registration endpoint.

Security requirements:
- Hash passwords with bcrypt, cost factor 12
- Validate email format and uniqueness
- Rate limit: 5 registrations per IP per hour
- Log registration attempts (success and failure)
- Don't expose whether email already exists (timing attack prevention)
- Return generic errors that don't leak system information
```

When security is in the original prompt, AI builds it in rather than bolting it on.

## The Security Checklist

Before any AI-generated code goes to production, run through this:

```
□ Input validation on all user input
□ Parameterized queries (no string concatenation)
□ Authorization checks on every endpoint
□ Sensitive data not exposed in responses
□ Passwords hashed with modern algorithm
□ Sessions expire and can be invalidated
□ Rate limiting on auth and expensive operations
□ Security events logged
□ Error messages don't leak internals
□ Dependencies scanned for vulnerabilities
```

## Tomorrow

Security auditing is one lens. But what about code that's secure but impossible to operate? AI writes code that works in development but gives you nothing when it breaks at 3am.

Tomorrow I'll show you how to use AI as an SRE. Auditing code for observability, debuggability, and operational readiness before you're paged in the middle of the night.

---

## Try This Today

1. Take a piece of AI-generated code that handles user input
2. Run the security audit prompt against it
3. See what it finds

You'll probably be surprised. I was.

The code that "worked fine" in testing might have vulnerabilities waiting to be exploited. Better to find them now than in your incident report.
