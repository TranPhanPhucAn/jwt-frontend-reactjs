import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";
import { useLocation } from "react-router-dom";
const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
  const location = useLocation();
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefault);
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };
  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token: token,
        account: {
          groupWithRoles,
          email,
          username,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };
  useEffect(() => {
    if (
      location &&
      location.pathname !== "/" &&
      location.pathname !== "/login"
    ) {
      // alert("alo");
      fetchUser();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
