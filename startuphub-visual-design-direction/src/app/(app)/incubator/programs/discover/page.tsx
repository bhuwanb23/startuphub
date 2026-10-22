import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { ProgramDiscovery } from "@/users/incubator/components/programs/discovery";

export const metadata: Metadata = {
  title: "Program Discovery · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Program Discovery">
      <ProgramDiscovery />
    </IncubatorShell>
  );
}
