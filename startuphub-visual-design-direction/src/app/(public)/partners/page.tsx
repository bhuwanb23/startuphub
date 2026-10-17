import type { Metadata } from "next";
import { PartnersView } from "@/views/partners/partners";

export const metadata: Metadata = {
  title: "Partners — StartupHub",
  description:
    "Government, incubator, university, corporate, investor, technology and ecosystem partners building StartupHub together.",
};

export default function Page() {
  return <PartnersView />;
}
