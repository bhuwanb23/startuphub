import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IpAssessment } from "@/users/ipr-expert/components/intelligence/intelligence";

export const metadata: Metadata = { title: "IP Assessment · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Assessment">
      <IpAssessment />
    </IprShell>
  );
}
