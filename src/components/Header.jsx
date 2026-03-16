const NAV = [
  { id: "home",      icon: "⚡", label: "Analyze"   },
  { id: "monitor",   icon: "◎", label: "Monitor"   },
  { id: "extension", icon: "⬡", label: "Extension" },
  { id: "support",   icon: "♡", label: "Support"   },
];

export default function Header({ view, setView, alertCount }) {
  return (
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(12,14,20,0.97)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 100, gap: 12, flexWrap: "wrap" }}>
      {/* Logo */}
      <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#ef4444,#b91c1c)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, boxShadow: "0 0 18px rgba(239,68,68,0.3)", flexShrink: 0 }}>🛡</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px", lineHeight: 1 }}>TermsGuard</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "#3a3d46", letterSpacing: "2px" }}>AI LEGAL SHIELD</div>
        </div>
      </button>

      {/* Nav */}
      <nav style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {NAV.map((n) => {
          const active = view === n.id;
          const badge  = n.id === "monitor" && alertCount > 0 ? alertCount : null;
          return (
            <button key={n.id} onClick={() => setView(n.id)} style={{ background: active ? "rgba(239,68,68,0.12)" : "transparent", border: active ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent", borderRadius: 7, color: active ? "#ef4444" : "#555", fontSize: 12, padding: "7px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
              <span style={{ fontSize: 13 }}>{n.icon}</span>
              {n.label}
              {badge && <span style={{ background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{badge}</span>}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
