/**
 * End-to-end mentor workspace tests — driven through a real Chrome.
 *
 * The other mentor suite proves the data and the wiring. This one
 * proves the *behaviour*: that the filter chips actually filter, that
 * the preference picker actually moves the confidence number, and that
 * the session actions actually change state.
 *
 * It talks to Chrome over the DevTools Protocol directly, so it adds
 * no dependencies to the project. When Chrome or the dev server is not
 * available the whole suite skips rather than fails.
 */

import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const CDP_PORT = 9333;

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

const chromePath = CHROME_PATHS.find((p) => existsSync(p));

/* Helpers injected into every page evaluation. */
const HELPERS = `
  const all = (sel) => Array.from(document.querySelectorAll(sel));
  const byText = (sel, txt) => all(sel).find((el) => (el.textContent || "").includes(txt));
  const click = (sel, txt) => {
    const el = byText(sel, txt);
    if (!el) throw new Error('no ' + sel + ' containing "' + txt + '"');
    el.click();
    return true;
  };
  const settle = () => new Promise((r) => setTimeout(
    () => requestAnimationFrame(() => requestAnimationFrame(() => r(true))), 150));
  const body = () => document.body.innerText;
  const cards = () => all('span').filter((s) => /% fit$/.test((s.textContent || "").trim())).length;
`;

class Session {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 30_000);
    });
  }

  /* Runs a function inside the page, with the DOM helpers in scope. */
  async run(fn) {
    const expression = `(async () => { ${HELPERS}\nreturn await (${fn.toString()})(); })()`;
    const res = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (res.exceptionDetails) {
      throw new Error(
        res.exceptionDetails.exception?.description ??
          res.exceptionDetails.text ??
          "page error",
      );
    }
    return res.result.value;
  }

  async goto(path) {
    await this.send("Page.navigate", { url: `${BASE}${path}` });
    await this.waitFor("document.readyState === 'complete'");
    /* Give React a moment to hydrate before we poke at the DOM. */
    await this.run(() => new Promise((r) => setTimeout(() => r(true), 500)));
  }

  async waitFor(condition, timeout = 20_000) {
    const deadline = Date.now() + timeout;
    for (;;) {
      const ok = await this.run(
        `() => { try { return !!(${condition}); } catch (e) { return false; } }`,
      );
      if (ok) return;
      if (Date.now() > deadline) {
        throw new Error(`timed out waiting for: ${condition}`);
      }
      await this.run(() => new Promise((r) => setTimeout(() => r(true), 100)));
    }
  }
}

let chrome;
let profile;
let session;
let available = false;

async function serverUp() {
  try {
    const res = await fetch(`${BASE}/founder/mentors`, {
      signal: AbortSignal.timeout(5_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

before(async () => {
  if (!chromePath || !(await serverUp())) return;

  profile = mkdtempSync(join(tmpdir(), "startuphub-chrome-"));
  chrome = spawn(
    chromePath,
    [
      "--headless=new",
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "--disable-extensions",
      "--hide-scrollbars",
      "--window-size=1440,2200",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`, {
        signal: AbortSignal.timeout(2_000),
      });
      ready = res.ok;
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  if (!ready) return;

  const res = await fetch(
    `http://127.0.0.1:${CDP_PORT}/json/new?${encodeURIComponent(`${BASE}/founder/mentors`)}`,
    { method: "PUT" },
  );
  const target = await res.json();

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  session = new Session(ws);
  await session.send("Page.enable");
  await session.send("Runtime.enable");
  available = true;
});

after(() => {
  try {
    session?.ws.close();
  } catch {}
  try {
    chrome?.kill();
  } catch {}
  if (profile) {
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {}
  }
});

describe("mentor screens in a real browser", () => {
  const needs = (t) => {
    if (available) return false;
    t.skip(
      chromePath
        ? "dev server not running — start `npm run dev` to enable"
        : "Chrome not found — set CHROME_PATH to enable",
    );
    return true;
  };

  /* ── Discover ─────────────────────────────────────────────── */
  test("discover filters the catalogue and clears back to full", async (t) => {
    if (needs(t)) return;

    await session.goto("/founder/mentors");
    await session.waitFor("document.querySelectorAll('button').length > 20");

    const total = await session.run(() => cards());
    assert.equal(total, 10, "catalogue should render ten mentor cards");

    /* Filter to a single expertise chip. */
    await session.run(async () => {
      click("button", "Patents");
      await settle();
      return true;
    });

    assert.equal(await session.run(() => cards()), 1, "the Patents chip should narrow to one mentor");
    assert.ok(
      await session.run(() => body().includes("Showing 1 of 10 mentors")),
      "the filter summary should report the narrowed count",
    );

    /* A combination with no hits must show the empty state. */
    await session.run(async () => {
      click("button", "FinTech");
      await settle();
      return true;
    });
    assert.ok(
      await session.run(() => body().includes("No mentor matches that combination")),
      "an impossible filter combination should surface the empty state",
    );

    /* And the empty state must offer a way out. */
    await session.run(async () => {
      click("button", "Clear filters");
      await settle();
      return true;
    });
    assert.equal(await session.run(() => cards()), 10, "clearing filters restores the full catalogue");
  });

  test("discover connect button flips to requested", async (t) => {
    if (needs(t)) return;

    await session.goto("/founder/mentors");
    await session.waitFor("document.querySelectorAll('button').length > 20");

    assert.ok(
      await session.run(() => !!byText("button", "Connect")),
      "an unrequested mentor should show a Connect button",
    );

    await session.run(async () => {
      click("button", "Connect");
      await settle();
      return true;
    });

    assert.ok(
      await session.run(() => body().includes("Requested")),
      "clicking Connect should mark the mentor as requested",
    );
  });

  /* ── Matching ─────────────────────────────────────────────── */
  test("matching preference picker moves model confidence", async (t) => {
    if (needs(t)) return;

    await session.goto("/founder/mentors/matching");
    await session.waitFor("document.querySelectorAll('button').length > 20");

    const confidence = () =>
      session.run(() => {
        const m = body().match(/Model confidence\s*(\d+)%/);
        return m ? Number(m[1]) : null;
      });

    const before = await confidence();
    assert.ok(before !== null, "the confidence stat should be rendered");

    /* Pick the most specific challenge — confidence must go up. */
    await session.run(async () => {
      click("button", "Cost per acre under ₹3 by May");
      await settle();
      return true;
    });

    const after = await confidence();
    assert.ok(after !== null, "the confidence stat should still be rendered");
    assert.ok(
      after > before,
      `confidence should rise when the challenge gets more specific (${before}% -> ${after}%)`,
    );

    /* And the per-dimension breakdown must follow the same choice. */
    assert.ok(
      await session.run(() => body().includes("Cost per acre under ₹3 by May")),
      "the breakdown should reflect the new challenge",
    );
  });

  /* ── Sessions ─────────────────────────────────────────────── */
  test("sessions action items toggle and filter", async (t) => {
    if (needs(t)) return;

    await session.goto("/founder/mentors/sessions");
    await session.waitFor("document.querySelectorAll('button').length > 20");

    const openCount = () =>
      session.run(() => {
        const m = body().match(/(\d+) open of (\d+) total/);
        return m ? Number(m[1]) : null;
      });

    const before = await openCount();
    assert.ok(before !== null, "the action-item counter should be rendered");

    /* Tick the first open item. */
    await session.run(async () => {
      const box = all('button[aria-label^="Complete:"]')[0];
      if (!box) throw new Error("no open action item");
      box.click();
      await settle();
      return true;
    });

    assert.equal(await openCount(), before - 1, "ticking an item should reduce the open count");

    /* The Done filter should show only the closed items. */
    await session.run(async () => {
      click("button", "Done");
      await settle();
      return true;
    });
    assert.ok(
      await session.run(() => body().includes("of 5 total")),
      "the counter should still report the total under the Done filter",
    );
    assert.ok(
      await session.run(() => !body().includes("Complete: ")),
      "the Done filter should hide every open item",
    );
  });

  test("sessions meeting room and reschedule both work", async (t) => {
    if (needs(t)) return;

    await session.goto("/founder/mentors/sessions");
    await session.waitFor("document.querySelectorAll('button').length > 20");

    /* Open the room. */
    await session.run(async () => {
      click("button", "Join meeting room");
      await settle();
      return true;
    });
    assert.ok(
      await session.run(() => body().includes("Meeting room open")),
      "joining should open the meeting room panel",
    );

    /* Reschedule and pick a slot. */
    await session.run(async () => {
      click("button", "Reschedule");
      await settle();
      return true;
    });
    assert.ok(
      await session.run(() => body().toLowerCase().includes("pick a new slot")),
      "rescheduling should reveal the slot picker",
    );

    await session.run(async () => {
      click("button", "Fri, Apr 24 · 10:00 IST");
      await settle();
      return true;
    });
    assert.ok(
      await session.run(() => body().includes("Fri, Apr 24 · 10:00 IST") && body().includes("Moved")),
      "picking a slot should move the session and flag it as moved",
    );
  });

  test("sessions agenda ticks off during the call", async (t) => {
    if (needs(t)) return;

    await session.goto("/founder/mentors/sessions");
    await session.waitFor("document.querySelectorAll('button').length > 20");

    const covered = () =>
      session.run(() => {
        const m = body().match(/(\d+) of (\d+) covered/);
        return m ? Number(m[1]) : null;
      });

    const before = await covered();
    assert.ok(before !== null, "the agenda counter should be rendered");

    await session.run(async () => {
      const line = all("button").find((b) => b.textContent.includes("Reserved vs spot GPU"));
      if (!line) throw new Error("agenda line missing");
      line.click();
      await settle();
      return true;
    });

    assert.equal(await covered(), before + 1, "ticking an agenda line should raise the covered count");
  });
});
