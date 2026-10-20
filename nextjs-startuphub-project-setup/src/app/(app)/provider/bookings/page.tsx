import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { BookingManagement } from "@/users/provider/components/bookings";

export const metadata: Metadata = { title: "Booking Management · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Booking Management">
      <BookingManagement />
    </ProviderShell>
  );
}
