import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { IncubationWorkspace } from "@/users/startup/components/incubation/workspace";

export const metadata: Metadata = {
  title: "Incubation Workspace · Lumen AI",
};

export default function Page() {
  return (
    <FounderShell title="Incubation Workspace">
      <IncubationWorkspace />
    </FounderShell>
  );
}
