"use client";

import { useMemo, useState } from "react";

/* Client-side list filtering for interactive corporate screens. */
export function useFilter<T>(
  items: T[],
  predicate: (item: T, filter: string) => boolean,
  initial = "All",
) {
  const [filter, setFilter] = useState(initial);
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => predicate(i, filter))),
    [filter, items, predicate],
  );
  return { filter, setFilter, filtered } as const;
}
