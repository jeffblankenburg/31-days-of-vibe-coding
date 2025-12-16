# Edge Case Review

## When to Use
When you want to find inputs and scenarios that could break your code.

## Template

```
Find edge cases that could break this code.

Be adversarial. Try to break it.

## Code
{paste_code}

## Consider

1. Empty/Missing Values
   - null, undefined, empty string
   - Empty arrays, empty objects
   - Missing optional fields

2. Boundary Values
   - 0, -1, MAX_INT
   - Very long strings
   - Very large arrays

3. Type Issues
   - String "0" vs number 0
   - String "false" vs boolean false
   - Unexpected types

4. Special Characters
   - Unicode, emoji
   - SQL special characters
   - HTML/script tags

5. Timing Issues
   - Concurrent access
   - Race conditions
   - Stale data

6. External Failures
   - Network errors
   - Database errors
   - Timeout scenarios

## Output Format
For each edge case:
- The input or scenario
- What goes wrong
- How to handle it (code example)
```

## Example

```
Find edge cases that could break this code.

Be adversarial. Try to break it.

## Code
function formatUserName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

## Consider

1. Empty/Missing Values
   - null, undefined, empty string
   - Empty arrays, empty objects
   - Missing optional fields

2. Boundary Values
   - 0, -1, MAX_INT
   - Very long strings
   - Very large arrays

3. Type Issues
   - String "0" vs number 0
   - String "false" vs boolean false
   - Unexpected types

4. Special Characters
   - Unicode, emoji
   - SQL special characters
   - HTML/script tags

5. Timing Issues
   - Concurrent access
   - Race conditions
   - Stale data

6. External Failures
   - Network errors
   - Database errors
   - Timeout scenarios

## Output Format
For each edge case:
- The input or scenario
- What goes wrong
- How to handle it (code example)
```

## Variations
- For APIs: focus on malicious input
- For UI: focus on user behavior edge cases
- For data processing: focus on data quality issues
