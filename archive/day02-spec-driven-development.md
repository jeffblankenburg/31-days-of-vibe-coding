# Day 2: Spec-Driven Development: Writing the Contract First

I used to ask AI to "write a function that validates email addresses." I'd get back 30 lines of regex that worked for `user@domain.com` but fell apart with `user+tag@subdomain.domain.co.uk`. No input validation. No logging. No thought about what happens when you pass it null or an empty string.

Then I started writing the spec first.

Not documentation. Not requirements. The actual contract: types, interfaces, behavior expectations. I'd define exactly what the function should accept, return, and do in error cases. Then I'd ask AI to implement it.

The code quality jumped immediately.

This is spec-driven development. It's like TDD for the AI age, except instead of writing tests first, you write the interface contract. The AI implements what you've already defined. You verify it matches the spec. And you move on.

Today I'll show you how to do this, and why it changes everything about vibe coding.

## The Problem with "Just Write It"

Here's what usually happens when you ask AI to write code without a spec:

**You:** "Write a function that fetches user data from an API."

**AI:** Gives you a function that assumes the API is always up, returns 200, and sends perfectly formed JSON.

**Production:** API returns 500. Your app crashes. You have no logs. You don't know which user ID caused it. Your monitoring shows nothing because the function has no instrumentation.

The AI gave you code that works in a perfect world. You needed code that works in production.

The gap between those two things is the specification you didn't write.

## What Is a Spec?

A spec is not a comment that says "this function validates emails."

A spec is the complete contract for what the code must do:

**Input:** What does it accept? Types, constraints, validation rules.

**Output:** What does it return? Success type, error type, edge cases.

**Behavior:** What happens in each scenario? Happy path, error cases, edge cases.

**Observability:** What does it log? What does it measure? What signals does it emit?

**Performance:** Any latency requirements? Retry logic? Timeouts?

Here's an example. Not a spec:

```typescript
// Validates an email address
function validateEmail(email: string): boolean
```

Here's a spec:

```typescript
/**
 * Validates an email address according to RFC 5322 simplified rules.
 *
 * @param email - Email address to validate (required, will be trimmed)
 * @returns ValidationResult with success/failure and reason
 *
 * Behavior:
 * - Returns {valid: false, reason: 'EMPTY_INPUT'} if email is null, undefined, or empty after trim
 * - Returns {valid: false, reason: 'INVALID_FORMAT'} if format is invalid
 * - Returns {valid: false, reason: 'DOMAIN_NOT_ALLOWED'} if domain is in blocklist
 * - Returns {valid: true, reason: null} if valid
 *
 * Logs:
 * - Log validation attempts with masked email (user@***) at DEBUG level
 * - Log failures at WARN level with failure reason
 * - Log blocklist hits at INFO level for security monitoring
 *
 * Performance:
 * - Must complete in <10ms for 99th percentile
 * - No external API calls
 */
interface ValidationResult {
  valid: boolean;
  reason: 'EMPTY_INPUT' | 'INVALID_FORMAT' | 'DOMAIN_NOT_ALLOWED' | null;
}

function validateEmail(email: string | null | undefined): ValidationResult
```

See the difference? The second one tells you:
- Exactly what inputs are allowed (including null/undefined)
- Exactly what gets returned in each scenario
- What gets logged and at what level
- Performance expectations
- Security considerations (masking, blocklist)

When you give this to AI, it has no ambiguity. It knows exactly what to build.

## The Spec-First Workflow

Here's how I work now:

### Step 1: Write the Interface

Before asking AI for any code, I write the complete TypeScript interface with JSDoc that specifies behavior.

```typescript
/**
 * Fetches weather data for a city with automatic retries and rate limiting.
 *
 * @param city - City name (required, non-empty, will be URL encoded)
 * @param options - Optional configuration
 * @returns WeatherData or throws WeatherError
 *
 * Behavior:
 * - Throws WeatherError with code 'INVALID_INPUT' if city is empty
 * - Throws WeatherError with code 'RATE_LIMITED' if all retries exhausted
 * - Throws WeatherError with code 'API_ERROR' for non-retryable failures
 * - Retries on 429 and 5xx errors only (not 4xx except 429)
 * - Uses exponential backoff: 1s, 2s, 4s
 *
 * Logs:
 * - Request start with city name
 * - Each retry attempt with delay
 * - Final success/failure with latency
 *
 * Metrics to emit:
 * - weather_api_requests_total (counter)
 * - weather_api_retries_total (counter)
 * - weather_api_errors_total (counter, labeled by error code)
 * - weather_api_latency_ms (histogram)
 */
interface WeatherOptions {
  apiKey?: string;
  timeout?: number;
  maxRetries?: number;
}

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
  timestamp: Date;
}

class WeatherError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_INPUT' | 'RATE_LIMITED' | 'API_ERROR',
    public statusCode?: number
  ) {
    super(message);
    this.name = 'WeatherError';
  }
}

async function fetchWeather(
  city: string,
  options?: WeatherOptions
): Promise<WeatherData>
```

This is my specification. It's complete. It's unambiguous. It includes observability requirements.

### Step 2: Generate Implementation

Now I give this spec to AI with a simple prompt:

```
Implement this function according to the specification.
Follow all behavior requirements, error handling, logging, and metrics.
Use the fetch API. Make the code production-ready.

[paste the spec]
```

The AI now knows:
- Exactly what errors to throw and when
- What to retry and what not to retry
- What to log at each step
- What metrics to track
- What validation to do upfront

### Step 3: Verify Contract

When AI generates the code, I check:

1. **Does it match the interface signature?** Type-check it.
2. **Does it handle all specified error cases?** Read through the code.
3. **Does it log what the spec says?** Search for log statements.
4. **Does it emit metrics?** Search for metric calls.
5. **Does it meet performance requirements?** Add a benchmark if specified.

If it doesn't match, I don't ask AI to fix random things. I point to the spec: "This doesn't match the contract. The spec says to throw WeatherError with code 'INVALID_INPUT' for empty city names, but you're throwing a generic Error."

The spec is the source of truth. Not the code. Not what AI thinks is best. The spec.

### Step 4: Test the Contract

I generate tests from the spec:

```
Write comprehensive tests for this function that verify:
1. All behavior scenarios in the JSDoc
2. All error cases with correct error codes
3. Logging calls are made as specified
4. Edge cases (null, undefined, empty strings)

[paste the spec and implementation]
```

The tests verify the implementation matches the contract.

## Why This Works

Spec-driven development solves five problems with AI-generated code:

### 1. Prevents Optimistic Code

AI assumes everything works. The network is fast. The API is up. Inputs are valid.

Specs force you to think about failure modes upfront. "What happens when the API returns 500?" becomes part of the contract before any code exists.

### 2. Makes Requirements Explicit

"Handle rate limiting" is vague. AI might retry forever. Or give up after one 429. Or not distinguish 429 from other errors.

The spec says exactly: "Retry on 429 and 5xx. Don't retry 4xx except 429. Use exponential backoff: 1s, 2s, 4s. Max 3 retries."

No ambiguity. AI implements exactly that.

### 3. Builds Observability In

When you ask AI for logging after the fact, it adds `console.log("error")` and calls it done.

When logging is in the spec, AI adds meaningful logs: "Log each retry attempt with delay. Log final success with latency." The observability becomes part of the contract.

### 4. Enables Verification

Without a spec, how do you know if AI's code is "right"? You read it and guess.

With a spec, verification is mechanical: Does the implementation match the contract? Run the tests. Type-check it. Review against the spec checklist.

### 5. Makes Refactoring Safe

Specs are stable. Implementations change.

When you refactor AI-generated code (or ask AI to refactor it), the spec doesn't change. You verify the new implementation still matches the original contract. The interface is the anchor.

## Real Example: Building an API Client

Let me show you this in practice. I needed to build a client for a rate-limited API.

### First Attempt (No Spec)

**Me:** "Write a TypeScript function that calls a REST API with retry logic for rate limiting."

**AI:** Gave me a function that retried everything, logged nothing, and had no input validation.

**Production:** Failed on the first 401 Unauthorized. Retried it 3 times. Wasted 7 seconds. No logs about why it failed.

### Second Attempt (With Spec)

I wrote this spec first:

```typescript
/**
 * Makes an authenticated HTTP request with automatic retry for transient failures.
 *
 * @param url - Full URL to request (must be valid HTTP/HTTPS)
 * @param options - Request configuration including auth token
 * @returns Parsed JSON response
 * @throws APIError with appropriate code
 *
 * Behavior:
 * - Validates URL format before making request
 * - Throws APIError code 'INVALID_URL' if URL is malformed
 * - Throws APIError code 'MISSING_TOKEN' if token is required but missing
 * - Throws APIError code 'UNAUTHORIZED' for 401/403 (do not retry)
 * - Throws APIError code 'NOT_FOUND' for 404 (do not retry)
 * - Throws APIError code 'RATE_LIMITED' after exhausting retries on 429
 * - Throws APIError code 'SERVER_ERROR' after exhausting retries on 5xx
 * - Retries only on 429, 5xx, and network errors
 * - Exponential backoff: 1s, 2s, 4s (max 3 retries)
 *
 * Logs:
 * - Request start: method, URL (without query params), attempt number
 * - Rate limit hit: retry delay
 * - Auth failures: status code (do not log token)
 * - Success: status code, latency
 * - Final failure: error code, total attempts
 *
 * Metrics:
 * - api_requests_total{method, status}
 * - api_retries_total{reason}
 * - api_errors_total{code}
 * - api_latency_ms{method}
 */
interface APIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  token?: string;
  timeout?: number;
}

class APIError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_URL' | 'MISSING_TOKEN' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'RATE_LIMITED' | 'SERVER_ERROR' | 'NETWORK_ERROR',
    public statusCode?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function apiRequest<T = unknown>(
  url: string,
  options: APIOptions
): Promise<T>
```

Then I gave this spec to AI with: "Implement this according to the specification."

The result? Code that:
- Validated the URL upfront
- Checked for auth token when needed
- Distinguished between retryable and non-retryable errors
- Logged exactly what I specified
- Had clear error codes I could monitor

**Production:** Worked perfectly. When it hit a 401, it failed fast with a clear error code. When it hit 429, it retried with proper backoff. Logs showed exactly what happened. Metrics tracked retry rates.

The difference was the spec.

## Observability in the Spec

Notice how observability is part of every spec I write?

**Logs:** What gets logged, at what level, with what context.

**Metrics:** What counters, gauges, or histograms to emit.

**Errors:** What error codes exist and what they mean.

This isn't optional. When observability is in the spec, AI builds it in from the start. When you add it later, it's an afterthought.

Here's my template for observability in specs:

```typescript
/**
 * Logs:
 * - [LEVEL]: [What to log] [Context to include]
 *
 * Example:
 * - INFO: Request start with user ID and action
 * - WARN: Retry attempt with retry count and delay
 * - ERROR: Final failure with error code and context
 *
 * Metrics:
 * - metric_name{labels}: description
 *
 * Example:
 * - requests_total{endpoint, method, status}: Total requests
 * - retry_count{reason}: Number of retries by reason
 * - error_rate{code}: Errors by error code
 * - latency_ms: Request latency histogram
 *
 * Errors:
 * - ErrorCode: When it's thrown
 *
 * Example:
 * - INVALID_INPUT: When required field is missing
 * - RATE_LIMITED: When retries exhausted on 429
 * - TIMEOUT: When request exceeds timeout
 */
```

I include this in every function spec. AI fills it in. I verify it's there.

## Your Turn: Write One Spec

Here's your challenge for today. Don't ask AI to write code yet. Just write one specification.

Pick a simple function you need. Maybe:
- Validate form input
- Parse a configuration file
- Format data for display
- Call an external API

Write the complete spec:

1. **Function signature** with full TypeScript types
2. **JSDoc comment** explaining purpose
3. **Behavior section** listing all scenarios (happy path, error cases, edge cases)
4. **Logging section** specifying what gets logged
5. **Metrics section** (if applicable) specifying what gets measured
6. **Error handling** with specific error codes/types

Don't implement it. Just write the contract.

Tomorrow, I'll show you how to write prompts that turn this spec into production-ready code. But today, practice writing specs.

The hardest part of spec-driven development isn't getting AI to implement the spec. It's writing a good spec in the first place.

That skill is yours. Not AI's.

## Spec Template

Here's a template to get you started:

```typescript
/**
 * [One-line description of what this function does]
 *
 * @param [paramName] - [Description including type constraints]
 * @returns [What is returned and in what scenarios]
 * @throws [What errors are thrown and when]
 *
 * Behavior:
 * - [Happy path scenario]
 * - [Error scenario 1 and what happens]
 * - [Error scenario 2 and what happens]
 * - [Edge case 1 and how it's handled]
 * - [Edge case 2 and how it's handled]
 *
 * Logs:
 * - [LEVEL]: [What to log when]
 *
 * Metrics (if applicable):
 * - [metric_name]: [What it measures]
 *
 * Performance (if applicable):
 * - [Latency requirement or constraint]
 */
interface [ReturnType] {
  // Define structure
}

class [ErrorType] extends Error {
  constructor(
    message: string,
    public code: [error codes as union type]
  ) {
    super(message);
  }
}

function [functionName]([params]): [ReturnType]
```

Save this template. Use it every time you're about to ask AI to write a function.

## Tomorrow: Prompts That Work

Now that you know how to write specs, tomorrow I'll show you how to write prompts that get AI to implement them correctly.

You'll learn:
- How to give AI the spec and get production code back
- How to verify the implementation matches the contract
- How to iterate when it doesn't
- How to generate tests from specs

But for today, focus on specs. The better your specification, the better the code AI generates.

Good specs make everything else easy.

## Key Takeaways

1. **Write the spec before asking AI to code** - Define the complete contract first
2. **Specs include behavior, errors, logging, and metrics** - Not just function signatures
3. **Specs prevent optimistic AI code** - By forcing you to think about failures upfront
4. **Specs make verification mechanical** - Does the code match the contract? Easy to check.
5. **Specs make observability part of the contract** - Not an afterthought
6. **Specs are stable, implementations change** - The interface is your anchor during refactoring
7. **Writing good specs is a human skill** - AI generates code, you define what's needed

The best code I've ever gotten from AI came from the best specs I've ever written.

Start there.

---

**Tomorrow:** Day 3 - Prompt Engineering: Communication, Not Commands

**Template:** Full spec template in `/examples/day02-spec-template/`

**Subscribe:** Watch this repo or follow along at [31daysofvibecoding.com](https://31daysofvibecoding.com)
