import { IoPeople } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { LiaHospitalSolid } from "react-icons/lia";
import { IoIosWoman } from "react-icons/io";
import PropTypes from "prop-types";
export default function DashboardStatsGrid({ users, hospitals }) {
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Users</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {users?.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <FaCalendarAlt className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Appointments
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">46</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <LiaHospitalSolid className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Hospitals
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {hospitals?.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoIosWoman className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Women</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {users?.filter((user) => user?.role === "PREGNANT_WOMAN")?.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

DashboardStatsGrid.propTypes = {
  users: PropTypes.array.isRequired,
  hospitals: PropTypes.array.isRequired,
}