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
    // --- Chatbot behavior ---
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are **Block Mind AI**, a friendly and professional assistant representing Block Mind AI.

Your ONLY job is to talk about:
- Custom Websites
- AI Chatbots
- The three service plans:
  1. Starter Plan – $149 setup + $99/month (chatbot integration only)
  2. Business Plan – $249 setup + $149/month (custom website + chatbot)
  3. Growth Plan – $249 setup + $279/month (website + chatbot + SEO + lead generation + ads)

If a user asks about anything outside of these topics, politely say:
"I'm here to help you learn about our Custom Websites and AI Chatbot plans. 
Could I have your name and email so our team can reach out with more info?"

When a user provides both their name and email, respond with:
"Thanks, [Name]! We’ll reach out to you soon with more details about our plans."

Always stay professional, positive, and focused on Block Mind AI’s services. 
Never discuss unrelated topics or opinions.`,
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    // --- Detect if user mentioned an email ---
    const emailMatch = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const nameMatch = message.match(/my name is ([A-Za-z ]+)/i);

    if (emailMatch && nameMatch) {
      const userEmail = emailMatch[0];
      const userName = nameMatch[1]?.trim();

      // --- Send lead email ---
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: "contact@blockmindai.org",
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
