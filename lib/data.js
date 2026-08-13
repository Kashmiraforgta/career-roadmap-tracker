export const weeks = [
  { week: 1, focus: "Python + Git", topics: "Python syntax, data structures, functions, OOP basics; Git/GitHub workflow", milestone: "5 small Python scripts pushed to GitHub",
    dailyTasks: ["Python basics — variables, data types, control flow", "Functions, scope, and error handling", "Data structures — lists, dicts, sets, tuples", "OOP basics — classes, objects, inheritance", "Git & GitHub — init, commit, branch, push, PR basics", "Write and push 2–3 small scripts combining the above", "Buffer / catch-up + review the week"] },
  { week: 2, focus: "SQL + DSA start", topics: "Joins, aggregations, subqueries, window functions; DSA: arrays & strings", milestone: "20 SQL queries solved",
    dailyTasks: ["SQL — joins & aggregations practice", "SQL — subqueries & window functions", "LeetCode/GFG — arrays fundamentals", "LeetCode/GFG — strings fundamentals", "LeetCode/GFG — two pointers pattern", "SQL practice set (StrataScratch/LeetCode) — aim for 20 total", "Buffer / catch-up + review the week"] },
  { week: 3, focus: "Stats + Viz basics", topics: "Descriptive stats, probability, distributions, hypothesis testing intro; Excel + matplotlib/seaborn; DSA: hashing, two pointers", milestone: "1 EDA notebook on a public dataset",
    dailyTasks: ["Descriptive stats — mean, median, variance, distributions", "Probability basics", "Hypothesis testing intro", "Excel + matplotlib/seaborn — plotting practice", "DSA — hashing patterns", "DSA — two pointers (continued) + start EDA notebook", "Finish & polish EDA notebook, push to GitHub"] },
  { week: 4, focus: "Choose track(s)", topics: "Track fundamentals start (see Role Tracks tab); DSA: linked lists, stacks, queues", milestone: "Track roadmap for weeks 4–11 finalized",
    dailyTasks: ["Review the Skill Overlap Matrix, finalize primary + secondary track", "Track fundamentals — set up environment/tools for your chosen track", "Track fundamentals — first core concept/resource", "DSA — linked lists", "DSA — stacks & queues", "Track fundamentals — hands-on exercise", "Write your track roadmap for weeks 4–11, review & reflect"] },
  { week: 5, focus: "Track deep-dive 1", topics: "Continue track fundamentals; DSA: trees (BST, traversals)", milestone: "Track skill checkpoint done",
    dailyTasks: ["Track — core concept study block 1", "Track — core concept study block 2", "DSA — binary trees & traversals", "Track — hands-on exercise / mini practice", "DSA — BST operations", "Track — checkpoint quiz/exercise set", "Review, log reflection, catch-up"] },
  { week: 6, focus: "Track deep-dive 2", topics: "Continue track fundamentals; DSA: graphs (BFS/DFS)", milestone: "Mini-project 1 kicked off",
    dailyTasks: ["Track — advance to next core concept", "DSA — graphs: BFS", "DSA — graphs: DFS", "Track — scope out mini-project 1 idea & plan", "Track — start mini-project 1 setup", "Track — mini-project 1 core build", "Review, log reflection"] },
  { week: 7, focus: "Mini-project 1", topics: "Finish and document mini-project; DSA: recursion & backtracking", milestone: "Mini-project 1 shipped + README",
    dailyTasks: ["Mini-project 1 — core feature build", "Mini-project 1 — core feature build (cont.)", "DSA — recursion basics", "DSA — backtracking", "Mini-project 1 — polish + edge cases", "Mini-project 1 — write README + push to GitHub", "Ship mini-project 1; revisit Skill Matrix (Week 7 checkpoint) & reflect"] },
  { week: 8, focus: "Advanced track topics", topics: "Track-specific advanced concepts; DSA: DP part 1", milestone: "Checkpoint: track advanced quiz",
    dailyTasks: ["Track — advanced concept 1", "Track — advanced concept 2", "DSA — DP part 1: intro & 1D DP", "DSA — DP part 1: knapsack patterns", "Track — advanced concept applied exercise", "Track — advanced checkpoint quiz", "Review, reflect, catch-up"] },
  { week: 9, focus: "Advanced track + tools", topics: "Deployment/tooling intro (Docker/FastAPI/React state mgmt as relevant); DSA: DP part 2", milestone: "Small deployed/working demo",
    dailyTasks: ["Deployment/tooling intro — set up (Docker/FastAPI/React state mgmt as relevant)", "DSA — DP part 2: 2D DP", "DSA — DP part 2: DP on trees/graphs (if applicable)", "Tooling — build the core of a small deployed demo", "Tooling — polish demo, fix deployment issues", "Tooling — finalize + document demo", "Review, reflect, catch-up"] },
  { week: 10, focus: "Second track intro", topics: "Start secondary role track at basic level; DSA: greedy algorithms", milestone: "Secondary track basics covered",
    dailyTasks: ["Secondary track — orientation, core stack setup", "Secondary track — first core concept", "DSA — greedy algorithms part 1", "DSA — greedy algorithms part 2", "Secondary track — hands-on basic exercise", "Secondary track — consolidate basics covered", "Review, reflect, catch-up"] },
  { week: 11, focus: "Interview prep starts", topics: "Behavioral prep (STAR stories), resume v1; DSA: advanced sorting/searching", milestone: "Resume draft 1 + 3 STAR stories",
    dailyTasks: ["Draft resume v1 — experience & projects section", "Draft resume v1 — skills section & polish", "Write 3 STAR stories (behavioral prep)", "DSA — advanced sorting/searching", "DSA — revision of weak topics from mistakes log", "Mock resume review (self or peer) + refine", "Review, reflect, catch-up"] },
  { week: 12, focus: "Capstone project 1", topics: "Build flagship project for primary role, end-to-end", milestone: "Capstone 1: code + deployed link + write-up",
    dailyTasks: ["Capstone 1 — scope & architecture plan", "Capstone 1 — core build block 1", "Capstone 1 — core build block 2", "Capstone 1 — core build block 3", "Capstone 1 — deploy + fix issues", "Capstone 1 — write-up/README + polish", "Ship Capstone 1; start applying to a few roles"] },
  { week: 13, focus: "Capstone project 2", topics: "Build cross-functional project (e.g., ML model behind a full-stack app)", milestone: "Capstone 2 shipped, GitHub polished",
    dailyTasks: ["Capstone 2 — scope cross-functional project plan", "Capstone 2 — core build block 1", "Capstone 2 — core build block 2", "Capstone 2 — integrate components end-to-end", "Capstone 2 — deploy + fix issues", "Capstone 2 — polish GitHub, write-up", "Ship Capstone 2; continue applications"] },
  { week: 14, focus: "Mock interviews", topics: "Technical mocks (DSA + role-specific), HR mocks; keep applying", milestone: "3 mock interviews completed",
    dailyTasks: ["Technical mock interview 1 (DSA)", "Review mock 1 feedback, patch weak areas", "Technical mock interview 2 (role-specific)", "HR / behavioral mock interview", "Review all mock feedback, update STAR stories", "Keep applying — send a fresh batch of applications", "Review, reflect, catch-up"] },
  { week: 15, focus: "System design + case studies", topics: "System design basics; ML/SQL case-study practice; continued applications", milestone: "1 system design walkthrough documented",
    dailyTasks: ["System design basics — fundamentals reading", "System design — walk through one example system", "ML/SQL case-study practice 1", "ML/SQL case-study practice 2", "Document your system design walkthrough", "Continue applications, follow up on pending ones", "Review, reflect, catch-up"] },
  { week: 16, focus: "Final polish", topics: "Resume v2, LinkedIn/portfolio polish, final DSA revision, broad applications", milestone: "Applications live across all target roles",
    dailyTasks: ["Resume v2 — incorporate all feedback", "LinkedIn profile polish", "GitHub/portfolio polish", "Final DSA revision — weak topics from mistakes log", "Broad applications push", "Final applications push + follow-ups", "Wrap-up review — reflect on the full 16 weeks, plan next steps"] },
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
      "Excel deep-dive: XLOOKUP, INDEX+MATCH, pivot tables",
      "SQL for extracting large relational datasets (joins, aggregations at scale)",
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
      "NumPy & Pandas deep-dive for data preprocessing",
      "Math foundations: linear algebra (vectors, matrices, eigenvalues) & differential calculus",
      "Probability distributions (Normal, Poisson, Binomial) & Naive Bayes",
      "Deep learning overview: ANN, CNN, RNN, Transformers (conceptual)",
      "Pick a domain specialization to grow into (Fintech, Healthcare, NLP, CV, GenAI)",
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
      "PyTorch fundamentals (recommended framework to start with)",
      "Model deployment options: Flask/FastAPI, Streamlit, Hugging Face Spaces",
      "Precision, recall, accuracy — knowing which metric fits which problem",
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
      "Medium-level DSA for interviews (arrays, linked lists, stacks, queues, trees)",
      "LLM architecture basics — how models like GPT/Gemini/LLaMA are conceptually built",
      "Transformer architecture fundamentals",
      "Deployment platforms: Render, AWS, Azure, GCP, Docker",
      "Portfolio project idea: fake-news/bot detector, text summarizer, or GAN-based art generator",
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
      "Integrating third-party & AI APIs (e.g. OpenAI API) into an app",
      "JavaScript deep-dive: async/await, promises, callbacks, Chrome DevTools",
      "CSS foundations: Vanilla CSS + Bootstrap (still industry-standard) before Tailwind",
      "CLI fundamentals & Git/GitHub workflow",
      "Backend architecture: MVC pattern, middleware, dynamic routing, error handling",
      "SQL query fluency — a major focus area in fresher interviews",
      "MongoDB — the standard NoSQL option to know alongside SQL",
      "Hold off on AI coding assistants for the first 2–3 months to build real debugging skills",
      "\"Rebuild strategy\" project — recreate a real platform's core features (e.g. a Zoom-style app with WebRTC/WebSockets)",
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
      "Excel fundamentals: shortcuts, SUM/SUMIF/SUMIFS, XLOOKUP, INDEX+MATCH",
      "Practical accounting — how P&L line items flow into the Balance Sheet",
      "Real-world practice: read analyses on Seeking Alpha & dissect real 10-K filings",
      "Bridge skill: SQL for pulling transaction data straight from databases",
      "Bridge skill: Python + Pandas for datasets too large for Excel's row limits",
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
      "Bridge skill: SQL & Python for querying large deal/transaction datasets",
      "Bridge skill: financial forecasting with ML (Scikit-learn) for non-linear risk/revenue models",
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

// --- Mistakes / weak-topics log --------------------------------------------
// The roadmap explicitly recommends "one mistakes log across all platforms,
// revisited weekly" — this backs that log's tag dropdowns.

export const mistakePlatformOptions = [
  "LeetCode", "GeeksforGeeks", "HackerRank", "HackerEarth", "Codeforces", "Kaggle", "Mock interview", "Other",
];

export const dsaPatternOptions = [
  "Arrays", "Strings", "Two Pointers", "Hashing", "Linked List", "Stacks & Queues",
  "Trees", "Graphs (BFS/DFS)", "Recursion & Backtracking", "Dynamic Programming",
  "Greedy", "Sorting & Searching", "Math", "System Design", "Other",
];

// --- Resources tab per track -----------------------------------------------
// Curated links pulled from the original roadmap doc (StatQuest, Made With
// ML, CFI, etc.) plus the standard reference for each stack, so external
// bookmarks live inside the app instead of scattered across tabs.

export const roleResources = {
  "data-analyst": [
    { title: "Google Data Analytics Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics", type: "course" },
    { title: "Mode — SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "doc" },
    { title: "Exceljet — XLOOKUP & INDEX+MATCH", url: "https://exceljet.net/functions/xlookup-function", type: "doc" },
    { title: "StatQuest — Statistics Fundamentals", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", type: "video" },
    { title: "Tableau Public — Learning Resources", url: "https://public.tableau.com/en-us/s/resources", type: "practice" },
  ],
  "data-scientist": [
    { title: "StatQuest with Josh Starmer", url: "https://www.youtube.com/@statquest", type: "video" },
    { title: "Made With ML — ML foundations", url: "https://madewithml.com/", type: "course" },
    { title: "Kaggle Learn — free micro-courses", url: "https://www.kaggle.com/learn", type: "practice" },
    { title: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "video" },
    { title: "Andrew Ng — Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction", type: "course" },
  ],
  "ml-engineer": [
    { title: "PyTorch — Official Tutorials", url: "https://pytorch.org/tutorials/", type: "doc" },
    { title: "Made With ML — MLOps", url: "https://madewithml.com/", type: "course" },
    { title: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/", type: "course" },
    { title: "FastAPI — Official Docs", url: "https://fastapi.tiangolo.com/", type: "doc" },
    { title: "Docker — Get Started Guide", url: "https://docs.docker.com/get-started/", type: "doc" },
  ],
  "ai-engineer": [
    { title: "DeepLearning.AI — Prompt Engineering for Developers", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", type: "course" },
    { title: "LangChain — Python Docs", url: "https://python.langchain.com/", type: "doc" },
    { title: "Anthropic — Prompt Engineering Guide", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", type: "doc" },
    { title: "Pinecone — Learning Center (RAG & vector search)", url: "https://www.pinecone.io/learn/", type: "doc" },
    { title: "3Blue1Brown — Neural Networks & Transformers", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", type: "video" },
  ],
  "full-stack": [
    { title: "freeCodeCamp — Full Stack Curriculum", url: "https://www.freecodecamp.org/", type: "course" },
    { title: "The Odin Project", url: "https://www.theodinproject.com/", type: "course" },
    { title: "MDN Web Docs", url: "https://developer.mozilla.org/", type: "doc" },
    { title: "React — Official Docs", url: "https://react.dev/", type: "doc" },
    { title: "Node.js — Official Learn Guides", url: "https://nodejs.org/en/learn", type: "doc" },
  ],
  "financial-analyst": [
    { title: "Corporate Finance Institute — Free Resources", url: "https://corporatefinanceinstitute.com/resources/", type: "course" },
    { title: "Wall Street Prep — Knowledge Center", url: "https://www.wallstreetprep.com/knowledge/", type: "doc" },
    { title: "Damodaran Online (NYU Stern)", url: "https://pages.stern.nyu.edu/~adamodar/", type: "doc" },
    { title: "Seeking Alpha — Analysis", url: "https://seekingalpha.com/", type: "practice" },
    { title: "Investopedia — Financial Ratios", url: "https://www.investopedia.com/financial-ratios-4689817", type: "doc" },
  ],
  "private-equity": [
    { title: "CFI — LBO Modeling", url: "https://corporatefinanceinstitute.com/resources/valuation/lbo-modeling/", type: "course" },
    { title: "Breaking Into Wall Street", url: "https://breakingintowallstreet.com/", type: "course" },
    { title: "Wall Street Prep — Knowledge Center", url: "https://www.wallstreetprep.com/knowledge/", type: "doc" },
    { title: "Wall Street Oasis — PE Forums & Guides", url: "https://www.wallstreetoasis.com/", type: "practice" },
  ],
};

export const defaultChecklistItems = [
  { id: "c1", text: "DSA practice (LeetCode / GFG POTD)" },
  { id: "c2", text: "Core skill work (Python / SQL / track topic)" },
  { id: "c3", text: "Project or portfolio time" },
  { id: "c4", text: "Revise notes / mistakes log" },
];

export const learningPaths = [
  {
    id: "ai-ml",
    title: "AI / ML Learning Roadmap",
    subtitle: "General path covering Data Science, ML Engineering & AI Engineering",
    timeframe: "Roughly 3–6 months at 3–4 focused hours/day",
    phases: [
      {
        title: "Phase 1 — Programming & Fundamentals",
        items: [
          "Python programming — variables, loops, conditionals, functions (~1–2 weeks)",
          "Object-Oriented Programming (OOP) in Python — a lifelong foundation in tech",
        ],
      },
      {
        title: "Phase 2 — Data Preprocessing & Visualization",
        items: [
          "NumPy & Pandas — the official docs are the best starting resource",
          "Matplotlib & Seaborn — visualize and communicate findings clearly",
          "SQL — most organizational data lives in relational databases, not spreadsheets",
        ],
      },
      {
        title: "Phase 3 — Machine Learning & Deep Learning",
        items: [
          "Core workflow: model selection → training → testing → evaluation",
          "Problem types (regression vs classification) & algorithms (SVM, KNN, decision trees, clustering, RNN, CNN)",
          "Evaluation metrics — know when precision, accuracy, or recall is the right one to optimize",
          "Scikit-learn for standard ML — the essential library",
          "PyTorch or TensorFlow for deep learning — start with PyTorch if it's your first time",
        ],
      },
      {
        title: "Phase 4 — Deployment, Version Control & APIs",
        items: [
          "Model deployment — bring models into production, not just a notebook",
          "Git & GitHub — standard industry requirement for version control",
          "Working with APIs (e.g. the OpenAI API) to build on top of existing models",
        ],
      },
    ],
    strategies: [
      "Don't copy-paste tutorials — take a Kaggle dataset, apply the algorithm yourself, and evaluate the results",
      "Keep toy projects (like digit classification) off your resume — build and deploy at least 2 large-scale, end-to-end projects instead (e.g. an AI chatbot, an ATS resume checker)",
      "Target specific industries in your projects — Fintech, E-commerce, Healthcare, and Social Media catch recruiters' attention",
      "After 2–3 years in the field, specialize in NLP, Computer Vision, or Generative AI to build deeper credibility",
      "Expect at least 6 months of consistent, focused study to reach a genuinely solid level",
    ],
  },
  {
    id: "finance",
    title: "Financial Analysis Roadmap",
    subtitle: "Core path for Financial Analyst / Private Equity, plus a data & AI bridge",
    phases: [
      {
        title: "Step 1 — Excel Fundamentals",
        items: [
          "Keyboard shortcuts, row/column formatting, fixed cell references",
          "Core functions: SUM, SUMIF, SUMIFS, XLOOKUP, and INDEX + MATCH",
        ],
      },
      {
        title: "Step 2 — Practical Accounting",
        items: [
          "Understand every item on the Profit & Loss (P&L) statement",
          "The direct relationship between P&L accounts and the Balance Sheet",
        ],
      },
      {
        title: "Step 3 — Three-Statement Modeling",
        items: [
          "Build a model connecting the P&L, Balance Sheet, and Cash Flow statement",
          "Understand how a business's operations dynamically impact its financial standing",
        ],
      },
      {
        title: "Step 4 — Broaden Business Skills",
        items: ["Business strategy, marketing, revenue analytics, corporate finance, management accounting"],
      },
      {
        title: "Step 5 — Ratio Analysis",
        items: ["Use key financial ratios to assess a company's overall health and historical performance"],
      },
      {
        title: "Step 6 — Real-World Practice",
        items: [
          "Read professional financial analyses on platforms like Seeking Alpha",
          "Download and analyze real 10-K filings of public companies you already know",
        ],
      },
    ],
    strategies: [
      "SQL — query, filter, and extract millions of rows of transaction data yourself, without waiting on a data engineer",
      "Python & Pandas — Excel caps out around 1 million rows and slows down on complex calculations; Python handles large datasets reproducibly",
      "Advanced visualization (Tableau / Power BI / Seaborn) — turn dry financial ratios into dashboards executives can actually digest",
      "Financial forecasting with ML (Scikit-learn) — model non-linear revenue, churn, and credit risk instead of relying only on linear budget assumptions",
    ],
  },
  {
    id: "full-stack",
    title: "Full-Stack Web Development Roadmap",
    subtitle: 'The "T-Strategy" — build a broad foundation across front-end, back-end & databases, then specialize',
    timeframe: "6–8 months of consistent study (roughly 1 year with breaks)",
    phases: [
      {
        title: "Phase 1 — Front-End Development",
        items: [
          "HTML & CSS — structure, layout, design, and formatting",
          "JavaScript — the most crucial hiring criteria for front-end roles",
          "Deep dive: async JavaScript, callbacks, promises, Chrome DevTools",
          "CSS tools: master Vanilla CSS first, then Bootstrap (still industry-standard), then Tailwind",
        ],
      },
      {
        title: "Phase 2 — CLI & Version Control",
        items: [
          "Command line fundamentals",
          "Git & GitHub — push every project so recruiters can see proof of work",
        ],
      },
      {
        title: "Phase 3 — Back-End Development",
        items: [
          "Node.js is recommended if you have under ~100–200 hrs of coding experience — same language front-to-back",
          "API structures & request-response cycles",
          "MVC architecture, middleware, routing, dynamic routing",
          "Authentication & authorization",
          "Robust error handling",
        ],
      },
      {
        title: "Phase 4 — Database Management",
        items: [
          "Learn databases alongside backend work, not as a standalone subject",
          "SQL (relational) — a major focus area in fresher interviews",
          "NoSQL (MongoDB) — the most popular non-relational option",
        ],
      },
      {
        title: "Phase 5 — Deployment",
        items: [
          "Free hosting to start: Render, Vercel",
          "Cloud platforms (AWS/Azure/GCP) — not required as a fresher, but a strong asset",
        ],
      },
      {
        title: "Phase 6 — Portfolio Projects",
        items: [
          "At least 3 fully deployed, end-to-end projects — skip basic clones",
          "Spend 1–2 weeks per project on 5–6 complex, integrated features",
          "\"Rebuild strategy\": recreate a real platform's core functionality (e.g. a Zoom-style app forces WebRTC/WebSockets)",
        ],
      },
      {
        title: "Phase 7 — Long-Term Specialization",
        items: [
          "Front-end: a major framework — React is most popular, then Angular, then Vue",
          "Back-end/DevOps: CI/CD, unit testing (Jest), caching (Redis), Docker & Kubernetes",
        ],
      },
    ],
    strategies: [
      "Avoid AI coding assistants for the first 2–3 months — leaning on them early stunts core logic-building and debugging skills",
      "When you hit a bug, manually search official docs (MDN) or Stack Overflow before reaching for AI",
      "Once fundamentals are solid, AI tools (VS Code extensions, Claude Code, Gemini) are fair game for debugging, boilerplate, and mock interviews",
      "Starting salaries in India: ~6 LPA front-end, ~8 LPA back-end for freshers; 12–24 LPA achievable with a strong portfolio + internship experience",
    ],
  },
];
