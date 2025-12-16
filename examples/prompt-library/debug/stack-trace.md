# Stack Trace Analysis

## When to Use
When you have an error stack trace and need to understand what happened.

## Template

```
Explain this error and help me fix it.

## Error Message
{error_message}

## Stack Trace
{stack_trace}

## Context
{what_was_happening_when_this_occurred}

## Tell Me
1. What's the actual error (one sentence)?
2. Is this our code or a library?
3. What file and line should I look at first?
4. Most likely cause?
5. How to fix it?
```

## Example

```
Explain this error and help me fix it.

## Error Message
TypeError: Cannot read properties of undefined (reading 'map')

## Stack Trace
TypeError: Cannot read properties of undefined (reading 'map')
    at formatCards (/app/src/utils/formatters.ts:23:18)
    at CardList (/app/src/components/CardList.tsx:15:24)
    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:14985:18)
    at mountIndeterminateComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:17811:13)
    at beginWork (/app/node_modules/react-dom/cjs/react-dom.development.js:19049:16)

## Context
Happens when loading the card collection page. Not every time, only for some users.

## Tell Me
1. What's the actual error (one sentence)?
2. Is this our code or a library?
3. What file and line should I look at first?
4. Most likely cause?
5. How to fix it?
```

## Variations
- For async errors: note if the stack trace is complete
- For production errors: include any available context (user ID, request ID)
- For library errors: include the library version
