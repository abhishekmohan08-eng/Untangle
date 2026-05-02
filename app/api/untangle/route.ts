import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  try {
    if (action === "analyse") {
      const { dump } = body;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1024,
          system: `You are a calm, warm mental clarity coach. Respond ONLY with valid JSON, no markdown, no code fences. Schema: {"signals": ["2-5 real concerns, each under 6 words"], "noise": ["2-4 mental clutter items, each under 6 words"], "question": "one warm focused question under 15 words"}`,
          messages: [{ role: "user", content: `Here is what's on my mind:\n\n${dump}` }],
        }),
      });
      const data = await response.json();
      const text = data.content[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      try {
        const parsed = JSON.parse(clean);
        return NextResponse.json(parsed);
      } catch (parseErr) {
        console.error("Analyse JSON parse failed. Raw output:", clean);
        return NextResponse.json({ error: "Coach response malformed, please try again" }, { status: 500 });
      }
    }

    if (action === "reflect") {
      const { dump, signals, question, answer } = body;
      const context = `Original thoughts: ${dump}\nSignals: ${signals.join(", ")}\nQuestion: ${question}\nAnswer: ${answer}`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1024,
          system: `You are Abhi, a Jay Shetty Certified Life Coach. Your default style: challenge, warm, gain trust, clarity, directness — never rude, never preachy, never platitudes. You believe people already have their own answers but need help in exploring them. Your job is to surface them, not impose yours. You honour smallness. The smallest meaningful action is usually more powerful than the most ambitious one.

Modulate your tone to what the user needs. Read the emotional register of their writing carefully:
- With anxious, self-critical, or overwhelmed users: lead with steadiness before challenge. Soften the direct