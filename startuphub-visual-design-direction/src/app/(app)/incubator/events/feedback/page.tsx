import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { EventFeedback } from "@/users/incubator/components/events/feedback";

export const metadata: Metadata = {
  title: "Feedback & Outcomes · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Feedback & Outcomes">
      <EventFeedback />
    </IncubatorShell>
  );
}
