# Bug Investigation

## When to Use
When you have a bug and need help figuring out what's wrong.

## Template

```
Help me debug this issue.

## Symptom
{what_is_happening}

## Expected
{what_should_happen}

## Frequency
{always / sometimes / rarely}

## Relevant Code
{paste_code}

## What I've Tried
{what_you_already_ruled_out}

## Help Me
1. List the top 5 most likely causes
2. For each cause, how would I confirm or rule it out?
3. What logging would help narrow it down?
```

## Example

```
Help me debug this issue.

## Symptom
Users sometimes see stale data after updating their profile.
The update succeeds (no errors), but when they refresh, old data appears.

## Expected
After updating profile, refreshing should show new data.

## Frequency
Sometimes. Maybe 1 in 10 updates. Can't reproduce reliably.

## Relevant Code
// Update endpoint
router.put('/api/profile', async (req, res) => {
  await db.user.update({
    where: { id: req.user.id },
    data: req.body
  });
  res.json({ success: true });
});

// Get endpoint
router.get('/api/profile', async (req, res) => {
  const user = await db.user.findUnique({
    where: { id: req.user.id }
  });
  res.json(user);
});

## What I've Tried
- Confirmed database is being updated (checked directly)
- No errors in logs
- Works fine in local development

## Help Me
1. List the top 5 most likely causes
2. For each cause, how would I confirm or rule it out?
3. What logging would help narrow it down?
```

## Variations
- For production bugs: add environment details
- For intermittent bugs: add timing/pattern observations
- For regressions: add what changed recently
