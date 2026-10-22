import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { EventCalendar } from "@/users/incubator/components/events/calendar";

export const metadata: Metadata = {
  title: "Event Calendar · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Event Calendar">
      <EventCalendar />
    </IncubatorShell>
  );
}
