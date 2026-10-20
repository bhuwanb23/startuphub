import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { IprAnalytics } from "@/users/government/components/analytics/deep";

export const metadata: Metadata = { title: "IPR Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="IPR Analytics">
      <IprAnalytics />
    </GovernmentShell>
  );
}
