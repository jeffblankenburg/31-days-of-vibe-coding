# API Endpoint Generation

## When to Use
When creating a new REST API endpoint.

## Template

```
Generate a REST API endpoint.

## Context
Framework: {framework}
Database: {database}
Auth: {auth_method}

## Endpoint
Method: {method}
Path: {path}
Purpose: {purpose}

## Request
{request_schema}

## Response
{response_schema}

## Include
- Input validation
- Error handling with proper status codes
- Telemetry/logging
- Tests

Follow the patterns in {reference_file}.
```

## Example

```
Generate a REST API endpoint.

## Context
Framework: Express with TypeScript
Database: PostgreSQL with Prisma
Auth: JWT in httpOnly cookies

## Endpoint
Method: POST
Path: /api/wishlist/add
Purpose: Add a card to user's wishlist

## Request
{
  cardId: string (required, valid UUID)
}

## Response
Success (201):
{
  success: true,
  data: {
    id: string,
    cardId: string,
    addedAt: string
  }
}

Error (400/401/409):
{
  success: false,
  error: string
}

## Include
- Input validation
- Error handling with proper status codes
- Telemetry/logging
- Tests

Follow the patterns in src/routes/collections.ts.
```

## Variations
- For public endpoints: remove auth context
- For file uploads: add multipart handling requirements
- For paginated responses: add cursor/pagination format
