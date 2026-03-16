import { useState } from "react";
import { RISK, analyzeTerms, hashString } from "../utils.js";
import Pill from "../components/Pill.jsx";

export default function MonitorView({ monitored, onSave, onGoHome, toast }) {
  const [checkingId, setCheckingId] = useState(null);

  const recheckSite = async (entry) => {
    setCheckingId(entry.id);
    try {
      const newResult = await analyzeTerms({ url: entry.url, company: entry.domain });
      const newHash   = hashString(JSON.stringify(newResult));
      const changed   = newHash !== entry.hash;
      onSave(
        monitored.map((m) =>
          m.id === entry.id
            ? { ...m, lastChecked: new Date().toISOString(), hash: newHash, overallRisk: newResult.overallRisk, trustScore: newResult.trustScore, changeDetected: changed, status: changed ? "changed" : "watching" }
            : m
        )
      );
      toast(changed ? "⚠ Changes detected in Terms & Conditions!" : "✓ No changes detected.");
    } catch {
      toast("Could not re-check this site. It may be temporarily unavailable.");
    }
    setCheckingId(null);
  };

  const remove = (id) => { onSave(monitored.filter((m) => m.id !== id)); toast("Removed from monitor."); };

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 8 }}>CHANGE DETECTION</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: "#fff", fontWeight: 900, marginBottom: 8 }}>Terms Monitor</h2>
        <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, maxWidth: 540 }}>
          After analysing a URL, click <strong style={{ color: "#888" }}>Monitor Changes</strong> on the results page.
          Re-check any time to detect silent T&amp;C updates.
        </p>
      </div>

      {monitored.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.07)", borderRadius: 14, padding: "70px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 38, marginBottom: 16, opacity: 0.18 }}>◎</div>
          <div style={{ color: "#444", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, marginBottom: 20 }}>No sites monitored yet.</div>
          <button onClick={onGoHome} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 7, color: "#ef4444", fontSize: 12, padding: "9px 20px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>
            Analyse a site to start monitoring →
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {monitored.map((m) => {
            const c = RISK[m.overallRisk] || RISK.low;
            return (
              <div key={m.id} style={{ background: m.changeDetected ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.02)", border: m.changeDetected ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {m.changeDetected && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", animation: "pulse 1.4s ease infinite", flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{m.company || m.domain}</span>
                    <Pill risk={m.overallRisk} />
                    {m.changeDetected && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 8px", borderRadius: 4, animation: "pulse 1.4s ease infinite" }}>CHANGED!</span>}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#2e3140" }}>
                    <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "#3a3d46", textDecoration: "none" }}>{m.url.length > 60 ? m.url.slice(0,60)+"…" : m.url}</a>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#222", marginTop: 4 }}>
                    Added {new Date(m.addedAt).toLocaleDateString()} · Checked {new Date(m.lastChecked).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: c.color, lineHeight: 1 }}>{m.trustScore}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#333" }}>TRUST</div>
                </div>
                <div style={{ display: "flex", gap: 7, alignItems: "center", flexShrink: 0 }}>
                  <button
                    onClick={() => recheckSite(m)} disabled={checkingId === m.id}
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 7, color: checkingId===m.id?"#333":"#888", fontSize: 11, padding: "7px 13px", cursor: checkingId===m.id?"not-allowed":"pointer", fontFamily: "'JetBrains Mono',monospace", display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <span style={{ animation: checkingId===m.id?"spin 0.8s linear infinite":"none", display: "inline-block" }}>⟳</span>
                    {checkingId===m.id ? "Checking…" : "Re-check"}
                  </button>
                  <button onClick={() => remove(m.id)} style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 7, color: "#ef4444", fontSize: 11, padding: "7px 10px", cursor: "pointer", opacity: 0.6 }}
                    onMouseEnter={(e)=>(e.target.style.opacity="1")} onMouseLeave={(e)=>(e.target.style.opacity="0.6")}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
