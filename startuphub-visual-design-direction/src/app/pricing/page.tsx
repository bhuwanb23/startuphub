import type { Metadata } from "next";
import { PricingView } from "@/views/pricing/pricing";

export const metadata: Metadata = {
  title: "Pricing — StartupHub",
  description:
    "Free, Startup, Professional, Organization and Enterprise plans — feature comparison, billing options and pricing FAQ.",
};

export default function Page() {
  return <PricingView />;
}
