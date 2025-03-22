/* eslint-disable react/prop-types */
import { Alert, Card } from "flowbite-react";
import {
  AlertCircle,
  BellRing,
  Check,
  Clock,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllChwData from "../../../lib/helpers/getChwData";
import { getAllAppointmentsAction } from "../../../redux/slices/appointmentsSlice";
import { getAllEducationAction } from "../../../redux/slices/educationSlice";
import { getAllUserAction } from "../../../redux/slices/userSlice";
import LoadingSpinner from "../../shared/LoadingSpinner";

const HeaderCard = ({
  icon: Icon,
  title,
  value,
  trend,
  color = "text-blue-500",
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-0 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${color.replace("text", "bg")}/10`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {trend && (
                  <span
                    className={`ml-2 text-sm ${
                      trend > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ErrorAlert = ({ message }) => (
  <Alert variant="destructive" className="mb-6">
    <AlertCircle className="h-4 w-4" />
    <div>{message}</div>
  </Alert>
);

function ChwHeader() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state?.auth);
  const {
    users,
    loading: fetchingUsers,
    error: userError,
  } = useSelector((state) => state?.users);
  const {
    appointments,
    loading: fetchingAppointments,
    error: appointmentError,
  } = useSelector((state) => state?.appointments);
  const {
    education,
    loading: fetchingEducations,
    error: educationError,
  } = useSelector((state) => state?.education);

  useEffect(() => {
    dispatch(getAllAppointmentsAction());
    dispatch(getAllEducationAction());
    dispatch(getAllUserAction());
  }, [dispatch, appointments.length, education.length, users.length]);

  if (fetchingAppointments || fetchingEducations || fetchingUsers) {
    return <LoadingSpinner />;
  }

  const error = userError || appointmentError || educationError;
  if (error) {
    return <ErrorAlert message={error} />;
  }
  const chwData = getAllChwData(auth?.user?.id, appointments, education);
  const pregnantWomen = users.filter((user) => user?.role === "PREGNANT_WOMAN");
  const totalAppointments = chwData?.appointment?.length;
  const missedAppointments = chwData?.missedVisits?.length;
  const attendedAppointments = totalAppointments - missedAppointments;
  const attendanceRate = totalAppointments
    ? Math.round((attendedAppointments / totalAppointments) * 100)
    : 0;

  const cards = [
    {
      icon: Users,
      title: "Total Pregnant Women",
      value: pregnantWomen?.length,
      color: "text-blue-500",
    },
    {
      icon: Check,
      title: "Attended Appointments",
      value: attendedAppointments,
      trend: attendanceRate,
      color: "text-green-500",
    },
    {
      icon: AlertCircle,
      title: "Missed Appointments",
      value: missedAppointments,
      color: "text-red-500",
    },
    {
      icon: Clock,
      title: "Upcoming Appointments",
      value: chwData.upComingAppointments.length,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="absolute top-0 right-0 p-4">
        {chwData.upComingAppointments.length > 0 && (
          <div className="flex items-center space-x-2 bg-red-50 p-2 rounded-lg">
            <BellRing className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-700">
              {chwData?.upComingAppointments?.length } upcoming appointments
            </span>
          </div>
        )}
      </div>

      <div className=" mx-4 md:px-6 grid gap-2 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <HeaderCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default ChwHeader;
