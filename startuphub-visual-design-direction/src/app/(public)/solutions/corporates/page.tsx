import type { Metadata } from "next";
import { CorporatesView } from "@/views/solutions/corporates/corporates";

export const metadata: Metadata = {
  title: "For Corporates — StartupHub",
  description:
    "Startup discovery, technology scouting, innovation challenges, pilot programs, PoCs and partnerships — open innovation that ships.",
};

export default function Page() {
  return <CorporatesView />;
}
