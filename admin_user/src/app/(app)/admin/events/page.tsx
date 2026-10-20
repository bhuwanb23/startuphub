import type { Metadata } from "next";
import { AdminShell } from "@/users/admin/admin";
import { EventsAdmin } from "@/users/admin/components/programs/programs";

export const metadata: Metadata = { title: "Event Management · StartupHub Admin" };

export default function Page() {
  return (
    <AdminShell title="Event Management">
      <EventsAdmin />
    </AdminShell>
  );
}
