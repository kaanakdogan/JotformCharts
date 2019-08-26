import styled, { createGlobalStyle } from 'styled-components';

export const Header = styled.div`
  padding-top: 135px;
  transition: .4s;
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

export const ModalDiv = styled.div.attrs((props) => ({
  width: props.width || '100%',
  height: props.height || '100%',
}))`
  padding: 15px;
  background: rgba(255, 255, 255, 0.97);
  position: fixed;
  overflow: auto;
  top: 0;
  border-radius: ${(props) => (props.isBorder ? '5px' : '0px')}
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  padding: 32px;
  text-align: center;
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
    margin: auto;
    width: auto;
    top: auto;
    left: auto;
    background: none;
    position: static;
    display: flex;
  }
`;

export const ModalContainer = styled.div`
  margin-top: 30px;
  max-width: 600px;
  margin: auto;
  width: 100%;
`;
