import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IpStrategy } from "@/users/ipr-expert/components/intelligence/strategy";

export const metadata: Metadata = { title: "IP Strategy · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="IP Strategy">
      <IpStrategy />
    </IprShell>
  );
}
