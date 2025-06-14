import type { PropsWithChildren } from "react";
import { Navbar } from "../shared";

export const UnProtectedRoutesLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
