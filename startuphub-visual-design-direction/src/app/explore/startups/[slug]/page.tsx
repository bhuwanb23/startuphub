import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { startups } from "@/views/explore/startups/constants/startups";
import { StartupDetailView } from "@/views/explore/startup-detail/startup-detail";

export function generateStaticParams() {
  return startups.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = startups.find((x) => x.slug === slug);
  if (!s) return { title: "Startup not found — StartupHub" };
  return {
    title: `${s.name} — ${s.sector} | StartupHub`,
    description: s.oneLiner,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = startups.find((x) => x.slug === slug);
  if (!s) notFound();
  return <StartupDetailView s={s} />;
}
