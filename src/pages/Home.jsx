import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cog } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import SignInForm from "../cards/user/SignInForm.jsx";
import SignUpForm from "../cards/user/SignUpForm.jsx";
import { useAuth } from "../userAuth/AuthContext.jsx";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Home = () => {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user ) {
      toast.info("Redirecting you to dashboard...", { autoClose: 2000 });
      const timer = setTimeout(() => navigate("/dashboard"), 2000);
      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Checking authentication...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-28 px-4 flex flex-col items-center justify-center h-[calc(100vh-112px-96px)] text-center relative">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 mb-6">
          <Cog size={120} color="gray" className="animate-spin" />
          <h2 className="text-5xl md:text-7xl font-bold">Spare Part Management</h2>
        </div>

        <p className="text-2xl p-2 max-w-2xl mb-10 text-gray-600">
          Efficiently manage your inventory, track parts, and streamline operations all in one place.
        </p>

        <div className="flex space-x-6">
          <button
            onClick={() => setModal("signin")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => setModal("signup")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence>
          {modal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setModal(null)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {modal === "signin" && (
                  <SignInForm
                    onClose={() => setModal(null)}
                    switchToSignUp={() => setModal("signup")}
                    onLogin={() => {
                      setModal(null);
                      navigate("/dashboard");
                    }}
                  />
                )}
                {modal === "signup" && (
                  <SignUpForm
                    onClose={() => setModal(null)}
                    switchToSignIn={() => setModal("signin")}
                    onLogin={() => {
                      setModal(null);
                      navigate("/dashboard");
                    }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
