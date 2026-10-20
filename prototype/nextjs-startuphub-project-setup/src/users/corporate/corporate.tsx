"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  corporateBottom,
  corporateNav,
  corporateUser,
  corporateUtility,
} from "./constants/corporate-nav";

/* Thin adapter: injects the corporate identity + navigation into AppShell. */
export function CorporateShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={corporateNav}
      utility={corporateUtility}
      bottom={corporateBottom}
      user={{ ...corporateUser, copilot: true }}
      title={title}
    >
      {children}
    </AppShell>
  );
}
