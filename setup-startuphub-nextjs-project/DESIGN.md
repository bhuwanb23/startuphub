# StartupHub — Design System Reference

**Direction:** `WHITE → PREMIUM → INTELLIGENT → CONNECTED → DATA-RICH → MINIMAL → HIGH TRUST`

Stripe-level polish + Linear-level cleanliness. Light, typography-led, restrained
color, real product UI, quiet motion. Never: dark-first themes, neon gradients,
glassmorphism everywhere, cartoon illustration, 30-card feature grids.

## Palette (tokens in `src/app/globals.css`)

| Token          | Value     | Usage                                |
| -------------- | --------- | ------------------------------------ |
| `white`        | `#FFFFFF` | Primary surfaces                     |
| `canvas`       | `#F8FAFC` | Page background alternation          |
| `tint`         | `#F3F6FE` | Subtle blue-tinted section rhythm    |
| `ink`          | `#0B1220` | Primary text + the single dark CTA   |
| slate (Tailwind) | —       | Secondary text (`slate-500/400`)     |
| `line`         | `#E5E7EB` | Hairline borders, no heavy shadows   |
| `brand-600`    | `#3157E8` | **Signature**: buttons, links, active states, key numbers |
| `brand-50…900` | scale     | Tinted chips, hover states, depth    |

Color communicates **meaning**, not decoration.

## Visual signature: The Connected Ecosystem

Node → Connection → Progress. Refined network lines/nodes (never blockchain-y)
appear in the hero product UI, lifecycle track, ecosystem map, CTA motif and
logo mark. Everything in the startup ecosystem is connected — the interface
should keep saying so.

## Typography

- **Inter** (`next/font/google`, tight tracking: `-0.035em` to `-0.045em` on headlines)
- Headlines large/heavy/tight; body slate; eyebrow labels uppercase `0.16em` tracking
- No display/serif mixing, no sci-fi fonts

## Composition rules

- Alternate section backgrounds: white → `tint` → `canvas` → white
- Radius: 8–12px UI, 16–24px product containers
- Shadows: barely-visible elevation (`shadow-card`, `shadow-lift`)
- Editorial rows & asymmetric grids instead of uniform card grids
- Stats: huge typography + whitespace, not colorful stat cards

## Motion philosophy — “quietly intelligent”

- Scroll reveals (`Reveal`), eased number counters (`CountUp`), animated
  connection dashes (`conn-flow`), node pulse rings, hover elevation
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — never bouncy
- No spinning, no particle storms, no constant movement

## Homepage structure

Navbar → Hero (Build. Protect. Validate. Scale. + miniature Startup
Intelligence UI) → Ecosystem stats → Lifecycle (10 interactive stages) →
Platform pillars (Build/Protect/Connect/Fund/Grow) → Ecosystem map → Market
intelligence dashboard → Featured startups → Opportunities → Success stories →
Ink CTA band → Footer.
