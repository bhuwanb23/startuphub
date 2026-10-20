import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { EcosystemAnalytics } from "@/users/government/components/analytics";

export const metadata: Metadata = { title: "Ecosystem Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Ecosystem Analytics">
      <EcosystemAnalytics />
    </GovernmentShell>
  );
}
