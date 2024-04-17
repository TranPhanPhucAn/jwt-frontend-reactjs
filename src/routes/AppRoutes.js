import { Routes, Route } from "react-router-dom";
import Users from "../components/ManageUsers/Users";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import About from "../components/About/About";
import Home from "../components/Home/Home";
const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route exact path="/users" element={<PrivateRoutes />}>
          <Route exact path="/users" element={<Users />} />
        </Route>
        <Route exact path="/roles" element={<PrivateRoutes />}>
          <Route exact path="/roles" element={<Role />} />
        </Route>
        <Route exact path="/group-role" element={<PrivateRoutes />}>
          <Route exact path="/group-role" element={<GroupRole />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*">404 not found</Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
