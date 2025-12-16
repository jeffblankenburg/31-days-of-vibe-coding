# Component Generation

## When to Use
When creating a new UI component.

## Template

```
Generate a {framework} component.

## Component
Name: {name}
Purpose: {purpose}

## Props
{props_list}

## Behavior
{behavior_description}

## State
{state_requirements}

## Styling
{styling_approach}

## Include
- TypeScript types
- Loading and error states
- Accessibility (ARIA labels, keyboard navigation)
- Tests

Follow the patterns in {reference_component}.
```

## Example

```
Generate a React component.

## Component
Name: WishlistButton
Purpose: Toggle a card's wishlist status

## Props
- cardId: string (required)
- initialWishlisted: boolean (default false)
- onToggle?: (wishlisted: boolean) => void

## Behavior
- Shows filled heart if wishlisted, outline if not
- Clicking toggles wishlist status via API
- Shows loading spinner during API call
- Shows error toast if API fails
- Optimistically updates UI, reverts on error

## State
- isWishlisted: boolean
- isLoading: boolean

## Styling
Use Tailwind classes, match existing button styles

## Include
- TypeScript types
- Loading and error states
- Accessibility (ARIA labels, keyboard navigation)
- Tests

Follow the patterns in src/components/FavoriteButton.tsx.
```

## Variations
- For form components: add validation requirements
- For data display: add empty state handling
- For complex components: break into subcomponents
