/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../../Contexts/ModalContext';
import * as Styles from './Styles';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = ModalContext;

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  render() {
    return (
      this.context[0].isOpen ? ReactDOM.createPortal(
        this.props.children, modalRoot,
      ) : null
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export function ModalView(props) {
  const [modal, setModal] = React.useContext(ModalContext);

  const handleClick = (e) => {
    e.preventDefault();

    setModal(
      {
        isOpen: false,
        modalName: modal.modalName,
      },
    );
  };

  return (
    <Modal>
      <Styles.Root>
        <Styles.ModalWrapper>
          <Styles.ModalContainer>
            <Styles.ModalCont>
              {props.isNotClose ? null : <Styles.Close onClick={handleClick} />}
              <Styles.Header>
                {props.header}
              </Styles.Header>
              <Styles.ModalContent>
                {props.children}
              </Styles.ModalContent>
            </Styles.ModalCont>
          </Styles.ModalContainer>
        </Styles.ModalWrapper>
      </Styles.Root>
    </Modal>
  );
}
