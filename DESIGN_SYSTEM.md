# ReviewMine Design System

**Version:** 1.0  
**Last Updated:** January 2026

---

## Design Philosophy

ReviewMine's design follows principles of **restraint, confidence, and clarity**. Inspired by the Jony Ive approach: let typography and content do the heavy lifting, avoid decoration for decoration's sake, and trust that good content paired with thoughtful design creates more impact than visual gimmicks.

> "When someone looks at this, they shouldn't think 'that's a nice logo'. They should think 'of course. What else could it be?'"

---

## Key Principles

1. **Reduce to essence** — Not a nugget that looks like a nugget — the idea of faceted value expressed in pure geometric form.

2. **One typeface, used with conviction** — Inter throughout. Weight and size create hierarchy. You don't need two typefaces.

3. **Restraint for structure, colour for data** — Navigation, buttons, cards stay monochrome. Tags, scores, and highlights use colour functionally — to aid comprehension, not for decoration.

4. **Let weight do the work** — The wordmark uses weight contrast (400 vs 600), not colour contrast. More confident, more timeless.

5. **Trust the content** — A white background is honest. Warmth comes from the content, the typography, the meaning — not from a tinted background.

6. **Seek inevitability** — Every choice should feel like the only possible choice. If it feels like a 'design decision', it's probably wrong.

---

## Logo

### Icon — "The Lift"

Three geometric planes suggesting extraction — something rising from a mass. The form embodies "mining value" without being literal. The negative space between the lower planes subtly forms an "M".

**Opacity values:**
- Left face (darkest): `0.85`
- Top face (lifting): `0.70`
- Right face: `0.60`

**SVG Code:**
```svg
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 17L16 21L16 27L7 22L7 17Z" fill="currentColor" opacity="0.85"/>
  <path d="M25 17L16 21L16 27L25 22L25 17Z" fill="currentColor" opacity="0.6"/>
  <path d="M9 12L16 5L23 12L16 14L9 12Z" fill="currentColor" opacity="0.7"/>
</svg>
```

### Wordmark

Single colour, weight contrast only.

- **Font:** Inter
- **"Review":** `font-normal` (400)
- **"Mine":** `font-semibold` (600)
- **Letter spacing:** `tracking-tight` (-0.02em)
- **Colour:** `currentColor` (inherits from parent)

### Logo Lockup

- **Icon size:** `w-6 h-6` (24px)
- **Gap:** `gap-2.5` (10px)
- **Text size:** `text-base` (16px)
- **Container class:** `text-gray-800 dark:text-gray-100`

```html
<a href="/" class="flex items-center gap-2.5 text-gray-800 dark:text-gray-100">
  <!-- icon SVG with class="w-6 h-6" -->
  <span class="text-base tracking-tight">
    <span class="font-normal">Review</span><span class="font-semibold">Mine</span>
  </span>
</a>
```

---

## Typography

**Font:** Inter (Google Fonts)

| Element | Classes | Weight |
|---------|---------|--------|
| Hero headline | `text-4xl md:text-5xl font-light tracking-tight` | 300 |
| Section headline | `text-2xl font-light tracking-tight` | 300 |
| Card title | `text-lg font-medium` | 500 |
| Body text | `text-base font-normal leading-relaxed` | 400 |
| UI label | `text-sm font-medium` | 500 |
| Meta/helper text | `text-xs text-gray-400` | 400 |

---

## Colours — Light Mode

### Backgrounds
| Name | Hex | Tailwind |
|------|-----|----------|
| Primary | `#FFFFFF` | `bg-white` |
| Secondary | `#F9FAFB` | `bg-gray-50` |
| Tertiary | `#F3F4F6` | `bg-gray-100` |

### Text
| Name | Hex | Tailwind |
|------|-----|----------|
| Primary | `#111827` | `text-gray-900` |
| Secondary | `#4B5563` | `text-gray-600` |
| Tertiary | `#9CA3AF` | `text-gray-400` |

### Borders
| Name | Hex | Tailwind |
|------|-----|----------|
| Primary | `#E5E7EB` | `border-gray-200` |
| Light | `#F3F4F6` | `border-gray-100` |

### Status Indicators
| Status | Dot | Text |
|--------|-----|------|
| Strong | `bg-teal-500` | `text-teal-700` |
| Partial | `bg-amber-400` | `text-amber-600` |
| Weak | `bg-rose-400` | `text-rose-600` |

### UI Accent
- **Teal** `#0F766E` (`bg-teal-700`) — For buttons, links, interactive elements
- Not used in the logo

---

## Colours — Dark Mode

### Backgrounds
| Name | Hex | Tailwind |
|------|-----|----------|
| Primary | `#111827` | `dark:bg-gray-900` |
| Secondary (cards) | `#1F2937` | `dark:bg-gray-800` |
| Tertiary | `#374151` | `dark:bg-gray-700` |

### Text
| Name | Hex | Tailwind |
|------|-----|----------|
| Primary | `#F3F4F6` | `dark:text-gray-100` |
| Secondary | `#9CA3AF` | `dark:text-gray-400` |
| Tertiary | `#6B7280` | `dark:text-gray-500` |

### Borders
| Name | Hex | Tailwind |
|------|-----|----------|
| Primary | `#374151` | `dark:border-gray-700` |
| Light | `#1F2937` | `dark:border-gray-800` |

### Status Indicators (Dark Mode)
| Status | Dot | Text |
|--------|-----|------|
| Strong | `bg-teal-500` | `dark:text-teal-400` |
| Partial | `bg-amber-400` | `dark:text-amber-400` |
| Weak | `bg-rose-400` | `dark:text-rose-400` |

---

## Functional Colours — Data & Tags

While the core UI uses restraint, data visualisation and content tagging uses colour **functionally** — to aid scanning and comprehension.

### Tag Categories

| Category | Example | Colours |
|----------|---------|---------|
| Guide related | `guide named`, `guide praise` | `bg-teal-50 text-teal-700 border-teal-200` |
| Objection coverage | `addresses safety` | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| Content quality | `highly quotable` | `bg-blue-50 text-blue-700 border-blue-200` |
| Story/emotion | `transformation` | `bg-purple-50 text-purple-700 border-purple-200` |
| Sentiment markers | `emotional` | `bg-pink-50 text-pink-700 border-pink-200` |
| Operational topics | `addresses weather` | `bg-amber-50 text-amber-700 border-amber-200` |
| Neutral | `family` | `bg-gray-100 text-gray-600` |

**Tag HTML pattern:**
```html
<span class="text-xs px-2 py-1 rounded border bg-[color]-50 text-[color]-700 border-[color]-200">
  tag name
</span>
```

### Quality Score Badges

| Range | Colour |
|-------|--------|
| 80-100 | `bg-teal-500 text-white` |
| 50-79 | `bg-amber-500 text-white` |
| 0-49 | `bg-gray-400 text-white` |

```html
<span class="bg-teal-500 text-white text-xs font-medium w-10 h-10 rounded-full flex items-center justify-center">
  100
</span>
```

### Quotable Highlights

```html
<div class="bg-teal-50 border-l-2 border-teal-400 px-4 py-2 text-sm text-gray-700 italic">
  "Quote text here"
</div>
```

### AI Summary Block

```html
<div class="border border-violet-200 bg-violet-50 rounded-lg px-4 py-3">
  <p class="text-xs font-medium text-violet-600 mb-1">✦ AI Summary</p>
  <p class="text-sm text-gray-700">Summary content here.</p>
</div>
```

**Dark mode:** `dark:border-violet-700 dark:bg-violet-900/30 dark:text-violet-400`

### Sentiment Labels

| Sentiment | Light Mode | Dark Mode |
|-----------|------------|-----------|
| Positive | `text-emerald-600` | `dark:text-emerald-400` |
| Negative | `text-rose-500` | `dark:text-rose-400` |

### Active Filter Pills

```html
<span class="inline-flex items-center gap-1 bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded">
  Tag: highly_quotable
  <button class="hover:text-teal-900">×</button>
</span>
```

---

## Components

### Buttons

**Primary:**
```html
<button class="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
  Button text
</button>
```

**Secondary:**
```html
<button class="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
  Button text
</button>
```

**Text link:**
```html
<button class="text-gray-500 hover:text-gray-900 text-sm font-medium dark:text-gray-400 dark:hover:text-gray-100">
  Link text →
</button>
```

### Cards

```html
<div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
  Card content
</div>
```

### Form Inputs

```html
<input 
  type="text"
  class="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-100/10"
  placeholder="Placeholder text"
/>
```

### Navigation

```html
<nav class="bg-white border-b border-gray-100 px-6 py-4 dark:bg-gray-900 dark:border-gray-800">
  <div class="flex items-center justify-between">
    <!-- Logo on left -->
    <!-- Theme toggle + user info on right -->
  </div>
</nav>
```

### Tab Navigation

```html
<div class="border-b border-gray-100 dark:border-gray-800">
  <div class="flex gap-8">
    <!-- Active tab -->
    <button class="pb-3 text-sm font-medium text-gray-900 border-b-2 border-gray-900 dark:text-gray-100 dark:border-gray-100">
      Active
    </button>
    <!-- Inactive tab -->
    <button class="pb-3 text-sm font-medium text-gray-400 border-b-2 border-transparent hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
      Inactive
    </button>
  </div>
</div>
```

---

## Theme Toggle

Located in navigation, before user email. Defaults to system preference, user can override. Preference stored in localStorage.

**Detection script (in `<head>`):**
```html
<script>
  (function() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

**Toggle button:**
- Light mode: Show moon icon (click to go dark)
- Dark mode: Show sun icon (click to go light)

**Toggle script:**
```javascript
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
```

---

## Spacing

| Element | Value |
|---------|-------|
| Page padding (horizontal) | `px-6` (24px) |
| Section padding (vertical) | `py-8` to `py-16` |
| Card padding | `p-6` (24px) |
| Grid gaps | `gap-6` (24px) |
| Max content width | `max-w-6xl` (72rem) |

**Principle:** Generous whitespace is intentional. Let content breathe. When in doubt, add more space.

---

## Tailwind Config

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

---

## File Checklist

When implementing or auditing, ensure these patterns are applied to:

- [ ] Base template / layout
- [ ] Navigation (header)
- [ ] Footer
- [ ] Landing page
- [ ] Dashboard (all tabs: Report, Reviews, Guides, Trends)
- [ ] Review cards
- [ ] Loading state
- [ ] Report view
- [ ] Forms and inputs
- [ ] Modals and dropdowns
- [ ] Charts (Chart.js colours)
