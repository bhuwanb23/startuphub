import type { Metadata } from "next";
import { FoundersView } from "@/views/solutions/founders/founders";

export const metadata: Metadata = {
  title: "For Founders — StartupHub",
  description:
    "Discover, validate, incubate, protect, build, find resources, reach market, raise funding, grow and track performance — one connected path for founders.",
};

export default function Page() {
  return <FoundersView />;
}
