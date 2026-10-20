import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { SocialImpact } from "@/users/government/components/impact";

export const metadata: Metadata = { title: "Social Impact · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Social Impact">
      <SocialImpact />
    </GovernmentShell>
  );
}
