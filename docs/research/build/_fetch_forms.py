"""Download the published NIRF / ARIIA forms and extract their text layer.

Writes one .txt per form into the temp workspace and prints ONLY summary stats,
because these are browser-printed PDFs whose text layers can be very large.
"""
import sys
import urllib.request
from pathlib import Path

import pypdf

TMP = Path(r"C:\Users\Bhuwan\AppData\Local\Temp\opencode\forms")
TMP.mkdir(parents=True, exist_ok=True)

FORMS = [
    # (key, form_type, institution, year, url)
    ("nirf_jnu_2026",        "NIRF", "Jawaharlal Nehru University", "2026",
     "https://www.jnu.ac.in/sites/default/files/nirf/NIRF2026-Innovation-Data.pdf"),
    ("nirf_iitb_2026",       "NIRF", "IIT Bombay", "2026",
     "https://www.iitb.ac.in/sites/default/files/2026-04/NIRF_IITBombay_2026_Innovation_Category.pdf"),
    ("nirf_iisc_2026",       "NIRF", "Indian Institute of Science", "2026",
     "https://iisc.ac.in/wp-content/uploads/2026/04/Indian-Institute-of-Science20260406-Innovation.pdf"),
    ("nirf_nitap_2026",      "NIRF", "NIT Andhra Pradesh", "2026",
     "https://nitandhra.ac.in/main/nirf/NATIONAL%20INSTITUTE%20OF%20TECHNOLOGY,%20ANDHRA%20PRADESH%20INNOVATION.pdf"),
    ("nirf_iitd_2025",       "NIRF", "IIT Delhi", "2025",
     "https://home.iitd.ac.in/uploads/nirf/2025/NIRF%202025_Innovation_Indian%20Institute%20of%20Technology%20Delhi20250118-2.pdf"),
    ("nirf_nitw_2025",       "NIRF", "NIT Warangal", "2025",
     "https://nitw.ac.in/api/static/files/NIRF-2025_Submitted_data_Innovation_2025-2-3-9-47-33.pdf"),
    ("nirf_panimalar_2025",  "NIRF", "Panimalar Engineering College", "2025",
     "https://panimalar.ac.in/assets/pdf/academics/nirf/PEC_NIRF2025_Innovation.pdf"),
    ("ariia_iitk_2022",      "ARIIA", "IIT Kanpur", "2022",
     "https://iitk.ac.in/data/ARIIA-Reports/ARIIA_Report-2022.pdf"),
    ("ariia_iitism_2022",    "ARIIA", "IIT (ISM) Dhanbad", "2022",
     "https://people.iitism.ac.in/~download/ARIIA/Submitted%20Data%202022.pdf"),
    ("ariia_aditya_2022",    "ARIIA", "Aditya College of Engineering & Technology", "2021-22",
     "http://acet.ac.in/uploads/ARIIA/ARIIA_2021_22.pdf"),
    ("ariia_lbrce_2020",     "ARIIA", "LBRCE", "2020",
     "https://www.lbrce.ac.in/committees/ciie_committee/ciie_ariia/ARIIA_%202020_Submitted%20Application.pdf"),
]

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"}


def fetch(url, dest, tries=2):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=90) as r:
                data = r.read()
            if data[:4] == b"%PDF":
                dest.write_bytes(data)
                return len(data), None
            return 0, f"not a PDF (starts {data[:12]!r})"
        except Exception as e:
            err = f"{type(e).__name__}: {e}"
    return 0, err


rows = []
for key, ftype, inst, year, url in FORMS:
    pdf = TMP / f"{key}.pdf"
    txt = TMP / f"{key}.txt"
    if pdf.exists():
        size, err = pdf.stat().st_size, None
    else:
        size, err = fetch(url, pdf)
    if err or size == 0:
        rows.append((key, ftype, inst, "DOWNLOAD_FAIL", err or "?", 0, 0))
        continue
    pages = chars = 0
    try:
        rd = pypdf.PdfReader(str(pdf))
        parts = []
        for p in rd.pages:
            parts.append(p.extract_text() or "")
            pages += 1
        body = "\n\n".join(parts)
        txt.write_text(body, encoding="utf-8")
        chars = len(body)
    except Exception as e:
        err = f"extract: {type(e).__name__}: {e}"
    rows.append((key, ftype, inst, "ok", f"{size/1024:.0f} KB", pages, chars))

print(f"{'key':<24}{'form':<7}{'pages':>6}{'chars':>9}  status")
print("-" * 78)
ok = 0
for key, ftype, inst, status, size, pages, chars in rows:
    if status == "ok" and chars > 500:
        ok += 1
        print(f"{key:<24}{ftype:<7}{pages:>6}{chars:>9,}  ok")
    else:
        print(f"{key:<24}{ftype:<7}{pages:>6}{chars:>9,}  {status}: {size}")
print("-" * 78)
print(f"usable: {ok}/{len(FORMS)}   out: {TMP}")