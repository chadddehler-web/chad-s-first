// pages/api/checkout.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { priceId } = req.body || {};

  if (!priceId) {
    return res.status(400).json({ error: "Price ID is required" });
  }

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    // Send back the session URL so the frontend can redirect
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
}
