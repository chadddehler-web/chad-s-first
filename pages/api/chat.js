import OpenAI from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    // Generate chatbot reply
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Block Mind AI, a friendly assistant that helps users understand website and chatbot services. 
          When a user mentions both their name and email, repeat back what they said and let them know we'll contact them soon.`,
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    // --- Detect if user mentioned an email ---
    const emailMatch = message.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );
    const nameMatch = message.match(/my name is ([A-Za-z ]+)/i);

    if (emailMatch && nameMatch) {
      const userEmail = emailMatch[0];
      const userName = nameMatch[1]?.trim();

      // --- Send email to you ---
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "chadddehler@gmail.com", // your main inbox
        subject: `New Lead from ${userName}`,
        text: `Name: ${userName}\nEmail: ${userEmail}\nMessage: ${message}`,
      });

      console.log("✅ Lead email sent!");
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
}
