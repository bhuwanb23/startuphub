import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityNotifications } from "@/users/university/components/workspace/notifications";

export const metadata: Metadata = { title: "Notifications · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Notifications">
      <UniversityNotifications />
    </UniversityShell>
  );
}
