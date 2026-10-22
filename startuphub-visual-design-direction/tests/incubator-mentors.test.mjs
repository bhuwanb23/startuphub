/**
 * Incubator mentors feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All four routes exist and are wired to real components.
 *   2. Sidebar navigation points at routes that exist (no dead links).
 *   3. Each screen carries enough content to be a real product surface.
 *   4. The shared dataset stays internally consistent — and the mentor
 *      names agree with the canonical public catalogue.
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

/* ── The four mentor screens ──────────────────────────────────── */
const routes = {
  "/incubator/mentors": {
    page: "src/app/(app)/incubator/mentors/page.tsx",
    component: "src/users/incubator/components/mentors/mentors.tsx",
    export: "Mentors",
  },
  "/incubator/mentors/discover": {
    page: "src/app/(app)/incubator/mentors/discover/page.tsx",
    component: "src/users/incubator/components/mentors/discovery.tsx",
    export: "MentorDiscovery",
  },
  "/incubator/mentors/assignments": {
    page: "src/app/(app)/incubator/mentors/assignments/page.tsx",
    component: "src/users/incubator/components/mentors/assignments.tsx",
    export: "MentorAssignments",
  },
  "/incubator/mentors/tracking": {
    page: "src/app/(app)/incubator/mentors/tracking/page.tsx",
    component: "src/users/incubator/components/mentors/tracking.tsx",
    export: "MentorshipTracking",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator mentor routes", () => {
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

describe("incubator mentors sidebar", () => {
  const nav = read(NAV);
  const block = nav.slice(
    nav.indexOf('label: "Mentors"'),
    nav.indexOf('label: "Resources"'),
  );
  const hrefs = [...block.matchAll(/href: "(\/incubator\/mentors[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the mentors group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every mentor sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("no mentor sub-page is flagged 'soon'", () => {
    assert.ok(!/soon:\s*true/.test(block), "a mentor sub-page is still flagged 'soon'");
  });

  test("no stale mentor anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("mentors#")) {
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

describe("incubator mentors data", () => {
  let data, catalogue, portfolio;

  before(async () => {
    data = await import(
      "../src/users/incubator/constants/mentors-data.ts"
    );
    catalogue = (await import("../src/views/explore/mentors/constants/mentors.ts")).mentors;
    portfolio = (await import("../src/users/incubator/constants/startups-data.ts")).PORTFOLIO;
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      bench: data.BENCH.map((m) => m.tone),
      kpis: data.BENCH_KPIS.map((k) => k.tone),
      gaps: data.EXPERTISE_GAPS.map((g) => g.tone),
      assignments: data.ASSIGNMENTS.map((a) => a.tone),
      slots: data.OPEN_SLOTS.map((s) => s.tone),
      network: data.NETWORK_MENTORS.map((m) => m.tone),
      sessions: data.SESSION_LOG.map((s) => s.tone),
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

  test("every mentor on the bench exists in the public catalogue", () => {
    const slugs = new Set(catalogue.map((m) => m.slug));
    for (const m of data.BENCH) {
      assert.ok(slugs.has(m.slug), `bench mentor "${m.slug}" is not in the catalogue`);
    }
  });

  test("every network mentor exists in the public catalogue", () => {
    const slugs = new Set(catalogue.map((m) => m.slug));
    for (const m of data.NETWORK_MENTORS) {
      assert.ok(slugs.has(m.slug), `network mentor "${m.slug}" is not in the catalogue`);
    }
  });

  test("mentor names and initials are consistent with the catalogue", () => {
    const byslug = new Map(catalogue.map((m) => [m.slug, m]));
    for (const m of [...data.BENCH, ...data.NETWORK_MENTORS]) {
      const c = byslug.get(m.slug);
      assert.equal(m.name, c.name, `${m.slug} name differs from the catalogue`);
      const expectedInitials = c.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2);
      assert.equal(m.initials, expectedInitials, `${m.slug} initials do not match the name`);
    }
  });

  test("there are no duplicate mentors on the bench", () => {
    const slugs = data.BENCH.map((m) => m.slug);
    assert.equal(new Set(slugs).size, slugs.length, "duplicate mentor on the bench");
    const names = data.BENCH.map((m) => m.name);
    assert.equal(new Set(names).size, names.length, "duplicate mentor name on the bench");
  });

  test("hours, ratings and load stay within sane bounds", () => {
    for (const m of data.BENCH) {
      assert.ok(m.hours >= 0, `${m.name} has negative hours`);
      assert.ok(m.target > 0, `${m.name} has no hour target`);
      assert.ok(m.rating >= 0 && m.rating <= 5, `${m.name} rating out of range`);
      assert.ok(m.sessions >= 0, `${m.name} has negative sessions`);
    }
    for (const m of data.NETWORK_MENTORS) {
      assert.ok(m.match >= 0 && m.match <= 100, `${m.name} match out of range`);
    }
  });

  test("assignments only reference known mentors and startups", () => {
    const mentorSlugs = new Set(data.BENCH.map((m) => m.slug));
    const startupSlugs = new Set(portfolio.map((s) => s.slug));
    for (const a of data.ASSIGNMENTS) {
      assert.ok(mentorSlugs.has(a.mentorSlug), `unknown mentor ${a.mentorSlug}`);
      assert.ok(startupSlugs.has(a.startupSlug), `unknown startup ${a.startupSlug}`);
    }
    for (const s of data.OPEN_SLOTS) {
      assert.ok(startupSlugs.has(s.startupSlug), `unknown startup ${s.startupSlug}`);
    }
  });

  test("the bench's assigned startups all exist in the portfolio", () => {
    const startupNames = new Set(portfolio.map((s) => s.name));
    for (const m of data.BENCH) {
      for (const s of m.assigned) {
        assert.ok(startupNames.has(s), `${m.name} carries unknown startup "${s}"`);
      }
    }
  });

  test("match dimension weights total 100 percent", () => {
    const total = data.MATCH_DIMENSIONS.reduce((s, d) => s + d.weight, 0);
    assert.equal(total, 100, `match weights total ${total}, expected 100`);
  });

  test("session ratings stay within 1-5", () => {
    for (const s of data.SESSION_LOG) {
      assert.ok(s.rating >= 1 && s.rating <= 5, `${s.topic} rating out of range`);
      assert.ok(s.actions >= 0 && s.closed <= s.actions, `${s.topic} has impossible action counts`);
    }
  });

  test("feedback signals and impact entries are non-empty", () => {
    assert.ok(data.FEEDBACK_SIGNALS.length > 0, "no feedback signals");
    assert.ok(data.IMPACT.length > 0, "no impact entries");
    assert.ok(data.MATCH_PIPELINE.length > 0, "no match pipeline steps");
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
