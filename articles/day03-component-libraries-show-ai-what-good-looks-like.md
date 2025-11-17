# Day 3: Component Libraries & Style Guides: Show AI What Good Looks Like

I asked Claude to build a user settings page.

It gave me this:

```jsx
<div style={{padding: '20px'}}>
  <h1>Settings</h1>
  <form>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
    <button type="submit">Save</button>
  </form>
</div>
```

Technically correct. Functionally useless. This looks nothing like my application. The colors are wrong. The spacing is wrong. The form inputs are plain HTML instead of my custom form components. The button is a basic browser button instead of my primary action button.

This is every developer's experience asking AI to build UI. You get something that works in isolation but looks like it came from a different application.

Here's what I learned. AI doesn't know what your design system looks like unless you show it.

## The Problem: AI Generates Generic UI

AI is trained on thousands of public code repositories. When you ask for a form, it gives you what most forms look like across the internet. Generic HTML. Basic styling. Standard patterns.

That's not what you need. You need UI that matches your application. Your colors. Your spacing. Your component library. Your design system.

The first time I shipped AI-generated UI to production, I spent more time fixing the styling than I would have spent building it myself. Every component needed rework. Colors adjusted. Spacing fixed. Custom components swapped in for generic HTML.

I was using AI to write code, then immediately rewriting the code AI wrote. That's not productivity. That's just extra steps.

## The Solution: Build a Component Library AI Can Reference

Here's the fix. Create a reference component library that shows AI exactly what good looks like in your application.

Not documentation. Not a design system PDF. Actual code that AI can read and replicate.

I created a single file called `components/reference.tsx`. It's not part of my application. It doesn't ship to production. It's purely for AI to reference.

Here's what's in it:

```typescript
/**
 * REFERENCE COMPONENTS FOR AI
 *
 * This file shows AI our design system and component patterns.
 * When building new UI, reference these components and patterns.
 *
 * DO NOT import from this file in production code.
 * This is a reference guide only.
 */

// COLORS
export const colors = {
  primary: '#2563eb',      // Blue for primary actions
  secondary: '#64748b',    // Slate for secondary actions
  success: '#10b981',      // Green for success states
  danger: '#ef4444',       // Red for destructive actions
  background: '#f8fafc',   // Light gray background
  surface: '#ffffff',      // White cards and surfaces
  text: '#0f172a',         // Near-black for text
  textMuted: '#64748b'     // Gray for secondary text
};

// SPACING
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
};

// BUTTON COMPONENT
// Use this pattern for all buttons
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-medium transition-colors';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

// FORM INPUT COMPONENT
// Use this pattern for all form inputs
export function Input({
  label,
  error,
  helperText,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        className={`
          px-4 py-2 rounded-lg border
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 focus:ring-blue-500'
          }
          focus:outline-none focus:ring-2
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-600">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-slate-500">{helperText}</span>
      )}
    </div>
  );
}

// CARD COMPONENT
// Use this for all card-style containers
export function Card({
  title,
  children,
  footer
}: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          {title}
        </h3>
      )}
      <div className="text-slate-700">
        {children}
      </div>
      {footer && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          {footer}
        </div>
      )}
    </div>
  );
}

// LAYOUT PATTERNS
// Use these spacing and layout patterns

// Page container
export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  );
}

// Two-column layout
export function TwoColumnLayout({
  sidebar,
  main
}: TwoColumnLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        {sidebar}
      </aside>
      <main className="lg:col-span-9">
        {main}
      </main>
    </div>
  );
}

// Form layout
export function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <form className="space-y-6 max-w-2xl">
      {children}
    </form>
  );
}
```

Now when I ask AI to build UI, I tell it: "Reference `components/reference.tsx` and use those patterns."

The settings page becomes this:

```jsx
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormLayout } from '@/components/ui/layout';

export function SettingsPage() {
  return (
    <PageContainer>
      <Card title="Account Settings">
        <FormLayout>
          <Input
            label="Email"
            type="email"
            name="email"
            helperText="We'll never share your email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            helperText="Minimum 8 characters"
          />

          <div className="flex gap-3">
            <Button variant="primary">
              Save Changes
            </Button>
            <Button variant="secondary">
              Cancel
            </Button>
          </div>
        </FormLayout>
      </Card>
    </PageContainer>
  );
}
```

This looks like my application. Same colors. Same spacing. Same components. Same patterns.

I didn't spend 20 minutes fixing styling. I spent zero minutes. AI got it right the first time because I showed it what right looks like.

## What to Include in Your Reference Library

Your reference library should include:

### 1. Design Tokens

These are your colors, spacing, typography, shadows, and other design primitives. Don't just list them. Show how to use them.

```typescript
// BAD: Just a list
export const colors = {
  primary: '#2563eb',
  secondary: '#64748b'
};

// GOOD: Shows usage context
export const colors = {
  primary: '#2563eb',      // Use for primary CTAs and important actions
  secondary: '#64748b',    // Use for less important actions
  success: '#10b981',      // Use for success messages and confirmations
  danger: '#ef4444',       // Use for errors and destructive actions
  warning: '#f59e0b',      // Use for warnings and caution states

  // Text colors
  text: '#0f172a',         // Primary text
  textMuted: '#64748b',    // Secondary text, labels
  textDisabled: '#cbd5e1'  // Disabled state text
};
```

### 2. Common Components

Show AI your button, input, card, modal, dropdown, and other reusable components. Include all the variants.

```typescript
// Show all button variants so AI knows what's available
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Subtle Action</Button>

// Show all sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Show states
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### 3. Layout Patterns

Show how to structure pages. Where does navigation go? How do you center content? What's the maximum width?

```typescript
// Standard page layout
export function StandardPage() {
  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Page Title</h1>
        <p className="text-slate-600 mt-2">Page description</p>
      </header>

      <main>
        {/* Page content */}
      </main>
    </PageContainer>
  );
}
```

### 4. Common Patterns

Show patterns for forms, lists, tables, empty states, loading states, error states.

```typescript
// Form with validation pattern
export function FormExample() {
  const [errors, setErrors] = useState({});

  return (
    <FormLayout>
      <Input
        label="Email"
        error={errors.email}
        required
      />

      {/* Form actions always at bottom */}
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" type="submit">Save</Button>
      </div>
    </FormLayout>
  );
}

// Empty state pattern
export function EmptyState({
  icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-slate-400 mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>
      {action}
    </div>
  );
}
```

## How to Use the Reference Library

When you ask AI to build UI, include this in your prompt:

```
Build a user profile page with the following features:
- Display user avatar, name, and email
- Form to update profile information
- Button to save changes

Reference components/reference.tsx for our design system.
Use existing components (Card, Input, Button, PageContainer).
Match our spacing, colors, and layout patterns.
```

AI reads your reference file. Sees your components. Understands your patterns. Generates UI that matches.

## The Prompt Templates That Work

### Template 1: Building with Existing Components

```
Build [feature] using our existing components.

Reference: components/reference.tsx

Requirements:
- Use [component names] from our library
- Follow our spacing patterns (use spacing.md, spacing.lg, etc)
- Use our color tokens (colors.primary, colors.text, etc)
- Match the layout pattern shown in [example component]

Do not create new components. Use what we have.
```

### Template 2: Creating a New Component That Matches

Sometimes you need a component that doesn't exist yet. AI should create it in the same style.

```
Create a new [component name] component.

Reference: components/reference.tsx

The component should:
- Match our existing component patterns (Button, Input, etc)
- Use our design tokens (colors, spacing, typography)
- Follow our naming conventions
- Include the same props patterns (variant, size, etc)
- Have the same state handling (hover, focus, disabled)

Show me the component code first before using it.
```

### Template 3: Auditing UI Against the Component Library

You have existing UI that doesn't match your design system. Ask AI to audit it.

```
Review this component and identify where it doesn't match our design system.

Reference: components/reference.tsx

Check for:
- Hard-coded colors instead of design tokens
- Custom spacing instead of our spacing scale
- Inline styles instead of our components
- Inconsistent patterns compared to our reference

List all issues and suggest how to fix them using our existing components.
```

## Real Example: Building a Dashboard

I needed a dashboard with stats cards, a chart, and a recent activity list. Here's what I asked:

```
Build a dashboard page with:
1. Four stat cards showing metrics (users, revenue, conversion, growth)
2. A line chart for the last 30 days
3. Recent activity list showing last 10 actions

Reference components/reference.tsx.
Use our Card component for stats and sections.
Use our PageContainer for layout.
Follow the grid pattern shown in reference for stat cards.
Use colors.success for positive metrics, colors.danger for negative.
```

AI generated this:

```jsx
import { PageContainer } from '@/components/ui/layout';
import { Card } from '@/components/ui/card';

export function Dashboard() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-sm text-slate-600 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-slate-900">12,543</div>
          <div className="text-sm text-green-600 mt-2">↑ 12% from last month</div>
        </Card>

        <Card>
          <div className="text-sm text-slate-600 mb-1">Revenue</div>
          <div className="text-3xl font-bold text-slate-900">$48,293</div>
          <div className="text-sm text-green-600 mt-2">↑ 8% from last month</div>
        </Card>

        <Card>
          <div className="text-sm text-slate-600 mb-1">Conversion Rate</div>
          <div className="text-3xl font-bold text-slate-900">3.24%</div>
          <div className="text-sm text-red-600 mt-2">↓ 2% from last month</div>
        </Card>

        <Card>
          <div className="text-sm text-slate-600 mb-1">Growth Rate</div>
          <div className="text-3xl font-bold text-slate-900">24%</div>
          <div className="text-sm text-green-600 mt-2">↑ 4% from last month</div>
        </Card>
      </div>

      {/* Chart section */}
      <Card title="Revenue Trend" className="mb-8">
        <div className="h-80">
          {/* Chart component here */}
        </div>
      </Card>

      {/* Recent activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="text-sm text-slate-900">{activity.description}</div>
              <div className="text-sm text-slate-500 ml-auto">{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
```

Perfect. Same card style as the rest of my app. Same spacing. Same typography. Same color usage for positive and negative metrics. Same layout pattern.

Zero time spent fixing styling.

## When AI Creates Something New

Sometimes AI needs to create a component that doesn't exist in your reference library. That's fine. Just tell it to match the pattern.

I asked AI to build a toast notification system. I don't have toast notifications in my reference library.

My prompt:

```
Create a toast notification component.

Reference components/reference.tsx for our design system.

Match these patterns:
- Use our color tokens for success/error/warning variants
- Use our spacing tokens for padding and gaps
- Use our border radius (rounded-lg)
- Use our shadow styles (shadow-sm)
- Follow our component prop patterns (variant, size, etc)

Create the component in the same style as our Button and Card components.
```

AI created a toast component that looks native to my application. Same colors. Same spacing. Same styling patterns. It fits perfectly because AI understood the pattern.

## Maintaining the Reference Library

Your reference library isn't static. When you add new components or patterns, add them to the reference file.

I update mine every time:
- I create a new reusable component
- I establish a new pattern
- I change design tokens
- I find AI consistently getting something wrong

The reference library grows with your application. It's living documentation that AI actually uses.

## Why This Works Better Than Documentation

I tried writing design system documentation for AI. A markdown file explaining our colors, spacing, component usage.

AI ignored it.

Not intentionally. It's just that documentation describes things. Code shows things. AI is better at reading code than reading prose.

When I switched to a reference component file with actual code, AI started generating consistent UI immediately. It could see exactly what components look like. Copy the patterns. Match the style.

Code is the documentation.

## What About Design Tools?

If you use Figma or similar tools, you might have a design system there. That's great for designers. It doesn't help AI.

AI can't read Figma files. It reads code.

Your reference component library is your design system translated into the format AI understands. It's the bridge between your design system and AI-generated code.

## The Difference This Makes

Before I had a reference library, every AI-generated UI component needed rework. Buttons were wrong. Colors were off. Spacing was inconsistent. Forms didn't match.

I was spending 30-40% of my time fixing styling on AI-generated code.

After creating the reference library, AI gets it right the first time. Maybe 5% of components need minor tweaks. Usually because I didn't specify something clearly enough.

That's a 6x improvement in time saved.

More importantly, my application looks consistent. Every page, every component, every interaction follows the same patterns. Because AI is following the same reference I gave it.

## Try This Today

Create a reference component file for your project. Start simple:

1. Create `components/reference.tsx` (or whatever fits your tech stack)
2. Add your color tokens with usage comments
3. Add your 3-5 most common components (Button, Input, Card, etc)
4. Add one layout pattern
5. Add comments showing when to use each pattern

Then ask AI to build something simple using that reference. A form. A settings page. A card list.

Watch how much better the output matches your application.

Tomorrow I'll show you how to take that component library and use it to build features that not only look right, but that you can actually trust in production.

## Tomorrow

You have a component library that makes AI-generated UI look right. But looking right isn't enough. You need to know it works right.

Tomorrow I'll show you how to instrument AI-generated code with observability from the start. The logs, metrics, and traces that tell you whether your code is actually working in production. Because shipping fast is worthless if you don't know what you shipped is broken.

---

**Try This Today:**

1. Create a `reference.tsx` (or equivalent) file
2. Add your top 3 most-used components with examples
3. Add your color tokens and spacing scale
4. Ask AI to build a simple UI feature using that reference
5. Compare the output to what AI gave you before

Notice how much time you save not fixing styling.

---

**Next:** [Day 4: Observability First: Know When AI Code Breaks](#)

**Previous:** [Day 2: Plan Features, Not Functions](day02-plan-features-not-functions.md)
