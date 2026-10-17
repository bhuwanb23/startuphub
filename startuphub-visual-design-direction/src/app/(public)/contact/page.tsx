import type { Metadata } from "next";
import { ContactView } from "@/views/contact/contact";

export const metadata: Metadata = {
  title: "Contact & Support — StartupHub",
  description:
    "Contact StartupHub: general inquiries, partnerships, support, feedback and issue reporting.",
};

export default function Page() {
  return <ContactView />;
}
