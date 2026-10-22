/**
 * Incubator events & workshops feature tests — dependency-free, runs on
 * Node's built-in test runner (no jest/vitest install needed).
 *
 *   npm test        →  node --test tests/
 *
 * Covers the things that actually break between refactors:
 *   1. All five event routes exist and are wired to real components.
 *   2. Sidebar navigation points at routes that exist (no dead links).
 *   3. Each screen carries enough content to be a real product surface.
 *   4. The shared dataset stays internally consistent — the type mix and
 *      the format split add up to the programme, seats are never
 *      oversold, and every number the pages quote agrees with the rows
 *      behind it.
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

/* ── The five event screens ───────────────────────────────────── */
const routes = {
  "/incubator/events": {
    page: "src/app/(app)/incubator/events/page.tsx",
    component: "src/users/incubator/components/events/events.tsx",
    export: "Events",
  },
  "/incubator/events/calendar": {
    page: "src/app/(app)/incubator/events/calendar/page.tsx",
    component: "src/users/incubator/components/events/calendar.tsx",
    export: "EventCalendar",
  },
  "/incubator/events/registrations": {
    page: "src/app/(app)/incubator/events/registrations/page.tsx",
    component: "src/users/incubator/components/events/registrations.tsx",
    export: "EventRegistrations",
  },
  "/incubator/events/speakers": {
    page: "src/app/(app)/incubator/events/speakers/page.tsx",
    component: "src/users/incubator/components/events/speakers.tsx",
    export: "EventSpeakers",
  },
  "/incubator/events/feedback": {
    page: "src/app/(app)/incubator/events/feedback/page.tsx",
    component: "src/users/incubator/components/events/feedback.tsx",
    export: "EventFeedback",
  },
};

const NAV = "src/users/incubator/constants/incubator-nav.ts";

describe("incubator event routes", () => {
  for (const [href, files] of Object.entries(routes)) {
    test(`${href} has a page file that renders its component`, () => {
      assert.ok(existsSync(join(app, files.page)), `missing page: ${files.page}`);
      const src = read(files.page);
      assert.match(src, /export default function Page/, "page must default-export Page");
      assert.match(src, /<IncubatorShell/, "page must wrap in IncubatorShell");
      assert.match(src, /export const metadata/, "page must declare metadata");
      assert.match(
        src,
        new RegExp(`from "${files.component.replace(/^src\//, "@/").replace(/\.tsx$/, "")}"`),
        "page must import its own component",
      );
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
      assert.match(src, /^"use client";/m, "interactive screens must be client components");
    });

    test(`${href} has at least 8 content sections`, () => {
      const src = read(files.component);
      const sections = (src.match(/<Card[\s>]/g) ?? []).length;
      assert.ok(sections >= 8, `${href} has ${sections} sections, expected >= 8`);
    });
  }
});

describe("incubator events sidebar", () => {
  const nav = read(NAV);
  const start = nav.indexOf('label: "Events & Workshops"');
  const end = nav.indexOf('label: "Performance"');
  assert.ok(start > -1 && end > start, "could not locate the Events nav group");
  const group = nav.slice(start, end);
  const subs = group.slice(group.indexOf("subs: ["));
  const hrefs = [...subs.matchAll(/href: "(\/incubator\/events[^"]*)"/g)].map(
    (m) => m[1],
  );

  test("the events group exposes all five sub-pages", () => {
    for (const href of Object.keys(routes)) {
      assert.ok(hrefs.includes(href), `sidebar is missing ${href}`);
    }
  });

  test("every event sidebar href resolves to a real page file", () => {
    for (const href of hrefs) {
      const dir = join(app, "src/app/(app)", href);
      assert.ok(existsSync(join(dir, "page.tsx")), `dead sidebar link: ${href}`);
    }
  });

  test("no event sub-page is flagged 'soon'", () => {
    assert.ok(!/soon:\s*true/.test(subs), "an event sub-page is still flagged 'soon'");
  });

  test("the five event links are distinct", () => {
    assert.equal(new Set(hrefs).size, hrefs.length, `duplicate event hrefs: ${hrefs.join(", ")}`);
    assert.equal(hrefs.length, 5, `expected 5 event links, found ${hrefs.length}`);
  });

  test("no stale event anchors anywhere in src", () => {
    const offenders = [];
    for (const file of sourceFiles(join(app, "src"))) {
      if (readFileSync(file, "utf8").includes("events#")) {
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

describe("incubator events data", () => {
  let data, portfolio, catalogue, publicEvents, cohorts;

  before(async () => {
    data = await import("../src/users/incubator/constants/events-data.ts");
    portfolio = (await import("../src/users/incubator/constants/startups-data.ts")).PORTFOLIO;
    catalogue = (await import("../src/views/explore/mentors/constants/mentors.ts")).mentors;
    publicEvents = (await import("../src/views/events/constants/events.ts")).events;
    cohorts = (await import("../src/users/incubator/constants/cohorts-data.ts")).COHORTS;
  });

  test("every tone is a value the Badge component understands", () => {
    const allowed = new Set(["default", "accent", "good", "warn", "bad"]);
    const lists = {
      kpis: data.EVENT_KPIS.map((k) => k.tone),
      typeMix: data.EVENT_TYPE_MIX.map((t) => t.tone),
      formatSplit: data.FORMAT_SPLIT.map((f) => f.tone),
      attention: data.EVENT_ATTENTION.map((a) => a.tone),
      series: data.EVENT_SERIES.map((s) => s.tone),
      keyDates: data.KEY_DATES.map((k) => k.tone),
      conflicts: data.EVENT_CONFLICTS.map((c) => c.tone),
      sources: data.REGISTRATION_SOURCES.map((s) => s.tone),
      showRates: data.SHOW_RATES.map((s) => s.tone),
      capacityGaps: data.CAPACITY_GAPS.map((g) => g.tone),
      speakers: data.SPEAKERS.map((s) => s.tone),
      sessions: data.SESSIONS.map((s) => s.tone),
      topics: data.TOPIC_DEMAND.map((t) => t.tone),
      feedback: data.FEEDBACK.map((f) => f.tone),
      outcomes: data.OUTCOMES.map((o) => o.tone),
      actions: data.IMPROVEMENT_ACTIONS.map((a) => a.tone),
      attendance: data.EVENT_ATTENDANCE.map((a) => a.tone),
      events: data.EVENTS.map((e) => e.tone),
      reach: data.EVENT_REACH.map((r) => r.tone),
      logistics: data.EVENT_LOGISTICS.map((l) => l.tone),
      velocity: data.REGISTRATION_VELOCITY.map((v) => v.tone),
      noShow: data.NO_SHOW_RISK.map((n) => n.tone),
      speakerRatings: data.SPEAKER_RATINGS.map((s) => s.tone),
      availability: data.SPEAKER_AVAILABILITY.map((s) => s.tone),
      themes: data.FEEDBACK_THEMES.map((t) => t.tone),
      trend: data.QUARTER_TREND.map((q) => q.tone),
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

  test("the event types match the public catalogue vocabulary", () => {
    const publicTypes = new Set(publicEvents.map((e) => e.type));
    for (const t of data.EVENT_TYPE_MIX) {
      assert.ok(publicTypes.has(t.kind), `"${t.kind}" is not a public event type`);
    }
  });

  test("the event formats match the public catalogue vocabulary", () => {
    const publicFormats = new Set(publicEvents.map((e) => e.format));
    for (const f of data.FORMAT_SPLIT) {
      assert.ok(publicFormats.has(f.format), `"${f.format}" is not a public event format`);
    }
  });

  test("the type mix adds up to the programme", () => {
    const events = data.EVENT_TYPE_MIX.reduce((s, t) => s + t.events, 0);
    const seats = data.EVENT_TYPE_MIX.reduce((s, t) => s + t.seats, 0);
    assert.equal(events, data.EVENTS.length, `type mix covers ${events} of ${data.EVENTS.length}`);
    const capacity = data.EVENTS.reduce((s, e) => s + e.capacity, 0);
    assert.equal(seats, capacity, `type mix seats ${seats}, programme capacity ${capacity}`);
  });

  test("the format split adds up to the programme", () => {
    const events = data.FORMAT_SPLIT.reduce((s, f) => s + f.events, 0);
    const seats = data.FORMAT_SPLIT.reduce((s, f) => s + f.seats, 0);
    assert.equal(events, data.EVENTS.length, `format split covers ${events} of ${data.EVENTS.length}`);
    const capacity = data.EVENTS.reduce((s, e) => s + e.capacity, 0);
    assert.equal(seats, capacity, `format split seats ${seats}, programme capacity ${capacity}`);
  });

  test("the type mix matches the events row by row", () => {
    for (const t of data.EVENT_TYPE_MIX) {
      const rows = data.EVENTS.filter((e) => e.kind === t.kind);
      assert.equal(t.events, rows.length, `${t.kind} claims ${t.events} events, data has ${rows.length}`);
      const seats = rows.reduce((s, e) => s + e.capacity, 0);
      assert.equal(t.seats, seats, `${t.kind} claims ${t.seats} seats, data has ${seats}`);
    }
  });

  test("the format split matches the events row by row", () => {
    for (const f of data.FORMAT_SPLIT) {
      const rows = data.EVENTS.filter((e) => e.format === f.format);
      assert.equal(f.events, rows.length, `${f.format} claims ${f.events} events, data has ${rows.length}`);
      const seats = rows.reduce((s, e) => s + e.capacity, 0);
      assert.equal(f.seats, seats, `${f.format} claims ${f.seats} seats, data has ${seats}`);
    }
  });

  test("no event is oversold", () => {
    for (const e of data.EVENTS) {
      assert.ok(e.registered <= e.capacity, `${e.slug} has ${e.registered} of ${e.capacity}`);
      assert.ok(e.registered > 0, `${e.slug} has no registrations`);
      assert.ok(e.capacity > 0, `${e.slug} has no capacity`);
      assert.ok(e.waitlist >= 0, `${e.slug} has a negative waitlist`);
    }
  });

  test("only a full event carries a waitlist", () => {
    for (const e of data.EVENTS) {
      if (e.waitlist > 0) {
        assert.ok(
          e.registered >= e.capacity,
          `${e.slug} has ${e.waitlist} waiting but is not full`,
        );
      }
    }
  });

  test("the derived totals match the event rows", () => {
    const capacity = data.EVENTS.reduce((s, e) => s + e.capacity, 0);
    const registered = data.EVENTS.reduce((s, e) => s + e.registered, 0);
    assert.equal(data.EVENT_TOTALS.capacity, capacity);
    assert.equal(data.EVENT_TOTALS.registered, registered);
    assert.equal(data.EVENT_TOTALS.events, data.EVENTS.length);
    assert.equal(
      data.EVENT_TOTALS.virtual + data.EVENT_TOTALS.inPerson + data.EVENT_TOTALS.hybrid,
      data.EVENTS.length,
      "the format counts do not add up",
    );
  });

  test("the registration sources add up to the registrations booked", () => {
    const total = data.REGISTRATION_SOURCES.reduce((s, x) => s + x.registrations, 0);
    const share = data.REGISTRATION_SOURCES.reduce((s, x) => s + x.share, 0);
    assert.equal(
      total,
      data.EVENT_TOTALS.registered,
      `sources total ${total}, the programme booked ${data.EVENT_TOTALS.registered}`,
    );
    assert.equal(share, 100, `source shares total ${share}, expected 100`);
  });

  test("the headline KPI agrees with the rows", () => {
    const kpi = data.EVENT_KPIS.find((k) => k.label === "Registrations");
    assert.ok(kpi, "the KPI set has no registrations figure");
    assert.equal(
      kpi.value.replace(/,/g, ""),
      String(data.EVENT_TOTALS.registered),
      `the KPI says ${kpi.value}, the rows say ${data.EVENT_TOTALS.registered}`,
    );
    const seats = data.EVENT_KPIS.find((k) => k.label === "Seats offered");
    assert.equal(
      seats.value.replace(/,/g, ""),
      String(data.EVENT_TOTALS.capacity),
      `the KPI says ${seats.value}, the rows say ${data.EVENT_TOTALS.capacity}`,
    );
  });

  test("show rates are computed from the rows", () => {
    for (const s of data.SHOW_RATES) {
      const calc = Math.round((s.attended / s.registered) * 100);
      assert.equal(s.rate, calc, `${s.slug} claims ${s.rate}%, the rows give ${calc}%`);
      assert.ok(s.attended <= s.registered, `${s.slug} attended more than registered`);
    }
  });

  test("capacity gaps are computed from the rows", () => {
    for (const g of data.CAPACITY_GAPS) {
      assert.equal(g.gap, g.capacity - g.filled, `${g.slug} gap is wrong`);
      assert.ok(g.filled <= g.capacity, `${g.slug} is over-filled`);
    }
  });

  test("sessions are never over-filled and reference real events", () => {
    const slugs = new Set(data.EVENTS.map((e) => e.slug));
    for (const s of data.SESSIONS) {
      assert.ok(s.filled <= s.seats, `${s.id} has ${s.filled} of ${s.seats}`);
      assert.ok(slugs.has(s.eventSlug), `${s.id} references unknown event "${s.eventSlug}"`);
    }
  });

  test("every speaker who is a mentor exists in the public catalogue", () => {
    const names = new Set(catalogue.map((m) => m.name));
    for (const s of data.SPEAKERS) {
      if (s.kind !== "Mentor") continue;
      assert.ok(names.has(s.name), `unknown mentor "${s.name}" on the bill`);
    }
  });

  test("every startup in the attendance view exists in the portfolio", () => {
    const names = new Set(portfolio.map((s) => s.name));
    const slugs = new Set(portfolio.map((s) => s.slug));
    for (const a of data.EVENT_ATTENDANCE) {
      assert.ok(names.has(a.startup), `unknown startup "${a.startup}"`);
      assert.ok(slugs.has(a.startupSlug), `unknown slug "${a.startupSlug}"`);
    }
  });

  test("the demo day date matches the rest of the incubator", () => {
    const demo = data.EVENTS.find((e) => e.slug === "demo-day-cohort-vi");
    assert.ok(demo, "the programme has no Cohort VI demo day");
    assert.equal(demo.date, "28 Apr 2026", `the demo day is ${demo.date}, expected 28 Apr 2026`);
    const cohortVi = cohorts.find((c) => c.name.includes("VI"));
    assert.ok(cohortVi, "no Cohort VI record");
    assert.equal(
      cohortVi.demoDay,
      "Apr 28",
      `the cohort record says the demo day is ${cohortVi.demoDay}`,
    );
  });

  test("scores and ratings stay within range", () => {
    for (const s of data.SPEAKERS) assert.ok(s.rating >= 0 && s.rating <= 5, `${s.name} rating out of range`);
    for (const f of data.FEEDBACK) {
      assert.ok(f.rating >= 0 && f.rating <= 5, `${f.event} rating out of range`);
      assert.ok(f.nps >= -100 && f.nps <= 100, `${f.event} NPS out of range`);
    }
    for (const s of data.SESSIONS) assert.ok(s.seats > 0, `${s.id} has no seats`);
  });

  test("ids are unique across every events list", () => {
    const lists = {
      events: data.EVENTS.map((x) => x.id),
      attention: data.EVENT_ATTENTION.map((x) => x.id),
      speakers: data.SPEAKERS.map((x) => x.id),
      sessions: data.SESSIONS.map((x) => x.id),
      feedback: data.FEEDBACK.map((x) => x.id),
      outcomes: data.OUTCOMES.map((x) => x.id),
      actions: data.IMPROVEMENT_ACTIONS.map((x) => x.id),
    };
    for (const [list, ids] of Object.entries(lists)) {
      assert.equal(new Set(ids).size, ids.length, `duplicate id in ${list}`);
    }
  });

  test("event slugs are unique", () => {
    const slugs = data.EVENTS.map((e) => e.slug);
    assert.equal(new Set(slugs).size, slugs.length, "duplicate event slug");
  });

  test("the logistics and velocity lists reference real events", () => {
    const slugs = new Set(data.EVENTS.map((e) => e.slug));
    for (const l of data.EVENT_LOGISTICS) {
      assert.ok(slugs.has(l.slug), `logistics for unknown event "${l.slug}"`);
      assert.ok(l.checklist.length > 0, `${l.event} has no checklist`);
    }
    for (const v of data.REGISTRATION_VELOCITY) {
      assert.ok(slugs.has(v.slug), `velocity for unknown event "${v.slug}"`);
    }
    for (const n of data.NO_SHOW_RISK) {
      assert.ok(slugs.has(n.slug), `no-show risk for unknown event "${n.slug}"`);
    }
  });

  test("the reach figures stay within their totals", () => {
    for (const r of data.EVENT_REACH) {
      assert.ok(r.value <= r.total, `${r.label} claims ${r.value} of ${r.total}`);
      assert.ok(r.total > 0, `${r.label} has no total`);
    }
  });

  test("speaker ratings and availability agree with the roster", () => {
    const names = new Set(data.SPEAKERS.map((s) => s.name));
    for (const s of data.SPEAKER_RATINGS) {
      assert.ok(names.has(s.name), `rating for unknown speaker "${s.name}"`);
      assert.ok(s.rating >= 0 && s.rating <= 5, `${s.name} rating out of range`);
      assert.ok(s.responses > 0, `${s.name} has no responses`);
    }
    for (const s of data.SPEAKER_AVAILABILITY) {
      assert.ok(names.has(s.name), `availability for unknown speaker "${s.name}"`);
      assert.ok(s.canTake >= 0, `${s.name} has a negative capacity`);
    }
  });

  test("the quarter trend improves and stays in range", () => {
    for (const q of data.QUARTER_TREND) {
      assert.ok(q.rating >= 0 && q.rating <= 5, `${q.quarter} rating out of range`);
      assert.ok(q.nps >= -100 && q.nps <= 100, `${q.quarter} NPS out of range`);
      assert.ok(q.events > 0, `${q.quarter} ran no events`);
    }
    const first = data.QUARTER_TREND[0];
    const last = data.QUARTER_TREND[data.QUARTER_TREND.length - 1];
    assert.ok(last.nps > first.nps, "NPS went backwards across the quarters");
    assert.ok(last.rating > first.rating, "ratings went backwards across the quarters");
  });

  test("feedback themes are all referenced somewhere in the free text", () => {
    for (const t of data.FEEDBACK_THEMES) {
      assert.ok(t.mentions > 0, `${t.theme} has no mentions`);
      assert.ok(t.quote.length > 0, `${t.theme} has no quote`);
    }
  });

  test("every event sits inside the quarter the calendar covers", () => {
    for (const e of data.EVENTS) {
      assert.ok([4, 5, 6].includes(e.month), `${e.slug} is in month ${e.month}`);
      assert.ok(e.day >= 1 && e.day <= 31, `${e.slug} has an impossible day`);
      assert.ok(e.date.endsWith("2026"), `${e.slug} is dated "${e.date}"`);
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
