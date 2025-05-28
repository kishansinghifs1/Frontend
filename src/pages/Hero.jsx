import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserCog, Eye, DiamondPlus, Hammer } from "lucide-react";
import AddSparePartModal from "../cards/product/AddSparePartModal";
import UseSparePartModal from "../cards/product/UseSparePartModal";
import Header1 from "../components/Dashboardheader/Header1";
import { AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Header1 />
      <main className="flex md:flex-row flex-col cursor-default h-screen bg-gray-100 p-10 gap-6">
        {/* Left Side */}
        <div className="md:w-1/3 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm h-[70vh] flex flex-col justify-start text-center">
            <UserCog size={100} color="grey" />
            <h1 className="text-5xl font-bold mb-7 text-gray-800 text-center self-start">
              Spare Part Management
            </h1>
            <p className="text-gray-600 p-3 leading-relaxed text-2xl w-full">
              “Effortlessly manage, track, and update all your spare parts in one smart system...”
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 flex items-center">
          <div className="w-full space-y-6">
            <div className="bg-gray-300 shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Manage Your Spare Parts Seamlessly
              </h2>
              <p className="text-gray-600 text-sm">
                Add new spare parts, log their usage, or monitor the complete inventory.
              </p>
            </div>

            {/* Action Cards */}
            <div className="space-y-4">
              {/* Add Spare Part */}
              <div className="bg-white shadow rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Add Spare Part</h3>
                  <p className="text-sm text-gray-600">Register new items to your inventory.</p>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-300 hover:bg-gray-300 text-black px-8 py-2 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <DiamondPlus size={20} />
                    <span className="text-lg font-medium">Add</span>
                  </div>
                </button>
              </div>

              {/* Use Spare Part */}
              <div className="bg-white shadow rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Use Spare Part</h3>
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
                  className="bg-blue-300 hover:bg-gray-300 text-black px-8 py-2 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <Hammer size={20} />
                    <span className="text-lg font-medium">Use</span>
                  </div>
                </button>
              </div>

              {/* View All Parts */}
              <div className="bg-white shadow rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">View All Parts</h3>
                  <p className="text-sm text-gray-600">Review and manage only by Admin.</p>
                </div>
                <button
                  onClick={() => navigate("/stat")}
                  className="bg-blue-300 hover:bg-gray-300 text-black px-7 py-2 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <Eye size={20} />
                    <span className="text-lg font-medium">View</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals with AnimatePresence */}
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
    </div>
  );
};

export default Hero;