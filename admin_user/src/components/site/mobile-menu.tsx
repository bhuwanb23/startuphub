"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NAV } from "./nav-data";
import { Wordmark } from "@/components/ui";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-white lg:hidden"
        >
          <div className="px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {NAV.map((item) => (
              <div key={item.label} className="border-b border-line/70 last:border-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((v) => (v === item.label ? null : item.label))
                      }
                      className="flex w-full items-center justify-between px-2 py-3 text-[15px] font-medium text-ink"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-slate-400 transition-transform duration-300",
                          expanded === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.label ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={onClose}
                                className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-slate-500 transition-colors hover:bg-soft hover:text-ink"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    onClick={onClose}
                    className="block px-2 py-3 text-[15px] font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={onClose}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-accent text-[15px] font-semibold text-white"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-lg border border-line text-[15px] font-semibold text-ink"
              >
                Log in
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
