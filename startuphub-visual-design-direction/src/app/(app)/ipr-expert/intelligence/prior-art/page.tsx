import type { Metadata } from "next";
import { IprShell } from "@/users/ipr-expert/ipr-expert";
import { PriorArtSearch } from "@/users/ipr-expert/components/intelligence/intelligence";

export const metadata: Metadata = { title: "Prior-Art Search · Dr. Kavita Rao" };

export default function Page() {
  return (
    <IprShell title="Prior-Art Search">
      <PriorArtSearch />
    </IprShell>
  );
}
