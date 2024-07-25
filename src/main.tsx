import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <div className="w-screen h-screen bg-purple">
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
      <ToastContainer />
    </div>
  </>
);
