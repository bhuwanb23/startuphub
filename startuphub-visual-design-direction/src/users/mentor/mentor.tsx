"use client";

import type { ReactNode } from "react";
import AppShell from "@/components/app/app-shell";
import {
  mentorBottom,
  mentorNav,
  mentorUser,
  mentorUtility,
} from "@/users/mentor/constants/mentor-nav";

export function MentorShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <AppShell
      nav={mentorNav}
      utility={mentorUtility}
      bottom={mentorBottom}
      user={{ ...mentorUser, copilot: false }}
      title={title}
    >
      {children}
    </AppShell>
  );
}
