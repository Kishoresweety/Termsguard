import { useState, useEffect, useCallback } from "react";
import { hashString } from "./utils.js";

import Header      from "./components/Header.jsx";
import Footer      from "./components/Footer.jsx";
import Toast       from "./components/Toast.jsx";

import HomeView      from "./pages/HomeView.jsx";
import ResultsView   from "./pages/ResultsView.jsx";
import MonitorView   from "./pages/MonitorView.jsx";
import ExtensionView from "./pages/ExtensionView.jsx";
import SupportView   from "./pages/SupportView.jsx";

const STORAGE_KEY = "termsguard:monitored";

export default function App() {
  const [view,      setView]      = useState("home");
  const [result,    setResult]    = useState(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [monitored, setMonitored] = useState([]);
  const [toastMsg,  setToastMsg]  = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMonitored(JSON.parse(saved));
    } catch {}
  }, []);

  const saveMonitored = useCallback((list) => {
    setMonitored(list);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
  }, []);

  const toast = useCallback((msg, ms = 3200) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), ms);
  }, []);

  const handleResult = (data, url) => {
    setResult(data);
    setSourceUrl(url || "");
    setView("results");
  };

  const handleAddMonitor = () => {
    if (!sourceUrl || !result) return;
    let domain = sourceUrl;
    try { domain = new URL(sourceUrl).hostname.replace("www.", ""); } catch {}
    if (monitored.find((m) => m.url === sourceUrl)) { toast("Already monitoring this site."); return; }
    saveMonitored([...monitored, {
      id:             Date.now(),
      url:            sourceUrl,
      domain,
      company:        result.company,
      overallRisk:    result.overallRisk,
      trustScore:     result.trustScore,
      addedAt:        new Date().toISOString(),
      lastChecked:    new Date().toISOString(),
      hash:           hashString(JSON.stringify(result)),
      status:         "watching",
      changeDetected: false,
    }]);
    toast("✓ Added to change monitor.");
  };

  const alertCount = monitored.filter((m) => m.changeDetected).length;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0c0e14" }}>
      <Header view={view} setView={setView} alertCount={alertCount} />

      <main style={{ flex: 1, maxWidth: 960, width: "100%", margin: "0 auto", padding: "38px 24px 70px" }}>
        {view === "home"      && <HomeView onResult={handleResult} existingResult={result} onGoToResults={() => setView("results")} />}
        {view === "results"   && <ResultsView result={result} sourceUrl={sourceUrl} onBack={() => setView("home")} onAddMonitor={handleAddMonitor} />}
        {view === "monitor"   && <MonitorView monitored={monitored} onSave={saveMonitored} onGoHome={() => setView("home")} toast={toast} />}
        {view === "extension" && <ExtensionView onGoSupport={() => setView("support")} />}
        {view === "support"   && <SupportView />}
      </main>

      <Footer />
      <Toast message={toastMsg} />
    </div>
  );
}
