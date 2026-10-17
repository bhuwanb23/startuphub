"use client";

import { useState, type ReactNode } from "react";
import FounderSidebar from "@/users/startup/components/app-shell/sidebar";
import AppTopbar from "@/components/app/topbar";

export function FounderShell({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-soft">
      <FounderSidebar mobileOpen={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-[264px]">
        <AppTopbar
          title={title}
          userName="Ravi Sharma"
          initials="RS"
          onMenu={() => setOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
