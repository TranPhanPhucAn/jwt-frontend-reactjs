import { useEffect } from "react";
import { Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  // let navigate = useNavigate();
  // useEffect(() => {
  //   let session = sessionStorage.getItem("account");
  //   if (!session) {
  //     navigate("/login");
  //   }
  // }, []);

  // return (
  //   <>
  //     <Route path={props.path} component={props.component} />
  //   </>
  // );
  let session = sessionStorage.getItem("account");
  return session ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
