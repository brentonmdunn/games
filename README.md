# Game Night

A mobile-first reference site for game night. Pick a game to see its rules,
player-count-specific setup, and a quick cheat sheet.

**Games so far:** Cambio

## Development

```sh
pnpm install
pnpm dev
```

## Adding a game

1. Create `src/data/games/<game>.ts` exporting a `Game` object (see
   `src/data/types.ts` for the shape: rules sections, a
   `configForPlayers(n)` function, and cheat sheet groups).
2. Register it in `src/data/games/index.ts`.

The UI (list entry, rules/setup/cheat-sheet tabs) renders automatically.

## Deploying

`pnpm build` outputs a static site to `dist/`. Routing is hash-based and the
Vite base is relative, so it works on GitHub Pages from a subpath with no
extra configuration.
