import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { EmploymentImpact } from "@/users/government/components/impact";

export const metadata: Metadata = { title: "Employment Impact · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Employment Impact">
      <EmploymentImpact />
    </GovernmentShell>
  );
}
