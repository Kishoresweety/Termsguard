const MANIFEST = `{
  "manifest_version": 3,
  "name": "TermsGuard — AI T&C Analyser",
  "version": "1.0.0",
  "description": "Scan Terms & Conditions with AI. Know what you agree to.",
  "permissions": ["activeTab", "storage", "notifications"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon128.png"
  },
  "content_scripts": [{
    "matches": [
      "*://*/*terms*", "*://*/*privacy*",
      "*://*/*legal*",  "*://*/*tos*",
      "*://*/*eula*",   "*://*/*policy*"
    ],
    "js": ["content.js"],
    "run_at": "document_idle"
  }],
  "background": { "service_worker": "background.js" }
}`;

const FEATURES = [
  { icon: "⚡", title: "Auto-Detection",      desc: "Automatically detects when you land on a Terms, Privacy Policy, or EULA page — no manual action needed." },
  { icon: "🛡", title: "Instant Risk Badge",  desc: "Overlays a colour-coded risk score on the page before you scroll through 10,000 words of legalese." },
  { icon: "◈", title: "One-Click Analysis",  desc: "Click the extension icon for a full AI breakdown of every risky clause, without leaving the page." },
  { icon: "◎", title: "Change Alerts",       desc: "Browser notification when a service you monitor silently updates their Terms of Service." },
  { icon: "⬡", title: "Chrome & Firefox",    desc: "Built on Manifest V3 — works on Chrome, Edge, Brave, and Firefox." },
  { icon: "♡", title: "100% Free",           desc: "No subscriptions, no premium tier. The extension will always be free to install and use." },
];

export default function ExtensionView({ onGoSupport }) {
  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#444", letterSpacing: "2px", marginBottom: 8 }}>BROWSER INTEGRATION</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, color: "#fff", fontWeight: 900, marginBottom: 10 }}>TermsGuard Extension</h2>
        <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, maxWidth: 540 }}>
          Real-time alerts as you browse. TermsGuard scans T&amp;C pages automatically and warns you before you click "I Agree."
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14, marginBottom: 28 }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 22px", transition: "border-color 0.2s" }}
            onMouseEnter={(e)=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.14)")}
            onMouseLeave={(e)=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.07)")}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Code preview */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
          {["#ef4444","#eab308","#22c55e"].map((c)=><div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#333", marginLeft: 8 }}>manifest.json — Chrome Extension Starter</span>
        </div>
        <pre style={{ padding: "20px 22px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#777", lineHeight: 1.75, overflowX: "auto", background: "transparent", whiteSpace: "pre" }}>{MANIFEST}</pre>
      </div>

      <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 10, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>🚧</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Extension in Active Development</div>
          <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>The Chrome &amp; Firefox extension is being built. When published it will be completely free. Support via donation helps fund development costs.</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={onGoSupport} style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700, padding: "12px 22px", cursor: "pointer", fontFamily: "'Georgia',serif", boxShadow: "0 4px 18px rgba(239,68,68,0.25)" }}>♡ Support the Extension</button>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#888", fontSize: 13, padding: "12px 22px", textDecoration: "none", fontFamily: "'JetBrains Mono',monospace", display: "flex", alignItems: "center", gap: 6 }}>⬡ View on GitHub</a>
      </div>
    </div>
  );
}
