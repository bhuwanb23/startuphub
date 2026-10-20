"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  founderBottom,
  founderNav,
  founderUser,
  founderUtility,
} from "./constants/founder-nav";

export function FounderShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={founderNav}
      utility={founderUtility}
      bottom={founderBottom}
      user={founderUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
