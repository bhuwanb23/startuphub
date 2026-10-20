import { Reveal } from "@/components/motion";
import { HOME_STATS } from "../constants/stats";
import { Counter } from "./counter";

export function StatsBand() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {HOME_STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className={`border-line px-6 py-12 sm:py-14 ${
                i > 0 ? "border-l max-sm:odd:border-l-0" : ""
              }`}
            >
              <div className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[2.9rem]">
                <Counter
                  to={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-3 text-[13px] font-medium leading-snug text-slate-500">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
