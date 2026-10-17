import { ArrowRight } from "lucide-react";
import { Container, Wordmark } from "@/components/ui";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const columns = [
  {
    title: "Platform",
    links: ["Build", "Protect", "Connect", "Fund", "Grow"],
  },
  {
    title: "Explore",
    links: ["Lifecycle", "Ecosystem", "Intelligence", "Startups", "Stories"],
  },
  {
    title: "Resources",
    links: ["Opportunities", "Funding Calls", "Mentor Directory", "IPR Desk", "Guides"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Press", "Legal"],
  },
];

const socials = [
  { icon: XIcon, label: "X (Twitter)" },
  { icon: LinkedInIcon, label: "LinkedIn" },
  { icon: YouTubeIcon, label: "YouTube" },
  { icon: GitHubIcon, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* brand block */}
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              One connected ecosystem for every stage of your startup journey.
              Build, protect, validate and scale — with everything and everyone
              wired in.
            </p>
            <form className="mt-6 flex gap-2" action="#cta">
              <input
                type="email"
                required
                placeholder="Email for ecosystem updates"
                className="h-10 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-10 w-11 shrink-0 place-items-center rounded-[10px] bg-accent text-white transition-colors hover:bg-accent-deep"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-400 transition-all hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-sm text-slate-500 transition-colors hover:text-ink"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-[13px] text-slate-400 sm:flex-row">
          <p>© 2026 StartupHub. Made for builders, everywhere.</p>
          <div className="flex items-center gap-5">
            <a href="#top" className="transition-colors hover:text-ink">Privacy</a>
            <a href="#top" className="transition-colors hover:text-ink">Terms</a>
            <a href="#top" className="transition-colors hover:text-ink">Security</a>
            <span className="flex items-center gap-2">
              <span className="ping-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500" />
              All systems normal
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
