"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  investorBottom,
  investorNav,
  investorUser,
  investorUtility,
} from "./constants/investor-nav";

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
      user={investorUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
