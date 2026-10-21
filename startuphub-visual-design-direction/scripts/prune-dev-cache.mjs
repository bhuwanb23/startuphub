/* Prune Turbopack's persistent dev cache.
 *
 * Turbopack writes a ~250 MB `.sst` blob per recompile into
 * `.next/dev/cache/turbopack`. On a project with 500+ routes (and
 * especially after a full route sweep) that directory grows past 15 GB
 * and the dev server starts thrashing — pages take 45 s and the process
 * balloons past 18 GB of RSS.
 *
 * This script deletes the cache only when it has grown past a sane
 * threshold, so the common case (a few stale blobs) keeps the fast
 * incremental cache. Run it before `next dev` via the `predev` script.
 */

import { readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

/** Prune once the cache passes this size. */
const MAX_CACHE_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

const cacheDir = join(process.cwd(), ".next", "dev", "cache", "turbopack");

if (!existsSync(cacheDir)) {
  process.exit(0);
}

function dirSize(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      total += dirSize(full);
    } else {
      try {
        total += statSync(full).size;
      } catch {
        /* file vanished mid-scan — ignore */
      }
    }
  }
  return total;
}

let size = 0;
try {
  size = dirSize(cacheDir);
} catch {
  process.exit(0);
}

if (size > MAX_CACHE_BYTES) {
  const gb = (size / 1024 / 1024 / 1024).toFixed(1);
  console.log(`[cache] Turbopack dev cache is ${gb} GB — pruning.`);
  try {
    rmSync(cacheDir, { recursive: true, force: true });
    console.log("[cache] Pruned. The next start will recompile from scratch.");
  } catch (err) {
    console.log(`[cache] Could not prune cache: ${err.message}`);
  }
}
