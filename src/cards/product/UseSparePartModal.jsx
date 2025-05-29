import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { motion } from "framer-motion";
import { ScanQrCode } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { ease: "easeInOut", duration: 0.2 },
  },
};

const UseSparePartModal = ({ formData, setFormData, onCancel }) => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: formData.productId,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Product updated successfully", {
          autoClose: 2000,
          onClose: () => {
            setFormData((prev) => ({
              ...prev,
              productId: "",
              description: "",
              timestamp: new Date().toLocaleString(),
            }));
            setScanning(false);
            onCancel();
          },
        });
      } else {
        toast.error(data.error || "Failed to update product", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Network error: failed to update product", { autoClose: 3000 });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        variants={backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onCancel} // Detect click outside modal
      >
        <motion.div
          className="bg-white p-6 rounded-xl border-gray-200 shadow-lg w-[90%] max-w-md space-y-4"
          variants={modal}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()} // Prevent backdrop click close
        >
          <h3 className="text-xl font-semibold text-center">Use Spare Part</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Product ID"
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setScanning((prev) => !prev)}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-gray-400 flex items-center space-x-2"
              disabled={loading}
            >
              <ScanQrCode size={18} />
              <span>{scanning ? "Stop Scanning" : "Scan Barcode"}</span>
            </button>

            {scanning && (
              <div className="flex justify-center items-center mt-2 h-[190px]">
                <BarcodeScannerComponent
                  width={window.innerWidth<450 ? 130 : 270}
                  height={window.innerWidth<450 ? 60 :160}
                  onUpdate={(err, result) => {
                    if (result) {
                      setFormData({ ...formData, productId: result.text });
                      setScanning(false);
                    }
                  }}
                />
              </div>
            )}

            <textarea
              placeholder="Usage Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />

            <p className="text-xs text-gray-500">Time: {formData.timestamp || new Date().toLocaleString()}</p>

            <div className="flex justify-between pt-2">
              <button
                type="submit"
                className={`bg-blue-300 text-black px-4 py-2 rounded hover:bg-gray-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Add ToastContainer once in your app (here or in a root component) */}
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default UseSparePartModal;
