import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { IprProfile } from "@/users/ipr-expert/components/profile/profile";

export const metadata: Metadata = { title: "My Profile · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="My Profile">
      <IprProfile />
    </IprShell>
  );
}
