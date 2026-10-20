import { Wordmark } from "@/components/ui";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Platform",
    links: ["Build", "Protect", "Connect", "Fund", "Grow"],
  },
  {
    title: "Explore",
    links: ["Startups", "Incubators", "Mentors", "Investors", "Corporates"],
  },
  {
    title: "Intelligence",
    links: ["Market Signals", "Sector Reports", "IP Activity", "Benchmarks"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-slate-500">
              The connected ecosystem for every stage of the startup journey —
              from first idea to lasting impact.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              All systems operational
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[14px] text-slate-600 transition-colors hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-[13px] text-slate-400">
            © 2026 StartupHub Global, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-slate-400">
            <a href="#top" className="hover:text-slate-600">
              Terms
            </a>
            <a href="#top" className="hover:text-slate-600">
              Privacy
            </a>
            <a href="#top" className="hover:text-slate-600">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
