import { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        return onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${css.backdrop} ${isOpen ? css["is-open"] : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
