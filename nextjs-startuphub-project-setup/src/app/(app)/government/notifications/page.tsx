import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { GovNotifications } from "@/users/government/components/ops/workspace";

export const metadata: Metadata = { title: "Notifications · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Notifications">
      <GovNotifications />
    </GovernmentShell>
  );
}
