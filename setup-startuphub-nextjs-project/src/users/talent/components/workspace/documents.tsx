"use client";

import { FileText, FolderLock, Upload } from "lucide-react";
import { PageIntro, Panel } from "@/components/app/widgets";
import { cn } from "@/lib/utils";
import { useFiltered } from "../../hooks/use-filtered";
import {
  DOCUMENTS,
  DOC_CATEGORIES,
  DOC_VIS_TONE,
  type TalentDocument,
} from "../../constants/workspace-data";

export function TalentDocuments() {
  const { filter, setFilter, filtered } = useFiltered<TalentDocument>(
    DOCUMENTS,
    (doc, f) => doc.type === f,
  );

  return (
    <div className="space-y-6">
      <PageIntro
        title="Documents"
        description="Resume, certificates, contracts and work samples — with visibility rules per document."
        action={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white transition-colors hover:bg-accent-deep">
            <Upload className="h-4 w-4" /> Upload
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {DOC_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors",
              filter === c
                ? "bg-ink text-white"
                : "border border-line bg-white text-slate-500 hover:text-ink",
            )}
          >
            {c}
            <span className="ml-1.5 text-[11px] opacity-60">
              {c === "All" ? DOCUMENTS.length : DOCUMENTS.filter((d) => d.type === c).length}
            </span>
          </button>
        ))}
      </div>

      <Panel title={`${filter === "All" ? "All documents" : filter} · ${filtered.length}`} bodyClassName="px-0 py-0 sm:px-0">
        <ul className="divide-y divide-line">
          {filtered.map((doc) => (
            <li key={doc.name} className="flex items-center gap-4 px-4.5 py-3.5 transition-colors hover:bg-soft sm:px-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft">
                <FileText className="h-4 w-4 text-accent" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium text-ink">{doc.name}</span>
                <span className="block text-[11.5px] text-slate-400">
                  {doc.type} · {doc.size} · updated {doc.updated}
                </span>
              </span>
              <span className={cn("hidden rounded-full px-2 py-0.5 text-[10.5px] font-semibold sm:block", DOC_VIS_TONE[doc.visibility])}>
                {doc.visibility}
              </span>
              <button className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] font-medium text-slate-600 transition-colors hover:bg-white">
                Open
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="flex flex-col items-center gap-2 px-5 py-12 text-center">
              <FolderLock className="h-6 w-6 text-slate-300" />
              <p className="text-[13px] text-slate-400">No documents in this category yet.</p>
            </li>
          )}
        </ul>
      </Panel>
    </div>
  );
}
