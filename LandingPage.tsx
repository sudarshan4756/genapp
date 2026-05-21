import { BillingPlan } from "./types";

export const PRICING_PLANS: BillingPlan[] = [
  {
    id: "free",
    name: "Developer Starter",
    price: "$0",
    billing: "Free forever",
    description: "Perfect for testing ideas and hacking together fast prototypes.",
    features: [
      "3 dynamic app generations",
      "Full source-code viewing & edits",
      "Next.js SPA hosting simulation",
      "Local standard SQlite connections",
      "Community Slack guidance"
    ]
  },
  {
    id: "pro",
    name: "Architect Pro",
    price: "$49",
    billing: "per month",
    description: "For professionals and consultants delivering enterprise MVPs.",
    features: [
      "Unlimited generations & code edit repeats",
      "Full monorepo export & live downloads",
      "Real-time Docker sandbox orchestration",
      "Direct PostgreSQL & MongoDB migrations",
      "Google & GitHub OAuth configuration mapping",
      "Priority API rate throttles",
      "Advanced 1K image design configurations"
    ],
    recommended: true
  },
  {
    id: "enterprise",
    name: "Enterprise Forge",
    price: "$299",
    billing: "per team / month",
    description: "Complete team control, continuous deployments, and dedicated memory contexts.",
    features: [
      "Everything in Pro of course",
      "Dedicated high-speed Kubernetes clusters",
      "Advanced RAG memory context mapping",
      "Private GitHub / GitLab integration repositories",
      "Interactive mobile APK & QR Code delivery core",
      "Full billing dashboard & tenant isolation panels",
      "Corporate SLAs & dedicated account lead support limit"
    ]
  }
];

export const FAQS = [
  {
    question: "How does ForgeAI generate full working applications?",
    answer: "ForgeAI uses a multi-agent orchestration pattern powered by advanced Gemini models. When a prompt is entered, our Planner Agent designs the schema, Designer Agent structures Tailwind classes, and Frontend/Backend Agents compile working codebases that map directly together."
  },
  {
    question: "Is the generated code fully custom or generic templates?",
    answer: "Every line of code is produced custom based on your unique prompts. Unlike simple boilerplate setups, our engine reasons through your custom state parameters, validation, and layout logic to deliver production-ready patterns matching standard guidelines."
  },
  {
    question: "Can I download and export the generated codebase?",
    answer: "Absolutely! Every project is built in an enterprise-ready PNPM monorepo structure. You can download the complete source code as a ZIP file, or immediately initialize a new private GitHub repository linked from your dashboard."
  },
  {
    question: "Does it support both Postgres and MongoDB databases?",
    answer: "Yes, our Planner agent detects the relational or document-based requirements of your schema. It outputs fully-typed Prisma models configured properly to plug into PostgreSQL or MongoDB dynamically."
  },
  {
    question: "What's included in the mobile application deliverable?",
    answer: "ForgeAI automatically produces a fully-configured Expo / React Native mobile wrapper. This maps all desktop screens onto intuitive touch routing and includes native bridge configuration structures, generating immediate APK mock-ups."
  }
];

export const MODEL_CONFIGS = [
  { name: "Gemini 3.5 Flash", id: "gemini-3.5-flash", desc: "Optimal latency, cost and speed balance", isDefault: true },
  { name: "Gemini 3.1 Pro Preview", id: "gemini-3.1-pro-preview", desc: "Advanced systems reasoning, coding & architecture planner" },
  { name: "Gemini 3.1 Flash Lite", id: "gemini-3.1-flash-lite", desc: "High-performance minimalistic text structures" }
];

export const MOCK_LOGS = [
  { time: "00:01", agent: "Planner", message: "Analyzing system prompt and extracting architectural specs...", type: "info" },
  { time: "00:03", agent: "Planner", message: "Scaffolded enterprise PNPM monorepo plan. Configured 4 packages and 2 main apps.", type: "success" },
  { time: "00:05", agent: "Database", message: "Designing schema models. Set up User, Project, Item mappings with unique relational indexes.", type: "info" },
  { time: "00:08", agent: "UI Designer", message: "Matched theme: Space Obsidian with Indigo and Grape accents. Initialized tailwind classes.", type: "success" },
  { time: "00:11", agent: "Frontend", message: "Compiling client app index layout. Created responsive dashboards & state stores.", type: "info" },
  { time: "00:14", agent: "Backend", message: "Wrote Express v4 endpoints with JWT token rotation maps and schema input filters.", type: "info" },
  { time: "00:16", agent: "Security", message: "Audited APIs. Mounted standard Helmet headers, throttled router rates, and CORS configs.", type: "success" },
  { time: "00:19", agent: "QA Tester", message: "Executing auto-mock tests with Jest. Running ESLint syntax and compiler checks.", type: "info" },
  { time: "00:22", agent: "QA Tester", message: "All 14 component tests passed! 0 typescript compiling warnings.", type: "success" },
  { time: "00:25", agent: "DevOps", message: "Bundled multi-tier Docker environments. Prepared Nginx reverse ingress routes.", type: "success" },
  { time: "00:28", agent: "Deployment", message: "Container pushed to cloud servers. Generating secure live SSL production links.", type: "success" }
];
