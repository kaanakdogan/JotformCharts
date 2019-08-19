import React from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import logo from '../logo.svg';
import { Nav, NavHeader, Img, NavLeft, NavCenter, NavRight} from '../Styles/NavbarStyles';

export default function Header(){
  return(
    <Router>
      <Nav>
        <NavHeader>

          <NavLeft>
            <Img src={logo} className="App-logo" alt="logo" />
          </NavLeft>
          
          <NavCenter>
            <Link to="/" >Home</Link>
          </NavCenter>

          <NavRight>
            <Link to="/help" t>Help</Link>
          </NavRight>

        </NavHeader>
      </Nav>

      <Route exact path="/" component={Home} />
      <Route path="/help" component={Help} />
    </Router>
  )
}

function Help(){
  return(
    <div>
      <h1>Help</h1>
    </div>
  )
}

function Home(){
  return(
    <div>
      <h1>Home</h1>
    </div>
  )
}