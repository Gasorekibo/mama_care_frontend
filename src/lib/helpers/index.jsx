export function getOrderStatus(status) {
  switch (status) {
    case "PLACED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "CONFIRMED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "SHIPPED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "OUT_FOR_DELIVERY":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "DELIVERED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}


export function dateFormatter(dateString) {
  return new Date(dateString)?.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

 export const getStatusColor = (status) => {
   switch (status) {
     case "SCHEDULED":
       return "bg-blue-100 text-blue-800";
     case "COMPLETED":
       return "bg-green-100 text-green-800";
     case "CANCELLED":
       return "bg-red-100 text-red-800";
     case "MISSED":
        return "bg-red-600 text-white";
     default:
       return "bg-gray-100 text-gray-800";
   }
 };

 export function calculateTrimester (weekOfPregnancy) {
  if (weekOfPregnancy <= 12) {
    return "1st";
  } else if (weekOfPregnancy <= 24) {
    return "2nd";
  } else {
    return "3rd";
  }
}