import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import css from "./Header.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../js/firebase";
import { logout } from "../../js/logout";
import { NavLink, useLocation } from "react-router-dom";
import { useModal } from "../../js/ModalContext.jsx";

const Header = () => {
  const { handleOpen } = useModal();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const root = document.querySelector("#root");

  if (!isHome) {
    root.classList.add("pageNanny");
  } else {
    root.classList.remove("pageNanny");
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserName(user.displayName);
      } else {
        setUser(null);
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <header className={isHome ? css.header : css.headerNanny}>
        <div className={css.containerHead}>
          <NavLink to="/" className={css.logo}>
            Nanny.Services
          </NavLink>

          <nav className={css.navigation}>
            <div className={css.headerList}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${css.home} ${isActive ? css.activeLink : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/nannies"
                className={({ isActive }) =>
                  `${css.nannies} ${isActive ? css.activeLink : ""}`
                }
              >
                Nannies
              </NavLink>
              {user && (
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${css.favorites} ${isActive ? css.activeLink : ""}`
                  }
                >
                  Favorites
                </NavLink>
              )}
            </div>
          </nav>
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
        </div>
      </header>
    </>
  );
};

export default Header;
