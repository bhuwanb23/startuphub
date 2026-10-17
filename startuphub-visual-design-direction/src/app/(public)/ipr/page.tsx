import type { Metadata } from "next";
import { IprView } from "@/views/ipr/ipr";

export const metadata: Metadata = {
  title: "IPR & Innovation Hub — StartupHub",
  description:
    "Patents, trademarks, copyright and designs — IP awareness, resources, statistics, experts and innovation showcase for startups.",
};

export default function Page() {
  return <IprView />;
}
