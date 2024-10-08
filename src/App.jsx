import { Suspense, useEffect } from "react";
import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";

import Mainpage from "./components/View/Mainpage";
import ScrollToTopButton from "./components/Global/scrollToTopButton/ScrollToTopButton";
import SecMainPage from "./components/View/secPage/secMainPage";
import Footer from "./components/Global/footer/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <Suspense fallback={"Lodding"}>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/place" element={<SecMainPage />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </Suspense>
    </div>
  );
}

export default App;
