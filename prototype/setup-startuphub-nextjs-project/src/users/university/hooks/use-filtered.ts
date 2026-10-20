"use client";

import { useMemo, useState } from "react";

/* Chip-style category filtering for directory screens
   (documents, notifications, directories). "All" resets the filter. */
export function useFiltered<T>(
  items: T[],
  matches: (item: T, filter: string) => boolean,
  initial = "All",
) {
  const [filter, setFilter] = useState(initial);
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => matches(i, filter))),
    [items, filter, matches],
  );
  return { filter, setFilter, filtered } as const;
}
