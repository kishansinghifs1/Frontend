import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import AuthCard from "./AuthCard";
import { useAuth } from "../../userAuth/AuthContext.jsx";

const SignUpForm = ({ onClose, switchToSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      const { user } = data;

      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      toast.success("Account created successfully!", { autoClose: 2000 });

      setTimeout(() => {
        onClose?.();
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard title="Sign Up">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Email Id"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <button onClick={switchToSignIn} className="text-blue-600 hover:underline">
         Sign In
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full text-center text-gray-500 hover:underline"
      >
        Close
      </button>
    </AuthCard>
  );
};

export default SignUpForm;
