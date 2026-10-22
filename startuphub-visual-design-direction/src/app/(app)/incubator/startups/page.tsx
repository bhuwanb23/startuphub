import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Startups } from "@/users/incubator/components/startups/startups";

export const metadata: Metadata = { title: "Startup Portfolio · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Startup Portfolio">
      <Startups />
    </IncubatorShell>
  );
}
