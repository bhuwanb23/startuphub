export type Plan = {
  name: string;
  who: string;
  monthly: number | null;
  annual: number | null;
  cta: string;
  featured?: boolean;
  bullets: string[];
};

export const plans: Plan[] = [
  {
    name: "Free",
    who: "Explorers & idea-stage founders",
    monthly: 0, annual: 0, cta: "Start free",
    bullets: [
      "Public directories & ecosystem map",
      "1 active application at a time",
      "Weekly opportunity digest",
      "Community events access",
      "Basic startup profile",
    ],
  },
  {
    name: "Startup",
    who: "Founders actively building",
    monthly: 999, annual: 799, cta: "Start 14-day trial", featured: true,
    bullets: [
      "Full lifecycle tooling (all 11 stages)",
      "Resource Hub claims & credits",
      "5 mentor introductions / month",
      "IPR desk — 30% off filing packs",
      "Investor readiness score + report",
      "Unlimited applications",
    ],
  },
  {
    name: "Professional",
    who: "Funded startups & scaling teams",
    monthly: 2999, annual: 2499, cta: "Start 14-day trial",
    bullets: [
      "Everything in Startup",
      "Priority AI matching (investors, pilots)",
      "Market intelligence exports",
      "Deal room with e-sign",
      "Team seats — up to 5",
      "Quarterly strategy review",
    ],
  },
  {
    name: "Organization",
    who: "Incubators, investors & corporates",
    monthly: 9999, annual: 8499, cta: "Talk to sales",
    bullets: [
      "Role dashboards & program tooling",
      "Deal flow / pipeline management",
      "Cohort & mentor operations",
      "Ecosystem analytics suite",
      "Team seats — up to 25",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    who: "Governments & large institutions",
    monthly: null, annual: null, cta: "Contact us",
    bullets: [
      "Everything in Organization",
      "White-label & custom domains",
      "SSO / SAML & audit logs",
      "Data residency options",
      "Dedicated success manager",
      "Custom SLAs & onboarding",
    ],
  },
];

export const compareFeatures: { name: string; tiers: (string | boolean)[] }[] = [
  { name: "Startup profile & directories", tiers: [true, true, true, true, true] },
  { name: "Opportunity board & digest", tiers: [true, true, true, true, true] },
  { name: "Lifecycle tooling", tiers: [false, true, true, true, true] },
  { name: "Resource Hub claims", tiers: [false, true, true, true, true] },
  { name: "Mentor introductions", tiers: [false, "5 / mo", "Unlimited", "50 / mo", "Custom"] },
  { name: "IPR desk discount", tiers: [false, "30%", "40%", "40%", "50%"] },
  { name: "Investor matching", tiers: [false, "Standard", "Priority", "Priority+", "Custom"] },
  { name: "Deal room & diligence", tiers: [false, false, true, true, true] },
  { name: "Intelligence exports", tiers: [false, false, true, true, true] },
  { name: "Program / cohort tooling", tiers: [false, false, false, true, true] },
  { name: "API access", tiers: [false, false, false, true, true] },
  { name: "SSO & audit logs", tiers: [false, false, false, false, true] },
  { name: "Dedicated success manager", tiers: [false, false, false, false, true] },
];

export const pricingFaq = [
  { q: "Is the Free plan really free forever?", a: "Yes. Public ecosystem access — directories, opportunities, events and the ecosystem map — is a public good and stays free. Paid plans unlock the working tools on top of it." },
  { q: "Can I change plans later?", a: "Anytime. Upgrades apply instantly and we prorate the difference. Downgrades apply at the next billing cycle, no calls required." },
  { q: "What does 'mentor introduction' mean?", a: "A double opt-in, AI-matched introduction to a verified expert in your area of need. Both sides accept before any meeting is booked." },
  { q: "Do you offer discounts for incubators' startups?", a: "Yes — startups inside verified partner programs get Startup at ₹499/mo. Your program manager can generate the code from their Organization dashboard." },
];
