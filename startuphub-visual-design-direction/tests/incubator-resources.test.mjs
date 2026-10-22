/**
 * Incubator resources feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All four resource routes exist and are wired to real components.
 *   2. Sidebar navigation points at routes that exist (no dead links).
 *   3. Each screen carries enough content to be a real product surface.
 *   4. The shared dataset stays internally consistent — the budget ledger
 *      adds up, credits are never oversold, utilisation stays in range,
 *      and the figures agree with the dashboard the user already sees.
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

/* ── The four resource screens ─────────────────────────────────── */
const routes = {
  "/incubator/resources": {
    page: "src/app/(app)/incubator/resources/page.tsx",
    component: "src/users/incubator/components/resources/resources.tsx",
    export: "Resources",
  },
  "/incubator/resources/requests": {
    page: "src/app/(app)/incubator/resources/requests/page.tsx",
    component: "src/users/incubator/components/resources/requests.tsx",
    export: "ResourceRequests",
  },
  "/incubator/resources/allocation": {
    page: "src/app/(app)/incubator/resources/allocation/page.tsx",
    component: "src/users/incubator/components/resources/allocation.tsx",
    export: "ResourceAllocation",
  },
  "/incubator/resources/utilization": {
    page: "src/app/(app)/incubator/resources/utilization/page.tsx",
    component: "src/users/incubator/components/resources/utilization.tsx",
    export: "ResourceUtilization",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator resource routes", () => {
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
      const sections =
        (src.match(/<Card[\s>]/g) ?? []).length +
        (src.match(/className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"/g) ?? []).length;
      assert.ok(sections >= 8, `${href} has ${sections} sections, expected >= 8`);
    });
  }
});

describe("incubator resources sidebar", () => {
  const nav = read(NAV);
  const start = nav.indexOf('label: "Resources"');
  const end = nav.indexOf('label: "Support"');
  const block = nav.slice(start, end);
  const hrefs = [...block.matchAll(/href: "(\/incubator\/resources[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the resources group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every resource sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("no resource sub-page is flagged 'soon'", () => {
    assert.ok(!/soon:\s*true/.test(block), "a resource sub-page is still flagged 'soon'");
  });

  test("the four resource links are distinct", () => {
    assert.equal(new Set(hrefs).size, hrefs.length, `duplicate resource hrefs: ${hrefs.join(", ")}`);
    assert.equal(hrefs.length, 4, `expected 4 resource links, found ${hrefs.length}`);
  });

  test("no stale resource anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("resources#")) {
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

describe("incubator resources data", () => {
  let data, portfolio, dashboard;

  before(async () => {
    data = await import("../src/users/incubator/constants/resources-data.ts");
    portfolio = (await import("../src/users/incubator/constants/startups-data.ts")).PORTFOLIO;
    dashboard = await import("../src/users/incubator/constants/dashboard-data.ts");
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      inventory: data.INVENTORY.map((r) => r.tone),
      kpis: data.RESOURCE_KPIS.map((k) => k.tone),
      coverage: data.CATEGORY_COVERAGE.map((c) => c.tone),
      providers: data.PROVIDERS.map((p) => p.tone),
      requests: data.RESOURCE_REQUESTS.map((r) => r.tone),
      routes: data.APPROVAL_ROUTES.map((a) => a.tone),
      turnaround: data.TURNAROUND.map((t) => t.tone),
      gaps: data.COVERAGE_GAPS.map((g) => g.tone),
      ledger: data.BUDGET_LEDGER.map((b) => b.tone),
      credits: data.CREDIT_LINES.map((c) => c.tone),
      allocations: data.STARTUP_ALLOCATIONS.map((a) => a.tone),
      reallocations: data.REALLOCATIONS.map((r) => r.tone),
      underused: data.UNDERUSED_ASSETS.map((a) => a.tone),
      efficiency: data.PROVIDER_EFFICIENCY.map((p) => p.tone),
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

  test("the budget ledger adds up to the committed figure", () => {
    const spend = data.BUDGET_LEDGER.reduce((s, b) => s + b.spend, 0);
    assert.equal(
      Number(spend.toFixed(1)),
      data.RESOURCE_BUDGET.committed,
      `ledger spend ${spend} does not equal committed ${data.RESOURCE_BUDGET.committed}`,
    );
  });

  test("the budget ledger percentages total 100", () => {
    const total = data.BUDGET_LEDGER.reduce((s, b) => s + b.pct, 0);
    assert.equal(total, 100, `ledger percentages total ${total}, expected 100`);
  });

  test("the committed budget never exceeds the cap", () => {
    assert.ok(
      data.RESOURCE_BUDGET.committed <= data.RESOURCE_BUDGET.cap,
      "committed budget exceeds the cap",
    );
    assert.ok(data.RESOURCE_BUDGET.cap > 0, "budget cap is zero");
  });

  test("the startup allocation ledger adds up to 100 percent", () => {
    const value = data.STARTUP_ALLOCATIONS.reduce((s, a) => s + a.value, 0);
    const share = data.STARTUP_ALLOCATIONS.reduce((s, a) => s + a.share, 0);
    assert.equal(Number(value.toFixed(1)), 13.5, `allocation value totals ${value}`);
    assert.equal(share, 100, `allocation share totals ${share}, expected 100`);
  });

  test("the startup allocation ledger never exceeds the committed budget", () => {
    const value = data.STARTUP_ALLOCATIONS.reduce((s, a) => s + a.value, 0);
    assert.ok(
      value <= data.RESOURCE_BUDGET.committed,
      "allocations to startups exceed the committed budget",
    );
  });

  test("no credit line is oversold", () => {
    for (const c of data.CREDIT_LINES) {
      assert.ok(c.used <= c.granted, `${c.label} uses ${c.used} of ${c.granted}`);
      assert.ok(c.granted > 0, `${c.label} has a zero grant`);
      assert.ok(c.used >= 0, `${c.label} has negative usage`);
    }
  });

  test("the cloud credit lines match the credit pool in the inventory", () => {
    const cloud = data.INVENTORY.find((r) => r.category === "Cloud credits");
    assert.ok(cloud, "the inventory has no cloud credit pool");
    const granted = data.CREDIT_LINES
      .filter((c) => c.provider === "Nimbus Cloud Research")
      .reduce((s, c) => s + c.granted, 0);
    assert.equal(granted, 24, `cloud credit lines grant ${granted}, expected 24`);
    assert.ok(
      cloud.capacity.includes("24"),
      `credit pool capacity "${cloud.capacity}" does not mention the 24 L granted`,
    );
  });

  test("utilisation stays within 0-100 everywhere", () => {
    const values = [
      ...data.INVENTORY.map((r) => r.used),
      ...data.UNDERUSED_ASSETS.map((a) => a.used),
      ...data.PROVIDER_EFFICIENCY.map((p) => p.utilisation),
      ...data.UTILISATION_TREND.flatMap((m) => [m.pool, m.lab, m.workspace]),
    ];
    for (const v of values) {
      assert.ok(v >= 0 && v <= 100, `utilisation ${v} is out of range`);
    }
  });

  test("the inventory agrees with the dashboard the user already sees", () => {
    for (const d of dashboard.resourceUtilization) {
      const item = data.INVENTORY.find((r) => r.name.startsWith(d.resource));
      assert.ok(item, `the dashboard shows "${d.resource}" but the inventory has no such asset`);
      assert.equal(
        item.used,
        d.used,
        `"${d.resource}" is ${d.used}% on the dashboard but ${item.used}% in the inventory`,
      );
    }
  });

  test("every request references a startup that exists in the portfolio", () => {
    const names = new Set(portfolio.map((s) => s.name));
    const slugs = new Set(portfolio.map((s) => s.slug));
    for (const r of data.RESOURCE_REQUESTS) {
      assert.ok(names.has(r.startup), `unknown startup "${r.startup}" on request ${r.id}`);
      assert.ok(slugs.has(r.startupSlug), `unknown slug "${r.startupSlug}" on request ${r.id}`);
    }
  });

  test("every startup allocation references a startup that exists", () => {
    const names = new Set(portfolio.map((s) => s.name));
    const slugs = new Set(portfolio.map((s) => s.slug));
    for (const a of data.STARTUP_ALLOCATIONS) {
      assert.ok(names.has(a.startup), `unknown startup "${a.startup}" in the allocation ledger`);
      assert.ok(slugs.has(a.startupSlug), `unknown slug "${a.startupSlug}" in the allocation ledger`);
    }
  });

  test("every request category has an approval route and a turnaround figure", () => {
    const routed = new Set(data.APPROVAL_ROUTES.map((a) => a.category));
    const turned = new Set(data.TURNAROUND.map((t) => t.category));
    for (const r of data.RESOURCE_REQUESTS) {
      assert.ok(routed.has(r.category), `no approver for category "${r.category}"`);
      assert.ok(turned.has(r.category), `no turnaround figure for category "${r.category}"`);
    }
  });

  test("every inventory category is covered by the coverage list", () => {
    const covered = new Set(data.CATEGORY_COVERAGE.map((c) => c.category));
    for (const r of data.INVENTORY) {
      assert.ok(covered.has(r.category), `category "${r.category}" is missing from coverage`);
    }
    for (const c of data.CATEGORY_COVERAGE) {
      assert.ok(c.supplied > 0, `category "${c.category}" claims no assets`);
    }
  });

  test("request values are positive and requests are uniquely identified", () => {
    const ids = data.RESOURCE_REQUESTS.map((r) => r.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate request id");
    for (const r of data.RESOURCE_REQUESTS) {
      assert.ok(r.value > 0, `request ${r.id} has no value`);
    }
  });

  test("credit lines and reallocations are uniquely identified", () => {
    const credits = data.CREDIT_LINES.map((c) => c.id);
    assert.equal(new Set(credits).size, credits.length, "duplicate credit line id");
    const reallocs = data.REALLOCATIONS.map((r) => r.id);
    assert.equal(new Set(reallocs).size, reallocs.length, "duplicate reallocation id");
  });

  test("only expiring lines are inside the 90-day window", () => {
    const expiring = data.CREDIT_LINES.filter((c) => c.daysLeft < 90);
    assert.equal(expiring.length, 3, `expected 3 expiring lines, found ${expiring.length}`);
    for (const c of expiring) {
      assert.ok(c.daysLeft > 0, `${c.label} has already expired`);
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
