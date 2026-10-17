import { Check, Clock3, Hammer, type LucideIcon } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { cn } from "@/lib/utils";

const buildSteps = [
  { icon: Check, label: "Design system", done: true },
  { icon: Hammer, label: "Content & data", done: false },
  { icon: Clock3, label: "Next demo drop", done: false },
];

export default function SoonView({
  icon: Icon,
  title,
  desc,
  features,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
}) {
  return (
    <section className="relative overflow-hidden pb-28 pt-32 md:pt-40">
      <div
        aria-hidden="true"
        className="bg-nodegrid absolute inset-x-0 top-0 h-[420px] [mask-image:radial-gradient(ellipse_60%_75%_at_50%_0%,black_25%,transparent)]"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/20 bg-accent-soft text-accent">
            <Icon className="h-6 w-6" />
          </span>
          <h1 className="mt-7 text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-slate-500">{desc}</p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-slate-600"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-10 flex w-full max-w-md items-center justify-between rounded-2xl border border-line bg-white p-5">
            {buildSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full",
                    s.done ? "bg-accent text-white" : "bg-slate-100 text-slate-400"
                  )}
                >
                  <s.icon className="h-3.5 w-3.5" />
                </span>
                <span
                  className={cn(
                    "text-[12px] font-medium",
                    s.done ? "text-ink" : "text-slate-400"
                  )}
                >
                  {s.label}
                </span>
                {i < buildSteps.length - 1 && (
                  <span className="mx-1 hidden h-px w-6 bg-line sm:block" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Shipping with the next demo drop
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/register">Get notified at launch</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
