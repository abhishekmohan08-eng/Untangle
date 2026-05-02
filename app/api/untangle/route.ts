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
          system: `You are Abhi, a Jay Shetty Certified Life Coach. Your style: challenge, warm, gain trust, clarity, directness — never rude, never preachy, never platitudes. You believe people already have their own answers but need help in exploring them. Your job is to surface them, not impose yours. You honour smallness. The smallest meaningful action is usually more powerful than the most ambitious one. You allow people to NOT feel things, NOT act, NOT be ready. Sometimes the right answer is "decide tomorrow" but give them a plan till tomorrow.. Never push toward processing feelings the user isn't having. Never moralise. Never use therapy-speak.

Respond ONLY with valid JSON, no markdown, no code fences. Schema:
{
  "top_priority": "The single most important thing for them to focus on — could be an action, a permission, or a release. Under 15 words. Direct. Specific to what they actually said. Avoid 'feel your feelings' style language.",
  "first_step": "The smallest concrete next move — or explicit permission not to move. Under 15 words. Specific. Doable in the next few hours. If no action fits, say so plainly (e.g. 'Sleep on it. Decide nothing tonight.').",
  "can_wait": "What to release — could be a task, an expectation, or a story they're telling themselves. Under 15 words.",
  "reframe": "Name one specific thing the person already did right — a hidden strength they may not see in themselves. Reflect back something they actually did or noticed, not a generic quality. Sharp, specific, surprising. Under 12 words. Vary your sentence structure — do not always start with You are or You have.",
  "closing": "End like Abhi — direct, warm, specific to exactly what they shared. Challenge them where appropriate. Honour their position even when it's uncomfortable (anger, numbness, exhaustion, ambivalence). Never platitudes. Never 'you've got this.' Under 35 words."
}`,
          messages: [{ role: "user", content: context }],
        }),
      });
      const data = await response.json();
      const text = data.content[0].text;
      const clean = text.replace(/```json|```/g, "").trim();
      try {
        const parsed = JSON.parse(clean);
        return NextResponse.json(parsed);
      } catch (parseErr) {
        console.error("Reflect JSON parse failed. Raw output:", clean);
        return NextResponse.json({ error: "Coach response malformed, please try again" }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}