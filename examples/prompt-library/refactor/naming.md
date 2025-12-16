# Improve Naming

## When to Use
When code has unclear or generic names that hurt readability.

## Template

```
Improve the naming in this code.

## Code
{paste_code}

## Naming Rules
- Functions should be verbs (getUser, validateInput, processOrder)
- Booleans should be questions (isValid, hasPermission, canEdit)
- Collections should be plural (users, items, cards)
- Avoid generic names (data, result, temp, info, item, thing)
- Abbreviations should be obvious (id, url, api) or spelled out
- Names should describe what, not how

## Output Format
For each rename:
| Current | Suggested | Why |
|---------|-----------|-----|
```

## Example

```
Improve the naming in this code.

## Code
async function process(d) {
  const res = await fetch(d.url);
  const info = await res.json();

  const arr = [];
  for (const item of info.items) {
    const temp = transform(item);
    if (temp.flag) {
      arr.push(temp);
    }
  }

  return { data: arr, cnt: arr.length };
}

function transform(x) {
  return {
    n: x.name,
    v: x.value,
    flag: x.status === 'active'
  };
}

## Naming Rules
- Functions should be verbs (getUser, validateInput, processOrder)
- Booleans should be questions (isValid, hasPermission, canEdit)
- Collections should be plural (users, items, cards)
- Avoid generic names (data, result, temp, info, item, thing)
- Abbreviations should be obvious (id, url, api) or spelled out
- Names should describe what, not how

## Output Format
For each rename:
| Current | Suggested | Why |
|---------|-----------|-----|
```

## Variations
- For APIs: ensure names match domain language
- For internal code: prioritize clarity over brevity
- For public libraries: ensure names are intuitive for users
