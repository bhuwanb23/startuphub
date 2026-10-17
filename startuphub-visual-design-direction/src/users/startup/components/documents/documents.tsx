import { Download, FileText, Folder, Plus, Share2 } from "lucide-react";
import { Badge, Card, PageHeader } from "@/components/app/widgets";

const folders = [
  ["Startup documents", 18], ["IPR documents", 7], ["Financial documents", 12],
  ["Legal documents", 9], ["Funding documents", 11], ["Product documents", 8],
  ["Market documents", 5], ["Incubation documents", 4],
];

const files = [
  { name: "Pitch Deck — Series A v4.pdf", folder: "Funding", size: "4.2 MB", modified: "2h ago", shared: true },
  { name: "Patent Claims v3.docx", folder: "IPR", size: "380 KB", modified: "1d ago", shared: false },
  { name: "Pilot 2 — Metrics Pack.xlsx", folder: "Traction", size: "1.1 MB", modified: "1d ago", shared: true },
  { name: "Incorporation Certificate.pdf", folder: "Legal", size: "620 KB", modified: "3d ago", shared: false },
  { name: "Q1 2026 Financial Model.xlsx", folder: "Financial", size: "2.4 MB", modified: "4d ago", shared: true },
];

export function Documents() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Documents"
        desc="Every file your company runs on — versioned, shared and surfaced where it's needed."
        actions={<button className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-deep"><Plus className="h-3.5 w-3.5" /> Upload</button>}
      />

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <Card title="Folders" pad={false}>
          <ul className="divide-y divide-line">
            {folders.map(([f, n]) => (
              <li key={f as string} className="group flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors hover:bg-slate-50">
                <Folder className="h-4 w-4 shrink-0 text-amber-400" />
                <span className="flex-1 text-[13px] font-medium text-slate-600 group-hover:text-ink">{f}</span>
                <span className="text-[11px] font-semibold tabular-nums text-slate-300">{n}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Recent files"
          action={<Badge>{files.length} this week</Badge>}
          pad={false}
        >
          <ul className="divide-y divide-line">
            {files.map((f) => (
              <li key={f.name} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold text-ink">{f.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {f.folder} · {f.size} · {f.modified}
                    {f.shared && <span className="ml-2 rounded bg-accent-soft px-1.5 py-px text-[10px] font-semibold text-accent">Shared</span>}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Share">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Download">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
