import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../lib/auth";
import type { Role } from "../lib/auth";

export default function ProtectedRoute({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== role) {
    return <Navigate to={`/login?role=${role}`} replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
