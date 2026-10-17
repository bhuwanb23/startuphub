import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { IncubatorCopilot } from "@/users/incubator/components/copilot/copilot";

export const metadata: Metadata = { title: "Program Copilot · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Program Copilot">
      <IncubatorCopilot />
    </IncubatorShell>
  );
}
