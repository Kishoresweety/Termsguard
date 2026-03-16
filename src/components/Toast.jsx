export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, background: "#1a1d24", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9, padding: "12px 18px", fontSize: 13, color: "#ddd", fontFamily: "'JetBrains Mono',monospace", zIndex: 9999, animation: "toastIn 0.25s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.55)", maxWidth: 320, lineHeight: 1.5 }}>
      {message}
    </div>
  );
}
