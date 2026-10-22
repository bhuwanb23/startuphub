/**
 * Mentor workspace tests — same dependency-free Node runner as
 * tests/incubation.test.mjs (npm test picks up both).
 *
 * Beyond route/wiring checks, this suite guards two invariants that
 * are easy to break silently:
 *
 *   1. The hours logged across the mentor roster must equal the
 *      allowance the *incubation* workspace reports as used. If they
 *      drift, a founder reads two different numbers for one truth.
 *   2. Every filter chip must return at least one mentor — a dead chip
 *      looks like an empty product.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const app = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(app, p), "utf8");

const routes = {
  "/founder/mentors": {
    page: "src/app/(app)/founder/mentors/page.tsx",
    component: "src/users/startup/components/mentors/mentors.tsx",
  },
  "/founder/mentors/matching": {
    page: "src/app/(app)/founder/mentors/matching/page.tsx",
    component: "src/users/startup/components/mentors/matching.tsx",
  },
  "/founder/mentors/sessions": {
    page: "src/app/(app)/founder/mentors/sessions/page.tsx",
    component: "src/users/startup/components/mentors/sessions.tsx",
  },
};

describe("mentor routes", () => {
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
      assert.match(src, /from "@\/components\/app\/widgets"/, "must use the house widget set");
    });
  }

  test("each screen has at least 8 content sections", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      const cards = (src.match(/<Card[\s>]/g) ?? []).length;
      const stats = (src.match(/className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"/g) ?? []).length;
      assert.ok(cards + stats >= 8, `${href} has ${cards + stats} sections, expected >= 8`);
    }
  });

  test("every screen links out to the other two", () => {
    for (const [href, files] of Object.entries(routes)) {
      const src = read(files.component);
      for (const other of Object.keys(routes)) {
        if (other === href) continue;
        assert.ok(src.includes(other), `${href} never links to ${other}`);
      }
    }
  });
});

describe("mentor sidebar navigation", () => {
  const nav = read("src/users/startup/constants/founder-nav.ts");
  const hrefs = [...nav.matchAll(/href: "(\/founder\/mentors[^"]*)"/g)].map((m) => m[1]);

  test("group exposes all three sub-pages", () => {
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

  test("no mentor sub-page is still flagged 'soon'", () => {
    const block = nav.slice(nav.indexOf('label: "Mentors"'), nav.indexOf('label: "IPR'));
    assert.ok(!/soon:\s*true/.test(block), "a mentor sub-page is still flagged soon");
  });

  test("no stale mentor anchors anywhere in src", () => {
    const out = execSync(
      'grep -rn "founder/mentors#" src/ --include=*.tsx --include=*.ts || true',
      { cwd: app, encoding: "utf8" },
    );
    assert.equal(out.trim(), "", `found stale #anchors:\n${out}`);
  });
});

describe("mentor data", () => {
  let data, incubation, catalogue, filters;

  before(async () => {
    data = await import("../src/users/startup/constants/mentor-data.ts");
    incubation = await import("../src/users/startup/constants/incubation-data.ts");
    catalogue = (await import("../src/views/explore/mentors/constants/mentors.ts")).mentors;
    filters = (await import("../src/views/explore/mentors/constants/mentors.ts")).mentorFilters;
  });

  const allowed = new Set(["default", "accent", "good", "warn", "bad"]);

  test("every tone is a value the Badge component understands", () => {
    const tones = [
      ...data.engagements.map((e) => e.tone),
      ...data.pendingRequests.map((r) => r.tone),
      ...data.upcomingSessions.map((s) => s.tone),
    ];
    for (const tone of tones) {
      assert.ok(allowed.has(tone), `invalid tone "${tone}"`);
    }
  });

  test("every engagement points at a mentor in the catalogue", () => {
    for (const e of data.engagements) {
      assert.ok(
        catalogue.some((m) => m.slug === e.slug),
        `engagement slug "${e.slug}" is not in the mentor catalogue`,
      );
    }
  });

  test("every catalogue mentor has a fit score and a reason", () => {
    for (const m of catalogue) {
      assert.ok(data.matchScoreBySlug[m.slug] !== undefined, `no fit score for "${m.slug}"`);
      assert.ok(data.matchReasonBySlug[m.slug], `no match reason for "${m.slug}"`);
      const score = data.matchScoreBySlug[m.slug];
      assert.ok(score >= 0 && score <= 100, `score for "${m.slug}" out of range`);
    }
  });

  test("fit scores contain no orphan keys", () => {
    for (const slug of Object.keys(data.matchScoreBySlug)) {
      assert.ok(catalogue.some((m) => m.slug === slug), `"${slug}" is scored but not in the catalogue`);
    }
  });

  /* ── The cross-workspace invariant ─────────────────────────── */
  test("roster hours equal the hours the incubation workspace reports used", () => {
    const logged = data.engagements.reduce((sum, e) => sum + e.hours, 0);
    assert.equal(
      logged,
      data.mentorHourAllocation.used,
      `roster sums to ${logged}h but the header claims ${data.mentorHourAllocation.used}h`,
    );
  });

  test("roster hours never exceed the programme allowance", () => {
    assert.ok(
      data.mentorHourAllocation.used <= data.mentorHourAllocation.total,
      "more mentor hours logged than the programme grants",
    );
  });

  test("incubation and mentor workspaces agree on the mentor-hour figure", () => {
    const incubationHours = incubation.benefitUsage.find((b) => b.label === "Mentor hours");
    assert.ok(incubationHours, "incubation data no longer tracks a Mentor hours line");
    assert.equal(
      incubationHours.used,
      data.mentorHourAllocation.used,
      "the two workspaces report different mentor-hour figures",
    );
  });

  test("sessions in history plus upcoming stay inside the logged total", () => {
    const logged = data.engagements.reduce((sum, e) => sum + e.sessions, 0);
    const listed = data.sessionHistory.length + data.upcomingSessions.length;
    assert.ok(listed <= logged, `${listed} sessions listed but only ${logged} claimed`);
  });

  test("session records carry the fields their screens render", () => {
    for (const s of data.upcomingSessions) {
      for (const key of ["id", "mentor", "topic", "when", "type", "prep"]) {
        assert.ok(s[key], `upcoming session ${s.id} missing "${key}"`);
      }
    }
    for (const h of data.sessionHistory) {
      for (const key of ["id", "mentor", "topic", "date", "score", "notes", "duration"]) {
        assert.ok(h[key] !== undefined && h[key] !== null, `history ${h.id} missing "${key}"`);
      }
      assert.ok(h.score >= 1 && h.score <= 5, `rating out of range on ${h.id}`);
    }
  });

  test("action item ids are unique so checkbox state can key off them", () => {
    const ids = data.sessionActionItems.map((a) => a.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate action-item ids");
  });

  /* ── Filters ───────────────────────────────────────────────── */
  test("every expertise chip returns at least one mentor", () => {
    for (const e of filters.expertise) {
      const hits = catalogue.filter((m) => m.expertise.includes(e));
      assert.ok(hits.length > 0, `expertise "${e}" is a dead chip`);
    }
  });

  test("every industry chip returns at least one mentor", () => {
    for (const i of filters.industries) {
      const hits = catalogue.filter((m) => m.industry === i);
      assert.ok(hits.length > 0, `industry "${i}" is a dead chip`);
    }
  });

  test("every availability chip returns at least one mentor", () => {
    for (const a of filters.availability) {
      const hits = catalogue.filter((m) => m.availability === a);
      assert.ok(hits.length > 0, `availability "${a}" is a dead chip`);
    }
  });

  /* ── Matching ──────────────────────────────────────────────── */
  test("dimension weights sum to 100", () => {
    const total = data.matchingDimensions.reduce((sum, d) => sum + d.weight, 0);
    assert.equal(total, 100, `weights sum to ${total}, expected 100`);
  });

  test("every picker option is a well-formed choice", () => {
    for (const [key, options] of Object.entries(data.preferenceChoices)) {
      assert.ok(options.length >= 2, `picker "${key}" offers too few options`);
      for (const o of options) {
        assert.ok(o.value, `picker "${key}" has an option with no value`);
        assert.ok(o.note, `picker "${key}" option "${o.value}" has no explanation`);
        assert.ok(o.confidence >= 0 && o.confidence <= 100, `"${o.value}" confidence out of range`);
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

  test("matching pipeline covers read, score, rank and introduce", () => {
    const steps = data.matchPipeline.map((s) => s.step.toLowerCase());
    for (const required of ["read", "score", "rank", "introduce"]) {
      assert.ok(steps.includes(required), `pipeline is missing the "${required}" step`);
    }
  });
});

describe("http smoke (requires dev server on :3000)", () => {
  test("all three mentor routes return 200 with content", async (t) => {
    let up = true;
    try {
      const probe = await fetch("http://localhost:3000/founder/mentors", {
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

    const html = await (await fetch("http://localhost:3000/founder/mentors")).text();
    assert.match(html, /Mentor Matching/);
    assert.match(html, /Mentor Sessions/);
  });
});
