import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityDashboard } from "@/users/university/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Dashboard · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Dashboard">
      <UniversityDashboard />
    </UniversityShell>
  );
}
