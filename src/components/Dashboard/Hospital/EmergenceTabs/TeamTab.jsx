/* eslint-disable react/prop-types */
import { dateFormatter } from "../../../../lib/helpers";
import ResponseTeamTable from "./ResponseTeamTable";

function TeamTab({
  responders,
  status,
  createdAt,
  handleDispatchTeam,
  handleResolveEmergency,
}) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Response Team */}
        <ResponseTeamTable responders={responders} />
        {/* Emergency Actions */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 bg-red-100">
            <h2 className="text-xl font-semibold">Emergency Actions</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Emergency Status</h3>
              <div className="space-y-2 bg-red-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">Current Status:</span>
                  <span>{status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>{dateFormatter(createdAt)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Actions</h3>
              <div className="space-y-2 bg-yellow-50 p-3 rounded">
                <button
                  onClick={handleDispatchTeam}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow"
                >
                  Dispatch Response Team
                </button>
                {status !== "RESOLVED" && (
                  <button
                    onClick={handleResolveEmergency}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamTab;
