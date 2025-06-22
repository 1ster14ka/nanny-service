import { useState } from "react";
import css from "./Header.module.css";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";

const Header = () => {
  const [typeModal, setTypeModal] = useState(null);

  const handleOpen = (type) => setTypeModal(type);
  const handleClose = () => setTypeModal(null);

  return (
    <>
      <header className={css.header}>
        <div className={css.containerHead}>
          <a href="/" className={css.logo}>
            Nanny.Services
          </a>

          <nav className={css.navigation}>
            <ul className={css.headerList}>
              <li>Home</li>
              <li>Nannies</li>
            </ul>

            <ul className={`${css.headerList} ${css.registration}`}>
              <li>
                <button
                  className={css.btnLogin}
                  type="button"
                  onClick={() => {
                    handleOpen("login");
                  }}
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  className={css.btnRegister}
                  onClick={() => {
                    handleOpen("register");
                  }}
                >
                  Registartion
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Modal isOpen={typeModal !== null} onClose={handleClose}>
        {typeModal === "login" && <LoginForm onClose={handleClose} />}
        {typeModal === "register" && <RegisterForm onClose={handleClose} />}
      </Modal>
    </>
  );
};

export default Header;
