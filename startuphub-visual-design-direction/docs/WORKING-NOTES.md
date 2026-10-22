# Working Notes

Practical notes for anyone working on this repo. The structural model lives in
[`ARCHITECTURE.md`](./ARCHITECTURE.md); this file is the operational layer — the
things that will otherwise cost you an hour to rediscover.

---

## 1. Running the dev server

```bash
npm run dev          # port 3000
```

`predev` runs `scripts/prune-dev-cache.mjs` first — see §3. It is a no-op unless the
cache is over 2 GB, so it never slows a normal start.

**A `.env` (or `.env.local`) with `DATABASE_URL` is required to build.**
`src/db/index.ts` throws at import time without it. This is deliberate.

### Dev server vs. production build — never run both

`next build` and `next dev` write to the same `.next/` directory. If you run a build
while the dev server is up, the build overwrites the dev server's route manifest and
its route tree goes stale in memory.

**Symptom:** every route deeper than about two segments returns `404`, while the
shallow ones keep working. It looks exactly like broken code and is not.

**Fix:** stop the dev server before building, then restart it.

To verify a production build without touching the dev server:

```bash
npm run build && npm run start -- -p 3222
```

---

## 2. The Turbopack dev cache grows without bound

Turbopack writes a **~250 MB `.sst` blob per recompile** into
`.next/dev/cache/turbopack` and never prunes them.

On a 500-route project, a full route sweep compiles every page and the cache passes
**15 GB**. The dev server then thrashes:

| Symptom | Normal | Bloat |
|---|---|---|
| Page response | 120–500 ms | 45 s (timeout) |
| Dev server RSS | 0.5–2 GB | 18 GB+ |
| `.next` on disk | ~500 MB | 16 GB+ |

`scripts/prune-dev-cache.mjs` (wired as `predev`) removes the cache when it exceeds
2 GB. You can also run it by hand:

```bash
node scripts/prune-dev-cache.mjs
```

If the dev server is currently in a bloated state, deleting the cache on disk is not
enough — the running process still holds the old cache in memory. **Restart the server.**

---

## 3. Testing pages

The fastest way to sweep every route:

```powershell
# enumerate routes from disk (route groups like (app) do not appear in URLs)
$app = "src\app"
$all = Get-ChildItem -Path $app -Recurse -Filter "page.tsx"
function To-Route($f) {
  $rel = $f.FullName.Substring((Resolve-Path $app).Path.Length + 1)
  $rel = $rel -replace '\\page\.tsx$', ''
  $seg = ($rel -split '\\') | Where-Object { $_ -notmatch '^\(.*\)$' }
  "/" + ($seg -join '/')
}
$routes = $all | ForEach-Object { To-Route $_ } | Sort-Object -Unique
```

**Sweep serially, not in parallel.** Twelve concurrent `Invoke-WebRequest` jobs
overload the dev server and produce ~42 phantom failures that do not reproduce when
the same URLs are requested one at a time. Parallel is only safe if you are checking
status codes against an already-warm server.

For real slugs, read them from the constants files:

| Dynamic route | Source of slugs |
|---|---|
| `/explore/startups/[slug]` | `src/views/explore/startups/constants/startups.ts` |
| `/events/[slug]` | `src/views/events/constants/events.ts` |
| `/admin/ecosystem/[entity]` | `src/users/admin/constants/ecosystem.ts` |

### False-positive error markers

Every page embeds Next.js's preloaded 404 boundary in its RSC flight payload, so
`"This page could not be found"` appears on **all 486 static pages**. It is not an error.

Real failure markers to scan for:

```
"Application error: a server-side exception has occurred"
"Internal Server Error"
"Unhandled Runtime Error"
"TypeError:"  "ReferenceError:"  "SyntaxError:"
"is not a function"
"Cannot read properties of"
"Objects are not valid as a React child"
"Element type is invalid"
"Hydration failed"
"Too many re-renders"
"Maximum update depth exceeded"
```

---

## 4. The widget union rule

`src/components/app/widgets.tsx` holds four families that arrived from four prototype
generations. When two families share a widget name, the props are **unioned** and
disambiguated by a **disjoint prop set** — never by renaming.

Current discriminators (verified against usage):

| Widget | Admin | Panel family | Talent / University |
|---|---|---|---|
| `Stat` | `tone` = `up`/`down`/`flat` | `tone` = `good`/`default`/`warn`/`bad` | — |
| `Panel` | `description` present | `sub` present | neither |
| `Bar` | — | `pct` prop | `value` + `tone` prop |
| `Avatar` | — | `label` prop | `name` prop |

**When you add a role with its own widget family:** give the new widgets distinct
names where you can (`Meter`, `Tag`, `PageIntro` were all added this way). If a name
collides, union the props on a disjoint set — and verify the discriminator against
real call sites before you commit, because a wrong guess silently restyles another
role's screens.

See `ARCHITECTURE.md` §6 for the full family table.

---

## 5. Adding a role touches three files

1. `src/users/<role>/` — components + `constants/<role>-nav.ts`
2. `src/app/(app)/<role>/` — routes
3. **Two lists of every role**, which are easy to forget:
   - `src/components/app/company-switcher.tsx` → the `workspaces` array
   - `src/views/auth/auth.tsx` → the `ROLES` array

Both currently hold 11 entries. A role that is missing from either is unreachable
from the login page or the workspace switcher.

---

## 6. Nav contracts

```ts
export type AppNavSub   = { name: string; href: string; soon?: boolean };
export type AppNavGroup = { label: string; icon: LucideIcon; href: string; subs?: AppNavSub[] };
export type AppNavItem  = { name: string; href: string; icon: LucideIcon; soon?: boolean };
export type AppUser     = {
  name: string; role: string; org: string; initials: string; home: string;
  copilot?: boolean;
  copilotHref?: string;   // omit for a non-navigating "Soon" card
};
```

`utility` and `bottom` accept **either** `AppNavGroup[]` or `AppNavItem[]` — flat
items are normalised by `toGroups()` at render time. That is what lets roles from
different generations share one `AppShell`.

`home` is the workspace root and collapses active-state highlighting, so `/investor`
does not stay lit while you are on `/investor/dd`.

`soon: true` marks an unbuilt screen. It must **not** point at a real route — the
nav entry is a dead chip, and a collision means two entries for the same URL.

---

## 7. The founder shell is a fork

`src/users/startup/components/app-shell/sidebar.tsx` is a copy of the sidebar
internals from `app-shell.tsx`, with the identity hardcoded. If you change sidebar
behaviour you must change **both** files, or the founder workspace silently diverges.

The founder is also the only role whose source directory (`src/users/startup/`) does
not match its route root (`/founder`).

---

## 8. Fonts

Inter comes from `next/font/google`. **JetBrains Mono is self-hosted** via
`@fontsource-variable/jetbrains-mono` — do not move it back to `next/font/google`.
The Google Fonts fetch is unreliable in this environment; when it fails, `next dev`
falls back to a system mono and the build logs a warning on every compile.

`--font-mono` is used ~496 times across the workspace screens for data readouts,
chips, timestamps and metric labels.

---

## 9. Token discipline

Colour comes from `@theme` tokens in `src/app/globals.css` — `accent`, `ink`, `line`,
`soft`, plus the `rise` / `amber` signals and the `accent-100…500` steps. Raw hex in
a component is a smell, except inside inline SVG `stroke` / `fill` attributes.

If a merged role references a token that does not exist, the utility silently does
nothing. That is the failure mode to look for when a screen renders colourless:
compare the class in the markup against the token list in `globals.css`.

Custom (non-utility) classes in `globals.css`:

```
.anim-float  .anim-marquee  .link-flow  .ping-dot
.bg-nodegrid .bg-dotgrid    .dot-grid   .dot-grid-dark
.mask-x-fade .no-scrollbar
```

---

## 10. Before you commit

```bash
npm run typecheck   # tsc --noEmit  → must exit 0
npm run lint        # eslint .      → must exit 0
```

Both are clean on `main` today. The lint config is `eslint-config-next` flat config,
which pulls in `eslint-plugin-react`, `eslint-plugin-react-hooks` and
`@next/eslint-plugin-next`. The rules that bite most often in this repo are:

- `react/no-unescaped-entities` — raw `"` and `'` inside JSX text
- `react-hooks/set-state-in-effect` — derive state during render instead
- `@next/next/no-html-link-for-pages` — use `next/link` for internal routes
- `react-hooks/immutability` — never mutate a variable across a render

The last two are non-obvious failures: `set-state-in-effect` and `immutability` fire
on code that works fine, because the React Compiler's stricter rules are enabled by
default in Next 16.
