import type { Metadata } from "next";
import { LifecycleView } from "@/views/lifecycle/lifecycle";

export const metadata: Metadata = {
  title: "Startup Lifecycle — StartupHub",
  description:
    "Idea → Validation → Incubation → IPR → Resources → MVP → Market → Funding → Growth → Performance → Scale. Explore all eleven connected stages.",
};

export default function Page() {
  return <LifecycleView />;
}
