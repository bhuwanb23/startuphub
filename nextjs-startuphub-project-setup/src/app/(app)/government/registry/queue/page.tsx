import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { VerificationQueue } from "@/users/government/components/registry";

export const metadata: Metadata = { title: "Verification Queue · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Verification Queue">
      <VerificationQueue />
    </GovernmentShell>
  );
}
