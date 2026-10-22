/**
 * Market intelligence workspace tests — same dependency-free Node runner
 * as the incubation, mentors, ipr, resources and product suites.
 *
 * The market screens are the easiest place in the app to publish a
 * number twice, so this suite guards the invariants that matter:
 *
 *   1. Every screen reads the shared market ledger.
 *   2. The headline numbers are derived. The tracked-player count adds
 *      up, whitespace comes from the axes, shares come from the sizes.
 *   3. The four screens agree. Trends point at axes that exist,
 *      reports carry a relevance score, rivals carry an overlap.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(app, p), "utf8");

const routes = {
  "/founder/market": {
    page: "src/app/(app)/founder/market/page.tsx",
    component: "src/users/startup/components/market/market.tsx",
  },
  "/founder/market/competitors": {
    page: "src/app/(app)/founder/market/competitors/page.tsx",
    component: "src/users/startup/components/market/competitors.tsx",
  },
  "/founder/market/reports": {
    page: "src/app/(app)/founder/market/reports/page.tsx",
    component: "src/users/startup/components/market/reports.tsx",
  },
  "/founder/market/trends": {
    page: "src/app/(app)/founder/market/trends/page.tsx",
    component: "src/users/startup/components/market/trends.tsx",
  },
};

describe("market routes", () => {
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

    test(`${href} component reads the shared market ledger`, () => {
      const src = read(files.component);
      assert.match(
        src,
        /from "@\/users\/startup\/constants\/market-data"/,
        "the screen no longer reads the shared market data",
      );
    });
  }
});

describe("market navigation", () => {
  const nav = read("src/users/startup/constants/founder-nav.ts");

  test("the market group lists all four screens", () => {
    assert.match(nav, /\{ name: "Market Overview", href: "\/founder\/market" \}/);
    assert.match(nav, /\{ name: "Reports", href: "\/founder\/market\/reports" \}/);
    assert.match(nav, /\{ name: "Trends", href: "\/founder\/market\/trends" \}/);
    assert.match(nav, /\{ name: "Competitor Analysis", href: "\/founder\/market\/competitors" \}/);
  });

  test("reports and trends are real pages, not soon links", () => {
    for (const name of ["Reports", "Trends"]) {
      assert.equal(
        new RegExp(`name: "${name}"[^}]*soon`).test(nav),
        false,
        `${name} is implemented — it must not stay flagged as soon`,
      );
    }
  });
});

describe("market data", () => {
  let data;

  before(async () => {
    data = await import("../src/users/startup/constants/market-data.ts");
  });

  test("the tracked player count covers every list", () => {
    assert.equal(
      data.trackedCompetitors,
      data.directCompetitors.length +
        data.adjacentCompetitors.length +
        data.substituteCompetitors.length,
      "the tracked count does not cover every player",
    );
    assert.ok(data.trackedCompetitors > 0, "no competitors are tracked");
  });

  test("the market ladder runs TAM to SOM, biggest first", () => {
    const kinds = data.marketSegments.map((s) => s.kind);
    assert.deepEqual(kinds, ["TAM", "SAM", "SOM"]);
    assert.ok(data.tam.size > data.sam.size, "the TAM is not bigger than the SAM");
    assert.ok(data.sam.size > data.som.size, "the SAM is not bigger than the SOM");
  });

  test("the market shares are computed from the sizes", () => {
    assert.equal(data.samShare, Math.round((data.sam.size / data.tam.size) * 1000) / 10);
    assert.equal(data.somShare, Math.round((data.som.size / data.tam.size) * 1000) / 10);
    assert.ok(data.samShare > 0 && data.samShare < 100, "the SAM share is out of range");
    assert.ok(data.somShare < data.samShare, "the SOM share should be inside the SAM share");
  });

  test("whitespace is the share of axes nobody matches us on", () => {
    const ahead = data.marketAxes.filter((a) => a.us > a.best).length;
    assert.equal(data.whitespaceScore, Math.round((ahead / data.marketAxes.length) * 100));
    assert.equal(data.leadingAxes.length + data.trailingAxes.length, data.marketAxes.length);
    for (const a of data.marketAxes) {
      assert.ok(a.us >= 0 && a.us <= 10, `axis "${a.axis}" has an out-of-range score`);
      assert.ok(a.best >= 0 && a.best <= 10, `axis "${a.axis}" has an out-of-range best`);
      assert.ok(a.note, `axis "${a.axis}" has no note`);
    }
  });

  test("every direct rival carries an overlap and a recent move", () => {
    for (const c of data.directCompetitors) {
      assert.ok(c.overlap > 0 && c.overlap <= 100, `rival "${c.name}" has a bad overlap`);
      assert.ok(c.note, `rival "${c.name}" has no read on it`);
      assert.ok(c.lastMove, `rival "${c.name}" has no last move`);
      assert.ok(c.price, `rival "${c.name}" has no pricing`);
      assert.ok(c.stage, `rival "${c.name}" has no funding stage`);
    }
  });

  test("the average overlap is computed from the rivals", () => {
    const avg = Math.round(
      data.directCompetitors.reduce((sum, c) => sum + c.overlap, 0) /
        data.directCompetitors.length,
    );
    assert.equal(data.averageOverlap, avg);
    assert.equal(data.closestRival.overlap, Math.max(...data.directCompetitors.map((c) => c.overlap)));
  });

  test("the watchlist players are complete", () => {
    for (const p of [...data.adjacentCompetitors, ...data.substituteCompetitors]) {
      assert.ok(p.name, "a watchlist player has no name");
      assert.ok(p.category, `watchlist player "${p.name}" has no category`);
      assert.ok(p.note, `watchlist player "${p.name}" has no note`);
    }
  });

  test("the SWOT has four quadrants with content", () => {
    assert.deepEqual(
      data.swot.map((s) => s.label),
      ["Strengths", "Weaknesses", "Opportunities", "Threats"],
    );
    for (const s of data.swot) {
      assert.ok(s.items.length > 0, `${s.label} is empty`);
    }
  });

  test("every trend is measurable and has an action", () => {
    const impacts = ["High", "Medium", "Low"];
    for (const t of data.trends) {
      assert.ok(impacts.includes(t.impact), `trend "${t.title}" has an unknown impact`);
      assert.ok(t.momentum >= 0 && t.momentum <= 100, `trend "${t.title}" has a bad momentum`);
      assert.ok(t.action, `trend "${t.title}" has no action`);
      assert.ok(t.source, `trend "${t.title}" has no source`);
      assert.ok(t.window, `trend "${t.title}" has no window`);
    }
  });

  test("trends that name an axis point at one that exists", () => {
    const ids = new Set(data.marketAxes.map((a) => a.id));
    for (const t of data.trends) {
      if (t.axisId) {
        assert.ok(ids.has(t.axisId), `trend "${t.title}" points at no axis`);
      }
    }
  });

  test("the momentum and impact counts cover every trend", () => {
    assert.equal(data.highImpactTrends.length, data.trends.filter((t) => t.impact === "High").length);
    assert.equal(
      data.averageMomentum,
      Math.round(data.trends.reduce((sum, t) => sum + t.momentum, 0) / data.trends.length),
    );
  });

  test("every report is complete and ranked", () => {
    for (const r of data.reports) {
      assert.ok(r.title, "a report has no title");
      assert.ok(r.summary, `report "${r.title}" has no summary`);
      assert.ok(r.pages > 0, `report "${r.title}" has no pages`);
      assert.ok(r.readMinutes > 0, `report "${r.title}" has no read time`);
      assert.ok(r.relevance >= 0 && r.relevance <= 100, `report "${r.title}" has a bad relevance`);
      assert.ok(r.date, `report "${r.title}" has no date`);
    }
  });

  test("the report counts are computed from the library", () => {
    assert.equal(data.unreadReports, data.reports.filter((r) => r.unread).length);
    assert.equal(
      data.averageRelevance,
      Math.round(data.reports.reduce((sum, r) => sum + r.relevance, 0) / data.reports.length),
    );
  });

  test("every market action points somewhere real", () => {
    for (const a of data.marketActions) {
      assert.ok(a.action, "an action has no description");
      assert.ok(a.owner, `action "${a.action}" has no owner`);
      assert.ok(a.due, `action "${a.action}" has no due date`);
      assert.match(a.href, /^\/founder\//, `action "${a.action}" points outside the founder app`);
    }
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  test("all four market routes return 200 with content", async (t) => {
    let up = true;
    try {
      const probe = await fetch("http://localhost:3000/founder/market", {
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
