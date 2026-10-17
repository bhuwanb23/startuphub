import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/views/events/constants/events";
import EventDetail from "@/views/events/components/event-detail";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) return { title: "Event not found — StartupHub" };
  return { title: `${e.title} — StartupHub Events`, description: e.overview.slice(0, 150) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();
  return <EventDetail e={e} />;
}
