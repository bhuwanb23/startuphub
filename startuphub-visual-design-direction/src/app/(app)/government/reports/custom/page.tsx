import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { CustomReports } from "@/users/government/components/reports";

export const metadata: Metadata = { title: "Custom Reports · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Custom Reports">
      <CustomReports />
    </GovernmentShell>
  );
}
