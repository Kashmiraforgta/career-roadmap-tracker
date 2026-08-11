export const weeks = [
  { week: 1, focus: "Python + Git", topics: "Python syntax, data structures, functions, OOP basics; Git/GitHub workflow", milestone: "5 small Python scripts pushed to GitHub" },
  { week: 2, focus: "SQL + DSA start", topics: "Joins, aggregations, subqueries, window functions; DSA: arrays & strings", milestone: "20 SQL queries solved" },
  { week: 3, focus: "Stats + Viz basics", topics: "Descriptive stats, probability, distributions, hypothesis testing intro; Excel + matplotlib/seaborn; DSA: hashing, two pointers", milestone: "1 EDA notebook on a public dataset" },
  { week: 4, focus: "Choose track(s)", topics: "Track fundamentals start (see Role Tracks tab); DSA: linked lists, stacks, queues", milestone: "Track roadmap for weeks 4–11 finalized" },
  { week: 5, focus: "Track deep-dive 1", topics: "Continue track fundamentals; DSA: trees (BST, traversals)", milestone: "Track skill checkpoint done" },
  { week: 6, focus: "Track deep-dive 2", topics: "Continue track fundamentals; DSA: graphs (BFS/DFS)", milestone: "Mini-project 1 kicked off" },
  { week: 7, focus: "Mini-project 1", topics: "Finish and document mini-project; DSA: recursion & backtracking", milestone: "Mini-project 1 shipped + README" },
  { week: 8, focus: "Advanced track topics", topics: "Track-specific advanced concepts; DSA: DP part 1", milestone: "Checkpoint: track advanced quiz" },
  { week: 9, focus: "Advanced track + tools", topics: "Deployment/tooling intro (Docker/FastAPI/React state mgmt as relevant); DSA: DP part 2", milestone: "Small deployed/working demo" },
  { week: 10, focus: "Second track intro", topics: "Start secondary role track at basic level; DSA: greedy algorithms", milestone: "Secondary track basics covered" },
  { week: 11, focus: "Interview prep starts", topics: "Behavioral prep (STAR stories), resume v1; DSA: advanced sorting/searching", milestone: "Resume draft 1 + 3 STAR stories" },
  { week: 12, focus: "Capstone project 1", topics: "Build flagship project for primary role, end-to-end", milestone: "Capstone 1: code + deployed link + write-up" },
  { week: 13, focus: "Capstone project 2", topics: "Build cross-functional project (e.g., ML model behind a full-stack app)", milestone: "Capstone 2 shipped, GitHub polished" },
  { week: 14, focus: "Mock interviews", topics: "Technical mocks (DSA + role-specific), HR mocks; keep applying", milestone: "3 mock interviews completed" },
  { week: 15, focus: "System design + case studies", topics: "System design basics; ML/SQL case-study practice; continued applications", milestone: "1 system design walkthrough documented" },
  { week: 16, focus: "Final polish", topics: "Resume v2, LinkedIn/portfolio polish, final DSA revision, broad applications", milestone: "Applications live across all target roles" },
];

export const platforms = [
  { id: "leetcode", name: "LeetCode", unit: "problems", goal: 175, purpose: "Primary interview-DSA practice, pattern-based prep" },
  { id: "gfg", name: "GeeksforGeeks", unit: "problems / POTD streak", goal: 100, purpose: "Concept explanations + company-tagged interview experiences" },
  { id: "hackerrank", name: "HackerRank", unit: "certificates / assessments", goal: 3, purpose: "Skill certifications recruiters recognize; common OA format" },
  { id: "hackerearth", name: "HackerEarth", unit: "contests / OAs", goal: 6, purpose: "Common OA & hackathon platform for Indian campus hiring" },
  { id: "codeforces", name: "Codeforces", unit: "rating", goal: 1200, purpose: "Deeper algorithmic strength; strong signal for product/ML roles" },
  { id: "kaggle", name: "Kaggle", unit: "competitions / notebooks", goal: 2, purpose: "Portfolio credibility for DS / ML / AI Engineer tracks" },
  { id: "hackathons", name: "Hackathons", unit: "hackathons participated", goal: 3, purpose: "Team building sprints — strong signal for Full Stack/AI Engineer portfolios, networking, and fast prototyping reps" },
];

export const techRoles = [
  {
    id: "data-analyst",
    name: "Data Analyst",
    color: "#2E6F71",
    stack: "Excel, SQL, Power BI / Tableau, Python (pandas), statistics",
    topics: [
      "Data cleaning & EDA",
      "Dashboard design & storytelling with data",
      "A/B testing fundamentals",
      "Cohort & funnel analysis",
      "Business metrics (CAC, LTV, retention)",
    ],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    color: "#2E6F71",
    stack: "Python, SQL, statistics, scikit-learn, pandas, Jupyter",
    topics: [
      "Hypothesis testing & experiment design",
      "Regression, classification, clustering",
      "Feature engineering & selection",
      "Model evaluation (cross-validation, metrics)",
      "Storytelling with a modeling report",
    ],
  },
  {
    id: "ml-engineer",
    name: "ML Engineer",
    color: "#2E6F71",
    stack: "Python, PyTorch/TensorFlow, Docker, FastAPI, MLflow, basic cloud",
    topics: [
      "Model training pipelines & reproducibility",
      "Serving models via REST API",
      "Containerization basics (Docker)",
      "Experiment tracking & versioning",
      "Monitoring a deployed model",
    ],
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    color: "#2E6F71",
    stack: "Python, OpenAI/Anthropic APIs, LangChain/LlamaIndex, vector DBs",
    topics: [
      "Prompt engineering fundamentals",
      "Retrieval-Augmented Generation (RAG)",
      "Agents & tool use",
      "Embeddings & vector search",
      "Evaluating LLM outputs",
    ],
  },
  {
    id: "full-stack",
    name: "Full Stack",
    color: "#2E6F71",
    stack: "HTML/CSS/JS, React, Node/Express or Django, SQL/MongoDB, REST APIs",
    topics: [
      "Component-based frontend architecture & state management",
      "Building & consuming REST APIs",
      "Authentication & authorization",
      "Database design (SQL/NoSQL)",
      "Deployment (Vercel/Render/Railway)",
    ],
  },
];

export const financeRoles = [
  {
    id: "financial-analyst",
    name: "Financial Analyst",
    color: "#6B2C3E",
    stack: "Excel modeling, financial statement analysis, PowerPoint, SQL",
    topics: [
      "Reading & analyzing the 3 financial statements",
      "Ratio analysis & financial health diagnostics",
      "DCF valuation and comparable company analysis",
      "Building a 3-statement financial model from scratch",
      "Corporate finance fundamentals (WACC, capital structure)",
    ],
  },
  {
    id: "private-equity",
    name: "Private Equity",
    color: "#6B2C3E",
    stack: "LBO modeling, valuation, capital structure, market research",
    topics: [
      "LBO mechanics — sources & uses, debt schedules, returns waterfalls",
      "Returns analysis (IRR, MOIC) and leverage effects",
      "Capital structure & deal structuring basics",
      "Due diligence process & investment memo writing",
      "PE fund structures (GP/LP, fund lifecycle)",
    ],
  },
];

export const projects = [
  { id: "p1", name: "EDA + dashboard project", role: "Data Analyst" },
  { id: "p2", name: "End-to-end ML project with written report", role: "Data Scientist" },
  { id: "p3", name: "Deployed ML model as API (Docker + FastAPI)", role: "ML Engineer" },
  { id: "p4", name: "RAG chatbot or AI agent", role: "AI Engineer" },
  { id: "p5", name: "Full CRUD web app, deployed", role: "Full Stack" },
  { id: "p6", name: "Cross-track capstone (web app serving an ML model)", role: "Stretch" },
  { id: "p7", name: "3-statement financial model + DCF valuation", role: "Financial Analyst" },
  { id: "p8", name: "LBO model + investment memo", role: "Private Equity" },
];

export const projectStatuses = ["Not started", "In progress", "Done"];

export const applicationStatuses = ["Applied", "OA / Assessment", "Interview", "Offer", "Rejected", "Withdrawn"];

export const defaultChecklistItems = [
  { id: "c1", text: "DSA practice (LeetCode / GFG POTD)" },
  { id: "c2", text: "Core skill work (Python / SQL / track topic)" },
  { id: "c3", text: "Project or portfolio time" },
  { id: "c4", text: "Revise notes / mistakes log" },
];
