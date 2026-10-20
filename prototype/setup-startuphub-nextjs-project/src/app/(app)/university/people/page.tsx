import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityPeople } from "@/users/university/components/people/people";

export const metadata: Metadata = { title: "People · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="People & Expertise">
      <UniversityPeople />
    </UniversityShell>
  );
}
