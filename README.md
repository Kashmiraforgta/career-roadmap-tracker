# Career Roadmap Tracker

A personal progress tracker for the 16-week career prep roadmap (Data Analyst, Data Scientist, ML Engineer, AI Engineer, Full Stack + a parallel Financial Analyst / Private Equity track). Built with Next.js + Tailwind. All progress is saved in your browser's `localStorage` — there's no backend, no account, no database.

## What's inside

- **Dashboard** — overall completion %, current week, quick stats
- **Weekly Plan** — check off each of the 16 weeks as you complete it
- **Practice Platforms** — log progress on LeetCode, GeeksforGeeks, HackerRank, HackerEarth, Codeforces, Kaggle against target goals
- **Tech Tracks** — topic checklists for Data Analyst, Data Scientist, ML Engineer, AI Engineer, Full Stack
- **Finance Track** — topic checklists for Financial Analyst and Private Equity
- **Projects** — status tracker (Not started / In progress / Done) with link + notes fields for each portfolio project

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel (free)

**Option A — via GitHub (recommended, auto-redeploys on push):**

1. Create a new empty repo on GitHub.
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Career roadmap tracker"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New → Project**, select your repo, and click **Deploy**. No configuration needed — Vercel auto-detects Next.js.
4. You'll get a live URL like `your-app.vercel.app` in about a minute.

**Option B — via Vercel CLI (no GitHub needed):**

```bash
npm install -g vercel
vercel
```

Follow the prompts (log in, confirm project settings) and it deploys directly from this folder.

## Notes on data persistence

- Progress is stored in `localStorage` in **whatever browser you use it in**. It will not sync between your phone and laptop, and clearing browser data will wipe it.
- Use the **Reset progress** button in the header if you want to start over.
- If you want the data to sync across devices later, the natural next step is swapping `lib/useTrackerState.js` for calls to a small database (e.g. Vercel Postgres or Supabase) — the rest of the app doesn't need to change.

## Customizing the content

All the roadmap content (weeks, platform goals, role topics, projects) lives in one place: `lib/data.js`. Edit that file to adjust anything — add a week, change a platform goal, add a project — and it'll show up everywhere automatically.
