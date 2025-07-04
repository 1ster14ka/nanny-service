import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [typeModal, setTypeModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleOpen = (type, data = null) => {
    setTypeModal(type);
    setModalData(data);
  };

  const handleClose = () => {
    setTypeModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{ typeModal, modalData, handleOpen, handleClose }}
    >
      {children}
    </ModalContext.Provider>
  );
};
