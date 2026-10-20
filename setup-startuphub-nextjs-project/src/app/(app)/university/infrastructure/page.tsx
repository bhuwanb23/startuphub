import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { InfrastructureLabs } from "@/users/university/components/infrastructure/labs";

export const metadata: Metadata = { title: "Infrastructure · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Infrastructure">
      <InfrastructureLabs />
    </UniversityShell>
  );
}
