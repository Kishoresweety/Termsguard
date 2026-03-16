# 🛡 TermsGuard — AI Legal Shield

Know what you're **actually** agreeing to.

AI-powered Terms & Conditions analyser. Paste a URL or text and get a full plain-English breakdown of every risky clause, data collection, legal trap, and consequence.

---

## Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React + Vite                  |
| Backend  | Vercel Serverless (`api/`)    |
| AI       | Groq API (`llama-3.3-70b`)   |
| Deploy   | Vercel (free tier)            |

---

## Folder Structure

```
project-root/
│
├── api/
│   └── analyze.js          ← Serverless function (Groq API lives here)
│
├── src/
│   ├── utils.js            ← Client helpers + fetch("/api/analyze")
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Pill.jsx
│   │   ├── ScoreRing.jsx
│   │   └── Toast.jsx
│   └── pages/
│       ├── HomeView.jsx
│       ├── ResultsView.jsx
│       ├── MonitorView.jsx
│       ├── ExtensionView.jsx
│       └── SupportView.jsx
│
├── public/
│   └── shield.svg
│
├── .env                    ← GROQ_API_KEY (never commit this)
├── .env.example            ← Safe to commit
├── .gitignore
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Install Vercel CLI globally (needed to run serverless functions locally)
npm install -g vercel

# 3. Link to Vercel (first time only)
vercel link

# 4. Start the dev server (runs both Vite frontend + api/ functions)
vercel dev
```

The app runs at **http://localhost:3000**

> **Important:** Use `vercel dev`, not `npm run dev`.  
> Only `vercel dev` runs the `api/analyze.js` serverless function locally.

---

## Deploy to Vercel

### Option A — Vercel CLI
```bash
vercel --prod
```

### Option B — GitHub
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variable: `GROQ_API_KEY` = your key
4. Click Deploy

### Set Environment Variable on Vercel
```
Dashboard → Your Project → Settings → Environment Variables
Name:  GROQ_API_KEY
Value: gsk_xxxxxxxxxxxxxxxxxxxxx
```

---

## How It Works

```
User pastes URL or text
        ↓
Frontend calls POST /api/analyze
        ↓
api/analyze.js (server-side):
  - If URL: fetches the page server-side (no CORS issues)
  - Extracts plain text from HTML
  - Calls Groq API with GROQ_API_KEY from .env
  - Returns structured JSON
        ↓
Frontend renders results
```

The API key **never touches the browser**. All Groq calls happen server-side.

---

## Support

This tool is free forever. If it helped you, consider a small donation:

- ☕ [Buy Me a Coffee](https://buymeacoffee.com/kishore.ly)
- 💙 [Razorpay (UPI / Cards)](https://razorpay.me/@kishorely)

---

Built with ♥ by **Kishore** · Powered by Groq AI
