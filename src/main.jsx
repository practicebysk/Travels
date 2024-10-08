import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// import "react-image-lightbox/style.css";

import App from "./App.jsx";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar
      closeOnClick
      pauseOnHover
      theme="dark"
    />
  </BrowserRouter>
);
