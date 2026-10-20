"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import { iprBottom, iprNav, iprUser, iprUtility } from "./constants/ipr-nav";

export function IprShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={iprNav}
      utility={iprUtility}
      bottom={iprBottom}
      user={iprUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
