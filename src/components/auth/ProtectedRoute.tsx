import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/contexts";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  role: UserRole;
  children: ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (user && user.role !== role) {
    return (
      <Navigate
        to={user.role === "parent" ? "/parent/dashboard" : "/admin/dashboard"}
        replace
      />
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`/auth/${role}/login`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

interface GuestRouteProps {
  role: UserRole;
  children: ReactNode;
}

export function GuestRoute({ role, children }: GuestRouteProps) {
  const { user } = useAuth();

  if (user?.role === role) {
    return <Navigate to={role === "parent" ? "/parent/dashboard" : "/admin/dashboard"} replace />;
  }

  return children;
}
