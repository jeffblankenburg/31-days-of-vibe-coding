# Database Migration

## When to Use
When you need to change your database schema.

## Template

```
Generate a database migration.

## Current Schema
{describe_or_paste_current}

## Desired Schema
{describe_what_you_want}

## Database
{PostgreSQL / MySQL / MongoDB / etc.}

## ORM
{Prisma / TypeORM / Drizzle / raw SQL / etc.}

## Generate
1. Forward migration (up)
2. Rollback migration (down)
3. Data migration if existing rows need updating
4. Verification query to confirm success

## Consider
- Can this run without downtime?
- Will it lock tables? For how long?
- What about existing data?
- Is the rollback safe?
```

## Example

```
Generate a database migration.

## Current Schema
users table:
- id (uuid, primary key)
- email (varchar, unique)
- name (varchar)
- created_at (timestamp)

## Desired Schema
Add a status field to users:
- status (enum: active, suspended, deleted)
- All existing users should be 'active'
- New users should default to 'active'

## Database
PostgreSQL

## ORM
Prisma

## Generate
1. Forward migration (up)
2. Rollback migration (down)
3. Data migration if existing rows need updating
4. Verification query to confirm success

## Consider
- Can this run without downtime?
- Will it lock tables? For how long?
- What about existing data?
- Is the rollback safe?
```

## Variations
- For large tables: include batching strategy
- For breaking changes: include data transformation
- For zero-downtime: include multi-phase approach
