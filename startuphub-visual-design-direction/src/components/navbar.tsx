"use client";

import { useEffect, useState } from "react";
import {
  Blocks,
  ChevronDown,
  Landmark,
  Menu,
  Network,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink, Container, Wordmark } from "@/components/ui";

const platformMenu = [
  {
    icon: Blocks,
    title: "Build",
    desc: "Product, MVP & validation tools",
  },
  {
    icon: ShieldCheck,
    title: "Protect",
    desc: "IPR, legal & compliance desk",
  },
  {
    icon: Network,
    title: "Connect",
    desc: "Mentors, resources & partners",
  },
  {
    icon: Landmark,
    title: "Fund",
    desc: "Investors, grants & capital",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    desc: "Market, performance & intelligence",
  },
];

const links = [
  { label: "Explore", href: "#ecosystem" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" aria-label="StartupHub home" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {/* Platform w/ dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-ink">
              Platform
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="w-[560px] rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-24px_rgba(11,18,32,0.25)]">
                <div className="grid grid-cols-2 gap-1">
                  {platformMenu.map((item) => (
                    <a
                      key={item.title}
                      href="#platform"
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">
                          {item.desc}
                        </span>
                      </span>
                    </a>
                  ))}
                  <a
                    href="#platform"
                    className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-accent-mist px-4 py-3 text-[13px] font-semibold text-ink transition-colors hover:bg-accent-soft"
                  >
                    Every critical connection, in one platform
                    <span className="text-accent">Explore the platform →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="#cta" variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href="#cta" size="sm">
            Get Started
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[{ label: "Platform", href: "#platform" }, ...links].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <ButtonLink href="#cta" variant="secondary" className="flex-1">
                Log in
              </ButtonLink>
              <ButtonLink href="#cta" className="flex-1">
                Get Started
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
