/**
 * src/utils.js
 * Client-side utilities.
 * All Groq API calls go through /api/analyze (server-side) — no key exposed here.
 */

export const RISK = {
  critical: { label: "Critical", color: "#ef4444", bg: "rgba(239,68,68,0.09)",  border: "rgba(239,68,68,0.28)",  glow: "rgba(239,68,68,0.2)",  icon: "◈" },
  high:     { label: "High",     color: "#f97316", bg: "rgba(249,115,22,0.09)", border: "rgba(249,115,22,0.28)", glow: "rgba(249,115,22,0.15)", icon: "◆" },
  medium:   { label: "Medium",   color: "#eab308", bg: "rgba(234,179,8,0.08)",  border: "rgba(234,179,8,0.25)",  glow: "rgba(234,179,8,0.12)",  icon: "◇" },
  low:      { label: "Low",      color: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.25)",  glow: "rgba(34,197,94,0.10)",  icon: "○" },
};

export const RISK_ORDER = ["critical", "high", "medium", "low"];

export const SAMPLE_TC = `TERMS OF SERVICE — VaultApp Technologies Inc.
Effective: January 1, 2025

1. GRANT OF LICENSE & DATA RIGHTS
By creating an account, you grant VaultApp an irrevocable, sublicensable, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, publicly display, and distribute any content you upload. This license survives account termination indefinitely.

2. DATA COLLECTION & MONETIZATION
We collect your precise GPS location continuously, contacts list, full browsing history, device identifiers, microphone access for voice features, and biometric data. This data may be shared with and sold to third-party advertisers, data brokers, and analytics companies without additional consent. We are not responsible for how third parties use your data.

3. BINDING ARBITRATION & CLASS ACTION WAIVER
ALL DISPUTES MUST BE RESOLVED THROUGH BINDING ARBITRATION. YOU WAIVE YOUR RIGHT TO A JURY TRIAL AND YOUR RIGHT TO PARTICIPATE IN CLASS ACTION LAWSUITS. Arbitration shall take place in Delaware at your expense.

4. UNILATERAL MODIFICATION OF TERMS
We reserve the right to modify these Terms at any time without prior notice. Continued use of the Service constitutes acceptance of the new terms even if you were not notified.

5. ACCOUNT SUSPENSION & TERMINATION
We may suspend or permanently terminate your account at our sole discretion, at any time, for any reason or no reason, without liability, refund, or advance notice. All user data may be deleted immediately.

6. SUBSCRIPTION & AUTO-RENEWAL
Your subscription renews automatically at the then-current rate unless cancelled 72 hours before renewal. Refunds are not available under any circumstances.

7. INTELLECTUAL PROPERTY OF USER CONTENT
Any feedback, ideas, or suggestions you submit become the sole property of VaultApp. We may use them commercially without compensation or attribution.`;

/**
 * Hash a string to a short base-36 identifier (for change detection)
 */
export function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

/**
 * Call our /api/analyze serverless endpoint.
 * Accepts either { text, company } or { url, company }.
 * All Groq API calls happen on the server — no key is needed client-side.
 */
export async function analyzeTerms({ text, url, company }) {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, url, company }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Server error ${res.status}`);
  }

  return data;
}
