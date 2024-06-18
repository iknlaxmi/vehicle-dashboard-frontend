import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../features/inventory/inventorySlice";
import InventoryHeader from "./InventoryHeader";
import RecentData from "./RecentData";
import InventoryCountChart from "./InventoryCountChart";
// import InventoryCount from "./InventoryCount";
// import AverageMsrp from "./AverageMsrp";
// import HistoryLog from "./HistoryLog";

const Dashboard = () => {
  //   const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.items);
  //   const inventoryStatus = useSelector((state) => state.inventory.status);

  //   const [make, setMake] = useState("");
  //   const [duration, setDuration] = useState("last_month");

  //   useEffect(() => {
  //     if (inventoryStatus === "idle") {
  //       dispatch(fetchInventory({ make, duration }));
  //     }
  //   }, [inventoryStatus, dispatch, make, duration]);

  //   const handleFilterChange = () => {
  //     dispatch(fetchInventory({ make, duration }));
  //   };

  return (
    <div>
      <InventoryHeader />
      <RecentData />
      <InventoryCountChart inventory={inventory} />
    </div>
  );
};

export default Dashboard;
