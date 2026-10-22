import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Mentors } from "@/users/incubator/components/mentors/mentors";

export const metadata: Metadata = {
  title: "Mentor Management · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Mentor Management">
      <Mentors />
    </IncubatorShell>
  );
}
