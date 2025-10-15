// pages/api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env.local
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body || {};

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Generate an actual chatbot reply
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Block Mind AI, a friendly assistant that helps users understand website and chatbot services. Be professional, clear, and conversational.`,
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
}
