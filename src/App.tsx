import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <main>
      {/* This is component used to scroll to top on changing the Route */}
      {/* <ScrollToTopOnRouting />    */}

      <Toaster position="bottom-center" reverseOrder={false} />
      <AppRoutes />
    </main>
  );
}

export default App;
