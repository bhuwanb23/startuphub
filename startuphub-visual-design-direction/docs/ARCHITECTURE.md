# StartupHub — Architecture & Design

How this repository is structured, why it is structured that way, and how to add to it without breaking the pattern.

> **Current state:** 11 role workspaces, 501 routes, 4 widget families, 22 public views.
> This document was rewritten after the investor/corporate/government/provider, talent/university,
> and admin merges. Where a role was merged from another prototype, its own widget family
> was preserved via a **prop union** rather than a rename — see §6.

---

## 1. The One-Paragraph Mental Model

StartupHub is a **multi-tenant platform** where eleven different audiences (founders, mentors, IPR experts, incubators, investors, corporates, governments, resource providers, universities, talent, admins) each get their own role-specific workspace, while the general public browses a marketing and discovery site. The codebase mirrors that split exactly: **`src/app` owns the URL space**, **`src/views` owns the public-site screens**, **`src/users` owns the role workspaces**, **`src/components` owns everything shared**, and **`src/db` owns persistence**. Routes are thin — they declare metadata and hand off to a view or a shell. That is the whole design.

---

## 2. Layer Model

```
┌───────────────────────────────────────────────────────────────────────┐
│  L1 · ROUTES          src/app/**/page.tsx                             │
│  Owns: URL, metadata, and nothing else.                               │
├───────────────────────────────────────────────────────────────────────┤
│  L2 · SURFACES                                                             │
│  ┌────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │ Public site            │  │ Role workspaces (11)                 │  │
│  │ src/views/**           │  │ src/users/**                         │  │
│  │ 22 sections            │  │ founder · mentor · ipr-expert ·      │  │
│  │ marketing + directory  │  │ incubator · investor · corporate ·   │  │
│  │ + solutions + explore  │  │ government · provider · talent ·     │  │
│  │                        │  │ university · admin                   │  │
│  └────────────────────────┘  └──────────────────────────────────────┘  │
│  Owns: screen composition, data, and page-specific sections.           │
├───────────────────────────────────────────────────────────────────────┤
│  L3 · SHARED UI          src/components/**                           │
│  site/ · app/ · directory/ · solution/ · primitives                    │
│  Owns: app shell, navbar, hero, buttons, motion, tokens.              │
├───────────────────────────────────────────────────────────────────────┤
│  L4 · PERSISTENCE        src/db/**   +  src/lib/**                   │
│  Drizzle pool, schema entrypoint, cn() className helper.              │
└───────────────────────────────────────────────────────────────────────┘
```

**Rule of thumb:** dependencies only ever point *downward*. A route may import a view or a shell. A view may import shared components. Shared components may import `lib` and `db`. Nothing points back up.

---

## 3. Route Groups — the URL Space

Next.js route groups (the parenthesised folders) let several unrelated URL spaces share one layout. This repo uses two, plus a raw API folder.

```
src/app/
├── layout.tsx          ← root: <html>, <body>, Inter + JetBrains Mono, metadata
├── globals.css         ← Tailwind v4 @theme tokens + keyframes + textures
│
├── (public)/           ← marketing site + directory  → site chrome
│   ├── layout.tsx      ← Navbar + <main> + Footer
│   ├── about/  contact/  faq/  news/  partners/  pricing/
│   ├── ecosystem/  showcase/  events/[slug]/  knowledge-hub/
│   ├── opportunities/  platform/  lifecycle/  ipr/
│   ├── intelligence/{insights,market}/
│   ├── explore/{startups,startups/[slug],mentors,investors,incubators,resources}/
│   ├── solutions/{founders,mentors,incubators,investors,corporates,government}/
│   ├── login/  register/
│
├── (app)/              ← authenticated role workspaces → app shell
│   ├── layout.tsx      ← deliberately empty (see §3.2)
│   ├── founder/        ← 45 screens
│   ├── incubator/      ← 32 screens
│   ├── ipr-expert/     ← 31 screens
│   ├── mentor/         ← 21 screens
│   ├── investor/       ← 79 screens
│   ├── corporate/      ← 65 screens
│   ├── government/     ← 72 screens
│   ├── provider/       ← 45 screens
│   ├── talent/         ← 19 screens
│   ├── university/     ← 21 screens
│   └── admin/          ← 25 screens  (+ dynamic ecosystem/[entity])
│
└── api/
    └── health/route.ts ← GET → `select 1` against Postgres
```

### 3.1 Why two groups

`(public)` and `(app)` are **siblings**, not nested. The public group renders a top navbar and a footer; the app group renders a fixed 264px sidebar with a topbar. Stacking them would mean the app workspace inherited a marketing navbar it doesn't want. Instead, `(app)/layout.tsx` is an empty fragment and each role supplies its own shell:

```tsx
// (app)/mentor/startups/matching/page.tsx
export const metadata: Metadata = { title: "Startup Matching · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Startup Matching">
      <MentorMatching />
    </MentorShell>
  );
}
```

Public routes skip the shell entirely and render a view bare:

```tsx
// (public)/explore/startups/page.tsx
export const metadata: Metadata = {
  title: "Startup Directory — StartupHub",
  description: "Search verified startups by industry, location, stage, funding and technology.",
};

export default function Page() {
  return <StartupsView />;
}
```

### 3.2 The empty `(app)` layout

`src/app/(app)/layout.tsx` returns `<>{children}</>` and nothing else. It exists so that the group can later hold auth-gating (middleware, session check) without touching 500+ route files.

### 3.3 Route inventory

| Segment | `page.tsx` files | Kind |
|---|---|---|
| `(public)` pages | 34 | marketing / directory / solutions (incl. 2 dynamic) |
| `(app)` pages | 455 | role workspaces (incl. 1 dynamic) |
| **Total `page.tsx`** | **489** | |
| Distinct URLs served | **509** | 486 static + 23 concrete slugs |
| `api/health` | 1 | `route.ts` (not a page) — JSON health probe |

The three dynamic route files — `events/[slug]`, `explore/startups/[slug]` and
`admin/ecosystem/[entity]` — expand to 23 concrete URLs via `generateStaticParams`
(8 startups, 7 events, 8 ecosystem entities).

Workspace screens by role:

| Role | Route root | Source dir | Shell | Screens |
|---|---|---|---|---|
| **Founder** | `/founder` | `src/users/startup/` | `FounderShell` | 45 |
| **Mentor** | `/mentor` | `src/users/mentor/` | `MentorShell` | 21 |
| **IPR Expert** | `/ipr-expert` | `src/users/ipr-expert/` | `IprShell` | 31 |
| **Incubator** | `/incubator` | `src/users/incubator/` | `IncubatorShell` | 32 |
| **Investor** | `/investor` | `src/users/investor/` | `InvestorShell` | 79 |
| **Corporate** | `/corporate` | `src/users/corporate/` | `CorporateShell` | 65 |
| **Government** | `/government` | `src/users/government/` | `GovernmentShell` | 72 |
| **Resource Provider** | `/provider` | `src/users/provider/` | `ProviderShell` | 45 |
| **Talent** | `/talent` | `src/users/talent/` | `TalentShell` | 19 |
| **University** | `/university` | `src/users/university/` | `UniversityShell` | 21 |
| **Super Admin** | `/admin` | `src/users/admin/` | `AdminShell` | 25 |

> ⚠️ **Naming mismatch (intentional):** the founder's source directory is `src/users/startup/`
> but its route root is `/founder` and its shell is `FounderShell`. Every other role's
> source dir matches its route root.

Focus areas per role:

- **Founder** — idea, incubation, ipr, mentors, market, funding, growth, product, resources, opportunities, documents, copilot
- **Mentor** — dashboard, mentorship (tasks, milestones, scheduling, documents, recommendations), startups (assigned, matching, requests), impact, monitoring
- **IPR Expert** — ip (patents, trademarks, designs, copyright, trade-secrets, portfolio), intelligence, filings, commercialization, compliance, clients, profile
- **Incubator** — cohorts (+analytics, cohort-vi), programs, milestones, mentors, startups (assessment, interventions), performance, reports, resources, support, organization
- **Investor** — discovery, evaluation, dd, comm, pipeline, deal, investments, portfolio, analytics, profile, ops
- **Corporate** — discovery, evaluation, innovation, pilots, partnerships, performance, procurement, contracts, organization, analytics, ops
- **Government** — registry, programs, challenges, funding, policy, impact, incubation, performance, reports, organization, analytics, ops
- **Resource Provider** — marketplace, resources, bookings, payments, usage, profile, allocations, analytics, ops
- **Talent** — profile, discover, collaborate, applications, work, reputation, analytics, workspace
- **University** — institution, people, research, ip, commercialization, infrastructure, analytics, workspace
- **Super Admin** — dashboard, ai, analytics, audit, config, content, moderation, verification, identity, programs, payments, reports, subscriptions, notifications, events, market-content, ecosystem

---

## 4. The View Pattern (`src/views`)

Every public screen follows the same four-part shape:

```
src/views/<section>/
├── <section>.tsx          ← the exported View component (default or named)
├── components/            ← screen-specific pieces
├── constants/             ← all the data, typed and separated
└── hooks/                 ← optional local state
```

A representative example — `src/views/explore/startups/`:

```
startups.tsx           ← exports StartupsView
components/
  directory-client.tsx ← client-side filtering / sorting
  startup-card.tsx     ← one card in the grid
constants/
  startups.ts          ← the seed dataset
```

**The contract:** the `page.tsx` file imports the View and nothing else. The View composes components. Components render constants. Data lives in `constants/`, never inline in JSX.

The 22 sections under `src/views/`:

| Section | Section | Section |
|---|---|---|
| `about` | `faq` | `opportunities` |
| `auth` | `knowledge-hub` | `partners` |
| `contact` | `lifecycle` | `platform` |
| `ecosystem-insights` | `market-intelligence` | `pricing` |
| `ecosystem-map` | `news` | `resources` |
| `events` | `showcase` | `success-stories` |
| `explore/*` | `ipr` | `solutions/*` |
| `home` | | |

### 4.1 The data-driven solution template

`src/views/solutions/<audience>/` is the cleanest instance of the pattern. Six audiences (`founders`, `mentors`, `incubators`, `investors`, `corporates`, `government`) all render the *same* component tree, differing only by a typed data blob:

```ts
// src/components/solution/types.ts
export type SolutionData = {
  slug: string;
  audience: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  ticks: string[];
  panel: { title: string; rows: {…}[]; stat: { value: string; label: string } };
  capabilitiesHeading: string;
  capabilities: Capability[];
  workflow: WorkflowStep[];
  outcomes: Outcome[];
  quote: { text: string; name: string; role: string };
  ctaLabel: string;
};
```

To add a seventh audience you write **one constants file** and **one 6-line page** — no component changes. That is the payoff of the separation.

### 4.2 The auth view (login / register)

`src/views/auth/auth.tsx` is a **role-picker**, not a credential form. The left column is a dark brand panel; the right lists all 11 workspaces as selectable cards. Choosing a role updates the CTA and the "Demo → *person · org*" line, and the button links straight into that workspace.

It is the single entry point to every role, so **adding an 12th role requires updating it** as well as the company switcher (§5.6).

---

## 5. The Workspace Pattern (`src/users`)

Role workspaces live under `src/users/<role>/` and have a slightly different shape from views, because they need navigation:

```
src/users/<role>/
├── <role>.tsx            ← exports the role's Shell (e.g. MentorShell)
├── components/           ← screens, grouped by feature
│   ├── dashboard/  mentorship/  startups/  profile/  …
└── constants/
    ├── <role>-nav.ts     ← nav groups, utility groups, bottom groups, user identity
    └── <role>-data.ts    ← the seed dataset(s)
```

### 5.1 How a shell is assembled

```tsx
// src/users/mentor/mentor.tsx
"use client";

export function MentorShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <AppShell
      nav={mentorNav}
      utility={mentorUtility}
      bottom={mentorBottom}
      user={{ ...mentorUser, copilot: false }}
      title={title}
    >
      {children}
    </AppShell>
  );
}
```

The shell is a **thin adapter**: it injects one role's navigation constants into the shared `AppShell`. Adding a role means writing a new `<role>.tsx` and a new `<role>-nav.ts` — the shell component itself never changes.

### 5.2 The shared AppShell

`src/components/app/app-shell.tsx` is the heart of the workspace UX. It is a client component (it needs `usePathname` for active-nav highlighting) and provides:

- **Fixed 264px sidebar** on `lg+`, off-canvas drawer below that
- **Collapsible nav groups** with sub-items and a `Soon` badge for unbuilt screens
- **Active-state resolution** (`isActive`) that collapses a group's highlight onto its own workspace root so `/mentor` doesn't stay lit on `/mentor/startups`
- **Company switcher** + **topbar** with the signed-in identity
- **A persistent "Ask Startup Copilot" affordance**, toggled per role via `user.copilot`

Its prop types are the contract every role must satisfy:

```ts
export type AppNavSub   = { name: string; href: string; soon?: boolean };
export type AppNavGroup = { label: string; icon: LucideIcon; href: string; subs?: AppNavSub[] };
export type AppNavItem  = { name: string; href: string; icon: LucideIcon; soon?: boolean };
export type AppUser     = {
  name: string; role: string; org: string; initials: string; home: string;
  copilot?: boolean;
  copilotHref?: string;   // where the copilot card links; omit for a non-navigating card
};
```

`utility` and `bottom` accept **either** shape — `AppNavGroup[]` or `AppNavItem[]`:

```ts
utility?: (AppNavGroup | AppNavItem)[];
bottom?:  (AppNavGroup | AppNavItem)[];
```

Flat `AppNavItem` entries are normalised into groups at render time by `toGroups()`. This is what lets the investor/corporate/government/provider roles (flat utility items) and every other role (grouped utility items) share one shell.

### 5.3 The founder shell is a deliberate exception

**The founder workspace does *not* use `AppShell`.** It has its own `FounderSidebar` at `src/users/startup/components/app-shell/sidebar.tsx`, and `FounderShell` composes it with `AppTopbar` directly:

```tsx
// src/users/startup/startup.tsx
export function FounderShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-soft">
      <FounderSidebar mobileOpen={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-[264px]">
        <AppTopbar title={title} userName="Ravi Sharma" initials="RS" onMenu={() => setOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
```

`FounderSidebar` is a **fork** of the sidebar internals from `app-shell.tsx` — it re-implements `isActive`, the collapsible `Group`, and the mobile drawer, but with the identity **hardcoded** (`"Lumen AI"`, `"Founder · Ravi Sharma"`, `"RS"`) rather than injected via the `user` prop. It also defines its own `FounderGroup` type in `src/users/startup/constants/founder-nav.ts` instead of reusing `AppNavGroup`.

> ⚠️ **Known duplication.** This is the one place the pattern is not clean. If you touch sidebar behaviour, you must change **both** `src/components/app/app-shell.tsx` and `src/users/startup/components/app-shell/sidebar.tsx`. The clean fix is to give `AppShell` a `home`-aware prop and migrate the founder onto it.

### 5.4 The copilot flag

`user.copilot` controls whether the "Ask Startup Copilot" button renders in the sidebar footer. `user.copilotHref` decides whether it is a link or a non-navigating "Soon" card.

| Role | `copilot` | `copilotHref` | Note |
|---|---|---|---|
| Founder | always on | `/founder/copilot` | hardcoded inside `FounderSidebar` |
| Incubator | `true` | — | has `/incubator/copilot` |
| Mentor | `false` | — | no copilot screen |
| IPR Expert | `false` | — | no copilot screen |
| Investor / Corporate / Government / Provider / Talent / University | `true` | — | no copilot screen → renders the "Soon" card |
| Admin | `false` | — | no copilot screen |

### 5.5 Nav file shape

Every `<role>-nav.ts` exports four constants:

```ts
export const <role>Nav: AppNavGroup[] = [ /* collapsible groups */ ];
export const <role>Utility: AppNavGroup[] = [ /* "Workspace" rail */ ];
export const <role>Bottom: AppNavGroup[] = [ /* sidebar footer */ ];
export const <role>User: AppUser = { name, role, org, initials, home, copilot };
```

`home` is the workspace root and is what collapses active-state highlighting.

### 5.6 Two places list every role

Adding a role means updating **both**:

| File | Purpose |
|---|---|
| `src/components/app/company-switcher.tsx` | the `workspaces` array in the sidebar dropdown |
| `src/views/auth/auth.tsx` | the `ROLES` array on the login/register page |

Both hold 11 entries. Keeping them in sync is the only cross-file coupling in the repo.

---

## 6. Widget Families (`src/components/app/widgets.tsx`)

The workspace widgets file carries **four families** that arrived from four different prototype generations. They were merged with **prop unions**, not renames, so every role compiles against the names it was authored with.

| Family | Exports | Used by |
|---|---|---|
| **Card** | `Card`, `Stat`, `Progress`, `Badge`, `GaugeRing`, `PageHeader` | founder, mentor, incubator, ipr-expert |
| **Panel** | `StatCard`, `Panel`, `Chip`, `Bar`, `Spark`, `Avatar`, `ScoreRing` | investor, corporate, government, provider |
| **Intro** | `PageIntro`, `PanelLink` | talent, university |
| **Admin** | `Meter`, `Tag` | admin |

Widgets that are shared between families are not exclusive to one — `Progress` is used by
all eleven roles, `Bar` by eight, `Card` by seven. The table above lists each widget
**once**, under the family that introduced it.

### 6.1 How the unions discriminate

Three widgets are shared by more than one family. Each union uses a **disjoint prop set**
so the correct style is selected with zero ambiguity. Verified against current usage:

| Widget | Discriminator | Count | Resulting style |
|---|---|---|---|
| `Stat` | `tone` is `up`/`down`/`flat` | 33 | admin style — plain-text trend (`text-emerald-600` / `text-rose-600`), optional `icon`, `hint` support, `text-[26px]` |
| | `tone` is `good`/`default`/`warn`/`bad` | 4 | card style — chip delta (`bg-emerald-50`), required `icon`, `text-[1.55rem]` |
| `Panel` | `description` present | 56 | admin style — `rounded-2xl`, `shadow-card`, top-aligned header, description line |
| | `sub` present | 221 | panel style — `rounded-xl`, no shadow, `h2` header |
| | neither | 273 | talent/university style — `rounded-xl`, `shadow-[0_1px_2px_rgba(11,18,32,0.03)]`, compact `h3` header |
| `Bar` | `pct` prop | — | panel style — `h-[6px]`, `barClass` override |
| | `value` + `tone` prop | — | talent/university style — `h-1.5`, tone-mapped fill |
| `Avatar` | `label` prop | — | panel style — `rounded-lg bg-ink/[0.06]` |
| | `name` prop | — | talent/university style — initials derived from the name |

`StatCard` is a separate export (not a union of `Stat`) and takes `deltaGood`/`sub` **or** `hint`/`up`.

### 6.2 Rule for future merges

When a new role arrives with its own widget family:

1. If its widget name is **unused** → add it to `widgets.tsx` as a new export.
2. If its widget name **collides** → union the props, keyed on a prop set that is **disjoint** from every existing family.
3. Never rename an existing export — a rename would touch every call site in the role that owns it.
4. If the new family needs a new CSS token, add it to `@theme` in `globals.css`.

---

## 7. Shared Components (`src/components`)

Twenty-one files, grouped by concern. This is the smallest layer and the only one a new contributor should need to touch rarely.

| Group | Files | Purpose |
|---|---|---|
| **Primitives** | `ui.tsx` | `Logo`, `Wordmark`, `Container`, `Eyebrow`, `SectionHead`, `ButtonLink`, `ArrowGlyph` |
| **Motion** | `motion.tsx` | `Reveal` and friends — scroll-triggered entrance animations |
| **Site chrome** | `site/navbar.tsx`, `site/footer.tsx`, `site/mobile-menu.tsx`, `site/nav-data.ts` | Public-site navigation |
| **App chrome** | `app/app-shell.tsx`, `app/topbar.tsx`, `app/company-switcher.tsx`, `app/widgets.tsx`, `app/boards.tsx` | Workspace chrome + widgets |
| **Directory** | `directory/filter-bar.tsx` | Search / filter controls for `explore/*` |
| **Solution** | `solution/solution-view.tsx`, `solution/solution-hero.tsx`, `solution/sections.tsx`, `solution/types.ts` | The data-driven solution template |
| **Page pieces** | `cta.tsx`, `page-hero.tsx`, `trust-strip.tsx`, `startup-art.tsx`, `soon.tsx` | Reusable page furniture |

### 7.1 `cn()` — the className helper

`src/lib/utils.ts` is one function, and it is used everywhere:

```ts
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
```

Tailwind v4 does not ship `tailwind-merge`/`clsx` in this template; `cn` is a lightweight conditional join. Components use it to layer variant classes:

```tsx
className={cn(
  "text-[13px] font-medium transition-colors",
  exact ? "bg-accent-soft text-accent" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
)}
```

### 7.2 Component API notes

- `Wordmark({ className?, dark? })` — `dark` renders the wordmark for a dark panel (used by the auth brand column).
- `ButtonLink({ href, variant, size, arrow, className, children })` — `variant` is `primary | secondary | ghost`; `size` is `sm | md | lg`; `arrow` renders the trailing glyph.
- `AppTopbar({ title, userName, initials, role?, onMenu })` — `role` is optional; when absent the topbar shows the plan label instead.
- `CompanySwitcher({ currentName?, currentRole?, initials, org?, role? })` — accepts either spelling of the identity props.
- `soon.tsx` exports a named `Soon` (and re-exports it as default). The decorative SVG motif is inlined in that file so `startup-art.tsx` stays a single-purpose module.

---

## 8. Persistence (`src/db`)

Two files, deliberately minimal — the schema is a **blank canvas** for this template.

### 8.1 The pool

`src/db/index.ts` creates a `pg` Pool and hands it to Drizzle, with a dev-mode global so hot reloads don't exhaust connections:

```ts
const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({ connectionString: databaseUrl });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
```

`DATABASE_URL` is **required at import time** — the module throws if it is missing. That is why `npm run build` fails without a `.env`; it is working as designed, not a bug.

### 8.2 The schema entrypoint

`src/db/schema.ts` is intentionally empty so `npx drizzle-kit push` works out of the box:

```ts
export {};
```

Add your tables here and Drizzle picks them up via `drizzle.config.json` (`"schema": "./src/db/schema.ts"`).

### 8.3 The health probe

`src/app/api/health/route.ts` is the reference example of a route handler:

```ts
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
```

Note `force-dynamic` — the health check must never be cached.

---

## 9. Design System

### 9.1 Colour tokens (Tailwind v4 `@theme`)

Defined once in `src/app/globals.css`, consumed everywhere as `bg-accent`, `text-ink`, `border-line`, etc.

| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#0b1220` | Primary text / deep brand |
| `--color-accent` | `#3157e8` | Signature blue — CTAs, active states |
| `--color-accent-deep` | `#2444c4` | Hover / pressed |
| `--color-accent-soft` | `#edf1fe` | Tinted backgrounds |
| `--color-accent-mist` | `#f4f7ff` | Faintest wash |
| `--color-accent-100…500` | `#e2e9fe`…`#4767ec` | Supportive accent steps (fills, rings, borders) |
| `--color-line` | `#e5e7eb` | Hairline borders |
| `--color-soft` | `#f8fafc` | Page background |
| `--color-rise` / `--color-rise-tint` | `#059669` / `#ecfdf5` | Positive signal |
| `--color-amber-dim` / `--color-amber-tint` | `#b45309` / `#fffbeb` | Caution signal |
| `--shadow-soft` | 2-layer | Subtle hover elevation |
| `--shadow-card` | 2-layer | Card elevation (admin panels) |
| `--shadow-lift` | 2-layer | Raised overlay (toasts) |

Because these are CSS custom properties in `@theme`, **rebranding is a one-block edit** — no component changes.

### 9.2 Typography

`next/font/google` Inter is loaded in the root layout and exposed as `--font-inter`, which `--font-sans` consumes. `display: "swap"` avoids blocking paint.

JetBrains Mono is **self-hosted** via `@fontsource-variable/jetbrains-mono` (not `next/font/google` — the Google Fonts fetch is unreliable in this environment and fails the build). It is exposed as `--font-mono` and used by the workspace screens for data readouts, chips, timestamps and metric labels.

Headings use a consistent recipe:

```
text-balance  ·  clamp(1.9rem, 3.6vw, 2.9rem)  ·  font-semibold
leading-[1.08]  ·  tracking-[-0.025em]  ·  text-ink
```

Body copy: `text-pretty text-[17px] leading-relaxed text-slate-500`.

### 9.3 Motion

Custom keyframes live in `globals.css` and are wired to utility classes:

| Class | Animation | Used for |
|---|---|---|
| `.anim-marquee` | `marquee` 46s linear infinite | logo/partners strip (pauses on hover) |
| `.anim-float` | `float-soft` 7s ease-in-out | floating artwork |
| `.link-flow` | `dashflow` 1.5s linear | marching ants along ecosystem connector SVG paths |
| `.ping-dot` | `ping-soft` 2.4s | live pulse on the Copilot button |

Framer Motion handles scroll-triggered reveals via `src/components/motion.tsx` → the `Reveal` component, which `SectionHead` already wraps every section title in.

### 9.4 Texture utilities

- `.bg-nodegrid` — 26px radial dot grid in accent tint, used behind heroes with a radial mask
- `.bg-dotgrid` — 22px grid in ink tint
- `.dot-grid` — 22px grid in ink tint (surface-dot variant, used by the auth panel)
- `.dot-grid-dark` — 26px grid in white tint (dark panel)
- `.mask-x-fade` — horizontal fade mask for marquees and carousels
- `.no-scrollbar` — hide the scrollbar but keep the element scrollable

---

## 10. Request Flow

### 10.1 Public page

```
Browser
  → GET /explore/startups
    → src/app/(public)/explore/startups/page.tsx
      → (public)/layout.tsx  → Navbar, Footer
        → views/explore/startups/startups.tsx  (StartupsView)
          → views/explore/startups/components/directory-client.tsx  ("use client")
            → components/directory/filter-bar.tsx
          → constants/startups.ts
```

### 10.2 Workspace page

```
Browser
  → GET /mentor/startups/matching
    → src/app/(app)/mentor/startups/matching/page.tsx
      → (app)/layout.tsx  → empty fragment
        → users/mentor/mentor.tsx  (MentorShell)
          → components/app/app-shell.tsx   ("use client", usePathname)
            → components/app/topbar.tsx, company-switcher.tsx
          → users/mentor/components/startups/matching.tsx
```

The founder variant diverges at the shell step:

```
Browser
  → GET /founder/funding/matching
    → src/app/(app)/founder/funding/matching/page.tsx
      → users/startup/startup.tsx  (FounderShell)
        → users/startup/components/app-shell/sidebar.tsx  (FounderSidebar)
        → components/app/topbar.tsx
        → users/startup/components/funding/matching.tsx
```

### 10.3 API route

```
GET /api/health
  → src/app/api/health/route.ts
    → db.execute(sql`select 1`)
      → pg Pool → PostgreSQL
```

---

## 11. Conventions & Rules

Follow the codebase and it stays coherent.

1. **Routes stay thin.** A `page.tsx` declares `metadata` and renders one component. No JSX beyond a single wrapper.
2. **Public screens live in `src/views`, not `src/app`.** `src/app` holds routing only.
3. **Data goes in `constants/`.** If a screen has an array of content, it belongs in a typed constants file, not inline in the component.
4. **Role workspaces live in `src/users/<role>/`.** Never put a role screen in `src/views`.
5. **New role screens use the existing shell.** Import `<Role>Shell` and drop the screen inside it.
6. **Reuse the shell components.** `Container`, `SectionHead`, `Eyebrow`, `ButtonLink`, `Reveal` are the house style — use them instead of hand-rolled `<div>`s with the same spacing.
7. **Colour comes from tokens.** Use `accent`, `ink`, `line`, `soft`. Raw hex is a smell.
8. **Mark unbuilt screens `soon`.** `AppNavSub.soon` renders a "Soon" chip in the sidebar.
9. **Server components by default.** Add `"use client"` only when you need state, effects, or browser APIs.
10. **Path alias is `@/*` → `./src/*`.** Never write `../../..` chains.
11. **Env vars fail loudly.** `src/db/index.ts` throws on a missing `DATABASE_URL` by design — don't add silent fallbacks.
12. **Don't fork the sidebar.** If you need to change workspace navigation behaviour, change `src/components/app/app-shell.tsx` — and remember the founder still uses the forked `FounderSidebar` until it is migrated (§5.3).
13. **Adding a role touches three files:** `src/users/<role>/` + `src/app/(app)/<role>/`, the `workspaces` array in `company-switcher.tsx`, and the `ROLES` array in `views/auth/auth.tsx`.
14. **Pin dependency versions.** `next`, `eslint-config-next` and `drizzle-kit` are pinned to exact versions and must move together. A bare `npm install <pkg>` can silently drift them and break the lint config — see `WORKING-NOTES.md` §1.

---

## 12. How to Add Things

### 12.1 A new public page

```
1. src/views/<section>/constants/<name>.ts     ← typed data
2. src/views/<section>/components/<piece>.tsx  ← optional pieces
3. src/views/<section>/<section>.tsx           ← export the View
4. src/app/(public)/<route>/page.tsx           ← metadata + render the View
```

### 12.2 A new workspace screen

```
1. src/users/<role>/components/<feature>/<screen>.tsx   ← the screen
2. src/app/(app)/<role>/<route>/page.tsx                ← wrap in <Role>Shell
3. src/users/<role>/constants/<role>-nav.ts              ← add a nav entry (soon: true if stubbed)
```

### 12.3 A new role

```
1. src/users/<role>/constants/<role>-nav.ts   ← nav + utility + bottom + user identity
2. src/users/<role>/<role>.tsx                ← export <Role>Shell, pass nav into AppShell
3. src/users/<role>/components/**              ← screens
4. src/app/(app)/<role>/**/page.tsx            ← routes
5. src/components/app/company-switcher.tsx     ← add to the `workspaces` array
6. src/views/auth/auth.tsx                     ← add to the `ROLES` array
```

`src/components/app/app-shell.tsx` needs no changes — the new shell is a thin adapter. Follow `src/users/mentor/mentor.tsx` as the reference implementation, and reuse the `AppNavGroup` / `AppNavSub` / `AppUser` types from `@/components/app/app-shell` rather than declaring your own.

### 12.4 A new database table

```
1. src/db/schema.ts                            ← pgTable definitions
2. npx drizzle-kit generate                     ← write a migration
3. npx drizzle-kit push                         ← apply it
```

---

## 13. Tooling Reference

| File | Purpose |
|---|---|
| `next.config.ts` | Empty — Turbopack defaults, no custom config needed |
| `tsconfig.json` | `strict: true`, `noEmit: true`, `@/*` → `./src/*` alias |
| `postcss.config.mjs` | Single plugin: `@tailwindcss/postcss` |
| `eslint.config.mjs` | `eslint-config-next` flat config |
| `drizzle.config.json` | PostgreSQL dialect, schema at `./src/db/schema.ts` |
| `package.json` | `dev` · `build` · `start` · `lint` · `typecheck` · `predev` |
| `scripts/prune-dev-cache.mjs` | Guards against Turbopack dev-cache bloat (§14.2) |

---

## 14. Operational Notes

### 14.1 Never run `next build` while `next dev` is running

Both write to the same `.next/` directory. A production build overwrites the dev server's
route manifest, and the dev server's route tree goes stale in memory — the symptom is
that **every route deeper than two segments returns 404** while the shallow ones work.

If you need to verify a production build, stop the dev server first.

### 14.2 The Turbopack dev cache grows without bound

Turbopack writes a **~250 MB `.sst` blob per recompile** into `.next/dev/cache/turbopack`
and never prunes them. With 500+ routes — especially after a full route sweep — that
directory passes 15 GB and the dev server starts thrashing: pages take 45 s and the
process balloons past 18 GB of RSS.

`scripts/prune-dev-cache.mjs` (wired as `predev`) deletes the cache when it exceeds 2 GB.
It only fires on a genuinely bloated cache, so normal incremental development keeps the
fast cache.

**Symptoms of a bloated cache:** pages timing out at 45 s, dev server RSS above ~5 GB,
`.next` on disk above ~2 GB.

---

## 15. Dependency Direction (import rules)

```
app ──────────► views / users ──────────► components ──────────► lib
 │                    │                        │
 └────────────────────┴────────────────────────┘
                     │
                     ▼
                    db
```

- `app` may import from `views`, `users`, `components`, `db`.
- `views` and `users` may import from `components`, `lib`.
- `components` may import from `lib`, `db`.
- `lib` and `db` import nothing local.
- **`views` and `users` never import each other** — the two surfaces are independent.

---

## 16. Quick Reference Card

```
┌─ PUBLIC SITE ─────────────────────────────────────────────┐
│  route      src/app/(public)/<route>/page.tsx            │
│  view       src/views/<section>/<section>.tsx             │
│  data       src/views/<section>/constants/*.ts            │
│  chrome     src/components/site/*                         │
├─ WORKSPACE ───────────────────────────────────────────────┤
│  route      src/app/(app)/<role>/<route>/page.tsx        │
│  shell      src/users/<role>/<role>.tsx                   │
│  nav data   src/users/<role>/constants/<role>-nav.ts      │
│  screen     src/users/<role>/components/<feature>/*.tsx   │
│  chrome     src/components/app/app-shell.tsx              │
├─ SHARED ──────────────────────────────────────────────────┤
│  ui         src/components/ui.tsx                         │
│  motion     src/components/motion.tsx                     │
│  widgets    src/components/app/widgets.tsx  (4 families)  │
│  cta/hero   src/components/{cta,page-hero,trust-strip}    │
│  util       src/lib/utils.ts → cn()                       │
├─ DATA ───────────────────────────────────────────────────┤
│  pool       src/db/index.ts → db, pool                     │
│  schema     src/db/schema.ts                              │
│  env        DATABASE_URL (required)                       │
└───────────────────────────────────────────────────────────┘
```
