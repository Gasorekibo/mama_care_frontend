/* eslint-disable react/prop-types */
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600">{icon}</div>
    <div>
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className="text-gray-800">{value || "Not Available"}</p>
    </div>
  </div>
);

export default InfoItem;