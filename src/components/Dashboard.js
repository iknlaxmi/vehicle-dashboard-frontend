import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../features/inventory/inventorySlice";
import InventoryHeader from "./InventoryHeader";
import RecentData from "./RecentData";
import InventoryCountChart from "./InventoryCountChart";
import AverageMsrpChart from "./AverageMsrpChart";
import HistoryLog from "./HistoryLog";

const Dashboard = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.items);

  const [filteredData, setFilteredData] = useState([]);
  const inventoryStatus = useSelector((state) => state.inventory.status);

  const filterInventory = (selectedMakes, selectedDurations) => {
    const now = new Date();
    const filteredByMakes = selectedMakes.length
      ? inventory.filter((item) => selectedMakes.includes(item.brand))
      : inventory;

    const filteredByDuration = filteredByMakes.filter((item) => {
      const dateAdded = new Date(item.timestamp.replace(" ", "T"));
      const isInDuration = (duration) => {
        switch (duration) {
          case "Last Month":
            return (
              dateAdded >=
              new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
            );
          case "This Month":
            return dateAdded >= new Date(now.getFullYear(), now.getMonth(), 1);
          case "Last 3 Months":
            return (
              dateAdded >=
              new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
            );
          case "Last 6 Months":
            return (
              dateAdded >=
              new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
            );
          case "This Year":
            return dateAdded >= new Date(now.getFullYear(), 0, 1);
          case "Last Year":
            return dateAdded >= new Date(now.getFullYear() - 1, 0, 1);
          default:
            return true;
        }
      };

      return selectedDurations.length
        ? selectedDurations.some(isInDuration)
        : true;
    });

    setFilteredData(filteredByDuration);
  };
  useEffect(() => {
    filterInventory([], []);
  }, [inventoryStatus]);
  useEffect(() => {
    if (inventoryStatus === "idle") {
      dispatch(fetchInventory());
    }
  }, [inventoryStatus, dispatch]);
  return (
    <div>
      <InventoryHeader filterInventory={filterInventory} />
      <RecentData />
      <InventoryCountChart inventory={filteredData} />
      <AverageMsrpChart inventory={filteredData} />
      <HistoryLog inventory={filteredData} />
    </div>
  );
};

export default Dashboard;
