export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-800 px-6 text-center">
      {/* Logo / Header */}
      <h1 className="text-4xl font-bold text-orange-600 mb-3">Block Mind AI</h1>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Payment Successful 🎉
      </h2>

      {/* Confirmation Message */}
      <p className="max-w-md text-gray-700 mb-8 leading-relaxed">
        Thank you for your purchase!  
        We’ve received your payment and our team will contact you within 24 hours 
        to begin setting up your custom website and AI chatbot.  
        You’ll get an onboarding email soon with next steps.
      </p>

      {/* Call to Action */}
      <a
        href="/"
        className="bg-orange-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-orange-500 transition"
      >
        Back to Home
      </a>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Block Mind AI • Custom Websites + AI Chatbots.
      </footer>
    </div>
  );
}
