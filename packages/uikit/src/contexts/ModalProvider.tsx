import React from 'react';

type ContextProps = {
  handlePresent: (node: React.ReactNode) => void;
  handleDismiss: () => void;
};

const ModalContext = React.createContext({} as ContextProps);

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalNode, setModalNode] = React.useState<React.ReactNode>();
  const handlePresent = (node: React.ReactNode): void => {
    setModalNode(node);
    setIsOpen(true);
  };

  const handleDismiss = (): void => {
    setModalNode(undefined);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ handlePresent, handleDismiss }}>
      {isOpen &&
        React.isValidElement(modalNode) &&
        React.cloneElement(modalNode, {
          handleDismiss,
        })}
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
