import type { Metadata } from "next";
import { Award } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Success Stories — StartupHub",
  description: "Founders who built, protected and scaled with StartupHub — in their own words.",
};

export default function Page() {
  return (
    <SoonView
      icon={Award}
      title="Success Stories are being collected."
      desc="Long-form founder stories: the stages they crossed, the connections that mattered, and the numbers to prove it."
      features={["Founder case studies", "IPO & exit stories", "Ecosystem impact", "Video interviews"]}
    />
  );
}
