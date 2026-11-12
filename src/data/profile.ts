// Single source of truth for site content (Nov 2026 resume + LinkedIn).
// House style: no em dashes. Use en dashes only for number ranges (2022–2024).

export const profile = {
  name: "Sriram Karthikeyan",
  firstName: "Sriram",
  lastName: "Karthikeyan",
  role: "AI Engineer",
  location: "Sydney, Australia",
  email: "sriramkofc@gmail.com",
  linkedin: "https://www.linkedin.com/in/sriramkarthikeyan",
  linkedinLabel: "in/sriramkarthikeyan",
  github: "https://github.com/SriramkOfc",
  githubLabel: "SriramkOfc",
  workRights: "Full working rights in Australia",
};

export const intro =
  "I build LLM features for a fintech platform used by licensed financial advisers. Prompts, context, Python backends and the monitoring around them.";

export const about = [
  "I joined FinTalkr in July 2025. I work on the platform's LLM features: what goes into the prompt, how the context is structured, and whether the output is accurate enough for an adviser to rely on.",
  "I take features from a loose requirement to production code with the founders and an offshore team, and I talk to advisers directly when something needs fixing.",
  "Before this I did QA and data work in San Diego, and I have spent four years in customer-facing retail in Sydney.",
];

export const facts = [
  { label: "In production AI", value: "1.5 years" },
  { label: "Education", value: "USyd and CSUSM" },
  { label: "Dean's List", value: "3 times, CSUSM" },
  { label: "Based in", value: "Sydney" },
];

export type Role = {
  period: string;
  title: string;
  org: string;
  place: string;
  current?: boolean;
  summary: string;
  points: string[];
};

export const experience: Role[] = [
  {
    period: "2025–Now",
    title: "AI Engineer",
    org: "FinTalkr",
    place: "Sydney",
    current: true,
    summary: "LLM features for a platform used by licensed financial advisers.",
    points: [
      "Own prompt and context engineering for the platform's LLM features, improving accuracy and cutting hallucinated output.",
      "Take features from loose business requirements to production code, working directly with the founders.",
      "Scope issues and escalations with financial advisers and turn their feedback into technical fixes.",
      "Automated client onboarding and monitoring with Make.com. Added observability with Grafana and Loki.",
      "Work in agile scrum with offshore developers and explain technical issues to non-technical stakeholders.",
    ],
  },
  {
    period: "2022–Now",
    title: "Retail Sales Assistant",
    org: "yd.",
    place: "Sydney",
    summary: "Four years on the floor across Broadway, Market City and Bondi.",
    points: [
      "$55,000+ in first-year sales at Broadway and $50,000 at Market City.",
      "Kept an average transaction value above $200.",
    ],
  },
  {
    period: "2021–2022",
    title: "QA & Data Operations Intern",
    org: "UnfoldLabs",
    place: "San Diego",
    summary: "Release testing and CRM data quality.",
    points: [
      "Ran structured QA on mobile app builds ahead of release, working from developer handoffs.",
      "Cleaned and restructured HubSpot CRM records to improve accuracy and segmentation.",
    ],
  },
  {
    period: "2019–2021",
    title: "Intern",
    org: "The Hidden Dream",
    place: "California",
    summary: "Internal tooling for a 25+ person nonprofit.",
    points: ["Ran Slack, Discord, Google Drive and Zoom, including roles, permissions and integrations."],
  },
  {
    period: "2019–2020",
    title: "Software Engineering Intern",
    org: "SoftClouds",
    place: "Remote",
    summary: "Java fundamentals and engineering practice.",
    points: ["Wrote and tested Java programs covering object-oriented design and data structures."],
  },
];

export const education = [
  { period: "2022–2024", title: "Master of IT & Master of IT Management", org: "University of Sydney" },
  { period: "2019–2022", title: "B.S. Computer Science", org: "CSU San Marcos", note: "GPA 3.44, Dean's List 3×" },
];

export const certifications = [
  { year: "2026", title: "Azure AI Fundamentals (AI-900)", org: "Microsoft" },
  { year: "2026", title: "Azure Fundamentals (AZ-900)", org: "Microsoft" },
  { year: "2025", title: "Data Engineer", org: "DataCamp" },
];

export const skills = [
  {
    group: "AI & LLMs",
    items: [
      "LLMs",
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
  { group: "Languages", items: ["Python", "SQL", "Java", "C#"] },
  { group: "Backend & Data", items: ["FastAPI", "REST APIs", "PostgreSQL", "pgvector", "Supabase"] },
  { group: "Cloud & Ops", items: ["Microsoft Azure", "Docker", "Git", "Grafana", "Loki"] },
  { group: "Tools", items: ["Claude Code", "Cursor", "Make.com", "HubSpot", "Agile / Scrum"] },
];

export const offguard = {
  title: "Offguard",
  year: "2026",
  type: "Independent project",
  summary:
    "An agentic voice assistant. It keeps context across a whole call, works out what the caller actually wants, and then does it, instead of reading from a script.",
  steps: [
    { k: "01", title: "Listen", body: "Holds the full conversation in context, not just the last sentence." },
    { k: "02", title: "Reason", body: "Works out intent, even when the caller changes their mind halfway." },
    { k: "03", title: "Act", body: "Calls tools to complete the task during the call." },
  ],
  stack: ["Python", "Agents", "Voice"],
};

export const upcoming = [
  {
    title: "Context engineering for compliance-heavy LLM output",
    note: "Case study",
    status: "Writing",
  },
  {
    title: "Monitoring a production LLM platform with Grafana and Loki",
    note: "Case study",
    status: "Writing",
  },
];
