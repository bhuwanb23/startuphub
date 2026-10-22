import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Interventions } from "@/users/incubator/components/startups/interventions";

export const metadata: Metadata = {
  title: "Interventions · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Interventions">
      <Interventions />
    </IncubatorShell>
  );
}
