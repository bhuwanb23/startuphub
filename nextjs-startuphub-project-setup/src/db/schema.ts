import {
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/* Ecosystem headline statistics (10K+ startups, 450+ incubators…) */
export const ecosystemStats = pgTable("ecosystem_stats", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 120 }).notNull(),
  value: doublePrecision("value").notNull(),
  decimals: integer("decimals").notNull().default(0),
  prefix: varchar("prefix", { length: 12 }).default(""),
  suffix: varchar("suffix", { length: 12 }).default(""),
  subtext: varchar("subtext", { length: 160 }).default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* Featured startups for the editorial showcase grid */
export const startups = pgTable("startups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  sector: varchar("sector", { length: 80 }).notNull(),
  stage: varchar("stage", { length: 40 }).notNull(),
  location: varchar("location", { length: 80 }).notNull(),
  description: text("description").notNull(),
  traction: varchar("traction", { length: 120 }).notNull(),
  mark: varchar("mark", { length: 4 }).notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* Live opportunities: funding, incubation, challenges */
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 24 }).notNull(), // Funding | Incubation | Challenge
  title: varchar("title", { length: 160 }).notNull(),
  org: varchar("org", { length: 120 }).notNull(),
  meta: varchar("meta", { length: 120 }).notNull(), // amount / mode
  deadline: varchar("deadline", { length: 60 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

/* Market intelligence snapshots per sector */
export const marketSectors = pgTable("market_sectors", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 60 }).notNull().unique(),
  name: varchar("name", { length: 80 }).notNull(),
  marketSize: varchar("market_size", { length: 40 }).notNull(),
  growth: varchar("growth", { length: 40 }).notNull(),
  activeStartups: integer("active_startups").notNull(),
  insight: text("insight").notNull(),
  sparkline: jsonb("sparkline").notNull(), // number[]
  trends: jsonb("trends").notNull(), // string[]
  emerging: jsonb("emerging").notNull(), // {name, stage}[]
  investment: jsonb("investment").notNull(), // {deals, median, qoq}
  ip: jsonb("ip").notNull(), // {filings, grants, categories:[{label, pct}]}
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
