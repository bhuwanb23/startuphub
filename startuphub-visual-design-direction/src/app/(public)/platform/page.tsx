import type { Metadata } from "next";
import { PlatformView } from "@/views/platform/platform";

export const metadata: Metadata = {
  title: "Platform — StartupHub",
  description:
    "Eleven connected modules: idea management, incubation, IPR, resource hub, market intelligence, product & validation, funding, growth, performance, marketplace and AI intelligence.",
};

export default function Page() {
  return <PlatformView />;
}
