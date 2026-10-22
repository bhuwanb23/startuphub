/**
 * Incubator startups feature tests — dependency-free, runs on Node's
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

/* ── The four startup screens ─────────────────────────────────── */
const routes = {
  "/incubator/startups": {
    page: "src/app/(app)/incubator/startups/page.tsx",
    component: "src/users/incubator/components/startups/startups.tsx",
    export: "Startups",
  },
  "/incubator/startups/assessment": {
    page: "src/app/(app)/incubator/startups/assessment/page.tsx",
    component: "src/users/incubator/components/startups/assessment.tsx",
    export: "StartupAssessment",
  },
  "/incubator/startups/at-risk": {
    page: "src/app/(app)/incubator/startups/at-risk/page.tsx",
    component: "src/users/incubator/components/startups/at-risk.tsx",
    export: "AtRiskStartups",
  },
  "/incubator/startups/interventions": {
    page: "src/app/(app)/incubator/startups/interventions/page.tsx",
    component: "src/users/incubator/components/startups/interventions.tsx",
    export: "Interventions",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator startup routes", () => {
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

describe("incubator startups sidebar", () => {
  const nav = read(NAV);
  const block = nav.slice(
    nav.indexOf('label: "Startups"'),
    nav.indexOf('label: "Milestones & Roadmaps"'),
  );
  const hrefs = [...block.matchAll(/href: "(\/incubator\/startups[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the startups group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every startup sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("the former 'Soon' stub is gone", () => {
    assert.ok(
      !nav.includes("startups#risks"),
      "startups#risks must be a real route, not an anchor",
    );
    assert.ok(
      !/At-Risk Startups[\s\S]{0,120}soon: true/.test(nav),
      "At-Risk Startups should no longer be flagged 'soon'",
    );
  });

  test("no stale startup anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("startups#")) {
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

describe("incubator startups data", () => {
  let data;

  before(async () => {
    data = await import(
      "../src/users/incubator/constants/startups-data.ts"
    );
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      kpis: data.PORTFOLIO_KPIS.map((k) => k.tone),
      cohorts: data.COHORT_SPREAD.map((c) => c.tone),
      health: data.HEALTH_BANDS.map((h) => h.tone),
      mentors: data.MENTOR_COVERAGE.map((m) => m.tone),
      funding: data.FUNDING_READINESS.map((f) => f.tone),
      atRisk: data.AT_RISK.map((r) => r.tone),
      runway: data.RUNWAY_EXPOSURE.map((r) => r.tone),
      warnings: data.EARLY_WARNINGS.map((e) => e.tone),
      owners: data.OWNER_LOADS.map((o) => o.tone),
      plans: data.INTERVENTIONS.map((p) => p.tone),
      tasks: data.INTERVENTION_TASKS.map((t) => t.tone),
      outcomes: data.INTERVENTION_OUTCOMES.map((o) => o.tone),
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

  test("the portfolio holds every tracked startup", () => {
    assert.ok(
      data.PORTFOLIO.length >= 9,
      `portfolio has ${data.PORTFOLIO.length} startups, expected at least 9`,
    );
    const slugs = new Set(data.PORTFOLIO.map((s) => s.slug));
    assert.equal(slugs.size, data.PORTFOLIO.length, "duplicate startup slugs");
  });

  test("health, readiness and scores stay within 0-100", () => {
    for (const s of data.PORTFOLIO) {
      assert.ok(s.health >= 0 && s.health <= 100, `${s.name} health out of range`);
      assert.ok(
        s.readiness >= 0 && s.readiness <= 100,
        `${s.name} readiness out of range`,
      );
    }
    for (const a of data.ASSESSMENTS) {
      assert.ok(a.overall >= 0 && a.overall <= 100, `overall out of range`);
      for (const score of Object.values(a.scores)) {
        assert.ok(score >= 0 && score <= 100, `dimension score out of range`);
      }
    }
    for (const h of data.HEALTH_BANDS) {
      assert.ok(h.count >= 0, `health band count is negative`);
    }
  });

  test("rubric weights total 100 percent", () => {
    const total = data.RUBRIC.reduce((s, r) => s + r.weight, 0);
    assert.equal(total, 100, `rubric weights total ${total}, expected 100`);
  });

  test("every assessment scores exactly the rubric dimensions", () => {
    const keys = new Set(data.RUBRIC.map((r) => r.key));
    for (const a of data.ASSESSMENTS) {
      assert.deepEqual(
        Object.keys(a.scores).sort(),
        [...keys].sort(),
        `assessment for ${a.startupSlug} does not score every rubric dimension`,
      );
    }
  });

  test("assessments, queue and at-risk only reference real startups", () => {
    const slugs = new Set(data.PORTFOLIO.map((s) => s.slug));
    for (const a of data.ASSESSMENTS) {
      assert.ok(slugs.has(a.startupSlug), `unknown startup ${a.startupSlug}`);
    }
    for (const q of data.ASSESSMENT_QUEUE) {
      assert.ok(slugs.has(q.startupSlug), `unknown startup ${q.startupSlug}`);
    }
    for (const r of data.AT_RISK) {
      assert.ok(slugs.has(r.slug), `unknown startup ${r.slug}`);
    }
    for (const h of data.ASSESSMENT_HISTORY) {
      assert.ok(slugs.has(h.startupSlug), `unknown startup ${h.startupSlug}`);
    }
  });

  test("intervention task counts never exceed their plan totals", () => {
    for (const p of data.INTERVENTIONS) {
      assert.ok(
        p.tasksDone <= p.tasksTotal,
        `${p.startup} has more completed tasks than the plan total`,
      );
      assert.ok(p.tasksTotal > 0, `${p.startup} has no tasks`);
    }
  });

  test("intervention tasks only reference real plans", () => {
    const ids = new Set(data.INTERVENTIONS.map((p) => p.id));
    for (const t of data.INTERVENTION_TASKS) {
      assert.ok(ids.has(t.planId), `unknown plan ${t.planId}`);
    }
  });

  test("funding readiness never exceeds the stage total", () => {
    for (const f of data.FUNDING_READINESS) {
      assert.ok(f.ready <= f.total, `${f.stage} has more ready than total`);
    }
  });

  test("distribution shares stay within 0-100", () => {
    for (const s of [...data.SECTOR_SPLIT, ...data.STAGE_SPLIT]) {
      assert.ok(s.share >= 0 && s.share <= 100, `share out of range: ${s.share}`);
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
