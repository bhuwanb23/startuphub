import type { Metadata } from "next";
import { MentorShell } from "@/users/mentor/mentor";
import { MentorProfile } from "@/users/mentor/components/profile/profile";

export const metadata: Metadata = { title: "My Profile · Priya Nair" };

export default function Page() {
  return (
    <MentorShell title="My Profile">
      <MentorProfile />
    </MentorShell>
  );
}
