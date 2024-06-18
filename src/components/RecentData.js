import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RecentData = () => {
  const today_date = new Date();
  const inventory = useSelector((state) => state.inventory.items);
  const inventoryStatus = useSelector((state) => state.inventory.status);
  const [newUnits, setNewUnits] = useState("");
  const [newMSRP, setNewMSRP] = useState(0);
  const [newAvgMSRP, setNewAvgMSRP] = useState(0);

  const [usedUnits, setUsedUnits] = useState("");
  const [usedMSRP, setUsedMSRP] = useState(0);
  const [usedAvgMSRP, setUsedAvgMSRP] = useState(0);

  const [cpoUnits, setCpoUnits] = useState("");
  const [cpoMSRP, setCpoMSRP] = useState(0);
  const [cpoAvgMSRP, setCpoAvgMSRP] = useState(0);

  useEffect(() => {
    // Function to extract numeric value from price string and convert to number
    function extractPrice(priceStr) {
      return parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
    }
    const new_inventory = inventory.filter((item) => item.condition === "new");
    const total_new_MSRP = new_inventory.reduce(
      (accumulator, inventory) => accumulator + extractPrice(inventory.price),
      0
    );
    setNewUnits(new_inventory.length);
    setNewMSRP(total_new_MSRP);
    if (new_inventory.length) {
      setNewAvgMSRP(Math.trunc(total_new_MSRP / new_inventory.length));
    } else {
      setNewAvgMSRP(0);
    }

    //used inventory details
    const used_inventory = inventory.filter(
      (item) => item.condition === "used"
    );

    const total_used_MSRP = used_inventory.reduce(
      (accumulator, inventory) => accumulator + extractPrice(inventory.price),
      0
    );
    setUsedUnits(used_inventory.length);
    setUsedMSRP(total_used_MSRP);
    if (used_inventory.length) {
      setUsedAvgMSRP(Math.trunc(total_used_MSRP / used_inventory.length));
    } else {
      setUsedAvgMSRP(0);
    }

    //cpo inventory details
    const cpo_inventory = inventory.filter((item) => item.condition === "cpo");

    const total_cpo_MSRP = cpo_inventory.reduce(
      (accumulator, inventory) => accumulator + extractPrice(inventory.price),
      0
    );
    setCpoUnits(cpo_inventory.length);
    setCpoMSRP(total_cpo_MSRP);
    if (cpo_inventory.length) {
      setCpoAvgMSRP(Math.trunc(total_cpo_MSRP / cpo_inventory.length));
    } else {
      setCpoAvgMSRP(0);
    }
  }, [inventory, inventoryStatus]);

  return (
    <div className="mb-12">
      <h3 className="text-left m-4 font-semibold">
        {" "}
        Recent Gathered Data {today_date.getDate()}/{today_date.getMonth() + 1}/
        {today_date.getFullYear()}
      </h3>
      <div className="flex flex-wrap justify-center">
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">{newUnits}</div>
            <div className="text-[#ff9434] text-sm">#New Units</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">
              ${newMSRP.toLocaleString()}
            </div>
            <div className="text-[#ff9434] text-sm">#New MSRP</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">
              ${newAvgMSRP.toLocaleString()}
            </div>
            <div className="text-[#ff9434] text-sm">#New Avg.MSRP</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">{usedUnits}</div>
            <div className="text-[#ff9434] text-sm">#Used Units</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">
              ${usedMSRP.toLocaleString()}
            </div>
            <div className="text-[#ff9434] text-sm">#Used MSRP</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">
              ${usedAvgMSRP.toLocaleString()}
            </div>
            <div className="text-[#ff9434] text-sm">#Used Avg.MSRP</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">{cpoUnits}</div>
            <div className="text-[#ff9434] text-sm">#CPO Units</div>
          </div>
        </div>
        <div className="border-2 w-40 h-24 m-2 flex justify-center items-center bg-white rounded-md">
          <div>
            <div className="font-semibold text-lg">
              ${cpoMSRP.toLocaleString()}
            </div>
            <div className="text-[#ff9434] text-sm">#CPO MSRP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentData;
