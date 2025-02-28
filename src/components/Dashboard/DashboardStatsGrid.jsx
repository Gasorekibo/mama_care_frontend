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
            <span className="text-sm text-blue-500 pl-2">+343</span>
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
            <strong className="text-xl text-gray-700 font-semibold">
              3423
            </strong>
            <span className="text-sm text-green-500 pl-2">-343</span>
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
            <span className="text-sm text-red-500 pl-2">-30</span>
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
              16432
            </strong>
            <span className="text-sm text-red-500 pl-2">-43</span>
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