import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cog } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import SignInForm from "../cards/user/SignInForm.jsx";
import SignUpForm from "../cards/user/SignUpForm.jsx";
import { useAuth } from "../userAuth/AuthContext.jsx";
import Footer from "../components/Footer.jsx";

const REDIRECT_DELAY = 1000;

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Home = () => {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const { user, loading, error } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      toast.info("Redirecting you to dashboard...", { autoClose: REDIRECT_DELAY });
      const timer = setTimeout(() => navigate("/dashboard"), REDIRECT_DELAY);
      return () => clearTimeout(timer);
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleModalClose = () => setModal(null);
  const handleModalSwitch = (newModal) => setModal(newModal);
  const handleLoginSuccess = () => {
    handleModalClose();
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main content scrolls naturally */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center text-center">
          {/* Title + Icon */}
          <div className="flex flex-col md:flex-row items-center text-center mb-10 gap-6 max-w-4xl">
            <Cog size={100} color="gray" className="animate-spin mx-auto md:mx-0" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Spare Part Management
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mb-10 px-4">
            Efficiently manage your inventory, track parts, and streamline operations all in one place.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleModalSwitch("signin")}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium w-full sm:w-auto"
            >
              Sign In
            </button>
            <button
              onClick={() => handleModalSwitch("signup")}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium w-full sm:w-auto"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {modal && (
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleModalClose}
            >
              <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
                {modal === "signin" && (
                  <SignInForm
                    onClose={handleModalClose}
                    switchToSignUp={() => handleModalSwitch("signup")}
                    onLogin={handleLoginSuccess}
                  />
                )}
                {modal === "signup" && (
                  <SignUpForm
                    onClose={handleModalClose}
                    switchToSignIn={() => handleModalSwitch("signin")}
                    onLogin={handleLoginSuccess}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
