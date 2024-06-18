import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InventoryCountChart = ({ inventory }) => {
  const [filter, setFilter] = useState("new");

  const data = inventory
    .filter((item) => item.condition === filter)
    .reduce((acc, item) => {
      const date = new Date(item.timestamp).toLocaleDateString();
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }
      return acc;
    }, []);

  return (
    <div id="inventory-count" className="mb-4">
      <div className="m-4 flex items-center space-x-4">
        <span className="text-lg font-medium">Inventory Count</span>

        <div
          className={`border-2 border-[#ff9434] w-24 h-12 rounded-md flex items-center justify-center ${
            filter === "new" ? "bg-[#ff9434]" : "bg-white"
          }`}
        >
          <button
            onClick={() => setFilter("new")}
            className={`w-full h-full flex items-center justify-center ${
              filter === "new" ? "text-white" : "text-black"
            }`}
          >
            NEW
          </button>
        </div>
        <div
          className={`border-2 border-[#ff9434] w-24 h-12 rounded-md flex items-center justify-center ${
            filter === "used" ? "bg-[#ff9434]" : "bg-white"
          }`}
        >
          <button
            onClick={() => setFilter("used")}
            className={`w-full h-full flex items-center justify-center ${
              filter === "used" ? "text-white" : "text-black"
            }`}
          >
            USED
          </button>
        </div>
        <div
          className={`border-2 border-[#ff9434] w-24 h-12 rounded-md flex items-center justify-center ${
            filter === "cpo" ? "bg-[#ff9434]" : "bg-white"
          }`}
        >
          <button
            onClick={() => setFilter("cpo")}
            className={`w-full h-full flex items-center justify-center ${
              filter === "cpo" ? "text-white" : "text-black"
            }`}
          >
            CPO
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} style={{ backgroundColor: "#FFFFFF" }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#FF7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryCountChart;
