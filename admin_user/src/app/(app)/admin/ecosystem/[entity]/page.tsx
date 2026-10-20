import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/users/admin/admin";
import { EntityDirectory } from "@/users/admin/components/ecosystem/entity-directory";
import { ENTITIES, ENTITY_INDEX } from "@/users/admin/constants/ecosystem";

export function generateStaticParams() {
  return ENTITIES.map((e) => ({ entity: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entity: string }>;
}): Promise<Metadata> {
  const { entity } = await params;
  const config = ENTITY_INDEX[entity];
  return { title: `${config?.title ?? "Ecosystem"} · StartupHub Admin` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const config = ENTITY_INDEX[entity];
  if (!config) notFound();

  return (
    <AdminShell title={config.title}>
      <EntityDirectory slug={entity} />
    </AdminShell>
  );
}
