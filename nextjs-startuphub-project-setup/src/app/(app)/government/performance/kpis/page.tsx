import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ProgramKpis } from "@/users/government/components/performance";

export const metadata: Metadata = { title: "Program KPIs · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Program KPIs">
      <ProgramKpis />
    </GovernmentShell>
  );
}
