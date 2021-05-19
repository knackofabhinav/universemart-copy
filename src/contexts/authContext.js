import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../App";
import { useDataContext } from "../contexts/dataContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setLogin] = useState(false);
  const { state, dispatch } = useDataContext();

  if (!isUserLogin) {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));
    loginStatus?.isUserLoggedIn && setLogin(true);
  }

  useEffect(() => {
    const loginCredentials = JSON.parse(localStorage?.getItem("credentials"));
    if (loginCredentials && state.userId === null) {
      (async function () {
        try {
          const res = await instance.post("/login", {
            username: loginCredentials.username,
            password: loginCredentials.password,
          });
          console.log(res.data.user);
          dispatch({ type: "LOGGED_IN", payload: res.data.user });
        } catch (err) {
          console.log("no credentials found");
        }
      })();
    }
    console.log(loginCredentials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async function loginUserWithCredentials(loginCredentials) {
  //   setLogin(true);
  //   localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true }));
  // }

  return (
    <AuthContext.Provider value={{ setLogin, isUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
