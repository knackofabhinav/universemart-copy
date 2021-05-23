import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setLogin] = useState(false);

  if (!isUserLogin) {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));
    loginStatus?.isUserLoggedIn && setLogin(true);
  }

  return (
    <AuthContext.Provider value={{ setLogin, isUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
