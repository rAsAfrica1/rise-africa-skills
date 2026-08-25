import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY")!;
const SITE_URL = "https://www.riseafricaskills.com";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req: Request) => {
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
    const courseId = body.courseId;
    const courseName = body.courseName;
    const courseSlug = body.courseSlug;
    const priceInCents = body.priceInCents;
    const currency = body.currency;
    const plan = body.plan;
    const userEmail = body.userEmail;
    const isGift = body.isGift;
    const giftRecipientEmail = body.giftRecipientEmail;
    const giftFromName = body.giftFromName;

    if (!courseId || !priceInCents || !userEmail) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (isGift && !giftRecipientEmail) {
      return new Response(JSON.stringify({ error: "giftRecipientEmail required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const metadata: Record<string, string> = {
      course_id: courseId,
      course_name: courseName || courseId,
      course_slug: courseSlug || courseId,
      plan: plan || "course",
      user_email: userEmail,
      is_gift: isGift ? "true" : "false",
    };

    if (isGift) {
      metadata.gift_recipient_email = giftRecipientEmail;
      if (giftFromName) metadata.gift_from_name = giftFromName;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: userEmail,
      line_items: [{
        price_data: {
          currency: currency || "usd",
          product_data: { name: isGift ? courseName + " (Gift)" : courseName, tax_code: "txcd_10103001" },
          unit_amount: priceInCents,
        },
        quantity: 1,
      }],
      metadata,
      success_url: SITE_URL + "/index.html?paid=1",
      cancel_url: SITE_URL + "/index.html#courses",
    });

    return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("create-checkout-session error:", err);
    return new Response(JSON.stringify({ error: String(err && err.message || err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});


