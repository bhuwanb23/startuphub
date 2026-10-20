import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentNotifications } from "@/users/talent/components/workspace/notifications";

export const metadata: Metadata = { title: "Notifications · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Notifications">
      <TalentNotifications />
    </TalentShell>
  );
}
