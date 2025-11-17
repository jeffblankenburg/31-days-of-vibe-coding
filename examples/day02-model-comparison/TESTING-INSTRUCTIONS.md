# Testing Instructions for AI Model Comparison

## The Exact Prompt to Use

Copy and paste this EXACT prompt into each AI model:

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

## Models to Test

### Tier 1: Major Models (Easy Access)

1. **Claude** (Anthropic) ✅ DONE
   - Already generated: see `claude-actual-response.ts`

2. **GPT-4** (OpenAI)
   - Access: [chat.openai.com](https://chat.openai.com)
   - Use GPT-4 if you have ChatGPT Plus
   - Copy the entire code response

3. **Gemini** (Google)
   - Access: [gemini.google.com](https://gemini.google.com)
   - Free to use
   - Copy the entire code response

4. **Grok** (xAI)
   - Access: [x.com](https://x.com) (requires X Premium)
   - Copy the entire code response

### Tier 2: Rising Stars (If Accessible)

5. **DeepSeek** (DeepSeek AI)
   - Access: [chat.deepseek.com](https://chat.deepseek.com)
   - Getting lots of buzz for coding
   - Free to use

6. **Llama 3.1** (Meta)
   - Access: [meta.ai](https://meta.ai)
   - Free to use
   - Copy the entire code response

7. **Perplexity**
   - Access: [perplexity.ai](https://perplexity.ai)
   - Has coding mode
   - Copy the entire code response

## What to Capture

For each model, save:
1. **The complete TypeScript code** it generates
2. **Any explanations or commentary** it provides
3. **First impressions:** Does it feel defensive? Pragmatic? Over-engineered?

## File Naming Convention

Save each response as:
- `gpt4-response.ts`
- `gemini-response.ts`
- `grok-response.ts`
- `deepseek-response.ts`
- `llama-response.ts`
- `perplexity-response.ts`

## What We're Looking For

When analyzing each response, we'll evaluate:
- **Error handling:** Does it distinguish retryable vs non-retryable errors?
- **Logging quality:** Are logs useful for debugging in production?
- **Edge cases:** URL encoding? Input validation? Environment variables?
- **Type safety:** Separate API response types? Proper TypeScript usage?
- **Code style:** Defensive vs optimistic? Minimal vs comprehensive?
- **Observability mindset:** Does it think about production monitoring?

## Claude's Response

See `claude-actual-response.ts` for Claude's real response to this prompt (already completed).
