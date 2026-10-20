import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { IpPortfolio } from "@/users/university/components/ip/portfolio";

export const metadata: Metadata = { title: "Intellectual Property · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="Intellectual Property">
      <IpPortfolio />
    </UniversityShell>
  );
}
