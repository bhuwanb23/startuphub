import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ProgramReports } from "@/users/government/components/reports";

export const metadata: Metadata = { title: "Program Reports · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Program Reports">
      <ProgramReports />
    </GovernmentShell>
  );
}
