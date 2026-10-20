import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { EmploymentAnalytics } from "@/users/government/components/analytics/deep";

export const metadata: Metadata = { title: "Employment Analytics · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Employment Analytics">
      <EmploymentAnalytics />
    </GovernmentShell>
  );
}
