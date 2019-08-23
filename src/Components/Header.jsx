import React from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import { Nav, NavHeader, Img, NavLeft, NavCenter, NavRight} from '../Styles/NavbarStyles';

export default function Header(){
  return(
      <Nav>
        <NavHeader>

          <NavLeft>
            <Img src={logo} className="App-logo" alt="logo" />
          </NavLeft>
          
          <NavCenter>
            <Link to="/">Home</Link>
          </NavCenter>

          <NavRight>
            <Link to="/help">Help</Link>
          </NavRight>

        </NavHeader>
      </Nav>

  )
}

export function Help(){
  return(
    <div>Help</div>
  )
}

export function Home(){
  return(
    <div>Home</div>
  )
}