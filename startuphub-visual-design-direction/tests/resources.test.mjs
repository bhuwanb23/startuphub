/**
 * Resources workspace tests — same dependency-free Node runner as
 * tests/incubation.test.mjs, tests/mentors.test.mjs and
 * tests/ipr.test.mjs (npm test picks all four up).
 *
 * Beyond route and wiring checks, this suite guards the invariants
 * that are easy to break silently:
 *
 *   1. One fit model. The fit score published on every catalogue item
 *      must be exactly what the weighted model computes from that
 *      item's dimension scores.
 *   2. One budget. The committed spend, the team split and the
 *      published utilisation must all describe the same ledger, and
 *      the dashboard's resource card must read that same ledger.
 *   3. No dead filters. Every category, cost band and lead band has
 *      to return at least one resource.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(app, p), "utf8");

/* Recursively collect every source file under `dir`. Dependency-free so the
 * suite runs identically on Windows, macOS and Linux. */
function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const routes = {
  "/founder/resources": {
    page: "src/app/(app)/founder/resources/page.tsx",
    component: "src/users/startup/components/resources/resources.tsx",
  },
  "/founder/resources/matching": {
    page: "src/app/(app)/founder/resources/matching/page.tsx",
    component: "src/users/startup/components/resources/matching.tsx",
  },
  "/founder/resources/requests": {
    page: "src/app/(app)/founder/resources/requests/page.tsx",
    component: "src/users/startup/components/resources/requests.tsx",
  },
  "/founder/resources/allocation": {
    page: "src/app/(app)/founder/resources/allocation/page.tsx",
    component: "src/users/startup/components/resources/allocation.tsx",
  },
};

describe("resource routes", () => {
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
      assert.match(
        src,
        /from "@\/components\/app\/widgets"/,
        "must use the house widget set",
      );
      assert.match(src, /"use client"/, "every resource screen needs local state");
    });
  }

  test("each screen has at least 8 content sections", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      const cards = (src.match(/<Card[^>]*\btitle=/g) ?? []).length;
      const stats = (
        src.match(/className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"/g) ?? []
      ).length;
      assert.ok(
        cards + stats >= 8,
        `${href} has ${cards + stats} sections, expected >= 8`,
      );
    }
  });

  test("every screen links out to the other three", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      for (const other of Object.keys(routes)) {
        if (other === href) continue;
        assert.ok(
          src.includes(`"${other}"`),
          `${href} never links to ${other}`,
        );
      }
    }
  });

  test("no screen ships a dead '#' anchor", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      assert.ok(!/href="#/.test(src), `${href} still contains a dead href="#" stub`);
    }
  });
});

describe("resource sidebar navigation", () => {
  const nav = read("src/users/startup/constants/founder-nav.ts");
  const hrefs = [
    ...nav.matchAll(/href: "(\/founder\/resources[^"]*)"/g),
  ].map((m) => m[1]);

  test("group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      assert.ok(
        existsSync(join(app, "src/app/(app)", href, "page.tsx")),
        `dead sidebar link: ${href}`,
      );
    }
  });

  test("no resource sub-page is still flagged 'soon'", () => {
    const block = nav.slice(
      nav.indexOf('label: "Resources"'),
      nav.indexOf('label: "Product"'),
    );
    assert.ok(!/soon:\s*true/.test(block), "a resource sub-page is still flagged soon");
  });

  test("no stale resource anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("founder/resources#")) {
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

describe("resource data", () => {
  let data, dashboard;

  before(async () => {
    data = await import("../src/users/startup/constants/resource-data.ts");
    dashboard = await import("../src/users/startup/constants/dashboard-data.ts");
  });

  const allowed = new Set(["default", "accent", "good", "warn", "bad"]);

  test("every tone is a value the Badge component understands", () => {
    const tones = [
      ...data.resourceCategories.map((c) => c.tone),
      ...data.providers.map((p) => p.tone),
      ...data.allocations.map((a) => a.tone),
      ...data.resourceRequests.map((r) => r.tone),
      ...data.approvalRoutes.map((a) => a.tone),
      ...data.allocationByTeam.map((t) => t.tone),
      ...data.reallocationQueue.map((r) => r.tone),
    ];
    for (const tone of tones) {
      assert.ok(allowed.has(tone), `invalid tone "${tone}"`);
    }
  });

  /* ── The fit model ─────────────────────────────────────────── */
  test("dimension weights sum to 100", () => {
    const total = data.matchingDimensions.reduce((sum, d) => sum + d.weight, 0);
    assert.equal(total, 100, `weights sum to ${total}, expected 100`);
  });

  test("the weighted model reproduces every published fit score", () => {
    for (const item of data.resourceCatalogue) {
      const computed = data.resourceScoreFrom(item.scores);
      assert.equal(
        computed,
        item.fit,
        `resource "${item.id}" computes ${computed} but is published as ${item.fit}`,
      );
    }
  });

  test("every resource is scored on every dimension", () => {
    for (const item of data.resourceCatalogue) {
      for (const d of data.matchingDimensions) {
        const score = item.scores[d.dim];
        assert.ok(
          typeof score === "number",
          `resource "${item.id}" has no score for "${d.dim}"`,
        );
        assert.ok(
          score >= 0 && score <= 100,
          `resource "${item.id}" has an impossible score for "${d.dim}"`,
        );
      }
    }
  });

  test("fit scores are ranked the same way everywhere", () => {
    const ranked = data.rankedCatalogue.map((r) => r.fit);
    for (let i = 1; i < ranked.length; i++) {
      assert.ok(
        ranked[i] <= ranked[i - 1],
        `the ranked catalogue is out of order at position ${i}`,
      );
    }
  });

  /* ── Providers ─────────────────────────────────────────────── */
  test("every catalogue item names a provider that exists", () => {
    const names = data.providers.map((p) => p.name);
    for (const item of data.resourceCatalogue) {
      assert.ok(
        names.includes(item.provider),
        `resource "${item.id}" names an unknown provider "${item.provider}"`,
      );
    }
  });

  test("provider item counts match the catalogue", () => {
    for (const p of data.providers) {
      const items = data.resourceCatalogue.filter((r) => r.provider === p.name);
      assert.equal(
        items.length,
        p.items,
        `provider "${p.name}" claims ${p.items} resources but the catalogue holds ${items.length}`,
      );
    }
  });

  test("provider reliability is the mean of its resources' reliability score", () => {
    for (const p of data.providers) {
      const items = data.resourceCatalogue.filter((r) => r.provider === p.name);
      const mean = Math.round(
        items.reduce((s, r) => s + r.scores["Provider reliability"], 0) / items.length,
      );
      assert.equal(
        mean,
        p.reliability,
        `provider "${p.name}" is published at ${p.reliability} but its resources average ${mean}`,
      );
    }
  });

  /* ── Filters ───────────────────────────────────────────────── */
  test("every category carries at least one resource", () => {
    for (const c of data.resourceCategories) {
      const hits = data.resourceCatalogue.filter((r) => r.category === c.category);
      assert.ok(hits.length > 0, `category "${c.category}" is a dead filter`);
    }
  });

  test("every cost band returns at least one resource", () => {
    for (const band of data.costBands) {
      const hits = data.resourceCatalogue.filter((r) => data.costBandOf(r.cost) === band);
      assert.ok(hits.length > 0, `cost band "${band}" is a dead filter`);
    }
  });

  test("every lead band returns at least one resource", () => {
    for (const band of data.leadBands) {
      const hits = data.resourceCatalogue.filter(
        (r) => data.leadBandOf(r.leadDays) === band,
      );
      assert.ok(hits.length > 0, `lead band "${band}" is a dead filter`);
    }
  });

  test("the catalogue has no two resources with the same id", () => {
    const ids = data.resourceCatalogue.map((r) => r.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate resource ids");
  });

  /* ── Requests ──────────────────────────────────────────────── */
  test("request ids are unique", () => {
    const ids = data.resourceRequests.map((r) => r.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate request ids");
  });

  test("every request points at a real catalogue resource", () => {
    for (const r of data.resourceRequests) {
      const item = data.resourceCatalogue.find((c) => c.id === r.resourceId);
      assert.ok(item, `request "${r.id}" points at unknown resource "${r.resourceId}"`);
    }
  });

  test("a request never claims a better fit than the resource itself", () => {
    for (const r of data.resourceRequests) {
      const item = data.resourceCatalogue.find((c) => c.id === r.resourceId);
      assert.ok(
        r.fit <= item.fit,
        `request "${r.id}" claims ${r.fit}% fit but "${item.title}" only scores ${item.fit}%`,
      );
    }
  });

  test("every request carries an owner, a quantity and an sla", () => {
    for (const r of data.resourceRequests) {
      assert.ok(r.owner, `request "${r.id}" has no owner`);
      assert.ok(r.qty, `request "${r.id}" has no quantity`);
      assert.ok(r.note.length > 20, `request "${r.id}" has no explanation`);
      assert.ok(r.slaDays > 0, `request "${r.id}" has no turnaround in days`);
    }
  });

  test("every requested category has an approval route", () => {
    const categories = data.approvalRoutes.map((a) => a.category);
    for (const r of data.resourceRequests) {
      assert.ok(
        categories.includes(r.category),
        `no approver is named for the "${r.category}" category`,
      );
    }
  });

  test("every catalogue category has an approval route", () => {
    const routed = data.approvalRoutes.map((a) => a.category);
    for (const c of data.resourceCategories) {
      assert.ok(
        routed.includes(c.category),
        `the "${c.category}" category has no approval route`,
      );
    }
  });

  /* ── Allocations and the budget ─────────────────────────────── */
  test("every allocation points at a real catalogue resource", () => {
    for (const a of data.allocations) {
      assert.ok(
        data.resourceCatalogue.some((c) => c.id === a.resourceId),
        `allocation "${a.id}" points at unknown resource "${a.resourceId}"`,
      );
    }
  });

  test("committed spend equals the sum of every allocation", () => {
    const committed = data.allocations.reduce((s, a) => s + a.allocated, 0);
    assert.equal(
      Number(committed.toFixed(2)),
      data.resourceBudget.committed,
      `the ledger sums to ₹${committed} L but the budget claims ₹${data.resourceBudget.committed} L`,
    );
  });

  test("committed spend never exceeds the cap", () => {
    assert.ok(
      data.resourceBudget.committed <= data.resourceBudget.cap,
      "more is committed than the quarter allows",
    );
  });

  test("the team split adds up to the committed spend", () => {
    const spend = data.allocationByTeam.reduce((s, t) => s + t.spend, 0);
    assert.equal(
      Number(spend.toFixed(2)),
      data.resourceBudget.committed,
      `the team split sums to ₹${spend} L but ₹${data.resourceBudget.committed} L is committed`,
    );
  });

  test("the team percentages add up to 100", () => {
    const pct = data.allocationByTeam.reduce((s, t) => s + t.pct, 0);
    assert.ok(
      Math.abs(pct - 100) < 0.05,
      `the team percentages sum to ${pct}, expected 100`,
    );
  });

  test("published utilisation matches the weighted model", () => {
    assert.equal(
      data.budgetUtilisation(),
      data.budgetUtilisationPct,
      "the allocation screen quotes a utilisation the ledger does not produce",
    );
  });

  test("no allocation is over-used or has a lapsed date", () => {
    for (const a of data.allocations) {
      assert.ok(a.usedPct >= 0 && a.usedPct <= 100, `allocation "${a.id}" is over-used`);
      assert.ok(a.daysLeft > 0, `allocation "${a.id}" has already expired`);
      assert.ok(a.owner, `allocation "${a.id}" has no owner`);
      assert.ok(a.team, `allocation "${a.id}" has no team`);
    }
  });

  test("credit lines never overspend", () => {
    for (const l of data.creditLines) {
      assert.ok(l.used <= l.granted, `credit line "${l.id}" has spent more than it holds`);
      assert.ok(l.allocatedTo, `credit line "${l.id}" says nothing it is for`);
    }
  });

  test("credits remaining is the sum of what is left on every line", () => {
    const expected = data.creditLines.reduce((s, l) => s + (l.granted - l.used), 0);
    assert.equal(data.creditsRemaining, expected, "the remaining credit is not the sum of the lines");
  });

  test("reallocation moves are unique and fully specified", () => {
    const ids = data.reallocationQueue.map((r) => r.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate reallocation ids");
    for (const r of data.reallocationQueue) {
      assert.ok(r.from, `move "${r.id}" has no origin`);
      assert.ok(r.to, `move "${r.id}" has no destination`);
      assert.ok(r.rationale.length > 20, `move "${r.id}" has no rationale`);
      assert.ok(r.saves, `move "${r.id}" has no stated saving`);
    }
  });

  /* ── Matching ──────────────────────────────────────────────── */
  test("every picker option is a well-formed choice", () => {
    for (const [key, options] of Object.entries(data.preferenceChoices)) {
      assert.ok(options.length >= 2, `picker "${key}" offers too few options`);
      for (const o of options) {
        assert.ok(o.value, `picker "${key}" has an option with no value`);
        assert.ok(o.note, `picker "${key}" option "${o.value}" has no explanation`);
        assert.ok(
          o.confidence >= 0 && o.confidence <= 100,
          `"${o.value}" confidence out of range`,
        );
      }
    }
  });

  test("each picker rewards specificity — confidence ascends down the list", () => {
    for (const [key, options] of Object.entries(data.preferenceChoices)) {
      for (let i = 1; i < options.length; i++) {
        assert.ok(
          options[i].confidence >= options[i - 1].confidence,
          `picker "${key}" option "${options[i].value}" is no more confident than "${options[i - 1].value}"`,
        );
      }
    }
  });

  test("preference labels match the pickers they index", () => {
    for (const l of data.preferenceLabels) {
      assert.ok(
        Object.hasOwn(data.preferenceChoices, l.key),
        `label "${l.label}" points at unknown picker "${l.key}"`,
      );
    }
    assert.equal(
      data.preferenceLabels.length,
      Object.keys(data.preferenceChoices).length,
      "a picker is not reachable from the screen",
    );
  });

  test("the matching pipeline covers read, score, rank and claim", () => {
    const steps = data.matchPipeline.map((s) => s.step.toLowerCase());
    for (const required of ["read", "score", "rank", "claim"]) {
      assert.ok(steps.includes(required), `pipeline is missing the "${required}" step`);
    }
  });

  test("declined and feedback records are fully specified", () => {
    for (const d of data.declinedResources) {
      assert.ok(d.reason, `declined "${d.resource}" has no reason`);
      assert.ok(d.when, `declined "${d.resource}" has no date`);
    }
    for (const f of data.feedbackSignals) {
      assert.ok(f.signal, "a feedback signal has no label");
      assert.ok(f.effect, "a feedback signal has no effect");
    }
  });
});

describe("cross-workspace resource invariants", () => {
  let data, dashboard;

  before(async () => {
    data = await import("../src/users/startup/constants/resource-data.ts");
    dashboard = await import("../src/users/startup/constants/dashboard-data.ts");
  });

  test("the dashboard resource card reads the shared resource ledger", () => {
    const source = read("src/users/startup/components/dashboard/overview.tsx");
    assert.match(
      source,
      /from "@\/users\/startup\/constants\/resource-data"/,
      "the dashboard no longer reads the shared resource ledger",
    );
  });

  test("the dashboard data module stays importable on its own", () => {
    assert.ok(dashboard.dashKpis.length > 0, "the dashboard KPIs are missing");
    assert.equal(
      read("src/users/startup/constants/dashboard-data.ts").includes('from "./resource-data"'),
      false,
      "the dashboard data module must not import the resource ledger — Node's ESM loader cannot resolve it",
    );
  });

  test("the dashboard agrees with the allocation ledger", () => {
    assert.equal(
      data.resourceStatus.active + data.resourceStatus.depleted,
      data.allocations.length,
      "the dashboard's live + depleted count does not match the ledger",
    );
    assert.equal(
      data.resourceStatus.credits,
      data.formatUsd(data.creditsRemaining),
      "the dashboard quotes a different credit balance than the ledger",
    );
  });

  test("the dashboard and the allocation screen quote the same utilisation", () => {
    const allocation = read("src/users/startup/components/resources/allocation.tsx");
    assert.ok(
      allocation.includes("budgetUtilisationPct"),
      "the allocation screen no longer reads the shared utilisation",
    );
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  test("all four resource routes return 200 with content", async (t) => {
    let up = true;
    try {
      const probe = await fetch("http://localhost:3000/founder/resources", {
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

    const html = await (await fetch("http://localhost:3000/founder/resources")).text();
    assert.match(html, /Resource Matching/);
    assert.match(html, /Resource Allocation/);
  });
});
