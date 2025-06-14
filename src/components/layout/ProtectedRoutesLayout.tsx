import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Navbar } from "../shared";

export const ProtectedRoutesLayout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated)
    return (
      <>
        <Navbar />
        {children}
      </>
    );

  return <Navigate to={"/login"} replace />;
};
