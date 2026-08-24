// stripe-checkout.js
// Purpose: Handle checkout when user clicks "Enroll" (or "Gift") button
// Talks directly to the Supabase Edge Function that creates a real Stripe Checkout Session.

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51U1vazFFL4Z2ZGuxrcuBWbz2yZRPluWN3ILizYWlzuT37EVav4XBzRCQBA9uMu6VJbrAtWIl3j2KBNHmg1AeTNdy00WaPWHcjQ';
const SUPABASE_URL = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc';
const CHECKOUT_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/create-checkout-session`;

let supabaseClient = null;
let stripe = null;

function initializeStripe() {
    if (window.Stripe) {
        stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
        console.log('[Stripe] Initialized');
    }
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('[Supabase] Initialized for checkout');
    }
}

async function startCheckout(opts) {
    const {
        courseId, courseName, courseSlug,
        priceInCents, currency, plan, isGift
    } = opts;

    if (!stripe) {
        alert('Payment system not ready. Please refresh the page.');
        return;
    }

    let userEmail = null;
    try {
        if (supabaseClient) {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session && session.user) userEmail = session.user.email;
        }
    } catch (error) {
        console.error('[Checkout] Auth check failed:', error);
    }
    if (!userEmail) {
        userEmail = prompt('Please enter your email to continue:');
        if (!userEmail) return;
    }

    let giftRecipientEmail = null;
    let giftFromName = null;
    if (isGift) {
        giftRecipientEmail = prompt("Recipient's email address:");
        if (!giftRecipientEmail) return;
        giftFromName = prompt("Your name (shown to the recipient, optional):") || null;
    }

    try {
        const response = await fetch(CHECKOUT_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                courseId,
                courseName,
                courseSlug,
                priceInCents,
                currency: currency || 'usd',
                plan: plan || 'full_access',
                userEmail,
                isGift: !!isGift,
                giftRecipientEmail,
                giftFromName,
            }),
        });

        if (!response.ok) {
            const errBody = await response.json().catch(() => ({}));
            console.error('[Checkout] Session creation failed:', response.status, errBody);
            alert('Error creating checkout session. Please try again.');
            return;
        }

        const { url } = await response.json();
        if (url) {
            window.location.href = url;
        } else {
            alert('Could not start checkout. Please try again.');
        }
    } catch (error) {
        console.error('[Checkout] Error:', error);
        alert('An error occurred. Please try again. Error: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', initializeStripe);

window.initiateStripeCheckout = function (courseId, courseName, priceInCents) {
    return startCheckout({ courseId, courseName, courseSlug: courseId, priceInCents });
};

window.startCheckout = startCheckout;
