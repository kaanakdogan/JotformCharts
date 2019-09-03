import React from 'react';
import logo from '../../logo.svg';
import {
  Nav, NavHeader, Img, NavLeft, NavCenter, NavRight,
} from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';

export default function Header() {
  const [, setModal] = React.useContext(ModalContext);

  const handleClick = (e) => {
    e.preventDefault();

    setModal({ isOpen: true, modalName: 'formSelect' });
  };

  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <Img src={logo} className="App-logo" alt="logo" />
        </NavLeft>
        <NavCenter>
          <button type="button" tabIndex={-1} to="/" onClick={handleClick}>Your Forms</button>
        </NavCenter>
        <NavRight />
      </NavHeader>
    </Nav>
  );
}

export function Help() {
  return (
    <div>Help</div>
  );
}

export function Home() {
  return (
    <div>Home</div>
  );
}
