import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const AuthRoutesWrapper = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <>{children}</>;

  return <Navigate to={"/"} replace />;
};
