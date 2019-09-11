/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from './Styles';
import ModalController from './Components/ModalController';
import History from './History';
import Reports from './Components/Report';

export default function App() {
  return (
    <Router history={History}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Reports} />
        <Route path="/:id(\d+)" component={Reports} />
      </Switch>
      <ModalController />
    </Router>
  );
}
