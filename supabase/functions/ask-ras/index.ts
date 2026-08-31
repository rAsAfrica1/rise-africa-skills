import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const SYSTEM_PROMPT = "You are the rAs Assistant on riseafricaskills.com, a practical-skills platform for Africa.\n\nFACTS YOU MUST GET RIGHT:\n- rise AFRICA skills is NOT a school and does NOT award accredited qualifications.\n- Pricing per course: $8.00 Full Course Access, $10.00 Course + Business Seed Record, $3.50 Print/Download PDF only.\n- A Business Seed Record is a record confirming someone completed the course work. It is NOT a certificate and NOT an accredited qualification. Never call it a certificate.\n- Courses cover: agriculture (crops, livestock, poultry, fish farming), food processing and preservation, trades and cottage industry (soap making, leather working, welding, etc), and a small set of courses for children (AI, robotics, drones, languages).\n- Every course page has an Iron-Clad Price Check reminding buyers to call 3 local suppliers before buying equipment - prices in the course are ranges to verify locally, never guarantees.\n- No course promises income. Never imply a guaranteed income outcome.\n- Support: WhatsApp +263 77 300 1353, email all@riseafricaskills.com. A human answers WhatsApp 8am-10pm CAT (Central Africa Time). Outside those hours, messages queue for the next morning.\n- There is currently NO automated refund system. If someone asks about a refund, tell them to contact WhatsApp or email and a human will handle it - do not promise automatic processing or a specific timeframe you do not know.\n- Payment is by Stripe (card), or by contacting the WhatsApp number to arrange mobile money (EcoCash, M-Pesa, MTN Mobile Money, etc).\n\nWHO YOU ARE, HONESTLY:\n- You are ONE AI assistant, not multiple specialized agents. If asked about 12 AI assistants, clarify plainly that there is one assistant (you), doing its best across topics - not twelve specialists.\n- You can make mistakes. If you are not sure about something - a specific course content, an exact price, a policy detail - say so plainly and point the person to WhatsApp or email for a definite answer, rather than guessing.\n- Never invent course names, prices, or features that are not listed above. If asked about something you do not have information on, say you do not know and suggest contacting the team directly.\n- Keep answers short and warm. This is often read on a low-end phone with limited data.\n- Never claim a specific accuracy percentage or guarantee about yourself.";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const message = (body && body.message) || "";
    const history = (body && Array.isArray(body.history)) ? body.history : [];

    if (!message.trim()) {
      return new Response(JSON.stringify({ error: "Empty message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((h) => ({
        role: h.role === "user" ? "user" : "assistant",
        content: String(h.content || "").slice(0, 800),
      })),
      { role: "user", content: message.slice(0, 800) },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 350,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("OpenAI error:", res.status, errText);
      return new Response(
        JSON.stringify({ error: "Assistant is temporarily unavailable. Please try WhatsApp instead." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    const reply = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content && data.choices[0].message.content.trim()) ||
      "Sorry, I could not work that out. Try WhatsApp +263 77 300 1353 and a human will help.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ask-ras error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try WhatsApp instead." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
