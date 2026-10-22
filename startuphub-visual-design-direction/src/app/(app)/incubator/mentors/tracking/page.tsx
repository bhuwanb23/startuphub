import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { MentorshipTracking } from "@/users/incubator/components/mentors/tracking";

export const metadata: Metadata = {
  title: "Mentorship Tracking · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Mentorship Tracking">
      <MentorshipTracking />
    </IncubatorShell>
  );
}
