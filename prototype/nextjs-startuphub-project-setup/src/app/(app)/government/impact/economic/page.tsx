import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { EconomicImpact } from "@/users/government/components/impact";

export const metadata: Metadata = { title: "Economic Impact · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Economic Impact">
      <EconomicImpact />
    </GovernmentShell>
  );
}
