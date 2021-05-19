import "./Navigation.css";
import DarkLogo from "../../assets/Logo/Universe-logo.png";
import LightLogo from "../../assets/Logo/Universe-logo-white.png";
import { useTheme } from "../../contexts/theme-context";
import { useDataContext } from "../../contexts/dataContext";
import { Link } from "react-router-dom";
import { instance } from "../../App";
import { useAuth } from "../../contexts/authContext";
export const Navigation = () => {
  const {
    state: { cart, userId },
    dispatch,
  } = useDataContext();
  const {
    theme: { dark, light },
    isDark,
    setIsDark,
  } = useTheme();
  const { isUserLogin, setLogin } = useAuth();

  const logoutHandler = () => {
    setLogin(false);
    localStorage.removeItem("login");
    localStorage.removeItem("credentials");
    dispatch({ type: "LOGGED_OUT" });
  };

  return (
    <div className="navigation" style={isDark ? dark : light}>
      <a href="/">
        <img src={isDark ? LightLogo : DarkLogo} alt="logo" />
      </a>
      <ul>
        <li>
          <Link to="/products" style={isDark ? dark : light}>
            <p>Products</p>
          </Link>
        </li>
        <li>
          <Link to="/cart" style={isDark ? dark : light}>
            <div className="badge-container">
              <i className="fas fa-shopping-cart"></i>
              <div className="badge">{cart && cart.length}</div>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/wishlist" style={isDark ? dark : light}>
            <i className="fas fa-heart"></i>
          </Link>
        </li>
        <li>
          {isUserLogin ? (
            <button className="btn primary" onClick={() => logoutHandler()}>
              Logout
            </button>
          ) : (
            <Link to="/login" style={isDark ? dark : light}>
              Login
            </Link>
          )}
        </li>
        <li onClick={() => setIsDark(!isDark)}>
          {isDark ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </li>
      </ul>
    </div>
  );
};
