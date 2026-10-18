# Diagram 1 — The Indian Innovation Ecosystem

**Mermaid source** for the ecosystem map required by `todo.md` Phase 28.
Render with any Mermaid renderer (GitHub, mermaid.live, VS Code Mermaid preview, or `npx @mermaid-js/mermaid-cli`).

```mermaid
graph TB
    subgraph GOV["GOVERNMENT LAYER"]
        DPIIT["DPIIT<br/>Startup India · BHASKAR"]
        MOE["MoE · MIC<br/>IIC Portal · YUKTI-NIR"]
        AIM["NITI Aayog · AIM<br/>ARIIA · ATL · AIC"]
        NIRF["MoE<br/>NIRF Innovation"]
        DST["DST<br/>NIDHI · TBIs"]
        MEITY["MeitY<br/>TIDE 2.0 · GENESIS"]
        BIRAC["BIRAC<br/>BIG · BioNEST"]
        STATE["State Missions<br/>31 of 36 states"]
    end

    subgraph INST["INSTITUTION LAYER — StartupHub's customer"]
        HEI["University / College<br/>1,289 universities<br/>48,246 colleges"]
        IIC["Institution's Innovation Council<br/>6,400+ (2022, stale)"]
        INC["Incubation / Pre-Incubation<br/>3,083 · 5,157 facilities"]
        TTO["IPR / TTO<br/>3,249 offices"]
        DEPT["Departments<br/>each own coordinator + budget"]
    end

    subgraph CORE["THE GAP"]
        SOR["⚠️ SYSTEM OF RECORD<br/>for the venture entity<br/>exists nowhere"]
    end

    subgraph STARTUP["STARTUP LAYER"]
        PRE["Pre-Incubation<br/>unincorporated"]
        V1["Idea → Validation<br/>TRL 1-4"]
        V2["Incubation<br/>TRL 5-9"]
        V3["IPR / Patent<br/>TRL 10"]
        V4["Funding → Market<br/>DPIIT recognised"]
        V5["Growth"]
    end

    subgraph ECO["ECOSYSTEM PARTICIPANTS"]
        MENTOR["Mentors<br/>NDA-gated"]
        IPRX["IPR Professionals<br/>Patent Agents"]
        INV["Investors"]
        CORP["Corporates · CSR"]
        RES["Resources<br/>Labs · Space · Tools"]
    end

    DPIIT -->|"recognition number"| V4
    DPIIT -.->|"⚠️ no institution dashboard"| HEI
    MOE -->|"16+ activities/yr<br/>council-meeting GATE"| IIC
    MOE -->|"TRL banding<br/>auto-flows to ARIIA"| TTO
    AIM -->|"100+ indicators"| HEI
    NIRF -->|"~11 screens PER DISCIPLINE"| HEI
    DST -->|"grant + audited utilisation"| INC
    MEITY -->|"₹15-50L grants"| INC
    BIRAC -->|"₹50L BIG grants"| V1
    STATE -->|"separate IDs<br/>no API"| HEI

    HEI --> IIC
    IIC --> INC
    IIC --> TTO
    DEPT -->|"spreadsheets + WhatsApp"| IIC
    DEPT -.->|"manual consolidation"| CORE

    INC --> PRE
    PRE --> V1
    V1 --> V2
    V2 --> V3
    V3 --> V4
    V4 --> V5

    MENTOR -->|"session hours logged<br/>against scheme utilisation"| V2
    TTO -->|"disclosure → patent<br/>→ licence → royalty"| V3
    IPRX --> V3
    INV --> V4
    CORP --> V2
    RES --> V1

    SOR -.->|"should sit HERE"| V1
    SOR -.->|"should sit HERE"| V3

    classDef gov fill:#1e3a5f,stroke:#3b82f6,color:#fff
    classDef inst fill:#134e4a,stroke:#14b8a6,color:#fff
    classDef gap fill:#7f1d1d,stroke:#ef4444,color:#fff,stroke-width:3px
    classDef startup fill:#3f2d0a,stroke:#f59e0b,color:#fff
    classDef eco fill:#2e1a47,stroke:#a855f7,color:#fff

    class DPIIT,MOE,AIM,NIRF,DST,MEITY,BIRAC,STATE gov
    class HEI,IIC,INC,TTO,DEPT inst
    class SOR gap
    class PRE,V1,V2,V3,V4,V5 startup
    class MENTOR,IPRX,INV,CORP,RES eco
```

---

# Diagram 2 — The Structural Gap: what is required vs what software exists

This is the core Phase 0 argument, visualised.

```mermaid
graph LR
    subgraph REQ["WHAT INSTITUTIONS ARE REQUIRED TO REPORT"]
        R1["IIC<br/>16+ activities/yr<br/>evidence pack each<br/>⭐ 1-5 star rating"]
        R2["YUKTI-NIR<br/>TRL 1-4 / 5-9 / Startup<br/>HEI-side verifier<br/>⭐ AUTO-FLOWS TO ARIIA"]
        R3["NIRF Innovation<br/>6 parameters<br/>~11 screens PER DISCIPLINE<br/>⭐ SU = 20 x f(DPIIT startups)"]
        R4["ARIIA<br/>100+ indicators, 5 categories<br/>incl. Patent Application No"]
        R5["DST / BIRAC / MeitY<br/>grant utilisation<br/>audited certificates · PFMS"]
        R6["AISHE<br/>institutional registry<br/>AISHE code = the key"]
    end

    subgraph UNIT["THE UNIT OF RECORD — different everywhere"]
        U1["the activity/event"]
        U2["the innovation snapshot"]
        U3["the spreadsheet row"]
        U4["institution-year aggregate"]
        U5["the recognition certificate"]
    end

    subgraph MISSING["WHAT EXISTS NOWHERE"]
        M1["❌ venture entity<br/>with STATE OVER TIME"]
        M2["❌ venture survival<br/>'how many are still alive?'"]
        M3["❌ patent docket<br/>deadlines · renewals · annuity"]
        M4["❌ TRL progression 1→9"]
        M5["❌ grant source → tranche → receipt"]
        M6["❌ retroactive audit trail"]
    end

    subgraph FIX["STARTUPHUB — the wedge"]
        F1["Single venture record<br/>entered ONCE"]
        F2["→ generates all 6<br/>mandated submissions"]
        F3["→ IPR docket + TRL engine<br/>nobody else has"]
    end

    R1 --> U1
    R2 --> U2
    R3 --> U3
    R4 --> U4
    R5 --> U5
    R6 --> U4

    U1 & U2 & U3 & U4 & U5 --> M1
    M1 --> M2
    U1 --> M3
    U2 --> M4
    U5 --> M5
    U1 --> M6

    F1 --> F2
    F2 -.->|"replaces"| U1
    F3 -.->|"fills"| M3
    F3 -.->|"fills"| M4

    classDef req fill:#1e3a5f,stroke:#3b82f6,color:#fff
    classDef unit fill:#3f2d0a,stroke:#f59e0b,color:#fff
    classDef miss fill:#7f1d1d,stroke:#ef4444,color:#fff,stroke-width:2px
    classDef fix fill:#134e4a,stroke:#10b981,color:#fff,stroke-width:3px

    class R1,R2,R3,R4,R5,R6 req
    class U1,U2,U3,U4,U5 unit
    class M1,M2,M3,M4,M5,M6 miss
    class F1,F2,F3 fix
```

---

# Diagram 3 — Competitive Positioning

```mermaid
quadrantChart
    title Competitive positioning — Indian institutional innovation management
    x-axis "Lower India-compliance depth" --> "Higher India-compliance depth"
    y-axis "Lower institutional credibility" --> "Higher institutional credibility"
    quadrant-1 "Own it — defend"
    quadrant-2 "⚠️ Contested — Orbit's ground"
    quadrant-3 "Avoid — free-tier zone"
    quadrant-4 "⚠️ Expensive & unproven"
    "NestLens Orbit": [0.78, 0.45]
    "EcoSync": [0.72, 0.28]
    "IncubatX": [0.80, 0.15]
    "Incubatee SCIP": [0.45, 0.32]
    "Accubate": [0.40, 0.62]
    "AcceleratorApp": [0.18, 0.78]
    "Gohorto": [0.22, 0.14]
    "Founderhood": [0.28, 0.35]
    "VentureLink": [0.15, 0.10]
    "incuTrack": [0.10, 0.48]
    "RiserNest": [0.20, 0.30]
    "Notion / Airtable": [0.05, 0.22]
    "Excel / Sheets": [0.02, 0.08]
    "StartupHub target": [0.92, 0.72]
```

**Reading the chart.**
- **Top-right is contested.** Orbit and IncubatX already claim the high-India-compliance box. IncubatX is there on marketing claims with zero customers; Orbit is there with a product and a ₹75k price.
- **Top-left holds the credibility.** AcceleratorApp (Yale, MIT, Max Planck) and Accubate (TCS, KPMG, Hero, NSRCEL) have real reference bases — **both with zero Indian institutions and no IPR module.**
- **Bottom-left is the free zone.** Excel, Sheets, WhatsApp, Notion. **Nobody leaves this zone by being cheaper.**
- **The target is unreachable by feature parity.** Orbit and IncubatX already ship "AI + government schemes." StartupHub's position depends entirely on the three things none of them has: **IPR, TRL, and the mandated-portal export.**

---

# Diagram 4 — The Price Band

```mermaid
flowchart LR
    subgraph FREE["FREE INCUMBENTS"]
        A1["Excel / Google Sheets"]
        A2["WhatsApp + Drive"]
        A3["Campus ERP<br/>marginal cost ₹0<br/>(but ₹500-2,000/student/yr)"]
    end

    subgraph FLOOR["THE FLOOR WE CANNOT UNDERCUT"]
        B1["Trello @ 10 users<br/>₹54,000/yr"]
        B2["Notion Plus @ 8 editors<br/>₹86,000/yr"]
        B3["ClickUp @ 10 users<br/>₹76,000/yr"]
    end

    subgraph BAND["✅ THE DEFENSIBLE BAND — ₹75k to ₹5L"]
        C1["⭐ Orbit Launch<br/>₹75,000/yr<br/>COMPETITIVE ANCHOR"]
        C2["Founderhood Starter<br/>university -15%<br/>≈₹1.4L/yr"]
        C3["IncubatX Foundation<br/>₹1.2L/yr"]
        C4["Incubatee year one<br/>₹3,95,200"]
        C5["Orbit Scale<br/>₹2,50,000/yr"]
    end

    subgraph CEIL["THE CEILING"]
        D1["AcceleratorApp core<br/>≈₹5.4L/yr<br/>ISO 27001 · Yale · MIT"]
    end

    subgraph OUT["OUT OF REACH"]
        E1["IdeaScale entry<br/>≈₹5.85L/yr"]
        E2["Elsevier Pure<br/>₹44.6L/yr + ₹43.5L onboarding<br/>'we already own a system'"]
    end

    FREE --> FLOOR --> BAND --> CEIL --> OUT

    classDef free fill:#374151,stroke:#6b7280,color:#fff
    classDef floor fill:#78350f,stroke:#f59e0b,color:#fff
    classDef band fill:#134e4a,stroke:#10b981,color:#fff,stroke-width:2px
    classDef ceil fill:#1e3a5f,stroke:#3b82f6,color:#fff
    classDef out fill:#450a0a,stroke:#ef4444,color:#fff

    class A1,A2,A3 free
    class B1,B2,B3 floor
    class C1,C2,C3,C4,C5 band
    class D1 ceil
    class E1,E2 out
```

---

# Diagram 5 — Today's Workflow vs StartupHub's

The Phase 15 template, pre-populated with Phase 0 evidence.

```mermaid
flowchart TB
    subgraph NOW["CURRENT PROCESS — reconstructed from official forms"]
        N1["Student idea<br/>WhatsApp group"]
        N2["IIC coordinator<br/>asks in group"]
        N3["Coordinator types into<br/>GOOGLE SHEET"]
        N4["Department coordinator<br/>emails own spreadsheet"]
        N5["Coordinator copy-pastes<br/>into master file ⚠️"]
        N6["Re-types same startup<br/>into NIRF form<br/>PER DISCIPLINE"]
        N7["Re-types into<br/>YUKTI-NIR<br/>DIFFERENT LOGIN"]
        N8["Hand-builds ARIIA<br/>submission PDF"]
        N9["Tracked patents in a<br/>PRIVATE REGISTER<br/>re-keyed every year"]
        N10["Mentorship in WhatsApp<br/>threads 📱"]
        N11["Reports in Word<br/>month-end blackout"]
    end

    N1 --> N2 --> N3 --> N4 --> N5
    N3 --> N6
    N5 --> N6
    N5 --> N7
    N6 --> N8
    N9 --> N6
    N10 --> N11
    N5 --> N11

    subgraph PAIN["PAIN POINTS"]
        P1["Duplicate entry 3-6x/yr"]
        P2["No relational integrity<br/>same startup, divergent rows"]
        P3["No permissions model<br/>mentors see everything"]
        P4["No audit trail<br/>impossible to evidence"]
        P5["Council-meeting minutes<br/>GATE all activity filing"]
        P6["Cannot answer<br/>'how many are still alive?'"]
    end

    subgraph SH["STARTUPHUB PROCESS"]
        S1["Idea / innovation<br/>captured once"]
        S2["Venture record<br/>+ TRL engine"]
        S3["IPR docket<br/>deadlines tracked"]
        S4["Mentor sessions<br/>NDA-tiered visibility"]
        S5["Grants ledger<br/>source → tranche → receipt"]
    end

    subgraph OUT["MANDATED SUBMISSIONS — generated as a by-product"]
        O1["IIC activity pack"]
        O2["YUKTI-NIR → auto-pools to ARIIA"]
        O3["NIRF Innovation — entered once, all disciplines"]
        O4["ARIIA submission"]
        O5["DST / BIRAC utilisation report"]
    end

    S1 --> S2 --> S3
    S2 --> S4
    S2 --> S5
    S3 --> O2
    S2 --> O1
    S2 --> O2
    S2 --> O3
    S2 --> O4
    S5 --> O5

    classDef now fill:#450a0a,stroke:#ef4444,color:#fff
    classDef pain fill:#78350f,stroke:#f59e0b,color:#fff
    classDef sh fill:#134e4a,stroke:#10b981,color:#fff
    classDef out fill:#1e3a5f,stroke:#3b82f6,color:#fff

    class N1,N2,N3,N4,N5,N6,N7,N8,N9,N10,N11 now
    class P1,P2,P3,P4,P5,P6 pain
    class S1,S2,S3,S4,S5 sh
    class O1,O2,O3,O4,O5 out
```

---

## Rendering these

| Tool | Command |
|---|---|
| **GitHub** | paste into any `.md` file — renders natively |
| **mermaid.live** | paste into the editor, export SVG/PNG |
| **CLI (recommended for assets)** | `npx -y @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.svg -b transparent` |
| **VS Code** | Markdown Preview Mermaid Support extension |

For `14_Assets/Diagrams/`, export each as **SVG** (scales cleanly into slides) and **PNG at 2×** (for PPT insertion).

## ⚠️ Copyright and sourcing note

All five diagrams are **original work** derived from cited public sources. They may be used freely in pitch decks and documents.

For third-party logos referenced in these diagrams (DPIIT, Startup India, MeitY, etc.), **link to official press or branding pages rather than scraping assets** — government emblems have specific usage rules under the Government Emblems (Protection, Use and Infringement) Act, 1950, and logos of private vendors are trademarked. Use wordmarks in diagrams, which is what the Mermaid above does.