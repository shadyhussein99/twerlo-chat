import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./AppRoutes";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <main>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AppRoutes />
    </main>
  );
}

export default App;
