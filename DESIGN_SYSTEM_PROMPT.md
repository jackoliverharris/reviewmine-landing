# ReviewMine Design System — Claude Code Reference

Use this as a reference when making UI changes. For full documentation, see `/docs/DESIGN_SYSTEM.md`.

---

## Logo

**Icon SVG (use `currentColor` for theme support):**
```svg
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 17L16 21L16 27L7 22L7 17Z" fill="currentColor" opacity="0.85"/>
  <path d="M25 17L16 21L16 27L25 22L25 17Z" fill="currentColor" opacity="0.6"/>
  <path d="M9 12L16 5L23 12L16 14L9 12Z" fill="currentColor" opacity="0.7"/>
</svg>
```

**Lockup:** `flex items-center gap-2.5 text-gray-800 dark:text-gray-100`
- Icon: `w-6 h-6`
- "Review": `font-normal`
- "Mine": `font-semibold`
- Text: `text-base tracking-tight`

---

## Typography

- **Font:** Inter only
- **Hero:** `text-4xl md:text-5xl font-light tracking-tight`
- **Section heading:** `text-2xl font-light tracking-tight`
- **Card title:** `text-lg font-medium`
- **Body:** `text-base font-normal leading-relaxed`
- **UI label:** `text-sm font-medium`
- **Meta:** `text-xs text-gray-400`

---

## Colours

### Light Mode
- **Backgrounds:** `bg-white` | `bg-gray-50` | `bg-gray-100`
- **Text:** `text-gray-900` | `text-gray-600` | `text-gray-400`
- **Borders:** `border-gray-200` | `border-gray-100`

### Dark Mode
- **Backgrounds:** `dark:bg-gray-900` | `dark:bg-gray-800` | `dark:bg-gray-700`
- **Text:** `dark:text-gray-100` | `dark:text-gray-400` | `dark:text-gray-500`
- **Borders:** `dark:border-gray-700` | `dark:border-gray-800`

---

## Status Indicators

| Status | Dot | Text (Light) | Text (Dark) |
|--------|-----|--------------|-------------|
| Strong | `bg-teal-500` | `text-teal-700` | `dark:text-teal-400` |
| Partial | `bg-amber-400` | `text-amber-600` | `dark:text-amber-400` |
| Weak | `bg-rose-400` | `text-rose-600` | `dark:text-rose-400` |

---

## Functional Tags (Keep Colourful)

| Category | Classes |
|----------|---------|
| Guide related | `bg-teal-50 text-teal-700 border-teal-200` |
| Objection coverage | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| Content quality | `bg-blue-50 text-blue-700 border-blue-200` |
| Story/emotion | `bg-purple-50 text-purple-700 border-purple-200` |
| Sentiment | `bg-pink-50 text-pink-700 border-pink-200` |
| Operational | `bg-amber-50 text-amber-700 border-amber-200` |
| Neutral | `bg-gray-100 text-gray-600` |

---

## Score Badges

- **80-100:** `bg-teal-500 text-white`
- **50-79:** `bg-amber-500 text-white`
- **0-49:** `bg-gray-400 text-white`

---

## Special Blocks

**Quotable highlight:**
```html
<div class="bg-teal-50 border-l-2 border-teal-400 px-4 py-2 text-sm text-gray-700 italic">
```

**AI Summary:**
```html
<div class="border border-violet-200 bg-violet-50 rounded-lg px-4 py-3">
  <p class="text-xs font-medium text-violet-600 mb-1">✦ AI Summary</p>
```

**Sentiment:** Positive = `text-emerald-600` | Negative = `text-rose-500`

---

## Components

**Primary button:**
```
bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium
dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200
```

**Secondary button:**
```
border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium
dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300
```

**Card:**
```
bg-white border border-gray-200 rounded-xl p-6 shadow-sm
dark:bg-gray-800 dark:border-gray-700
```

**Input:**
```
bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300
dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100
```

**Nav:**
```
bg-white border-b border-gray-100 px-6 py-4
dark:bg-gray-900 dark:border-gray-800
```

**Active tab:**
```
text-gray-900 border-b-2 border-gray-900
dark:text-gray-100 dark:border-gray-100
```

**Inactive tab:**
```
text-gray-400 border-b-2 border-transparent
dark:text-gray-500
```

---

## Theme Toggle

**Head script (prevents flash):**
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

**Toggle:** Moon icon in light mode, sun icon in dark mode. Store preference in `localStorage.setItem('theme', 'light' | 'dark')`.

---

## Spacing Defaults

- Page padding: `px-6`
- Section padding: `py-8` to `py-16`
- Card padding: `p-6`
- Grid gaps: `gap-6`
- Max width: `max-w-6xl`

---

## Tailwind Config

```js
darkMode: 'class'
fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
```
