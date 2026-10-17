import { Container, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { team } from "@/views/about/constants/data";

export default function Team() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="The Team"
          title={
            <>
              Operators, founders and investors —{" "}
              <span className="text-accent">now ecosystem builders.</span>
            </>
          }
          lead="We've been on every side of the table. StartupHub is what we wished existed."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 md:mt-16 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.05}>
              <div className="group rounded-2xl border border-line bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_36px_-20px_rgba(11,18,32,0.22)]">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-lg font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{m.name}</h3>
                <p className="mt-1 text-[13px] text-slate-400">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-sm text-slate-400">
            Plus 200+ ecosystem fellows embedded in incubators and institutions across the country.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
