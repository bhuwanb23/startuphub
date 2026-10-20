"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  incubatorBottom,
  incubatorNav,
  incubatorUser,
  incubatorUtility,
} from "./constants/incubator-nav";

export function IncubatorShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={incubatorNav}
      utility={incubatorUtility}
      bottom={incubatorBottom}
      user={incubatorUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
