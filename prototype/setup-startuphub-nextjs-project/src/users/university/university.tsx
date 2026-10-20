"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  universityBottom,
  universityNav,
  universityUser,
  universityUtility,
} from "./constants/university-nav";

/* The view function that manages every University workspace screen —
   injects this role's navigation identity into the shared AppShell. */
export function UniversityShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={universityNav}
      utility={universityUtility}
      bottom={universityBottom}
      user={universityUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
