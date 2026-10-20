import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovSettings } from "@/users/government/components/ops/preferences";

export const metadata: Metadata = { title: "Settings · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Settings">
      <GovSettings />
    </GovernmentShell>
  );
}
