import type { Metadata } from "next";
import { FounderShell } from "@/users/startup/startup";
import { ProductRoadmap } from "@/users/startup/components/product/roadmap";

export const metadata: Metadata = { title: "Product Roadmap · Lumen AI" };

export default function Page() {
  return (
    <FounderShell title="Product Roadmap">
      <ProductRoadmap />
    </FounderShell>
  );
}
