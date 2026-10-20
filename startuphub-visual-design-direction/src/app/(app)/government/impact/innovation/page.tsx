import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { InnovationImpact } from "@/users/government/components/impact";

export const metadata: Metadata = { title: "Innovation Impact · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Innovation Impact">
      <InnovationImpact />
    </GovernmentShell>
  );
}
