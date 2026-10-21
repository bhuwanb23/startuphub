import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IncubationMilestones } from "@/users/startup/components/incubation/milestones";

export const metadata: Metadata = {
  title: "Milestones · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Milestones">
      <IncubationMilestones />
    </FounderShell>
  );
}
