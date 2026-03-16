import { useState } from "react";
import { SAMPLE_TC, analyzeTerms } from "../utils.js";

export default function HomeView({ onResult, existingResult, onGoToResults }) {
  const [mode, setMode]     = useState("url");
  const [url, setUrl]       = useState("");
  const [text, setText]     = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep]     = useState("");
  const [error, setError]   = useState(null);

  const canSubmit = !loading && (mode === "url" ? url.trim().length > 4 : text.trim().length > 0);

  const handleAnalyze = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      let company = "";
      if (mode === "url") {
        setStep("Fetching document…");
        try { company = new URL(url.trim()).hostname.replace("www.", ""); } catch {}
      }
      setStep("Analysing with AI…");
      const result = await analyzeTerms({
        url:     mode === "url" ? url.trim() : undefined,
        text:    mode === "paste" ? text.trim() : undefined,
        company,
      });
      onResult(result, mode === "url" ? url.trim() : "");
    } catch (e) {
      setError(e.message || "Analysis failed. Please try again.");
    }

    setLoading(false);
    setStep("");
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Hero */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#ef4444", letterSpacing: "3px", marginBottom: 12 }}>FREE · NO SUBSCRIPTION · GROQ AI</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 14, letterSpacing: "-0.5px" }}>
          Know what you're<br />
          <em style={{ color: "#ef4444" }}>actually agreeing to.</em>
        </h1>
        <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, maxWidth: 540 }}>
          Paste a URL or the full text of any Terms &amp; Conditions, Privacy Policy, or EULA.
          Our AI scans for hidden risks, data theft clauses, and legal traps — in plain English.
        </p>
      </div>

      {/* Input card */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", marginBottom: 16, boxShadow: "0 4px 48px rgba(0,0,0,0.4)" }}>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {[{ id: "url", icon: "⬡", label: "From URL" }, { id: "paste", icon: "◈", label: "Paste Text" }].map((t) => (
            <button key={t.id} onClick={() => setMode(t.id)} style={{ flex: 1, background: mode === t.id ? "rgba(239,68,68,0.07)" : "transparent", border: "none", borderBottom: mode === t.id ? "2px solid #ef4444" : "2px solid transparent", color: mode === t.id ? "#ef4444" : "#444", fontSize: 12, padding: "14px 20px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "all 0.15s" }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* URL input */}
        {mode === "url" && (
          <div style={{ padding: "22px 24px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 10 }}>WEBSITE URL</div>
            <input
              type="url" value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="https://example.com/terms"
              style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#ddd", fontSize: 14, padding: "13px 16px", outline: "none", fontFamily: "'JetBrains Mono',monospace", transition: "border-color 0.15s" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(239,68,68,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <div style={{ marginTop: 10, fontSize: 11, color: "#2e3140", fontFamily: "'JetBrains Mono',monospace" }}>
              e.g. apple.com/legal/internet-services/itunes · facebook.com/terms
            </div>
          </div>
        )}

        {/* Paste input */}
        {mode === "paste" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px" }}>PASTE T&amp;C TEXT</span>
              <button onClick={() => setText(SAMPLE_TC)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 5, color: "#555", fontSize: 10, padding: "4px 10px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>
                Load Sample
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the complete Terms & Conditions or Privacy Policy here…"
              style={{ width: "100%", minHeight: 240, background: "transparent", border: "none", outline: "none", color: "#c8c5bc", fontSize: 13.5, lineHeight: 1.8, padding: "18px 22px", resize: "vertical", fontFamily: "'Georgia',serif" }}
            />
            {text && (
              <div style={{ padding: "8px 20px", borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#333" }}>
                {text.split(/\s+/).filter(Boolean).length} words · {text.length.toLocaleString()} chars
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={handleAnalyze} disabled={!canSubmit}
          style={{ background: canSubmit ? "linear-gradient(135deg,#ef4444,#b91c1c)" : "rgba(255,255,255,0.05)", border: "none", borderRadius: 9, color: canSubmit ? "#fff" : "#333", fontSize: 14, fontWeight: 700, padding: "14px 30px", cursor: canSubmit ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 9, transition: "all 0.2s", boxShadow: canSubmit ? "0 4px 22px rgba(239,68,68,0.28)" : "none", fontFamily: "'Georgia',serif" }}
        >
          {loading
            ? <><span style={{ animation: "spin 0.8s linear infinite", display: "inline-block", fontSize: 16 }}>⟳</span>{step || "Analysing…"}</>
            : <><span style={{ fontSize: 16 }}>⚡</span> Analyse Now — It's Free</>
          }
        </button>
        {existingResult && (
          <button onClick={onGoToResults} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, color: "#555", fontSize: 13, padding: "13px 20px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>
            View Last Result →
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginTop: 16, padding: "14px 18px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 9, color: "#f87171", fontSize: 13, lineHeight: 1.65 }}>
          ⚠ {error}
        </div>
      )}

      {/* Feature chips */}
      <div style={{ marginTop: 40, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["✓ Scans data collection","✓ Detects legal traps","✓ Finds arbitration clauses","✓ Checks data-selling","✓ Monitors T&C changes","✓ 100% free — no account"].map((f) => (
          <div key={f} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "6px 14px", fontSize: 11, color: "#444", fontFamily: "'JetBrains Mono',monospace" }}>{f}</div>
        ))}
      </div>
    </div>
  );
}
