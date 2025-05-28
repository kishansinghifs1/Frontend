import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AuthCard from "./Authcard";
import ForgotPasswordCard from "./ForgotPasswordCard";
import { useAuth } from "../../userAuth/AuthContext.jsx";

const SignInForm = ({ onClose, switchToSignUp }) => {
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);
      toast.success("Successfully logged in!");

      setTimeout(() => {
        onClose?.();
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showForgot ? (
        <AuthCard key="signin" title="Sign In">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <button
              onClick={() => setShowForgot(true)}
              className="hover:underline"
            >
              Forgot password?
            </button>
            <button onClick={switchToSignUp} className="hover:underline">
              New here? Sign Up
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full text-center text-gray-500 hover:underline"
          >
            Close
          </button>
        </AuthCard>
      ) : (
        <ForgotPasswordCard key="forgot" onBack={() => setShowForgot(false)} />
      )}
    </AnimatePresence>
  );
};

export default SignInForm;
