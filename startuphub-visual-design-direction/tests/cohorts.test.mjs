/**
 * Incubator cohorts feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All four routes exist and are wired to real components.
 *   2. The former "Soon" anchor stub is gone — a real route now.
 *   3. Sidebar navigation points at routes that exist (no dead links).
 *   4. Each screen carries enough content to be a real product surface.
 *   5. The shared dataset stays internally consistent.
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

/* ── The four cohort screens ──────────────────────────────────── */
const routes = {
  "/incubator/cohorts": {
    page: "src/app/(app)/incubator/cohorts/page.tsx",
    component: "src/users/incubator/components/cohorts/cohorts.tsx",
    export: "Cohorts",
  },
  "/incubator/cohorts/cohort-vi": {
    page: "src/app/(app)/incubator/cohorts/cohort-vi/page.tsx",
    component: "src/users/incubator/components/cohorts/cohort-detail.tsx",
    export: "CohortDetail",
  },
  "/incubator/cohorts/progress": {
    page: "src/app/(app)/incubator/cohorts/progress/page.tsx",
    component: "src/users/incubator/components/cohorts/progress.tsx",
    export: "CohortProgress",
  },
  "/incubator/cohorts/analytics": {
    page: "src/app/(app)/incubator/cohorts/analytics/page.tsx",
    component: "src/users/incubator/components/cohorts/analytics.tsx",
    export: "CohortAnalytics",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator cohort routes", () => {
  for (const [href, files] of Object.entries(routes)) {
    test(`${href} has a page file that renders its component`, () => {
      assert.ok(existsSync(join(app, files.page)), `missing page: ${files.page}`);
      const src = read(files.page);
      assert.match(src, /export default function Page/, "page must default-export Page");
      assert.match(src, /<IncubatorShell/, "page must wrap in IncubatorShell");
      assert.match(src, /export const metadata/, "page must declare metadata");
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

describe("incubator cohorts sidebar", () => {
  const nav = read(NAV);
  /* The Cohorts group runs from its own label to the next group label. */
  const block = nav.slice(
    nav.indexOf('label: "Cohorts"'),
    nav.indexOf('label: "Startups"'),
  );
  const hrefs = [...block.matchAll(/href: "(\/incubator\/cohorts[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the cohorts group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every cohort sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("the former 'Soon' stub is gone", () => {
    assert.ok(
      !nav.includes("cohorts#progress"),
      "cohorts#progress must be a real route, not an anchor",
    );
    assert.ok(
      !/Cohort Progress[\s\S]{0,120}soon: true/.test(nav),
      "Cohort Progress should no longer be flagged 'soon'",
    );
  });

  test("no stale cohort anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("cohorts#")) {
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

describe("incubator cohorts data", () => {
  let data;

  before(async () => {
    data = await import(
      "../src/users/incubator/constants/cohorts-data.ts"
    );
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      cohorts: data.COHORTS.map((c) => c.tone),
      kpis: data.COHORT_KPIS.map((k) => k.tone),
      phases: data.COHORT_VI_PHASES.map((p) => p.tone),
      startups: data.COHORT_VI_STARTUPS.map((s) => s.tone),
      mentors: data.COHORT_VI_MENTORS.map((m) => m.tone),
      milestones: data.COHORT_VI_MILESTONES.map((m) => m.tone),
      readiness: data.COHORT_VI_DEMO_READINESS.map((d) => d.tone),
      blockers: data.COHORT_BLOCKERS.map((b) => b.tone),
      progressPhases: data.PROGRESS_PHASES.map((p) => p.tone),
      nextMilestones: data.NEXT_MILESTONES.map((m) => m.tone),
      historical: data.HISTORICAL_COHORTS.map((h) => h.tone),
      benchmarks: data.BENCHMARKS.map((b) => b.tone),
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

  test("cohorts are never over capacity", () => {
    for (const c of data.COHORTS) {
      assert.ok(c.filled <= c.seats, `${c.name} has more startups than seats`);
      assert.ok(c.seats > 0, `${c.name} has no seats`);
    }
  });

  test("current week never exceeds the programme length", () => {
    for (const c of data.COHORTS) {
      assert.ok(
        c.currentWeek <= c.weeks,
        `${c.name} is past its own programme length`,
      );
    }
  });

  test("health and readiness scores stay within 0-100", () => {
    for (const c of data.COHORTS) {
      assert.ok(c.health >= 0 && c.health <= 100, `${c.name} health out of range`);
    }
    for (const h of data.COHORT_VI_HEALTH) {
      assert.ok(h.score >= 0 && h.score <= 100, `health dimension out of range`);
    }
    for (const s of data.COHORT_VI_STARTUPS) {
      assert.ok(s.health >= 0 && s.health <= 100, `${s.name} health out of range`);
      assert.ok(s.readiness >= 0 && s.readiness <= 100, `${s.name} readiness out of range`);
    }
  });

  test("percentages stay within 0-100", () => {
    const pctLists = [
      data.COHORT_VI_COMPLETION.map((c) => c.pct),
      data.COHORT_VI_DEMO_READINESS.map((d) => d.pct),
      data.COHORT_VI_MILESTONES.map((m) => m.pct),
      data.NEXT_MILESTONES.map((m) => m.pct),
      data.VELOCITY.map((v) => v.attendance),
    ];
    for (const list of pctLists) {
      for (const pct of list) {
        assert.ok(pct >= 0 && pct <= 100, `percentage out of range: ${pct}`);
      }
    }
  });

  test("mentor hours are logged against a positive target", () => {
    for (const m of data.COHORT_VI_MENTORS) {
      assert.ok(m.hours >= 0, `${m.mentor} has negative hours logged`);
      assert.ok(m.target > 0, `${m.mentor} has no hour target`);
      /* Logging above target is legitimate (and surfaced in the UI as
         "Complete"); only a non-positive target is a data error. */
    }
  });

  test("historical cohorts never graduate more than they took in", () => {
    for (const h of data.HISTORICAL_COHORTS) {
      assert.ok(
        h.graduated <= h.size,
        `${h.name} graduated more startups than it enrolled`,
      );
      assert.ok(
        h.survival36 <= h.survival12,
        `${h.name} has higher 36-month survival than 12-month survival`,
      );
    }
  });

  test("the survival curve is monotonically decreasing per cohort", () => {
    for (const key of ["cohortV", "cohortIV", "cohortIII", "network"]) {
      for (let i = 1; i < data.SURVIVAL_CURVE.length; i++) {
        const prev = data.SURVIVAL_CURVE[i - 1][key];
        const now = data.SURVIVAL_CURVE[i][key];
        assert.ok(
          now <= prev,
          `${key} survival increased from month ${data.SURVIVAL_CURVE[i - 1].month} to ${data.SURVIVAL_CURVE[i].month}`,
        );
      }
    }
  });

  test("every phase is either done, active or upcoming", () => {
    const states = new Set(["done", "active", "upcoming"]);
    for (const p of [...data.COHORT_VI_PHASES, ...data.PROGRESS_PHASES]) {
      assert.ok(states.has(p.state), `unknown phase state "${p.state}"`);
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
