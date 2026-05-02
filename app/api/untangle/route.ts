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
      const parsed = JSON.parse(clean);
      return NextResponse.json(parsed);
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
          system: `You are a warm mental clarity coach. Respond ONLY with valid JSON, no markdown, no code fences. Schema: {"top_priority": "under 8 words", "first_step": "under 10 words", "can_wait": "under 8 words","reframe":"Name one specific thing the person already did right — a hidden strength they may not see in themselves. Reflect back something they actually did or noticed, not a generic quality. Sharp, specific, surprising. Under 12 words. Vary your sentence structure — do not always start with You are or You have.", "closing": "end like Abhi — a Jay Shetty certified life coach who believes people already have the answers within them. You filter the noise, find what dominates, and trust the person to act. Warm, direct, specific to exactly what they shared. Never a platitude. Under 30 words."}`,
          messages: [{ role: "user", content: context }],
        }),
      });
      const data = await response.json();
      const text = data.content[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      return NextResponse.json(parsed);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}