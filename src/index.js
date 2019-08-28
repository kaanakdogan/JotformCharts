/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './Contexts/AuthContext';
import { FormDataProvider } from './Contexts/FormsContext';
import ModalProvider from './Contexts/ModalContext';

ReactDOM.render(
  <AuthProvider>
    <FormDataProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </FormDataProvider>
  </AuthProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
