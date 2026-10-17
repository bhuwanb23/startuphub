import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";

export const metadata: Metadata = { title: "Deal Desk — StartupHub" };

export default function Page() {
  return (
    <div className="grid min-h-screen place-items-center bg-soft px-6">
      <div className="max-w-md rounded-2xl border border-line bg-white p-10 text-center shadow-[0_24px_56px_-32px_rgba(11,18,32,0.25)]">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Hammer className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-xl font-semibold tracking-tight text-ink">Deal Desk</h1>
        <p className="mt-1 text-[13px] font-medium text-slate-400">Northgate Partners</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          This workspace joins the demo in the next drop — the Founder workspace (
          <Link href="/founder" className="font-semibold text-accent hover:underline">/founder</Link>
          ) is already live.
        </p>
        <Link
          href="/login"
          className="mt-7 inline-flex items-center gap-2 rounded-[10px] border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Switch demo account
        </Link>
      </div>
    </div>
  );
}
