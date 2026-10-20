import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { RegionalAnalytics } from "@/users/government/components/analytics";

export const metadata: Metadata = { title: "Regional Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Regional Analytics">
      <RegionalAnalytics />
    </GovernmentShell>
  );
}
