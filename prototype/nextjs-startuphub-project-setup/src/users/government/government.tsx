"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import { govBottom, govNav, govUser, govUtility } from "./constants/gov-nav";

/* Thin adapter: injects the government identity + navigation into AppShell. */
export function GovernmentShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={govNav}
      utility={govUtility}
      bottom={govBottom}
      user={{ ...govUser, copilot: true }}
      title={title}
    >
      {children}
    </AppShell>
  );
}
