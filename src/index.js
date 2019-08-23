import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './Contexts/AuthContext';
import { FormDataProvider } from './Contexts/FormsContext';

ReactDOM.render(
  <FormDataProvider>
    <AuthProvider>
      <App />
    </AuthProvider> 
  </FormDataProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
