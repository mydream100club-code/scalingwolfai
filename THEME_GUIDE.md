# Theme System Guide

This project includes a comprehensive theme system with both light and dark modes. The themes are built using Tailwind CSS with custom CSS variables for maximum flexibility.

## Overview

The theme system includes:
- **Light Theme**: Clean, bright design with high contrast
- **Dark Theme**: Modern dark design optimized for low-light viewing
- Comprehensive color palette with semantic naming
- Pre-built component classes for rapid development
- Smooth transitions and animations
- Accessibility-focused design

## Color System

### Color Palettes

Each color has 11 shades (50-950) for fine-grained control:

- **Primary** (Sky Blue): Main brand color for primary actions
- **Secondary** (Fuchsia): Supporting brand color for secondary elements
- **Accent** (Orange): Highlight color for special emphasis
- **Success** (Green): Positive actions and success states
- **Warning** (Amber): Warnings and cautionary messages
- **Danger** (Red): Errors and destructive actions
- **Neutral** (Gray): Text, backgrounds, and borders

### Using Colors

```tsx
// Tailwind utility classes
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Click me
</button>

// CSS variables (auto-adjusts for dark mode)
<div style={{ color: 'rgb(var(--color-primary))' }}>
  Adaptive color
</div>
```

## Component Classes

### Cards

```tsx
// Basic card
<div className="card p-6">
  Content
</div>

// Elevated card with shadow
<div className="card-elevated p-6">
  Content
</div>

// Glass morphism card
<div className="glass-card p-6">
  Content
</div>
```

### Buttons

```tsx
// Primary button (blue)
<button className="btn-primary">Primary</button>

// Secondary button (purple)
<button className="btn-secondary">Secondary</button>

// Accent button (orange)
<button className="btn-accent">Accent</button>

// Success, Warning, Danger
<button className="btn-success">Success</button>
<button className="btn-warning">Warning</button>
<button className="btn-danger">Danger</button>

// Outline button
<button className="btn-outline">Outline</button>

// Ghost button (transparent)
<button className="btn-ghost">Ghost</button>
```

### Inputs

```tsx
// Standard input
<input type="text" className="input" placeholder="Enter text" />

// Error state
<input type="text" className="input-error" />

// Success state
<input type="text" className="input-success" />
```

### Badges

```tsx
<span className="badge-primary">Primary</span>
<span className="badge-secondary">Secondary</span>
<span className="badge-success">Success</span>
<span className="badge-warning">Warning</span>
<span className="badge-danger">Danger</span>
<span className="badge-neutral">Neutral</span>
```

### Progress Bars

```tsx
<div className="progress-bar progress-bar-primary">
  <div className="progress-bar-fill" style={{ width: '75%' }} />
</div>

<div className="progress-bar progress-bar-success">
  <div className="progress-bar-fill" style={{ width: '100%' }} />
</div>
```

### Alerts

```tsx
<div className="alert-info">
  <p>Informational message</p>
</div>

<div className="alert-success">
  <p>Success message</p>
</div>

<div className="alert-warning">
  <p>Warning message</p>
</div>

<div className="alert-danger">
  <p>Error message</p>
</div>
```

### Loading Spinners

```tsx
<div className="spinner-sm text-primary-500" />
<div className="spinner-md text-primary-500" />
<div className="spinner-lg text-primary-500" />
```

## Typography

The theme uses three font families:

- **Sans**: Inter - Body text and UI elements
- **Display**: Space Grotesk - Headings and titles
- **Mono**: Fira Code - Code blocks

```tsx
<h1 className="font-display text-5xl font-bold">Heading</h1>
<p className="font-sans text-base">Body text</p>
<code className="font-mono text-sm">Code</code>
```

## Gradients

```tsx
// Gradient text
<h2 className="gradient-text gradient-primary text-4xl">
  Gradient Heading
</h2>

// Available gradients:
// - gradient-primary (blue)
// - gradient-secondary (purple)
// - gradient-accent (orange)
// - gradient-rainbow (multi-color)
```

## Utility Classes

### Hover Effects

```tsx
// Lift on hover
<div className="hover-lift">Lifts up</div>

// Scale on hover
<div className="hover-scale">Scales up</div>

// Glow on hover
<div className="hover-glow">Glows</div>
```

### Animations

```tsx
<div className="animate-fade-in">Fades in</div>
<div className="animate-slide-up">Slides up</div>
<div className="animate-slide-down">Slides down</div>
<div className="animate-scale-in">Scales in</div>
<div className="animate-float">Floats</div>
<div className="shimmer">Shimmer effect</div>
```

### Text Colors

```tsx
<p className="text-primary">Primary text color</p>
<p className="text-secondary">Secondary text color</p>
<p className="text-tertiary">Tertiary text color</p>
```

### Backgrounds

```tsx
<div className="bg-primary">Primary background</div>
<div className="bg-secondary">Secondary background</div>
<div className="bg-tertiary">Tertiary background</div>
```

### Borders

```tsx
<div className="border border-default">Default border</div>
<div className="border border-hover">Hover border</div>
```

## Dark Mode

The theme automatically adapts to dark mode using the `dark:` prefix or CSS variables.

### Manual Toggle

```tsx
import { useTheme } from './contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### Using CSS Variables

CSS variables automatically adjust between light and dark modes:

```css
.custom-element {
  color: rgb(var(--color-text-primary));
  background-color: rgb(var(--color-bg-primary));
  border-color: rgb(var(--color-border));
}
```

## Best Practices

1. **Use Semantic Colors**: Use `primary`, `success`, `danger` instead of raw colors
2. **Leverage CSS Variables**: For dynamic theming that adapts to light/dark modes
3. **Test Both Themes**: Always verify your UI in both light and dark modes
4. **Use Component Classes**: Prefer pre-built classes for consistency
5. **Maintain Contrast**: Ensure text is readable against backgrounds
6. **Add Hover States**: Provide visual feedback for interactive elements
7. **Use Transitions**: Add smooth transitions for better UX

## Customization

### Changing Theme Colors

Edit `tailwind.config.js` to modify color palettes:

```js
colors: {
  primary: {
    500: '#YOUR_COLOR', // Adjust shade values
  }
}
```

### Adding Custom CSS Variables

Edit `src/index.css` in the `:root` and `.dark` sections:

```css
:root {
  --custom-color: 100 150 200; /* RGB values */
}

.dark {
  --custom-color: 200 150 100; /* Different for dark mode */
}
```

### Creating Custom Components

Add to the `@layer components` section in `src/index.css`:

```css
@layer components {
  .btn-custom {
    @apply btn bg-custom-500 text-white hover:bg-custom-600;
  }
}
```

## Accessibility

The theme system includes:
- Proper focus states with visible outlines
- Sufficient color contrast ratios
- Keyboard navigation support
- Screen reader friendly markup
- ARIA attributes where needed

## Performance

- CSS variables reduce bundle size
- Tailwind purges unused styles
- Optimized animations using GPU acceleration
- Minimal runtime JavaScript for theming
