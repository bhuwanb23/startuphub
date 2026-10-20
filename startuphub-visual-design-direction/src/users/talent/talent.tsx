"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  talentBottom,
  talentNav,
  talentUser,
  talentUtility,
} from "./constants/talent-nav";

/* The view function that manages every Talent workspace screen —
   injects this role's navigation identity into the shared AppShell. */
export function TalentShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={talentNav}
      utility={talentUtility}
      bottom={talentBottom}
      user={talentUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
