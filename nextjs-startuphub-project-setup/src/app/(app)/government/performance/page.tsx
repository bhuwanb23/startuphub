import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ProgramOverview } from "@/users/government/components/performance";

export const metadata: Metadata = { title: "Program Overview · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Program Overview">
      <ProgramOverview />
    </GovernmentShell>
  );
}
