# IIC roles and the approval chain

Class A seats are portal-enforced. The approval chain is off-portal. The gap between them is the commercial problem.

```mermaid
flowchart LR

  subgraph CLASS_A["Class A - mandated IIC seats (IIC portal enforces all of these)"]
  direction TB
    A_01["IIC President<br/>holds the portal login"]
    A_03["IIC Convener<br/>day-to-day operator"]
    A_06["Innovation Activity<br/>Coordinator"]
    A_08["IPR Activity<br/>Coordinator"]
    A_10["ARIIA Coordinator<br/>builds the repository"]
    A_11["NIRF Coordinator<br/>builds the repository"]
  end

  subgraph CLASS_B["Class B - adjacent institutional offices"]
  direction TB
    B_01["VC / Director"]
    B_02["Dean / Innovation Head"]
    B_05["Head of Department"]
  end

  subgraph CLASS_C["Class C - off-portal gatekeepers"]
  direction TB
    C_01["Registrar / Dean (ICSR)"]
    C_02["Purchase Committee"]
    C_03["Finance Officer"]
    C_04["Audit"]
    C_05["IT Administrator"]
  end

  DATA[("Innovation data<br/>hand-assembled")]
  GOV[("Government screens<br/>IIC / ARIIA / NIRF / YUKTI")]

  A_03 -.->|"collects"| DATA
  A_06 -.->|"compiles the report"| DATA
  A_08 -.->|"IPR records"| DATA
  A_10 -.->|"off-platform repository"| DATA
  A_11 -.->|"off-platform repository"| DATA
  DATA -.->|"re-keyed by hand"| GOV

  A_03 -->|"requisition as indenter"| C_02
  B_05 -->|"departmental indent"| C_02
  C_02 -->|"recommends"| C_01
  C_03 -.->|"can block via quorum"| C_02
  C_01 -->|"approves to its ceiling"| C_03
  C_01 -->|"escalates above ceiling"| B_01
  B_02 -->|"research budget"| C_01
  C_04 -.->|"PO not issued above ~Rs 10L"| C_02
  C_05 -.->|"technical gate"| C_01
  A_01 -.->|"institutional sponsor"| B_01

  classDef gate fill:#fee2e2,stroke:#b91c1c,color:#450a0a
  classDef seat fill:#eef2ff,stroke:#4f46e5,color:#1e1b4b
  classDef money fill:#ecfdf5,stroke:#047857,color:#022c22
  classDef data fill:#fef3c7,stroke:#b45309,color:#451a03
  class A_01,A_03,A_06,A_08,A_10,A_11 seat
  class C_01,C_02,C_03,C_04,C_05 gate
  class B_01,B_02,B_05 money
  class DATA,GOV data
```

Reading it: the mandated seats on the left run the entire system and **hold no documented budget**. The gatekeepers on the right control the money and **never touch innovation records**. Dashed edges are the work nobody owns.

Source: `build/data_p2_roles.py` and `build/data_p2_procurement.py`, both T1-sourced.
Back to [Phase 2 hub](README.md)
