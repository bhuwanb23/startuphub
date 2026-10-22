import type { Metadata } from "next";
import { IncubatorShell } from "@/users/incubator/incubator";
import { IprSupport } from "@/users/incubator/components/support/ipr";

export const metadata: Metadata = {
  title: "IPR Support · StartupHub Labs",
};

export default function Page() {
  return (
    <IncubatorShell title="IPR Support">
      <IprSupport />
    </IncubatorShell>
  );
}
