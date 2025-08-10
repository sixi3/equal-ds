## Component Library Spec (shadcn-based)

### Goal
Build a reusable React component library using shadcn (Radix + Tailwind) as the base. The library should be framework-agnostic for React (works in Next.js, Vite, CRA alternatives), tree-shakeable, accessible, themable, and easy to integrate. The first component to implement is a production-ready Sidebar.

### Principles
- **Accessibility first**: ARIA-correct, keyboard-friendly, screen-reader compliant.
- **Design tokens + theming**: CSS variables and a Tailwind preset; app-wide theme via class on `html` or `body`.
- **Composable primitives**: Small, testable parts with clear composition patterns.
- **Minimal runtime**: Prefer styling via Tailwind classes and CSS variables; avoid heavy JS.
- **Strict typing**: TypeScript everywhere, explicit public types.
- **DX**: Storybook, robust examples, and templates.

### Tech Stack
- **Language**: TypeScript (strict)
- **React**: React 18+ (peer)
- **Styling**: Tailwind CSS (peer) + CSS variables
- **Base UI**: shadcn/ui patterns and Radix primitives (peer)
- **Class utilities**: `class-variance-authority`, `tailwind-merge`
- **Icons**: `lucide-react` (peer)
- **Bundler**: `tsup` (ESM + CJS + DTS)
- **Docs**: Storybook 8
- **Testing**: Vitest + React Testing Library + Axe (a11y) + Playwright (visual/regression optional)
- **Release**: Changesets + GitHub Actions

### Target Environments
- **Runtime**: Browser + SSR; compatible with Next.js RSC. Only mark files with interactivity as `"use client"`.
- **Module formats**: `module` (ESM) and `main` (CJS). `types` for .d.ts.
- **Tree-shaking**: Side-effects-free by default; list CSS side effects explicitly if needed.

### Repository Layout
- Single-package for now; optional future monorepo with `apps/docs` and `packages/ui`.
- For single-package:
  - `src/` library source
  - `src/components/` components
  - `src/lib/` shared utils (e.g., `cn`, tokens)
  - `src/styles/` CSS variables and layers (e.g., `theme.css`)
  - `.storybook/` Storybook config
  - `stories/` component stories
  - `tests/` unit + a11y tests

### Package Boundaries
- Peer dependencies: `react`, `react-dom`, `tailwindcss`, `lucide-react`, `@radix-ui/react-*`
- Dependencies: `class-variance-authority`, `tailwind-merge`
- Dev dependencies: `tsup`, `typescript`, `storybook`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `axe-core`, `@types/*`

### Theming & Tokens
- Dark mode via `.dark` class on `html`.
- Export a Tailwind preset: `@equal-ds/tailwind-preset` (locally as `src/tailwind-preset.ts`, built to `dist`).
- Provide a base CSS file `theme.css` to declare CSS variables (colors, spacing, radius, shadows, z-index). Consumers import once.
- Token model:
  - Color scales: semantic tokens (bg, fg, muted, accent, destructive, ring)
  - Radius: `--radius` (base), `--radius-sm`, `--radius-md`, `--radius-lg`
  - Spacing: `--space-1..12`
  - Shadows: `--shadow-1..3`
  - Transitions: duration, easing

### Tailwind Integration
- Consumers must have Tailwind configured. Provide instructions to:
  - Install peers
  - Import `theme.css`
  - Extend consumer `tailwind.config.{js,ts}` with the library preset
  - Content scanning must include `node_modules/@equal-ds/**` (or this package’s name) so classes inside the library are included.

### Build & Distribution
- Build with `tsup`:
  - Formats: `esm`, `cjs`
  - Minify, sourcemap, dts
  - Externalize peers
- `package.json` exports map:
  - `"exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/index.mjs", "require": "./dist/index.cjs" }, "./theme.css": "./dist/theme.css", "./tailwind-preset": "./dist/tailwind-preset.cjs" }`
- `sideEffects`: include `"*.css"` only.

### Linting & Formatting
- ESLint (typescript, react, react-hooks, jsx-a11y), Prettier
- TS config strict; no `any` in public APIs

### CI/CD
- CI pipeline:
  - Install
  - Lint, typecheck, test (unit + a11y), build
  - Storybook build
- Release via Changesets: versioning, changelog, publish to npm

### Consumer Setup Guide (summary)
1) Install peers: `react`, `react-dom`, `tailwindcss`, `lucide-react`, `@radix-ui/react-*`
2) Install library: `@equal-ds/ui`
3) Import base CSS once (e.g., in `app/layout.tsx` or root):
   ```ts
   import '@equal-ds/ui/theme.css'
   ```
4) Extend Tailwind config:
   ```ts
   import equalPreset from '@equal-ds/ui/tailwind-preset'
   export default {
     presets: [equalPreset],
     content: [
       './src/**/*.{ts,tsx}',
       './node_modules/@equal-ds/ui/**/*.{js,mjs,cjs,ts,tsx}',
     ],
     darkMode: ['class'],
   }
   ```

### Utilities in Library
- `cn(...classes)` merges classes via `tailwind-merge`.
- `slot` helpers for compound components (context + forwardRef patterns).

---

## Component 01: Sidebar

### Purpose
A responsive, collapsible navigation sidebar supporting nested groups, icons, and badges. Desktop-focused with full width and rail (collapsed) modes; no mobile drawer. Fully accessible and keyboard-navigable.

### Composition API
- `SidebarProvider` (context state)
- `Sidebar` (container, structural nav)
- `SidebarHeader`
- `SidebarContent`
- `SidebarFooter`
- `SidebarGroup` (collapsible section)
- `SidebarGroupLabel`
- `SidebarGroupContent`
- `SidebarMenu`
- `SidebarMenuItem`
- `SidebarMenuButton`
- `SidebarMenuBadge`
- `SidebarSeparator`
- `SidebarRail` (collapsed state hover/tooltip rail)
- `SidebarTrigger` (button to toggle; usable in/out of `Sidebar` via context)

### Behavioral Requirements
- Collapsible:
  - Desktop: full width → rail (icon-only) with tooltips
- Controlled/uncontrolled:
  - Accept `open` and `onOpenChange` for controlled mode
  - `defaultOpen` for uncontrolled
- Keyboard support:
  - `Tab`/`Shift+Tab` traversal
  - `Enter`/`Space` activates buttons
  - Arrow keys navigate within a group (optional roving tabindex)
- ARIA & roles:
  - `nav` landmark with `aria-label`
  - Collapsible groups expose `aria-expanded` and `aria-controls`
  - Active item has `aria-current="page"` when appropriate
- Focus management:
  - Return focus to trigger on close
- Motion:
  - Reduced-motion respect via `@media (prefers-reduced-motion)`

### Visual/Styling Requirements
- Widths:
  - Expanded: 16rem (tailwind `w-64`)
  - Rail: 3.5rem (`w-14`)
- Colors: use semantic tokens (`bg`, `fg`, `muted`, `accent`)
- Borders: subtle separators (`border-border`)
- Radius: tokenized via `--radius`
- States: hover, focus-visible, active, selected; high-contrast outlines via `ring`

### API (props)
- `SidebarProvider`
  - `defaultOpen?: boolean` (default: true)
  - `open?: boolean` (controlled)
  - `onOpenChange?: (open: boolean) => void`
  - `breakpoint?: 'sm' | 'md' | 'lg'` (default: 'md')
  - `side?: 'left' | 'right'` (default: 'left')
- `Sidebar`
  - `className?: string`
  - `variant?: 'floating' | 'inset'` (visual style only)
  - `aria-label?: string` (default: 'Primary')
- `SidebarGroup`
  - `defaultOpen?: boolean`
  - `open?: boolean`
  - `onOpenChange?: (open: boolean) => void`
  - `collapsible?: boolean` (default: true)
- `SidebarMenuItem`
  - `active?: boolean`
  - `disabled?: boolean`
  - `href?: string` (if provided, renders anchor semantics)
  - `onSelect?: () => void`
- `SidebarMenuButton`
  - Forward ref to `button` or `a`
  - Supports `icon` and `endAdornment` slots
  - `label?: string` used for rail tooltips when collapsed; inferred from text children if absent
  - `href?: string` link support, sets `aria-current="page"` when `active`
  - `active?: boolean`, `disabled?: boolean`
- `SidebarTrigger`
  - `className?: string`
  - `srLabel?: string` (default: 'Toggle sidebar')

### Data Model
- Consumers compose items declaratively:
  ```tsx
  <SidebarProvider defaultOpen>
    <Sidebar aria-label="Primary">
      <SidebarHeader>Brand</SidebarHeader>
      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem active>
                <SidebarMenuButton icon={<Home />}>Home</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<Search />} endAdornment={<SidebarMenuBadge>3</SidebarMenuBadge>}>
                  Search
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Profile</SidebarFooter>
    </Sidebar>
    <SidebarTrigger />
  </SidebarProvider>
  ```

### Accessibility Checklist
- Landmark `nav` present and labeled
- Focus trap on mobile drawer
- `aria-expanded` and `aria-controls` for collapsible groups
- `aria-current` on active items
- All buttons reachable via keyboard, visible focus ring
- Meets WCAG 2.1 AA color contrast

### Dependencies for Sidebar
- Radix primitives: `@radix-ui/react-collapsible`, `@radix-ui/react-tooltip`, `@radix-ui/react-visually-hidden`
- Optional: `framer-motion` (peer) for springy animations; otherwise CSS transitions only

### Stories
- `Sidebar/Default`: desktop expanded
- `Sidebar/Rail`: collapsed rail with tooltips
- `Sidebar/Groups`: multiple groups, deep nesting (2 levels only)
- `Sidebar/States`: active, disabled, long labels, with/without icons, with badges
- `Sidebar/RightSide`: right-anchored variant

### Tests
- Unit
  - Open/close transitions update ARIA states correctly
  - Controlled vs. uncontrolled behavior
  - Focus restoration to trigger on close
- A11y
  - Axe violations: none
  - Keyboard navigation across items and groups
- Visual (optional, Playwright)
  - Snapshots for desktop expanded and rail

### Performance
- Avoid layout thrash; use CSS for transitions
- Avoid offscreen heavy trees; lazy tooltip content
- No re-render cascades on hover; memoize menu items

### File Plan (initial)
- `src/components/sidebar/SidebarProvider.tsx`
- `src/components/sidebar/Sidebar.tsx`
- `src/components/sidebar/SidebarHeader.tsx`
- `src/components/sidebar/SidebarContent.tsx`
- `src/components/sidebar/SidebarFooter.tsx`
- `src/components/sidebar/SidebarGroup.tsx`
- `src/components/sidebar/SidebarMenu.tsx` (Item, Button, Badge, Separator)
- `src/components/sidebar/index.ts`
- `src/styles/theme.css` (tokens)
- `src/lib/cn.ts`

### Implementation Notes
- Use compound component pattern with React context for open state and breakpoint.
- Only `SidebarProvider`, `Sidebar`, and `SidebarTrigger` are client components; structural ones remain server-compatible if they don’t use state.
- Keep `Sidebar` unopinionated about routing; support `asChild` pattern for `a/Link` when necessary.
- Expose `data-state="open|closed"` and `data-variant` attributes for advanced styling.

---

## Work Plan (MVP)
1) Scaffolding
   - TypeScript, tsup, eslint/prettier, vitest, storybook
   - Add `src/styles/theme.css`, tokens
   - Export Tailwind preset (`src/tailwind-preset.ts`)
2) Utilities
   - `cn`
3) Sidebar (non-animated)
   - Provider, container, trigger, rail
   - Header/Content/Footer
   - Group + Menu primitives
   - Desktop collapse (no mobile drawer)
4) A11y + tests
5) Stories + docs
6) Polish (reduced motion, right-side, variants)

### Non-Goals (for MVP)
- Deep tree navigation with roving tabindex beyond 2 levels
- Persisting open state to storage (can be added later)

---

## Design Tokens Pipeline (design-tokens-sync)

Leverage `design-tokens-sync` to automate syncing tokens from Figma Token Studio and generate outputs the library can consume and ship. Outputs include CSS variables, a Tailwind preset, TypeScript definitions, and a shadcn-compatible theme sheet with dark mode. Reference: [design-tokens-sync on npm](https://www.npmjs.com/package/design-tokens-sync).

### Install
- Dev dependency in this repo: `npm i -D design-tokens-sync`

### Files & Outputs
- Input: `tokens.json` (checked into the repo; exported from Figma Token Studio)
- Generated by the tool (not committed):
  - `src/styles/shadcn-theme.css` (shadcn-ready theme with dark mode)
  - `src/data/tokens.js` and `src/data/tokens.cjs` (runtime tokens)
  - `src/types/tokens.d.ts` (TypeScript typings)
  - `src/styles/_tokens.scss` (optional SCSS)

### Configuration
Create `design-tokens.config.js` at repo root:

```js
export default {
  tokens: {
    input: 'tokens.json',
    validation: {
      required: ['colors'],
      optional: ['spacing', 'typography', 'borderRadius'],
    },
  },
  output: {
    css: 'src/styles/tokens.css',
    shadcnThemeCss: 'src/styles/shadcn-theme.css',
    tailwindPresetEsm: 'tokens.tailwind.preset.js',
    tailwindPresetCjs: 'tokens.tailwind.preset.cjs',
    javascript: 'src/data/tokens.js',
    tokensCjs: 'src/data/tokens.cjs',
    typescript: 'src/types/tokens.d.ts',
    scss: 'src/styles/_tokens.scss',
  },
  css: { includeUtilities: false },
  shadcn: { enable: true, hsl: true, mapping: {} },
  init: { scaffoldRootTailwindConfig: true },
  git: {
    enabled: true,
    autoCommit: true,
    autoPush: false,
    commitMessage: '🎨 Update design tokens',
  },
  analytics: { enabled: true, autoCollect: true },
  watch: { enabled: true, ignore: ['node_modules', '.git', 'dist', 'build'] },
}
```

### NPM Scripts
Add to `package.json`:

```json
{
  "scripts": {
    "tokens:init": "design-tokens-sync init",
    "tokens:sync": "design-tokens-sync sync",
    "tokens:watch": "design-tokens-sync watch",
    "tokens:validate": "design-tokens-sync validate",
    "tokens:analytics": "design-tokens-sync analytics report --format html"
  }
}
```

### How We Integrate in This Library
- We ship `theme.css` to consumers by copying `src/styles/shadcn-theme.css` during build.
- Our Tailwind preset (`@equal-ds/ui/tailwind-preset`) reads CSS variables; no token preset files are needed in the repo.
- Components must use semantic CSS variables, e.g., `bg-[hsl(var(--background))]`, so token updates propagate without code changes.

### Consumer-facing Impact
- Consumers continue to:
  - `import '@equal-ds/ui/theme.css'` once
  - Add `presets: [equalPreset]` (our preset)
- Optional: Consumers running `design-tokens-sync` in their apps can stack their preset before ours to override tokens.

### Tailwind Config (Library Dev and Docs App)
Use the library preset directly during local development:

```ts
// tailwind.config.ts
import preset from './src/tailwind-preset'
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  darkMode: ['class'],
}
```

### Usage Examples
- Theme CSS (global import once):
  ```ts
  import '@equal-ds/ui/theme.css'
  // or, locally during library development
  import './src/styles/shadcn-theme.css'
  ```
- In components, rely on CSS variables:
  ```tsx
  <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]" />
  ```
- Programmatic access (internal dev):
  ```ts
  import tokens, { colors, spacing } from './src/data/tokens'
  ```

### CLI Workflow
- One-time init: `npx design-tokens-sync init`
- Manual sync: `npm run tokens:sync`
- Watch during dev: `npm run tokens:watch`
- Validate: `npm run tokens:validate`
- Analytics report: `npm run tokens:analytics`

### CI Automation (optional)
Run on token changes and commit outputs:

```yaml
name: Design Tokens Sync
on:
  push:
    paths: ['tokens.json']
jobs:
  sync-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx design-tokens-sync sync
      - run: git add . && git commit -m "🎨 Update design tokens" || echo "No changes"
      - run: git push || echo "No push on PRs"
```

### Troubleshooting
- Cannot find `tokens.json`: check `design-tokens.config.js` `tokens.input` path
- TypeScript errors: include generated types in `tsconfig.json` via `"types": ["./src/types/tokens.d.ts"]`
- Watch not triggering: exclude heavy dirs (`dist`, `.next`, etc.) in `watch.ignore`
- Tailwind utilities duplication: keep `css.includeUtilities: false`

---

## Consumer Docs (to be written in README after implementation)
- Install peers and library
- Import `theme.css`
- Extend Tailwind with preset; ensure content includes the package
- Usage examples for Sidebar
- Theming guide and token overrides


---

## Implementation Status

- Step 1: Scaffolding initialized
  - Added `package.json`, `tsconfig.json`, `tsup.config.ts`
  - Created `src/index.ts`, `src/styles/theme.css`, `src/tailwind-preset.ts`
  - Build script emits `dist` and copies `theme.css` as an asset
- Step 2: Utilities
  - Added `src/lib/cn.ts` with `clsx` + `tailwind-merge`
  - Exported `cn` from `src/index.ts`
  - Adjusted dependencies: added `clsx` and dev `tailwindcss` for type resolution
- Step 3: Sidebar scaffolding
  - Created `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu` primitives
  - Wired exports via `src/components/sidebar/index.ts` and `src/index.ts`
  - Components render basic structure and data-state attributes; no animations yet
- Step 4: Preview setup
  - Added Storybook (Vite) with Tailwind and theme CSS
  - Created `stories/Sidebar.stories.tsx` for a basic preview
- Step 5: Interaction primitives
  - Added `SidebarTrigger` with `toggle` wired via context
  - Added `SidebarRail` placeholder and updated story to include trigger
- Step 6: Groups & rail behavior
  - Added `SidebarGroupTrigger`; `SidebarMenuButton` shows tooltip labels when collapsed using Radix Tooltip
- Step 7: States & right-side
  - `SidebarMenuButton` now supports `active`, `disabled`, `href` with `aria-current`
  - `Sidebar` adapts border based on side; added RightSide story
- Step 8: Stories expansion
  - Added Rail, States, and Groups stories; installed `@storybook/addon-essentials`
- Step 9: Tests & tokens scaffolding
  - Added Vitest + RTL + jest-axe; basic a11y test passes
  - Added `design-tokens.config.js`, `tokens.json`, and npm scripts for sync
- Step 10: Token sync complete
  - Updated `tokens.json` with complete Token Studio format
  - Generated CSS, Tailwind preset, TypeScript definitions, and shadcn theme
- Next: wire generated theme into build; add build verification and README.


