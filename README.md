# hover-bridge

A tiny CSS utility for forgiving hover menus.

Dropdowns often close when your cursor crosses the small gap between a trigger and its menu. hover-bridge adds an invisible safe area with a `::before` pseudo-element so hover stays connected across the gap.

## Demo

Run the demo site locally:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to compare the before/after interaction.

## Installation

**npm package — coming soon**

```bash
pnpm add hover-bridge
```

Until the package is published, copy the CSS file into your project manually.

## Manual usage

1. Copy `registry/hover-bridge/hover-bridge.css` into your project.
2. Import it once in your global stylesheet:

```css
@import "./path/to/hover-bridge.css";
```

3. Wrap your trigger and menu in a positioned container. Match the size variant to the gap between them:

```html
<div class="hover-bridge hover-bridge-md">
  <button>Products</button>
  <!-- menu positioned below with a matching gap -->
</div>
```

In React:

```tsx
<div className="hover-bridge hover-bridge-md">
  {/* trigger + menu */}
</div>
```

## Debug

Add `hover-bridge-debug` during development to reveal the bridge as a striped overlay:

```tsx
<div className="hover-bridge hover-bridge-md hover-bridge-debug">
  {/* trigger + menu */}
</div>
```

Remove the debug class in production.

## Size variants

| Class | Gap |
| --- | --- |
| `hover-bridge-sm` | 8px |
| `hover-bridge-md` | 16px |
| `hover-bridge-lg` | 28px |

You can also set a custom gap with `--hover-bridge-size`.

## Limitations

- Works best when the trigger and menu share the same hover container.
- Not a replacement for keyboard-accessible menu behavior.
- Pair with accessible menu components in production.

## shadcn registry

This repo includes a `registry.json` for installing via the shadcn CLI once published.
