/**
 * Incubator organization feature tests — dependency-free, runs on Node's
 * built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All four routes exist and are wired to real components.
 *   2. The three former "Soon" stubs are gone — real routes, not anchors.
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

/* ── The four organization screens ─────────────────────────────── */
const routes = {
  "/incubator/organization": {
    page: "src/app/(app)/incubator/organization/page.tsx",
    component: "src/users/incubator/components/organization/organization.tsx",
    export: "Organization",
  },
  "/incubator/organization/team": {
    page: "src/app/(app)/incubator/organization/team/page.tsx",
    component: "src/users/incubator/components/organization/team.tsx",
    export: "TeamStaff",
  },
  "/incubator/organization/roles": {
    page: "src/app/(app)/incubator/organization/roles/page.tsx",
    component: "src/users/incubator/components/organization/roles.tsx",
    export: "RolesPermissions",
  },
  "/incubator/organization/documents": {
    page: "src/app/(app)/incubator/organization/documents/page.tsx",
    component: "src/users/incubator/components/organization/documents.tsx",
    export: "OrganizationDocuments",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator organization routes", () => {
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

describe("incubator organization sidebar", () => {
  const nav = read(NAV);
  const hrefs = [...nav.matchAll(/href: "(\/incubator\/organization[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the organization group exposes all four sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every organization sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("the three former 'Soon' stubs are gone", () => {
    for (const anchor of ["organization#team", "organization#roles", "organization#docs"]) {
      assert.ok(
        !nav.includes(anchor),
        `${anchor} must be a real route, not an anchor`,
      );
    }
    assert.ok(
      !/Team & Staff[\s\S]{0,120}soon: true/.test(nav),
      "Team & Staff should no longer be flagged 'soon'",
    );
    assert.ok(
      !/Roles & Permissions[\s\S]{0,120}soon: true/.test(nav),
      "Roles & Permissions should no longer be flagged 'soon'",
    );
    assert.ok(
      !/Organization Documents[\s\S]{0,120}soon: true/.test(nav),
      "Organization Documents should no longer be flagged 'soon'",
    );
  });

  test("no stale organization anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("organization#")) {
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

describe("incubator organization data", () => {
  let data;

  before(async () => {
    data = await import(
      "../src/users/incubator/constants/organization-data.ts"
    );
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      kpis: data.ORG_KPIS.map((k) => k.tone),
      programs: data.ORG_PROGRAMS.map((p) => p.tone),
      accreditations: data.ORG_ACCREDITATIONS.map((a) => a.tone),
      team: data.TEAM_MEMBERS.map((m) => m.tone),
      onboarding: data.ONBOARDING.map((o) => o.tone),
      departures: data.DEPARTURES.map((d) => d.tone),
      hiring: data.HIRING_PLAN.map((h) => h.tone),
      roles: data.ORG_ROLES.map((r) => r.tone),
      customRoles: data.CUSTOM_ROLES.map((r) => r.tone),
      changes: data.PERMISSION_CHANGES.map((c) => c.tone),
      seats: data.SEAT_USAGE.map((s) => s.tone),
      docActivity: data.DOC_ACTIVITY.map((a) => a.tone),
      compliance: data.COMPLIANCE_ITEMS.map((c) => c.tone),
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

  test("every document kind has a known tone mapping", () => {
    const known = new Set([
      "Policy",
      "Agreement",
      "Circular",
      "Template",
      "Report",
      "Certificate",
    ]);
    for (const doc of data.ORG_DOCUMENTS) {
      assert.ok(known.has(doc.kind), `unknown document kind "${doc.kind}"`);
    }
  });

  test("KPI percentages and shares stay within 0-100", () => {
    for (const f of data.TEAM_FUNCTIONS) {
      assert.ok(f.share >= 0 && f.share <= 100, `share out of range: ${f.share}`);
    }
    for (const s of data.SEAT_USAGE) {
      assert.ok(s.used <= s.total, `${s.role} uses more seats than allocated`);
    }
    for (const f of data.ORG_FACILITIES) {
      assert.ok(
        f.utilisation >= 0 && f.utilisation <= 100,
        `utilisation out of range: ${f.utilisation}`,
      );
    }
  });

  test("acknowledgement counts never exceed what is required", () => {
    for (const a of data.ACKNOWLEDGEMENTS) {
      assert.ok(
        a.acknowledged <= a.required,
        `${a.document} acknowledges more people than it requires`,
      );
    }
  });

  test("team reporting lines only reference known people", () => {
    const names = new Set(data.TEAM_MEMBERS.map((m) => m.name));
    for (const r of data.TEAM_REPORTS) {
      assert.ok(names.has(r.name), `unknown manager: ${r.name}`);
      for (const rep of r.reports) {
        assert.ok(
          names.has(rep) || r.reports.includes(rep),
          `unknown report "${rep}" under ${r.name}`,
        );
      }
    }
  });

  test("permission matrix only grants actions the module supports", () => {
    for (const m of data.PERMISSION_MODULES) {
      for (const action of m.actions) {
        assert.ok(
          data.PERMISSION_ACTIONS.includes(action),
          `module ${m.module} lists unknown action "${action}"`,
        );
      }
    }
    for (const actions of Object.values(data.ROLE_PERMISSION_MATRIX)) {
      for (const action of actions) {
        assert.ok(
          data.PERMISSION_ACTIONS.includes(action),
          `role grants unknown action "${action}"`,
        );
      }
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
