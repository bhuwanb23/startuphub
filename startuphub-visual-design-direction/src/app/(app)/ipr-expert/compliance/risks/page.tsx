import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IpRiskAssessment } from "@/users/ipr-expert/components/compliance/compliance";

export const metadata: Metadata = { title: "IP Risk Assessment · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Risk Assessment">
      <IpRiskAssessment />
    </IprShell>
  );
}
