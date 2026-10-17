import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { PatentabilityAssessment } from "@/users/ipr-expert/components/intelligence/patentability";

export const metadata: Metadata = { title: "Patentability Assessment · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Patentability Assessment">
      <PatentabilityAssessment />
    </IprShell>
  );
}
