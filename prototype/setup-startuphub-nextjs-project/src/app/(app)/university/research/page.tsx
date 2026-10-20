import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { ResearchProjects } from "@/users/university/components/research/projects";

export const metadata: Metadata = { title: "Research Projects · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Research & Innovation">
      <ResearchProjects />
    </UniversityShell>
  );
}
