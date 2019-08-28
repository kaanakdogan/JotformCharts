import React from 'react';
import PropTypes from 'prop-types';

export const ModalContext = React.createContext();

export default function ModalProvider({ children }) {
  const [modal, setModal] = React.useState({ isOpen: false, modalName: '' });

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      { children }
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
