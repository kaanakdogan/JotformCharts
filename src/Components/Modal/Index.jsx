/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactDOM from 'react-dom';
import FormsProvider from '../../Contexts/FormsContext';
import ModalProvider, { ModalContext } from '../../Contexts/ModalContext';
import * as Styles from './Styles';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = ModalContext;

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return (
      this.context[0] ? ReactDOM.createPortal(

        this.props.children, this.el,
      ) : null
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export function ModalView({ children, header }) {
  return (
    <ModalProvider>
      <Styles.GlobalStyle />
      <Modal>
        <FormsProvider>
          <Styles.Root>
            <Styles.ModalWrapper>
              <Styles.ModalDiv isBorder={false}>
                <Styles.Header>
                  {header}
                </Styles.Header>
                <Styles.ModalContainer>
                  {children}
                </Styles.ModalContainer>
              </Styles.ModalDiv>
            </Styles.ModalWrapper>
          </Styles.Root>
        </FormsProvider>
      </Modal>
    </ModalProvider>
  );
}
