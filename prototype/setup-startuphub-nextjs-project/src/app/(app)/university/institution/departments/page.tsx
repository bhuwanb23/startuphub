import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { InstitutionDepartments } from "@/users/university/components/institution/departments";

export const metadata: Metadata = { title: "Departments · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Departments & Faculties">
      <InstitutionDepartments />
    </UniversityShell>
  );
}
