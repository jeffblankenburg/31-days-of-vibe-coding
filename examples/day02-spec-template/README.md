# Spec-Driven Development Template

This template helps you write complete function specifications before generating code with AI.

## Why Use This Template?

When you write a spec first:
- AI generates better, more reliable code
- Edge cases are handled upfront
- Observability is built in from the start
- Verification is easy (does code match spec?)
- Refactoring is safe (spec doesn't change)

## How to Use

1. **Copy `spec-template.ts`** to your project
2. **Fill in all sections** - don't skip observability
3. **Give the spec to AI** with: "Implement this according to the specification"
4. **Verify** the implementation matches the contract
5. **Generate tests** from the spec

## Template Sections

### Function Signature
```typescript
function [name]([params]): [return type]
```
Define the complete interface with full TypeScript types.

### JSDoc Comment
```typescript
/**
 * [Purpose and behavior]
 * @param [name] - [description with constraints]
 * @returns [what is returned]
 * @throws [what errors and when]
 */
```

### Behavior Section
List every scenario:
- Happy path
- Error cases
- Edge cases (null, undefined, empty, boundary conditions)
- Retry logic
- Fallback behavior

### Logs Section
Specify what to log at each level:
- DEBUG: Low-level details
- INFO: Normal operations
- WARN: Retries, fallbacks, degraded operation
- ERROR: Failures with context

### Metrics Section (if applicable)
Define what to measure:
- Counters: `_total` suffix, labeled appropriately
- Histograms: `_duration_ms` or `_latency_ms`
- Gauges: Current state values

### Performance Section (if applicable)
Set expectations:
- Target latency (p50, p99)
- Timeouts
- Rate limits
- Resource constraints

## Example: API Client Function

See `spec-template.ts` for a complete example with:
- Full type definitions
- Custom error class
- Comprehensive behavior specification
- Observability requirements
- Performance expectations

## Tips for Good Specs

1. **Be specific about inputs** - Include null/undefined handling
2. **List all error scenarios** - What throws what error when
3. **Include observability** - Logging and metrics aren't optional
4. **Think about failures** - Don't assume happy path
5. **Set performance expectations** - If speed matters, specify it
6. **Use custom error types** - With specific error codes
7. **Document edge cases** - Empty strings, boundary values, etc.

## Common Mistakes

❌ **Vague behavior** - "Handle errors appropriately"
✅ **Specific behavior** - "Throw ValidationError with code 'MISSING_FIELD' if email is null"

❌ **Missing observability** - No logging specified
✅ **Complete observability** - "Log retry attempts at WARN level with retry count and delay"

❌ **Implicit assumptions** - "Validates email"
✅ **Explicit rules** - "Validates email using RFC 5322 simplified rules, allows + in local part"

❌ **No error codes** - Throws generic Error
✅ **Specific errors** - Custom error class with union type of error codes

## Workflow

1. **Write the spec** (5-10 minutes)
2. **Review the spec** - Is it complete? Unambiguous?
3. **Give spec to AI** - "Implement according to specification"
4. **Verify implementation** - Does it match the contract?
5. **Generate tests** - Test all behaviors in the spec
6. **Iterate if needed** - Point to spec when AI deviates

## Next Steps

After writing your spec:
- See Day 3 for how to prompt AI to implement it
- See Day 4 for iteration strategies
- See Day 5 for observability integration
- See Day 6 for testing and verification

The better your spec, the better your AI-generated code.
