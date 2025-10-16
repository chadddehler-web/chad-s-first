import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // ---- Chat logic ----
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
      if (!res.ok) throw new Error("Chat request failed");
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

  // ---- Stripe Checkout ----
  const handleCheckout = async (plan) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error("Checkout request failed");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("Missing checkout URL");
    } catch {
      alert("Checkout error. Please try again.");
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-orange-600 text-white flex justify-between items-center p-4 sticky top-0 z-50 shadow-lg">
        <h1 className="text-xl m-0 font-semibold">Block Mind AI</h1>
        <ul className="flex gap-5 m-0 p-0 list-none">
          <li>
            <a href="#home" className="hover:text-yellow-100 font-medium">
              Home
            </a>
          </li>
          <li>
            <a href="#plans" className="hover:text-yellow-100 font-medium">
              Plans
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
      <header
        id="home"
        className="bg-gradient-to-br from-orange-600 to-orange-400 text-white text-center py-20 px-5"
      >
        <h2 className="text-5xl mb-4 font-bold">
          Custom Websites + AI Chatbots That Work
        </h2>
        <p className="text-lg font-light max-w-xl mx-auto">
          <em>“Professional websites built to convert — powered by AI.”</em>
        </p>
        <p className="mt-5 max-w-xl mx-auto">
          We create stunning custom websites that come with an AI chatbot built
          to generate leads 24/7. Every site is designed from scratch and
          refined until you’re 100% satisfied.
        </p>
      </header>

      {/* Plans Section */}
      <section
        id="plans"
        className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 text-center"
      >
        <h3 className="text-4xl font-bold mb-10 text-gray-900">
          Choose Your Plan
        </h3>

        <div className="flex flex-wrap justify-center gap-10 px-5">
          {/* Starter Plan */}
          <div className="bg-white border border-orange-200 rounded-2xl shadow-lg hover:shadow-2xl p-8 w-80 transform transition-transform hover:-translate-y-1">
            <h4 className="text-2xl font-semibold text-orange-700 mb-2">
              Starter Plan
            </h4>
            <p className="text-gray-600 mb-4">
              Get an AI chatbot integrated into your existing website — perfect
              for small businesses ready to automate customer engagement.
            </p>
            <p className="text-lg font-bold text-gray-800 mb-6">
              💵 $149 setup + $99/month
            </p>
            <button
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-500 transition"
              onClick={() => handleCheckout("starter")}
            >
              Choose Starter Plan
            </button>
          </div>

          {/* Business Plan (Recommended) */}
          <div className="relative bg-gradient-to-b from-orange-100 to-white border border-orange-300 rounded-2xl shadow-2xl p-8 w-80 transform transition-transform hover:-translate-y-2 scale-105">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
              ★ Recommended
            </span>
            <h4 className="text-2xl font-semibold text-orange-700 mb-2">
              Business Plan
            </h4>
            <p className="text-gray-600 mb-4">
              Includes a full custom website built from scratch + integrated AI
              chatbot to capture leads and automate responses — a complete
              online presence.
            </p>
            <p className="text-lg font-bold text-gray-800 mb-6">
              💵 $249 setup + $149/month
            </p>
            <button
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-500 transition"
              onClick={() => handleCheckout("business")}
            >
              Choose Business Plan
            </button>
          </div>

          {/* Growth Plan */}
          <div className="bg-white border border-orange-200 rounded-2xl shadow-lg hover:shadow-2xl p-8 w-80 transform transition-transform hover:-translate-y-1">
            <h4 className="text-2xl font-semibold text-orange-700 mb-2">
              Growth Plan
            </h4>
            <p className="text-gray-600 mb-4">
              Advanced website + chatbot + lead generation, SEO optimization,
              and advertising management — designed for scaling businesses.
            </p>
            <p className="text-lg font-bold text-gray-800 mb-6">
              💵 $249 setup + $279/month
            </p>
            <button
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-500 transition"
              onClick={() => handleCheckout("growth")}
            >
              Choose Growth Plan
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 text-center px-5 bg-white">
        <h3 className="text-2xl mb-3 font-semibold text-gray-900">
          Contact Us
        </h3>
        <p className="text-gray-700">
          Email us at <strong>contact@blockmindai.org</strong> or reach out on
          Telegram: <strong>@blockmindai</strong>
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        © 2025 Block Mind AI • Custom Websites + AI Chatbots.
      </footer>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-600 text-white rounded-full p-4 shadow-lg hover:bg-orange-500 transition"
        >
          💬
        </button>
        {isOpen && (
          <div className="bg-white shadow-2xl rounded-xl w-80 mt-3 overflow-hidden border border-gray-200 flex flex-col">
            <div className="bg-orange-600 text-white text-center font-semibold py-2">
              Block Mind AI
            </div>
            <div className="flex-1 p-3 overflow-y-auto max-h-64">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`my-1 p-2 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-orange-600 text-white self-end ml-auto max-w-[80%]"
                      : "bg-gray-100 text-gray-900 self-start mr-auto max-w-[80%]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex border-t border-gray-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 hover:bg-orange-500 transition"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
