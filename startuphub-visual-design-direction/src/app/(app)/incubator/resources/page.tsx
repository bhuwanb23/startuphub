import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Resources } from "@/users/incubator/components/resources/resources";

export const metadata: Metadata = { title: "Resources · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Resources">
      <Resources />
    </IncubatorShell>
  );
}
