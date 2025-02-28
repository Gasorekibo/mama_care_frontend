/* eslint-disable react/prop-types */

function MapRoute({ user, assignedFacility, etaMinutes,location }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map */}
        <div className="md:col-span-2 bg-white shadow rounded-lg overflow-hidden h-96">
          <div className="p-4 bg-blue-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Emergency Location & Route
            </h2>
            <div className="flex items-center">
              <span className="bg-blue-500 h-3 w-3 rounded-full mr-1"></span>
              <span className="text-sm">Hospital</span>
              <span className="bg-red-500 h-3 w-3 rounded-full ml-3 mr-1"></span>
              <span className="text-sm">Emergency</span>
            </div>
          </div>
          <div className="h-full p-2">
            <div className="h-full w-full bg-gray-100 rounded flex items-center justify-center">
              <img
                src="/api/placeholder/600/400"
                alt="Map showing route from hospital to emergency location"
                className="w-full h-full object-cover rounded"
              />
              {/* In a real implementation, you would integrate with Google Maps or similar API */}
              <div className="absolute text-center">
                <p className="text-gray-500 mb-2">
                  Map visualization would appear here
                </p>
                <p className="text-sm text-gray-400">
                  Integrate with Google Maps or similar service
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 bg-green-100">
            <h2 className="text-xl font-semibold">Location Details</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* Emergency Location */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Emergency Location</h3>
              <div className="space-y-2 bg-red-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{user?.location?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Region:</span>
                  <span>
                    {user?.location?.region}, {user?.location?.province}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Coordinates:</span>
                  <span className="text-sm">
                    {location?.latitude?.toFixed(6)},{" "}
                    {location?.longitude?.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>

            {/* Hospital Location */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Hospital</h3>
              <div className="space-y-2 bg-blue-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{assignedFacility?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{assignedFacility?.location?.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Region:</span>
                  <span>
                    {assignedFacility?.location?.region},{" "}
                    {assignedFacility?.location?.province}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Contact:</span>
                  <span>{assignedFacility?.contactNumber}</span>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Route Information</h3>
              <div className="space-y-2 bg-yellow-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">Distance:</span>
                  <span>
                    {Math.floor(Math.random() * 10) + 1}.
                    {Math.floor(Math.random() * 9)} km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">ETA:</span>
                  <span>
                    {etaMinutes ? `${etaMinutes} minutes` : "Calculating..."}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Traffic:</span>
                  <span className="text-yellow-600">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapRoute;
