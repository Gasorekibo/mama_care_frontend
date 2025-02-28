import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navigation from "../../Navigation";
import { useSelector } from "react-redux";

export default function MainLayout() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const isUserProfilePage = pathname.startsWith("/profile");

  return (
    <>
      {isLoggedIn ? (
        <>
          {!isUserProfilePage && <Navigation />}
          <Outlet />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
