import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(null);

  const [url, setUrl] = useState(window.location.href);
  const handleUrl = (e) => {
    setUrl(e);
  };

  const [user, setUser] = useState(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );
  const clearUser = () => {
    setUser(null);
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    // const userVer = JSON.parse(user);
    if (user) {
      const decodedJwt = parseJwt(user.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        setUser(null);
      }
    }
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        orderNumber,
        setOrderNumber,
        orderItems,
        setOrderItems,
        total,
        setTotal,
        user,
        setUser,
        clearUser,
        url,
        handleUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
