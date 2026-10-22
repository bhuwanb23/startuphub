import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { MentorDiscovery } from "@/users/incubator/components/mentors/discovery";

export const metadata: Metadata = {
  title: "Mentor Discovery · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Mentor Discovery">
      <MentorDiscovery />
    </IncubatorShell>
  );
}
