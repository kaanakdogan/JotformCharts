import React from 'react';
import Header, { Help, Home } from './Components/Header'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './Components/Login'
import { ModalView } from './Components/Modal'
import { AuthContext, AuthProvider } from './Contexts/AuthContext';
import ModalProvider from './Contexts/ModalContext';
import { FormDataContext } from './Contexts/FormsContext';
import { promisify } from './Utils';

export default function App() {
  const auth = React.useContext(AuthContext);
  console.log(auth)
  if(auth[0]) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/help" component={Help} />
          <Route path="/:id(\d+)" component={Page} />
        </Switch>
        <ModalView/>
      </Router>
  )}

  return (
    <ModalProvider>
        <Login/> 
    </ModalProvider>
  )
}

function Page({match}) {
  const [data, setData] = React.useContext(FormDataContext);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
    prom(match.params.id).then(res => {console.log(Object.values(res)); setData(Object.values(res))}).catch()
  }, [])

  
  return(
    <div>
      <Header />
      <h1>Form Data: </h1>
    </div>
  )
}
