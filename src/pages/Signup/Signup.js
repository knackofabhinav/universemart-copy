import { useState } from "react";
import "./Signup";
import { instance } from "../../App";
import { useTheme } from "../../contexts/theme-context";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(null);

  const [signupCredentials, setSignupCredentials] = useState({
    username: "",
    password: "",
  });

  const {
    theme: { dark, light },
    isDark,
  } = useTheme();

  const signupHandler = async (signupCredentials) => {
    try {
      const response = await instance
        .post("/signup", {
          username: signupCredentials.username,
          password: signupCredentials.password,
        })
        .then(setSuccessfulSignup(true));
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container" style={isDark ? dark : light}>
      <div className="login">
        <h2>Signup</h2>
        {successfulSignup && (
          <div className="alert success">
            <i className="fas fa-check-circle"></i>
            <p>Account created successfully! Please login.</p>
          </div>
        )}
        <div className="input-container">
          <input
            onChange={(e) =>
              setSignupCredentials({
                ...setSignupCredentials,
                username: e.target.value,
              })
            }
            placeholder="Username"
            aria-label="Username"
          />
        </div>
        <div class="input-container">
          <input
            onChange={(e) =>
              setSignupCredentials({
                ...signupCredentials,
                password: e.target.value,
              })
            }
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            aria-label="Username"
          />
          <button
            className="btn secondary outline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <button
            className="btn secondary"
            onClick={() => signupHandler(signupCredentials)}
          >
            Sign Up
          </button>
          <Link to="/login">
            <p style={{ textAlign: "center" }}>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
