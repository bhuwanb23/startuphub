import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Applications } from "@/users/incubator/components/programs/applications";

export const metadata: Metadata = {
  title: "Applications · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Applications">
      <Applications />
    </IncubatorShell>
  );
}
