"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/motion";

/* Shared page furniture — the deep-ink "ready to build" band with the
   ecosystem waitlist form wired to /api/waitlist. */

type Status = "idle" | "loading" | "success" | "error";

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(
          data.message ??
            "You're on the list — the ecosystem brief is on its way.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-xl border border-accent-200 bg-accent-soft px-5 py-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-[14px] font-medium text-accent-deep">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="founder@yourstartup.com"
          className="h-12 flex-1 rounded-lg border border-line bg-white px-4 text-[14.5px] text-ink placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-4 focus:ring-accent-100"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent px-6 text-[14.5px] font-semibold text-white shadow-[0_1px_2px_rgba(49,87,232,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all hover:bg-accent-deep disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2.5 text-center text-[13px] font-medium text-red-600">
          {message}
        </p>
      )}
      <p className="mt-3 text-center text-[12px] text-slate-400">
        Free during early access · No spam, only signal
      </p>
    </form>
  );
}

export function CTA({
  eyebrow = "Ready to build?",
  title = "Your next milestone is one connection away.",
  copy = "Join StartupHub and get matched with mentors, capital, IP protection and market intelligence — in one connected workspace.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section id="cta" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.1]"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#728FF4" strokeWidth="1" fill="none">
          <line x1="600" y1="250" x2="200" y2="90" />
          <line x1="600" y1="250" x2="1000" y2="80" />
          <line x1="600" y1="250" x2="150" y2="400" />
          <line x1="600" y1="250" x2="1050" y2="420" />
          <line x1="600" y1="250" x2="600" y2="40" />
        </g>
        <g fill="#728FF4">
          <circle cx="600" cy="250" r="5" />
          <circle cx="200" cy="90" r="3.5" />
          <circle cx="1000" cy="80" r="3.5" />
          <circle cx="150" cy="400" r="3.5" />
          <circle cx="1050" cy="420" r="3.5" />
          <circle cx="600" cy="40" r="3.5" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-300">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[15.5px] leading-relaxed text-slate-400">
            {copy}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
