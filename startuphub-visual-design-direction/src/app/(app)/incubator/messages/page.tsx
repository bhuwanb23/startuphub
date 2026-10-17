import type { Metadata } from "next";
import { MessagesSquare } from "lucide-react";
import { IncubatorShell } from "@/users/incubator/incubator";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Messages · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Messages">
      <AppTemplate
        icon={MessagesSquare}
        title="Messages"
        desc="Threads with startups, mentors, investors, partners and your internal team."
        nextFeatures={["Startup threads", "Mentor threads", "Team channels", "Broadcast"]}
      />
    </IncubatorShell>
  );
}
