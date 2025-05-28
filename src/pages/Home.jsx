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
            onClick={() => handleModalSwitch("signin")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => handleModalSwitch("signup")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence>
          {modal && (
            <motion.div
              className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleModalClose}
            >
              <div onClick={(e) => e.stopPropagation()}>
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
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
