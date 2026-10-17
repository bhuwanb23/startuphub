import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { MentorShell } from "@/users/mentor/mentor";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Messages · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="Messages">
      <AppTemplate
        icon={MessageSquare}
        title="Messages"
        desc="Threads with startups, incubators, investors and fellow experts."
        nextFeatures={["Startup threads", "Incubator threads", "Group chats", "Search"]}
      />
    </MentorShell>
  );
}
