import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { Soon } from "@/components/soon";

export const metadata: Metadata = { title: "Help & Support · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Help & Support">
      <div className="py-10">
        <Soon
          title="Admin support desk is being wired up"
          lead="The operations support channel and runbook library land here next. For anything urgent, escalate from the Dashboard action center."
          backHref="/admin"
          backLabel="Back to dashboard"
        />
      </div>
    </AdminShell>
  );
}
