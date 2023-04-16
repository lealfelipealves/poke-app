import React, { createContext, useState, useContext } from "react";

type ModalContextProps = {
  children: React.ReactNode;
};

type ModalContextProviderProps = {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
};

export const ModalContext = createContext<ModalContextProviderProps>(
  {} as ModalContextProviderProps
);
ModalContext.displayName = "Modal Context";

export const ModalProvider = ({ children }: ModalContextProps) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Para usar o useModal, é obrigatório o usuário do Provider"
    );
  }
  return context;
};
