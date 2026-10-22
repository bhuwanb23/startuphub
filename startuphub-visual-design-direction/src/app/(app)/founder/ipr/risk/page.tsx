import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IpRisk } from "@/users/startup/components/ipr/risk";

export const metadata: Metadata = { title: "IP Risk Assessment · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="IP Risk Assessment">
      <IpRisk />
    </FounderShell>
  );
}
