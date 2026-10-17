import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import SoonView from "@/components/soon";

export const metadata: Metadata = {
  title: "Knowledge Hub — StartupHub",
  description: "Guides, playbooks and templates for every startup stage.",
};

export default function Page() {
  return (
    <SoonView
      icon={BookOpen}
      title="The Knowledge Hub is being written."
      desc="Practical playbooks from operators who've done it — validation, IPR, fundraising, growth and everything between."
      features={["Stage-by-stage playbooks", "Fundraising guides", "IPR explainers", "Template downloads"]}
    />
  );
}
