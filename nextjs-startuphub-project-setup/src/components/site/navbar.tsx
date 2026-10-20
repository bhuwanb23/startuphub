"use client";

import { motion, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui";
import { MobileMenu } from "./mobile-menu";
import { siteNav } from "./nav-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 12)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-shadow duration-500 ${
        scrolled
          ? "border-line shadow-[0_1px_16px_rgba(11,18,32,0.06)]"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" aria-label="StartupHub home">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {siteNav.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative rounded-md px-3.5 py-2 text-[14px] font-medium text-slate-500 transition-colors duration-300 hover:text-ink"
            >
              {l.label}
              <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href="/login"
            className="rounded-lg px-4 py-2.5 text-[14px] font-medium text-ink transition-colors duration-300 hover:bg-slate-100"
          >
            Log in
          </a>
          <a
            href="/register"
            className="group flex items-center gap-1.5 rounded-lg bg-accent px-4.5 py-2.5 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4)] transition-all duration-300 hover:bg-accent-deep hover:shadow-[0_6px_20px_rgba(49,87,232,0.35)]"
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <MobileMenu open={open} links={siteNav} onClose={() => setOpen(false)} />
    </motion.header>
  );
}
