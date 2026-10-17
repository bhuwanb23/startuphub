import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Mentors } from "@/users/incubator/components/mentors/mentors";

export const metadata: Metadata = { title: "Mentors · StartupHub Labs" };

export default function Page() {
  return (
    <IncubatorShell title="Mentors">
      <Mentors />
    </IncubatorShell>
  );
}
