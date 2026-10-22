import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { ProductValidation } from "@/users/startup/components/product/validation";

export const metadata: Metadata = { title: "Product Validation · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Product Validation">
      <ProductValidation />
    </FounderShell>
  );
}
