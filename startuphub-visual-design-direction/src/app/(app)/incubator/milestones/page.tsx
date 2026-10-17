import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Milestones } from "@/users/incubator/components/milestones/milestones";

export const metadata: Metadata = { title: "Milestones & Roadmaps · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Milestones & Roadmaps">
      <Milestones />
    </IncubatorShell>
  );
}
