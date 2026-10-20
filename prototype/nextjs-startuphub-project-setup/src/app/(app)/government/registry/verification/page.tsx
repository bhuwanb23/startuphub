import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupVerification } from "@/users/government/components/registry";

export const metadata: Metadata = { title: "Startup Verification · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Verification">
      <StartupVerification />
    </GovernmentShell>
  );
}
