"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink, Container } from "@/components/ui";
import { NAV } from "@/components/site/nav-data";

export default function MobileMenu() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
      <Container className="flex flex-col gap-0.5 py-4">
        {NAV.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => setExpanded((k) => (k === item.label ? null : item.label))}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform",
                    expanded === item.label && "rotate-180"
                  )}
                />
              </button>
              {expanded === item.label && (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                  {item.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-ink"
                    >
                      <c.icon className="h-3.5 w-3.5 text-accent" />
                      {c.label}
                      {c.soon && (
                        <span className="rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-400">
                          Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href!}
              className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-ink"
            >
              {item.label}
            </Link>
          )
        )}
        <div className="mt-3 flex gap-2">
          <ButtonLink href="/login" variant="secondary" className="flex-1">
            Log in
          </ButtonLink>
          <ButtonLink href="/register" className="flex-1">
            Get Started
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
