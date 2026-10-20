import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GrantAllocation } from "@/users/government/components/funding";

export const metadata: Metadata = { title: "Grant Allocation · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Grant Allocation">
      <GrantAllocation />
    </GovernmentShell>
  );
}
