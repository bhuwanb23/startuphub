import type { Metadata } from "next";
import { InvestorShell } from "@/users/investor/investor";
import { NotesPage } from "@/users/investor/components/comm";

export const metadata: Metadata = { title: "Notes · Arjun Mehta" };

export default function Page() {
  return (
    <InvestorShell title="Notes">
      <NotesPage />
    </InvestorShell>
  );
}
