import { RISK } from "../utils.js";

export default function Pill({ risk }) {
  const c = RISK[risk] || RISK.low;
  return (
    <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 20, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.8px", whiteSpace: "nowrap" }}>
      {c.label.toUpperCase()}
    </span>
  );
}
