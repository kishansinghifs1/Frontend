import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserCog, Eye, DiamondPlus, Hammer } from "lucide-react";
import AddSparePartModal from "../cards/product/AddSparePartModal";
import UseSparePartModal from "../cards/product/UseSparePartModal";
import Header1 from "../components/Dashboardheader/Header1";
import { AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const Hero = () => {
  const navigate = useNavigate();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUseForm, setShowUseForm] = useState(false);

  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    category: "",
    productId: "",
  });

  const [useForm, setUseForm] = useState({
    productId: "",
    description: "",
    timestamp: new Date().toLocaleString(),
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log("Add Spare Part:", addForm);
    setShowAddForm(false);
  };

  const handleUseSubmit = (e) => {
    e.preventDefault();
    console.log("Use Spare Part:", useForm);
    setShowUseForm(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <Header1 />

      {/* Scrollable content wrapper */}
      <div className="flex-1 overflow-y-auto">
        <main className="flex flex-col md:flex-row bg-gray-100 p-4 md:p-10 gap-6 min-h-full">
          {/* Left Side */}
          <div className="md:w-1/3 flex justify-center items-start md:items-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-sm flex flex-col justify-start text-center">
              <UserCog size={100} color="grey" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-start">
                Spare Part Management
              </h1>
              <p className="text-gray-600 leading-relaxed text-base md:text-xl">
                “Effortlessly manage, track, and update all your spare parts in one smart system...”
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-2/3 flex items-center justify-center">
            <div className="w-full max-w-3xl space-y-6">
              <div className="bg-gray-300 shadow rounded-xl p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                  Manage Your Spare Parts Seamlessly
                </h2>
                <p className="text-gray-600 text-sm">
                  Add new spare parts, log their usage, or monitor the complete inventory.
                </p>
              </div>

              {/* Action Cards */}
              <div className="space-y-4">
                {/* Add Spare Part */}
                <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800">Add Spare Part</h3>
                    <p className="text-sm text-gray-600">Register new items to your inventory.</p>
                  </div>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-300 hover:bg-gray-300 text-black px-6 py-2 rounded flex items-center space-x-2"
                  >
                    <DiamondPlus size={18} />
                    <span className="text-base font-medium">Add</span>
                  </button>
                </div>

                {/* Use Spare Part */}
                <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800">Use Spare Part</h3>
                    <p className="text-sm text-gray-600">Log usage of spare parts.</p>
                  </div>
                  <button
                    onClick={() => {
                      setUseForm((prev) => ({
                        ...prev,
                        timestamp: new Date().toLocaleString(),
                      }));
                      setShowUseForm(true);
                    }}
                    className="bg-blue-300 hover:bg-gray-300 text-black px-6 py-2 rounded flex items-center space-x-2"
                  >
                    <Hammer size={18} />
                    <span className="text-base font-medium">Use</span>
                  </button>
                </div>

                {/* View All Parts */}
                <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800">View All Parts</h3>
                    <p className="text-sm text-gray-600">Review and manage only by Admin.</p>
                  </div>
                  <button
                    onClick={() => navigate("/stat")}
                    className="bg-blue-300 hover:bg-gray-300 text-black px-6 py-2 rounded flex items-center space-x-2"
                  >
                    <Eye size={18} />
                    <span className="text-base font-medium">View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddForm && (
          <AddSparePartModal
            formData={addForm}
            setFormData={setAddForm}
            onSubmit={handleAddSubmit}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        {showUseForm && (
          <UseSparePartModal
            formData={useForm}
            setFormData={setUseForm}
            onSubmit={handleUseSubmit}
            onCancel={() => setShowUseForm(false)}
          />
        )}
      </AnimatePresence>
      <Footer/>
    </div>
  );
};

export default Hero;
