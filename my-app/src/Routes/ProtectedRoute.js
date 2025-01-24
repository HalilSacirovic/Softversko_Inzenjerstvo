import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    alert("Need to login first to use this page");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
