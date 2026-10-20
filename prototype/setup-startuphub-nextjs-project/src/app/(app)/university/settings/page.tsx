import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversitySettings } from "@/users/university/components/settings/settings";

export const metadata: Metadata = { title: "Settings · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Settings">
      <UniversitySettings />
    </UniversityShell>
  );
}
