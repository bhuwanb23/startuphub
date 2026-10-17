import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Programs } from "@/users/incubator/components/programs/programs";

export const metadata: Metadata = { title: "Programs · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Programs">
      <Programs />
    </IncubatorShell>
  );
}
