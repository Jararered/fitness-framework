# Agent Notes — Fitness Framework

## Stack
- React 19 + React Router 7 SPA built with Vite + TypeScript.
- Package manager is **Bun** (`bun.lockb`). Don't introduce a `package-lock.json` unless asked.
- State: Zustand with persistence; persisted data is validated with Zod.

## Entrypoints
- Mount: `index.html` → `src/main.tsx` → `src/App.tsx`.
- All routes are declared in `src/App.tsx`; pages live under `src/pages/`.
- Reusable state shape: `src/data/types.ts`; stores live under `src/stores/`.

## Commands
- Install: `bun install`
- Dev: `bun dev` (Vite, `http://localhost:5173`)
- Build: `bun run build` (`tsc -b && vite build`)
- Lint: `bun run lint` (`eslint .`)
- Production preview: `bun run build && bunx vite preview`
- **No test runner is configured.**

## Type-checking
- Uses TypeScript project references: root `tsconfig.json` points to `tsconfig.app.json` and `tsconfig.node.json`.
- `bun run build` calls `tsc -b`, which compiles both. Running `tsc` without `-b` may miss the references.
- Strict flags are on, including `noUnusedLocals`, `noUnusedParameters`, and `noUncheckedSideEffectImports`. Any imported module must be used.

## Environment / runtime quirks
- Stores persist to `localStorage`; invalid persisted data is silently reset after a console warning because of the Zod schema validation.
- `import.meta.env.MODE === 'development'` gates whether Zustand devtools are enabled.

## Code conventions
- ESLint config in `eslint.config.js` targets `**/*.{ts,tsx}` only and ignores `dist/`.
- Imports include the `.tsx`/`.ts` extension (Bundler resolution; `allowImportingTsExtensions: true`).
- Do **not** introduce Prettier or treat `.vscode/settings.json` as a global formatter config; there is no Prettier dependency.

## Things to avoid
- Don't add a default test harness or switch to npm without checking first.
- Don't add a global CSS reset without checking `src/styles/global.css` and `src/styles/variables.css`; the app is styled as a mobile-first PWA with `user-scalable=no`.
