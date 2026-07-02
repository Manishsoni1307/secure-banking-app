import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);
  const location = useLocation();


  if (loading) {
    return <Loader />;
  }

  
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  
  return children;
}

export default ProtectedRoute;