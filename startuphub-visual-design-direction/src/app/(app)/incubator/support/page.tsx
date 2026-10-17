import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Support } from "@/users/incubator/components/support/support";

export const metadata: Metadata = { title: "Startup Support · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Startup Support">
      <Support />
    </IncubatorShell>
  );
}
