import OpenAI from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Setup Nodemailer transport (using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,     // Your Gmail
    pass: process.env.MAIL_PASS,     // Gmail App Password
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST requests allowed' });
    return;
  }

  const { message, name, email } = req.body;

  if (!message) {
    res.status(400).json({ error: 'No message provided' });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;

    // If user gave contact info, email it to you
    if (name && email) {
      await transporter.sendMail({
        from: '"Block Mind AI" <your_email@gmail.com>', // can be same as MAIL_USER
        to: "chadddehler@gmail.com",
        subject: "🧠 New Lead from Block Mind AI",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OpenAI API or Email error' });
  }
}
