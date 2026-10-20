import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { DepartmentsTeams } from "@/users/government/components/organization";

export const metadata: Metadata = { title: "Departments & Teams · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Departments & Teams">
      <DepartmentsTeams />
    </GovernmentShell>
  );
}
