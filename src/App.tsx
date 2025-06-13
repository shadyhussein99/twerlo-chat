import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() =>
  import("./pages/login/index")
);
const ChatList = lazy(() =>
  import("./pages/chat-list/index")
);

function App() {

  return (
    <BrowserRouter>

    {/* This is component used to scroll to top on changing the Route */}
    {/* <ScrollToTopOnRouting />    */}
    
      <main className="app-wrapper">
        {/* <WebsiteNavbar /> */}
        {/* <Suspense fallback={<Spinner />}> */}
        <Suspense fallback={'Loading .....'}>
          <Routes>
            <Route path="/" element={<ChatList />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Suspense>
        {/* <Footer /> */}
      </main>
    </BrowserRouter>
  )
}

export default App
