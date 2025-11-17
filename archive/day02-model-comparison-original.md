# Day 2: The AI Coding Landscape: Seven Models, One Challenge

Yesterday I promised you a head-to-head comparison of AI coding models. Not based on benchmarks or marketing claims, but on actual code they generate for a real production scenario.

So I ran an experiment. Same prompt. Same requirements. Seven different AI models. The results surprised me.

Here's what I learned about how different models think about code, and what it means for vibe coding.

## The Challenge

I needed a production-ready TypeScript function that fetches weather data from an external API. The kind of code you'd actually ship, not a demo that falls apart in production.

Here's the exact prompt I used:

```
Write a TypeScript function that fetches weather data from an external API.

Requirements:
- Accept a city name as input
- Make a GET request to a weather API endpoint
- Handle HTTP 429 (rate limit) responses with exponential backoff
- Retry up to 3 times with backoff: 1s, 2s, 4s
- Log all requests, retries, and errors for observability
- Return typed weather data or throw a descriptive error
- Include proper TypeScript types
- Add JSDoc comments
```

This tests everything that matters for vibe coding:
- Does it handle edge cases?
- Is the logging useful for debugging?
- Would you ship this code?
- Does it think about production realities?

I tested seven models: Claude, GPT-4 (via ChatGPT), Gemini, Grok, DeepSeek, Llama 3.1 (via Meta AI), and Perplexity.

The results revealed seven distinct personalities.

## The Models: Seven Different Approaches

### DeepSeek: The Enterprise Architect

DeepSeek gave me 243 lines of production-ready code with everything you'd need to ship this to a real system.

What stood out:

```typescript
class WeatherAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public retryCount?: number
  ) {
    super(message);
    this.name = 'WeatherAPIError';
  }
}

interface WeatherAPIConfig {
  baseURL: string;
  apiKey: string;
  maxRetries: number;
  retryDelays: number[];
}
```

It created a custom error class that tracks status codes and retry counts. It defined a configuration interface so you can inject settings. It properly exported everything as a module.

The error handling distinguished between three types of failures:
- 4xx client errors (fail immediately, don't retry)
- 5xx server errors (retry with backoff)
- Network errors (retry with backoff)

The logging was contextual:
```typescript
console.log(`[WEATHER_API] Request completed - Status: ${response.status}, Attempt: ${attempt + 1}/${maxRetries + 1}`);
```

This is the code of someone who's been paged at 2am because logs weren't detailed enough.

**DeepSeek's vibe:** "I'm building this for a team to maintain in production."

### Claude: The Defensive Engineer

Claude's response came in at 115 lines with a focus on preventing things from breaking.

What it prioritized:

```typescript
if (!apiKey) {
  throw new Error('WEATHER_API_KEY environment variable is required');
}

if (!city || city.trim().length === 0) {
  throw new Error('City name is required');
}
```

It validated inputs upfront. It separated the API response type from the domain type (good practice when the API structure doesn't match your needs). It distinguished between retryable and non-retryable errors.

Here's how Claude handled retry logic:

```typescript
// Don't retry on non-retryable HTTP errors
if (error instanceof Error && error.message.includes('Weather API returned')) {
  const statusMatch = error.message.match(/returned (\d+)/);
  if (statusMatch) {
    const status = parseInt(statusMatch[1]);
    // Only retry on 429, 5xx, or network errors
    if (status >= 400 && status < 500 && status !== 429) {
      console.error(`[fetchWeather] Non-retryable client error for ${city}:`, error.message);
      throw error;
    }
  }
}
```

It won't retry a 404 or 401. Those aren't going to fix themselves.

**Claude's vibe:** "What happens when this breaks? Let's handle that now."

### Gemini: The Academic

Gemini gave me 207 lines that felt like a textbook example. Complete with section headers:

```typescript
/**
 * ==============================================================================
 * TYPE DEFINITIONS
 * ==============================================================================
 */

/**
 * ==============================================================================
 * API CONFIGURATION (MOCK)
 * ==============================================================================
 */
```

And here's the wild part: it included a full mock implementation to demonstrate the retry logic working.

```typescript
// Mock the global 'fetch' function for demonstration purposes
(globalThis as any).fetch = (url: string) => {
  // Simulates: 2 rate limits, then success on 3rd retry
  // ...
};
```

This code is meant to teach you how retry logic works, not ship to production. You'd need to rip out the mock and wire up the real API.

**Gemini's vibe:** "Let me show you how this works with a complete example."

### Grok: The Recursive Thinker

Grok took a different approach. Instead of a loop, it used recursion for retries:

```typescript
async function attemptFetch(attempt: number = 1): Promise<WeatherData> {
  log(`Fetching weather for ${city}, attempt ${attempt}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.status === 429 && attempt <= maxRetries) {
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      log(`Rate limit hit, retrying after ${delay}ms`, 'warn');
      await new Promise(resolve => setTimeout(resolve, delay));
      return attemptFetch(attempt + 1);  // Recursive retry
    }

    // ...
  }
}
```

This is elegant. The retry logic is built into the recursion. Each call naturally handles its own retry decision.

It also created a logger function for consistent formatting:

```typescript
const log = (message: string, level: 'info' | 'error' | 'warn' = 'info') => {
  console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`);
};
```

Every log gets a timestamp and severity level.

**Grok's vibe:** "Let's solve this with functional patterns and clean abstractions."

### ChatGPT: The Pragmatist

ChatGPT gave me 76 lines of clean, straightforward code. No fancy abstractions. No over-engineering. Just the requirements implemented clearly.

```typescript
async function fetchWeatherData(city: string): Promise<WeatherData> {
  const maxRetries = 3;
  const baseDelay = 1000;
  let attempt = 0;

  while (attempt <= maxRetries) {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log(`[fetchWeatherData] Attempt ${attempt + 1}: Fetching weather for "${city}"`);

    try {
      const response = await fetch(url);

      if (response.status === 429) {
        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt);
          console.warn(`[fetchWeatherData] Rate limited (HTTP 429). Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          attempt++;
          continue;
        } else {
          throw new Error(`Rate limit exceeded for "${city}" after ${maxRetries} retries.`);
        }
      }

      // Process response...
    }
  }
}
```

It handles the core requirement (retry on 429) and gets out of the way. You can read the entire function in one screen.

The catch block retries on any error, not just 429. That's maybe too aggressive, but it's a defensible choice if you don't know what errors to expect.

**ChatGPT's vibe:** "Here's a solid implementation. Add more if you need it."

### Perplexity: The Minimalist

Perplexity gave me 76 lines focused purely on the task. No abstractions. No helper functions. Just a straightforward implementation.

```typescript
export async function fetchWeather(city: string): Promise<WeatherData> {
  const MAX_RETRIES = 3;
  const BACKOFF_DELAYS = [1000, 2000, 4000];
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      console.log(`[INFO] Fetching weather for "${city}" (Attempt ${attempt + 1})`);

      const url = `${API_BASE_URL}?city=${encodeURIComponent(city)}&current_weather=true`;
      const response = await fetch(url);

      if (response.status === 429) {
        if (attempt === MAX_RETRIES) {
          throw new Error(`Rate limit reached for city "${city}" after ${MAX_RETRIES} retries.`);
        }
        const delay = BACKOFF_DELAYS[attempt];
        console.warn(`[WARN] Rate limited. Retrying after ${delay / 1000}s.`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      // ...
    }
  }
}
```

Clean logging prefixes ([INFO], [WARN], [ERROR]). Clear variable names. Nullish coalescing for safety:

```typescript
temperatureC: data.current_weather?.temperature ?? NaN,
```

**Perplexity's vibe:** "Simple is better. Do what's needed, nothing more."

### Meta/Llama: The Quick Scripter

Meta's Llama gave me 83 lines that felt like a first draft. It's the only model that used axios instead of fetch:

```typescript
import axios, { AxiosError } from 'axios';

async function fetchWeatherData(city: string, config: WeatherApiConfig): Promise<WeatherData> {
  const maxRetries = 3;
  const retryDelays = [1000, 2000, 4000];
  const url = `${config.baseUrl}?q=${city}&appid=${config.apiKey}`;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        const weatherData: WeatherData = {
          city: response.data.name,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
        };
        return weatherData;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        // Retry logic...
      }
    }
  }
}
```

This works, but it introduces a dependency (axios) and doesn't handle edge cases as thoroughly as the others. It's fast to write, would work in a script, but needs refinement for production.

**Meta's vibe:** "Get something working fast, iterate from there."

## What This Reveals About AI Models

Running this experiment taught me more than I expected. Each model has a distinct philosophy about code.

### Error Handling: Three Schools of Thought

**Fail Fast:** Gemini only retries 429. Everything else is a permanent failure. Ship it, see what breaks, fix those cases.

**Defensive:** Claude and DeepSeek distinguish between retryable and non-retryable errors. Don't waste time retrying a 404. Do retry network failures and server errors.

**Aggressive:** ChatGPT retries everything. If anything fails, wait and try again. Simple, but you might retry failures that will never succeed.

None of these is wrong. They're different trade-offs based on different assumptions.

### Observability: Wide Range of Priorities

DeepSeek and Grok added timestamps and structured logging. You can grep these logs in production and know exactly what happened.

Claude and ChatGPT logged context (attempt numbers, city names) so you can debug specific failures.

Meta logged the bare minimum.

Gemini logged extensively but included mock data that would confuse production logs.

The models that prioritized observability are thinking about debugging production issues. The ones that didn't are optimizing for simplicity or learning.

### Complexity: 76 to 243 Lines for Same Requirements

The range is striking. Perplexity and ChatGPT: 76 lines. DeepSeek: 243 lines.

Both approaches are valid. The 76-line version is easier to understand and modify. The 243-line version has custom errors, configuration injection, and full exports. Which is better depends on your context.

Building a quick internal tool? Use the simple version. Building a shared library for your team? Use the comprehensive version.

### Production Readiness: Very Different Standards

DeepSeek's code could be merged into a production codebase today. It exports properly, handles all error cases, supports configuration injection, and has observability built in.

Meta's code needs work. The axios dependency is fine for some projects, but adds weight. The error handling is basic. You'd need to enhance it before shipping.

The others fall somewhere in between.

## What This Means for Vibe Coding

Here's the key insight: **you need to match the model to your situation.**

### When You're Exploring

Use Claude or Grok. They'll think about edge cases you haven't considered. They'll add validation and error handling. They'll push back on assumptions.

When I'm designing something new, I want an AI that asks "but what happens when..." That's Claude. That's Grok.

### When You Know What You Want

Use ChatGPT or Perplexity. They'll give you clean code that does exactly what you asked for. No surprises. No over-engineering.

When I'm implementing a pattern I already understand, I don't need defensive thinking. I need fast, clean execution.

### When You're Building for a Team

Use DeepSeek. It thinks about maintainability, configuration, and error handling like an engineer who's been on-call.

When I'm writing code others will maintain, I want the comprehensive version with proper exports and detailed errors.

### When You're Learning

Use Gemini. It breaks things down, explains the structure, includes examples.

When I'm exploring a new pattern or API, I want the teaching version that shows me how things work.

### When You're Prototyping Fast

Use Meta/Llama. It'll get you something working quickly that you can iterate on.

When I'm validating an idea, I don't need production-ready. I need working-right-now.

## The Observability Reality Check

Here's what every model got wrong: **none of them integrated with actual observability tools.**

They all used console.log. DeepSeek and Grok made the logs structured and parseable. Claude added context. But none of them said "let's wire this up to Dynatrace" or "let's emit metrics to Datadog."

This is the reality of AI-generated code. It gives you scaffolding. You connect it to your actual systems.

When you use any of these implementations, you should immediately:
- Replace console.log with my actual logger (Winston, Pino, whatever)
- Add trace IDs for request correlation
- Emit metrics (request count, retry count, failure rate by error type)
- Connect to my observability stack

The AI gets you 70% there. That last 30% is your job. And it always will be.

## Your Turn: Run the Experiment

All seven responses are in `/examples/day02-model-comparison/` in this repo. Read them. Compare them. Notice what each model prioritizes.

Then try this:

**Pick one of these implementations and ask your AI model to add production observability:**

```
Take this weather function and add production-ready observability:
- Replace console.log with structured logging (use Winston or Pino)
- Add trace IDs for request correlation
- Emit metrics: request count, retry count, failure rate by error type
- Add timing instrumentation
- Make it observable in production

Here's the code: [paste your chosen implementation]
```

See what it generates. Does it know how to use Winston? Does it understand trace context? Can it emit metrics properly?

This reveals which models understand production observability vs which ones just know how to write code.

**Share your results:** Open an issue in this repo with what you learned. Which model surprised you? Which one matched your vibe?

## What I Actually Use

I use Claude Code for my daily vibe coding. Not because it's "the best," but because its defensive approach matches how I think about code.

But here's the thing: **you should try multiple models.**

Run the same prompt through ChatGPT and Claude. See which one feels right. Notice which approach makes more sense for what you're building.

The goal isn't to find the "best" model. It's to find the one that matches your vibe in the moment.

Sometimes you need defensive. Sometimes you need fast. Sometimes you need comprehensive. Match the tool to the task.

## Tomorrow: Writing Prompts That Work

Now that you've seen how different models think, tomorrow I'll show you how to write prompts that get you production-ready code regardless of which model you use.

The difference is in how you ask. Be specific about observability. Be explicit about error handling. Describe the context, not just the code.

Most developers write prompts like they're talking to a search engine. That's why they get demo code instead of production code.

Tomorrow, I'll show you how to write prompts like you're talking to a junior developer who's smart but needs guidance.

See you then.

## Key Takeaways

1. **Each AI model has a distinct personality** when approaching code
2. **DeepSeek** thinks like an enterprise architect (comprehensive, configurable)
3. **Claude** is defensive (edge cases, validation, production thinking)
4. **Gemini** is academic (teaches concepts with examples)
5. **Grok** is functional (elegant patterns, recursive thinking)
6. **ChatGPT** is pragmatic (clean, straightforward, does what you asked)
7. **Perplexity** is minimalist (simple, focused, nothing extra)
8. **Meta/Llama** is fast (get it working, iterate later)
9. **No model integrates with real observability tools** - that's your job
10. **Match the model to your situation** - exploring vs implementing vs learning vs shipping

---

**Tomorrow:** Day 3 - Prompt Like a Pro: Writing for Machines, Thinking Like a Dev

**See the code:** All seven implementations in `/examples/day02-model-comparison/`

**Subscribe:** Watch this repo or follow along at [31daysofvibecoding.com](https://31daysofvibecoding.com)
