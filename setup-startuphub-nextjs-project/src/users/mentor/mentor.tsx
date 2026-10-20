"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app/app-shell";
import {
  mentorBottom,
  mentorNav,
  mentorUser,
  mentorUtility,
} from "./constants/mentor-nav";

export function MentorShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <AppShell
      nav={mentorNav}
      utility={mentorUtility}
      bottom={mentorBottom}
      user={mentorUser}
      title={title}
    >
      {children}
    </AppShell>
  );
}
