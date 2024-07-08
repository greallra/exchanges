import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const isLoginPage = useLocation().pathname === '/login';
  console.log(isLoginPage, user);
  
  if (user && isLoginPage) {
    // user is not authenticated
    return <Navigate to="/exchanges" />;
  }
  return children;
};