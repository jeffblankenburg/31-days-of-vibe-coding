# Code Smell Detection

## When to Use
When you want to identify what needs improving in existing code.

## Template

```
Analyze this code for code smells and maintainability issues.

## Code
{paste_code}

## Look For
1. Functions doing too many things
2. Poor naming (unclear variables, generic names like data/result/temp)
3. Code duplication
4. Deep nesting (more than 3 levels)
5. Long functions (over 30 lines)
6. Missing error handling
7. Implicit behavior that should be explicit
8. Tight coupling between components
9. Missing abstractions
10. Inconsistent patterns

## Output Format
For each issue:
- Location (function/line)
- The smell
- Why it's a problem
- Suggested fix (brief)

Prioritize by impact. What would help the most?
```

## Example

```
Analyze this code for code smells and maintainability issues.

## Code
async function processOrder(orderId, userId, paymentInfo, shippingInfo, couponCode) {
  let discount = 0;
  if (couponCode) {
    const coupon = await db.coupon.findUnique({ where: { code: couponCode } });
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = coupon.value;
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      }
    }
  }
  const order = await db.order.findUnique({ where: { id: orderId } });
  let total = 0;
  for (const item of order.items) {
    const product = await db.product.findUnique({ where: { id: item.productId } });
    total += product.price * item.quantity;
  }
  if (discount > 0) {
    if (couponCode) {
      const coupon = await db.coupon.findUnique({ where: { code: couponCode } });
      if (coupon.type === 'percent') {
        total = total * (1 - discount / 100);
      } else {
        total = total - discount;
      }
    }
  }
  // ... continues for 200 more lines
}

## Look For
1. Functions doing too many things
2. Poor naming (unclear variables, generic names like data/result/temp)
3. Code duplication
4. Deep nesting (more than 3 levels)
5. Long functions (over 30 lines)
6. Missing error handling
7. Implicit behavior that should be explicit
8. Tight coupling between components
9. Missing abstractions
10. Inconsistent patterns

## Output Format
For each issue:
- Location (function/line)
- The smell
- Why it's a problem
- Suggested fix (brief)

Prioritize by impact. What would help the most?
```

## Variations
- For legacy code: focus on safety of changes
- For new code: be stricter
- For shared libraries: emphasize API clarity
