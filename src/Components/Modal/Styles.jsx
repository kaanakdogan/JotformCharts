import styled, { createGlobalStyle } from 'styled-components';

export const ModalCont = styled.div`
position: relative;
`;

export const Close = styled.span`
  color: #aab3cc;
  font-size: 20px;
  background: #edeef5;
  border-radius: 50%;
  right: 10px;
  top: 10px;
  width: 26px;
  height: 26px;
  text-align: center;

  &:hover {
    color: #2f90ff;
  }

  &::before {
    content: 'x';
  }
`;


export const Header = styled.div`
  padding-top: ${(props) => props.theme.header.paddingTop};
  font-size: ${(props) => props.theme.header.fontSize};
  font-weight: bold;
  left: 0;
  pointer-events: none;
  top: 0;
  width: 100%;
  margin-bottom: 32px;
`;

export const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
    font-family: Circular Std Book,
    -apple-system,blinkmacsystemfont,
    Segoe UI,roboto,oxygen-sans,ubuntu,cantarell,Helvetica Neue,sans-serif;
  }
`;

export const ModalContainer = styled.div`
  background: rgba(255, 255, 255, 0.97);
  overflow: auto;
  border-radius: ${(props) => props.theme.modalContainer.borderRad}
  height: ${(props) => props.theme.modalContainer.height}
  width: ${(props) => props.theme.modalContainer.width}
  z-index: 11;
  padding: ${(props) => props.theme.modalContainer.padding}
  text-align: ${(props) => props.theme.modalContainer.textAlign}
  margin: auto;

  & ${Close} {
    position: absolute;
    cursor: pointer;
    font-weight: 100;
    transition: color .3s;
  }
`;


export const ModalWrapper = styled.div`
  display: table;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.75);
  -webkit-animation: appear-modal .4s forwards;
  animation: appear-modal .4s forwards;
  z-index: 15;
  -webkit-transition: background-color .3s;
  transition: background-color .3s;
`;

export const Root = styled.div`
  font-family: Circular Std Medium;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: scroll;
  background-color: rgba(0,0,0,.75);

  & ${ModalWrapper} {
    color: #1e2c4c;
    margin: auto;
    width: auto;
    top: auto;
    left: auto;
    background: none;
    position: static;
    display: flex;
  }
`;

export const ModalContent = styled.div`
  margin-top: 30px;
  max-width: 600px;
  margin: auto;
  width: 100%;
`;
