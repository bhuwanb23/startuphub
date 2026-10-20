import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { StartupMatching } from "@/users/university/components/commercialization/matching";

export const metadata: Metadata = { title: "Startup Matching · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Startup Matching">
      <StartupMatching />
    </UniversityShell>
  );
}
