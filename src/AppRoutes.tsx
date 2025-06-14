import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  protectedRoutes,
  unProtectedRoutes,
  authRoutes,
} from "./routes-config";
import {
  ProtectedRoutesLayout,
  AuthRoutesLayout,
  UnProtectedRoutesLayout,
  ScrollToTop,
} from "./components/layout";
import { Spinner } from "./components/ui";

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
                    <ProtectedRoutesLayout>
                      <route.component />
                    </ProtectedRoutesLayout>
                  }
                />
              ))}

            {unProtectedRoutes.length > 0 &&
              unProtectedRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={
                    <UnProtectedRoutesLayout>
                      <route.component />
                    </UnProtectedRoutesLayout>
                  }
                />
              ))}

            {authRoutes.length > 0 &&
              authRoutes.map((route) => (
                <Route
                  path={route.path}
                  element={
                    <AuthRoutesLayout>
                      <route.component />
                    </AuthRoutesLayout>
                  }
                />
              ))}
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};
