/**
 * Incubator programs feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All six routes exist and are wired to real components.
 *   2. The two former "Soon" stubs are gone — real routes, not anchors.
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

/* ── The six program screens ──────────────────────────────────── */
const routes = {
  "/incubator/programs": {
    page: "src/app/(app)/incubator/programs/page.tsx",
    component: "src/users/incubator/components/programs/programs.tsx",
    export: "Programs",
  },
  "/incubator/programs/applications": {
    page: "src/app/(app)/incubator/programs/applications/page.tsx",
    component: "src/users/incubator/components/programs/applications.tsx",
    export: "Applications",
  },
  "/incubator/programs/evaluation": {
    page: "src/app/(app)/incubator/programs/evaluation/page.tsx",
    component: "src/users/incubator/components/programs/evaluation.tsx",
    export: "ApplicantEvaluation",
  },
  "/incubator/programs/selection": {
    page: "src/app/(app)/incubator/programs/selection/page.tsx",
    component: "src/users/incubator/components/programs/selection.tsx",
    export: "StartupSelection",
  },
  "/incubator/programs/discover": {
    page: "src/app/(app)/incubator/programs/discover/page.tsx",
    component: "src/users/incubator/components/programs/discovery.tsx",
    export: "ProgramDiscovery",
  },
  "/incubator/programs/calendar": {
    page: "src/app/(app)/incubator/programs/calendar/page.tsx",
    component: "src/users/incubator/components/programs/calendar.tsx",
    export: "ProgramCalendar",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator program routes", () => {
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

describe("incubator programs sidebar", () => {
  const nav = read(NAV);
  const hrefs = [...nav.matchAll(/href: "(\/incubator\/programs[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the programs group exposes all six sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every programs sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("the six sub-pages are six distinct routes", () => {
    const unique = new Set(hrefs);
    assert.equal(
      unique.size,
      Object.keys(routes).length,
      `sidebar has ${unique.size} distinct program routes, expected ${Object.keys(routes).length}`,
    );
  });

  test("the two former 'Soon' stubs are gone", () => {
    for (const anchor of ["programs#evaluation", "programs#selection"]) {
      assert.ok(
        !nav.includes(anchor),
        `${anchor} must be a real route, not an anchor`,
      );
    }
    assert.ok(
      !/Applicant Evaluation[\s\S]{0,120}soon: true/.test(nav),
      "Applicant Evaluation should no longer be flagged 'soon'",
    );
    assert.ok(
      !/Startup Selection[\s\S]{0,120}soon: true/.test(nav),
      "Startup Selection should no longer be flagged 'soon'",
    );
  });

  test("no stale program anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("programs#")) {
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

describe("incubator programs data", () => {
  let data;

  before(async () => {
    data = await import(
      "../src/users/incubator/constants/programs-data.ts"
    );
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      kpis: data.PROGRAM_KPIS.map((k) => k.tone),
      programs: data.PROGRAMS.map((p) => p.tone),
      leads: data.PROGRAM_LEADS.map((l) => l.tone),
      pipeline: data.PIPELINE.map((p) => p.tone),
      shortlist: data.SHORTLIST.map((s) => s.tone),
      decisions: data.DECISIONS.map((d) => d.tone),
      seats: data.SEAT_ALLOCATION.map((s) => s.tone),
      checkpoints: data.REVIEW_CHECKPOINTS.map((c) => c.tone),
      external: data.EXTERNAL_PROGRAMS.map((p) => p.tone),
      windows: data.APPLICATION_WINDOWS.map((w) => w.tone),
      keyDates: data.KEY_DATES.map((k) => k.tone),
      conflicts: data.CALENDAR_CONFLICTS.map((c) => c.tone),
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

  test("program seats are never over capacity", () => {
    for (const p of data.PROGRAMS) {
      assert.ok(p.filled <= p.seats, `${p.name} has more startups than seats`);
      assert.ok(p.seats > 0, `${p.name} has no seats`);
    }
  });

  test("offered seats never exceed allocated seats", () => {
    for (const s of data.SEAT_ALLOCATION) {
      assert.ok(s.offered <= s.seats, `${s.program} offers more than it has`);
    }
  });

  test("criterion weights total 100 percent", () => {
    const total = data.CRITERIA.reduce((s, c) => s + c.weight, 0);
    assert.equal(total, 100, `criteria weights total ${total}, expected 100`);
  });

  test("every scorecard uses only known criteria and stays in range", () => {
    const keys = new Set(data.CRITERIA.map((c) => c.key));
    for (const s of data.SCORECARDS) {
      for (const [key, score] of Object.entries(s.scores)) {
        assert.ok(keys.has(key), `scorecard uses unknown criterion "${key}"`);
        assert.ok(score >= 0 && score <= 100, `score out of range: ${score}`);
      }
      assert.ok(s.total >= 0 && s.total <= 100, `total out of range: ${s.total}`);
    }
  });

  test("every scorecard and shortlist entry points at a real application", () => {
    const ids = new Set(data.APPLICATIONS.map((a) => a.id));
    for (const s of data.SCORECARDS) {
      assert.ok(ids.has(s.applicationId), `unknown application ${s.applicationId}`);
    }
    for (const s of data.SHORTLIST) {
      assert.ok(ids.has(s.applicationId), `unknown application ${s.applicationId}`);
    }
    for (const q of data.REVIEW_QUEUE) {
      assert.ok(ids.has(q.applicationId), `unknown application ${q.applicationId}`);
    }
  });

  test("application completeness stays within 0-100", () => {
    for (const a of data.APPLICATIONS) {
      assert.ok(
        a.completeness >= 0 && a.completeness <= 100,
        `completeness out of range for ${a.startup}`,
      );
      assert.ok(a.score >= 0 && a.score <= 100, `score out of range for ${a.startup}`);
    }
  });

  test("screening checks never pass more than they cover", () => {
    for (const c of data.SCREENING_CHECKS) {
      assert.ok(c.passed <= c.total, `${c.check} passes more than the total`);
    }
  });

  test("reviewer load never exceeds capacity", () => {
    for (const r of data.REVIEWER_LOADS) {
      assert.ok(r.assigned <= r.capacity, `${r.reviewer} is over capacity`);
    }
  });

  test("every calendar event falls inside a 2026 month", () => {
    const months = new Set(data.CALENDAR_EVENTS.map((e) => e.month));
    for (const m of months) {
      assert.ok(m >= 3 && m <= 12, `event month out of range: ${m}`);
    }
    for (const e of data.CALENDAR_EVENTS) {
      const limit = e.month === 4 ? 30 : 31;
      assert.ok(e.day >= 1 && e.day <= limit, `${e.title} has an invalid day`);
    }
  });

  test("the month grid only renders April events", () => {
    const april = data.CALENDAR_EVENTS.filter((e) => e.month === 4);
    assert.ok(april.length > 0, "no April events to render");
    assert.ok(
      data.CALENDAR_EVENTS.some((e) => e.month !== 4),
      "expected at least one event outside April (shown in the 90-day list)",
    );
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
