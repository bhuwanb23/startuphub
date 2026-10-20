# StartupHub — Architecture & Design

How this repository is structured, why, and how to add to it without breaking the pattern.

## 1. Mental model

StartupHub is a **multi-tenant platform**: five audiences (founders, mentors, IPR experts, incubators, investors) each get a role-specific workspace, while the general public browses a marketing and discovery site. The codebase mirrors the split:

- **`src/app`** owns the URL space — routes are thin: metadata + one render.
- **`src/views`** owns public-site screens (marketing, directory, auth).
- **`src/users`** owns role workspaces (startup · mentor · ipr-expert · incubator · investor).
- **`src/components`** owns everything shared (site chrome, app chrome, primitives, motion).
- **`src/db`** owns persistence. **`src/lib`** owns `cn()`.

Dependencies only ever point downward: routes → views/users → components → lib/db.

## 2. Route groups

```
src/app/
├── layout.tsx · globals.css · icon.svg
├── (public)/           ← Navbar + main + Footer chrome
│   ├── page.tsx        ← /            → views/home
│   ├── login/  register/
├── (app)/              ← empty layout (reserved for auth gating)
│   ├── founder/  mentor/  ipr-expert/  incubator/   ← role workspaces
│   └── investor/       ← dashboard · deal-flow/{,screening,matching,watchlist}
│                          portfolio/{,performance} · intelligence
│                          network/founders · meetings · settings
└── api/ health/ waitlist/
```

Workspace routes compose a shell per role:

```tsx
export default function Page() {
  return (
    <InvestorShell title="Deal Flow">
      <DealFlowPipeline />
    </InvestorShell>
  );
}
```

## 3. The view pattern (`src/views/<section>`)

```
<section>.tsx          ← exported View (own data + composition)
components/           ← screen-specific pieces
constants/            ← typed data, never inline in JSX
```

## 4. The workspace pattern (`src/users/<role>`)

```
<role>.tsx                    ← <Role>Shell: thin adapter over AppShell
constants/<role>-nav.ts       ← nav · utility · bottom · user identity
constants/dashboard-data.ts   ← typed seed dataset
components/<feature>/<screen>.tsx
```

Adding a workspace screen = component + route + (optional) nav entry with `soon: true`.

## 5. Shared app chrome (`src/components/app`)

- `app-shell.tsx` — contract: `AppNavSub`, `AppNavGroup`, `AppUser`; 264px fixed
  sidebar, mobile drawer, collapsible groups, `Soon` chips, active-state
  resolution (workspace root only lights on exact match), company switcher,
  per-role Copilot affordance (`user.copilot`).
- `topbar.tsx` — `AppTopbar { title, userName, initials, onMenu }`.
- `company-switcher.tsx` — org identity + workspace switching.
- `widgets.tsx` — `PageIntro`, `StatCard`, `Panel`, `PanelLink`, `Bar`, `Avatar`, `HealthDot`.

## 6. Design system (Tailwind v4 `@theme` in globals.css)

| Token | Value | Role |
|---|---|---|
| `ink` | `#0b1220` | primary text / deep brand |
| `accent` | `#3157e8` | signature blue — CTAs, active states |
| `accent-deep` | `#2444c4` | hover / pressed |
| `accent-soft` | `#edf1fe` | tinted backgrounds |
| `accent-mist` | `#f4f7ff` | faintest wash |
| `line` | `#e5e7eb` | hairline borders |
| `soft` | `#f8fafc` | page background |

Inter via `next/font/google`. Headings: `text-balance` · clamp sizing ·
`font-semibold` · tight tracking. Motion: `Reveal`, `CountUp`, `FadeSwap` from
`src/components/motion.tsx`; easing `cubic-bezier(0.22,1,0.36,1)` — quietly
intelligent, never bouncy. Texture utilities: `bg-grid`, `bg-nodegrid`,
`bg-dotgrid`, `mask-x-fade`, `conn-flow`, `ping-dot`, `anim-float`, `anim-marquee`.

## 7. Conventions

1. Routes stay thin. 2. Public screens in `src/views`, role screens in `src/users`.
3. Data in `constants/`. 4. Reuse shells + primitives. 5. Colour from tokens.
6. Mark unbuilt screens `soon`. 7. Server components by default.
8. Alias `@/*` → `./src/*`. 9. Env vars fail loudly (`DATABASE_URL` required).
10. `views` and `users` never import each other.

## 8. Role workspaces

| Role | Route root | Source dir | Shell | Screens |
|---|---|---|---|---|
| Founder | `/founder` | `src/users/startup/` | `FounderShell` | overview (+ nav stubs) |
| Mentor | `/mentor` | `src/users/mentor/` | `MentorShell` | overview (+ nav stubs) |
| IPR Expert | `/ipr-expert` | `src/users/ipr-expert/` | `IprShell` | overview (+ nav stubs) |
| Incubator | `/incubator` | `src/users/incubator/` | `IncubatorShell` | overview (+ nav stubs) |
| Investor | `/investor` | `src/users/investor/` | `InvestorShell` | **11 full screens** |
