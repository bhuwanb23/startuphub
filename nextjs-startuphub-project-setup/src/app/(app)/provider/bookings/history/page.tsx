import type { Metadata } from "next";
import { ProviderShell } from "@/users/provider/provider";
import { BookingHistory } from "@/users/provider/components/bookings";

export const metadata: Metadata = { title: "Booking History · Vertex Labs & Compute" };

export default function Page() {
  return (
    <ProviderShell title="Booking History">
      <BookingHistory />
    </ProviderShell>
  );
}
