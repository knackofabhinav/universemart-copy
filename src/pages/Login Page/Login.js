import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { instance } from "../../App";
import { useDataContext } from "../../contexts/dataContext";
import { useAuth } from "../../contexts/authContext";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "../../contexts/theme-context";

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dispatch } = useDataContext();
  const { setLogin } = useAuth();
  const {
    theme: { dark, light },
    isDark,
  } = useTheme();
  const [showWrongCredentialsAlert, setShowWrongCredentialsAlert] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "admin",
    password: "admin",
  });

  const loginHandler = async (loginCredentials) => {
    try {
      const response = await instance.post("/login", {
        username: loginCredentials.username,
        password: loginCredentials.password,
      });
      if (response.data.success === true) {
        setLogin(true);
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
          })
        );
        localStorage?.setItem(
          "credentials",
          JSON.stringify({
            username: loginCredentials.username,
            password: loginCredentials.password,
          })
        );
        dispatch({ type: "LOGGED_IN", payload: response.data.user });
      }
      setShowWrongCredentialsAlert(false);
      navigate(state?.from ? state.from : "/");
    } catch (error) {
      setShowWrongCredentialsAlert(true);
      console.log("wrong credentials", error);
    }
  };

  return (
    <div className="login-container" style={isDark ? dark : light}>
      <form className="login">
        <h2>Login</h2>
        {showWrongCredentialsAlert && (
          <div className="alert danger">
            <i className="fas fa-exclamation-triangle"></i>
            <p> Wrong credentials provided. </p>
          </div>
        )}
        <div className="input-container">
          <input
            value={loginCredentials.username}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
              })
            }
            placeholder="Username"
            aria-label="Username"
          />
        </div>
        <div className="input-container">
          <input
            value={loginCredentials.password}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            aria-label="Username"
          />
          <button
            type="button"
            className="btn secondary outline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <button
            className="btn primary"
            onClick={(e) => {
              e.preventDefault();
              loginHandler(loginCredentials);
            }}
          >
            Login
          </button>
          <Link to="/signup">
            <p style={{ textAlign: "center" }}>Signup</p>
          </Link>
        </div>
      </form>
    </div>
  );
};
