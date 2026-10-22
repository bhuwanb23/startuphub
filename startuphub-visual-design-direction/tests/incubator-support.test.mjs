/**
 * Incubator support feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All five support routes exist and are wired to real components.
 *   2. Sidebar navigation points at routes that exist (no dead links).
 *   3. Each screen carries enough content to be a real product surface.
 *   4. The shared dataset stays internally consistent — every startup
 *      resolves to the portfolio, every investor and expert resolves to
 *      the public catalogue, and the counsel capacity matches what the
 *      resources pages already promise.
 *
 * The HTTP smoke test skips itself when the dev server is not running.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(app, p), "utf8");

/* Recursively collect every source file under `dir`. */
function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

/* ── The five support screens ─────────────────────────────────── */
const routes = {
  "/incubator/support": {
    page: "src/app/(app)/incubator/support/page.tsx",
    component: "src/users/incubator/components/support/support.tsx",
    export: "Support",
  },
  "/incubator/support/funding": {
    page: "src/app/(app)/incubator/support/funding/page.tsx",
    component: "src/users/incubator/components/support/funding.tsx",
    export: "FundingSupport",
  },
  "/incubator/support/ipr": {
    page: "src/app/(app)/incubator/support/ipr/page.tsx",
    component: "src/users/incubator/components/support/ipr.tsx",
    export: "IprSupport",
  },
  "/incubator/support/market": {
    page: "src/app/(app)/incubator/support/market/page.tsx",
    component: "src/users/incubator/components/support/market.tsx",
    export: "MarketSupport",
  },
  "/incubator/support/investors": {
    page: "src/app/(app)/incubator/support/investors/page.tsx",
    component: "src/users/incubator/components/support/investors.tsx",
    export: "InvestorConnections",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator support routes", () => {
  for (const [href, files] of Object.entries(routes)) {
    test(`${href} has a page file that renders its component`, () => {
      assert.ok(existsSync(join(app, files.page)), `missing page: ${files.page}`);
      const src = read(files.page);
      assert.match(src, /export default function Page/, "page must default-export Page");
      assert.match(src, /<IncubatorShell/, "page must wrap in IncubatorShell");
      assert.match(src, /export const metadata/, "page must declare metadata");
      assert.match(
        src,
        new RegExp(`from "${files.component.replace(/^src\//, "@/").replace(/\.tsx$/, "")}"`),
        "page must import its own component",
      );
    });

    test(`${href} component exports and uses shared layout widgets`, () => {
      assert.ok(existsSync(join(app, files.component)), `missing component: ${files.component}`);
      const src = read(files.component);
      assert.match(
        src,
        new RegExp(`export function ${files.export}\\b`),
        `component must export ${files.export}`,
      );
      assert.match(src, /PageHeader/, "every screen needs a PageHeader");
      assert.match(
        src,
        /from "@\/components\/app\/widgets"/,
        "must use the house widget set",
      );
      assert.match(src, /^"use client";/m, "interactive screens must be client components");
    });

    test(`${href} has at least 8 content sections`, () => {
      const src = read(files.component);
      const sections = (src.match(/<Card[\s>]/g) ?? []).length;
      assert.ok(sections >= 8, `${href} has ${sections} sections, expected >= 8`);
    });
  }
});

describe("incubator support sidebar", () => {
  const nav = read(NAV);
  const start = nav.indexOf('label: "Startup Support"');
  const end = nav.indexOf('label: "Events & Workshops"');
  assert.ok(start > -1 && end > start, "could not locate the Startup Support nav group");
  /* Only the group's own `subs` — the group-level href sits before them. */
  const group = nav.slice(start, end);
  const subs = group.slice(group.indexOf("subs: ["));
  const hrefs = [...subs.matchAll(/href: "(\/incubator\/support[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the support group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      if (href === "/incubator/support") continue; // the group landing
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every support sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("no support sub-page is flagged 'soon'", () => {
    assert.ok(!/soon:\s*true/.test(subs), "a support sub-page is still flagged 'soon'");
  });

  test("the four support links are distinct", () => {
    assert.equal(new Set(hrefs).size, hrefs.length, `duplicate support hrefs: ${hrefs.join(", ")}`);
    assert.equal(hrefs.length, 4, `expected 4 support links, found ${hrefs.length}`);
  });

  test("no stale support anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("support#")) {
        offenders.push(file.slice(app.length + 1));
      }
    }
    assert.deepEqual(
      offenders,
      [],
      `found stale #anchors in:\n${offenders.join("\n")}`,
    );
  });
});

describe("incubator support data", () => {
  let data, portfolio, investors, catalogue, resources;

  before(async () => {
    data = await import("../src/users/incubator/constants/support-data.ts");
    portfolio = (await import("../src/users/incubator/constants/startups-data.ts")).PORTFOLIO;
    investors = (await import("../src/views/explore/investors/constants/investors.ts")).investors;
    catalogue = (await import("../src/views/explore/mentors/constants/mentors.ts")).mentors;
    resources = await import("../src/users/incubator/constants/resources-data.ts");
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      kpis: data.SUPPORT_KPIS.map((k) => k.tone),
      pillars: data.PILLAR_COVERAGE.map((p) => p.tone),
      queue: data.SUPPORT_QUEUE.map((q) => q.tone),
      team: data.SUPPORT_TEAM.map((t) => t.tone),
      interventions: data.SUPPORT_INTERVENTIONS.map((s) => s.tone),
      funding: data.FUNDING_STATUS.map((f) => f.tone),
      deals: data.FUNDING_DEALS.map((d) => d.tone),
      grants: data.GRANT_SCHEMES.map((g) => g.tone),
      blockers: data.FUNDING_BLOCKERS.map((b) => b.tone),
      fundingInterventions: data.FUNDING_INTERVENTIONS.map((f) => f.tone),
      calendar: data.FUNDING_CALENDAR.map((c) => c.tone),
      ip: data.IP_STATUS.map((i) => i.tone),
      ipPortfolio: data.IP_PORTFOLIO.map((p) => p.tone),
      ipRisks: data.IP_RISKS.map((r) => r.tone),
      ipExperts: data.IP_EXPERTS.map((e) => e.tone),
      counsel: data.COUNSEL_SLOTS.map((c) => c.tone),
      deadlines: data.IP_DEADLINES.map((d) => d.tone),
      market: data.MARKET_READINESS.map((m) => m.tone),
      pilots: data.CORPORATE_PILOTS.map((p) => p.tone),
      gov: data.GOV_OPPORTUNITIES.map((g) => g.tone),
      marketBlockers: data.MARKET_BLOCKERS.map((b) => b.tone),
      intros: data.MARKET_INTROS.map((m) => m.tone),
      demand: data.SECTOR_DEMAND.map((s) => s.tone),
      matches: data.INVESTOR_MATCHES.map((m) => m.tone),
      pipeline: data.INTRO_PIPELINE.map((p) => p.tone),
      investorDemand: data.INVESTOR_DEMAND.map((d) => d.tone),
      relationships: data.RELATIONSHIPS.map((r) => r.tone),
    };
    for (const [list, tones] of Object.entries(lists)) {
      for (const tone of tones) {
        assert.ok(
          allowed.has(tone),
          `unknown tone "${tone}" in ${list} — Badge accepts ${[...allowed].join(", ")}`,
        );
      }
    }
  });

  test("the funding view covers the whole tracked portfolio", () => {
    assert.equal(
      data.FUNDING_STATUS.length,
      portfolio.length,
      `funding covers ${data.FUNDING_STATUS.length} of ${portfolio.length} startups`,
    );
    for (const p of portfolio) {
      assert.ok(
        data.FUNDING_STATUS.some((f) => f.startupSlug === p.slug),
        `${p.name} is missing from the funding view`,
      );
    }
  });

  test("the IPR and market views cover the whole tracked portfolio", () => {
    assert.equal(data.IP_STATUS.length, portfolio.length);
    assert.equal(data.MARKET_READINESS.length, portfolio.length);
    for (const p of portfolio) {
      assert.ok(data.IP_STATUS.some((i) => i.startupSlug === p.slug), `${p.name} missing from IPR`);
      assert.ok(
        data.MARKET_READINESS.some((m) => m.startupSlug === p.slug),
        `${p.name} missing from market support`,
      );
    }
  });

  test("the derived views agree with the portfolio record", () => {
    for (const p of portfolio) {
      const f = data.FUNDING_STATUS.find((x) => x.startupSlug === p.slug);
      assert.equal(f.stage, p.stage, `${p.name} stage drifted`);
      assert.equal(f.readiness, p.readiness, `${p.name} readiness drifted`);
      assert.equal(f.health, p.health, `${p.name} health drifted`);
      assert.equal(f.raised, p.raised, `${p.name} raised amount drifted`);
      assert.equal(f.sector, p.sector, `${p.name} sector drifted`);
    }
  });

  test("every startup referenced in the support data exists in the portfolio", () => {
    const names = new Set(portfolio.map((s) => s.name));
    const slugs = new Set(portfolio.map((s) => s.slug));
    const lists = {
      queue: data.SUPPORT_QUEUE,
      interventions: data.SUPPORT_INTERVENTIONS,
      deals: data.FUNDING_DEALS,
      fundingInterventions: data.FUNDING_INTERVENTIONS,
      ipRisks: data.IP_RISKS,
      deadlines: data.IP_DEADLINES,
      pilots: data.CORPORATE_PILOTS,
      intros: data.MARKET_INTROS,
      matches: data.INVESTOR_MATCHES,
      pipeline: data.INTRO_PIPELINE,
    };
    for (const [list, rows] of Object.entries(lists)) {
      for (const r of rows) {
        assert.ok(names.has(r.startup), `unknown startup "${r.startup}" in ${list}`);
        assert.ok(slugs.has(r.startupSlug), `unknown slug "${r.startupSlug}" in ${list}`);
      }
    }
  });

  test("every investor referenced exists in the public catalogue", () => {
    const slugs = new Set(investors.map((i) => i.slug));
    const names = new Set(investors.map((i) => i.name));
    for (const list of [data.INVESTOR_MATCHES, data.INTRO_PIPELINE, data.RELATIONSHIPS]) {
      for (const r of list) {
        assert.ok(slugs.has(r.investorSlug), `unknown investor "${r.investorSlug}"`);
        assert.ok(names.has(r.investor), `unknown investor name "${r.investor}"`);
      }
    }
  });

  test("the relationship list covers the whole investor network", () => {
    assert.equal(data.RELATIONSHIPS.length, investors.length);
    for (const i of investors) {
      assert.ok(
        data.RELATIONSHIPS.some((r) => r.investorSlug === i.slug),
        `${i.name} has no relationship record`,
      );
    }
  });

  test("every IPR expert exists in the public mentor catalogue", () => {
    const slugs = new Set(catalogue.map((m) => m.slug));
    const names = new Set(catalogue.map((m) => m.name));
    for (const e of data.IP_EXPERTS) {
      assert.ok(slugs.has(e.slug), `unknown mentor "${e.slug}"`);
      assert.ok(names.has(e.name), `unknown mentor name "${e.name}"`);
    }
  });

  test("counsel capacity matches what the resources pages promise", () => {
    const route = resources.APPROVAL_ROUTES.find((r) => r.category === "Legal & IP");
    assert.ok(route, "the resources data has no Legal & IP approval route");
    const line = resources.CREDIT_LINES.find((c) => c.id === "cl-legal");
    assert.ok(line, "the resources data has no pro bono legal credit line");

    /* Four slots a month, every month, and the same number of bookings. */
    for (const c of data.COUNSEL_SLOTS) {
      assert.equal(c.slots, line.granted, `${c.month} has ${c.slots} slots, the line grants ${line.granted}`);
      assert.ok(c.booked <= c.slots, `${c.month} is overbooked`);
      assert.ok(c.booked >= 0, `${c.month} has negative bookings`);
    }
    const totalSlots = data.COUNSEL_SLOTS.reduce((s, c) => s + c.slots, 0);
    assert.equal(totalSlots, 12, `the quarter offers ${totalSlots} slots, expected 12`);
  });

  test("the filing portfolio adds up to the filings held", () => {
    const total = data.IP_PORTFOLIO.reduce((s, p) => s + p.count, 0);
    const share = data.IP_PORTFOLIO.reduce((s, p) => s + p.share, 0);
    assert.equal(total, 38, `the filing portfolio totals ${total}`);
    assert.equal(share, 100, `filing shares total ${share}, expected 100`);
  });

  test("per-startup filing counts add up to the filing portfolio", () => {
    const patents = data.IP_STATUS.reduce((s, i) => s + i.patents, 0);
    const trademarks = data.IP_STATUS.reduce((s, i) => s + i.trademarks, 0);
    const patentSlice = data.IP_PORTFOLIO.find((p) => p.type === "Patents");
    const tmSlice = data.IP_PORTFOLIO.find((p) => p.type === "Trademarks");
    assert.equal(patents, patentSlice.count, `patents total ${patents}, portfolio says ${patentSlice.count}`);
    assert.equal(
      trademarks,
      tmSlice.count,
      `trademarks total ${trademarks}, portfolio says ${tmSlice.count}`,
    );
  });

  test("scores and percentages stay within range", () => {
    for (const f of data.FUNDING_STATUS) assert.ok(f.readiness >= 0 && f.readiness <= 100);
    for (const m of data.MARKET_READINESS) assert.ok(m.readiness >= 0 && m.readiness <= 100);
    for (const e of data.IP_EXPERTS) assert.ok(e.match >= 0 && e.match <= 100);
    for (const m of data.INVESTOR_MATCHES) assert.ok(m.score >= 0 && m.score <= 100);
    for (const r of data.RELATIONSHIPS) assert.ok(r.strength >= 0 && r.strength <= 100);
    for (const d of data.INVESTOR_DEMAND) assert.ok(d.interest >= 0 && d.interest <= 100);
    for (const s of data.SECTOR_DEMAND) assert.ok(s.interest >= 0 && s.interest <= 100);
    for (const t of data.SUPPORT_TEAM) assert.ok(t.load >= 0 && t.load <= 100);
  });

  test("the introduction funnel narrows at every step", () => {
    const f = data.INTRO_FUNNEL;
    assert.ok(f.requested > f.delivered, "delivered exceeds requested");
    assert.ok(f.delivered > f.met, "met exceeds delivered");
    assert.ok(f.met > f.termSheet, "term sheets exceed meetings");
    assert.ok(f.termSheet > 0, "no term sheets at all");
  });

  test("the pipeline never claims more meetings than the funnel allows", () => {
    const total = data.INTRO_PIPELINE.reduce((s, p) => s + p.meetings, 0);
    assert.ok(
      total <= data.INTRO_FUNNEL.met,
      `the pipeline records ${total} meetings, the funnel allows ${data.INTRO_FUNNEL.met}`,
    );
  });

  test("grant schemes never report more applications than eligible startups", () => {
    for (const g of data.GRANT_SCHEMES) {
      assert.ok(g.applied <= g.eligible, `${g.name} has ${g.applied} applications for ${g.eligible} eligible`);
      assert.ok(g.eligible <= portfolio.length, `${g.name} claims more eligible startups than exist`);
    }
  });

  test("deadlines and blockers stay positive", () => {
    for (const d of data.IP_DEADLINES) assert.ok(d.days > 0, `${d.filing} has no time left`);
    for (const d of data.FUNDING_DEALS) assert.ok(d.days >= 0, `${d.startup} has a negative runway`);
    for (const b of data.FUNDING_BLOCKERS) assert.ok(b.startups > 0, `${b.reason} claims no startups`);
    for (const b of data.MARKET_BLOCKERS) assert.ok(b.startups > 0, `${b.blocker} claims no startups`);
  });

  test("ids are unique across every support list", () => {
    const lists = {
      queue: data.SUPPORT_QUEUE.map((x) => x.id),
      interventions: data.SUPPORT_INTERVENTIONS.map((x) => x.id),
      deals: data.FUNDING_DEALS.map((x) => x.id),
      fundingInterventions: data.FUNDING_INTERVENTIONS.map((x) => x.id),
      ipRisks: data.IP_RISKS.map((x) => x.id),
      deadlines: data.IP_DEADLINES.map((x) => x.id),
      pilots: data.CORPORATE_PILOTS.map((x) => x.id),
      intros: data.MARKET_INTROS.map((x) => x.id),
      matches: data.INVESTOR_MATCHES.map((x) => x.id),
      pipeline: data.INTRO_PIPELINE.map((x) => x.id),
    };
    for (const [list, ids] of Object.entries(lists)) {
      assert.equal(new Set(ids).size, ids.length, `duplicate id in ${list}`);
    }
  });

  test("every support pillar is covered by the overview", () => {
    const pillars = new Set(data.PILLAR_COVERAGE.map((p) => p.pillar));
    for (const p of ["Funding", "IPR", "Market", "Investor"]) {
      assert.ok(pillars.has(p), `the overview does not cover the ${p} pillar`);
    }
    for (const q of data.SUPPORT_QUEUE) {
      assert.ok(pillars.has(q.pillar), `queue item ${q.id} has an unknown pillar`);
    }
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  for (const href of Object.keys(routes)) {
    test(`${href} returns 200 with content`, async (t) => {
      let res;
      try {
        res = await fetch(`http://localhost:3000${href}`, {
          signal: AbortSignal.timeout(30000),
        });
      } catch {
        t.skip("dev server not running on :3000");
        return;
      }
      assert.equal(res.status, 200);
      const body = await res.text();
      assert.ok(body.length > 5000, `${href} rendered suspiciously little`);
    });
  }
});
