"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { compareFeatures, plans } from "@/views/pricing/constants/plans";
import { cn } from "@/lib/utils";

export default function PricingClient() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      {/* billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", annual ? "text-slate-400" : "text-ink")}>Monthly</span>
        <button
          onClick={() => setAnnual((v) => !v)}
          className={cn(
            "relative h-7 w-12 rounded-full transition-colors",
            annual ? "bg-accent" : "bg-slate-200"
          )}
          aria-label="Toggle annual billing"
        >
          <span
            className={cn(
              "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all",
              annual ? "left-6" : "left-1"
            )}
          />
        </button>
        <span className={cn("text-sm font-medium", annual ? "text-ink" : "text-slate-400")}>
          Annual
          <span className="ml-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
            save 20%
          </span>
        </span>
      </div>

      {/* plan cards */}
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {plans.map((p, i) => {
          const price = annual ? p.annual : p.monthly;
          return (
            <div
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                p.featured
                  ? "border-accent bg-white shadow-[0_32px_64px_-32px_rgba(49,87,232,0.45)]"
                  : "border-line bg-white hover:shadow-[0_20px_44px_-24px_rgba(11,18,32,0.2)]",
                i === 4 && "md:col-span-2 xl:col-span-1"
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight text-ink">{p.name}</h3>
              <p className="mt-1 min-h-[36px] text-[12.5px] leading-snug text-slate-400">{p.who}</p>
              <div className="mt-5 min-h-[56px]">
                {price === null ? (
                  <span className="text-[1.9rem] font-semibold tracking-tight text-ink">Custom</span>
                ) : price === 0 ? (
                  <span className="text-[1.9rem] font-semibold tracking-tight text-ink">₹0</span>
                ) : (
                  <>
                    <span className="text-[1.9rem] font-semibold tracking-tight text-ink tabular-nums">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-slate-400"> / mo{annual && p.monthly! > 0 && " · billed annually"}</span>
                  </>
                )}
              </div>
              <Link
                href="/register"
                className={cn(
                  "mt-5 flex h-10 w-full items-center justify-center rounded-[10px] text-sm font-semibold transition-colors",
                  p.featured
                    ? "bg-accent text-white hover:bg-accent-deep"
                    : "border border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {p.cta}
              </Link>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[13px] text-slate-600">
                    <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* comparison table */}
      <div className="mt-20 overflow-x-auto">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-ink">
          Compare everything, line by line.
        </h2>
        <table className="mt-8 w-full min-w-[820px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-line bg-white text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="border-b border-line px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Feature
              </th>
              {plans.map((p) => (
                <th
                  key={p.name}
                  className={cn(
                    "border-b border-line px-4 py-4 text-center text-[13px] font-semibold",
                    p.featured ? "text-accent" : "text-ink"
                  )}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareFeatures.map((f, ri) => (
              <tr key={f.name} className={ri % 2 === 0 ? "bg-white" : "bg-soft/60"}>
                <td className="border-b border-line px-5 py-3.5 text-[13.5px] font-medium text-slate-600 last:border-b-0">
                  {f.name}
                </td>
                {f.tiers.map((t, ti) => (
                  <td key={ti} className="border-b border-line px-4 py-3.5 text-center last:border-b-0">
                    {t === true ? (
                      <Check className="mx-auto h-4 w-4 text-accent" />
                    ) : t === false ? (
                      <Minus className="mx-auto h-4 w-4 text-slate-200" />
                    ) : (
                      <span className="text-[12.5px] font-medium text-slate-600">{t}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
