import type { Metadata } from "next";
import { GovernmentShell } from "@/users/government/government";
import { AcceleratorManagement } from "@/users/government/components/incubation";

export const metadata: Metadata = { title: "Accelerator Management · State Innovation Mission" };

export default function Page() {
  return (
    <GovernmentShell title="Accelerator Management">
      <AcceleratorManagement />
    </GovernmentShell>
  );
}
