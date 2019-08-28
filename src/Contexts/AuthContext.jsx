import React, { useEffect, useContext } from 'react';
import PropType from 'prop-types';
import promisify from '../Utils';
import ModalProvider, { ModalContext } from './ModalContext';
import History from '../History';

export const AuthContext = React.createContext(false);

export function AuthProvider({ children }) {
  const [isAuth, setAuth] = React.useState(false);

  return (
    <AuthContext.Provider value={[isAuth, setAuth]}>
      {isAuth ? children : <Login />}
    </AuthContext.Provider>
  );
}

function Login() {
  const [isAuth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const prom = promisify(global.JF.getUser);
    prom()
      .then(() => {
        setAuth(true);
        const formProm = promisify(global.JF.getForms);
        formProm({ limit: 200 })
          .then((res) => History.push(res[0].id));
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

AuthProvider.propTypes = {
  children: PropType.node.isRequired,
};
