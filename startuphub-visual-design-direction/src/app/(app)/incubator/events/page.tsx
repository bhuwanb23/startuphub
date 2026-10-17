import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Events } from "@/users/incubator/components/events/events";

export const metadata: Metadata = { title: "Events & Workshops · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Events & Workshops">
      <Events />
    </IncubatorShell>
  );
}
