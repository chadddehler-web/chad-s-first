export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { priceId } = req.body || {};
  if (typeof priceId !== "string" || !priceId.trim()) {
    return res.status(400).json({ error: "priceId is required" });
  }

  const url = `https://example.com/checkout?priceId=${encodeURIComponent(priceId)}`;

  return res.status(200).json({ url });
}
