import type { Metadata } from "next";
import { EventsView } from "@/views/events/events";

export const metadata: Metadata = {
  title: "Events — StartupHub",
  description:
    "Hackathons, workshops, webinars, demo days, investor events, networking and conferences across the startup ecosystem.",
};

export default function Page() {
  return <EventsView />;
}
