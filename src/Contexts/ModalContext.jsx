import React from 'react';
import PropTypes from 'prop-types';

export const ModalContext = React.createContext(true);

export default function ModalProvider({ children }) {
  const [modal, setModal] = React.useState(true);

  return (
    <ModalContext.Provider value={[modal, setModal]}>
      { children }
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
