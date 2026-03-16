/**
 * api/analyze.js
 * Vercel Serverless Function
 * - Fetches URL content server-side (no CORS issues)
 * - Calls Groq API using GROQ_API_KEY from .env
 * - Returns structured JSON analysis
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL   = "llama-3.3-70b-versatile";

/* ─── Strip HTML to plain text (Node.js, no DOM) ─── */
function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s{3,}/g, "\n\n")
    .trim()
    .slice(0, 16000);
}

/* ─── Build Groq prompt ─── */
function buildPrompt(text, company) {
  return `You are a legal expert and digital-rights advocate. Analyse this Terms & Conditions document for "${company || "Unknown"}".

Find EVERY clause that could harm users: data collection/sale, privacy violations, rights removal, financial traps, arbitration clauses, silent T&C changes, account deletion, content ownership grabs, etc.

Return ONLY a single valid JSON object. No markdown. No backticks. No text before or after the JSON:
{
  "company": "company name",
  "overallRisk": "critical|high|medium|low",
  "trustScore": <integer 0-100>,
  "summary": "2-3 sentence plain-English summary of what this document does to users",
  "verdict": "one punchy sentence verdict",
  "findings": [
    {
      "id": 1,
      "risk": "critical|high|medium|low",
      "category": "Data Collection|Privacy|User Rights|Financial|Legal Traps|Account Control|Content Ownership|Security|Notifications",
      "title": "short title",
      "clause": "the exact or paraphrased problematic clause (max 200 chars)",
      "explanation": "plain English explanation",
      "consequence": "what could actually happen to the user",
      "recommendation": "what the user should do"
    }
  ],
  "positives": ["any user-friendly clauses found"],
  "dataCollected": ["specific data types collected"],
  "thirdPartySharing": true,
  "canDeleteAccount": false,
  "hasArbitrationClause": false,
  "autoRenews": false
}

Terms & Conditions to analyse:
${text.slice(0, 14000)}`;
}

/* ─── Main handler ─── */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured on server." });
  }

  let { text, url, company } = req.body || {};
  let content = text || "";

  /* ── If URL provided, fetch it server-side ── */
  if (url && !content) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const fetchRes = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; TermsGuard/1.0; +https://termsguard.app)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
      clearTimeout(timeout);

      if (!fetchRes.ok) throw new Error(`HTTP ${fetchRes.status}`);
      const html = await fetchRes.text();
      content = extractText(html);

      if (!company) {
        try { company = new URL(url).hostname.replace("www.", ""); } catch {}
      }
    } catch (e) {
      return res.status(422).json({
        error: `Could not fetch URL: ${e.message}. Please paste the Terms text directly.`,
      });
    }
  }

  if (!content || content.trim().length < 80) {
    return res.status(400).json({
      error: "Not enough text to analyse. Please paste the Terms content directly.",
    });
  }

  /* ── Call Groq API ── */
  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a legal expert specialising in Terms & Conditions analysis. Always respond with valid JSON only — no markdown, no backticks, no explanation.",
          },
          {
            role: "user",
            content: buildPrompt(content, company),
          },
        ],
        temperature: 0.2,
        max_tokens: 4096,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      const msg = err?.error?.message || `Groq API error ${groqRes.status}`;
      return res.status(groqRes.status).json({ error: msg });
    }

    const groqData = await groqRes.json();
    const raw = groqData.choices?.[0]?.message?.content || "";

    // Strip any accidental markdown fences
    const clean = raw.replace(/```json|```/gi, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      // Try to extract JSON object if wrapped in extra text
      const match = clean.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        return res.status(500).json({ error: "AI returned an invalid response. Please try again." });
      }
    }

    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: e.message || "Analysis failed. Please try again." });
  }
}
