import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { StartupAssessment } from "@/users/startup/components/startup/assessment";

export const metadata: Metadata = {
  title: "Startup Assessment · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Startup Assessment">
      <StartupAssessment />
    </FounderShell>
  );
}