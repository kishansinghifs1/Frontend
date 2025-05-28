import { useState } from "react";
import AuthCard from "./AuthCard";

const ForgotPasswordCard = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setStatus(null);

    try {
      const res = await fetch("http://127.0.0.1:8787/api/v1/user/password-get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error sending reset email");
      }

      setStatus("Reset link sent! Check your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard title="Reset Password">
      <form className="space-y-4" onSubmit={handleReset}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter your email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {status && <div className="text-green-600 text-sm text-center">{status}</div>}
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Send Reset Link
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full mt-2 text-sm text-gray-500 hover:underline"
        >
          ← Back to Sign In
        </button>
      </form>
    </AuthCard>
  );
};

export default ForgotPasswordCard;
