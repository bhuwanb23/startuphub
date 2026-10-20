"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{ msg: string; warn?: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (msg: string, warn = false) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ msg, warn });
    timer.current = setTimeout(() => setToast(null), 2800);
  };

  const viewport = (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-xl border border-line bg-ink px-4 py-3 text-[13px] font-medium text-white shadow-lift"
        >
          {toast.warn ? (
            <TriangleAlert className="h-4 w-4 shrink-0 text-amber-400" />
          ) : (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          )}
          {toast.msg}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return { show, viewport };
}
