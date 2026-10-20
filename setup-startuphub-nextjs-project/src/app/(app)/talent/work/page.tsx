import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentWork } from "@/users/talent/components/work/work";

export const metadata: Metadata = { title: "My Work · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="My Work">
      <TalentWork />
    </TalentShell>
  );
}
