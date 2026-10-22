import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { Resources } from "@/users/incubator/components/resources/resources";

export const metadata: Metadata = {
  title: "Resource Inventory · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="Resource Inventory">
      <Resources />
    </IncubatorShell>
  );
}
