import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./reset.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./js/ModalContext.jsx";
import { AuthProvider } from "./hooks/auth.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
