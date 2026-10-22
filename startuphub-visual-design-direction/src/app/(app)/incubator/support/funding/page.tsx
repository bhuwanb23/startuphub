import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { FundingSupport } from "@/users/incubator/components/support/funding";

export const metadata: Metadata = {
  title: "Funding Support · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Funding Support">
      <FundingSupport />
    </IncubatorShell>
  );
}
