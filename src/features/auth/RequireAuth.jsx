import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  const content = token ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  ); // replaces require auth in history to prevent navigating back to it.

  return content;
};
export default RequireAuth;
