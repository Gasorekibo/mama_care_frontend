
import DashboardStatsGrid from "./DashboardStatsGrid";

import RecentOrders from "./EmergeneAlerts";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllHospitalAction } from "../../redux/slices/hospitalSlice";
import { getAllUserAction } from "../../redux/slices/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHospitalAction());
    dispatch(getAllUserAction());
  }, [dispatch]);
  const { hospitals } = useSelector((state) => state?.hospitals);
  const { users } = useSelector((state) => state?.users);

  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid users={users} hospitals={hospitals} />
      <div className="flex flex-row gap-4 w-full">
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders hospitals={hospitals} />
      </div>
    </div>
  );
}
