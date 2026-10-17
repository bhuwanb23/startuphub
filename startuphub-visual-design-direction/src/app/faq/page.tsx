import type { Metadata } from "next";
import { FaqView } from "@/views/faq/faq";

export const metadata: Metadata = {
  title: "FAQ — StartupHub",
  description:
    "Frequently asked questions about StartupHub, founders, incubation, IPR, funding, investors, mentors and organizations.",
};

export default function Page() {
  return <FaqView />;
}
