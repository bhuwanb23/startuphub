import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Events — StartupHub",
  description: "Demo days, investor meets, workshops and ecosystem events.",
};

export default function Page() {
  return (
    <SoonView
      icon={CalendarDays}
      title="The events calendar is filling up."
      desc="Demo days, investor office hours, founder workshops and ecosystem meetups — one calendar for the whole network."
      features={["Demo days", "Investor meets", "Founder workshops", "City meetups"]}
    />
  );
}
