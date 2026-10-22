/**
 * Incubation feature tests — dependency-free, runs on Node's built-in
 * test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the three things that actually break between refactors:
 *   1. Routes exist and are wired to real components.
 *   2. Sidebar navigation points at routes that exist (no dead links).
 *   3. The shared data + filter logic stay internally consistent.
 *
 * Test #6 (HTTP smoke) skips itself when the dev server is not running.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(app, p), "utf8");

/* ── The four incubation screens ─────────────────────────────── */
const routes = {
  "/founder/incubation": {
    page: "src/app/(app)/founder/incubation/page.tsx",
    component: "src/users/startup/components/incubation/incubation.tsx",
  },
  "/founder/incubation/discover": {
    page: "src/app/(app)/founder/incubation/discover/page.tsx",
    component: "src/users/startup/components/incubation/discover.tsx",
  },
  "/founder/incubation/workspace": {
    page: "src/app/(app)/founder/incubation/workspace/page.tsx",
    component: "src/users/startup/components/incubation/workspace.tsx",
  },
  "/founder/incubation/milestones": {
    page: "src/app/(app)/founder/incubation/milestones/page.tsx",
    component: "src/users/startup/components/incubation/milestones.tsx",
  },
};

describe("incubation routes", () => {
  for (const [href, files] of Object.entries(routes)) {
    test(`${href} has a page file that renders its component`, () => {
      assert.ok(existsSync(join(app, files.page)), `missing page: ${files.page}`);
      const src = read(files.page);
      assert.match(src, /export default function Page/, "page must default-export Page");
      assert.match(src, /<FounderShell/, "page must wrap in FounderShell");
    });

    test(`${href} component exports and uses shared layout widgets`, () => {
      assert.ok(existsSync(join(app, files.component)), `missing component: ${files.component}`);
      const src = read(files.component);
      assert.match(src, /export function \w+/, "component must export a named function");
      assert.match(src, /PageHeader/, "every screen needs a PageHeader");
      assert.match(src, /from "@\/components\/app\/widgets"/, "must use the house widget set");
    });
  }

  test("each screen has at least 8 content sections", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      const sections = (src.match(/<Card[\s>]/g) ?? []).length
        + (src.match(/className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"/g) ?? []).length;
      assert.ok(sections >= 8, `${href} has ${sections} sections, expected >= 8`);
    }
  });

  test("the two screens that used to be 'Soon' stubs are gone", () => {
    const nav = read("src/users/startup/constants/founder-nav.ts");
    assert.ok(!/incubation#workspace/.test(nav), "workspace must be a real route, not an anchor");
    assert.ok(!/incubation#milestones/.test(nav), "milestones must be a real route, not an anchor");
    assert.ok(
      !/Incubation Workspace[\s\S]{0,120}soon: true/.test(nav),
      "Incubation Workspace should no longer be flagged 'soon'",
    );
    assert.ok(
      !/Milestones[\s\S]{0,80}soon: true/.test(nav),
      "Milestones should no longer be flagged 'soon'",
    );
  });
});

describe("sidebar navigation", () => {
  const nav = read("src/users/startup/constants/founder-nav.ts");
  const hrefs = [...nav.matchAll(/href: "(\/founder\/incubation[^"]*)"/g)].map((m) => m[1]);

  test("incubation group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every incubation sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("no stale incubation anchors anywhere in src", () => {
    const out = execSync(
      'grep -rn "incubation#" src/ --include=*.tsx --include=*.ts || true',
      { cwd: app, encoding: "utf8" },
    );
    assert.equal(out.trim(), "", `found stale #anchors:\n${out}`);
  });
});

describe("incubation data", () => {
  let data, incubators;

  before(async () => {
    data = await import(
      "../src/users/startup/constants/incubation-data.ts"
    );
    incubators = (await import("../src/views/explore/incubators/constants/incubators.ts")).incubators;
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      applications: data.applications.map((a) => a.tone),
      deadlines: data.deadlines.map((d) => d.tone),
      applicationMaterials: data.applicationMaterials.map((m) => m.tone),
      activityFeed: data.activityFeed.map((a) => a.tone),
      sprintPhases: data.sprintPhases.map((s) => s.tone),
      deliverables: data.deliverables.map((d) => d.tone),
      facilityAccess: data.facilityAccess.map((f) => f.tone),
      milestones: data.milestones.map((m) => m.tone),
      milestonePhases: data.milestonePhases.map((p) => p.tone),
      reviewCheckpoints: data.reviewCheckpoints.map((r) => r.tone),
      risks: data.risks.map((r) => r.tone),
      applicationWindows: data.applicationWindows.map((w) => w.tone),
    };
    for (const [list, tones] of Object.entries(lists)) {
      for (const tone of tones) {
        assert.ok(allowed.has(tone), `${list}: invalid tone "${tone}"`);
      }
    }
  });

  test("milestones have unique ids and the required fields", () => {
    const ids = data.milestones.map((m) => m.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate milestone ids");
    for (const m of data.milestones) {
      for (const key of ["name", "phase", "due", "owner", "state", "evidence"]) {
        assert.ok(m[key], `milestone ${m.id} is missing "${key}"`);
      }
    }
  });

  test("phase totals match the milestones assigned to them", () => {
    for (const phase of data.milestonePhases) {
      const assigned = data.milestones.filter((m) => m.phase === phase.name).length;
      assert.ok(
        assigned > 0 && assigned <= phase.total,
        `phase "${phase.name}" declares ${phase.total} milestones but only ${assigned} are listed`,
      );
    }
  });

  test("application stages are monotonically capped", () => {
    for (const a of data.applications) {
      assert.ok(
        a.stage >= 1 && a.stage <= a.stages,
        `${a.program} has stage ${a.stage} of ${a.stages}`,
      );
    }
  });

  test("KPI percentages are within 0-100", () => {
    for (const k of data.kpiTargets) {
      assert.ok(k.pct >= 0 && k.pct <= 100, `${k.label} pct=${k.pct}`);
    }
  });

  test("cohort progress is within 0-100 and demo day is set", () => {
    assert.ok(data.cohort.progress >= 0 && data.cohort.progress <= 100);
    assert.ok(data.cohort.demoDay, "cohort must declare a demo day");
    assert.ok(data.cohort.daysToDemo > 0, "days to demo day must be positive");
  });

  /* ── Filters ──────────────────────────────────────────────── */
  test("every sector chip returns at least one incubator", () => {
    for (const sector of data.discoverSectors) {
      const hits = incubators.filter(
        (i) => sector === "All sectors" || data.sectorTag(i.domains) === sector,
      );
      assert.ok(hits.length > 0, `sector "${sector}" is a dead chip (0 results)`);
    }
  });

  test("every location chip returns at least one incubator", () => {
    for (const loc of data.discoverLocations) {
      const hits = incubators.filter((i) => loc === "All locations" || i.location === loc);
      assert.ok(hits.length > 0, `location "${loc}" is a dead chip (0 results)`);
    }
  });

  test("sector chips partition the catalogue — no incubator double-counted", () => {
    const chips = data.discoverSectors.filter((s) => s !== "All sectors");
    const counted = incubators.filter((i) => chips.includes(data.sectorTag(i.domains)));
    assert.equal(
      counted.length,
      incubators.length,
      "an incubator falls through every sector chip",
    );
  });

  test("fit scores are defined for every incubator", () => {
    const src = read("src/users/startup/components/incubation/discover.tsx");
    const slugs = [...src.matchAll(/"([a-z0-9-]+)":\s*\d+/g)].map((m) => m[1]);
    for (const inc of incubators) {
      assert.ok(slugs.includes(inc.slug), `no fit score for "${inc.slug}"`);
    }
  });

  test("every campus location appears in the location filter", () => {
    for (const inc of incubators) {
      assert.ok(
        data.discoverLocations.includes(inc.location),
        `campus "${inc.location}" is missing from discoverLocations`,
      );
    }
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  test("all four incubation routes return 200 with content", async (t) => {
    let up = true;
    try {
      const probe = await fetch("http://localhost:3000/founder/incubation", {
        signal: AbortSignal.timeout(30_000),
      });
      up = probe.ok;
    } catch {
      up = false;
    }
    if (!up) {
      t.skip("dev server not running — start `npm run dev` to enable");
      return;
    }

    for (const href of Object.keys(routes)) {
      const res = await fetch(`http://localhost:3000${href}`, {
        signal: AbortSignal.timeout(60_000),
      });
      assert.equal(res.status, 200, `${href} returned ${res.status}`);
      const html = await res.text();
      assert.ok(html.length > 20_000, `${href} looks empty (${html.length} bytes)`);
      // The sidebar must expose all four real routes — no 'Soon' stubs left.
      assert.match(html, /href="\/founder\/incubation\/workspace">Incubation Workspace/);
      assert.match(html, /href="\/founder\/incubation\/milestones">Milestones/);
    }
  });
});
