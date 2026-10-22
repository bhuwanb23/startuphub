/**
 * Founder IPR workspace tests — same dependency-free Node runner as
 * tests/incubation.test.mjs and tests/mentors.test.mjs (npm test picks
 * all three up).
 *
 * Beyond route and wiring checks, this suite guards the invariants that
 * are easy to break silently:
 *
 *   1. One health-score model. The score the overview shows, the score
 *      the assessment shows, the score the growth health screen shows
 *      and the score the copilot quotes must all be the same number,
 *      and closing an action must move it by exactly the points the
 *      action claims.
 *   2. One portfolio. The asset count on the dashboard, the bucket
 *      counts on the portfolio page, the ownership map and the
 *      valuation table must add up to the same total.
 *   3. One diligence percentage. The funding screen reports the IPR
 *      data-room section at 60% — the portfolio checklist must agree.
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
  "/founder/ipr": {
    page: "src/app/(app)/founder/ipr/page.tsx",
    component: "src/users/startup/components/ipr/ipr.tsx",
  },
  "/founder/ipr/patents": {
    page: "src/app/(app)/founder/ipr/patents/page.tsx",
    component: "src/users/startup/components/ipr/patents.tsx",
  },
  "/founder/ipr/trademarks": {
    page: "src/app/(app)/founder/ipr/trademarks/page.tsx",
    component: "src/users/startup/components/ipr/trademarks.tsx",
  },
  "/founder/ipr/copyright": {
    page: "src/app/(app)/founder/ipr/copyright/page.tsx",
    component: "src/users/startup/components/ipr/copyright.tsx",
  },
  "/founder/ipr/portfolio": {
    page: "src/app/(app)/founder/ipr/portfolio/page.tsx",
    component: "src/users/startup/components/ipr/portfolio.tsx",
  },
  "/founder/ipr/risk": {
    page: "src/app/(app)/founder/ipr/risk/page.tsx",
    component: "src/users/startup/components/ipr/risk.tsx",
  },
  "/founder/ipr/compliance": {
    page: "src/app/(app)/founder/ipr/compliance/page.tsx",
    component: "src/users/startup/components/ipr/compliance.tsx",
  },
};

describe("IPR routes", () => {
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
      assert.match(src, /"use client"/, "every IPR screen needs local state");
    });
  }

  test("each screen has at least 8 content sections", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      const cards = (src.match(/<Card[\s>]/g) ?? []).length;
      const stats = (
        src.match(/className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"/g) ?? []
      ).length;
      assert.ok(
        cards + stats >= 8,
        `${href} has ${cards + stats} sections, expected >= 8`,
      );
    }
  });

  test("every screen links out to the other six", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      for (const other of Object.keys(routes)) {
        if (other === href) continue;
        assert.ok(src.includes(other), `${href} never links to ${other}`);
      }
    }
  });

  test("no screen ships a dead '#' anchor", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      assert.ok(
        !/href="#/.test(src),
        `${href} still contains a dead href="#" stub`,
      );
    }
  });
});

describe("IPR sidebar navigation", () => {
  const nav = read("src/users/startup/constants/founder-nav.ts");
  const hrefs = [...nav.matchAll(/href: "(\/founder\/ipr[^"]*)"/g)].map((m) => m[1]);

  test("group exposes all seven sub-pages", () => {
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

  test("no IPR sub-page is still flagged 'soon'", () => {
    const block = nav.slice(
      nav.indexOf('label: "IPR & Legal"'),
      nav.indexOf('label: "Resources"'),
    );
    assert.ok(!/soon:\s*true/.test(block), "an IPR sub-page is still flagged soon");
  });

  test("no stale IPR anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("founder/ipr#")) {
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

describe("IPR data", () => {
  let data, dashboard;

  before(async () => {
    data = await import("../src/users/startup/constants/ipr-data.ts");
    dashboard = await import("../src/users/startup/constants/dashboard-data.ts");
  });

  const allowed = new Set(["default", "accent", "good", "warn", "bad"]);

  test("every tone is a value the Badge component understands", () => {
    const tones = [
      ...data.assetTypes.map((a) => a.tone),
      ...data.patents.map((p) => p.tone),
      ...data.trademarks.map((t) => t.tone),
      ...data.copyrightWorks.map((c) => c.tone),
      ...data.ossInventory.map((o) => o.tone),
      ...data.assignmentRegister.map((a) => a.tone),
      ...data.ipRisks.map((r) => r.tone),
      ...data.obligations.map((o) => o.tone),
      ...data.filingTracker.map((f) => f.tone),
      ...data.evidencePack.map((e) => e.tone),
    ];
    for (const tone of tones) {
      assert.ok(allowed.has(tone), `invalid tone "${tone}"`);
    }
  });

  /* ── The health model ─────────────────────────────────────── */
  test("dimension weights sum to 100", () => {
    const total = data.coverageDimensions.reduce((sum, d) => sum + d.weight, 0);
    assert.equal(total, 100, `weights sum to ${total}, expected 100`);
  });

  test("the weighted model reproduces the published health score", () => {
    const computed = data.healthScoreFrom(data.coverageDimensions);
    assert.equal(
      computed,
      data.healthScore,
      `the model computes ${computed} but the score is published as ${data.healthScore}`,
    );
  });

  test("closing every open action reproduces the projected score", () => {
    const projected = data.healthScoreFrom(
      data.coverageDimensions.map((d) => ({ score: d.after, weight: d.weight })),
    );
    assert.equal(
      projected,
      data.projectedHealth,
      `closing everything computes ${projected}, published as ${data.projectedHealth}`,
    );
  });

  test("every open action moves the score by exactly the points it claims", () => {
    const base = data.healthScoreFrom(data.coverageDimensions);
    for (const action of data.openActions) {
      const dim = data.coverageDimensions.find((d) => d.dim === action.dimension);
      assert.ok(dim, `action "${action.id}" targets unknown dimension "${action.dimension}"`);
      const after = data.healthScoreFrom(
        data.coverageDimensions.map((d) =>
          d.dim === action.dimension ? { score: d.after, weight: d.weight } : d,
        ),
      );
      assert.equal(
        after - base,
        action.impact,
        `closing "${action.title}" moves the score by ${after - base}, not ${action.impact}`,
      );
    }
  });

  test("the impact of every open action adds up to the total gain", () => {
    const totalImpact = data.openActions.reduce((sum, a) => sum + a.impact, 0);
    assert.equal(
      data.projectedHealth - data.healthScore,
      totalImpact,
      "the published gain does not equal the sum of the action impacts",
    );
  });

  test("each action points at a real dimension and has an owner and a due date", () => {
    for (const a of data.openActions) {
      assert.ok(a.owner, `action "${a.id}" has no owner`);
      assert.ok(a.due, `action "${a.id}" has no due date`);
      assert.ok(a.cost, `action "${a.id}" has no cost estimate`);
      assert.ok(a.detail.length > 20, `action "${a.id}" has no explanation`);
    }
  });

  /* ── The portfolio ────────────────────────────────────────── */
  test("bucket counts add up to the published total", () => {
    const sum = data.assetTypes.reduce((s, a) => s + a.count, 0);
    assert.equal(sum, data.totalAssets, `buckets sum to ${sum}`);
  });

  test("the ownership map accounts for every asset", () => {
    const sum = data.ownership.reduce((s, o) => s + o.assets, 0);
    assert.equal(
      sum,
      data.totalAssets,
      `the ownership map holds ${sum} assets but the portfolio holds ${data.totalAssets}`,
    );
  });

  test("the valuation table covers every instrument type", () => {
    for (const bucket of data.assetTypes) {
      if (bucket.count === 0) continue;
      const rows = data.valuation.filter((v) => v.type === bucket.type);
      assert.ok(
        rows.length > 0,
        `bucket "${bucket.type}" holds ${bucket.count} assets but nothing is valued`,
      );
    }
  });

  test("each bucket's estimated value equals the sum of its valuations", () => {
    for (const bucket of data.assetTypes) {
      const rows = data.valuation.filter((v) => v.type === bucket.type);
      if (rows.length === 0) continue;
      const sum = rows.reduce((s, v) => s + data.toLakhs(v.value), 0);
      assert.equal(
        sum,
        data.toLakhs(bucket.estValue),
        `bucket "${bucket.type}" is published as ${bucket.estValue} but its rows sum to ₹${sum} L`,
      );
    }
  });

  test("the lakh parser reads every currency string the same way", () => {
    assert.equal(data.toLakhs("₹95 L"), 95);
    assert.equal(data.toLakhs("₹1.9 Cr"), 190);
    assert.equal(data.toLakhs("—"), 0);
  });

  test("the portfolio total formats consistently", () => {
    const total = data.valuation.reduce((s, v) => s + data.toLakhs(v.value), 0);
    assert.equal(data.formatCr(total), "₹3.87 Cr");
  });

  test("registered counts never exceed the bucket they sit in", () => {
    for (const a of data.assetTypes) {
      assert.ok(
        a.registered <= a.count,
        `bucket "${a.type}" claims ${a.registered} registered out of ${a.count}`,
      );
    }
  });

  /* ── Patents ──────────────────────────────────────────────── */
  test("every patent sits on a real lifecycle stage", () => {
    for (const p of data.patents) {
      assert.ok(
        p.stage >= 0 && p.stage < data.patentStages.length,
        `patent "${p.id}" is on stage ${p.stage}, which does not exist`,
      );
      assert.ok(data.patentStages[p.stage], `patent "${p.id}" has no stage name`);
    }
  });

  test("every patent carries a counsel, a next action and a jurisdiction", () => {
    for (const p of data.patents) {
      assert.ok(p.counsel, `patent "${p.id}" has no counsel`);
      assert.ok(p.next, `patent "${p.id}" has no next action`);
      assert.ok(p.jurisdiction, `patent "${p.id}" has no jurisdiction`);
      assert.ok(p.claims > 0, `patent "${p.id}" claims no claims`);
    }
  });

  test("claim checklist ids are unique and every item has an owner", () => {
    const ids = data.claimChecklist.map((c) => c.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate claim ids");
    for (const c of data.claimChecklist) {
      assert.ok(c.owner, `claim "${c.id}" has no owner`);
      assert.ok(c.item, `claim "${c.id}" has no text`);
    }
  });

  test("every prior-art reference names the overlap it carries", () => {
    for (const w of data.priorArtWatch) {
      assert.ok(w.overlap, `prior art "${w.title}" has no overlap note`);
      assert.ok(allowed.has(w.tone), `prior art "${w.title}" has an invalid tone`);
    }
  });

  /* ── Trademarks ───────────────────────────────────────────── */
  test("every trademark sits in a class that exists", () => {
    const codes = data.trademarkClasses.map((c) => c.code);
    for (const t of data.trademarks) {
      for (const c of t.classes) {
        assert.ok(codes.includes(c), `mark "${t.name}" sits in unknown class ${c}`);
      }
    }
  });

  test("every conflicting mark sits in a class that exists", () => {
    const codes = data.trademarkClasses.map((c) => c.code);
    for (const m of data.conflictingMarks) {
      assert.ok(
        codes.includes(m.class),
        `conflict "${m.mark}" is in unknown class ${m.class}`,
      );
    }
  });

  test("the class checker offers at least the two classes a software company needs", () => {
    const codes = data.trademarkClasses.map((c) => c.code);
    assert.ok(codes.includes("9"), "class 9 is missing from the checker");
    assert.ok(codes.includes("42"), "class 42 is missing from the checker");
  });

  test("the recommended classes match the classes the live marks use", () => {
    const recommended = data.trademarkClasses.filter((c) => c.needed).map((c) => c.code);
    const used = data.trademarks.filter((t) => t.status === "Registered").flatMap((t) => t.classes);
    for (const c of used) {
      assert.ok(
        recommended.includes(c),
        `class ${c} carries a registered mark but is not recommended`,
      );
    }
  });

  test("every trademark watch entry records when it was checked", () => {
    for (const w of data.trademarkWatchlist) {
      assert.ok(w.checked, `watch "${w.term}" has no check date`);
      assert.ok(w.result, `watch "${w.term}" has no result`);
    }
  });

  /* ── Copyright ────────────────────────────────────────────── */
  test("every open-source dependency states its licence and the action it needs", () => {
    for (const o of data.ossInventory) {
      assert.ok(o.license, `dependency "${o.dependency}" has no licence`);
      assert.ok(o.action, `dependency "${o.dependency}" has no action`);
      assert.ok(allowed.has(o.tone), `dependency "${o.dependency}" has an invalid tone`);
    }
  });

  test("assignment register ids are unique and every party has a scope", () => {
    const ids = data.assignmentRegister.map((a) => a.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate assignment ids");
    for (const a of data.assignmentRegister) {
      assert.ok(a.scope, `assignment "${a.id}" has no scope`);
      assert.ok(a.party, `assignment "${a.id}" has no party`);
    }
  });

  test("the executed assignments match the contract-coverage dimension", () => {
    const executed = data.assignmentRegister.filter((a) => a.status === "Executed").length;
    const outstanding = data.assignmentRegister.length - executed;
    const dim = data.coverageDimensions.find((d) => d.dim === "Contract coverage");
    assert.ok(dim, "the contract-coverage dimension is missing");
    assert.ok(
      dim.note.includes(String(outstanding)),
      `the dimension note does not mention the ${outstanding} outstanding assignments`,
    );
  });

  /* ── Risk ─────────────────────────────────────────────────── */
  test("risk ids are unique and every risk is fully specified", () => {
    const ids = data.ipRisks.map((r) => r.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate risk ids");
    for (const r of data.ipRisks) {
      assert.ok(r.mitigation, `risk "${r.id}" has no mitigation`);
      assert.ok(r.owner, `risk "${r.id}" has no owner`);
      assert.ok(r.due, `risk "${r.id}" has no due date`);
      assert.ok(
        r.likelihood >= 0 && r.likelihood <= 100,
        `risk "${r.id}" has an impossible likelihood`,
      );
    }
  });

  test("every risk category in the filter list carries at least one risk", () => {
    for (const c of data.riskCategories) {
      const hits = data.ipRisks.filter((r) => r.category === c);
      assert.ok(hits.length > 0, `risk category "${c}" is a dead filter`);
    }
  });

  test("every freedom-to-operate check carries a verdict", () => {
    for (const f of data.freedomToOperate) {
      assert.ok(f.cleared, `FTO check "${f.claim}" has no verdict`);
      assert.ok(f.note, `FTO check "${f.claim}" has no note`);
    }
  });

  /* ── Compliance ───────────────────────────────────────────── */
  test("obligation ids are unique and every obligation has evidence and an owner", () => {
    const ids = data.obligations.map((o) => o.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate obligation ids");
    for (const o of data.obligations) {
      assert.ok(o.evidence, `obligation "${o.id}" has no evidence`);
      assert.ok(o.owner, `obligation "${o.id}" has no owner`);
      assert.ok(o.authority, `obligation "${o.id}" has no authority`);
    }
  });

  test("the filing tracker covers every patent and trademark", () => {
    const tracked = data.filingTracker.map((f) => f.filing).join(" | ");
    for (const p of data.patents) {
      assert.ok(
        tracked.includes(p.title),
        `patent "${p.title}" is not on the filing tracker`,
      );
    }
    for (const t of data.trademarks) {
      assert.ok(
        tracked.includes(t.name),
        `mark "${t.name}" is not on the filing tracker`,
      );
    }
  });

  test("every filing tracker row names a next step and an owner", () => {
    for (const f of data.filingTracker) {
      assert.ok(f.next, `filing "${f.filing}" has no next step`);
      assert.ok(f.owner, `filing "${f.filing}" has no owner`);
    }
  });

  test("the evidence pack names every document it shares", () => {
    for (const e of data.evidencePack) {
      assert.ok(e.shared, `evidence "${e.doc}" has no destination`);
      assert.ok(allowed.has(e.tone), `evidence "${e.doc}" has an invalid tone`);
    }
  });
});

describe("cross-workspace IPR invariants", () => {
  let data, dashboard;

  before(async () => {
    data = await import("../src/users/startup/constants/ipr-data.ts");
    dashboard = await import("../src/users/startup/constants/dashboard-data.ts");
  });

  test("the dashboard reports the same asset count as the portfolio", () => {
    assert.equal(
      dashboard.iprStatus.assets,
      data.totalAssets,
      "the dashboard and the IPR portfolio disagree on the asset count",
    );
    const kpi = dashboard.dashKpis.find((k) => k.label === "IP assets");
    assert.ok(kpi, "the dashboard KPI row no longer tracks IP assets");
    assert.equal(
      Number(kpi.value),
      data.totalAssets,
      "the dashboard KPI and the portfolio disagree on the asset count",
    );
  });

  test("the assessment, startup profile and growth health all quote one score", () => {
    const assessment = read("src/users/startup/components/startup/assessment.tsx");
    const profile = read("src/users/startup/components/startup/startup.tsx");
    const health = read("src/users/startup/components/growth/health.tsx");
    for (const [name, src] of [
      ["assessment", assessment],
      ["startup profile", profile],
      ["growth health", health],
    ]) {
      assert.ok(
        src.includes("healthScore"),
        `${name} no longer reads the shared health score`,
      );
      assert.ok(
        !/IP (?:& Legal|health)"?,?\s*score:\s*66/.test(src),
        `${name} still hard-codes a score of 66`,
      );
    }
  });

  test("the copilot quotes the same score and the same projection", () => {
    const copilot = read("src/users/startup/components/copilot/copilot.tsx");
    assert.ok(copilot.includes("healthScore"), "the copilot no longer reads the shared score");
    assert.ok(
      copilot.includes("projectedHealth"),
      "the copilot no longer reads the shared projection",
    );
  });

  test("the diligence checklist matches the funding screen's completeness", () => {
    const ready = data.diligenceChecklist.filter((d) => d.status === "Ready").length;
    const completeness = Math.round((ready / data.diligenceChecklist.length) * 100);
    const funding = read("src/users/startup/components/funding/funding.tsx");
    const match = funding.match(
      /section: "IPR portfolio", items: (\d+), completeness: (\d+)/,
    );
    assert.ok(match, "the funding screen no longer reports an IPR portfolio section");
    assert.equal(
      Number(match[1]),
      data.diligenceChecklist.length,
      "the funding screen and the checklist disagree on how many items there are",
    );
    assert.equal(
      Number(match[2]),
      completeness,
      `the funding screen reports ${match[2]}% but the checklist computes ${completeness}%`,
    );
  });

  test("the growth health screen still describes IP as the weakest dimension", () => {
    const health = read("src/users/startup/components/growth/health.tsx");
    assert.ok(
      /IP health is the only sub-70 dimension/.test(health),
      "the growth health screen no longer calls out IP as the weakest dimension",
    );
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  test("all seven IPR routes return 200 with content", async (t) => {
    let up = true;
    try {
      const probe = await fetch("http://localhost:3000/founder/ipr", {
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

    const html = await (await fetch("http://localhost:3000/founder/ipr")).text();
    assert.match(html, /Trademark Management/);
    assert.match(html, /Compliance Tracking/);
  });
});
