import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { LicensingManagement } from "@/users/ipr-expert/components/commercialization/commercialization";

export const metadata: Metadata = { title: "Licensing Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Licensing Management">
      <LicensingManagement />
    </IprShell>
  );
}
