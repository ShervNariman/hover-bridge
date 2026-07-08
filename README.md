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

### shadcn registry (recommended)

Install directly from GitHub with the `shadcn` CLI — no build step or npm package required:

```bash
pnpm dlx shadcn@latest add ShervNariman/hover-bridge/hover-bridge
```

This copies `hover-bridge.css` into your project at `styles/hover-bridge.css`. Import it once in your global stylesheet:

```css
@import "./styles/hover-bridge.css";
```

### npm package

**Coming soon** — not published yet.

```bash
pnpm add hover-bridge
```

### Manual copy

Until the npm package is published, you can also copy the file by hand.

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

This repo is a public [shadcn registry](https://ui.shadcn.com/docs/registry) — `registry.json` lives at the project root, so the CLI can install it straight from GitHub with no build step (see [Installation](#installation) above).

### Testing the registry locally

To test the registry the same way a local/URL install would work, build the static registry JSON and serve it with the dev server:

```bash
pnpm dlx shadcn@latest build
pnpm dev
```

Then, from another project:

```bash
pnpm dlx shadcn@latest add http://localhost:3000/r/hover-bridge.json
```

`shadcn build` writes the generated item JSON to `public/r/hover-bridge.json` (gitignored — it's regenerated automatically before every `pnpm build` via the `prebuild` script). You can also run it manually with `pnpm registry:build`.

Validate the registry schema at any time with:

```bash
pnpm dlx shadcn@latest registry validate ./registry.json
```
