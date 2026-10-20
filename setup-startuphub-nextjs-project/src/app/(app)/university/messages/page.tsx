import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { UniversityMessages } from "@/users/university/components/workspace/messages";

export const metadata: Metadata = { title: "Messages · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Messages">
      <UniversityMessages />
    </UniversityShell>
  );
}
