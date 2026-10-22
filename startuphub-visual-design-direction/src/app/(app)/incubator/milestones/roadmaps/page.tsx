import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Roadmaps } from "@/users/incubator/components/milestones/roadmaps";

export const metadata: Metadata = { title: "Roadmaps · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Roadmaps">
      <Roadmaps />
    </IncubatorShell>
  );
}
