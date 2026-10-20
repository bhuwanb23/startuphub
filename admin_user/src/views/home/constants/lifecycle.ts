export type LifecycleStage = {
  label: string;
  blurb: string;
  modules: string[];
};

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    label: "Idea",
    blurb:
      "Every company starts as a question. Pressure-test yours against real market signal before you commit years to it.",
    modules: ["Problem discovery", "Market sizing", "Founder–idea fit"],
  },
  {
    label: "Validation",
    blurb:
      "Prove demand before you write a line of production code. Structured experiments, not opinions.",
    modules: ["Customer interviews", "Waitlist engines", "Signal reports"],
  },
  {
    label: "Incubation",
    blurb:
      "Mentors, milestones and structure around your build — so every week compounds instead of wanders.",
    modules: ["Mentor matching", "Milestone sprints", "Workspace access"],
  },
  {
    label: "IPR",
    blurb:
      "Protect what makes you hard to copy. File early, file right, and build a portfolio investors respect.",
    modules: ["Patent fast-track", "Trademark desk", "IP strategy"],
  },
  {
    label: "Resources",
    blurb:
      "The credits, tools and playbooks that remove friction from the build — negotiated for the whole ecosystem.",
    modules: ["Cloud credits", "Tool stack", "Founder playbooks"],
  },
  {
    label: "MVP",
    blurb:
      "Ship the smallest thing that creates real value, then instrument everything it tells you.",
    modules: ["Build support", "Beta cohorts", "Product analytics"],
  },
  {
    label: "Market",
    blurb:
      "Find your first ten customers, then the next thousand — with warm paths instead of cold calls.",
    modules: ["GTM plans", "Buyer intros", "Launch support"],
  },
  {
    label: "Funding",
    blurb:
      "The right capital at the right stage from investors who already understand your signal.",
    modules: ["Investor matching", "Grant finder", "Data room"],
  },
  {
    label: "Growth",
    blurb:
      "Turn early traction into a repeatable engine — pricing, hiring and channel systems that hold.",
    modules: ["Growth analytics", "Hiring desk", "Pricing lab"],
  },
  {
    label: "Scale",
    blurb:
      "Expand markets, partnerships and governance while the platform scales its support with you.",
    modules: ["Market expansion", "Partnerships", "Governance"],
  },
];

export const PLATFORM_PILLARS: {
  title: string;
  tagline: string;
  modules: string[];
}[] = [
  {
    title: "Build",
    tagline: "Turn a raw idea into a working, validated product.",
    modules: ["MVP Studio", "Validation sprints", "No-code toolkit", "Product analytics", "+8 more"],
  },
  {
    title: "Protect",
    tagline: "Secure the innovations that make you impossible to copy.",
    modules: ["IPR Studio", "Patent fast-track", "Legal desk", "Compliance checks"],
  },
  {
    title: "Connect",
    tagline: "Meet the people who change your company's trajectory.",
    modules: ["Mentor matching", "Founder network", "Corporate pilots", "University labs"],
  },
  {
    title: "Fund",
    tagline: "Raise the right capital at the right stage — with signal attached.",
    modules: ["Investor matching", "Grant finder", "Data room", "Term-sheet support"],
  },
  {
    title: "Grow",
    tagline: "Convert traction into durable, compounding scale.",
    modules: ["Market intelligence", "Hiring desk", "Pricing lab", "Expansion desk"],
  },
];
