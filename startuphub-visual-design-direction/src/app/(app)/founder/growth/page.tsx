import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Growth · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Growth">
      <AppTemplate
        icon={TrendingUp}
        title="Growth"
        desc="Growth planning, KPIs, startup health, risks and prioritized recommendations."
        nextFeatures={["KPI dashboard", "Health dimensions", "Risk register", "AI recommendations"]}
      />
    </FounderShell>
  );
}
