import { Container } from "@/components/ui";

export function TrustStrip({
  label = "Powering ecosystems at",
  names,
  marquee = true,
}: {
  label?: string;
  names: string[];
  marquee?: boolean;
}) {
  const row = [...names, ...names];

  return (
    <section className="border-y border-line bg-white py-12">
      <Container>
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {label}
        </p>
        {marquee ? (
          <div className="mask-x-fade mt-7 overflow-hidden">
            <div className="anim-marquee flex w-max items-center gap-14 pr-14">
              {row.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-slate-400"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {names.map((name) => (
              <span
                key={name}
                className="text-[15px] font-semibold tracking-tight text-slate-400"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
