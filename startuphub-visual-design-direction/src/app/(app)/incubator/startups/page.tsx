import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Startups } from "@/users/incubator/components/startups/startups";

export const metadata: Metadata = { title: "Startups · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Startups">
      <Startups />
    </IncubatorShell>
  );
}
