---
layout: post
title: "Day 24: Deployment Automation: Let AI Generate the Scary Parts"
date: 2026-01-24
author: Jeff Blankenburg
excerpt: "Deployment scripts, migrations, rollback procedures. The boring but critical stuff. Learn to use AI to generate the automation you always skip."
---

Migrations are scary.

Not the code. The code is usually simple. It's the stakes. Migrations run once. They touch production data. They can't always be undone. Get it wrong, and you're in trouble.

Deployment scripts, rollback procedures, runbooks. Same story. You write them hoping you'll never need them. You don't test them because testing them is almost as scary as needing them.

This is exactly the kind of work AI should help with. Not because AI writes perfect deployment scripts, but because AI writes first drafts that include the things you'd forget. Rollback steps. Verification queries. The edge cases that bite you when you're already stressed.

Having something to review beats staring at a blank file wondering what you're forgetting.

## The Migration Generation Prompt

For database migrations:

```
Generate a database migration for this change.

Current schema:
[describe or paste current state]

Desired schema:
[describe what you want]

Database: [PostgreSQL/MySQL/SQLite/MongoDB]
ORM: [Prisma/TypeORM/Drizzle/raw SQL]

Generate:
1. Forward migration (up)
2. Rollback migration (down)
3. Data migration if needed
4. Verification query to confirm success

Consider:
- Table locks (can this run without downtime?)
- Index creation (CONCURRENTLY where possible)
- Default values for new non-null columns
- Data transformation for existing rows
- Foreign key constraints
```

## A Real Migration Example

I needed to add a `status` field to a `trades` table with millions of rows.

**My prompt:**
```
Generate a PostgreSQL migration.

Current: trades table has no status field
Desired: trades table has status field (enum: pending, completed, cancelled)

Requirements:
- Zero downtime
- Table has 2 million rows
- All existing trades should be 'completed'
- New trades will set status explicitly
```

**AI generated:**

```sql
-- Migration: add_trade_status
-- Generated: 2024-01-15

-- Step 1: Create enum type
CREATE TYPE trade_status AS ENUM ('pending', 'completed', 'cancelled');

-- Step 2: Add column with default (allows concurrent writes)
ALTER TABLE trades
ADD COLUMN status trade_status DEFAULT 'completed';

-- Step 3: Backfill in batches (avoids long locks)
-- Run this separately, monitoring for lock contention
DO $$
DECLARE
  batch_size INT := 10000;
  updated INT;
BEGIN
  LOOP
    UPDATE trades
    SET status = 'completed'
    WHERE id IN (
      SELECT id FROM trades
      WHERE status IS NULL
      LIMIT batch_size
      FOR UPDATE SKIP LOCKED
    );

    GET DIAGNOSTICS updated = ROW_COUNT;
    EXIT WHEN updated = 0;

    RAISE NOTICE 'Updated % rows', updated;
    PERFORM pg_sleep(0.1); -- Brief pause between batches
  END LOOP;
END $$;

-- Step 4: After backfill complete, add NOT NULL constraint
ALTER TABLE trades ALTER COLUMN status SET NOT NULL;

-- Step 5: Remove default (new inserts must specify)
ALTER TABLE trades ALTER COLUMN status DROP DEFAULT;

-- Verification
SELECT status, COUNT(*) FROM trades GROUP BY status;
-- Expected: all rows should be 'completed'

-- Rollback (if needed before NOT NULL constraint)
ALTER TABLE trades DROP COLUMN status;
DROP TYPE trade_status;
```

The AI knew about batched updates, `SKIP LOCKED`, and the order of operations. Things I might have gotten wrong writing it myself.

## The Rollback Script Prompt

For any deployment:

```
Generate a rollback script for this deployment.

What's being deployed:
[describe the changes]

Dependencies:
[what other systems are affected]

Data changes:
[any data migrations]

Generate:
1. Rollback steps in order
2. Verification after each step
3. Point of no return (if any)
4. Estimated rollback time
5. Who needs to be notified

Consider:
- Can data changes be reversed?
- What if new data was created after deploy?
- What services need to be restarted?
- What caches need to be cleared?
```

## The Deployment Checklist Prompt

For complex deployments:

```
Create a deployment checklist for this feature.

Feature: [describe it]
Components affected: [list services, databases, etc.]
Dependencies: [what must happen in order]

Generate a checklist covering:

Pre-deployment:
- Tests to run
- Approvals needed
- Communication to send
- Maintenance windows

Deployment steps:
- Exact sequence
- Commands to run
- Verification after each step
- Expected behavior

Post-deployment:
- Smoke tests
- Monitoring to watch
- How to confirm success
- Timeline for all-clear

Rollback triggers:
- What indicates we should roll back
- Decision criteria
```

## The Runbook Prompt

For when things go wrong:

```
Create a runbook for when this breaks in production.

Feature: [describe it]
Common failure modes: [what you expect could go wrong]

For each failure mode, create a section:
1. How to identify this failure (symptoms)
2. Immediate mitigation steps
3. Root cause investigation
4. Resolution steps
5. Verification
6. Communication templates

The runbook should be usable by an on-call engineer at 3am who isn't
familiar with this feature.
```

## Infrastructure as Code

When you need infrastructure:

```
Generate Terraform/CloudFormation/Pulumi for this infrastructure.

What I need:
[describe the infrastructure]

Cloud provider: [AWS/GCP/Azure]
Requirements:
- [security requirements]
- [networking requirements]
- [scaling requirements]

Generate:
1. Resource definitions
2. Variables for configuration
3. Outputs needed
4. Documentation comments

Follow:
- Least privilege principle
- No hardcoded secrets
- Meaningful resource names
- Tags for cost tracking
```

## CI/CD Pipeline Generation

For deployment pipelines:

```
Generate a CI/CD pipeline for this project.

Platform: [GitHub Actions/GitLab CI/CircleCI/Jenkins]
Tech stack: [languages, frameworks]

Pipeline should:
1. Run tests on PR
2. Build and verify
3. Deploy to staging on merge to main
4. Deploy to production manually or on tag

Include:
- Caching for speed
- Parallel jobs where possible
- Environment secrets handling
- Deployment notifications
- Rollback capability
```

## The Pre-Deployment Verification Prompt

Before you deploy:

```
Help me verify this deployment is ready.

Changes: [describe what's being deployed]
Migration: [yes/no, describe if yes]

Verify:
1. All tests pass?
2. Migration tested on staging?
3. Migration is reversible?
4. Feature flags in place?
5. Monitoring dashboards ready?
6. Rollback plan documented?
7. Stakeholders notified?
8. On-call aware?

What else should I check before deploying?
```

## The Post-Deployment Verification Prompt

After you deploy:

```
Generate post-deployment verification steps.

What was deployed: [describe]
Expected behavior: [what should work now]

Generate:
1. Smoke tests to run manually
2. Queries to verify data integrity
3. Metrics to check
4. Log patterns to look for
5. Timeline: when can we call this successful?
```

## Feature Flag Integration

For safe rollouts:

```
Add feature flag to this deployment.

Feature: [describe]
Flag name: [suggested name]

Generate:
1. Flag check code
2. Gradual rollout plan (1%, 10%, 50%, 100%)
3. Metrics to monitor at each stage
4. Kill switch procedure
5. Flag cleanup after full rollout
```

## The Deployment Documentation Prompt

For the future:

```
Document this deployment for future reference.

What was deployed: [describe]
When: [date]
Why: [reason for the change]

Generate documentation covering:
1. What changed (technical summary)
2. How to verify it's working
3. Known issues or limitations
4. How to roll back
5. Related future work
6. Who to contact with questions
```

## Tomorrow

You've deployed. The feature is live. But the code is messy. AI writes working code, but working doesn't mean maintainable. Tomorrow I'll show you how to refactor AI code from working to maintainable.

---

## Try This Today

1. Think of a deployment you have coming up
2. Run the deployment checklist prompt
3. See what you forgot

The checklist you generate won't be perfect for your organization. But it's a starting point. Customize it, save it, reuse it.

The goal isn't for AI to deploy for you. It's for AI to help you not forget the boring but critical stuff.
