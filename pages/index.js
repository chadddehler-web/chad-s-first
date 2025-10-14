// pages/index.js
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const appendMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    appendMessage(input, "user");
    setInput("");
    appendMessage("Block Mind AI is typing...", "bot");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender === "bot" && msg.text === "Block Mind AI is typing..."
            ? { text: data.reply, sender: "bot" }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender === "bot" && msg.text === "Block Mind AI is typing..."
            ? { text: "Error: Could not get response", sender: "bot" }
            : msg
        )
      );
    }
  };

  const handleCheckout = async (priceId) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Checkout error. Please try again.");
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-orange-600 text-white flex justify-between items-center p-4 sticky top-0 z-50">
        <h1 className="text-xl m-0">Block Mind AI</h1>
        <ul className="flex gap-5 m-0 p-0 list-none">
          <li>
            <a href="#home" className="hover:text-yellow-100 font-medium">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-yellow-100 font-medium">
              Why Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-yellow-100 font-medium">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-orange-600 to-orange-400 text-white text-center py-20 px-5">
        <h2 className="text-5xl mb-4">Custom Websites + AI Chatbots That Work</h2>
        <p className="text-lg font-light max-w-xl mx-auto">
          <em>“Professional websites built to convert — powered by AI.”</em>
        </p>
        <p className="mt-5 max-w-xl mx-auto">
          We create stunning custom websites that come with an AI chatbot built to
          generate leads 24/7. Every site is designed from scratch and refined until
          you’re 100% satisfied.
        </p>
      </header>

      {/* Selling Points Section */}
      <section id="about" className="py-16 max-w-5xl mx-auto px-5">
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            {
              icon: "https://img.icons8.com/ios-filled/80/ff8c00/laptop.png",
              title: "💻 Custom Website Design",
              desc: "Every site is built from scratch, tailored to your business, and refined until you’re 100% satisfied.",
            },
            {
              icon: "https://img.icons8.com/ios-filled/80/ff8c00/artificial-intelligence.png",
              title: "🤖 AI Chatbot Integration",
              desc: "Your chatbot captures leads automatically and sends them directly to your inbox — day or night.",
            },
            {
              icon: "https://img.icons8.com/ios-filled/80/ff8c00/graph.png",
              title: "📈 Convert Visitors Into Clients",
              desc: "Optimized to convert visitors into real customers, increasing your business growth.",
            },
            {
              icon: "https://img.icons8.com/ios-filled/80/ff8c00/customer-support.png",
              title: "💬 Ongoing Support",
              desc: "Keep your website and AI chatbot updated with continuous maintenance and support.",
            },
          ].map((point, i) => (
            <div
              key={i}
              className="flex-1 max-w-xs bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 shadow-lg text-center hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <img src={point.icon} alt={point.title} className="w-15 h-15 mb-4 mx-auto" />
              <h4 className="text-lg font-semibold mb-2">{point.title}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mt-16 px-5">
        <h3 className="text-3xl mb-2">Ready to get started?</h3>
        <p>Pick the option that fits you best and launch your AI-powered site today.</p>
        <div className="mt-4 flex flex-col gap-4 items-center">
          <button
            className="bg-orange-600 text-white px-10 py-3 rounded hover:bg-orange-500"
            onClick={() => handleCheckout("price_1SI376GfhzKDLKRCnQRwArFN")}
          >
            Buy AI Chatbot – $75 setup + $199/mo
          </button>
          <button
            className="bg-orange-600 text-white px-10 py-3 rounded hover:bg-orange-500"
            onClick={() => handleCheckout("price_1SIAttGfhzKDLKRC49oSkZtJ")}
          >
            Buy Website + Chatbot – $249 setup + $199/mo
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-5 text-center max-w-3xl mx-auto">
        <h3 className="text-3xl mb-2">Contact Us</h3>
        <p>
          Email us at <strong>contact@blockmindai.org</strong> or reach out on
          Telegram: <strong>@blockmindai</strong>
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-16 text-sm">
        © 2025 Block Mind AI • Custom Websites + AI Chatbots.
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-5 right-5 w-80 shadow-lg rounded-lg overflow-hidden z-50 font-sans">
        <div className="bg-orange-600 text-white font-semibold text-center p-3 cursor-pointer">
          💬 Chat With Us
        </div>
        <div className="bg-gray-50 flex flex-col max-h-96">
          <div className="overflow-y-auto p-2 flex-1">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-4/5 my-2 p-2 rounded-lg ${
                  msg.sender === "user" ? "bg-orange-600 text-white ml-auto" : "bg-gray-200 text-gray-900 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form className="flex border-t border-gray-300" onSubmit={handleSubmit}>
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button type="submit" className="bg-orange-600 text-white px-4">
              Send
            </button>
          </form>
          <div className="text-center text-xs text-gray-500 p-1 bg-gray-50">
            Powered by Block Mind AI
          </div>
        </div>
      </div>
    </>
  );
}
