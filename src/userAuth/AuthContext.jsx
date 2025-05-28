import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  console.log(user)

  // Fetch user info on mount
  const fetchUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8787/api/v1/user/me", {
        credentials: "include", // ✅ this sends the cookie!
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
