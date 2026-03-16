export default function Footer() {
  const link = { color: "#3a3d46", textDecoration: "none", transition: "color 0.15s" };
  const hover = (e) => (e.target.style.color = "#ef4444");
  const unhover = (e) => (e.target.style.color = "#3a3d46");

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, background: "rgba(255,255,255,0.008)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 22, height: 22, background: "linear-gradient(135deg,#ef4444,#b91c1c)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🛡</div>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#2e3140" }}>TermsGuard · AI Legal Shield</span>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#2a2d36", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        Built with ♥ by <span style={{ color: "#3a3d46", fontWeight: 700 }}>Kishore</span>
        &nbsp;·&nbsp;
        <a href="https://buymeacoffee.com/kishore.ly" target="_blank" rel="noopener noreferrer" style={link} onMouseEnter={hover} onMouseLeave={unhover}>Buy me a coffee</a>
        &nbsp;·&nbsp;
        <a href="https://razorpay.me/@kishorely" target="_blank" rel="noopener noreferrer" style={link} onMouseEnter={hover} onMouseLeave={unhover}>Razorpay</a>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#1e2028" }}>Free forever · No subscriptions · Powered by Groq AI</div>
    </footer>
  );
}
