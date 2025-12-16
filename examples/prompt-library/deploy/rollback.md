# Rollback Plan

## When to Use
When planning a deployment and need a way to undo it if things go wrong.

## Template

```
Generate a rollback plan for this deployment.

## What's Being Deployed
{describe_the_changes}

## Components Affected
{list_services_databases_etc}

## Data Changes
{any_migrations_or_data_updates}

## Generate

1. Rollback Steps
   - Exact sequence to undo the deployment
   - Commands to run
   - Order of operations

2. Verification After Each Step
   - How to confirm each rollback step worked

3. Point of No Return
   - Is there a point where rollback becomes impossible?
   - What triggers it?

4. Estimated Rollback Time
   - How long will rollback take?

5. Data Considerations
   - What happens to data created after deployment?
   - Can it be preserved or will it be lost?

6. Communication
   - Who needs to know about the rollback?
```

## Example

```
Generate a rollback plan for this deployment.

## What's Being Deployed
New wishlist feature:
- New wishlist_items database table
- New API endpoints (/api/wishlist/*)
- New WishlistButton component in frontend
- Updated CardDetail page

## Components Affected
- PostgreSQL database (new table)
- Backend API (new routes)
- Frontend (new component, modified page)

## Data Changes
- Migration adds wishlist_items table
- No existing data is modified

## Generate

1. Rollback Steps
   - Exact sequence to undo the deployment
   - Commands to run
   - Order of operations

2. Verification After Each Step
   - How to confirm each rollback step worked

3. Point of No Return
   - Is there a point where rollback becomes impossible?
   - What triggers it?

4. Estimated Rollback Time
   - How long will rollback take?

5. Data Considerations
   - What happens to data created after deployment?
   - Can it be preserved or will it be lost?

6. Communication
   - Who needs to know about the rollback?
```

## Variations
- For data migrations: focus on data preservation
- For multi-service deployments: include service dependencies
- For breaking changes: include client compatibility
