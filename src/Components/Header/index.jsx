import React from 'react';
import logo from '../../logo.svg';
import {
  Nav, NavHeader, Img, NavLeft, NavCenter, NavRight, Title,
} from './Styles';
import { ModalContext } from '../../Contexts/ModalContext';

export default function Header({ name }) {
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
          <Title type="button" tabIndex={-1} to="/" onClick={handleClick}>{name}</Title>
        </NavCenter>
        <NavRight />
      </NavHeader>
    </Nav>
  );
}
