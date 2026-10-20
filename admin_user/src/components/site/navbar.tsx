"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/ui";
import { MobileMenu } from "./mobile-menu";
import { NAV } from "./nav-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line/80 bg-white/85 shadow-[0_1px_2px_rgba(11,18,32,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/0",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="StartupHub home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.label} className="group relative">
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-500 transition-colors hover:text-ink"
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3 text-slate-400 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-40 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="w-[520px] rounded-2xl border border-line bg-white p-2.5 shadow-lift">
                      <div className="grid grid-cols-2 gap-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="group/child rounded-xl px-3.5 py-2.5 transition-colors hover:bg-soft"
                          >
                            <span className="block text-[13px] font-semibold text-ink group-hover/child:text-accent">
                              {child.label}
                            </span>
                            {child.desc ? (
                              <span className="mt-0.5 block text-[11.5px] leading-snug text-slate-400">
                                {child.desc}
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href ?? "#"}
                  className="relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-500 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-500 transition-colors hover:text-ink"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-4 text-[13.5px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.35),0_6px_16px_-6px_rgba(49,87,232,0.45)] transition hover:bg-accent-deep"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink lg:hidden"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
