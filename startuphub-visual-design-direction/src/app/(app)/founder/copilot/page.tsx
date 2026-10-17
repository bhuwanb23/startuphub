import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Copilot } from "@/users/startup/components/copilot/copilot";

export const metadata: Metadata = { title: "Startup Copilot · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Startup Copilot">
      <Copilot />
    </FounderShell>
  );
}
