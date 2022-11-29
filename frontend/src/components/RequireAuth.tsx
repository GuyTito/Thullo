import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getAuth } from "../store/authSlice";


export default function RequireAuth() {
  const auth = useAppSelector(getAuth);
  const location = useLocation();

  return (
    auth.accessToken
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}
