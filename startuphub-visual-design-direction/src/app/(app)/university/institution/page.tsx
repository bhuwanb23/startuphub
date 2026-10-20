import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { InstitutionProfile } from "@/users/university/components/institution/profile";

export const metadata: Metadata = { title: "Institution · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="My Institution">
      <InstitutionProfile />
    </UniversityShell>
  );
}
