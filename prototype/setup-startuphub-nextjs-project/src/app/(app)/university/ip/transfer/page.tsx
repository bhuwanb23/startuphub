import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { TechnologyTransfer } from "@/users/university/components/ip/transfer";

export const metadata: Metadata = { title: "Technology Transfer · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Technology Transfer">
      <TechnologyTransfer />
    </UniversityShell>
  );
}
