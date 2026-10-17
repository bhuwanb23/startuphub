import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { FounderShell } from "@/users/startup/startup";
import { AppTemplate } from "@/users/startup/components/app-shell/template";

export const metadata: Metadata = { title: "Finance · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Finance">
      <AppTemplate
        icon={CreditCard}
        title="Finance"
        desc="Revenue, expenses, cash flow, burn and runway — with scenario analysis."
        nextFeatures={["Burn trend", "Runway scenarios", "Financial documents", "Invoice tracking"]}
      />
    </FounderShell>
  );
}
