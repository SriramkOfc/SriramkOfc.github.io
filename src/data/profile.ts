// Single source of truth for site content (from the Nov 2026 resume + LinkedIn).
// Edit this file to update copy, roles, skills or portfolio entries.

export const profile = {
  name: "Sriram Karthikeyan",
  firstName: "Sriram",
  lastName: "Karthikeyan",
  role: "AI Engineer",
  headline: "LLM apps, RAG & agents in production.",
  location: "Sydney, Australia",
  timezone: "Australia/Sydney",
  email: "sriramkofc@gmail.com",
  linkedin: "https://www.linkedin.com/in/sriramkarthikeyan",
  github: "https://github.com/SriramkOfc",
  workRights: "Full working rights in Australia",
};

export const statement =
  "I ship LLM features for a fintech platform used by licensed financial advisers — owning the prompts, the context, the backend and the monitoring that keeps it all honest.";

export const highlights = [
  { value: "1.5", unit: "yrs", label: "Shipping LLM features in production fintech" },
  { value: "3×", unit: "", label: "Dean's List · B.S. Computer Science, CSUSM" },
  { value: "2", unit: "", label: "Master's degrees · University of Sydney" },
  { value: "$55k", unit: "+", label: "First-year sales at yd. — I can talk to people, too" },
];

export type Role = {
  period: string;
  start: string;
  title: string;
  org: string;
  place: string;
  current?: boolean;
  points: string[];
  tags?: string[];
};

export const experience: Role[] = [
  {
    period: "Jul 2025 — Present",
    start: "2025",
    title: "AI Engineer",
    org: "FinTalkr",
    place: "Sydney, NSW",
    current: true,
    points: [
      "Own prompt and context engineering for the platform's LLM features, improving accuracy and cutting hallucinated output.",
      "Take features from loose business requirements to production code, working directly with the founders.",
      "Scope issues and escalations directly with financial advisers and turn their feedback into technical fixes.",
      "Automated client onboarding and monitoring with Make.com; added observability with Grafana and Loki.",
      "Work in agile scrum with offshore developers, explaining technical issues to non-technical stakeholders.",
    ],
    tags: ["LLMs", "Context engineering", "Python", "Make.com", "Grafana", "Loki"],
  },
  {
    period: "Aug 2022 — Present",
    start: "2022",
    title: "Retail Sales Assistant",
    org: "yd.",
    place: "Sydney, NSW",
    points: [
      "Four years customer-facing across the Broadway, Market City and Bondi stores.",
      "$55,000+ in first-year sales at Broadway and $50,000 at Market City, with an average transaction value above $200.",
    ],
    tags: ["Customer-facing", "Sales"],
  },
  {
    period: "Jun 2021 — Jan 2022",
    start: "2021",
    title: "QA & Data Operations Intern",
    org: "UnfoldLabs",
    place: "San Diego, CA",
    points: [
      "Ran structured QA testing on mobile app builds ahead of release, working directly from developer handoffs.",
      "Cleaned and restructured CRM records in HubSpot to improve data accuracy and marketing segmentation.",
    ],
    tags: ["QA", "HubSpot"],
  },
  {
    period: "Oct 2019 — May 2020",
    start: "2019",
    title: "Software Engineering Intern",
    org: "SoftClouds",
    place: "Remote",
    points: [
      "Structured internship in Java fundamentals and software engineering practice.",
      "Wrote and tested Java programs covering object-oriented design and data structures.",
    ],
    tags: ["Java"],
  },
  {
    period: "Aug 2019 — Jul 2021",
    start: "2019",
    title: "Intern",
    org: "The Hidden Dream",
    place: "California, US",
    points: [
      "Managed Slack, Discord, Google Drive and Zoom for a 25+ member nonprofit team, including roles, permissions and integrations.",
    ],
    tags: ["Ops", "Community"],
  },
];

export const skills = [
  {
    group: "AI & LLMs",
    icon: "spark",
    items: [
      "LLMs",
      "Generative AI",
      "RAG",
      "Prompt engineering",
      "Context engineering",
      "AI agents",
      "Multi-agent systems",
      "LangChain",
      "LangGraph",
      "OpenAI Agents SDK",
      "MCP",
    ],
  },
  { group: "Languages", icon: "code", items: ["Python", "SQL", "Java", "C#"] },
  { group: "Backend & Data", icon: "db", items: ["FastAPI", "REST APIs", "PostgreSQL", "pgvector", "Supabase"] },
  { group: "Cloud & DevOps", icon: "cloud", items: ["Microsoft Azure", "Docker", "Git", "Grafana", "Loki"] },
  { group: "Tools & Ways of Working", icon: "tools", items: ["Claude Code", "Cursor", "Make.com", "HubSpot", "Agile / Scrum"] },
];

export const certifications = [
  { name: "Azure AI Fundamentals", code: "AI-900", issuer: "Microsoft", year: "2026" },
  { name: "Azure Fundamentals", code: "AZ-900", issuer: "Microsoft", year: "2026" },
  { name: "Data Engineer", code: "Track", issuer: "DataCamp", year: "2025" },
];

export const education = [
  {
    degree: "Master of IT & Master of IT Management",
    school: "University of Sydney",
    period: "2022 — 2024",
  },
  {
    degree: "B.S. Computer Science",
    school: "California State University San Marcos",
    period: "2019 — 2022",
    note: "GPA 3.44 · Dean's List (3×)",
  },
];

export type Project = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  status: string;
  tags: string[];
  href?: string; // set when a live link or case study exists
};

export const projects: Project[] = [
  {
    id: "offguard",
    title: "Offguard",
    kicker: "Agentic voice AI · 2026",
    blurb:
      "A voice assistant that keeps context across a call, reasons about intent and takes real actions — built to go well past what a scripted IVR can do.",
    status: "Featured",
    tags: ["Voice", "Agents", "Python"],
  },
  {
    id: "context",
    title: "Compliance-aware LLM context",
    kicker: "Case study · coming soon",
    blurb: "How structuring adviser notes, client data and compliance rules cut hallucinated output in production.",
    status: "Soon",
    tags: ["Fintech", "LLMs"],
  },
  {
    id: "observability",
    title: "Catch it before users do",
    kicker: "Case study · coming soon",
    blurb: "Automated onboarding and monitoring with Make.com, Grafana and Loki for a live platform.",
    status: "Soon",
    tags: ["Automation", "Observability"],
  },
];
