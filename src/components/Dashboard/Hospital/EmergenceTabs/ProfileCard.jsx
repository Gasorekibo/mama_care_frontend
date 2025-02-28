/* eslint-disable react/prop-types */
import { dateFormatter } from "../../../../lib/helpers";
import InfoItem from "./InfoItem";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

function ProfileCard({ hospitals }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Hospital Profile
        </h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner">
              <img
                src={hospitals?.profilePicture || "/api/placeholder/160/160"}
                alt="Hospital Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {hospitals?.name || "Not Available"}
            </h3>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<Mail />} label="Email" value={hospitals?.email} />
            <InfoItem
              icon={<Phone />}
              label="Phone"
              value={hospitals?.contactNumber}
            />
            <InfoItem
              icon={<Calendar />}
              label="Member Since"
              value={dateFormatter(hospitals?.createdAt)}
            />
            <InfoItem
              icon={<MapPin />}
              label="Address"
              value={hospitals?.location?.address}
            />
            <InfoItem
              icon={<MapPin />}
              label="City/Province"
              value={`${hospitals?.location?.region || "N/A"}, ${
                hospitals?.location?.province || "N/A"
              }`}
            />
            <InfoItem
              icon={<MapPin />}
              label="Coordinates"
              value={`${hospitals?.location?.latitude || "N/A"}, ${
                hospitals?.location?.longitude || "N/A"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
