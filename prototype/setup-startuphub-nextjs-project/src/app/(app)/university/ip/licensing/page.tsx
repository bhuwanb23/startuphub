import type { Metadata } from "next";
import { UniversityShell } from "@/users/university/university";
import { IpLicensing } from "@/users/university/components/ip/licensing";

export const metadata: Metadata = { title: "IP Licensing · Crestmont University" };

export default function Page() {
  return (
    <UniversityShell title="IP Licensing">
      <IpLicensing />
    </UniversityShell>
  );
}
