"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Opportunities", href: "#opportunities" },
];

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
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-line shadow-[0_1px_0_rgba(11,18,32,0.02)]" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" aria-label="StartupHub home" className="shrink-0">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-slate-600 transition-colors hover:bg-soft hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href="/login"
            className="rounded-lg px-3.5 py-2 text-[14px] font-medium text-slate-600 transition-colors hover:text-ink"
          >
            Log in
          </a>
          <a
            href="/register"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:bg-accent-deep hover:shadow-card"
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-5 pb-6 pt-3 lg:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 hover:bg-soft"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/register"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-[15px] font-semibold text-white"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
