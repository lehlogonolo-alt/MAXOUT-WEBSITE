import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <p className="text-center text-gray-400 p-6">
        Checking authentication…
      </p>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        Error loading authentication: {error.message}
      </div>
    );
  }

  if (!user) {
    // 🚫 Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → render child component
  return <>{children}</>;
}

export default ProtectedRoute;

