import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Mentor Assignments · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Mentor Assignments">
      <AppTemplate
        icon={ShieldCheck}
        title="Mentor Assignments"
        desc="See every mentor-startup pairing, rebalance loads, and track history."
        nextFeatures={["Assignment board", "Load balancing", "History", "Star ratings"]}
      />
    </IncubatorShell>
  );
}
