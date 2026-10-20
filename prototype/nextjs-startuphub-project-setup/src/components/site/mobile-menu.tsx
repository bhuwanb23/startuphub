"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { NavLink } from "./nav-data";

export function MobileMenu({
  open,
  links,
  onClose,
}: {
  open: boolean;
  links: NavLink[];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-t border-line bg-white lg:hidden"
        >
          <div className="space-y-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-soft"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2.5 pt-3">
              <a
                href="/login"
                onClick={onClose}
                className="flex-1 rounded-lg border border-line px-4 py-3 text-center text-[14px] font-medium text-ink"
              >
                Log in
              </a>
              <a
                href="/register"
                onClick={onClose}
                className="flex-1 rounded-lg bg-accent px-4 py-3 text-center text-[14px] font-semibold text-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
