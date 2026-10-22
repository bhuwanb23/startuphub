import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { EventSpeakers } from "@/users/incubator/components/events/speakers";

export const metadata: Metadata = {
  title: "Speakers & Sessions · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Speakers & Sessions">
      <EventSpeakers />
    </IncubatorShell>
  );
}
