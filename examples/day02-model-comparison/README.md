# Day 2: Model Comparison Challenge

This folder contains the challenge prompt and implementations from four different AI coding models.

## The Challenge

See `challenge.md` for the complete prompt used with all four models.

## Implementations

- `claude-implementation.ts` - Claude's response
- `chatgpt-implementation.ts` - ChatGPT (GPT-4) response
- `gemini-implementation.ts` - Google Gemini response
- `copilot-implementation.ts` - GitHub Copilot response

## Try It Yourself

1. Copy the prompt from `challenge.md`
2. Paste it into your AI coding tool of choice
3. Compare the results to these implementations
4. Notice what's different about each approach

## What to Look For

- Error handling strategies
- Logging detail and structure
- Type safety
- Edge case coverage
- Code readability
- Production-readiness

## Bonus Challenge

Take any implementation and ask your AI to add:
- Integration with a structured logger (Winston, Pino, etc.)
- Trace IDs for request correlation
- Metrics emission (request count, retry count, failure rate)
- Error categorization

See which model gives you production-ready observability code.
