import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { EcosystemPartners } from "@/users/government/components/incubation";

export const metadata: Metadata = { title: "Ecosystem Partners · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Ecosystem Partners">
      <EcosystemPartners />
    </GovernmentShell>
  );
}
