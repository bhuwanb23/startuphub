"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink, Container, Wordmark } from "@/components/ui";
import { NAV } from "@/components/site/nav-data";
import MobileMenu from "@/components/site/mobile-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href?: string, children?: { href: string }[]) =>
    href
      ? pathname === href
      : children?.some((c) => pathname.startsWith(c.href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="StartupHub home" className="shrink-0">
          <Wordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                    isActive(undefined, item.children)
                      ? "text-accent"
                      : "text-slate-600 hover:text-ink"
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div
                    className={cn(
                      "rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-24px_rgba(11,18,32,0.25)]",
                      item.children.length > 2 ? "w-[540px]" : "w-[320px]"
                    )}
                  >
                    <div
                      className={cn(
                        "grid gap-1",
                        item.children.length > 2 ? "grid-cols-2" : "grid-cols-1"
                      )}
                    >
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                            <c.icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                              {c.label}
                              {c.soon && (
                                <span className="rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-400">
                                  Soon
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block truncate text-[12.5px] text-slate-500">
                              {c.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    {item.footer && (
                      <Link
                        href={item.footer.href}
                        className="mt-1 flex items-center justify-center rounded-xl bg-accent-mist px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-accent-soft"
                      >
                        {item.footer.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                  isActive(item.href) ? "text-accent" : "text-slate-600 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href="/register" size="sm">
            Get Started
          </ButtonLink>
        </div>

        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <span className="text-lg leading-none">×</span> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && <MobileMenu />}
    </header>
  );
}
