import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { EcosystemReports } from "@/users/government/components/reports";

export const metadata: Metadata = { title: "Ecosystem Reports · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Ecosystem Reports">
      <EcosystemReports />
    </GovernmentShell>
  );
}
