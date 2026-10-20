import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { StartupSpinoffs } from "@/users/university/components/commercialization/spinoffs";

export const metadata: Metadata = { title: "Spin-offs · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Commercialization">
      <StartupSpinoffs />
    </UniversityShell>
  );
}
