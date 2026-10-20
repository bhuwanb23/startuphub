"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  providerBottom,
  providerNav,
  providerUser,
  providerUtility,
} from "./constants/provider-nav";

/* Thin adapter: injects the provider identity + navigation into AppShell. */
export function ProviderShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={providerNav}
      utility={providerUtility}
      bottom={providerBottom}
      user={{ ...providerUser, copilot: true }}
      title={title}
    >
      {children}
    </AppShell>
  );
}
