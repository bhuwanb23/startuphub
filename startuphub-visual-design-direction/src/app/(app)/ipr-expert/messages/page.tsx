import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Messages · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Messages">
      <AppTemplate
        icon={MessageSquare}
        title="Messages"
        desc="Conversations with clients, startups and your legal team."
        nextFeatures={["Client threads", "Case threads", "Legal team", "Group chats"]}
      />
    </IprShell>
  );
}
