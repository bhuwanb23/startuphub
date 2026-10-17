import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Performance } from "@/users/incubator/components/performance/performance";

export const metadata: Metadata = { title: "Performance · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Performance">
      <Performance />
    </IncubatorShell>
  );
}
