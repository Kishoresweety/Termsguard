import { useState } from "react";
import { RISK, RISK_ORDER } from "../utils.js";
import Pill from "../components/Pill.jsx";
import ScoreRing from "../components/ScoreRing.jsx";

function FactBadge({ label, value, ok }) {
  const color = ok === true ? "#22c55e" : ok === false ? "#ef4444" : "#888";
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "10px 14px" }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#444", letterSpacing: "1.5px", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color }}>{ok === true ? "✓ " : ok === false ? "✗ " : "– "}{value}</div>
    </div>
  );
}

export default function ResultsView({ result, sourceUrl, onBack, onAddMonitor }) {
  const [filter, setFilter] = useState("all");
  if (!result) return (
    <div style={{ textAlign: "center", paddingTop: 90 }}>
      <div style={{ fontSize: 42, opacity: 0.2, marginBottom: 16 }}>⚡</div>
      <div style={{ color: "#444", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>
        No analysis yet. <button onClick={onBack} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>Analyse a document →</button>
      </div>
    </div>
  );

  const counts = (result.findings || []).reduce((a, f) => { a[f.risk] = (a[f.risk] || 0) + 1; return a; }, {});
  const shown  = filter === "all" ? (result.findings || []) : (result.findings || []).filter((f) => f.risk === filter);

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 10 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, color: "#555", fontSize: 12, padding: "7px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>← New Analysis</button>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {sourceUrl && (
            <button onClick={onAddMonitor} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, color: "#aaa", fontSize: 12, padding: "7px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>◎ Monitor Changes</button>
          )}
          <button onClick={() => { const b = new Blob([JSON.stringify(result,null,2)],{type:"application/json"}); const a = document.createElement("a"); a.href=URL.createObjectURL(b); a.download=`termsguard-${result.company||"report"}.json`; a.click(); }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, color: "#aaa", fontSize: 12, padding: "7px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>↓ Export JSON</button>
        </div>
      </div>

      {/* Verdict card */}
      <div style={{ background: `linear-gradient(135deg,${RISK[result.overallRisk]?.bg},rgba(12,14,20,0))`, border: `1px solid ${RISK[result.overallRisk]?.border}`, borderRadius: 14, padding: "26px 28px", marginBottom: 20, boxShadow: `0 0 50px ${RISK[result.overallRisk]?.glow}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 10 }}>ANALYSIS · {(result.company||"UNKNOWN").toUpperCase()}</div>
            <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontStyle: "italic", color: "#fff", lineHeight: 1.4, marginBottom: 14, fontWeight: 700 }}>"{result.verdict}"</blockquote>
            <p style={{ color: "#777", fontSize: 13.5, lineHeight: 1.7, marginBottom: 20 }}>{result.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
              <FactBadge label="3RD PARTY SHARING"   value={result.thirdPartySharing    ? "Yes — sells data"    : "Not indicated"   } ok={!result.thirdPartySharing}    />
              <FactBadge label="ARBITRATION CLAUSE"  value={result.hasArbitrationClause ? "Waives jury trial"   : "Not found"       } ok={!result.hasArbitrationClause} />
              <FactBadge label="AUTO-RENEWAL"        value={result.autoRenews           ? "Yes — auto-renews"  : "Not indicated"   } ok={!result.autoRenews}           />
              <FactBadge label="ACCOUNT DELETION"    value={result.canDeleteAccount     ? "You can delete"     : "Not guaranteed"  } ok={result.canDeleteAccount}      />
            </div>
          </div>
          <ScoreRing score={result.trustScore} risk={result.overallRisk} size={100} />
        </div>

        {/* Risk summary pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          {RISK_ORDER.filter((r) => counts[r]).map((r) => (
            <button key={r} onClick={() => setFilter(r)} style={{ background: RISK[r].bg, border: `1px solid ${RISK[r].border}`, borderRadius: 6, padding: "4px 13px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: RISK[r].color, fontSize: 14 }}>{RISK[r].icon}</span>
              <span style={{ color: RISK[r].color, fontWeight: 700, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{counts[r]}</span>
              <span style={{ color: "#555", fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>{RISK[r].label}</span>
            </button>
          ))}
        </div>

        {/* Data collected */}
        {result.dataCollected?.length > 0 && (
          <div style={{ marginTop: 18, padding: "13px 16px", background: "rgba(0,0,0,0.3)", borderRadius: 8, borderLeft: "3px solid #ef4444" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#ef4444", letterSpacing: "2px", marginBottom: 9 }}>DATA THEY COLLECT FROM YOU</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {result.dataCollected.map((d, i) => (
                <span key={i} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.16)", color: "#f87171", fontSize: 11, padding: "2px 9px", borderRadius: 4, fontFamily: "'JetBrains Mono',monospace" }}>{d}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {[["all", `All Issues (${result.findings?.length||0})`], ...RISK_ORDER.filter((r)=>counts[r]).map((r)=>[r,`${RISK[r].label} (${counts[r]})`])].map(([f,label])=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ background: filter===f ? (f==="all"?"rgba(255,255,255,0.08)":RISK[f]?.bg) : "rgba(255,255,255,0.02)", border: filter===f ? (f==="all"?"1px solid rgba(255,255,255,0.18)":`1px solid ${RISK[f]?.border}`) : "1px solid rgba(255,255,255,0.05)", borderRadius: 6, color: filter===f ? (f==="all"?"#ccc":RISK[f]?.color) : "#444", fontSize: 11, padding: "6px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", transition: "all 0.15s" }}>{label}</button>
        ))}
      </div>

      {/* Findings */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 26 }}>
        {shown.map((f, i) => {
          const c = RISK[f.risk] || RISK.low;
          return (
            <div key={f.id||i} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "20px 22px", position: "relative", overflow: "hidden", animation: "fadeIn 0.3s ease both", animationDelay: `${i*0.04}s` }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: c.color, borderRadius: "12px 0 0 12px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: c.color, fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>{f.title}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#444", letterSpacing: "1.5px", marginTop: 2 }}>{f.category}</div>
                  </div>
                </div>
                <Pill risk={f.risk} />
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, padding: "10px 14px", marginBottom: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: "#666", fontStyle: "italic", lineHeight: 1.65 }}>"{f.clause}"</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 13 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: c.color, letterSpacing: "1.5px", marginBottom: 5 }}>WHAT THIS MEANS</div>
                  <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.65 }}>{f.explanation}</p>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#f97316", letterSpacing: "1.5px", marginBottom: 5 }}>CONSEQUENCE TO YOU</div>
                  <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.65 }}>{f.consequence}</p>
                </div>
              </div>
              <div style={{ padding: "9px 14px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)", borderRadius: 6, fontSize: 12.5, color: "#888", lineHeight: 1.6 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#22c55e", letterSpacing: "1.5px", marginRight: 6 }}>💡 RECOMMENDATION</span>
                {f.recommendation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Positives */}
      {result.positives?.length > 0 && (
        <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 12, padding: "18px 22px" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#22c55e", letterSpacing: "2px", marginBottom: 13 }}>✓ USER-FRIENDLY CLAUSES FOUND</div>
          {result.positives.map((p, i) => (
            <div key={i} style={{ fontSize: 13, color: "#888", display: "flex", gap: 10, lineHeight: 1.65, marginBottom: 8 }}>
              <span style={{ color: "#22c55e", flexShrink: 0 }}>○</span>{p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
