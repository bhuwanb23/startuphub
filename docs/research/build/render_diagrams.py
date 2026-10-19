#!/usr/bin/env python3
"""
StartupHub research — diagram renderer.

Extracts every ```mermaid fenced block from the diagram markdown files and renders
each one to:
    _exports/diagrams/src/<NN>_<slug>.mmd      Mermaid source (extracted)
    _exports/diagrams/svg/<NN>_<slug>.svg      Vector output
    _exports/diagrams/png/<NN>_<slug>.png      Raster output, 2x scale, white background

Usage:  python build/render_diagrams.py
"""

import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_DOCS = [
    ROOT / "01_Evidence_Vault" / "Diagrams" / "Ecosystem_And_Gap_Diagrams.md",
    ROOT / "08_User_Roles" / "IIC_Roles_And_Approval_Chain.md",
]
OUT_SRC = ROOT / "_exports" / "diagrams" / "src"
OUT_SVG = ROOT / "_exports" / "diagrams" / "svg"
OUT_PNG = ROOT / "_exports" / "diagrams" / "png"

MMDC = Path(r"C:\Users\Bhuwan\AppData\Local\Temp\opencode\node_modules\.bin\mmdc.cmd")
ENV_PUPPETEER = {**os.environ, "PUPPETEER_CACHE_DIR": r"C:\Users\Bhuwan\AppData\Local\Temp\opencode\pptr"}

# slide-friendly palettes
THEME = """
{
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#eef2ff",
    "primaryTextColor": "#0f172a",
    "primaryBorderColor": "#4f46e5",
    "lineColor": "#475569",
    "secondaryColor": "#ecfdf5",
    "tertiaryColor": "#fef3c7",
    "fontSize": "15px",
    "fontFamily": "Segoe UI, Inter, system-ui, sans-serif"
  }
}
"""


def slugify(text: str, limit: int = 48) -> str:
    s = re.sub(r"[^a-z0-9]+", "_", text.lower()).strip("_")
    return s[:limit].rstrip("_")


def extract_blocks(md_path: Path):
    """Return [(index, title, code)] for every mermaid fence in the file."""
    text = md_path.read_text(encoding="utf-8")
    blocks = re.findall(r"```mermaid\n(.*?)```", text, flags=re.S)
    titles = re.findall(r"^#\s*(?:Diagram\s+\d+\s*—\s*)?(.+)$", text, flags=re.M)
    out = []
    for i, code in enumerate(blocks):
        title = titles[i] if i < len(titles) else f"diagram_{i+1}"
        out.append((i + 1, title, code.strip()))
    return out


def main() -> int:
    for d in (OUT_SRC, OUT_SVG, OUT_PNG):
        d.mkdir(parents=True, exist_ok=True)

    theme_file = ROOT / "_exports" / "diagrams" / "theme.json"
    theme_file.write_text(THEME, encoding="utf-8")

    rendered, failed = [], []
    counter = 0
    for doc in SRC_DOCS:
        if not doc.exists():
            print(f"[skip] missing {doc}")
            continue
        for _local_idx, title, code in extract_blocks(doc):
            # Numbering is continuous across source documents so filenames stay
            # unique and sort stably when a second diagram source is added.
            counter += 1
            name = f"{counter:02d}_{slugify(title)}"
            mmd = OUT_SRC / f"{name}.mmd"
            mmd.write_text(code, encoding="utf-8")

            svg, png = OUT_SVG / f"{name}.svg", OUT_PNG / f"{name}.png"
            for target, extra in ((svg, []), (png, ["-s", "2", "-b", "white"])):
                cmd = [
                    str(MMDC), "-i", str(mmd), "-o", str(target),
                    "-c", str(theme_file),
                    "--size", "1800",
                    *extra,
                ]
                proc = subprocess.run(cmd, capture_output=True, text=True, env=ENV_PUPPETEER)
                if target.exists() and target.stat().st_size > 0:
                    print(f"[ok]   {target.name}  ({target.stat().st_size//1024} KB)")
                else:
                    err = (proc.stderr or proc.stdout or "unknown error").strip()[-400:]
                    print(f"[FAIL] {target.name}: {err}")
                    failed.append(target.name)
            rendered.append(name)

    print(f"\n{len(rendered)} diagram(s) rendered -> _exports/diagrams/")
    if failed:
        print(f"{len(failed)} FAILED: {failed}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())