import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const UseSparePartModal = ({ formData, setFormData, onSubmit, onCancel }) => {
  const [scanning, setScanning] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md space-y-4">
        <h3 className="text-xl font-semibold text-center">Use Spare Part</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Product ID"
            value={formData.productId}
            onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="button"
            onClick={() => setScanning((prev) => !prev)}
            className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {scanning ? "Stop Scanning" : "Scan Barcode"}
          </button>

          {scanning && (
            <div className="w-full h-60 mt-2">
              <BarcodeScannerComponent
                width={400}
                height={240}
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
          />
          <p className="text-xs text-gray-500">Time: {formData.timestamp}</p>
          <div className="flex justify-between pt-2">
            <button
              type="submit"
              className="bg-blue-300 text-black px-4 py-2 rounded hover:bg-gray-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UseSparePartModal;
