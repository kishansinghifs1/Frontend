import { useEffect, useState } from "react";

let cachedUsedParts = null;

const formatDate = (date) => date.toISOString().split("T")[0];

const groupUsage = (data, period) => {
  const grouped = {};

  data.forEach(({ productId, description, updatedAt }) => {
    const date = new Date(updatedAt);
    let key;

    if (period === "weekly") {
      const onejan = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((date - onejan) / (24 * 60 * 60 * 1000)) + 1;
      const weekNum = Math.ceil(dayOfYear / 7);
      key = `${date.getFullYear()}-W${weekNum.toString().padStart(2, "0")}`;
    } else if (period === "monthly") {
      key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    } else if (period === "yearly") {
      key = `${date.getFullYear()}`;
    }

    if (!grouped[key]) grouped[key] = [];

    grouped[key].push({
      productId,
      description,
      timestamp: formatDate(date),
    });
  });

  return grouped;
};

const ITEMS_PER_PAGE = 5;

const Statistics = () => {
  const [period, setPeriod] = useState("monthly");
  const [usedParts, setUsedParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      const isReload = sessionStorage.getItem("reloaded") === "true";

      if (isReload) {
        cachedUsedParts = null;
        sessionStorage.removeItem("reloaded");
      }

      if (cachedUsedParts) {
        setUsedParts(cachedUsedParts);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product`);
        const data = await res.json();
        const used = data.filter((item) => item.isUsed);
        cachedUsedParts = used;
        setUsedParts(used);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      sessionStorage.setItem("reloaded", "true");
    }
  }, []);

  const groupedData = groupUsage(usedParts, period);
  const allFlattened = Object.entries(groupedData).flatMap(([group, entries]) =>
    entries.map((entry) => ({
      period: group,
      ...entry,
    }))
  );

  const totalPages = Math.ceil(allFlattened.length / ITEMS_PER_PAGE);
  const paginated = allFlattened.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const exportCSV = () => {
    const headers = ["Period", "Product ID", "Description", "Date"];
    const rows = allFlattened.map(({ period, productId, description, timestamp }) => [
      period,
      productId,
      description,
      timestamp,
    ]);

    const csvContent =
      [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `spare_parts_usage_${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        View Spare Parts Usage
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        {["weekly", "monthly", "yearly"].map((p) => (
          <button
            key={p}
            className={`px-3 py-2 rounded text-sm sm:text-base transition ${
              period === p ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => {
              setPeriod(p);
              setPage(1);
            }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <button
          onClick={exportCSV}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          Export CSV
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading usage data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-4 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-3 py-2 text-left">Period</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Product ID</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(({ period, productId, description, timestamp }, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">{period}</td>
                    <td className="border border-gray-300 px-3 py-2">{productId}</td>
                    <td className="border border-gray-300 px-3 py-2">{description}</td>
                    <td className="border border-gray-300 px-3 py-2">{timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto"
            >
              Previous
            </button>
            <span className="text-gray-700 text-center">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
