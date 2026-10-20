import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { TechnologyShowcase } from "@/users/university/components/commercialization/showcase";

export const metadata: Metadata = { title: "Technology Showcase · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Technology Showcase">
      <TechnologyShowcase />
    </UniversityShell>
  );
}
