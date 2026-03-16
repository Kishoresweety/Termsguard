const PRINCIPLES = [
  ["✗", "No subscription ever",      "#ef4444"],
  ["✗", "No ads or tracking",        "#ef4444"],
  ["✗", "No user data collected",    "#ef4444"],
  ["✓", "Always free to use",        "#22c55e"],
  ["✓", "Donation-supported only",   "#22c55e"],
  ["✓", "Open & inspectable code",   "#22c55e"],
];

const FUNDS = [
  ["🤖", "Groq API compute costs"],
  ["⬡", "Browser extension development"],
  ["◎", "Change monitoring infrastructure"],
  ["🌐", "Hosting & domain costs"],
];

export default function SupportView() {
  const cardBase = { borderRadius: 14, padding: "30px 26px", cursor: "pointer", transition: "all 0.2s", height: "100%", textDecoration: "none", display: "block" };

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 10 }}>100% FREE TOOL</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, color: "#fff", fontWeight: 900, marginBottom: 14, lineHeight: 1.1 }}>Support TermsGuard</h2>
        <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, maxWidth: 520 }}>
          TermsGuard is completely free — no subscriptions, no ads, no data collection.
          If it has saved you from unknowingly signing away your rights, a small donation keeps it running.
        </p>
      </div>

      {/* Donation cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginBottom: 36 }}>
        <a href="https://buymeacoffee.com/kishore.ly" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ ...cardBase, background: "linear-gradient(135deg,rgba(255,213,0,0.07),rgba(255,213,0,0.02))", border: "1px solid rgba(255,213,0,0.2)" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(255,213,0,0.45)"; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(255,213,0,0.2)";  e.currentTarget.style.transform="translateY(0)"; }}>
            <div style={{ fontSize: 38, marginBottom: 16 }}>☕</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: "#ffd500", marginBottom: 10 }}>Buy Me a Coffee</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>International-friendly. Any amount, any currency, any time. No account needed.</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#ffd500", padding: "9px 14px", background: "rgba(255,213,0,0.08)", borderRadius: 6, display: "inline-block" }}>buymeacoffee.com/kishore.ly →</div>
          </div>
        </a>

        <a href="https://razorpay.me/@kishorely" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ ...cardBase, background: "linear-gradient(135deg,rgba(0,163,255,0.07),rgba(0,163,255,0.02))", border: "1px solid rgba(0,163,255,0.2)" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="rgba(0,163,255,0.45)"; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor="rgba(0,163,255,0.2)";  e.currentTarget.style.transform="translateY(0)"; }}>
            <div style={{ fontSize: 38, marginBottom: 16 }}>💙</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: "#00a3ff", marginBottom: 10 }}>Pay via Razorpay</div>
            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 20 }}>UPI, Net Banking, Debit/Credit Cards — all Indian payment methods supported.</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#00a3ff", padding: "9px 14px", background: "rgba(0,163,255,0.08)", borderRadius: 6, display: "inline-block" }}>razorpay.me/@kishorely →</div>
          </div>
        </a>
      </div>

      {/* What funds */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px 26px", marginBottom: 20 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 16 }}>WHAT YOUR DONATION FUNDS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {FUNDS.map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#555" }}><span>{icon}</span>{text}</div>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px 26px" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 16 }}>PRODUCT PRINCIPLES</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {PRINCIPLES.map(([icon, text, color]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#555" }}>
              <span style={{ color, fontWeight: 800, fontSize: 14 }}>{icon}</span>{text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
