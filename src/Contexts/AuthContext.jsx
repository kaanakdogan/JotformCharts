import React, { useEffect, useContext } from 'react';
import PropType from 'prop-types';
import { HashRouter as Router, withRouter } from 'react-router-dom';
import promisify from '../Utils';
import History from '../History';
import { FormsContext } from './FormsContext';
import { CleanDatabase } from '../DataStore';

export const AuthContext = React.createContext(false);

function Login({ location }) {
  const [isAuth, setAuth] = useContext(AuthContext);
  const [, setForms] = useContext(FormsContext);

  useEffect(() => {
    const prom = promisify(global.JF.getUser);
    prom()
      .then(() => {
        setAuth(true);
        const formProm = promisify(global.JF.getForms);
        formProm({ limit: 1000 })
          .then((res) => {
            setForms(res);
            if (location.pathname != '/') {
              const check = location.pathname.split('/')[1];
              if (res.find((r) => `${r.id}` === check)) {
                History.push(location.pathname);
              } else {
                History.push(`/${res[0].id}`);
              }
            } else {
              History.push(`/${res[0].id}`);
            }
          });
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  if (isAuth) {
    return null;
  }

  return <div />;
}

export function AuthProvider({ children }) {
  const [isAuth, setAuth] = React.useState(false);
  const LoginWithRouter = withRouter(Login);

  return (
    <AuthContext.Provider value={[isAuth, setAuth]}>
      <Router history={History}>
        {isAuth ? children : <LoginWithRouter />}
      </Router>
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropType.node.isRequired,
};
