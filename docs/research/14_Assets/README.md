# Assets

## Diagrams

Mermaid sources: [`../01_Evidence_Vault/Diagrams/Ecosystem_And_Gap_Diagrams.md`](../01_Evidence_Vault/Diagrams/Ecosystem_And_Gap_Diagrams.md) — 5 original diagrams.

| # | Diagram | Use in |
|---|---|---|
| 1 | The Indian Innovation Ecosystem | Problem slide · ecosystem slide |
| 2 | The Structural Gap (required vs what exists) | **The core problem slide** |
| 3 | Competitive Positioning quadrant | Competition slide |
| 4 | The Price Band | Business model slide |
| 5 | Today's Workflow vs StartupHub's | Product slide |

## Exporting

```bash
npx -y @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.svg -b transparent
```

Export each as **SVG** (scales cleanly into slides) and **PNG at 2×** (for PPT insertion). GitHub renders Mermaid natively in `.md` files, as does VS Code with the Mermaid preview extension.

## Phase 0 status
Mermaid sources complete. **SVG/PNG exports not yet generated.**

## Logos — do not scrape

**Link to official press or branding pages rather than downloading assets.**

- **Government emblems** (DPIIT, MoE, AICTE, MeitY, state governments) are governed by the *Government Emblems (Protection, Use and Infringement) Act, 1950* — use is restricted and not covered by "fair use"
- **Private vendor logos** (Orbit, EcoSync, IncubatX, AcceleratorApp…) are trademarks of their owners. Using them to compare products in a research document is nominative fair use; **using them in a marketing or pitch context is not automatically**

**Practical approach:** use **wordmarks in diagrams** — which is exactly what the Mermaid sources already do. If a logo is genuinely needed for a slide, link to the vendor's press or brand page and attribute.

## Charts
To be generated from [`../09_Market_Data/`](../09_Market_Data/) once Phase 7 sizing is unblocked. Source data must live in `09_Market_Data/`, not in the chart file.

---

Back to [Research Index](../00_Research_Index/README.md)