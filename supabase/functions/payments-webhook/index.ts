import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import Stripe from "https://esm.sh/stripe@13?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function handleCors(req) {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  return null;
}

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SITE_URL = "https://www.riseafricaskills.com";
const FROM_EMAIL = "rise AFRICA skills <courses@riseafricaskills.com>";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function mapTier(plan) {
  return "premium";
}

async function sendCourseEmail(opts) {
  const { to, courseName, courseUrl, isGift, fromNote } = opts;
  const subject = isGift ? "You've been gifted a course: " + courseName : "Your course is ready: " + courseName;
  const html = '<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">' +
    '<h2 style="color:#1a1a1a;">' + (isGift ? "You've received a gift" : "You're enrolled!") + '</h2>' +
    '<p>' + (isGift ? ("Someone thought of you" + (fromNote ? " (" + fromNote + ")" : "") + " and gifted you a course on rise AFRICA skills.") : "Thanks for your payment — your course is ready to start right now.") + '</p>' +
    '<p style="font-size:18px; font-weight:bold; margin: 20px 0 8px;">' + courseName + '</p>' +
    '<a href="' + courseUrl + '" style="display:inline-block; background:#b8860b; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">Start your course</a>' +
    '<p style="margin-top:24px; font-size:13px; color:#666;">If the button does not work, copy this link:<br><a href="' + courseUrl + '">' + courseUrl + '</a></p>' +
    '<p style="margin-top:24px; font-size:13px; color:#666;">rise AFRICA skills — this is not a certificate, and we never call it one.</p></div>';
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": "Bearer " + RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Resend error " + res.status + ": " + errText);
  }
}

serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing stripe-signature" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let event;
  const body = await req.text();
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Signature verification failed:", err.message);
    return new Response(JSON.stringify({ error: "Webhook Error: " + err.message }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  console.log("Received Stripe event: " + event.type + " | ID: " + event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckout(event.data.object);
        break;
      }
      case "payment_intent.succeeded": {
        await handlePaymentIntent(event.data.object);
        break;
      }
      default:
        console.log("Unhandled event type: " + event.type);
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

async function processPurchase(params) {
  const transactionId = params.transactionId;
  const amount = params.amount;
  const currency = params.currency;
  const metadata = params.metadata;
  const buyerEmail = params.buyerEmail;

  const course_slug = (metadata && (metadata.course_id || metadata.course_slug)) || null;
  const course_name = (metadata && metadata.course_name) || "Your course";
  const plan = (metadata && metadata.plan) || "course";
  const is_gift = metadata && metadata.is_gift === "true";
  const gift_recipient_email = (metadata && metadata.gift_recipient_email) || null;
  const gift_from_name = (metadata && metadata.gift_from_name) || null;
  const recipient_email = is_gift ? gift_recipient_email : ((metadata && metadata.user_email) || buyerEmail);

  if (!course_slug || !recipient_email) {
    console.warn("Missing course_slug or recipient email — cannot enroll", { course_slug, recipient_email, metadata });
    return;
  }

  const existing = await supabase.from("payments").select("id").eq("transaction_id", transactionId).maybeSingle();
  if (existing.data) {
    console.log("Transaction " + transactionId + " already processed. Skipping.");
    return;
  }

  const courseRow = await supabase.from("courses").select("id").eq("id", course_slug).maybeSingle();
  if (courseRow.error || !courseRow.data) {
    console.error("No matching course for slug:", course_slug, courseRow.error);
    return;
  }

  let user_id = null;
  const existingUser = await supabase.from("profiles").select("id").eq("email", recipient_email).maybeSingle();
  if (existingUser.data) user_id = existingUser.data.id;

  const paymentInsert = await supabase.from("payments").insert({
    user_id,
    course_id: course_slug,
    amount,
    currency: (currency || "usd").toUpperCase(),
    payment_method: "stripe",
    status: "completed",
    transaction_id: transactionId,
  });
  if (paymentInsert.error) {
    console.error("Failed to insert payment:", paymentInsert.error);
    throw paymentInsert.error;
  }

  const enrollInsert = await supabase.from("enrollments").upsert({
    user_id,
    user_email: recipient_email,
    course_id: course_slug,
    status: "active",
    tier: mapTier(plan),
    progress_percent: 0,
    is_gift,
    gift_from_name,
  }, { onConflict: "user_email,course_id" });
  if (enrollInsert.error) {
    console.error("Failed to create enrollment:", enrollInsert.error);
    throw enrollInsert.error;
  }

  const courseUrl = SITE_URL + "/" + course_slug + "-course.html";
  try {
    await sendCourseEmail({ to: recipient_email, courseName: course_name, courseUrl, isGift: is_gift, fromNote: gift_from_name || undefined });
  } catch (emailErr) {
    console.error("Email send failed but enrollment succeeded:", emailErr);
  }

  console.log("Enrollment + payment recorded for " + recipient_email + ", course " + course_slug);
}

async function handleCheckout(session) {
  await processPurchase({
    transactionId: session.id,
    amount: session.amount_total ? session.amount_total / 100 : 0,
    currency: session.currency || "usd",
    metadata: session.metadata,
    buyerEmail: session.customer_email,
  });
}

async function handlePaymentIntent(intent) {
  await processPurchase({
    transactionId: intent.id,
    amount: intent.amount ? intent.amount / 100 : 0,
    currency: intent.currency || "usd",
    metadata: intent.metadata,
    buyerEmail: intent.receipt_email,
  });
}

