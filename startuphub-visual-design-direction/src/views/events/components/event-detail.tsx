import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import CTA from "@/components/cta";
import type { StartupEvent } from "@/views/events/constants/events";
import { cn } from "@/lib/utils";

export default function EventDetail({ e }: { e: StartupEvent }) {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-line bg-soft pb-12 pt-28 md:pt-32">
        <div
          aria-hidden="true"
          className="bg-nodegrid absolute inset-x-0 top-0 h-[340px] [mask-image:radial-gradient(ellipse_65%_80%_at_50%_0%,black_25%,transparent)]"
        />
        <Container className="relative">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-400 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All events
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <div className="flex items-start gap-5">
                <span className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center rounded-2xl border border-line bg-white shadow-sm">
                  <span className="text-2xl font-bold leading-none text-accent">{e.day}</span>
                  <span className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-slate-400">{e.mon}</span>
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                      {e.type}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium",
                        e.format === "Virtual" ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-600"
                      )}
                    >
                      {e.format}
                    </span>
                    {e.tags.map((t) => (
                      <span key={t} className="hidden rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-slate-400 ring-1 ring-line sm:inline-block">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h1 className="mt-3 max-w-2xl text-balance text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
                    {e.title}
                  </h1>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      {e.dateLine}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4 text-slate-400" />
                      {e.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {e.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      {e.organizer}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="shrink-0">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(11,18,32,0.12),inset_0_1px_0_rgba(255,255,255,0.16)] transition-colors hover:bg-accent-deep"
              >
                <Ticket className="h-4 w-4" />
                Register — {e.fee}
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* body */}
      <section className="bg-soft py-14 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="space-y-10">
              <Reveal>
                <div className="rounded-2xl border border-line bg-white p-7 md:p-8">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Overview
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">{e.overview}</p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-line bg-white p-7 md:p-8">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Agenda
                  </h2>
                  <div className="relative mt-5">
                    <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />
                    <div className="space-y-1">
                      {e.agenda.map((a) => (
                        <div key={a.item} className="relative flex gap-5 rounded-lg p-2.5 transition-colors hover:bg-slate-50">
                          <span className="relative z-10 mt-1.5 h-[13px] w-[13px] shrink-0 rounded-full border-[3px] border-accent bg-white" />
                          <div className="flex flex-1 flex-wrap items-baseline gap-x-5">
                            <span className="w-28 shrink-0 text-[13px] font-semibold tabular-nums text-accent">
                              {a.time}
                            </span>
                            <span className="text-[14.5px] text-slate-600">{a.item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-line bg-white p-7 md:p-8">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Speakers &amp; Hosts
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {e.speakers.map((sp) => (
                      <div key={sp.name} className="flex items-center gap-3.5 rounded-xl border border-line p-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-bold text-accent">
                          {sp.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[14.5px] font-semibold text-ink">{sp.name}</p>
                          <p className="truncate text-[12.5px] text-slate-400">{sp.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* side panel */}
            <div className="space-y-5">
              <Reveal delay={0.06}>
                <div className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Users className="h-4 w-4 text-accent" />
                    Who should attend
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {e.eligibility.map((el) => (
                      <li key={el} className="flex items-start gap-2.5 text-[13.5px] text-slate-600">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-accent/20 bg-accent-mist p-6">
                  <h3 className="text-sm font-semibold text-ink">Registration</h3>
                  <div className="mt-4 space-y-2.5 text-[13.5px] text-slate-600">
                    <p className="flex justify-between">
                      <span className="text-slate-500">Capacity</span>
                      <span className="font-semibold text-ink">{e.seats}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">Entry</span>
                      <span className="font-semibold text-emerald-600">{e.fee}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">Format</span>
                      <span className="font-semibold text-ink">{e.format}</span>
                    </p>
                  </div>
                  <Link
                    href="/register"
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
                  >
                    Save my seat
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <p className="mt-3 text-center text-[11.5px] text-slate-400">
                    Free cancellation · Calendar invite on signup
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        title="Hosting an ecosystem event?"
        lead="List it on StartupHub and reach 10,000+ founders, investors and ecosystem professionals."
        primary={{ label: "List your event", href: "/register" }}
        secondary={{ label: "All events", href: "/events" }}
      />
    </>
  );
}
