import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovHelp } from "@/users/government/components/ops/preferences";

export const metadata: Metadata = { title: "Help & Support · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Help & Support">
      <GovHelp />
    </GovernmentShell>
  );
}
