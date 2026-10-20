import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityHelp } from "@/users/university/components/help/help";

export const metadata: Metadata = { title: "Help · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Help & Support">
      <UniversityHelp />
    </UniversityShell>
  );
}
