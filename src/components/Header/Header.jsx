import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import css from "./Header.module.css";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
// import Logout from "../Logout/Logout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../js/firebase";
import { logout } from "../../js/logout";

const Header = () => {
  const [typeModal, setTypeModal] = useState(null);

  const handleOpen = (type) => setTypeModal(type);
  const handleClose = () => setTypeModal(null);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("👤 Текущий пользователь:", user);
        setUser(user);
        setUserName(user.displayName);
      } else {
        console.log("🔒 Пользователь не вошел");
        setUser(null);
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);
  console.log("USer", user);
  console.log("USerNAme", userName);

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

            {!user ? (
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
            ) : (
              <ul className={css.listUser}>
                <li className={css.itemUser}>
                  <div className={css.wrappUser}>
                    <FaUserAlt className={css.iconUser} />
                  </div>
                  <p className={css.userName}>{userName}</p>
                </li>
                <li className={css.itemUser}>
                  <button onClick={logout} className={css.btnUser}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
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
