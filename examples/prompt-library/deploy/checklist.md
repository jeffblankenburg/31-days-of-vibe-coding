# Deployment Checklist

## When to Use
When preparing for a deployment and want to make sure nothing is forgotten.

## Template

```
Create a deployment checklist for this feature.

## Feature
{describe_the_feature}

## Components Affected
{list_what_changes}

## Generate Checklist

### Pre-Deployment
- [ ] Tests to run
- [ ] Approvals needed
- [ ] Communication to send
- [ ] Dependencies to verify

### Deployment Steps
- [ ] Exact sequence of operations
- [ ] Commands to run
- [ ] Verification after each step
- [ ] Expected behavior at each stage

### Post-Deployment
- [ ] Smoke tests to run
- [ ] Metrics to monitor
- [ ] How to confirm success
- [ ] How long to monitor before all-clear

### Rollback Triggers
- [ ] What indicates we should roll back?
- [ ] Who makes the call?
- [ ] What's the rollback procedure?
```

## Example

```
Create a deployment checklist for this feature.

## Feature
Wishlist feature allowing users to save cards for later.
Includes new database table, API endpoints, and frontend components.

## Components Affected
- Database: new wishlist_items table
- Backend: new /api/wishlist/* endpoints
- Frontend: new WishlistButton, updated CardDetail page

## Generate Checklist

### Pre-Deployment
- [ ] Tests to run
- [ ] Approvals needed
- [ ] Communication to send
- [ ] Dependencies to verify

### Deployment Steps
- [ ] Exact sequence of operations
- [ ] Commands to run
- [ ] Verification after each step
- [ ] Expected behavior at each stage

### Post-Deployment
- [ ] Smoke tests to run
- [ ] Metrics to monitor
- [ ] How to confirm success
- [ ] How long to monitor before all-clear

### Rollback Triggers
- [ ] What indicates we should roll back?
- [ ] Who makes the call?
- [ ] What's the rollback procedure?
```

## Variations
- For hotfixes: abbreviated checklist focused on speed
- For major releases: expanded checklist with more verification
- For database changes: extra focus on migration steps
