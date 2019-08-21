import React from 'react';
import Header, { Help } from './Components/Header'
import { HashRouter as Router, Route,Redirect} from 'react-router-dom';
import { Auth, Login } from './Components/Login'

export default function App() {
  return (
    <Router>
      
      <PrivateRoute exact path="/" component={Header} />
      <PrivateRoute path="/help" component={Help} />
      <Route path="/login" component={Login} />
      
    </Router>
  )
}

function PrivateRoute({ component: Component, ...rest }) {

  return(
    <Route 
      {...rest}
      render={ props =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname:"/login",
            }}
          />
        )
      }
    />
  )
}