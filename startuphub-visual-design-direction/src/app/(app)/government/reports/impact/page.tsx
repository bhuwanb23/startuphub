import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { ImpactReports } from "@/users/government/components/reports";

export const metadata: Metadata = { title: "Impact Reports · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Impact Reports">
      <ImpactReports />
    </GovernmentShell>
  );
}
