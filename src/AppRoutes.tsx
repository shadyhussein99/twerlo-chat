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
} from "./components/routes-wrappers";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* This is component used to scroll to top on changing the Route */}
      {/* <ScrollToTopOnRouting />    */}

      <main className="app-wrapper">
        {/* <WebsiteNavbar /> */}
        {/* <Suspense fallback={<Spinner />}> */}
        <Suspense fallback={"Loading ....."}>
          <Routes>
            {protectedRoutes.length > 0 &&
              protectedRoutes.map((route) => (
                <ProtectedRoutesWrapper>
                  <Route path={route.path} element={<route.component />} />
                </ProtectedRoutesWrapper>
              ))}

            {unProtectedRoutes.length > 0 &&
              unProtectedRoutes.map((route) => (
                <Route path={route.path} element={<route.component />} />
              ))}

            {authRoutes.length > 0 &&
              authRoutes.map((route) => (
                <AuthRoutesWrapper>
                  <Route path={route.path} element={<route.component />} />
                </AuthRoutesWrapper>
              ))}
          </Routes>
        </Suspense>
        {/* <Footer /> */}
      </main>
    </BrowserRouter>
  );
};
