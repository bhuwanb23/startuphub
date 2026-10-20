"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import { adminBottom, adminNav, adminUser } from "./constants/admin-nav";

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={adminNav}
      bottom={adminBottom}
      user={adminUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
