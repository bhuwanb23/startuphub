import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Ipr } from "@/users/startup/components/ipr/ipr";

export const metadata: Metadata = { title: "IPR & Legal · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="IPR & Legal">
      <Ipr />
    </FounderShell>
  );
}
