import { format } from "date-fns";

import PropTypes from "prop-types";
export default function EmergeneAlerts({ hospitals }) {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Emergency Alerts</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>
                N<sup>o</sup>
              </th>
              <th>Title</th>
              <th>Patient Name</th>
              <th>Patient Phone</th>

              <th>Location(Lat/Long)</th>
              <th>Hospital</th>
              <th>Hospital Phone</th>
              <th>Created</th>
              <th>Resolved</th>
            </tr>
          </thead>
          <tbody>
            {hospitals?.map((hospital) =>
              hospital?.emergencyAlerts?.map((emergence, index) => (
                <tr
                  key={emergence?._id}
                  className="border-t border-gray-200 text-start hover:bg-gray-100 cursor-pointer"
                >
                  <td className="border-r">{index + 1}</td>
                  <td className="border-r px-1">{emergence?.emergencyType}</td>
                  <td className="border-r px-1">
                    {emergence?.user?.full_name}
                  </td>
                  <td className="border-r px-1">
                    {emergence?.user?.phoneNumber}
                  </td>

                  <td className="border-r px-1">
                    {emergence?.location?.latitude}/{" "}
                    {emergence?.location?.longitude}
                  </td>
                  <td className="border-r px-1">{hospital?.name}</td>
                  <td className="border-r px-1">{hospital?.contactNumber}</td>
                  <td className="border-r px-1">
                    {format(new Date(emergence?.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="border-r px-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emergence?.isResolved ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                    >
                      {emergence?.isResolved ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

EmergeneAlerts.propTypes = {
  hospitals: PropTypes.array.isRequired,
};
