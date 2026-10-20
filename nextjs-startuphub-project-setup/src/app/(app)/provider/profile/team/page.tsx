import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { TeamStaff } from "@/users/provider/components/profile";

export const metadata: Metadata = { title: "Team & Staff · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Team & Staff">
      <TeamStaff />
    </ProviderShell>
  );
}
