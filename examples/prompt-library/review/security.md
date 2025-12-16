# Security Review

## When to Use
When auditing code for security vulnerabilities before shipping.

## Template

```
Act as a security expert conducting a penetration test.

Review this code assuming the user is actively trying to break it.
They have unlimited time, technical skill, and motivation.

## Code
{paste_code}

## Look For
1. Injection attacks (SQL, NoSQL, command, LDAP)
2. Authentication bypasses
3. Authorization failures (can users access other users' data?)
4. Sensitive data exposure
5. Missing rate limiting
6. Insecure direct object references
7. Cross-site scripting (XSS)
8. Cross-site request forgery (CSRF)
9. Security misconfigurations
10. Insufficient logging for security events

## Output Format
For each issue found:
- Severity (Critical/High/Medium/Low)
- Location (file:line if applicable)
- How an attacker would exploit it
- Specific fix with code

Be paranoid. Assume everything is an attack vector.
```

## Example

```
Act as a security expert conducting a penetration test.

Review this code assuming the user is actively trying to break it.
They have unlimited time, technical skill, and motivation.

## Code
router.get('/api/cards/:cardId', async (req, res) => {
  const { cardId } = req.params;
  const card = await db.card.findUnique({
    where: { id: cardId },
    include: { owner: true }
  });

  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }

  res.json(card);
});

## Look For
1. Injection attacks (SQL, NoSQL, command, LDAP)
2. Authentication bypasses
3. Authorization failures (can users access other users' data?)
4. Sensitive data exposure
5. Missing rate limiting
6. Insecure direct object references
7. Cross-site scripting (XSS)
8. Cross-site request forgery (CSRF)
9. Security misconfigurations
10. Insufficient logging for security events

## Output Format
For each issue found:
- Severity (Critical/High/Medium/Low)
- Location (file:line if applicable)
- How an attacker would exploit it
- Specific fix with code

Be paranoid. Assume everything is an attack vector.
```

## Variations
- For auth code: use the authentication-specific checklist
- For APIs: focus on input validation and authorization
- For frontend: focus on XSS and data exposure
