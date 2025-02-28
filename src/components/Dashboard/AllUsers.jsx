/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAction } from "../../redux/slices/userSlice";
import PopOver from "../shared/PopOver";
function RoleBasedUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);

  
  const [paginationState, setPaginationState] = useState({});
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllUserAction());
  }, [dispatch]);

  // Group users by role
  const usersByRole = useMemo(() => {
    if (!users) return {};
    return users.reduce((acc, user) => {
      const role = user.role.toLowerCase();
      if (!acc[role]) acc[role] = [];
      acc[role].push(user);
      return acc;
    }, {});
  }, [users]);

  useEffect(() => {
    const initialPaginationState = Object.keys(usersByRole).reduce(
      (acc, role) => {
        acc[role] = 1;
        return acc;
      },
      {}
    );
    setPaginationState(initialPaginationState);
  }, [usersByRole]);

  const handlePageChange = (role, pageNumber) => {
    setPaginationState((prev) => ({
      ...prev,
      [role]: pageNumber,
    }));
  };

  // Table component for each role
  const RoleTable = ({ role, users }) => {
    const currentPage = paginationState[role] || 1;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const cellClass = "px-6 py-3 whitespace-nowrap";
    const headerClass = "px-6 py-3 whitespace-nowrap bg-gray-50";

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold capitalize">{role} Users</h2>
          <div className="text-sm text-gray-700">
            Showing {firstIndex + 1}-{Math.min(lastIndex, users.length)} of{" "}
            {users.length} users
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className={`${headerClass} w-16`}>
                  N<sup>o</sup>
                </th>
                <th scope="col" className={`${headerClass} w-40`}>
                  Full Name
                </th>
                <th scope="col" className={`${headerClass} w-48`}>
                  Email
                </th>
                <th scope="col" className={`${headerClass} w-36`}>
                  Phone Number
                </th>
                <th scope="col" className={`${headerClass} w-40`}>
                  Address
                </th>
                <th scope="col" className={`${headerClass} w-32`}>
                  Region
                </th>
                <th scope="col" className={`${headerClass} w-32`}>
                  Province
                </th>
                <th scope="col" className={`${headerClass} w-40`}>
                  Latitude/Longitude
                </th>
                <th scope="col" className={`${headerClass} w-32`}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={user?.id} className="bg-white hover:bg-gray-50">
                  <td className={cellClass}>{firstIndex + index + 1}</td>
                  <td className={`${cellClass} font-medium text-gray-900`}>
                    {user.full_name}
                  </td>
                  <td className={cellClass}>{user.email}</td>
                  <td className={cellClass}>{user.phoneNumber}</td>
                  <td className={cellClass}>{user.location.address}</td>
                  <td className={cellClass}>{user.location.region}</td>
                  <td className={cellClass}>{user.location.province}</td>
                  <td
                    className={cellClass}
                  >{`${user.location.latitude}/ ${user.location.longitude}`}</td>
                  <td className={cellClass}>
                    <PopOver action="Delete or Edit User" title="Action">
                      <div className="flex gap-2">
                        <button
                          onClick={() => console.log("Deleted User ", user?.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => console.log("Edit User ", user?.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Edit
                        </button>
                      </div>
                    </PopOver>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={() => handlePageChange(role, currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(role, page)}
              className={`px-3 py-1 text-sm font-medium rounded-lg ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(role, currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      {Object.entries(usersByRole).map(([role, users]) => (
        <RoleTable key={role} role={role} users={users} />
      ))}
    </div>
  );
}

export default RoleBasedUsers;
