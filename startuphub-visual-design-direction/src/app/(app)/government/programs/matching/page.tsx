import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { StartupMatching } from "@/users/government/components/programs";

export const metadata: Metadata = { title: "Startup Matching · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Startup Matching">
      <StartupMatching />
    </GovernmentShell>
  );
}
