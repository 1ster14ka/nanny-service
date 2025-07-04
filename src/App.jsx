import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import Nannies from "./pages/Nannies/Nannies.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import { useModal } from "./js/ModalContext.jsx";
import Modal from "./components/Modal/Modal.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import NannyHireForm from "./components/NannyHireForm/NannyHireForm.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

function App() {
  const { typeModal, modalData, handleClose } = useModal();
  return (
    <>
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
    </>
  );
}

export default App;
