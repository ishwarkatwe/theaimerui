import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  // Replace this with your actual auth check
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  // or: useContext(AuthContext), Redux, Zustand, etc.

  if (!isAuthenticated) {
    // redirect to login and preserve where user was going
    return <Navigate to={`/login?returnTo=${location.pathname}`} replace />;
  }

  return children;
}
