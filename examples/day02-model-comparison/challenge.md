# The Challenge Prompt

This is the exact prompt given to all four AI models:

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

## Evaluation Criteria

When comparing implementations, consider:

1. **Accuracy** - Does it meet all the requirements?
2. **Readability** - Is the code easy to understand?
3. **Observability** - Are logs detailed and useful?
4. **Error Handling** - Does it handle edge cases?
5. **Type Safety** - Are types properly defined?
6. **Production Readiness** - Could you ship this?

## Your Turn

Try this prompt with your preferred AI coding tool and see what you get. Compare it to the implementations in this folder.

**Bonus points:** Ask the AI to explain its design decisions and trade-offs.
