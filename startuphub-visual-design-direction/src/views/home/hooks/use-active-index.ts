"use client";

import { useCallback, useState } from "react";

/** Shared hover/tap activation for the lifecycle previews. */
export function useActiveIndex(initial = 0) {
  const [active, setActive] = useState(initial);
  const activate = useCallback((i: number) => setActive(i), []);
  return { active, activate };
}
