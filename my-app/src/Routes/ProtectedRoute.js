import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    // Ako nema tokena, preusmeri korisnika na login stranicu
    return <Navigate to="/login" replace />;
  }

  // Ako postoji token, dozvoli pristup stranici
  return children;
};

export default ProtectedRoute;
