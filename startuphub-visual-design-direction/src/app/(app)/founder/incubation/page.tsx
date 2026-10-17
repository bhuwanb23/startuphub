import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Incubation } from "@/users/startup/components/incubation/incubation";

export const metadata: Metadata = { title: "Incubation · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Incubation">
      <Incubation />
    </FounderShell>
  );
}
