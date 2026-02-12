import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading, hasRole } = useAuth();
  const location = useLocation();

  // ⏳ Wait until session restore is complete
  if (loading) {
    return null; // or return <FullScreenLoader />
  }

  // ❌ Not authenticated
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // allows redirect back after login
      />
    );
  }

  // ❌ Authenticated but role not allowed
  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Allowed
  return children;
};

export default PrivateRoute;
