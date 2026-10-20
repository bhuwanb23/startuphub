"use client";

import { KeyRound } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label ?? "toggle"}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative h-5.5 w-10 shrink-0 rounded-full transition-colors duration-300",
        checked ? "bg-accent" : "bg-slate-200",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-all duration-300",
          checked ? "left-[18px]" : "left-0.5",
        )}
      />
    </button>
  );
}

export function ControlRow({
  label,
  desc,
  control,
  privileged,
}: {
  label: string;
  desc?: string;
  control: ReactNode;
  privileged?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-line/70 px-1 py-4 last:border-0">
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          {label}
          {privileged ? (
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-rose-600">
              Privileged
            </span>
          ) : null}
        </p>
        {desc ? <p className="mt-0.5 text-[12px] leading-snug text-slate-400">{desc}</p> : null}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export function SelectSmall({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        "h-9 rounded-lg border border-line bg-white px-3 text-[12.5px] font-semibold text-ink outline-none transition-colors focus:border-accent/50",
        className,
      )}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function SecretField({ label, onRotate }: { label: string; onRotate?: () => void }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-soft px-3 py-1.5 font-mono text-[11px] text-slate-500">
        <KeyRound className="h-3 w-3" />
        •••••••·{label}
      </span>
      <button
        type="button"
        onClick={onRotate}
        className="rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:border-accent/40 hover:text-accent"
      >
        Rotate
      </button>
    </span>
  );
}
