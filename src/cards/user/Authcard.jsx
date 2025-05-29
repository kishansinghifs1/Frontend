import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, y: -30, transition: { duration: 0.2 } },
};

const AuthCard = ({ children, title }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-200"
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">{title}</h2>
    {children}
  </motion.div>
);

export default AuthCard;
