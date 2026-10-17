import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Reports } from "@/users/incubator/components/reports/reports";

export const metadata: Metadata = { title: "Reports & Analytics · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Reports & Analytics">
      <Reports />
    </IncubatorShell>
  );
}
