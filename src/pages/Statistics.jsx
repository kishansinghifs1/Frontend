import { useEffect, useState } from "react";

// 👇 Cache used across component mounts
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
      if (cachedUsedParts) {
        setUsedParts(cachedUsedParts);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/product`);
        const data = await res.json();
        const used = data.filter((item) => item.isUsed);
        cachedUsedParts = used; // ✅ Cache it
        setUsedParts(used);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    loadData();
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
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">View Spare Parts Usage</h1>

      <div className="mb-4 flex gap-4">
        {["weekly", "monthly", "yearly"].map((p) => (
          <button
            key={p}
            className={`px-4 py-2 rounded ${
              period === p ? "bg-blue-600 text-white" : "bg-gray-300"
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

      <div className="flex gap-4 mb-6">
        <button
          onClick={exportCSV}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      {loading && <p>Loading usage data...</p>}
      {error && <p className="text-blue-400">{error}</p>}

      {!loading && !error && (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-1 text-left">Period</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Product ID</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Description</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(({ period, productId, description, timestamp }, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-1">{period}</td>
                  <td className="border border-gray-300 px-3 py-1">{productId}</td>
                  <td className="border border-gray-300 px-3 py-1">{description}</td>
                  <td className="border border-gray-300 px-3 py-1">{timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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
