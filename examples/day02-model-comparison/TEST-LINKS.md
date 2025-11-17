# Quick Links for AI Model Testing

## The Prompt to Copy

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

## Direct Links to Test

### Tier 1: Major Models

1. **Claude** ✅ DONE
   - See: `claude-actual-response.ts`

2. **GPT-4 / ChatGPT**
   - Link: https://chat.openai.com
   - Note: Use GPT-4 if you have ChatGPT Plus

3. **Google Gemini**
   - Link: https://gemini.google.com
   - Note: Free to use

4. **Grok**
   - Link: https://x.com (click Grok icon)
   - Note: Requires X Premium subscription

### Tier 2: Rising Stars

5. **DeepSeek**
   - Link: https://chat.deepseek.com
   - Note: Free, getting lots of coding buzz

6. **Meta AI / Llama 3.1**
   - Link: https://meta.ai
   - Note: Free to use

7. **Perplexity**
   - Link: https://perplexity.ai
   - Note: Has coding mode, free to use

## How to Test

1. Click each link
2. Paste the prompt above
3. Copy the complete TypeScript code response
4. Save as `[model-name]-response.ts` in this folder
5. Note any interesting commentary or approach differences

## What to Look For

- Error handling approach
- Logging style and detail
- Edge case coverage
- Type safety
- Code complexity (minimal vs comprehensive)
- Production-readiness
