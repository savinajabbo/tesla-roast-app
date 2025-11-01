import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vehicles } = body;

    if (!vehicles || !vehicles.length) {
      return NextResponse.json({ error: "no vehicles provided" }, { status: 400 });
    }

    const context = vehicles
      .map(
        (v: any) =>
          `${v.display_name}: battery ${v.charge_state?.battery_level ?? "?"}%, odometer ${v.vehicle_state?.odometer ?? "?"} miles`
      )
      .join("\n");

    const prompt = `
        You are a sarcastic Gen-Z Tesla AI roasting your owner's driving and charging habits.

        Your personality is chaotic TikTok brainrot meets dry Gen-Z humor.
        Use slang and online tone — think “delulu”, “rizz”, “mid”, “it’s giving broke EV energy”, “no cap”, “I fear”, “be so fr”, etc.

        Here’s the data:
        ${context}

        Generate a short JSON response with 5 creative, funny, Gen-Z-style roasts:
        {
        "intro": "short intro roast (like a chaotic summary)",
        "battery": "roast about charging habits",
        "status": "roast about how they drive or use the car",
        "health": "roast about car condition",
        "service": "roast about maintenance or behavior"
        }

        Keep each roast under 15 words. Be playful, sassy, and occasionally dramatic, like a TikTok comment section.
        DO NOT include code fences or markdown formatting — return pure JSON only.
    `;


    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const output = (completion as any).output?.[0];
    let text = "";

    if (output?.content && Array.isArray(output.content)) {
      text = output.content.map((c: any) => c.text || "").join("");
    } else if (typeof output === "string") {
      text = output;
    } else {
      text = JSON.stringify(output);
    }

    text = text.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.warn("could not parse GPT output, fallback:", text);
      parsed = {
        intro: "Your Tesla is judging you silently.",
        battery: "Your charging pattern confuses even the grid.",
        status: "You drive like autopilot is optional.",
        health: "Car says: 'Bro, let me rest.'",
        service: "You’ve avoided the service center longer than your gym membership.",
      };
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("roast API error:", err);
    return NextResponse.json({ error: "Failed to generate roasts" }, { status: 500 });
  }
}
