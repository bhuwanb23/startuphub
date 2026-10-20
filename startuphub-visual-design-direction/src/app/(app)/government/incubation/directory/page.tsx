import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { IncubatorDirectory } from "@/users/government/components/incubation";

export const metadata: Metadata = { title: "Incubator Directory · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Incubator Directory">
      <IncubatorDirectory />
    </GovernmentShell>
  );
}
