import { readFileSync } from "node:fs";

const resume = readFileSync(new URL("../src/data/resume.tsx", import.meta.url), "utf8");

const requiredSnippets = [
  'company: "AI Travel Platform"',
  'title: "Full Stack Developer"',
  'start: "February 2026"',
  'end: "June 2026"',
  "AI Travel Agent platform",
  "turns natural-language trip requests into executable itineraries",
  "management dashboard",
  'company: "Cross-border E-commerce AI Startup"',
  'title: "AI Application Developer Intern"',
  'start: "January 2026"',
  'end: "February 2026"',
  "RAG pipeline for messy ERP exports",
  'company: "Enterprise Fintech Software Company"',
  'title: "Algorithm Developer Intern"',
  'start: "July 2025"',
  'end: "December 2025"',
  "NLU engine behind an intelligent language assistant",
];

const forbiddenSnippets = [
  "smart huh :)",
  "Stealth AI Startup",
  "Freelance",
  "v0 by Vercel",
  "科蓝软件",
  "哈尔滨",
  "乐途宝",
];

const missing = requiredSnippets.filter((snippet) => !resume.includes(snippet));
const forbidden = forbiddenSnippets.filter((snippet) => resume.includes(snippet));

if (missing.length > 0 || forbidden.length > 0) {
  if (missing.length > 0) {
    console.error("Missing expected work experience content:");
    for (const snippet of missing) console.error(`- ${snippet}`);
  }
  if (forbidden.length > 0) {
    console.error("Found forbidden/old work experience content:");
    for (const snippet of forbidden) console.error(`- ${snippet}`);
  }
  process.exit(1);
}
