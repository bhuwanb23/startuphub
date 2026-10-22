import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { StartupAssessment } from "@/users/incubator/components/startups/assessment";

export const metadata: Metadata = {
  title: "Startup Assessment · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Startup Assessment">
      <StartupAssessment />
    </IncubatorShell>
  );
}
