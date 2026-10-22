import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { EventRegistrations } from "@/users/incubator/components/events/registrations";

export const metadata: Metadata = {
  title: "Registrations · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Registrations">
      <EventRegistrations />
    </IncubatorShell>
  );
}
