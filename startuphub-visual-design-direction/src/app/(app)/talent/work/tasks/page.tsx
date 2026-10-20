import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentTasks } from "@/users/talent/components/work/tasks";

export const metadata: Metadata = { title: "Tasks · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="Tasks">
      <TalentTasks />
    </TalentShell>
  );
}
