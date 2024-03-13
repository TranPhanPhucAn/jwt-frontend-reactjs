import { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  if (user && user.isAuthenticated === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
  // return session ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
