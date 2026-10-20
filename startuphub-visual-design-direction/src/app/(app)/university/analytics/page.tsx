import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityAnalytics } from "@/users/university/components/analytics/analytics";

export const metadata: Metadata = { title: "Analytics · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Analytics">
      <UniversityAnalytics />
    </UniversityShell>
  );
}
