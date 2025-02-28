import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "../Dashboard/Shared/Layout";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return <>{isLoggedIn ? <Layout /> : <Navigate to={"/login"} />} </>;
};
