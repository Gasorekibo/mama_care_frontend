import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AllUsers from "./components/Dashboard/AllUsers";
import CHWDashboard from "./components/Dashboard/CHW";
import AddNewWoman from "./components/Dashboard/CHW/AddNewWoman";
import PregnantWomenManagement from "./components/Dashboard/CHW/PregnantWomenManagement";
import Dashboard from "./components/Dashboard/Dashboard";
import PregnancyDashboard from "./components/Dashboard/PregnantWoman/Dashboard";
import EmergenceAlert from "./components/Dashboard/PregnantWoman/EmergenceAlert";
import NearestHospital from "./components/Dashboard/Shared/NearestHospital";
import { ProtectedRoute } from "./components/Routes/protectedRoutes";
import MainLayout from "./components/shared/layouts/MainLayouy";
import AllAppointments from "./pages/Appointments/All";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AllEducation from "./pages/Education/All";
import HomePage from "./pages/HomePage";
import AllHospitals from "./pages/Hospitals/AllHospitals";
import NotFound from "./pages/NotFound";
import { checkAuthAction } from "./redux/slices/authSlice";
import HospitalDashboard from "./components/Dashboard/Hospital/Dashboard";
import EmergencePage from "./components/Dashboard/Hospital/EmergencePage";
import AllEmergencePage from "./components/Dashboard/PregnantWoman/AllEmergencePage";

const App = () => {
  const { isLoggedIn, isCheckingAuth, auth } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthAction());
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };
    checkAuth();
  }, [dispatch]);
  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-600  z-20 text-center">
        <Loader2 className="animate-spin text-white size-20" />
      </div>
    );
  const loggedInUserRole = auth?.user?.role;
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <MainLayout /> : <Login />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pregnancy-education"
            element={isLoggedIn ? <AllEducation /> : <Navigate to={"/"} />}
          />
          <Route path="/profile/:id" element={<ProtectedRoute />}>
            <Route
              index
              element={
                loggedInUserRole === "ADMIN" ? (
                  <Dashboard />
                ) : loggedInUserRole === "PREGNANT_WOMAN" ? (
                  <PregnancyDashboard />
                ) : loggedInUserRole === "HOSPITAL" ? (
                  <HospitalDashboard />
                ) : (
                  <CHWDashboard />
                )
              }
            />
            <Route path="education" element={<AllEducation />} />
            <Route path="appointments" element={<AllAppointments />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="hospitals" element={<AllHospitals />} />
            <Route path="message" element={<EmergenceAlert />} />
            <Route path="alerts" element={<AllEmergencePage />} />
            <Route path="nearest-hospital" element={<NearestHospital />} />
            <Route path="hospital/emergence/:emergenceId" element={<EmergencePage />} />
            <Route
              path="pregnant-women-management"
              element={<PregnantWomenManagement />}
            />
            <Route path="new-entry" element={<AddNewWoman />} />
          </Route>
        </Route>
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to={"/"} /> : <Login />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
