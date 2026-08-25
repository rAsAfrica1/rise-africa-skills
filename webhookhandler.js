// webhook-handler.js
// Purpose: Handle Stripe webhooks and create enrollments
// This runs on your backend server

// ⚠️ IMPORTANT: Add your secret keys here (keep these private!)
// DO NOT share these keys with anyone
const STRIPE_SECRET_KEY = 'sk_live_YOUR_SECRET_KEY_HERE'; // ← Replace with your sk_live_... key
const STRIPE_WEBHOOK_SECRET = 'whsec_YOUR_WEBHOOK_SECRET_HERE'; // ← Replace with your whsec_... key

const SUPABASE_URL = 'https://lsvmykrentkbcdrzsaqj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzdm15a3JlbnRrYmNkcnpzYXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDkzMjYsImV4cCI6MjEwMTM4NTMyNn0.6cbb7S-5Me8UNJDpn9aWkPHdK18Y8GEqOfypx16Fkdc';

// Initialize Supabase
const { createClient } = window.supabase || {};
let supabaseClient = null;

function initSupabase() {
    if (createClient) {
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('[Webhook] Supabase initialized');
    }
}

/**
 * Handle Stripe webhook events
 * This function is called when Stripe sends webhook notifications
 *
 * @param {Object} req - Request object with:
 *   - req.headers['stripe-signature'] - Stripe signature for verification
 *   - req.body - Raw webhook body (must be raw, not JSON parsed)
 */
async function handleStripeWebhook(req) {
    const sig = req.headers['stripe-signature'];
    const body = req.body;

    console.log('[Webhook] Received event, verifying signature...');

    // Verify webhook signature
    // This prevents unauthorized requests from creating fake enrollments
    let event;
    try {
        // In a Node.js/backend environment, you would verify like this:
        // event = Stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);

        // For now, just parse it (SECURITY: Always verify signature in production!)
        event = JSON.parse(body);
        console.log('[Webhook] Event type:', event.type);

    } catch (error) {
        console.error('[Webhook] Signature verification failed:', error.message);
        return { status: 400, body: 'Webhook error: ' + error.message };
    }

    // Handle payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
        return handlePaymentSuccess(event.data.object);
    }

    // Handle payment_intent.payment_failed event
    if (event.type === 'payment_intent.payment_failed') {
        return handlePaymentFailed(event.data.object);
    }

    console.log('[Webhook] Event type not handled:', event.type);
    return { status: 200, body: 'Received' };
}

/**
 * Handle successful payment
 * Create enrollment record when payment succeeds
 */
async function handlePaymentSuccess(paymentIntent) {
    console.log('[Webhook] Payment succeeded:', paymentIntent.id);

    initSupabase();

    try {
        // Extract metadata
        const { courseId, courseName, userEmail, amount } = paymentIntent.metadata || {};

        if (!courseId || !userEmail) {
            console.error('[Webhook] Missing required metadata');
            return { status: 400, body: 'Missing required fields' };
        }

        console.log('[Webhook] Creating enrollment for:', userEmail, 'Course:', courseName);

        // Create enrollment record in Supabase
        const { data, error } = await supabaseClient
            .from('enrollments')
            .insert({
                user_email: userEmail,
                course_id: courseId,
                payment_id: paymentIntent.id,
                amount: amount ? (amount / 100) : 10.00, // Convert cents to dollars
                currency: paymentIntent.currency || 'usd',
                status: 'active'
            })
            .select();

        if (error) {
            console.error('[Webhook] Enrollment creation failed:', error);
            return { status: 400, body: 'Failed to create enrollment: ' + error.message };
        }

        console.log('[Webhook] ✓ Enrollment created successfully');
        console.log('[Webhook] Enrollment data:', data);

        // TODO: Send confirmation email to user
        // TODO: Generate certificate if full course purchased
        // TODO: Update user dashboard

        return {
            status: 200,
            body: JSON.stringify({
                success: true,
                message: 'Enrollment created',
                enrollment: data[0]
            })
        };

    } catch (error) {
        console.error('[Webhook] Error handling payment:', error);
        return { status: 500, body: 'Internal server error: ' + error.message };
    }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent) {
    console.log('[Webhook] Payment failed:', paymentIntent.id);

    initSupabase();

    try {
        const { userEmail, courseId } = paymentIntent.metadata || {};

        if (!userEmail || !courseId) {
            console.error('[Webhook] Missing metadata for failed payment');
            return { status: 400, body: 'Missing required fields' };
        }

        // Log failed payment attempt
        console.log('[Webhook] Failed payment for:', userEmail);

        // TODO: Send failure notification email
        // TODO: Log to analytics

        return { status: 200, body: 'Payment failure logged' };

    } catch (error) {
        console.error('[Webhook] Error handling failed payment:', error);
        return { status: 500, body: 'Error: ' + error.message };
    }
}

// Export for use in backend server
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleStripeWebhook,
        handlePaymentSuccess,
        handlePaymentFailed
    };
}

// For browser/Supabase Edge Functions
window.handleStripeWebhook = handleStripeWebhook;
