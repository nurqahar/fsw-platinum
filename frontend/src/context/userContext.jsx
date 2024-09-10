import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const authenticateUser = async ({ token }) => {
    const decoded = jwtDecode(token);
    const { sub } = decoded;
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_BASE_URL}/api/users/${sub}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem("user", JSON.stringify(response.data));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, authenticateUser }}>
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };
