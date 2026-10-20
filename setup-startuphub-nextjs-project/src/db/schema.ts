import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/* Featured startups shown in the editorial showcase grid              */
/* ------------------------------------------------------------------ */
export const startups = pgTable("startups", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  stage: text("stage").notNull(),
  location: text("location").notNull(),
  tagline: text("tagline").notNull(),
  raised: text("raised").notNull(),
  initials: text("initials").notNull(),
  featured: boolean("featured").notNull().default(false),
  signal: text("signal").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* ------------------------------------------------------------------ */
/* Live opportunities: funding, incubation, challenges, grants         */
/* ------------------------------------------------------------------ */
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // funding | incubation | challenge
  title: text("title").notNull(),
  org: text("org").notNull(),
  amount: text("amount").notNull(),
  deadline: text("deadline").notNull(),
  location: text("location").notNull().default("Global"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* ------------------------------------------------------------------ */
/* Market intelligence sectors powering the dashboard fragment         */
/* ------------------------------------------------------------------ */
export const marketSectors = pgTable("market_sectors", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  descriptor: text("descriptor").notNull(),
  marketSize: text("market_size").notNull(),
  yoyGrowth: text("yoy_growth").notNull(),
  activeStartups: integer("active_startups").notNull(),
  capitalDeployed: text("capital_deployed").notNull(),
  ipFilings: integer("ip_filings").notNull(),
  momentum: text("momentum").notNull().default("Accelerating"),
  spark: jsonb("spark").$type<number[]>().notNull(),
  trends: jsonb("trends").$type<string[]>().notNull(),
  emerging:
    jsonb("emerging").$type<{ name: string; detail: string }[]>().notNull(),
});

/* ------------------------------------------------------------------ */
/* Founder success stories                                             */
/* ------------------------------------------------------------------ */
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  quote: text("quote").notNull(),
  founder: text("founder").notNull(),
  role: text("role").notNull(),
  startup: text("startup").notNull(),
  sector: text("sector").notNull(),
  metricLabel: text("metric_label").notNull(),
  metricValue: text("metric_value").notNull(),
  timeline: text("timeline").notNull(),
});

/* ------------------------------------------------------------------ */
/* Waitlist / journey intake from the CTA band                         */
/* ------------------------------------------------------------------ */
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Startup = typeof startups.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type MarketSector = typeof marketSectors.$inferSelect;
export type Story = typeof stories.$inferSelect;
