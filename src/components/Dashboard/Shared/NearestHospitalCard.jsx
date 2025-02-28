/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import {
  Clock,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  Check,
  Car,
  Bike,
  Footprints,
} from "lucide-react";

const HospitalCard = ({ hospital }) => {
  const isOpen = hospital?.isCurrentlyOpen;
  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="flex flex-row items-center gap-4 pb-2">
        <div className="w-24 h-24 rounded-lg overflow-hidden">
          <img
            src={hospital?.profilePicture}
            alt={hospital?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{hospital?.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              {hospital?.location?.address}, {hospital?.location?.region}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span
              className={`px-2 py-0.5 rounded-full text-sm ${
                isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isOpen ? "Open Now" : "Closed"} •{" "}
              {formatTime(hospital?.openingTime)} -{" "}
              {formatTime(hospital?.closingTime)}
            </span>
          </div>
        </div>
        <button onClick={()=> console.log(`Booking hospital ${hospital?.id}`)} className="bg-blue-600 text-white p-2 rounded-md animate-pulse">
          Book now
        </button>
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{hospital.contactNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{hospital.email}</span>
        </div>
      </div>

      {/* Travel Times */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="flex items-center gap-2">
          <Car className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-500">By Car</div>
            <div className="font-semibold">
              {hospital?.travelTimes?.car?.time}{" "}
              {hospital?.travelTimes?.car?.timeUnit}
            </div>
          </div>
        </Card>
        <Card className="flex items-center gap-2">
          <Bike className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-500">By Bicycle</div>
            <div className="font-semibold">
              {hospital?.travelTimes?.bicycle?.time}{" "}
              {hospital?.travelTimes?.bicycle?.timeUnit}
            </div>
          </div>
        </Card>
        <Card className="flex items-center gap-2">
          <Footprints className="w-5 h-5 text-gray-600" />

          <div>
            <div className="text-sm text-gray-500">Walking</div>
            <div className="font-semibold">
              {hospital?.travelTimes?.walking?.time}{" "}
              {hospital?.travelTimes?.walking?.timeUnit}
            </div>
          </div>
        </Card>
      </div>

      {/* Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
        <div className="flex flex-wrap gap-2">
          {hospital.servicesOffered.map((service, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Emergency Alerts */}
      {hospital?.emergencyAlerts?.length > 0 && (
        <div className="mt-4">
          {hospital.emergencyAlerts.map((alert, index) => (
            <Card
              key={index}
              className={`mb-2 ${
                alert?.isResolved ? "bg-green-50" : "bg-yellow-50"
              }`}
            >
              <div className="flex items-start gap-2">
                <AlertCircle
                  className={`h-4 w-4 mt-1 ${
                    alert?.isResolved ? "text-green-600" : "text-yellow-600"
                  }`}
                />
                <div>
                  <h4 className="font-semibold">{alert.emergencyType}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {alert.isResolved ? (
                      <span className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" /> Resolved
                      </span>
                    ) : (
                      "Active"
                    )}
                    <span className="text-gray-500">
                      • {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default HospitalCard;
