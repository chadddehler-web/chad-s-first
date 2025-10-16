import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { plan } = req.body; // "starter", "business", or "growth"

  try {
    let setupFee = 0;
    let monthlyFee = 0;
    let planName = "";

    switch (plan) {
      case "starter":
        setupFee = 14900; // $149 setup
        monthlyFee = 4900; // $49/month
        planName = "Starter Plan";
        break;
      case "business":
        setupFee = 24900; // $249 setup
        monthlyFee = 8900; // $89/month
        planName = "Business Plan";
        break;
      case "growth":
        setupFee = 24900; // $249 setup
        monthlyFee = 14900; // $149/month
        planName = "Growth Plan";
        break;
      default:
        return res.status(400).json({ error: "Invalid plan" });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planName} Subscription`,
              description: `Monthly subscription for ${planName}`,
            },
            unit_amount: monthlyFee,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${planName} Setup Fee`,
              description: "One-time setup fee",
            },
            unit_amount: setupFee,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
}
