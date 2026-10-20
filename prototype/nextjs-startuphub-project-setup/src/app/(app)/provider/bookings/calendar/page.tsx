import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { BookingsCalendar } from "@/users/provider/components/bookings";

export const metadata: Metadata = { title: "Bookings Calendar · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Bookings Calendar">
      <BookingsCalendar />
    </ProviderShell>
  );
}
