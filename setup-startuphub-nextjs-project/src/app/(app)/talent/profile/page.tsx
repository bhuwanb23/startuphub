import type { Metadata } from "next";
import { TalentShell } from "@/users/talent/talent";
import { TalentProfile } from "@/users/talent/components/profile/profile";

export const metadata: Metadata = { title: "Profile · Zoya Khan" };

export default function Page() {
  return (
    <TalentShell title="My Profile">
      <TalentProfile />
    </TalentShell>
  );
}
