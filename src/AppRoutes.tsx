import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  protectedRoutes,
  unProtectedRoutes,
  authRoutes,
} from "./routes-config";
import {
  ProtectedRoutesWrapper,
  AuthRoutesWrapper,
  ScrollToTop,
} from "./components/routes-config";
import { Spinner } from "./components/ui/Spinner";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* Component used to scroll to top on changing the Route */}
      <ScrollToTop />

      <main className="app-wrapper">
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full">
              <Spinner />
            </div>
          }
        >
          <Routes>
            {protectedRoutes.length > 0 &&
              protectedRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={
                    <ProtectedRoutesWrapper>
                      <route.component />
                    </ProtectedRoutesWrapper>
                  }
                />
              ))}

            {unProtectedRoutes.length > 0 &&
              unProtectedRoutes.map((route) => (
                <Route path={route.path} element={<route.component />} />
              ))}

            {authRoutes.length > 0 &&
              authRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={
                    <AuthRoutesWrapper>
                      <route.component />
                    </AuthRoutesWrapper>
                  }
                />
              ))}
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};
