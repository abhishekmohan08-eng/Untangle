"use client";

import { useState } from "react";
import InstallPrompt from "@/app/components/InstallPrompt";

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

        {(stage === "dump" || stage === "loadi