import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { StartupSelection } from "@/users/incubator/components/programs/selection";

export const metadata: Metadata = {
  title: "Startup Selection · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Startup Selection">
      <StartupSelection />
    </IncubatorShell>
  );
}
