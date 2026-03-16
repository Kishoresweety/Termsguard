import { RISK } from "../utils.js";

export default function ScoreRing({ score, risk, size = 100 }) {
  const c = RISK[risk] || RISK.low;
  return (
    <div style={{ textAlign: "center", flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${c.color} ${(score / 100) * 360}deg, rgba(255,255,255,0.05) 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", boxShadow: `0 0 28px ${c.glow}` }}>
        <div style={{ width: size * 0.76, height: size * 0.76, borderRadius: "50%", background: "#0c0e14", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <div style={{ fontSize: size * 0.24, fontWeight: 900, color: c.color, lineHeight: 1, fontFamily: "'Playfair Display',serif" }}>{score}</div>
          <div style={{ fontSize: 9, color: "#444", fontFamily: "'JetBrains Mono',monospace" }}>/ 100</div>
        </div>
      </div>
      <div style={{ fontSize: 10, color: "#444", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1.5px" }}>TRUST SCORE</div>
      <div style={{ fontSize: 12, color: c.color, fontWeight: 700, marginTop: 3 }}>{c.label} Risk</div>
    </div>
  );
}
