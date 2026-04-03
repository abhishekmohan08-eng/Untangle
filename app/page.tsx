"use client";

import { useState } from "react";

type Stage = "dump" | "loading-analysis" | "analysis" | "loading-reflection" | "reflection";

interface Analysis {
  signals: string[];
  noise: string[];
  question: string;
}

interface Reflection {
  top_priority: string;
  first_step: string;
  can_wait: string;
  reframe: string;
  closing: string;
}

export default function UntanglePage() {
  const [stage, setStage] = useState<Stage>("dump");
  const [dumpText, setDumpText] = useState("");
  const [focusAnswer, setFocusAnswer] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [error, setError] = useState("");

  async function handleUntangle() {
    if (!dumpText.trim() || dumpText.trim().length < 10) {
      setError("Please write a little more — what's really going on?");
      return;
    }
    setError("");
    setStage("loading-analysis");
    try {
      const res = await fetch("/api/untangle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyse", dump: dumpText }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setAnalysis(data);
      setStage("analysis");
    } catch {
      setError("Something went wrong — please try again.");
      setStage("dump");
    }
  }

  async function handleReflect() {
    if (!focusAnswer.trim()) {
      setError("Please write a brief answer before continuing.");
      return;
    }
    setError("");
    setStage("loading-reflection");
    try {
      const res = await fetch("/api/untangle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reflect",
          dump: dumpText,
          signals: analysis?.signals,
          question: analysis?.question,
          answer: focusAnswer,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setReflection(data);
      setStage("reflection");
    } catch {
      setError("Something went wrong — please try again.");
      setStage("analysis");
    }
  }

  function startOver() {
    setDumpText("");
    setFocusAnswer("");
    setAnalysis(null);
    setReflection(null);
    setError("");
    setStage("dump");
  }

  const stepIndex = { dump: 0, "loading-analysis": 0, analysis: 1, "loading-reflection": 1, reflection: 2 }[stage];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.brandDot} />
          <span style={styles.brandName}>Untangle</span>
          <span style={styles.tagline}>Find your clarity</span>
        </div>

        <div style={styles.stepRow}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              ...styles.stepDot,
              ...(i < stepIndex ? styles.stepDone : {}),
              ...(i === stepIndex ? styles.stepActive : {}),
            }} />
          ))}
        </div>

        {(stage === "dump" || stage === "loading-analysis") && (
          <div>
            <h1 style={styles.title}>
              What's weighing on your <em style={styles.titleEm}>mind</em> right now?
            </h1>
            <p style={styles.sub}>
              This is your safe space. Allow yourself to be open — clarity starts here.
            </p>
            <textarea
              style={styles.textarea}
              placeholder="I'm thinking about work deadlines, a difficult conversation I need to have, whether I'm spending enough time with my family…"
              value={dumpText}
              onChange={(e) => setDumpText(e.target.value)}
              maxLength={1000}
              disabled={stage === "loading-analysis"}
            />
            <div style={styles.charHint}>{dumpText.length} / 1000</div>
            {error && <div style={styles.errorBox}>{error}</div>}
            <button
              style={{ ...styles.btnPrimary, ...(stage === "loading-analysis" ? styles.btnDisabled : {}) }}
              onClick={handleUntangle}
              disabled={stage === "loading-analysis"}
            >
              {stage === "loading-analysis" ? "Untangling…" : "Untangle this →"}
            </button>
          </div>
        )}

        {(stage === "analysis" || stage === "loading-reflection") && analysis && (
          <div>
            <h2 style={{ ...styles.title, fontSize: "26px" }}>
              Here's what I <em style={styles.titleEm}>see</em>
            </h2>
            <p style={styles.sub}>I've separated real concerns from mental clutter.</p>

            <div style={styles.card}>
              <div style={styles.cardLabel}>Signal — real things worth your attention</div>
              <div style={styles.tagRow}>
                {analysis.signals.map((s, i) => (
                  <span key={i} style={{ ...styles.tag, ...styles.tagSignal }}>{s}</span>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <div style={{ ...styles.cardLabel, color: "#c4875a" }}>Noise — mental clutter to let go of</div>
              <div style={styles.tagRow}>
                {analysis.noise.map((n, i) => (
                  <span key={i} style={{ ...styles.tag, ...styles.tagNoise }}>{n}</span>
                ))}
              </div>
            </div>

            <div style={styles.divider} />

            <p style={styles.question}>{analysis.question}</p>
            <textarea
              style={styles.textarea}
              placeholder="Write your answer here…"
              value={focusAnswer}
              onChange={(e) => setFocusAnswer(e.target.value)}
              disabled={stage === "loading-reflection"}
            />
            {error && <div style={styles.errorBox}>{error}</div>}
            <button
              style={{ ...styles.btnPrimary, ...(stage === "loading-reflection" ? styles.btnDisabled : {}) }}
              onClick={handleReflect}
              disabled={stage === "loading-reflection"}
            >
              {stage === "loading-reflection" ? "Creating reflection…" : "Continue →"}
            </button>
          </div>
        )}

        {stage === "reflection" && reflection && (
          <div>
            <h2 style={{ ...styles.title, fontSize: "26px" }}>
              Your <em style={styles.titleEm}>clarity</em> snapshot
            </h2>
            <p style={styles.sub}>Here's a clear view of where you stand right now.</p>

            <div style={styles.reflectionGrid}>
              {[
                { label: "Top priority", val: reflection.top_priority, accent: true },
                { label: "Your insight", val: reflection.reframe },
                { label: "First step", val: reflection.first_step },
                { label: "Let this go", val: reflection.can_wait },
              ].map((item, i) => (
                <div key={i} style={styles.reflectionCard}>
                  {item.accent && <div style={styles.priorityBadge}>Focus here</div>}
                  <div style={styles.reflectionMeta}>{item.label}</div>
                  <div style={styles.reflectionVal}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ ...styles.card, borderColor: "#8fb5ac", marginTop: "1.5rem" }}>
              <div style={styles.cardLabel}>From your coach</div>
              <p style={styles.closingThought}>{reflection.closing}</p>
            </div>

            <div style={styles.btnRow}>
              <button style={styles.btnPrimary} onClick={startOver}>
                Start fresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f7f4ef", fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" },
  container: { maxWidth: 680, margin: "0 auto", padding: "5rem 2rem 5rem" },
  brand: { display: "flex", alignItems: "baseline", gap: 10, marginBottom: "3rem" },
  brandDot: { width: 7, height: 7, borderRadius: "50%", background: "#4a7c6f", marginBottom: 4 },
  brandName: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: "#1a1a18", letterSpacing: -0.5 },
  tagline: { fontSize: 12, color: "#9a9a94", fontWeight: 300, letterSpacing: "0.5px", textTransform: "uppercase", marginLeft: "auto" },
  stepRow: { display: "flex", gap: 6, marginBottom: "2.5rem" },
  stepDot: { width: 6, height: 6, borderRadius: "50%", background: "#e8e3da", transition: "all 0.3s" },
  stepDone: { background: "#8fb5ac" },
  stepActive: { background: "#4a7c6f", width: 20, borderRadius: 3 },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, lineHeight: 1.3, marginBottom: 8 },
  titleEm: { fontStyle: "italic", color: "#4a7c6f" },
  sub: { fontSize: 15, color: "#5a5a55", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.6 },
  textarea: { width: "100%", minHeight: 160, padding: "1.25rem", border: "1.5px solid #e8e3da", borderRadius: 12, background: "white", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300, color: "#1a1a18", lineHeight: 1.7, resize: "none", outline: "none", boxSizing: "border-box" },
  charHint: { fontSize: 12, color: "#9a9a94", marginTop: 6, marginBottom: 4 },
  errorBox: { background: "#fdf3ec", border: "1px solid #f0c4a0", borderRadius: 10, padding: "0.75rem 1rem", fontSize: 14, color: "#c4875a", marginTop: "0.75rem" },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1.25rem", padding: "14px 28px", background: "#4a7c6f", color: "white", border: "none", borderRadius: 100, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", letterSpacing: "0.2px" },
  btnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  btnRow: { display: "flex", gap: 10, marginTop: "1.5rem", flexWrap: "wrap" },
  card: { background: "white", border: "1.5px solid #e8e3da", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" },
  cardLabel: { fontSize: 10, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9a9a94", marginBottom: 10 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  tag: { padding: "6px 14px", borderRadius: 100, fontSize: 13, fontWeight: 400 },
  tagSignal: { background: "#e8f0ee", color: "#2d6b5a" },
  tagNoise: { background: "#fdf3ec", color: "#8f5a30" },
  divider: { border: "none", borderTop: "1px solid #e8e3da", margin: "2rem 0" },
  question: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: "#1a1a18", lineHeight: 1.4, marginBottom: "1.5rem" },
  reflectionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: "1rem" },
  reflectionCard: { background: "white", border: "1.5px solid #e8e3da", borderRadius: 12, padding: "1rem 1.25rem" },
  priorityBadge: { display: "inline-block", background: "#4a7c6f", color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 100, marginBottom: 8, fontWeight: 500 },
  reflectionMeta: { fontSize: 10, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9a9a94", marginBottom: 6 },
  reflectionVal: { fontSize: 15, fontWeight: 400, color: "#1a1a18", lineHeight: 1.4 },
  closingThought: { fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: "italic", lineHeight: 1.6, color: "#1a1a18", margin: 0 },
};