import React, { useState } from "react";

const HistoryLog = ({ inventory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' for ascending, 'desc' for descending
  const itemsPerPage = 6;

  function extractPrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
  }

  const calculateStats = (type) => {
    const filtered = inventory.filter((item) => item.condition === type);
    const count = filtered.length;
    const totalMsrp = filtered.reduce(
      (acc, item) => acc + extractPrice(item.price),
      0
    );
    let avgMsrp = 0;
    if (count) {
      avgMsrp = totalMsrp / count;
    }

    return { count, totalMsrp, avgMsrp };
  };

  const newStats = calculateStats("new");
  const usedStats = calculateStats("used");
  const cpoStats = calculateStats("cpo");

  const totalPages = Math.ceil(inventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedInventory = [...inventory].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const currentItems = sortedInventory.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset to the first page on sort order change
  };

  return (
    <div className="mb-4">
      <div className="flex items-center m-4 mb-8">
        <span className="text-lg font-medium">Average MSRP in USD</span>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">
              <button onClick={toggleSortOrder} className="flex items-center">
                <span className="ml-2">{sortOrder === "asc" ? "↑" : "↓"}</span>
                DATE
              </button>
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              NEW INVENTORY
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              NEW TOTAL MSRP
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              NEW AVERAGE MSRP
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              USED INVENTORY
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              USED TOTAL MSRP
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              USED AVERAGE MSRP
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              CPO INVENTORY
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              CPO TOTAL MSRP
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              CPO AVERAGE MSRP
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">
                {new Date(item.timestamp).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {newStats.count}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${newStats.totalMsrp.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${newStats.avgMsrp.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {usedStats.count}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${usedStats.totalMsrp.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${usedStats.avgMsrp.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {cpoStats.count}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${cpoStats.totalMsrp.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${cpoStats.avgMsrp.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          &lt; Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default HistoryLog;
