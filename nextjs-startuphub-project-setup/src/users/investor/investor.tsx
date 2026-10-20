"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  investorBottom,
  investorNav,
  investorUser,
  investorUtility,
} from "./constants/investor-nav";

/* Thin adapter: injects the investor's navigation + identity into AppShell. */
export function InvestorShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={investorNav}
      utility={investorUtility}
      bottom={investorBottom}
      user={{ ...investorUser, copilot: true }}
      title={title}
    >
      {children}
    </AppShell>
  );
}
