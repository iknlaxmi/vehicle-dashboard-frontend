import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInventory } from "../features/inventory/inventorySlice";

const InventoryHeader = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.items);
  const inventoryStatus = useSelector((state) => state.inventory.status);

  const [make, setMake] = useState("");
  const [duration, setDuration] = useState("last_month");

  const makes = ["Ford", "Cadillac", "Jeep"];
  const durations = [
    "Last Month",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "This Year",
    "Last Year",
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleMakeChange = (make) => {
    setSelectedMakes((prev) =>
      prev.includes(make)
        ? prev.filter((item) => item !== make)
        : [...prev, make]
    );
  };

  const handleDurationChange = (duration) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((item) => item !== duration)
        : [...prev, duration]
    );
  };

  const applyFilters = () => {
    console.log("Applying Filters:", { selectedMakes, selectedDurations });
    setDrawerOpen(false);
  };

  const removeFilters = () => {
    setSelectedMakes([]);
    setSelectedDurations([]);
    setDrawerOpen(false);
  };

  useEffect(() => {
    console.log("stat", inventoryStatus);
    if (inventoryStatus === "idle") {
      dispatch(fetchAllInventory());
    }
    // dispatch(fetchAllInventory());
  }, [inventoryStatus, dispatch, make, duration]);

  //   const handleFilterChange = () => {
  //     dispatch(fetchInventory({ make, duration }));
  //   };
  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="dealer" className="sr-only">
              Select Dealer
            </label>
            <select
              id="dealer"
              name="dealer"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>AAA MITSUBISHI DEALER</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <button
            onClick={toggleDrawer}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="w-5 h-5 mr-2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 4a1 1 0 01.993.883L11 5v1h2a1 1 0 01.117 1.993L13 8h-2v2a1 1 0 01-1.993.117L9 10V8H7a1 1 0 01-.117-1.993L7 6h2V5a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            FILTER DATA BY
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="absolute top-0 right-0 z-50 w-64 h-full p-4 bg-white border-l border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggleDrawer}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              &lt;
            </button>
            <h2 className="text-xl font-bold">Filter Data By</h2>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make
            </label>
            {makes.map((make) => (
              <div key={make} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`make-${make}`}
                  value={make}
                  checked={selectedMakes.includes(make)}
                  onChange={() => handleMakeChange(make)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`make-${make}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {make}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            {durations.map((duration) => (
              <div key={duration} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`duration-${duration}`}
                  value={duration}
                  checked={selectedDurations.includes(duration)}
                  onChange={() => handleDurationChange(duration)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`duration-${duration}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {duration}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              APPLY FILTERS
            </button>
            <button
              onClick={removeFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              REMOVE ALL FILTERS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryHeader;
