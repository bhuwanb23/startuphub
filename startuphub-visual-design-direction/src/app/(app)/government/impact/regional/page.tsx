import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { RegionalImpact } from "@/users/government/components/impact";

export const metadata: Metadata = { title: "Regional Impact · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Regional Impact">
      <RegionalImpact />
    </GovernmentShell>
  );
}
