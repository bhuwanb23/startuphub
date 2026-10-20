# StartupHub — Connected Startup Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45.2-2591B5?style=for-the-badge)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.20.0-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)

## 🚀 Overview

**StartupHub** is a modern Next.js 16 template that provides a connected ecosystem for startups at every stage — from idea validation through funding and growth. The platform integrates incubation, IPR protection, market access, funding resources, mentorship, and more into a single cohesive experience.

Built with **Next.js 16**, **Tailwind CSS 4**, **Drizzle ORM**, and **PostgreSQL**, this template is production-ready and designed for rapid startup development.

## ✨ Features

- **Modern Tech Stack**: Next.js 16 with App Router, TypeScript, Tailwind CSS 4
- **Database**: PostgreSQL with Drizzle ORM and automatic migrations via drizzle-kit
- **UI Components**: Reusable components with shadcn/ui styling, dark mode support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Environment Configuration**:dotenv-based with required DATABASE_URL
- **Linting & Typechecking**: ESLint and TypeScript configured
- **Beautiful Design**: Custom color tokens, gradients, and micro-interactions

## 🛠️ Available Scripts

In the project directory, you can run:

| Script | Description |
|--------|-------------|
| `npm run dev` | Runs the app in development mode (`next dev`) |
| `npm run build` | Builds the app for production (`next build`) |
| `npm run start` | Runs the built app in production (`next start`) |
| `npm run lint` | Runs ESLint to check for code quality |
| `npm run typecheck` | Runs TypeScript type checking (`tsc --noEmit`) |

## 📦 Project Structure

```
src/
├── app/           # Next.js 13+ App Router pages and layouts
├── components/    # Reusable UI components (shadcn/ui based)
├   ├── ui/        # Base UI components (Button, Container, etc.)
│   ├── cta.tsx    # Call-to-action component
│   ├── motion.tsx # Motion/animation utilities
│   ├── page-hero.tsx # Hero section with animations
│   ├── startup-art.tsx # Startup artwork display
│   └── trust-strip.tsx # Trust badges/strip
│   └── soon.tsx   # "Coming soon" feature preview
├── db/            # Database configuration and schema
│   ├── index.ts   # Drizzle ORM pool with connection pooling
│   └── schema.ts  # Drizzle schema entry point
├── lib/           # Utility functions
│   └── utils.ts   # cn() className merger
├── views/         # View components for different pages
├── users/         # User role directories (mentor, startup, ipr-expert, incubator)
└── styles/        # Global styles and Tailwind config
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ or 20+
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
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/startuphub
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

### Database Migrations

This project uses Drizzle Kit for migrations:

```bash
npx drizzle-kit push    # Push schema changes to your database
npx drizzle-kit generate # Generate new migration files
```

## 🎨 Customization

### Tailwind CSS

The project uses Tailwind CSS 4 with custom theme configurations in `src/app/globals.css`. Brand tokens include:

- `--color-ink`: Deep dark text (`#0b1220`)
- `--color-accent`: Primary blue (`#3157e8`)
- `--color-accent-deep`: Darker blue (`#2444c4`)
- `--color-accent-soft`: Light blue background (`#edf1fe`)
- `--color-accent-mist`: Very light blue (`#f4f7ff`)

### Color Scheme

Custom colors are defined in the CSS and can be modified to match your brand identity.

## 📁 Key Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| `next` | `16.2.6` | React framework |
| `react` | `19.2.6` | UI library |
| `react-dom` | `19.2.6` | DOM rendering |
| `drizzle-orm` | `0.45.2` | ORM for PostgreSQL |
| `pg` | `8.20.0` | PostgreSQL client |
| `tailwindcss` | `4.1.17` | Utility-first CSS |
| `@tailwindcss/postcss` | `4.1.17` | Tailwind plugin for PostCSS |
| `lucide-react` | `^1.59.0` | Icon library |
| `framer-motion` | `^14.3.0` | Animation library |

## 🧪 Development

### TypeScript

Run type checking:
```bash
npm run typecheck
```

### Linting

Run the linter:
```bash
npm run lint
```

### Building for Production

```bash
npm run build
npm run start
```

## 📄 License

This project is [MIT](LICENSE) licensed or specify your license here.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe ORM
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**StartupHub** — One connected ecosystem for every stage of your startup journey.