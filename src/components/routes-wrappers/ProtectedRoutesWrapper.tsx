import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const ProtectedRoutesWrapper = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate to={"/login"} replace />;
};
