import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { PatentManagementPage } from "@/users/ipr-expert/components/ip/ip-management";

export const metadata: Metadata = { title: "Patent Management · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Patent Management">
      <PatentManagementPage />
    </IprShell>
  );
}
