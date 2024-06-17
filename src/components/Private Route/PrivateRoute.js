import { Navigate, Route } from "react-router";
import { useAuth } from "../../contexts/authContext";

export function PrivateRoute({ path, ...props }) {
  const { isUserLogin } = useAuth();
  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
