import React from 'react';
import Header, { Help, Home } from './Components/Header'
import { HashRouter as Router, Route } from 'react-router-dom';
import { Login } from './Components/Login'
import { ModalView } from './Components/Modal'
import { AuthContext, AuthProvider } from './Contexts/AuthContext';
import ModalProvider from './Contexts/ModalContext';

export default function App() {
  const auth = React.useContext(AuthContext);
  
  if(auth) {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/help" component={Help} />
        <Route path="/:id" component={Page} />
        <ModalView/>
      </Router>
  )}

  return (
    <ModalProvider>
      <AuthProvider>
        <Login/> 
      </AuthProvider>
    </ModalProvider>
  )
}

function Page({match}) {
  return(
    <div>
      <Header />
      <h1>ID: {match.params.id}</h1>
    </div>
  )
}
