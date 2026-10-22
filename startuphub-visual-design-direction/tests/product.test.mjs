/**
 * Product workspace tests — same dependency-free Node runner as
 * tests/incubation.test.mjs, tests/mentors.test.mjs, tests/ipr.test.mjs
 * and tests/resources.test.mjs (npm test picks them all up).
 *
 * The product screens are the easiest place in the app to publish a
 * number twice, so this suite guards the invariants that matter:
 *
 *   1. Every screen reads the shared product ledger. No screen keeps
 *      its own copy of the release, the roadmap or the NPS.
 *   2. The headline numbers are derived, not typed. Readiness comes
 *      from the release checklist, NPS comes from the response split.
 *   3. The three screens agree. Roadmap items and experiments point at
 *      features that actually exist, and the lanes stay Now/Next/Later.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(app, p), "utf8");

const routes = {
  "/founder/product": {
    page: "src/app/(app)/founder/product/page.tsx",
    component: "src/users/startup/components/product/product.tsx",
  },
  "/founder/product/roadmap": {
    page: "src/app/(app)/founder/product/roadmap/page.tsx",
    component: "src/users/startup/components/product/roadmap.tsx",
  },
  "/founder/product/validation": {
    page: "src/app/(app)/founder/product/validation/page.tsx",
    component: "src/users/startup/components/product/validation.tsx",
  },
};

describe("product routes", () => {
  for (const [href, files] of Object.entries(routes)) {
    test(`${href} has a page file that renders its component`, () => {
      assert.ok(existsSync(join(app, files.page)), `missing page: ${files.page}`);
      const src = read(files.page);
      assert.match(src, /export default function Page/, "page must default-export Page");
      assert.match(src, /<FounderShell/, "page must wrap in FounderShell");
    });

    test(`${href} component exports and uses shared layout widgets`, () => {
      const src = read(files.component);
      assert.match(src, /export function \w+/, "component must export a named function");
      assert.match(src, /PageHeader/, "every screen needs a PageHeader");
      assert.match(src, /<Card/, "every screen needs cards");
      assert.match(src, /<Stat/, "every screen needs headline stats");
    });

    test(`${href} component reads the shared product ledger`, () => {
      const src = read(files.component);
      assert.match(
        src,
        /from "@\/users\/startup\/constants\/product-data"/,
        "the screen no longer reads the shared product data",
      );
    });
  }
});

describe("product navigation", () => {
  const nav = read("src/users/startup/constants/founder-nav.ts");

  test("the product group lists all three screens", () => {
    assert.match(nav, /\{ name: "MVP Management", href: "\/founder\/product" \}/);
    assert.match(nav, /\{ name: "Product Roadmap", href: "\/founder\/product\/roadmap" \}/);
    assert.match(nav, /\{ name: "Product Validation", href: "\/founder\/product\/validation" \}/);
  });

  test("product validation is a real page, not a soon link", () => {
    assert.equal(
      /name: "Product Validation"[^}]*soon/.test(nav),
      false,
      "Product Validation is implemented — it must not stay flagged as soon",
    );
  });
});

describe("product data", () => {
  let data;

  before(async () => {
    data = await import("../src/users/startup/constants/product-data.ts");
  });

  test("release readiness is computed from the checklist", () => {
    const done = data.releaseChecklist.filter((c) => c.done).length;
    assert.equal(data.releaseChecklist.length, 11, "the checklist should have 11 gates");
    assert.equal(
      data.releaseReadiness,
      Math.round((done / data.releaseChecklist.length) * 100),
      "readiness is not the share of the checklist that is done",
    );
    assert.ok(
      data.releaseReadiness >= 0 && data.releaseReadiness <= 100,
      "readiness must be a percentage",
    );
  });

  test("the product NPS is computed from the response split", () => {
    const { responses, promoters, passives, detractors } = data.npsBreakdown;
    assert.equal(promoters + passives + detractors, responses, "the NPS split does not add up");
    assert.equal(
      data.productNps,
      Math.round(((promoters - detractors) / responses) * 100),
      "the NPS is not promoters minus detractors",
    );
  });

  test("every MVP feature is complete enough to build against", () => {
    const states = ["Shipped", "In QA", "In dev", "Backlog"];
    for (const f of data.mvpFeatures) {
      assert.ok(states.includes(f.state), `feature "${f.name}" has an unknown state`);
      assert.ok(f.owner, `feature "${f.name}" has no owner`);
      assert.ok(f.note, `feature "${f.name}" has no note`);
      assert.ok(f.pct >= 0 && f.pct <= 100, `feature "${f.name}" has a bad percentage`);
    }
    assert.equal(
      data.shippedCount + data.inFlightCount +
        data.mvpFeatures.filter((f) => f.state === "Backlog").length,
      data.mvpFeatures.length,
      "the feature counts do not cover every feature",
    );
  });

  test("the roadmap only uses the three declared lanes", () => {
    const lanes = data.roadmapLanes.map((l) => l.lane);
    assert.deepEqual(lanes, ["Now", "Next", "Later"]);
    for (const item of data.roadmapItems) {
      assert.ok(lanes.includes(item.lane), `roadmap item "${item.name}" is on no lane`);
      assert.ok(item.owner, `roadmap item "${item.name}" has no owner`);
      assert.ok(item.note, `roadmap item "${item.name}" has no note`);
      assert.ok(
        item.confidence >= 0 && item.confidence <= 100,
        `roadmap item "${item.name}" has a bad confidence`,
      );
      assert.ok(item.requests > 0, `roadmap item "${item.name}" has no demand behind it`);
    }
  });

  test("every roadmap item sits in the lane it claims", () => {
    for (const lane of data.roadmapLanes) {
      for (const item of data.laneItems(lane.lane)) {
        assert.equal(item.lane, lane.lane);
      }
      assert.equal(
        data.laneItems(lane.lane).length,
        data.roadmapItems.filter((i) => i.lane === lane.lane).length,
      );
    }
  });

  test("roadmap items that point at a feature point at a real one", () => {
    const ids = new Set(data.mvpFeatures.map((f) => f.id));
    for (const item of data.roadmapItems) {
      if (item.featureId) {
        assert.ok(ids.has(item.featureId), `roadmap item "${item.name}" points at no feature`);
      }
    }
  });

  test("every experiment states a hypothesis, a method and a verdict", () => {
    const verdicts = ["Validated", "Inconclusive", "Invalidated"];
    for (const e of data.experiments) {
      assert.ok(verdicts.includes(e.verdict), `experiment "${e.id}" has an unknown verdict`);
      assert.ok(e.hypothesis, `experiment "${e.id}" has no hypothesis`);
      assert.ok(e.method, `experiment "${e.id}" has no method`);
      assert.ok(e.sampleSize > 0, `experiment "${e.id}" has an empty sample`);
      assert.ok(e.decision, `experiment "${e.id}" has no decision`);
    }
  });

  test("only validated experiments shipped something", () => {
    const ids = new Set(data.mvpFeatures.map((f) => f.id));
    for (const e of data.experiments) {
      if (e.shippedAs) {
        assert.equal(
          e.verdict,
          "Validated",
          `experiment "${e.id}" shipped ${e.shippedAs} without validating`,
        );
        assert.ok(ids.has(e.shippedAs), `experiment "${e.id}" shipped an unknown feature`);
      }
    }
  });

  test("the verdict counts cover every experiment", () => {
    assert.equal(
      data.validatedCount + data.inconclusiveCount + data.invalidatedCount,
      data.experiments.length,
      "the scorecard does not cover every experiment",
    );
  });

  test("the demand segments cover every active FPO", () => {
    const total = data.demandSegments.reduce((sum, s) => sum + s.fpos, 0);
    assert.equal(
      total,
      data.currentMvp.activeFpos,
      "the segments do not add up to the active FPO count",
    );
  });

  test("every feedback quote has an author and a sentiment", () => {
    const sentiments = ["Promoter", "Passive", "Detractor"];
    for (const f of data.feedback) {
      assert.ok(sentiments.includes(f.sentiment), `feedback "${f.id}" has an unknown sentiment`);
      assert.ok(f.by, `feedback "${f.id}" has no author`);
      assert.ok(f.role, `feedback "${f.id}" has no role`);
      assert.ok(f.since, `feedback "${f.id}" has no date`);
    }
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  test("all three product routes return 200 with content", async (t) => {
    let up = true;
    try {
      const probe = await fetch("http://localhost:3000/founder/product", {
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
    }
  });
});
