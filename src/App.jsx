import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import { ToastContainer } from "react-toastify";
import { useModal } from "./js/ModalContext.jsx";
import Modal from "./components/Modal/Modal.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader.jsx";
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const Nannies = lazy(() => import("./pages/Nannies/Nannies.jsx"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites.jsx"));

const LoginForm = lazy(() => import("./components/LoginForm/LoginForm.jsx"));
const RegisterForm = lazy(() =>
  import("./components/RegisterForm/RegisterForm.jsx")
);
const NannyHireForm = lazy(() =>
  import("./components/NannyHireForm/NannyHireForm.jsx")
);

function App() {
  const { typeModal, modalData, handleClose } = useModal();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="nannies" element={<Nannies />} />
            <Route
              path="favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
        <Modal
          isOpen={typeModal !== null}
          onClose={handleClose}
          position={typeModal === "appointment" ? "center" : ""}
        >
          {typeModal === "login" && <LoginForm />}
          {typeModal === "register" && <RegisterForm />}
          {typeModal === "appointment" && (
            <NannyHireForm naniesInfo={modalData} onClose={handleClose} />
          )}
        </Modal>
      </Suspense>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
