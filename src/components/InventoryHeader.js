import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InventoryHeader = ({ filterInventory }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const inventory = useSelector((state) => state.inventory.items);
  const inventoryStatus = useSelector((state) => state.inventory.status);

  const makes = ["GMC", "Toyota", "Cadillac", "Ram", "Chevrolet", "Buick"];
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
    setDrawerOpen(false);
    filterInventory(selectedMakes, selectedDurations);
  };

  const removeFilters = () => {
    setSelectedMakes([]);
    setSelectedDurations([]);
    setDrawerOpen(false);
    filterInventory([], []);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="whitespace-nowrap">Select Dealer</label>
            <select
              id="dealer"
              name="dealer"
              className="block w-full pl-3 pr-10 py-2 text-base border focus:outline-none sm:text-sm rounded-md"
              style={{ borderColor: "#ff9434" }}
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
              className="w-5 h-5 mr-2 text-[#ff9434]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 5h14v2H3V5zm4 4h6v2H7V9zm-2 4h10v2H5v-2z" />
            </svg>
            FILTER DATA BY
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed top-0 right-0 z-50  h-screen  bg-white border-l border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={toggleDrawer}
                className="text-gray-600 hover:text-gray-800 focus:outline-none m-2"
                style={{ fontSize: "2rem" }}
              >
                &lt;
              </button>
              <h2 className="text-xl font-bold ml-2">Filter Data By</h2>
            </div>
          </div>

          <div className="mb-4 bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make
            </label>
            {makes.map((make) => (
              <div key={make} className="flex items-center mb-2 pl-2">
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
          <div className="mb-4 bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            {durations.map((duration) => (
              <div key={duration} className="flex items-center mb-2 pl-2">
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
          <div className="flex justify-between mt-4 bg-white">
            <button
              onClick={applyFilters}
              className="m-2 w-[210px] h-14 px-4 py-2 text-sm font-medium text-white bg-[#ff9434] border border-transparent rounded-md "
            >
              APPLY FILTERS
            </button>
            <div className="flex items-center justify-between  bg-white">
              <button
                onClick={removeFilters}
                className="m-2 flex items-center justify-center w-[210px] h-14 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-[#ff9434] rounded-md"
              >
                <svg
                  className="w-4 h-4 mr-2 text-white bg-[#ff9434] rounded-lg"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                REMOVE ALL FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryHeader;
