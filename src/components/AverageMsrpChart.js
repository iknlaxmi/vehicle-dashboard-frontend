import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AverageMsrpChart = ({ inventory }) => {
  const [filter, setFilter] = useState("new");
  function extractPrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
  }
  const data = inventory
    .filter((item) => item.condition === filter)
    .reduce((acc, item) => {
      const date = new Date(item.timestamp).toLocaleDateString();
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.total += extractPrice(item.price);
        existing.count += 1;
        existing.avg = existing.total / existing.count;
      } else {
        acc.push({
          date,
          total: extractPrice(item.price),
          count: 1,
          avg: extractPrice(item.price),
        });
      }
      return acc;
    }, []);

  const formatYAxis = (tickItem) => {
    // Format the number with $ symbol and k for thousands
    return `$${tickItem / 1000}k`;
  };
  return (
    <div className="mb-12">
      <div className="m-4 flex items-center space-x-4 mb-12">
        <span className="text-lg font-medium">Average MSRP in USD</span>

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
          <YAxis tickFormatter={formatYAxis} />

          <Bar dataKey="avg" fill="#FF7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageMsrpChart;
