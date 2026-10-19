"""Analyse the extracted NIRF / ARIIA form text.

Writes a structured JSON to the temp workspace and prints only headline stats.
Key question it tests: NIRF keys the TRL-innovation table on the DPIIT
registration number - an identifier the institution frequently does not hold,
because founders register with DPIIT themselves.
"""
import json
import re
from collections import Counter
from pathlib import Path

TMP = Path(r"C:\Users\Bhuwan\AppData\Local\Temp\opencode\forms")
OUT = TMP / "form_analysis.json"

DPIIT_RE = re.compile(r"\bDIPP\s*0*(\d{1,7})\b", re.I)
NO_DATA_RE = re.compile(r"no\s+data\s+found", re.I)
TRL_NUM_RE = re.compile(r"\bTRL\s*[-:]?\s*(\d)", re.I)
TRL_WORD_RE = re.compile(r"(technology concept|formula formulated|proof[- ]of[- ]concept|"
                         r"laboratory validation|breadboard|small scale prototype|"
                         r"large scale prototype|demonstration system|system at scale|"
                         r"commercial scale|prototype demonstration|system prototype|"
                         r"analytical and experimental|technology concept and/or)", re.I)
STAR_RE = re.compile(r"\b(\d(?:\.\d)?)\s*(?:stars?|star)\b", re.I)
INR_RE = re.compile(r"(?:Rs\.?|INR|₹)\s*([\d,]{4,})", re.I)
INTERNAL_RE = re.compile(r"institute\s*own\s*/?\s*internal", re.I)
EXTERNAL_RE = re.compile(r"sponsorship\s*/?\s*external", re.I)
SECTION_RE = re.compile(r"^\s*Section\s+(\d)\s*[:.]\s*(.+?)\s*$", re.M)


def parse_dpiit(txt):
    """Return (all_numbers_as_int, list_of_raw_strings)."""
    raw = DPIIT_RE.findall(txt)
    return [int(n) for n in raw], raw


def split_nirf_sections(txt):
    """Split a NIRF form into its named tables."""
    marks = [
        ("startups_dpiit", r"Start\s*up\s*recognized\s*by\s*DPIIT"),
        ("vc_investment", r"Startups\s*which\s*have\s*got\s*VC\s*investment"),
        ("trl_innovations", r"Innovations\s*at\s*various\s*stages\s*of\s*Technology\s*Readiness\s*Level"),
        ("incubation", r"Incubation\s*and\s*Incubation\s*Centre"),
        ("iic", r"Innovation\s*Council|IIC\s*\("),
    ]
    idx = []
    for name, pat in marks:
        m = re.search(pat, txt, re.I)
        idx.append((m.start() if m else -1, name))
    idx.sort()
    out = {}
    for i, (pos, name) in enumerate(idx):
        if pos < 0:
            out[name] = ""
            continue
        end = idx[i + 1][0] if i + 1 < len(idx) and idx[i + 1][0] > pos else len(txt)
        out[name] = txt[pos:end]
    return out


def analyse_nirf(key, txt):
    sec = split_nirf_sections(txt)
    dpiit_all, raw_all = parse_dpiit(txt)
    in_dpiit, _ = parse_dpiit(sec.get("startups_dpiit", ""))
    in_trl, _ = parse_dpiit(sec.get("trl_innovations", ""))
    anomalies = sorted({r for r in raw_all if int(r) < 1000})
    # de-duplicate while preserving order
    def uniq(seq):
        seen, out = set(), []
        for x in seq:
            if x not in seen:
                seen.add(x)
                out.append(x)
        return out
    trl_words = Counter(m.group(1).lower()[:34] for m in TRL_WORD_RE.finditer(sec.get("trl_innovations", "")))
    return dict(
        key=key, form="NIRF", parse_status="parsed",
        dpiit_occurrences_total=len(dpiit_all),
        dpiit_in_recognised_table=len(uniq(in_dpiit)),
        dpiit_in_trl_table=len(uniq(in_trl)),
        trl_rows=sec.get("trl_innovations", "").count("TRL") or None,
        dpiit_anomalies=anomalies,
        dpiit_anomaly_count=len(anomalies),
        trl_stage_phrases=dict(trl_words.most_common(8)),
        vc_rows=sec.get("vc_investment", "").count("Seed") + sec.get("vc_investment", "").count("Private Equity"),
        chars=len(txt),
    )


def analyse_ariia(key, txt):
    secs = [(m.group(1), m.group(2)[:70]) for m in SECTION_RE.finditer(txt)]
    internal_hits = len(INTERNAL_RE.findall(txt))
    external_hits = len(EXTERNAL_RE.findall(txt))
    stars = sorted({m.group(1) for m in STAR_RE.finditer(txt)})
    iic_block = ""
    m = re.search(r"Stars\s*Obtained", txt, re.I)
    if m:
        iic_block = txt[m.start():m.start() + 700]
    iic_rows = re.findall(r"IIC\s*(\d\.\d)\s*\(?([\d\-]{13,})\)?\s*([^\n]{0,90})", txt)
    declaration = None
    md = re.search(r"(Head of the Institution|Nodal Officer)", txt, re.I)
    if md:
        declaration = re.sub(r"\s+", " ", txt[md.start():md.start() + 420]).strip()
    money = [int(x.replace(",", "")) for x in INR_RE.findall(txt)]
    return dict(
        key=key, form="ARIIA", parse_status="parsed",
        sections_found=[s[0] for s in secs],
        n_sections=len(secs),
        no_data_found_count=len(NO_DATA_RE.findall(txt)),
        internal_fund_rows=internal_hits,
        external_fund_rows=external_hits,
        fund_split_present=internal_hits > 0 and external_hits > 0,
        star_values=stars,
        iic_cycle_rows=len(iic_rows),
        money_mentions=len(money),
        largest_money=max(money) if money else None,
        declaration_present=bool(declaration),
        declaration_excerpt=declaration[:200] if declaration else None,
        chars=len(txt),
    )


results = []
for p in sorted(TMP.glob("*.txt")):
    txt = p.read_text(encoding="utf-8", errors="replace")
    key = p.stem
    try:
        r = analyse_nirf(key, txt) if key.startswith("nirf") else analyse_ariia(key, txt)
    except Exception as e:
        r = dict(key=key, parse_status=f"error: {type(e).__name__}: {e}")
    results.append(r)

OUT.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")

print("=== NIRF ===")
print(f"{'key':<22}{'DPIIT':>7}{'inTable':>8}{'inTRL':>7}{'anom':>6}")
for r in results:
    if r.get("form") == "NIRF" and r.get("parse_status") == "parsed":
        print(f"{r['key']:<22}{r['dpiit_occurrences_total']:>7}{r['dpiit_in_recognised_table']:>8}"
              f"{r['dpiit_in_trl_table']:>7}{r['dpiit_anomaly_count']:>6}")
print()
print("=== ARIIA ===")
print(f"{'key':<22}{'secs':>6}{'NoData':>8}{'intFund':>8}{'extFund':>8}{'stars':>16}")
for r in results:
    if r.get("form") == "ARIIA" and r.get("parse_status") == "parsed":
        print(f"{r['key']:<22}{r['n_sections']:>6}{r['no_data_found_count']:>8}"
              f"{r['internal_fund_rows']:>8}{r['external_fund_rows']:>8}   {','.join(r['star_values']) or '-'}")
print()
bad = [r["key"] for r in results if r.get("parse_status") != "parsed"]
print("errors:", bad or "none")
print("written:", OUT)