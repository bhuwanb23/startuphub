import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { Product } from "@/users/startup/components/product/product";

export const metadata: Metadata = { title: "Product · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Product">
      <Product />
    </FounderShell>
  );
}
