import { Navigate, Outlet } from "react-router-dom";
import Navigation from "../../Navigation";
import { useSelector } from "react-redux";

export default function MainLayout() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navigation />
          <Outlet />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
