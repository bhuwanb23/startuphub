# StartupHub — Connected Startup Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.6-087ea4?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45.2-2591B5?style=for-the-badge)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.20.0-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)

> 📐 **New to the codebase?** Read **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — it explains the layer model, the view/workspace patterns, the design system, and the conventions to follow when adding pages.

---

## 🚀 Overview

**StartupHub** is a modern Next.js 16 platform for the connected startup ecosystem — idea validation, incubation, IPR protection, resources, market access, funding, mentorship, and growth in one place.

It serves **two distinct surfaces** from a single codebase:

| Surface | Audience | Chrome | Lives in |
|---|---|---|---|
| **Public site** | Anyone | Top navbar + footer | `src/views/**` |
| **Role workspaces** | Founder · Mentor · IPR Expert · Incubator · Investor | Fixed sidebar + topbar | `src/users/**` |

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, **Drizzle ORM**, and **PostgreSQL**.

---

## ✨ Highlights

- **156 routes** across two route groups — a public marketing/directory site (34) and five role workspaces (122)
- **Clean 4-layer architecture** — routes stay thin, screens own their data, components are shared
- **Data-driven templates** — e.g. one `SolutionView` component renders six audience pages from typed data blobs
- **Role workspaces without duplication** — a shared `AppShell` renders each role's navigation from its own constants file
- **Production-shaped database layer** — Drizzle + `pg` pool with dev-mode connection reuse (kept for a future dynamic deploy; the current static export does not touch it)
- **Custom design system** — brand tokens, motion keyframes, and texture utilities in Tailwind v4 `@theme`
- **Type-safe** — `strict: true`, `eslint-config-next` flat config

---

## 📐 Architecture at a Glance

```
┌───────────────────────────────────────────────────────────────┐
│  L1 · ROUTES          src/app/**/page.tsx                     │
│  Owns: URL, metadata, and nothing else.                       │
├───────────────────────────────────────────────────────────────┤
│  L2 · SURFACES                                                 │
│  ┌────────────────────────┐  ┌────────────────────────────┐  │
│  │ Public site            │  │ Role workspaces            │  │
│  │ src/views/**           │  │ src/users/**               │  │
│  │ marketing + directory  │  │ founder · mentor · ipr-exp │  │
│  │ + solutions + explore  │  │ · incubator · investor     │  │
│  └────────────────────────┘  └────────────────────────────┘  │
│  Owns: screen composition, data, and page-specific sections.  │
├───────────────────────────────────────────────────────────────┤
│  L3 · SHARED UI          src/components/**                   │
│  site/ · app/ · directory/ · solution/ · primitives          │
│  Owns: app shell, navbar, hero, buttons, motion, tokens.      │
├───────────────────────────────────────────────────────────────┤
│  L4 · PERSISTENCE        src/db/**   +  src/lib/**           │
│  Drizzle pool, schema entrypoint, cn() className helper.      │
└───────────────────────────────────────────────────────────────┘
```

Dependencies only ever point **downward**. Full explanation in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---

## 📦 Project Structure

```
startuphub/
├── docs/
│   └── ARCHITECTURE.md          ← layer model, patterns, conventions
├── src/
│   ├── app/                     ← ROUTES ONLY (156 page.tsx files)
│   │   ├── layout.tsx           ← root: <html>, Inter font, metadata
│   │   ├── globals.css          ← Tailwind v4 @theme tokens + keyframes
│   │   ├── (public)/            ← marketing site + directory (34 pages)
│   │   │   ├── layout.tsx       ← Navbar + <main> + Footer
│   │   │   ├── explore/         ← startups, mentors, investors, incubators, resources
│   │   │   ├── solutions/       ← founders, mentors, incubators, investors, corporates, government
│   │   │   ├── intelligence/    ← insights, market
│   │   │   └── …                ← about, contact, faq, news, pricing, ipr, events, …
│   │   ├── (app)/               ← role workspaces (122 pages, empty layout on purpose)
│   │   │   ├── founder/         ← 37 screens
│   │   │   ├── incubator/       ← 32 screens
│   │   │   ├── ipr-expert/      ← 31 screens
│   │   │   ├── mentor/          ← 21 screens
│   │   │   └── investor/        ← entry page
│   │
│   ├── views/                   ← PUBLIC SCREENS (22 sections)
│   │   └── <section>/
│   │       ├── <section>.tsx    ← the exported View
│   │       ├── components/      ← screen-specific pieces
│   │       ├── constants/       ← all the data, typed
│   │       └── hooks/           ← optional local state
│   │
│   ├── users/                   ← ROLE WORKSPACES
│   │   └── <role>/
│   │       ├── <role>.tsx       ← exports the Shell (MentorShell, IprShell, …)
│   │       ├── components/      ← screens grouped by feature
│   │       └── constants/       ← <role>-nav.ts + dashboard-data.ts
│   │
│   ├── components/              ← SHARED (20 files)
│   │   ├── ui.tsx               ← Logo, Container, SectionHead, ButtonLink, …
│   │   ├── motion.tsx           ← Reveal (scroll-triggered animation)
│   │   ├── cta.tsx  page-hero.tsx  trust-strip.tsx  startup-art.tsx  soon.tsx
│   │   ├── site/                ← navbar, footer, mobile-menu, nav-data
│   │   ├── app/                 ← app-shell, topbar, company-switcher, widgets
│   │   ├── directory/           ← filter-bar
│   │   └── solution/            ← solution-view, solution-hero, sections, types
│   │
│   ├── db/
│   │   ├── index.ts             ← pg Pool + drizzle instance
│   │   └── schema.ts            ← schema entrypoint (blank canvas)
│   │
│   └── lib/
│       └── utils.ts             ← cn() className helper
│
├── drizzle.config.json          ← PostgreSQL dialect, schema path
├── next.config.ts               ← Turbopack defaults
├── tailwind (postcss.config.mjs)
└── tsconfig.json                ← strict, @/* → ./src/*
```

---

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Runs the app in development mode (`next dev`) |
| `npm run build` | Builds the app for production (`next build`) |
| `npm run start` | Runs the built app in production (`next start`) |
| `npm run lint` | Runs ESLint (`eslint .`) |
| `npm run typecheck` | Runs TypeScript type checking (`tsc --noEmit`) |

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd startuphub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` in the project root:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/startuphub
   ```
   > `DATABASE_URL` is **required** — `src/db/index.ts` throws on import if it's missing. The `build` script fails without it by design.

4. **Create the database schema**
   ```bash
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

### Database Migrations

Schema lives in `src/db/schema.ts`; `drizzle.config.json` points at it.

```bash
npx drizzle-kit generate   # write a migration file from schema changes
npx drizzle-kit push       # apply schema changes directly to the database
npx drizzle-kit studio     # browse the data in a GUI
```

---

## 🎨 Customization

### Rebrand the colour system

All brand colours are CSS custom properties in `src/app/globals.css` under `@theme`. Change six values — every component follows:

| Token | Default | Role |
|---|---|---|
| `--color-ink` | `#0b1220` | Primary text / deep brand |
| `--color-accent` | `#3157e8` | Signature blue — CTAs, active states |
| `--color-accent-deep` | `#2444c4` | Hover / pressed |
| `--color-accent-soft` | `#edf1fe` | Tinted backgrounds |
| `--color-accent-mist` | `#f4f7ff` | Faintest wash |
| `--color-line` | `#e5e7eb` | Hairline borders |
| `--color-soft` | `#f8fafc` | Page background |

Consume them as Tailwind utilities: `bg-accent`, `text-ink`, `border-line`, `bg-soft`.

### Typography

Inter is loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-inter`. Swap the font and update `--font-sans` in `globals.css`.

### Motion

Keyframes live in `globals.css` and are exposed as utility classes:

| Class | Animation | Used for |
|---|---|---|
| `.anim-marquee` | `marquee` 46s linear infinite | logo / partner strips (pauses on hover) |
| `.anim-float` | `float-soft` 7s ease-in-out | floating artwork |
| `.link-flow` | `dashflow` 1.5s linear | marching ants on ecosystem connector SVGs |
| `.ping-dot` | `ping-soft` 2.4s | live pulse on the Copilot button |

Scroll-triggered reveals use the `Reveal` component from `src/components/motion.tsx` (Framer Motion).

---

## 🧭 Key Patterns

Four patterns cover the entire codebase.

**1 · Thin routes.** A `page.tsx` declares `metadata` and renders one component. Nothing else.
```tsx
export const metadata: Metadata = { title: "Startup Directory — StartupHub" };
export default function Page() { return <StartupsView />; }
```

**2 · The view pattern.** Public screens live in `src/views/<section>/` with `components/`, `constants/`, and optional `hooks/`. **All data lives in `constants/`**, never inline in JSX.

**3 · The workspace pattern.** Role screens live in `src/users/<role>/components/`, wrapped by a role shell that injects that role's nav constants into the shared `AppShell`.
```tsx
<MentorShell title="Startup Matching">
  <MentorMatching />
</MentorShell>
```
> The founder workspace is the one exception — it uses a bespoke `FounderSidebar` instead of the shared `AppShell`. See [docs/ARCHITECTURE.md §5.3](./docs/ARCHITECTURE.md).

**4 · Data-driven templates.** `SolutionView` renders six audience pages from typed `SolutionData` blobs — add an audience with one constants file and one short page.

Full details and rules: **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**

---

## 📁 Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| `next` | `16.2.6` | React framework (App Router, Turbopack) |
| `react` / `react-dom` | `19.2.6` | UI library |
| `drizzle-orm` | `0.45.2` | Type-safe ORM for PostgreSQL |
| `pg` | `8.20.0` | PostgreSQL driver + connection pool |
| `tailwindcss` | `4.1.17` | Utility-first CSS (v4 `@theme` tokens) |
| `@tailwindcss/postcss` | `4.1.17` | Tailwind v4 PostCSS plugin |
| `framer-motion` | `^14.3.0` | Scroll-triggered animation |
| `lucide-react` | `^1.59.0` | Icon library |
| `dotenv` | `17.3.1` | Environment variable loading |

Dev: `typescript` 5.9.3 · `eslint` 9.39.4 · `eslint-config-next` 16.2.6 · `drizzle-kit` 0.31.10 · `@types/*`

---

## 🧪 Development

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run build       # next build
npm run start       # next start
```

---

## 📄 License

[MIT](LICENSE) — or specify your license here.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — the React framework
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS
- [Drizzle ORM](https://orm.drizzle.team/) — type-safe ORM
- [Lucide](https://lucide.dev/) — icons
- [Framer Motion](https://www.framer.com/motion/) — animation

---

**StartupHub** — One connected ecosystem for every stage of your startup journey.
