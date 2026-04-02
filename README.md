# 🛡 TermsGuard — AI Legal Shield

## 🚨 Most people accept Terms & Conditions without reading them.

But hidden inside many agreements are clauses that can:

+ Sell your data to third parties
+ Force arbitration (removing your right to sue)
+ Auto-renew subscriptions silently
+ Claim ownership of your content
+ Delete your account without refunds

> So I built TermsGuard — an AI-powered Terms & Conditions analyzer.

TermsGuard scans legal agreements and explains them in plain English, helping users understand the real risks before clicking “I Agree.”

### Key features:

* 🔍 AI clause analysis
* ⚠️ Risk detection across 8 categories
* 📊 Trust score (0–100) for quick evaluation
* 🧠 Plain-English explanations of legal terms
* 🚨 Real-world consequences for each clause
* 🔎 Risk filtering (Critical → Low)

### It can also:

* 🌐 Analyze policies directly from a website URL
* 🔔 Monitor Terms & Conditions changes
* 🧩 Prepare for a future browser extension

**My goal with this project was simple:**

Give users transparency and control over legal agreements they sign online.

No ads.
No data collection.
Free forever.

If you're curious about how companies write their Terms — try analyzing one with TermsGuard.

Know what you're **actually** agreeing to.

AI-powered Terms & Conditions analyser. Paste a URL or text and get a full plain-English breakdown of every risky clause, data collection, legal trap, and consequence.
> Feedback is welcome.
---

## Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React + Vite                  |
| Backend  | Vercel Serverless (`api/`)    |
| AI       | Groq API (`llama-3.3-70b`)   |
| Deploy   | Vercel (free tier)            |

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

---

## Support

This tool is free forever. If it helped you, consider a small donation:

- ☕ [Buy Me a Coffee](https://buymeacoffee.com/kishore.ly)
- 💙 [Razorpay (UPI / Cards)](https://razorpay.me/@kishorely)

---

Built with ♥ by **Kishore** ·

