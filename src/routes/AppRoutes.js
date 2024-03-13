import { Routes, Route } from "react-router-dom";
import Users from "../components/ManageUsers/Users";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        {/* <Route path="/project">project</Route>
        <Route path="/users" element={<Users />} /> */}
        {/* <PrivateRoutes path="/project" /> */}

        {/* <Route exact path="/project" element={<PrivateRoutes />}>
          <Route exact path="/project" element={<Users />} />
        </Route> */}

        {/* <PrivateRoutes path="/users" component={<Users />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/">{<>home</>}</Route>
        <Route exact path="/users" element={<PrivateRoutes />}>
          <Route exact path="/users" element={<Users />} />
          {/* <Route exact path="/project" element={<Users />} /> */}
        </Route>
        <Route exact path="/roles" element={<PrivateRoutes />}>
          <Route exact path="/roles" element={<Role />} />
          {/* <Route exact path="/project" element={<Users />} /> */}
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*">404 not found</Route>

        {/* Same as */}
        {/* <ToastContainer /> */}
      </Routes>
    </>
  );
};
export default AppRoutes;
