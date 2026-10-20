import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityActivity } from "@/users/university/components/workspace/activity";

export const metadata: Metadata = { title: "Activity · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Activity">
      <UniversityActivity />
    </UniversityShell>
  );
}
