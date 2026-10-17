import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Messages } from "@/users/startup/components/messages/messages";

export const metadata: Metadata = { title: "Messages · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Messages">
      <Messages />
    </FounderShell>
  );
}
