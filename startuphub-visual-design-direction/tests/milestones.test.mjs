/**
 * Incubator milestones feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. Both routes exist and are wired to real components.
 *   2. Sidebar navigation points at routes that exist (no dead links).
 *   3. Each screen carries enough content to be a real product surface.
 *   4. The shared dataset stays internally consistent.
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

/* ── The two milestone screens ────────────────────────────────── */
const routes = {
  "/incubator/milestones": {
    page: "src/app/(app)/incubator/milestones/page.tsx",
    component: "src/users/incubator/components/milestones/milestones.tsx",
    export: "Milestones",
  },
  "/incubator/milestones/roadmaps": {
    page: "src/app/(app)/incubator/milestones/roadmaps/page.tsx",
    component: "src/users/incubator/components/milestones/roadmaps.tsx",
    export: "Roadmaps",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator milestone routes", () => {
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

describe("incubator milestones sidebar", () => {
  const nav = read(NAV);
  const block = nav.slice(
    nav.indexOf('label: "Milestones & Roadmaps"'),
    nav.indexOf('label: "Mentors"'),
  );
  const hrefs = [...block.matchAll(/href: "(\/incubator\/milestones[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the milestones group exposes both sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every milestone sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("neither milestone sub-page is flagged 'soon'", () => {
    assert.ok(
      !/soon:\s*true/.test(block),
      "a milestone sub-page is still flagged 'soon'",
    );
  });

  test("no stale milestone anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("milestones#")) {
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

describe("incubator milestones data", () => {
  let data;

  before(async () => {
    data = await import(
      "../src/users/incubator/constants/milestones-data.ts"
    );
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      kpis: data.MILESTONE_KPIS.map((k) => k.tone),
      states: data.STATE_BUCKETS.map((s) => s.tone),
      owners: data.MILESTONE_OWNERS.map((o) => o.tone),
      checkpoints: data.REVIEW_CHECKPOINTS.map((c) => c.tone),
      phases: data.ROADMAP_PHASES.map((p) => p.tone),
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

  test("milestone ids are unique", () => {
    const ids = data.MILESTONES.map((m) => m.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate milestone ids");
  });

  test("progress and completion stay within 0-100", () => {
    for (const m of data.MILESTONES) {
      assert.ok(m.pct >= 0 && m.pct <= 100, `${m.name} progress out of range`);
      assert.ok(m.driftDays >= 0, `${m.name} has negative drift`);
    }
    for (const p of data.ROADMAP_PHASES) {
      assert.ok(p.complete <= p.milestones, `${p.name} completes more than it has`);
      assert.ok(p.milestones > 0, `${p.name} has no milestones`);
    }
    for (const s of data.SWIMLANES) {
      for (const c of s.chain) {
        assert.ok(c.pct >= 0 && c.pct <= 100, `${c.name} progress out of range`);
      }
    }
  });

  test("dependencies only reference real milestones", () => {
    const ids = new Set(data.MILESTONES.map((m) => m.id));
    for (const d of data.DEPENDENCIES) {
      assert.ok(ids.has(d.from), `unknown source milestone ${d.from}`);
      assert.ok(ids.has(d.to), `unknown target milestone ${d.to}`);
      assert.notEqual(d.from, d.to, "a milestone cannot depend on itself");
    }
  });

  test("the dependency graph is acyclic", () => {
    const edges = new Map();
    for (const d of data.DEPENDENCIES) {
      edges.set(d.from, [...(edges.get(d.from) ?? []), d.to]);
    }
    const state = new Map();
    const visit = (node) => {
      const s = state.get(node);
      if (s === "done") return;
      assert.notEqual(s, "visiting", `dependency cycle through ${node}`);
      state.set(node, "visiting");
      for (const next of edges.get(node) ?? []) visit(next);
      state.set(node, "done");
    };
    for (const node of edges.keys()) visit(node);
  });

  test("blocked milestones name a real blocker", () => {
    const ids = new Set(data.MILESTONES.map((m) => m.id));
    for (const m of data.MILESTONES) {
      if (m.blockedBy) {
        assert.ok(ids.has(m.blockedBy), `${m.name} blocked by unknown ${m.blockedBy}`);
      }
    }
  });

  test("swimlane chains only reference real milestones", () => {
    const ids = new Set(data.MILESTONES.map((m) => m.id));
    for (const s of data.SWIMLANES) {
      assert.ok(s.chain.length > 0, `${s.startup} has an empty chain`);
      for (const c of s.chain) {
        assert.ok(ids.has(c.id), `${s.startup} references unknown milestone ${c.id}`);
      }
    }
  });

  test("roadmap phases are ordered and contiguous on the week axis", () => {
    let previousEnd = 0;
    for (const p of data.ROADMAP_PHASES) {
      assert.ok(p.startWeek >= previousEnd, `${p.name} overlaps the previous phase`);
      assert.ok(p.endWeek >= p.startWeek, `${p.name} ends before it starts`);
      previousEnd = p.endWeek + 1;
    }
  });

  test("the critical path references real milestones and weeks", () => {
    const ids = new Set(data.MILESTONES.map((m) => m.id));
    assert.ok(data.CRITICAL_PATH.steps.length > 0, "critical path is empty");
    for (const s of data.CRITICAL_PATH.steps) {
      assert.ok(ids.has(s.id), `critical path references unknown milestone ${s.id}`);
      assert.ok(s.week >= 0 && s.week <= 16, `week out of range: ${s.week}`);
    }
  });

  test("state buckets and owner loads stay internally consistent", () => {
    for (const s of data.STATE_BUCKETS) {
      assert.ok(s.count >= 0, `${s.state} count is negative`);
      assert.ok(s.share >= 0 && s.share <= 100, `${s.state} share out of range`);
    }
    for (const o of data.MILESTONE_OWNERS) {
      assert.ok(o.assigned <= o.capacity, `${o.owner} is over capacity`);
      assert.ok(o.capacity > 0, `${o.owner} has no capacity`);
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
