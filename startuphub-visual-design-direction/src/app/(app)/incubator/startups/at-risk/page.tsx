import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AtRiskStartups } from "@/users/incubator/components/startups/at-risk";

export const metadata: Metadata = {
  title: "At-Risk Startups · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="At-Risk Startups">
      <AtRiskStartups />
    </IncubatorShell>
  );
}
