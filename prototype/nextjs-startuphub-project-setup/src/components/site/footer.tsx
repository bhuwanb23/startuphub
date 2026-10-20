import { ArrowUpRight, AtSign, Globe, Mail } from "lucide-react";
import { LogoMark } from "@/components/ui";

const COLS: { title: string; links: string[] }[] = [
  {
    title: "Platform",
    links: ["Build", "Protect · IPR", "Connect", "Fund", "Grow"],
  },
  {
    title: "Explore",
    links: ["Startup directory", "Incubators", "Investors", "Mentors", "Corporates"],
  },
  {
    title: "Intelligence",
    links: ["Market snapshots", "Sector reports", "Trend radar", "Research desk"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press kit", "Privacy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* brand */}
          <div>
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <LogoMark className="h-6 w-6" />
              </span>
              <span className="text-[18px] font-semibold tracking-tight">
                StartupHub<span className="text-accent">.</span>
              </span>
            </span>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/50">
              One connected ecosystem for every stage of the startup journey —
              from first idea to lasting impact.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[Globe, AtSign, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/60 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="group flex items-center gap-1 text-[13.5px] text-white/65 transition-colors duration-300 hover:text-white"
                      >
                        {l}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[12px] text-white/40">
            © 2026 StartupHub. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/35 uppercase">
            Designed for builders · Crafted for scale
          </p>
        </div>
      </div>
    </footer>
  );
}
