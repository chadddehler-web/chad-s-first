export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center px-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Canceled ❌
      </h1>
      <p className="max-w-md text-gray-700 mb-6">
        Your checkout was canceled. No charges were made.  
        You can return home and try again anytime.
      </p>
      <a
        href="/"
        className="bg-red-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-500 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
