import React, { useState } from "react";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cog } from "lucide-react";


import SignInForm from "../cards/user/SignInForm.jsx";
import SignUpForm from "../cards/user/SignUpForm.jsx";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Home = () => {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="pt-28 px-4 cursor-default flex flex-col items-center justify-center h-[calc(100vh-112px-96px)] text-center relative">
        <div className="flex items-center space-y-2">
          <Cog size={150} color="gray" className="animate-spin" />
          <h2 className="text-7xl font-bold ml-4">Spare Part Management</h2>
        </div>
        <p className="text-2xl p-2 max-w-2xl mb-9 text-gray-600">
          Efficiently manage your inventory, track parts, and streamline
          operations all in one place.
        </p>
        <div className="flex space-x-12">
          <button
            onClick={() => setModal("signin")}
            className="bg-gray-900 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => setModal("signup")}
            className="bg-gray-900 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-gray-700 transition text-base font-medium"
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence>
          {modal && (
            <motion.div
              className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
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
                      navigate("/Dashboard");
                    }}
                  />
                )}
                {modal === "signup" && (
                  <SignUpForm
                    onClose={() => setModal(null)}
                    switchToSignIn={() => setModal("signin")}
                    onLogin={() => {
                      setModal(null);
                      navigate("/Dashboard");
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
