"use client";

import { useState } from "react";

/* Master/detail selection for split views (messages inbox, directories). */
export function useSelection<T>(initial: T) {
  const [selected, select] = useState<T>(initial);
  const isSelected = (value: T) => selected === value;
  return { selected, select, isSelected } as const;
}
